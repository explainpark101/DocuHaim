import { extractChatBodyAttachments } from '@/utils/chatWithMyself/attachments.js';
import { formatChatMessagePlainText } from '@/utils/chatWithMyself/format.js';

export type ShareChatMessageResult =
  | 'shared'
  | 'cancelled'
  | 'unavailable'
  | 'failed';

type ShareChatMessageLike = {
  body?: string | null | undefined;
};

type GetPresignedUrl = (
  path: string,
) => Promise<string | null | undefined> | string | null | undefined;

/**
 * True when the Web Share API is present (menu can offer Share).
 */
export function canOfferWebShare(): boolean {
  return (
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'
  );
}

function isAbortError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  return (err as { name?: string }).name === 'AbortError';
}

function canShareData(data: ShareData): boolean {
  if (typeof navigator.canShare !== 'function') return true;
  try {
    return navigator.canShare(data);
  } catch {
    return false;
  }
}

async function loadAttachmentFiles(
  attachments: Array<{ kind: string; path: string; name?: string }>,
  getPresignedUrl: GetPresignedUrl,
): Promise<File[]> {
  const out: File[] = [];
  for (const att of attachments) {
    if (att.kind !== 'image' && att.kind !== 'file') continue;
    const path = String(att.path || '').trim();
    if (!path) continue;
    try {
      const href = await getPresignedUrl(path);
      if (!href) continue;
      const res = await fetch(href);
      if (!res.ok) continue;
      const blob = await res.blob();
      const name =
        String(att.name || '').trim() ||
        path.split('/').filter(Boolean).pop() ||
        (att.kind === 'image' ? 'image' : 'file');
      const type =
        blob.type ||
        (att.kind === 'image' ? 'image/jpeg' : 'application/octet-stream');
      out.push(new File([blob], name, { type }));
    } catch {
      /* skip unreadable attachment */
    }
  }
  return out;
}

async function tryNavigatorShare(data: ShareData): Promise<ShareChatMessageResult> {
  if (!canShareData(data)) return 'failed';
  try {
    await navigator.share(data);
    return 'shared';
  } catch (err) {
    if (isAbortError(err)) return 'cancelled';
    return 'failed';
  }
}

/**
 * Share a chat message via the Web Share API (text + optional attachment files).
 */
export async function shareChatMessage(
  msg: ShareChatMessageLike | null | undefined,
  options: { getPresignedUrl?: GetPresignedUrl | null } = {},
): Promise<ShareChatMessageResult> {
  if (!canOfferWebShare()) return 'unavailable';

  const text = formatChatMessagePlainText(msg);
  const { attachments } = extractChatBodyAttachments(msg?.body || '');
  const media = attachments.filter(
    (a) => a.kind === 'image' || a.kind === 'file',
  );

  let files: File[] = [];
  if (media.length && typeof options.getPresignedUrl === 'function') {
    files = await loadAttachmentFiles(media, options.getPresignedUrl);
  }

  const title = '나와의 채팅';

  if (files.length) {
    const withFiles: ShareData = {
      title,
      files,
      ...(text ? { text } : {}),
    };
    const fileResult = await tryNavigatorShare(withFiles);
    if (fileResult === 'shared' || fileResult === 'cancelled') {
      return fileResult;
    }
  }

  if (!text.trim()) {
    return 'failed';
  }

  return tryNavigatorShare({ title, text });
}
