import { Check, Undo2 } from 'lucide-react';
import type { PrintChromePlacementDraft } from '@/components/print/PrintChromeLayer';
import { formatPrintChromePlacementDelta } from '@/utils/printChrome/placementMetrics';

type Props = {
  draft: PrintChromePlacementDraft | null;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Bottom bar after entering move mode / nudging a page-number: shows move delta and opens apply confirm.
 */
export default function PrintChromePlacementBar({ draft, onConfirm, onCancel }: Props) {
  if (!draft || draft.dragging || !draft.moveMode) return null;

  const pageSize =
    draft.pageWidthPx != null && draft.pageHeightPx != null
      ? { widthPx: draft.pageWidthPx, heightPx: draft.pageHeightPx }
      : null;
  const { label, absoluteLabel } = formatPrintChromePlacementDelta(
    draft.origin,
    draft.placement,
    pageSize,
  );

  return (
    <div
      className="pointer-events-auto fixed bottom-4 left-1/2 z-40 flex max-w-[min(96vw,36rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/95 px-3 py-2.5 shadow-lg print:hidden backdrop-blur-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft/95"
      data-print-chrome-placement-bar="1"
      role="status"
    >
      <div className="min-w-0 px-1 text-center text-xs text-gray-700 dark:text-odp-fg">
        <p className="font-medium tabular-nums">{label}</p>
        <p className="mt-0.5 text-[11px] tabular-nums text-gray-500 dark:text-odp-muted">
          {absoluteLabel}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        >
          <Undo2 size={14} />
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Check size={14} />
          확인
        </button>
      </div>
    </div>
  );
}
