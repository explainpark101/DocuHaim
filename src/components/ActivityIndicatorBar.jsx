/**
 * Bottom activity indicator bar
 * - File upload, recording, note save, photo upload, chat send/sync, etc.
 * - Renders items registered via useActivityIndicator
 * - pin: true items stay visible even when done
 * - Error items: hover tooltip + click/touch dialog for the reason
 */
import { useState } from 'react';
import { Tooltip } from 'radix-ui';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import Button from '@/components/Button';
import Modal from '@/components/modals/Modal';
import {
  IconUpload,
  IconMic,
  IconPenLine,
  IconImage,
  IconLoader,
  IconDownload,
  IconMessage,
  IconSearch,
  IconRefresh,
  IconFilePlus,
  IconCheck,
  IconAlert,
  IconCloud,
} from '@/components/icons';

const typeConfig = {
  [ActivityTypes.FILE_UPLOAD]: {
    icon: IconUpload,
    label: '파일 업로드',
  },
  [ActivityTypes.RECORDING]: {
    icon: IconMic,
    label: '녹음 처리',
  },
  [ActivityTypes.NOTE_PROCESSING]: {
    icon: IconPenLine,
    label: '필기 저장',
  },
  [ActivityTypes.PHOTO_UPLOAD]: {
    icon: IconImage,
    label: '사진 업로드',
  },
  [ActivityTypes.DOWNLOAD]: {
    icon: IconDownload,
    label: '다운로드',
  },
  [ActivityTypes.CHAT_SEND]: {
    icon: IconMessage,
    label: '채팅 전송',
  },
  [ActivityTypes.CHAT_LOAD]: {
    icon: IconRefresh,
    label: '채팅 불러오기',
  },
  [ActivityTypes.CHAT_SEARCH]: {
    icon: IconSearch,
    label: '채팅 검색',
  },
  [ActivityTypes.CHAT_SYNC]: {
    icon: IconCloud,
    label: '채팅 동기화',
  },
  [ActivityTypes.CHAT_NOTE]: {
    icon: IconFilePlus,
    label: '노트로 추가',
  },
};

function chipClassName({ isError, isDone }) {
  return `inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] md:text-[11px] shrink-0 ${
    isError
      ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
      : isDone
        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
        : 'bg-gray-100 dark:bg-odp-bgSofter text-gray-700 dark:text-odp-fgStrong'
  }`;
}

function IndicatorChipContent({ Icon: _Icon, isActive, isError, isDone, displayLabel, indicator }) {
  return (
    <>
      {isActive ? (
        <IconLoader size={12} className="animate-spin shrink-0 text-blue-500" />
      ) : isError ? (
        <IconAlert size={12} className="shrink-0 text-red-500" />
      ) : isDone ? (
        <IconCheck size={12} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <_Icon size={12} className="shrink-0" />
      )}
      <span className="truncate max-w-[120px] md:max-w-[180px]">{displayLabel}</span>
      {indicator.detail && !isError && (
        <span className="hidden md:inline truncate max-w-[120px] text-gray-500 dark:text-odp-muted">
          {indicator.detail}
        </span>
      )}
      {indicator.progress != null && indicator.progress < 100 && (
        <span className="text-gray-500 dark:text-odp-muted shrink-0">{indicator.progress}%</span>
      )}
    </>
  );
}

function IndicatorItem({ indicator }) {
  const [reasonOpen, setReasonOpen] = useState(false);
  const config = typeConfig[indicator.type] || {
    icon: IconLoader,
    label: indicator.label || '처리 중',
  };
  const Icon = config.icon;
  const displayLabel = indicator.label ?? config.label;
  const isActive = indicator.status === 'pending' || indicator.status === 'processing';
  const isError = indicator.status === 'error';
  const isDone = indicator.status === 'done';
  const reason = String(indicator.detail || '').trim() || displayLabel;
  const explainError = isError && Boolean(reason);

  const content = (
    <IndicatorChipContent
      Icon={Icon}
      isActive={isActive}
      isError={isError}
      isDone={isDone}
      displayLabel={displayLabel}
      indicator={indicator}
    />
  );

  if (!explainError) {
    return (
      <span
        className={chipClassName({ isError, isDone })}
        title={indicator.detail || displayLabel}
      >
        {content}
      </span>
    );
  }

  return (
    <>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={`${chipClassName({ isError, isDone })} cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60`}
            aria-label={`${displayLabel}: ${reason}`}
            onClick={() => setReasonOpen(true)}
          >
            {content}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={6}
            className="z-[100001] max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
          >
            {reason}
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>

      <Modal
        isOpen={reasonOpen}
        onClose={() => setReasonOpen(false)}
        onConfirm={() => setReasonOpen(false)}
      >
        <div className="p-6">
          <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            {displayLabel}
          </h2>
          <p className="mb-4 whitespace-pre-line text-sm text-gray-600 dark:text-gray-400">
            {reason}
          </p>
          <div className="flex justify-end">
            <Button type="button" variant="primary" size="md" onClick={() => setReasonOpen(false)}>
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default function ActivityIndicatorBar() {
  const { indicators } = useActivityIndicator();
  const visibleIndicators = indicators.filter(
    (i) =>
      i.pin ||
      i.status === 'pending' ||
      i.status === 'processing' ||
      i.status === 'done' ||
      i.status === 'error',
  );

  if (visibleIndicators.length === 0) return null;

  return (
    <Tooltip.Provider delayDuration={280} skipDelayDuration={120}>
      <div className="flex min-w-0 shrink-0 items-center gap-1.5 overflow-x-auto">
        {visibleIndicators.map((indicator) => (
          <IndicatorItem key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </Tooltip.Provider>
  );
}
