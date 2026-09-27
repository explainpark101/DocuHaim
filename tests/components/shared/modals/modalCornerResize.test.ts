import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  MIN_MODAL_WIDTH,
  boxFromCornerDrag,
} from '@/components/shared/modals/modalCornerResize';

describe('boxFromCornerDrag', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('grows width from a max-w constrained opening size', () => {
    vi.stubGlobal('window', { innerWidth: 1600, innerHeight: 900 });

    // Opening ≈ 720 (Document Settings with max-w), drag SE east by 50px.
    const next = boxFromCornerDrag('se', 440, 100, 720, 400, 50, 0, {
      baselineWidth: 720,
      baselineHeight: 400,
      resizeHeight: false,
    });

    expect(next.width).toBe(820);
    expect(next.height).toBe(400);
  });

  it('does not grow when opening already fills the viewport (w-full without max-w)', () => {
    vi.stubGlobal('window', { innerWidth: 1000, innerHeight: 900 });

    // Nearly full-bleed measure leaves almost no resize room.
    const openW = 1000 - 16;
    const next = boxFromCornerDrag('se', 8, 100, openW, 400, 80, 0, {
      baselineWidth: openW,
      baselineHeight: 400,
      resizeHeight: false,
    });

    expect(next.width).toBe(openW);
    expect(next.width).toBeGreaterThan(MIN_MODAL_WIDTH);
  });
});
