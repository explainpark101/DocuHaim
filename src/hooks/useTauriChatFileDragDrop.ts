import { useEffect } from 'react';
import {
  CHAT_FILE_DROP_ZONE_SELECTOR,
  isPointInsideDropZone,
} from '@/utils/dropZoneHitTest';
import { filesFromOsPaths } from '@/utils/osDropFiles';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type UseTauriChatFileDragDropOptions = {
  enabled?: boolean;
  isBusy?: boolean;
  onDropFiles?: ((files: File[]) => void | Promise<void>) | undefined;
  onDragActiveChange?: ((active: boolean) => void) | undefined;
};

/**
 * Tauri intercepts OS file drops before HTML5 drag events fire.
 * Wire native paths into ChatFileDropOverlay when the pointer is over the chat pane.
 */
export function useTauriChatFileDragDrop({
  enabled = true,
  isBusy = false,
  onDropFiles,
  onDragActiveChange,
}: UseTauriChatFileDragDropOptions): void {
  useEffect(() => {
    if (!enabled || !onDropFiles || !isTauriDesktopPlatform()) return;

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
              CHAT_FILE_DROP_ZONE_SELECTOR,
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
              !isPointInsideDropZone(payload.position, scaleFactor, CHAT_FILE_DROP_ZONE_SELECTOR)
            ) {
              return;
            }
            void (async () => {
              try {
                const files = await filesFromOsPaths(paths);
                if (files.length) await onDropFiles(files);
              } catch (error) {
                console.warn('Tauri chat file drop failed:', error);
              }
            })();
          }
        });

        if (cancelled) {
          unlisten?.();
          unlisten = undefined;
        }
      } catch (error) {
        console.warn('Tauri chat file drag-drop listener failed:', error);
      }
    })();

    return () => {
      cancelled = true;
      unlisten?.();
      onDragActiveChange?.(false);
    };
  }, [enabled, isBusy, onDropFiles, onDragActiveChange]);
}
