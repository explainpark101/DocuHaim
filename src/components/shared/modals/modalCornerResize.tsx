import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

/** Absolute floor if baseline has not been measured yet. */
export const MIN_MODAL_WIDTH = 280;
export const MIN_MODAL_HEIGHT = 160;
const VIEW_MARGIN = 8;

export type CornerId = 'nw' | 'ne' | 'sw' | 'se';

export type ModalBox = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export type ModalResizeLimits = {
  minWidth?: number;
  minHeight?: number;
  resizeHeight?: boolean;
};

export const CORNER_HANDLES = [
  {
    id: 'nw' as const,
    className: 'left-0 top-0 cursor-nwse-resize',
    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
  },
  {
    id: 'ne' as const,
    className: 'right-0 top-0 cursor-nesw-resize',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
  },
  {
    id: 'sw' as const,
    className: 'bottom-0 left-0 cursor-nesw-resize',
    clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
  },
  {
    id: 'se' as const,
    className: 'bottom-0 right-0 cursor-nwse-resize',
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
  },
] as const;

/**
 * Resize symmetrically around the modal center.
 * Opening (baseline) size is the minimum; optional height lock for non-filling layouts.
 */
export function boxFromCornerDrag(
  corner: CornerId,
  startLeft: number,
  startTop: number,
  startW: number,
  startH: number,
  dx: number,
  dy: number,
  limits: ModalResizeLimits & {
    baselineWidth?: number;
    baselineHeight?: number;
  } = {},
): ModalBox {
  const resizeHeight = Boolean(limits.resizeHeight);
  const baselineW = limits.baselineWidth ?? startW;
  const baselineH = limits.baselineHeight ?? startH;
  const minW = Math.max(limits.minWidth ?? MIN_MODAL_WIDTH, baselineW);
  const minH = Math.max(limits.minHeight ?? MIN_MODAL_HEIGHT, baselineH);
  const maxW = Math.max(minW, window.innerWidth - VIEW_MARGIN * 2);
  const maxH = Math.max(minH, window.innerHeight - VIEW_MARGIN * 2);

  const centerX = startLeft + startW / 2;
  const centerY = startTop + startH / 2;

  let widthDelta = 0;
  let heightDelta = 0;
  if (corner.includes('e')) widthDelta = dx * 2;
  else if (corner.includes('w')) widthDelta = -dx * 2;
  if (resizeHeight) {
    if (corner.includes('s')) heightDelta = dy * 2;
    else if (corner.includes('n')) heightDelta = -dy * 2;
  }

  const width = Math.min(maxW, Math.max(minW, startW + widthDelta));
  const height = resizeHeight
    ? Math.min(maxH, Math.max(minH, startH + heightDelta))
    : startH;

  let left = centerX - width / 2;
  let top = centerY - height / 2;

  left = Math.min(
    Math.max(VIEW_MARGIN, left),
    window.innerWidth - width - VIEW_MARGIN,
  );
  top = Math.min(
    Math.max(VIEW_MARGIN, top),
    window.innerHeight - height - VIEW_MARGIN,
  );

  return {
    width: Math.round(width),
    height: Math.round(height),
    left: Math.round(left),
    top: Math.round(top),
  };
}

type DragState = {
  corner: CornerId;
  pointerId: number;
  startX: number;
  startY: number;
  startW: number;
  startH: number;
  startLeft: number;
  startTop: number;
};

/**
 * Shared corner-resize state for Modal / ConfirmModal panels.
 * Opening size becomes the resize floor. Height resize is opt-in (`resizeHeight`).
 *
 * Call `pinToCurrentRect()` after the open animation so the panel is already
 * `position: fixed` before the first drag — switching flex→fixed mid-drag
 * cancels the pointer and makes handles look broken.
 */
