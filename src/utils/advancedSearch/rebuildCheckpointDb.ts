/**
 * Mid-rebuild checkpoints for Advanced Search (IndexedDB).
 * Stores Lucivy LUCE snapshot + docs meta so a crashed build can resume.
 */
import Dexie from 'dexie';
import { INDEX_SCHEMA_VERSION } from '@/utils/advancedSearch/types';

export const rebuildCheckpointDb = new Dexie('s3haim-advanced-search-rebuild');

rebuildCheckpointDb.version(1).stores({
  checkpoints: 'key',
});

// v2: luceGz instead of postingsGz (same store; incompatible rows cleared by schemaVersion)
rebuildCheckpointDb.version(2).stores({
  checkpoints: 'key',
});

export type RebuildCheckpointRecord = {
  /** Stable per-storage identity (e.g. s3:bucket, webdav:url, local:name). */
  key: string;
  schemaVersion: number;
  includeOtherFiles: boolean;
  /** Sorted exclude-folder list at checkpoint time (optional on legacy rows). */
  excludedFolders?: string[];
  processedFilePaths: string[];
  processedChatPaths: string[];
  /** Gzipped Lucivy LUCE snapshot (raw snapshot bytes gzipped). */
  luceGz: Uint8Array;
  docsGz: Uint8Array;
  updatedAt: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
const checkpoints = (rebuildCheckpointDb as any).checkpoints as {
  put: (row: RebuildCheckpointRecord) => Promise<string>;
  get: (key: string) => Promise<(RebuildCheckpointRecord & { postingsGz?: Uint8Array }) | undefined>;
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
    excludedFolders: record.excludedFolders ? [...record.excludedFolders] : [],
    processedFilePaths: record.processedFilePaths,
    processedChatPaths: record.processedChatPaths,
    luceGz: record.luceGz,
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
  // Drop v1 postings checkpoints
  if (!row.luceGz && (row as { postingsGz?: Uint8Array }).postingsGz) {
    await deleteRebuildCheckpoint(key);
    return null;
  }
  return {
    key: row.key,
    schemaVersion: row.schemaVersion,
    includeOtherFiles: row.includeOtherFiles,
    excludedFolders: Array.isArray(row.excludedFolders)
      ? row.excludedFolders.filter((x): x is string => typeof x === 'string')
      : [],
    luceGz: toUint8Array(row.luceGz),
    docsGz: toUint8Array(row.docsGz),
    processedFilePaths: Array.isArray(row.processedFilePaths)
      ? row.processedFilePaths
      : [],
    processedChatPaths: Array.isArray(row.processedChatPaths)
      ? row.processedChatPaths
      : [],
    updatedAt: row.updatedAt || 0,
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
  excludedFolders: readonly string[] = [],
): row is RebuildCheckpointRecord {
  if (!row) return false;
  if (row.schemaVersion !== INDEX_SCHEMA_VERSION) return false;
  if (!row.luceGz?.byteLength) return false;
  if (row.includeOtherFiles !== includeOtherFiles) return false;
  const a = JSON.stringify(
    Array.isArray(row.excludedFolders) ? [...row.excludedFolders].sort() : [],
  );
  const b = JSON.stringify([...excludedFolders].sort());
  return a === b;
}
