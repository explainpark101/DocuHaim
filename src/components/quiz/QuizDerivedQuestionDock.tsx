import Button from '@/components/Button';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import {
  CHOICE_COUNT_MAX,
  CHOICE_COUNT_MIN,
  clampChoiceCount,
} from '@/utils/quiz/quizFileConfig';
import { resolveQuestionChoiceCount } from '@/utils/quiz/quizQuestionStyle';
import type { QuizDerivedQuestionTarget } from '@/utils/quiz/derivedQuestionAnalysis';
import type { QuizAnswerStyle, QuizQuestion, QuizQuestionKind } from '@/utils/quiz/quizTypes';
import QuizDockMotionAside from '@/components/quiz/QuizDockMotionAside';
import { GitBranch, Loader2, X } from 'lucide-react';
import { type ComponentType, memo, useEffect, useMemo, useState } from 'react';

const DERIVED_QUESTION_DOCK_DEFAULT_WIDTH = 360;

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

type QuizDerivedQuestionDockProps = {
  open: boolean;
  question: QuizQuestion | null;
  defaultChoiceCount: number;
  busy?: boolean;
  onClose: () => void;
  onSubmit: (target: QuizDerivedQuestionTarget) => void;
};

type KindPickerId = 'choice' | 'subjective-short' | 'subjective-essay';

function kindFromPicker(id: KindPickerId): {
  kind: QuizQuestionKind;
  answerStyle: QuizAnswerStyle;
} {
  if (id === 'subjective-essay') {
    return { kind: 'subjective', answerStyle: 'essay' };
  }
  if (id === 'subjective-short') {
    return { kind: 'subjective', answerStyle: 'short' };
  }
  return { kind: 'choice', answerStyle: 'short' };
}

function pickerFromQuestion(q: QuizQuestion | null): KindPickerId {
  if (!q) return 'choice';
  if (q.kind === 'subjective') {
    return q.answerStyle === 'essay' ? 'subjective-essay' : 'subjective-short';
  }
  return 'choice';
}

function QuizDerivedQuestionDock({
  open,
  question,
  defaultChoiceCount,
  busy = false,
  onClose,
  onSubmit,
}: QuizDerivedQuestionDockProps) {
  const [picker, setPicker] = useState<KindPickerId>('choice');
  const [choiceCount, setChoiceCount] = useState(defaultChoiceCount);
  const [userPrompt, setUserPrompt] = useState('');

  const {
    width: dockWidth,
    handleProps: resizeHandleProps,
    isResizing,
  } = useResizablePanelWidth({
    storageKey: 'quiz-derived-question-dock-width',
    defaultWidth: DERIVED_QUESTION_DOCK_DEFAULT_WIDTH,
    minWidth: 280,
    maxWidth: 560,
    edge: 'right',
  });

  const resolvedChoiceCount = useMemo(
    () =>
      question
        ? resolveQuestionChoiceCount(question, defaultChoiceCount)
        : defaultChoiceCount,
    [defaultChoiceCount, question],
  );

  useEffect(() => {
    if (!open) return;
    setPicker(pickerFromQuestion(question));
    setChoiceCount(resolvedChoiceCount);
    setUserPrompt('');
  }, [open, question, resolvedChoiceCount]);

  const { kind, answerStyle } = kindFromPicker(picker);
  const previewLabel = question?.displayLabel || question?.id || '';

  const handleSubmit = () => {
    onSubmit({
      kind,
      choiceCount: clampChoiceCount(choiceCount),
      ...(kind === 'subjective' ? { answerStyle } : {}),
      ...(userPrompt.trim() ? { userPrompt: userPrompt.trim() } : {}),
    });
  };

  const showDock = open && question != null;

  return (
    <QuizDockMotionAside
      motionKey="quiz-derived-question-dock"
      open={showDock}
      width={dockWidth}
      isResizing={isResizing}
      aria-label="파생문제 생성"
      className="flex h-full shrink-0 flex-col overflow-hidden border-l border-violet-200 bg-white shadow-lg dark:border-violet-900/60 dark:bg-odp-surface"
    >
      {question != null ? (
          <div className="relative h-full min-h-0" style={{ width: dockWidth }}>
            <TocResizeHandle
              edge="left"
              handleProps={resizeHandleProps}
              isResizing={isResizing}
              visibleOnHover
              label="파생문제 패널 너비 조절"
            />
            <div className="flex h-full min-h-0 flex-col">
              <div className="flex items-center justify-between border-b border-violet-200 px-3 py-2.5 dark:border-violet-900/60">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                    파생문제 생성
                  </div>
                  {previewLabel ? (
                    <p className="text-[11px] text-slate-500 dark:text-odp-muted">
                      {previewLabel}번 문항
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="파생문제 패널 닫기"
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg"
                  onClick={onClose}
                  disabled={busy}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
                <div className="rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-2 text-[11px] text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/45 dark:text-violet-100">
                  <p className="font-semibold">원본 문항</p>
                  <p className="mt-1 line-clamp-4 opacity-90">{question.question}</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-odp-muted">
                  원본 문항을 바탕으로 유형을 바꾸거나 요구사항을 추가해 새 파생 문항을 생성합니다.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      ['choice', '객관식'],
                      ['subjective-short', '단답형'],
                      ['subjective-essay', '서술형'],
                    ] as const
                  ).map(([id, label]) => {
                    const active = picker === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        disabled={busy}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                          active
                            ? 'border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100'
                            : 'border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg'
                        }`}
                        onClick={() => setPicker(id)}
                      >
                        {label}
                      </button>
                    );
                  })}
                  {kind === 'choice' ? (
                    <label className="ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted">
                      보기
                      <select
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                        value={choiceCount}
                        disabled={busy}
                        onChange={(e) => setChoiceCount(Number(e.target.value) || choiceCount)}
                      >
                        {Array.from(
                          { length: CHOICE_COUNT_MAX - CHOICE_COUNT_MIN + 1 },
                          (_, i) => CHOICE_COUNT_MIN + i,
                        ).map((n) => (
                          <option key={n} value={n}>
                            {n}지선다
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                </div>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
                    추가 요구사항
                    <span className="ml-1 font-normal text-slate-500 dark:text-odp-muted">
                      (선택)
                    </span>
                  </span>
                  <textarea
                    className="quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                    placeholder="예: 계산 위주로 바꾸고, 오답 보기는 헷갈리게 구성해 주세요."
                    value={userPrompt}
                    disabled={busy}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </label>
              </div>

              <div className="flex gap-2 border-t border-violet-200 p-3 dark:border-violet-900/60">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  disabled={busy}
                  onClick={onClose}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  disabled={busy}
                  onClick={handleSubmit}
                >
                  {busy ? (
                    <Loader2 size={14} className="animate-spin" aria-hidden />
                  ) : (
                    <GitBranch size={14} />
                  )}
                  {busy ? '생성 중…' : '파생문제 생성'}
                </Button>
              </div>
            </div>
          </div>
      ) : null}
    </QuizDockMotionAside>
  );
}

export default memo(QuizDerivedQuestionDock);
