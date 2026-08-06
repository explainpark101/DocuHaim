import {
  collectDescendantElementIds,
  ensureLayerTree,
  isGroupId,
} from '@/utils/noteCover/layerTree';
import { getSelectionBounds } from '@/utils/noteCover/layers';
import { COVER_CENTER_SNAP_THRESHOLD_PCT } from '@/utils/noteCover/layout';
import type { CoverElement, NoteCover } from '@/utils/noteCover/types';

export type CoverSnapBounds = { x: number; y: number; w: number; h: number };

export type CoverObjectSnapResult = {
  x: number;
  y: number;
  /** Vertical guide lines (frame % x). */
  verticalGuides: number[];
  /** Horizontal guide lines (frame % y). */
  horizontalGuides: number[];
};

function clampPct(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function getElementsByIds(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): CoverElement[] {
  const set = new Set(ids);
  return cover.elements.filter((el) => set.has(el.id));
}

function unitBoundsFromLayerId(
  cover: NoteCover,
  layerId: string,
): CoverSnapBounds | null {
  if (isGroupId(cover, layerId)) {
    const members = getElementsByIds(
      cover,
      collectDescendantElementIds(cover, layerId),
    );
    if (!members.length) return null;
    return getSelectionBounds(members);
  }
  const el = cover.elements.find((e) => e.id === layerId);
  if (!el) return null;
  return { x: el.x, y: el.y, w: el.w, h: el.h };
}

function unitMemberIds(cover: NoteCover, layerId: string): string[] {
  if (isGroupId(cover, layerId)) {
    return collectDescendantElementIds(cover, layerId);
  }
  return cover.elements.some((e) => e.id === layerId) ? [layerId] : [];
}

/**
 * Root-level snap targets: each root layer is one unit (group = bbox, not children).
 * Units that intersect the moving element set are excluded.
 */
export function collectObjectSnapTargets(
  cover: NoteCover,
  movingElementIds: ReadonlyArray<string>,
): CoverSnapBounds[] {
  const tree = ensureLayerTree(cover);
  const moving = new Set(movingElementIds);
  const out: CoverSnapBounds[] = [];
  for (const id of tree.rootLayerIds ?? []) {
    const members = unitMemberIds(tree, id);
    if (!members.length) continue;
    if (members.some((m) => moving.has(m))) continue;
    const bounds = unitBoundsFromLayerId(tree, id);
    if (bounds) out.push(bounds);
  }
  return out;
}

type AxisCandidate = { delta: number; guide: number };

function bestAxisSnap(
  movingLines: number[],
  targetLines: number[],
  thresholdPct: number,
): AxisCandidate | null {
  let best: AxisCandidate | null = null;
  for (const m of movingLines) {
    for (const t of targetLines) {
      const delta = t - m;
      const abs = Math.abs(delta);
      if (abs > thresholdPct) continue;
      if (!best || abs < Math.abs(best.delta)) {
        best = { delta, guide: t };
      }
    }
  }
  return best;
}

/**
 * Snap a moving selection box to peer object edges/centers (and optional frame midlines).
 * Peer groups are treated as a single bounding box.
 *
 * Prefer `*ThresholdPx` + `frameWidthPx` / `frameHeightPx` so snap distance is
 * screen-isotropic; frame-% thresholds remain as a fallback.
 */
export function snapBoundsToObjects(
  bounds: CoverSnapBounds,
  peers: ReadonlyArray<CoverSnapBounds>,
  options: {
    objectSnapEnabled?: boolean;
    frameCenterSnapEnabled?: boolean;
    /** Pixel snap distance for peer edges/centers. */
    objectThresholdPx?: number;
    /** Pixel snap distance for page midlines. */
    frameCenterThresholdPx?: number;
    frameWidthPx?: number;
    frameHeightPx?: number;
    /** @deprecated Prefer *ThresholdPx + frame size. */
    thresholdPct?: number;
    /** @deprecated Prefer objectThresholdPx. */
    objectThresholdPct?: number;
    /** @deprecated Prefer frameCenterThresholdPx. */
    frameCenterThresholdPct?: number;
  } = {},
): CoverObjectSnapResult {
  const {
    objectSnapEnabled = false,
    frameCenterSnapEnabled = false,
    objectThresholdPx,
    frameCenterThresholdPx,
    frameWidthPx = 0,
    frameHeightPx = 0,
    thresholdPct = COVER_CENTER_SNAP_THRESHOLD_PCT,
    objectThresholdPct = thresholdPct,
    frameCenterThresholdPct = thresholdPct,
  } = options;

  if (!objectSnapEnabled && !frameCenterSnapEnabled) {
    return {
      x: bounds.x,
      y: bounds.y,
      verticalGuides: [],
      horizontalGuides: [],
    };
  }

  const pxToPctX = (px: number) =>
    frameWidthPx > 0 ? (px / frameWidthPx) * 100 : objectThresholdPct;
  const pxToPctY = (px: number) =>
    frameHeightPx > 0 ? (px / frameHeightPx) * 100 : objectThresholdPct;

  const objectThreshX =
    objectThresholdPx != null && frameWidthPx > 0
      ? pxToPctX(objectThresholdPx)
      : objectThresholdPct;
  const objectThreshY =
    objectThresholdPx != null && frameHeightPx > 0
      ? pxToPctY(objectThresholdPx)
      : objectThresholdPct;
  const frameThreshX =
    frameCenterThresholdPx != null && frameWidthPx > 0
      ? pxToPctX(frameCenterThresholdPx)
      : frameCenterThresholdPct;
  const frameThreshY =
    frameCenterThresholdPx != null && frameHeightPx > 0
      ? pxToPctY(frameCenterThresholdPx)
      : frameCenterThresholdPct;

  const moveLeft = bounds.x;
  const moveRight = bounds.x + bounds.w;
  const moveCx = bounds.x + bounds.w / 2;
  const moveTop = bounds.y;
  const moveBottom = bounds.y + bounds.h;
  const moveCy = bounds.y + bounds.h / 2;

  const peerXs: number[] = [];
  const peerYs: number[] = [];
  if (objectSnapEnabled) {
    for (const peer of peers) {
      peerXs.push(peer.x, peer.x + peer.w / 2, peer.x + peer.w);
      peerYs.push(peer.y, peer.y + peer.h / 2, peer.y + peer.h);
    }
  }

  // Frame-center mode alone: only snap selection center to midlines.
  // With object snap: allow edge↔edge, edge↔center, center↔center.
  const objectMovingXs = [moveLeft, moveCx, moveRight];
  const objectMovingYs = [moveTop, moveCy, moveBottom];

  const objectX = objectSnapEnabled
    ? bestAxisSnap(objectMovingXs, peerXs, objectThreshX)
    : null;
  const objectY = objectSnapEnabled
    ? bestAxisSnap(objectMovingYs, peerYs, objectThreshY)
    : null;
  const frameX = frameCenterSnapEnabled
    ? bestAxisSnap([moveCx], [50], frameThreshX)
    : null;
  const frameY = frameCenterSnapEnabled
    ? bestAxisSnap([moveCy], [50], frameThreshY)
    : null;

  const pick = (
    a: AxisCandidate | null,
    b: AxisCandidate | null,
  ): AxisCandidate | null => {
    if (!a) return b;
    if (!b) return a;
    return Math.abs(a.delta) <= Math.abs(b.delta) ? a : b;
  };

  const xSnap = pick(objectX, frameX);
  const ySnap = pick(objectY, frameY);

  let x = bounds.x + (xSnap?.delta ?? 0);
  let y = bounds.y + (ySnap?.delta ?? 0);
  x = clampPct(x, 0, 100 - bounds.w);
  y = clampPct(y, 0, 100 - bounds.h);

  const verticalGuides = xSnap ? [xSnap.guide] : [];
  const horizontalGuides = ySnap ? [ySnap.guide] : [];

  return { x, y, verticalGuides, horizontalGuides };
}
