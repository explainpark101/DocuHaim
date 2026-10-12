import { describe, expect, it } from 'vitest';
import {
  CHAT_WITH_MYSELF_DRAG_ID,
  primarySidebarPaneDropItem,
  type SidebarPaneDropItem,
} from '@/utils/workspaceTabs/sidebarPaneDrop';
import {
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  flattenTabIdsFromLayout,
  listOrphanTabIds,
  splitLeaf,
  type SplitLeafResult,
} from '@/utils/workspaceTabs/paneLayout';
import {
  emptyWorkspaceTabsState,
  extractTabToOrphan,
  moveTabIntoLeaf,
  openOrReplaceFileTab,
  splitTabToEdge,
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

function openFiles(paths: string[]): WorkspaceTabsState {
  let state = emptyWorkspaceTabsState();
  for (const path of paths) {
    state = openOrReplaceFileTab(state, fileInput(path), Date.now(), { activate: true });
  }
  return state;
}

describe('primarySidebarPaneDropItem', () => {
  const items: SidebarPaneDropItem[] = [
    { storageType: 'local', path: 'a.md', nodeType: 'file', name: 'a.md' },
    { storageType: 'local', path: 'b.md', nodeType: 'file', name: 'b.md' },
    { storageType: 'local', path: 'folder/', nodeType: 'folder', name: 'folder' },
  ];

  it('returns only the actively dragged file from a multi-selection', () => {
    const primary = primarySidebarPaneDropItem('local:b.md', items);
    expect(primary).toEqual(items[1]);
  });

  it('resolves chat-with-myself drag id', () => {
    const chatItems: SidebarPaneDropItem[] = [
      { storageType: 'chat', path: '', nodeType: 'chat', name: '나와의 채팅' },
    ];
    expect(primarySidebarPaneDropItem(CHAT_WITH_MYSELF_DRAG_ID, chatItems)?.nodeType).toBe(
      'chat',
    );
  });
});

describe('tree pane join must not absorb unrelated orphans', () => {
  it('joining one dropped tab into a leaf leaves other orphans outside the group', () => {
    let state = openFiles(['a.md', 'b.md', 'c.md', 'd.md']);
    const ids = state.tabs.map((t) => t.id);
    const a = ids[0]!;
    const b = ids[1]!;
    const c = ids[2]!;
    const d = ids[3]!;
    const leaf = createSingleLeafLayout([a, b], a);
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', b));
    state = {
      ...state,
      layout: split.layout,
      focusedPaneId: split.focusedPaneId,
      activeId: a,
    };
    // c + d sit outside the split group (full-window orphans).
    state = extractTabToOrphan(state, c);
    state = extractTabToOrphan(state, d);
    // Simulate opening e in the background (tree drop) then joining only e.
    state = openOrReplaceFileTab(state, fileInput('e.md'), Date.now(), { activate: false });
    const e = state.tabs.find((t) => t.id.includes('e.md'))!.id;
    expect(listOrphanTabIds(state.tabs.map((t) => t.id), state.layout).sort()).toEqual(
      [c, d, e].sort(),
    );

    const target = collectLeaves(state.layout).find((l) => l.tabIds.includes(a))!;
    state = moveTabIntoLeaf(state, e, target.id);

    expect(countLeaves(state.layout)).toBe(2);
    expect(flattenTabIdsFromLayout(state.layout)).toContain(e);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(c);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(d);
    expect(listOrphanTabIds(state.tabs.map((t) => t.id), state.layout).sort()).toEqual(
      [c, d].sort(),
    );
  });

  it('edge-splitting a tree-dropped tab keeps existing orphans outside', () => {
    let state = openFiles(['a.md', 'b.md', 'c.md']);
    const ids = state.tabs.map((t) => t.id);
    const a = ids[0]!;
    const b = ids[1]!;
    const c = ids[2]!;
    const leaf = createSingleLeafLayout([a, b], a);
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', b));
    state = {
      ...state,
      layout: split.layout,
      focusedPaneId: split.focusedPaneId,
      activeId: a,
    };
    state = extractTabToOrphan(state, c);
    state = openOrReplaceFileTab(state, fileInput('e.md'), Date.now(), { activate: false });
    const e = state.tabs.find((t) => t.id.includes('e.md'))!.id;
    const host = collectLeaves(state.layout).find((l) => l.tabIds.includes(a))!;

    const result = splitTabToEdge(state, host.id, 'bottom', e);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    state = result.state;

    expect(countLeaves(state.layout)).toBe(3);
    expect(flattenTabIdsFromLayout(state.layout)).toContain(e);
    expect(flattenTabIdsFromLayout(state.layout)).not.toContain(c);
    expect(listOrphanTabIds(state.tabs.map((t) => t.id), state.layout)).toEqual([c]);
  });
});
