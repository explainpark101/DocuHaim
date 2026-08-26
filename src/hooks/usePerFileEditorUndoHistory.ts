/**
 * Per-file undo history for md-editor-rt:
 * - resetHistory() when switching files (no cross-file undo)
 * - checkpoint stack persisted in IndexedDB
 * - on reopen, replay checkpoints into CM history so Ctrl+Z works
 */
import { useCallback, useEffect, useRef } from 'react';
import {
  EDITOR_UNDO_RECORD_DELAY_MS,
  getEditorUndoHistory,
  getEditorUndoHistoryKeyFromFile,
  pruneExpiredEditorUndoHistories,
  pushEditorUndoCheckpoint,
  saveEditorUndoHistory,
  syncStackWithContent,
} from '@/utils/editorUndoHistoryDb';
import {
  getEditorViewFromApi,
  getResetHistoryFn,
  rebuildCmHistoryFromStack,
} from '@/utils/rebuildCmHistoryFromStack';

function getEditorApi(editorRef: any) {
  return editorRef?.current?.value ?? editorRef?.current ?? null;
}

/**
 * @param {Object} options
 * @param {{ type?: string, id?: string } | null} options.currentFile
 * @param {string} options.value
 * @param {(v: string) => void} [options.onChange]
 * @param {import('react').MutableRefObject} options.editorRef
 * @param {boolean} [options.enabled]
 */
