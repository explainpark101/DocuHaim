use std::path::PathBuf;
use std::sync::Mutex;

use tauri::{AppHandle, Emitter, Manager, RunEvent};
use url::Url;

struct PendingOpenPaths(Mutex<Vec<String>>);

fn path_from_url_or_raw(s: &str) -> Option<String> {
  let trimmed = s.trim();
  if trimmed.is_empty() {
    return None;
  }
  if let Ok(url) = Url::parse(trimmed) {
    if url.scheme() == "file" {
      return url.to_file_path().ok().map(|p| p.to_string_lossy().into_owned());
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
  state.0.lock().map(|mut g| std::mem::take(&mut *g)).unwrap_or_default()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let pending = PendingOpenPaths(Mutex::new(collect_cli_file_args()));

  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_biometry::init())
    .manage(pending)
    .invoke_handler(tauri::generate_handler![take_pending_open_paths])
    .setup(|app| {
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
                u.to_file_path().ok().map(|p: PathBuf| p.to_string_lossy().into_owned())
              } else {
                path_from_url_or_raw(u.as_str())
              }
            })
            .collect();
          push_paths(app_handle, paths);
        }
        #[cfg(target_os = "macos")]
        RunEvent::Reopen { has_visible_windows, .. } => {
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
