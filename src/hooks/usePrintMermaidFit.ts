import { useLayoutEffect, type RefObject } from 'react';

const FIT_ATTR = 'data-print-mermaid-fit';

function clearMermaidFit(host: HTMLElement): void {
  host.style.transform = '';
  host.style.transformOrigin = '';
  host.style.marginRight = '';
  host.style.marginBottom = '';
  host.style.maxWidth = '';
  host.style.width = '';
  host.removeAttribute(FIT_ATTR);
}

/**
 * Scale oversized Mermaid hosts into the print max box so they stay atomic
 * for pageStarts (transform + negative margins match visual size).
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
      const maxW = maxBox.width;
      const maxH = maxBox.height;
      if (maxW < 1 || maxH < 1) return;

      applying = true;
      try {
        const hosts = [
          ...root.querySelectorAll<HTMLElement>('.md-editor-mermaid[data-processed]'),
        ];
        for (const host of hosts) {
          if (
            host.hasAttribute('data-print-free-transform')
            || host.getAttribute('data-mermaid-sized') === '1'
            || host.hasAttribute('data-mermaid-width')
            || host.hasAttribute('data-mermaid-height')
          ) {
            continue;
          }
          clearMermaidFit(host);
          const svg = host.querySelector('svg');
          const naturalWidth = Math.max(
            host.scrollWidth,
            host.offsetWidth,
            svg?.getBoundingClientRect().width ?? 0,
          );
          const naturalHeight = Math.max(
            host.scrollHeight,
            host.offsetHeight,
            svg?.getBoundingClientRect().height ?? 0,
          );
          if (naturalWidth < 1 || naturalHeight < 1) continue;

          const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight, 1);
          if (scale >= 0.999) {
            host.setAttribute(FIT_ATTR, '1');
            continue;
          }

          host.style.transformOrigin = 'top left';
          host.style.transform = `scale(${scale})`;
          host.style.marginRight = `${-Math.round(naturalWidth * (1 - scale))}px`;
          host.style.marginBottom = `${-Math.round(naturalHeight * (1 - scale))}px`;
          host.setAttribute(FIT_ATTR, String(Number(scale.toFixed(4))));
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
    resizeObserver.observe(probe);
    const mutationObserver = new MutationObserver(() => {
      if (applying) return;
      schedule();
    });
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-processed', 'data-content', 'data-mermaid-sized', 'data-print-free-transform'],
    });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [layoutKey, probeRef, rootRef]);
}
