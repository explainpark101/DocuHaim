import { useEffect } from 'react';
import { isTauriMacOS } from '@/utils/tauriPlatform';

/** Sync macOS titlebar left inset (traffic lights hidden in native fullscreen). */
export function useMacosTitlebarChrome(): void {
  const isMac = isTauriMacOS();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('macos-titlebar', isMac);

    if (!isMac) {
      root.classList.remove('macos-titlebar-fullscreen');
      return undefined;
    }

    let unlistenResize: (() => void) | undefined;
    let cancelled = false;

    const syncInset = async () => {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      if (cancelled) return;
      const win = getCurrentWindow();
      let fullscreen = false;
      try {
        fullscreen = await win.isFullscreen();
      } catch {
        // ignore — keep windowed inset
      }
      root.classList.toggle('macos-titlebar-fullscreen', fullscreen);
    };

    void syncInset();

    void import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
      if (cancelled) return;
      void getCurrentWindow()
        .onResized(() => {
          void syncInset();
        })
        .then((unlisten) => {
          if (cancelled) {
            unlisten();
            return;
          }
          unlistenResize = unlisten;
        });
    });

    return () => {
      cancelled = true;
      unlistenResize?.();
      root.classList.remove('macos-titlebar-fullscreen');
      // Keep `macos-titlebar` if another titlebar surface remounts; initDesktopViewport owns baseline.
    };
  }, [isMac]);
}
