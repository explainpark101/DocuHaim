import { describe, expect, it } from 'vitest';
import { buildQuizSessionForPersist } from '@/utils/quiz/quizSessionBuild';
import { parseQuizSessionComment, serializeQuizSessionComment } from '@/utils/quiz/quizSessionPersist';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';

const choiceQ = (id: string): QuizQuestion => ({
  id,
  displayLabel: id,
  kind: 'choice',
  question: 'q',
  options: ['a', 'b', 'c', 'd'],
  answer: 1,
  point: '',
  explanation: '',
});

describe('buildQuizSessionForPersist', () => {
  it('marks answered ungraded questions with gradedQuestions false', () => {
    const session = buildQuizSessionForPersist({
      questions: [choiceQ('1'), choiceQ('2')],
      userAnswers: { '1': 2, '2': 3 },
      gradedQuestions: { '1': true },
      subjectiveGrades: {},
      isSubmitted: false,
    });
    expect(session.gradedQuestions).toEqual({ '1': true, '2': false });
  });

  it('marks all choice questions graded when submitted', () => {
    const session = buildQuizSessionForPersist({
      questions: [choiceQ('1'), choiceQ('2')],
      userAnswers: { '1': 2 },
      gradedQuestions: {},
      subjectiveGrades: {},
      isSubmitted: true,
    });
    expect(session.gradedQuestions).toEqual({ '1': true, '2': true });
  });

  it('round-trips explicit graded flags in quiz-session comment', () => {
    const session = buildQuizSessionForPersist({
      questions: [choiceQ('1')],
      userAnswers: { '1': 2 },
      gradedQuestions: {},
      subjectiveGrades: {},
      isSubmitted: false,
    });
    const line = serializeQuizSessionComment(session);
    const parsed = parseQuizSessionComment(`${line}\n`);
    expect(parsed.session?.gradedQuestions).toEqual({ '1': false });
  });
});
