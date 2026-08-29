import type {
  QuizPersistedSession,
  QuizQuestion,
  QuizSessionAnswers,
  QuizWrongChoiceExplanations,
  SubjectiveGradeResult,
} from '@/utils/quiz/quizTypes';
import type { QuizTimeLog } from '@/utils/quiz/quizTimeLog';
import {
  QUIZ_SESSION_DEFAULT,
  isQuizSessionEmpty,
  normalizeQuizPersistedSession,
} from '@/utils/quiz/quizSessionPersist';

export function hasQuizSessionAnswer(
  value: number | string | undefined | null,
): boolean {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

/**
 * Build a canonical session snapshot for persistence.
 * Answered-but-ungraded questions are stored as `gradedQuestions[id] = false`.
 */
export function buildQuizSessionForPersist(params: {
  questions: readonly Pick<QuizQuestion, 'id' | 'kind'>[];
  userAnswers: QuizSessionAnswers;
  gradedQuestions: Record<string, boolean>;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
  isSubmitted: boolean;
  timeLog?: QuizTimeLog;
  wrongChoiceExplanations?: QuizWrongChoiceExplanations;
}): QuizPersistedSession {
  const gradedForFile: Record<string, boolean> = {};

  for (const q of params.questions) {
    const answered = hasQuizSessionAnswer(params.userAnswers[q.id]);
    const isGraded =
      params.isSubmitted && q.kind === 'choice'
        ? true
        : Boolean(params.gradedQuestions[q.id]);

    if (isGraded) {
      gradedForFile[q.id] = true;
    } else if (answered) {
      gradedForFile[q.id] = false;
    }
  }

  return normalizeQuizPersistedSession({
    version: 1,
    userAnswers: params.userAnswers,
    gradedQuestions: gradedForFile,
    subjectiveGrades: params.subjectiveGrades,
    isSubmitted: params.isSubmitted,
    ...(params.timeLog ? { timeLog: params.timeLog } : {}),
    ...(params.wrongChoiceExplanations
      ? { wrongChoiceExplanations: params.wrongChoiceExplanations }
      : {}),
  });
}

export function areQuizPersistedSessionsEqual(
  a: QuizPersistedSession | null | undefined,
  b: QuizPersistedSession | null | undefined,
): boolean {
  const left = normalizeQuizPersistedSession(a ?? QUIZ_SESSION_DEFAULT);
  const right = normalizeQuizPersistedSession(b ?? QUIZ_SESSION_DEFAULT);
  return JSON.stringify(left) === JSON.stringify(right);
}

export function hasQuizInProgressSession(
  session: QuizPersistedSession | null | undefined,
): boolean {
  return session != null && !isQuizSessionEmpty(session);
}
