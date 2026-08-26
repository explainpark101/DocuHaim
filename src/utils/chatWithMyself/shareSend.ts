import {
  chatAttachmentsToMarkdown,
  uploadChatAttachment,
} from '@/utils/chatWithMyself/attachments';
import { appendChatMessage } from '@/utils/chatWithMyself/storage';
import { SELF_GROUP } from '@/utils/chatWithMyself/paths';

/**
 * @param {unknown} value
 * @returns {value is File | Blob}
 */
function isBlobLike(value: any) {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

/**
 * @param {unknown} items
 * @returns {File[]}
 */
export function normalizeShareFiles(items: any) {
  if (!Array.isArray(items) || !items.length) return [];
  /** @type {File[]} */
  const out = [];
  for (const item of items) {
    if (!item) continue;
    if (item instanceof File) {
      out.push(item);
      continue;
    }
    if (isBlobLike(item)) {
      out.push(
        new File([item], 'shared-file', {
          type: item.type || 'application/octet-stream',
        }),
      );
      continue;
    }
    if (isBlobLike(item.blob) || isBlobLike(item.file)) {
      const blob = item.blob || item.file;
      out.push(
        new File([blob], item.name || 'shared-file', {
          type: item.type || blob.type || 'application/octet-stream',
        }),
      );
    }
  }
  return out;
}

type ShareChatPayload = {
  body?: string;
  files?: unknown[];
  group?: string;
};

/**
 * Upload share attachments and append one chat message.
 * @param {import('@/utils/chatWithMyself/pendingShares').ChatStorageCtxLike} ctx
 * @param {{ body?: string, files?: unknown[], group?: string }} payload
 */
export async function appendShareChatMessage(ctx: any, payload: ShareChatPayload = {}) {
  const text = String(payload.body || '').trim();
  const files = normalizeShareFiles(payload.files);
  if (!text && !files.length) {
    throw new Error('공유할 내용이 없습니다.');
  }

  /** @type {{ kind: 'image'|'file', path: string, name: string, size: number }[]} */
  const uploaded = [];
  for (const file of files) {
    uploaded.push(await uploadChatAttachment(ctx, file));
  }
  const attachMd = chatAttachmentsToMarkdown(uploaded);
  const finalBody = [attachMd, text].filter(Boolean).join('\n\n');

  return appendChatMessage(ctx, {
    body: finalBody,
    group: payload.group || SELF_GROUP,
    source: 'share',
  });
}

/**
 * @param {{ body?: string, files?: unknown[] } | null | undefined} prompt
 */
export function sharePromptHasContent(prompt: any) {
  if (!prompt) return false;
  if (String(prompt.body || '').trim()) return true;
  return normalizeShareFiles(prompt.files).length > 0;
}
