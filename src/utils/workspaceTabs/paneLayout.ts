import {
  clampWorkspacePaneSoftCap,
  loadWorkspacePaneSoftCap,
  WORKSPACE_PANE_SOFT_CAP_DEFAULT,
} from '@/utils/workspaceTabsSettings';

/** @deprecated Prefer `loadWorkspacePaneSoftCap()` — kept as default alias. */
export const WORKSPACE_PANE_SOFT_CAP = WORKSPACE_PANE_SOFT_CAP_DEFAULT;

function resolveSoftCap(softCap?: number): number {
  return softCap != null ? clampWorkspacePaneSoftCap(softCap) : loadWorkspacePaneSoftCap();
}

/**
 * Size of the new leaf when splitting toward an edge (matches 33% drop zones).
 * Left/top: first child = this ratio. Right/bottom: first child = 1 - this ratio.
 */
export const PANE_EDGE_SPLIT_RATIO = 1 / 3;

/** Tab-strip droppable: leave the split group (become orphan / full window). */
export const WORKSPACE_TAB_ORPHAN_ZONE_ID = '__workspace_tab_orphan_zone__';

/** Tab-strip droppable: join the focused split leaf group. */
export const WORKSPACE_TAB_GROUP_ZONE_ID = '__workspace_tab_group_zone__';

export type PaneSplitEdge = 'left' | 'right' | 'top' | 'bottom';

export type PaneLeaf = {
  type: 'leaf';
  id: string;
  tabIds: string[];
  activeId: string | null;
  /** File tab in this leaf showing ExportPDFPage instead of editor. */
  exportPdfForTabId?: string | null;
};

export type PaneSplit = {
  type: 'split';
  id: string;
  /** `horizontal` = left/right (row). `vertical` = top/bottom (column). */
  direction: 'horizontal' | 'vertical';
  /** First child size as fraction of parent (0..1). */
  ratio: number;
  children: [PaneNode, PaneNode];
};

export type PaneNode = PaneLeaf | PaneSplit;

export type PersistedPaneLeaf = {
  type: 'leaf';
  id: string;
  tabIds: string[];
  activeId: string | null;
};

export type PersistedPaneSplit = {
  type: 'split';
  id: string;
  direction: 'horizontal' | 'vertical';
  ratio: number;
  children: [PersistedPaneNode, PersistedPaneNode];
};

export type PersistedPaneNode = PersistedPaneLeaf | PersistedPaneSplit;

let paneIdSeq = 0;

export function createPaneId(prefix = 'pane'): string {
  paneIdSeq += 1;
  return `${prefix}-${paneIdSeq}-${Date.now().toString(36)}`;
}

export function createEmptyLeaf(id?: string): PaneLeaf {
  return {
    type: 'leaf',
    id: id ?? createPaneId('leaf'),
    tabIds: [],
    activeId: null,
    exportPdfForTabId: null,
  };
}

export function createSingleLeafLayout(tabIds: string[] = [], activeId: string | null = null): PaneLeaf {
  return {
    type: 'leaf',
    id: createPaneId('leaf'),
    tabIds: [...tabIds],
    activeId: activeId && tabIds.includes(activeId) ? activeId : (tabIds[0] ?? null),
    exportPdfForTabId: null,
  };
}

export function isPaneLeaf(node: PaneNode | null | undefined): node is PaneLeaf {
  return node?.type === 'leaf';
}

export function isPaneSplit(node: PaneNode | null | undefined): node is PaneSplit {
  return node?.type === 'split';
}

/** Depth-first list of leaf panes (left-to-right / top-to-bottom). */
export function collectLeaves(node: PaneNode): PaneLeaf[] {
  if (node.type === 'leaf') return [node];
  return [...collectLeaves(node.children[0]), ...collectLeaves(node.children[1])];
}

export function countLeaves(node: PaneNode): number {
  return collectLeaves(node).length;
}

export function findLeaf(node: PaneNode, leafId: string): PaneLeaf | null {
  if (node.type === 'leaf') return node.id === leafId ? node : null;
  return findLeaf(node.children[0], leafId) ?? findLeaf(node.children[1], leafId);
}

export function findLeafContainingTab(node: PaneNode, tabId: string): PaneLeaf | null {
  if (node.type === 'leaf') return node.tabIds.includes(tabId) ? node : null;
  return findLeafContainingTab(node.children[0], tabId) ?? findLeafContainingTab(node.children[1], tabId);
}

