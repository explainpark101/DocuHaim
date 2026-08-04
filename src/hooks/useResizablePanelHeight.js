import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drag-to-resize panel height. Bottom panels: drag up increases height.
 *
 * @param {object} [options]
 * @param {string} [options.storageKey]
 * @param {number} [options.defaultHeight=280]
 * @param {number} [options.minHeight=140]
 * @param {number} [options.maxHeight=640]
 * @param {'top'|'bottom'} [options.edge='bottom']
 *   Panel side; 'bottom' means the handle sits on the top edge (drag up → taller).
 * @param {boolean} [options.deferReactUpdateUntilEnd=false]
 * @param {(height: number) => void} [options.onLiveHeight]
 */
export function useResizablePanelHeight({
  storageKey,
  defaultHeight = 280,
  minHeight = 140,
  maxHeight = 640,
  edge = 'bottom',
  deferReactUpdateUntilEnd = false,
  onLiveHeight,
} = {}) {
  const [height, setHeight] = useState(() => {
    if (!storageKey || typeof window === 'undefined') return defaultHeight;
    try {
      const raw = window.localStorage.getItem(storageKey);
      const n = Number(raw);
      if (Number.isFinite(n)) return Math.min(maxHeight, Math.max(minHeight, n));
    } catch {
      // ignore
    }
    return defaultHeight;
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStateRef = useRef({
    isResizing: false,
    startY: 0,
    startHeight: defaultHeight,
  });
  const heightRef = useRef(height);
  const liveHeightRef = useRef(null);
  const onLiveHeightRef = useRef(onLiveHeight);
  const deferRef = useRef(deferReactUpdateUntilEnd);
  const minHeightRef = useRef(minHeight);
  const maxHeightRef = useRef(maxHeight);
  const edgeRef = useRef(edge);

  useEffect(() => {
    heightRef.current = height;
  }, [height]);

  useEffect(() => {
    onLiveHeightRef.current = onLiveHeight;
  }, [onLiveHeight]);

  useEffect(() => {
    deferRef.current = deferReactUpdateUntilEnd;
  }, [deferReactUpdateUntilEnd]);

  useEffect(() => {
    minHeightRef.current = minHeight;
  }, [minHeight]);

  useEffect(() => {
    maxHeightRef.current = maxHeight;
  }, [maxHeight]);

  useEffect(() => {
    edgeRef.current = edge;
  }, [edge]);

  // Clamp when viewport max shrinks below current height.
  useEffect(() => {
    setHeight((prev) => Math.min(maxHeight, Math.max(minHeight, prev)));
  }, [minHeight, maxHeight]);

  const endResizeSession = useCallback(() => {
    resizeStateRef.current = {
      ...resizeStateRef.current,
      isResizing: false,
    };
    liveHeightRef.current = null;
    setIsResizing(false);
  }, []);

  const onResizeStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const clientY = e.touches?.[0]?.clientY ?? e.clientY;
    const startHeight = heightRef.current;
    resizeStateRef.current = {
      isResizing: true,
      startY: clientY,
      startHeight,
    };
    liveHeightRef.current = startHeight;
    onLiveHeightRef.current?.(startHeight);
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const applyDelta = (clientY) => {
      const state = resizeStateRef.current;
      if (!state.isResizing) return;
      const delta = clientY - state.startY;
      // Bottom panel / top handle: drag upward (negative delta) increases height.
      const signed = edgeRef.current === 'bottom' ? -delta : delta;
      const next = Math.min(
        maxHeightRef.current,
        Math.max(minHeightRef.current, state.startHeight + signed),
      );
      liveHeightRef.current = next;
      onLiveHeightRef.current?.(next);
      if (!deferRef.current) {
        setHeight(next);
      }
    };

    const handleMouseMove = (e) => applyDelta(e.clientY);
    const handleTouchMove = (e) => {
      if (!resizeStateRef.current.isResizing) return;
      if (e.touches?.[0]) {
        e.preventDefault();
        e.stopPropagation();
        applyDelta(e.touches[0].clientY);
      }
    };
    const handleEnd = (e) => {
      if (!resizeStateRef.current.isResizing) return;
      if (e?.type?.startsWith('touch')) {
        e.stopPropagation?.();
      }

      const finalHeight = liveHeightRef.current;
      const floor = minHeightRef.current;
      const max = maxHeightRef.current;
      endResizeSession();

      if (finalHeight != null) {
        setHeight(Math.min(max, Math.max(floor, finalHeight)));
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
    if (!storageKey || isResizing) return;
    try {
      window.localStorage.setItem(storageKey, String(height));
    } catch {
      // ignore
    }
  }, [storageKey, height, isResizing]);

  useEffect(() => {
    if (!isResizing) return undefined;
    const prev = document.body.style.cursor;
    const prevUserSelect = document.body.style.userSelect;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.cursor = prev;
      document.body.style.userSelect = prevUserSelect;
    };
  }, [isResizing]);

  return {
    height,
    setHeight,
    isResizing,
    onResizeStart,
    handleProps: {
      onMouseDown: onResizeStart,
      onTouchStart: onResizeStart,
      role: 'separator',
      'aria-orientation': 'horizontal',
      'aria-valuenow': Math.round(height),
      'aria-valuemin': Math.round(minHeight),
      'aria-valuemax': Math.round(maxHeight),
      style: { touchAction: 'none' },
    },
  };
}
