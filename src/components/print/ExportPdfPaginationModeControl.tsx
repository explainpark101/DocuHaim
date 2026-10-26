import { Layers, ScrollText } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import {
  EXPORT_PDF_PAGINATION_MODE_OPTIONS,
  type ExportPdfPaginationMode,
} from '@/utils/exportPdf/exportPdfPaginationModeSettings';

type Props = {
  value: ExportPdfPaginationMode;
  onChange: (mode: ExportPdfPaginationMode) => void;
};

function modeIcon(mode: ExportPdfPaginationMode) {
  return mode === 'pagedjs' ? Layers : ScrollText;
}

/** Toolbar switch between continuous flow preview and paged.js. */
export default function ExportPdfPaginationModeControl({ value, onChange }: Props) {
  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <div
        className="flex min-w-0 items-center gap-2"
        role="group"
        aria-label="페이지 나누기"
        data-print-toolbar="pagination"
      >
        <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">페이지</span>
        <div className="inline-flex overflow-hidden rounded-md border border-gray-300 dark:border-odp-borderStrong">
          {EXPORT_PDF_PAGINATION_MODE_OPTIONS.map((opt) => {
            const Icon = modeIcon(opt.value);
            const active = value === opt.value;
            return (
              <Tooltip.Root key={opt.value}>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-label={opt.label}
                    onClick={() => onChange(opt.value)}
                    className={`inline-flex h-8 items-center gap-1.5 px-2.5 text-sm transition ${
                      active
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft'
                    }`}
                  >
                    <Icon size={14} aria-hidden />
                    {opt.shortLabel}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="bottom"
                    sideOffset={6}
                    className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
                  >
                    {opt.description}
                    <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            );
          })}
        </div>
      </div>
    </Tooltip.Provider>
  );
}
