/** Cmd/Ctrl+N creates an in-memory temp (session) file; save picks name + location. Default: off. */

const LOCAL_STORAGE_KEY = 's3haim_new_file_as_temp';

/** Default: off. Explicit `'1'` enables temp-file create. */
export function loadNewFileAsTempEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveNewFileAsTempEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
