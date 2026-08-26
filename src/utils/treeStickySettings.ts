const LOCAL_STORAGE_KEY = 's3haim_tree_sticky_folder_path';

/** 기본값: 켜짐. 명시적으로 '0'일 때만 꺼짐 */
export function loadTreeStickyFolderPathEnabled() {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw !== '0';
  } catch {
    return true;
  }
}

export function saveTreeStickyFolderPathEnabled(value: any) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
