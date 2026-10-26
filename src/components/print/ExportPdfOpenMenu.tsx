import { useEffect, useState } from 'react';
import { Check, Layers, Printer, ScrollText } from 'lucide-react';
import { DropdownMenu, Tooltip } from 'radix-ui';
import {
  EXPORT_PDF_PAGINATION_MODE_CHANGED_EVENT,
  EXPORT_PDF_PAGINATION_MODE_OPTIONS,
  loadExportPdfPaginationMode,
  type ExportPdfPaginationMode,
} from '@/utils/exportPdf/exportPdfPaginationModeSettings';

type Variant = 'haim' | 'md-toolbar' | 'icon';

type Props = {
  disabled?: boolean;
  onOpen: (mode: ExportPdfPaginationMode) => void;
  variant?: Variant;
};

const ITEM_CLASS =
  'flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-left text-sm outline-none data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg';

const CONTENT_CLASS =
  'z-100050 w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white p-1 text-gray-800 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg';

function triggerClass(variant: Variant): string {
  if (variant === 'haim') {
    return 'inline-flex h-7 w-7 items-center justify-center rounded border border-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-bgSoft';
  }
  if (variant === 'md-toolbar') return 'md-editor-toolbar-item';
  return 'inline-flex shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white p-1.5 text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong';
}

function modeIcon(mode: ExportPdfPaginationMode) {
  return mode === 'pagedjs' ? Layers : ScrollText;
}

/**
 * PDF export entry: pick continuous flow (default) or paged.js before opening.
 */
export default function ExportPdfOpenMenu({
  disabled = false,
  onOpen,
  variant = 'icon',
}: Props) {
  const [current, setCurrent] = useState<ExportPdfPaginationMode>(() =>
    loadExportPdfPaginationMode(),
  );

  useEffect(() => {
    const sync = () => setCurrent(loadExportPdfPaginationMode());
    window.addEventListener(EXPORT_PDF_PAGINATION_MODE_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EXPORT_PDF_PAGINATION_MODE_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const iconSize = variant === 'icon' ? 16 : 14;

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
    <DropdownMenu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={triggerClass(variant)}
              disabled={disabled}
              aria-label="PDF로 내보내기"
              onMouseDown={(event) => {
                if (variant === 'haim') event.preventDefault();
              }}
            >
              <Printer
                className={variant === 'md-toolbar' ? 'md-editor-icon' : undefined}
                size={variant === 'md-toolbar' ? 16 : iconSize}
                aria-hidden
              />
            </button>
          </DropdownMenu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
          >
            PDF로 내보내기
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={6}
          className={CONTENT_CLASS}
        >
          {EXPORT_PDF_PAGINATION_MODE_OPTIONS.map((opt) => {
            const Icon = modeIcon(opt.value);
            const selected = current === opt.value;
            return (
              <DropdownMenu.Item
                key={opt.value}
                className={ITEM_CLASS}
                onSelect={() => onOpen(opt.value)}
              >
                <Icon className="mt-0.5 shrink-0" size={14} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 font-medium">
                    {opt.label}
                    {selected ? <Check size={12} aria-hidden /> : null}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                    {opt.description}
                  </span>
                </span>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
    </Tooltip.Provider>
  );
}
