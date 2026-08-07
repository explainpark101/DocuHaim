import { useCallback, useEffect, useRef, useState } from 'react';

export const MIN_MODAL_WIDTH = 360;
export const MIN_MODAL_HEIGHT = 280;
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
 * Dragging a corner grows/shrinks both axes equally; size is clamped to min/max
 * so the panel stops tracking the pointer once those limits are hit.
 * @param {CornerId} corner
 * @param {number} startLeft
 * @param {number} startTop
 * @param {number} startW
 * @param {number} startH
 * @param {number} dx
 * @param {number} dy
 * @param {{ minWidth?: number, minHeight?: number }} [limits]
 * @returns {ModalBox}
 */
export function boxFromCornerDrag(
  corner,
  startLeft,
  startTop,
  startW,
  startH,
  dx,
  dy,
  limits = {},
) {
  const minW = limits.minWidth ?? MIN_MODAL_WIDTH;
  const minH = limits.minHeight ?? MIN_MODAL_HEIGHT;
  const maxW = Math.max(minW, window.innerWidth - VIEW_MARGIN * 2);
  const maxH = Math.max(minH, window.innerHeight - VIEW_MARGIN * 2);

  const centerX = startLeft + startW / 2;
  const centerY = startTop + startH / 2;

  // One-corner pointer delta → full width/height change (both sides move).
  let widthDelta = 0;
  let heightDelta = 0;
  if (corner.includes('e')) widthDelta = dx * 2;
  else if (corner.includes('w')) widthDelta = -dx * 2;
  if (corner.includes('s')) heightDelta = dy * 2;
  else if (corner.includes('n')) heightDelta = -dy * 2;

  // Hard clamp: below min / above max the box no longer follows the pointer.
  const width = Math.min(maxW, Math.max(minW, startW + widthDelta));
  const height = Math.min(maxH, Math.max(minH, startH + heightDelta));

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
 * @param {boolean} [enabled=true]
 * @param {{ minWidth?: number, minHeight?: number }} [limits]
 */
export function useModalCornerResize(enabled = true, limits = {}) {
  /** @type {[null | ModalBox, Function]} */
  const [box, setBox] = useState(null);
  const panelRef = useRef(/** @type {HTMLElement | null} */ (null));
  const dragRef = useRef(/** @type {null | {
    corner: CornerId,
    startX: number,
    startY: number,
    startW: number,
    startH: number,
    startLeft: number,
    startTop: number,
  }} */ (null));
  const limitsRef = useRef(limits);
  limitsRef.current = limits;

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      event.preventDefault();
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      setBox(
        boxFromCornerDrag(
          drag.corner,
          drag.startLeft,
          drag.startTop,
          drag.startW,
          drag.startH,
          dx,
          dy,
          limitsRef.current,
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
  const beginResize = useCallback((corner, event) => {
    const el = panelRef.current;
    if (!el) return;
    event.preventDefault();
    event.stopPropagation();
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
  }, []);

  const resetBox = useCallback(() => setBox(null), []);

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
    positioned: Boolean(box),
    positionedStyle,
  };
}

/**
 * Triangle corner-cap resize handles.
 * @param {{ onBeginResize: (corner: CornerId, event: import('react').PointerEvent) => void }} props
 */
export function ModalCornerResizeHandles({ onBeginResize }) {
  return CORNER_HANDLES.map((handle) => (
    <button
      key={handle.id}
      type="button"
      aria-label={`resize-${handle.id}`}
      className={`pointer-events-auto absolute z-30 h-7 w-7 touch-none bg-blue-500/90 shadow-sm transition-colors hover:bg-blue-600 dark:bg-blue-400/90 dark:hover:bg-blue-300 ${handle.className}`}
      style={{ clipPath: handle.clipPath }}
      onPointerDown={(event) => onBeginResize(handle.id, event)}
    />
  ));
}
