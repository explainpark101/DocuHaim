import { normalizePrintSizeValue } from '@/utils/printPageLayout';

export function cssLengthToPx(
  raw: string | null | undefined,
  percentBasePx: number,
): number | null {
  const normalized = raw ? normalizePrintSizeValue(raw) : '';
  if (normalized === null || normalized === '') return null;
  const match = normalized.match(/^(\d+(?:\.\d+)?)(px|%|vh|vw|mm|cm|in)$/i);
  if (!match?.[1] || !match[2]) return null;
  const value = Number(match[1]);
  if (!Number.isFinite(value)) return null;
  switch (match[2].toLowerCase()) {
    case 'px':
      return value;
    case '%':
      return (value / 100) * percentBasePx;
    case 'mm':
      return (value * 96) / 25.4;
    case 'cm':
      return (value * 96) / 2.54;
    case 'in':
      return value * 96;
    case 'vh':
      return (value / 100) * window.innerHeight;
    case 'vw':
      return (value / 100) * window.innerWidth;
    default:
      return null;
  }
}

function preferredSizePx(
  img: HTMLImageElement,
  naturalWidth: number,
  naturalHeight: number,
  contentWidthPx: number,
): { width: number; height: number } {
  const ratio = naturalWidth / Math.max(1, naturalHeight);
  const rawWidth =
    img.getAttribute('data-wiki-width') ||
    img.getAttribute('data-md-width') ||
    '';
  const rawHeight =
    img.getAttribute('data-wiki-height') ||
    img.getAttribute('data-md-height') ||
    '';
  const prefW = cssLengthToPx(rawWidth, contentWidthPx);
  const prefH = cssLengthToPx(rawHeight, contentWidthPx);

  if (prefW && prefW > 0 && prefH && prefH > 0) {
    const scale = Math.min(prefW / naturalWidth, prefH / naturalHeight);
    return { width: naturalWidth * scale, height: naturalHeight * scale };
  }
  if (prefW && prefW > 0) {
    return { width: prefW, height: prefW / ratio };
  }
  if (prefH && prefH > 0) {
    return { width: prefH * ratio, height: prefH };
  }
  return { width: naturalWidth, height: naturalHeight };
}

/** Constrain images to the print max box while honoring wiki/md width hints. */
export function fitPrintImagesInRoot(
  root: HTMLElement,
  maxWidthPx: number,
  maxHeightPx: number,
  contentWidthPx?: number,
): void {
  if (maxWidthPx < 1 || maxHeightPx < 1) return;

  const contentWidth = contentWidthPx && contentWidthPx >= 1
    ? contentWidthPx
    : root.getBoundingClientRect().width || maxWidthPx;

  const images = [...root.querySelectorAll<HTMLImageElement>('img')];
  for (const img of images) {
    if (img.hasAttribute('data-print-free-transform')) continue;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) continue;

    const preferred = preferredSizePx(
      img,
      naturalWidth,
      naturalHeight,
      contentWidth,
    );
    const scale = Math.min(maxWidthPx / preferred.width, maxHeightPx / preferred.height, 1);
    const width = Math.max(1, Math.round(preferred.width * scale));
    const height = Math.max(1, Math.round(preferred.height * scale));
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    img.style.objectFit = 'contain';
    img.setAttribute('data-print-aspect-fit', '1');
  }
}
