import { useCallback, useEffect, useRef, useState } from 'react';

/** Bump when default widths change so stale localStorage px values are not reused. */
const PANEL_WIDTH_STORE_VERSION = 3;

function versionedStorageKey(storageKey) {
  if (!storageKey) return storageKey;
  return `${storageKey}::v${PANEL_WIDTH_STORE_VERSION}`;
}

/**
 * Drag-to-resize panel width. Right-edge panels: drag left increases width.
 *
 * @param {object} [options]
 * @param {string} [options.storageKey]
 * @param {number} [options.defaultWidth=360]
 * @param {number} [options.minWidth=160]
 * @param {number} [options.maxWidth=640]
 * @param {number} [options.collapseBelowWidth]
 *   Collapse threshold (and hard floor when onCollapseBelowMin is unset). Defaults to minWidth.
 * @param {'left'|'right'} [options.edge='right'] Panel side; 'right' inverts drag delta.
 * @param {boolean} [options.deferReactUpdateUntilEnd=false]
 *   When true, React width state updates only on pointer-up; during drag call onLiveWidth instead.
 * @param {(width: number) => void} [options.onLiveWidth] Called on every move (and start) with the live width.
 * @param {() => void} [options.onCollapseBelowMin]
 *   On pointer/touch end, if live width is below collapseBelowWidth, called instead of committing width
 *   (pre-drag width is restored). Collapse does not run mid-drag.
 */
export function useResizablePanelWidth({
  storageKey,
  defaultWidth = 360,
  minWidth = 160,
  maxWidth = 640,
  collapseBelowWidth,
  edge = 'right',
  deferReactUpdateUntilEnd = false,
  onLiveWidth,
  onCollapseBelowMin,
} = {}) {
  const dragFloor = collapseBelowWidth ?? minWidth;

  const persistKey = versionedStorageKey(storageKey);

  const [width, setWidth] = useState(() => {
    if (!persistKey || typeof window === 'undefined') return defaultWidth;
    try {
      const raw = window.localStorage.getItem(persistKey);
      const n = Number(raw);
      if (Number.isFinite(n)) return Math.min(maxWidth, Math.max(dragFloor, n));
    } catch {
      // ignore
    }
    return defaultWidth;
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStateRef = useRef({
    isResizing: false,
    startX: 0,
    startWidth: defaultWidth,
  });
  const widthRef = useRef(width);
  const liveWidthRef = useRef(null);
  const onLiveWidthRef = useRef(onLiveWidth);
  const onCollapseBelowMinRef = useRef(onCollapseBelowMin);
  const deferRef = useRef(deferReactUpdateUntilEnd);
  const dragFloorRef = useRef(dragFloor);
  const maxWidthRef = useRef(maxWidth);
  const edgeRef = useRef(edge);

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  useEffect(() => {
    onLiveWidthRef.current = onLiveWidth;
  }, [onLiveWidth]);

  useEffect(() => {
    onCollapseBelowMinRef.current = onCollapseBelowMin;
  }, [onCollapseBelowMin]);

  useEffect(() => {
    deferRef.current = deferReactUpdateUntilEnd;
  }, [deferReactUpdateUntilEnd]);

  useEffect(() => {
    dragFloorRef.current = collapseBelowWidth ?? minWidth;
  }, [collapseBelowWidth, minWidth]);

  useEffect(() => {
    maxWidthRef.current = maxWidth;
  }, [maxWidth]);

  useEffect(() => {
    edgeRef.current = edge;
  }, [edge]);

  const endResizeSession = useCallback(() => {
    resizeStateRef.current = {
      ...resizeStateRef.current,
      isResizing: false,
    };
    liveWidthRef.current = null;
    setIsResizing(false);
  }, []);

  const onResizeStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    const startWidth = widthRef.current;
    resizeStateRef.current = {
      isResizing: true,
      startX: clientX,
      startWidth,
    };
    liveWidthRef.current = startWidth;
    onLiveWidthRef.current?.(startWidth);
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const applyDelta = (clientX) => {
      const state = resizeStateRef.current;
      if (!state.isResizing) return;
      const delta = clientX - state.startX;
      const signed = edgeRef.current === 'right' ? -delta : delta;
      const raw = state.startWidth + signed;
      const floor = dragFloorRef.current;
      const max = maxWidthRef.current;
      const canCollapse = typeof onCollapseBelowMinRef.current === 'function';

      // While dragging, allow preview below the collapse threshold; decide on pointer up.
      const next = canCollapse
        ? Math.min(max, Math.max(0, raw))
        : Math.min(max, Math.max(floor, raw));

      liveWidthRef.current = next;
      onLiveWidthRef.current?.(next);
      if (!deferRef.current) {
        setWidth(next);
      }
    };

    const handleMouseMove = (e) => applyDelta(e.clientX);
    const handleTouchMove = (e) => {
      if (!resizeStateRef.current.isResizing) return;
      if (e.touches?.[0]) {
        e.preventDefault();
        e.stopPropagation();
        applyDelta(e.touches[0].clientX);
      }
    };
    const handleEnd = (e) => {
      if (!resizeStateRef.current.isResizing) return;
      if (e?.type?.startsWith('touch')) {
        e.stopPropagation?.();
      }

      const finalWidth = liveWidthRef.current;
      const startWidth = resizeStateRef.current.startWidth;
      const floor = dragFloorRef.current;
      const max = maxWidthRef.current;
      const collapse = onCollapseBelowMinRef.current;

      endResizeSession();

      if (typeof collapse === 'function' && finalWidth != null && finalWidth < floor) {
        // Restore pre-drag width so reopen / localStorage keep a usable size.
        setWidth(startWidth);
        collapse();
        return;
      }

      if (finalWidth != null) {
        setWidth(Math.min(max, Math.max(floor, finalWidth)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, [endResizeSession]);

  useEffect(() => {
    if (!persistKey || isResizing) return;
    try {
      window.localStorage.setItem(persistKey, String(width));
    } catch {
      // ignore
    }
  }, [persistKey, width, isResizing]);

  useEffect(() => {
    if (!isResizing) return undefined;
    const prev = document.body.style.cursor;
    const prevUserSelect = document.body.style.userSelect;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.cursor = prev;
      document.body.style.userSelect = prevUserSelect;
    };
  }, [isResizing]);

  return {
    width,
    setWidth,
    isResizing,
    onResizeStart,
    handleProps: {
      onMouseDown: onResizeStart,
      onTouchStart: onResizeStart,
      role: 'separator',
      'aria-orientation': 'vertical',
      'aria-valuenow': Math.round(width),
      'aria-valuemin': Math.round(dragFloor),
      'aria-valuemax': Math.round(maxWidth),
      style: { touchAction: 'none' },
    },
  };
}
