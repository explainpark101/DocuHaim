//! Android-only JNI helpers: system status bar, ABI, APK install / download.
//!
//! Uses tao's process-wide activity context (`main_android_context`), not the
//! `ndk-context` crate. Modern Tauri/wry never call `ndk_context::initialize`,
//! so `ndk_context::android_context()` panics and aborts IPC (`panic = "abort"`).

use std::fs::File;
use std::io::Write;
use std::path::PathBuf;
use std::time::{Duration, Instant};

use jni::objects::{JObject, JValue};
use jni::JavaVM;
use serde::Serialize;
use tauri::tao::platform::android::prelude::main_android_context;
use tauri::{AppHandle, Emitter, Manager};

/// Borrow the process-wide Android activity jobject without deleting it on Drop.
///
/// The jobject from tao is a shared handle (not an owned local ref). Wrapping it
/// in `JObject` and letting Drop run would call `DeleteLocalRef` on that shared
/// pointer and can abort the process.
pub(crate) fn with_main_activity<T, F>(f: F) -> Result<T, String>
where
    F: FnOnce(&mut jni::JNIEnv, &JObject) -> Result<T, String>,
{
    let ctx = main_android_context()
        .ok_or_else(|| "Android activity context is not ready".to_string())?;
    let vm = unsafe { JavaVM::from_raw(ctx.java_vm.cast()) }.map_err(|e| e.to_string())?;
    let activity = unsafe { JObject::from_raw(ctx.context_jobject as jni::sys::jobject) };
    let mut env = vm.attach_current_thread().map_err(|e| e.to_string())?;
    let result = f(&mut env, &activity);
    // Do not DeleteLocalRef the shared activity jobject.
    std::mem::forget(activity);
    result
}

fn call_activity_bool(method: &str, sig: &str, args: &[JValue]) -> Result<bool, String> {
    with_main_activity(|env, activity| {
        let value = env
            .call_method(activity, method, sig, args)
            .map_err(|e| e.to_string())?
            .z()
            .map_err(|e| e.to_string())?;
        Ok(value)
    })
}

fn map_install_status(status: String, context: &str) -> Result<(), String> {
    match status.as_str() {
        "ok" => Ok(()),
        "need_unknown_sources" => Err("NEED_UNKNOWN_SOURCES".into()),
        other => Err(format!("{context}: {other}")),
    }
}

