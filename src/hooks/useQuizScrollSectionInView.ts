import { useEffect, useRef, useState, type RefObject } from 'react';

const VISIBILITY_THRESHOLD = 0.12;

/**
 * Tracks whether a scroll-area section is visible inside its scroll root.
 * Batches observer callbacks and skips redundant state updates to avoid
 * layout-feedback loops (e.g. mobile chrome resize after sidebar close).
 */
export function useQuizScrollSectionInView(
  scrollRootRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  /** Re-attach when scroll content layout changes (e.g. question count). */
  layoutKey = 0,
): boolean {
  const [inView, setInView] = useState(true);
  const inViewRef = useRef(true);

  useEffect(() => {
    if (!enabled) {
      inViewRef.current = true;
      setInView(true);
      return;
    }

    let rafId = 0;
    let observer: IntersectionObserver | null = null;

    const commit = (next: boolean) => {
      if (inViewRef.current === next) return;
      inViewRef.current = next;
      setInView(next);
    };

    const attach = () => {
      observer?.disconnect();
      const root = scrollRootRef.current;
      const target = targetRef.current;
      if (!root || !target) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            commit(entry.isIntersecting);
          });
        },
        { root, threshold: VISIBILITY_THRESHOLD },
      );
      observer.observe(target);
    };

    attach();

    const rootEl = scrollRootRef.current;
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && rootEl != null
        ? new ResizeObserver(() => {
            attach();
          })
        : null;
    if (rootEl != null) {
      resizeObserver?.observe(rootEl);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [enabled, layoutKey, scrollRootRef, targetRef]);

  return inView;
}
