import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  type RefObject,
} from 'react';
import QuizQuestionCard from '@/components/quiz/QuizQuestionCard';
import type { QuizChoiceAnalysisDockMode } from '@/components/quiz/QuizChoiceAnalysisDock';
import type { QuizQuestionSectionsTarget } from '@/components/quiz/QuizQuestionSectionsPanel';
import type { QuizQuestion, SubjectiveGradeResult } from '@/utils/quiz/quizTypes';

export type QuizQuestionFilterMode = 'all' | 'wrong' | 'unanswered';

export type QuizQuestionListHandle = {
  scrollToQuestionId: (questionId: string) => boolean;
};

export type QuizQuestionListProps = {
  questions: QuizQuestion[];
  filter: QuizQuestionFilterMode;
  scrollRef: RefObject<HTMLElement | null>;
  userAnswers: Record<string, number | string>;
  graded: Record<string, boolean>;
  subjGrades: Record<string, SubjectiveGradeResult>;
  isSubmitted: boolean;
  expVisible: Record<string, boolean>;
  wrongExpsByQuestion: Record<string, Record<string, string>>;
  questionMemos: Record<string, string>;
  freshQuestionIds: Record<string, boolean>;
  busyId: string | null;
  subjectiveGradeStreams: Record<string, string>;
  examInProgress: boolean;
  resolveWrongExpFocusOption: (
    question: QuizQuestion,
    userSelected?: number,
  ) => number;
  onAnswerCommit: (questionId: string, value: string) => void;
  onSelectOption: (questionId: string, option: number) => void;
  onEditQuestion: (question: QuizQuestion) => void;
  onGradeChoice: (question: QuizQuestion) => void;
  onGradeSubjective: (question: QuizQuestion, answer: string) => void;
  onRetry: (question: QuizQuestion) => void;
  onToggleExplanation: (questionId: string) => void;
  onSimilar: (question: QuizQuestion) => void;
  onDerived: (question: QuizQuestion) => void;
  onGenerateSections: (
    question: QuizQuestion,
    target: QuizQuestionSectionsTarget,
  ) => void;
  onWrongExpFocusChange: (questionId: string, option: number) => void;
  onOpenAnalysisDock: (
    questionId: string,
    option: number,
    mode: QuizChoiceAnalysisDockMode,
  ) => void;
  onMemoSave: (questionId: string, value: string) => void;
  onClearFresh: (questionId: string) => void;
};

const QUESTION_SCROLL_TOP_INSET_PX = 12;

function isQuestionVisible(
  question: QuizQuestion,
  filter: QuizQuestionFilterMode,
  userAnswers: Record<string, number | string>,
  graded: Record<string, boolean>,
  subjGrades: Record<string, SubjectiveGradeResult>,
  isSubmitted: boolean,
): boolean {
  const answered =
    userAnswers[question.id] !== undefined &&
    String(userAnswers[question.id]).trim() !== '';
  const isQuestionGraded = Boolean(isSubmitted || graded[question.id]);

  if (filter === 'unanswered' && answered) return false;
  if (filter !== 'wrong') return true;

  let isWrong = false;
  if (question.kind === 'choice' && isQuestionGraded && answered) {
    isWrong = userAnswers[question.id] !== question.answer;
  }
  if (question.kind === 'subjective' && isQuestionGraded) {
    isWrong = subjGrades[question.id]?.verdict === 'wrong';
  }
  return isQuestionGraded && isWrong;
}

function scrollQuestionCardIntoView(
  scrollRoot: HTMLElement | null,
  questionId: string,
  behavior: ScrollBehavior,
): boolean {
  const card = document.getElementById(`q-card-${questionId}`);
  if (!card) return false;

  if (!scrollRoot) {
    card.scrollIntoView({ behavior, block: 'start' });
    return true;
  }

  const rootRect = scrollRoot.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const targetTop =
    scrollRoot.scrollTop +
    (cardRect.top - rootRect.top) -
    QUESTION_SCROLL_TOP_INSET_PX;

  scrollRoot.scrollTo({
    top: Math.max(0, targetTop),
    behavior,
  });
  return true;
}

