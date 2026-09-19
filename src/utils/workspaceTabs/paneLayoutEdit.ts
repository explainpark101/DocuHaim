import {
  collectLeaves,
  collapseEmptyLeaves,
  createPaneId,
  findLeaf,
  isPaneLeaf,
  type PaneLeaf,
  type PaneNode,
  type PaneSplitEdge,
} from '@/utils/workspaceTabs/paneLayout';

/** Remap leaf *content* into existing slots by ordered source leaf ids (structure preserved). */
export function remapLeafContentsByOrder(
  layout: PaneNode,
  orderedSourceLeafIds: string[],
): PaneNode {
  const current = collectLeaves(layout);
  const byId = new Map(current.map((leaf) => [leaf.id, leaf]));
  const remapped: PaneLeaf[] = [];
  for (const id of orderedSourceLeafIds) {
    const leaf = byId.get(id);
    if (leaf) remapped.push(leaf);
  }
  // Append any missing leaves (safety).
  for (const leaf of current) {
    if (!orderedSourceLeafIds.includes(leaf.id)) remapped.push(leaf);
  }
  let i = 0;
  const walk = (node: PaneNode): PaneNode => {
    if (node.type === 'leaf') {
      const src = remapped[i] ?? node;
      i += 1;
      return {
        type: 'leaf',
        id: node.id,
        tabIds: [...src.tabIds],
        activeId: src.activeId,
        exportPdfForTabId: src.exportPdfForTabId ?? null,
      };
    }
    return {
      ...node,
      children: [walk(node.children[0]), walk(node.children[1])],
    };
  };
  return walk(layout);
}

/** Swap two leaf contents (by leaf id) within the layout tree. */
export function swapLeafContents(
  layout: PaneNode,
  leafIdA: string,
  leafIdB: string,
): PaneNode {
  if (leafIdA === leafIdB) return layout;
  const leaves = collectLeaves(layout);
  const order = leaves.map((l) => l.id);
  const ia = order.indexOf(leafIdA);
  const ib = order.indexOf(leafIdB);
  if (ia < 0 || ib < 0) return layout;
  const next = order.slice();
  const tmp = next[ia]!;
  next[ia] = next[ib]!;
  next[ib] = tmp;
  return remapLeafContentsByOrder(layout, next);
}

function cloneLeaf(leaf: PaneLeaf): PaneLeaf {
  return {
    type: 'leaf',
    id: leaf.id,
    tabIds: [...leaf.tabIds],
    activeId: leaf.activeId,
    exportPdfForTabId: leaf.exportPdfForTabId ?? null,
  };
}

function edgeToSplit(
  edge: PaneSplitEdge,
): { direction: 'horizontal' | 'vertical'; placeNewFirst: boolean } {
  switch (edge) {
    case 'left':
      return { direction: 'horizontal', placeNewFirst: true };
    case 'right':
      return { direction: 'horizontal', placeNewFirst: false };
    case 'top':
      return { direction: 'vertical', placeNewFirst: true };
    case 'bottom':
      return { direction: 'vertical', placeNewFirst: false };
  }
}

/**
 * Remove a leaf from the tree and promote its sibling as-is (tabs stay on the
 * detached leaf — unlike collapseLeafIntoSibling which merges them).
 */
export function detachLeaf(
  layout: PaneNode,
  leafId: string,
): { layout: PaneNode; leaf: PaneLeaf } | null {
  if (layout.type === 'leaf') return null;
  const leaf = findLeaf(layout, leafId);
  if (!leaf) return null;

  const detach = (node: PaneNode): PaneNode | null => {
    if (node.type === 'leaf') return null;
    const [left, right] = node.children;
    if (left.type === 'leaf' && left.id === leafId) return right;
    if (right.type === 'leaf' && right.id === leafId) return left;
    const nextLeft = detach(left);
    if (nextLeft) return { ...node, children: [nextLeft, right] };
    const nextRight = detach(right);
    if (nextRight) return { ...node, children: [left, nextRight] };
    return null;
  };

  const next = detach(layout);
  if (!next) return null;
  return { layout: collapseEmptyLeaves(next), leaf: cloneLeaf(leaf) };
}

/** Insert `leaf` as a new split neighbor of `targetLeafId` toward `edge`. */
export function insertLeafAtEdge(
  layout: PaneNode,
  targetLeafId: string,
  edge: PaneSplitEdge,
  leaf: PaneLeaf,
): { layout: PaneNode; focusedPaneId: string } | null {
  if (!findLeaf(layout, targetLeafId)) return null;
  if (findLeaf(layout, leaf.id)) return null;
  const { direction, placeNewFirst } = edgeToSplit(edge);
  const moving = cloneLeaf(leaf);

  const replace = (node: PaneNode): PaneNode => {
    if (node.type === 'leaf') {
      if (node.id !== targetLeafId) return node;
      const children: [PaneNode, PaneNode] = placeNewFirst
        ? [moving, node]
        : [node, moving];
      return {
        type: 'split',
        id: createPaneId('split'),
        direction,
        ratio: 0.5,
        children,
      };
    }
    return {
      ...node,
      children: [replace(node.children[0]), replace(node.children[1])],
    };
  };

  return {
    layout: collapseEmptyLeaves(replace(layout)),
    focusedPaneId: moving.id,
  };
}

