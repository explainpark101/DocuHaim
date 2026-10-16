/**
 * Hide headings that live inside a blockquote from the Haim table of contents.
 * Off by default so existing catalogs stay unchanged.
 */

const STORAGE_KEY = 's3haim_haim_toc_hide_quote_headings';

/** Fired on `window` when the preference changes. */
export const HAIM_TOC_HIDE_QUOTE_HEADINGS_CHANGED_EVENT =
  's3haim-haim-toc-hide-quote-headings';

export const HAIM_TOC_HIDE_QUOTE_HEADINGS_DEFAULT = false;

export function loadHaimTocHideQuoteHeadings(): boolean {
  if (typeof window === 'undefined') return HAIM_TOC_HIDE_QUOTE_HEADINGS_DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === '1' || raw === 'true') return true;
    if (raw === '0' || raw === 'false') return false;
  } catch {
    // ignore
  }
  return HAIM_TOC_HIDE_QUOTE_HEADINGS_DEFAULT;
}

export function saveHaimTocHideQuoteHeadings(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    window.dispatchEvent(
      new CustomEvent(HAIM_TOC_HIDE_QUOTE_HEADINGS_CHANGED_EVENT, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}
