import {
  createPaneId,
  isPaneLeaf,
  PANE_SPLIT_RATIO_MAX,
  PANE_SPLIT_RATIO_MIN,
  resizeSplit,
  type PaneNode,
  type PaneSplit,
} from '@/utils/workspaceTabs/paneLayout';

/** Ratios within this delta are treated as visually aligned (snap). */
export const PANE_ALIGN_RATIO_EPSILON = 0.02;

function clampRatio(ratio: number): number {
  if (!Number.isFinite(ratio)) return 0.5;
  return Math.min(PANE_SPLIT_RATIO_MAX, Math.max(PANE_SPLIT_RATIO_MIN, ratio));
}

/**
 * Detect a 2×2 orthogonal nest and flip nesting so the aligned sash becomes
 * the outer shared boundary.
 *
 * Example (column-major → row-major when vertical ratios match):
 *   H( V(TL,BL), V(TR,BR) )  →  V( H(TL,TR), H(BL,BR) )
 *
 * and the reverse when horizontal ratios match.
 */
export function tryTransposeAlignedTwoByTwo(
  node: PaneSplit,
  ratioEpsilon: number = PANE_ALIGN_RATIO_EPSILON,
): PaneSplit | null {
  const left = node.children[0];
  const right = node.children[1];
  if (left.type !== 'split' || right.type !== 'split') return null;
  if (left.direction !== right.direction) return null;
  // Children must be orthogonal to the parent (classic 2×2 nest).
  if (left.direction === node.direction) return null;
  if (Math.abs(left.ratio - right.ratio) > ratioEpsilon) return null;

  const sharedInnerRatio = clampRatio((left.ratio + right.ratio) / 2);
  const outerRatio = clampRatio(node.ratio);

  return {
    type: 'split',
    id: node.id,
    direction: left.direction,
    ratio: sharedInnerRatio,
    children: [
      {
        type: 'split',
        id: left.id,
        direction: node.direction,
        ratio: outerRatio,
        children: [left.children[0], right.children[0]],
      },
      {
        type: 'split',
        id: right.id,
        direction: node.direction,
        ratio: outerRatio,
        children: [left.children[1], right.children[1]],
      },
    ],
  };
}

/**
 * Walk the layout and transpose every aligned 2×2 nest (bottom-up).
 * At most one flip per nest — otherwise H(V,V)↔V(H,H) would oscillate.
 * Returns the same reference when nothing changes.
 */
export function normalizeAlignedTwoByTwo(
  layout: PaneNode,
  ratioEpsilon: number = PANE_ALIGN_RATIO_EPSILON,
): PaneNode {
  if (isPaneLeaf(layout)) return layout;

  const c0 = normalizeAlignedTwoByTwo(layout.children[0], ratioEpsilon);
  const c1 = normalizeAlignedTwoByTwo(layout.children[1], ratioEpsilon);
  const node: PaneSplit =
    c0 === layout.children[0] && c1 === layout.children[1]
      ? layout
      : { ...layout, children: [c0, c1] };

  return tryTransposeAlignedTwoByTwo(node, ratioEpsilon) ?? node;
}

/** Locate a split node by id. */
export function findSplit(layout: PaneNode, splitId: string): PaneSplit | null {
  if (layout.type === 'leaf') return null;
  if (layout.id === splitId) return layout;
  return findSplit(layout.children[0], splitId) ?? findSplit(layout.children[1], splitId);
}

/**
 * After a sash snaps to a sibling boundary, equalize the sibling ratio then
 * flip the 2×2 nest so that snapped axis becomes the outer shared sash.
 * Only runs when the resized split already sits in an aligned orthogonal nest
 * (ratios within epsilon) — ignores snaps to unrelated magnets.
 */