export function useModalCornerResize(
  enabled = true,
  limits: ModalResizeLimits = {},
) {
  const [box, setBox] = useState<ModalBox | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const baselineRef = useRef<{ width: number; height: number } | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const boxRef = useRef<ModalBox | null>(null);
  const limitsRef = useRef(limits);
  limitsRef.current = limits;
  boxRef.current = box;

  const captureBaseline = useCallback(() => {
    const el = panelRef.current;
    if (!el || baselineRef.current) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    baselineRef.current = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  }, []);

  /** Lock the panel to its current on-screen rect (fixed). Safe to call repeatedly. */
  const pinToCurrentRect = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    captureBaseline();
    const next: ModalBox = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      left: Math.round(rect.left),
      top: Math.round(rect.top),
    };
    const prev = boxRef.current;
    if (
      prev &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.left === next.left &&
      prev.top === next.top
    ) {
      return;
    }
    setBox(next);
  }, [captureBaseline]);

  useEffect(() => {
    if (!enabled || box) return undefined;
    const id = window.requestAnimationFrame(() => {
      captureBaseline();
    });
    return () => window.cancelAnimationFrame(id);
  }, [enabled, captureBaseline, box]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      event.preventDefault();
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      const baseline = baselineRef.current;
      setBox(
        boxFromCornerDrag(
          drag.corner,
          drag.startLeft,
          drag.startTop,
          drag.startW,
          drag.startH,
          dx,
          dy,
          {
            ...limitsRef.current,
            ...(baseline?.width != null ? { baselineWidth: baseline.width } : {}),
            ...(baseline?.height != null
              ? { baselineHeight: baseline.height }
              : {}),
          },
        ),
      );
    };

    const onUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      dragRef.current = null;
    };

    // Capture phase: keep receiving moves even if a child stops propagation.
    document.addEventListener('pointermove', onMove, {
      passive: false,
      capture: true,
    });
    document.addEventListener('pointerup', onUp, { capture: true });
    document.addEventListener('pointercancel', onUp, { capture: true });
    return () => {
      document.removeEventListener('pointermove', onMove, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('pointercancel', onUp, true);
    };
  }, [enabled]);

  const beginResize = useCallback(
    (corner: CornerId, event: ReactPointerEvent<HTMLElement>) => {
      const el = panelRef.current;
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      captureBaseline();
      const rect = el.getBoundingClientRect();
      dragRef.current = {
        corner,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startW: rect.width,
        startH: rect.height,
        startLeft: rect.left,
        startTop: rect.top,
      };
      // Only pin if not already fixed — switching flex→fixed mid-drag cancels the pointer.
      if (!boxRef.current) {
        setBox({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          left: Math.round(rect.left),
          top: Math.round(rect.top),
        });
      }
      if (typeof event.currentTarget?.setPointerCapture === 'function') {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // ignore InvalidStateError if pointer already released
        }
      }
    },
    [captureBaseline],
  );

  const resetBox = useCallback(() => {
    setBox(null);
    baselineRef.current = null;
    dragRef.current = null;
  }, []);

  const positionedStyle: CSSProperties = box
    ? {
        position: 'fixed',
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        maxWidth: 'none',
        maxHeight: 'none',
        margin: 0,
      }
    : {};

  return {
    box,
    panelRef,
    beginResize,
    resetBox,
    captureBaseline,
    pinToCurrentRect,
    positioned: Boolean(box),
    positionedStyle,
  };
}

type ModalCornerResizeHandlesProps = {
  onBeginResize: (corner: CornerId, event: ReactPointerEvent<HTMLElement>) => void;
  resizeHeight?: boolean;
};

/** Triangle corner-cap resize handles. */
export function ModalCornerResizeHandles({
  onBeginResize,
  resizeHeight = false,
}: ModalCornerResizeHandlesProps) {
  return CORNER_HANDLES.map((handle) => {
    const cursorClass = resizeHeight
      ? handle.id === 'nw' || handle.id === 'se'
        ? 'cursor-nwse-resize'
        : 'cursor-nesw-resize'
      : 'cursor-ew-resize';
    const posClass = handle.className.replace(/cursor-\S+/g, '').trim();
    return (
      <button
        key={handle.id}
        type="button"
        aria-label={`resize-${handle.id}`}
        className={`pointer-events-auto absolute z-30 h-7 w-7 touch-none bg-blue-500/90 shadow-sm transition-colors hover:bg-blue-600 dark:bg-blue-400/90 dark:hover:bg-blue-300 ${posClass} ${cursorClass}`}
        style={{ clipPath: handle.clipPath }}
        onPointerDown={(event) => onBeginResize(handle.id, event)}
      />
    );
  });
}
