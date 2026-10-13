import { useSyncExternalStore } from 'react';
import { Tooltip } from 'radix-ui';
import { IconDownload, IconLoader, IconRefresh } from '@/components/icons';
import {
  getAndroidUpdateUiState,
  subscribeAndroidUpdateUi,
  type AndroidUpdateUiState,
} from '@/utils/tauriAndroidUpdater';
import { isTauriAndroid } from '@/utils/tauriPlatform';

type AndroidUpdateStatusBarProps = {
  onRequestUpdate?: () => void;
};

function useAndroidUpdateUiState(): AndroidUpdateUiState {
  return useSyncExternalStore(subscribeAndroidUpdateUi, getAndroidUpdateUiState, getAndroidUpdateUiState);
}

export default function AndroidUpdateStatusBar({ onRequestUpdate }: AndroidUpdateStatusBarProps) {
  const state = useAndroidUpdateUiState();

  if (!isTauriAndroid()) return null;
  if (state.phase === 'idle') return null;

  const versionSuffix = state.version ? ` v${state.version}` : '';

  if (state.phase === 'downloading') {
    const percentLabel =
      state.percent != null ? `${state.percent}%` : '…';
    const tooltip = `업데이트 파일 다운로드 중${versionSuffix}: ${percentLabel}`;
    return (
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span
              className="inline-flex h-5 shrink-0 items-center gap-1 rounded bg-blue-50 px-1.5 text-[10px] font-medium text-blue-800 dark:bg-blue-950/40 dark:text-blue-200 md:h-6 md:text-[11px]"
              aria-label={tooltip}
              role="status"
            >
              <IconLoader size={12} className="animate-spin shrink-0" aria-hidden />
              <IconDownload size={12} className="shrink-0 opacity-80" aria-hidden />
              <span className="tabular-nums">{percentLabel}</span>
            </span>
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

  if (state.phase === 'error') {
    const tooltip = state.error
      ? `업데이트 다운로드 실패: ${state.error}`
      : '업데이트 다운로드 실패';
    return (
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              onClick={() => onRequestUpdate?.()}
              className="inline-flex h-5 shrink-0 cursor-pointer items-center gap-1 rounded bg-amber-50 px-1.5 text-[10px] font-semibold text-amber-900 hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/60 md:h-6 md:text-[11px]"
              aria-label="업데이트 다시 시도"
            >
              <IconRefresh size={12} aria-hidden />
              <span>재시도</span>
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

  if (state.phase === 'installing') {
    const tooltip = `업데이트 설치 중${versionSuffix}`;
    return (
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span
              className="inline-flex h-5 shrink-0 items-center gap-1 rounded bg-violet-50 px-1.5 text-[10px] font-medium text-violet-800 dark:bg-violet-950/40 dark:text-violet-200 md:h-6 md:text-[11px]"
              aria-label={tooltip}
              role="status"
            >
              <IconLoader size={12} className="animate-spin shrink-0" aria-hidden />
              <span>설치 중</span>
            </span>
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

  // ready
  const tooltip = `업데이트 준비됨${versionSuffix}. 눌러서 설치를 다시 시도합니다.`;
  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={() => onRequestUpdate?.()}
            className="inline-flex h-5 shrink-0 cursor-pointer items-center gap-1 rounded bg-emerald-50 px-1.5 text-[10px] font-semibold text-emerald-800 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60 md:h-6 md:text-[11px]"
            aria-label="업데이트"
          >
            <IconRefresh size={12} aria-hidden />
            <span>업데이트</span>
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
