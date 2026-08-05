import { useLayoutEffect, useState } from 'react';
import {
  APP_STATUS_BAR_FALLBACK_PX,
  getAppStatusBarElement,
  getAppStatusBarHeight,
} from '@/utils/appStatusBar';

/**
 * Live height of the app status bar (viewport bottom inset to keep clear).
 */
export function useAppStatusBarInset(enabled = true): number {
  const [height, setHeight] = useState(APP_STATUS_BAR_FALLBACK_PX);

  useLayoutEffect(() => {
    if (!enabled) return undefined;

    const update = () => {
      setHeight(getAppStatusBarHeight());
    };
    update();

    const bar = getAppStatusBarElement();
    const ro = new ResizeObserver(update);
    if (bar) ro.observe(bar);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [enabled]);

  return height;
}
