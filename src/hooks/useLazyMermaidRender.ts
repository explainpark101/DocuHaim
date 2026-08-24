import { useEffect, type RefObject } from 'react';
import {
  isLazyMermaidPlaceholder,
  renderAllLazyMermaidsInRoot,
  renderLazyMermaidElement,
} from '@/utils/lazyMermaid';

const ROOT_MARGIN = '160px 0px';

export type UseLazyMermaidRenderOptions = {
  /** When true, render every diagram immediately (Export PDF). */
  eager?: boolean;
  /** Re-bind when preview markdown / theme changes. */
  layoutKey?: string;
};

/**
 * Viewport-gated Mermaid render. Pair with `noMermaid` on MdEditor/MdPreview so
 * md-editor-rt does not render all diagrams at once.
 */
export function useLazyMermaidRender(
  rootRef: RefObject<HTMLElement | null>,
  options: UseLazyMermaidRenderOptions = {},
): void {
  const { eager = false, layoutKey = '' } = options;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    const observed = new WeakSet<Element>();

    const observePending = () => {
      if (cancelled || eager) return;
      const nodes = [...root.querySelectorAll('.md-editor-mermaid')].filter(
        (el): el is HTMLElement => isLazyMermaidPlaceholder(el),
      );
      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const el = entry.target;
              if (!(el instanceof HTMLElement)) continue;
              observer?.unobserve(el);
              void renderLazyMermaidElement(el);
            }
          },
          { root: null, rootMargin: ROOT_MARGIN, threshold: 0.01 },
        );
      }
      for (const el of nodes) {
        if (observed.has(el)) continue;
        observed.add(el);
        observer.observe(el);
      }
    };

    const runEager = async () => {
      await renderAllLazyMermaidsInRoot(root);
    };

    if (eager) {
      void runEager();
    } else {
      observePending();
    }

    const mutationObserver = new MutationObserver(() => {
      if (cancelled) return;
      if (eager) {
        void runEager();
      } else {
        observePending();
      }
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [eager, layoutKey, rootRef]);
}
