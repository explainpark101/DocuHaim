import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { useBlocker, type BlockerFunction, type Location } from 'react-router';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  closeDesktopWindowNow,
  initDesktopWindowCloseGuard,
  registerDesktopCloseGuard,
  setDesktopQuitAllowed,
} from '@/utils/desktopWindowCloseGuard';

type UseUnsavedNavigationGuardOptions = {
  isDirty: () => boolean;
  /**
   * When true, allow this in-app navigation even if dirty (e.g. workspace tab
   * switches that auto-save in the background). Quit / beforeunload guards are
   * unaffected.
   */
  shouldAllowNavigation?: (args: {
    currentLocation: Location;
    nextLocation: Location;
  }) => boolean;
  /** Bypass dirty checks while forcing a confirmed desktop window close. */
  suppressQuitCheckRef?: MutableRefObject<boolean>;
  /** Persist the active editor before a confirmed desktop quit. */
  onSaveBeforeQuit?: () => void | Promise<void>;
};

/**
 * Block in-app navigations (including mouse back/forward) when `isDirty()`,
 * and guard window close:
 * - Web: browser `beforeunload` prompt on tab close / reload.
 * - Tauri desktop: global `onCloseRequested` + in-app ConfirmModal.
 *
 * Call `proceed` / `reset` from your confirm UI when `isBlocked` is true.
 */
export function useUnsavedNavigationGuard({
  isDirty,
  shouldAllowNavigation,
  suppressQuitCheckRef,
  onSaveBeforeQuit,
}: UseUnsavedNavigationGuardOptions) {
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      if (
        currentLocation.pathname === nextLocation.pathname &&
        currentLocation.search === nextLocation.search
      ) {
        return false;
      }
      if (shouldAllowNavigation?.({ currentLocation, nextLocation })) {
        return false;
      }
      return isDirty();
    },
    [isDirty, shouldAllowNavigation],
  );

  const blocker = useBlocker(shouldBlock);
  const [isQuitConfirmOpen, setQuitConfirmOpen] = useState(false);
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  useEffect(() => {
    initDesktopWindowCloseGuard();
  }, []);

  useEffect(() => {
    if (!isTauriDesktopPlatform()) return undefined;

    registerDesktopCloseGuard({
      isDirty: () => isDirtyRef.current(),
      ...(suppressQuitCheckRef ? { suppressQuitCheckRef } : {}),
      onRequestQuitConfirm: () => setQuitConfirmOpen(true),
    });

    return () => registerDesktopCloseGuard(null);
  }, [suppressQuitCheckRef]);

  useEffect(() => {
    if (isTauriDesktopPlatform()) return undefined;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  const confirmQuitDiscard = useCallback(() => {
    setQuitConfirmOpen(false);
    setDesktopQuitAllowed(true);
    if (suppressQuitCheckRef) suppressQuitCheckRef.current = true;
    void closeDesktopWindowNow();
  }, [suppressQuitCheckRef]);

  const confirmQuitSave = useCallback(async () => {
    try {
      await onSaveBeforeQuit?.();
    } catch {
      return;
    }
    setQuitConfirmOpen(false);
    setDesktopQuitAllowed(true);
    if (suppressQuitCheckRef) suppressQuitCheckRef.current = true;
    await closeDesktopWindowNow();
  }, [onSaveBeforeQuit, suppressQuitCheckRef]);

  const cancelQuitConfirm = useCallback(() => {
    setQuitConfirmOpen(false);
  }, []);

  const proceed = useCallback(() => {
    if (blocker.state !== 'blocked') return;
    const proceedFn = blocker.proceed;
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
    isQuitConfirmOpen,
    confirmQuitDiscard,
    confirmQuitSave,
    cancelQuitConfirm,
  };
}
