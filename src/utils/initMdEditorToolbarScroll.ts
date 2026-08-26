import {
  createToolbarPointerState,
  getMdEditorToolbarScrollEl,
  hasMdEditorToolbarHorizontalOverflow,
  queueToolbarWheelScroll,
  readWheelDeltaPixels,
  stepToolbarTouchScroll,
  type ToolbarPointerState,
} from '@/utils/mdEditorToolbarScroll';

const INIT_FLAG = '__mdEditorToolbarScrollInit';

const pointers = new Map<number, ToolbarPointerState>();

function clearPointer(pointerId: number): void {
  pointers.delete(pointerId);
}

/**
 * When the md-editor-rt toolbar overflows horizontally, treat vertical wheel /
 * touch gestures on the toolbar as horizontal scroll. Wheel input is smoothed via rAF.
 */
export function initMdEditorToolbarScroll(): void {
  if (typeof document === 'undefined') return;
  const w = window as Window & { [INIT_FLAG]?: boolean };
  if (w[INIT_FLAG]) return;
  w[INIT_FLAG] = true;

  const onWheel = (event: WheelEvent) => {
    const el = getMdEditorToolbarScrollEl(event.target);
    if (!el) return;

    const { x, y } = readWheelDeltaPixels(event, el);
    if (y === 0 || Math.abs(x) > Math.abs(y)) return;
    if (!queueToolbarWheelScroll(el, y)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return;
    const el = getMdEditorToolbarScrollEl(event.target);
    if (!el || !hasMdEditorToolbarHorizontalOverflow(el)) return;

    pointers.set(event.pointerId, createToolbarPointerState(el, event.clientX, event.clientY));
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

  document.addEventListener('wheel', onWheel, { capture: true, passive: false });
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointermove', onPointerMove, { capture: true, passive: false });
  document.addEventListener('pointerup', onPointerEnd, true);
  document.addEventListener('pointercancel', onPointerEnd, true);
}
