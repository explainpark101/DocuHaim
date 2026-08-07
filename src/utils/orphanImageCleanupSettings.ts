/**
 * Orphan image cleanup policy (localStorage).
 * - auto: trash companion `.images/…` when a note/folder is deleted
 * - manual: leave companions; clean via Settings unused-image UI
 */

const LOCAL_STORAGE_KEY = 's3haim_orphan_image_auto_delete';

/** Default: manual cleanup (preserve current delete behavior). */
export function loadOrphanImageAutoDeleteEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveOrphanImageAutoDeleteEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // ignore
  }
}
