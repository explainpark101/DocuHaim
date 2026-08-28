import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ComponentType,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { motion as Motion } from 'motion/react';
import {
  IconChevronDown,
  IconChevronRight,
  IconFile,
  IconFileCode,
  IconFileJson,
  IconImage,
  IconImageFolder,
  IconLock,
  IconMusic,
  IconVideo,
  IconFolder,
  IconTrash,
  IconSettings,
} from '@/components/icons';
import { PencilIcon, ArrowRightToLine, AlertCircle, Loader2 } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { isEncMdPath } from '@/utils/encMd';
import { getFilePathBaseForRecordingLookup } from '@/utils/s3Tree';
import { getParentFolderPath, toDraggableId, toDroppableId } from '@/utils/treeMove';
import { useTreeNodeTouchGesture } from '@/hooks/useTreeNodeTouchGesture';
import {
  findApplicableTransferBusy,
  transferBusyTooltipText,
  type TreeTransferBusyEntry,
} from '@/utils/treeTransferBusy';
import TreeNodeModifiedLabel from '@/components/TreeNodeModifiedLabel';
import { collectOsDropPayload } from '@/utils/osDropPayload';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

const INDENT_SIZE = 12;
const BASE_LEFT_PADDING = 8;

export type SidebarTreeNode = {
  name: string;
  type: 'file' | 'folder' | string;
  path: string;
  handle?: FileSystemDirectoryHandle | null;
  children?: SidebarTreeNode[];
  childrenLoaded?: boolean;
  size?: number;
  lastModified?: unknown;
};

type RootDropNode = {
  path: string;
  type: 'folder';
  name?: string;
  handle?: FileSystemDirectoryHandle | null;
};

type DropFolderTarget = {
  path: string;
  type: 'folder';
  name: string;
  handle?: FileSystemDirectoryHandle | null;
};

type EffectiveDropTarget = SidebarTreeNode | DropFolderTarget | RootDropNode;

type TreeDropTarget = {
  storageType: string;
  folderPath: string;
};

type SelectModifiers = {
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
};

type CurrentFileRef = {
  id?: string;
  type?: string;
} | null;

type RenameTarget = {
  storageType: string;
  node: SidebarTreeNode;
};

type DropOnFolderAction = 'dragOver' | 'dragLeave' | 'drop';

type DropOnFolderPayload = {
  files?: File[];
  dirHandles?: FileSystemDirectoryHandle[];
  items?: unknown;
  copy?: boolean;
  paths?: string[];
};

type TreeRowIcon = ComponentType<{ size?: number; className?: string }>;

type EmptyItemHintProps = {
  label: string;
};

type TreeNodeProps = {
  node: SidebarTreeNode;
  level: number;
  onSelect?: ((storageType: string, node: SidebarTreeNode, modifiers: SelectModifiers) => void) | undefined;
  onCreateFile?: ((...args: unknown[]) => void) | undefined;
  onCreateFolder?: ((...args: unknown[]) => void) | undefined;
  onRequestMoveFolder?: ((node: SidebarTreeNode, storageType: string) => void) | undefined;
  onDelete?: ((node: SidebarTreeNode, storageType: string) => void) | undefined;
  selectedIds?: Set<string> | null | undefined;
  storageType: string;
  currentFile?: CurrentFileRef | undefined;
  onRename?: ((storageType: string, node: SidebarTreeNode, newName: string) => void) | undefined;
  deletingFolderPath?: string | null | undefined;
  isDeletingFolder?: boolean | undefined;
  isSearching?: boolean | undefined;
  onFolderFocus?: ((node: SidebarTreeNode | null) => void) | undefined;
  focusedFolderPath?: string | null | undefined;
  expandedPaths?: Set<string> | null | undefined;
  onExpandedChange?: ((storageType: string, path: string, expanded: boolean) => void) | undefined;
  onDropOnFolder?:
    | ((
        targetNode: EffectiveDropTarget | null,
        targetStorageType: string | null,
        action: DropOnFolderAction,
        payload?: DropOnFolderPayload,
      ) => void)
    | undefined;
  dropTarget?: TreeDropTarget | null | undefined;
  rootDropNode?: RootDropNode | null | undefined;
  onOpenContextMenu?:
    | ((
        event: MouseEvent | { preventDefault: () => void; stopPropagation: () => void },
        node: SidebarTreeNode,
      ) => void)
    | undefined;
  onActivate?: ((node: SidebarTreeNode) => void) | undefined;
  renameTarget?: RenameTarget | null | undefined;
  onClearRenameTarget?: (() => void) | undefined;
  recordingBasePathSet?: Set<string> | null | undefined;
  stickyFoldersEnabled?: boolean | undefined;
  showModifiedDate?: boolean | undefined;
  stickyTopOffset?: number | undefined;
  isFolderLoading?: string | null | undefined;
  activeDragItemIds?: Set<string> | null | undefined;
  isCopyDrag?: boolean | undefined;
  foldersOnly?: boolean | undefined;
  folderSelectMode?: boolean | undefined;
  /** When true, node cannot be dragged (e.g. mobile add-to-note picker). */
  disableDrag?: boolean | undefined;
  /** Mobile tree UI — touch drag + modal context menu. */
  mobileTree?: boolean | undefined;
  /** In-flight move/copy markers from App. */
  transferBusyItems?: TreeTransferBusyEntry[] | null | undefined;
};

