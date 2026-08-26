import Dexie from 'dexie';
import { isS3StorageScope } from '@/utils/vault/storageScope';

export const chatDb = new Dexie('s3haim-chat-with-myself') as any;

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

export function scopedDayCacheKey(scope: any, dayKey: any) {
  return `${scope}${DAY_CACHE_SEP}${dayKey}`;
}

export async function savePendingMessage(record: any) {
  return chatDb.pendingMessages.add({
    ...record,
    scope: typeof record.scope === 'string' ? record.scope : '',
    createdAt: record.createdAt ?? Date.now(),
  });
}

export async function getPendingMessages(scope: any) {
  if (!scope) return [];
  const rows = await chatDb.pendingMessages.orderBy('createdAt').toArray();
  return rows.filter((row: any) => {
    const rowScope = typeof row.scope === 'string' ? row.scope : '';
    if (rowScope === scope) return true;
    // Pre-scope rows were written when S3 was the only backend.
    if (!rowScope && isS3StorageScope(scope)) return true;
    return false;
  });
}

export async function deletePendingMessage(id: any) {
  return chatDb.pendingMessages.delete(id);
}

export async function savePendingShare(payload: any) {
  return chatDb.pendingShares.add({
    ...payload,
    createdAt: Date.now(),
  });
}

export async function getPendingShares() {
  return chatDb.pendingShares.orderBy('createdAt').toArray();
}

export async function deletePendingShare(id: any) {
  return chatDb.pendingShares.delete(id);
}

export async function cacheDay(scope: any, dayKey: any, content: any) {
  if (!scope || !dayKey) return;
  await chatDb.dayCache.put({
    dayKey: scopedDayCacheKey(scope, dayKey),
    content,
    updatedAt: Date.now(),
  });
}

export async function getCachedDay(scope: any, dayKey: any) {
  if (!scope || !dayKey) return undefined;
  return chatDb.dayCache.get(scopedDayCacheKey(scope, dayKey));
}

export async function cacheOg(urlHash: any, data: any) {
  await chatDb.ogCache.put({ urlHash, data, updatedAt: Date.now() });
}

export async function getCachedOg(urlHash: any) {
  return chatDb.ogCache.get(urlHash);
}

/** Remove one URL hash from the OG IndexedDB cache. */
export async function deleteCachedOg(urlHash: any) {
  if (!urlHash) return;
  await chatDb.ogCache.delete(urlHash);
}

const DRAFT_IMAGE_SEP = '::';

export function scopedDraftImageId(scope: any, id: any) {
  return `${scope}${DRAFT_IMAGE_SEP}${id}`;
}

function isUnscopedDraftImageId(id: any) {
  return typeof id === 'string' && !id.includes(DRAFT_IMAGE_SEP);
}

export async function putComposerDraftImage(record: any) {
  const scope = typeof record.scope === 'string' ? record.scope : '';
  const logicalId = record.id;
  if (!logicalId) return undefined;
  const storeId = scope ? scopedDraftImageId(scope, logicalId) : logicalId;
  return chatDb.composerDraftImages.put({
    ...record,
    id: storeId,
    logicalId,
    scope,
    updatedAt: record.updatedAt ?? Date.now(),
  });
}

export async function getComposerDraftImages(scope: any, ids = []) {
  if (!ids.length) return [];
  /** @type {object[]} */
  const out = [];
  for (const id of ids) {
    let row = scope
      ? await chatDb.composerDraftImages.get(scopedDraftImageId(scope, id))
      : null;
    if (!row) row = await chatDb.composerDraftImages.get(id);
    if (row) out.push({ ...row, id });
  }
  return out;
}

export async function deleteComposerDraftImage(scope: any, id: any) {
  if (scope) {
    await chatDb.composerDraftImages.delete(scopedDraftImageId(scope, id));
  }
  if (!scope || isS3StorageScope(scope)) {
    await chatDb.composerDraftImages.delete(id);
  }
}

export async function clearComposerDraftImages(scope: any) {
  if (!scope) return;
  const keys = await chatDb.composerDraftImages.toCollection().primaryKeys();
  const prefix = `${scope}${DRAFT_IMAGE_SEP}`;
  const mine = keys.filter((key: any) => String(key).startsWith(prefix));
  const legacy =
    isS3StorageScope(scope) ? keys.filter((key: any) => isUnscopedDraftImageId(key)) : [];
  const toDelete = [...new Set([...mine, ...legacy])];
  if (toDelete.length) await chatDb.composerDraftImages.bulkDelete(toDelete);
}

export async function listComposerDraftImageIds(scope: any) {
  const keys = await chatDb.composerDraftImages.toCollection().primaryKeys();
  if (!scope) return [];
  const prefix = `${scope}${DRAFT_IMAGE_SEP}`;
  const scoped = keys
    .filter((key: any) => String(key).startsWith(prefix))
    .map((key: any) => String(key).slice(prefix.length));
  if (!isS3StorageScope(scope)) return scoped;
  const legacy = keys.filter((key: any) => isUnscopedDraftImageId(key));
  return [...new Set([...legacy, ...scoped])];
}
