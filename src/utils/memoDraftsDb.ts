/**
 * Temporary note drafts (IndexedDB).
 * Used as last-viewed buffer across tab restore / reload, then compared to server.
 */
import Dexie from 'dexie';

export type MemoDraft = {
  key: string;
  content: string;
  /** lastModified of the server/disk copy when this draft was taken */
  originalLastModified: number;
  savedAt: number;
};

export const memoDraftsDb = new Dexie('s3haim-memo-drafts');

memoDraftsDb.version(1).stores({
  drafts: 'key, originalLastModified, savedAt',
});

export function getDraftKey(storageType: string, path: string): string {
  return `${storageType}:${path}`;
}

export async function saveMemoDraft(params: {
  key: string;
  content: string;
  originalLastModified: number;
}): Promise<void> {
  const record: MemoDraft = {
    key: params.key,
    content: params.content ?? '',
    originalLastModified: params.originalLastModified ?? 0,
    savedAt: Date.now(),
  };
  await memoDraftsDb.table('drafts').put(record);
}

export async function getMemoDraft(key: string): Promise<MemoDraft | null> {
  const record = await memoDraftsDb.table('drafts').where('key').equals(key).first();
  return (record as MemoDraft | undefined) ?? null;
}

export async function deleteMemoDraft(key: string): Promise<void> {
  await memoDraftsDb.table('drafts').where('key').equals(key).delete();
}
