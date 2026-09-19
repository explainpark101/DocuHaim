import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';

export type PaneDropZone = PaneSplitEdge | 'center';

/** Neutral edge thickness (thirds). */
export const PANE_DROP_EDGE_PCT = 33;

/**
 * When leaving center or entering from outside — enlarge edge hit bands
 * so top/bottom/left/right are easier to select.
 */
export const PANE_DROP_EDGE_PCT_FAVOR_EDGE = 46;

/**
 * When leaving an edge toward the middle — shrink edge bands so center
 * occupies more of the pane.
 */
export const PANE_DROP_EDGE_PCT_FAVOR_CENTER = 18;

/** Empty strip between edge and center (legacy hit-target layout). */
export const PANE_DROP_GUTTER_PCT = 0;

/** Distance from pane edge to center start / cross-axis inset for edge zones. */
export const PANE_DROP_INNER_PCT = PANE_DROP_EDGE_PCT + PANE_DROP_GUTTER_PCT;

/**
 * Visual preview size for an edge-drop split (always half of the current pane).
 */
export const PANE_SPLIT_PREVIEW_PCT = 50;

/**
 * Center-join preview: linear scale so width×height ≈ 50% of pane area
 * (√0.5 ≈ 70.71% per axis, inset ≈ 14.64% each side).
 */
export const PANE_CENTER_PREVIEW_SCALE = Math.SQRT1_2;
export const PANE_CENTER_PREVIEW_INSET_PCT = ((1 - PANE_CENTER_PREVIEW_SCALE) / 2) * 100;

/** Mark leaf roots so pointer→zone can be resolved geometrically (no DOM gap flicker). */
export const PANE_LEAF_ATTR = 'data-pane-leaf';

export type PaneDropZoneBias = 'edge' | 'center' | 'neutral';

type DropZoneHistory = {
  leafId: string | null;
  zone: PaneDropZone | null;
  clientX: number;
  clientY: number;
};

let dropZoneHistory: DropZoneHistory = {
  leafId: null,
  zone: null,
  clientX: Number.NaN,
  clientY: Number.NaN,
};

/** Clear movement hysteresis (call when a tab/pane drag ends). */
export function resetPaneDropZoneHistory(): void {
  dropZoneHistory = {
    leafId: null,
    zone: null,
    clientX: Number.NaN,
    clientY: Number.NaN,
  };
}

export function getPaneDropZoneHistory(): Readonly<DropZoneHistory> {
  return dropZoneHistory;
}

/**
 * Bias from where the pointer is coming from (previous zone / outside).
 * - outside → edge: favor edges
 * - center → edge: favor edges
 * - edge → center: favor center
 */
export function biasFromPreviousZone(
  prevZone: PaneDropZone | null,
  sameLeaf: boolean,
): PaneDropZoneBias {
  if (!sameLeaf || prevZone == null) return 'edge';
  if (prevZone === 'center') return 'edge';
  return 'center';
}

export function edgePctForBias(bias: PaneDropZoneBias): number {
  switch (bias) {
    case 'edge':
      return PANE_DROP_EDGE_PCT_FAVOR_EDGE;
    case 'center':
      return PANE_DROP_EDGE_PCT_FAVOR_CENTER;
    default:
      return PANE_DROP_EDGE_PCT;
  }
}

/**
 * Map a point inside a pane rect to a drop zone.
 * `edgePct` controls how thick the outer bands are (dynamic hysteresis).
 */
export function zoneFromPanePoint(
  clientX: number,
  clientY: number,
  rect: DOMRectReadOnly,
  edgePct: number = PANE_DROP_EDGE_PCT,
): PaneDropZone {
  if (rect.width <= 0 || rect.height <= 0) return 'center';
  const pct = Number.isFinite(edgePct)
    ? Math.min(49, Math.max(5, edgePct))
    : PANE_DROP_EDGE_PCT;
  const dLeft = clientX - rect.left;
  const dRight = rect.right - clientX;
  const dTop = clientY - rect.top;
  const dBottom = rect.bottom - clientY;
  const edgeX = (pct / 100) * rect.width;
  const edgeY = (pct / 100) * rect.height;
  // Prefer a deterministic edge on ties (no empty corner gaps).
  if (dLeft < edgeX && dLeft <= dRight && dLeft <= dTop && dLeft <= dBottom) return 'left';
  if (dRight < edgeX && dRight <= dLeft && dRight <= dTop && dRight <= dBottom) {
    return 'right';
  }
  if (dTop < edgeY && dTop <= dLeft && dTop <= dRight && dTop <= dBottom) return 'top';
  if (dBottom < edgeY && dBottom <= dLeft && dBottom <= dRight && dBottom <= dTop) {
    return 'bottom';
  }
  return 'center';
}

/**
 * Find which split leaf contains the pointer and which zone it maps to.
 * Edge/center band sizes follow pointer movement history (see biasFromPreviousZone).
 */
export function resolvePaneDropAt(
  clientX: number,
  clientY: number,
): { leafId: string; zone: PaneDropZone } | null {
  if (typeof document === 'undefined') return null;
  const nodes = document.querySelectorAll<HTMLElement>(`[${PANE_LEAF_ATTR}]`);
  let best: { leafId: string; rect: DOMRect; area: number } | null = null;
  for (const node of nodes) {
    const leafId = node.getAttribute(PANE_LEAF_ATTR);
    if (!leafId) continue;
    const rect = node.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      continue;
    }
    const area = rect.width * rect.height;
    // Prefer the smallest containing leaf (nested / overlapping guards).
    if (best && best.area <= area) continue;
    best = { leafId, rect, area };
  }

  if (!best) {
    dropZoneHistory = {
      leafId: null,
      zone: null,
      clientX,
      clientY,
    };
    return null;
  }

  const sameLeaf = dropZoneHistory.leafId === best.leafId;
  const bias = biasFromPreviousZone(dropZoneHistory.zone, sameLeaf);
  const zone = zoneFromPanePoint(
    clientX,
    clientY,
    best.rect,
    edgePctForBias(bias),
  );

  dropZoneHistory = {
    leafId: best.leafId,
    zone,
    clientX,
    clientY,
  };

  return { leafId: best.leafId, zone };
}
