const LOCAL_STORAGE_KEY = 's3haim_workspace_tabs';

/** Default: off (legacy single-file / exclusive chat). Explicit `'1'` enables tab mode. */
export function loadWorkspaceTabsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveWorkspaceTabsEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
