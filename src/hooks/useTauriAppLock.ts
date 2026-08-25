import { useEffect, useRef } from 'react';
import { hasDesktopAppEntryLock } from '@/utils/desktopAppEntryLock';
import { isTauriApp } from '@/utils/tauriPlatform';

type UseTauriAppLockOptions = {
  isUnlocked: boolean;
  onLock: () => void;
};

/**
 * Re-lock the Tauri app when it loses focus or goes to the background.
 * Only active when biometric app lock is enabled.
 */
export function useTauriAppLock({ isUnlocked, onLock }: UseTauriAppLockOptions): void {
  const unlockedRef = useRef(isUnlocked);
  unlockedRef.current = isUnlocked;

  useEffect(() => {
    if (!isTauriApp() || !hasDesktopAppEntryLock()) return;

    const lockIfNeeded = () => {
      if (unlockedRef.current) onLock();
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') lockIfNeeded();
    };

    document.addEventListener('visibilitychange', onVisibility);

    let unlisten: (() => void) | undefined;
    void (async () => {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        const win = getCurrentWindow();
        unlisten = await win.onFocusChanged(({ payload: focused }) => {
          if (!focused) lockIfNeeded();
        });
      } catch {
        // ignore when window API is unavailable
      }
    })();

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      unlisten?.();
    };
  }, [onLock]);
}
