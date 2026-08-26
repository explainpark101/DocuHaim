import {
  getExtensionFromMime,
  normalizeEditorImagePathPrefix,
  sniffImageMimeFromFile,
} from '@/utils/editorImageUpload';

/**
 * @param {FileSystemDirectoryHandle} rootHandle
 * @param {string} relativePath
 * @param {{ create?: boolean }} [options]
 * @returns {Promise<FileSystemDirectoryHandle>}
 */
export async function getLocalDirectoryHandleForPath(rootHandle: any, relativePath: any, { create = false } = {}) {
  const parts = relativePath.replace(/^\/+/, '').replace(/\/+$/, '').split('/').filter(Boolean);
  let dir = rootHandle;
  for (const segment of parts) {
    dir = await dir.getDirectoryHandle(segment, { create });
  }
  return dir;
}

/**
 * @param {FileSystemDirectoryHandle} rootHandle
 * @param {string} relativePath
 * @param {{ create?: boolean }} [options]
 * @returns {Promise<FileSystemFileHandle>}
 */
export async function getLocalFileHandleForPath(rootHandle: any, relativePath: any, { create = false } = {}) {
  const normalized = relativePath.replace(/^\/+/, '');
  const lastSlash = normalized.lastIndexOf('/');
  if (lastSlash < 0) {
    return rootHandle.getFileHandle(normalized, { create });
  }
  const dirPath = normalized.slice(0, lastSlash);
  const fileName = normalized.slice(lastSlash + 1);
  const dir = await getLocalDirectoryHandleForPath(rootHandle, dirPath, { create });
  return dir.getFileHandle(fileName, { create });
}

/**
 * 로컬 폴더에 에디터 이미지 저장 — 위키 문법 ![[path]]용 상대 path 반환.
 *
 * @param {FileSystemDirectoryHandle} rootHandle
 * @param {File} file
 * @param {{ maxSizeBytes?: number, imagePathPrefix?: string, onProgress?: (percent: number) => void, signal?: AbortSignal }} [options]
 * @returns {Promise<string>}
 */
export async function uploadLocalEditorImage(rootHandle: any, file: any, options = {}) {
  if (!rootHandle) {
    throw new Error('로컬 폴더가 열려 있지 않습니다.');
  }

  // @ts-expect-error TS(2339): Property 'maxSizeBytes' does not exist on type '{}... Remove this comment to see the full error message
  const maxSizeBytes = options.maxSizeBytes ?? 10 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`이미지 크기는 ${Math.round(maxSizeBytes / 1024 / 1024)}MB 이하여야 합니다.`);
  }
  // @ts-expect-error TS(2339): Property 'signal' does not exist on type '{}'.
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  // @ts-expect-error TS(2339): Property 'imagePathPrefix' does not exist on type ... Remove this comment to see the full error message
  const prefix = normalizeEditorImagePathPrefix(options.imagePathPrefix);
  const uuid =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  let mime = file.type;
  if (!mime || mime === 'application/octet-stream') {
    mime = (await sniffImageMimeFromFile(file)) || mime;
  }
  const ext = getExtensionFromMime(mime);
  const relativePath = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');

  // @ts-expect-error TS(2339): Property 'onProgress' does not exist on type '{}'.
  options.onProgress?.(0);
  const fileHandle = await getLocalFileHandleForPath(rootHandle, relativePath, { create: true });
  // @ts-expect-error TS(2339): Property 'signal' does not exist on type '{}'.
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const writable = await fileHandle.createWritable();
  try {
    await writable.write(await file.arrayBuffer());
  } finally {
    await writable.close();
  }

  // @ts-expect-error TS(2339): Property 'signal' does not exist on type '{}'.
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  // @ts-expect-error TS(2339): Property 'onProgress' does not exist on type '{}'.
  options.onProgress?.(100);
  return relativePath;
}

/**
 * 로컬 위키 이미지 path를 blob URL로 변환.
 * @param {FileSystemDirectoryHandle} rootHandle
 * @param {string} path
 * @returns {Promise<string|null>}
 */
export async function getLocalWikiImageObjectUrl(rootHandle: any, path: any) {
  if (!rootHandle || !path) return null;
  const trimmed = String(path).trim();
  // note-cover may embed data URIs after base64 download — do not treat as vault keys.
  if (/^(https?:|data:|blob:|\/\/)/i.test(trimmed)) return trimmed;
  try {
    const fileHandle = await getLocalFileHandleForPath(rootHandle, trimmed, { create: false });
    const file = await fileHandle.getFile();
    return URL.createObjectURL(file);
  } catch (err) {
    console.warn('[wiki-image] getLocalWikiImageObjectUrl: failed', {
      path: trimmed.length > 120 ? `${trimmed.slice(0, 120)}…` : trimmed,
      err,
    });
    return null;
  }
}
