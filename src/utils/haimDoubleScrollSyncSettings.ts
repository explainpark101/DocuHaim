/**
 * Haim double-pane: keep TipTap and source CM scroll positions aligned.
 */

const LOCAL_STORAGE_KEY = 's3haim_haim_double_scroll_sync';

/** Fired on `window` when the preference changes. */
export const HAIM_DOUBLE_SCROLL_SYNC_CHANGED_EVENT =
  's3haim-haim-double-scroll-sync';

/** Default on — matching scroll is usually desirable in double mode. */
export const HAIM_DOUBLE_SCROLL_SYNC_DEFAULT = true;

export function loadHaimDoubleScrollSyncEnabled(): boolean {
  if (typeof window === 'undefined') return HAIM_DOUBLE_SCROLL_SYNC_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return HAIM_DOUBLE_SCROLL_SYNC_DEFAULT;
}

export function saveHaimDoubleScrollSyncEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
    window.dispatchEvent(
      new CustomEvent(HAIM_DOUBLE_SCROLL_SYNC_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}