/** Flatten leaf tab ids in display order for the single tab strip. */
export function flattenTabIdsFromLayout(node: PaneNode): string[] {
  return collectLeaves(node).flatMap((leaf) => leaf.tabIds);
}

function mapLeaf(
  node: PaneNode,
  leafId: string,
  mapper: (leaf: PaneLeaf) => PaneLeaf,
): PaneNode {
  if (node.type === 'leaf') {
    return node.id === leafId ? mapper(node) : node;
  }
  return {
    ...node,
    children: [
      mapLeaf(node.children[0], leafId, mapper),
      mapLeaf(node.children[1], leafId, mapper),
    ],
  };
}

function mapAllLeaves(node: PaneNode, mapper: (leaf: PaneLeaf) => PaneLeaf): PaneNode {
  if (node.type === 'leaf') return mapper(node);
  return {
    ...node,
    children: [mapAllLeaves(node.children[0], mapper), mapAllLeaves(node.children[1], mapper)],
  };
}

function clampRatio(ratio: number): number {
  if (!Number.isFinite(ratio)) return 0.5;
  return Math.min(0.85, Math.max(0.15, ratio));
}

export function resizeSplit(node: PaneNode, splitId: string, ratio: number): PaneNode {
  if (node.type === 'leaf') return node;
  if (node.id === splitId) {
    return { ...node, ratio: clampRatio(ratio) };
  }
  return {
    ...node,
    children: [
      resizeSplit(node.children[0], splitId, ratio),
      resizeSplit(node.children[1], splitId, ratio),
    ],
  };
}

export function setLeafActive(node: PaneNode, leafId: string, activeId: string | null): PaneNode {
  return mapLeaf(node, leafId, (leaf) => ({
    ...leaf,
    activeId: activeId && leaf.tabIds.includes(activeId) ? activeId : leaf.activeId,
  }));
}

export function setLeafExportPdf(
  node: PaneNode,
  leafId: string,
  exportPdfForTabId: string | null,
): PaneNode {
  return mapLeaf(node, leafId, (leaf) => ({
    ...leaf,
    exportPdfForTabId:
      exportPdfForTabId && leaf.tabIds.includes(exportPdfForTabId) ? exportPdfForTabId : null,
  }));
}

export function clearAllExportPdf(node: PaneNode): PaneNode {
  return mapAllLeaves(node, (leaf) =>
    leaf.exportPdfForTabId ? { ...leaf, exportPdfForTabId: null } : leaf,
  );
}

/** Remove a tab id from every leaf; collapse empty leaves. */
export function removeTabFromLayout(node: PaneNode, tabId: string): PaneNode {
  const stripped = stripTabId(node, tabId);
  return collapseEmptyLeaves(stripped);
}

function stripTabId(node: PaneNode, tabId: string): PaneNode {
  if (node.type === 'leaf') {
    const tabIds = node.tabIds.filter((id) => id !== tabId);
    let activeId = node.activeId;
    if (activeId === tabId) {
      activeId = tabIds[0] ?? null;
    }
    const exportPdfForTabId =
      node.exportPdfForTabId === tabId ? null : (node.exportPdfForTabId ?? null);
    return { ...node, tabIds, activeId, exportPdfForTabId };
  }
  return {
    ...node,
    children: [stripTabId(node.children[0], tabId), stripTabId(node.children[1], tabId)],
  };
}

/**
 * Collapse empty leaf siblings into the remaining side.
 * If both empty under a split, keep a single empty leaf.
 */
export function collapseEmptyLeaves(node: PaneNode): PaneNode {
  if (node.type === 'leaf') return node;

  const left = collapseEmptyLeaves(node.children[0]);
  const right = collapseEmptyLeaves(node.children[1]);

  const leftEmpty = isPaneLeaf(left) && left.tabIds.length === 0;
  const rightEmpty = isPaneLeaf(right) && right.tabIds.length === 0;

  if (leftEmpty && rightEmpty) {
    return createEmptyLeaf(left.id);
  }
  if (leftEmpty && !rightEmpty) return right;
  if (rightEmpty && !leftEmpty) return left;

  if (left === node.children[0] && right === node.children[1]) return node;
  return { ...node, children: [left, right] };
}

/** Append tab ids into the first DFS leaf of `node`. */
function appendTabsToFirstLeaf(
  node: PaneNode,
  tabIds: string[],
  activeId: string | null,
): PaneNode {
  if (node.type === 'leaf') {
    const merged = [...node.tabIds];
    for (const id of tabIds) {
      if (!merged.includes(id)) merged.push(id);
    }
    return {
      ...node,
      tabIds: merged,
      activeId:
        activeId && merged.includes(activeId)
          ? activeId
          : (node.activeId ?? merged[0] ?? null),
    };
  }
  return {
    ...node,
    children: [appendTabsToFirstLeaf(node.children[0], tabIds, activeId), node.children[1]],
  };
}

