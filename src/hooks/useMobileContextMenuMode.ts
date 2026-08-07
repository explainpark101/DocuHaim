import { useEffect, useState } from 'react';

function computeMobileContextMenuMode(isMobileLayout = false): boolean {
  if (typeof window === 'undefined') return false;

  const portrait = window.matchMedia('(orientation: portrait)').matches;
  if (!portrait) return false;

  if (isMobileLayout) return true;

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const touchCapable = navigator.maxTouchPoints > 0;
  const narrow = window.innerWidth < 768;

  return coarse || (touchCapable && narrow);
}

/**
 * True on touch mobile portrait: context menus should use full-screen modals
 * with a header describing the selected item (not pointer-anchored popups).
 */
export function useMobileContextMenuMode(isMobileLayout = false): boolean {
  const [mobile, setMobile] = useState(() =>
    computeMobileContextMenuMode(isMobileLayout),
  );

  useEffect(() => {
    const portraitMq = window.matchMedia('(orientation: portrait)');
    const coarseMq = window.matchMedia('(pointer: coarse)');
    const sync = () => {
      setMobile(computeMobileContextMenuMode(isMobileLayout));
    };
    sync();
    portraitMq.addEventListener('change', sync);
    coarseMq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      portraitMq.removeEventListener('change', sync);
      coarseMq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, [isMobileLayout]);

  return mobile;
}
