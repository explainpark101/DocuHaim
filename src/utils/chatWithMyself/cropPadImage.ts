import { normalizeCssHexColor } from '@/utils/cssColor';

export type CropPadMeta = {
  cellWidth: number;
  cellHeight: number;
  gridWidth: number;
  gridHeight: number;
};

const MAX_CELL_SIDE = 1024;

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

/**
 * Build a 3x3 padded grid the size of the source cell, with the photo centered.
 * `backgroundColor` null keeps the extended cells transparent.
 */
export async function composeImageColorGrid(
  imageSrc: string,
  backgroundColor: string | null,
  options: { matteCenter?: boolean } = {},
): Promise<{ src: string; meta: CropPadMeta }> {
  const image = await createImage(imageSrc);
  const naturalW = Math.max(1, image.naturalWidth || image.width);
  const naturalH = Math.max(1, image.naturalHeight || image.height);
  const scale = Math.min(1, MAX_CELL_SIDE / Math.max(naturalW, naturalH));
  const cellWidth = Math.max(1, Math.round(naturalW * scale));
  const cellHeight = Math.max(1, Math.round(naturalH * scale));
  const gridWidth = cellWidth * 3;
  const gridHeight = cellHeight * 3;

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
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (!matteCenter && row === 1 && col === 1) continue;
        ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      }
    }
  }
  ctx.drawImage(image, cellWidth, cellHeight, cellWidth, cellHeight);

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
    meta: { cellWidth, cellHeight, gridWidth, gridHeight },
  };
}
