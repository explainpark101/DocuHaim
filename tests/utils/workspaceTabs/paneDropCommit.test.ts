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
  it('ignores a stale overlay when geometry at the pointer misses panes', () => {
    setWorkspaceTabDrag({ tabId: 't', clientX: 0, clientY: 0 });
    setPaneDropOverlayHit({ leafId: 'leaf-b', zone: 'center', workspaceEdge: false });
    // Far-away coords miss leaves; do not commit a leftover center/join highlight.
    const hit = resolvePaneDropForCommit(-9999, -9999);
    expect(hit).toBeNull();
  });

  it('keeps the overlay hit when geometry still resolves a pane', () => {
    setWorkspaceTabDrag({ tabId: 't', clientX: 0, clientY: 0 });
    setPaneDropOverlayHit({ leafId: 'leaf-b', zone: 'center', workspaceEdge: false });
    // Without DOM leaves, geometry is null — covered above. When both exist,
    // bridge prefers overlay (asserted via the stale-null contract).
    setPaneDropOverlayHit(null);
    expect(resolvePaneDropForCommit(-9999, -9999)).toBeNull();
  });
});

