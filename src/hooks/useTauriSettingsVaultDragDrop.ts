import { useEffect } from 'react';
import {
  isPointInsideDropZone,
  SETTINGS_VAULT_DROP_ZONE_SELECTOR,
} from '@/utils/dropZoneHitTest';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type UseTauriSettingsVaultDragDropOptions = {
  enabled?: boolean;
  isBusy?: boolean;
  onDropPaths?: ((paths: string[]) => void | Promise<void>) | undefined;
  onDragActiveChange?: ((active: boolean) => void) | undefined;
};

/**
 * Tauri intercepts OS file drops before HTML5 drag events fire.
 * Wire native paths into vault upload when the pointer is over the settings pane.
 */
export function useTauriSettingsVaultDragDrop({
  enabled = true,
  isBusy = false,
  onDropPaths,
  onDragActiveChange,
}: UseTauriSettingsVaultDragDropOptions): void {
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
              SETTINGS_VAULT_DROP_ZONE_SELECTOR,
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
              !isPointInsideDropZone(
                payload.position,
                scaleFactor,
                SETTINGS_VAULT_DROP_ZONE_SELECTOR,
              )
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
        console.warn('Tauri settings vault drag-drop listener failed:', error);
      }
    })();

    return () => {
      cancelled = true;
      unlisten?.();
      onDragActiveChange?.(false);
    };
  }, [enabled, isBusy, onDropPaths, onDragActiveChange]);
}
