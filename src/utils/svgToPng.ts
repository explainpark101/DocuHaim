/**
 * Rasterize SVG markup / files to a PNG File for cover image paste.
 */

const DEFAULT_SIZE = 1024;
/** Shortest side (and both sides when possible) should be at least this large. */
const MIN_DIMENSION = 1024;
const MAX_DIMENSION = 4096;

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error('SVG를 PNG로 변환하지 못했습니다.'));
      else resolve(blob);
    }, 'image/png');
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('SVG 이미지를 불러올 수 없습니다.'));
    img.src = src;
  });
}

function parseLength(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const m = String(raw).trim().match(/^([0-9.]+)/);
  if (!m?.[1]) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Infer pixel size from SVG attributes when the image reports 0×0. */
export function inferSvgPixelSize(svgText: string): { width: number; height: number } {
  try {
    const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    if (!svg) return { width: DEFAULT_SIZE, height: DEFAULT_SIZE };

    const vb = (svg.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    const vbW = vb.length >= 4 && Number.isFinite(vb[2]) && (vb[2] as number) > 0 ? (vb[2] as number) : null;
    const vbH = vb.length >= 4 && Number.isFinite(vb[3]) && (vb[3] as number) > 0 ? (vb[3] as number) : null;

    const w = parseLength(svg.getAttribute('width')) ?? vbW ?? DEFAULT_SIZE;
    const h = parseLength(svg.getAttribute('height')) ?? vbH ?? DEFAULT_SIZE;
    return { width: w, height: h };
  } catch {
    return { width: DEFAULT_SIZE, height: DEFAULT_SIZE };
  }
}

function ensureSvgRoot(svgText: string): string {
  const trimmed = String(svgText ?? '').trim();
  if (!trimmed) throw new Error('빈 SVG입니다.');
  if (/<svg[\s>]/i.test(trimmed)) return trimmed;
  throw new Error('유효한 SVG가 아닙니다.');
}

export function looksLikeSvgMarkup(text: string): boolean {
  const t = String(text ?? '').trim();
  if (!t) return false;
  if (/^<\?xml\b/i.test(t) && /<svg[\s>]/i.test(t)) return true;
  return /^<svg[\s>]/i.test(t);
}

/** Pull SVG markup from clipboard plain/html when present. */
export function extractSvgMarkupFromClipboard(
  clipboardData: DataTransfer | null | undefined,
): string | null {
  if (!clipboardData) return null;
  const plain = String(clipboardData.getData('text/plain') ?? '').trim();
  if (looksLikeSvgMarkup(plain)) return ensureSvgRoot(plain);

  const html = String(clipboardData.getData('text/html') ?? '');
  if (!html) return null;
  const match = html.match(/<svg\b[\s\S]*?<\/svg>/i);
  if (!match?.[0]) return null;
  try {
    return ensureSvgRoot(match[0]);
  } catch {
    return null;
  }
}

export function isSvgImageFile(file: File): boolean {
  if (file.type === 'image/svg+xml') return true;
  return /\.svg$/i.test(file.name || '');
}

async function rasterizeSvgTextToPngFile(
  svgText: string,
  fileName = `clipboard-${Date.now()}.png`,
): Promise<File> {
  const normalized = ensureSvgRoot(svgText);
  const inferred = inferSvgPixelSize(normalized);
  const blob = new Blob([normalized], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    let width = img.naturalWidth || inferred.width;
    let height = img.naturalHeight || inferred.height;
    if (!width || !height) {
      width = inferred.width;
      height = inferred.height;
    }

    // Scale up so both sides are at least MIN_DIMENSION (e.g. 1024×1024+).
    const scaleUp = Math.max(MIN_DIMENSION / width, MIN_DIMENSION / height, 1);
    width *= scaleUp;
    height *= scaleUp;

    // Cap the long side, but never shrink below MIN_DIMENSION on either axis.
    const maxSide = Math.max(width, height);
    if (maxSide > MAX_DIMENSION) {
      const scaleDown = MAX_DIMENSION / maxSide;
      const nextW = width * scaleDown;
      const nextH = height * scaleDown;
      if (nextW >= MIN_DIMENSION && nextH >= MIN_DIMENSION) {
        width = nextW;
        height = nextH;
      }
    }

    const outW = Math.max(1, Math.round(width));
    const outH = Math.max(1, Math.round(height));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('SVG를 PNG로 변환하지 못했습니다.');
    ctx.clearRect(0, 0, outW, outH);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, outW, outH);

    const pngBlob = await canvasToPngBlob(canvas);
    const base = fileName.replace(/\.svg$/i, '').replace(/\.png$/i, '');
    return new File([pngBlob], `${base}.png`, { type: 'image/png' });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Convert SVG File or markup string to a PNG File. */
export async function convertSvgToPngFile(
  source: string | File,
  fileName?: string,
): Promise<File> {
  if (typeof source === 'string') {
    return rasterizeSvgTextToPngFile(source, fileName);
  }
  const text = await source.text();
  const name =
    fileName
    || (source.name ? source.name.replace(/\.svg$/i, '.png') : `clipboard-${Date.now()}.png`);
  return rasterizeSvgTextToPngFile(text, name);
}
