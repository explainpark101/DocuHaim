/**
 * Per-document note-cover editor fold state (IndexedDB).
 */
import Dexie from 'dexie';
import { getDraftKey } from '@/utils/memoDraftsDb';

export const noteCoverFoldStateDb = new Dexie('s3haim-note-cover-fold') as any;

noteCoverFoldStateDb.version(1).stores({
  folds: 'key, updatedAt',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
const folds = (noteCoverFoldStateDb as any).folds as {
  get: (key: string) => Promise<NoteCoverFoldRecord | undefined>;
  put: (row: NoteCoverFoldRecord) => Promise<string>;
  delete: (key: string) => Promise<void>;
};

export type NoteCoverFoldRecord = {
  key: string;
  collapsed: boolean;
  updatedAt: number;
};

export function getNoteCoverFoldKey(
  storageType: string,
  path: string,
): string {
  return `cover-fold:${getDraftKey(storageType, path)}`;
}

export function getNoteCoverFoldKeyFromFile(
  currentFile: { type?: string | null; id?: string | null } | null | undefined,
): string | null {
  if (!currentFile?.id) return null;
  if (currentFile.type !== 's3' && currentFile.type !== 'local' && currentFile.type !== 'webdav') {
    return null;
  }
  return getNoteCoverFoldKey(currentFile.type, currentFile.id);
}

export async function getNoteCoverFoldCollapsed(
  key: string,
): Promise<boolean | null> {
  if (!key) return null;
  const record = await folds.get(key);
  if (!record || typeof record.collapsed !== 'boolean') return null;
  return record.collapsed;
}

export async function saveNoteCoverFoldCollapsed(
  key: string,
  collapsed: boolean,
): Promise<void> {
  if (!key) return;
  await folds.put({
    key,
    collapsed: Boolean(collapsed),
    updatedAt: Date.now(),
  });
}

export async function deleteNoteCoverFoldState(key: string): Promise<void> {
  if (!key) return;
  await folds.delete(key);
}
