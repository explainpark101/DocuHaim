import { describe, expect, it } from 'vitest';
import {
  isWorkspacePaneSurfaceLive,
  WORKSPACE_PANE_DEMOTE_SETTLE_MS,
  WORKSPACE_PANE_HOVER_FREEZE_MS,
} from '@/utils/workspacePaneFreezeSettings';

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

describe('workspace pane freeze timing constants', () => {
  it('exports positive hover debounce and demote settle delays', () => {
    expect(WORKSPACE_PANE_HOVER_FREEZE_MS).toBeGreaterThan(0);
    expect(WORKSPACE_PANE_DEMOTE_SETTLE_MS).toBeGreaterThanOrEqual(
      WORKSPACE_PANE_HOVER_FREEZE_MS,
    );
  });
});
