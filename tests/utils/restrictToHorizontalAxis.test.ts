import { describe, expect, it } from 'vitest';
import { restrictToHorizontalAxis } from '@/utils/workspace/restrictToHorizontalAxis';

describe('restrictToHorizontalAxis', () => {
  it('zeros vertical drag transform', () => {
    const result = restrictToHorizontalAxis({
      activatorEvent: null,
      active: null,
      activeNodeRect: null,
      draggingNodeRect: null,
      containerNodeRect: null,
      over: null,
      overlayNodeRect: null,
      scrollableAncestors: [],
      scrollableAncestorRects: [],
      transform: { x: 12, y: 8, scaleX: 1, scaleY: 1.02 },
      windowRect: null,
    } as Parameters<typeof restrictToHorizontalAxis>[0]);

    expect(result).toEqual({ x: 12, y: 0, scaleX: 1, scaleY: 1.02 });
  });
});
