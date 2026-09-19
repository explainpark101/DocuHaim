/** Markdown editor type (localStorage). Only md-editor-rt is supported. */

export const EDITOR_TYPE_MD_EDITOR_RT = 'md-editor-rt';

const LOCAL_STORAGE_KEY = 's3haim_editor_type';

/** Always md-editor-rt; migrates legacy `novel` preference away. */
export function loadEditorType(): string {
  if (typeof window === 'undefined') return EDITOR_TYPE_MD_EDITOR_RT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw != null && raw !== EDITOR_TYPE_MD_EDITOR_RT) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, EDITOR_TYPE_MD_EDITOR_RT);
    }
  } catch {
    // ignore
  }
  return EDITOR_TYPE_MD_EDITOR_RT;
}

export function saveEditorType(type: string): void {
  if (typeof window === 'undefined') return;
  if (type !== EDITOR_TYPE_MD_EDITOR_RT) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, type);
  } catch {
    // ignore
  }
}
