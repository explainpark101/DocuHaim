import type { CoverImageElement } from '@/utils/noteCover/types';

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Frame-local % size for a given visual aspect (naturalWidth/naturalHeight).
 * visualAspect = (wPct/hPct) * (frameW/frameH)
 */
export function coverImageBoxSizeForAspect(
  naturalAspect: number,
  frameWidthPx: number,
  frameHeightPx: number,
  preferWidthPct = 50,
): { w: number; h: number } {
  if (!(naturalAspect > 0) || frameWidthPx < 1 || frameHeightPx < 1) {
    return { w: preferWidthPct, h: 35 };
  }
  let w = preferWidthPct;
  let h = (w * frameWidthPx) / (frameHeightPx * naturalAspect);
  if (h > 55) {
    h = 55;
    w = (h * frameHeightPx * naturalAspect) / frameWidthPx;
  }
  if (w > 90) {
    w = 90;
    h = (w * frameWidthPx) / (frameHeightPx * naturalAspect);
  }
  return {
    w: clamp(w, 4, 100),
    h: clamp(h, 4, 100),
  };
}

/** Resize box to natural aspect while keeping center. */
export function restoreCoverImageNaturalAspect(
  el: CoverImageElement,
  frameWidthPx: number,
  frameHeightPx: number,
): CoverImageElement {
  const aspect = el.naturalAspect;
  if (aspect == null || !(aspect > 0) || frameWidthPx < 1 || frameHeightPx < 1) return el;
  const cx = el.x + el.w / 2;
  const cy = el.y + el.h / 2;
  const size = coverImageBoxSizeForAspect(aspect, frameWidthPx, frameHeightPx, el.w);
  const w = size.w;
  const h = size.h;
  let x = cx - w / 2;
  let y = cy - h / 2;
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + w > 100) x = 100 - w;
  if (y + h > 100) y = 100 - h;
  return { ...el, x, y, w, h };
}

/**
 * Apply naturalAspect and optionally fit the blue box to the photo ratio
 * (first load / when naturalAspect was missing).
 */
export function withCoverImageNaturalMetrics(
  el: CoverImageElement,
  naturalAspect: number,
  frameWidthPx: number,
  frameHeightPx: number,
  fitBox: boolean,
): CoverImageElement {
  let next: CoverImageElement = { ...el, naturalAspect };
  if (fitBox) {
    const size = coverImageBoxSizeForAspect(naturalAspect, frameWidthPx, frameHeightPx, el.w || 50);
    const cx = el.x + el.w / 2;
    const cy = el.y + el.h / 2;
    let x = cx - size.w / 2;
    let y = cy - size.h / 2;
    x = clamp(x, 0, 100 - size.w);
    y = clamp(y, 0, 100 - size.h);
    next = { ...next, x, y, w: size.w, h: size.h };
  }
  return next;
}

export type CoverResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type ResizeCoverImageOptions = {
  /**
   * Hold Shift: keep the box's current visual aspect (at drag start),
   * ignoring naturalAspect / lockAspect.
   */
  lockToCurrentAspect?: boolean;
};

/**
 * Resize image box.
 * - lockAspect: keep naturalAspect (or current visual if natural unknown)
 * - lockToCurrentAspect (Shift): keep current box visual aspect
 */
