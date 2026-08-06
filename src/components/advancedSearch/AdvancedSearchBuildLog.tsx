import { useEffect, useRef } from 'react';
import type { BuildLogEntry } from '@/utils/advancedSearch/engine';

type Props = {
  logs: BuildLogEntry[];
  building?: boolean;
  progress?: number | null;
  className?: string;
};

function levelClass(level: BuildLogEntry['level']): string {
  if (level === 'error') return 'text-red-600 dark:text-red-400';
  if (level === 'warn') return 'text-amber-700 dark:text-amber-300';
  if (level === 'ok') return 'text-emerald-700 dark:text-emerald-300';
  return 'text-gray-600 dark:text-odp-muted';
}

/**
 * Live scrollback for Advanced Search background indexing.
 */
export default function AdvancedSearchBuildLog({
  logs,
  building = false,
  progress = null,
  className = '',
}: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Keep pinned to bottom while building.
    el.scrollTop = el.scrollHeight;
  }, [logs, building]);

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
        {building && typeof progress === 'number' ? (
          <span className="text-[10px] tabular-nums text-amber-700 dark:text-amber-300">
            {Math.round(progress * 100)}%
          </span>
        ) : null}
      </div>
      {building && typeof progress === 'number' ? (
        <div className="h-0.5 w-full bg-gray-100 dark:bg-odp-bg">
          <div
            className="h-full bg-blue-500 transition-[width] duration-200 ease-out dark:bg-blue-400"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>
      ) : null}
      <div
        ref={scrollerRef}
        className="max-h-40 overflow-y-auto overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed"
        aria-live="polite"
        aria-relevant="additions"
      >
        {logs.length === 0 ? (
          <p className="text-gray-400 dark:text-odp-muted">대기 중…</p>
        ) : (
          logs.map((entry) => (
            <div key={entry.id} className={`whitespace-pre-wrap break-all ${levelClass(entry.level)}`}>
              <span className="text-gray-400 dark:text-odp-muted">
                {formatLogTime(entry.at)}
              </span>{' '}
              {entry.message}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
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
