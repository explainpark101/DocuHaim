/**
 * Per-file md-editor-rt undo checkpoints (IndexedDB).
 * Temporary history so Ctrl+Z can restore prior content after reopening a file.
 */
import Dexie from 'dexie';
import { getDraftKey } from '@/utils/memoDraftsDb';

export const editorUndoHistoryDb = new Dexie('s3haim-editor-undo-history');

editorUndoHistoryDb.version(1).stores({
  histories: 'key, updatedAt',
});

/** Max checkpoints kept per file */
export const MAX_EDITOR_UNDO_ENTRIES = 100;

/** Drop histories unused longer than this (temporary storage) */
export const EDITOR_UNDO_HISTORY_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** Debounce for recording checkpoints while typing */
export const EDITOR_UNDO_RECORD_DELAY_MS = 500;

/**
 * @param {'s3' | 'local' | string} storageType
 * @param {string} path
 * @returns {string}
 */
export function getEditorUndoHistoryKey(storageType, path) {
  return getDraftKey(storageType, path);
}

/**
 * @param {{ type?: string, id?: string } | null | undefined} currentFile
 * @returns {string | null}
 */
export function getEditorUndoHistoryKeyFromFile(currentFile) {
  if (!currentFile?.id) return null;
  if (currentFile.type !== 's3' && currentFile.type !== 'local') return null;
  return getEditorUndoHistoryKey(currentFile.type, currentFile.id);
}

/**
 * @typedef {Object} EditorUndoHistoryRecord
 * @property {string} key
 * @property {string[]} stack
 * @property {number} index
 * @property {number} updatedAt
 */

/**
 * @param {string} key
 * @returns {Promise<EditorUndoHistoryRecord | null>}
 */
export async function getEditorUndoHistory(key) {
  if (!key) return null;
  const record = await editorUndoHistoryDb.histories.get(key);
  if (!record) return null;
  if (
    typeof record.updatedAt === 'number'
    && Date.now() - record.updatedAt > EDITOR_UNDO_HISTORY_TTL_MS
  ) {
    await editorUndoHistoryDb.histories.delete(key);
    return null;
  }
  if (!Array.isArray(record.stack) || record.stack.length === 0) return null;
  return record;
}

/**
 * @param {string[]} stack
 * @returns {string[]}
 */
export function trimEditorUndoStack(stack) {
  if (!Array.isArray(stack)) return [''];
  if (stack.length <= MAX_EDITOR_UNDO_ENTRIES) return stack;
  return stack.slice(stack.length - MAX_EDITOR_UNDO_ENTRIES);
}

/**
 * @param {Object} params
 * @param {string} params.key
 * @param {string[]} params.stack
 * @param {number} params.index
 */
export async function saveEditorUndoHistory({ key, stack, index }) {
  if (!key) return;
  const trimmed = trimEditorUndoStack(stack);
  const safeIndex = Math.max(0, Math.min(index ?? trimmed.length - 1, trimmed.length - 1));
  await editorUndoHistoryDb.histories.put({
    key,
    stack: trimmed,
    index: safeIndex,
    updatedAt: Date.now(),
  });
}

/**
 * @param {string} key
 */
export async function deleteEditorUndoHistory(key) {
  if (!key) return;
  await editorUndoHistoryDb.histories.delete(key);
}

/**
 * Remove expired temporary histories.
 */
export async function pruneExpiredEditorUndoHistories() {
  const cutoff = Date.now() - EDITOR_UNDO_HISTORY_TTL_MS;
  await editorUndoHistoryDb.histories.where('updatedAt').below(cutoff).delete();
}

/**
 * Ensure `content` is the active checkpoint at the end of the stack.
 * @param {string[]} stack
 * @param {number} index
 * @param {string} content
 * @returns {{ stack: string[], index: number }}
 */
export function syncStackWithContent(stack, index, content) {
  const safeStack = Array.isArray(stack) && stack.length > 0 ? [...stack] : [''];
  let safeIndex = Math.max(0, Math.min(index, safeStack.length - 1));
  const current = content ?? '';

  if (safeStack[safeIndex] === current) {
    return { stack: safeStack, index: safeIndex };
  }

  const found = safeStack.lastIndexOf(current);
  if (found >= 0) {
    return { stack: safeStack, index: found };
  }

  const next = safeStack.slice(0, safeIndex + 1);
  next.push(current);
  const trimmed = trimEditorUndoStack(next);
  return { stack: trimmed, index: trimmed.length - 1 };
}

/**
 * Append a new checkpoint after an edit (drops redo branch).
 * If `content` matches an existing undo/redo neighbor, only moves the index.
 * @param {string[]} stack
 * @param {number} index
 * @param {string} content
 * @returns {{ stack: string[], index: number, changed: boolean }}
 */
export function pushEditorUndoCheckpoint(stack, index, content) {
  const current = content ?? '';
  const safeStack = Array.isArray(stack) && stack.length > 0 ? stack : [''];
  const safeIndex = Math.max(0, Math.min(index, safeStack.length - 1));

  if (safeStack[safeIndex] === current) {
    return { stack: safeStack, index: safeIndex, changed: false };
  }

  for (let i = safeIndex - 1; i >= 0; i -= 1) {
    if (safeStack[i] === current) {
      return { stack: safeStack, index: i, changed: true };
    }
  }
  for (let i = safeIndex + 1; i < safeStack.length; i += 1) {
    if (safeStack[i] === current) {
      return { stack: safeStack, index: i, changed: true };
    }
  }

  const next = safeStack.slice(0, safeIndex + 1);
  next.push(current);
  const trimmed = trimEditorUndoStack(next);
  return { stack: trimmed, index: trimmed.length - 1, changed: true };
}
