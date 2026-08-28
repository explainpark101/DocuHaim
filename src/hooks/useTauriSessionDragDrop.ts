import { useEffect } from 'react';
import {
  isPointInsideDropZone,
  SESSION_DROP_ZONE_SELECTOR,
} from '@/utils/dropZoneHitTest';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type UseTauriSessionDragDropOptions = {
  enabled?: boolean;
  isBusy?: boolean;
  onDropPaths?: ((paths: string[]) => void | Promise<void>) | undefined;
  onDragActiveChange?: ((active: boolean) => void) | undefined;
};

/**
 * Tauri intercepts OS file drops before HTML5 drag events fire.
 * Wire native paths into SessionOpenPanel when the pointer is over its drop zone.
 */
export function useTauriSessionDragDrop({
  enabled = true,
  isBusy = false,
  onDropPaths,
  onDragActiveChange,
}: UseTauriSessionDragDropOptions): void {
  useEffect(() => {
    if (!enabled || !onDropPaths || !isTauriDesktopPlatform()) return;

    let unlisten: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      try {
        const [{ getCurrentWebview }, { getCurrentWindow }] = await Promise.all([
          import('@tauri-apps/api/webview'),
          import('@tauri-apps/api/window'),
        ]);
        const webview = getCurrentWebview();
        const scaleFactor = await getCurrentWindow().scaleFactor();

        unlisten = await webview.onDragDropEvent((event) => {
          const payload = event.payload;
          if (payload.type === 'enter' || payload.type === 'over') {
            const active = isPointInsideDropZone(
              payload.position,
              scaleFactor,
              SESSION_DROP_ZONE_SELECTOR,
            );
            onDragActiveChange?.(active);
            return;
          }
          if (payload.type === 'leave') {
            onDragActiveChange?.(false);
            return;
          }
          if (payload.type === 'drop') {
            onDragActiveChange?.(false);
            const paths = payload.paths || [];
            if (isBusy || paths.length === 0) return;
            if (
              !isPointInsideDropZone(payload.position, scaleFactor, SESSION_DROP_ZONE_SELECTOR)
            ) {
              return;
            }
            void onDropPaths(paths);
          }
        });

        if (cancelled) {
          unlisten?.();
          unlisten = undefined;
        }
      } catch (error) {
        console.warn('Tauri session drag-drop listener failed:', error);
      }
    })();

    return () => {
      cancelled = true;
      unlisten?.();
      onDragActiveChange?.(false);
    };
  }, [enabled, isBusy, onDropPaths, onDragActiveChange]);
}
