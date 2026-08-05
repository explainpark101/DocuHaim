import { useLayoutEffect, useState, type RefObject } from 'react';

type Props = {
  contentRef: RefObject<HTMLElement | null>;
  pageInnerHeightPx: number;
  layoutKey: string;
};

export default function PrintPageBreakOverlay({
  contentRef,
  pageInnerHeightPx,
  layoutKey,
}: Props) {
  const [pageCount, setPageCount] = useState(1);

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root || pageInnerHeightPx <= 1) {
      setPageCount(1);
      return undefined;
    }

    let rafId = 0;
    const update = () => {
      const height = root.scrollHeight;
      const next = Math.max(1, Math.ceil(height / pageInnerHeightPx - 0.01));
      setPageCount((prev) => (prev === next ? prev : next));
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
    });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [contentRef, layoutKey, pageInnerHeightPx]);

  if (pageInnerHeightPx <= 1) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 print:hidden" aria-hidden style={{ height: pageInnerHeightPx * pageCount }}>
      {Array.from({ length: pageCount }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <div
            key={`print-page-${pageNumber}`}
            className="absolute right-0 left-0"
            style={{ top: pageInnerHeightPx * index }}
          >
            {index > 0 ? (
              <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-red-400/80" />
            ) : null}
            <span className="absolute top-1 right-0 translate-x-[calc(100%+0.35rem)] rounded bg-red-50 px-1 text-[10px] font-medium leading-4 text-red-600 shadow-sm dark:bg-red-950/80 dark:text-red-300">
              {pageNumber}p
            </span>
          </div>
        );
      })}
    </div>
  );
}
