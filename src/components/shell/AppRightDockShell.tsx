/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import TocResizeHandle from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const DEFAULT_WIDTH = 400;
const MIN_VW = 12;
const MAX_VW = 80;
const MAX_FLOOR = 300;
const MAIN_MIN_WIDTH = 180;

const ResizeHandle = TocResizeHandle as any;

const DOCK_EASE = [0.4, 0, 0.2, 1] as const;

function vwPx(vw: number) {
  if (typeof window === 'undefined') return vw * 5;
  return (window.innerWidth * vw) / 100;
}

function findDockLayoutRoot(shell: HTMLElement | null): HTMLElement | null {
  if (!shell) return null;
  return (
    shell.closest('[data-llm-assist-layout-root]') ||
    shell.parentElement?.parentElement ||
    shell.parentElement
  );
}

type AppRightDockShellProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  storageKey: string;
  defaultWidth?: number;
  resizeLabel: string;
};

/**
 * Resizable right-side dock mounted inside `data-llm-assist-layout-root`.
 */
export default function AppRightDockShell({
  open,
  onClose,
  children,
  className = '',
  storageKey,
  defaultWidth = DEFAULT_WIDTH,
  resizeLabel,
}: AppRightDockShellProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [fitMax, setFitMax] = useState(() => Math.max(MAX_FLOOR, Math.floor(vwPx(MAX_VW))));
  const hardMin = Math.max(1, Math.floor(vwPx(MIN_VW)));

  useEffect(() => {
    if (!open) return undefined;

    const update = () => {
      const root = findDockLayoutRoot(shellRef.current);
      const rootW = root?.clientWidth ?? window.innerWidth;
      const available = rootW - MAIN_MIN_WIDTH;
      const vwMax = Math.max(MAX_FLOOR, Math.floor(vwPx(MAX_VW)));
      setFitMax(Math.max(hardMin, Math.min(vwMax, available)));
    };

    update();
    const raf = requestAnimationFrame(update);

    window.addEventListener('resize', update);
    let ro: ResizeObserver | null = null;
    const root = findDockLayoutRoot(shellRef.current);
    if (root && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(root);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, [hardMin, open]);

  const collapseBelowWidth = Math.max(1, Math.floor(hardMin / 3));
  const { width, isResizing, handleProps } = useResizablePanelWidth({
    storageKey,
    defaultWidth,
    minWidth: hardMin,
    maxWidth: Math.max(fitMax, hardMin),
    edge: 'right',
    collapseBelowWidth,
    onCollapseBelowMin: typeof onClose === 'function' ? onClose : undefined,
  });

  const displayWidth = Math.min(width, fitMax);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.div
          key={storageKey}
          className="relative h-full min-h-0 shrink-0 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: displayWidth }}
          exit={{ width: 0 }}
          transition={
            isResizing
              ? { duration: 0 }
              : { duration: 0.28, ease: DOCK_EASE }
          }
        >
          <div
            ref={shellRef}
            className={`relative flex h-full min-h-0 flex-col overflow-hidden border-l bg-white dark:bg-odp-surface ${className}`}
            style={{ width: displayWidth }}
          >
            <ResizeHandle
              handleProps={{
                ...handleProps,
                'aria-valuenow': Math.round(displayWidth),
                'aria-valuemax': Math.round(fitMax),
              }}
              isResizing={isResizing}
              edge="left"
              visibleOnHover
              label={resizeLabel}
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}
