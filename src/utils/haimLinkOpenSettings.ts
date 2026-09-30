/**
 * Haim WYSIWYG: whether links open on plain click.
 * Default: false — require Ctrl/Cmd+click, hover-card 「열기」, or the setting.
 */

const LOCAL_STORAGE_KEY = 's3haim_haim_link_open_on_click';

/** Fired on `window` when the preference changes. */
export const HAIM_LINK_OPEN_CHANGED_EVENT = 's3haim-haim-link-open';

/** TipTap `openOnClick` equivalent. Default off → mod-click / hover card. */
export const HAIM_LINK_OPEN_ON_CLICK_DEFAULT = false;

export function loadHaimLinkOpenOnClick(): boolean {
  if (typeof window === 'undefined') return HAIM_LINK_OPEN_ON_CLICK_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return HAIM_LINK_OPEN_ON_CLICK_DEFAULT;
}

/** True when links require Ctrl/Cmd+click (or hover 「열기」) unless setting is on. */
export function loadHaimLinkRequireModClick(): boolean {
  return !loadHaimLinkOpenOnClick();
}

export function saveHaimLinkOpenOnClick(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
    window.dispatchEvent(
      new CustomEvent(HAIM_LINK_OPEN_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}

function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || '';
  const ua = navigator.userAgent || '';
  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac OS/i.test(ua);
}

/** "Cmd" on Apple, "Ctrl" elsewhere — for concise hover copy. */
export function getHaimLinkOpenModLabel(): string {
  return isApplePlatform() ? 'Cmd' : 'Ctrl';
}

/** Secondary hint under the hover-card open button. */
export function getHaimLinkOpenHintText(): string {
  const mod = getHaimLinkOpenModLabel();
  if (loadHaimLinkOpenOnClick()) {
    return `또는 클릭 / ${mod}+클릭`;
  }
  return `또는 ${mod}+클릭`;
}