/**
 * Remove a leaf pane from the split: move its tabs into the sibling side and
 * collapse the empty branch. Returns null when the layout is already a single leaf
 * or `leafId` is missing.
 */
export function collapseLeafIntoSibling(
  layout: PaneNode,
  leafId: string,
): { layout: PaneNode; focusedPaneId: string } | null {
  if (layout.type === 'leaf') return null;
  const target = findLeaf(layout, leafId);
  if (!target) return null;

  const collapse = (node: PaneNode): PaneNode | null => {
    if (node.type === 'leaf') return null;
    const [left, right] = node.children;
    if (left.type === 'leaf' && left.id === leafId) {
      return appendTabsToFirstLeaf(right, left.tabIds, left.activeId);
    }
    if (right.type === 'leaf' && right.id === leafId) {
      return appendTabsToFirstLeaf(left, right.tabIds, right.activeId);
    }
    const nextLeft = collapse(left);
    if (nextLeft) return { ...node, children: [nextLeft, right] };
    const nextRight = collapse(right);
    if (nextRight) return { ...node, children: [left, nextRight] };
    return null;
  };

  const next = collapse(layout);
  if (!next) return null;
  const collapsed = collapseEmptyLeaves(next);
  const keepActive = target.activeId;
  const focusLeaf =
    (keepActive && findLeafContainingTab(collapsed, keepActive)) ||
    collectLeaves(collapsed)[0] ||
    null;
  const focusedPaneId = focusLeaf?.id ?? createEmptyLeaf().id;
  return { layout: collapsed, focusedPaneId };
}

/** Ensure every tab id appears in exactly one leaf; orphans go to focused (or first) leaf. */
export function syncLayoutWithTabs(
  layout: PaneNode,
  tabIds: string[],
  focusedPaneId: string | null,
): { layout: PaneNode; focusedPaneId: string } {
  const pruned = pruneLayoutToTabs(layout, tabIds, focusedPaneId);
  let next = pruned.layout;
  const present = new Set(flattenTabIdsFromLayout(next));
  const orphans = tabIds.filter((id) => !present.has(id));
  if (orphans.length > 0) {
    const leaves = collectLeaves(next);
    const target =
      (pruned.focusedPaneId && leaves.find((l) => l.id === pruned.focusedPaneId)) || leaves[0];
    if (target) {
      next = mapLeaf(next, target.id, (leaf) => {
        const tabIdsNext = [...leaf.tabIds, ...orphans];
        return {
          ...leaf,
          tabIds: tabIdsNext,
          activeId: leaf.activeId ?? orphans[0] ?? null,
        };
      });
    } else {
      next = createSingleLeafLayout(tabIds, tabIds[0] ?? null);
    }
  }

  const leaves = collectLeaves(next);
  let focus =
    pruned.focusedPaneId && leaves.some((l) => l.id === pruned.focusedPaneId)
      ? pruned.focusedPaneId
      : null;
  if (!focus) {
    focus = leaves[0]?.id ?? createEmptyLeaf().id;
    if (leaves.length === 0) {
      next = createEmptyLeaf(focus);
    }
  }
  return { layout: next, focusedPaneId: focus };
}

/**
 * While split, keep orphans outside the pane tree; when unsplit, absorb everyone.
 * Used by persistence and store sync so drag-out / full-window tabs survive restarts.
 */
export function syncLayoutPreservingOrphansWhenSplit(
  layout: PaneNode,
  tabIds: string[],
  focusedPaneId: string | null,
): { layout: PaneNode; focusedPaneId: string } {
  if (countLeaves(layout) > 1) {
    return pruneLayoutToTabs(layout, tabIds, focusedPaneId);
  }
  return syncLayoutWithTabs(layout, tabIds, focusedPaneId);
}

/** Tab ids present in `tabs` but not in any leaf (full-window / outside group). */
export function listOrphanTabIds(tabIds: string[], layout: PaneNode): string[] {
  const inLayout = new Set(flattenTabIdsFromLayout(layout));
  return tabIds.filter((id) => !inLayout.has(id));
}

/**
 * Drop tabs that no longer exist from the layout, but do NOT pull orphans in.
 * Used while split so "outside group" tabs can stay out of the pane tree.
 */
