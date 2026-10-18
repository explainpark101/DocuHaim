import { describe, expect, it } from 'vitest';
import {
  axisRectToImagePixels,
  intersectAxisRects,
  pixelRectCoversCanvas,
} from '@/utils/imageClientRect';

describe('imageClientRect', () => {
  const stage = { left: 100, top: 50, right: 300, bottom: 250 };

  it('intersects overlapping rects', () => {
    expect(
      intersectAxisRects(stage, { left: 200, top: 0, right: 400, bottom: 100 }),
    ).toEqual({ left: 200, top: 50, right: 300, bottom: 100 });
  });

  it('returns null when rects miss', () => {
    expect(
      intersectAxisRects(stage, { left: 0, top: 0, right: 10, bottom: 10 }),
    ).toBeNull();
  });

  it('maps a viewport crop onto image pixels', () => {
    const pixels = axisRectToImagePixels(
      stage,
      200,
      200,
      { left: 200, top: 50, right: 300, bottom: 150 },
    );
    expect(pixels).toEqual({ sx: 100, sy: 0, sw: 100, sh: 100 });
    expect(pixelRectCoversCanvas(pixels!, 200, 200)).toBe(false);
  });

  it('treats a full-stage selection as covering the canvas', () => {
    const pixels = axisRectToImagePixels(stage, 200, 200, {
      left: 0,
      top: 0,
      right: 400,
      bottom: 400,
    });
    expect(pixels).toEqual({ sx: 0, sy: 0, sw: 200, sh: 200 });
    expect(pixelRectCoversCanvas(pixels!, 200, 200)).toBe(true);
  });
});