/**
 * Relocate a whole pane via header drag.
 * - center → swap leaf contents with the target
 * - edge → detach source leaf and insert beside the target toward that edge
 */
export function relocateLeaf(
  layout: PaneNode,
  sourceLeafId: string,
  targetLeafId: string,
  zone: PaneSplitEdge | 'center',
): { layout: PaneNode; focusedPaneId: string } | null {
  if (sourceLeafId === targetLeafId) return null;
  if (!findLeaf(layout, sourceLeafId) || !findLeaf(layout, targetLeafId)) return null;

  if (zone === 'center') {
    const swapped = swapLeafContents(layout, sourceLeafId, targetLeafId);
    if (swapped === layout) return null;
    return { layout: swapped, focusedPaneId: targetLeafId };
  }

  const detached = detachLeaf(layout, sourceLeafId);
  if (!detached) return null;
  // Target may have been the sibling that was promoted; id is preserved.
  if (!findLeaf(detached.layout, targetLeafId)) return null;
  return insertLeafAtEdge(detached.layout, targetLeafId, zone, detached.leaf);
}

export function flipSplitDirection(layout: PaneNode, splitId: string): PaneNode {
  if (layout.type === 'leaf') return layout;
  if (layout.id === splitId) {
    return {
      ...layout,
      direction: layout.direction === 'horizontal' ? 'vertical' : 'horizontal',
    };
  }
  return {
    ...layout,
    children: [
      flipSplitDirection(layout.children[0], splitId),
      flipSplitDirection(layout.children[1], splitId),
    ],
  };
}

/** Rebuild a balanced binary tree from ordered leaves, preferring `direction`. */
export function buildBalancedLayoutFromLeaves(
  leaves: PaneLeaf[],
  direction: 'horizontal' | 'vertical' = 'horizontal',
): PaneNode {
  if (leaves.length === 0) {
    return {
      type: 'leaf',
      id: createPaneId('leaf'),
      tabIds: [],
      activeId: null,
      exportPdfForTabId: null,
    };
  }
  if (leaves.length === 1) {
    const only = leaves[0]!;
    return { ...only };
  }
  const mid = Math.ceil(leaves.length / 2);
  const left = buildBalancedLayoutFromLeaves(
    leaves.slice(0, mid),
    direction === 'horizontal' ? 'vertical' : 'horizontal',
  );
  const right = buildBalancedLayoutFromLeaves(
    leaves.slice(mid),
    direction === 'horizontal' ? 'vertical' : 'horizontal',
  );
  return {
    type: 'split',
    id: createPaneId('split'),
    direction,
    ratio: 0.5,
    children: [left, right],
  };
}

export function clonePaneNode(node: PaneNode): PaneNode {
  if (node.type === 'leaf') {
    return {
      type: 'leaf',
      id: node.id,
      tabIds: [...node.tabIds],
      activeId: node.activeId,
      exportPdfForTabId: node.exportPdfForTabId ?? null,
    };
  }
  return {
    type: 'split',
    id: node.id,
    direction: node.direction,
    ratio: node.ratio,
    children: [clonePaneNode(node.children[0]), clonePaneNode(node.children[1])],
  };
}

export function countSplits(node: PaneNode): number {
  if (isPaneLeaf(node)) return 0;
  return 1 + countSplits(node.children[0]) + countSplits(node.children[1]);
}

export type PaneLayoutDraft = {
  layout: PaneNode;
  /** Display order of leaf ids for sortable list. */
  leafOrder: string[];
};

export function draftFromLayout(layout: PaneNode): PaneLayoutDraft {
  const cloned = clonePaneNode(layout);
  return {
    layout: cloned,
    leafOrder: collectLeaves(cloned).map((l) => l.id),
  };
}

export function applyLeafOrderToDraft(draft: PaneLayoutDraft, leafOrder: string[]): PaneLayoutDraft {
  const layout = remapLeafContentsByOrder(draft.layout, leafOrder);
  return {
    layout,
    leafOrder: collectLeaves(layout).map((l) => l.id),
  };
}

export function applySwapToDraft(
  draft: PaneLayoutDraft,
  a: string,
  b: string,
): PaneLayoutDraft {
  const layout = swapLeafContents(draft.layout, a, b);
  return {
    layout,
    leafOrder: collectLeaves(layout).map((l) => l.id),
  };
}

export function applyFlipToDraft(draft: PaneLayoutDraft, splitId: string): PaneLayoutDraft {
  const layout = flipSplitDirection(draft.layout, splitId);
  return {
    layout,
    leafOrder: collectLeaves(layout).map((l) => l.id),
  };
}

/** Prefer splitting relative to the leaf that currently holds `tabId`. */
export function resolveSplitHostLeafId(
  layout: PaneNode,
  tabId: string,
  focusedPaneId: string | null,
): string | null {
  const leaves = collectLeaves(layout);
  const host = leaves.find((l) => l.tabIds.includes(tabId));
  if (host) return host.id;
  if (focusedPaneId && leaves.some((l) => l.id === focusedPaneId)) return focusedPaneId;
  return leaves[0]?.id ?? null;
}

export type { PaneSplitEdge };
