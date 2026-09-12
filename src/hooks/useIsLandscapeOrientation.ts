import { useEffect, useState } from 'react';

/** Landscape and at least md (768px) — matches Export PDF tools dock visibility. */
const DOCK_MQ = '(orientation: landscape) and (min-width: 768px)';

function readCanDock(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(DOCK_MQ).matches;
}

/** True when Export PDF font/chrome tools may use the right dock. */
export function useIsLandscapeOrientation(): boolean {
  const [canDock, setCanDock] = useState(() => readCanDock());

  useEffect(() => {
    const mq = window.matchMedia(DOCK_MQ);
    const sync = () => setCanDock(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return canDock;
}