export function resizeCoverImageBox(
  orig: CoverImageElement,
  handle: CoverResizeHandle,
  dxPct: number,
  dyPct: number,
  frameWidthPx: number,
  frameHeightPx: number,
  options?: ResizeCoverImageOptions,
): CoverImageElement {
  const min = 4;
  const lockToCurrent = Boolean(options?.lockToCurrentAspect);
  const shouldLockAspect =
    lockToCurrent || Boolean(orig.lockAspect);

  if (!shouldLockAspect || frameWidthPx < 1 || frameHeightPx < 1) {
    let { x, y, w, h } = orig;
    if (handle.includes('e')) w = clamp(orig.w + dxPct, min, 100 - orig.x);
    if (handle.includes('s')) h = clamp(orig.h + dyPct, min, 100 - orig.y);
    if (handle.includes('w')) {
      const nextW = clamp(orig.w - dxPct, min, orig.x + orig.w);
      const delta = orig.w - nextW;
      x = clamp(orig.x + delta, 0, 100 - nextW);
      w = nextW;
    }
    if (handle.includes('n')) {
      const nextH = clamp(orig.h - dyPct, min, orig.y + orig.h);
      const delta = orig.h - nextH;
      y = clamp(orig.y + delta, 0, 100 - nextH);
      h = nextH;
    }
    return { ...orig, x, y, w, h };
  }

  const currentVisualAspect =
    (orig.w / Math.max(orig.h, 0.001)) * (frameWidthPx / frameHeightPx);

  const visualAspect =
    lockToCurrent
      ? currentVisualAspect
      : orig.naturalAspect && orig.naturalAspect > 0
        ? orig.naturalAspect
        : currentVisualAspect;

  // hPct from wPct: h = w * fw / (fh * V)
  const hFromW = (w: number) => (w * frameWidthPx) / (frameHeightPx * visualAspect);
  const wFromH = (h: number) => (h * frameHeightPx * visualAspect) / frameWidthPx;

  let { x, y, w, h } = orig;
  const isCorner = handle.length === 2;

  if (isCorner) {
    // Prefer the axis with larger movement in frame %.
    const useX = Math.abs(dxPct) * frameWidthPx >= Math.abs(dyPct) * frameHeightPx;
    if (useX) {
      if (handle.includes('e')) w = clamp(orig.w + dxPct, min, 100 - orig.x);
      if (handle.includes('w')) {
        const nextW = clamp(orig.w - dxPct, min, orig.x + orig.w);
        x = clamp(orig.x + (orig.w - nextW), 0, 100 - nextW);
        w = nextW;
      }
      h = hFromW(w);
      if (handle.includes('n')) {
        y = clamp(orig.y + orig.h - h, 0, 100 - h);
      }
      if (y + h > 100) {
        h = 100 - y;
        w = wFromH(h);
        if (handle.includes('w')) x = clamp(orig.x + orig.w - w, 0, 100 - w);
      }
    } else {
      if (handle.includes('s')) h = clamp(orig.h + dyPct, min, 100 - orig.y);
      if (handle.includes('n')) {
        const nextH = clamp(orig.h - dyPct, min, orig.y + orig.h);
        y = clamp(orig.y + (orig.h - nextH), 0, 100 - nextH);
        h = nextH;
      }
      w = wFromH(h);
      if (handle.includes('w')) {
        x = clamp(orig.x + orig.w - w, 0, 100 - w);
      }
      if (x + w > 100) {
        w = 100 - x;
        h = hFromW(w);
        if (handle.includes('n')) y = clamp(orig.y + orig.h - h, 0, 100 - h);
      }
    }
  } else if (handle === 'e' || handle === 'w') {
    if (handle === 'e') w = clamp(orig.w + dxPct, min, 100 - orig.x);
    else {
      const nextW = clamp(orig.w - dxPct, min, orig.x + orig.w);
      x = clamp(orig.x + (orig.w - nextW), 0, 100 - nextW);
      w = nextW;
    }
    h = hFromW(w);
    y = clamp(orig.y + (orig.h - h) / 2, 0, 100 - h);
  } else {
    if (handle === 's') h = clamp(orig.h + dyPct, min, 100 - orig.y);
    else {
      const nextH = clamp(orig.h - dyPct, min, orig.y + orig.h);
      y = clamp(orig.y + (orig.h - nextH), 0, 100 - nextH);
      h = nextH;
    }
    w = wFromH(h);
    x = clamp(orig.x + (orig.w - w) / 2, 0, 100 - w);
  }

  return {
    ...orig,
    x: clamp(x, 0, 100 - w),
    y: clamp(y, 0, 100 - h),
    w: clamp(w, min, 100),
    h: clamp(h, min, 100),
  };
}
