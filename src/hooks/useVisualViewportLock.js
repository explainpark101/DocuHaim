import { useEffect } from 'react';

/**
 * Pin the app shell to the visual viewport while enabled.
 *
 * Mobile keyboards often keep layout `100vh` while shrinking the visual viewport
 * and/or scrolling the focused input into view — which pushes chat chrome off-screen.
 * This sets `--app-vv-height` / `--app-vv-top` and blocks document scroll.
 *
 * @param {boolean} enabled
 */
export function useVisualViewportLock(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: root.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';

    const resetDocumentScroll = () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
      if (root.scrollTop !== 0) root.scrollTop = 0;
      if (body.scrollTop !== 0) body.scrollTop = 0;
    };

    const apply = () => {
      const vv = window.visualViewport;
      const height = Math.max(1, Math.round(vv?.height ?? window.innerHeight));
      const offsetTop = Math.max(0, Math.round(vv?.offsetTop ?? 0));
      root.style.setProperty('--app-vv-height', `${height}px`);
      root.style.setProperty('--app-vv-top', `${offsetTop}px`);
      resetDocumentScroll();
    };

    apply();

    const vv = window.visualViewport;
    vv?.addEventListener('resize', apply);
    vv?.addEventListener('scroll', apply);
    window.addEventListener('resize', apply);

    const onFocusIn = () => {
      window.requestAnimationFrame(apply);
      window.setTimeout(apply, 50);
      window.setTimeout(apply, 300);
    };
    document.addEventListener('focusin', onFocusIn);

    return () => {
      vv?.removeEventListener('resize', apply);
      vv?.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
      document.removeEventListener('focusin', onFocusIn);
      root.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      root.style.removeProperty('--app-vv-height');
      root.style.removeProperty('--app-vv-top');
    };
  }, [enabled]);
}
