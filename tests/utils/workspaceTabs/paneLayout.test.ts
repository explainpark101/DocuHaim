import { describe, expect, it } from 'vitest';
import {
  addTabAsStandaloneLeaf,
  addTabToFocusedLeaf,
  collapseLeafIntoSibling,
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  flattenTabIdsFromLayout,
  moveTabToLeaf,
  removeTabFromLayout,
  splitLeaf,
  syncLayoutWithTabs,
} from '@/utils/workspaceTabs/paneLayout';

describe('paneLayout', () => {
  it('splits a leaf to the right and places the tab in the new leaf', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const result = splitLeaf(leaf, leaf.id, 'right', 'b');
    expect(result).not.toBeNull();
    expect(countLeaves(result!.layout)).toBe(2);
    const leaves = collectLeaves(result!.layout);
    expect(leaves[0]?.tabIds).toEqual(['a']);
    expect(leaves[1]?.tabIds).toEqual(['b']);
    expect(result!.focusedPaneId).toBe(leaves[1]?.id);
  });

  it('groups tab ids by leaf order when flattened', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(leaf, leaf.id, 'right', 'b')!;
    expect(flattenTabIdsFromLayout(split.layout)).toEqual(['a', 'b']);
  });

  it('collapses empty leaf after remove', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(leaf, leaf.id, 'right', 'b')!;
    const after = removeTabFromLayout(split.layout, 'b');
    expect(countLeaves(after)).toBe(1);
    expect(flattenTabIdsFromLayout(after)).toEqual(['a']);
  });

  it('moves a tab between leaves', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(leaf, leaf.id, 'right', 'b')!;
    // Add c into the left leaf (same group), then move to the right leaf.
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

  it('peels non-active tabs into standalone leaves when splitting', () => {
    const leaf = createSingleLeafLayout(['a', 'b', 'c'], 'b');
    const result = splitLeaf(leaf, leaf.id, 'right', 'c');
    expect(result).not.toBeNull();
    const leaves = collectLeaves(result!.layout);
    expect(leaves).toHaveLength(3);
    expect(leaves.map((l) => l.tabIds)).toEqual([['a'], ['b'], ['c']]);
    expect(flattenTabIdsFromLayout(result!.layout)).toEqual(['a', 'b', 'c']);
  });

  it('adds a standalone leaf ahead of an existing split', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(leaf, leaf.id, 'right', 'b')!;
    const next = addTabAsStandaloneLeaf(split.layout, split.focusedPaneId, 'c', {
      activate: true,
      side: 'before',
    });
    expect(collectLeaves(next.layout).map((l) => l.tabIds)).toEqual([['c'], ['a'], ['b']]);
    expect(next.focusedPaneId).toBe(collectLeaves(next.layout)[0]!.id);
  });

  it('collapses a leaf into its sibling and keeps tabs', () => {
    const leaf = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(leaf, leaf.id, 'right', 'b')!;
    const rightId = collectLeaves(split.layout)[1]!.id;
    const collapsed = collapseLeafIntoSibling(split.layout, rightId);
    expect(collapsed).not.toBeNull();
    expect(countLeaves(collapsed!.layout)).toBe(1);
    expect(flattenTabIdsFromLayout(collapsed!.layout).sort()).toEqual(['a', 'b']);
  });
});
