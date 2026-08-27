import { Check, Download, Link2, Loader2 } from 'lucide-react';

type MlxVlmDownloadButtonContentProps = {
  mode: 'download' | 'downloading' | 'aborting' | 'downloaded';
  progressLabel?: string;
  paste?: boolean;
};

export default function MlxVlmDownloadButtonContent({
  mode,
  progressLabel = '',
  paste = false,
}: MlxVlmDownloadButtonContentProps) {
  if (mode === 'aborting') {
    return (
      <span className="inline-flex min-w-0 items-center gap-2 transition-none">
        <Loader2 size={14} className="shrink-0 animate-spin" aria-hidden />
        <span>Aborting…</span>
      </span>
    );
  }

  if (mode === 'downloading') {
    return (
      <span className="inline-flex min-w-0 items-center gap-2 transition-none">
        <Loader2 size={14} className="shrink-0 animate-spin" aria-hidden />
        <span className="truncate">{progressLabel || 'Downloading…'}</span>
      </span>
    );
  }

  if (mode === 'downloaded') {
    return (
      <span className="inline-flex min-w-0 items-center gap-2 transition-none">
        <Check size={14} className="shrink-0" aria-hidden />
        <span>Downloaded</span>
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-0 items-center gap-2 transition-none">
      {paste ? <Link2 size={14} className="shrink-0" aria-hidden /> : <Download size={14} className="shrink-0" aria-hidden />}
      <span>Download</span>
    </span>
  );
}
