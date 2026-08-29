import type { QuizQuestion, SubjectiveGradeResult } from '@/utils/quiz/quizTypes';
import { hasQuizSessionAnswer } from '@/utils/quiz/quizSessionBuild';

export type QuizQuestionGradeStatus = 'correct' | 'partial' | 'wrong' | 'ungraded';

export const QUIZ_GRADE_STATUS_DOT_CLASS: Record<QuizQuestionGradeStatus, string> = {
  correct: 'bg-emerald-500',
  partial: 'bg-amber-500',
  wrong: 'bg-rose-500',
  ungraded: 'bg-slate-400 dark:bg-slate-500',
};

export const QUIZ_GRADE_STATUS_LABEL: Record<QuizQuestionGradeStatus, string> = {
  correct: '정답',
  partial: '부분',
  wrong: '오답',
  ungraded: '미채점',
};

export type QuizScoreBoard = {
  correct: number;
  wrong: number;
  partial: number;
  answered: number;
  total: number;
  /** 0–100 percentage score. */
  scorePercent: number | null;
};

function subjectiveWeight(grade: SubjectiveGradeResult | undefined): number | null {
  if (!grade) return null;
  if (typeof grade.score === 'number' && Number.isFinite(grade.score)) {
    return Math.min(100, Math.max(0, grade.score)) / 100;
  }
  if (grade.verdict === 'correct') return 1;
  if (grade.verdict === 'partial') return 0.5;
  return 0;
}

export function getQuizQuestionGradeStatus(params: {
  question: QuizQuestion;
  userAnswers: Record<string, number | string>;
  gradedQuestions: Record<string, boolean>;
  isSubmitted: boolean;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
}): QuizQuestionGradeStatus | null {
  const { question, userAnswers, gradedQuestions, isSubmitted, subjectiveGrades } =
    params;
  const isGraded = isSubmitted || gradedQuestions[question.id];
  const answered = hasQuizSessionAnswer(userAnswers[question.id]);

  if (!isGraded) {
    return answered ? 'ungraded' : null;
  }

  if (question.kind === 'choice') {
    if (!answered) return null;
    return userAnswers[question.id] === question.answer ? 'correct' : 'wrong';
  }

  const verdict = subjectiveGrades[question.id]?.verdict;
  if (verdict === 'correct') return 'correct';
  if (verdict === 'partial') return 'partial';
  if (verdict === 'wrong') return 'wrong';
  return null;
}

/**
 * Aggregate score across choice (exact) and subjective (AI weight) questions.
 */
export function computeQuizScoreBoard(params: {
  questions: QuizQuestion[];
  userAnswers: Record<string, number | string>;
  gradedQuestions: Record<string, boolean>;
  isSubmitted: boolean;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
}): QuizScoreBoard {
  const { questions, userAnswers, gradedQuestions, isSubmitted, subjectiveGrades } =
    params;
  let correct = 0;
  let wrong = 0;
  let partial = 0;
  let answered = 0;
  let weightedSum = 0;
  let gradedCount = 0;

  for (const q of questions) {
    const hasAnswer =
      userAnswers[q.id] !== undefined &&
      userAnswers[q.id] !== null &&
      String(userAnswers[q.id]).trim() !== '';
    if (hasAnswer) answered += 1;

    const isGraded = isSubmitted || gradedQuestions[q.id];
    if (!isGraded) continue;

    if (q.kind === 'choice') {
      gradedCount += 1;
      const sel = userAnswers[q.id];
      if (sel === q.answer) {
        correct += 1;
        weightedSum += 1;
      } else if (hasAnswer) {
        wrong += 1;
      }
      continue;
    }

    const grade = subjectiveGrades[q.id];
    const w = subjectiveWeight(grade);
    if (w == null) continue;
    gradedCount += 1;
    weightedSum += w;
    if (grade?.verdict === 'correct') correct += 1;
    else if (grade?.verdict === 'partial') partial += 1;
    else wrong += 1;
  }

  const total = questions.length;
  const scorePercent =
    total > 0 && gradedCount > 0
      ? Math.round((weightedSum / total) * 100)
      : null;

  return {
    correct,
    wrong,
    partial,
    answered,
    total,
    scorePercent,
  };
}
