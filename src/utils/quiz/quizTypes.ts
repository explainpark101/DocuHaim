import type { QuizTimeLog } from '@/utils/quiz/quizTimeLog';

/** Quiz document / question / session types. */

export type QuizAnswerStyle = 'short' | 'essay';

export type QuizQuestionKind = 'choice' | 'subjective';

export type QuizFileConfig = {
  choiceCount: number;
  sourcePaths: string[];
};

export type QuizQuestion = {
  id: string;
  displayLabel: string;
  kind: QuizQuestionKind;
  /** Only for `kind: 'subjective'`. */
  answerStyle?: QuizAnswerStyle;
  question: string;
  image?: string | null;
  options?: string[];
  /** 1-based correct option index for choice questions. */
  answer?: number;
  /** Model / short answer text for subjective grading. */
  modelAnswer?: string;
  point: string;
  explanation: string;
  /** Per-question RAG source override (replaces file config when non-empty). */
  sourcePaths?: string[];
  isGenerated?: boolean;
  /**
   * When set, this item was generated as a similar question of another item.
   * Persisted in `<!-- quiz-q-meta … -->` and used for TOC nesting.
   */
  similarOf?: {
    id: string;
    displayLabel: string;
  };
};

/** User attempt state persisted in `<!-- quiz-session … -->`. */
export type QuizPersistedSession = {
  version: 1;
  userAnswers: QuizSessionAnswers;
  gradedQuestions: Record<string, boolean>;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
  isSubmitted: boolean;
  /** Stopwatch event log (start / pause / resume / stop with timestamps). */
  timeLog?: QuizTimeLog;
};

export type QuizDocument = {
  config: QuizFileConfig;
  questions: QuizQuestion[];
  session?: QuizPersistedSession | null;
};

export type SubjectiveVerdict = 'correct' | 'partial' | 'wrong';

export type SubjectiveGradeResult = {
  verdict: SubjectiveVerdict;
  score: number;
  feedback: string;
  rationale?: string;
};

export type RagChunk = {
  path: string;
  excerpt: string;
  score?: number;
  chunkIndex?: number;
};

export type QuizSessionAnswers = Record<string, number | string>;

export type QuizSessionState = {
  userAnswers: QuizSessionAnswers;
  gradedQuestions: Record<string, boolean>;
  explanationVisibility: Record<string, boolean>;
  wrongChoiceExplanations: Record<string, string>;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
  isSubmitted: boolean;
  isStudyMode: boolean;
  filter: 'all' | 'wrong' | 'unanswered';
};

export type QuizAddQuestionForm = {
  kind: QuizQuestionKind;
  answerStyle?: QuizAnswerStyle;
  displayLabel?: string;
  question: string;
  options?: string[];
  answer?: number;
  modelAnswer?: string;
  point?: string;
  explanation?: string;
  sourcePaths?: string[];
};
