import { describe, expect, it } from 'vitest';
import { isPointInsideDropZone } from '@/utils/dropZoneHitTest';

describe('isPointInsideDropZone', () => {
  it('returns false when document is unavailable', () => {
    expect(isPointInsideDropZone({ x: 10, y: 20 }, 1, '[data-session-drop-zone]')).toBe(false);
  });
});
