import Dexie from 'dexie';

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

export async function savePendingMessage(record) {
  return chatDb.pendingMessages.add({
    ...record,
    createdAt: record.createdAt ?? Date.now(),
  });
}

export async function getPendingMessages() {
  return chatDb.pendingMessages.orderBy('createdAt').toArray();
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

export async function cacheDay(dayKey, content) {
  await chatDb.dayCache.put({ dayKey, content, updatedAt: Date.now() });
}

export async function getCachedDay(dayKey) {
  return chatDb.dayCache.get(dayKey);
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
