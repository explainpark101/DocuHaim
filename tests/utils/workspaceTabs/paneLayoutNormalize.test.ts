import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  createSingleLeafLayout,
  countLeaves,
  type PaneLeaf,
  type PaneNode,
  type PaneSplit,
} from '@/utils/workspaceTabs/paneLayout';
import {
  collectLinkedAlignedSplitIds,
  normalizeAfterSnappedResize,
  normalizeAlignedTwoByTwo,
  resizeSplitLinked,
  syncSiblingSplitRatio,
  tryTransposeAlignedTwoByTwo,
} from '@/utils/workspaceTabs/paneLayoutNormalize';

function leaf(id: string, tab: string): PaneLeaf {
  return {
    type: 'leaf',
    id,
    tabIds: [tab],
    activeId: tab,
    exportPdfForTabId: null,
  };
}

/** H(V(tl,bl), V(tr,br)) — two columns. */
function columnMajor2x2(vRatio = 0.4, hRatio = 0.55): PaneSplit {
  return {
    type: 'split',
    id: 'outer',
    direction: 'horizontal',
    ratio: hRatio,
    children: [
      {
        type: 'split',
        id: 'leftCol',
        direction: 'vertical',
        ratio: vRatio,
        children: [leaf('tl', 'a'), leaf('bl', 'b')],
      },
      {
        type: 'split',
        id: 'rightCol',
        direction: 'vertical',
        ratio: vRatio,
        children: [leaf('tr', 'c'), leaf('br', 'd')],
      },
    ],
  };
}

describe('tryTransposeAlignedTwoByTwo', () => {
  it('flips column-major 2x2 to row-major when vertical ratios match', () => {
    const src = columnMajor2x2(0.4, 0.55);
    const out = tryTransposeAlignedTwoByTwo(src);
    expect(out).not.toBeNull();
    expect(out!.direction).toBe('vertical');
    expect(out!.ratio).toBeCloseTo(0.4);
    expect(out!.children[0]!.type).toBe('split');
    expect(out!.children[1]!.type).toBe('split');
    if (out!.children[0]!.type !== 'split' || out!.children[1]!.type !== 'split') return;
    expect(out!.children[0].direction).toBe('horizontal');
    expect(out!.children[0].ratio).toBeCloseTo(0.55);
    expect(out!.children[1].ratio).toBeCloseTo(0.55);
    // TL TR / BL BR order
    const top = collectLeaves(out!.children[0]).map((l) => l.id);
    const bottom = collectLeaves(out!.children[1]).map((l) => l.id);
    expect(top).toEqual(['tl', 'tr']);
    expect(bottom).toEqual(['bl', 'br']);
  });

  it('returns null when sibling ratios diverge', () => {
    const src = columnMajor2x2(0.4, 0.55);
    (src.children[1] as PaneSplit).ratio = 0.7;
    expect(tryTransposeAlignedTwoByTwo(src)).toBeNull();
  });
});

describe('normalizeAlignedTwoByTwo', () => {
  it('is a no-op for a single split', () => {
    const a = createSingleLeafLayout(['a'], 'a');
    const b = createSingleLeafLayout(['b'], 'b');
    const layout: PaneNode = {
      type: 'split',
      id: 's',
      direction: 'horizontal',
      ratio: 0.5,
      children: [a, b],
    };
    expect(normalizeAlignedTwoByTwo(layout)).toBe(layout);
  });

  it('normalizes a snapped 2x2 so the shared edge is the outer split', () => {
    const src = columnMajor2x2(0.42, 0.5);
    const out = normalizeAlignedTwoByTwo(src);
    expect(out.type).toBe('split');
    if (out.type !== 'split') return;
    expect(out.direction).toBe('vertical');
    expect(countLeaves(out)).toBe(4);
  });
});

describe('syncSiblingSplitRatio', () => {
  it('copies ratio onto the orthogonal sibling nest', () => {
    const src = columnMajor2x2(0.3, 0.5);
    (src.children[1] as PaneSplit).ratio = 0.3;
    const synced = syncSiblingSplitRatio(src, 'leftCol', 0.45);
    expect((synced as PaneSplit).children[0]).toMatchObject({ id: 'leftCol', ratio: 0.45 });
    expect((synced as PaneSplit).children[1]).toMatchObject({ id: 'rightCol', ratio: 0.45 });
  });
});

describe('resizeSplitLinked', () => {
  it('with linkAligned syncs the spanning sibling sash', () => {
    const src = columnMajor2x2(0.3, 0.55);
    (src.children[1] as PaneSplit).ratio = 0.7;
    const out = resizeSplitLinked(src, 'leftCol', 0.4, true);
    expect((out as PaneSplit).children[0]).toMatchObject({ id: 'leftCol', ratio: 0.4 });
    expect((out as PaneSplit).children[1]).toMatchObject({ id: 'rightCol', ratio: 0.4 });
  });

  it('without linkAligned only moves the dragged sash', () => {
    const src = columnMajor2x2(0.3, 0.55);
    (src.children[1] as PaneSplit).ratio = 0.7;
    const out = resizeSplitLinked(src, 'leftCol', 0.4, false);
    expect((out as PaneSplit).children[0]).toMatchObject({ id: 'leftCol', ratio: 0.4 });
    expect((out as PaneSplit).children[1]).toMatchObject({ id: 'rightCol', ratio: 0.7 });
  });
});

describe('collectLinkedAlignedSplitIds', () => {
  it('returns both ids in a 2x2 nest', () => {
    const src = columnMajor2x2();
    expect(collectLinkedAlignedSplitIds(src, 'leftCol').sort()).toEqual(
      ['leftCol', 'rightCol'].sort(),
    );
  });

  it('returns only the id when not in an orthogonal nest', () => {
    const src = columnMajor2x2();
    expect(collectLinkedAlignedSplitIds(src, 'outer')).toEqual(['outer']);
  });
});

describe('normalizeAfterSnappedResize', () => {
  it('syncs sibling then promotes snapped axis to outer sash', () => {
    const src = columnMajor2x2(0.3, 0.55);
    (src.children[1] as PaneSplit).ratio = 0.42;
    // User snapped leftCol to 0.42 (matching right after sync from current ratio).
    (src.children[0] as PaneSplit).ratio = 0.42;
    const out = normalizeAfterSnappedResize(src, 'leftCol');
    expect(out.type).toBe('split');
    if (out.type !== 'split') return;
    expect(out.direction).toBe('vertical');
    expect(out.ratio).toBeCloseTo(0.42);
    expect(out.children[0]!.type).toBe('split');
    expect(out.children[1]!.type).toBe('split');
    if (out.children[0]!.type !== 'split' || out.children[1]!.type !== 'split') return;
    expect(out.children[0].direction).toBe('horizontal');
    expect(out.children[0].ratio).toBeCloseTo(0.55);
    expect(out.children[1].ratio).toBeCloseTo(0.55);
    expect(collectLeaves(out.children[0]).map((l) => l.id)).toEqual(['tl', 'tr']);
    expect(collectLeaves(out.children[1]).map((l) => l.id)).toEqual(['bl', 'br']);
  });

  it('does not flip when resizing the already-outer sash', () => {
    const src = columnMajor2x2(0.4, 0.55);
    const out = normalizeAfterSnappedResize(src, 'outer');
    expect(out).toBe(src);
  });

  it('does not flip when sibling ratios are still far apart', () => {
    const src = columnMajor2x2(0.3, 0.55);
    (src.children[1] as PaneSplit).ratio = 0.7;
    const out = normalizeAfterSnappedResize(src, 'leftCol');
    expect(out).toBe(src);
  });
});
