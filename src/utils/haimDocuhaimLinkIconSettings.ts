/**
 * Show a note (file) icon before `docuhaim://` hyperlinks in preview / Haim.
 * Default: on.
 */

const LOCAL_STORAGE_KEY = 's3haim_haim_docuhaim_link_icon';
const DOM_ATTR = 'data-haim-docuhaim-link-icon';

/** Fired on `window` when the preference changes. */
export const HAIM_DOCUHAIM_LINK_ICON_CHANGED_EVENT =
  's3haim-haim-docuhaim-link-icon';

export const HAIM_DOCUHAIM_LINK_ICON_DEFAULT = true;

export function applyHaimDocuhaimLinkIconDom(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(DOM_ATTR, enabled ? '1' : '0');
}

export function loadHaimDocuhaimLinkIconEnabled(): boolean {
  if (typeof window === 'undefined') return HAIM_DOCUHAIM_LINK_ICON_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return HAIM_DOCUHAIM_LINK_ICON_DEFAULT;
}

export function saveHaimDocuhaimLinkIconEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
    applyHaimDocuhaimLinkIconDom(enabled);
    window.dispatchEvent(
      new CustomEvent(HAIM_DOCUHAIM_LINK_ICON_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}

/** Call once at app boot. */
export function initHaimDocuhaimLinkIconDom(): void {
  applyHaimDocuhaimLinkIconDom(loadHaimDocuhaimLinkIconEnabled());
}
