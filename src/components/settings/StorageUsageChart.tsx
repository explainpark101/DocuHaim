/**
 * Storage usage charts (recharts) — pie / donut / bar with type select.
 * Lazy-loaded so recharts stays out of the main settings chunk.
 */

import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { RadixSelectField } from '@/components/ui/RadixSelectField';
import { formatStorageBytes } from '@/utils/storageUsageAnalysis';

const StorageUsageChartView = lazy(() => import('./StorageUsageChartView'));

export type StorageUsageChartKind = 'pie' | 'donut' | 'bar';

export type StorageUsageChartDatum = {
  name: string;
  value: number;
  /** Optional fill; otherwise palette cycles. */
  fill?: string;
};

const CHART_KIND_OPTIONS = [
  { value: 'pie', label: '파이 차트' },
  { value: 'donut', label: '도넛 차트' },
  { value: 'bar', label: '막대 차트' },
] as const;

const STORAGE_KEY = 's3haim_storage_usage_chart_kind';

function loadChartKind(): StorageUsageChartKind {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'pie' || raw === 'donut' || raw === 'bar') return raw;
  } catch {
    // ignore
  }
  return 'donut';
}

function saveChartKind(kind: StorageUsageChartKind): void {
  try {
    localStorage.setItem(STORAGE_KEY, kind);
  } catch {
    // ignore
  }
}

/** Distinct palette for slices / bars (works on light + dark UI). */
export const STORAGE_CHART_PALETTE = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#84cc16',
  '#f97316',
  '#64748b',
] as const;

export function withChartColors(
  rows: StorageUsageChartDatum[],
): Array<StorageUsageChartDatum & { fill: string }> {
  return rows.map((row, i) => ({
    ...row,
    fill:
      row.fill ??
      STORAGE_CHART_PALETTE[i % STORAGE_CHART_PALETTE.length] ??
      '#64748b',
  }));
}

type Props = {
  data: StorageUsageChartDatum[];
  /** Empty / loading copy. */
  emptyText?: string;
  className?: string;
};

/**
 * Chart panel with pie / donut / bar select (shared across capacity sections).
 */
export default function StorageUsageChart({
  data,
  emptyText = '분석을 시작하면 그래프가 표시됩니다.',
  className = '',
}: Props) {
  const [kind, setKind] = useState<StorageUsageChartKind>(() => loadChartKind());
  const colored = useMemo(() => withChartColors(data.filter((d) => d.value > 0)), [data]);

  useEffect(() => {
    saveChartKind(kind);
  }, [kind]);

  return (
    <div
      className={`flex h-full min-h-40 w-full flex-col gap-2 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft ${className}`.trim()}
    >
      <div className="flex shrink-0 items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted">
          그래프
        </span>
        <RadixSelectField
          value={kind}
          onValueChange={(next) => {
            if (next === 'pie' || next === 'donut' || next === 'bar') setKind(next);
          }}
          options={CHART_KIND_OPTIONS}
          aria-label="차트 종류"
          className="h-7 min-w-[7.5rem] text-[11px]"
        />
      </div>
      <div className="min-h-0 flex-1">
        {colored.length === 0 ? (
          <div className="flex h-36 items-center justify-center text-[11px] text-gray-500 dark:text-odp-muted md:h-full md:min-h-40">
            {emptyText}
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="flex h-36 items-center justify-center text-[11px] text-gray-500 dark:text-odp-muted">
                차트 로딩…
              </div>
            }
          >
            <StorageUsageChartView kind={kind} data={colored} />
          </Suspense>
        )}
      </div>
      {colored.length > 0 ? (
        <p className="shrink-0 truncate text-[9px] text-gray-400 dark:text-odp-muted">
          합계 {formatStorageBytes(colored.reduce((s, d) => s + d.value, 0))}
        </p>
      ) : null}
    </div>
  );
}
