import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drag-to-resize panel width. Right-edge panels: drag left increases width.
 *
 * @param {object} [options]
 * @param {string} [options.storageKey]
 * @param {number} [options.defaultWidth=224]
 * @param {number} [options.minWidth=160]
 * @param {number} [options.maxWidth=480]
 * @param {'left'|'right'} [options.edge='right'] Panel side; 'right' inverts drag delta.
 */
export function useResizablePanelWidth({
  storageKey,
  defaultWidth = 224,
  minWidth = 160,
  maxWidth = 480,
  edge = 'right',
} = {}) {
  const [width, setWidth] = useState(() => {
    if (!storageKey || typeof window === 'undefined') return defaultWidth;
    try {
      const raw = window.localStorage.getItem(storageKey);
      const n = Number(raw);
      if (Number.isFinite(n)) return Math.min(maxWidth, Math.max(minWidth, n));
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

  const onResizeStart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;
      resizeStateRef.current = {
        isResizing: true,
        startX: clientX,
        startWidth: width,
      };
      setIsResizing(true);
    },
    [width],
  );

  useEffect(() => {
    const applyDelta = (clientX) => {
      const state = resizeStateRef.current;
      if (!state.isResizing) return;
      const delta = clientX - state.startX;
      const signed = edge === 'right' ? -delta : delta;
      const next = Math.min(maxWidth, Math.max(minWidth, state.startWidth + signed));
      setWidth(next);
    };

    const handleMouseMove = (e) => applyDelta(e.clientX);
    const handleTouchMove = (e) => {
      if (!resizeStateRef.current.isResizing) return;
      if (e.touches?.[0]) {
        e.preventDefault();
        applyDelta(e.touches[0].clientX);
      }
    };
    const handleEnd = () => {
      if (!resizeStateRef.current.isResizing) return;
      resizeStateRef.current = {
        ...resizeStateRef.current,
        isResizing: false,
      };
      setIsResizing(false);
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
  }, [edge, maxWidth, minWidth]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      window.localStorage.setItem(storageKey, String(width));
    } catch {
      // ignore
    }
  }, [storageKey, width]);

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
      'aria-valuemin': minWidth,
      'aria-valuemax': maxWidth,
    },
  };
}
