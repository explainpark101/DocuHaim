import type { MlxLmDownloadProgressSnapshot } from '@/utils/mlxLmDownloadProgress';

export type MlxLmActiveDownloadProgress = MlxLmDownloadProgressSnapshot & {
  repoId: string;
  message: string;
};

type MlxLmDownloadProgressProps = {
  repoId: string;
  progress: MlxLmDownloadProgressSnapshot | null;
  message: string;
};

export default function MlxLmDownloadProgress({
  repoId,
  progress,
  message,
}: MlxLmDownloadProgressProps) {
  return (
    <div className="rounded border border-amber-200 bg-amber-50/80 p-2.5 dark:border-amber-900/50 dark:bg-amber-950/30">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
        <p className="text-[11px] font-medium text-amber-800 dark:text-amber-200">
          Download in progress…
        </p>
        {progress ? (
          <p className="font-mono text-[11px] tabular-nums text-amber-900 dark:text-amber-100">
            {progress.label}
          </p>
        ) : null}
      </div>
      <p className="mt-1 text-[10px] text-amber-900/80 dark:text-amber-100/80">
        {repoId}
        {message ? ` · ${message}` : ''}
      </p>
      {progress ? (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-amber-200/80 dark:bg-amber-900/40">
          <div
            className="h-full rounded-full bg-amber-600 transition-[width] duration-200 dark:bg-amber-400"
            style={{ width: `${Math.min(100, Math.max(0, progress.percent))}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
