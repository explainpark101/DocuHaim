const LOCAL_STORAGE_KEY = 's3haim_md_editor_base64_image_fold';

/** Default on: long data-URI payloads make the source editor unusable. */
export function loadBase64ImageFoldEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === null) return true;
    return raw === '1';
  } catch {
    return true;
  }
}

export function saveBase64ImageFoldEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // ignore
  }
}
