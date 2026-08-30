import { memo, useCallback, useState } from 'react';
import { motion as Motion } from 'motion/react';
import { List, X } from 'lucide-react';
import QuizDockMotionAside from '@/components/quiz/QuizDockMotionAside';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import type { QuizQuestion, SubjectiveGradeResult } from '@/utils/quiz/quizTypes';
import {
  getQuizQuestionGradeStatus,
  QUIZ_GRADE_STATUS_DOT_CLASS,
  QUIZ_GRADE_STATUS_LABEL,
  type QuizQuestionGradeStatus,
} from '@/utils/quiz/quizScoring';
import { getQuizTocItemMotionProps } from '@/utils/quiz/quizDockMotion';
import { useQuizDockUsesLayoutWidthAnim } from '@/hooks/useQuizDockUsesLayoutWidthAnim';
import { type ComponentType } from 'react';

const TOC_DOCK_DEFAULT_WIDTH = 288;

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

const TOC_GRADE_FILTER_ORDER: QuizQuestionGradeStatus[] = [
  'ungraded',
  'correct',
  'partial',
  'wrong',
];

const TOC_GRADE_TOGGLE_ACTIVE_CLASS: Record<QuizQuestionGradeStatus, string> = {
  ungraded:
    'bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600',
  correct:
    'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800',
  partial:
    'bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800',
  wrong:
    'bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800',
};

const TOC_GRADE_TOGGLE_INACTIVE_CLASS =
  'bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted';

export type QuizTocDockProps = {
  open: boolean;
  questions: QuizQuestion[];
  userAnswers: Record<string, number | string>;
  gradedQuestions: Record<string, boolean>;
  isSubmitted: boolean;
  subjectiveGrades: Record<string, SubjectiveGradeResult>;
  onClose: () => void;
  onNavigate: (questionId: string) => void;
};

function QuizTocDock({
  open,
  questions,
  userAnswers,
  gradedQuestions,
  isSubmitted,
  subjectiveGrades,
  onClose,
  onNavigate,
}: QuizTocDockProps) {
  const [gradeFilters, setGradeFilters] = useState<
    Record<QuizQuestionGradeStatus, boolean>
  >({
    ungraded: true,
    correct: true,
    partial: true,
    wrong: true,
  });

  const {
    width: tocDockWidth,
    handleProps: tocDockResizeHandleProps,
    isResizing: tocDockResizing,
  } = useResizablePanelWidth({
    storageKey: 'quiz-toc-dock-width',
    defaultWidth: TOC_DOCK_DEFAULT_WIDTH,
    minWidth: 220,
    maxWidth: 480,
    edge: 'right',
  });

  const toggleGradeFilter = useCallback((status: QuizQuestionGradeStatus) => {
    setGradeFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  }, []);

  const useLayoutWidthAnim = useQuizDockUsesLayoutWidthAnim();

  return (
    <QuizDockMotionAside
      motionKey="quiz-toc-dock"
      open={open}
      width={tocDockWidth}
      isResizing={tocDockResizing}
      aria-label="문제 목차"
      className="flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
    >
          <div className="relative flex h-full min-h-0 w-full flex-col">
            <TocResizeHandle
              edge="left"
              handleProps={tocDockResizeHandleProps}
              isResizing={tocDockResizing}
              visibleOnHover
              label="목차 패널 너비 조절"
            />
            <div className="border-b border-slate-200 dark:border-odp-borderSoft">
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                  <List
                    size={16}
                    className="text-slate-600 dark:text-odp-muted"
                  />
                  문제 목차
                </div>
                <button
                  type="button"
                  aria-label="목차 패널 닫기"
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg"
                  onClick={onClose}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1 px-3 pb-2.5">
                {TOC_GRADE_FILTER_ORDER.map((status) => {
                  const active = gradeFilters[status];
                  return (
                    <button
                      key={status}
                      type="button"
                      aria-pressed={active}
                      aria-label={`목차 ${QUIZ_GRADE_STATUS_LABEL[status]} ${active ? '표시' : '숨김'}`}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                        active
                          ? TOC_GRADE_TOGGLE_ACTIVE_CLASS[status]
                          : TOC_GRADE_TOGGLE_INACTIVE_CLASS
                      }`}
                      onClick={() => toggleGradeFilter(status)}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          active
                            ? QUIZ_GRADE_STATUS_DOT_CLASS[status]
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                        aria-hidden
                      />
                      {QUIZ_GRADE_STATUS_LABEL[status]}
                    </button>
                  );
                })}
              </div>
            </div>
            <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs">
              {questions.map((q, i) => {
                const isSimilarChild = Boolean(q.similarOf);
                const childKindLabel = /-파생\d+$/u.test(
                  String(q.displayLabel || ''),
                )
                  ? '파생문제'
                  : '유사문제';
                const gradeStatus = getQuizQuestionGradeStatus({
                  question: q,
                  userAnswers,
                  gradedQuestions,
                  isSubmitted,
                  subjectiveGrades,
                });
                if (gradeStatus && !gradeFilters[gradeStatus]) {
                  return null;
                }

                const rowButton = (
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${
                      isSimilarChild
                        ? 'ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200'
                        : 'px-2'
                    }`}
                    title={
                      isSimilarChild
                        ? `${q.similarOf?.displayLabel || q.similarOf?.id}의 ${childKindLabel}`
                        : undefined
                    }
                    onClick={() => onNavigate(q.id)}
                  >
                    <span
                      className="flex h-4 w-2 shrink-0 items-center justify-center"
                      aria-hidden
                    >
                      {gradeStatus ? (
                        <span
                          className={`h-2 w-2 rounded-full ${QUIZ_GRADE_STATUS_DOT_CLASS[gradeStatus]}`}
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 truncate">
                      {isSimilarChild ? (
                        <span className="mr-1 text-violet-400 dark:text-violet-500">
                          ↳
                        </span>
                      ) : null}
                      {q.displayLabel}. {q.question.slice(0, 40)}
                    </span>
                  </button>
                );

                const itemMotion = getQuizTocItemMotionProps(i, useLayoutWidthAnim);

                return (
                  <Motion.li
                    key={q.id}
                    initial={itemMotion.initial}
                    animate={itemMotion.animate}
                    transition={itemMotion.transition}
                  >
                    {rowButton}
                  </Motion.li>
                );
              })}
            </ul>
          </div>
    </QuizDockMotionAside>
  );
}

export default memo(QuizTocDock);
