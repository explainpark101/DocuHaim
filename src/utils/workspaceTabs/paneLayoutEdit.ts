import {
  collectLeaves,
  createPaneId,
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
  const left = buildBalancedLayoutFromLeaves(leaves.slice(0, mid), direction === 'horizontal' ? 'vertical' : 'horizontal');
  const right = buildBalancedLayoutFromLeaves(leaves.slice(mid), direction === 'horizontal' ? 'vertical' : 'horizontal');
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
