import { createChatBackend } from '@/utils/chatWithMyself/backends/index';
import {
  getLocalDirectoryHandleForPath,
  getLocalFileHandleForPath,
} from '@/utils/localEditorImage';
import { isFileProbablyImage } from '@/utils/editorImageUpload';
import {
  chatFilePathPrefix,
  detectTimeZone,
  localDateString,
} from '@/utils/chatWithMyself/paths';
import { uploadChatImage } from '@/utils/chatWithMyself/images';
import { parseWikiImageInner, wikiImageMarkupFromAttrs } from '@/utils/wikiImageSyntax';

const MAX_CHAT_FILE_BYTES = 50 * 1024 * 1024;

type ChatFileUploadOptions = {
  dateStr?: string;
  onProgress?: (n: number) => void;
};

function makeUuid() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function extensionFromFileName(name: any) {
  const base = String(name || '');
  const i = base.lastIndexOf('.');
  if (i <= 0 || i === base.length - 1) return '';
  const ext = base.slice(i).toLowerCase();
  if (!/^\.[a-z0-9]{1,12}$/i.test(ext)) return '';
  return ext;
}

/** Strip characters that break [[file:path|name|size]] parsing. */
export function sanitizeChatFileMeta(name: any) {
  return String(name || 'file')
    .replace(/[[\]|]/g, '_')
    .trim() || 'file';
}

export function formatChatAttachmentSize(bytes: any) {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n < 0) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

export async function isChatImageFile(file: any) {
  if (!file) return false;
  if (file.type?.startsWith('image/')) return true;
  try {
    return await isFileProbablyImage(file);
  } catch {
    return false;
  }
}

/**
 * Upload a non-image file for chat-with-myself.
 * @returns {Promise<string>} object key / relative path
 */
export async function uploadChatFile(ctx: any, file: File, options: ChatFileUploadOptions = {}) {
  if (!file) throw new Error('파일이 없습니다.');
  if (file.size > MAX_CHAT_FILE_BYTES) {
    throw new Error(
      `파일 크기는 ${Math.round(MAX_CHAT_FILE_BYTES / 1024 / 1024)}MB 이하여야 합니다.`,
    );
  }

  const dateStr =
    options.dateStr || localDateString(new Date(), detectTimeZone());
  const prefix = chatFilePathPrefix(dateStr);
  const ext = extensionFromFileName(file.name) || '';
  const key = `${prefix}${makeUuid()}${ext}`;
  const contentType = file.type || 'application/octet-stream';

  options.onProgress?.(0);
  if (ctx.mode === 'local') {
    if (!ctx.localRootHandle) throw new Error('로컬 폴더를 먼저 열어주세요.');
    const handle = await getLocalFileHandleForPath(ctx.localRootHandle, key, {
      create: true,
    });
    const writable = await handle.createWritable();
    try {
      await writable.write(file);
      await writable.close();
    } catch (err) {
      try {
        await writable.abort();
      } catch {
        /* ignore */
      }
      throw err;
    }
    options.onProgress?.(100);
    return key;
  }

  const body = new Uint8Array(await file.arrayBuffer());
  const backend = createChatBackend(ctx);
  await backend.ensureChatFolder();
  await backend.putBinary(key, body, contentType);
  options.onProgress?.(100);
  return key;
}

/**
 * Upload image or general file; returns markdown attachment descriptor.
 * @returns {Promise<{ kind: 'image'|'file', path: string, name: string, size: number }>}
 */
export async function uploadChatAttachment(
  ctx: any,
  file: File,
  options: ChatFileUploadOptions = {},
) {
  const asImage = await isChatImageFile(file);
  if (asImage) {
    const path = await uploadChatImage(ctx, file, options);
    return {
      kind: 'image',
      path,
      name: file.name || 'image',
      size: file.size || 0,
    };
  }
  const path = await uploadChatFile(ctx, file, options);
  return {
    kind: 'file',
    path,
    name: file.name || 'file',
    size: file.size || 0,
  };
}

/**
 * @param {{ kind: 'image'|'file'|'note'|'folder', path: string, name?: string, size?: number, background?: string | null }[]} items
 */
