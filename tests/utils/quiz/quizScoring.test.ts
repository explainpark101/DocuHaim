import { describe, expect, test } from 'bun:test';
import { computeQuizScoreBoard } from '@/utils/quiz/quizScoring';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';

const choice = (id: string, answer: number): QuizQuestion => ({
  id,
  displayLabel: id,
  kind: 'choice',
  question: 'q',
  options: ['a', 'b', 'c', 'd'],
  answer,
  point: '',
  explanation: '',
});

const subjective = (id: string): QuizQuestion => ({
  id,
  displayLabel: id,
  kind: 'subjective',
  answerStyle: 'short',
  question: 'q',
  modelAnswer: 'ans',
  point: '',
  explanation: '',
});

describe('computeQuizScoreBoard', () => {
  test('scores mixed choice + subjective partial', () => {
    const questions = [choice('1', 2), subjective('2'), choice('3', 1)];
    const board = computeQuizScoreBoard({
      questions,
      userAnswers: { '1': 2, '2': 'almost', '3': 4 },
      gradedQuestions: { '1': true, '2': true, '3': true },
      isSubmitted: false,
      subjectiveGrades: {
        '2': {
          verdict: 'partial',
          score: 50,
          feedback: 'partial',
        },
      },
    });
    expect(board.correct).toBe(1);
    expect(board.partial).toBe(1);
    expect(board.wrong).toBe(1);
    expect(board.answered).toBe(3);
    expect(board.total).toBe(3);
    // (1 + 0.5 + 0) / 3 * 100 = 50
    expect(board.scorePercent).toBe(50);
  });

  test('returns null scorePercent when nothing graded', () => {
    const board = computeQuizScoreBoard({
      questions: [choice('1', 1)],
      userAnswers: {},
      gradedQuestions: {},
      isSubmitted: false,
      subjectiveGrades: {},
    });
    expect(board.scorePercent).toBeNull();
  });
});
