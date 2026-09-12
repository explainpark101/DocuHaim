import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PanelTop, X } from 'lucide-react';
import TocResizeHandle from '@/components/TocResizeHandle';
import {
  PrintChromeIconTooltip,
  PrintChromeTooltipProvider,
} from '@/components/print/PrintChromeTooltips';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const DOCK_STORAGE_KEY = 's3haim_export_pdf_tools_dock_width';

export type ExportPdfToolsDockProps = {
  open: boolean;
  title: string;
  topPx: number;
  /** Offset from the right edge (e.g. when stacking left of TOC). */
  rightOffsetPx?: number;
  onClose: () => void;
  /** Landscape: return to floating modal. */
  onUndock: () => void;
  children: ReactNode;
  /** Report live width so preview padding can track resize. */
  onWidthChange?: (width: number) => void;
};

/**
 * Right-side Export PDF tools dock (font / page chrome). Landscape only at call site.
 */
export default function ExportPdfToolsDock({
  open,
  title,
  topPx,
  rightOffsetPx = 0,
  onClose,
  onUndock,
  children,
  onWidthChange,
}: ExportPdfToolsDockProps) {
  const { width, handleProps, isResizing } = useResizablePanelWidth({
    storageKey: DOCK_STORAGE_KEY,
    defaultWidth: 380,
    minWidth: 280,
    maxWidth: 560,
    edge: 'right',
  });

  useEffect(() => {
    onWidthChange?.(open ? width : 0);
  }, [open, width, onWidthChange]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          key="export-pdf-tools-dock"
          className="flex fixed bottom-0 z-31 border-l border-gray-200 bg-white/95 print:hidden backdrop-blur-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft/95"
          style={{ top: topPx, right: rightOffsetPx, width }}
          data-export-pdf-tools-dock="1"
          initial={{ x: '100%', opacity: 0.9 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0.9 }}
          transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.85 }}
        >
          {/* @ts-expect-error js resize handle prop types */}
          <TocResizeHandle
            edge="left"
            handleProps={handleProps}
            isResizing={isResizing}
            visibleOnHover
            label="패널 너비 조절"
          />
          <div className="relative flex min-h-0 w-full flex-col pl-1">
            <PrintChromeTooltipProvider>
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-borderSoft">
                <h2 className="truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                  {title}
                </h2>
                <div className="flex shrink-0 items-center gap-0.5">
                  <PrintChromeIconTooltip label="모달로 열기">
                    <button
                      type="button"
                      onClick={onUndock}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
                      aria-label="모달로 열기"
                    >
                      <PanelTop size={15} />
                    </button>
                  </PrintChromeIconTooltip>
                  <PrintChromeIconTooltip label="닫기">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
                      aria-label="닫기"
                    >
                      <X size={15} />
                    </button>
                  </PrintChromeIconTooltip>
                </div>
              </div>
            </PrintChromeTooltipProvider>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
