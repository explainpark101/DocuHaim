//! Index session: ShardedHandle + work directory lifecycle.

use std::collections::HashMap;
use std::io::Read;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, AtomicU64, Ordering};
use std::sync::{Arc, Mutex};

use ld_lucivy::schema::Value;
use ld_lucivy::LucivyDocument;
use lucivy_core::handle::NODE_ID_FIELD;
use lucivy_core::query::{FieldDef, SchemaConfig};
use lucivy_core::sharded_handle::ShardedHandle;
use lucivy_core::snapshot::{export_to_snapshot, import_from_snapshot};

use super::search::{build_contains_and_query, SearchHitDto};

static SESSION_SEQ: AtomicU64 = AtomicU64::new(1);

fn text_field(name: &str) -> FieldDef {
    FieldDef {
        name: name.to_string(),
        field_type: "text".to_string(),
        stored: Some(true),
        indexed: None,
        fast: None,
    }
}

fn schema_config() -> SchemaConfig {
    SchemaConfig {
        fields: vec![
            text_field("title"),
            text_field("body"),
            text_field("path"),
            text_field("kind"),
            text_field("dateStr"),
        ],
        tokenizer: None,
        shards: Some(1),
        df_threshold: None,
        balance_weight: None,
        sfx: None,
    }
}

pub struct IndexSession {
    pub handle: ShardedHandle,
    pub work_dir: PathBuf,
    pub cancel: AtomicBool,
}

impl IndexSession {
    fn assert_not_cancelled(&self) -> Result<(), String> {
        if self.cancel.load(Ordering::Relaxed) {
            return Err("CANCELLED".into());
        }
        Ok(())
    }

    pub fn upsert_docs(
        &self,
        docs: &[(u64, HashMap<String, String>)],
    ) -> Result<usize, String> {
        self.assert_not_cancelled()?;
        if docs.is_empty() {
            return Ok(0);
        }
        let nid_field = self
            .handle
            .field(NODE_ID_FIELD)
            .ok_or_else(|| "_node_id field missing".to_string())?;

        // Resolve schema fields once, then build LucivyDocuments in parallel.
        let field_ids: Vec<(String, _)> = ["title", "body", "path", "kind", "dateStr"]
            .into_iter()
            .filter_map(|name| self.handle.field(name).map(|f| (name.to_string(), f)))
            .collect();

        use rayon::prelude::*;
        let batch: Vec<(LucivyDocument, u64)> = docs
            .par_iter()
            .map(|(numeric_id, fields)| {
                let mut doc = LucivyDocument::new();
                doc.add_u64(nid_field, *numeric_id);
                for (name, field) in &field_ids {
                    if let Some(value) = fields.get(name) {
                        doc.add_text(*field, value);
                    }
                }
                (doc, *numeric_id)
            })
            .collect();

        // Index mutations stay single-threaded (handle is not Sync for writers).
        for (numeric_id, _) in docs {
            self.assert_not_cancelled()?;
            let _ = self.handle.delete_by_node_id(*numeric_id);
        }
        self.assert_not_cancelled()?;
        self.handle.add_documents(batch)?;
        Ok(docs.len())
    }

    pub fn remove(&self, numeric_id: u64) -> Result<(), String> {
        self.assert_not_cancelled()?;
        self.handle.delete_by_node_id(numeric_id)
    }

    pub fn commit(&self) -> Result<(), String> {
        self.assert_not_cancelled()?;
        self.handle.commit()
    }

    pub fn export_snapshot(&self) -> Result<Vec<u8>, String> {
        self.assert_not_cancelled()?;
        if self
            .handle
            .shard(0)
            .map(|s| s.has_uncommitted())
            .unwrap_or(false)
        {
            self.handle.commit()?;
        }
        export_to_snapshot(&self.handle, &self.work_dir)
    }