const QuizQuestionList = memo(
  forwardRef<QuizQuestionListHandle, QuizQuestionListProps>(
    function QuizQuestionList(
    {
      questions,
      filter,
      scrollRef,
      userAnswers,
      graded,
      subjGrades,
      isSubmitted,
      expVisible,
      wrongExpsByQuestion,
      questionMemos,
      freshQuestionIds,
      busyId,
      subjectiveGradeStreams,
      examInProgress,
      resolveWrongExpFocusOption,
      onAnswerCommit,
      onSelectOption,
      onEditQuestion,
      onGradeChoice,
      onGradeSubjective,
      onRetry,
      onToggleExplanation,
      onSimilar,
      onDerived,
      onGenerateSections,
      onWrongExpFocusChange,
      onOpenAnalysisDock,
      onMemoSave,
      onClearFresh,
    },
    ref,
  ) {
    const visibleQuestions = useMemo(
      () =>
        questions.filter((question) =>
          isQuestionVisible(
            question,
            filter,
            userAnswers,
            graded,
            subjGrades,
            isSubmitted,
          ),
        ),
      [filter, graded, isSubmitted, questions, subjGrades, userAnswers],
    );

    const scrollToQuestionId = useCallback(
      (questionId: string) => {
        const exists = visibleQuestions.some((q) => q.id === questionId);
        if (!exists) return false;

        const scrollRoot = scrollRef.current;
        if (scrollQuestionCardIntoView(scrollRoot, questionId, 'smooth')) {
          return true;
        }

        requestAnimationFrame(() => {
          scrollQuestionCardIntoView(scrollRoot, questionId, 'smooth');
        });
        return true;
      },
      [scrollRef, visibleQuestions],
    );

    useImperativeHandle(ref, () => ({ scrollToQuestionId }), [scrollToQuestionId]);

    if (visibleQuestions.length === 0) return null;

    return (
      <div className="space-y-4">
        {visibleQuestions.map((question) => {
          const selected = userAnswers[question.id];
          const isQuestionGraded = Boolean(isSubmitted || graded[question.id]);

          return (
            <QuizQuestionCard
              key={question.id}
              question={question}
              userAnswer={userAnswers[question.id]}
              isSubmitted={isSubmitted}
              isQuestionGraded={isQuestionGraded}
              subjectiveGrade={subjGrades[question.id]}
              showExplanation={Boolean(expVisible[question.id])}
              wrongExpsForQuestion={wrongExpsByQuestion[question.id] ?? {}}
              wrongExpFocusOption={resolveWrongExpFocusOption(
                question,
                typeof selected === 'number' ? selected : undefined,
              )}
              questionMemo={questionMemos[question.id] || ''}
              busyId={busyId}
              subjectiveGradeStream={subjectiveGradeStreams[question.id]}
              examInProgress={examInProgress}
              isFresh={Boolean(freshQuestionIds[question.id])}
              onClearFresh={() => onClearFresh(question.id)}
              onAnswerCommit={onAnswerCommit}
              onSelectOption={onSelectOption}
              onEditQuestion={onEditQuestion}
              onGradeChoice={onGradeChoice}
              onGradeSubjective={onGradeSubjective}
              onRetry={onRetry}
              onToggleExplanation={onToggleExplanation}
              onSimilar={onSimilar}
              onDerived={onDerived}
              onGenerateSections={onGenerateSections}
              onWrongExpFocusChange={onWrongExpFocusChange}
              onOpenAnalysisDock={onOpenAnalysisDock}
              onMemoSave={onMemoSave}
            />
          );
        })}
      </div>
    );
  }),
);

export default QuizQuestionList;
