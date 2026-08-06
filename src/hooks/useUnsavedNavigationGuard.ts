import { useCallback, useEffect } from 'react';
import { useBlocker, type BlockerFunction } from 'react-router';

type UseUnsavedNavigationGuardOptions = {
  isDirty: () => boolean;
};

/**
 * Block in-app navigations (including mouse back/forward) when `isDirty()`,
 * and show the browser `beforeunload` prompt on tab close / reload.
 *
 * Call `proceed` / `reset` from your confirm UI when `isBlocked` is true.
 * Prefer those callbacks over caching `blocker.proceed` in a ref — React Router
 * replaces `proceed`/`reset` each time the blocker object updates.
 */
export function useUnsavedNavigationGuard({ isDirty }: UseUnsavedNavigationGuardOptions) {
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      if (
        currentLocation.pathname === nextLocation.pathname &&
        currentLocation.search === nextLocation.search
      ) {
        return false;
      }
      return isDirty();
    },
    [isDirty],
  );

  const blocker = useBlocker(shouldBlock);

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
    if (blocker.state !== 'blocked') return;
    const proceedFn = blocker.proceed;
    // POP proceed can race history.go; defer one tick (RR / browsers).
    window.setTimeout(() => {
      proceedFn();
    }, 0);
  }, [blocker]);

  const reset = useCallback(() => {
    if (blocker.state !== 'blocked') return;
    blocker.reset();
  }, [blocker]);

  return {
    isBlocked: blocker.state === 'blocked',
    proceed,
    reset,
  };
}
