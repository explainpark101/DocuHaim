import Button from '@/components/Button';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { type ComponentType, type KeyboardEvent, useCallback } from 'react';

const CHOICE_ANALYSIS_DOCK_DEFAULT_WIDTH = 320;

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

export type QuizChoiceAnalysisDockMode = 'create' | 'regenerate';

type QuizChoiceAnalysisDockProps = {
  open: boolean;
  question: QuizQuestion | null;
  option: number | null;
  mode: QuizChoiceAnalysisDockMode;
  prompt: string;
  busy: boolean;
  onPromptChange: (value: string) => void;
  onClose: () => void;
  onGenerate: () => void;
};

function dockTitle(isCorrectOption: boolean, mode: QuizChoiceAnalysisDockMode): string {
  const base = isCorrectOption ? '정답 분석' : '오답 분석';
  return mode === 'regenerate' ? `${base} 재생성` : base;
}

export default function QuizChoiceAnalysisDock({
  open,
  question,
  option,
  mode,
  prompt,
  busy,
  onPromptChange,
  onClose,
  onGenerate,
}: QuizChoiceAnalysisDockProps) {
  const {
    width: dockWidth,
    handleProps: resizeHandleProps,
    isResizing,
  } = useResizablePanelWidth({
    storageKey: 'quiz-choice-analysis-dock-width',
    defaultWidth: CHOICE_ANALYSIS_DOCK_DEFAULT_WIDTH,
    minWidth: 260,
    maxWidth: 560,
    edge: 'right',
  });

  const isCorrectOption =
    question != null && option != null && option === question.answer;
  const title = dockTitle(isCorrectOption, mode);
  const accentBorder = isCorrectOption
    ? 'border-emerald-200 dark:border-emerald-900/60'
    : 'border-rose-200 dark:border-rose-900/60';
  const accentBg = isCorrectOption
    ? 'bg-emerald-50 dark:bg-emerald-950/40'
    : 'bg-rose-50 dark:bg-rose-950/40';
  const accentText = isCorrectOption
    ? 'text-emerald-900 dark:text-emerald-100'
    : 'text-rose-900 dark:text-rose-100';

  const handlePromptKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (busy) return;
      if (event.key !== 'Enter' || (!event.metaKey && !event.ctrlKey)) return;
      event.preventDefault();
      onGenerate();
    },
    [busy, onGenerate],
  );

  return (
    <AnimatePresence initial={false}>
      {open && question && option != null ? (
        <Motion.aside
          key="quiz-choice-analysis-dock"
          role="complementary"
          aria-label={title}
          className={`flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${accentBorder}`}
          initial={{ width: 0, opacity: 0.85 }}
          animate={{ width: dockWidth, opacity: 1 }}
          exit={{ width: 0, opacity: 0.85 }}
          transition={
            isResizing
              ? { duration: 0 }
              : { type: 'spring', stiffness: 380, damping: 36 }
          }
        >
          <div className="relative h-full min-h-0" style={{ width: dockWidth }}>
            <TocResizeHandle
              edge="left"
              handleProps={resizeHandleProps}
              isResizing={isResizing}
              visibleOnHover
              label="분석 패널 너비 조절"
            />
            <div className="flex h-full min-h-0 flex-col">
              <div
                className={`flex items-center justify-between border-b px-3 py-2.5 ${accentBorder}`}
              >
                <div className="min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                  {title}
                </div>
                <button
                  type="button"
                  aria-label="분석 패널 닫기"
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg"
                  onClick={onClose}
                  disabled={busy}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
                <div className={`rounded-lg px-2.5 py-2 text-[11px] ${accentBg} ${accentText}`}>
                  <div className="font-semibold">
                    {question.displayLabel}번 · {option}번 보기
                    {isCorrectOption ? ' (정답)' : ''}
                  </div>
                  <p className="mt-1 line-clamp-3 opacity-90">{question.question}</p>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
                    궁금한 점
                    <span className="ml-1 font-normal text-slate-500 dark:text-odp-muted">
                      (선택)
                    </span>
                  </span>
                  <textarea
                    className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                    placeholder={
                      isCorrectOption
                        ? '비워 두면 정답/오답 이유를 기본 설명합니다. 예: 왜 이 보기가 정답인지…'
                        : '비워 두면 오답 이유를 기본 설명합니다. 예: 2번과 3번의 차이…'
                    }
                    value={prompt}
                    disabled={busy}
                    onChange={(e) => onPromptChange(e.target.value)}
                    onKeyDown={handlePromptKeyDown}
                  />
                  <p className="text-[10px] text-slate-500 dark:text-odp-muted">
                    비워 두고 생성하면 기본 프롬프트로 설명합니다.{' '}
                    <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-px font-mono text-[9px] dark:border-odp-borderSoft dark:bg-odp-bgSoft">
                      ⌘/Ctrl+Enter
                    </kbd>
                    로 바로 생성할 수 있습니다.
                  </p>
                </label>
              </div>
              <div className={`flex gap-2 border-t p-3 ${accentBorder}`}>
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
                  onClick={onGenerate}
                >
                  <Sparkles size={14} />
                  {busy ? '생성 중…' : '생성'}
                </Button>
              </div>
            </div>
          </div>
        </Motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
