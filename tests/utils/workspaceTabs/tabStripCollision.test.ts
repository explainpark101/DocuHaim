import { describe, expect, it } from 'vitest';
import {
  WORKSPACE_TAB_GROUP_ZONE_ID,
  WORKSPACE_TAB_ORPHAN_ZONE_ID,
} from '@/utils/workspaceTabs/paneLayout';
import { isWorkspaceTabStripZoneId } from '@/utils/workspaceTabs/tabStripCollision';
import {
  activateTab,
  extractTabToOrphan,
  moveTab,
  openOrReplaceFileTab,
  emptyWorkspaceTabsState,
} from '@/utils/workspaceTabs/workspaceTabsStore';
import {
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  flattenTabIdsFromLayout,
  splitLeaf,
  type SplitLeafResult,
} from '@/utils/workspaceTabs/paneLayout';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';

function expectSplitOk(result: SplitLeafResult) {
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(result.reason);
  return result;
}

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

function twoLeafSplitWithOrphan(): {
  state: WorkspaceTabsState;
  orphanId: string;
  inGroupId: string;
} {
  let state = openFiles(['a.md', 'b.md', 'c.md']);
  const ids = state.tabs.map((t) => t.id);
  const a = ids[0]!;
  const b = ids[1]!;
  const c = ids[2]!;
  const leaf = createSingleLeafLayout([a, b], a);
  const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', b));
  // c was opened while unsplit then we rebuilt layout — force orphan membership.
  state = {
    ...state,
    layout: split.layout,
    focusedPaneId: split.focusedPaneId,
    activeId: a,
    tabs: state.tabs,
  };
  // Ensure c is outside the layout.
  if (flattenTabIdsFromLayout(state.layout).includes(c)) {
    state = extractTabToOrphan(state, c);
  }
  // Re-open path: place a as focused, keep c orphan.
  state = activateTab(state, a);
  expect(countLeaves(state.layout)).toBe(2);
  expect(flattenTabIdsFromLayout(state.layout)).not.toContain(c);
  return { state, orphanId: c, inGroupId: a };
}

describe('tab strip zone ids', () => {
  it('recognizes group and orphan zone markers', () => {
    expect(isWorkspaceTabStripZoneId(WORKSPACE_TAB_GROUP_ZONE_ID)).toBe(true);
    expect(isWorkspaceTabStripZoneId(WORKSPACE_TAB_ORPHAN_ZONE_ID)).toBe(true);
    expect(isWorkspaceTabStripZoneId('file:local:a.md')).toBe(false);
  });
});

describe('orphan must not silently join on strip reorder intent', () => {
  it('keeps orphan outside the group when reordering among orphans only', () => {
    let { state, orphanId } = twoLeafSplitWithOrphan();
    state = openOrReplaceFileTab(state, fileInput('d.md'), Date.now(), { activate: true });
    const dId = state.tabs.find((t) => t.id.includes('d.md'))!.id;
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(orphanId);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(dId);

    // Simulate a false-positive group-zone drop that used to happen with closestCenter.
    // Intentional join still works — documented in orphanJoinLeave — but activating /
    // reordering orphans must not call GROUP_ZONE.
    state = moveTab(state, orphanId, dId);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(orphanId);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(dId);
    expect(countLeaves(state.layout)).toBe(2);
  });

  it('activating an orphan after strip drag does not pull it into a leaf', () => {
    let { state, orphanId, inGroupId } = twoLeafSplitWithOrphan();
    state = activateTab(state, inGroupId);
    state = activateTab(state, orphanId);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(orphanId);
    expect(collectLeaves(state.layout).every((l) => !l.tabIds.includes(orphanId))).toBe(true);
  });
});
