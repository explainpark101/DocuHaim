import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import {
  packPrintPages,
  pageStartsFromCount,
} from '@/utils/printPagePack';

export function usePrintPackedPages(
  stagingRootRef: RefObject<HTMLElement | null>,
  pagesHostRef: RefObject<HTMLElement | null>,
  pageInnerHeightPx: number,
  layoutKey: string,
) {
  const [pageCount, setPageCount] = useState(1);
  const [pageStarts, setPageStarts] = useState<number[]>([0]);
  const packGenerationRef = useRef(0);

  useLayoutEffect(() => {
    const staging = stagingRootRef.current;
    const pagesHost = pagesHostRef.current;
    if (!staging || !pagesHost || pageInnerHeightPx <= 1) {
      setPageCount(1);
      setPageStarts([0]);
      return undefined;
    }

    let rafId = 0;
    let cancelled = false;
    const generation = (packGenerationRef.current += 1);

    const update = () => {
      if (cancelled || generation !== packGenerationRef.current) return;
      const preview = staging.querySelector('.md-editor-preview');
      if (!preview) {
        setPageCount(1);
        setPageStarts(pageStartsFromCount(1, pageInnerHeightPx));
        pagesHost.replaceChildren();
        return;
      }

      const { pageCount: count } = packPrintPages({
        stagingRoot: staging,
        pagesHost,
        pageInnerHeightPx,
      });
      setPageCount(count);
      setPageStarts(pageStartsFromCount(count, pageInnerHeightPx));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        // Second frame: wait for fit hooks / images applied in the same tick.
        window.requestAnimationFrame(() => {
          if (!cancelled) update();
        });
      });
    };

    update();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(staging);
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(staging, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'src', 'width', 'height', 'data-processed'],
    });
    const images = [...staging.querySelectorAll('img')];
    for (const img of images) {
      if (!img.complete) img.addEventListener('load', schedule);
    }

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      for (const img of images) img.removeEventListener('load', schedule);
    };
  }, [layoutKey, pageInnerHeightPx, pagesHostRef, stagingRootRef]);

  return {
    pageCount,
    pageStarts,
    /** Packed body content height proxy (pageCount * inner height). */
    contentHeight: Math.max(1, pageCount) * Math.max(1, pageInnerHeightPx),
  };
}
