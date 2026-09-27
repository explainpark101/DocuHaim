/**
 * Vector stroke model for Haim image lightbox annotate.
 * Display uses SVG; save rasterizes to canvas at image natural size.
 */

export type BrushShape = 'circle' | 'square';
export type BrushDash = 'solid' | 'dashed';

export type HighlightBlendMode =
  | 'multiply'
  | 'overlay'
  | 'soft-light'
  | 'screen'
  | 'darken'
  | 'lighten'
  | 'color-burn'
  | 'normal';

export type StrokeKind = 'pen' | 'pressure' | 'highlighter' | 'laser' | 'eraser';

export type StrokePoint = { x: number; y: number; pressure: number };

export type AnnotateStroke = {
  id: string;
  seq: number;
  kind: StrokeKind;
  color: string;
  /** Buffer-pixel brush width (X) — scaled from CSS size. */
  diameterX: number;
  /** Buffer-pixel brush height (Y) — scaled from CSS size. */
  diameterY: number;
  points: StrokePoint[];
  shape: BrushShape;
  dash: BrushDash;
  /** 0–1 opacity for pen/highlight/laser. */
  opacity: number;
  blend?: HighlightBlendMode;
};

/** Larger axis — used for dash spacing and Ink API trail. */
export function strokeRefDiameter(stroke: AnnotateStroke): number {
  return Math.max(stroke.diameterX, stroke.diameterY);
}

/**
 * Solid brushes with unequal W×H stamp tip shapes along the path.
 * Stamps are oriented to the path tangent so they form a ribbon, not an
 * axis-aligned flood of the trajectory bounding box.
 */
export function usesStampBrush(stroke: AnnotateStroke): boolean {
  return (
    stroke.dash === 'solid' &&
    Math.abs(stroke.diameterX - stroke.diameterY) > 0.05
  );
}

/** Clamp CSS→buffer scale when the image has not laid out yet (cssW≈0/1). */
export function bufferScaleFromCss(bufW: number, cssW: number): number {
  if (!(cssW >= 8) || !(bufW >= 1)) return 1;
  return clamp(bufW / cssW, 0.25, 12);
}

/** Keep brush diameter from exploding into a page-filling blob. */
export function clampStrokeDiameter(
  diameter: number,
  bufW: number,
  bufH: number,
): number {
  const cap = Math.max(4, Math.min(96, Math.min(bufW, bufH) * 0.08));
  return clamp(diameter, 0.5, cap);
}

/** Path tangent at point index (radians). */
export function stampTangentAngle(
  points: StrokePoint[],
  index: number,
): number {
  if (points.length < 2) return 0;
  const i0 = Math.max(0, index - 1);
  const i1 = Math.min(points.length - 1, index + 1);
  if (i0 === i1) {
    const a = points[Math.max(0, index - 1)]!;
    const b = points[index]!;
    return Math.atan2(b.y - a.y, b.x - a.x);
  }
  const a = points[i0]!;
  const b = points[i1]!;
  return Math.atan2(b.y - a.y, b.x - a.x);
}

/** Sample stamp centers along a polyline at roughly `spacing` buffer px. */
export function sampleStampCenters(
  points: StrokePoint[],
  spacing: number,
): StrokePoint[] {
  if (points.length === 0) return [];
  const first = points[0];
  if (!first) return [];
  const sp = Math.max(0.5, spacing);
  const out: StrokePoint[] = [{ ...first }];
  let acc = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1]!;
    const b = points[i]!;
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len < 1e-6) continue;
    let used = 0;
    while (acc + (len - used) >= sp) {
      const need = sp - acc;
      const t = (used + need) / len;
      out.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        pressure: a.pressure + (b.pressure - a.pressure) * t,
      });
      used += need;
      acc = 0;
    }
    acc += len - used;
  }
  return out;
}

/** Placed text annotation (buffer coords + CSS font-size at 100% view). */
export type AnnotateText = {
  id: string;
  seq: number;
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
  /** Font size in CSS px relative to the displayed image at scale 1. */
  fontSizePx: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: 'normal' | 'italic';
};

