import {
  collectWrongQuizQuestions,
  renumberQuizQuestionsForExtract,
  type CollectWrongQuizQuestionsParams,
} from '@/utils/quiz/collectWrongQuizQuestions';
import { normalizeQuizFileConfig } from '@/utils/quiz/quizFileConfig';
import { QUIZ_SESSION_DEFAULT } from '@/utils/quiz/quizSessionPersist';
import { serializeQuizDocument } from '@/utils/quiz/serializeQuizDocument';
import type { QuizDocument, QuizFileConfig } from '@/utils/quiz/quizTypes';

export type BuildWrongQuestionsExtractQuizResult = {
  markdown: string;
  questions: QuizDocument['questions'];
  config: QuizFileConfig;
};

export function buildWrongQuestionsExtractQuiz(
  doc: QuizDocument,
  session: CollectWrongQuizQuestionsParams,
): BuildWrongQuestionsExtractQuizResult | null {
  const wrong = collectWrongQuizQuestions({
    questions: doc.questions,
    userAnswers: session.userAnswers,
    gradedQuestions: session.gradedQuestions,
    isSubmitted: session.isSubmitted,
    subjectiveGrades: session.subjectiveGrades,
  });
  if (!wrong.length) return null;

  const questions = renumberQuizQuestionsForExtract(wrong);
  const config = normalizeQuizFileConfig({
    ...doc.config,
    sourcePaths: [...doc.config.sourcePaths],
  });
  const markdown = serializeQuizDocument(config, questions, QUIZ_SESSION_DEFAULT);

  return { markdown, questions, config };
}