export function pruneLayoutToTabs(
  layout: PaneNode,
  tabIds: string[],
  focusedPaneId: string | null,
): { layout: PaneNode; focusedPaneId: string } {
  const tabSet = new Set(tabIds);
  let next = mapAllLeaves(layout, (leaf) => {
    const kept = leaf.tabIds.filter((id) => tabSet.has(id));
    let activeId = leaf.activeId;
    if (activeId && !kept.includes(activeId)) {
      activeId = kept[0] ?? null;
    }
    const exportPdfForTabId =
      leaf.exportPdfForTabId && kept.includes(leaf.exportPdfForTabId)
        ? leaf.exportPdfForTabId
        : null;
    return { ...leaf, tabIds: kept, activeId, exportPdfForTabId };
  });
  next = collapseEmptyLeaves(next);

  const leaves = collectLeaves(next);
  let focus = focusedPaneId && leaves.some((l) => l.id === focusedPaneId) ? focusedPaneId : null;
  if (!focus) {
    focus = leaves[0]?.id ?? createEmptyLeaf().id;
    if (leaves.length === 0) {
      next = createEmptyLeaf(focus);
    }
  }
  return { layout: next, focusedPaneId: focus };
}

export function addTabToFocusedLeaf(
  layout: PaneNode,
  focusedPaneId: string,
  tabId: string,
  opts?: { activate?: boolean },
): { layout: PaneNode; focusedPaneId: string } {
  const activate = opts?.activate !== false;
  // Remove from other leaves first (singleton placement).
  let next = removeTabFromLayout(layout, tabId);
  const leaves = collectLeaves(next);
  const target = leaves.find((l) => l.id === focusedPaneId) ?? leaves[0];
  if (!target) {
    const leaf = createSingleLeafLayout([tabId], tabId);
    return { layout: leaf, focusedPaneId: leaf.id };
  }
  next = mapLeaf(next, target.id, (leaf) => {
    if (leaf.tabIds.includes(tabId)) {
      return activate ? { ...leaf, activeId: tabId } : leaf;
    }
    return {
      ...leaf,
      tabIds: [...leaf.tabIds, tabId],
      activeId: activate ? tabId : leaf.activeId,
    };
  });
  return { layout: next, focusedPaneId: target.id };
}

/**
 * Attach `leaf` as a sibling of the entire current tree (new top-level split).
 * `before` places it first in tab-strip / DFS order (standalone tab ahead of split groups).
 */
export function attachLeafBesideRoot(
  layout: PaneNode,
  leaf: PaneLeaf,
  side: 'before' | 'after' = 'before',
): PaneNode {
  const children: [PaneNode, PaneNode] =
    side === 'before' ? [leaf, layout] : [layout, leaf];
  return {
    type: 'split',
    id: createPaneId('split'),
    direction: 'horizontal',
    ratio: side === 'before' ? 0.35 : 0.65,
    children,
  };
}

/**
 * Place a tab in its own leaf beside the current layout (not into a focused split group).
 * Falls back to the focused leaf when the pane soft cap would be exceeded.
 */
export function addTabAsStandaloneLeaf(
  layout: PaneNode,
  focusedPaneId: string,
  tabId: string,
  opts?: { activate?: boolean; side?: 'before' | 'after'; softCap?: number },
): { layout: PaneNode; focusedPaneId: string } {
  const activate = opts?.activate !== false;
  const side = opts?.side ?? 'before';
  const softCap = resolveSoftCap(opts?.softCap);
  let next = removeTabFromLayout(layout, tabId);
  if (countLeaves(next) >= softCap) {
    return addTabToFocusedLeaf(next, focusedPaneId, tabId, { activate });
  }
  const leaf = createSingleLeafLayout([tabId], activate ? tabId : null);
  next = attachLeafBesideRoot(next, leaf, side);
  return {
    layout: next,
    focusedPaneId: activate ? leaf.id : focusedPaneId,
  };
}

/**
 * Peel extra tabs out of a leaf, keeping only `keepTabId`.
 * Extras become standalone leaves ahead of the tree (tab-strip order).
 * Kept for optional callers; splitLeaf no longer uses this (soft-cap friendly).
 */
