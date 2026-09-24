import { describe, expect, it } from 'vitest';
import { isWorkspacePaneSurfaceLive } from '@/utils/workspacePaneFreezeSettings';

describe('isWorkspacePaneSurfaceLive', () => {
  it('off: always live', () => {
    expect(
      isWorkspacePaneSurfaceLive('off', { hovered: false, focusWithin: false }),
    ).toBe(true);
  });

  it('hover-or-focus: live on hover or focus', () => {
    expect(
      isWorkspacePaneSurfaceLive('hover-or-focus', {
        hovered: true,
        focusWithin: false,
      }),
    ).toBe(true);
    expect(
      isWorkspacePaneSurfaceLive('hover-or-focus', {
        hovered: false,
        focusWithin: true,
      }),
    ).toBe(true);
    expect(
      isWorkspacePaneSurfaceLive('hover-or-focus', {
        hovered: false,
        focusWithin: false,
      }),
    ).toBe(false);
  });

  it('focus: live only with keyboard focus', () => {
    expect(
      isWorkspacePaneSurfaceLive('focus', { hovered: true, focusWithin: false }),
    ).toBe(false);
    expect(
      isWorkspacePaneSurfaceLive('focus', { hovered: false, focusWithin: true }),
    ).toBe(true);
  });
});
