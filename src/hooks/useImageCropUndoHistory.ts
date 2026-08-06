import { useCallback, useEffect, useRef, useState } from 'react';
import {
  IMAGE_CROP_UNDO_RECORD_DELAY_MS,
  clearAllImageCropUndoHistories,
  createImageCropUndoSessionKey,
  deleteImageCropUndoHistory,
  parseImageCropSnapshot,
  pushImageCropUndoCheckpoint,
  saveImageCropUndoHistory,
  serializeImageCropSnapshot,
  type ImageCropUndoSnapshot,
} from '@/utils/imageCrop/imageCropUndoHistoryDb';

type UseImageCropUndoHistoryArgs = {
  enabled: boolean;
  imageSrc: string;
  getSnapshot: () => ImageCropUndoSnapshot;
  applySnapshot: (snapshot: ImageCropUndoSnapshot) => void;
};

/**
 * Session undo/redo for the image crop modal (IndexedDB-backed while open).
 * History is deleted when the modal unmounts / closes.
 */
export function useImageCropUndoHistory({
  enabled,
  imageSrc,
  getSnapshot,
  applySnapshot,
}: UseImageCropUndoHistoryArgs) {
  const stackRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const suppressRef = useRef(false);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSnapshotRef = useRef<string | null>(null);
  const sessionKeyRef = useRef<string | null>(null);
  const disposedRef = useRef(false);
  const baselinedRef = useRef(false);
  const getSnapshotRef = useRef(getSnapshot);
  const applySnapshotRef = useRef(applySnapshot);
  getSnapshotRef.current = getSnapshot;
  applySnapshotRef.current = applySnapshot;

  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((n) => n + 1), []);

  const clearTimers = useCallback(() => {
    if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
      persistTimerRef.current = null;
    }
  }, []);

  const persistSoon = useCallback((key: string, stack: string[], index: number) => {
    if (disposedRef.current || sessionKeyRef.current !== key) return;
    if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
    persistTimerRef.current = setTimeout(() => {
      persistTimerRef.current = null;
      if (disposedRef.current || sessionKeyRef.current !== key) return;
      void saveImageCropUndoHistory({ key, stack, index })
        .then(() => {
          // Modal may have closed while the put was in flight — drop resurrected rows.
          if (disposedRef.current || sessionKeyRef.current !== key) {
            void deleteImageCropUndoHistory(key).catch(() => {});
          }
        })
        .catch((err) => {
          console.warn('[image-crop-undo] save failed:', err);
        });
    }, 200);
  }, []);

  const flushPendingRecord = useCallback(() => {
    if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    const key = sessionKeyRef.current;
    const pending = pendingSnapshotRef.current;
    if (!key || pending == null || disposedRef.current) return;
    pendingSnapshotRef.current = null;
    const pushed = pushImageCropUndoCheckpoint(
      stackRef.current,
      indexRef.current,
      pending,
    );
    if (!pushed.changed) return;
    stackRef.current = pushed.stack;
    indexRef.current = pushed.index;
    persistSoon(key, pushed.stack, pushed.index);
    bump();
  }, [bump, persistSoon]);

  // Create a session while open; wipe IndexedDB when the modal closes (unmount).
  useEffect(() => {
    if (!enabled || !imageSrc) {
      return undefined;
    }

    disposedRef.current = false;
    clearTimers();

    const key = createImageCropUndoSessionKey(imageSrc);
    sessionKeyRef.current = key;
    stackRef.current = [];
    indexRef.current = 0;
    pendingSnapshotRef.current = null;
    baselinedRef.current = false;
    bump();

    return () => {
      disposedRef.current = true;
      clearTimers();
      pendingSnapshotRef.current = null;
      const active = sessionKeyRef.current;
      sessionKeyRef.current = null;
      stackRef.current = [];
      indexRef.current = 0;
      baselinedRef.current = false;
      void (async () => {
        try {
          if (active) await deleteImageCropUndoHistory(active);
          await clearAllImageCropUndoHistories();
        } catch {
          // best-effort cleanup on close
        }
      })();
    };
  }, [enabled, imageSrc, bump, clearTimers]);

  const ensureBaseline = useCallback(() => {
    if (!enabled || disposedRef.current || baselinedRef.current) return;
    const key = sessionKeyRef.current;
    if (!key) return;
    const snap = serializeImageCropSnapshot(getSnapshotRef.current());
    stackRef.current = [snap];
    indexRef.current = 0;
    baselinedRef.current = true;
    persistSoon(key, stackRef.current, indexRef.current);
    bump();
  }, [bump, enabled, persistSoon]);

  const recordSoon = useCallback(() => {
    if (!enabled || disposedRef.current || suppressRef.current || !baselinedRef.current) {
      return;
    }
    const key = sessionKeyRef.current;
    if (!key) return;
    pendingSnapshotRef.current = serializeImageCropSnapshot(getSnapshotRef.current());
    if (recordTimerRef.current) clearTimeout(recordTimerRef.current);
    recordTimerRef.current = setTimeout(() => {
      recordTimerRef.current = null;
      flushPendingRecord();
    }, IMAGE_CROP_UNDO_RECORD_DELAY_MS);
  }, [enabled, flushPendingRecord]);

  const recordNow = useCallback(() => {
    if (!enabled || disposedRef.current || suppressRef.current || !baselinedRef.current) {
      return;
    }
    const key = sessionKeyRef.current;
    if (!key) return;
    pendingSnapshotRef.current = serializeImageCropSnapshot(getSnapshotRef.current());
    flushPendingRecord();
  }, [enabled, flushPendingRecord]);

  const undo = useCallback(() => {
    flushPendingRecord();
    if (indexRef.current <= 0) return false;
    indexRef.current -= 1;
    const raw = stackRef.current[indexRef.current];
    const parsed = raw ? parseImageCropSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applySnapshotRef.current(parsed);
    const key = sessionKeyRef.current;
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
    const parsed = raw ? parseImageCropSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applySnapshotRef.current(parsed);
    const key = sessionKeyRef.current;
    if (key) persistSoon(key, stackRef.current, indexRef.current);
    bump();
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
    return true;
  }, [bump, flushPendingRecord, persistSoon]);

  const canUndo = enabled && baselinedRef.current && indexRef.current > 0;
  const canRedo =
    enabled
    && baselinedRef.current
    && indexRef.current < stackRef.current.length - 1;
  void tick;

  return {
    ensureBaseline,
    recordSoon,
    recordNow,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
