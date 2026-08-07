import { useEffect, useState } from 'react';

/**
 * Coarse pointer (touch) or narrow viewport — matches chat sidebar tree rules.
 */
export function useIsCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(pointer: coarse)').matches
      || window.innerWidth < 768
    );
  });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => {
      setCoarse(mq.matches || window.innerWidth < 768);
    };
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return coarse;
}
