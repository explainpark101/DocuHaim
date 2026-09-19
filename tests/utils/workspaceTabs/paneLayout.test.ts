import { describe, expect, it } from 'vitest';
import {
  addTabToFocusedLeaf,
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
    const leaf = createSingleLeafLayout(['a', 'b', 'c'], 'a');
    const split = splitLeaf(leaf, leaf.id, 'right', 'c')!;
    const rightId = collectLeaves(split.layout)[1]!.id;
    const moved = moveTabToLeaf(split.layout, 'b', rightId, { activate: true });
    const leaves = collectLeaves(moved.layout);
    expect(leaves[0]?.tabIds).toEqual(['a']);
    expect(leaves[1]?.tabIds).toEqual(['c', 'b']);
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
});
