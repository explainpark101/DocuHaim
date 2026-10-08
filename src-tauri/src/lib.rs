mod as_index;
#[cfg(target_os = "android")]
mod android_native;
#[cfg(desktop)]
mod desktop_menu;
mod stronghold_kdf;
mod system_fonts;

#[cfg(any(target_os = "macos", target_os = "ios", target_os = "android"))]
use std::path::PathBuf;
use std::sync::Mutex;

use reqwest::header::{HeaderMap, HeaderValue, CONTENT_TYPE};
use serde::Serialize;
use tauri::{AppHandle, Emitter, Manager, RunEvent};
#[cfg(target_os = "windows")]
use tauri::WindowEvent;
use url::Url;

const GEMINI_ORIGIN: &str = "https://generativelanguage.googleapis.com";

#[derive(Serialize)]
struct GeminiFetchResult {
    status: u16,
    body: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    content_type: Option<String>,
}

fn validate_gemini_path(path: &str) -> Result<(), String> {
    let pathname = path.split('?').next().unwrap_or(path);
    if !pathname.starts_with("/v1beta/") {
        return Err("Invalid Gemini API path".into());
    }
    Ok(())
}

#[tauri::command]
fn exit_app(app: AppHandle) {
    app.exit(0);
}

#[tauri::command]
async fn gemini_api_fetch(
    path: String,
    method: String,
    api_key: String,
    body: Option<String>,
) -> Result<GeminiFetchResult, String> {
    validate_gemini_path(&path)?;

    let url = format!("{}{}", GEMINI_ORIGIN, path);
    let client = reqwest::Client::new();
    let mut headers = HeaderMap::new();
    let key = api_key.trim();
    if !key.is_empty() {
        headers.insert(
            "x-goog-api-key",
            HeaderValue::from_str(key).map_err(|e| e.to_string())?,
        );
    }

    let method_upper = method.to_uppercase();
    let http_method =
        reqwest::Method::from_bytes(method_upper.as_bytes()).map_err(|e| e.to_string())?;

    let mut request = client.request(http_method, &url).headers(headers);
    if let Some(payload) = body {
        request = request
            .header(CONTENT_TYPE, "application/json")
            .body(payload);
    }

    let response = request.send().await.map_err(|e| e.to_string())?;
    let status = response.status().as_u16();
    let content_type = response
        .headers()
        .get(CONTENT_TYPE)
        .and_then(|value| value.to_str().ok())
        .map(str::to_owned);
    let body = response.text().await.map_err(|e| e.to_string())?;

    Ok(GeminiFetchResult {
        status,
        body,
        content_type,
    })
}

struct PendingOpenPaths(Mutex<Vec<String>>);

impl PendingOpenPaths {
    #[cfg(any(target_os = "macos", target_os = "ios", target_os = "android"))]
    fn extend_unique(&self, paths: &[String]) {
        if let Ok(mut guard) = self.0.lock() {
            for p in paths {
                if !guard.iter().any(|x| x == p) {
                    guard.push(p.clone());
                }
            }
        }
    }

    fn take_all(&self) -> Vec<String> {
        self.0
            .lock()
            .map(|mut g| std::mem::take(&mut *g))
            .unwrap_or_default()
    }

    fn snapshot(&self) -> Vec<String> {
        self.0.lock().map(|g| g.clone()).unwrap_or_default()
    }
}

/// Android share-sheet payload (chat share_target intake).
#[cfg(target_os = "android")]
#[derive(Clone, Serialize, Default)]
#[serde(rename_all = "camelCase")]
struct AndroidSharePayload {
    title: String,
    text: String,
    urls: Vec<String>,
}

#[cfg(target_os = "android")]
struct PendingAndroidShare(Mutex<Option<AndroidSharePayload>>);

#[cfg(target_os = "android")]
impl PendingAndroidShare {
    fn push(&self, payload: AndroidSharePayload) {
        if let Ok(mut guard) = self.0.lock() {
            *guard = Some(payload);
        }
    }

    fn take(&self) -> Option<AndroidSharePayload> {
        self.0.lock().ok().and_then(|mut g| g.take())
    }
}

#[cfg(target_os = "android")]
fn percent_decode_utf8(input: &str) -> Option<String> {
    let bytes = input.as_bytes();
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'%' && i + 2 < bytes.len() {
            let h = (bytes[i + 1] as char).to_digit(16)?;
            let l = (bytes[i + 2] as char).to_digit(16)?;
            out.push((h * 16 + l) as u8);
            i += 3;
            continue;
        }
        out.push(bytes[i]);
        i += 1;
    }
    String::from_utf8(out).ok()
}

