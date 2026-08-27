import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { useBlocker, type BlockerFunction, type Location } from 'react-router';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

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
 * - Tauri desktop: `onCloseRequested` + in-app ConfirmModal (beforeunload blocks
 *   silently in the webview and never shows a native dialog).
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
  const allowQuitRef = useRef(false);
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  useEffect(() => {
    // Tauri webviews block close silently when beforeunload calls preventDefault.
    if (isTauriDesktopPlatform()) return undefined;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (!isTauriDesktopPlatform()) return undefined;

    let unlistenClose: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        if (cancelled) return;
        unlistenClose = await getCurrentWindow().onCloseRequested((event) => {
          if (allowQuitRef.current) return;
          if (suppressQuitCheckRef?.current) return;
          if (!isDirtyRef.current()) return;
          event.preventDefault();
          setQuitConfirmOpen(true);
        });
      } catch (err) {
        console.warn('[navGuard] Tauri close guard failed:', err);
      }
    })();

    return () => {
      cancelled = true;
      unlistenClose?.();
    };
  }, [suppressQuitCheckRef]);

  const closeDesktopWindow = useCallback(async () => {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    await getCurrentWindow().close();
  }, []);

  const confirmQuitDiscard = useCallback(() => {
    setQuitConfirmOpen(false);
    allowQuitRef.current = true;
    if (suppressQuitCheckRef) suppressQuitCheckRef.current = true;
    void closeDesktopWindow();
  }, [closeDesktopWindow, suppressQuitCheckRef]);

  const confirmQuitSave = useCallback(async () => {
    try {
      await onSaveBeforeQuit?.();
    } catch {
      return;
    }
    setQuitConfirmOpen(false);
    allowQuitRef.current = true;
    if (suppressQuitCheckRef) suppressQuitCheckRef.current = true;
    await closeDesktopWindow();
  }, [closeDesktopWindow, onSaveBeforeQuit, suppressQuitCheckRef]);

  const cancelQuitConfirm = useCallback(() => {
    setQuitConfirmOpen(false);
  }, []);

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
    isQuitConfirmOpen,
    confirmQuitDiscard,
    confirmQuitSave,
    cancelQuitConfirm,
  };
}