fn call_activity_string(method: &str, sig: &str, args: &[JValue]) -> Result<String, String> {
    with_main_activity(|env, activity| {
        let obj = env
            .call_method(activity, method, sig, args)
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

fn call_main_activity_static_bool(method: &str) -> bool {
    with_main_activity(|env, _activity| {
        let class = env
            .find_class("com/docuhaim/app/MainActivity")
            .map_err(|e| e.to_string())?;
        let value = env
            .call_static_method(class, method, "()Z", &[])
            .map_err(|e| e.to_string())?
            .z()
            .map_err(|e| e.to_string())?;
        Ok(value)
    })
    .unwrap_or(false)
}

fn call_main_activity_static_string(method: &str) -> String {
    with_main_activity(|env, _activity| {
        let class = env
            .find_class("com/docuhaim/app/MainActivity")
            .map_err(|e| e.to_string())?;
        let obj = env
            .call_static_method(class, method, "()Ljava/lang/String;", &[])
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;
        if obj.is_null() {
            return Ok(String::new());
        }
        let jstr = env
            .get_string((&obj).into())
            .map_err(|e| e.to_string())?;
        Ok(jstr.to_string_lossy().into_owned())
    })
    .unwrap_or_default()
}

/// Whether the last activity Intent was ACTION_SEND / SEND_MULTIPLE (consumes the flag).
pub fn consume_last_intent_was_share() -> bool {
    call_main_activity_static_bool("consumeLastIntentWasShare")
}

pub fn take_pending_share_text() -> String {
    call_main_activity_static_string("takePendingShareText")
}

pub fn take_pending_share_title() -> String {
    call_main_activity_static_string("takePendingShareTitle")
}

/// Share target mode from activity-alias (`sendSelf` | `chooseGroup` | `choose`).
pub fn take_pending_share_mode() -> String {
    call_main_activity_static_string("takePendingShareMode")
}

/// EXTRA_STREAM URIs joined by newline.
pub fn take_pending_share_uris() -> String {
    call_main_activity_static_string("takePendingShareUris")
}

/// Show/hide the system status bar. Returns status-bar inset top in px
/// (0 when hidden) for CSS `--android-safe-top` padding.
#[tauri::command]
pub fn android_set_system_status_bar_visible(visible: bool) -> Result<i32, String> {
    with_main_activity(|env, activity| {
        let value = env
            .call_method(
                activity,
                "setSystemStatusBarVisible",
                "(Z)I",
                &[JValue::Bool(u8::from(visible))],
            )
            .map_err(|e| e.to_string())?
            .i()
            .map_err(|e| e.to_string())?;
        Ok(value)
    })
}

#[tauri::command]
pub fn android_is_system_status_bar_visible() -> Result<bool, String> {
    call_activity_bool("isSystemStatusBarVisible", "()Z", &[])
}

#[tauri::command]
pub fn android_primary_abi() -> Result<String, String> {
    call_activity_string("primaryAbi", "()Ljava/lang/String;", &[])
}

/// Open a URL in the system browser / default handler (Android Activity Intent).
#[tauri::command]
pub fn android_open_external_url(url: String) -> Result<(), String> {
    let trimmed = url.trim();
    if trimmed.is_empty() {
        return Err("empty url".into());
    }
    let lower = trimmed.to_ascii_lowercase();
    let allowed = lower.starts_with("https://")
        || lower.starts_with("http://")
        || lower.starts_with("mailto:")
        || lower.starts_with("tel:");
    if !allowed {
        return Err(format!("unsupported url scheme: {trimmed}"));
    }

    let status = with_main_activity(|env, activity| {
        let url_j = env.new_string(trimmed).map_err(|e| e.to_string())?;
        let obj = env
            .call_method(
                activity,
                "openExternalUrl",
                "(Ljava/lang/String;)Ljava/lang/String;",
                &[JValue::Object(&url_j)],
            )
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;
        if obj.is_null() {
            return Err("openExternalUrl returned null".into());
        }
        let jstr = env.get_string((&obj).into()).map_err(|e| e.to_string())?;
        Ok(jstr.to_string_lossy().into_owned())
    })?;

    if status == "ok" {
        Ok(())
    } else {
        Err(status)
    }
}

#[tauri::command]
pub fn android_install_apk(path: String) -> Result<(), String> {
    android_ensure_install_permission()?;
    let status = with_main_activity(|env, activity| {
        let path_j = env.new_string(&path).map_err(|e| e.to_string())?;
        let obj = env
            .call_method(
                activity,
                "installApk",
                "(Ljava/lang/String;)Ljava/lang/String;",
                &[JValue::Object(&path_j)],
            )
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;
        if obj.is_null() {
            return Err("installApk returned null".into());
        }
        let jstr = env.get_string((&obj).into()).map_err(|e| e.to_string())?;
        Ok(jstr.to_string_lossy().into_owned())
    })?;
    map_install_status(status, &format!("installApk failed for {path}"))
}

fn android_ensure_install_permission() -> Result<(), String> {
    let status = call_activity_string("ensureInstallPermission", "()Ljava/lang/String;", &[])?;
    map_install_status(status, "ensureInstallPermission failed")
}

#[derive(Debug, Serialize, Clone)]
struct AndroidApkDownloadProgress {
    downloaded: u64,
    total: Option<u64>,
    /// 0–100 when Content-Length is known; omitted when unknown.
    percent: Option<u8>,
}

fn sanitize_apk_file_name(file_name: &str) -> Result<String, String> {
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
    Ok(safe_name)
}

fn emit_apk_download_progress(
    app: &AppHandle,
    downloaded: u64,
    total: Option<u64>,
) {
    let percent = total.and_then(|t| {
        if t == 0 {
            None
        } else {
            Some(((downloaded as f64 / t as f64) * 100.0).floor().min(100.0) as u8)
        }
    });
    let _ = app.emit(
        "android-apk-download-progress",
        AndroidApkDownloadProgress {
            downloaded,
            total,
            percent,
        },
    );
}

/// Download an APK URL into app cache. Emits `android-apk-download-progress` while reading.
async fn download_apk_to_cache(
    app: &AppHandle,
    url: &str,
    file_name: &str,
) -> Result<String, String> {
    if !url.starts_with("https://") {
        return Err("APK download URL must be https".into());
    }
    let safe_name = sanitize_apk_file_name(file_name)?;

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
    let mut response = client
        .get(url)
        .header(
            reqwest::header::USER_AGENT,
            "DocuHaim-Android-Updater/1.0",
        )
        .header(
            reqwest::header::ACCEPT,
            "application/octet-stream,application/vnd.android.package-archive,*/*",
        )
        .send()
        .await
        .map_err(|e| format!("download failed: {e}"))?;
    if !response.status().is_success() {
        return Err(format!("download HTTP {}", response.status()));
    }

    let total = response.content_length();
    emit_apk_download_progress(app, 0, total);

    let mut file = File::create(&dest).map_err(|e| e.to_string())?;
    let mut written: u64 = 0;
    let mut last_emit = Instant::now() - Duration::from_millis(200);
    let mut last_percent: Option<u8> = None;
    loop {
        match response.chunk().await {
            Ok(Some(chunk)) => {
                file.write_all(&chunk).map_err(|e| e.to_string())?;
                written += chunk.len() as u64;
                let percent = total.and_then(|t| {
                    if t == 0 {
                        None
                    } else {
                        Some(((written as f64 / t as f64) * 100.0).floor().min(100.0) as u8)
                    }
                });
                let percent_changed = percent != last_percent;
                let due = last_emit.elapsed() >= Duration::from_millis(150);
                if percent_changed || due {
                    emit_apk_download_progress(app, written, total);
                    last_emit = Instant::now();
                    last_percent = percent;
                }
            }
            Ok(None) => break,
            Err(e) => return Err(format!("read body failed: {e}")),
        }
    }
    file.flush().map_err(|e| e.to_string())?;
    drop(file);
    if written < 1024 {
        let _ = std::fs::remove_file(&dest);
        return Err("downloaded APK looks too small".into());
    }

    emit_apk_download_progress(app, written, total.or(Some(written)));
    Ok(dest.to_string_lossy().into_owned())
}

/// Download an APK into cache only (app stays usable; install separately).
#[tauri::command]
pub async fn android_download_apk(
    app: AppHandle,
    url: String,
    file_name: String,
) -> Result<String, String> {
    download_apk_to_cache(&app, &url, &file_name).await
}

/// Download an APK URL into app cache and launch the system package installer.
#[tauri::command]
pub async fn android_download_and_install_apk(
    app: AppHandle,
    url: String,
    file_name: String,
) -> Result<String, String> {
    let path_str = download_apk_to_cache(&app, &url, &file_name).await?;
    android_install_apk(path_str.clone())?;
    Ok(path_str)
}
