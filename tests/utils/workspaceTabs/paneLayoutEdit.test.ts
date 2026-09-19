import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  createSingleLeafLayout,
  splitLeaf,
} from '@/utils/workspaceTabs/paneLayout';
import {
  applyFlipToDraft,
  applyLeafOrderToDraft,
  draftFromLayout,
  remapLeafContentsByOrder,
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
