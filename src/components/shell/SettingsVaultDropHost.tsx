import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from 'react';
import { Upload } from 'lucide-react';
import { useTauriSettingsVaultDragDrop } from '@/hooks/useTauriSettingsVaultDragDrop';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type VaultDropOnFolderHandler = (
  targetNode: { path: string; type: 'folder'; name: string; handle?: FileSystemDirectoryHandle | null },
  targetStorageType: string,
  action: 'drop',
  payload: { files?: File[]; paths?: string[] },
) => void | Promise<void>;

type SettingsVaultDropHostProps = {
  children: ReactNode;
  enabled?: boolean;
  storageType: string;
  localRootHandle?: FileSystemDirectoryHandle | null;
  onDropOnFolder?: VaultDropOnFolderHandler;
};

function dataTransferHasFiles(dt: DataTransfer | null | undefined): boolean {
  if (!dt) return false;
  return [...dt.types].includes('Files');
}

export default function SettingsVaultDropHost({
  children,
  enabled = true,
  storageType,
  localRootHandle = null,
  onDropOnFolder,
}: SettingsVaultDropHostProps) {
  const [dragging, setDragging] = useState(false);
  const dragDepthRef = useRef(0);
  const useHtmlOsDrop = !isTauriDesktopPlatform();

  const dropVaultPayload = useCallback(
    (payload: { files?: File[]; paths?: string[] }) => {
      if (!enabled || !onDropOnFolder) return;
      void onDropOnFolder(
        {
          path: '',
          type: 'folder',
          name: 'root',
          handle: storageType === 'local' ? localRootHandle : null,
        },
        storageType,
        'drop',
        payload,
      );
    },
    [enabled, localRootHandle, onDropOnFolder, storageType],
  );

  useTauriSettingsVaultDragDrop({
    enabled: enabled && Boolean(onDropOnFolder),
    onDropPaths: (paths) => dropVaultPayload({ paths }),
    onDragActiveChange: setDragging,
  });

  useEffect(() => {
    if (enabled) return;
    dragDepthRef.current = 0;
    setDragging(false);
  }, [enabled]);

  const resetDrag = useCallback(() => {
    dragDepthRef.current = 0;
    setDragging(false);
  }, []);

  const onDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!enabled || !useHtmlOsDrop || !dataTransferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current += 1;
      setDragging(true);
    },
    [enabled, useHtmlOsDrop],
  );

  const onDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!enabled || !useHtmlOsDrop) return;
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setDragging(false);
    },
    [enabled, useHtmlOsDrop],
  );

  const onDragOverCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!enabled || !useHtmlOsDrop || !dataTransferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      if (!dragging) setDragging(true);
    },
    [dragging, enabled, useHtmlOsDrop],
  );

  const onDropCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!enabled || !useHtmlOsDrop || !dataTransferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      e.stopPropagation();
      resetDrag();
      const files = e.dataTransfer?.files;
      if (files?.length) dropVaultPayload({ files: [...files] });
    },
    [dropVaultPayload, enabled, resetDrag, useHtmlOsDrop],
  );

  return (
    <div
      data-settings-vault-drop=""
      className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOverCapture={onDragOverCapture}
      onDropCapture={onDropCapture}
    >
      {children}
      {dragging ? (
        <div
          className="pointer-events-none absolute inset-0 z-90 flex items-center justify-center bg-[#b9cfe0]/85 px-4 dark:bg-[#0b1220]/90"
          aria-hidden
        >
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-blue-500 bg-white/90 px-8 py-7 text-center shadow-lg dark:border-blue-400 dark:bg-odp-bgSoft/95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
              <Upload size={24} aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                여기에 놓기
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">볼트 루트에 업로드됩니다</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
