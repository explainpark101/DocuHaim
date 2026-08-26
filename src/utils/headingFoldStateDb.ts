/**
 * Per-document markdown heading fold state in the md-editor preview (IndexedDB).
 */
import Dexie from 'dexie';
import { getDraftKey } from '@/utils/memoDraftsDb';

export const headingFoldStateDb = new Dexie('s3haim-preview-heading-fold') as any;

headingFoldStateDb.version(1).stores({
  folds: 'key, updatedAt',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
const folds = (headingFoldStateDb as any).folds as {
  get: (key: string) => Promise<HeadingFoldRecord | undefined>;
  put: (row: HeadingFoldRecord) => Promise<string>;
  delete: (key: string) => Promise<void>;
};

export type HeadingFoldRecord = {
  key: string;
  collapsedIds: string[];
  updatedAt: number;
};

export function getHeadingFoldKey(
  storageType: string,
  path: string,
): string {
  return `heading-fold:${getDraftKey(storageType, path)}`;
}

export function getHeadingFoldKeyFromFile(
  currentFile: { type?: string | null; id?: string | null } | null | undefined,
): string | null {
  if (!currentFile?.id) return null;
  if (currentFile.type !== 's3' && currentFile.type !== 'local' && currentFile.type !== 'webdav') {
    return null;
  }
  return getHeadingFoldKey(currentFile.type, currentFile.id);
}

export async function getHeadingFoldCollapsedIds(
  key: string,
): Promise<string[] | null> {
  if (!key) return null;
  const record = await folds.get(key);
  if (!record || !Array.isArray(record.collapsedIds)) return null;
  return record.collapsedIds.filter((id) => typeof id === 'string' && id.length > 0);
}

export async function saveHeadingFoldCollapsedIds(
  key: string,
  collapsedIds: string[],
): Promise<void> {
  if (!key) return;
  await folds.put({
    key,
    collapsedIds: Array.from(new Set(collapsedIds.filter(Boolean))),
    updatedAt: Date.now(),
  });
}
