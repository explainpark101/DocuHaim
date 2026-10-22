/**
 * Chromium skips `content-visibility: auto` blocks during a pointer drag
 * and does not paint them again until the scroller moves. Hold those blocks
 * visible for the gesture, then nudge scroll once so the viewport is rebuilt.
 */

export const HAIM_CV_HOLD_CLASS = 'haim-cv-hold';

const DRAG_SLOP_PX = 4;

export type HaimCvHoldState = {
  pointers: number;
  htmlDrag: boolean;
  /** Pointer moved far enough, or an HTML5 block drag started. */
  dirty: boolean;
};

export function haimCvHoldInitialState(): HaimCvHoldState {
  return { pointers: 0, htmlDrag: false, dirty: false };
}

export function haimCvHoldGestureOpen(state: HaimCvHoldState): boolean {
  return state.pointers > 0 || state.htmlDrag;
}

export function haimCvHoldPointerDown(state: HaimCvHoldState): HaimCvHoldState {
  return {
    pointers: state.pointers + 1,
    htmlDrag: state.htmlDrag,
    dirty: state.pointers > 0 ? state.dirty : false,
  };
}

export function haimCvHoldPointerUp(state: HaimCvHoldState): HaimCvHoldState {
  return {
    ...state,
    pointers: Math.max(0, state.pointers - 1),
  };
}

export function haimCvHoldMoved(state: HaimCvHoldState): HaimCvHoldState {
  if (state.pointers <= 0) return state;
  return { ...state, dirty: true };
}

export function haimCvHoldDragStart(state: HaimCvHoldState): HaimCvHoldState {
  return { ...state, htmlDrag: true, dirty: true };
}

export function haimCvHoldDragEnd(state: HaimCvHoldState): HaimCvHoldState {
  return { ...state, htmlDrag: false };
}

/** True when the pointer left the slop box (a drag, not a click). */
export function haimCvHoldPastSlop(
  startX: number,
  startY: number,
  x: number,
  y: number,
): boolean {
  return Math.hypot(x - startX, y - startY) >= DRAG_SLOP_PX;
}

type BindArgs = {
  root: HTMLElement;
  scroller: HTMLElement;
  suppressScrollSyncUntilRef?: { current: number };
};

/**
 * Keep WYSIWYG blocks painted across a drag, then move the scroller away and
 * back in one frame so Chromium unlocks `content-visibility: auto`.
 */
export function bindHaimContentVisibilityHold({
  root,
  scroller,
  suppressScrollSyncUntilRef,
}: BindArgs): () => void {
  let state = haimCvHoldInitialState();
  let originX = 0;
  let originY = 0;
  let raf = 0;

  const syncClass = () => {
    root.classList.toggle(HAIM_CV_HOLD_CLASS, haimCvHoldGestureOpen(state));
  };

  const nudgeScroll = () => {
    const top = scroller.scrollTop;
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const delta = Math.max(1, Math.min(scroller.clientHeight || 1, max));
    if (max < 1) return;
    const next = top + delta <= max ? top + delta : Math.max(0, top - delta);
    if (next === top) return;
    if (suppressScrollSyncUntilRef) {
      suppressScrollSyncUntilRef.current = Math.max(
        suppressScrollSyncUntilRef.current,
        Date.now() + 200,
      );
    }
    scroller.scrollTop = next;
    scroller.scrollTop = top;
  };

  const finishGesture = () => {
    if (haimCvHoldGestureOpen(state)) {
      syncClass();
      return;
    }
    const dirty = state.dirty;
    state = { ...state, dirty: false };
    if (!dirty) {
      syncClass();
      return;
    }
    // Stay painted until the refresh frame, then unlock content-visibility.
    root.classList.add(HAIM_CV_HOLD_CLASS);
    if (raf) window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      if (haimCvHoldGestureOpen(state)) return;
      root.classList.remove(HAIM_CV_HOLD_CLASS);
      nudgeScroll();
    });
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    originX = event.clientX;
    originY = event.clientY;
    state = haimCvHoldPointerDown(state);
    syncClass();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (state.pointers <= 0 || state.dirty) return;
    if (!haimCvHoldPastSlop(originX, originY, event.clientX, event.clientY)) return;
    state = haimCvHoldMoved(state);
  };

  const onPointerUp = () => {
    if (state.pointers <= 0) return;
    state = haimCvHoldPointerUp(state);
    finishGesture();
  };

  const onDragStart = () => {
    state = haimCvHoldDragStart(state);
    syncClass();
  };

  const onDragEnd = () => {
    if (!state.htmlDrag) return;
    state = haimCvHoldDragEnd(state);
    finishGesture();
  };

  scroller.addEventListener('pointerdown', onPointerDown);
  scroller.addEventListener('pointermove', onPointerMove);
  scroller.addEventListener('dragstart', onDragStart, true);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('dragend', onDragEnd);

  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    root.classList.remove(HAIM_CV_HOLD_CLASS);
    scroller.removeEventListener('pointerdown', onPointerDown);
    scroller.removeEventListener('pointermove', onPointerMove);
    scroller.removeEventListener('dragstart', onDragStart, true);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    window.removeEventListener('dragend', onDragEnd);
  };
}
