import {
  CHOICE_COUNT_MAX,
  CHOICE_COUNT_MIN,
  clampChoiceCount,
} from '@/utils/quiz/quizFileConfig';
import type {
  QuizAnswerStyle,
  QuizFileConfig,
  QuizQuestion,
  QuizQuestionKind,
} from '@/utils/quiz/quizTypes';

export type QuizQuestionStyleTemplate = {
  kind: QuizQuestionKind;
  answerStyle: QuizAnswerStyle;
  choiceCount: number;
};

/** Effective multiple-choice option count for one question. */
export function resolveQuestionChoiceCount(
  question: QuizQuestion,
  fallback = 4,
): number {
  if (question.kind !== 'choice') {
    return clampChoiceCount(fallback);
  }
  const filled = (question.options || []).filter((o) => String(o || '').trim()).length;
  const len = Math.max(filled, (question.options || []).length);
  if (len >= CHOICE_COUNT_MIN) return clampChoiceCount(len);
  return clampChoiceCount(fallback);
}

/** Default style for a newly added question (follows the last item). */
export function getQuizQuestionStyleTemplate(
  questions: QuizQuestion[],
  fileChoiceCount = 4,
): QuizQuestionStyleTemplate {
  const fallback = clampChoiceCount(fileChoiceCount);
  const last = questions.length ? questions[questions.length - 1] : null;
  if (!last) {
    return { kind: 'choice', answerStyle: 'short', choiceCount: fallback };
  }
  if (last.kind === 'subjective') {
    return {
      kind: 'subjective',
      answerStyle: last.answerStyle === 'essay' ? 'essay' : 'short',
      choiceCount: fallback,
    };
  }
  return {
    kind: 'choice',
    answerStyle: 'short',
    choiceCount: resolveQuestionChoiceCount(last, fallback),
  };
}

/** Keep file config choiceCount aligned with the latest choice question. */
export function syncQuizFileChoiceCount(
  config: QuizFileConfig,
  questions: QuizQuestion[],
): QuizFileConfig {
  const template = getQuizQuestionStyleTemplate(questions, config.choiceCount);
  return {
    ...config,
    choiceCount: template.choiceCount,
  };
}

export function resizeChoiceOptions(
  options: string[],
  choiceCount: number,
): string[] {
  const n = clampChoiceCount(choiceCount);
  const next = [...options];
  while (next.length < n) next.push('');
  return next.slice(0, n);
}

export { CHOICE_COUNT_MIN, CHOICE_COUNT_MAX };
