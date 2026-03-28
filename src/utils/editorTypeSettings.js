// 마크다운 에디터 종류 (localStorage)

export const EDITOR_TYPE_MD_EDITOR_RT = 'md-editor-rt';
export const EDITOR_TYPE_NOVEL = 'novel';

const LOCAL_STORAGE_KEY = 's3haim_editor_type';

export function loadEditorType() {
  if (typeof window === 'undefined') return EDITOR_TYPE_MD_EDITOR_RT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === EDITOR_TYPE_NOVEL) return EDITOR_TYPE_NOVEL;
    return EDITOR_TYPE_MD_EDITOR_RT;
  } catch {
    return EDITOR_TYPE_MD_EDITOR_RT;
  }
}

export function saveEditorType(type) {
  if (typeof window === 'undefined') return;
  if (type !== EDITOR_TYPE_MD_EDITOR_RT && type !== EDITOR_TYPE_NOVEL) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, type);
  } catch {
    // ignore
  }
}
