import { useCallback, useEffect, useRef, useState } from 'react';
import type { HaimTableGrid, HaimTableMeta } from '@/utils/haimTable/types';
import {
  TABLE_EDIT_UNDO_RECORD_DELAY_MS,
  parseTableEditSnapshot,
  pushTableEditUndoCheckpoint,
  serializeTableEditSnapshot,
  type TableEditUndoSnapshot,
} from '@/utils/haimTable/tableEditUndoHistory';

type UseTableEditUndoHistoryArgs = {
  enabled: boolean;
  /** Bumps when the modal boots a fresh edit session. */
  historyKey: number;
  meta: HaimTableMeta;
  grid: HaimTableGrid;
  applySnapshot: (snapshot: TableEditUndoSnapshot) => void;
};

/**
 * In-memory undo/redo for TableEditModal (session lasts while the modal is open).
 * Shortcuts: Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z / Cmd/Ctrl+Y (wired by the modal).
 */
export function useTableEditUndoHistory({
  enabled,
  historyKey,
  meta,
  grid,
  applySnapshot,
}: UseTableEditUndoHistoryArgs) {
  const stackRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const suppressRef = useRef(false);
  const baselinedRef = useRef(false);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSnapshotRef = useRef<string | null>(null);
  const applySnapshotRef = useRef(applySnapshot);
  applySnapshotRef.current = applySnapshot;

  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((n) => n + 1), []);

  const clearRecordTimer = useCallback(() => {
    if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
  }, []);

  const currentSnap = useCallback(
    () => serializeTableEditSnapshot({ meta, grid }),
    [grid, meta],
  );

  const flushPendingRecord = useCallback(() => {
    clearRecordTimer();
    const pending = pendingSnapshotRef.current;
    if (pending == null) return;
    pendingSnapshotRef.current = null;
    const pushed = pushTableEditUndoCheckpoint(
      stackRef.current,
      indexRef.current,
      pending,
    );
    if (!pushed.changed) return;
    stackRef.current = pushed.stack;
    indexRef.current = pushed.index;
    bump();
  }, [bump, clearRecordTimer]);

  // Reset when modal closes; baseline when a new session key opens.
  useEffect(() => {
    if (!enabled) {
      clearRecordTimer();
      pendingSnapshotRef.current = null;
      stackRef.current = [];
      indexRef.current = 0;
      baselinedRef.current = false;
      bump();
      return;
    }
    if (historyKey <= 0) return;
    clearRecordTimer();
    pendingSnapshotRef.current = null;
    const snap = serializeTableEditSnapshot({ meta, grid });
    stackRef.current = [snap];
    indexRef.current = 0;
    baselinedRef.current = true;
    bump();
    // Baseline once per historyKey; meta/grid at that moment are the session start.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: historyKey session only
  }, [enabled, historyKey, bump, clearRecordTimer]);

  // Record edits (debounced).
  useEffect(() => {
    if (!enabled || !baselinedRef.current || suppressRef.current) return;
    const snap = currentSnap();
    if (stackRef.current[indexRef.current] === snap) return;
    pendingSnapshotRef.current = snap;
    clearRecordTimer();
    recordTimerRef.current = setTimeout(() => {
      recordTimerRef.current = null;
      flushPendingRecord();
    }, TABLE_EDIT_UNDO_RECORD_DELAY_MS);
    return () => {
      clearRecordTimer();
    };
  }, [clearRecordTimer, currentSnap, enabled, flushPendingRecord, grid, meta]);

  const recordNow = useCallback(() => {
    if (!enabled || !baselinedRef.current || suppressRef.current) return;
    pendingSnapshotRef.current = currentSnap();
    flushPendingRecord();
  }, [currentSnap, enabled, flushPendingRecord]);

  const undo = useCallback(() => {
    flushPendingRecord();
    if (indexRef.current <= 0) return false;
    indexRef.current -= 1;
    const raw = stackRef.current[indexRef.current];
    const parsed = raw ? parseTableEditSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applySnapshotRef.current(parsed);
    bump();
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
    return true;
  }, [bump, flushPendingRecord]);

  const redo = useCallback(() => {
    flushPendingRecord();
    if (indexRef.current >= stackRef.current.length - 1) return false;
    indexRef.current += 1;
    const raw = stackRef.current[indexRef.current];
    const parsed = raw ? parseTableEditSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applySnapshotRef.current(parsed);
    bump();
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
    return true;
  }, [bump, flushPendingRecord]);

  const canUndo = enabled && baselinedRef.current && indexRef.current > 0;
  const canRedo =
    enabled
    && baselinedRef.current
    && indexRef.current < stackRef.current.length - 1;
  void tick;

  return {
    undo,
    redo,
    canUndo,
    canRedo,
    recordNow,
    flushPendingRecord,
  };
}
