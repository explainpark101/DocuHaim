import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';

/** Edge zone thickness as a percent of the pane. */
export const PANE_DROP_EDGE_PCT = 40;

/** Empty strip between edge and center (legacy hit-target layout). */
export const PANE_DROP_GUTTER_PCT = 0;

/** Distance from pane edge to center start / cross-axis inset for edge zones. */
export const PANE_DROP_INNER_PCT = PANE_DROP_EDGE_PCT + PANE_DROP_GUTTER_PCT;

/**
 * Visual preview size for the pane that will be created by an edge split
 * (matches default split ratio of 0.5).
 */
export const PANE_SPLIT_PREVIEW_PCT = 50;

/** Mark leaf roots so pointer→zone can be resolved geometrically (no DOM gap flicker). */
export const PANE_LEAF_ATTR = 'data-pane-leaf';

/**
 * Map a point inside a pane rect to a drop zone.
 * Covers the full pane (no empty corners) so previews stay stable while dragging.
 */
export function zoneFromPanePoint(
  clientX: number,
  clientY: number,
  rect: DOMRectReadOnly,
): PaneSplitEdge | 'center' {
  if (rect.width <= 0 || rect.height <= 0) return 'center';
  const dLeft = clientX - rect.left;
  const dRight = rect.right - clientX;
  const dTop = clientY - rect.top;
  const dBottom = rect.bottom - clientY;
  const edgeX = (PANE_DROP_EDGE_PCT / 100) * rect.width;
  const edgeY = (PANE_DROP_EDGE_PCT / 100) * rect.height;
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
 * Uses `[data-pane-leaf]` geometry — independent of DragOverlay / hit-target gaps.
 */
export function resolvePaneDropAt(
  clientX: number,
  clientY: number,
): { leafId: string; zone: PaneSplitEdge | 'center' } | null {
  if (typeof document === 'undefined') return null;
  const nodes = document.querySelectorAll<HTMLElement>(`[${PANE_LEAF_ATTR}]`);
  let best: { leafId: string; zone: PaneSplitEdge | 'center'; area: number } | null =
    null;
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
    best = {
      leafId,
      zone: zoneFromPanePoint(clientX, clientY, rect),
      area,
    };
  }
  return best ? { leafId: best.leafId, zone: best.zone } : null;
}
