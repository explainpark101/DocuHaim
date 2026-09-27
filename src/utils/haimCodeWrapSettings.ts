/**
 * Haim WYSIWYG: soft-wrap vs pre for code / raw blocks.
 * Export PDF / preview-only always wrap (CSS), independent of this pref.
 */

const STORAGE_KEY = 's3haim_haim_code_wrap';
const DOM_ATTR = 'data-haim-code-wrap';

/** Fired on `window` when the wrap preference changes. */
export const HAIM_CODE_WRAP_CHANGED_EVENT = 's3haim-haim-code-wrap';

/** Soft-wrap on by default (matches TipTap NodeViewContent + Export PDF). */
export const HAIM_CODE_WRAP_DEFAULT = true;

function applyDomAttr(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(DOM_ATTR, enabled ? '1' : '0');
}

export function applyHaimCodeWrapDom(enabled: boolean): void {
  applyDomAttr(enabled);
}

export function loadHaimCodeWrapEnabled(): boolean {
  if (typeof window === 'undefined') return HAIM_CODE_WRAP_DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return HAIM_CODE_WRAP_DEFAULT;
}

export function saveHaimCodeWrapEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    applyDomAttr(enabled);
    window.dispatchEvent(
      new CustomEvent(HAIM_CODE_WRAP_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}

/** Call once at app boot. */
export function initHaimCodeWrapDom(): void {
  applyHaimCodeWrapDom(loadHaimCodeWrapEnabled());
}
