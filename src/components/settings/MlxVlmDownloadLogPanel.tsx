import { useEffect, useState } from 'react';
import {
  clearMlxVlmDownloadLog,
  getMlxVlmDownloadLogLines,
  subscribeMlxVlmDownloadLog,
} from '@/utils/llm/mlxVlmDownloadLog';
import type { MlxVlmLogLine } from '@/utils/llm/mlxVlmRawLogBuffer';
import type { MlxVlmDownloadProgressSnapshot } from '@/utils/mlxVlmDownloadProgress';
import MlxVlmVirtualLogPanel from '@/components/settings/MlxVlmVirtualLogPanel';

export function useMlxVlmDownloadLogLines(): readonly MlxVlmLogLine[] {
  const [lines, setLines] = useState(() => getMlxVlmDownloadLogLines());

  useEffect(() => subscribeMlxVlmDownloadLog(() => setLines(getMlxVlmDownloadLogLines())), []);

  return lines;
}

type MlxVlmDownloadLogPanelProps = {
  repoId: string;
  progress: MlxVlmDownloadProgressSnapshot | null;
  aborting?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MlxVlmDownloadLogPanel({
  repoId,
  progress,
  aborting = false,
  open,
  onOpenChange,
}: MlxVlmDownloadLogPanelProps) {
  const lines = useMlxVlmDownloadLogLines();

  const statusLabel = aborting
    ? 'Aborting…'
    : progress?.label || 'Preparing…';
  const percent =
    progress && progress.totalBytes > 0
      ? Math.min(100, Math.max(0, Math.round(progress.percent)))
      : null;

  const emptyHint = aborting
    ? '다운로드를 중단하는 중…'
    : 'hf download / mlx_vlm.convert raw 출력이 여기에 표시됩니다.';

  return (
    <MlxVlmVirtualLogPanel
      title="다운로드 로그"
      subtitle={repoId}
      lines={lines}
      emptyHint={emptyHint}
      open={open}
      onOpenChange={onOpenChange}
      onClear={clearMlxVlmDownloadLog}
      headerExtra={
        percent == null ? (
          <span className="font-mono text-[10px] tabular-nums text-gray-600 dark:text-odp-muted">
            {statusLabel}
          </span>
        ) : null
      }
      beforeLog={
        percent != null ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[10px] tabular-nums text-gray-600 dark:text-odp-muted">
              <span className="font-semibold text-gray-800 dark:text-odp-fg">{percent}%</span>
              <span className="truncate font-mono">{statusLabel}</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-odp-bgSoft"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-label="Download progress"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ) : null
      }
    />
  );
}
