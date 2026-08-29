import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  appendQuizTimeLogEvent,
  createEmptyQuizTimeLog,
  getQuizStopwatchBaseElapsedMs,
  isQuizStopwatchRunning,
  normalizeQuizTimeLog,
  type QuizTimeLog,
} from '@/utils/quiz/quizTimeLog';

export type UseQuizStopwatchOptions = {
  initialLog?: QuizTimeLog | null | undefined;
  /** Bump when session is hydrated from vault file to reset timer state. */
  hydrateKey?: number;
  onLogChange?: (log: QuizTimeLog) => void;
};

export type UseQuizStopwatchResult = {
  log: QuizTimeLog;
  displayMs: number;
  running: boolean;
  started: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

function computeLiveElapsedMs(
  running: boolean,
  baseElapsedMs: number,
  runStartedAt: number | null,
): number {
  if (!running || runStartedAt == null) return baseElapsedMs;
  return baseElapsedMs + Math.max(0, Date.now() - runStartedAt);
}

export function useQuizStopwatch({
  initialLog,
  hydrateKey = 0,
  onLogChange,
}: UseQuizStopwatchOptions): UseQuizStopwatchResult {
  const [log, setLog] = useState<QuizTimeLog>(() =>
    normalizeQuizTimeLog(initialLog ?? createEmptyQuizTimeLog()),
  );
  const [tick, setTick] = useState(0);
  const runStartedAtRef = useRef<number | null>(null);
  const onLogChangeRef = useRef(onLogChange);
  const initialLogRef = useRef(initialLog);
  onLogChangeRef.current = onLogChange;
  initialLogRef.current = initialLog;

  const running = isQuizStopwatchRunning(log);
  const started = log.events.length > 0;
  const baseElapsedMs = getQuizStopwatchBaseElapsedMs(log);

  useEffect(() => {
    const next = normalizeQuizTimeLog(initialLogRef.current ?? createEmptyQuizTimeLog());
    setLog(next);
    if (isQuizStopwatchRunning(next)) {
      runStartedAtRef.current = Date.now();
    } else {
      runStartedAtRef.current = null;
    }
  }, [hydrateKey]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 200);
    return () => window.clearInterval(id);
  }, [running]);

  const displayMs = useMemo(
    () => computeLiveElapsedMs(running, baseElapsedMs, runStartedAtRef.current),
    [running, baseElapsedMs, tick],
  );

  const start = useCallback(() => {
    runStartedAtRef.current = Date.now();
    setLog((prev) => {
      const next = appendQuizTimeLogEvent(prev, 'start', 0);
      onLogChangeRef.current?.(next);
      return next;
    });
  }, []);

  const pause = useCallback(() => {
    setLog((prev) => {
      if (!isQuizStopwatchRunning(prev)) return prev;
      const elapsed = computeLiveElapsedMs(
        true,
        getQuizStopwatchBaseElapsedMs(prev),
        runStartedAtRef.current,
      );
      runStartedAtRef.current = null;
      const next = appendQuizTimeLogEvent(prev, 'pause', elapsed);
      onLogChangeRef.current?.(next);
      return next;
    });
  }, []);

  const resume = useCallback(() => {
    setLog((prev) => {
      if (isQuizStopwatchRunning(prev)) return prev;
      const elapsed = getQuizStopwatchBaseElapsedMs(prev);
      runStartedAtRef.current = Date.now();
      const next = appendQuizTimeLogEvent(prev, 'resume', elapsed);
      onLogChangeRef.current?.(next);
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    setLog((prev) => {
      const elapsed = isQuizStopwatchRunning(prev)
        ? computeLiveElapsedMs(
            true,
            getQuizStopwatchBaseElapsedMs(prev),
            runStartedAtRef.current,
          )
        : getQuizStopwatchBaseElapsedMs(prev);
      runStartedAtRef.current = null;
      const next = appendQuizTimeLogEvent(prev, 'stop', elapsed);
      onLogChangeRef.current?.(next);
      return next;
    });
  }, []);

  return {
    log,
    displayMs,
    running,
    started,
    start,
    pause,
    resume,
    stop,
  };
}
