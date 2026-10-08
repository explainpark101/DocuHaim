import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  findLeafContainingTab,
  flattenTabIdsFromLayout,
  splitLeaf,
  type SplitLeafResult,
  WORKSPACE_TAB_GROUP_ZONE_ID,
  WORKSPACE_TAB_ORPHAN_ZONE_ID,
} from '@/utils/workspaceTabs/paneLayout';
import {
  activateTab,
  clearOrphanExportPdf,
  collapsePaneLeaf,
  emptyWorkspaceTabsState,
  extractTabToOrphan,
  moveTab,
  moveTabIntoLeaf,
  openExportPdfForTab,
  openExportPdfInLeaf,
  openOrActivateChat,
  openOrReplaceFileTab,
} from '@/utils/workspaceTabs/workspaceTabsStore';
import { CHAT_TAB_ID, type WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import { isFileTab } from '@/utils/workspaceTabs/helpers';


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

function findOrphan(state: WorkspaceTabsState, id: string): boolean {
  return !flattenTabIdsFromLayout(state.layout).includes(id) && state.tabs.some((t) => t.id === id);
}

/** Three leaves via nested splits so extracting one keeps a remaining split. */
function threeLeafSplit(): WorkspaceTabsState {
  let state = openFiles(['a.md', 'b.md', 'c.md']);
  const ids = state.tabs.map((t) => t.id);
  const a = ids[0]!;
  const b = ids[1]!;
  const c = ids[2]!;
  const leaf = createSingleLeafLayout(ids, a);
  const s1 = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', b));
  const hostA = collectLeaves(s1.layout).find((l) => l.tabIds.includes(a))!;
  const s2 = expectSplitOk(splitLeaf(s1.layout, hostA.id, 'bottom', c));
  return {
    ...state,
    layout: s2.layout,
    focusedPaneId: s2.focusedPaneId,
    activeId: c,
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

  it('collapsePaneLeaf extracts pane tabs in the background without stealing focus', () => {
    let state = threeLeafSplit();
    expect(countLeaves(state.layout)).toBe(3);
    const keepId = state.tabs[0]!.id;
    state = activateTab(state, keepId);
    const leaveLeaf = collectLeaves(state.layout).find((l) => !l.tabIds.includes(keepId))!;
    const leaveIds = leaveLeaf.tabIds.slice();
    state = collapsePaneLeaf(state, leaveLeaf.id);
    expect(countLeaves(state.layout)).toBe(2);
    for (const id of leaveIds) {
      expect(flattenTabIdsFromLayout(state.layout)).not.toContain(id);
      expect(state.tabs.some((t) => t.id === id)).toBe(true);
    }
    expect(state.activeId).toBe(keepId);
    expect(leaveIds).not.toContain(state.activeId);
  });

  it('openOrActivateChat joins the focused leaf while split (not a full-window orphan)', () => {
    let state = threeLeafSplit();
    const focused = state.focusedPaneId;
    state = openOrActivateChat(state);
    expect(findOrphan(state, CHAT_TAB_ID)).toBe(false);
    expect(flattenTabIdsFromLayout(state.layout)).toContain(CHAT_TAB_ID);
    const host = collectLeaves(state.layout).find((l) => l.tabIds.includes(CHAT_TAB_ID));
    expect(host?.id).toBe(focused);
    expect(state.activeId).toBe(CHAT_TAB_ID);
  });

  it('re-opening chat keeps it inside its split leaf', () => {
    let state = threeLeafSplit();
    state = openOrActivateChat(state);
    const hostId = collectLeaves(state.layout).find((l) => l.tabIds.includes(CHAT_TAB_ID))!.id;
    // Move chat into another leaf, then re-activate via openOrActivateChat.
    const other = collectLeaves(state.layout).find((l) => l.id !== hostId)!;
    state = moveTabIntoLeaf(state, CHAT_TAB_ID, other.id);
    expect(collectLeaves(state.layout).find((l) => l.id === other.id)?.tabIds).toContain(
      CHAT_TAB_ID,
    );

    state = openOrActivateChat(state);
    expect(findOrphan(state, CHAT_TAB_ID)).toBe(false);
    expect(flattenTabIdsFromLayout(state.layout)).toContain(CHAT_TAB_ID);
    expect(
      collectLeaves(state.layout).find((l) => l.id === other.id)?.tabIds,
    ).toContain(CHAT_TAB_ID);
    expect(state.focusedPaneId).toBe(other.id);
    expect(state.activeId).toBe(CHAT_TAB_ID);
    expect(countLeaves(state.layout)).toBe(3);
  });

  it('openExportPdfForTab enables print on an orphan while split (focused leaf alone fails)', () => {
    let state = threeLeafSplit();
    state = openOrReplaceFileTab(state, fileInput('d.md'), Date.now(), { activate: true });
    const orphanId = state.tabs.find((t) => t.id.includes('d.md'))!.id;
    expect(findOrphan(state, orphanId)).toBe(true);

    const viaFocusedLeaf = openExportPdfInLeaf(state, state.focusedPaneId, orphanId);
    const focusedLeaf = collectLeaves(viaFocusedLeaf.layout).find(
      (l) => l.id === viaFocusedLeaf.focusedPaneId,
    );
    expect(focusedLeaf?.exportPdfForTabId ?? null).toBeNull();
    const orphanViaLeaf = viaFocusedLeaf.tabs.find((t) => t.id === orphanId);
    expect(isFileTab(orphanViaLeaf) && orphanViaLeaf.exportPdfOpen).toBeFalsy();

    state = openExportPdfForTab(state, orphanId);
    const orphanTab = state.tabs.find((t) => t.id === orphanId);
    expect(isFileTab(orphanTab) && orphanTab.exportPdfOpen).toBe(true);
    expect(findOrphan(state, orphanId)).toBe(true);
    expect(
      collectLeaves(state.layout).every((l) => (l.exportPdfForTabId ?? null) === null),
    ).toBe(true);

    state = clearOrphanExportPdf(state, orphanId);
    const cleared = state.tabs.find((t) => t.id === orphanId);
    expect(isFileTab(cleared) && cleared.exportPdfOpen).toBeFalsy();
  });

  it('openExportPdfForTab on an in-layout tab sets leaf exportPdfForTabId', () => {
    let state = threeLeafSplit();
    const inGroupId = state.tabs[0]!.id;
    state = activateTab(state, inGroupId);
    state = openExportPdfForTab(state, inGroupId);
    const host = findLeafContainingTab(state.layout, inGroupId);
    expect(host?.exportPdfForTabId).toBe(inGroupId);
    const tab = state.tabs.find((t) => t.id === inGroupId);
    expect(isFileTab(tab) && tab.exportPdfOpen).toBeFalsy();
  });
});
