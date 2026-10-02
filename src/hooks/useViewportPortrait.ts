import { useEffect, useState } from 'react';

/**
 * True when the viewport is in portrait orientation (or tall narrow layout).
 * Used to swap settings TOC dock ↔ mobile TOC button / bottom search.
 */
export function useViewportPortrait(defaultPortrait = true): boolean {
  const [portrait, setPortrait] = useState(() => {
    if (typeof window === 'undefined') return defaultPortrait;
    return window.matchMedia('(orientation: portrait)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const sync = () => setPortrait(mq.matches);
    sync();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', sync);
      return () => mq.removeEventListener('change', sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  return portrait;
}
