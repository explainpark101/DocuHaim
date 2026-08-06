/**
 * Cover editor undo/redo checkpoints (IndexedDB) while Export PDF page is open.
 */
import Dexie from 'dexie';
import { getDraftKey } from '@/utils/memoDraftsDb';
import type { NoteCover } from '@/utils/noteCover/types';

export const coverUndoHistoryDb = new Dexie('s3haim-cover-undo-history');

coverUndoHistoryDb.version(1).stores({
  histories: 'key, updatedAt',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
const histories = (coverUndoHistoryDb as any).histories as {
  get: (key: string) => Promise<CoverUndoHistoryRecord | undefined>;
  put: (row: CoverUndoHistoryRecord) => Promise<string>;
  delete: (key: string) => Promise<void>;
};

export const MAX_COVER_UNDO_ENTRIES = 80;
export const COVER_UNDO_HISTORY_TTL_MS = 24 * 60 * 60 * 1000;
/** Coalesce continuous edits (drag / typing) into one checkpoint. */
export const COVER_UNDO_RECORD_DELAY_MS = 400;

export type CoverUndoHistoryRecord = {
  key: string;
  stack: string[];
  index: number;
  updatedAt: number;
};

export function getCoverUndoHistoryKey(
  storageType: string,
  path: string,
): string {
  return `cover:${getDraftKey(storageType, path)}`;
}

export function getCoverUndoHistoryKeyFromFile(
  currentFile: { type?: string | null; id?: string | null } | null | undefined,
): string | null {
  if (!currentFile?.id) return null;
  if (currentFile.type !== 's3' && currentFile.type !== 'local' && currentFile.type !== 'webdav') {
    return null;
  }
  return getCoverUndoHistoryKey(currentFile.type, currentFile.id);
}

export function serializeCoverSnapshot(cover: NoteCover): string {
  return JSON.stringify(cover);
}

export function parseCoverSnapshot(raw: string): NoteCover | null {
  try {
    const parsed = JSON.parse(raw) as NoteCover;
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.elements)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function trimCoverUndoStack(stack: string[]): string[] {
  if (!Array.isArray(stack) || stack.length === 0) return [];
  if (stack.length <= MAX_COVER_UNDO_ENTRIES) return stack;
  return stack.slice(stack.length - MAX_COVER_UNDO_ENTRIES);
}

export async function getCoverUndoHistory(
  key: string,
): Promise<CoverUndoHistoryRecord | null> {
  if (!key) return null;
  const record = await histories.get(key);
  if (!record) return null;
  if (
    typeof record.updatedAt === 'number' &&
    Date.now() - record.updatedAt > COVER_UNDO_HISTORY_TTL_MS
  ) {
    await histories.delete(key);
    return null;
  }
  if (!Array.isArray(record.stack) || record.stack.length === 0) return null;
  return record;
}

export async function saveCoverUndoHistory({
  key,
  stack,
  index,
}: {
  key: string;
  stack: string[];
  index: number;
}): Promise<void> {
  if (!key) return;
  const trimmed = trimCoverUndoStack(stack);
  const safeIndex = Math.max(0, Math.min(index ?? trimmed.length - 1, trimmed.length - 1));
  await histories.put({
    key,
    stack: trimmed,
    index: safeIndex,
    updatedAt: Date.now(),
  });
}

export async function deleteCoverUndoHistory(key: string): Promise<void> {
  if (!key) return;
  await histories.delete(key);
}

export function pushCoverUndoCheckpoint(
  stack: string[],
  index: number,
  snapshot: string,
): { stack: string[]; index: number; changed: boolean } {
  const safeStack = Array.isArray(stack) && stack.length > 0 ? stack : [];
  if (safeStack.length === 0) {
    return { stack: [snapshot], index: 0, changed: true };
  }
  const safeIndex = Math.max(0, Math.min(index, safeStack.length - 1));
  if (safeStack[safeIndex] === snapshot) {
    return { stack: safeStack, index: safeIndex, changed: false };
  }
  const next = safeStack.slice(0, safeIndex + 1);
  next.push(snapshot);
  const trimmed = trimCoverUndoStack(next);
  return { stack: trimmed, index: trimmed.length - 1, changed: true };
}
