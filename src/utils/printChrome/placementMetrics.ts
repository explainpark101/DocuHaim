import type { PrintChromePlacement, PrintChromePosition } from '@/utils/printChrome';

/** Approximate free-placement % for a named anchor (item center). */
export function printChromePositionToPercent(
  position: PrintChromePosition,
): PrintChromePlacement {
  switch (position) {
    case 'top-left':
      return { xPercent: 0, yPercent: 0 };
    case 'top-center':
      return { xPercent: 50, yPercent: 0 };
    case 'top-right':
      return { xPercent: 100, yPercent: 0 };
    case 'middle-left':
      return { xPercent: 0, yPercent: 50 };
    case 'middle-right':
      return { xPercent: 100, yPercent: 50 };
    case 'bottom-left':
      return { xPercent: 0, yPercent: 100 };
    case 'bottom-center':
      return { xPercent: 50, yPercent: 100 };
    case 'bottom-right':
      return { xPercent: 100, yPercent: 100 };
    default:
      return { xPercent: 50, yPercent: 100 };
  }
}

export type PrintChromePageSizePx = {
  widthPx: number;
  heightPx: number;
};

/** Clamp placement % with enough precision for 1px nudges on typical page boxes. */
export function clampPlacementPercentPrecise(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n * 10000) / 10000));
}

export function percentDeltaToPx(
  origin: PrintChromePlacement,
  placement: PrintChromePlacement,
  pageSize: PrintChromePageSizePx,
): { dxPx: number; dyPx: number; xPx: number; yPx: number } {
  const w = Math.max(1, pageSize.widthPx);
  const h = Math.max(1, pageSize.heightPx);
  const xPx = Math.round((placement.xPercent / 100) * w);
  const yPx = Math.round((placement.yPercent / 100) * h);
  const originXPx = Math.round((origin.xPercent / 100) * w);
  const originYPx = Math.round((origin.yPercent / 100) * h);
  return {
    dxPx: xPx - originXPx,
    dyPx: yPx - originYPx,
    xPx,
    yPx,
  };
}

/** Move placement by whole CSS pixels on the page box, then store as %. */
export function nudgePrintChromePlacementByPx(
  placement: PrintChromePlacement,
  dxPx: number,
  dyPx: number,
  pageSize: PrintChromePageSizePx,
): PrintChromePlacement {
  const w = Math.max(1, pageSize.widthPx);
  const h = Math.max(1, pageSize.heightPx);
  const xPx = (placement.xPercent / 100) * w + dxPx;
  const yPx = (placement.yPercent / 100) * h + dyPx;
  return {
    xPercent: clampPlacementPercentPrecise((xPx / w) * 100),
    yPercent: clampPlacementPercentPrecise((yPx / h) * 100),
  };
}

export function formatPrintChromePlacementDelta(
  origin: PrintChromePlacement,
  placement: PrintChromePlacement,
  pageSize?: PrintChromePageSizePx | null,
): { dx: number; dy: number; label: string; absoluteLabel: string } {
  const fmt = (n: number) => (n > 0 ? `+${n}` : `${n}`);

  if (pageSize && pageSize.widthPx > 0 && pageSize.heightPx > 0) {
    const { dxPx, dyPx, xPx, yPx } = percentDeltaToPx(origin, placement, pageSize);
    return {
      dx: dxPx,
      dy: dyPx,
      label: `Δx ${fmt(dxPx)}px · Δy ${fmt(dyPx)}px`,
      absoluteLabel: `x ${xPx}px · y ${yPx}px`,
    };
  }

  const dx = Math.round((placement.xPercent - origin.xPercent) * 100) / 100;
  const dy = Math.round((placement.yPercent - origin.yPercent) * 100) / 100;
  return {
    dx,
    dy,
    label: `Δx ${fmt(dx)}% · Δy ${fmt(dy)}%`,
    absoluteLabel: `x ${placement.xPercent}% · y ${placement.yPercent}%`,
  };
}
