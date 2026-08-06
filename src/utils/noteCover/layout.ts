import type { CoverAlign, CoverElement, CoverLayout, NoteCover } from '@/utils/noteCover/types';

export type CoverFrameRect = {
  /** Left edge as % of page width. */
  leftPct: number;
  /** Width as % of page width. */
  widthPct: number;
};

export function getCoverFrameRect(_layout: CoverLayout): CoverFrameRect {
  // Cover content always spans the full page width.
  return { leftPct: 0, widthPct: 100 };
}

/** Convert frame-local % to page-absolute %. */
export function frameLocalToPage(
  frame: CoverFrameRect,
  localX: number,
  localW: number,
): { x: number; w: number } {
  const x = frame.leftPct + (localX / 100) * frame.widthPct;
  const w = (localW / 100) * frame.widthPct;
  return { x, w };
}

/** Convert page-absolute % to frame-local %. */
export function pageToFrameLocal(
  frame: CoverFrameRect,
  pageX: number,
  pageW: number,
): { x: number; w: number } {
  if (frame.widthPct <= 0) return { x: 0, w: 0 };
  const x = ((pageX - frame.leftPct) / frame.widthPct) * 100;
  const w = (pageW / frame.widthPct) * 100;
  return { x, w };
}

/**
 * Convert a CSS-pixel gap into frame-local % for a given axis length.
 */
export function gapPxToFramePct(gapPx: number, axisSizePx: number): number {
  if (!(axisSizePx > 0) || !Number.isFinite(gapPx)) return 0;
  return (Math.max(0, gapPx) / axisSizePx) * 100;
}

/**
 * Restack elements top-to-bottom using gapPx converted via frame height.
 * Keeps each element's x/w; sets y from cumulative heights + gaps.
 * Operates on frame-local coordinates.
 */
export function restackElementsByGap(
  elements: CoverElement[],
  gapPx: number,
  frameHeightPx: number,
  elementIds?: ReadonlySet<string> | null,
): CoverElement[] {
  const gap = gapPxToFramePct(gapPx, frameHeightPx);
  const targets = elementIds
    ? elements.filter((el) => elementIds.has(el.id))
    : [...elements];
  if (targets.length === 0) return elements;

  const sorted = [...targets].sort((a, b) => a.y - b.y || a.x - b.x);
  let cursorY = sorted[0]?.y ?? 0;
  const nextYById = new Map<string, number>();
  for (const el of sorted) {
    nextYById.set(el.id, cursorY);
    cursorY += el.h + gap;
  }

  return elements.map((el) => {
    const y = nextYById.get(el.id);
    if (y == null) return el;
    return { ...el, y };
  });
}

export function withCoverLayout(
  cover: NoteCover,
  patch: Partial<CoverLayout>,
): NoteCover {
  return {
    ...cover,
    layout: {
      ...cover.layout,
      ...patch,
      containerWidthPct: 100,
    },
  };
}

export function updateElementAlignFrame(
  cover: NoteCover,
  nextAlign: CoverAlign,
): NoteCover {
  return withCoverLayout(cover, { align: nextAlign });
}

/** Distance (frame %) within which element center snaps to 50%. */
export const COVER_CENTER_SNAP_THRESHOLD_PCT = 1.5;

export type CoverCenterSnapResult = {
  x: number;
  y: number;
  snappedX: boolean;
  snappedY: boolean;
};

function clampPct(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Snap element center to frame horizontal/vertical midlines when within threshold.
 */
export function snapElementToFrameCenter(
  el: { x: number; y: number; w: number; h: number },
  enabled: boolean,
  thresholdPct: number = COVER_CENTER_SNAP_THRESHOLD_PCT,
): CoverCenterSnapResult {
  if (!enabled) {
    return { x: el.x, y: el.y, snappedX: false, snappedY: false };
  }
  let x = el.x;
  let y = el.y;
  let snappedX = false;
  let snappedY = false;
  const centerX = el.x + el.w / 2;
  const centerY = el.y + el.h / 2;
  if (Math.abs(centerX - 50) <= thresholdPct) {
    x = 50 - el.w / 2;
    snappedX = true;
  }
  if (Math.abs(centerY - 50) <= thresholdPct) {
    y = 50 - el.h / 2;
    snappedY = true;
  }
  x = clampPct(x, 0, 100 - el.w);
  y = clampPct(y, 0, 100 - el.h);
  return { x, y, snappedX, snappedY };
}

/** Staggered default placement for newly pasted elements (frame %). */
export function nextPastePlacement(existingCount: number): {
  x: number;
  y: number;
} {
  const offset = (existingCount % 6) * 3;
  return {
    x: clampPct(18 + offset, 0, 70),
    y: clampPct(28 + offset, 0, 70),
  };
}
