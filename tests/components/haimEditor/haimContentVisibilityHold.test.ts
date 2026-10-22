import { describe, expect, it } from 'vitest';
import {
  haimCvHoldDragEnd,
  haimCvHoldDragStart,
  haimCvHoldGestureOpen,
  haimCvHoldInitialState,
  haimCvHoldMoved,
  haimCvHoldPastSlop,
  haimCvHoldPointerDown,
  haimCvHoldPointerUp,
} from '@/components/haimEditor/haimContentVisibilityHold';

describe('haimContentVisibilityHold', () => {
  it('keeps the gesture open from pointerdown until pointerup', () => {
    const down = haimCvHoldPointerDown(haimCvHoldInitialState());
    expect(haimCvHoldGestureOpen(down)).toBe(true);
    expect(down.dirty).toBe(false);
    const up = haimCvHoldPointerUp(down);
    expect(haimCvHoldGestureOpen(up)).toBe(false);
  });

  it('marks a real drag so the scroller can be refreshed after release', () => {
    const down = haimCvHoldPointerDown(haimCvHoldInitialState());
    const moved = haimCvHoldMoved(down);
    expect(moved.dirty).toBe(true);
    expect(haimCvHoldPastSlop(0, 0, 2, 2)).toBe(false);
    expect(haimCvHoldPastSlop(0, 0, 5, 0)).toBe(true);
  });

  it('stays open when HTML5 drag starts and the pointer is already released', () => {
    let state = haimCvHoldPointerDown(haimCvHoldInitialState());
    state = haimCvHoldDragStart(state);
    state = haimCvHoldPointerUp(state);
    expect(haimCvHoldGestureOpen(state)).toBe(true);
    expect(state.dirty).toBe(true);
    state = haimCvHoldDragEnd(state);
    expect(haimCvHoldGestureOpen(state)).toBe(false);
  });
});
