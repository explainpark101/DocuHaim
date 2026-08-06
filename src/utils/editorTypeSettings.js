// Markdown editor type (localStorage)
// Novel (TipTap) is temporarily disabled — only md-editor-rt is available.

export const EDITOR_TYPE_MD_EDITOR_RT = 'md-editor-rt';
export const EDITOR_TYPE_NOVEL = 'novel';

/** Novel/TipTap is not selectable until ready. */
export const EDITOR_TYPE_NOVEL_AVAILABLE = false;

const LOCAL_STORAGE_KEY = 's3haim_editor_type';

export function loadEditorType() {
  if (typeof window === 'undefined') return EDITOR_TYPE_MD_EDITOR_RT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === EDITOR_TYPE_NOVEL && !EDITOR_TYPE_NOVEL_AVAILABLE) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, EDITOR_TYPE_MD_EDITOR_RT);
      return EDITOR_TYPE_MD_EDITOR_RT;
    }
    if (raw === EDITOR_TYPE_NOVEL) return EDITOR_TYPE_NOVEL;
    return EDITOR_TYPE_MD_EDITOR_RT;
  } catch {
    return EDITOR_TYPE_MD_EDITOR_RT;
  }
}

export function saveEditorType(type) {
  if (typeof window === 'undefined') return;
  if (type === EDITOR_TYPE_NOVEL && !EDITOR_TYPE_NOVEL_AVAILABLE) return;
  if (type !== EDITOR_TYPE_MD_EDITOR_RT && type !== EDITOR_TYPE_NOVEL) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, type);
  } catch {
    // ignore
  }
}