export function peelExtrasAsStandaloneLeaves(
  layout: PaneNode,
  leafId: string,
  keepTabId: string,
  softCap?: number,
): PaneNode {
  const cap = resolveSoftCap(softCap);
  const host = findLeaf(layout, leafId);
  if (!host) return layout;
  const extras = host.tabIds.filter((id) => id !== keepTabId);
  if (extras.length === 0) return layout;

  let next = mapLeaf(layout, leafId, (leaf) => ({
    ...leaf,
    tabIds: leaf.tabIds.includes(keepTabId) ? [keepTabId] : leaf.tabIds.slice(0, 1),
    activeId: leaf.tabIds.includes(keepTabId)
      ? keepTabId
      : (leaf.tabIds[0] ?? null),
    exportPdfForTabId:
      leaf.exportPdfForTabId === keepTabId ? keepTabId : null,
  }));

  // Preserve prior strip order: earliest extras first (leftmost).
  for (let i = extras.length - 1; i >= 0; i -= 1) {
    const extraId = extras[i];
    if (!extraId) continue;
    if (countLeaves(next) >= cap) {
      // Soft cap: put remaining extras back into the host leaf.
      const rest = extras.slice(0, i + 1);
      next = mapLeaf(next, leafId, (leaf) => ({
        ...leaf,
        tabIds: [...rest, ...leaf.tabIds],
        activeId: leaf.activeId ?? keepTabId,
      }));
      break;
    }
    const leaf = createSingleLeafLayout([extraId], extraId);
    next = attachLeafBesideRoot(next, leaf, 'before');
  }
  return next;
}

export function reorderInLeaf(
  layout: PaneNode,
  leafId: string,
  activeTabId: string,
  overTabId: string,
): PaneNode {
  return mapLeaf(layout, leafId, (leaf) => {
    if (activeTabId === overTabId) return leaf;
    const oldIndex = leaf.tabIds.indexOf(activeTabId);
    const newIndex = leaf.tabIds.indexOf(overTabId);
    if (oldIndex < 0 || newIndex < 0) return leaf;
    const tabIds = leaf.tabIds.slice();
    const [removed] = tabIds.splice(oldIndex, 1);
    if (!removed) return leaf;
    tabIds.splice(newIndex, 0, removed);
    return { ...leaf, tabIds };
  });
}

