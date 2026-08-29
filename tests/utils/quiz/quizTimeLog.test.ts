import { describe, expect, it } from 'vitest';
import {
  appendQuizTimeLogEvent,
  appendQuizQuestionTimeEntry,
  createEmptyQuizTimeLog,
  formatQuizElapsedMs,
  getQuizStopwatchBaseElapsedMs,
  isQuizStopwatchRunning,
  isQuizTimeLogEmpty,
  normalizeQuizTimeLog,
} from '@/utils/quiz/quizTimeLog';
import {
  isQuizSessionEmpty,
  normalizeQuizPersistedSession,
  parseQuizSessionComment,
  serializeQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';

describe('quizTimeLog', () => {
  it('appends events and tracks running state', () => {
    let log = createEmptyQuizTimeLog();
    expect(isQuizTimeLogEmpty(log)).toBe(true);
    expect(isQuizStopwatchRunning(log)).toBe(false);

    log = appendQuizTimeLogEvent(log, 'start', 0, '2026-08-30T10:00:00.000Z');
    expect(isQuizStopwatchRunning(log)).toBe(true);
    expect(getQuizStopwatchBaseElapsedMs(log)).toBe(0);

    log = appendQuizTimeLogEvent(log, 'pause', 12_500, '2026-08-30T10:00:12.500Z');
    expect(isQuizStopwatchRunning(log)).toBe(false);
    expect(getQuizStopwatchBaseElapsedMs(log)).toBe(12_500);

    log = appendQuizTimeLogEvent(log, 'resume', 12_500, '2026-08-30T10:01:00.000Z');
    expect(isQuizStopwatchRunning(log)).toBe(true);

    log = appendQuizTimeLogEvent(log, 'stop', 45_000, '2026-08-30T10:01:32.500Z');
    expect(isQuizStopwatchRunning(log)).toBe(false);
    expect(log.events).toHaveLength(4);
  });

  it('formats elapsed ms', () => {
    expect(formatQuizElapsedMs(0)).toBe('00:00');
    expect(formatQuizElapsedMs(65_000)).toBe('01:05');
    expect(formatQuizElapsedMs(3_661_000)).toBe('1:01:01');
  });

  it('normalizes invalid payloads', () => {
    const log = normalizeQuizTimeLog({
      version: 1,
      events: [
        { type: 'start', at: '2026-08-30T10:00:00.000Z', elapsedMs: 0 },
        { type: 'bogus', at: 'x', elapsedMs: 1 },
        { type: 'pause', at: '', elapsedMs: 5 },
      ],
    });
    expect(log.events).toHaveLength(1);
    expect(log.events[0]?.type).toBe('start');
  });

  it('appends per-question time entries', () => {
    let log = createEmptyQuizTimeLog();
    log = appendQuizQuestionTimeEntry(log, {
      questionId: '1',
      displayLabel: '1',
      at: '2026-08-30T10:00:05.000Z',
      endedAt: '2026-08-30T10:00:35.000Z',
      durationMs: 30_000,
    });
    expect(isQuizTimeLogEmpty(log)).toBe(false);
    expect(log.questionEntries).toHaveLength(1);
    expect(log.questionEntries?.[0]?.durationMs).toBe(30_000);
  });
});

describe('quizSessionPersist timeLog', () => {
  it('round-trips timeLog in quiz-session comment', () => {
    const session = normalizeQuizPersistedSession({
      userAnswers: {},
      gradedQuestions: {},
      subjectiveGrades: {},
      isSubmitted: false,
      timeLog: {
        version: 1,
        events: [
          { type: 'start', at: '2026-08-30T10:00:00.000Z', elapsedMs: 0 },
          { type: 'pause', at: '2026-08-30T10:00:30.000Z', elapsedMs: 30_000 },
        ],
        questionEntries: [
          {
            questionId: '1',
            displayLabel: '1',
            at: '2026-08-30T10:00:01.000Z',
            endedAt: '2026-08-30T10:00:20.000Z',
            durationMs: 19_000,
          },
        ],
      },
    });
    expect(isQuizSessionEmpty(session)).toBe(false);
    const line = serializeQuizSessionComment(session);
    const { session: parsed } = parseQuizSessionComment(line);
    expect(parsed?.timeLog?.events).toHaveLength(2);
    expect(parsed?.timeLog?.events[1]?.type).toBe('pause');
    expect(parsed?.timeLog?.questionEntries).toHaveLength(1);
    expect(parsed?.timeLog?.questionEntries?.[0]?.questionId).toBe('1');
  });
});
