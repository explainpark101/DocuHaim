const LOCAL_STORAGE_KEY = 's3haim_alt_vim_navigation';

/** 기본값: 꺼짐. 명시적으로 '1'일 때만 켜짐 */
export function loadAltVimNavigationEnabled() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveAltVimNavigationEnabled(value: any) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
