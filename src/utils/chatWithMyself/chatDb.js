import Dexie from 'dexie';
import { isS3StorageScope } from '@/utils/storageScope';

export const chatDb = new Dexie('s3haim-chat-with-myself');

chatDb.version(1).stores({
  pendingMessages: '++id, dayKey, createdAt',
  pendingShares: '++id, createdAt',
  dayCache: 'dayKey',
  ogCache: 'urlHash',
});

chatDb.version(2).stores({
  pendingMessages: '++id, dayKey, createdAt',
  pendingShares: '++id, createdAt',
  dayCache: 'dayKey',
  ogCache: 'urlHash',
  composerDraftImages: 'id',
});

chatDb.version(3).stores({
  pendingMessages: '++id, scope, dayKey, createdAt',
  pendingShares: '++id, createdAt',
  dayCache: 'dayKey',
  ogCache: 'urlHash',
  composerDraftImages: 'id',
});

const DAY_CACHE_SEP = '::';

export function scopedDayCacheKey(scope, dayKey) {
  return `${scope}${DAY_CACHE_SEP}${dayKey}`;
}

export async function savePendingMessage(record) {
  return chatDb.pendingMessages.add({
    ...record,
    scope: typeof record.scope === 'string' ? record.scope : '',
    createdAt: record.createdAt ?? Date.now(),
  });
}

export async function getPendingMessages(scope) {
  if (!scope) return [];
  const rows = await chatDb.pendingMessages.orderBy('createdAt').toArray();
  return rows.filter((row) => {
    const rowScope = typeof row.scope === 'string' ? row.scope : '';
    if (rowScope === scope) return true;
    // Pre-scope rows were written when S3 was the only backend.
    if (!rowScope && isS3StorageScope(scope)) return true;
    return false;
  });
}

export async function deletePendingMessage(id) {
  return chatDb.pendingMessages.delete(id);
}

export async function savePendingShare(payload) {
  return chatDb.pendingShares.add({
    ...payload,
    createdAt: Date.now(),
  });
}

export async function getPendingShares() {
  return chatDb.pendingShares.orderBy('createdAt').toArray();
}

export async function deletePendingShare(id) {
  return chatDb.pendingShares.delete(id);
}

export async function cacheDay(scope, dayKey, content) {
  if (!scope || !dayKey) return;
  await chatDb.dayCache.put({
    dayKey: scopedDayCacheKey(scope, dayKey),
    content,
    updatedAt: Date.now(),
  });
}

export async function getCachedDay(scope, dayKey) {
  if (!scope || !dayKey) return undefined;
  return chatDb.dayCache.get(scopedDayCacheKey(scope, dayKey));
}

export async function cacheOg(urlHash, data) {
  await chatDb.ogCache.put({ urlHash, data, updatedAt: Date.now() });
}

export async function getCachedOg(urlHash) {
  return chatDb.ogCache.get(urlHash);
}

export async function putComposerDraftImage(record) {
  return chatDb.composerDraftImages.put({
    ...record,
    updatedAt: record.updatedAt ?? Date.now(),
  });
}

export async function getComposerDraftImages(ids = []) {
  if (!ids.length) return [];
  const rows = await chatDb.composerDraftImages.bulkGet(ids);
  return rows.filter(Boolean);
}

export async function deleteComposerDraftImage(id) {
  return chatDb.composerDraftImages.delete(id);
}

export async function clearComposerDraftImages() {
  return chatDb.composerDraftImages.clear();
}

export async function listComposerDraftImageIds() {
  return chatDb.composerDraftImages.toCollection().primaryKeys();
}
