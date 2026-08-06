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
 */
export function snapBoundsToObjects(
  bounds: CoverSnapBounds,
  peers: ReadonlyArray<CoverSnapBounds>,
  options: {
    objectSnapEnabled?: boolean;
    frameCenterSnapEnabled?: boolean;
    thresholdPct?: number;
  } = {},
): CoverObjectSnapResult {
  const {
    objectSnapEnabled = false,
    frameCenterSnapEnabled = false,
    thresholdPct = COVER_CENTER_SNAP_THRESHOLD_PCT,
  } = options;

  if (!objectSnapEnabled && !frameCenterSnapEnabled) {
    return {
      x: bounds.x,
      y: bounds.y,
      verticalGuides: [],
      horizontalGuides: [],
    };
  }

  const moveLeft = bounds.x;
  const moveRight = bounds.x + bounds.w;
  const moveCx = bounds.x + bounds.w / 2;
  const moveTop = bounds.y;
  const moveBottom = bounds.y + bounds.h;
  const moveCy = bounds.y + bounds.h / 2;

  const targetXs: number[] = [];
  const targetYs: number[] = [];

  if (frameCenterSnapEnabled) {
    targetXs.push(50);
    targetYs.push(50);
  }

  if (objectSnapEnabled) {
    for (const peer of peers) {
      targetXs.push(peer.x, peer.x + peer.w / 2, peer.x + peer.w);
      targetYs.push(peer.y, peer.y + peer.h / 2, peer.y + peer.h);
    }
  }

  // Frame-center mode alone: only snap selection center to midlines (legacy feel).
  // With object snap: allow edge↔edge, edge↔center, center↔center.
  const movingXs = objectSnapEnabled
    ? [moveLeft, moveCx, moveRight]
    : [moveCx];
  const movingYs = objectSnapEnabled
    ? [moveTop, moveCy, moveBottom]
    : [moveCy];

  // When only frame center is on, still only center→50.
  const xTargets = objectSnapEnabled
    ? targetXs
    : frameCenterSnapEnabled
      ? [50]
      : [];
  const yTargets = objectSnapEnabled
    ? targetYs
    : frameCenterSnapEnabled
      ? [50]
      : [];

  // If both on: object targets include peer lines; also include 50 for center.
  // moving lines include edges+center when object snap on.
  const xSnap = bestAxisSnap(movingXs, xTargets, thresholdPct);
  const ySnap = bestAxisSnap(movingYs, yTargets, thresholdPct);

  let x = bounds.x + (xSnap?.delta ?? 0);
  let y = bounds.y + (ySnap?.delta ?? 0);
  x = clampPct(x, 0, 100 - bounds.w);
  y = clampPct(y, 0, 100 - bounds.h);

  const verticalGuides = xSnap ? [xSnap.guide] : [];
  const horizontalGuides = ySnap ? [ySnap.guide] : [];

  return { x, y, verticalGuides, horizontalGuides };
}
