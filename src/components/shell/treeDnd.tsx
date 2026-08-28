import {
  useDroppable,
  pointerWithin,
  closestCenter,
  MeasuringStrategy,
  type CollisionDetection,
} from '@dnd-kit/core';
import { motion as Motion } from 'motion/react';
import type { DragEvent, MouseEvent } from 'react';
import { IconFolder } from '@/components/icons';
import { toDroppableId } from '@/utils/treeMove';
import { useTreeNodeTouchGesture } from '@/hooks/useTreeNodeTouchGesture';
import { collectOsDropPayload } from '@/utils/osDropPayload';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { isLocalVaultReady } from '@/utils/localVaultReady';
import type { SidebarTreeNode } from '@/components/shell/TreeNode';

/** dnd-kit config: keep droppable rects in sync while tree layout shifts during drag. */
export const TREE_DND_MEASURING = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
} as const;

/** Compensate vertical layout shifts (folder expand) so overlay stays under the pointer. */
export const TREE_DND_AUTO_SCROLL = {
  layoutShiftCompensation: { x: false, y: true },
} as const;

type TreeDropTarget = {
  storageType: string;
  folderPath: string;
};

type DropOnFolderAction = 'dragOver' | 'dragLeave' | 'drop';

type DropOnFolderPayload = {
  files?: File[];
  dirHandles?: FileSystemDirectoryHandle[];
  items?: unknown;
  copy?: boolean;
  paths?: string[];
};

type RootDropZoneProps = {
  storageType: string;
  localRootHandle?: FileSystemDirectoryHandle | null | undefined;
  localVaultFsPath?: string | undefined;
  onDropOnFolder?:
    | ((
        targetNode: SidebarTreeNode,
        targetStorageType: string,
        action: DropOnFolderAction,
        payload?: DropOnFolderPayload,
      ) => void)
    | undefined;
  dropTarget?: TreeDropTarget | null | undefined;
  onContextMenu?:
    | ((
        event: MouseEvent | { preventDefault: () => void; stopPropagation: () => void },
        rootNode: SidebarTreeNode,
      ) => void)
    | undefined;
  onFocusRoot?: (() => void) | undefined;
  isFocused?: boolean | undefined;
  isSelected?: boolean | undefined;
  mobileTree?: boolean | undefined;
};

export type TreeDragOverlayItem = {
  path: string;
  name?: string;
  storageType?: string;
  nodeType?: string;
};

type TreeDragOverlayPreviewProps = {
  items: TreeDragOverlayItem[] | null | undefined;
  isCopy?: boolean | undefined;
};

export const treeCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) return pointerCollisions;
  return closestCenter(args);
};

export function RootDropZone({
  storageType,
  localRootHandle,
  localVaultFsPath = '',
  onDropOnFolder,
  dropTarget,
  onContextMenu,
  onFocusRoot,
  isFocused,
  isSelected = false,
  mobileTree = false,
}: RootDropZoneProps) {
  const rootNode: SidebarTreeNode = {
    path: '',
    type: 'folder',
    name: 'root',
    handle: storageType === 'local' ? (localRootHandle ?? null) : null,
  };
  const isDropTarget = dropTarget?.storageType === storageType && dropTarget?.folderPath === '';
  const canDrop =
    storageType === 's3' ||
    storageType === 'webdav' ||
    (storageType === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath));
  const useHtmlOsDrop = !isTauriDesktopPlatform();

  const { setNodeRef } = useDroppable({
    id: toDroppableId(storageType, ''),
    data: {
      storageType,
      path: '',
      nodeType: 'folder',
      handle: storageType === 'local' ? (localRootHandle ?? null) : null,
    },
    disabled: !canDrop,
  });

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (contextMenuOpenedRef.current) {
      contextMenuOpenedRef.current = false;
      return;
    }
    e.stopPropagation();
    onFocusRoot?.();
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (mobileTree) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onContextMenu?.(e, rootNode);
  };

  const openFromLongPress = () => {
    onContextMenu?.({ preventDefault: () => {}, stopPropagation: () => {} }, rootNode);
  };

  const { contextMenuOpenedRef, bindTouchGesture } = useTreeNodeTouchGesture({
    enabled: mobileTree && Boolean(onContextMenu),
    onContextMenu: openFromLongPress,
  });

  const handleOsDragOver = (e: DragEvent<HTMLDivElement>) => {
    const dt = e.dataTransfer;
    const hasFiles =
      dt.types?.includes?.('Files') || dt.files?.length > 0 || dt.items?.length > 0;
    if (!hasFiles) return;
    e.preventDefault();
    e.stopPropagation();
    dt.dropEffect = 'copy';
    onDropOnFolder?.(rootNode, storageType, 'dragOver');
  };

  const handleOsDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files, dirHandles } = await collectOsDropPayload(e.dataTransfer);
    if (files.length > 0 || dirHandles.length > 0) {
      onDropOnFolder?.(rootNode, storageType, 'drop', { files, dirHandles });
    }
  };

  if (!canDrop && !onFocusRoot) return null;

  return (
    <div
      ref={canDrop ? setNodeRef : undefined}
      data-tree-root-drop-zone
      data-tree-drop-storage={canDrop ? storageType : undefined}
      data-tree-drop-path=""
      onClick={handleClick}
      onDragOver={canDrop && useHtmlOsDrop ? handleOsDragOver : undefined}
      onDrop={canDrop && useHtmlOsDrop ? handleOsDrop : undefined}
      onContextMenu={onContextMenu ? handleContextMenu : undefined}
      {...(mobileTree && onContextMenu ? bindTouchGesture : {})}
      className={`flex items-center gap-1.5 py-1.5 pr-2 px-2 transition-colors text-sm cursor-pointer ${
        isDropTarget
          ? 'bg-blue-100 dark:bg-blue-900/40 rounded'
          : isSelected
            ? 'bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong rounded'
            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-odp-focusBg rounded'
      } ${
        isFocused
          ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1 ring-offset-white dark:ring-offset-odp-bgSofter'
          : ''
      } ${mobileTree ? 'touch-pan-y' : ''}`}
      style={{ paddingLeft: '8px' }}
    >
      <span className="text-gray-400 dark:text-gray-500 w-4 flex justify-center shrink-0">
        <IconFolder size={14} />
      </span>
      <span
        className={`truncate ${
          isSelected
            ? 'text-blue-700 dark:text-odp-fgStrong'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {storageType === 's3' ? '루트 (버킷 최상위)' : '루트 폴더'}
      </span>
    </div>
  );
}

export function TreeDragOverlayPreview({ items, isCopy = false }: TreeDragOverlayPreviewProps) {
  if (!items?.length) return null;
  const primary = items[0];
  if (!primary) return null;
  const count = items.length;
  return (
    <Motion.div
      initial={{ scale: 0.92, opacity: 0.75 }}
      animate={{ scale: 1.04, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`pointer-events-none flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm shadow-lg dark:bg-odp-surface ${
        isCopy
          ? 'border-emerald-300 dark:border-emerald-700'
          : 'border-blue-300 dark:border-blue-700'
      }`}
    >
      <span className="max-w-[180px] truncate font-medium text-gray-800 dark:text-odp-fgStrong">
        {primary.name || primary.path}
      </span>
      {isCopy ? (
        <span className="shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white">
          복제
        </span>
      ) : null}
      {count > 1 && (
        <span className="shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white">
          {count}
        </span>
      )}
    </Motion.div>
  );
}
