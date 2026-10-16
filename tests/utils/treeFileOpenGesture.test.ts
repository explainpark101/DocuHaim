import { describe, expect, it } from 'vitest';
import { treeFileGestureOpensTab } from '@/utils/treeFileOpenGesture';

describe('treeFileGestureOpensTab', () => {
  it('opens a file on mouse double-click only', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 1,
        hasModifier: false,
        source: 'click',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
      }),
    ).toBe(true);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'pen',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
      }),
    ).toBe(true);
  });

  it('treats one touch as open and ignores the extra double-tap click', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 1,
        hasModifier: false,
        source: 'click',
      }),
    ).toBe(true);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 2,
        hasModifier: false,
        source: 'click',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 2,
        hasModifier: false,
        source: 'dblclick',
      }),
    ).toBe(false);
  });

  it('keeps modifier clicks as selection', () => {
    expect(
      treeFileGestureOpensTab({
        pointerType: 'touch',
        clickDetail: 1,
        hasModifier: true,
        source: 'click',
      }),
    ).toBe(false);
    expect(
      treeFileGestureOpensTab({
        pointerType: 'mouse',
        clickDetail: 2,
        hasModifier: true,
        source: 'dblclick',
      }),
    ).toBe(false);
  });
});
