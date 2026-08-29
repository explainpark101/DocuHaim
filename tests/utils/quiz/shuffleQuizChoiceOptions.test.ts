import { describe, expect, it } from 'vitest';
import {
  buildOptionRemapFromPermutation,
  shuffleQuizChoiceOptions,
  shuffleSingleChoiceQuestion,
} from '@/utils/quiz/shuffleQuizChoiceOptions';
import { wrongChoiceExplanationKey } from '@/utils/quiz/quizWrongChoiceExplanations';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';

const choiceQ = (id: string, options: string[], answer: number): QuizQuestion => ({
  id,
  displayLabel: id,
  kind: 'choice',
  question: 'stem',
  options,
  answer,
  point: '',
  explanation: '',
});

describe('shuffleQuizChoiceOptions', () => {
  it('shuffles options and remaps answer index', () => {
    const q = choiceQ('1', ['A', 'B', 'C', 'D'], 2);
    const result = shuffleSingleChoiceQuestion(q, [2, 0, 3, 1]);
    expect(result).not.toBeNull();
    expect(result!.question.options).toEqual(['C', 'A', 'D', 'B']);
    expect(result!.question.answer).toBe(4);
    expect(result!.oldToNew.get(2)).toBe(4);
  });

  it('remaps user answers and wrong-choice analyses', () => {
    const questions = [choiceQ('q1', ['A', 'B', 'C'], 1)];
    const wrongKey = wrongChoiceExplanationKey('q1', 2);
    const result = shuffleQuizChoiceOptions({
      questions,
      userAnswers: { q1: 2 },
      wrongExps: { [wrongKey]: 'analysis for B' },
      wrongExpFocus: { q1: 2 },
    });

    expect(result.shuffledQuestionCount).toBe(1);
    expect(result.userAnswers.q1).not.toBe(2);
    const newOpt = result.userAnswers.q1 as number;
    expect(result.wrongExps[wrongChoiceExplanationKey('q1', newOpt)]).toBe('analysis for B');
    expect(result.wrongExpFocus.q1).toBe(newOpt);
    expect(result.questions[0]?.options?.[newOpt - 1]).toBe('B');
  });

  it('buildOptionRemapFromPermutation maps old slots to new numbers', () => {
    const map = buildOptionRemapFromPermutation([2, 0, 1]);
    expect(map.get(1)).toBe(2);
    expect(map.get(2)).toBe(3);
    expect(map.get(3)).toBe(1);
  });
});
