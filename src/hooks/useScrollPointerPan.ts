import { useEffect } from 'react';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest('textarea, input, select, [contenteditable="true"]'),
  );
}

export type ScrollPointerPanOptions = {
  /** Space + left-drag pan. Default true. */
  spaceDrag?: boolean;
  /** Middle-mouse-button drag pan. Default true. */
  middleClick?: boolean;
};

/**
 * Space+drag or middle-mouse-drag pans a scrollable container (Figma-style).
 * Uses capture-phase pointerdown so child editors (e.g. cover move) do not steal the gesture.
 */
export function useScrollPointerPan(
  root: HTMLElement | null,
  enabled = true,
  options: ScrollPointerPanOptions = {},
): void {
  const spaceDrag = options.spaceDrag !== false;
  const middleClick = options.middleClick !== false;

  useEffect(() => {
    if (!enabled || !root) return undefined;
    if (!spaceDrag && !middleClick) return undefined;

    let spaceHeld = false;
    let pan: { pointerId: number; lastX: number; lastY: number } | null = null;

    const syncCursor = () => {
      if (pan) {
        root.style.cursor = 'grabbing';
        root.style.userSelect = 'none';
        return;
      }
      if (spaceDrag && spaceHeld) {
        root.style.cursor = 'grab';
        root.style.userSelect = '';
        return;
      }
      root.style.cursor = '';
      root.style.userSelect = '';
    };

    const endPan = () => {
      if (!pan) return;
      try {
        root.releasePointerCapture(pan.pointerId);
      } catch {
        // ignore
      }
      pan = null;
      syncCursor();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!spaceDrag) return;
      if (event.code !== 'Space' && event.key !== ' ') return;
      if (isEditableTarget(event.target)) return;
      if (event.repeat) {
        event.preventDefault();
        return;
      }
      spaceHeld = true;
      event.preventDefault();
      syncCursor();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (!spaceDrag) return;
      if (event.code !== 'Space' && event.key !== ' ') return;
      spaceHeld = false;
      if (!pan) syncCursor();
    };

    const clearSpace = () => {
      spaceHeld = false;
      endPan();
      syncCursor();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const middle = middleClick && event.button === 1;
      const spaceLeft = spaceDrag && event.button === 0 && spaceHeld;
      if (!middle && !spaceLeft) return;
      if (isEditableTarget(event.target)) return;

      // Kill browser middle-click autoscroll only when we own the gesture.
      if (middle) event.preventDefault();

      const canScrollX = root.scrollWidth > root.clientWidth + 1;
      const canScrollY = root.scrollHeight > root.clientHeight + 1;
      if (!canScrollX && !canScrollY) return;

      event.preventDefault();
      event.stopPropagation();
      pan = {
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastY: event.clientY,
      };
      try {
        root.setPointerCapture(event.pointerId);
      } catch {
        // ignore
      }
      syncCursor();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pan || event.pointerId !== pan.pointerId) return;
      const dx = event.clientX - pan.lastX;
      const dy = event.clientY - pan.lastY;
      pan.lastX = event.clientX;
      pan.lastY = event.clientY;
      root.scrollLeft -= dx;
      root.scrollTop -= dy;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!pan || event.pointerId !== pan.pointerId) return;
      endPan();
    };

    const onLostCapture = () => {
      pan = null;
      syncCursor();
    };

    const onAuxClick = (event: MouseEvent) => {
      if (!middleClick) return;
      if (event.button === 1) event.preventDefault();
    };

    if (spaceDrag) {
      window.addEventListener('keydown', onKeyDown, true);
      window.addEventListener('keyup', onKeyUp, true);
      window.addEventListener('blur', clearSpace);
    }
    root.addEventListener('pointerdown', onPointerDown, true);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);
    root.addEventListener('lostpointercapture', onLostCapture);
    if (middleClick) {
      root.addEventListener('auxclick', onAuxClick);
    }

    return () => {
      if (spaceDrag) {
        window.removeEventListener('keydown', onKeyDown, true);
        window.removeEventListener('keyup', onKeyUp, true);
        window.removeEventListener('blur', clearSpace);
      }
      root.removeEventListener('pointerdown', onPointerDown, true);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerUp);
      root.removeEventListener('lostpointercapture', onLostCapture);
      if (middleClick) {
        root.removeEventListener('auxclick', onAuxClick);
      }
      root.style.cursor = '';
      root.style.userSelect = '';
    };
  }, [root, enabled, spaceDrag, middleClick]);
}
