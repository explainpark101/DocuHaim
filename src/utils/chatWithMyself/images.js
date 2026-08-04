import { createChatBackend } from './backends/index.js';
import { uploadLocalEditorImage } from '@/utils/localEditorImage';
import {
  sniffImageMimeFromFile,
  getExtensionFromMime,
} from '@/utils/editorImageUpload';
import {
  chatImagePathPrefix,
  detectTimeZone,
  localDateString,
} from './paths.js';

const MAX_CHAT_IMAGE_BYTES = 10 * 1024 * 1024;

/**
 * Upload an image for chat-with-myself. Uploads only when send is pressed (caller timing).
 * @param {import('./storage.js').ChatStorageCtx} ctx
 * @param {File} file
 * @param {{ dateStr?: string, onProgress?: (n: number) => void, signal?: AbortSignal }} [options]
 * @returns {Promise<string>} object key / relative path
 */
export async function uploadChatImage(ctx, file, options = {}) {
  if (!file) throw new Error('파일이 없습니다.');
  if (file.size > MAX_CHAT_IMAGE_BYTES) {
    throw new Error(
      `이미지 크기는 ${Math.round(MAX_CHAT_IMAGE_BYTES / 1024 / 1024)}MB 이하여야 합니다.`,
    );
  }

  const dateStr =
    options.dateStr || localDateString(new Date(), detectTimeZone());
  const prefix = chatImagePathPrefix(dateStr);
  const uuid =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  let mime = file.type;
  if (!mime || mime === 'application/octet-stream') {
    mime = (await sniffImageMimeFromFile(file)) || mime;
  }
  const ext = getExtensionFromMime(mime);
  const key = `${prefix}${uuid}${ext}`;

  if (ctx.mode === 'local') {
    if (!ctx.localRootHandle) throw new Error('로컬 폴더를 먼저 열어주세요.');
    return uploadLocalEditorImage(ctx.localRootHandle, file, {
      imagePathPrefix: prefix,
      maxSizeBytes: MAX_CHAT_IMAGE_BYTES,
      onProgress: options.onProgress,
      signal: options.signal,
    });
  }

  const contentType =
    mime && mime.startsWith('image/') ? mime : 'application/octet-stream';
  options.onProgress?.(0);
  const body = new Uint8Array(await file.arrayBuffer());
  const backend = createChatBackend(ctx);
  await backend.ensureChatFolder();
  await backend.putBinary(key, body, contentType);
  options.onProgress?.(100);
  return key;
}

/**
 * Build markdown wiki-image lines for uploaded paths.
 * @param {string[]} paths
 */
export function chatImagesToMarkdown(paths) {
  return (paths || [])
    .filter(Boolean)
    .map((p) => `![[${p}]]`)
    .join('\n');
}
