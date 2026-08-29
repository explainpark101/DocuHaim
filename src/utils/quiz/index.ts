export {
  collectWrongQuizQuestions,
  isQuizQuestionWrong,
  renumberQuizQuestionsForExtract,
} from '@/utils/quiz/collectWrongQuizQuestions';
export { buildWrongQuestionsExtractQuiz } from '@/utils/quiz/buildWrongQuestionsExtractQuiz';
export {
  proposeWrongQuizExtractPath,
  resolveWrongQuizExtractPath,
} from '@/utils/quiz/quizWrongExtractPath';
export { isQuizMdPath, quizBasename, QUIZ_MD_EXTENSION } from '@/utils/quiz/quizPath';
export type * from '@/utils/quiz/quizTypes';
export {
  QUIZ_CONFIG_DEFAULT,
  CHOICE_COUNT_MIN,
  CHOICE_COUNT_MAX,
  clampChoiceCount,
  normalizeQuizFileConfig,
  normalizeSourcePaths,
  parseQuizConfigComment,
  serializeQuizConfigComment,
} from '@/utils/quiz/quizFileConfig';
export {
  parseQuizDocument,
  parseMarkdownToQuestions,
  resolveEffectiveSourcePaths,
} from '@/utils/quiz/parseQuizDocument';
export {
  countQuizSourcePathUsage,
  getActiveSourcePaths,
  isQuizSourcePathEnabled,
  removeQuizSourcePathFromConfig,
  setQuizSourcePathEnabled,
} from '@/utils/quiz/quizSourcePathState';
export {
  serializeQuizDocument,
  serializeQuizDocumentFromDoc,
} from '@/utils/quiz/serializeQuizDocument';
export {
  QUIZ_SESSION_DEFAULT,
  isQuizSessionEmpty,
  normalizeQuizPersistedSession,
  filterQuizSessionForQuestions,
  parseQuizSessionComment,
  serializeQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';
export {
  areQuizPersistedSessionsEqual,
  buildQuizSessionForPersist,
  hasQuizInProgressSession,
  hasQuizSessionAnswer,
} from '@/utils/quiz/quizSessionBuild';
export {
  appendQuizTimeLogEvent,
  appendQuizQuestionTimeEntry,
  createEmptyQuizTimeLog,
  formatQuizElapsedMs,
  formatQuizTimeLogAt,
  getQuizStopwatchBaseElapsedMs,
  isQuizStopwatchRunning,
  isQuizTimeLogEmpty,
  normalizeQuizTimeLog,
  QUIZ_QUESTION_TIME_MIN_MS,
  QUIZ_TIME_LOG_EVENT_LABEL,
} from '@/utils/quiz/quizTimeLog';
export type {
  QuizQuestionTimeEntry,
  QuizTimeLog,
  QuizTimeLogEvent,
  QuizTimeLogEventType,
} from '@/utils/quiz/quizTimeLog';
export {
  buildQuestionMarkdownBlock,
  formToQuizQuestion,
  nextDisplayLabel,
  validateAddQuestionForm,
  parseQuestionBlock,
} from '@/utils/quiz/buildQuestionMarkdown';
export { mergeQuizDocuments } from '@/utils/quiz/mergeQuizDocuments';
export type { MergeMode, MergeQuizDocumentsOptions } from '@/utils/quiz/mergeQuizDocuments';
export {
  getQuizQuestionStyleTemplate,
  resolveQuestionChoiceCount,
  resizeChoiceOptions,
  syncQuizFileChoiceCount,
} from '@/utils/quiz/quizQuestionStyle';
export type { QuizQuestionStyleTemplate } from '@/utils/quiz/quizQuestionStyle';
