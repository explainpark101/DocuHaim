import { useCallback, useEffect, useRef } from 'react';
import { useBlocker, type BlockerFunction } from 'react-router';

type UseUnsavedNavigationGuardOptions = {
  isDirty: () => boolean;
};

/**
 * Block in-app navigations (including mouse back/forward) when `isDirty()`,
 * and show the browser `beforeunload` prompt on tab close / reload.
 */
export function useUnsavedNavigationGuard({ isDirty }: UseUnsavedNavigationGuardOptions) {
  const proceedRef = useRef<(() => void) | null>(null);
  const resetRef = useRef<(() => void) | null>(null);

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      if (currentLocation.pathname === nextLocation.pathname) return false;
      return isDirty();
    },
    [isDirty],
  );

  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      proceedRef.current = blocker.proceed;
      resetRef.current = blocker.reset;
      return;
    }
    proceedRef.current = null;
    resetRef.current = null;
  }, [blocker]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  const proceed = useCallback(() => {
    proceedRef.current?.();
  }, []);

  const reset = useCallback(() => {
    resetRef.current?.();
  }, []);

  return {
    isBlocked: blocker.state === 'blocked',
    proceed,
    reset,
  };
}
