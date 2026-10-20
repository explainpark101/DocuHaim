use serde::Serialize;
use similar::{ChangeTag, TextDiff};
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
struct Hunk {
    from: usize,
    to: usize,
    insert: String,
}

#[wasm_bindgen]
pub fn diff_line_hunks(before: &str, after: &str) -> Result<JsValue, JsValue> {
    serde_wasm_bindgen::to_value(&compute(before, after))
        .map_err(|err| JsValue::from_str(&err.to_string()))
}

fn compute(before: &str, after: &str) -> Vec<Hunk> {
    let diff = TextDiff::from_lines(before, after);
    let mut hunks = Vec::new();
    let mut old_byte = 0usize;
    let mut deleted = String::new();
    let mut inserted = String::new();
    let mut hunk_from = 0usize;
    let mut open = false;

    for change in diff.iter_all_changes() {
        let value = change.value();
        match change.tag() {
            ChangeTag::Equal => {
                flush(
                    &mut hunks,
                    &mut open,
                    hunk_from,
                    &deleted,
                    &inserted,
                );
                deleted.clear();
                inserted.clear();
                old_byte += value.len();
                hunk_from = old_byte;
            }
            ChangeTag::Delete => {
                if !open {
                    hunk_from = old_byte;
                    open = true;
                }
                deleted.push_str(value);
                old_byte += value.len();
            }
            ChangeTag::Insert => {
                if !open {
                    hunk_from = old_byte;
                    open = true;
                }
                inserted.push_str(value);
            }
        }
    }
    flush(&mut hunks, &mut open, hunk_from, &deleted, &inserted);
    hunks
}

fn flush(
    hunks: &mut Vec<Hunk>,
    open: &mut bool,
    hunk_from: usize,
    deleted: &str,
    inserted: &str,
) {
    if !*open {
        return;
    }
    *open = false;
    if deleted.is_empty() && inserted.is_empty() {
        return;
    }
    hunks.push(Hunk {
        from: hunk_from,
        to: hunk_from + deleted.len(),
        insert: inserted.to_string(),
    });
}
