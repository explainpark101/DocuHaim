import type {
  QuizQuestion,
  QuizSessionAnswers,
  QuizWrongChoiceExplanations,
} from '@/utils/quiz/quizTypes';
import {
  flatWrongChoiceExplanations,
  nestWrongChoiceExplanations,
  wrongChoiceExplanationKey,
} from '@/utils/quiz/quizWrongChoiceExplanations';

export type ShuffleQuizChoiceOptionsResult = {
  questions: QuizQuestion[];
  userAnswers: QuizSessionAnswers;
  wrongExps: Record<string, string>;
  wrongExpFocus: Record<string, number>;
  wrongChoiceExplanations: QuizWrongChoiceExplanations;
  /** question id → old 1-based option → new 1-based option */
  optionMapsByQuestionId: Map<string, Map<number, number>>;
  shuffledQuestionCount: number;
};

/** Fisher–Yates shuffle (returns a new array of 0-based indices). */
export function shuffleIndexPermutation(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = indices[i]!;
    indices[i] = indices[j]!;
    indices[j] = tmp;
  }
  return indices;
}

/**
 * Build old→new 1-based option map from a 0-based index permutation.
 * `permutation[newIndex]` = oldIndex at that slot.
 */
export function buildOptionRemapFromPermutation(
  permutation: readonly number[],
): Map<number, number> {
  const oldToNew = new Map<number, number>();
  for (let newIndex = 0; newIndex < permutation.length; newIndex += 1) {
    const oldIndex = permutation[newIndex]!;
    oldToNew.set(oldIndex + 1, newIndex + 1);
  }
  return oldToNew;
}

export function shuffleSingleChoiceQuestion(
  question: QuizQuestion,
  permutation?: readonly number[],
): { question: QuizQuestion; oldToNew: Map<number, number> } | null {
  if (question.kind !== 'choice') return null;
  const options = question.options || [];
  if (options.length < 2) return null;

  const perm = permutation ?? shuffleIndexPermutation(options.length);
  if (perm.length !== options.length) return null;

  const newOptions = perm.map((oldIndex) => options[oldIndex] ?? '');
  const oldAnswerIndex = Math.max(0, (question.answer ?? 1) - 1);
  const newAnswerIndex = perm.indexOf(oldAnswerIndex);
  const newAnswer = newAnswerIndex >= 0 ? newAnswerIndex + 1 : question.answer;

  const oldToNew = buildOptionRemapFromPermutation(perm);

  return {
    question: {
      ...question,
      options: newOptions,
      ...(newAnswer != null ? { answer: newAnswer } : {}),
    },
    oldToNew,
  };
}

function remapChoiceAnswer(
  value: number | string | undefined,
  oldToNew: Map<number, number>,
): number | string | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value)) return value;
  const rounded = Math.round(value);
  return oldToNew.get(rounded) ?? value;
}

function remapFlatWrongExplanations(
  flat: Record<string, string>,
  optionMapsByQuestionId: Map<string, Map<number, number>>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, text] of Object.entries(flat)) {
    const sep = key.lastIndexOf('_');
    if (sep <= 0) continue;
    const questionId = key.slice(0, sep);
    const oldOption = Number.parseInt(key.slice(sep + 1), 10);
    if (!questionId || !Number.isFinite(oldOption) || oldOption < 1) continue;
    const map = optionMapsByQuestionId.get(questionId);
    if (!map) {
      out[key] = text;
      continue;
    }
    const newOption = map.get(oldOption);
    if (newOption == null) continue;
    out[wrongChoiceExplanationKey(questionId, newOption)] = text;
  }
  return out;
}

function remapWrongExpFocus(
  focus: Record<string, number>,
  optionMapsByQuestionId: Map<string, Map<number, number>>,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [questionId, option] of Object.entries(focus)) {
    const map = optionMapsByQuestionId.get(questionId);
    if (!map) {
      out[questionId] = option;
      continue;
    }
    const next = map.get(option);
    if (next != null) out[questionId] = next;
  }
  return out;
}

export function shuffleQuizChoiceOptions(params: {
  questions: readonly QuizQuestion[];
  userAnswers: QuizSessionAnswers;
  wrongExps: Record<string, string>;
  wrongExpFocus: Record<string, number>;
  /** Optional fixed 0-based index permutations per question id (tests / deterministic shuffle). */
  permutationByQuestionId?: ReadonlyMap<string, readonly number[]>;
}): ShuffleQuizChoiceOptionsResult {
  const optionMapsByQuestionId = new Map<string, Map<number, number>>();
  let shuffledQuestionCount = 0;

  const questions = params.questions.map((q) => {
    const shuffled = shuffleSingleChoiceQuestion(q, params.permutationByQuestionId?.get(q.id));
    if (!shuffled) return q;
    optionMapsByQuestionId.set(q.id, shuffled.oldToNew);
    shuffledQuestionCount += 1;
    return shuffled.question;
  });

  const userAnswers: QuizSessionAnswers = { ...params.userAnswers };
  for (const q of params.questions) {
    if (q.kind !== 'choice') continue;
    const map = optionMapsByQuestionId.get(q.id);
    if (!map) continue;
    const remapped = remapChoiceAnswer(userAnswers[q.id], map);
    if (remapped !== undefined) userAnswers[q.id] = remapped;
  }

  const wrongExps = remapFlatWrongExplanations(params.wrongExps, optionMapsByQuestionId);
  const wrongExpFocus = remapWrongExpFocus(params.wrongExpFocus, optionMapsByQuestionId);
  const wrongChoiceExplanations = nestWrongChoiceExplanations(wrongExps);

  return {
    questions,
    userAnswers,
    wrongExps,
    wrongExpFocus,
    wrongChoiceExplanations,
    optionMapsByQuestionId,
    shuffledQuestionCount,
  };
}

/** Remap an open analysis dock option after shuffle. */
export function remapChoiceAnalysisDockOption(
  questionId: string,
  option: number,
  optionMapsByQuestionId: Map<string, Map<number, number>>,
): number | null {
  const map = optionMapsByQuestionId.get(questionId);
  if (!map) return option;
  return map.get(option) ?? null;
}

export function remapNestedWrongChoiceExplanations(
  nested: QuizWrongChoiceExplanations | null | undefined,
  optionMapsByQuestionId: Map<string, Map<number, number>>,
): QuizWrongChoiceExplanations {
  return nestWrongChoiceExplanations(
    remapFlatWrongExplanations(flatWrongChoiceExplanations(nested), optionMapsByQuestionId),
  );
}
