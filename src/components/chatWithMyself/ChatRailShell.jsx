import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import TocResizeHandle from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const CHAT_RAIL_DEFAULT_WIDTH = 320;
const CHAT_RAIL_MIN_WIDTH = 200;
const CHAT_RAIL_HARD_MIN = 120;
const CHAT_RAIL_MAX_FLOOR = 320;
const CHAT_RAIL_MAX_VW = 50;
/** Keep at least this much room for the message column when fitting rails. */
const CHAT_MAIN_MIN_WIDTH = 280;

const OPEN_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.85 };

function maxRailWidthPx() {
  if (typeof window === 'undefined') return 640;
  return Math.max(CHAT_RAIL_MAX_FLOOR, Math.floor((window.innerWidth * CHAT_RAIL_MAX_VW) / 100));
}

function findRailsLayoutRoot(shell) {
  if (!shell) return null;
  return (
    shell.closest('[data-chat-rails-root]') ||
    shell.parentElement?.parentElement ||
    shell.parentElement
  );
}

/**
 * Resizable right-side chat panel (group / search / date / pinned).
 * Width is persisted per `storageKey`.
 * When `open` toggles, width animates 0 ↔ displayWidth so the chat column is pushed smoothly.
 * Dragging below ~1/3 of the configured minimum width closes the rail (`onClose`).
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
  const [fitMax, setFitMax] = useState(maxRailWidthPx);

  useEffect(() => {
    const shell = shellRef.current;
    const root = findRailsLayoutRoot(shell);
    if (!root) return undefined;

    const update = () => {
      const rootW = root.clientWidth;
      const available = rootW - CHAT_MAIN_MIN_WIDTH - Math.max(0, reservedAside);
      // Allow one rail to grow freely; only reserve hard-min for sibling rails.
      const siblingsFloor =
        Math.max(0, openResizableCount - 1) * CHAT_RAIL_HARD_MIN;
      const thisMax = available - siblingsFloor;
      const vwMax = maxRailWidthPx();
      setFitMax(Math.max(CHAT_RAIL_HARD_MIN, Math.min(vwMax, thisMax)));
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

  const dragMin = Math.min(CHAT_RAIL_MIN_WIDTH, fitMax);
  const minWidth = Math.max(CHAT_RAIL_HARD_MIN, dragMin);
  const collapseBelowWidth = Math.max(1, Math.floor(minWidth / 3));

  const { width, isResizing, handleProps } = useResizablePanelWidth({
    storageKey,
    defaultWidth,
    minWidth,
    maxWidth: Math.max(fitMax, CHAT_RAIL_HARD_MIN),
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
                'aria-valuemax': Math.round(fitMax),
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