export function usePerFileEditorUndoHistory({
  currentFile,
  value,
  onChange,
  editorRef,
  enabled = true
}: any) {
  const fileKey = enabled ? getEditorUndoHistoryKeyFromFile(currentFile) : null;

  const stackRef = useRef(['']);
  const indexRef = useRef(0);
  const fileKeyRef = useRef(null);
  const suppressChangeRef = useRef(false);
  const recordTimerRef = useRef(null);
  const persistTimerRef = useRef(null);
  const valueRef = useRef(value);
  const hasLocalEditsRef = useRef(false);
  const initDoneForKeyRef = useRef(null);
  const rebuildGenRef = useRef(0);
  const lastEmittedRef = useRef(value);

  valueRef.current = value;

  const persistNow = useCallback(async (key: any, stack: any, index: any) => {
    if (!key) return;
    try {
      await saveEditorUndoHistory({ key, stack, index });
    } catch (err) {
      console.warn('[editor-undo-history] save failed:', err);
    }
  }, []);

  const schedulePersist = useCallback((key: any, stack: any, index: any) => {
    if (!key) return;
    if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
    // @ts-expect-error TS(2322): Type 'Timeout' is not assignable to type 'null'.
    persistTimerRef.current = setTimeout(() => {
      persistTimerRef.current = null;
      persistNow(key, stack, index);
    }, 300);
  }, [persistNow]);

  const flushRecordTimer = useCallback(() => {
    if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
  }, []);

  const captureCurrentIntoStack = useCallback(() => {
    const content = valueRef.current ?? '';
    const synced = syncStackWithContent(stackRef.current, indexRef.current, content);
    stackRef.current = synced.stack;
    indexRef.current = synced.index;
    return synced;
  }, []);

  const rebuildFromStack = useCallback((stackForReplay: any) => {
    const api = getEditorApi(editorRef);
    const view = getEditorViewFromApi(api);
    const resetHistory = getResetHistoryFn(api);
    if (!view) return false;

    const gen = ++rebuildGenRef.current;
    suppressChangeRef.current = true;
    try {
      rebuildCmHistoryFromStack(view, stackForReplay, resetHistory ?? undefined);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (rebuildGenRef.current === gen) {
            suppressChangeRef.current = false;
          }
        });
      });
    }
    return true;
  }, [editorRef]);

  const applyHistoryForFile = useCallback(
    (key: any, stored: any) => {
      const content = valueRef.current ?? '';
      const baseStack = stored?.stack?.length ? stored.stack : [content];
      const baseIndex = stored?.stack?.length
        ? (stored.index ?? stored.stack.length - 1)
        : 0;
      const synced = syncStackWithContent(baseStack, baseIndex, content);
      stackRef.current = synced.stack;
      indexRef.current = synced.index;
      initDoneForKeyRef.current = key;
      hasLocalEditsRef.current = false;
      lastEmittedRef.current = content;

      const replay = synced.stack.slice(0, synced.index + 1);
      const attempt = (triesLeft: any) => {
        if (fileKeyRef.current !== key) return;
        if (rebuildFromStack(replay)) return;
        if (triesLeft <= 0) return;
        setTimeout(() => attempt(triesLeft - 1), 50);
      };
      attempt(40);

      schedulePersist(key, synced.stack, synced.index);
    },
    [rebuildFromStack, schedulePersist],
  );

  // Prune expired rows once per mount.
  useEffect(() => {
    if (!enabled) return undefined;
    pruneExpiredEditorUndoHistories().catch(() => {});
    return undefined;
  }, [enabled]);

  // File switch: save previous, reset CM history, load IDB + rebuild.
  useEffect(() => {
    if (!enabled) return undefined;

    const prevKey = fileKeyRef.current;
    const nextKey = fileKey;

    flushRecordTimer();
    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
      persistTimerRef.current = null;
    }

    if (prevKey && prevKey !== nextKey) {
      const synced = captureCurrentIntoStack();
      persistNow(prevKey, synced.stack, synced.index);
    }

    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'nu... Remove this comment to see the full error message
    fileKeyRef.current = nextKey;
    initDoneForKeyRef.current = null;
    hasLocalEditsRef.current = false;

    const api = getEditorApi(editorRef);
    getResetHistoryFn(api)?.();

    if (!nextKey) {
      stackRef.current = [valueRef.current ?? ''];
      indexRef.current = 0;
      return undefined;
    }

    const gen = ++rebuildGenRef.current;
    let cancelled = false;

    (async () => {
      let stored = null;
      try {
        stored = await getEditorUndoHistory(nextKey);
      } catch (err) {
        console.warn('[editor-undo-history] load failed:', err);
      }
      if (cancelled || rebuildGenRef.current !== gen) return;
      if (fileKeyRef.current !== nextKey) return;
      applyHistoryForFile(nextKey, stored);
    })();

    return () => {
      cancelled = true;
    };
  }, [
    enabled,
    fileKey,
    editorRef,
    flushRecordTimer,
    captureCurrentIntoStack,
    persistNow,
    applyHistoryForFile,
  ]);

  // If content arrives after IDB init (rare late load), re-base once before local edits.
  useEffect(() => {
    if (!enabled || !fileKey) return;
    if (initDoneForKeyRef.current !== fileKey) return;
    if (hasLocalEditsRef.current) return;
    if (suppressChangeRef.current) return;
    if (value === lastEmittedRef.current) return;

    const content = value ?? '';
    lastEmittedRef.current = content;
    const synced = syncStackWithContent(stackRef.current, indexRef.current, content);
    stackRef.current = synced.stack;
    indexRef.current = synced.index;
    rebuildFromStack(synced.stack.slice(0, synced.index + 1));
    schedulePersist(fileKey, synced.stack, synced.index);
  }, [enabled, fileKey, value, rebuildFromStack, schedulePersist]);

  // Flush on unmount.
  useEffect(() => {
    if (!enabled) return undefined;
    return () => {
      flushRecordTimer();
      if (persistTimerRef.current) {
        clearTimeout(persistTimerRef.current);
        persistTimerRef.current = null;
      }
      const key = fileKeyRef.current;
      if (!key) return;
      const synced = syncStackWithContent(
        stackRef.current,
        indexRef.current,
        valueRef.current ?? '',
      );
      saveEditorUndoHistory({
        key,
        stack: synced.stack,
        index: synced.index,
      }).catch(() => {});
    };
  }, [enabled, flushRecordTimer]);

  const wrappedOnChange = useCallback(
    (nextValue: any) => {
      if (suppressChangeRef.current) {
        return;
      }

      lastEmittedRef.current = nextValue;
      hasLocalEditsRef.current = true;
      onChange?.(nextValue);

      if (!enabled || !fileKeyRef.current) return;

      flushRecordTimer();
      // @ts-expect-error TS(2322): Type 'Timeout' is not assignable to type 'null'.
      recordTimerRef.current = setTimeout(() => {
        recordTimerRef.current = null;
        if (suppressChangeRef.current) return;
        const key = fileKeyRef.current;
        if (!key) return;

        const pushed = pushEditorUndoCheckpoint(
          stackRef.current,
          indexRef.current,
          nextValue,
        );
        if (!pushed.changed) return;
        stackRef.current = pushed.stack;
        indexRef.current = pushed.index;
        schedulePersist(key, pushed.stack, pushed.index);
      }, EDITOR_UNDO_RECORD_DELAY_MS);
    },
    [enabled, onChange, flushRecordTimer, schedulePersist],
  );

  return {
    onChange: wrappedOnChange,
  };
}
