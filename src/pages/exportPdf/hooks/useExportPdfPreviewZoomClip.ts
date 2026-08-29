import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * CSS `zoom` on the preview stack shrinks painted size but scroll containers
 * still use layout height — clip to visual height so the last page cannot
 * scroll past empty space below.
 */
export function useExportPdfPreviewZoomClip(
  coverStackRef: RefObject<HTMLElement | null>,
  zoomPercent: number,
  layoutKey: string,
  enabled: boolean,
): number | null {
  const [clipHeight, setClipHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!enabled) {
      setClipHeight(null);
      return undefined;
    }

    const stack = coverStackRef.current;
    if (!stack) return undefined;

    const scrollRoot = stack.closest('.export-pdf-preview-scroll') as HTMLElement | null;
    const scale = zoomPercent > 0 ? zoomPercent / 100 : 1;

    const measure = () => {
      const layoutHeight = stack.offsetHeight;
      const visualHeight = layoutHeight * scale;
      setClipHeight(visualHeight);

      if (!scrollRoot) return;
      requestAnimationFrame(() => {
        const maxScroll = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight);
        if (scrollRoot.scrollTop > maxScroll) {
          scrollRoot.scrollTop = maxScroll;
        }
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stack);
    return () => observer.disconnect();
  }, [coverStackRef, enabled, layoutKey, zoomPercent]);

  return clipHeight;
}
