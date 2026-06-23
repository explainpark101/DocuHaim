import Dexie from 'dexie';

const HANDLE_ROW_ID = 'root';
const FOLDER_NAME_KEY = 's3haim_lastLocalFolderName';

const db = new Dexie('s3haim-local-folder');
db.version(1).stores({ handles: 'id' });

/**
 * @returns {Promise<boolean>}
 */
export async function hasStoredLocalRootHandle() {
  try {
    const count = await db.handles.count();
    return count > 0;
  } catch {
    return false;
  }
}

export function loadLastLocalFolderName() {
  try {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(FOLDER_NAME_KEY) || '';
  } catch {
    return '';
  }
}

/**
 * @param {FileSystemDirectoryHandle} handle
 */
export async function saveLocalRootHandle(handle) {
  if (!handle) return;
  try {
    await db.handles.put({
      id: HANDLE_ROW_ID,
      handle,
      name: handle.name,
      savedAt: Date.now(),
    });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(FOLDER_NAME_KEY, handle.name);
    }
  } catch (e) {
    console.warn('Failed to persist local folder handle:', e);
  }
}

/**
 * @returns {Promise<FileSystemDirectoryHandle | null>}
 */
export async function loadLocalRootHandle() {
  try {
    const row = await db.handles.get(HANDLE_ROW_ID);
    return row?.handle ?? null;
  } catch {
    return null;
  }
}

export async function clearStoredLocalRootHandle() {
  try {
    await db.handles.delete(HANDLE_ROW_ID);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(FOLDER_NAME_KEY);
    }
  } catch (_) {}
}

/**
 * Restore a previously saved directory handle and ensure read/write permission.
 * @returns {Promise<FileSystemDirectoryHandle | null>}
 */
export async function tryRestoreLocalRootHandle() {
  const handle = await loadLocalRootHandle();
  if (!handle) return null;

  try {
    let permission = await handle.queryPermission({ mode: 'readwrite' });
    if (permission !== 'granted') {
      permission = await handle.requestPermission({ mode: 'readwrite' });
    }
    if (permission !== 'granted') return null;
    return handle;
  } catch {
    return null;
  }
}
