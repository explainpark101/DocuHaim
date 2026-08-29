import { useEffect, useRef, useState } from 'react';
import { Switch } from 'radix-ui';
import { VList, type VListHandle } from 'virtua';
import {
  advancedSearchEngine,
  type BuildLogEntry,
} from '@/utils/advancedSearch/engine';
import { loadAdvancedSearchBuildLogAutoScroll } from '@/utils/advancedSearch/settings';
import {
  setSettingsToggle,
  subscribeSettingsToggles,
} from '@/utils/advancedSearch/settingsToggles';

type Props = {
  /** Optional controlled logs; omit to pull async from the engine. */
  logs?: BuildLogEntry[];
  building?: boolean;
  progress?: number | null;
  className?: string;
};

/** Viewport height for the virtualized log scroller (matches former max-h-40). */
const LOG_LIST_HEIGHT_PX = 160;

const AUTO_SCROLL_TOGGLE_ID = 'settings-as-build-log-auto-scroll' as const;

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[0.875rem]';

function levelClass(level: BuildLogEntry['level']): string {
  if (level === 'error') return 'text-red-600 dark:text-red-400';
  if (level === 'warn') return 'text-amber-700 dark:text-amber-300';
  if (level === 'ok') return 'text-emerald-700 dark:text-emerald-300';
  return 'text-gray-600 dark:text-odp-muted';
}

/**
 * Live scrollback for Advanced Search background indexing.
 * Pulls logs asynchronously so Settings does not re-render on every log line.
 */
export default function AdvancedSearchBuildLog({
  logs: logsProp,
  building: buildingProp,
  progress: progressProp,
  className = '',
}: Props) {
  const listRef = useRef<VListHandle | null>(null);
  const [logs, setLogs] = useState<BuildLogEntry[]>(() =>
    logsProp ?? advancedSearchEngine.getBuildLogs().slice(),
  );
  const [building, setBuilding] = useState(
    () => buildingProp ?? advancedSearchEngine.getStatus().building,
  );
  const [progress, setProgress] = useState<number | null>(
    () => progressProp ?? advancedSearchEngine.getStatus().buildProgress,
  );
  const [autoScroll, setAutoScroll] = useState(() =>
    loadAdvancedSearchBuildLogAutoScroll(),
  );
  const pullGen = useRef(0);

  useEffect(() => {
    if (logsProp) {
      setLogs(logsProp);
    }
  }, [logsProp]);

  useEffect(() => {
    if (buildingProp !== undefined) setBuilding(buildingProp);
  }, [buildingProp]);

  useEffect(() => {
    if (progressProp !== undefined) setProgress(progressProp);
  }, [progressProp]);

  useEffect(() => {
    return subscribeSettingsToggles((id, enabled) => {
      if (id === AUTO_SCROLL_TOGGLE_ID) setAutoScroll(enabled);
    });
  }, []);

  useEffect(() => {
    if (logsProp) return undefined;

    let cancelled = false;
    const pullLogs = async () => {
      const gen = ++pullGen.current;
      const next = await advancedSearchEngine.getBuildLogsAsync();
      if (cancelled || gen !== pullGen.current) return;
      setLogs(next);
    };

    void pullLogs();
    const unsubLogs = advancedSearchEngine.subscribeBuildLogs(() => {
      void pullLogs();
    });
    const unsubStatus = advancedSearchEngine.subscribe(() => {
      const status = advancedSearchEngine.getStatus();
      setBuilding(status.building);
      setProgress(status.buildProgress);
    });

    return () => {
      cancelled = true;
      unsubLogs();
      unsubStatus();
    };
  }, [logsProp]);

  useEffect(() => {
    if (!autoScroll || logs.length === 0) return;
    listRef.current?.scrollToIndex(logs.length - 1, { align: 'end' });
  }, [logs, building, autoScroll]);

  if (!building && logs.length === 0) return null;

  return (
    <div
      className={`overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${className}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-2.5 py-1.5 dark:border-odp-borderSoft">
        <span className="text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong">
          색인 로그
          {building ? ' (실시간)' : ''}
        </span>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1.5">
            <span className="text-[10px] text-gray-500 dark:text-odp-muted">
              자동 스크롤
            </span>
            <Switch.Root
              checked={autoScroll}
              onCheckedChange={(next) => {
                setSettingsToggle(AUTO_SCROLL_TOGGLE_ID, next);
              }}
              className={switchRootClass(autoScroll)}
              aria-label="색인 로그 자동 스크롤"
            >
              <Switch.Thumb className={switchThumbClass} />
            </Switch.Root>
          </label>
          {building && typeof progress === 'number' ? (
            <span className="text-[10px] tabular-nums text-amber-700 dark:text-amber-300">
              {Math.round(progress * 100)}%
            </span>
          ) : null}
        </div>
      </div>
      {building && typeof progress === 'number' ? (
        <div className="h-0.5 w-full bg-gray-100 dark:bg-odp-bg">
          <div
            className="h-full bg-blue-500 transition-[width] duration-200 ease-out dark:bg-blue-400"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>
      ) : null}
      {logs.length === 0 ? (
        <p className="px-2.5 py-1.5 font-mono text-[10px] text-gray-400 dark:text-odp-muted">
          대기 중…
        </p>
      ) : (
        <VList
          ref={listRef}
          className="overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed"
          style={{ height: LOG_LIST_HEIGHT_PX }}
          data={logs}
          aria-live="polite"
          aria-relevant="additions"
        >
          {(entry) => (
            <div
              key={entry.id}
              className={`whitespace-pre-wrap break-all ${levelClass(entry.level)}`}
            >
              <span className="text-gray-400 dark:text-odp-muted">
                {formatLogTime(entry.at)}
              </span>{' '}
              {entry.message}
            </div>
          )}
        </VList>
      )}
    </div>
  );
}

function formatLogTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return '';
  }
}
