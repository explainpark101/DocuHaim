import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { Virtualizer, type VirtualizerHandle } from 'virtua';
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

/** Offset of `el` from the top of `scrollRoot`'s scrollable content. */
function measureStartMargin(
  scrollRoot: HTMLElement,
  el: HTMLElement,
): number {
  const rootRect = scrollRoot.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return Math.max(0, elRect.top - rootRect.top + scrollRoot.scrollTop);
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
      const listRootRef = useRef<HTMLDivElement | null>(null);
      const [startMargin, setStartMargin] = useState(0);

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

      // Content above the list (LLM bar, score board) sits in the same scroll root.
      useLayoutEffect(() => {
        const scrollRoot = scrollRef.current;
        const listRoot = listRootRef.current;
        if (!scrollRoot || !listRoot) return;

        const update = () => {
          const next = measureStartMargin(scrollRoot, listRoot);
          setStartMargin((prev) =>
            Math.abs(prev - next) > 0.5 ? next : prev,
          );
        };

        update();
        const ro = new ResizeObserver(update);
        const scrollChild = scrollRoot.firstElementChild;
        if (scrollChild) ro.observe(scrollChild);
        ro.observe(listRoot);
        window.addEventListener('resize', update);
        return () => {
          ro.disconnect();
          window.removeEventListener('resize', update);
        };
      }, [scrollRef, visibleQuestions.length]);

      const scrollToQuestionId = useCallback((questionId: string) => {
        const idx = visibleQuestionsRef.current.findIndex(
          (q) => q.id === questionId,
        );
        if (idx < 0) return false;
        // Prefer index scroll — virtualized cards may not be in the DOM yet.
        listRef.current?.scrollToIndex(idx, {
          align: 'center',
          smooth: true,
        });
        return true;
      }, []);

      useImperativeHandle(
        ref,
        () => ({ scrollToQuestionId }),
        [scrollToQuestionId],
      );

      if (visibleQuestions.length === 0) return null;

      return (
        <div ref={listRootRef}>
          <Virtualizer
            ref={listRef}
            scrollRef={scrollRef}
            data={visibleQuestions}
            bufferSize={800}
            startMargin={startMargin}
          >
            {(question) => {
              const selected = userAnswers[question.id];
              const isQuestionGraded = Boolean(
                isSubmitted || graded[question.id],
              );

              return (
                <div className="quiz-question-card pb-4 pt-4">
                  <QuizQuestionCard
                    question={question}
                    userAnswer={userAnswers[question.id]}
                    isSubmitted={isSubmitted}
                    isQuestionGraded={isQuestionGraded}
                    subjectiveGrade={subjGrades[question.id]}
                    showExplanation={Boolean(expVisible[question.id])}
                    wrongExpsForQuestion={
                      wrongExpsByQuestion[question.id] ?? {}
                    }
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
        </div>
      );
    },
  ),
);

export default QuizQuestionList;
