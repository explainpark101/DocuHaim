/**
 * Haim WYSIWYG: dashed outline on the node currently being edited (TipTap Focus).
 * Default: on.
 */

const LOCAL_STORAGE_KEY = 's3haim_haim_focus_outline';
const DOM_ATTR = 'data-haim-focus-outline';

/** Fired on `window` when the preference changes. */
export const HAIM_FOCUS_OUTLINE_CHANGED_EVENT = 's3haim-haim-focus-outline';

export const HAIM_FOCUS_OUTLINE_DEFAULT = true;

export function applyHaimFocusOutlineDom(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(DOM_ATTR, enabled ? '1' : '0');
}

export function loadHaimFocusOutlineEnabled(): boolean {
  if (typeof window === 'undefined') return HAIM_FOCUS_OUTLINE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return HAIM_FOCUS_OUTLINE_DEFAULT;
}

export function saveHaimFocusOutlineEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
    applyHaimFocusOutlineDom(enabled);
    window.dispatchEvent(
      new CustomEvent(HAIM_FOCUS_OUTLINE_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}

/** Call once at app boot. */
export function initHaimFocusOutlineDom(): void {
  applyHaimFocusOutlineDom(loadHaimFocusOutlineEnabled());
}
