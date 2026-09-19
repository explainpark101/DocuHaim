import { describe, expect, it } from 'vitest';
import {
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  splitAtWorkspaceEdge,
  splitLeaf,
  type SplitLeafResult,
} from '@/utils/workspaceTabs/paneLayout';
import {
  insertAtWorkspaceEdge,
  relocateLeaf,
} from '@/utils/workspaceTabs/paneLayoutEdit';
import { workspaceOuterEdgeFromPoint } from '@/utils/workspaceTabs/paneDropGeometry';

function expectSplitOk(result: SplitLeafResult) {
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(result.reason);
  return result;
}

describe('workspaceOuterEdgeFromPoint', () => {
  const root = { left: 100, top: 50, right: 500, bottom: 450, width: 400, height: 400 };

  it('detects left outer band', () => {
    expect(workspaceOuterEdgeFromPoint(110, 200, root as DOMRect, 28)).toBe('left');
  });

  it('returns null away from edges', () => {
    expect(workspaceOuterEdgeFromPoint(300, 250, root as DOMRect, 28)).toBeNull();
  });
});

describe('splitAtWorkspaceEdge', () => {
  it('wraps a 2x2 layout into a full-height 2x2+1 strip', () => {
    let layout = createSingleLeafLayout(['a', 'b', 'c', 'd', 'e'], 'a');
    layout = expectSplitOk(splitLeaf(layout, layout.id, 'right', 'b')).layout;
    const left = collectLeaves(layout).find((l) => l.tabIds.includes('a'))!;
    layout = expectSplitOk(splitLeaf(layout, left.id, 'bottom', 'c')).layout;
    const right = collectLeaves(layout).find((l) => l.tabIds.includes('b'))!;
    layout = expectSplitOk(splitLeaf(layout, right.id, 'bottom', 'd')).layout;
    expect(countLeaves(layout)).toBe(4);

    const wrapped = expectSplitOk(splitAtWorkspaceEdge(layout, 'right', 'e', 8));
    expect(countLeaves(wrapped.layout)).toBe(5);
    expect(wrapped.layout.type).toBe('split');
    if (wrapped.layout.type !== 'split') return;
    expect(wrapped.layout.direction).toBe('horizontal');
    // New leaf is the right child (full height).
    const rightChild = wrapped.layout.children[1];
    expect(rightChild.type).toBe('leaf');
    if (rightChild.type !== 'leaf') return;
    expect(rightChild.tabIds).toEqual(['e']);
    // Left child keeps the previous 2x2 (4 leaves).
    expect(countLeaves(wrapped.layout.children[0])).toBe(4);
  });
});

describe('insertAtWorkspaceEdge / relocateLeaf workspaceEdge', () => {
  it('relocates a leaf to a full-width bottom strip', () => {
    let layout = createSingleLeafLayout(['a', 'b', 'c'], 'a');
    layout = expectSplitOk(splitLeaf(layout, layout.id, 'right', 'b')).layout;
    const left = collectLeaves(layout).find((l) => l.tabIds.includes('a'))!;
    layout = expectSplitOk(splitLeaf(layout, left.id, 'bottom', 'c')).layout;
    const source = collectLeaves(layout).find((l) => l.tabIds.includes('c'))!;
    const target = collectLeaves(layout).find((l) => l.tabIds.includes('b'))!;

    const moved = relocateLeaf(layout, source.id, target.id, 'bottom', {
      workspaceEdge: true,
    })!;
    expect(countLeaves(moved.layout)).toBe(3);
    expect(moved.layout.type).toBe('split');
    if (moved.layout.type !== 'split') return;
    expect(moved.layout.direction).toBe('vertical');
    const bottom = moved.layout.children[1];
    expect(bottom.type).toBe('leaf');
    if (bottom.type !== 'leaf') return;
    expect(bottom.tabIds).toEqual(['c']);
  });

  it('insertAtWorkspaceEdge wraps the tree', () => {
    const base = createSingleLeafLayout(['a'], 'a');
    const leaf = {
      type: 'leaf' as const,
      id: 'new',
      tabIds: ['b'],
      activeId: 'b',
      exportPdfForTabId: null,
    };
    const out = insertAtWorkspaceEdge(base, 'left', leaf)!;
    expect(out.layout.type).toBe('split');
    if (out.layout.type !== 'split') return;
    expect(out.layout.direction).toBe('horizontal');
    expect(out.layout.children[0]).toMatchObject({ id: 'new', tabIds: ['b'] });
  });
});
