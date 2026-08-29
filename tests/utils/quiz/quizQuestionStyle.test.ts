import { describe, expect, test } from 'bun:test';
import {
  getQuizQuestionStyleTemplate,
  resolveQuestionChoiceCount,
  syncQuizFileChoiceCount,
} from '@/utils/quiz/quizQuestionStyle';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';

describe('quizQuestionStyle', () => {
  test('resolveQuestionChoiceCount uses option length', () => {
    const q: QuizQuestion = {
      id: '1',
      displayLabel: '1',
      kind: 'choice',
      question: 'Q',
      options: ['a', 'b', 'c', 'd', 'e'],
      answer: 2,
      point: '',
      explanation: '',
    };
    expect(resolveQuestionChoiceCount(q, 4)).toBe(5);
  });

  test('getQuizQuestionStyleTemplate follows last question', () => {
    const questions: QuizQuestion[] = [
      {
        id: '1',
        displayLabel: '1',
        kind: 'choice',
        question: 'Q',
        options: ['a', 'b', 'c'],
        answer: 1,
        point: '',
        explanation: '',
      },
      {
        id: '2',
        displayLabel: '2',
        kind: 'subjective',
        answerStyle: 'essay',
        question: 'Q2',
        modelAnswer: 'A',
        point: '',
        explanation: '',
      },
    ];
    expect(getQuizQuestionStyleTemplate(questions, 4)).toEqual({
      kind: 'subjective',
      answerStyle: 'essay',
      choiceCount: 4,
    });
    expect(getQuizQuestionStyleTemplate(questions.slice(0, 1), 4)).toEqual({
      kind: 'choice',
      answerStyle: 'short',
      choiceCount: 3,
    });
  });

  test('syncQuizFileChoiceCount tracks latest choice question', () => {
    const questions: QuizQuestion[] = [
      {
        id: '1',
        displayLabel: '1',
        kind: 'choice',
        question: 'Q',
        options: ['a', 'b', 'c', 'd', 'e', 'f'],
        answer: 1,
        point: '',
        explanation: '',
      },
    ];
    const synced = syncQuizFileChoiceCount({ choiceCount: 4, sourcePaths: [] }, questions);
    expect(synced.choiceCount).toBe(6);
  });
});
