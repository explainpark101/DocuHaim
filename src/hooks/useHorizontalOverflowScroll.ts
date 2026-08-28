import { useEffect } from 'react';
import {
  createToolbarPointerState,
  hasMdEditorToolbarHorizontalOverflow,
  queueToolbarWheelScroll,
  readWheelDeltaPixels,
  stepToolbarTouchScroll,
  type ToolbarPointerState,
} from '@/utils/mdEditorToolbarScroll';

/**
 * Vertical wheel / vertical touch drag on a horizontally overflowed element
 * scrolls it left/right with the same smoothed rAF easing as md-editor-rt toolbar.
 */
export function useHorizontalOverflowScroll(
  root: HTMLElement | null,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled || !root) return undefined;

    const pointers = new Map<number, ToolbarPointerState>();

    const clearPointer = (pointerId: number) => {
      pointers.delete(pointerId);
    };

    const onWheel = (event: WheelEvent) => {
      const { x, y } = readWheelDeltaPixels(event, root);
      if (y === 0 || Math.abs(x) > Math.abs(y)) return;
      if (!queueToolbarWheelScroll(root, y)) return;

      event.preventDefault();
      event.stopPropagation();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' || !event.isPrimary) return;
      if (!hasMdEditorToolbarHorizontalOverflow(root)) return;

      pointers.set(event.pointerId, createToolbarPointerState(root, event.clientX, event.clientY));
    };

    const onPointerMove = (event: PointerEvent) => {
      const state = pointers.get(event.pointerId);
      if (!state || event.pointerType !== 'touch') return;

      const { consumed, release } = stepToolbarTouchScroll(state, event.clientX, event.clientY);
      if (release) {
        clearPointer(event.pointerId);
        return;
      }
      if (consumed) event.preventDefault();
    };

    const onPointerEnd = (event: PointerEvent) => {
      clearPointer(event.pointerId);
    };

    root.addEventListener('wheel', onWheel, { capture: true, passive: false });
    root.addEventListener('pointerdown', onPointerDown, true);
    root.addEventListener('pointermove', onPointerMove, { capture: true, passive: false });
    root.addEventListener('pointerup', onPointerEnd, true);
    root.addEventListener('pointercancel', onPointerEnd, true);

    return () => {
      root.removeEventListener('wheel', onWheel, { capture: true });
      root.removeEventListener('pointerdown', onPointerDown, true);
      root.removeEventListener('pointermove', onPointerMove, { capture: true });
      root.removeEventListener('pointerup', onPointerEnd, true);
      root.removeEventListener('pointercancel', onPointerEnd, true);
    };
  }, [root, enabled]);
}
