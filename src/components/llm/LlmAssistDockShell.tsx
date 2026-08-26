/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import TocResizeHandle from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const DEFAULT_WIDTH = 520;
const MIN_VW = 12;
const MAX_VW = 80;
const MAX_FLOOR = 300;
const MAIN_MIN_WIDTH = 180;

const ResizeHandle = TocResizeHandle as any;

function vwPx(vw: number) {
  if (typeof window === 'undefined') return vw * 5;
  return (window.innerWidth * vw) / 100;
}

type LlmAssistDockShellProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
};

/**
 * Right-side dock for LLM Assist. Width persists in localStorage.
 */
export default function LlmAssistDockShell({
  open,
  onClose,
  children,
  className = '',
}: LlmAssistDockShellProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [fitMax, setFitMax] = useState(() => Math.max(MAX_FLOOR, Math.floor(vwPx(MAX_VW))));
  const hardMin = Math.max(1, Math.floor(vwPx(MIN_VW)));

  useEffect(() => {
    const update = () => {
      const root = shellRef.current?.parentElement;
      const rootW = root?.clientWidth ?? window.innerWidth;
      const available = rootW - MAIN_MIN_WIDTH;
      const vwMax = Math.max(MAX_FLOOR, Math.floor(vwPx(MAX_VW)));
      setFitMax(Math.max(hardMin, Math.min(vwMax, available)));
    };
    update();
    window.addEventListener('resize', update);
    const root = shellRef.current?.parentElement;
    let ro: ResizeObserver | null = null;
    if (root && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(root);
    }
    return () => {
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, [hardMin, open]);

  const collapseBelowWidth = Math.max(1, Math.floor(hardMin / 3));
  const { width, isResizing, handleProps } = useResizablePanelWidth({
    storageKey: 's3haim_llm_assist_dock_width',
    defaultWidth: DEFAULT_WIDTH,
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
          key="llm-assist-dock"
          className="relative h-full min-h-0 shrink-0 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: displayWidth }}
          exit={{ width: 0 }}
          transition={
            isResizing
              ? { duration: 0 }
              : { type: 'spring', stiffness: 420, damping: 38, mass: 0.85 }
          }
        >
          <div
            ref={shellRef}
            className={`relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${className}`}
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
              label="AI 도우미 너비 조절"
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}
