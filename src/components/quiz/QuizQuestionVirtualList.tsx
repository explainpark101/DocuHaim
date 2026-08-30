import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type RefObject,
} from 'react';
import { Virtualizer, type VirtualizerHandle } from 'virtua';
import QuizQuestionCard from '@/components/quiz/QuizQuestionCard';
import type { QuizChoiceAnalysisDockMode } from '@/components/quiz/QuizChoiceAnalysisDock';
import type { QuizQuestionSectionsTarget } from '@/components/quiz/QuizQuestionSectionsPanel';
import type { QuizQuestion, SubjectiveGradeResult } from '@/utils/quiz/quizTypes';

export type QuizQuestionFilterMode = 'all' | 'wrong' | 'unanswered';

export type QuizQuestionVirtualListHandle = {
  scrollToQuestionId: (questionId: string) => boolean;
};

export type QuizQuestionVirtualListProps = {
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

const QuizQuestionVirtualList = forwardRef<
  QuizQuestionVirtualListHandle,
  QuizQuestionVirtualListProps
>(function QuizQuestionVirtualList(
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
  const listRef = useRef<VirtualizerHandle | null>(null);

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

  const visibleQuestionsRef = useRef(visibleQuestions);
  visibleQuestionsRef.current = visibleQuestions;

  const scrollToQuestionId = useCallback((questionId: string) => {
    const idx = visibleQuestionsRef.current.findIndex((q) => q.id === questionId);
    if (idx < 0) return false;
    listRef.current?.scrollToIndex(idx, { align: 'center', smooth: true });
    return true;
  }, []);

  useImperativeHandle(ref, () => ({ scrollToQuestionId }), [scrollToQuestionId]);

  if (visibleQuestions.length === 0) return null;

  return (
    <Virtualizer
      ref={listRef}
      scrollRef={scrollRef}
      data={visibleQuestions}
      bufferSize={480}
      itemSize={320}
    >
      {(question) => {
        const selected = userAnswers[question.id];
        const isQuestionGraded = Boolean(isSubmitted || graded[question.id]);

        return (
          <div className="pb-4 pt-4 first:pt-4">
            <QuizQuestionCard
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
          </div>
        );
      }}
    </Virtualizer>
  );
});

export default QuizQuestionVirtualList;
