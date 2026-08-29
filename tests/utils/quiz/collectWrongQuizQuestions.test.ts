import { describe, expect, it } from 'vitest';
import {
  collectWrongQuizQuestions,
  isQuizQuestionWrong,
  renumberQuizQuestionsForExtract,
} from '@/utils/quiz/collectWrongQuizQuestions';
import { buildWrongQuestionsExtractQuiz } from '@/utils/quiz/buildWrongQuestionsExtractQuiz';
import { proposeWrongQuizExtractPath } from '@/utils/quiz/quizWrongExtractPath';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';

const choiceQ = (id: string, answer = 1): QuizQuestion => ({
  id,
  displayLabel: id,
  kind: 'choice',
  question: `Q${id}`,
  options: ['A', 'B'],
  answer,
  point: '',
  explanation: '',
});

describe('collectWrongQuizQuestions', () => {
  it('collects graded wrong choice answers only', () => {
    const questions = [choiceQ('1'), choiceQ('2'), choiceQ('3')];
    const wrong = collectWrongQuizQuestions({
      questions,
      userAnswers: { '1': 1, '2': 2, '3': 2 },
      gradedQuestions: { '1': true, '2': true, '3': false },
      isSubmitted: false,
      subjectiveGrades: {},
    });
    expect(wrong.map((q) => q.id)).toEqual(['2']);
    expect(isQuizQuestionWrong(questions[2]!, {
      questions,
      userAnswers: { '3': 2 },
      gradedQuestions: { '3': false },
      isSubmitted: false,
      subjectiveGrades: {},
    })).toBe(false);
  });

  it('renumbers extracted questions from 1', () => {
    const next = renumberQuizQuestionsForExtract([choiceQ('9'), choiceQ('12')]);
    expect(next.map((q) => q.displayLabel)).toEqual(['1', '2']);
    expect(next.map((q) => q.id)).toEqual(['1', '2']);
  });

  it('builds markdown with copied source paths and empty session', () => {
    const built = buildWrongQuestionsExtractQuiz(
      {
        config: { choiceCount: 4, sourcePaths: ['notes/a.md', 'notes/b.md'] },
        questions: [choiceQ('1'), choiceQ('2', 2)],
      },
      {
        questions: [choiceQ('1'), choiceQ('2', 2)],
        userAnswers: { '1': 2, '2': 2 },
        gradedQuestions: { '1': true, '2': true },
        isSubmitted: false,
        subjectiveGrades: {},
      },
    );
    expect(built?.questions).toHaveLength(1);
    expect(built?.config.sourcePaths).toEqual(['notes/a.md', 'notes/b.md']);
    expect(built?.markdown).toContain('notes/a.md');
    expect(built?.markdown).not.toContain('quiz-session');
  });
});

describe('quizWrongExtractPath', () => {
  it('proposes sibling quiz path in same folder', () => {
    expect(proposeWrongQuizExtractPath('folder/exam.quiz.md')).toBe(
      'folder/exam-틀린문제.quiz.md',
    );
    expect(proposeWrongQuizExtractPath('folder/exam.quiz.md', 3)).toBe(
      'folder/exam-틀린문제-3.quiz.md',
    );
  });
});
