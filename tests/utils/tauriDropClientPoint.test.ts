import { describe, expect, it } from 'vitest';
import { tauriDropClientPointCandidates } from '@/utils/tauriDropClientPoint';

describe('tauriDropClientPointCandidates', () => {
  it('includes raw coordinates first', () => {
    const points = tauriDropClientPointCandidates({ x: 120, y: 240 }, 2);
    expect(points[0]).toEqual({ x: 120, y: 240 });
  });

  it('includes toLogical when available', () => {
    const points = tauriDropClientPointCandidates(
      {
        x: 200,
        y: 400,
        toLogical: (factor) => ({ x: 200 / factor, y: 400 / factor }),
      },
      2,
    );
    expect(points).toContainEqual({ x: 100, y: 200 });
  });

  it('dedupes identical candidate points', () => {
    const points = tauriDropClientPointCandidates(
      {
        x: 100,
        y: 200,
        toLogical: () => ({ x: 100, y: 200 }),
      },
      1,
    );
    expect(points).toEqual([{ x: 100, y: 200 }]);
  });
});
