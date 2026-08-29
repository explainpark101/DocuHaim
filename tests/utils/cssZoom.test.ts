import { describe, expect, it } from 'bun:test';
import {
  rectDimensionsLookVisual,
  visualDeltaToLayoutDelta,
  visualSizeToLayoutSize,
} from '@/utils/cssZoom';

describe('cssZoom', () => {
  it('converts visual size to layout size under zoom', () => {
    expect(visualSizeToLayoutSize(200, 2)).toBe(100);
    expect(visualSizeToLayoutSize(150, 1.5)).toBe(100);
  });

  it('converts pointer deltas to layout deltas under zoom', () => {
    expect(visualDeltaToLayoutDelta(20, 2)).toBe(10);
    expect(visualDeltaToLayoutDelta(-15, 1.5)).toBe(-10);
  });

  it('falls back to 1x when zoom is invalid', () => {
    expect(visualSizeToLayoutSize(120, 0)).toBe(120);
    expect(visualDeltaToLayoutDelta(8, -2)).toBe(8);
  });

  it('detects layout vs visual rect dimensions', () => {
    expect(rectDimensionsLookVisual(414, 638, 0.65)).toBe(true);
    expect(rectDimensionsLookVisual(638, 638, 0.65)).toBe(false);
    expect(rectDimensionsLookVisual(638, 638, 1)).toBe(true);
  });

  it('resolves visual overlay width from layout rect under zoom', () => {
    const layout = 638;
    const zoom = 0.7;
    expect(rectDimensionsLookVisual(layout, layout, zoom)).toBe(false);
    expect(layout * zoom).toBeCloseTo(446.6, 0);
  });

  it('resolves layout size from visual rect under zoom', () => {
    const visual = 414;
    const layout = 638;
    const zoom = 0.65;
    expect(rectDimensionsLookVisual(visual, layout, zoom)).toBe(true);
    expect(visualSizeToLayoutSize(visual, zoom)).toBeCloseTo(636.9, 0);
  });

  it('derives zoom-root layout offset from viewport rects in layout space', () => {
    const zoom = 0.7;
    const layoutW = 638;
    const elLeft = 246;
    const rootLeft = 16;
    const rectW = layoutW;
    const dimsAreLayout = !rectDimensionsLookVisual(rectW, layoutW, zoom);
    expect(dimsAreLayout).toBe(true);
    expect(elLeft - rootLeft).toBe(230);
  });
});