#[cfg(target_os = "android")]
fn decode_data_text_plain(url: &str) -> Option<String> {
    let trimmed = url.trim();
    let rest = trimmed.strip_prefix("data:text/plain")?;
    let comma = rest.find(',')?;
    let meta = &rest[..comma];
    let data = &rest[comma + 1..];
    if meta.contains(";base64") {
        return None;
    }
    // tao percent-encodes EXTRA_TEXT into data:text/plain,<encoded>
    let decoded = percent_decode_utf8(data)?;
    if decoded.is_empty() {
        None
    } else {
        Some(decoded)
    }
}

#[cfg(target_os = "android")]
fn push_android_share(app: &AppHandle, mut payload: AndroidSharePayload) {
    if payload.text.is_empty() {
        for url in &payload.urls {
            if let Some(text) = decode_data_text_plain(url) {
                payload.text = text;
                break;
            }
        }
    }
    payload.urls.retain(|u| {
        let t = u.trim();
        !t.is_empty() && !t.starts_with("data:text/plain")
    });
    if payload.title.is_empty() && payload.text.is_empty() && payload.urls.is_empty() {
        return;
    }
    if let Some(state) = app.try_state::<PendingAndroidShare>() {
        state.push(payload.clone());
    }
    let _ = app.emit("android-share-target", payload);
}

fn path_from_url_or_raw(s: &str) -> Option<String> {
    let trimmed = s.trim();
    if trimmed.is_empty() {
        return None;
    }
    if let Ok(url) = Url::parse(trimmed) {
        if url.scheme() == "file" {
            return url
                .to_file_path()
                .ok()
                .map(|p| p.to_string_lossy().into_owned());
        }
        // Keep content:// (Android) and other URI schemes for the frontend / reader.
        if url.scheme() == "content" || url.scheme() == "http" || url.scheme() == "https" {
            return Some(trimmed.to_string());
        }
    }
    Some(trimmed.to_string())
}

fn looks_like_markdown_path(p: &str) -> bool {
    let lower = p.to_ascii_lowercase();
    let path_only = lower.split('?').next().unwrap_or(&lower);
    path_only.ends_with(".md")
        || path_only.ends_with(".markdown")
        || lower.contains("text/markdown")
        || lower.contains("text%2fmarkdown")
}

fn collect_cli_file_args() -> Vec<String> {
    std::env::args()
        .skip(1)
        .filter_map(|arg| {
            if arg.starts_with('-') {
                return None;
            }
            path_from_url_or_raw(&arg).filter(|p| looks_like_markdown_path(p))
        })
        .collect()
}

/// Read bytes for an OS-open path (absolute file path or Android content:// URI).
#[tauri::command]
fn read_open_uri(path: String) -> Result<Vec<u8>, String> {
    let trimmed = path.trim();
    if trimmed.is_empty() {
        return Err("empty path".into());
    }
    if trimmed.starts_with("content:") {
        #[cfg(target_os = "android")]
        {
            return read_android_content_uri(trimmed);
        }
        #[cfg(not(target_os = "android"))]
        {
            return Err("content:// URIs are only supported on Android".into());
        }
    }
    let file_path = path_from_url_or_raw(trimmed).unwrap_or_else(|| trimmed.to_string());
    std::fs::read(&file_path).map_err(|e| format!("failed to read {file_path}: {e}"))
}

#[cfg(target_os = "android")]
fn read_android_content_uri(uri: &str) -> Result<Vec<u8>, String> {
    use jni::objects::JValue;

    android_native::with_main_activity(|env, activity| {
        let uri_jstr = env.new_string(uri).map_err(|e| e.to_string())?;
        let uri_class = env
            .find_class("android/net/Uri")
            .map_err(|e| e.to_string())?;
        let parsed_uri = env
            .call_static_method(
                uri_class,
                "parse",
                "(Ljava/lang/String;)Landroid/net/Uri;",
                &[JValue::Object(&uri_jstr)],
            )
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;

        let resolver = env
            .call_method(
                activity,
                "getContentResolver",
                "()Landroid/content/ContentResolver;",
                &[],
            )
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;

        let input_stream = env
            .call_method(
                &resolver,
                "openInputStream",
                "(Landroid/net/Uri;)Ljava/io/InputStream;",
                &[JValue::Object(&parsed_uri)],
            )
            .map_err(|e| e.to_string())?
            .l()
            .map_err(|e| e.to_string())?;

        if input_stream.is_null() {
            return Err(format!("openInputStream returned null for {uri}"));
        }

        let mut out = Vec::new();
        let buf = env.new_byte_array(8192).map_err(|e| e.to_string())?;
        loop {
            let n = env
                .call_method(&input_stream, "read", "([B)I", &[(&buf).into()])
                .map_err(|e| e.to_string())?
                .i()
                .map_err(|e| e.to_string())?;
            if n <= 0 {
                break;
            }
            let mut chunk = vec![0i8; n as usize];
            env.get_byte_array_region(&buf, 0, &mut chunk)
                .map_err(|e| e.to_string())?;
            out.extend(chunk.into_iter().map(|b| b as u8));
        }
        let _ = env.call_method(&input_stream, "close", "()V", &[]);
        Ok(out)
    })
}

