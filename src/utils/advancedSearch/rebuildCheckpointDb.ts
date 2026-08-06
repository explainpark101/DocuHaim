/**
 * Mid-rebuild checkpoints for Advanced Search (IndexedDB).
 * Full vault write still happens only on finalize; this lets a crashed build resume.
 */
import Dexie from 'dexie';
import { INDEX_SCHEMA_VERSION } from './types';

export const rebuildCheckpointDb = new Dexie('s3haim-advanced-search-rebuild');

rebuildCheckpointDb.version(1).stores({
  checkpoints: 'key',
});

export type RebuildCheckpointRecord = {
  /** Stable per-storage identity (e.g. s3:bucket, webdav:url, local:name). */
  key: string;
  schemaVersion: number;
  includeOtherFiles: boolean;
  processedFilePaths: string[];
  processedChatPaths: string[];
  postingsGz: Uint8Array;
  docsGz: Uint8Array;
  updatedAt: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
const checkpoints = (rebuildCheckpointDb as any).checkpoints as {
  put: (row: RebuildCheckpointRecord) => Promise<string>;
  get: (key: string) => Promise<RebuildCheckpointRecord | undefined>;
  delete: (key: string) => Promise<void>;
};

export async function saveRebuildCheckpoint(
  record: Omit<RebuildCheckpointRecord, 'updatedAt' | 'schemaVersion'> & {
    schemaVersion?: number;
  },
): Promise<void> {
  const row: RebuildCheckpointRecord = {
    key: record.key,
    schemaVersion: record.schemaVersion ?? INDEX_SCHEMA_VERSION,
    includeOtherFiles: record.includeOtherFiles,
    processedFilePaths: record.processedFilePaths,
    processedChatPaths: record.processedChatPaths,
    postingsGz: record.postingsGz,
    docsGz: record.docsGz,
    updatedAt: Date.now(),
  };
  await checkpoints.put(row);
}

export async function getRebuildCheckpoint(
  key: string,
): Promise<RebuildCheckpointRecord | null> {
  if (!key) return null;
  const row = await checkpoints.get(key);
  if (!row) return null;
  return {
    ...row,
    postingsGz: toUint8Array(row.postingsGz),
    docsGz: toUint8Array(row.docsGz),
    processedFilePaths: Array.isArray(row.processedFilePaths)
      ? row.processedFilePaths
      : [],
    processedChatPaths: Array.isArray(row.processedChatPaths)
      ? row.processedChatPaths
      : [],
  };
}

function toUint8Array(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  return new Uint8Array();
}

export async function deleteRebuildCheckpoint(key: string): Promise<void> {
  if (!key) return;
  await checkpoints.delete(key);
}

/** True when checkpoint can resume the current rebuild settings. */
export function isCheckpointCompatible(
  row: RebuildCheckpointRecord | null | undefined,
  includeOtherFiles: boolean,
): row is RebuildCheckpointRecord {
  if (!row) return false;
  if (row.schemaVersion !== INDEX_SCHEMA_VERSION) return false;
  return row.includeOtherFiles === includeOtherFiles;
}
