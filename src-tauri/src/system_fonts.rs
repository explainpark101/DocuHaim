#[cfg(not(any(target_os = "android", target_os = "ios")))]
#[tauri::command]
pub fn list_system_font_families() -> Result<Vec<String>, String> {
    use font_kit::source::SystemSource;

    let source = SystemSource::new();
    let mut families = source
        .all_families()
        .map_err(|e| format!("Failed to list system fonts: {e}"))?;
    families.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()));
    families.dedup();
    Ok(families)
}

#[cfg(any(target_os = "android", target_os = "ios"))]
#[tauri::command]
pub fn list_system_font_families() -> Result<Vec<String>, String> {
    Ok(Vec::new())
}
