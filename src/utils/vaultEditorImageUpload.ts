import {
  getExtensionFromMime,
  normalizeEditorImagePathPrefix,
  sniffImageMimeFromFile,
} from '@/utils/editorImageUpload';

export type VaultWriteBytesBackend = {
  writeBytes: (
    path: string,
    body: Uint8Array,
    contentType?: string,
  ) => Promise<void>;
};

export type VaultEditorImageUploadOptions = {
  maxSizeBytes?: number;
  imagePathPrefix?: string;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

/**
 * Allocate a vault-relative wiki image path (`.images/…/uuid.ext`) for an editor upload.
 */
export async function allocateEditorImagePath(
  file: File,
  imagePathPrefix?: string,
): Promise<{ path: string; mime: string; contentType: string }> {
  const prefix = normalizeEditorImagePathPrefix(imagePathPrefix ?? '');
  const uuid =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  let mime = file.type;
  if (!mime || mime === 'application/octet-stream') {
    mime = (await sniffImageMimeFromFile(file)) || mime;
  }
  const ext = getExtensionFromMime(mime);
  const path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
  const contentType =
    mime && mime.startsWith('image/') ? mime : 'application/octet-stream';
  return { path, mime: mime || '', contentType };
}

/**
 * Upload an editor image via any StorageBackend-style `writeBytes` (WebDAV / IDB / Tauri local).
 * Returns the vault-relative path for `![[path]]`.
 */
export async function uploadEditorImageViaWriteBytes(
  backend: VaultWriteBytesBackend,
  file: File,
  options: VaultEditorImageUploadOptions = {},
): Promise<string> {
  const maxSizeBytes = options.maxSizeBytes ?? 10 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(
      `Image must be ${Math.round(maxSizeBytes / 1024 / 1024)}MB or smaller.`,
    );
  }
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const { path, contentType } = await allocateEditorImagePath(
    file,
    options.imagePathPrefix,
  );
  options.onProgress?.(0);
  const body = new Uint8Array(await file.arrayBuffer());
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
  await backend.writeBytes(path, body, contentType);
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
  options.onProgress?.(100);
  return path;
}
