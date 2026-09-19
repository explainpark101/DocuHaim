import { afterEach, describe, expect, it } from 'vitest';
import {
  resolvePaneDropForCommit,
  setPaneDropOverlayHit,
  setWorkspaceTabDrag,
} from '@/utils/workspaceTabs/workspaceTabDragBridge';

afterEach(() => {
  setWorkspaceTabDrag(null);
});

describe('resolvePaneDropForCommit', () => {
  it('prefers the overlay hit over a fresh geometry probe', () => {
    setWorkspaceTabDrag({ tabId: 't', clientX: 0, clientY: 0 });
    setPaneDropOverlayHit({ leafId: 'leaf-b', zone: 'center', workspaceEdge: false });
    // Far-away coords would miss leaves in a real DOM; overlay hit still wins.
    const hit = resolvePaneDropForCommit(-9999, -9999);
    expect(hit).toEqual({ leafId: 'leaf-b', zone: 'center', workspaceEdge: false });
  });
});
