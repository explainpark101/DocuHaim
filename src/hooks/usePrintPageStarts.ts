import { useLayoutEffect, useState, type RefObject } from 'react';
import { measurePrintPagination } from '@/utils/printPageBreaks';

export function usePrintPageStarts(
  rootRef: RefObject<HTMLElement | null>,
  pageInnerHeightPx: number,
  layoutKey: string,
) {
  const [pageStarts, setPageStarts] = useState<number[]>([0]);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || pageInnerHeightPx <= 1) {
      setPageStarts([0]);
      setContentHeight(0);
      return undefined;
    }

    let rafId = 0;
    const update = () => {
      const { pageStarts: starts, contentHeight: height } = measurePrintPagination(
        root,
        pageInnerHeightPx,
      );
      setPageStarts((prev) => (
        prev.length === starts.length
          && prev.every((value, index) => Math.abs(value - (starts[index] ?? 0)) < 0.5)
          ? prev
          : starts
      ));
      setContentHeight((prev) => (Math.abs(prev - height) < 0.5 ? prev : height));
    };
    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'src', 'width', 'height'],
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
  }, [layoutKey, pageInnerHeightPx, rootRef]);

  return { pageStarts, contentHeight };
}
