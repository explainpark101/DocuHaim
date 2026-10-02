//! Android-only JNI helpers: system status bar, ABI, APK install / download.

use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

use jni::objects::{JObject, JValue};
use jni::JavaVM;
use tauri::{AppHandle, Manager};

fn with_main_activity<T, F>(f: F) -> Result<T, String>
where
    F: FnOnce(&mut jni::JNIEnv, JObject) -> Result<T, String>,
{
    let ctx = ndk_context::android_context();
    let vm = unsafe { JavaVM::from_raw(ctx.vm().cast()) }.map_err(|e| e.to_string())?;
    let activity = unsafe { JObject::from_raw(ctx.context() as jni::sys::jobject) };
    let mut env = vm.attach_current_thread().map_err(|e| e.to_string())?;
    f(&mut env, activity)
}

fn call_activity_void(method: &str, sig: &str, args: &[JValue]) -> Result<(), String> {
    with_main_activity(|env, activity| {
        env.call_method(&activity, method, sig, args)
            .map_err(|e| e.to_string())?;
        Ok(())
    })
}

fn call_activity_bool(method: &str, sig: &str, args: &[JValue]) -> Result<bool, String> {
    with_main_activity(|env, activity| {
        let value = env
            .call_method(&activity, method, sig, args)
            .map_err(|e| e.to_string())?
            .z()
            .map_err(|e| e.to_string())?;
        Ok(value)
    })
}

fn call_activity_string(method: &str, sig: &str, args: &[JValue]) -> Result<String, String> {
    with_main_activity(|env, activity| {
        let obj = env
            .call_method(&activity, method, sig, args)
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;
        if obj.is_null() {
            return Err(format!("{method} returned null"));
        }
        let jstr = env
            .get_string((&obj).into())
            .map_err(|e| e.to_string())?;
        Ok(jstr.to_string_lossy().into_owned())
    })
}

#[tauri::command]
pub fn android_set_system_status_bar_visible(visible: bool) -> Result<(), String> {
    call_activity_void(
        "setSystemStatusBarVisible",
        "(Z)V",
        &[JValue::Bool(u8::from(visible))],
    )
}

#[tauri::command]
pub fn android_is_system_status_bar_visible() -> Result<bool, String> {
    call_activity_bool("isSystemStatusBarVisible", "()Z", &[])
}

#[tauri::command]
pub fn android_primary_abi() -> Result<String, String> {
    call_activity_string("primaryAbi", "()Ljava/lang/String;", &[])
}

#[tauri::command]
pub fn android_install_apk(path: String) -> Result<(), String> {
    with_main_activity(|env, activity| {
        let path_j = env.new_string(&path).map_err(|e| e.to_string())?;
        let ok = env
            .call_method(
                &activity,
                "installApk",
                "(Ljava/lang/String;)Z",
                &[JValue::Object(&path_j)],
            )
            .map_err(|e| e.to_string())?
            .z()
            .map_err(|e| e.to_string())?;
        if ok {
            Ok(())
        } else {
            Err(format!("installApk failed for {path}"))
        }
    })
}

/// Download an APK URL into app cache and launch the system package installer.
#[tauri::command]
pub async fn android_download_and_install_apk(
    app: AppHandle,
    url: String,
    file_name: String,
) -> Result<String, String> {
    if !url.starts_with("https://") {
        return Err("APK download URL must be https".into());
    }
    let safe_name = file_name
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || c == '.' || c == '_' || c == '-' {
                c
            } else {
                '_'
            }
        })
        .collect::<String>();
    if safe_name.is_empty() || !safe_name.ends_with(".apk") {
        return Err("invalid APK file name".into());
    }

    let cache_dir: PathBuf = app
        .path()
        .app_cache_dir()
        .map_err(|e| e.to_string())?
        .join("apk-updates");
    std::fs::create_dir_all(&cache_dir).map_err(|e| e.to_string())?;
    let dest = cache_dir.join(&safe_name);

    let client = reqwest::Client::builder()
        .redirect(reqwest::redirect::Policy::limited(10))
        .build()
        .map_err(|e| e.to_string())?;
    let response = client
        .get(&url)
        .header(
            reqwest::header::USER_AGENT,
            "DocuHaim-Android-Updater/1.0",
        )
        .send()
        .await
        .map_err(|e| format!("download failed: {e}"))?;
    if !response.status().is_success() {
        return Err(format!("download HTTP {}", response.status()));
    }
    let bytes = response
        .bytes()
        .await
        .map_err(|e| format!("read body failed: {e}"))?;
    if bytes.len() < 1024 {
        return Err("downloaded APK looks too small".into());
    }

    {
        let mut file = File::create(&dest).map_err(|e| e.to_string())?;
        file.write_all(&bytes).map_err(|e| e.to_string())?;
        file.flush().map_err(|e| e.to_string())?;
    }

    let path_str = dest.to_string_lossy().into_owned();
    android_install_apk(path_str.clone())?;
    Ok(path_str)
}
