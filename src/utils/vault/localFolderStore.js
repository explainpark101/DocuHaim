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
 * Ensure a directory handle has read+write permission (File System Access API).
 * @param {FileSystemDirectoryHandle | null | undefined} handle
 * @returns {Promise<boolean>}
 */
export async function ensureDirectoryReadWritePermission(handle) {
  if (!handle) return false;
  try {
    if (typeof handle.queryPermission !== 'function') {
      // Environments without permission APIs (e.g. some Electron bridges) treat as writable.
      return true;
    }
    const permissionDesc = { mode: 'readwrite' };
    let permission = await handle.queryPermission(permissionDesc);
    if (permission !== 'granted' && typeof handle.requestPermission === 'function') {
      permission = await handle.requestPermission(permissionDesc);
    }
    return permission === 'granted';
  } catch {
    return false;
  }
}

/**
 * Open the directory picker with write access.
 * Default showDirectoryPicker mode is "read"; Local Haim needs "readwrite".
 * @param {{ id?: string, startIn?: string | FileSystemHandle }} [options]
 * @returns {Promise<FileSystemDirectoryHandle>}
 */
export async function pickLocalRootDirectory(options = {}) {
  if (typeof window === 'undefined' || !('showDirectoryPicker' in window)) {
    throw new Error('이 브라우저는 폴더 선택을 지원하지 않습니다.');
  }
  const dirHandle = await window.showDirectoryPicker({
    ...options,
    mode: 'readwrite',
  });
  const ok = await ensureDirectoryReadWritePermission(dirHandle);
  if (!ok) {
    throw new Error('선택한 폴더에 쓰기 권한이 필요합니다.');
  }
  return dirHandle;
}

/**
 * Restore a previously saved directory handle and ensure read/write permission.
 * @returns {Promise<FileSystemDirectoryHandle | null>}
 */
export async function tryRestoreLocalRootHandle() {
  const handle = await loadLocalRootHandle();
  if (!handle) return null;

  try {
    const ok = await ensureDirectoryReadWritePermission(handle);
    return ok ? handle : null;
  } catch {
    return null;
  }
}
