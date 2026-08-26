import { extractChatBodyAttachments } from '@/utils/chatWithMyself/attachments';
import { extractUrls } from '@/utils/chatWithMyself/og';

export type CollectionMediaFlags = {
  hasLinks: boolean;
  hasFiles: boolean;
  hasPhotos: boolean;
};

/**
 * Classify chat message body for 모아보기 media tabs (links / files / photos).
 */
export function getCollectionMediaFlags(
  body: string | null | undefined,
): CollectionMediaFlags {
  const text = String(body ?? '');
  const { attachments } = extractChatBodyAttachments(text);
  return {
    hasLinks: extractUrls(text).length > 0,
    hasFiles: attachments.some((a) => a.kind === 'file'),
    hasPhotos: attachments.some((a) => a.kind === 'image'),
  };
}

/**
 * Upsert or remove a message in a collection list by membership flag.
 * Newest-first by `at` (ISO).
 */
export function upsertCollectionMembership<T extends { id: string; at?: string }>(
  prev: T[],
  row: T,
  belongs: boolean,
): T[] {
  const without = prev.filter((m) => m.id !== row.id);
  if (!belongs) return without;
  return [row, ...without].sort(
    (a, b) => (Date.parse(b.at || '') || 0) - (Date.parse(a.at || '') || 0),
  );
}
