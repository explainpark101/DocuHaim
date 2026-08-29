//! Build Lucivy QueryConfig matching JS `buildContainsAndQuery`.

use lucivy_core::query::QueryConfig;
use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SearchHitDto {
    pub doc_id: u64,
    pub score: f32,
}

/// AND-of-contains query (legacy postings AND semantics in Advanced Search).
pub fn build_contains_and_query(field: &str, terms: &[String]) -> Option<QueryConfig> {
    let cleaned: Vec<String> = terms
        .iter()
        .map(|t| t.trim().to_string())
        .filter(|t| !t.is_empty())
        .collect();
    if cleaned.is_empty() {
        return None;
    }
    if cleaned.len() == 1 {
        return Some(QueryConfig {
            query_type: "contains".into(),
            field: Some(field.to_string()),
            value: Some(cleaned[0].clone()),
            ..Default::default()
        });
    }
    Some(QueryConfig {
        query_type: "boolean".into(),
        must: Some(
            cleaned
                .into_iter()
                .map(|value| QueryConfig {
                    query_type: "contains".into(),
                    field: Some(field.to_string()),
                    value: Some(value),
                    ..Default::default()
                })
                .collect(),
        ),
        ..Default::default()
    })
}
