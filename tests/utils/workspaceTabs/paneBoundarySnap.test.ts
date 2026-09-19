import { describe, expect, it } from 'vitest';
import {
  snapToNearest,
  uniquifySnapTargets,
  PANE_BOUNDARY_SNAP_PX,
} from '@/utils/workspaceTabs/paneBoundarySnap';

describe('paneBoundarySnap', () => {
  it('snaps to the nearest target within threshold', () => {
    const r = snapToNearest(100, [50, 108, 200], PANE_BOUNDARY_SNAP_PX);
    expect(r.snapped).toBe(true);
    expect(r.value).toBe(108);
    expect(r.target).toBe(108);
  });

  it('does not snap when outside threshold', () => {
    const r = snapToNearest(100, [50, 120, 200], 10);
    expect(r.snapped).toBe(false);
    expect(r.value).toBe(100);
    expect(r.target).toBeNull();
  });

  it('picks the closest when multiple targets are in range', () => {
    const r = snapToNearest(100, [95, 108], 10);
    expect(r.value).toBe(95);
  });

  it('uniquifies nearly identical targets', () => {
    expect(uniquifySnapTargets([10, 10.4, 30, 30.2], 1)).toEqual([10, 30]);
  });
});
