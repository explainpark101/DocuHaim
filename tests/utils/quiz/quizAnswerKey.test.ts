import { describe, expect, test } from 'vitest';
import {
  applyAnswerKeyToForms,
  parseAnswerChoiceNumber,
  parseAnswerKeyEntriesFromLlmJson,
  parseAnswerKeyTableText,
} from '@/utils/quiz/quizAnswerKey';
import type { QuizAddQuestionForm } from '@/utils/quiz/quizTypes';

function choiceForm(answer = 1): Omit<QuizAddQuestionForm, 'displayLabel'> {
  return {
    kind: 'choice',
    question: 'Q',
    options: ['a', 'b', 'c', 'd', 'e'],
    answer,
    point: 'p',
    explanation: 'e',
  };
}

describe('quizAnswerKey', () => {
  test('parseAnswerChoiceNumber handles digits, circled, and hangul labels', () => {
    expect(parseAnswerChoiceNumber('3')).toBe(3);
    expect(parseAnswerChoiceNumber('③')).toBe(3);
    expect(parseAnswerChoiceNumber('c')).toBe(3);
    expect(parseAnswerChoiceNumber('다')).toBe(3);
    expect(parseAnswerChoiceNumber('3번')).toBe(3);
  });

  test('parseAnswerKeyTableText parses pair and tab-separated rows', () => {
    expect(parseAnswerKeyTableText('1 3\n2 1\n3 4')).toEqual([
      { questionNumber: 1, answer: 3 },
      { questionNumber: 2, answer: 1 },
      { questionNumber: 3, answer: 4 },
    ]);
    expect(parseAnswerKeyTableText('1\t③\n2\t②')).toEqual([
      { questionNumber: 1, answer: 3 },
      { questionNumber: 2, answer: 2 },
    ]);
  });

  test('parseAnswerKeyTableText parses two-row horizontal grids', () => {
    expect(parseAnswerKeyTableText('1\t2\t3\n3\t1\t4')).toEqual([
      { questionNumber: 1, answer: 3 },
      { questionNumber: 2, answer: 1 },
      { questionNumber: 3, answer: 4 },
    ]);
  });

  test('applyAnswerKeyToForms overwrites choice answers by question order', () => {
    const forms = [choiceForm(1), choiceForm(2), choiceForm(1)];
    const next = applyAnswerKeyToForms(
      forms,
      [
        { questionNumber: 1, answer: 4 },
        { questionNumber: 2, answer: 5 },
        { questionNumber: 3, answer: 2 },
      ],
      5,
    );
    expect(next.map((form) => form.answer)).toEqual([4, 5, 2]);
  });

  test('parseAnswerKeyEntriesFromLlmJson reads vision LLM payload', () => {
    expect(
      parseAnswerKeyEntriesFromLlmJson({
        entries: [
          { questionNumber: 1, answer: 3 },
          { questionNumber: 2, answer: '②' },
        ],
      }),
    ).toEqual([
      { questionNumber: 1, answer: 3 },
      { questionNumber: 2, answer: 2 },
    ]);
  });
});