/// Queue + emit paths from OS "open with" / file-association URLs (not CLI args).
#[cfg(any(target_os = "macos", target_os = "ios", target_os = "android"))]
fn push_paths(app: &AppHandle, paths: Vec<String>) {
    if paths.is_empty() {
        return;
    }
    if let Some(state) = app.try_state::<PendingOpenPaths>() {
        state.extend_unique(&paths);
    }
    let _ = app.emit("desktop-open-files", paths);
}

#[tauri::command]
fn take_pending_open_paths(state: tauri::State<'_, PendingOpenPaths>) -> Vec<String> {
    state.take_all()
}

#[cfg(target_os = "android")]
#[tauri::command]
fn take_pending_android_share(
    state: tauri::State<'_, PendingAndroidShare>,
) -> Option<AndroidSharePayload> {
    state.take()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let pending = PendingOpenPaths(Mutex::new(collect_cli_file_args()));

    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init());

    #[cfg(not(mobile))]
    {
        builder = builder.plugin(tauri_plugin_biometry::init());
        builder = builder
            .plugin(tauri_plugin_updater::Builder::new().build())
            .plugin(tauri_plugin_process::init());
    }

    #[cfg(mobile)]
    {
        builder = builder.plugin(tauri_plugin_biometric::init());
    }

    // Native File/Window menu APIs are desktop-only (`tauri::menu` is #[cfg(desktop)]).
    #[cfg(desktop)]
    {
        builder = builder
            .manage(pending)
            .manage(as_index::AsIndexState::new())
            .invoke_handler(tauri::generate_handler![
                take_pending_open_paths,
                read_open_uri,
                gemini_api_fetch,
                exit_app,
                system_fonts::list_system_font_families,
                desktop_menu::sync_desktop_menu_ui,
                as_index::commands::as_index_open,
                as_index::commands::as_index_open_from_file,
                as_index::commands::as_index_open_from_directory,
                as_index::commands::as_index_materialize_snapshot_to_directory,
                as_index::commands::as_index_migrate_gzip_to_directory,
                as_index::commands::as_index_unpack_snapshot_files,
                as_index::commands::as_index_close,
                as_index::commands::as_index_upsert_batch,
                as_index::commands::as_index_remove,
                as_index::commands::as_index_commit,
                as_index::commands::as_index_export_snapshot,
                as_index::commands::as_index_search,
                as_index::commands::as_index_cancel,
            ])
            .on_menu_event(desktop_menu::on_desktop_menu_event);
    }

    #[cfg(all(mobile, not(target_os = "android")))]
    {
        builder = builder
            .manage(pending)
            .manage(as_index::AsIndexState::new())
            .invoke_handler(tauri::generate_handler![
                take_pending_open_paths,
                read_open_uri,
                gemini_api_fetch,
                exit_app,
                system_fonts::list_system_font_families,
                as_index::commands::as_index_open,
                as_index::commands::as_index_open_from_file,
                as_index::commands::as_index_open_from_directory,
                as_index::commands::as_index_materialize_snapshot_to_directory,
                as_index::commands::as_index_migrate_gzip_to_directory,
                as_index::commands::as_index_unpack_snapshot_files,
                as_index::commands::as_index_close,
                as_index::commands::as_index_upsert_batch,
                as_index::commands::as_index_remove,
                as_index::commands::as_index_commit,
                as_index::commands::as_index_export_snapshot,
                as_index::commands::as_index_search,
                as_index::commands::as_index_cancel,
            ]);
    }

    #[cfg(target_os = "android")]
    {
        builder = builder
            .manage(pending)
            .manage(PendingAndroidShare(Mutex::new(None)))
            .manage(as_index::AsIndexState::new())
            .invoke_handler(tauri::generate_handler![
                take_pending_open_paths,
                take_pending_android_share,
                read_open_uri,
                gemini_api_fetch,
                exit_app,
                system_fonts::list_system_font_families,
                as_index::commands::as_index_open,
                as_index::commands::as_index_open_from_file,
                as_index::commands::as_index_open_from_directory,
                as_index::commands::as_index_materialize_snapshot_to_directory,
                as_index::commands::as_index_migrate_gzip_to_directory,
                as_index::commands::as_index_unpack_snapshot_files,
                as_index::commands::as_index_close,
                as_index::commands::as_index_upsert_batch,
                as_index::commands::as_index_remove,
                as_index::commands::as_index_commit,
                as_index::commands::as_index_export_snapshot,
                as_index::commands::as_index_search,
                as_index::commands::as_index_cancel,
                android_native::android_set_system_status_bar_visible,
                android_native::android_is_system_status_bar_visible,
                android_native::android_primary_abi,
                android_native::android_open_external_url,
                android_native::android_install_apk,
                android_native::android_download_and_install_apk,
            ]);
    }

    builder
        .setup(|app| {
            // Windows: borderless custom titlebar (also set in tauri.windows.conf.json).
            // macOS keeps decorations so Overlay traffic lights remain available.
            #[cfg(target_os = "windows")]
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.set_decorations(false);
            }

            #[cfg(desktop)]
            {
                if let Err(err) = desktop_menu::install_desktop_menu(app) {
                    eprintln!("desktop menu install failed: {err}");
                }
            }

            let data_dir = app.path().app_local_data_dir().map_err(|e| e.to_string())?;
            std::fs::create_dir_all(&data_dir).map_err(|e| e.to_string())?;
            let salt_path = data_dir.join("stronghold-salt.txt");
            let salt_path_for_hash = salt_path.clone();
            app.handle().plugin(
                tauri_plugin_stronghold::Builder::new(move |password| {
                    stronghold_kdf::hash_password(password, &salt_path_for_hash)
                })
                .build(),
            )?;
            if let Some(state) = app.try_state::<PendingOpenPaths>() {
                let paths = state.snapshot();
                if !paths.is_empty() {
                    let handle = app.handle().clone();
                    // Defer emit until the webview is ready to listen.
                    std::thread::spawn(move || {
                        std::thread::sleep(std::time::Duration::from_millis(800));
                        let _ = handle.emit("desktop-open-files", paths);
                    });
                }
            }
            #[cfg(target_os = "android")]
            if let Some(state) = app.try_state::<PendingAndroidShare>() {
                if let Some(payload) = state.take() {
                    let handle = app.handle().clone();
                    std::thread::spawn(move || {
                        std::thread::sleep(std::time::Duration::from_millis(800));
                        // Re-queue so take_pending_android_share still works if the
                        // deferred emit races the frontend listener.
                        if let Some(pending) = handle.try_state::<PendingAndroidShare>() {
                            pending.push(payload.clone());
                        }
                        let _ = handle.emit("android-share-target", payload);
                    });
                }
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building DocuHaim")
        .run(|app_handle, event| {
            match event {
                // File associations / Android share: macOS / iOS / Android deliver URLs here.
                #[cfg(any(target_os = "macos", target_os = "ios", target_os = "android"))]
                RunEvent::Opened { urls } => {
                    #[cfg(target_os = "android")]
                    {
                        let was_share = android_native::consume_last_intent_was_share();
                        if was_share {
                            let title = android_native::take_pending_share_title();
                            let text = android_native::take_pending_share_text();
                            let share_urls: Vec<String> =
                                urls.iter().map(|u| u.as_str().to_string()).collect();
                            push_android_share(
                                app_handle,
                                AndroidSharePayload {
                                    title,
                                    text,
                                    urls: share_urls,
                                },
                            );
                        } else {
                            let paths: Vec<String> = urls
                                .iter()
                                .filter_map(|u| {
                                    if u.scheme() == "file" {
                                        u.to_file_path().ok().map(|p: PathBuf| {
                                            p.to_string_lossy().into_owned()
                                        })
                                    } else {
                                        path_from_url_or_raw(u.as_str())
                                    }
                                })
                                .filter(|p| {
                                    looks_like_markdown_path(p) || p.starts_with("content:")
                                })
                                .collect();
                            push_paths(app_handle, paths);
                        }
                    }
                    #[cfg(not(target_os = "android"))]
                    {
                        let paths: Vec<String> = urls
                            .iter()
                            .filter_map(|u| {
                                if u.scheme() == "file" {
                                    u.to_file_path()
                                        .ok()
                                        .map(|p: PathBuf| p.to_string_lossy().into_owned())
                                } else {
                                    path_from_url_or_raw(u.as_str())
                                }
                            })
                            .filter(|p| looks_like_markdown_path(p) || p.starts_with("content:"))
                            .collect();
                        push_paths(app_handle, paths);
                    }
                }
                #[cfg(target_os = "macos")]
                RunEvent::Reopen {
                    has_visible_windows,
                    ..
                } => {
                    if !has_visible_windows {
                        if let Some(window) = app_handle.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                }
                // Windows: closing the main window must kill the process. WebView2
                // beforeunload can leave a headless runtime after the HWND is gone.
                #[cfg(target_os = "windows")]
                RunEvent::WindowEvent {
                    label,
                    event: WindowEvent::Destroyed,
                    ..
                } => {
                    if label == "main" {
                        app_handle.exit(0);
                    }
                }
                _ => {}
            }
        });
}
