export const MD_EDITOR_TOOLBAR_WRAPPER_SELECTOR = '.md-editor-toolbar-wrapper';

const AXIS_LOCK_PX = 8;
const OVERFLOW_EPSILON = 1;
/** Wheel smooth-scroll catch-up per frame (higher = snappier). */
export const TOOLBAR_WHEEL_SMOOTH_FACTOR = 0.2;
const TOOLBAR_WHEEL_SNAP_PX = 0.5;

type ToolbarWheelAnimState = {
  target: number;
  current: number;
  rafId: number | null;
};

const toolbarWheelAnimByEl = new WeakMap<HTMLElement, ToolbarWheelAnimState>();

export type ToolbarPointerMode = 'pending' | 'native-x' | 'convert-y';

export type ToolbarPointerState = {
  el: HTMLElement;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  mode: ToolbarPointerMode;
};

export function getMdEditorToolbarScrollEl(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest(MD_EDITOR_TOOLBAR_WRAPPER_SELECTOR);
  return el instanceof HTMLElement ? el : null;
}

export function hasMdEditorToolbarHorizontalOverflow(el: HTMLElement): boolean {
  return el.scrollWidth - el.clientWidth > OVERFLOW_EPSILON;
}

export function readWheelDeltaPixels(event: WheelEvent, el: HTMLElement): { x: number; y: number } {
  let { deltaX, deltaY, deltaMode } = event;
  if (deltaMode === WheelEvent.DOM_DELTA_LINE) {
    const line = 16;
    deltaX *= line;
    deltaY *= line;
  } else if (deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    deltaX *= el.clientWidth;
    deltaY *= el.clientHeight || 16;
  }
  return { x: deltaX, y: deltaY };
}

export function canScrollToolbarHorizontally(el: HTMLElement, delta: number): boolean {
  if (delta === 0) return false;
  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= OVERFLOW_EPSILON) return false;
  if (delta < 0) return el.scrollLeft > OVERFLOW_EPSILON;
  return el.scrollLeft < maxScroll - OVERFLOW_EPSILON;
}

export function shouldConsumeVerticalWheelAsHorizontal(
  el: HTMLElement,
  deltaY: number,
  deltaX: number,
): boolean {
  if (!hasMdEditorToolbarHorizontalOverflow(el)) return false;
  if (deltaY === 0) return false;
  if (Math.abs(deltaX) > Math.abs(deltaY)) return false;
  return canScrollToolbarHorizontally(el, deltaY);
}

export function clampToolbarScrollLeft(el: HTMLElement, value: number): number {
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  return Math.max(0, Math.min(maxScroll, value));
}

export function applyMdEditorToolbarHorizontalScroll(el: HTMLElement, delta: number): void {
  el.scrollLeft = clampToolbarScrollLeft(el, el.scrollLeft + delta);
}

export function stepSmoothScrollToward(
  current: number,
  target: number,
  factor = TOOLBAR_WHEEL_SMOOTH_FACTOR,
): number {
  const diff = target - current;
  if (Math.abs(diff) <= TOOLBAR_WHEEL_SNAP_PX) return target;
  return current + diff * factor;
}

export function canAbsorbToolbarWheelDelta(
  el: HTMLElement,
  targetScrollLeft: number,
  delta: number,
): boolean {
  if (!hasMdEditorToolbarHorizontalOverflow(el) || delta === 0) return false;
  return clampToolbarScrollLeft(el, targetScrollLeft + delta) !== targetScrollLeft;
}

function getToolbarWheelAnimState(el: HTMLElement): ToolbarWheelAnimState {
  const existing = toolbarWheelAnimByEl.get(el);
  if (existing) return existing;

  const initial = el.scrollLeft;
  const state: ToolbarWheelAnimState = {
    target: initial,
    current: initial,
    rafId: null,
  };
  toolbarWheelAnimByEl.set(el, state);
  return state;
}

function syncToolbarWheelAnimState(el: HTMLElement, state: ToolbarWheelAnimState): void {
  if (state.rafId != null) return;
  state.current = el.scrollLeft;
  state.target = el.scrollLeft;
}

function runToolbarWheelAnim(el: HTMLElement, state: ToolbarWheelAnimState): void {
  if (!el.isConnected) {
    state.rafId = null;
    toolbarWheelAnimByEl.delete(el);
    return;
  }

  state.current = stepSmoothScrollToward(state.current, state.target);
  el.scrollLeft = state.current;

  if (Math.abs(state.target - state.current) <= TOOLBAR_WHEEL_SNAP_PX) {
    state.current = state.target;
    el.scrollLeft = state.current;
    state.rafId = null;
    return;
  }

  state.rafId = requestAnimationFrame(() => {
    runToolbarWheelAnim(el, state);
  });
}

function startToolbarWheelAnim(el: HTMLElement, state: ToolbarWheelAnimState): void {
  if (state.rafId != null) return;
  state.rafId = requestAnimationFrame(() => {
    state.rafId = null;
    runToolbarWheelAnim(el, state);
  });
}

/** Queue vertical wheel delta as a smoothed horizontal scroll animation. */
export function queueToolbarWheelScroll(el: HTMLElement, delta: number): boolean {
  const state = getToolbarWheelAnimState(el);
  syncToolbarWheelAnimState(el, state);

  if (!canAbsorbToolbarWheelDelta(el, state.target, delta)) return false;

  state.target = clampToolbarScrollLeft(el, state.target + delta);
  startToolbarWheelAnim(el, state);
  return true;
}

export function resolveToolbarPointerMode(dx: number, dy: number): Exclude<ToolbarPointerMode, 'pending'> {
  return Math.abs(dx) > Math.abs(dy) ? 'native-x' : 'convert-y';
}

export function shouldStartToolbarPointerMode(
  dx: number,
  dy: number,
  threshold = AXIS_LOCK_PX,
): boolean {
  return Math.hypot(dx, dy) >= threshold;
}

export function createToolbarPointerState(
  el: HTMLElement,
  clientX: number,
  clientY: number,
): ToolbarPointerState {
  return {
    el,
    startX: clientX,
    startY: clientY,
    lastX: clientX,
    lastY: clientY,
    mode: 'pending',
  };
}

export function stepToolbarTouchScroll(
  state: ToolbarPointerState,
  clientX: number,
  clientY: number,
): { consumed: boolean; release: boolean } {
  const dx = clientX - state.startX;
  const dy = clientY - state.startY;

  if (state.mode === 'pending') {
    if (!shouldStartToolbarPointerMode(dx, dy)) {
      return { consumed: false, release: false };
    }
    state.mode = resolveToolbarPointerMode(dx, dy);
  }

  if (state.mode === 'native-x') {
    state.lastX = clientX;
    state.lastY = clientY;
    return { consumed: false, release: false };
  }

  const deltaY = clientY - state.lastY;
  state.lastX = clientX;
  state.lastY = clientY;

  if (deltaY === 0) return { consumed: false, release: false };
  if (!canScrollToolbarHorizontally(state.el, deltaY)) {
    return { consumed: false, release: true };
  }

  applyMdEditorToolbarHorizontalScroll(state.el, deltaY);
  return { consumed: true, release: false };
}
