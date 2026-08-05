import { useLayoutEffect, type RefObject } from 'react';
import { normalizePrintSizeValue } from '@/utils/printPageLayout';

function cssLengthToPx(
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

export function usePrintImageAspectFit(
  rootRef: RefObject<HTMLElement | null>,
  probeRef: RefObject<HTMLElement | null>,
  layoutKey: string,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const probe = probeRef.current;
    if (!root || !probe) return undefined;

    let rafId = 0;

    const apply = () => {
      const maxBox = probe.getBoundingClientRect();
      const maxW = maxBox.width;
      const maxH = maxBox.height;
      if (maxW < 1 || maxH < 1) return;

      const contentWidth = root.getBoundingClientRect().width || maxW;
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
        const scale = Math.min(maxW / preferred.width, maxH / preferred.height, 1);
        const width = Math.max(1, Math.round(preferred.width * scale));
        const height = Math.max(1, Math.round(preferred.height * scale));
        const nextWidth = `${width}px`;
        const nextHeight = `${height}px`;
        if (img.style.width !== nextWidth) img.style.width = nextWidth;
        if (img.style.height !== nextHeight) img.style.height = nextHeight;
        if (img.style.objectFit !== 'contain') img.style.objectFit = 'contain';
        img.setAttribute('data-print-aspect-fit', '1');
      }
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        apply();
      });
    };

    apply();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);
    resizeObserver.observe(probe);
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'data-wiki-width', 'data-wiki-height', 'data-md-width', 'data-md-height'],
    });
    const images = [...root.querySelectorAll('img')];
    for (const img of images) {
      if (!img.complete) img.addEventListener('load', schedule);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      for (const img of images) img.removeEventListener('load', schedule);
    };
  }, [layoutKey, probeRef, rootRef]);
}
