import { useEffect } from 'react';
import { isTauriMacOS } from '@/utils/tauriPlatform';

/** Sync macOS titlebar left inset (traffic lights hidden in native fullscreen). */
export function useMacosTitlebarChrome(): void {
  const isMac = isTauriMacOS();

  useEffect(() => {
    if (!isMac) return undefined;

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
      document.documentElement.classList.toggle('macos-titlebar-fullscreen', fullscreen);
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
      document.documentElement.classList.remove('macos-titlebar-fullscreen');
    };
  }, [isMac]);
}
