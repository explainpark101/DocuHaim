import { useCallback, useEffect, useRef, useState } from 'react';

/** Absolute floor if baseline has not been measured yet. */
export const MIN_MODAL_WIDTH = 280;
export const MIN_MODAL_HEIGHT = 160;
const VIEW_MARGIN = 8;

/** @typedef {'nw' | 'ne' | 'sw' | 'se'} CornerId */

/**
 * @typedef {{
 *   width: number,
 *   height: number,
 *   left: number,
 *   top: number,
 * }} ModalBox
 */

/**
 * @typedef {{
 *   minWidth?: number,
 *   minHeight?: number,
 *   resizeHeight?: boolean,
 * }} ModalResizeLimits
 */

export const CORNER_HANDLES = /** @type {const} */ ([
  {
    id: 'nw',
    className: 'left-0 top-0 cursor-nwse-resize',
    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
  },
  {
    id: 'ne',
    className: 'right-0 top-0 cursor-nesw-resize',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
  },
  {
    id: 'sw',
    className: 'bottom-0 left-0 cursor-nesw-resize',
    clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
  },
  {
    id: 'se',
    className: 'bottom-0 right-0 cursor-nwse-resize',
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
  },
]);

/**
 * Resize symmetrically around the modal center.
 * Opening (baseline) size is the minimum; optional height lock for non-filling layouts.
 * @param {CornerId} corner
 * @param {number} startLeft
 * @param {number} startTop
 * @param {number} startW
 * @param {number} startH
 * @param {number} dx
 * @param {number} dy
 * @param {ModalResizeLimits & { baselineWidth?: number, baselineHeight?: number }} [limits]
 * @returns {ModalBox}
 */
export function boxFromCornerDrag(
  corner: any,
  startLeft: any,
  startTop: any,
  startW: any,
  startH: any,
  dx: any,
  dy: any,
  limits: any = {},
) {
  const resizeHeight = Boolean(limits.resizeHeight);
  const baselineW = limits.baselineWidth ?? startW;
  const baselineH = limits.baselineHeight ?? startH;
  const minW = Math.max(
    limits.minWidth ?? MIN_MODAL_WIDTH,
    baselineW,
  );
  const minH = Math.max(
    limits.minHeight ?? MIN_MODAL_HEIGHT,
    baselineH,
  );
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

  // Clamp: cannot shrink below opening size; stops following past min/max.
  const width = Math.min(maxW, Math.max(minW, startW + widthDelta));
  const height = resizeHeight
    ? Math.min(maxH, Math.max(minH, startH + heightDelta))
    : startH;

  let left = centerX - width / 2;
  let top = centerY - height / 2;

  left = Math.min(Math.max(VIEW_MARGIN, left), window.innerWidth - width - VIEW_MARGIN);
  top = Math.min(Math.max(VIEW_MARGIN, top), window.innerHeight - height - VIEW_MARGIN);

  return {
    width: Math.round(width),
    height: Math.round(height),
    left: Math.round(left),
    top: Math.round(top),
  };
}

/**
 * Shared corner-resize state for Modal / ConfirmModal panels.
 * Opening size becomes the resize floor. Height resize is opt-in (`resizeHeight`).
 * @param {boolean} [enabled=true]
 * @param {ModalResizeLimits} [limits]
 */
export function useModalCornerResize(enabled = true, limits: any = {}) {
  const [box, setBox] = useState<any>(null);
  const panelRef = useRef<any>(null);
  const baselineRef = useRef<any>(null);
  const dragRef = useRef<any>(null);
  const limitsRef = useRef(limits);
  limitsRef.current = limits;

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

  // Avoid re-capturing while the user is actively resizing.
  useEffect(() => {
    if (!enabled || box) return undefined;
    const id = window.requestAnimationFrame(() => {
      captureBaseline();
    });
    return () => window.cancelAnimationFrame(id);
  }, [enabled, captureBaseline, box]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (event: any) => {
      const drag = dragRef.current;
      if (!drag) return;
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
            baselineWidth: baseline?.width,
            baselineHeight: baseline?.height,
          },
        ),
      );
    };

    const onUp = () => {
      dragRef.current = null;
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [enabled]);

  /** @param {CornerId} corner @param {PointerEvent} event */
  const beginResize = useCallback((corner: any, event: any) => {
    const el = panelRef.current;
    if (!el) return;
    event.preventDefault();
    event.stopPropagation();
    captureBaseline();
    const rect = el.getBoundingClientRect();
    dragRef.current = {
      corner,
      startX: event.clientX,
      startY: event.clientY,
      startW: rect.width,
      startH: rect.height,
      startLeft: rect.left,
      startTop: rect.top,
    };
    setBox({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      left: Math.round(rect.left),
      top: Math.round(rect.top),
    });
    if (typeof event.currentTarget?.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }, [captureBaseline]);

  const resetBox = useCallback(() => {
    setBox(null);
    baselineRef.current = null;
  }, []);

  /** @returns {import('react').CSSProperties} */
  const positionedStyle = box
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
    positioned: Boolean(box),
    positionedStyle,
  };
}

/**
 * Triangle corner-cap resize handles.
 * @param {{
 *   onBeginResize: (corner: CornerId, event: import('react').PointerEvent) => void,
 *   resizeHeight?: boolean,
 * }} props
 */
export function ModalCornerResizeHandles({
  onBeginResize,
  resizeHeight = false
}: any) {
  return CORNER_HANDLES.map((handle) => {
    const cursorClass = resizeHeight
      ? (handle.id === 'nw' || handle.id === 'se' ? 'cursor-nwse-resize' : 'cursor-nesw-resize')
      : 'cursor-ew-resize';
    const posClass = handle.className
      .replace(/cursor-\S+/g, '')
      .trim();
    return (
      <button
        key={handle.id}
        type="button"
        aria-label={`resize-${handle.id}`}
        className={`pointer-events-auto absolute z-30 h-7 w-7 touch-none bg-blue-500/90 shadow-sm transition-colors hover:bg-blue-600 dark:bg-blue-400/90 dark:hover:bg-blue-300 ${posClass} ${cursorClass}`}
        style={{ clipPath: handle.clipPath }}
        onPointerDown={(event: any) => onBeginResize(handle.id, event)}
      />
    );
  });
}
