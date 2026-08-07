import { normalizeCssHexColor } from '@/utils/cssColor';

export type CropPadMeta = {
  cellWidth: number;
  cellHeight: number;
  gridWidth: number;
  gridHeight: number;
  /** Offset of the original image within the padded grid */
  originX: number;
  originY: number;
};

/** Max side length of the full padded canvas (not the source cell alone).
 * Preview composites may downscale large images; export via
 * `getCroppedImgFromPadMeta` to restore natural resolution. */
const MAX_GRID_SIDE = 3072;

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

function toHexByte(value: number): string {
  return Math.max(0, Math.min(255, Math.round(value)))
    .toString(16)
    .padStart(2, '0');
}

export type ImageSourceHint = {
  type?: string | null;
  name?: string | null;
};

export type PadBackgroundSuggestion = {
  color: string;
  transparentDefault: boolean;
};

const TRANSPARENT_ALPHA = 16;
const TRANSPARENT_EDGE_RATIO = 0.35;

export function isSvgImageSource(hint?: ImageSourceHint | null): boolean {
  const type = (hint?.type || '').toLowerCase();
  const name = (hint?.name || '').toLowerCase();
  if (type.includes('svg')) return true;
  return name.endsWith('.svg') || name.endsWith('.svgz');
}

async function sniffSvgFromSrc(imageSrc: string): Promise<boolean> {
  try {
    const res = await fetch(imageSrc);
    const blob = await res.blob();
    if (isSvgImageSource({ type: blob.type })) return true;
    const head = new TextDecoder('utf-8').decode(
      new Uint8Array(await blob.slice(0, 512).arrayBuffer()),
    );
    const trimmed = head.replace(/^\uFEFF/, '').trimStart();
    return /^<svg[\s>]/i.test(trimmed) || /^<\?xml[\s\S]*?<svg[\s>]/i.test(trimmed);
  } catch {
    return false;
  }
}

/**
 * Average opaque edge pixels (top/bottom/left/right) into a hex color.
 */
export async function averageEdgePixelColor(imageSrc: string): Promise<string> {
  const suggestion = await suggestPadBackground(imageSrc);
  return suggestion.color;
}

/**
 * Default pad: transparent for SVG, or when a meaningful share of edge pixels
 * are transparent (typical cutout PNG). Otherwise opaque edge-average color.
 */
