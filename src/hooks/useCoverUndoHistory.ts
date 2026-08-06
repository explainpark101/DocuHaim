import { useCallback, useEffect, useRef, useState } from 'react';
import type { NoteCover } from '@/utils/noteCover/types';
import {
  COVER_UNDO_RECORD_DELAY_MS,
  deleteCoverUndoHistory,
  getCoverUndoHistory,
  getCoverUndoHistoryKeyFromFile,
  parseCoverSnapshot,
  pushCoverUndoCheckpoint,
  saveCoverUndoHistory,
  serializeCoverSnapshot,
} from '@/utils/noteCover/coverUndoHistoryDb';

type PrintFile = {
  type?: string | null;
  id?: string | null;
};

type UseCoverUndoHistoryArgs = {
  currentFile?: PrintFile | null;
  enabled: boolean;
  /** Latest cover from markdown (for session bootstrap). */
  cover: NoteCover | null | undefined;
  applyCover: (next: NoteCover) => void;
};

/**
 * Session undo/redo for note cover edits (IndexedDB-backed while page is open).
 */
export function useCoverUndoHistory({
  currentFile = null,
  enabled,
  cover,
  applyCover,
}: UseCoverUndoHistoryArgs) {
  const fileKey = enabled ? getCoverUndoHistoryKeyFromFile(currentFile) : null;
  const stackRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const suppressRef = useRef(false);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSnapshotRef = useRef<string | null>(null);
  const fileKeyRef = useRef<string | null>(null);
  const applyCoverRef = useRef(applyCover);
  applyCoverRef.current = applyCover;

  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((n) => n + 1), []);

  const persistSoon = useCallback((key: string, stack: string[], index: number) => {
    if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
    persistTimerRef.current = setTimeout(() => {
      persistTimerRef.current = null;
      void saveCoverUndoHistory({ key, stack, index }).catch((err) => {
        console.warn('[cover-undo] save failed:', err);
      });
    }, 250);
  }, []);

  const flushPendingRecord = useCallback(() => {
    if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    const key = fileKeyRef.current;
    const pending = pendingSnapshotRef.current;
    if (!key || pending == null) return;
    pendingSnapshotRef.current = null;
    const pushed = pushCoverUndoCheckpoint(stackRef.current, indexRef.current, pending);
    if (!pushed.changed) return;
    stackRef.current = pushed.stack;
    indexRef.current = pushed.index;
    persistSoon(key, pushed.stack, pushed.index);
    bump();
  }, [bump, persistSoon]);

  // Bootstrap / reset when file or edit session starts.
  useEffect(() => {
    if (!enabled || !fileKey || !cover) {
      return;
    }

    let cancelled = false;
    const snap = serializeCoverSnapshot(cover);

    const boot = async () => {
      if (fileKeyRef.current === fileKey && stackRef.current.length > 0) {
        return;
      }
      fileKeyRef.current = fileKey;
      pendingSnapshotRef.current = null;
      if (recordTimerRef.current) {
        clearTimeout(recordTimerRef.current);
        recordTimerRef.current = null;
      }
      try {
        const stored = await getCoverUndoHistory(fileKey);
        if (cancelled) return;
        if (stored?.stack?.length) {
          stackRef.current = stored.stack;
          indexRef.current = Math.max(
            0,
            Math.min(stored.index ?? stored.stack.length - 1, stored.stack.length - 1),
          );
          const pushed = pushCoverUndoCheckpoint(
            stackRef.current,
            indexRef.current,
            snap,
          );
          stackRef.current = pushed.stack;
          indexRef.current = pushed.index;
        } else {
          stackRef.current = [snap];
          indexRef.current = 0;
        }
        persistSoon(fileKey, stackRef.current, indexRef.current);
        bump();
      } catch (err) {
        console.warn('[cover-undo] load failed:', err);
        if (cancelled) return;
        stackRef.current = [snap];
        indexRef.current = 0;
        bump();
      }
    };

    void boot();
    return () => {
      cancelled = true;
    };
    // Intentionally omit `cover` — only bootstrap per fileKey/enabled session.
  }, [enabled, fileKey, bump, persistSoon]);

  // Clear IDB entry when leaving the export page (unmount).
  useEffect(() => {
    return () => {
      if (recordTimerRef.current) clearTimeout(recordTimerRef.current);
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      const key = fileKeyRef.current;
      if (key) {
        void deleteCoverUndoHistory(key).catch(() => {});
      }
    };
  }, []);

  const onCoverChange = useCallback(
    (next: NoteCover) => {
      applyCoverRef.current(next);
      if (suppressRef.current) return;
      const key = fileKeyRef.current;
      if (!key) return;

      pendingSnapshotRef.current = serializeCoverSnapshot(next);
      if (recordTimerRef.current) clearTimeout(recordTimerRef.current);
      recordTimerRef.current = setTimeout(() => {
        recordTimerRef.current = null;
        flushPendingRecord();
      }, COVER_UNDO_RECORD_DELAY_MS);
    },
    [flushPendingRecord],
  );

  const undo = useCallback(() => {
    flushPendingRecord();
    if (indexRef.current <= 0) return false;
    indexRef.current -= 1;
    const raw = stackRef.current[indexRef.current];
    const parsed = raw ? parseCoverSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applyCoverRef.current(parsed);
    const key = fileKeyRef.current;
    if (key) persistSoon(key, stackRef.current, indexRef.current);
    bump();
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
    return true;
  }, [bump, flushPendingRecord, persistSoon]);

  const redo = useCallback(() => {
    flushPendingRecord();
    if (indexRef.current >= stackRef.current.length - 1) return false;
    indexRef.current += 1;
    const raw = stackRef.current[indexRef.current];
    const parsed = raw ? parseCoverSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applyCoverRef.current(parsed);
    const key = fileKeyRef.current;
    if (key) persistSoon(key, stackRef.current, indexRef.current);
    bump();
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
    return true;
  }, [bump, flushPendingRecord, persistSoon]);

  const canUndo = enabled && indexRef.current > 0;
  const canRedo = enabled && indexRef.current < stackRef.current.length - 1;
  void tick;

  return {
    onCoverChange,
    undo,
    redo,
    canUndo,
    canRedo,
    flushPendingRecord,
  };
}