export const FONT_WEIGHT_OPTIONS = [
  { value: '300', label: 'Light 300' },
  { value: '400', label: 'Regular 400' },
  { value: '500', label: 'Medium 500' },
  { value: '600', label: 'Semibold 600' },
  { value: '700', label: 'Bold 700' },
  { value: '800', label: 'ExtraBold 800' },
] as const;

export const HIGHLIGHT_BLEND_OPTIONS: { value: HighlightBlendMode; label: string }[] =
  [
    { value: 'multiply', label: 'Multiply' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'soft-light', label: 'Soft light' },
    { value: 'screen', label: 'Screen' },
    { value: 'darken', label: 'Darken' },
    { value: 'lighten', label: 'Lighten' },
    { value: 'color-burn', label: 'Color burn' },
    { value: 'normal', label: 'Normal' },
  ];

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** How strongly the stroke tip tracks the raw pointer (0–1). Higher = snappier. */
export const STROKE_FOLLOW_ALPHA = 0.92;
/** Skip samples closer than this (buffer px) to keep paths stable. */
export const STROKE_MIN_POINT_DIST = 0.35;

export function distSq(a: StrokePoint, b: StrokePoint): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/** Exponential smooth toward the pointer for a “following brush” feel. */
export function followPointerTip(
  tip: StrokePoint,
  raw: StrokePoint,
  alpha = STROKE_FOLLOW_ALPHA,
): StrokePoint {
  const a = clamp(alpha, 0.05, 1);
  return {
    x: tip.x + (raw.x - tip.x) * a,
    y: tip.y + (raw.y - tip.y) * a,
    pressure: tip.pressure + (raw.pressure - tip.pressure) * a,
  };
}

/**
 * Append smoothed samples from raw pointer points.
 * Returns the updated tip used for the next move.
 */
export function appendSmoothedPoints(
  strokePoints: StrokePoint[],
  tip: StrokePoint,
  rawPoints: StrokePoint[],
  alpha = STROKE_FOLLOW_ALPHA,
): StrokePoint {
  let current = tip;
  const minDistSq = STROKE_MIN_POINT_DIST * STROKE_MIN_POINT_DIST;
  for (const raw of rawPoints) {
    current = followPointerTip(current, raw, alpha);
    const last = strokePoints[strokePoints.length - 1];
    if (!last || distSq(last, current) >= minDistSq) {
      strokePoints.push({ ...current });
    } else {
      // Update last in place for tiny moves so the tip still tracks.
      last.x = current.x;
      last.y = current.y;
      last.pressure = current.pressure;
    }
  }
  return current;
}

/** Smooth SVG path (quadratic midpoints) in buffer coords. */
export function pointsToSvgPath(points: StrokePoint[]): string {
  if (points.length === 0) return '';
  const first = points[0];
  if (!first) return '';
  if (points.length === 1) {
    return `M ${first.x} ${first.y} L ${first.x + 0.01} ${first.y}`;
  }
  if (points.length === 2) {
    const b = points[1]!;
    return `M ${first.x} ${first.y} L ${b.x} ${b.y}`;
  }
  // Catmull-Rom → cubic Bezier for smoother curves along the pointer trail.
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i === 0 ? 0 : i - 1]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1]!;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

export function dashArrayFor(stroke: AnnotateStroke): string | undefined {
  if (stroke.dash !== 'dashed') return undefined;
  const d = strokeRefDiameter(stroke);
  const gap = Math.max(2, d * 1.2);
  const dash = Math.max(2, d * 2.2);
  return `${dash} ${gap}`;
}

export function lineCapFor(shape: BrushShape): 'round' | 'square' {
  return shape === 'square' ? 'square' : 'round';
}

export function lineJoinFor(shape: BrushShape): 'round' | 'miter' {
  return shape === 'square' ? 'miter' : 'round';
}

export function canvasBlendFor(blend: HighlightBlendMode | undefined): GlobalCompositeOperation {
  switch (blend) {
    case 'overlay':
      return 'overlay';
    case 'soft-light':
      return 'soft-light';
    case 'screen':
      return 'screen';
    case 'darken':
      return 'darken';
    case 'lighten':
      return 'lighten';
    case 'color-burn':
      return 'color-burn';
    case 'normal':
      return 'source-over';
    case 'multiply':
    default:
      return 'multiply';
  }
}

