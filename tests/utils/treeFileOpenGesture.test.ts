import { describe, expect, it } from 'vitest';
import { treeFileGestureOpensTab } from '@/utils/treeFileOpenGesture';

describe('treeFileGestureOpensTab', () => {
  it('opens a file on mouse double-click only in dblclick mode', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 1,
        hasModifier: false,
        source: 'click',
        mode: 'dblclick',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
        mode: 'dblclick',
      }),
    ).toBe(true);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'pen',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
        mode: 'dblclick',
      }),
    ).toBe(true);
  });

  it('opens on a single mouse click in click mode', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 1,
        hasModifier: false,
        source: 'click',
        mode: 'click',
      }),
    ).toBe(true);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
        mode: 'click',
      }),
    ).toBe(false);
  });

  it('treats one touch as open and ignores the extra double-tap click in click mode', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 1,
        hasModifier: false,
        source: 'click',
        mode: 'click',
      }),
    ).toBe(true);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 2,
        hasModifier: false,
        source: 'click',
        mode: 'click',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
        mode: 'click',
      }),
    ).toBe(false);
  });

  it('requires a double-tap in dblclick mode for touch', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 1,
        hasModifier: false,
        source: 'click',
        mode: 'dblclick',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 2,
        hasModifier: false,
        source: 'click',
        mode: 'dblclick',
      }),
    ).toBe(true);
  });

  it('keeps modifier clicks as selection', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 1,
        hasModifier: true,
        source: 'click',
        mode: 'click',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 2,
        hasModifier: true,
        source: 'dblclick',
        mode: 'dblclick',
      }),
    ).toBe(false);
  });
});
