import { describe, expect, it } from 'vitest';
import {
  filterQuestionMemos,
  isQuestionMemosEmpty,
  normalizeQuestionMemos,
} from '@/utils/quiz/quizQuestionMemos';
import {
  isQuizSessionEmpty,
  normalizeQuizPersistedSession,
  parseQuizSessionComment,
  serializeQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';

describe('quizQuestionMemos', () => {
  it('normalizes and omits empty memo values', () => {
    expect(
      normalizeQuestionMemos({
        '1': 'note',
        '2': '   ',
        3: 42,
        '': 'skip',
      }),
    ).toEqual({ '1': 'note' });
    expect(isQuestionMemosEmpty({})).toBe(true);
    expect(isQuestionMemosEmpty({ '1': 'x' })).toBe(false);
  });

  it('filters memos to existing question ids', () => {
    expect(filterQuestionMemos({ '1': 'a', '9': 'b' }, ['1', '2'])).toEqual({ '1': 'a' });
  });
});

describe('quiz-session questionMemos', () => {
  it('round-trips questionMemos in quiz-session comment', () => {
    const session = normalizeQuizPersistedSession({
      userAnswers: {},
      gradedQuestions: {},
      subjectiveGrades: {},
      isSubmitted: false,
      questionMemos: { '1': '**bold** memo' },
    });
    const line = serializeQuizSessionComment(session);
    const { session: parsed } = parseQuizSessionComment(`${line}\n\n### 1. x`);
    expect(parsed?.questionMemos).toEqual({ '1': '**bold** memo' });
    expect(isQuizSessionEmpty(session)).toBe(false);
  });
});