function applyStrokeStyle(
  ctx: CanvasRenderingContext2D,
  stroke: AnnotateStroke,
  width: number,
): void {
  ctx.lineCap = lineCapFor(stroke.shape);
  ctx.lineJoin = lineJoinFor(stroke.shape);
  ctx.miterLimit = 2;
  ctx.lineWidth = Math.max(0.5, width);
  ctx.globalAlpha = clamp(stroke.opacity, 0.02, 1);
  const dash = dashArrayFor(stroke);
  if (dash) {
    ctx.setLineDash(dash.split(' ').map(Number));
  } else {
    ctx.setLineDash([]);
  }
}

function paintStampOnCtx(
  ctx: CanvasRenderingContext2D,
  stroke: AnnotateStroke,
  pt: StrokePoint,
  angle: number,
  tipScale = 1,
): void {
  const hx = Math.max(0.25, (stroke.diameterX * tipScale) / 2);
  const hy = Math.max(0.25, (stroke.diameterY * tipScale) / 2);
  ctx.save();
  ctx.translate(pt.x, pt.y);
  ctx.rotate(angle);
  ctx.beginPath();
  if (stroke.shape === 'square') {
    ctx.rect(-hx, -hy, hx * 2, hy * 2);
  } else {
    ctx.ellipse(0, 0, hx, hy, 0, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.restore();
}

function strokePathOnCtx(ctx: CanvasRenderingContext2D, stroke: AnnotateStroke): void {
  if (stroke.points.length < 1) return;

  ctx.globalAlpha = clamp(stroke.opacity, 0.02, 1);

  if (usesStampBrush(stroke)) {
    const spacing = Math.max(
      0.75,
      Math.min(stroke.diameterX, stroke.diameterY) * 0.4,
    );
    const stamps = sampleStampCenters(stroke.points, spacing);
    for (let i = 0; i < stamps.length; i += 1) {
      const pt = stamps[i]!;
      const srcIdx = Math.min(
        stroke.points.length - 1,
        Math.round(
          (i / Math.max(1, stamps.length - 1)) * (stroke.points.length - 1),
        ),
      );
      const angle = stampTangentAngle(stroke.points, srcIdx);
      const tipScale = stroke.kind === 'pressure' ? pt.pressure : 1;
      paintStampOnCtx(ctx, stroke, pt, angle, tipScale);
    }
    return;
  }

  const refD = strokeRefDiameter(stroke);

  if (stroke.kind === 'pressure' && stroke.points.length >= 2) {
    for (let i = 1; i < stroke.points.length; i += 1) {
      const a = stroke.points[i - 1]!;
      const b = stroke.points[i]!;
      const w = Math.max(0.5, refD * ((a.pressure + b.pressure) / 2));
      applyStrokeStyle(ctx, stroke, w);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    return;
  }

  applyStrokeStyle(ctx, stroke, refD);
  ctx.beginPath();
  const first = stroke.points[0]!;
  ctx.moveTo(first.x, first.y);
  if (stroke.points.length === 1) {
    ctx.lineTo(first.x + 0.01, first.y);
  } else {
    for (let i = 1; i < stroke.points.length; i += 1) {
      const p = stroke.points[i]!;
      ctx.lineTo(p.x, p.y);
    }
  }
  ctx.stroke();
}

/**
 * Canvas 2d strokeStyle/fillStyle from `#rgb` / `#rrggbb` / `#rrggbbaa`.
 * Prefer rgba() — some engines ignore 8-digit hex on canvas.
 */
export function cssColorToCanvasStyle(
  raw: string,
  alphaMul = 1,
): string {
  const hex = String(raw ?? '').trim().replace(/^#/, '');
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;
  if (hex.length === 3 || hex.length === 4) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    if (hex.length === 4) {
      a = parseInt(hex.charAt(3) + hex.charAt(3), 16) / 255;
    }
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255;
  } else {
    return raw;
  }
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return raw;
  return `rgba(${r},${g},${b},${clamp(a * alphaMul, 0, 1)})`;
}

/** Paint one stroke onto an existing 2d context (live preview / export helpers). */
export function paintAnnotateStrokeOnCtx(
  ctx: CanvasRenderingContext2D,
  stroke: AnnotateStroke,
): void {
  strokePathOnCtx(ctx, stroke);
}

/**
 * True when live preview must fully clear+repaint (variable width / stamps).
 * Simple solid path strokes can paint incrementally.
 */
export function liveStrokeNeedsFullRepaint(stroke: AnnotateStroke): boolean {
  return (
    stroke.kind === 'pressure' ||
    usesStampBrush(stroke) ||
    stroke.dash === 'dashed'
  );
}

/** Append only new polyline segments from `fromIndex` (inclusive prior point). */
export function paintAnnotateStrokeIncremental(
  ctx: CanvasRenderingContext2D,
  stroke: AnnotateStroke,
  fromIndex: number,
): number {
  if (liveStrokeNeedsFullRepaint(stroke) || stroke.points.length < 1) {
    strokePathOnCtx(ctx, stroke);
    return stroke.points.length;
  }
  const refD = strokeRefDiameter(stroke);
  applyStrokeStyle(ctx, stroke, refD);
  const start = Math.max(1, fromIndex);
  for (let i = start; i < stroke.points.length; i += 1) {
    const a = stroke.points[i - 1]!;
    const b = stroke.points[i]!;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  if (stroke.points.length === 1) {
    const p = stroke.points[0]!;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.01, p.y);
    ctx.stroke();
  }
  return stroke.points.length;
}

/** Draw ink (pen/pressure/eraser) onto a transparent canvas. */
export function rasterizeInkLayer(
  width: number,
  height: number,
  strokes: AnnotateStroke[],
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  for (const stroke of strokes) {
    ctx.save();
    if (stroke.kind === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.globalAlpha = 1;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = stroke.color;
    }
    strokePathOnCtx(ctx, stroke);
    ctx.restore();
  }
  return canvas;
}

/** Draw highlighter strokes (with blend) onto transparent canvas. */
export function rasterizeHighlightLayer(
  width: number,
  height: number,
  strokes: AnnotateStroke[],
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  for (const stroke of strokes) {
    ctx.save();
    if (stroke.kind === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.globalAlpha = 1;
    } else {
      ctx.globalCompositeOperation = canvasBlendFor(stroke.blend);
      ctx.strokeStyle = stroke.color;
    }
    strokePathOnCtx(ctx, stroke);
    ctx.restore();
  }
  return canvas;
}

/** Paint text annotations onto an existing canvas (buffer pixel space). */
export function drawAnnotateTextsOnCanvas(
  ctx: CanvasRenderingContext2D,
  texts: AnnotateText[],
  bufferScale: number,
): void {
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  for (const t of texts) {
    const raw = t.text ?? '';
    if (!raw.trim() && raw.length === 0) continue;
    const size = Math.max(1, t.fontSizePx * Math.max(0.001, bufferScale));
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = clamp(t.opacity, 0.02, 1);
    ctx.fillStyle = t.color;
    const family = t.fontFamily?.trim() || 'sans-serif';
    ctx.font = `${t.fontStyle || 'normal'} ${t.fontWeight || '400'} ${size}px ${family}`;
    const lineHeight = size * 1.3;
    const lines = raw.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      ctx.fillText(lines[i] ?? '', t.x, t.y + i * lineHeight);
    }
    ctx.restore();
  }
}

export const MAX_BUFFER_EDGE = 8192;

export function resolveInkBufferSize(img: HTMLImageElement): {
  bufW: number;
  bufH: number;
  cssW: number;
  cssH: number;
} {
  const cssW = Math.max(1, img.clientWidth);
  const cssH = Math.max(1, img.clientHeight);
  const natW = img.naturalWidth > 0 ? img.naturalWidth : cssW;
  const natH = img.naturalHeight > 0 ? img.naturalHeight : cssH;
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  let bufW = Math.max(natW, Math.round(cssW * dpr));
  let bufH = Math.max(natH, Math.round(cssH * dpr));
  const longEdge = Math.max(bufW, bufH);
  if (longEdge > MAX_BUFFER_EDGE) {
    const s = MAX_BUFFER_EDGE / longEdge;
    bufW = Math.max(1, Math.round(bufW * s));
    bufH = Math.max(1, Math.round(bufH * s));
  }
  return { bufW, bufH, cssW, cssH };
}
