import { useEffect } from 'react';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest('textarea, input, select, [contenteditable="true"]'),
  );
}

/**
 * Space+drag or middle-mouse-drag pans a scrollable container (Figma-style).
 * Uses capture-phase pointerdown so child editors (e.g. cover move) do not steal the gesture.
 */
export function useScrollPointerPan(
  root: HTMLElement | null,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled || !root) return undefined;

    let spaceHeld = false;
    let pan: { pointerId: number; lastX: number; lastY: number } | null = null;

    const syncCursor = () => {
      if (pan) {
        root.style.cursor = 'grabbing';
        root.style.userSelect = 'none';
        return;
      }
      if (spaceHeld) {
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
      const middle = event.button === 1;
      const spaceLeft = event.button === 0 && spaceHeld;
      if (!middle && !spaceLeft) return;
      if (isEditableTarget(event.target)) return;

      // Always kill browser middle-click autoscroll inside the preview.
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
      if (event.button === 1) event.preventDefault();
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('blur', clearSpace);
    root.addEventListener('pointerdown', onPointerDown, true);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);
    root.addEventListener('lostpointercapture', onLostCapture);
    root.addEventListener('auxclick', onAuxClick);

    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('blur', clearSpace);
      root.removeEventListener('pointerdown', onPointerDown, true);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerUp);
      root.removeEventListener('lostpointercapture', onLostCapture);
      root.removeEventListener('auxclick', onAuxClick);
      root.style.cursor = '';
      root.style.userSelect = '';
    };
  }, [root, enabled]);
}
