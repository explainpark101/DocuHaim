import { useLayoutEffect, type RefObject } from 'react';

const FIT_ATTR = 'data-print-table-fit';

function clearTableFit(table: HTMLTableElement): void {
  table.style.transform = '';
  table.style.transformOrigin = '';
  table.style.marginRight = '';
  table.style.marginBottom = '';
  table.style.maxWidth = '';
  table.removeAttribute(FIT_ATTR);
}

/**
 * Shrink tables that are wider than the print content box so they stay on-page.
 * Uses transform + negative margins so layout height/width match the scaled size
 * (needed for pageStarts pagination and print).
 */
export function usePrintTableFit(
  rootRef: RefObject<HTMLElement | null>,
  layoutKey: string,
): void {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let rafId = 0;
    let applying = false;

    const apply = () => {
      const maxWidth = root.clientWidth;
      if (maxWidth < 1) return;

      applying = true;
      try {
        const tables = [...root.querySelectorAll<HTMLTableElement>('table')];
        for (const table of tables) {
          // Remeasure from unscaled layout each pass.
          clearTableFit(table);
          table.style.maxWidth = 'none';

          const naturalWidth = table.scrollWidth;
          const naturalHeight = table.offsetHeight;
          if (naturalWidth <= maxWidth + 1) {
            table.style.maxWidth = `${maxWidth}px`;
            table.setAttribute(FIT_ATTR, '1');
            continue;
          }

          const scale = Math.max(0.05, Math.min(1, maxWidth / naturalWidth));
          table.style.maxWidth = 'none';
          table.style.transformOrigin = 'top left';
          table.style.transform = `scale(${scale})`;
          table.style.marginRight = `${-Math.round(naturalWidth * (1 - scale))}px`;
          table.style.marginBottom = `${-Math.round(naturalHeight * (1 - scale))}px`;
          table.setAttribute(FIT_ATTR, String(Number(scale.toFixed(4))));
        }
      } finally {
        applying = false;
      }
    };

    const schedule = () => {
      if (applying) return;
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        apply();
      });
    };

    apply();

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);

    const mutationObserver = new MutationObserver(() => {
      if (applying) return;
      schedule();
    });
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        'style',
        'data-haim-box-w',
        'data-haim-box-h',
        'data-haim-width',
        'width',
      ],
    });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      for (const table of root.querySelectorAll<HTMLTableElement>('table')) {
        clearTableFit(table);
      }
    };
  }, [layoutKey, rootRef]);
}
