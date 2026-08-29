export type QuizTimeLogEventType = 'start' | 'pause' | 'resume' | 'stop';

export type QuizTimeLogEvent = {
  type: QuizTimeLogEventType;
  /** ISO-8601 timestamp when the event occurred. */
  at: string;
  /** Elapsed active time in ms at this event (excludes paused intervals). */
  elapsedMs: number;
};

/** Time spent on one question while the stopwatch was running. */
export type QuizQuestionTimeEntry = {
  questionId: string;
  displayLabel: string;
  /** ISO-8601 when focus on this question started. */
  at: string;
  /** ISO-8601 when focus ended (switch, pause, or stop). */
  endedAt: string;
  /** Active elapsed ms on this question (excludes paused intervals). */
  durationMs: number;
};

export type QuizTimeLog = {
  version: 1;
  events: QuizTimeLogEvent[];
  questionEntries?: QuizQuestionTimeEntry[];
};

export const QUIZ_TIME_LOG_EVENT_LABEL: Record<QuizTimeLogEventType, string> = {
  start: '시작',
  pause: '일시정지',
  resume: '재개',
  stop: '정지',
};

export function createEmptyQuizTimeLog(): QuizTimeLog {
  return { version: 1, events: [], questionEntries: [] };
}

function normalizeQuizQuestionTimeEntry(raw: unknown): QuizQuestionTimeEntry | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const questionId = String(o.questionId || '').trim();
  const displayLabel = String(o.displayLabel || '').trim();
  const at = String(o.at || '').trim();
  const endedAt = String(o.endedAt || '').trim();
  if (!questionId || !at || !endedAt) return null;
  const durationN = typeof o.durationMs === 'number' ? o.durationMs : Number(o.durationMs);
  const durationMs = Number.isFinite(durationN)
    ? Math.max(0, Math.round(durationN))
    : 0;
  return {
    questionId,
    displayLabel: displayLabel || questionId,
    at,
    endedAt,
    durationMs,
  };
}

export function normalizeQuizTimeLog(raw: unknown): QuizTimeLog {
  if (!raw || typeof raw !== 'object') return createEmptyQuizTimeLog();
  const o = raw as Record<string, unknown>;
  const events: QuizTimeLogEvent[] = [];
  if (Array.isArray(o.events)) {
    for (const item of o.events) {
      if (!item || typeof item !== 'object') continue;
      const e = item as Record<string, unknown>;
      const type = String(e.type || '').trim() as QuizTimeLogEventType;
      if (!QUIZ_TIME_LOG_EVENT_LABEL[type]) continue;
      const at = String(e.at || '').trim();
      if (!at) continue;
      const elapsedN = typeof e.elapsedMs === 'number' ? e.elapsedMs : Number(e.elapsedMs);
      const elapsedMs = Number.isFinite(elapsedN)
        ? Math.max(0, Math.round(elapsedN))
        : 0;
      events.push({ type, at, elapsedMs });
    }
  }
  const questionEntries: QuizQuestionTimeEntry[] = [];
  if (Array.isArray(o.questionEntries)) {
    for (const item of o.questionEntries) {
      const entry = normalizeQuizQuestionTimeEntry(item);
      if (entry) questionEntries.push(entry);
    }
  }
  return {
    version: 1,
    events,
    ...(questionEntries.length ? { questionEntries } : {}),
  };
}

export function isQuizTimeLogEmpty(log: QuizTimeLog | null | undefined): boolean {
  return !log?.events?.length && !log?.questionEntries?.length;
}

export function getQuizTimeLogTail(log: QuizTimeLog | null | undefined): QuizTimeLogEvent | null {
  if (!log?.events?.length) return null;
  return log.events[log.events.length - 1] ?? null;
}

export function isQuizStopwatchRunning(log: QuizTimeLog | null | undefined): boolean {
  const tail = getQuizTimeLogTail(log);
  return tail?.type === 'start' || tail?.type === 'resume';
}

export function getQuizStopwatchBaseElapsedMs(log: QuizTimeLog | null | undefined): number {
  const tail = getQuizTimeLogTail(log);
  return tail?.elapsedMs ?? 0;
}

export function formatQuizElapsedMs(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatQuizTimeLogAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function appendQuizTimeLogEvent(
  log: QuizTimeLog | null | undefined,
  type: QuizTimeLogEventType,
  elapsedMs: number,
  at: string = new Date().toISOString(),
): QuizTimeLog {
  const base = normalizeQuizTimeLog(log);
  return {
    version: 1,
    events: [
      ...base.events,
      {
        type,
        at,
        elapsedMs: Math.max(0, Math.round(elapsedMs)),
      },
    ],
    ...(base.questionEntries?.length ? { questionEntries: base.questionEntries } : {}),
  };
}

export function appendQuizQuestionTimeEntry(
  log: QuizTimeLog | null | undefined,
  entry: QuizQuestionTimeEntry,
): QuizTimeLog {
  const base = normalizeQuizTimeLog(log);
  const normalized = normalizeQuizQuestionTimeEntry(entry);
  if (!normalized) return base;
  return {
    version: 1,
    events: base.events,
    questionEntries: [...(base.questionEntries ?? []), normalized],
  };
}

/** Minimum focus duration to persist (avoids scroll flicker noise). */
export const QUIZ_QUESTION_TIME_MIN_MS = 300;
