import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import TocResizeHandle from '@/components/print/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const CHAT_RAIL_DEFAULT_WIDTH = 400;
/** Soft drag floor while open (matches left sidebar min). */
const CHAT_RAIL_MIN_VW = 10;
/** Hard floor reserved for sibling rails / fit. */
const CHAT_RAIL_HARD_MIN_VW = 10;
const CHAT_RAIL_MAX_FLOOR = 400;
const CHAT_RAIL_MAX_VW = 50;
/** Keep at least this much room for the message column when fitting rails. */
const CHAT_MAIN_MIN_WIDTH = 280;

const OPEN_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.85 };

function vwPx(vw) {
  if (typeof window === 'undefined') return vw * 5;
  return (window.innerWidth * vw) / 100;
}

function hardMinPx() {
  return Math.max(1, Math.floor(vwPx(CHAT_RAIL_HARD_MIN_VW)));
}

function softMinPx() {
  return Math.max(1, Math.floor(vwPx(CHAT_RAIL_MIN_VW)));
}

function maxRailWidthPx() {
  if (typeof window === 'undefined') return 640;
  return Math.max(CHAT_RAIL_MAX_FLOOR, Math.floor(vwPx(CHAT_RAIL_MAX_VW)));
}

function initialBounds() {
  const hardMin = hardMinPx();
  return {
    fitMax: maxRailWidthPx(),
    hardMin,
    softMin: softMinPx(),
  };
}

function findRailsLayoutRoot(shell) {
  if (shell) {
    return (
      shell.closest('[data-chat-rails-root]') ||
      shell.parentElement?.parentElement ||
      shell.parentElement
    );
  }
  if (typeof document === 'undefined') return null;
  return document.querySelector('[data-chat-rails-root]');
}

/**
 * Resizable right-side chat panel (group / search / date / pinned).
 * Width is persisted per `storageKey`.
 * When `open` toggles, width animates 0 ↔ displayWidth so the chat column is pushed smoothly.
 * Dragging below ~1/3 of the configured minimum width closes the rail (`onClose`).
 * Open min / hard floor track viewport width (vw), matching the left sidebar pattern.
 */
export default function ChatRailShell({
  children,
  className = '',
  storageKey = 's3haim_chat_rail_width',
  defaultWidth = CHAT_RAIL_DEFAULT_WIDTH,
  /** Pixels already taken by non-resizable siblings. */
  reservedAside = 0,
  /** Number of resizable rails currently open (including this one). */
  openResizableCount = 1,
  label = '채팅 사이드바 너비 조절',
  /** Controlled open state — animates width in/out. */
  open = true,
  /** Called when the user shrinks the rail below ~1/3 of min width. */
  onClose,
}) {
  const shellRef = useRef(null);
  const [bounds, setBounds] = useState(initialBounds);

  useEffect(() => {
    const shell = shellRef.current;
    const root = findRailsLayoutRoot(shell);
    if (!root) return undefined;

    const update = () => {
      const hardMin = hardMinPx();
      const softMin = softMinPx();
      const rootW = root.clientWidth;
      const available = rootW - CHAT_MAIN_MIN_WIDTH - Math.max(0, reservedAside);
      // Allow one rail to grow freely; only reserve hard-min for sibling rails.
      const siblingsFloor = Math.max(0, openResizableCount - 1) * hardMin;
      const thisMax = available - siblingsFloor;
      const vwMax = maxRailWidthPx();
      setBounds({
        fitMax: Math.max(hardMin, Math.min(vwMax, thisMax)),
        hardMin,
        softMin,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [reservedAside, openResizableCount, open]);

  const dragMin = Math.min(bounds.softMin, bounds.fitMax);
  const minWidth = Math.max(bounds.hardMin, dragMin);
  const collapseBelowWidth = Math.max(1, Math.floor(minWidth / 3));

  const { width, isResizing, handleProps } = useResizablePanelWidth({
    storageKey,
    defaultWidth,
    minWidth,
    maxWidth: Math.max(bounds.fitMax, bounds.hardMin),
    edge: 'right',
    collapseBelowWidth,
    onCollapseBelowMin: typeof onClose === 'function' ? onClose : undefined,
  });

  const displayWidth = Math.min(width, bounds.fitMax);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.div
          key={storageKey}
          className="relative h-full min-h-0 shrink-0 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: displayWidth }}
          exit={{ width: 0 }}
          transition={isResizing ? { duration: 0 } : OPEN_SPRING}
        >
          {/* Fixed inner width so content does not squash while the outer clip grows. */}
          <div
            ref={shellRef}
            className={`relative flex h-full min-h-0 flex-col overflow-hidden border-l border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${className}`}
            style={{ width: displayWidth }}
          >
            <TocResizeHandle
              handleProps={{
                ...handleProps,
                'aria-valuenow': Math.round(displayWidth),
                'aria-valuemax': Math.round(bounds.fitMax),
              }}
              isResizing={isResizing}
              edge="left"
              visibleOnHover
              label={label}
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}
