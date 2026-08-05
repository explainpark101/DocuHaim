import { useLayoutEffect, type RefObject } from 'react';

export function usePrintPgbrSpacers(
  rootRef: RefObject<HTMLElement | null>,
  pageInnerHeightPx: number,
  layoutKey: string,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || pageInnerHeightPx <= 1) return undefined;

    let rafId = 0;

    const apply = () => {
      const pgbrs = [...root.querySelectorAll<HTMLElement>('.md-pgbr')];
      for (const el of pgbrs) {
        el.style.paddingBottom = '';
      }
      const rootTop = root.getBoundingClientRect().top;
      for (const el of pgbrs) {
        const top = el.getBoundingClientRect().top - rootTop;
        const posInPage =
          ((top % pageInnerHeightPx) + pageInnerHeightPx) % pageInnerHeightPx;
        const marker = Math.max(el.getBoundingClientRect().height, 1);
        const fill = Math.max(0, pageInnerHeightPx - posInPage - marker);
        el.style.paddingBottom = `${fill}px`;
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
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
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
}
