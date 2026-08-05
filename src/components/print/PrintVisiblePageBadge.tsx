import { useEffect, useState, type RefObject } from 'react';

type Props = {
  pageStarts: number[];
  contentHeight: number;
  paperRef: RefObject<HTMLElement | null>;
  scrollRef: RefObject<HTMLElement | null>;
};

function visualViewportBand(): { top: number; bottom: number } {
  const viewport = window.visualViewport;
  if (viewport) {
    return {
      top: viewport.offsetTop,
      bottom: viewport.offsetTop + viewport.height,
    };
  }
  return { top: 0, bottom: window.innerHeight };
}

function visiblePageNumbers(
  pageStarts: number[],
  contentHeight: number,
  paperEl: HTMLElement,
  scrollEl: HTMLElement,
): number[] {
  if (!pageStarts.length) return [1];
  const paperRect = paperEl.getBoundingClientRect();
  const scrollRect = scrollEl.getBoundingClientRect();
  const view = visualViewportBand();
  const visTopPx = Math.max(scrollRect.top, view.top);
  const visBottomPx = Math.min(scrollRect.bottom, view.bottom);
  if (visBottomPx - visTopPx <= 8) return [1];

  const visTop = visTopPx - paperRect.top;
  const visBottom = visBottomPx - paperRect.top;
  const pages: number[] = [];
  for (let i = 0; i < pageStarts.length; i += 1) {
    const top = pageStarts[i] ?? 0;
    const bottom = pageStarts[i + 1] ?? Math.max(contentHeight, top + 1);
    const overlap = Math.min(bottom, visBottom) - Math.max(top, visTop);
    if (overlap > 24) pages.push(i + 1);
  }
  return pages.length ? pages : [1];
}

export default function PrintVisiblePageBadge({
  pageStarts,
  contentHeight,
  paperRef,
  scrollRef,
}: Props) {
  const [pages, setPages] = useState<number[]>([1]);

  useEffect(() => {
    const paperEl = paperRef.current;
    const scrollEl = scrollRef.current;
    if (!paperEl || !scrollEl) return undefined;

    let rafId = 0;
    const update = () => {
      const next = visiblePageNumbers(pageStarts, contentHeight, paperEl, scrollEl);
      setPages((prev) => (
        prev.length === next.length && prev.every((value, index) => value === next[index])
          ? prev
          : next
      ));
    };
    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    scrollEl.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('scroll', schedule);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      scrollEl.removeEventListener('scroll', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('scroll', schedule);
    };
  }, [contentHeight, pageStarts, paperRef, scrollRef]);

  const first = pages[0] ?? 1;
  const last = pages[pages.length - 1] ?? first;
  const label = first === last ? `${first}p` : `${first}p – ${last}p`;

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-40 rounded-md border border-gray-200 bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg"
      aria-live="polite"
    >
      {label}
    </div>
  );
}
