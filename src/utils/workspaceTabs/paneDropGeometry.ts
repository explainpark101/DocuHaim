import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';

export type PaneDropZone = PaneSplitEdge | 'center';

/** Neutral edge thickness (thirds). */
export const PANE_DROP_EDGE_PCT = 33;

/** Expanded hit band for the direction the pointer is moving toward. */
export const PANE_DROP_EDGE_PCT_EXPANDED = 48;

/** Shrunk edge bands when the pointer moves toward the pane center. */
export const PANE_DROP_EDGE_PCT_SHRUNK = 16;

/**
 * @deprecated Prefer direction-based bands. Kept for callers/tests that used bias API.
 */
export const PANE_DROP_EDGE_PCT_FAVOR_EDGE = PANE_DROP_EDGE_PCT_EXPANDED;

/**
 * @deprecated Prefer direction-based bands. Kept for callers/tests that used bias API.
 */
export const PANE_DROP_EDGE_PCT_FAVOR_CENTER = PANE_DROP_EDGE_PCT_SHRUNK;

/** Ignore tiny jitter when classifying movement direction. */
export const PANE_DROP_MOVE_EPS_PX = 2;

/** Cosine threshold: movement aligned with vector-to-center → expand center. */
export const PANE_DROP_TOWARD_CENTER_COS = 0.45;

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

/** Per-side edge band thickness (% of pane width/height). */
export type PaneDropEdgeBands = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export const PANE_DROP_EDGE_BANDS_NEUTRAL: PaneDropEdgeBands = {
  left: PANE_DROP_EDGE_PCT,
  right: PANE_DROP_EDGE_PCT,
  top: PANE_DROP_EDGE_PCT,
  bottom: PANE_DROP_EDGE_PCT,
};

type DropZoneHistory = {
  leafId: string | null;
  zone: PaneDropZone | null;
  clientX: number;
  clientY: number;
  /** Last direction we expanded (sticky when movement is tiny). */
  favor: PaneDropZone | null;
};

let dropZoneHistory: DropZoneHistory = {
  leafId: null,
  zone: null,
  clientX: Number.NaN,
  clientY: Number.NaN,
  favor: null,
};

/** Clear movement hysteresis (call when a tab/pane drag ends). */
export function resetPaneDropZoneHistory(): void {
  dropZoneHistory = {
    leafId: null,
    zone: null,
    clientX: Number.NaN,
    clientY: Number.NaN,
    favor: null,
  };
}

export function getPaneDropZoneHistory(): Readonly<DropZoneHistory> {
  return dropZoneHistory;
}

function clampEdgePct(pct: number): number {
  if (!Number.isFinite(pct)) return PANE_DROP_EDGE_PCT;
  return Math.min(49, Math.max(5, pct));
}

/**
 * @deprecated Use bandsFromPointerMotion. Kept for older tests/callers.
 */
export function biasFromPreviousZone(
  prevZone: PaneDropZone | null,
  sameLeaf: boolean,
): PaneDropZoneBias {
  if (!sameLeaf || prevZone == null) return 'edge';
  if (prevZone === 'center') return 'edge';
  return 'center';
}

/**
 * @deprecated Use bandsFromPointerMotion. Kept for older tests/callers.
 */
export function edgePctForBias(bias: PaneDropZoneBias): number {
  switch (bias) {
    case 'edge':
      return PANE_DROP_EDGE_PCT_EXPANDED;
    case 'center':
      return PANE_DROP_EDGE_PCT_SHRUNK;
    default:
      return PANE_DROP_EDGE_PCT;
  }
}

function bandsAll(pct: number): PaneDropEdgeBands {
  const p = clampEdgePct(pct);
  return { left: p, right: p, top: p, bottom: p };
}

function expandSide(side: PaneSplitEdge): PaneDropEdgeBands {
  const bands = bandsAll(PANE_DROP_EDGE_PCT);
  bands[side] = PANE_DROP_EDGE_PCT_EXPANDED;
  return bands;
}

/**
 * Classify pointer motion and enlarge the hit band in that direction.
 * - Moving left/right/up/down → that edge band grows
 * - Moving toward pane center → all edges shrink (center grows)
 * - Entering from outside → expand the nearest edge to the entry point
 */