export function chatAttachmentsToMarkdown(items: any) {
  return (items || [])
    .filter((item: any) => item?.path)
    .map((item: any) => {
      if (item.kind === 'image') {
        return wikiImageMarkupFromAttrs({
          path: item.path,
          background: item.background || null,
        });
      }
      if (item.kind === 'note') {
        const name = sanitizeChatFileMeta(
          item.name || item.path.split('/').filter(Boolean).pop() || 'note',
        );
        return `[[note:${item.path}|${name}]]`;
      }
      if (item.kind === 'folder') {
        let path = String(item.path || '').replace(/\\/g, '/');
        if (path && !path.endsWith('/')) path = `${path}/`;
        const name = sanitizeChatFileMeta(
          item.name || path.replace(/\/+$/, '').split('/').filter(Boolean).pop() || 'folder',
        );
        return `[[folder:${path}|${name}]]`;
      }
      const name = sanitizeChatFileMeta(item.name || item.path.split('/').pop());
      const size =
        Number.isFinite(item.size) && item.size >= 0 ? String(item.size) : '';
      return size
        ? `[[file:${item.path}|${name}|${size}]]`
        : `[[file:${item.path}|${name}]]`;
    })
    .join('\n');
}

/**
 * Parse [[file:path|name|size]] wiki token.
 * @returns {{ path: string, name: string, size: number | null } | null}
 */
export function parseChatFileToken(inner: any) {
  const raw = String(inner || '').trim();
  if (!raw) return null;
  const parts = raw.split('|');
  const path = (parts[0] || '').trim();
  if (!path) return null;
  const name = sanitizeChatFileMeta(parts[1] || path.split('/').filter(Boolean).pop() || 'file');
  const sizeRaw = parts[2] != null ? Number(parts[2]) : null;
  const size = Number.isFinite(sizeRaw) ? sizeRaw : null;
  return { path, name, size };
}

/**
 * Split message body into plain text + attachment descriptors
 * (![[image]] / [[file:...]] / [[folder:...]] / [[note:...]]).
 * @returns {{ text: string, attachments: Array<{ kind: 'image'|'file'|'note'|'folder', path: string, name: string, size: number | null, background?: string | null }> }}
 */
export function extractChatBodyAttachments(body: any) {
  const s = String(body ?? '');
  if (!s) return { text: '', attachments: [] };

  const tokenRe =
    /!\[\[([^\]]+)\]\]|\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]|\[\[folder:([^|\]]+)(?:\|([^\]]*?))?\]\]|\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g;
  const attachments = [];
  const textParts = [];
  let last = 0;
  let m;
  while ((m = tokenRe.exec(s))) {
    if (m.index > last) textParts.push(s.slice(last, m.index));
    if (m[1] != null) {
      const parsed = parseWikiImageInner(String(m[1] || '').trim());
      const path = parsed?.path || '';
      if (path) {
        attachments.push({
          kind: 'image',
          path,
          name: sanitizeChatFileMeta(path.split('/').filter(Boolean).pop() || 'image'),
          size: null,
          background: parsed?.background || null,
        });
      }
    } else if (m[2] != null) {
      const path = String(m[2] || '').trim();
      if (path) {
        const name = sanitizeChatFileMeta(
          m[3] || path.split('/').filter(Boolean).pop() || 'file',
        );
        const sizeNum = m[4] != null ? Number(m[4]) : null;
        attachments.push({
          kind: 'file',
          path,
          name: name || 'file',
          size: Number.isFinite(sizeNum) ? sizeNum : null,
        });
      }
    } else if (m[5] != null) {
      let path = String(m[5] || '').trim().replace(/\\/g, '/');
      if (path) {
        if (!path.endsWith('/')) path = `${path}/`;
        attachments.push({
          kind: 'folder',
          path,
          name: sanitizeChatFileMeta(
            m[6] || path.replace(/\/+$/, '').split('/').filter(Boolean).pop() || 'folder',
          ),
          size: null,
        });
      }
    } else {
      const path = String(m[7] || '').trim();
      if (path) {
        attachments.push({
          kind: 'note',
          path,
          name: sanitizeChatFileMeta(
            m[8] || path.split('/').filter(Boolean).pop() || 'note',
          ),
          size: null,
        });
      }
    }
    last = m.index + m[0].length;
  }
  if (last < s.length) textParts.push(s.slice(last));

  const text = textParts
    .join('')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { text, attachments };
}

/**
 * Delete an uploaded chat attachment from S3 or the local folder.
 */
export async function deleteChatAttachment(ctx: any, path: any) {
  const key = String(path || '').replace(/^\/+/, '').trim();
  if (!key) return;

  if (ctx.mode === 'local') {
    if (!ctx.localRootHandle) return;
    const lastSlash = key.lastIndexOf('/');
    if (lastSlash < 0) {
      await ctx.localRootHandle.removeEntry(key);
      return;
    }
    const dir = await getLocalDirectoryHandleForPath(
      ctx.localRootHandle,
      key.slice(0, lastSlash),
      { create: false },
    );
    await dir.removeEntry(key.slice(lastSlash + 1));
    return;
  }

  const backend = createChatBackend(ctx);
  await backend.deleteKey(key);
}
