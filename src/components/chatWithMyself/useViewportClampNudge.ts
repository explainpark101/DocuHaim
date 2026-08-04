import {
  useCallback,
  useLayoutEffect,
  useState,
  type CSSProperties,
} from 'react';

const DEFAULT_PADDING = 12;
/** Fallback when `[data-app-status-bar]` is missing: md:h-7. */
const STATUS_BAR_FALLBACK_PX = 28;

export type ViewportClampNudge = {
  ref: (el: HTMLElement | null) => void;
  style: CSSProperties | undefined;
};

function getStatusBarTop(): number {
  const bar = document.querySelector('[data-app-status-bar]');
  if (bar instanceof HTMLElement) {
    return bar.getBoundingClientRect().top;
  }
  return window.innerHeight - STATUS_BAR_FALLBACK_PX;
}

/** CSSStyleDeclaration lengths are strings; React CSSProperties also allow unitless numbers (px). */
function cssLength(value: string | number | undefined | null): string {
  if (value == null || value === '') return '';
  return typeof value === 'number' ? `${value}px` : String(value);
}

/**
 * Radix Popper shifts only on the main axis (`crossAxis: false`), so ContextMenu
 * (side=right) can sit under the app status bar. After Radix places the menu,
 * shift it up (and only then shrink) so it never overlaps the status bar.
 */
export function useViewportClampNudge(
  open: boolean,
  padding: number = DEFAULT_PADDING,
): ViewportClampNudge {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [style, setStyle] = useState<CSSProperties | undefined>();

  const ref = useCallback((el: HTMLElement | null) => {
    setNode(el);
  }, []);

  useLayoutEffect(() => {
    if (!open || !node) {
      setStyle(undefined);
      if (node) {
        node.style.transform = '';
        node.style.maxHeight = '';
      }
      return undefined;
    }

    const clamp = () => {
      if (!node.isConnected) return;

      // Measure Radix's un-nudged placement (full natural height first).
      node.style.transform = '';
      node.style.maxHeight = '';

      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      const topLimit = padding;
      const bottomLimit = getStatusBarTop() - padding;
      const leftLimit = padding;
      const rightLimit = window.innerWidth - padding;
      const availableH = Math.max(80, bottomLimit - topLimit);

      let height = rect.height;
      let maxH: number | undefined;
      if (height > availableH) {
        maxH = availableH;
        height = availableH;
      }

      let top = rect.top;
      let left = rect.left;
      const width = rect.width;

      // Prefer shifting up so the menu clears the status bar entirely.
      if (top + height > bottomLimit) {
        top = bottomLimit - height;
      }
      if (top < topLimit) {
        top = topLimit;
      }
      if (left + width > rightLimit) {
        left = rightLimit - width;
      }
      if (left < leftLimit) {
        left = leftLimit;
      }

      const x = left - rect.left;
      const y = top - rect.top;

      const next: CSSProperties = {};
      if (x !== 0 || y !== 0) {
        next.transform = `translate(${x}px, ${y}px)`;
      }
      if (maxH != null) {
        next.maxHeight = `${maxH}px`;
      }

      // Apply immediately — don't wait for React commit (avoids one-frame overlap).
      node.style.transform = next.transform ?? '';
      node.style.maxHeight = cssLength(next.maxHeight);

      setStyle((prev) => {
        const prevT = prev?.transform ?? '';
        const prevH = cssLength(prev?.maxHeight);
        const nextT = next.transform ?? '';
        const nextH = cssLength(next.maxHeight);
        if (prevT === nextT && prevH === nextH) return prev;
        return Object.keys(next).length > 0 ? next : undefined;
      });
    };

    const wrapper = node.closest('[data-radix-popper-content-wrapper]');
    const statusBar = document.querySelector('[data-app-status-bar]');
    const ro = new ResizeObserver(clamp);
    ro.observe(node);
    if (statusBar instanceof HTMLElement) ro.observe(statusBar);

    let mo: MutationObserver | null = null;
    if (wrapper) {
      mo = new MutationObserver(clamp);
      mo.observe(wrapper, { attributes: true, attributeFilter: ['style'] });
    }

    clamp();
    const raf1 = window.requestAnimationFrame(() => {
      clamp();
      // Second frame: Radix may finish measuring after first paint.
      window.requestAnimationFrame(clamp);
    });
    window.addEventListener('resize', clamp);

    return () => {
      window.cancelAnimationFrame(raf1);
      ro.disconnect();
      mo?.disconnect();
      window.removeEventListener('resize', clamp);
      node.style.transform = '';
      node.style.maxHeight = '';
    };
  }, [open, node, padding]);

  return { ref, style };
}
