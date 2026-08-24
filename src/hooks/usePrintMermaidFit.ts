import { useLayoutEffect, type RefObject } from 'react';
import { applyPrintMermaidFit } from '@/utils/printMermaidFit';

/**
 * Scale oversized Mermaid hosts into the print max box so they stay atomic
 * for page layout (transform + negative margins match visual size).
 */
export function usePrintMermaidFit(
  rootRef: RefObject<HTMLElement | null>,
  probeRef: RefObject<HTMLElement | null>,
  layoutKey: string,
): void {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const probe = probeRef.current;
    if (!root || !probe) return undefined;

    let rafId = 0;
    let applying = false;

    const apply = () => {
      const maxBox = probe.getBoundingClientRect();
      applying = true;
      try {
        applyPrintMermaidFit(root, maxBox.width, maxBox.height);
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
    resizeObserver.observe(probe);
    const mutationObserver = new MutationObserver(() => {
      if (applying) return;
      schedule();
    });
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-processed', 'data-content'],
    });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [layoutKey, probeRef, rootRef]);
}
