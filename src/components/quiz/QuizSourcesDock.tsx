import QuizDockMotionAside from '@/components/quiz/QuizDockMotionAside';
import { memo, useCallback, useState } from 'react';
import { Library, X } from 'lucide-react';
import { Switch } from 'radix-ui';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import QuizSourcePathsChips from '@/components/quiz/QuizSourcePathsChips';
import QuizSourcesTopicGeneratePanel from '@/components/quiz/QuizSourcesTopicGeneratePanel';
import type { QuizDocument } from '@/utils/quiz/quizTypes';
import { isQuizSourcePathEnabled } from '@/utils/quiz';
import { type ComponentType } from 'react';

const SOURCES_DOCK_DEFAULT_WIDTH = 320;
const QUIZ_SOURCE_REMOVE_CONFIRM_KEY = 's3haim_quiz_source_remove_confirm';

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

const SOURCE_REMOVE_SWITCH_ROOT_CLASS = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400',
    checked
      ? 'border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const SOURCE_REMOVE_SWITCH_THUMB_CLASS =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

function readQuizSourceRemoveConfirm(): boolean {
  try {
    return localStorage.getItem(QUIZ_SOURCE_REMOVE_CONFIRM_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeQuizSourceRemoveConfirm(value: boolean): void {
  try {
    localStorage.setItem(QUIZ_SOURCE_REMOVE_CONFIRM_KEY, String(value));
  } catch {
    // ignore
  }
}

export type QuizSourcesDockProps = {
  open: boolean;
  docConfig: QuizDocument['config'];
  sourcePathUsage: { total: number; active: number };
  busyGenSources: boolean;
  onClose: () => void;
  onPreview: (path: string) => void;
  onRemove: (path: string) => void;
  onToggleEnabled: (path: string, enabled: boolean) => void;
  onOpenPicker: () => void;
  onGenerateFromTopic: (topic: string) => void;
  onDropHostChange: (node: HTMLElement | null) => void;
};

function QuizSourcesDock({
  open,
  docConfig,
  sourcePathUsage,
  busyGenSources,
  onClose,
  onPreview,
  onRemove,
  onToggleEnabled,
  onOpenPicker,
  onGenerateFromTopic,
  onDropHostChange,
}: QuizSourcesDockProps) {
  const [confirmSourceRemove, setConfirmSourceRemove] = useState(
    readQuizSourceRemoveConfirm,
  );

  const {
    width: sourcesDockWidth,
    handleProps: sourcesDockResizeHandleProps,
    isResizing: sourcesDockResizing,
  } = useResizablePanelWidth({
    storageKey: 'quiz-sources-dock-width',
    defaultWidth: SOURCES_DOCK_DEFAULT_WIDTH,
    minWidth: 240,
    maxWidth: 520,
    edge: 'right',
  });

  const handleConfirmRemoveChange = useCallback((checked: boolean) => {
    setConfirmSourceRemove(checked);
    writeQuizSourceRemoveConfirm(checked);
  }, []);

  return (
    <QuizDockMotionAside
      motionKey="quiz-sources-dock"
      open={open}
      width={sourcesDockWidth}
      isResizing={sourcesDockResizing}
      aria-label="파일 근거 문서"
      className="flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
    >
          <div className="relative flex h-full min-h-0 w-full flex-col">
            <TocResizeHandle
              edge="left"
              handleProps={sourcesDockResizeHandleProps}
              isResizing={sourcesDockResizing}
              visibleOnHover
              label="파일 근거 패널 너비 조절"
            />
            <div className="border-b border-slate-200 dark:border-odp-borderSoft">
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                  <Library
                    size={16}
                    className="shrink-0 text-violet-600 dark:text-violet-400"
                  />
                  <span className="truncate">파일 근거</span>
                  {sourcePathUsage.total > 0 ? (
                    <span
                      className="ml-0.5 inline-flex shrink-0 items-baseline gap-0.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-bold tabular-nums dark:bg-violet-950/70"
                      aria-label={`등록 ${sourcePathUsage.total}개 중 ${sourcePathUsage.active}개 사용 중`}
                    >
                      <span className="text-violet-600 dark:text-violet-400">
                        {sourcePathUsage.active}
                      </span>
                      <span className="font-medium text-slate-400">/</span>
                      <span className="text-slate-700 dark:text-slate-200">
                        {sourcePathUsage.total}
                      </span>
                      <span className="ml-0.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300">
                        사용
                      </span>
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="근거 패널 닫기"
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg"
                  onClick={onClose}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 pb-2.5">
                <label
                  htmlFor="quiz-source-remove-confirm"
                  className="text-[11px] font-medium text-slate-600 dark:text-odp-muted"
                >
                  삭제 시 확인
                </label>
                <Switch.Root
                  id="quiz-source-remove-confirm"
                  className={SOURCE_REMOVE_SWITCH_ROOT_CLASS(confirmSourceRemove)}
                  checked={confirmSourceRemove}
                  onCheckedChange={handleConfirmRemoveChange}
                  aria-label="근거 문서 삭제 시 확인"
                >
                  <Switch.Thumb className={SOURCE_REMOVE_SWITCH_THUMB_CLASS} />
                </Switch.Root>
              </div>
            </div>
            <div
              ref={onDropHostChange}
              className="relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3"
            >
              <QuizSourcePathsChips
                layout="dock"
                paths={docConfig.sourcePaths}
                label="선택된 문서"
                onPreview={onPreview}
                onRemove={onRemove}
                isPathEnabled={(path) => isQuizSourcePathEnabled(docConfig, path)}
                onToggleEnabled={onToggleEnabled}
                onOpenPicker={onOpenPicker}
              />
              <QuizSourcesTopicGeneratePanel
                disabled={busyGenSources}
                onGenerate={onGenerateFromTopic}
              />
            </div>
          </div>
    </QuizDockMotionAside>
  );
}

export default memo(QuizSourcesDock);

export { readQuizSourceRemoveConfirm };
