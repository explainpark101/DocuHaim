import { Pause, Play, Square, Timer } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import Button from '@/components/Button';
import { formatQuizElapsedMs } from '@/utils/quiz/quizTimeLog';
import type { UseQuizStopwatchResult } from '@/hooks/useQuizStopwatch';

type QuizStopwatchToolbarProps = {
  stopwatch: UseQuizStopwatchResult;
};

const TOOLTIP_CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

export default function QuizStopwatchToolbar({ stopwatch }: QuizStopwatchToolbarProps) {
  const { displayMs, running, started, start, pause, resume, stop } = stopwatch;

  if (!started) {
    return (
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button type="button" variant="secondary" size="sm" onClick={start}>
              <Timer size={14} />
              <span className="hidden md:inline">스톱워치</span>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
              풀이 시간 측정 시작
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
        <Timer
          size={14}
          className={`shrink-0 ${running ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}
          aria-hidden
        />
        <span
          className={`min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${
            running
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-slate-700 dark:text-odp-fgStrong'
          }`}
          aria-live="polite"
        >
          {formatQuizElapsedMs(displayMs)}
        </span>
        {running ? (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button type="button" variant="secondary" size="sm" onClick={pause} aria-label="일시정지">
                <Pause size={14} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                일시정지
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ) : (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button type="button" variant="secondary" size="sm" onClick={resume} aria-label="재개">
                <Play size={14} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                재개
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button type="button" variant="tertiary" size="sm" onClick={stop} aria-label="정지">
              <Square size={14} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
              정지
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  );
}
