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
  /**
   * Left-button drag pan without Space (Embla-like grab scroll).
   * Default false. Skips touch pointers so nested vertical scroll still works.
   */
  primaryDrag?: boolean;
  /**
   * When primaryDrag starts on this target, skip pan (e.g. DnD grips, buttons).
   * Space / middle-click still use the editable-target guard only.
   */
  shouldIgnorePrimaryTarget?: (target: EventTarget | null) => boolean;
  /** Scroll axis. Default `both`. */
  axis?: 'x' | 'y' | 'both';
};

/**
 * Space+drag, middle-mouse-drag, and optional primary-button drag pan a
 * scrollable container (Figma / Embla-like).
 * Uses capture-phase pointerdown so child editors do not steal the gesture
 * when we own it.
 */
export function useScrollPointerPan(
  root: HTMLElement | null,
  enabled = true,
  options: ScrollPointerPanOptions = {},
): void {
  const spaceDrag = options.spaceDrag !== false;
  const middleClick = options.middleClick !== false;
  const primaryDrag = options.primaryDrag === true;
  const axis = options.axis ?? 'both';
  const shouldIgnorePrimaryTarget = options.shouldIgnorePrimaryTarget;

  useEffect(() => {
    if (!enabled || !root) return undefined;
    if (!spaceDrag && !middleClick && !primaryDrag) return undefined;

    let spaceHeld = false;
    let pan: { pointerId: number; lastX: number; lastY: number } | null = null;

    const syncCursor = () => {
      if (pan) {
        root.style.cursor = 'grabbing';
        root.style.userSelect = 'none';
        return;
      }
      if ((spaceDrag && spaceHeld) || primaryDrag) {
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

    const canScrollAxis = () => {
      const canScrollX = root.scrollWidth > root.clientWidth + 1;
      const canScrollY = root.scrollHeight > root.clientHeight + 1;
      if (axis === 'x') return canScrollX;
      if (axis === 'y') return canScrollY;
      return canScrollX || canScrollY;
    };

    const onPointerDown = (event: PointerEvent) => {
      // Touch: keep native overflow scrolling (nested column y-scroll).
      if (event.pointerType === 'touch') return;

      const middle = middleClick && event.button === 1;
      const spaceLeft = spaceDrag && event.button === 0 && spaceHeld;
      const primaryLeft =
        primaryDrag &&
        event.button === 0 &&
        !spaceHeld &&
        !shouldIgnorePrimaryTarget?.(event.target);

      if (!middle && !spaceLeft && !primaryLeft) return;
      if (isEditableTarget(event.target)) return;
      if (!canScrollAxis()) return;

      // Kill browser middle-click autoscroll only when we own the gesture.
      if (middle) event.preventDefault();
      // Primary / space pan: prevent text selection + competing gestures.
      if (spaceLeft || primaryLeft) event.preventDefault();

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
      if (axis === 'x' || axis === 'both') root.scrollLeft -= dx;
      if (axis === 'y' || axis === 'both') root.scrollTop -= dy;
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
    syncCursor();

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
  }, [
    root,
    enabled,
    spaceDrag,
    middleClick,
    primaryDrag,
    axis,
    shouldIgnorePrimaryTarget,
  ]);
}
