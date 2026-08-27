type MlxLmDownloadProgressProps = {
  log: string;
};

export default function MlxLmDownloadProgress({ log }: MlxLmDownloadProgressProps) {
  return (
    <div className="rounded border border-amber-200 bg-amber-50/80 p-2.5 dark:border-amber-900/50 dark:bg-amber-950/30">
      <p className="text-[11px] font-medium text-amber-800 dark:text-amber-200">
        Download in progress…
      </p>
      {log ? (
        <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap text-[10px] text-amber-900/90 dark:text-amber-100/90">
          {log}
        </pre>
      ) : null}
    </div>
  );
}