function EmptyItemHint({ label }: EmptyItemHintProps) {
  return (
    <Tooltip.Provider delayDuration={280} skipDelayDuration={120}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="inline-flex shrink-0 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 rounded-full"
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <AlertCircle size={12} strokeWidth={2.5} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={6}
            className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
          >
            {label}
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default function TreeNode({
  node,
  level,
  onSelect,
  onCreateFile,
  onCreateFolder,
  onRequestMoveFolder,
  onDelete,
  selectedIds,
  storageType,
  currentFile = null,
  onRename,
  deletingFolderPath,
  isDeletingFolder,
  isSearching = false,
  onFolderFocus,
  focusedFolderPath,
  expandedPaths,
  onExpandedChange,
  onDropOnFolder,
  dropTarget,
  rootDropNode,
  onOpenContextMenu,
  onActivate,
  renameTarget,
  onClearRenameTarget,
  recordingBasePathSet = null,
  stickyFoldersEnabled = true,
  showModifiedDate = false,
  stickyTopOffset = 0,
  isFolderLoading = null,
  activeDragItemIds = null,
  isCopyDrag = false,
  foldersOnly = false,
  folderSelectMode = false,
  disableDrag = false,
  mobileTree = false,
  transferBusyItems = null,
}: TreeNodeProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState(node.name);
  const [isStickyPinned, setIsStickyPinned] = useState(false);

  useEffect(() => {
    if (
      renameTarget &&
      onClearRenameTarget &&
      renameTarget.storageType === storageType &&
      renameTarget.node?.path === node.path
    ) {
      setIsRenaming(true);
      setTempName(
        node.type === 'file'
          ? node.name?.includes('.')
            ? node.name.slice(0, node.name.lastIndexOf('.'))
            : node.name
          : node.name,
      );
      onClearRenameTarget();
    }
  }, [renameTarget, storageType, node.path, node.type, node.name, onClearRenameTarget]);

  const isOpen =
    node.type === 'folder'
      ? isSearching
        ? true
        : (expandedPaths ? expandedPaths.has(node.path) : false)
      : false;

  const selectKey = storageType && node.path != null ? `${storageType}:${node.path}` : node.path;
  const isSelected = Boolean(selectedIds?.has?.(selectKey));
  const activeFilePath =
    currentFile?.id && currentFile?.type === storageType ? currentFile.id : null;
  const isOnActivePath = Boolean(
    activeFilePath &&
      ((node.type === 'file' && node.path === activeFilePath) ||
        (node.type === 'folder' && node.path && activeFilePath.startsWith(node.path))),
  );
  const paddingLeft = `${level * INDENT_SIZE + BASE_LEFT_PADDING}px`;
  const guideLineOffsets = Array.from(
    { length: level },
    (_, depth) => INDENT_SIZE / 2 + BASE_LEFT_PADDING + depth * INDENT_SIZE,
  );

  const isTrashRoot = node.path === '.trash/';
  const displayName = isTrashRoot ? '쓰레기통' : node.name;

  const baseName = node.name.includes('.')
    ? node.name.slice(0, node.name.lastIndexOf('.'))
    : node.name;
  const extension = node.name.includes('.') ? node.name.slice(node.name.lastIndexOf('.')) : '';

  const titleContainerRef = useRef<HTMLSpanElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const scrollDirectionRef = useRef(1);

  const isUnderDeletingFolder = Boolean(
    deletingFolderPath && node.path.startsWith(deletingFolderPath),
  );
  const isDeletingThisFolder =
    isDeletingFolder && node.type === 'folder' && deletingFolderPath === node.path;
  const transferBusy = findApplicableTransferBusy(transferBusyItems, storageType, node.path);
  const isTransferBusy = Boolean(transferBusy);
  const transferBusyHint = transferBusyTooltipText(transferBusy);
  const isNodeLocked = Boolean(isUnderDeletingFolder || isTransferBusy);
  const isFocusedFolder =
    node.type === 'folder' && focusedFolderPath && node.path === focusedFolderPath;

  const isLoadingChildren =
    node.type === 'folder' && isFolderLoading && isFolderLoading === node.path;
  const isZeroByteFile = node.type === 'file' && node.size === 0;
  const isEmptyFolder =
    node.type === 'folder' &&
    !isTrashRoot &&
    !isSearching &&
    !isLoadingChildren &&
    node.childrenLoaded !== false &&
    Array.isArray(node.children) &&
    node.children.length === 0;
  const emptyHintLabel = isZeroByteFile
    ? '파일 크기가 0 byte 입니다.'
    : isEmptyFolder
      ? '하위에 내용이 없는 빈 폴더입니다.'
      : null;

  const canDrag = !disableDrag && !isTrashRoot && !isNodeLocked;
  // Dropping on a file targets its parent folder (sibling placement).
  const parentFolderPath = node.type === 'file' ? getParentFolderPath(node.path) : null;
  const effectiveDropTarget: EffectiveDropTarget =
    node.type === 'file'
      ? parentFolderPath === '' && rootDropNode
        ? rootDropNode
        : {
            path: parentFolderPath ?? '',
            type: 'folder',
            name:
              parentFolderPath === ''
                ? 'root'
                : (parentFolderPath || '').replace(/\/$/, '').split('/').pop() || 'folder',
            handle: null,
          }
      : node;
  const isDropTarget =
    dropTarget?.storageType === storageType &&
    dropTarget?.folderPath === effectiveDropTarget.path;
  const isUnderDropTarget =
    dropTarget?.storageType === storageType &&
    Boolean(dropTarget?.folderPath && node.path.startsWith(dropTarget.folderPath));
  const showDropHighlight = !isTrashRoot && !isTransferBusy && (isDropTarget || isUnderDropTarget);
  const canAcceptOsDrop = !isTrashRoot && !isTransferBusy;
  const useHtmlOsDrop = !isTauriDesktopPlatform();
  const canAcceptInternalDrop = !isTrashRoot && !isTransferBusy;

  const dragId = toDraggableId(storageType, node.path);
  const dropId = toDroppableId(storageType, node.path);

  const openContextMenuFromLongPress = useCallback(() => {
    if (!onOpenContextMenu || isNodeLocked) return;
    onOpenContextMenu(
      { preventDefault: () => {}, stopPropagation: () => {} },
      node,
    );
  }, [onOpenContextMenu, isNodeLocked, node]);

  const { contextMenuOpenedRef, bindTouchGesture } = useTreeNodeTouchGesture({
    enabled: mobileTree && Boolean(onOpenContextMenu) && !isNodeLocked,
    onContextMenu: openContextMenuFromLongPress,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: dragId,
    data: {
      storageType,
      path: node.path,
      nodeType: node.type,
      name: node.name,
    },
    disabled: !canDrag || isRenaming,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id: dropId,
    data: {
      storageType,
      path: node.path,
      nodeType: node.type,
      handle: node.type === 'folder' ? (node.handle ?? null) : null,
    },
    disabled: !canAcceptInternalDrop,
  });

  const setRowRef = useCallback(
    (el: HTMLDivElement | null) => {
      rowRef.current = el;
      setDragRef(el);
      setDropRef(el);
    },
    [setDragRef, setDropRef],
  );

  const isDragGhost =
    !isCopyDrag && (isDragging || (activeDragItemIds?.has?.(selectKey) ?? false));

  type PointerHandler = (event: ReactPointerEvent) => void;

  const composePointerHandler =
    (gestureHandler?: PointerHandler, dndHandler?: PointerHandler): PointerHandler =>
    (event) => {
      gestureHandler?.(event);
      dndHandler?.(event);
    };

  const dragAllowed = canDrag && !isRenaming;

  const dragPointerHandlers = listeners
    ? {
        onPointerDown: listeners.onPointerDown as PointerHandler | undefined,
        onPointerMove: listeners.onPointerMove as PointerHandler | undefined,
        onPointerUp: listeners.onPointerUp as PointerHandler | undefined,
        onPointerCancel: listeners.onPointerCancel as PointerHandler | undefined,
      }
    : {};

  const dragKeyboardHandlers = listeners?.onKeyDown
    ? { onKeyDown: listeners.onKeyDown as (event: KeyboardEvent) => void }
    : {};

  const rowPointerHandlers =
    mobileTree && onOpenContextMenu
      ? {
          onPointerDown: composePointerHandler(
            bindTouchGesture.onPointerDown,
            dragAllowed ? dragPointerHandlers.onPointerDown : undefined,
          ),
          onPointerMove: composePointerHandler(
            bindTouchGesture.onPointerMove,
            dragAllowed ? dragPointerHandlers.onPointerMove : undefined,
          ),
          onPointerUp: composePointerHandler(
            bindTouchGesture.onPointerUp,
            dragAllowed ? dragPointerHandlers.onPointerUp : undefined,
          ),
          onPointerCancel: composePointerHandler(
            bindTouchGesture.onPointerCancel,
            dragAllowed ? dragPointerHandlers.onPointerCancel : undefined,
          ),
        }
      : {};

  const dndProps =
    canDrag && !isRenaming
      ? mobileTree && onOpenContextMenu
        ? { ...attributes, ...dragKeyboardHandlers, ...rowPointerHandlers }
        : { ...listeners, ...attributes }
      : mobileTree && onOpenContextMenu
        ? rowPointerHandlers
        : {};

  const getFileIcon = (): TreeRowIcon => {
    if (node.type === 'folder') {
      const isSettingsFolder =
        node.name === '.settings' ||
        node.path.endsWith('/.settings') ||
        node.path.includes('/.settings/');
      if (isSettingsFolder) return IconSettings;

      const isImagesFolder =
        node.name === '.images' ||
        node.path.endsWith('/.images') ||
        node.path.includes('/.images/');
      return isImagesFolder ? IconImageFolder : IconFolder;
    }
    if (node.type !== 'file') return IconFile;
    if (isEncMdPath(node.name) || isEncMdPath(node.path)) return IconLock;
    const lower = node.name.toLowerCase();
    const lastDot = lower.lastIndexOf('.');
    const ext = lastDot > -1 ? lower.slice(lastDot + 1) : '';
    const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'];
    const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
    const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];

    if (imageExts.includes(ext)) return IconImage;
    if (videoExts.includes(ext)) return IconVideo;
    if (audioExts.includes(ext)) return IconMusic;
    if (ext === 'pdf') return IconFileJson;
    if (
      ext === 'md' ||
      ext === 'markdown' ||
      ext === 'mdx' ||
      ext === 'html' ||
      ext === 'htm' ||
      ext === 'svg'
    ) {
      return IconFileCode;
    }
    return IconFile;
  };

  const getIconColorClass = (): string => {
    if (node.type === 'folder') {
      if (isTrashRoot) return 'text-red-600 dark:text-red-400';
      const isSettingsFolder =
        node.name === '.settings' ||
        node.path.endsWith('/.settings') ||
        node.path.includes('/.settings/');
      if (isSettingsFolder) return 'text-blue-600 dark:text-blue-300';
      const isImagesFolder =
        node.name === '.images' ||
        node.path.endsWith('/.images') ||
        node.path.includes('/.images/');
      if (isImagesFolder) return 'text-green-600 dark:text-green-400';
      return 'text-yellow-600 dark:text-yellow-400';
    }
    const lower = node.name.toLowerCase();
    if (isEncMdPath(node.name) || isEncMdPath(node.path)) {
      return 'text-violet-600 dark:text-violet-400';
    }
    const lastDot = lower.lastIndexOf('.');
    const ext = lastDot > -1 ? lower.slice(lastDot + 1) : '';
    const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'];
    const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
    const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
    if (imageExts.includes(ext)) return 'text-green-600 dark:text-green-400';
    if (videoExts.includes(ext)) return 'text-orange-600 dark:text-orange-400';
    if (audioExts.includes(ext)) return 'text-purple-600 dark:text-purple-400';
    if (ext === 'pdf') return 'text-red-500 dark:text-red-400';
    if (ext === 'html' || ext === 'htm' || ext === 'svg') {
      return 'text-sky-600 dark:text-sky-400';
    }
    if (ext === 'md' || ext === 'markdown' || ext === 'mdx') {
      if (recordingBasePathSet?.size && node.path) {
        const base = getFilePathBaseForRecordingLookup(node.path);
        if (base && recordingBasePathSet.has(base)) {
          return 'text-teal-600 dark:text-teal-400';
        }
      }
      return 'text-gray-600 dark:text-gray-100';
    }
    return 'text-blue-600 dark:text-blue-400';
  };

  const FileIconComponent = getFileIcon();
  const iconColorClass = getIconColorClass();

  const startTitleScroll = () => {
    const el = titleContainerRef.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) return;

    if (scrollTimerRef.current) {
      window.clearInterval(scrollTimerRef.current);
    }

    scrollDirectionRef.current = 1;
    scrollTimerRef.current = window.setInterval(() => {
      const target = titleContainerRef.current;
      if (!target) return;

      const dir = scrollDirectionRef.current;
      if (dir > 0) {
        if (target.scrollLeft + target.clientWidth >= target.scrollWidth) {
          scrollDirectionRef.current = -1;
        } else {
          target.scrollLeft += 1;
        }
      } else if (target.scrollLeft <= 0) {
        scrollDirectionRef.current = 1;
      } else {
        target.scrollLeft -= 1;
      }
    }, 30);
  };

  const stopTitleScroll = () => {
    if (scrollTimerRef.current) {
      window.clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    if (titleContainerRef.current) {
      titleContainerRef.current.scrollLeft = 0;
    }
  };

  const handleOsDragOver = (e: DragEvent) => {
    if (!canAcceptOsDrop) return;
    const dt = e.dataTransfer;
    const hasFiles =
      dt.types?.includes?.('Files') || dt.files?.length > 0 || dt.items?.length > 0;
    if (!hasFiles) return;
    e.preventDefault();
    e.stopPropagation();
    dt.dropEffect = 'copy';
    onDropOnFolder?.(effectiveDropTarget, storageType, 'dragOver');
  };

  const handleOsDrop = async (e: DragEvent) => {
    if (!canAcceptOsDrop) return;
    e.preventDefault();
    e.stopPropagation();
    const { files, dirHandles } = await collectOsDropPayload(e.dataTransfer);
    if (files.length > 0 || dirHandles.length > 0) {
      onDropOnFolder?.(effectiveDropTarget, storageType, 'drop', { files, dirHandles });
    }
  };

  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (isNodeLocked) return;
    if (contextMenuOpenedRef.current) {
      contextMenuOpenedRef.current = false;
      return;
    }

    onActivate?.(node);

    const modifiers: SelectModifiers = {
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey,
    };
    const hasModifier = e.ctrlKey || e.metaKey || e.shiftKey;

    if (node.type === 'folder') {
      if (folderSelectMode) {
        if (onExpandedChange && !isSearching) {
          onExpandedChange(storageType, node.path, !isOpen);
        }
        onFolderFocus?.(node);
        onSelect?.(storageType, node, modifiers);
      } else if (hasModifier) {
        onSelect?.(storageType, node, modifiers);
      } else {
        if (onExpandedChange && !isSearching) {
          onExpandedChange(storageType, node.path, !isOpen);
        }
        onFolderFocus?.(node);
      }
    } else {
      if (onFolderFocus && !node.path.includes('/')) onFolderFocus(null);
      onSelect?.(storageType, node, modifiers);
    }
  };

  const handleRenameStart = (e: MouseEvent) => {
    e.stopPropagation();
    if (isNodeLocked) return;
    if (node.type === 'file') {
      setTempName(baseName);
    } else if (node.type === 'folder') {
      setTempName(node.name);
    } else return;
    setIsRenaming(true);
  };

  const commitRename = () => {
    if (isNodeLocked) {
      setIsRenaming(false);
      return;
    }
    const trimmed = tempName.trim();
    if (!trimmed) {
      setTempName(node.type === 'file' ? baseName : node.name);
      setIsRenaming(false);
      return;
    }
    if (trimmed.includes('/')) {
      alert(
        node.type === 'folder'
          ? "폴더 이름에는 '/' 문자를 사용할 수 없습니다."
          : "파일 이름에는 '/' 문자를 사용할 수 없습니다.",
      );
      setTempName(node.type === 'file' ? baseName : node.name);
      setIsRenaming(false);
      return;
    }

    if (node.type === 'file') {
      if (trimmed === baseName) {
        setIsRenaming(false);
        return;
      }
      onRename?.(storageType, node, trimmed);
    } else if (node.type === 'folder') {
      if (trimmed === node.name) {
        setIsRenaming(false);
        return;
      }
      onRename?.(storageType, node, trimmed);
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      commitRename();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setTempName(node.type === 'file' ? baseName : node.name);
      setIsRenaming(false);
    }
  };

  const shouldShowStickyFolder =
    stickyFoldersEnabled &&
    node.type === 'folder' &&
    isOpen &&
    !isSearching &&
    Array.isArray(node.children) &&
    node.children.length > 0;
  const stickyRowStyle = shouldShowStickyFolder
    ? {
        paddingLeft,
        top: `${stickyTopOffset + level * 30}px`,
        zIndex: 1000 - level,
      }
    : { paddingLeft };

  useEffect(() => {
    if (!shouldShowStickyFolder) {
      setIsStickyPinned(false);
      return;
    }

    const rowEl = rowRef.current;
    if (!rowEl) return;

    const findScrollParent = (el: HTMLElement): Element | Window => {
      let current: HTMLElement | null = el.parentElement;
      while (current) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY || '';
        if (overflowY === 'auto' || overflowY === 'scroll') return current;
        current = current.parentElement;
      }
      return window;
    };

    const scrollParent = findScrollParent(rowEl);
    let rafId: number | null = null;
    const updatePinnedState = () => {
      const nodeEl = rowRef.current;
      if (!nodeEl) return;
      const nodeTop = nodeEl.getBoundingClientRect().top;
      const threshold = stickyTopOffset + level * 30;
      setIsStickyPinned(nodeTop <= threshold + 0.5);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updatePinnedState();
      });
    };

    updatePinnedState();
    scrollParent.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      scrollParent.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [shouldShowStickyFolder, stickyTopOffset, level]);

  return (
    <div className={shouldShowStickyFolder ? 'relative' : ''}>
      <Motion.div
        ref={setRowRef}
        data-tree-node-row
        data-tree-drop-storage={canAcceptOsDrop ? storageType : undefined}
        data-tree-drop-path={canAcceptOsDrop ? effectiveDropTarget.path : undefined}
        layout={false}
        animate={{
          opacity: isDragGhost ? 0 : 1,
        }}
        transition={{ duration: 0 }}
        {...dndProps}
        onDragOver={canAcceptOsDrop && useHtmlOsDrop ? handleOsDragOver : undefined}
        onDrop={canAcceptOsDrop && useHtmlOsDrop ? handleOsDrop : undefined}
        className={`group relative flex items-center justify-between py-1.5 pr-2 transition-colors ${
          isSelected
            ? 'bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg'
        } ${isNodeLocked ? 'opacity-60 cursor-not-allowed pointer-events-auto' : 'cursor-pointer'} ${
          isFocusedFolder
            ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1 ring-offset-white dark:ring-offset-odp-bgSofter'
            : ''
        } ${showDropHighlight ? 'bg-blue-100 dark:bg-blue-900/40' : ''} ${
          mobileTree ? 'touch-pan-y' : ''
        } ${
          shouldShowStickyFolder
            ? 'sticky bg-white/95 dark:bg-odp-bgSoft/95 backdrop-blur-[1px] border-b border-gray-200/80 dark:border-odp-borderSoft'
            : ''
        } ${
          shouldShowStickyFolder && isStickyPinned && !isSelected && !showDropHighlight
            ? 'bg-gray-50 dark:bg-odp-surface'
            : ''
        }`}
        style={stickyRowStyle}
        onClick={handleToggle}
        onContextMenu={
          onOpenContextMenu
            ? (e) => {
                if (mobileTree) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (!isNodeLocked) {
                  onOpenContextMenu(e, node);
                }
              }
            : undefined
        }
      >
        {guideLineOffsets.length > 0 && (
          <div className="pointer-events-none absolute inset-y-0 left-0">
            {guideLineOffsets.map((offset) => (
              <span
                key={`guide-${node.path}-${offset}`}
                className="absolute inset-y-0 w-px bg-gray-300 dark:bg-gray-600/80"
                style={{ left: `${offset}px` }}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="text-gray-400 dark:text-gray-500 w-4 flex justify-center shrink-0">
            {node.type === 'folder' ? (
              isLoadingChildren ? (
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 dark:border-gray-600 dark:border-t-blue-400" />
              ) : isOpen ? (
                <IconChevronDown />
              ) : (
                <IconChevronRight />
              )
            ) : null}
          </span>
          <span className={`${iconColorClass} shrink-0 inline-flex items-center gap-0.5`}>
            {isTransferBusy ? (
              <Tooltip.Provider delayDuration={200} skipDelayDuration={80}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span
                      className="inline-flex"
                      aria-label={transferBusyHint || '전송 중'}
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <Loader2 size={14} className="animate-spin text-blue-500 dark:text-blue-400" />
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="z-100001 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
                    >
                      {transferBusyHint || '전송 중'}
                      <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : node.type === 'folder' ? (
              isTrashRoot ? (
                <IconTrash />
              ) : (
                <FileIconComponent />
              )
            ) : (
              <FileIconComponent />
            )}
            {!isTransferBusy && emptyHintLabel ? (
              <EmptyItemHint label={emptyHintLabel} />
            ) : null}
          </span>
          {isRenaming && !isTrashRoot && (node.type === 'file' || node.type === 'folder') ? (
            <span className="flex items-baseline gap-1 min-w-0">
              <input
                className="bg-transparent border-none outline-none text-sm font-medium truncate placeholder:text-gray-400 dark:placeholder:text-gray-500"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={commitRename}
                onKeyDown={handleRenameKeyDown}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                placeholder={
                  node.type === 'file' ? baseName || '이름 없음' : node.name || '폴더명'
                }
              />
              {node.type === 'file' && extension && (
                <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                  {extension}
                </span>
              )}
            </span>
          ) : (
            <span className="flex min-w-0 flex-col overflow-hidden">
              <span
                ref={titleContainerRef}
                className={`text-sm select-none overflow-hidden whitespace-nowrap ${
                  isTrashRoot
                    ? 'font-semibold text-red-600 dark:text-red-400'
                    : isOnActivePath
                      ? 'font-bold underline'
                      : ''
                }`}
                title={displayName}
                onMouseEnter={startTitleScroll}
                onMouseLeave={stopTitleScroll}
              >
                {displayName}
              </span>
              {showModifiedDate && node.type === 'file' && !isTrashRoot && node.lastModified ? (
                <TreeNodeModifiedLabel
                  lastModified={node.lastModified}
                  className="text-gray-400/75 dark:text-gray-500/80"
                />
              ) : null}
            </span>
          )}
        </div>

        <div className="hidden opacity-100 flex items-center gap-1 shrink-0 transition-opacity">
          {node.type === 'folder' && !isTrashRoot && onRequestMoveFolder && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isNodeLocked) return;
                onRequestMoveFolder(node, storageType);
              }}
              disabled={isTransferBusy}
              className="p-1 rounded text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-40 disabled:pointer-events-none"
              aria-label="폴더 위치 이동"
            >
              <ArrowRightToLine size={12} />
            </button>
          )}
          {node.type === 'file' && !isTrashRoot && (
            <button
              onClick={handleRenameStart}
              disabled={isTransferBusy}
              className="px-2 py-1 text-[11px] rounded text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-40 disabled:pointer-events-none"
              aria-label="파일명 수정"
            >
              <PencilIcon className="size-3.5" />
            </button>
          )}
          {node.type === 'folder' && !isTrashRoot && (
            <button
              onClick={handleRenameStart}
              disabled={isTransferBusy}
              className="p-1 rounded text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-40 disabled:pointer-events-none"
              aria-label="폴더명 수정"
            >
              <PencilIcon className="size-3.5" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isNodeLocked) return;
              onDelete?.(node, storageType);
            }}
            disabled={isDeletingThisFolder || isTransferBusy}
            className={`p-1 rounded text-gray-500 dark:text-gray-300 ${
              isDeletingThisFolder || isTransferBusy
                ? 'opacity-60 cursor-wait'
                : 'hover:bg-gray-200 dark:hover:bg-odp-focusBg hover:text-red-600 dark:hover:text-red-400'
            }`}
            aria-label="삭제"
          >
            <IconTrash />
          </button>
        </div>
      </Motion.div>

      {isOpen &&
        node.type === 'folder' &&
        node.children
          ?.filter((child) => !foldersOnly || child.type === 'folder')
          .map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
              onRequestMoveFolder={onRequestMoveFolder}
              onDelete={onDelete}
              selectedIds={selectedIds}
              storageType={storageType}
              currentFile={currentFile}
              onRename={onRename}
              deletingFolderPath={deletingFolderPath}
              isDeletingFolder={isDeletingFolder}
              isSearching={isSearching}
              expandedPaths={expandedPaths}
              onExpandedChange={onExpandedChange}
              onFolderFocus={onFolderFocus}
              focusedFolderPath={focusedFolderPath}
              onDropOnFolder={onDropOnFolder}
              dropTarget={dropTarget}
              rootDropNode={rootDropNode}
              onOpenContextMenu={onOpenContextMenu}
              onActivate={onActivate}
              renameTarget={renameTarget}
              onClearRenameTarget={onClearRenameTarget}
              recordingBasePathSet={recordingBasePathSet}
              stickyFoldersEnabled={stickyFoldersEnabled}
              showModifiedDate={showModifiedDate}
              stickyTopOffset={stickyTopOffset}
              isFolderLoading={isFolderLoading}
              activeDragItemIds={activeDragItemIds}
              isCopyDrag={isCopyDrag}
              foldersOnly={foldersOnly}
              folderSelectMode={folderSelectMode}
              disableDrag={disableDrag}
              mobileTree={mobileTree}
              transferBusyItems={transferBusyItems}
            />
          ))}
    </div>
  );
}
