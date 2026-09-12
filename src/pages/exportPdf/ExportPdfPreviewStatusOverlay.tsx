import { useEffect, useState } from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import {
  EXPORT_PDF_PAGED_STATUS_LABEL,
  isExportPdfPagedBusy,
  type ExportPdfPagedStatus,
} from '@/pages/exportPdf/exportPdfPagedStatus';

export type ExportPdfPreviewStatusOverlayProps = {
  status: ExportPdfPagedStatus;
  errorMessage: string | null;
  /** True after at least one successful page layout (previous pages may still be visible). */
  hasPages: boolean;
};

function formatElapsed(seconds: number): string {
  if (seconds < 60) return `${seconds}초`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}분 ${s}초`;
}

/**
 * Shows which Export PDF preview step is running.
 * Full overlay when no pages yet; compact badge while re-paginating over existing pages.
 */
export function ExportPdfPreviewStatusOverlay({
  status,
  errorMessage,
  hasPages,
}: ExportPdfPreviewStatusOverlayProps) {
  const busy = isExportPdfPagedBusy(status);
  const showError = status === 'error' && !hasPages;
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    if (!busy && !showError) {
      setElapsedSec(0);
      return undefined;
    }
    setElapsedSec(0);
    const started = Date.now();
    const id = window.setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - started) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [busy, showError, status]);

  if (!busy && !showError) return null;

  const label =
    status === 'error'
      ? EXPORT_PDF_PAGED_STATUS_LABEL.error
      : EXPORT_PDF_PAGED_STATUS_LABEL[status] || '처리 중…';
  const detail =
    status === 'error'
      ? errorMessage?.trim() || '페이지 미리보기를 만들지 못했습니다. 문서나 콘솔 로그를 확인해 주세요.'
      : null;

  // Re-layout while previous pages stay visible — compact chip, not a blank screen.
  if (busy && hasPages) {
    return (
      <div
        className="pointer-events-none absolute top-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-md border border-gray-200/90 bg-white/95 px-3 py-1.5 text-xs text-gray-700 shadow-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 dark:text-odp-fg"
        role="status"
        aria-live="polite"
      >
        <LoaderCircle className="animate-spin shrink-0" size={14} aria-hidden />
        <span>{label}</span>
        {elapsedSec >= 2 ? (
          <span className="text-gray-400 dark:text-odp-muted tabular-nums">
            {formatElapsed(elapsedSec)}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 z-20 flex min-h-[min(60vh,420px)] flex-col items-center justify-center gap-3 bg-neutral-200/90 px-4 print:hidden dark:bg-neutral-800/90"
      role="status"
      aria-live="polite"
      aria-busy={busy}
    >
      {showError ? (
        <AlertCircle className="shrink-0 text-amber-600 dark:text-amber-400" size={28} aria-hidden />
      ) : (
        <LoaderCircle
          className="animate-spin shrink-0 text-gray-500 dark:text-odp-muted"
          size={28}
          aria-hidden
        />
      )}
      <p className="text-center text-sm font-medium text-gray-700 dark:text-odp-fg">{label}</p>
      {detail ? (
        <p className="max-w-md text-center text-xs text-gray-500 dark:text-odp-muted whitespace-pre-wrap">
          {detail}
        </p>
      ) : null}
      {busy && elapsedSec >= 2 ? (
        <p className="text-xs text-gray-400 dark:text-odp-muted tabular-nums">
          경과 {formatElapsed(elapsedSec)}
        </p>
      ) : null}
      {busy && elapsedSec >= 15 ? (
        <p className="max-w-sm text-center text-[11px] leading-relaxed text-gray-400 dark:text-odp-muted">
          이미지나 Mermaid가 많으면 오래 걸릴 수 있습니다. 화면이 비어 있어도 작업 중일 수 있습니다.
        </p>
      ) : null}
    </div>
  );
}
