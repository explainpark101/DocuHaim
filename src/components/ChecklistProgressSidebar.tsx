import { AnimatePresence, motion as Motion } from 'motion/react';
import { BarChart3, X } from 'lucide-react';
import type { ComponentType } from 'react';
import ChecklistProgressView from '@/components/ChecklistProgressView';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

const WIDTH_KEY = 's3haim_checklist_progress_sidebar_width';
const DEFAULT_WIDTH = 360;
const MIN_WIDTH = 260;
const MAX_WIDTH = 560;

const SLIDE_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const PANEL_SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 36,
  mass: 0.85,
} as const;

export type ChecklistProgressSidebarProps = {
  open: boolean;
  onOpenChange?: ((open: boolean) => void) | undefined;
  markdown: string;
  onMarkdownChange?: ((next: string) => void) | undefined;
  /** When true, panel overlays the editor instead of docking (narrow viewports). */
  overlay?: boolean | undefined;
};

/**
 * Right-side checklist progress panel (docked, resizable).
 * Replaces the old floating / draggable modal.
 */
export default function ChecklistProgressSidebar({
  open,
  onOpenChange,
  markdown,
  onMarkdownChange,
  overlay = false,
}: ChecklistProgressSidebarProps) {
  const { width, isResizing, handleProps } = useResizablePanelWidth({
    storageKey: WIDTH_KEY,
    defaultWidth: DEFAULT_WIDTH,
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    edge: 'right',
    collapseBelowWidth: 180,
    onCollapseBelowMin: () => onOpenChange?.(false),
  });

  const shellClass = overlay
    ? [
        'absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden',
        'rounded-bl-md border border-slate-200/80 border-t-0 bg-white/95 shadow-lg',
        'dark:border-odp-borderStrong/80 dark:bg-odp-surface/95 dark:shadow-black/40',
      ].join(' ')
    : 'relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95';

  const handleClose = () => onOpenChange?.(false);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.aside
          key={overlay ? 'checklist-overlay' : 'checklist-dock'}
          role="complementary"
          aria-label="체크리스트 진행률"
          className={shellClass}
          style={
            overlay
              ? { width, willChange: 'transform, opacity' }
              : { overflow: 'hidden', willChange: 'width, opacity' }
          }
          initial={
            overlay
              ? { x: '100%', opacity: 0.88 }
              : { width: 0, opacity: 0.85 }
          }
          animate={
            overlay ? { x: 0, opacity: 1 } : { width, opacity: 1 }
          }
          exit={
            overlay
              ? { x: '100%', opacity: 0.88 }
              : { width: 0, opacity: 0.85 }
          }
          transition={
            isResizing
              ? { duration: 0 }
              : overlay
                ? { type: 'tween', duration: 0.22, ease: SLIDE_EASE }
                : PANEL_SPRING
          }
        >
          <div
            className="relative flex h-full min-h-0 w-full flex-col"
            style={overlay ? undefined : { width }}
          >
            <TocResizeHandle
              edge="left"
              handleProps={handleProps}
              isResizing={isResizing}
              visibleOnHover
              label="체크리스트 패널 너비 조절"
            />
            <header className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft">
              <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong">
                <BarChart3
                  size={14}
                  className="shrink-0 text-indigo-500 dark:text-indigo-300"
                  aria-hidden
                />
                <span className="truncate">체크리스트 진행률</span>
              </div>
              <button
                type="button"
                aria-label="체크리스트 패널 닫기"
                onClick={handleClose}
                className="inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft"
              >
                <X size={14} />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
              {!String(markdown ?? '').trim() ? (
                <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted">
                  문서에 체크리스트가 없습니다.
                  <br />
                  `- [ ]` 항목을 추가해 보세요.
                </p>
              ) : (
                <ChecklistProgressView
                  markdown={markdown}
                  onMarkdownChange={onMarkdownChange}
                />
              )}
            </div>
          </div>
        </Motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