export function moveTabToLeaf(
  layout: PaneNode,
  tabId: string,
  targetLeafId: string,
  opts?: { activate?: boolean; beforeTabId?: string | null },
): { layout: PaneNode; focusedPaneId: string } {
  const activate = opts?.activate !== false;
  let next = removeTabFromLayout(layout, tabId);
  const target = findLeaf(next, targetLeafId);
  if (!target) {
    const synced = addTabToFocusedLeaf(next, targetLeafId, tabId, { activate });
    return synced;
  }
  next = mapLeaf(next, targetLeafId, (leaf) => {
    const tabIds = leaf.tabIds.filter((id) => id !== tabId);
    const before = opts?.beforeTabId;
    const insertAt =
      before && tabIds.includes(before) ? tabIds.indexOf(before) : tabIds.length;
    tabIds.splice(insertAt, 0, tabId);
    return {
      ...leaf,
      tabIds,
      activeId: activate ? tabId : leaf.activeId,
    };
  });
  return { layout: collapseEmptyLeaves(next), focusedPaneId: targetLeafId };
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

export type SplitLeafResult =
  | { ok: true; layout: PaneNode; focusedPaneId: string }
  | { ok: false; reason: 'soft-cap' | 'missing' };

/**
 * Split `leafId` toward `edge`, placing `tabId` in the new leaf.
 * Other tabs remain in the host leaf (VS Code-style group split).
 */
export function splitLeaf(
  layout: PaneNode,
  leafId: string,
  edge: PaneSplitEdge,
  tabId: string,
  softCap?: number,
): SplitLeafResult {
  const cap = resolveSoftCap(softCap);
  if (countLeaves(layout) >= cap) return { ok: false, reason: 'soft-cap' };

  const target = findLeaf(layout, leafId);
  if (!target) return { ok: false, reason: 'missing' };

  // Remove tab from wherever it is first.
  let base = removeTabFromLayout(layout, tabId);
  let leafAfter = findLeaf(base, leafId);
  // If the leaf was collapsed away (it only had this tab), find a place to split
  // from a remaining leaf or recreate.
  if (!leafAfter) {
    const leaves = collectLeaves(base);
    const host = leaves[0] ?? createEmptyLeaf();
    if (!leaves[0]) base = host;
    return splitLeaf(base, host.id, edge, tabId, cap);
  }

  // Need room for the new leaf created by this split.
  if (countLeaves(base) >= cap) return { ok: false, reason: 'soft-cap' };

  const { direction, placeNewFirst } = edgeToSplit(edge);
  const newLeaf: PaneLeaf = {
    type: 'leaf',
    id: createPaneId('leaf'),
    tabIds: [tabId],
    activeId: tabId,
    exportPdfForTabId: null,
  };

  const replaceLeafWithSplit = (node: PaneNode): PaneNode => {
    if (node.type === 'leaf') {
      if (node.id !== leafId) return node;
      const remaining: PaneLeaf = {
        ...node,
        activeId:
          node.activeId && node.tabIds.includes(node.activeId)
            ? node.activeId
            : (node.tabIds[0] ?? null),
      };
      const children: [PaneNode, PaneNode] = placeNewFirst
        ? [newLeaf, remaining]
        : [remaining, newLeaf];
      return {
        type: 'split',
        id: createPaneId('split'),
        direction,
        ratio: placeNewFirst ? PANE_EDGE_SPLIT_RATIO : 1 - PANE_EDGE_SPLIT_RATIO,
        children,
      };
    }
    return {
      ...node,
      children: [replaceLeafWithSplit(node.children[0]), replaceLeafWithSplit(node.children[1])],
    };
  };

  const next = collapseEmptyLeaves(replaceLeafWithSplit(base));
  return { ok: true, layout: next, focusedPaneId: newLeaf.id };
}

export function retargetTabIdInLayout(
  layout: PaneNode,
  oldId: string,
  newId: string,
): PaneNode {
  if (oldId === newId) return layout;
  return mapAllLeaves(layout, (leaf) => {
    if (!leaf.tabIds.includes(oldId) && leaf.activeId !== oldId && leaf.exportPdfForTabId !== oldId) {
      return leaf;
    }
    const tabIds = leaf.tabIds.map((id) => (id === oldId ? newId : id));
    // Dedupe if dest already present.
    const seen = new Set<string>();
    const deduped: string[] = [];
    for (const id of tabIds) {
      if (seen.has(id)) continue;
      seen.add(id);
      deduped.push(id);
    }
    return {
      ...leaf,
      tabIds: deduped,
      activeId: leaf.activeId === oldId ? newId : leaf.activeId,
      exportPdfForTabId:
        leaf.exportPdfForTabId === oldId ? newId : (leaf.exportPdfForTabId ?? null),
    };
  });
}

export function toPersistedPaneNode(node: PaneNode): PersistedPaneNode {
  if (node.type === 'leaf') {
    return {
      type: 'leaf',
      id: node.id,
      tabIds: [...node.tabIds],
      activeId: node.activeId,
    };
  }
  return {
    type: 'split',
    id: node.id,
    direction: node.direction,
    ratio: node.ratio,
    children: [toPersistedPaneNode(node.children[0]), toPersistedPaneNode(node.children[1])],
  };
}

export function fromPersistedPaneNode(node: PersistedPaneNode): PaneNode {
  if (node.type === 'leaf') {
    return {
      type: 'leaf',
      id: node.id,
      tabIds: [...node.tabIds],
      activeId: node.activeId,
      exportPdfForTabId: null,
    };
  }
  return {
    type: 'split',
    id: node.id,
    direction: node.direction === 'vertical' ? 'vertical' : 'horizontal',
    ratio: clampRatio(typeof node.ratio === 'number' ? node.ratio : 0.5),
    children: [fromPersistedPaneNode(node.children[0]), fromPersistedPaneNode(node.children[1])],
  };
}

export function isPersistedPaneNode(value: unknown): value is PersistedPaneNode {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.type === 'leaf') {
    return (
      typeof v.id === 'string' &&
      Array.isArray(v.tabIds) &&
      v.tabIds.every((id) => typeof id === 'string') &&
      (typeof v.activeId === 'string' || v.activeId === null)
    );
  }
  if (v.type === 'split') {
    return (
      typeof v.id === 'string' &&
      (v.direction === 'horizontal' || v.direction === 'vertical') &&
      typeof v.ratio === 'number' &&
      Array.isArray(v.children) &&
      v.children.length === 2 &&
      isPersistedPaneNode(v.children[0]) &&
      isPersistedPaneNode(v.children[1])
    );
  }
  return false;
}

/** Active tab id for the focused leaf (workspace `activeId` mirror). */
export function getFocusedLeafActiveId(
  layout: PaneNode,
  focusedPaneId: string | null,
): string | null {
  const leaf =
    (focusedPaneId && findLeaf(layout, focusedPaneId)) || collectLeaves(layout)[0] || null;
  return leaf?.activeId ?? null;
}
