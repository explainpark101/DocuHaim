/**
 * Collapse long data:image/...;base64 payloads in markdown source editors.
 * Default on — click a fold chip to expand one payload at a time.
 */

const LOCAL_STORAGE_KEY = 's3haim_md_editor_base64_image_fold';

/** Fired on `window` when the preference changes. */
export const BASE64_IMAGE_FOLD_CHANGED_EVENT = 's3haim-base64-image-fold';

/** Default on: long data-URI payloads make the source editor unusable. */
export const BASE64_IMAGE_FOLD_DEFAULT = true;

export function loadBase64ImageFoldEnabled(): boolean {
  if (typeof window === 'undefined') return BASE64_IMAGE_FOLD_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return BASE64_IMAGE_FOLD_DEFAULT;
}

export function saveBase64ImageFoldEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
    window.dispatchEvent(
      new CustomEvent(BASE64_IMAGE_FOLD_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}
