import { describe, expect, it } from 'vitest';
import {
  addTabToFocusedLeaf,
  applyPersistedLayoutMembership,
  collapseLeafIntoSibling,
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  flattenTabIdsFromLayout,
  listOrphanTabIds,
  moveTabToLeaf,
  pruneLayoutToTabs,
  removeTabFromLayout,
  splitLeaf,
  syncLayoutPreservingOrphansWhenSplit,
  syncLayoutWithTabs,
  type PaneNode,
  type SplitLeafResult,
} from '@/utils/workspaceTabs/paneLayout';

function expectSplitOk(result: SplitLeafResult) {
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(result.reason);
  return result;
}

describe('paneLayout', () => {
  it('splits a leaf to the right and places the tab in the new leaf', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const result = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    expect(countLeaves(result.layout)).toBe(2);
    const leaves = collectLeaves(result.layout);
    expect(leaves[0]?.tabIds).toEqual(['a']);
    expect(leaves[1]?.tabIds).toEqual(['b']);
    expect(result.focusedPaneId).toBe(leaves[1]?.id);
  });

  it('groups tab ids by leaf order when flattened', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    expect(flattenTabIdsFromLayout(split.layout)).toEqual(['a', 'b']);
  });

  it('collapses empty leaf after remove', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    const after = removeTabFromLayout(split.layout, 'b');
    expect(countLeaves(after)).toBe(1);
    expect(flattenTabIdsFromLayout(after)).toEqual(['a']);
  });

  it('moves a tab between leaves', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    const leftId = collectLeaves(split.layout)[0]!.id;
    const rightId = collectLeaves(split.layout)[1]!.id;
    const withC = addTabToFocusedLeaf(split.layout, leftId, 'c', { activate: false });
    const moved = moveTabToLeaf(withC.layout, 'c', rightId, { activate: true });
    const leaves = collectLeaves(moved.layout);
    expect(leaves[0]?.tabIds).toEqual(['a']);
    expect(leaves[1]?.tabIds).toEqual(['b', 'c']);
  });

  it('syncs orphans into the focused leaf', () => {
    const leaf = createSingleLeafLayout(['a'], 'a');
    const synced = syncLayoutWithTabs(leaf, ['a', 'b'], leaf.id);
    expect(flattenTabIdsFromLayout(synced.layout)).toEqual(['a', 'b']);
  });

  it('adds a tab to the focused leaf', () => {
    const leaf = createSingleLeafLayout(['a'], 'a');
    const next = addTabToFocusedLeaf(leaf, leaf.id, 'b', { activate: true });
    expect(flattenTabIdsFromLayout(next.layout)).toEqual(['a', 'b']);
    expect(collectLeaves(next.layout)[0]?.activeId).toBe('b');
  });

  it('keeps sibling tabs in the host leaf when splitting', () => {
    const leaf = createSingleLeafLayout(['a', 'b', 'c'], 'b');
    const result = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'c'));
    const leaves = collectLeaves(result.layout);
    expect(leaves).toHaveLength(2);
    expect(leaves[0]?.tabIds).toEqual(['a', 'b']);
    expect(leaves[1]?.tabIds).toEqual(['c']);
    expect(flattenTabIdsFromLayout(result.layout)).toEqual(['a', 'b', 'c']);
  });

  it('allows nested splits up to the soft cap', () => {
    const cap = 4;
    const leaf = createSingleLeafLayout(['a', 'b', 'c', 'd'], 'a');
    const s1 = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b', cap));
    expect(countLeaves(s1.layout)).toBe(2);
    const hostA = collectLeaves(s1.layout).find((l) => l.tabIds.includes('a'))!;
    const s2 = expectSplitOk(splitLeaf(s1.layout, hostA.id, 'bottom', 'c', cap));
    expect(countLeaves(s2.layout)).toBe(3);
    const hostStillA = collectLeaves(s2.layout).find((l) => l.tabIds.includes('a'))!;
    const s3 = expectSplitOk(splitLeaf(s2.layout, hostStillA.id, 'left', 'd', cap));
    expect(countLeaves(s3.layout)).toBe(4);
    const blocked = splitLeaf(
      s3.layout,
      collectLeaves(s3.layout)[0]!.id,
      'right',
      'a',
      cap,
    );
    expect(blocked).toEqual({ ok: false, reason: 'soft-cap' });
  });

  it('prunes closed tabs without absorbing orphans while split', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    const pruned = pruneLayoutToTabs(split.layout, ['a', 'b', 'orphan'], split.focusedPaneId);
    expect(countLeaves(pruned.layout)).toBe(2);
    expect(flattenTabIdsFromLayout(pruned.layout)).toEqual(['a', 'b']);
    expect(listOrphanTabIds(['a', 'b', 'orphan'], pruned.layout)).toEqual(['orphan']);
  });

  it('preserves orphans when syncing a split layout', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    const synced = syncLayoutPreservingOrphansWhenSplit(
      split.layout,
      ['a', 'b', 'c'],
      split.focusedPaneId,
    );
    expect(countLeaves(synced.layout)).toBe(2);
    expect(flattenTabIdsFromLayout(synced.layout)).toEqual(['a', 'b']);
    expect(listOrphanTabIds(['a', 'b', 'c'], synced.layout)).toEqual(['c']);
  });

  it('does not dump first-pane tabs into the focused 2nd leaf on restore', () => {
    // Persisted: [a | b | c], focus on the rightmost leaf (c).
    let layout: PaneNode = createSingleLeafLayout(['a', 'b', 'c'], 'a');
    layout = expectSplitOk(splitLeaf(layout, layout.id, 'right', 'c')).layout;
    const left = collectLeaves(layout).find((l) => l.tabIds.includes('a'))!;
    layout = expectSplitOk(splitLeaf(layout, left.id, 'right', 'b')).layout;
    const leaves = collectLeaves(layout);
    expect(leaves).toHaveLength(3);
    const focusC = leaves.find((l) => l.tabIds.includes('c'))!.id;

    // Cold-start bug: syncLayoutWithTabs absorbed extras into the focused leaf.
    const absorbed = syncLayoutWithTabs(layout, ['a', 'b', 'c', 'extra'], focusC);
    const absorbedFocus = collectLeaves(absorbed.layout).find((l) => l.id === focusC);
    expect(absorbedFocus?.tabIds).toContain('extra');

    // Restore path must keep exact persisted homes (extra stays orphan).
    const restored = applyPersistedLayoutMembership(layout, ['a', 'b', 'c', 'extra'], focusC);
    expect(collectLeaves(restored.layout).map((l) => l.tabIds)).toEqual([
      ['a'],
      ['b'],
      ['c'],
    ]);
    expect(listOrphanTabIds(['a', 'b', 'c', 'extra'], restored.layout)).toEqual(['extra']);
    expect(restored.focusedPaneId).toBe(focusC);
  });

  it('re-homes tabs from a persisted tree even when live layout had them on the focused leaf', () => {
    let desired: PaneNode = createSingleLeafLayout(['a', 'b'], 'a');
    desired = expectSplitOk(splitLeaf(desired, desired.id, 'right', 'b')).layout;
    const [left, right] = collectLeaves(desired);
    // Simulate a bad live tree where both tabs sit on the focused (right) leaf.
    const corrupted = addTabToFocusedLeaf(desired, right!.id, 'a', { activate: false }).layout;
    expect(collectLeaves(corrupted).find((l) => l.id === right!.id)?.tabIds).toContain('a');

    // Apply from the desired persisted membership (not the corrupted live tree).
    const fixed = applyPersistedLayoutMembership(desired, ['a', 'b'], right!.id);
    expect(collectLeaves(fixed.layout).find((l) => l.id === left!.id)?.tabIds).toEqual(['a']);
    expect(collectLeaves(fixed.layout).find((l) => l.id === right!.id)?.tabIds).toEqual(['b']);
  });

  it('absorbs orphans when syncing a single-leaf layout', () => {
    const leaf = createSingleLeafLayout(['a'], 'a');
    const synced = syncLayoutPreservingOrphansWhenSplit(leaf, ['a', 'b'], leaf.id);
    expect(flattenTabIdsFromLayout(synced.layout)).toEqual(['a', 'b']);
  });

  it('collapses a leaf into its sibling and keeps tabs', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = expectSplitOk(splitLeaf(leaf, leaf.id, 'right', 'b'));
    const rightId = collectLeaves(split.layout)[1]!.id;
    const collapsed = collapseLeafIntoSibling(split.layout, rightId);
    expect(collapsed).not.toBeNull();
    expect(countLeaves(collapsed!.layout)).toBe(1);
    expect(flattenTabIdsFromLayout(collapsed!.layout).sort()).toEqual(['a', 'b']);
  });
});
