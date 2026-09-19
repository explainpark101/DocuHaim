/**
 * Per-file undo history for md-editor-rt:
 * - resetHistory() when switching files (no cross-file undo)
 * - checkpoint stack persisted in IndexedDB
 * - on reopen, replay checkpoints into CM history so Ctrl+Z works
 */
import { useCallback, useEffect, useRef, type MutableRefObject } from 'react';
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

type EditorRefLike = MutableRefObject<{ value?: unknown } | null | undefined> | MutableRefObject<unknown>;

function getEditorApi(editorRef: EditorRefLike) {
  const cur = editorRef?.current as { value?: unknown } | null | undefined;
  return cur?.value ?? cur ?? null;
}

/**
 * Content to persist for the file being left.
 * Must use the last content owned by that key — not `value` after React already
 * swapped props to the next file (that would poison the previous file's IDB).
 */
export function contentForPreviousFileKey(
  contentOwnedByPrevKey: string,
  _nextValue: string,
): string {
  return contentOwnedByPrevKey ?? '';
}

type Options = {
  currentFile: { type?: string; id?: string } | null | undefined;
  value: string;
  onChange?: ((v: string) => void) | undefined;
  editorRef: EditorRefLike;
  enabled?: boolean;
};

export function usePerFileEditorUndoHistory({
  currentFile,
  value,
  onChange,
  editorRef,
  enabled = true,
}: Options) {
  const fileKey = enabled ? getEditorUndoHistoryKeyFromFile(currentFile) : null;

  const stackRef = useRef<string[]>(['']);
  const indexRef = useRef(0);
  const fileKeyRef = useRef<string | null>(null);
  /** Last editor body that belongs to `fileKeyRef` (updated after key transitions). */
  const contentForActiveKeyRef = useRef(value ?? '');
  const suppressChangeRef = useRef(false);
  const hydratingRef = useRef(false);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valueRef = useRef(value);
  const hasLocalEditsRef = useRef(false);
  const initDoneForKeyRef = useRef<string | null>(null);
  const rebuildGenRef = useRef(0);
  const lastEmittedRef = useRef(value);

  valueRef.current = value;

  const persistNow = useCallback(async (key: string, stack: string[], index: number) => {
    if (!key) return;
    try {
      await saveEditorUndoHistory({ key, stack, index });
    } catch (err) {
      console.warn('[editor-undo-history] save failed:', err);
    }
  }, []);

  const schedulePersist = useCallback(
    (key: string, stack: string[], index: number) => {
      if (!key) return;
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        persistTimerRef.current = null;
        void persistNow(key, stack, index);
      }, 300);
    },
    [persistNow],
  );

  const flushRecordTimer = useCallback(() => {
    if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
  }, []);

  const captureContentIntoStack = useCallback((content: string) => {
    const synced = syncStackWithContent(stackRef.current, indexRef.current, content ?? '');
    stackRef.current = synced.stack;
    indexRef.current = synced.index;
    return synced;
  }, []);

  const rebuildFromStack = useCallback(
    (stackForReplay: string[]) => {
      const api = getEditorApi(editorRef);
      const view = getEditorViewFromApi(api);
      const resetHistory = getResetHistoryFn(api);
      if (!view) return false;

      const gen = ++rebuildGenRef.current;
      suppressChangeRef.current = true;
      hydratingRef.current = true;
      try {
        rebuildCmHistoryFromStack(view, stackForReplay, resetHistory ?? undefined);
      } finally {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (rebuildGenRef.current !== gen) return;
            suppressChangeRef.current = false;
            hydratingRef.current = false;
          });
        });
      }
      return true;
    },
    [editorRef],
  );

  const applyHistoryForFile = useCallback(
    (key: string, stored: { stack?: string[]; index?: number } | null) => {
      const content = valueRef.current ?? '';
      const baseStack = stored?.stack?.length ? stored.stack : [content];
      const baseIndex = stored?.stack?.length
        ? (stored.index ?? stored.stack.length - 1)
        : 0;
      const synced = syncStackWithContent(baseStack, baseIndex, content);
      stackRef.current = synced.stack;
      indexRef.current = synced.index;
      hasLocalEditsRef.current = false;
      lastEmittedRef.current = content;
      contentForActiveKeyRef.current = content;

      const replay = synced.stack.slice(0, synced.index + 1);
      const attempt = (triesLeft: number) => {
        if (fileKeyRef.current !== key) return;
        if (rebuildFromStack(replay)) {
          initDoneForKeyRef.current = key;
          return;
        }
        if (triesLeft <= 0) {
          initDoneForKeyRef.current = key;
          hydratingRef.current = false;
          suppressChangeRef.current = false;
          return;
        }
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

  // Keep content owned by the active key in sync while the key is stable.
  useEffect(() => {
    if (fileKeyRef.current !== fileKey) return;
    contentForActiveKeyRef.current = value ?? '';
  }, [value, fileKey]);

  // File switch: save previous (with content owned by that key), reset CM, load IDB.
  useEffect(() => {
    if (!enabled) return undefined;

    const prevKey = fileKeyRef.current;
    const nextKey = fileKey;

    flushRecordTimer();
    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
      persistTimerRef.current = null;
    }

    if (prevKey === nextKey) {
      return undefined;
    }

    if (prevKey) {
      const prevContent = contentForPreviousFileKey(
        contentForActiveKeyRef.current,
        valueRef.current ?? '',
      );
      const synced = captureContentIntoStack(prevContent);
      void persistNow(prevKey, synced.stack, synced.index);
    }

    fileKeyRef.current = nextKey;
    initDoneForKeyRef.current = null;
    hasLocalEditsRef.current = false;
    hydratingRef.current = true;
    contentForActiveKeyRef.current = valueRef.current ?? '';

    const api = getEditorApi(editorRef);
    getResetHistoryFn(api)?.();

    if (!nextKey) {
      stackRef.current = [valueRef.current ?? ''];
      indexRef.current = 0;
      initDoneForKeyRef.current = null;
      hydratingRef.current = false;
      return undefined;
    }

    const gen = ++rebuildGenRef.current;
    let cancelled = false;

    void (async () => {
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
    captureContentIntoStack,
    persistNow,
    applyHistoryForFile,
  ]);

  // If content arrives after IDB init (late split-pane restore), re-base once
  // before local edits — always prefer the parent/file body over a stale stack tip.
  useEffect(() => {
    if (!enabled || !fileKey) return;
    if (initDoneForKeyRef.current !== fileKey) return;
    if (hasLocalEditsRef.current) return;
    if (suppressChangeRef.current || hydratingRef.current) return;
    if (value === lastEmittedRef.current) return;

    const content = value ?? '';
    lastEmittedRef.current = content;
    contentForActiveKeyRef.current = content;
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
        contentForActiveKeyRef.current ?? valueRef.current ?? '',
      );
      void saveEditorUndoHistory({
        key,
        stack: synced.stack,
        index: synced.index,
      }).catch(() => {});
    };
  }, [enabled, flushRecordTimer]);

  const wrappedOnChange = useCallback(
    (nextValue: string) => {
      // Ignore CM noise while hydrating / rebuilding so restore cannot push
      // another file's stack tip into the active tab mirrors.
      if (suppressChangeRef.current || hydratingRef.current) {
        return;
      }
      if (initDoneForKeyRef.current !== fileKeyRef.current) {
        return;
      }

      lastEmittedRef.current = nextValue;
      contentForActiveKeyRef.current = nextValue;
      hasLocalEditsRef.current = true;
      onChange?.(nextValue);

      if (!enabled || !fileKeyRef.current) return;

      flushRecordTimer();
      recordTimerRef.current = setTimeout(() => {
        recordTimerRef.current = null;
        if (suppressChangeRef.current || hydratingRef.current) return;
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
