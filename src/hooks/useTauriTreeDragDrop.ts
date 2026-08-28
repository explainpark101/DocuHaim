import { useEffect } from 'react';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { resolveTreeDropTargetFromPoint } from '@/utils/treeDropHitTest';

type DropOnFolderHandler = (
  targetNode: { path: string; type: 'folder'; name: string; handle?: FileSystemDirectoryHandle | null } | null,
  targetStorageType: string | null,
  action: 'dragOver' | 'dragLeave' | 'drop',
  payload?: { paths?: string[] },
) => void;

/**
 * Tauri intercepts OS file drops before HTML5 drag events fire (dragDropEnabled default).
 * Wire native paths into the same tree drop handler used on the web.
 */
export function useTauriTreeDragDrop(onDropOnFolder: DropOnFolderHandler | undefined): void {
  useEffect(() => {
    if (!onDropOnFolder || !isTauriDesktopPlatform()) return;

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
            const position = payload.position;
            const hit = resolveTreeDropTargetFromPoint(position, scaleFactor);
            if (!hit) {
              onDropOnFolder(null, null, 'dragLeave');
              return;
            }
            onDropOnFolder(
              {
                path: hit.folderPath,
                type: 'folder',
                name:
                  hit.folderPath === ''
                    ? 'root'
                    : hit.folderPath.replace(/\/$/, '').split('/').filter(Boolean).pop() || 'folder',
                handle: null,
              },
              hit.storageType,
              'dragOver',
            );
            return;
          }
          if (payload.type === 'leave') {
            onDropOnFolder(null, null, 'dragLeave');
            return;
          }
          if (payload.type === 'drop') {
            const paths = payload.paths || [];
            const position = payload.position;
            const hit = resolveTreeDropTargetFromPoint(position, scaleFactor);
            if (!hit || paths.length === 0) return;
            onDropOnFolder(
              {
                path: hit.folderPath,
                type: 'folder',
                name:
                  hit.folderPath === ''
                    ? 'root'
                    : hit.folderPath.replace(/\/$/, '').split('/').filter(Boolean).pop() || 'folder',
                handle: null,
              },
              hit.storageType,
              'drop',
              { paths },
            );
          }
        });
        if (cancelled) {
          unlisten?.();
          unlisten = undefined;
        }
      } catch (error) {
        console.warn('Tauri tree drag-drop listener failed:', error);
      }
    })();

    return () => {
      cancelled = true;
      unlisten?.();
    };
  }, [onDropOnFolder]);
}
