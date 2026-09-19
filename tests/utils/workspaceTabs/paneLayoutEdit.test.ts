import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  createSingleLeafLayout,
  flattenTabIdsFromLayout,
  splitLeaf,
} from '@/utils/workspaceTabs/paneLayout';
import {
  applyFlipToDraft,
  applyLeafOrderToDraft,
  detachLeaf,
  draftFromLayout,
  remapLeafContentsByOrder,
  relocateLeaf,
  swapLeafContents,
} from '@/utils/workspaceTabs/paneLayoutEdit';

describe('paneLayoutEdit', () => {
  it('remaps leaf contents by ordered source ids while keeping structure ids', () => {
    const base = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(base, base.id, 'right', 'b')!;
    const leaves = collectLeaves(split.layout);
    const leftId = leaves[0]!.id;
    const rightId = leaves[1]!.id;

    const remapped = remapLeafContentsByOrder(split.layout, [rightId, leftId]);
    const next = collectLeaves(remapped);
    expect(next[0]?.id).toBe(leftId);
    expect(next[1]?.id).toBe(rightId);
    expect(next[0]?.tabIds).toEqual(['b']);
    expect(next[1]?.tabIds).toEqual(['a']);
  });

  it('swaps two leaf contents', () => {
    const base = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(base, base.id, 'right', 'b')!;
    const [left, right] = collectLeaves(split.layout);
    const swapped = swapLeafContents(split.layout, left!.id, right!.id);
    const next = collectLeaves(swapped);
    expect(next[0]?.tabIds).toEqual(['b']);
    expect(next[1]?.tabIds).toEqual(['a']);
  });

  it('relocateLeaf center swaps pane contents', () => {
    const base = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(base, base.id, 'right', 'b')!;
    const [left, right] = collectLeaves(split.layout);
    const moved = relocateLeaf(split.layout, left!.id, right!.id, 'center')!;
    const next = collectLeaves(moved.layout);
    expect(next[0]?.tabIds).toEqual(['b']);
    expect(next[1]?.tabIds).toEqual(['a']);
    expect(moved.focusedPaneId).toBe(right!.id);
  });

  it('relocateLeaf edge detaches and inserts beside target', () => {
    const base = createSingleLeafLayout(['a', 'b', 'c'], 'a');
    const s1 = splitLeaf(base, base.id, 'right', 'c')!;
    const left = collectLeaves(s1.layout)[0]!;
    const s2 = splitLeaf(s1.layout, left.id, 'bottom', 'b')!;
    const leaves = collectLeaves(s2.layout);
    expect(leaves).toHaveLength(3);
    const source = leaves.find((l) => l.tabIds.includes('c'))!;
    const target = leaves.find((l) => l.tabIds.includes('a'))!;
    const moved = relocateLeaf(s2.layout, source.id, target.id, 'left')!;
    const next = collectLeaves(moved.layout);
    expect(next).toHaveLength(3);
    expect(moved.focusedPaneId).toBe(source.id);
    const focused = next.find((l) => l.id === source.id);
    expect(focused?.tabIds).toEqual(['c']);
    // Source is now a left neighbor of the target branch.
    expect(flattenTabIdsFromLayout(moved.layout).includes('c')).toBe(true);
  });

  it('detachLeaf promotes sibling without merging tabs', () => {
    const base = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(base, base.id, 'right', 'b')!;
    const [left, right] = collectLeaves(split.layout);
    const detached = detachLeaf(split.layout, left!.id)!;
    expect(detached.leaf.tabIds).toEqual(left!.tabIds);
    expect(collectLeaves(detached.layout)).toHaveLength(1);
    expect(collectLeaves(detached.layout)[0]?.tabIds).toEqual(right!.tabIds);
  });

  it('flips split direction in a draft', () => {
    const base = createSingleLeafLayout(['a', 'b'], 'a');
    const split = splitLeaf(base, base.id, 'right', 'b')!;
    const draft = draftFromLayout(split.layout);
    const rootId = draft.layout.type === 'split' ? draft.layout.id : '';
    expect(draft.layout.type).toBe('split');
    if (draft.layout.type !== 'split') return;
    expect(draft.layout.direction).toBe('horizontal');
    const flipped = applyFlipToDraft(draft, rootId);
    expect(flipped.layout.type).toBe('split');
    if (flipped.layout.type !== 'split') return;
    expect(flipped.layout.direction).toBe('vertical');
  });

  it('applyLeafOrderToDraft remaps preview labels via content swap', () => {
    const base = createSingleLeafLayout(['a', 'b', 'c'], 'a');
    const s1 = splitLeaf(base, base.id, 'right', 'c')!;
    const left = collectLeaves(s1.layout)[0]!;
    const s2 = splitLeaf(s1.layout, left.id, 'right', 'b')!;
    const draft = draftFromLayout(s2.layout);
    const order = draft.leafOrder.slice().reverse();
    const next = applyLeafOrderToDraft(draft, order);
    const tabs = collectLeaves(next.layout).map((l) => l.tabIds[0]);
    expect(tabs).toEqual(order.map((id) => {
      const src = collectLeaves(draft.layout).find((l) => l.id === id);
      return src?.tabIds[0];
    }));
  });
});
