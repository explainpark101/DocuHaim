//! Tauri commands for the native Advanced Search index.

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter, Manager, State};

use super::search::SearchHitDto;
use super::session::SessionStore;

pub struct AsIndexState(pub Mutex<Option<Arc<SessionStore>>>);

impl AsIndexState {
    pub fn new() -> Self {
        Self(Mutex::new(None))
    }

    pub fn ensure_store(&self, app: &AppHandle) -> Result<Arc<SessionStore>, String> {
        let mut guard = self
            .0
            .lock()
            .map_err(|_| "as-index state lock poisoned".to_string())?;
        if let Some(store) = guard.as_ref() {
            return Ok(Arc::clone(store));
        }
        let cache = app
            .path()
            .app_cache_dir()
            .map_err(|e| format!("app_cache_dir: {e}"))?;
        let work_root = cache.join("as-index-work");
        std::fs::create_dir_all(&work_root)
            .map_err(|e| format!("cannot create as-index-work: {e}"))?;
        let store = Arc::new(SessionStore::new(work_root));
        *guard = Some(Arc::clone(&store));
        Ok(store)
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpsertDoc {
    pub numeric_id: u64,
    pub fields: HashMap<String, String>,
}

#[derive(Debug, Serialize, Clone)]
struct AsIndexLogEvent {
    level: String,
    message: String,
}

#[derive(Debug, Serialize, Clone)]
struct AsIndexProgressEvent {
    processed: u64,
    total: u64,
    phase: String,
}

fn emit_log(app: &AppHandle, level: &str, message: impl Into<String>) {
    let _ = app.emit(
        "as-index-log",
        AsIndexLogEvent {
            level: level.to_string(),
            message: message.into(),
        },
    );
}

#[tauri::command]
pub fn as_index_open(
    app: AppHandle,
    state: State<'_, AsIndexState>,
    snapshot: Option<Vec<u8>>,
) -> Result<String, String> {
    let store = state.ensure_store(&app)?;
    let session_id = store.open(snapshot)?;
    emit_log(
        &app,
        "info",
        format!("opened native index session {session_id}"),
    );
    Ok(session_id)
}

#[tauri::command]
pub fn as_index_close(
    app: AppHandle,
    state: State<'_, AsIndexState>,
    session_id: String,
) -> Result<(), String> {
    let store = state.ensure_store(&app)?;
    store.close(&session_id)?;
    emit_log(
        &app,
        "info",
        format!("closed native index session {session_id}"),
    );
    Ok(())
}

#[tauri::command]
pub async fn as_index_upsert_batch(
    app: AppHandle,
    state: State<'_, AsIndexState>,
    session_id: String,
    docs: Vec<UpsertDoc>,
) -> Result<usize, String> {
    let store = state.ensure_store(&app)?;
    let session = store.get(&session_id)?;
    let pairs: Vec<(u64, HashMap<String, String>)> = docs
        .into_iter()
        .map(|d| (d.numeric_id, d.fields))
        .collect();
    let count = pairs.len();
    let upserted = tauri::async_runtime::spawn_blocking(move || session.upsert_docs(&pairs))
        .await
        .map_err(|e| format!("upsert join: {e}"))??;
    let _ = app.emit(
        "as-index-progress",
        AsIndexProgressEvent {
            processed: upserted as u64,
            total: count as u64,
            phase: "upsert".into(),
        },
    );
    Ok(upserted)
}

#[tauri::command]
pub fn as_index_remove(
    app: AppHandle,
    state: State<'_, AsIndexState>,
    session_id: String,
    numeric_id: u64,
) -> Result<(), String> {
    let store = state.ensure_store(&app)?;
    let session = store.get(&session_id)?;
    session.remove(numeric_id)
}

#[tauri::command]
pub async fn as_index_commit(
    state: State<'_, AsIndexState>,
    session_id: String,
) -> Result<(), String> {
    let store = {
        // ensure_store needs app — keep sync path via State only after open
        state
            .0
            .lock()
            .map_err(|_| "as-index state lock poisoned".to_string())?
            .as_ref()
            .cloned()
            .ok_or_else(|| "as-index store not initialized".to_string())?
    };
    let session = store.get(&session_id)?;
    tauri::async_runtime::spawn_blocking(move || session.commit())
        .await
        .map_err(|e| format!("commit join: {e}"))?
}

#[tauri::command]
pub async fn as_index_export_snapshot(
    state: State<'_, AsIndexState>,
    session_id: String,
) -> Result<Vec<u8>, String> {
    let store = state
        .0
        .lock()
        .map_err(|_| "as-index state lock poisoned".to_string())?
        .as_ref()
        .cloned()
        .ok_or_else(|| "as-index store not initialized".to_string())?;
    let session = store.get(&session_id)?;
    tauri::async_runtime::spawn_blocking(move || session.export_snapshot())
        .await
        .map_err(|e| format!("export join: {e}"))?
}

#[tauri::command]
pub fn as_index_search(
    app: AppHandle,
    state: State<'_, AsIndexState>,
    session_id: String,
    field: String,
    terms: Vec<String>,
    limit: Option<u32>,
) -> Result<Vec<SearchHitDto>, String> {
    let store = state.ensure_store(&app)?;
    let session = store.get(&session_id)?;
    let lim = limit.unwrap_or(50) as usize;
    session.search(&field, &terms, lim)
}

#[tauri::command]
pub fn as_index_cancel(
    app: AppHandle,
    state: State<'_, AsIndexState>,
    session_id: String,
) -> Result<(), String> {
    let store = state.ensure_store(&app)?;
    store.cancel(&session_id)?;
    emit_log(
        &app,
        "warn",
        format!("cancel requested for session {session_id}"),
    );
    Ok(())
}
