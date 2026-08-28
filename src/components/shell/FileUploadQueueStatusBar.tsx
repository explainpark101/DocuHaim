import { Tooltip } from 'radix-ui';
import { IconCheck, IconLoader, IconUpload } from '@/components/icons';
import { useFileUploadQueue } from '@/contexts/FileUploadQueueContext';

const CHIP_STYLES = {
  idle: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-odp-bgSofter dark:text-odp-muted dark:hover:bg-odp-focusBg',
  queued:
    'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg',
  uploading:
    'bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60',
  complete:
    'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60',
} as const;

export default function FileUploadQueueStatusBar() {
  const { summary, setPanelOpen } = useFileUploadQueue();
  const chipState = summary.chipState;
  const showSpinner = chipState === 'uploading';
  const showCheck = chipState === 'complete';

  const tooltip =
    summary.total > 0
      ? `${summary.label}. 클릭하면 업로드 대기열을 엽니다.`
      : '업로드 대기열';

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            data-file-upload-queue-trigger=""
            onClick={() => setPanelOpen(true)}
            className={`inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 md:h-6 md:w-6 ${CHIP_STYLES[chipState]}`}
            aria-label={tooltip}
          >
            {showSpinner ? (
              <IconLoader size={13} className="animate-spin" aria-hidden />
            ) : showCheck ? (
              <IconCheck size={13} aria-hidden />
            ) : (
              <IconUpload size={13} aria-hidden />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={6}
            className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
          >
            {tooltip}
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
