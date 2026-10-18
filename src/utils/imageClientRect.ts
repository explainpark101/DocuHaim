/** Map a screen rectangle onto image pixels (lightbox crop / QR region). */

export type AxisRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type PixelRect = {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
};

export function intersectAxisRects(a: AxisRect, b: AxisRect): AxisRect | null {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  if (right - left < 1 || bottom - top < 1) return null;
  return { left, top, right, bottom };
}

export function axisRectToImagePixels(
  stage: AxisRect,
  canvasWidth: number,
  canvasHeight: number,
  selection: AxisRect,
): PixelRect | null {
  const width = Math.max(1, Math.round(canvasWidth));
  const height = Math.max(1, Math.round(canvasHeight));
  const hit = intersectAxisRects(stage, selection);
  if (!hit) return null;
  const stageW = Math.max(1, stage.right - stage.left);
  const stageH = Math.max(1, stage.bottom - stage.top);
  const sx = ((hit.left - stage.left) / stageW) * width;
  const sy = ((hit.top - stage.top) / stageH) * height;
  const sw = ((hit.right - hit.left) / stageW) * width;
  const sh = ((hit.bottom - hit.top) / stageH) * height;
  const x = clampInt(Math.floor(sx), 0, width - 1);
  const y = clampInt(Math.floor(sy), 0, height - 1);
  const right = clampInt(Math.ceil(sx + sw), x + 1, width);
  const bottom = clampInt(Math.ceil(sy + sh), y + 1, height);
  return { sx: x, sy: y, sw: right - x, sh: bottom - y };
}

/** True when the pixel rect is effectively the whole canvas. */
export function pixelRectCoversCanvas(
  rect: PixelRect,
  canvasWidth: number,
  canvasHeight: number,
  slack = 2,
): boolean {
  return (
    rect.sx <= slack &&
    rect.sy <= slack &&
    rect.sx + rect.sw >= canvasWidth - slack &&
    rect.sy + rect.sh >= canvasHeight - slack
  );
}

export function cropCanvas(
  source: HTMLCanvasElement,
  rect: PixelRect,
): HTMLCanvasElement {
  const out = document.createElement('canvas');
  out.width = Math.max(1, rect.sw);
  out.height = Math.max(1, rect.sh);
  const ctx = out.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D unavailable');
  ctx.drawImage(
    source,
    rect.sx,
    rect.sy,
    rect.sw,
    rect.sh,
    0,
    0,
    out.width,
    out.height,
  );
  return out;
}

function clampInt(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
