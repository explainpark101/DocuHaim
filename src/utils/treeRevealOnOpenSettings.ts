const LOCAL_STORAGE_KEY = 's3haim_tree_reveal_on_open';

/** Default: on. Only disabled when explicitly set to '0'. */
export function loadTreeRevealOnOpenEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) !== '0';
  } catch {
    return true;
  }
}

export function saveTreeRevealOnOpenEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
