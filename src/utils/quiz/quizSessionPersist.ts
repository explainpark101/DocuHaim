import { escapeJsonForComment } from '@/utils/quiz/quizFileConfig';
import {
  isWrongChoiceExplanationsEmpty,
  normalizeWrongChoiceExplanations,
  filterWrongChoiceExplanations,
} from '@/utils/quiz/quizWrongChoiceExplanations';
import {
  isQuizTimeLogEmpty,
  normalizeQuizTimeLog,
} from '@/utils/quiz/quizTimeLog';
import type {
  QuizPersistedSession,
  QuizSessionAnswers,
  SubjectiveGradeResult,
  SubjectiveVerdict,
} from '@/utils/quiz/quizTypes';

const QUIZ_SESSION_COMMENT_RE = /<!--\s*quiz-session\s*([\s\S]*?)-->/i;

const SUBJECTIVE_VERDICTS: SubjectiveVerdict[] = ['correct', 'partial', 'wrong'];

export const QUIZ_SESSION_DEFAULT: QuizPersistedSession = {
  version: 1,
  userAnswers: {},
  gradedQuestions: {},
  subjectiveGrades: {},
  isSubmitted: false,
  timeLog: { version: 1, events: [] },
};

function unescapeJsonFromComment(raw: string): string {
  return String(raw || '').replace(/\\u002d\\u002d/gi, '--');
}

function normalizeUserAnswers(raw: unknown): QuizSessionAnswers {
  if (!raw || typeof raw !== 'object') return {};
  const out: QuizSessionAnswers = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const id = String(key || '').trim();
    if (!id) continue;
    if (typeof value === 'number' && Number.isFinite(value)) {
      out[id] = Math.round(value);
      continue;
    }
    if (typeof value === 'string') {
      out[id] = value;
    }
  }
  return out;
}

function normalizeSubjectiveGrades(
  raw: unknown,
): Record<string, SubjectiveGradeResult> {
  if (!raw || typeof raw !== 'object') return {};
  const out: Record<string, SubjectiveGradeResult> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const id = String(key || '').trim();
    if (!id || !value || typeof value !== 'object') continue;
    const o = value as Record<string, unknown>;
    const verdictRaw = String(o.verdict || '').trim();
    if (!SUBJECTIVE_VERDICTS.includes(verdictRaw as SubjectiveVerdict)) continue;
    const verdict = verdictRaw as SubjectiveVerdict;
    const scoreN = typeof o.score === 'number' ? o.score : Number(o.score);
    const score = Number.isFinite(scoreN)
      ? Math.min(100, Math.max(0, Math.round(scoreN)))
      : verdict === 'correct'
        ? 100
        : verdict === 'partial'
          ? 50
          : 0;
    const feedback = typeof o.feedback === 'string' ? o.feedback : '';
    const rationale = typeof o.rationale === 'string' ? o.rationale : undefined;
    out[id] = {
      verdict,
      score,
      feedback,
      ...(rationale ? { rationale } : {}),
    };
  }
  return out;
}

function normalizeBoolRecord(raw: unknown): Record<string, boolean> {
  if (!raw || typeof raw !== 'object') return {};
  const out: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const id = String(key || '').trim();
    if (!id) continue;
    out[id] = Boolean(value);
  }
  return out;
}

export function normalizeQuizPersistedSession(
  raw: Partial<QuizPersistedSession> | null | undefined,
): QuizPersistedSession {
  const timeLog = normalizeQuizTimeLog(raw?.timeLog);
  const wrongChoiceExplanations = normalizeWrongChoiceExplanations(
    raw?.wrongChoiceExplanations,
  );
  return {
    version: 1,
    userAnswers: normalizeUserAnswers(raw?.userAnswers),
    gradedQuestions: normalizeBoolRecord(raw?.gradedQuestions),
    subjectiveGrades: normalizeSubjectiveGrades(raw?.subjectiveGrades),
    isSubmitted: Boolean(raw?.isSubmitted),
    ...(isQuizTimeLogEmpty(timeLog) ? {} : { timeLog }),
    ...(isWrongChoiceExplanationsEmpty(wrongChoiceExplanations)
      ? {}
      : { wrongChoiceExplanations }),
  };
}

