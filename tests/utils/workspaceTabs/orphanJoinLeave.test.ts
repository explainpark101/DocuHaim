import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  flattenTabIdsFromLayout,
  splitLeaf,
  WORKSPACE_TAB_GROUP_ZONE_ID,
  WORKSPACE_TAB_ORPHAN_ZONE_ID,
} from '@/utils/workspaceTabs/paneLayout';
import {
  activateTab,
  collapsePaneLeaf,
  emptyWorkspaceTabsState,
  extractTabToOrphan,
  moveTab,
  openOrReplaceFileTab,
} from '@/utils/workspaceTabs/workspaceTabsStore';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';

function fileInput(path: string) {
  return {
    storageType: 'local' as const,
    path,
    currentFile: { id: path, name: path, type: 'local' as const },
    editorContent: `# ${path}`,
  };
}

function openFiles(paths: string[]): WorkspaceTabsState {
  let state = emptyWorkspaceTabsState();
  for (const path of paths) {
    state = openOrReplaceFileTab(state, fileInput(path), Date.now(), { activate: true });
  }
  return state;
}

function findOrphan(state: WorkspaceTabsState, id: string): boolean {
  return !flattenTabIdsFromLayout(state.layout).includes(id) && state.tabs.some((t) => t.id === id);
}

/** Three tabs peeled into three leaves so extracting one keeps a split. */
function threeLeafSplit(): WorkspaceTabsState {
  let state = openFiles(['a.md', 'b.md', 'c.md']);
  const ids = state.tabs.map((t) => t.id);
  const leaf = createSingleLeafLayout(ids, ids[1]!);
  const split = splitLeaf(leaf, leaf.id, 'right', ids[2]!)!;
  return {
    ...state,
    layout: split.layout,
    focusedPaneId: split.focusedPaneId,
    activeId: ids[2]!,
  };
}

describe('workspaceTabsStore orphan join/leave', () => {
  it('extracts a tab from the split group as an orphan full window', () => {
    let state = threeLeafSplit();
    expect(countLeaves(state.layout)).toBe(3);
    const leaveId = state.tabs[2]!.id;
    state = extractTabToOrphan(state, leaveId);
    expect(countLeaves(state.layout)).toBe(2);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(leaveId);
    expect(state.activeId).toBe(leaveId);
    expect(findOrphan(state, leaveId)).toBe(true);
  });

  it('moveTab to orphan zone leaves the split group', () => {
    let state = threeLeafSplit();
    const leaveId = state.tabs[0]!.id;
    state = moveTab(state, leaveId, WORKSPACE_TAB_ORPHAN_ZONE_ID);
    expect(findOrphan(state, leaveId)).toBe(true);
    expect(state.activeId).toBe(leaveId);
    expect(countLeaves(state.layout)).toBeGreaterThan(1);
  });

  it('moveTab to group zone joins the focused leaf', () => {
    let state = threeLeafSplit();
    state = openOrReplaceFileTab(state, fileInput('d.md'), Date.now(), { activate: true });
    const orphanId = state.tabs.find((t) => t.id.includes('d.md'))!.id;
    expect(findOrphan(state, orphanId)).toBe(true);
    expect(countLeaves(state.layout)).toBe(3);

    state = moveTab(state, orphanId, WORKSPACE_TAB_GROUP_ZONE_ID);
    expect(findOrphan(state, orphanId)).toBe(false);
    expect(flattenTabIdsFromLayout(state.layout)).toContain(orphanId);
    expect(countLeaves(state.layout)).toBe(3);
  });

  it('activating an orphan keeps the split layout', () => {
    let state = threeLeafSplit();
    state = openOrReplaceFileTab(state, fileInput('d.md'), Date.now(), { activate: true });
    const orphanId = state.tabs.find((t) => t.id.includes('d.md'))!.id;
    expect(countLeaves(state.layout)).toBe(3);

    const inGroupId = state.tabs[0]!.id;
    state = activateTab(state, inGroupId);
    expect(state.activeId).toBe(inGroupId);
    expect(countLeaves(state.layout)).toBe(3);

    state = activateTab(state, orphanId);
    expect(state.activeId).toBe(orphanId);
    expect(countLeaves(state.layout)).toBe(3);
    expect(collectLeaves(state.layout).flatMap((l) => l.tabIds)).not.toContain(orphanId);
  });

  it('collapsePaneLeaf extracts pane tabs outside the split group', () => {
    let state = threeLeafSplit();
    expect(countLeaves(state.layout)).toBe(3);
    const leaveLeaf = collectLeaves(state.layout)[2]!;
    const leaveIds = leaveLeaf.tabIds.slice();
    state = collapsePaneLeaf(state, leaveLeaf.id);
    expect(countLeaves(state.layout)).toBe(2);
    for (const id of leaveIds) {
      expect(flattenTabIdsFromLayout(state.layout)).not.toContain(id);
      expect(state.tabs.some((t) => t.id === id)).toBe(true);
    }
    expect(leaveIds).toContain(state.activeId);
  });
});
