mod stronghold_kdf;

use std::path::PathBuf;
use std::sync::Mutex;

use reqwest::header::{HeaderMap, HeaderValue, CONTENT_TYPE};
use serde::Serialize;
use tauri::{AppHandle, Emitter, Manager, RunEvent};
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
    }
    Some(trimmed.to_string())
}

fn collect_cli_file_args() -> Vec<String> {
    std::env::args()
        .skip(1)
        .filter_map(|arg| {
            if arg.starts_with('-') {
                return None;
            }
            path_from_url_or_raw(&arg).filter(|p| {
                let lower = p.to_ascii_lowercase();
                lower.ends_with(".md") || lower.ends_with(".markdown")
            })
        })
        .collect()
}

fn push_paths(app: &AppHandle, paths: Vec<String>) {
    if paths.is_empty() {
        return;
    }
    if let Some(state) = app.try_state::<PendingOpenPaths>() {
        if let Ok(mut guard) = state.0.lock() {
            for p in &paths {
                if !guard.iter().any(|x| x == p) {
                    guard.push(p.clone());
                }
            }
        }
    }
    let _ = app.emit("desktop-open-files", paths);
}

#[tauri::command]
fn take_pending_open_paths(state: tauri::State<'_, PendingOpenPaths>) -> Vec<String> {
    state
        .0
        .lock()
        .map(|mut g| std::mem::take(&mut *g))
        .unwrap_or_default()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let pending = PendingOpenPaths(Mutex::new(collect_cli_file_args()));

    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init());

    #[cfg(not(mobile))]
    {
        builder = builder.plugin(tauri_plugin_biometry::init());
    }

    #[cfg(mobile)]
    {
        builder = builder.plugin(tauri_plugin_biometric::init());
    }

    builder
        .manage(pending)
        .invoke_handler(tauri::generate_handler![
            take_pending_open_paths,
            gemini_api_fetch
        ])
        .setup(|app| {
            let data_dir = app
                .path()
                .app_local_data_dir()
                .map_err(|e| e.to_string())?;
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
                if let Ok(guard) = state.0.lock() {
                    if !guard.is_empty() {
                        let paths = guard.clone();
                        let handle = app.handle().clone();
                        // Defer emit until the webview is ready to listen.
                        std::thread::spawn(move || {
                            std::thread::sleep(std::time::Duration::from_millis(800));
                            let _ = handle.emit("desktop-open-files", paths);
                        });
                    }
                }
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building DocuHaim")
        .run(|app_handle, event| {
            match event {
                // RunEvent::Opened exists only on macOS / iOS (NSApplication open URLs).
                #[cfg(any(target_os = "macos", target_os = "ios"))]
                RunEvent::Opened { urls } => {
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
                        .collect();
                    push_paths(app_handle, paths);
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
                _ => {}
            }
        });
}