export function isQuizSessionEmpty(session: QuizPersistedSession): boolean {
  return (
    Object.keys(session.userAnswers).length === 0 &&
    Object.keys(session.gradedQuestions).length === 0 &&
    Object.keys(session.subjectiveGrades).length === 0 &&
    !session.isSubmitted &&
    isQuizTimeLogEmpty(session.timeLog) &&
    isWrongChoiceExplanationsEmpty(session.wrongChoiceExplanations)
  );
}

/** Keep only entries for questions that still exist in the document. */
export function filterQuizSessionForQuestions(
  session: QuizPersistedSession,
  questionIds: ReadonlySet<string> | readonly string[],
  questions?: readonly { id: string; options?: string[] }[],
): QuizPersistedSession {
  const ids = questionIds instanceof Set ? questionIds : new Set(questionIds);
  const pick = <T extends Record<string, unknown>>(record: T): T => {
    const out = {} as T;
    for (const [key, value] of Object.entries(record)) {
      if (ids.has(key)) {
        (out as Record<string, unknown>)[key] = value;
      }
    }
    return out;
  };
  const optionCountByQuestion = new Map<string, number>();
  if (questions) {
    for (const q of questions) {
      if (!ids.has(q.id)) continue;
      optionCountByQuestion.set(q.id, q.options?.length || 0);
    }
  }
  const wrongChoiceExplanations = filterWrongChoiceExplanations(
    session.wrongChoiceExplanations || {},
    ids,
    optionCountByQuestion.size > 0 ? optionCountByQuestion : undefined,
  );
  return normalizeQuizPersistedSession({
    version: 1,
    userAnswers: pick(session.userAnswers),
    gradedQuestions: pick(session.gradedQuestions),
    subjectiveGrades: pick(session.subjectiveGrades),
    isSubmitted: session.isSubmitted,
    ...(session.timeLog ? { timeLog: session.timeLog } : {}),
    ...(isWrongChoiceExplanationsEmpty(wrongChoiceExplanations)
      ? {}
      : { wrongChoiceExplanations }),
  });
}

export type ParseQuizSessionResult = {
  session: QuizPersistedSession | null;
  body: string;
  hadComment: boolean;
};

/** Strip leading `<!-- quiz-session … -->` and return normalized session + body. */
export function parseQuizSessionComment(markdown: string): ParseQuizSessionResult {
  const src = String(markdown || '');
  const match = src.match(QUIZ_SESSION_COMMENT_RE);
  if (!match || match.index == null) {
    return { session: null, body: src, hadComment: false };
  }

  const before = src.slice(0, match.index).replace(/^\uFEFF/, '').trim();
  if (before.length > 0) {
    return { session: null, body: src, hadComment: false };
  }

  let parsed: Partial<QuizPersistedSession> = {};
  try {
    const json = unescapeJsonFromComment(match[1] || '').trim();
    const obj = JSON.parse(json) as unknown;
    if (obj && typeof obj === 'object') {
      parsed = obj as Partial<QuizPersistedSession>;
    }
  } catch {
    // invalid JSON → treat as no session
  }

  const body = `${src.slice(0, match.index)}${src.slice(match.index + match[0].length)}`.replace(
    /^\s*\n/,
    '',
  );

  const session = normalizeQuizPersistedSession(parsed);
  return {
    session: isQuizSessionEmpty(session) ? null : session,
    body,
    hadComment: true,
  };
}

export function serializeQuizSessionComment(session: QuizPersistedSession): string {
  const normalized = normalizeQuizPersistedSession(session);
  const payload: QuizPersistedSession = {
    version: 1,
    userAnswers: normalized.userAnswers,
    gradedQuestions: normalized.gradedQuestions,
    subjectiveGrades: normalized.subjectiveGrades,
    isSubmitted: normalized.isSubmitted,
    ...(normalized.timeLog ? { timeLog: normalized.timeLog } : {}),
    ...(normalized.wrongChoiceExplanations
      ? { wrongChoiceExplanations: normalized.wrongChoiceExplanations }
      : {}),
  };
  const json = JSON.stringify(payload);
  return `<!-- quiz-session ${escapeJsonForComment(json)} -->`;
}