export function normalizeAfterSnappedResize(
  layout: PaneNode,
  resizedSplitId: string,
  ratioEpsilon: number = PANE_ALIGN_RATIO_EPSILON,
): PaneNode {
  const split = findSplit(layout, resizedSplitId);
  if (!split) return layout;

  const sibling = findOrthogonalSiblingSplit(layout, resizedSplitId);
  if (!sibling) return layout;
  if (Math.abs(sibling.ratio - split.ratio) > ratioEpsilon) return layout;

  const synced = syncSiblingSplitRatio(layout, resizedSplitId, split.ratio);

  const promote = (node: PaneNode): PaneNode => {
    if (node.type === 'leaf') return node;
    const [a, b] = node.children;
    if (
      a.type === 'split' &&
      b.type === 'split' &&
      (a.id === resizedSplitId || b.id === resizedSplitId)
    ) {
      return tryTransposeAlignedTwoByTwo(node, ratioEpsilon) ?? node;
    }
    const na = promote(a);
    const nb = promote(b);
    if (na === a && nb === b) return node;
    return { ...node, children: [na, nb] };
  };

  return promote(synced);
}

/** Sibling split in a classic 2×2 nest (shared parent, same direction, orthogonal to parent). */
export function findOrthogonalSiblingSplit(
  layout: PaneNode,
  splitId: string,
): PaneSplit | null {
  const walk = (node: PaneNode): PaneSplit | null => {
    if (node.type === 'leaf') return null;
    const [a, b] = node.children;
    if (
      a.type === 'split' &&
      b.type === 'split' &&
      a.direction === b.direction &&
      a.direction !== node.direction
    ) {
      if (a.id === splitId) return b;
      if (b.id === splitId) return a;
    }
    return walk(a) ?? walk(b);
  };
  return walk(layout);
}

/**
 * Split ids that form one spanning boundary with `splitId` in a 2×2 nest
 * (the dragged sash + its orthogonal sibling). Alone when not in such a nest.
 */
export function collectLinkedAlignedSplitIds(
  layout: PaneNode,
  splitId: string,
): string[] {
  const sibling = findOrthogonalSiblingSplit(layout, splitId);
  if (!sibling) return [splitId];
  return [splitId, sibling.id];
}

/**
 * Resize `splitId` and, when linking, keep the orthogonal sibling ratio in sync
 * so Alt+drag moves the full spanning line.
 */
export function resizeSplitLinked(
  layout: PaneNode,
  splitId: string,
  ratio: number,
  linkAligned: boolean,
): PaneNode {
  const resized = resizeSplit(layout, splitId, ratio);
  if (!linkAligned) return resized;
  return syncSiblingSplitRatio(resized, splitId, ratio);
}

/**
 * After a snapped resize, equalize the sibling split ratio that shares the
 * same parent orthognal nest (so both columns/rows match before transpose).
 */
export function syncSiblingSplitRatio(
  layout: PaneNode,
  splitId: string,
  ratio: number,
): PaneNode {
  const target = clampRatio(ratio);

  const walk = (node: PaneNode): PaneNode => {
    if (node.type === 'leaf') return node;
    const [a, b] = node.children;
    // Parent of two orthogonal children where one is `splitId`: sync the other.
    if (
      a.type === 'split' &&
      b.type === 'split' &&
      a.direction === b.direction &&
      a.direction !== node.direction
    ) {
      if (a.id === splitId && b.id !== splitId) {
        return {
          ...node,
          children: [
            { ...a, ratio: target },
            { ...b, ratio: target },
          ],
        };
      }
      if (b.id === splitId && a.id !== splitId) {
        return {
          ...node,
          children: [
            { ...a, ratio: target },
            { ...b, ratio: target },
          ],
        };
      }
    }
    const na = walk(a);
    const nb = walk(b);
    if (na === a && nb === b) return node;
    return { ...node, children: [na, nb] };
  };

  return walk(layout);
}

/** Ensure split nodes have stable ids (used if we ever synthesize new splits). */
export function ensureSplitIds(layout: PaneNode): PaneNode {
  if (layout.type === 'leaf') return layout;
  return {
    ...layout,
    id: layout.id || createPaneId('split'),
    children: [ensureSplitIds(layout.children[0]), ensureSplitIds(layout.children[1])],
  };
}
