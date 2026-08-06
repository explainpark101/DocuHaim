import type { HaimTableGrid, HaimTableMeta } from '@/utils/haimTable/types';

export const MAX_TABLE_EDIT_UNDO_ENTRIES = 80;
/** Coalesce continuous edits (typing / drag resize) into one checkpoint. */
export const TABLE_EDIT_UNDO_RECORD_DELAY_MS = 350;

export type TableEditUndoSnapshot = {
  meta: HaimTableMeta;
  grid: HaimTableGrid;
};

export function serializeTableEditSnapshot(snapshot: TableEditUndoSnapshot): string {
  return JSON.stringify(snapshot);
}

export function parseTableEditSnapshot(raw: string): TableEditUndoSnapshot | null {
  try {
    const parsed = JSON.parse(raw) as TableEditUndoSnapshot;
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.meta || typeof parsed.meta !== 'object') return null;
    if (!parsed.grid || !Array.isArray(parsed.grid.rows)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function trimTableEditUndoStack(stack: string[]): string[] {
  if (!Array.isArray(stack) || stack.length === 0) return [];
  if (stack.length <= MAX_TABLE_EDIT_UNDO_ENTRIES) return stack;
  return stack.slice(stack.length - MAX_TABLE_EDIT_UNDO_ENTRIES);
}

export function pushTableEditUndoCheckpoint(
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
  const trimmed = trimTableEditUndoStack(next);
  return { stack: trimmed, index: trimmed.length - 1, changed: true };
}
