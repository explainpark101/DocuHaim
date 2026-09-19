import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  createSingleLeafLayout,
  splitLeaf,
  type SplitLeafResult,
} from '@/utils/workspaceTabs/paneLayout';
import {
  emptyWorkspaceTabsState,
  moveTabIntoLeaf,
  openOrReplaceFileTab,
  swapPanesOrMoveTabToCenter,
} from '@/utils/workspaceTabs/workspaceTabsStore';
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

function twoPaneState(): WorkspaceTabsState {
  let state = emptyWorkspaceTabsState();
  state = openOrReplaceFileTab(state, fileInput('a.md'), Date.now(), { activate: true });
  state = openOrReplaceFileTab(state, fileInput('b.md'), Date.now(), { activate: true });
  const a = state.tabs[0]!.id;
  const b = state.tabs[1]!.id;
  const leaf = createSingleLeafLayout([a, b], a);
  const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', b));
  return {
    ...state,
    layout: split.layout,
    focusedPaneId: split.focusedPaneId,
    activeId: a,
  };
}

describe('swapPanesOrMoveTabToCenter', () => {
  it('swaps both pane contents when dropping a tab onto another leaf center', () => {
    const state = twoPaneState();
    const [left, right] = collectLeaves(state.layout);
    const leftTab = left!.tabIds[0]!;
    const rightTab = right!.tabIds[0]!;

    const next = swapPanesOrMoveTabToCenter(state, leftTab, right!.id);
    const leaves = collectLeaves(next.layout);
    expect(leaves[0]?.tabIds).toEqual([rightTab]);
    expect(leaves[1]?.tabIds).toEqual([leftTab]);
    expect(next.focusedPaneId).toBe(right!.id);
    expect(next.activeId).toBe(leftTab);
  });

  it('joins into the leaf when the tab is already in that leaf', () => {
    const state = twoPaneState();
    const [left] = collectLeaves(state.layout);
    const tab = left!.tabIds[0]!;
    const next = swapPanesOrMoveTabToCenter(state, tab, left!.id);
    expect(collectLeaves(next.layout)[0]?.tabIds).toContain(tab);
  });

  it('moveTabIntoLeaf still merges without swapping', () => {
    let state = twoPaneState();
    state = openOrReplaceFileTab(state, fileInput('c.md'), Date.now(), { activate: true });
    const c = state.tabs.find((t) => t.id.includes('c.md'))!.id;
    // Place c into left leaf first via join, then ensure right still has b only.
    const [left, right] = collectLeaves(state.layout);
    // c may be orphan or in a leaf depending on placeNewTab; force into left.
    state = moveTabIntoLeaf(state, c, left!.id);
    const joined = moveTabIntoLeaf(state, c, right!.id);
    const leaves = collectLeaves(joined.layout);
    expect(leaves[1]?.tabIds).toContain(c);
    expect(leaves[0]?.tabIds).not.toContain(c);
  });
});
