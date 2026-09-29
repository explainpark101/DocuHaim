/**
 * Haim dual-pane TipTap ↔ source CM content sync debounce (ms).
 * 0 = sync immediately on each edit; default 150.
 */

const LOCAL_STORAGE_KEY = 's3haim_haim_dual_sync_debounce_ms';

/** Fired on `window` when the preference changes. */
export const HAIM_DUAL_SYNC_DEBOUNCE_CHANGED_EVENT =
  's3haim-haim-dual-sync-debounce';

export const HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT = 150;
export const HAIM_DUAL_SYNC_DEBOUNCE_MS_MIN = 0;
export const HAIM_DUAL_SYNC_DEBOUNCE_MS_MAX = 2000;

export function clampHaimDualSyncDebounceMs(value: number): number {
  if (!Number.isFinite(value)) return HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT;
  return Math.min(
    HAIM_DUAL_SYNC_DEBOUNCE_MS_MAX,
    Math.max(HAIM_DUAL_SYNC_DEBOUNCE_MS_MIN, Math.round(value)),
  );
}

export function loadHaimDualSyncDebounceMs(): number {
  if (typeof window === 'undefined') return HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw == null || raw === '') return HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT;
    return clampHaimDualSyncDebounceMs(Number(raw));
  } catch {
    // ignore
  }
  return HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT;
}

export function saveHaimDualSyncDebounceMs(ms: number): void {
  if (typeof window === 'undefined') return;
  const next = clampHaimDualSyncDebounceMs(ms);
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, String(next));
    window.dispatchEvent(
      new CustomEvent(HAIM_DUAL_SYNC_DEBOUNCE_CHANGED_EVENT, {
        detail: { ms: next },
      }),
    );
  } catch {
    // ignore
  }
}
