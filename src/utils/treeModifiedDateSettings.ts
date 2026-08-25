const LOCAL_STORAGE_KEY = 's3haim_tree_show_modified_date';

/** Default: off. Only enabled when explicitly set to '1'. */
export function loadTreeShowModifiedDateEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveTreeShowModifiedDateEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
