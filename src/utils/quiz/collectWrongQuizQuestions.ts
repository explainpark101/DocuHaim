import type { QuizQuestion, SubjectiveGradeResult } from '@/utils/quiz/quizTypes';

export type CollectWrongQuizQuestionsParams = {
  questions: QuizQuestion[];
  userAnswers: Record<string, number | string>;
  gradedQuestions: Record<string, boolean>;
  isSubmitted: boolean;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
};

export function isQuizQuestionWrong(
  q: QuizQuestion,
  params: CollectWrongQuizQuestionsParams,
): boolean {
  const isGraded = params.isSubmitted || Boolean(params.gradedQuestions[q.id]);
  if (!isGraded) return false;

  if (q.kind === 'choice') {
    const sel = params.userAnswers[q.id];
    const answered =
      sel !== undefined && sel !== null && String(sel).trim() !== '';
    return answered && sel !== q.answer;
  }

  return params.subjectiveGrades[q.id]?.verdict === 'wrong';
}

export function collectWrongQuizQuestions(
  params: CollectWrongQuizQuestionsParams,
): QuizQuestion[] {
  return params.questions.filter((q) => isQuizQuestionWrong(q, params));
}

export function renumberQuizQuestionsForExtract(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map((q, index) => {
    const label = String(index + 1);
    return {
      ...q,
      id: label,
      displayLabel: label,
    };
  });
}
