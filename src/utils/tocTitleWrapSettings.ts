const TOC_TITLE_WRAP_KEY = 's3haim_toc_title_wrap';

export function loadTocTitleWrapEnabled() {
  try {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(TOC_TITLE_WRAP_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveTocTitleWrapEnabled(enabled: any) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(TOC_TITLE_WRAP_KEY, enabled ? '1' : '0');
  } catch {
    // ignore
  }
}
