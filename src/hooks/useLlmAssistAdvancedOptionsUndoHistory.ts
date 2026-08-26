import { useCallback, useEffect, useRef, useState } from 'react';
import type { LlmAssistRequestOptionEntry } from '@/utils/llm/llmAssistRequestOptions';
import {
  LLM_ASSIST_ADVANCED_OPTIONS_UNDO_RECORD_DELAY_MS,
  parseLlmAssistAdvancedOptionsSnapshot,
  pushLlmAssistAdvancedOptionsUndoCheckpoint,
  serializeLlmAssistAdvancedOptionsSnapshot,
  type LlmAssistAdvancedOptionsUndoSnapshot,
} from '@/utils/llm/llmAssistAdvancedOptionsUndoHistory';

type UseLlmAssistAdvancedOptionsUndoHistoryArgs = {
  enabled: boolean;
  /** Bumps when the section opens or external content replaces local state. */
  historyKey: number;
  tab: 'fields' | 'json';
  entries: LlmAssistRequestOptionEntry[];
  jsonText: string;
  applySnapshot: (snapshot: LlmAssistAdvancedOptionsUndoSnapshot) => void;
};

/**
 * In-memory undo/redo for LlmAssist advanced options while the section is open.
 * Shortcuts: Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z / Cmd/Ctrl+Y (wired by the panel).
 */
export function useLlmAssistAdvancedOptionsUndoHistory({
  enabled,
  historyKey,
  tab,
  entries,
  jsonText,
  applySnapshot,
}: UseLlmAssistAdvancedOptionsUndoHistoryArgs) {
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
    () => serializeLlmAssistAdvancedOptionsSnapshot({ tab, entries, jsonText }),
    [entries, jsonText, tab],
  );

  const flushPendingRecord = useCallback(() => {
    clearRecordTimer();
    const pending = pendingSnapshotRef.current;
    if (pending == null) return;
    pendingSnapshotRef.current = null;
    const pushed = pushLlmAssistAdvancedOptionsUndoCheckpoint(
      stackRef.current,
      indexRef.current,
      pending,
    );
    if (!pushed.changed) return;
    stackRef.current = pushed.stack;
    indexRef.current = pushed.index;
    bump();
  }, [bump, clearRecordTimer]);

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
    const snap = serializeLlmAssistAdvancedOptionsSnapshot({ tab, entries, jsonText });
    stackRef.current = [snap];
    indexRef.current = 0;
    baselinedRef.current = true;
    bump();
    // Baseline once per historyKey; tab/entries/jsonText at that moment are the session start.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: historyKey session only
  }, [enabled, historyKey, bump, clearRecordTimer]);

  useEffect(() => {
    if (!enabled || !baselinedRef.current || suppressRef.current) return;
    const snap = currentSnap();
    if (stackRef.current[indexRef.current] === snap) return;
    pendingSnapshotRef.current = snap;
    clearRecordTimer();
    recordTimerRef.current = setTimeout(() => {
      recordTimerRef.current = null;
      flushPendingRecord();
    }, LLM_ASSIST_ADVANCED_OPTIONS_UNDO_RECORD_DELAY_MS);
    return () => {
      clearRecordTimer();
    };
  }, [clearRecordTimer, currentSnap, enabled, flushPendingRecord, entries, jsonText, tab]);

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
    const parsed = raw ? parseLlmAssistAdvancedOptionsSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applySnapshotRef.current({
      tab: parsed.tab,
      entries: parsed.entries.map((entry) => ({ ...entry })),
      jsonText: parsed.jsonText,
    });
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
    const parsed = raw ? parseLlmAssistAdvancedOptionsSnapshot(raw) : null;
    if (!parsed) return false;
    suppressRef.current = true;
    applySnapshotRef.current({
      tab: parsed.tab,
      entries: parsed.entries.map((entry) => ({ ...entry })),
      jsonText: parsed.jsonText,
    });
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
  };
}