export async function suggestPadBackground(
  imageSrc: string,
  hint?: ImageSourceHint | null,
): Promise<PadBackgroundSuggestion> {
  if (isSvgImageSource(hint) || (await sniffSvgFromSrc(imageSrc))) {
    return { color: '#ffffff', transparentDefault: true };
  }

  const image = await createImage(imageSrc);
  const width = Math.max(1, image.naturalWidth || image.width);
  const height = Math.max(1, image.naturalHeight || image.height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { color: '#ffffff', transparentDefault: false };
  ctx.drawImage(image, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  let r = 0;
  let g = 0;
  let b = 0;
  let opaque = 0;
  let transparent = 0;
  const add = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    const alpha = data[i + 3] ?? 0;
    if (alpha < TRANSPARENT_ALPHA) {
      transparent += 1;
      return;
    }
    r += data[i] ?? 0;
    g += data[i + 1] ?? 0;
    b += data[i + 2] ?? 0;
    opaque += 1;
  };

  for (let x = 0; x < width; x += 1) {
    add(x, 0);
    if (height > 1) add(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    add(0, y);
    if (width > 1) add(width - 1, y);
  }

  const total = opaque + transparent;
  const color = opaque
    ? `#${toHexByte(r / opaque)}${toHexByte(g / opaque)}${toHexByte(b / opaque)}`
    : '#ffffff';
  const transparentDefault =
    total > 0 && (opaque === 0 || transparent / total >= TRANSPARENT_EDGE_RATIO);

  return { color, transparentDefault };
}

export type OpaqueContentBounds = {
  /** Bounding box in natural image pixels (inclusive min, exclusive max style via width/height). */
  x: number;
  y: number;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  /** True when opaque content is inset from the full canvas (transparent margin present). */
  hasTransparentMargin: boolean;
};

export type AreaLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const OPAQUE_SCAN_MAX_SIDE = 768;
const TRANSPARENT_MARGIN_MIN_PX = 2;

/**
 * Tight bounding box of non-transparent pixels in the source image.
 * Returns null when the image has no opaque pixels.
 */
export async function getOpaqueContentBounds(
  imageSrc: string,
  alphaThreshold: number = TRANSPARENT_ALPHA,
): Promise<OpaqueContentBounds | null> {
  const image = await createImage(imageSrc);
  const naturalWidth = Math.max(1, image.naturalWidth || image.width);
  const naturalHeight = Math.max(1, image.naturalHeight || image.height);
  const scanScale = Math.min(
    1,
    OPAQUE_SCAN_MAX_SIDE / Math.max(naturalWidth, naturalHeight),
  );
  const scanW = Math.max(1, Math.round(naturalWidth * scanScale));
  const scanH = Math.max(1, Math.round(naturalHeight * scanScale));
  const canvas = document.createElement('canvas');
  canvas.width = scanW;
  canvas.height = scanH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.clearRect(0, 0, scanW, scanH);
  ctx.drawImage(image, 0, 0, scanW, scanH);
  const { data } = ctx.getImageData(0, 0, scanW, scanH);

  let minX = scanW;
  let minY = scanH;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < scanH; y += 1) {
    const row = y * scanW;
    for (let x = 0; x < scanW; x += 1) {
      const alpha = data[(row + x) * 4 + 3] ?? 0;
      if (alpha < alphaThreshold) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < minX || maxY < minY) return null;

  const inv = scanScale > 0 ? 1 / scanScale : 1;
  const x = Math.max(0, Math.floor(minX * inv));
  const y = Math.max(0, Math.floor(minY * inv));
  const right = Math.min(naturalWidth, Math.ceil((maxX + 1) * inv));
  const bottom = Math.min(naturalHeight, Math.ceil((maxY + 1) * inv));
  const width = Math.max(1, right - x);
  const height = Math.max(1, bottom - y);
  const hasTransparentMargin =
    x >= TRANSPARENT_MARGIN_MIN_PX
    || y >= TRANSPARENT_MARGIN_MIN_PX
    || naturalWidth - (x + width) >= TRANSPARENT_MARGIN_MIN_PX
    || naturalHeight - (y + height) >= TRANSPARENT_MARGIN_MIN_PX;

  return {
    x,
    y,
    width,
    height,
    naturalWidth,
    naturalHeight,
    hasTransparentMargin,
  };
}

/** Map natural-image opaque bounds into padded composite pixel coordinates. */
export function opaqueBoundsToGridArea(
  meta: CropPadMeta,
  bounds: OpaqueContentBounds,
): AreaLike {
  const sx = meta.cellWidth / bounds.naturalWidth;
  const sy = meta.cellHeight / bounds.naturalHeight;
  return {
    x: meta.originX + bounds.x * sx,
    y: meta.originY + bounds.y * sy,
    width: Math.max(1, bounds.width * sx),
    height: Math.max(1, bounds.height * sy),
  };
}

/**
 * Build a padded canvas with the photo centered.
 * `padRatio` is relative to the source size on each side (1 → classic 3×3 grid;
 * 1.5 → 1.5× pad left/right/top/bottom).
 * `backgroundColor` null keeps the extended area transparent.
 */
export async function composeImageColorGrid(
  imageSrc: string,
  backgroundColor: string | null,
  options: { matteCenter?: boolean; padRatio?: number } = {},
): Promise<{ src: string; meta: CropPadMeta }> {
  const padRatio = Number.isFinite(options.padRatio) ? Math.max(0, options.padRatio as number) : 1;
  const image = await createImage(imageSrc);
  const naturalW = Math.max(1, image.naturalWidth || image.width);
  const naturalH = Math.max(1, image.naturalHeight || image.height);
  const factor = 1 + 2 * padRatio;
  const scale = Math.min(1, MAX_GRID_SIDE / (Math.max(naturalW, naturalH) * Math.max(1, factor)));
  const cellWidth = Math.max(1, Math.round(naturalW * scale));
  const cellHeight = Math.max(1, Math.round(naturalH * scale));
  const padX = Math.max(0, Math.round(cellWidth * padRatio));
  const padY = Math.max(0, Math.round(cellHeight * padRatio));
  const gridWidth = cellWidth + padX * 2;
  const gridHeight = cellHeight + padY * 2;

  const canvas = document.createElement('canvas');
  canvas.width = gridWidth;
  canvas.height = gridHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not available');

  const fill = normalizeCssHexColor(backgroundColor);
  const matteCenter = Boolean(fill) && options.matteCenter !== false;
  ctx.clearRect(0, 0, gridWidth, gridHeight);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, gridWidth, gridHeight);
    if (!matteCenter) {
      ctx.clearRect(padX, padY, cellWidth, cellHeight);
    }
  }
  ctx.drawImage(image, padX, padY, cellWidth, cellHeight);

  const usePng = !fill || !matteCenter;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (next) => {
        if (next) resolve(next);
        else reject(new Error('Pad compose failed'));
      },
      usePng ? 'image/png' : 'image/jpeg',
      usePng ? undefined : 0.92,
    );
  });

  return {
    src: URL.createObjectURL(blob),
    meta: {
      cellWidth,
      cellHeight,
      gridWidth,
      gridHeight,
      originX: padX,
      originY: padY,
    },
  };
}