export function bandsFromPointerMotion(opts: {
  clientX: number;
  clientY: number;
  rect: DOMRectReadOnly;
  prevClientX: number;
  prevClientY: number;
  /** True when the pointer just entered this leaf (or came from outside). */
  enteringLeaf: boolean;
  stickyFavor?: PaneDropZone | null;
}): { bands: PaneDropEdgeBands; favor: PaneDropZone } {
  const { clientX, clientY, rect, prevClientX, prevClientY, enteringLeaf, stickyFavor } =
    opts;

  const dx = clientX - prevClientX;
  const dy = clientY - prevClientY;
  const speed = Math.hypot(dx, dy);

  // Entering a pane from outside: enlarge the nearest edge to the entry point.
  if (enteringLeaf || !Number.isFinite(prevClientX) || !Number.isFinite(prevClientY)) {
    const dLeft = clientX - rect.left;
    const dRight = rect.right - clientX;
    const dTop = clientY - rect.top;
    const dBottom = rect.bottom - clientY;
    const nearest: PaneSplitEdge =
      dLeft <= dRight && dLeft <= dTop && dLeft <= dBottom
        ? 'left'
        : dRight <= dTop && dRight <= dBottom
          ? 'right'
          : dTop <= dBottom
            ? 'top'
            : 'bottom';
    return { bands: expandSide(nearest), favor: nearest };
  }

  if (speed < PANE_DROP_MOVE_EPS_PX) {
    // Keep last favor so recognition stays sticky while the pointer pauses.
    if (stickyFavor === 'center') {
      return { bands: bandsAll(PANE_DROP_EDGE_PCT_SHRUNK), favor: 'center' };
    }
    if (
      stickyFavor === 'left' ||
      stickyFavor === 'right' ||
      stickyFavor === 'top' ||
      stickyFavor === 'bottom'
    ) {
      return { bands: expandSide(stickyFavor), favor: stickyFavor };
    }
    return { bands: bandsAll(PANE_DROP_EDGE_PCT), favor: 'center' };
  }

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const toCx = cx - clientX;
  const toCy = cy - clientY;
  const toCenterLen = Math.hypot(toCx, toCy);
  if (toCenterLen > 1) {
    const cos = (dx * toCx + dy * toCy) / (speed * toCenterLen);
    if (cos >= PANE_DROP_TOWARD_CENTER_COS) {
      return { bands: bandsAll(PANE_DROP_EDGE_PCT_SHRUNK), favor: 'center' };
    }
  }

  // Dominant axis of travel → expand that edge.
  if (Math.abs(dx) >= Math.abs(dy)) {
    const side: PaneSplitEdge = dx < 0 ? 'left' : 'right';
    return { bands: expandSide(side), favor: side };
  }
  const side: PaneSplitEdge = dy < 0 ? 'top' : 'bottom';
  return { bands: expandSide(side), favor: side };
}

/**
 * Map a point inside a pane rect to a drop zone.
 * Pass a uniform `edgePct` or per-side `bands` for direction-aware hit areas.
 */
export function zoneFromPanePoint(
  clientX: number,
  clientY: number,
  rect: DOMRectReadOnly,
  edgePctOrBands: number | PaneDropEdgeBands = PANE_DROP_EDGE_PCT,
): PaneDropZone {
  if (rect.width <= 0 || rect.height <= 0) return 'center';
  const bands: PaneDropEdgeBands =
    typeof edgePctOrBands === 'number'
      ? bandsAll(edgePctOrBands)
      : {
          left: clampEdgePct(edgePctOrBands.left),
          right: clampEdgePct(edgePctOrBands.right),
          top: clampEdgePct(edgePctOrBands.top),
          bottom: clampEdgePct(edgePctOrBands.bottom),
        };

  const dLeft = clientX - rect.left;
  const dRight = rect.right - clientX;
  const dTop = clientY - rect.top;
  const dBottom = rect.bottom - clientY;
  const edgeLeft = (bands.left / 100) * rect.width;
  const edgeRight = (bands.right / 100) * rect.width;
  const edgeTop = (bands.top / 100) * rect.height;
  const edgeBottom = (bands.bottom / 100) * rect.height;

  // Prefer a deterministic edge on ties (no empty corner gaps).
  if (dLeft < edgeLeft && dLeft <= dRight && dLeft <= dTop && dLeft <= dBottom) {
    return 'left';
  }
  if (dRight < edgeRight && dRight <= dLeft && dRight <= dTop && dRight <= dBottom) {
    return 'right';
  }
  if (dTop < edgeTop && dTop <= dLeft && dTop <= dRight && dTop <= dBottom) {
    return 'top';
  }
  if (dBottom < edgeBottom && dBottom <= dLeft && dBottom <= dRight && dBottom <= dTop) {
    return 'bottom';
  }
  return 'center';
}

/**
 * Find which split leaf contains the pointer and which zone it maps to.
 * Hit bands grow in the pointer's travel direction (and toward center when applicable).
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
    if (best && best.area <= area) continue;
    best = { leafId, rect, area };
  }

  if (!best) {
    dropZoneHistory = {
      leafId: null,
      zone: null,
      clientX,
      clientY,
      favor: null,
    };
    return null;
  }

  const sameLeaf = dropZoneHistory.leafId === best.leafId;
  const enteringLeaf = !sameLeaf || dropZoneHistory.leafId == null;
  const { bands, favor } = bandsFromPointerMotion({
    clientX,
    clientY,
    rect: best.rect,
    prevClientX: dropZoneHistory.clientX,
    prevClientY: dropZoneHistory.clientY,
    enteringLeaf,
    stickyFavor: sameLeaf ? dropZoneHistory.favor : null,
  });
  const zone = zoneFromPanePoint(clientX, clientY, best.rect, bands);

  dropZoneHistory = {
    leafId: best.leafId,
    zone,
    clientX,
    clientY,
    favor,
  };

  return { leafId: best.leafId, zone };
}