    pub fn search(
        &self,
        field: &str,
        terms: &[String],
        limit: usize,
    ) -> Result<Vec<SearchHitDto>, String> {
        self.assert_not_cancelled()?;
        let Some(query) = build_contains_and_query(field, terms) else {
            return Ok(Vec::new());
        };
        let hits = self.handle.search_with_docs(&query, limit.max(1))?;
        let nid_field = self
            .handle
            .field(NODE_ID_FIELD)
            .ok_or_else(|| "_node_id field missing".to_string())?;

        let mut out = Vec::with_capacity(hits.len());
        for hit in hits {
            let doc_id = hit
                .doc
                .get_first(nid_field)
                .and_then(|v| v.as_u64())
                .unwrap_or(0);
            out.push(SearchHitDto {
                doc_id,
                score: hit.score,
            });
        }
        Ok(out)
    }
}

pub struct SessionStore {
    sessions: Mutex<HashMap<String, Arc<IndexSession>>>,
    work_root: PathBuf,
}

impl SessionStore {
    pub fn new(work_root: PathBuf) -> Self {
        Self {
            sessions: Mutex::new(HashMap::new()),
            work_root,
        }
    }

    fn next_session_id() -> String {
        let n = SESSION_SEQ.fetch_add(1, Ordering::Relaxed);
        format!("as-{n}")
    }

    fn session_dir(&self, session_id: &str) -> PathBuf {
        self.work_root.join(session_id)
    }

    /// Read a gzip-compressed LUCE snapshot from disk and open a session.
    /// Missing or empty files create an empty index (same as `open(None)`).
    pub fn open_from_gzip_file(&self, gzip_path: &Path) -> Result<String, String> {
        let snapshot = read_optional_gunzip_file(gzip_path)?;
        self.open(snapshot)
    }

    pub fn open(&self, snapshot: Option<Vec<u8>>) -> Result<String, String> {
        let session_id = Self::next_session_id();
        let work_dir = self.session_dir(&session_id);
        if work_dir.exists() {
            let _ = std::fs::remove_dir_all(&work_dir);
        }
        std::fs::create_dir_all(&work_dir)
            .map_err(|e| format!("cannot create work dir: {e}"))?;

        let handle = if let Some(data) = snapshot.filter(|b| !b.is_empty()) {
            import_from_snapshot(&data, &work_dir)?
        } else {
            let path = work_dir
                .to_str()
                .ok_or_else(|| "work dir path is not UTF-8".to_string())?;
            ShardedHandle::create(path, &schema_config())?
        };

        let session = Arc::new(IndexSession {
            handle,
            work_dir,
            cancel: AtomicBool::new(false),
        });
        self.sessions
            .lock()
            .map_err(|_| "session lock poisoned".to_string())?
            .insert(session_id.clone(), session);
        Ok(session_id)
    }

    pub fn get(&self, session_id: &str) -> Result<Arc<IndexSession>, String> {
        self.sessions
            .lock()
            .map_err(|_| "session lock poisoned".to_string())?
            .get(session_id)
            .cloned()
            .ok_or_else(|| format!("unknown session: {session_id}"))
    }

    pub fn cancel(&self, session_id: &str) -> Result<(), String> {
        let session = self.get(session_id)?;
        session.cancel.store(true, Ordering::Relaxed);
        Ok(())
    }

    pub fn close(&self, session_id: &str) -> Result<(), String> {
        let session = {
            let mut guard = self
                .sessions
                .lock()
                .map_err(|_| "session lock poisoned".to_string())?;
            guard.remove(session_id)
        };
        if let Some(session) = session {
            let _ = session.handle.close();
            let dir = session.work_dir.clone();
            drop(session);
            remove_dir_best_effort(&dir);
        }
        Ok(())
    }
}

fn remove_dir_best_effort(dir: &Path) {
    if dir.exists() {
        let _ = std::fs::remove_dir_all(dir);
    }
}

fn read_optional_gunzip_file(path: &Path) -> Result<Option<Vec<u8>>, String> {
    if !path.is_file() {
        return Ok(None);
    }
    let raw = std::fs::read(path).map_err(|e| format!("read snapshot file: {e}"))?;
    if raw.is_empty() {
        return Ok(None);
    }
    let mut decoder = flate2::read::GzDecoder::new(&raw[..]);
    let mut out = Vec::new();
    decoder
        .read_to_end(&mut out)
        .map_err(|e| format!("gunzip snapshot file: {e}"))?;
    if out.is_empty() {
        return Ok(None);
    }
    Ok(Some(out))
}
