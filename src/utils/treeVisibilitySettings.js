/** Sidebar visibility toggles persisted in localStorage. */

const SHOW_TRASH_KEY = 's3haim_show_trash_folder';
const SHOW_HIDDEN_FOLDERS_KEY = 's3haim_show_hidden_folders';

/** Default: off. Explicit '1' enables. */
export function loadShowTrashFolder() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SHOW_TRASH_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveShowTrashFolder(value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SHOW_TRASH_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

/** Default: off. Explicit '1' enables. */
export function loadShowHiddenFolders() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SHOW_HIDDEN_FOLDERS_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveShowHiddenFolders(value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SHOW_HIDDEN_FOLDERS_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
