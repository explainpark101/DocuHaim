import { describe, expect, it } from 'vitest';
import {
  applyMdEditorToolbarHorizontalScroll,
  canAbsorbToolbarWheelDelta,
  canScrollToolbarHorizontally,
  clampToolbarScrollLeft,
  createToolbarPointerState,
  resolveToolbarPointerMode,
  shouldConsumeVerticalWheelAsHorizontal,
  shouldStartToolbarPointerMode,
  stepSmoothScrollToward,
  stepToolbarTouchScroll,
} from '@/utils/mdEditorToolbarScroll';

function mockToolbar(overrides: Partial<HTMLElement> = {}): HTMLElement {
  return {
    scrollWidth: 400,
    clientWidth: 200,
    scrollLeft: 50,
    scrollHeight: 40,
    clientHeight: 40,
    ...overrides,
  } as HTMLElement;
}

describe('mdEditorToolbarScroll', () => {
  it('detects horizontal overflow', () => {
    const el = mockToolbar();
    expect(shouldConsumeVerticalWheelAsHorizontal(el, 12, 0)).toBe(true);
    expect(shouldConsumeVerticalWheelAsHorizontal(mockToolbar({ scrollWidth: 200 }), 12, 0)).toBe(
      false,
    );
  });

  it('ignores mostly-horizontal wheel deltas', () => {
    const el = mockToolbar();
    expect(shouldConsumeVerticalWheelAsHorizontal(el, 2, 20)).toBe(false);
  });

  it('releases vertical wheel at horizontal edges', () => {
    const atStart = mockToolbar({ scrollLeft: 0 });
    expect(shouldConsumeVerticalWheelAsHorizontal(atStart, -10, 0)).toBe(false);

    const atEnd = mockToolbar({ scrollLeft: 200 });
    expect(shouldConsumeVerticalWheelAsHorizontal(atEnd, 10, 0)).toBe(false);
  });

  it('clamps horizontal scroll', () => {
    const el = mockToolbar({ scrollLeft: 190 });
    applyMdEditorToolbarHorizontalScroll(el, 40);
    expect(el.scrollLeft).toBe(200);
    expect(clampToolbarScrollLeft(el, 999)).toBe(200);
  });

  it('eases wheel target toward destination', () => {
    const next = stepSmoothScrollToward(0, 100, 0.2);
    expect(next).toBe(20);
    expect(stepSmoothScrollToward(99.8, 100, 0.2)).toBe(100);
  });

  it('detects absorbable wheel delta at edges', () => {
    const el = mockToolbar({ scrollLeft: 0 });
    expect(canAbsorbToolbarWheelDelta(el, 0, 12)).toBe(true);
    expect(canAbsorbToolbarWheelDelta(el, 0, -12)).toBe(false);
    expect(canAbsorbToolbarWheelDelta(el, 200, 12)).toBe(false);
  });

  it('reports scroll availability by direction', () => {
    const el = mockToolbar({ scrollLeft: 0 });
    expect(canScrollToolbarHorizontally(el, 10)).toBe(true);
    expect(canScrollToolbarHorizontally(el, -10)).toBe(false);
  });

  it('locks touch axis after threshold', () => {
    expect(shouldStartToolbarPointerMode(2, 2, 8)).toBe(false);
    expect(shouldStartToolbarPointerMode(0, 10, 8)).toBe(true);
    expect(resolveToolbarPointerMode(12, 2)).toBe('native-x');
    expect(resolveToolbarPointerMode(2, 12)).toBe('convert-y');
  });

  it('converts vertical touch drag to horizontal scroll', () => {
    const el = mockToolbar({ scrollLeft: 20 });
    const state = createToolbarPointerState(el, 10, 10);
    state.mode = 'convert-y';
    state.lastY = 10;

    const result = stepToolbarTouchScroll(state, 10, 24);
    expect(result.consumed).toBe(true);
    expect(el.scrollLeft).toBe(34);
  });

  it('releases touch conversion at scroll edges', () => {
    const el = mockToolbar({ scrollLeft: 0 });
    const state = createToolbarPointerState(el, 10, 24);
    state.mode = 'convert-y';
    state.lastY = 24;

    const result = stepToolbarTouchScroll(state, 10, 10);
    expect(result.consumed).toBe(false);
    expect(result.release).toBe(true);
  });
});
