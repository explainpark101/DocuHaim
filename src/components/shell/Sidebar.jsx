import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import TreeNode from '@/components/TreeNode';
import { useTauriTreeDragDrop } from '@/hooks/useTauriTreeDragDrop';
import {
  RootDropZone,
  TreeDragOverlayPreview,
  treeCollisionDetection,
} from '@/components/treeDnd';
import ChatTreeAttachDroppable from '@/components/chatWithMyself/ChatTreeAttachDroppable';
import { isChatTreeAttachDroppableId } from '@/utils/chatWithMyself';
import {
  findNodeByPath,
  isRecordingCompanionFileKey,
  buildRecordingBasePathSetFromTrees,
} from '@/utils/s3Tree';
import {
  getParentFolderPath,
  resolveDragItems,
  resolveDeleteTargets,
  parseDroppableId,
  toTreeSelectKey,
} from '@/utils/treeMove';
import { findApplicableTransferBusy } from '@/utils/treeTransferBusy';
import { useTreeCopyDragModifier } from '@/hooks/useTreeCopyDragModifier';
import { useIsCoarsePointer } from '@/hooks/useIsCoarsePointer';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import {
  loadExpandedFolderPaths,
  saveExpandedFolderPaths,
} from '@/utils/expandedFoldersStore';
import {
  IconCloud,
  IconFilePlus,
  IconFolder,
  IconFolderPlus,
  IconSettings,
  IconSun,
  IconMoon,
  IconUpload,
  IconRefresh,
  IconCheck,
} from '@/components/icons';
import { ArrowRightToLine, ChevronsLeft, Download, Loader2, MessageCircle, X } from 'lucide-react';
import AdvancedSearchSidebarTrigger from '@/components/advancedSearch/AdvancedSearchSidebarTrigger';
import SidebarContextMenu from '@/components/SidebarContextMenu';
import SessionTreeList from '@/components/SessionTreeList';
import {
  AdaptiveContextMenu,
  AdaptiveMenuItem,
} from '@/components/contextMenu/AdaptiveContextMenu';
import { MOBILE_CONTEXT_MENU_ITEM_CLASS } from '@/components/contextMenu/mobileContextMenuStyles';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
  getAppNameByStorageMode,
} from '@/utils/storageSettings';
import { isLocalVaultReady } from '@/utils/localVaultReady';

const EMPTY_SELECTED_IDS = new Set();

const BRAND_STORAGE_MODES = [
  STORAGE_MODE_S3,
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_WEBDAV,
];

const SIDEBAR_BRAND_MENU_CONTENT_CLASS =
  'z-100010 min-w-[180px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const SIDEBAR_BRAND_MENU_ITEM_CLASS =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg';

const BRAND_LONG_PRESS_MS = 500;
/** Above main pane / chat drop overlay; DragOverlay is portaled to document.body. */
const TREE_DRAG_OVERLAY_Z_INDEX = 100060;

function getParentPathFromFilePath(filePath) {
  return getParentFolderPath(filePath);
}

function isRenameableTreeNode(node) {
  if (!node || node.path === '.trash/' || node.path === '') return false;
  return node.type === 'file' || node.type === 'folder';
}

function isTypingElement(target) {
  if (!target || typeof target !== 'object') return false;
  const el = /** @type {HTMLElement} */ (target);
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  // CodeMirror / Monaco / TipTap may bubble from non-editable chrome.
  if (typeof el.closest === 'function') {
    if (
      el.closest(
        '.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]',
      )
    ) {
      return true;
    }
  }
  return false;
}

function isEventInsideSidebarTree(target) {
  if (!target || typeof target !== 'object' || typeof target.closest !== 'function') {
    return false;
  }
  return Boolean(
    target.closest('[data-sidebar-tree-scroll], [data-tree-node-row], [data-tree-root-drop-zone]'),
  );
}

function ChatWithMyselfEntry({ isActive, onOpen }) {
  return (
    <button
      type="button"
      data-chat-with-myself-entry
      onClick={(e) => {
        e.stopPropagation();
        onOpen?.();
      }}
      className={`flex w-full items-center gap-1.5 py-1.5 pr-2 px-2 transition-colors text-sm cursor-pointer text-left ${
        'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-odp-focusBg rounded'
      } ${
        isActive
          ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1 ring-offset-white dark:ring-offset-odp-bgSofter'
          : ''
      }`}
      style={{ paddingLeft: '8px' }}
    >
      <span className="text-violet-400 dark:text-violet-500 w-4 flex justify-center shrink-0">
        <MessageCircle size={14} />
      </span>
      <span className="text-gray-500 dark:text-gray-400 truncate">나와의 채팅</span>
    </button>
  );
}

function filterTree(
  nodes,
  { hideDotFolders, hideTrashFolder, hideRecordingCompanionFiles, searchTerm } = {},
) {
  const q = searchTerm ? searchTerm.toLowerCase() : '';
  const isTrashFolder = (node) =>
    node.type === 'folder' && (node.name === '.trash' || node.path === '.trash/');
  const walk = (node) => {
    if (node.type === 'folder') {
      if (isTrashFolder(node)) {
        if (hideTrashFolder) return null;
      } else if (hideDotFolders && node.name.startsWith('.')) {
        return null;
      }
    }
    if (node.type === 'file' && hideRecordingCompanionFiles && isRecordingCompanionFileKey(node.path)) {
      return null;
    }
    const nameMatch =
      !q ||
      node.name.toLowerCase().includes(q) ||
      (node.path && node.path.toLowerCase().includes(q));
    if (node.type === 'folder' && node.children) {
      const children = node.children
        .map(walk)
        .filter(Boolean);
      if (children.length || nameMatch) {
        return { ...node, children };
      }
      return null;
    }
    return nameMatch ? node : null;
  };

  return nodes
    .map(walk)
    .filter(Boolean);
}

function getSelectedFolderForMove(selectedIds, s3Tree, localTree, webdavTree) {
  if (!selectedIds?.size) return null;
  for (const key of selectedIds) {
    const colonIdx = key.indexOf(':');
    const storageType = colonIdx >= 0 ? key.slice(0, colonIdx) : 's3';
    const path = colonIdx >= 0 ? key.slice(colonIdx + 1) : key;
    const tree =
      storageType === 's3'
        ? s3Tree
        : storageType === 'webdav'
          ? webdavTree
          : localTree;
    const node = findNodeByPath(tree, path);
    if (node?.type === 'folder' && path !== '.trash/') {
      return { node, storageType };
    }
  }
  return null;
}

function expandedSetForStorageType(expanded, storageType) {
  if (storageType === 's3') return expanded.s3;
  if (storageType === 'webdav') return expanded.webdav;
  return expanded.local;
}

export default function Sidebar({
  appName = 'Docu Haim',
  storageMode = 's3',
  s3Tree,
  s3Bucket,
  localTree,
  localRootHandle,
  localVaultFsPath = '',
  isLocalTreeLoading = false,
  localFolderLoadingPath = null,
  onLoadLocalFolderChildren,
  onRefreshLocal,
  webdavTree = [],
  webdavReady = false,
  isWebdavTreeLoading = false,
  webdavFolderLoadingPath = null,
  onRefreshWebdav,
  onLoadWebdavFolderChildren,
  currentFile,
  selectedIds,
  onSelectFile,
  onClearSelection,
  onCreateItem,
  onRequestUploadFile,
  onRequestUploadFolder,
  onRequestMoveFolder,
  onOpenLocalFolder,
  onSetDeleteTarget,
  onRequestEmptyTrash,
  onOpenSettings,
  theme,
  onToggleTheme,
  onRenameItem,
  showHiddenFolders,
  showTrashFolder = false,
  hideRecordingCompanions = false,
  treeStickyFolderPathEnabled = true,
  showTreeModifiedDate = false,
  hoverExpandDelayMs = 2000,
  onRequestCollapseSidebar,
  deletingFolderPath,
  isDeletingFolder,
  onDropOnFolder,
  onDragEndNode,
  dropTarget,
  transferBusyItems = null,
  expandPathsRef,
  onRefreshS3,
  onDownloadNode,
  onDuplicateNode,
  onRequestMoveFile,
  onOpenInNewWindow,
  onShareToChatWithMyself,
  onOpenChatWithMyself,
  chatWithMyselfActive = false,
  /** Host element on ChatWithMyselfPane for portaled tree→attach droppable. */
  chatAttachDropHost = null,
  /** Called when tree items are dropped onto the chat attach zone. */
  onDropToChatAttach,
  onBrandClick,
  onStorageModeChange,
  sessionWorkspace = null,
  sessionTree = [],
  onCloseSessionWorkspace,
  /** App mobile layout (max-width 768px) — enables touch tree drag + modal menu. */
  isMobileLayout = false,
  /**
   * Ref filled with `{ open(args) }` so workspace file tabs can open this same menu.
   * `open({ storageType, path, name?, currentFile?, clientX?, clientY?, onCloseTab? })`
   */
  fileTabContextMenuRef = null,
}) {
  const TREE_STICKY_SECTION_TOP = 33;
  const coarsePointer = useIsCoarsePointer();
  const mobileTree = isMobileLayout || coarsePointer;
  const mobileContextMenu = useMobileContextMenuMode(isMobileLayout);
  useTauriTreeDragDrop(onDropOnFolder);
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const brandLongPressTimerRef = useRef(null);
  const brandLongPressOpenedRef = useRef(false);
  const brandPressStartRef = useRef(null);

  const clearBrandLongPress = useCallback(() => {
    if (brandLongPressTimerRef.current) {
      clearTimeout(brandLongPressTimerRef.current);
      brandLongPressTimerRef.current = null;
    }
    brandPressStartRef.current = null;
  }, []);

  useEffect(() => () => clearBrandLongPress(), [clearBrandLongPress]);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const isSearchPending = searchInput !== searchTerm;
  /** null = no explicit folder; '' = bucket/project root selected */
  const [lastFocusedS3FolderPath, setLastFocusedS3FolderPath] = useState(null);
  /** null = no explicit folder; { path: '', handle } = project root */
  const [lastFocusedLocalFolder, setLastFocusedLocalFolder] = useState(null);
  /** null = no explicit folder; '' = WebDAV root selected */
  const [lastFocusedWebdavFolderPath, setLastFocusedWebdavFolderPath] = useState(null);

  // While Chat with Myself is open, tree must not show another file/folder as selected.
  const treeSelectedIds = chatWithMyselfActive ? EMPTY_SELECTED_IDS : selectedIds;
  const treeCurrentFile = chatWithMyselfActive ? null : currentFile;

  const [expandedPaths, setExpandedPaths] = useState(loadExpandedFolderPaths);
  const [contextMenu, setContextMenu] = useState(null);
  const [renameTarget, setRenameTarget] = useState(null);
  const [lastActivatedNode, setLastActivatedNode] = useState(null);
  const [isS3Refreshing, setIsS3Refreshing] = useState(false);
  const [isS3SpinFinishing, setIsS3SpinFinishing] = useState(false);
  const [activeDragItems, setActiveDragItems] = useState(null);
  const { isCopyDrag, isCopyDragRef, syncFromEvent: syncCopyModifierFromEvent } =
    useTreeCopyDragModifier(Boolean(activeDragItems?.length));
  const scrollContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const activeDragItemsRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const hoverExpandTimerRef = useRef(null);
  const hoverExpandKeyRef = useRef(null);
  const hoverExpandDelayMsRef = useRef(hoverExpandDelayMs);
  const expandedPathsRef = useRef(expandedPaths);
  const searchTermRef = useRef(searchTerm);
  const handleExpandedChangeRef = useRef(null);

  expandedPathsRef.current = expandedPaths;
  searchTermRef.current = searchTerm;
  hoverExpandDelayMsRef.current = hoverExpandDelayMs;

  const clearHoverExpandTimer = useCallback(() => {
    if (hoverExpandTimerRef.current != null) {
      clearTimeout(hoverExpandTimerRef.current);
      hoverExpandTimerRef.current = null;
    }
    hoverExpandKeyRef.current = null;
  }, []);

  useEffect(() => () => clearHoverExpandTimer(), [clearHoverExpandTimer]);

  const scheduleHoverExpandFolder = useCallback(
    (storageType, folderPath) => {
      if (!folderPath || folderPath === '.trash/') {
        clearHoverExpandTimer();
        return;
      }
      if (searchTermRef.current) {
        clearHoverExpandTimer();
        return;
      }
      const expandedSet = expandedSetForStorageType(expandedPathsRef.current, storageType);
      if (expandedSet?.has(folderPath)) {
        clearHoverExpandTimer();
        return;
      }

      const key = `${storageType}:${folderPath}`;
      if (hoverExpandKeyRef.current === key) return;

      clearHoverExpandTimer();
      hoverExpandKeyRef.current = key;
      const delayMs = Math.max(0, Number(hoverExpandDelayMsRef.current) || 0);
      hoverExpandTimerRef.current = setTimeout(() => {
        hoverExpandTimerRef.current = null;
        hoverExpandKeyRef.current = null;
        handleExpandedChangeRef.current?.(storageType, folderPath, true);
      }, delayMs);
    },
    [clearHoverExpandTimer],
  );
  const EDGE_THRESHOLD = 48;
  const AUTO_SCROLL_SPEED = 12;

  const sensors = useSensors(
    useSensor(
      mobileTree ? TouchSensor : PointerSensor,
      {
        activationConstraint: { distance: 8 },
      },
    ),
  );

  const findTreeNode = useCallback(
    (storageType, path) => {
      if (storageType === 'session') {
        return findNodeByPath(sessionTree, path);
      }
      const tree =
        storageType === 's3'
          ? s3Tree
          : storageType === 'webdav'
            ? webdavTree
            : localTree;
      return findNodeByPath(tree, path);
    },
    [s3Tree, localTree, webdavTree, sessionTree],
  );

  const resolveDropTargetNode = useCallback(
    (storageType, path) => {
      if (path === '' || path == null) {
        return {
          path: '',
          type: 'folder',
          name: 'root',
          handle: storageType === 'local' ? localRootHandle : null,
        };
      }
      const node = findTreeNode(storageType, path);
      if (!node) return null;
      if (node.type === 'folder') return node;
      if (node.type !== 'file') return null;

      // Dropping on a file moves into its parent directory (as a sibling).
      const parentPath = getParentFolderPath(node.path);
      if (parentPath === '') {
        return {
          path: '',
          type: 'folder',
          name: 'root',
          handle: storageType === 'local' ? localRootHandle : null,
        };
      }
      const parent = findTreeNode(storageType, parentPath);
      if (parent?.type === 'folder') return parent;
      return {
        path: parentPath,
        type: 'folder',
        name: parentPath.replace(/\/$/, '').split('/').pop() || 'folder',
        handle: null,
      };
    },
    [findTreeNode, localRootHandle],
  );

  const requestDeleteNode = useCallback(
    (node, storageType) => {
      if (!node) return;
      if (findApplicableTransferBusy(transferBusyItems, storageType, node.path)) return;
      if (node.path === '.trash/') {
        onRequestEmptyTrash?.(node, storageType);
        return;
      }
      if (!onSetDeleteTarget) return;
      const targets = resolveDeleteTargets(node, storageType, selectedIds, findTreeNode);
      if (!targets.length) return;
      onSetDeleteTarget(targets.length === 1 ? targets[0] : { targets });
    },
    [findTreeNode, onRequestEmptyTrash, onSetDeleteTarget, selectedIds, transferBusyItems],
  );

  const handleDragStartNode = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const handleDragEndNode = useCallback(() => {
    isDraggingRef.current = false;
    clearHoverExpandTimer();
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    onDragEndNode?.();
  }, [clearHoverExpandTimer, onDragEndNode]);

  const handleDndDragStart = useCallback(
    (event) => {
      const activeId = String(event.active.id);
      const items = resolveDragItems(activeId, selectedIds, findTreeNode);
      activeDragItemsRef.current = items;
      setActiveDragItems(items);
      syncCopyModifierFromEvent(event.activatorEvent);
      handleDragStartNode();
    },
    [selectedIds, findTreeNode, handleDragStartNode, syncCopyModifierFromEvent],
  );

  const handleDndDragOver = useCallback(
    (event) => {
      const { over } = event;
      if (!over) {
        clearHoverExpandTimer();
        onDropOnFolder?.(null, null, 'dragLeave');
        return;
      }
      if (isChatTreeAttachDroppableId(over.id)) {
        clearHoverExpandTimer();
        onDropOnFolder?.(null, null, 'dragLeave');
        return;
      }
      const parsed = parseDroppableId(String(over.id));
      if (!parsed) {
        clearHoverExpandTimer();
        return;
      }

      // Expand only when hovering the folder row itself (not a file → parent resolve).
      const overNode =
        parsed.path === '' || parsed.path == null
          ? null
          : findTreeNode(parsed.storageType, parsed.path);
      if (overNode?.type === 'folder') {
        scheduleHoverExpandFolder(parsed.storageType, overNode.path);
      } else {
        clearHoverExpandTimer();
      }

      const targetNode = resolveDropTargetNode(parsed.storageType, parsed.path);
      if (!targetNode) return;
      onDropOnFolder?.(targetNode, parsed.storageType, 'dragOver');
    },
    [
      clearHoverExpandTimer,
      findTreeNode,
      onDropOnFolder,
      resolveDropTargetNode,
      scheduleHoverExpandFolder,
    ],
  );

  const handleDndDragEnd = useCallback(
    (event) => {
      const { over } = event;
      const items = activeDragItemsRef.current;
      const copy = isCopyDragRef.current;
      activeDragItemsRef.current = null;
      setActiveDragItems(null);
      clearHoverExpandTimer();
      handleDragEndNode();

      if (!over || !items?.length) {
        onDropOnFolder?.(null, null, 'dragLeave');
        return;
      }

      if (isChatTreeAttachDroppableId(over.id)) {
        onDropOnFolder?.(null, null, 'dragLeave');
        onDropToChatAttach?.(items);
        return;
      }

      const parsed = parseDroppableId(String(over.id));
      if (!parsed) {
        onDropOnFolder?.(null, null, 'dragLeave');
        return;
      }

      const targetNode = resolveDropTargetNode(parsed.storageType, parsed.path);
      if (!targetNode) {
        onDropOnFolder?.(null, null, 'dragLeave');
        return;
      }

      onDropOnFolder?.(targetNode, parsed.storageType, 'drop', { items, copy });
    },
    [
      clearHoverExpandTimer,
      handleDragEndNode,
      isCopyDragRef,
      onDropOnFolder,
      onDropToChatAttach,
      resolveDropTargetNode,
    ],
  );

  const handleDndDragCancel = useCallback(() => {
    activeDragItemsRef.current = null;
    setActiveDragItems(null);
    clearHoverExpandTimer();
    handleDragEndNode();
    onDropOnFolder?.(null, null, 'dragLeave');
  }, [clearHoverExpandTimer, handleDragEndNode, onDropOnFolder]);

  const activeDragItemIds = useMemo(() => {
    if (!activeDragItems?.length) return null;
    return new Set(activeDragItems.map((item) => toTreeSelectKey(item.storageType, item.path)));
  }, [activeDragItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!isDraggingRef.current) return;
      const rect = el.getBoundingClientRect();
      const isOver =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (isOver) {
        el.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', onWheel, { passive: false });
    return () => document.removeEventListener('wheel', onWheel);
  }, []);


  useEffect(() => {
    const onDragEnd = () => {
      isDraggingRef.current = false;
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
    document.addEventListener('dragend', onDragEnd);
    document.addEventListener('drop', onDragEnd);
    return () => {
      document.removeEventListener('dragend', onDragEnd);
      document.removeEventListener('drop', onDragEnd);
    };
  }, []);

  const handleScrollAreaDragEnter = useCallback((e) => {
    const hasDragData = e.dataTransfer?.types?.includes?.('Files');
    if (hasDragData) isDraggingRef.current = true;
  }, []);

  const handleScrollAreaDragOver = useCallback((e) => {
    const el = scrollContainerRef.current;
    const hasDragData =
      e.dataTransfer?.types?.includes?.('Files') && e.dataTransfer?.items?.length > 0;
    if (!el || !hasDragData) return;
    const rect = el.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = EDGE_THRESHOLD;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };

    if (y < threshold) {
      if (!autoScrollIntervalRef.current) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (el) {
            el.scrollTop = Math.max(0, el.scrollTop - AUTO_SCROLL_SPEED);
          } else {
            stopAutoScroll();
          }
        }, 16);
      }
    } else if (y > rect.height - threshold) {
      if (!autoScrollIntervalRef.current) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (el) {
            el.scrollTop = Math.min(el.scrollHeight - el.clientHeight, el.scrollTop + AUTO_SCROLL_SPEED);
          } else {
            stopAutoScroll();
          }
        }, 16);
      }
    } else {
      stopAutoScroll();
    }
  }, []);

  const handleExpandedChange = useCallback((storageType, path, isOpen) => {
    setExpandedPaths((prev) => {
      const next = {
        s3: new Set(prev.s3),
        local: new Set(prev.local),
        webdav: new Set(prev.webdav),
      };
      const set = expandedSetForStorageType(next, storageType);
      if (isOpen) set.add(path);
      else set.delete(path);
      saveExpandedFolderPaths(next);
      return next;
    });

    if (storageType === 'local' && isOpen && onLoadLocalFolderChildren) {
      const node = findNodeByPath(localTree, path);
      if (node?.type === 'folder' && node.childrenLoaded !== true) {
        void onLoadLocalFolderChildren(node);
      }
    }

    if (storageType === 'webdav' && isOpen && onLoadWebdavFolderChildren) {
      const node = findNodeByPath(webdavTree, path);
      if (node?.type === 'folder' && node.childrenLoaded !== true) {
        void onLoadWebdavFolderChildren(node);
      }
    }
  }, [localTree, webdavTree, onLoadLocalFolderChildren, onLoadWebdavFolderChildren]);

  handleExpandedChangeRef.current = handleExpandedChange;

  useEffect(() => {
    if (!onLoadLocalFolderChildren || !localTree?.length) return;
    const expanded = expandedPaths.local;
    if (!expanded?.size) return;

    const visit = (nodes) => {
      for (const node of nodes) {
        if (node?.type !== 'folder') continue;
        if (expanded.has(node.path) && node.childrenLoaded !== true) {
          void onLoadLocalFolderChildren(node);
        }
        if (node.children?.length) visit(node.children);
      }
    };
    visit(localTree);
  }, [localTree, expandedPaths.local, onLoadLocalFolderChildren]);

  useEffect(() => {
    if (!onLoadWebdavFolderChildren || !webdavTree?.length) return;
    const expanded = expandedPaths.webdav;
    if (!expanded?.size) return;

    const visit = (nodes) => {
      for (const node of nodes) {
        if (node?.type !== 'folder') continue;
        if (expanded.has(node.path) && node.childrenLoaded !== true) {
          void onLoadWebdavFolderChildren(node);
        }
        if (node.children?.length) visit(node.children);
      }
    };
    visit(webdavTree);
  }, [webdavTree, expandedPaths.webdav, onLoadWebdavFolderChildren]);

  const expandPathsForNewItem = useCallback((storageType, paths) => {
    if (!paths?.length) return;
    setExpandedPaths((prev) => {
      const next = {
        s3: new Set(prev.s3),
        local: new Set(prev.local),
        webdav: new Set(prev.webdav),
      };
      const set = expandedSetForStorageType(next, storageType);
      paths.forEach((p) => set.add(p));
      saveExpandedFolderPaths(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (expandPathsRef) {
      expandPathsRef.current = expandPathsForNewItem;
      return () => {
        expandPathsRef.current = null;
      };
    }
  }, [expandPathsRef, expandPathsForNewItem]);

  const filteredS3Tree = useMemo(
    () =>
      filterTree(s3Tree, {
        hideDotFolders: !showHiddenFolders,
        hideTrashFolder: !showTrashFolder,
        hideRecordingCompanionFiles: hideRecordingCompanions,
        searchTerm,
      }),
    [s3Tree, searchTerm, showHiddenFolders, showTrashFolder, hideRecordingCompanions],
  );
  const filteredLocalTree = useMemo(
    () =>
      filterTree(localTree, {
        hideDotFolders: !showHiddenFolders,
        hideTrashFolder: !showTrashFolder,
        hideRecordingCompanionFiles: hideRecordingCompanions,
        searchTerm,
      }),
    [localTree, searchTerm, showHiddenFolders, showTrashFolder, hideRecordingCompanions],
  );
  const filteredWebdavTree = useMemo(
    () =>
      filterTree(webdavTree, {
        hideDotFolders: !showHiddenFolders,
        hideTrashFolder: !showTrashFolder,
        hideRecordingCompanionFiles: hideRecordingCompanions,
        searchTerm,
      }),
    [webdavTree, searchTerm, showHiddenFolders, showTrashFolder, hideRecordingCompanions],
  );

  /** 필터 전 원본 트리 기준 — 숨김 옵션과 무관하게 녹음 연결 여부 표시 */
  const recordingBasePathSet = useMemo(
    () =>
      buildRecordingBasePathSetFromTrees(s3Tree, [
        ...(localTree || []),
        ...(webdavTree || []),
      ]),
    [s3Tree, localTree, webdavTree],
  );

  const collectFolderPaths = (nodes) => {
    const paths = new Set();
    const walk = (n) => {
      if (n.type === 'folder' && n.path) {
        paths.add(n.path);
        if (n.children) n.children.forEach(walk);
      }
    };
    nodes.forEach(walk);
    return paths;
  };
  const effectiveExpandedS3 = useMemo(
    () => (searchTerm ? collectFolderPaths(filteredS3Tree) : expandedPaths.s3),
    [searchTerm, filteredS3Tree, expandedPaths.s3],
  );
  const effectiveExpandedLocal = useMemo(
    () => (searchTerm ? collectFolderPaths(filteredLocalTree) : expandedPaths.local),
    [searchTerm, filteredLocalTree, expandedPaths.local],
  );
  const effectiveExpandedWebdav = useMemo(
    () => (searchTerm ? collectFolderPaths(filteredWebdavTree) : expandedPaths.webdav),
    [searchTerm, filteredWebdavTree, expandedPaths.webdav],
  );

  const selectedFolderForMove = getSelectedFolderForMove(
    selectedIds,
    s3Tree,
    localTree,
    webdavTree,
  );

  const contextMenuNode = contextMenu?.node;
  const contextMenuStorageType = contextMenu?.storageType;
  const getCreateTargetForStorage = useCallback(
    (storageType) => {
      if (storageType === 's3') {
        if (lastFocusedS3FolderPath !== null) {
          return { parentPath: lastFocusedS3FolderPath, parentDirHandle: null };
        }
        if (currentFile?.type === 's3' && currentFile.id) {
          return {
            parentPath: getParentPathFromFilePath(currentFile.id),
            parentDirHandle: null,
          };
        }
        return { parentPath: '', parentDirHandle: null };
      }

      if (storageType === 'webdav') {
        if (lastFocusedWebdavFolderPath !== null) {
          return { parentPath: lastFocusedWebdavFolderPath, parentDirHandle: null };
        }
        if (currentFile?.type === 'webdav' && currentFile.id) {
          return {
            parentPath: getParentPathFromFilePath(currentFile.id),
            parentDirHandle: null,
          };
        }
        return { parentPath: '', parentDirHandle: null };
      }

      if (lastFocusedLocalFolder !== null) {
        return {
          parentPath: lastFocusedLocalFolder.path,
          parentDirHandle: lastFocusedLocalFolder.handle,
        };
      }

      if (currentFile?.type === 'local' && currentFile.id) {
        return {
          parentPath: getParentPathFromFilePath(currentFile.id),
          parentDirHandle: currentFile.parentHandle || localRootHandle || null,
        };
      }

      return { parentPath: '', parentDirHandle: localRootHandle || null };
    },
    [
      currentFile,
      lastFocusedLocalFolder,
      lastFocusedS3FolderPath,
      lastFocusedWebdavFolderPath,
      localRootHandle,
    ],
  );

  const isS3Mode = storageMode === 's3';
  const isLocalMode = storageMode === 'local';
  const isWebdavMode = storageMode === 'webdav';
  const localVaultReady = isLocalVaultReady(localRootHandle, localVaultFsPath);

  const activateTreeNode = useCallback((storageType, node) => {
    setLastActivatedNode({ storageType, node });
  }, []);

  const openTreeContextMenu = useCallback(
    (storageType, node, event, extras = {}) => {
      activateTreeNode(storageType, node);
      setContextMenu({
        x: mobileTree ? null : event?.clientX ?? null,
        y: mobileTree ? null : event?.clientY ?? null,
        node,
        storageType,
        modal: mobileContextMenu,
        onCloseTab: typeof extras.onCloseTab === 'function' ? extras.onCloseTab : null,
      });
    },
    [activateTreeNode, mobileTree, mobileContextMenu],
  );

  const openFileTabContextMenu = useCallback(
    ({
      storageType,
      path,
      name,
      currentFile,
      clientX,
      clientY,
      onCloseTab,
    } = {}) => {
      if (!storageType || !path) return;
      let node = findTreeNode(storageType, path);
      if (!node || node.type !== 'file') {
        const fallbackName =
          name ||
          (typeof currentFile?.name === 'string' ? currentFile.name : '') ||
          String(path).split('/').filter(Boolean).pop() ||
          path;
        node = {
          type: 'file',
          path,
          name: fallbackName,
          ...(currentFile?.handle ? { handle: currentFile.handle } : {}),
          ...(currentFile?.parentHandle ? { parentHandle: currentFile.parentHandle } : {}),
          ...(currentFile?.lastModified != null
            ? { lastModified: currentFile.lastModified }
            : {}),
        };
      }
      const event =
        clientX != null && clientY != null
          ? { clientX, clientY }
          : null;
      openTreeContextMenu(storageType, node, event, {
        onCloseTab: typeof onCloseTab === 'function' ? onCloseTab : undefined,
      });
    },
    [findTreeNode, openTreeContextMenu],
  );

  useEffect(() => {
    if (!fileTabContextMenuRef) return undefined;
    fileTabContextMenuRef.current = { open: openFileTabContextMenu };
    return () => {
      if (fileTabContextMenuRef.current?.open === openFileTabContextMenu) {
        fileTabContextMenuRef.current = null;
      }
    };
  }, [fileTabContextMenuRef, openFileTabContextMenu]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented) return;
      if (isTypingElement(e.target)) return;

      if (e.key === 'F2') {
        if (!lastActivatedNode) return;

        const { storageType, node } = lastActivatedNode;
        if (
          (isS3Mode && storageType !== 's3') ||
          (isLocalMode && storageType !== 'local') ||
          (isWebdavMode && storageType !== 'webdav')
        ) {
          return;
        }
        if (!isRenameableTreeNode(node)) return;
        if (findApplicableTransferBusy(transferBusyItems, storageType, node.path)) return;

        e.preventDefault();
        setRenameTarget({ storageType, node });
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Prefer tree focus; otherwise allow when focus is not inside the main editor.
        const focusEl = document.activeElement;
        const treeFocused =
          isEventInsideSidebarTree(e.target) || isEventInsideSidebarTree(focusEl);
        if (!treeFocused && isTypingElement(focusEl)) return;
        if (
          !treeFocused &&
          focusEl &&
          focusEl !== document.body &&
          typeof focusEl.closest === 'function' &&
          !focusEl.closest('[data-sidebar-root], [data-sidebar-tree-scroll]')
        ) {
          return;
        }

        // Prefer last activated node if it is in the selection; else first selected;
        // else last activated node alone (folder click expands without selecting).
        let storageType = null;
        let node = null;
        if (lastActivatedNode) {
          const key = toTreeSelectKey(lastActivatedNode.storageType, lastActivatedNode.node.path);
          if (!selectedIds?.size || selectedIds.has(key)) {
            storageType = lastActivatedNode.storageType;
            node = lastActivatedNode.node;
          }
        }
        if (!node && selectedIds?.size) {
          const firstKey = selectedIds.values().next().value;
          if (firstKey) {
            const colonIdx = String(firstKey).indexOf(':');
            storageType = colonIdx >= 0 ? firstKey.slice(0, colonIdx) : 's3';
            const path = colonIdx >= 0 ? firstKey.slice(colonIdx + 1) : firstKey;
            node = findTreeNode(storageType, path);
          }
        }
        if (!node && lastActivatedNode) {
          storageType = lastActivatedNode.storageType;
          node = lastActivatedNode.node;
        }
        if (!node || !storageType) {
          // Folder focus without activate (root focus rows)
          if (isS3Mode && lastFocusedS3FolderPath != null && lastFocusedS3FolderPath !== '') {
            storageType = 's3';
            node = findTreeNode('s3', lastFocusedS3FolderPath);
          } else if (
            isLocalMode &&
            lastFocusedLocalFolder?.path != null &&
            lastFocusedLocalFolder.path !== ''
          ) {
            storageType = 'local';
            node = findTreeNode('local', lastFocusedLocalFolder.path);
          } else if (
            isWebdavMode &&
            lastFocusedWebdavFolderPath != null &&
            lastFocusedWebdavFolderPath !== ''
          ) {
            storageType = 'webdav';
            node = findTreeNode('webdav', lastFocusedWebdavFolderPath);
          }
        }
        if (!node || !storageType) return;
        if (
          (isS3Mode && storageType !== 's3') ||
          (isLocalMode && storageType !== 'local') ||
          (isWebdavMode && storageType !== 'webdav')
        ) {
          return;
        }
        if (node.path === '.trash/' || node.path === '') return;
        if (findApplicableTransferBusy(transferBusyItems, storageType, node.path)) return;
        e.preventDefault();
        e.stopPropagation();
        requestDeleteNode(node, storageType);
      }
    };

    // Capture so tree Delete wins over other document handlers when not typing.
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [
    findTreeNode,
    isWebdavMode,
    isS3Mode,
    isLocalMode,
    lastActivatedNode,
    lastFocusedLocalFolder,
    lastFocusedS3FolderPath,
    lastFocusedWebdavFolderPath,
    requestDeleteNode,
    selectedIds,
    transferBusyItems,
  ]);

  return (
    <div
      data-sidebar-root
      className="w-full h-full min-h-0 bg-white dark:bg-odp-bgSoft border-r border-gray-200 dark:border-odp-bgSofter flex flex-col"
    >
      {contextMenu && contextMenuNode && (
        <SidebarContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextMenuNode}
          storageType={contextMenuStorageType}
          mobileDialog={contextMenu.modal ?? mobileContextMenu}
          isTrashRoot={contextMenuNode.path === '.trash/'}
          deleteCount={
            (() => {
              const targets = resolveDeleteTargets(
                contextMenuNode,
                contextMenuStorageType,
                selectedIds,
                findTreeNode,
              );
              return Math.max(1, targets.length);
            })()
          }
          onClose={() => setContextMenu(null)}
          onCloseTab={
            typeof contextMenu.onCloseTab === 'function' ? contextMenu.onCloseTab : undefined
          }
          onCreateFile={
            contextMenuNode.type === 'folder'
              ? () => onCreateItem(contextMenuStorageType, contextMenuNode.path, contextMenuNode.handle, 'file')
              : undefined
          }
          onCreateFolder={
            contextMenuNode.type === 'folder'
              ? () => onCreateItem(contextMenuStorageType, contextMenuNode.path, contextMenuNode.handle, 'folder')
              : undefined
          }
          onDownload={onDownloadNode ? () => onDownloadNode(contextMenuStorageType, contextMenuNode) : undefined}
          onRename={() => setRenameTarget({ storageType: contextMenuStorageType, node: contextMenuNode })}
          onDelete={() => requestDeleteNode(contextMenuNode, contextMenuStorageType)}
          onEmptyTrash={
            onRequestEmptyTrash
              ? () => onRequestEmptyTrash(contextMenuNode, contextMenuStorageType)
              : undefined
          }
          onDuplicate={onDuplicateNode ? () => onDuplicateNode(contextMenuStorageType, contextMenuNode) : undefined}
          onMove={() => {
            if (contextMenuNode.type === 'folder') {
              onRequestMoveFolder?.(contextMenuNode, contextMenuStorageType);
            } else {
              onRequestMoveFile?.(contextMenuNode, contextMenuStorageType);
            }
          }}
          onOpenInNewWindow={onOpenInNewWindow}
          onShareToChatWithMyself={
            onShareToChatWithMyself && contextMenuNode.type === 'file'
              ? onShareToChatWithMyself
              : undefined
          }
        />
      )}
      <div className="flex flex-col bg-gray-50 dark:bg-odp-surface shrink-0">
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center gap-2" data-sidebar-header-row>
            <div className="flex items-center gap-1 min-w-0" data-sidebar-header-left>
              {typeof onRequestCollapseSidebar === 'function' && (
                <button
                  type="button"
                  onClick={onRequestCollapseSidebar}
                  className="hidden md:inline-flex p-1.5 shrink-0 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
                  title="사이드바 접기"
                  aria-label="사이드바 접기"
                >
                  <ChevronsLeft size={18} />
                </button>
              )}
              {typeof onBrandClick === 'function' || typeof onStorageModeChange === 'function' ? (
                (() => {
                  const brandButton = (
                    <button
                      type="button"
                      data-sidebar-brand
                      onClick={() => {
                        if (brandLongPressOpenedRef.current) {
                          brandLongPressOpenedRef.current = false;
                          return;
                        }
                        if (brandMenuOpen) return;
                        onBrandClick?.();
                      }}
                      onPointerDown={(e) => {
                        if (!onStorageModeChange || !mobileContextMenu) return;
                        if (e.pointerType === 'mouse') return;
                        if (e.button !== 0 && e.button !== -1) return;
                        brandLongPressOpenedRef.current = false;
                        clearBrandLongPress();
                        brandPressStartRef.current = { x: e.clientX, y: e.clientY };
                        brandLongPressTimerRef.current = setTimeout(() => {
                          brandLongPressTimerRef.current = null;
                          brandLongPressOpenedRef.current = true;
                          vibrateLongPressAction();
                          setBrandMenuOpen(true);
                        }, BRAND_LONG_PRESS_MS);
                      }}
                      onPointerMove={(e) => {
                        const start = brandPressStartRef.current;
                        if (!start || !brandLongPressTimerRef.current) return;
                        if (
                          Math.abs(e.clientX - start.x) > 10 ||
                          Math.abs(e.clientY - start.y) > 10
                        ) {
                          clearBrandLongPress();
                        }
                      }}
                      onPointerUp={clearBrandLongPress}
                      onPointerCancel={clearBrandLongPress}
                      onContextMenu={(e) => {
                        if (mobileContextMenu && onStorageModeChange) {
                          e.preventDefault();
                        }
                      }}
                      className="font-bold text-lg text-gray-700 dark:text-odp-fgStrong truncate text-left hover:text-gray-900 dark:hover:text-white transition"
                      aria-label={`${appName} 홈으로`}
                    >
                      {appName}
                    </button>
                  );

                  if (typeof onStorageModeChange !== 'function') {
                    return brandButton;
                  }

                  return (
                    <AdaptiveContextMenu
                      open={brandMenuOpen}
                      onOpenChange={setBrandMenuOpen}
                      title={appName}
                      subtitle="저장소 전환"
                      isMobileLayout={isMobileLayout}
                      contentClassName={SIDEBAR_BRAND_MENU_CONTENT_CLASS}
                      trigger={brandButton}
                    >
                      {BRAND_STORAGE_MODES.map((mode) => {
                        const selected = storageMode === mode;
                        const label = getAppNameByStorageMode(mode);
                        return (
                          <AdaptiveMenuItem
                            key={mode}
                            disabled={selected}
                            className={
                              mobileContextMenu
                                ? MOBILE_CONTEXT_MENU_ITEM_CLASS
                                : SIDEBAR_BRAND_MENU_ITEM_CLASS
                            }
                            onSelect={() => {
                              if (selected) return;
                              onStorageModeChange(mode);
                            }}
                          >
                            <span className="inline-flex w-4 shrink-0 items-center justify-center">
                              {selected ? <IconCheck size={14} aria-hidden /> : null}
                            </span>
                            <span className="min-w-0 flex-1 truncate">{label}</span>
                          </AdaptiveMenuItem>
                        );
                      })}
                    </AdaptiveContextMenu>
                  );
                })()
              ) : (
                <h1
                  data-sidebar-brand
                  className="font-bold text-lg text-gray-700 dark:text-odp-fgStrong truncate"
                >
                  {appName}
                </h1>
              )}
            </div>
            <div className="flex items-center gap-1.5" data-sidebar-header-right>
              <button
                onClick={onToggleTheme}
                className="p-1.5 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
                title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
              >
                {theme !== 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
              </button>
              <button
                onClick={onOpenSettings}
                className="p-1.5 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
              >
                <IconSettings />
              </button>
            </div>
          </div>
          {selectedFolderForMove && onRequestMoveFolder && (
            <div className="flex items-center gap-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-2 py-1.5 text-xs">
              <span className="text-blue-700 dark:text-blue-300 truncate flex-1 min-w-0">
                폴더 선택됨: {selectedFolderForMove.node.name}
              </span>
              <button
                type="button"
                onClick={() => onRequestMoveFolder(selectedFolderForMove.node, selectedFolderForMove.storageType)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shrink-0"
                title="폴더 이동"
              >
                <ArrowRightToLine size={12} />
                이동
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 w-full border-y border-gray-400 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm text-gray-700 dark:text-odp-fgStrong">
          <AdvancedSearchSidebarTrigger />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={isWebdavMode ? '파일명 검색 (WebDAV)' : '파일명 검색'}
            className="min-w-0 flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:font-normal placeholder:text-gray-400 dark:placeholder:text-gray-500"
            aria-label="파일명 검색"
          />
          {isSearchPending ? (
            <Loader2
              size={16}
              className="animate-spin shrink-0 text-gray-400 dark:text-gray-500"
              aria-label="검색 중"
            />
          ) : searchInput ? (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                setSearchTerm('');
              }}
              className="shrink-0 p-0.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-odp-fgStrong rounded transition"
              title="검색어 지우기"
              aria-label="검색어 지우기"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={treeCollisionDetection}
        onDragStart={handleDndDragStart}
        onDragOver={handleDndDragOver}
        onDragEnd={handleDndDragEnd}
        onDragCancel={handleDndDragCancel}
        autoScroll
      >
      <div
        ref={scrollContainerRef}
        data-sidebar-tree-scroll
        tabIndex={-1}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain pb-4 space-y-6 outline-none"
        onDragEnter={handleScrollAreaDragEnter}
        onDragOver={handleScrollAreaDragOver}
        onPointerDownCapture={() => {
          // Move focus into the tree so Delete/Backspace target selection, not the editor.
          scrollContainerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(e) => {
          if (
            !e.target.closest('[data-tree-node-row]') &&
            !e.target.closest('[data-tree-root-drop-zone]') &&
            !e.target.closest('button') &&
            !e.target.closest('input')
          ) {
            setLastFocusedS3FolderPath(null);
            setLastFocusedLocalFolder(null);
            setLastFocusedWebdavFolderPath(null);
            onClearSelection?.();
          }
        }}
        role="tree"
        aria-label="파일 트리"
      >
        {sessionWorkspace ? (
          <div>
            <div className="sticky top-0 z-9999 mb-1 flex items-center justify-between border-b border-gray-100 bg-white px-3 py-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:border-odp-surface dark:bg-odp-bgSoft">
              <span className="flex min-w-0 items-center gap-1">
                <Download size={14} />
                <span className="truncate">다운로드 세션</span>
              </span>
              {typeof onCloseSessionWorkspace === 'function' ? (
                <button
                  type="button"
                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
                  title="세션 닫기"
                  aria-label="세션 닫기"
                  onClick={onCloseSessionWorkspace}
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
            <p className="px-3 pb-1 text-[11px] text-gray-400 dark:text-odp-muted truncate" title={sessionWorkspace.originName}>
              {sessionWorkspace.originName}
            </p>
            <SessionTreeList
              nodes={sessionTree}
              currentPath={treeCurrentFile?.type === 'session' ? treeCurrentFile.id : null}
              onSelectFile={(node) => onSelectFile?.('session', node, {})}
            />
          </div>
        ) : null}
        {/* S3 Section */}
        {isS3Mode && (
        <div>
          <div className="sticky top-0 bg-white dark:bg-odp-bgSoft px-3 py-2 flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 z-9999 border-b border-gray-100 dark:border-odp-surface">
            <span className="flex items-center gap-1">
              <IconCloud /> S3
            </span>
            <div className="flex gap-1">
              {onRefreshS3 && s3Bucket && (
                <button
                  onClick={() => {
                    if (isS3Refreshing) return;
                    const startedAt = Date.now();
                    setIsS3Refreshing(true);
                    Promise.resolve(onRefreshS3()).finally(() => {
                      const elapsed = Date.now() - startedAt;
                      const remaining = Math.max(0, 500 - elapsed);
                      setTimeout(() => {
                        setIsS3Refreshing(false);
                        setIsS3SpinFinishing(true);
                        setTimeout(() => setIsS3SpinFinishing(false), 300);
                      }, remaining);
                    });
                  }}
                  disabled={isS3Refreshing}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation disabled:pointer-events-none disabled:opacity-70"
                  title="파일 구조 새로고침"
                >
                  <IconRefresh
                    size={22}
                    className={`shrink-0 w-5 h-5 md:w-[14px] md:h-[14px] ${
                      isS3Refreshing
                        ? 'animate-spin'
                        : isS3SpinFinishing
                          ? 'animate-[spin_0.3s_linear_1]'
                          : ''
                    }`}
                  />
                </button>
              )}
              <button
                onClick={() => {
                  const { parentPath } = getCreateTargetForStorage('s3');
                  onRequestUploadFile?.('s3', parentPath, null);
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                title="선택된 폴더에 파일 업로드 (여러 개 선택 가능)"
              >
                <IconUpload size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
              </button>
              <button
                onClick={() => {
                  const { parentPath } = getCreateTargetForStorage('s3');
                  onRequestUploadFolder?.('s3', parentPath, null);
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                title="선택된 폴더에 폴더 업로드 (폴더 전체)"
              >
                <IconFolder size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
              </button>
              <button
                onClick={() => {
                  const target = getCreateTargetForStorage('s3');
                  onCreateItem('s3', target.parentPath, target.parentDirHandle, 'file');
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                title="선택된 폴더에 파일 생성"
              >
                <IconFilePlus size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
              </button>
              <button
                onClick={() => {
                  const target = getCreateTargetForStorage('s3');
                  onCreateItem('s3', target.parentPath, target.parentDirHandle, 'folder');
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                title="선택된 폴더에 폴더 생성"
              >
                <IconFolderPlus size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
              </button>
            </div>
          </div>
          {s3Bucket ? (
            <div className="space-y-0.5">
              <ChatWithMyselfEntry
                isActive={chatWithMyselfActive}
                onOpen={onOpenChatWithMyself}
              />
              <RootDropZone
                storageType="s3"
                localRootHandle={null}
                onDropOnFolder={onDropOnFolder}
                dropTarget={dropTarget}
                isFocused={
                  !chatWithMyselfActive && lastFocusedS3FolderPath === ''
                }
                onFocusRoot={() => setLastFocusedS3FolderPath('')}
                onContextMenu={(e, rootNode) => {
                  setLastFocusedS3FolderPath('');
                  openTreeContextMenu('s3', rootNode, e);
                }}
                mobileTree={mobileTree}
              />
              {filteredS3Tree.length > 0 ? (
                filteredS3Tree.map((node) => (
                  <TreeNode
                    key={node.path}
                    node={node}
                    level={0}
                    rootDropNode={{ path: '', type: 'folder', handle: null }}
                    onSelect={onSelectFile}
                    storageType="s3"
                    selectedIds={treeSelectedIds}
                    currentFile={treeCurrentFile}
                    onCreateFile={(p) => onCreateItem('s3', p, null, 'file')}
                    onCreateFolder={(p) => onCreateItem('s3', p, null, 'folder')}
                    onRequestMoveFolder={onRequestMoveFolder}
                    onDelete={(n, t) => requestDeleteNode(n, t)}
                    onRename={onRenameItem}
                    deletingFolderPath={deletingFolderPath}
                    isDeletingFolder={isDeletingFolder}
                    transferBusyItems={transferBusyItems}
                    isSearching={!!searchTerm}
                    expandedPaths={effectiveExpandedS3}
                    onExpandedChange={handleExpandedChange}
                    onFolderFocus={(node) =>
                      setLastFocusedS3FolderPath(node ? node.path || '' : null)
                    }
                    focusedFolderPath={
                      chatWithMyselfActive
                        ? undefined
                        : (lastFocusedS3FolderPath ?? undefined)
                    }
                    onDropOnFolder={onDropOnFolder}
                    dropTarget={dropTarget}
                    activeDragItemIds={activeDragItemIds}
                    isCopyDrag={isCopyDrag}
                    onOpenContextMenu={(e, n) => openTreeContextMenu('s3', n, e)}
                    onActivate={(n) => activateTreeNode('s3', n)}
                    renameTarget={renameTarget}
                    onClearRenameTarget={() => setRenameTarget(null)}
                    recordingBasePathSet={recordingBasePathSet}
                    stickyFoldersEnabled={treeStickyFolderPathEnabled}
                    showModifiedDate={showTreeModifiedDate}
                    stickyTopOffset={TREE_STICKY_SECTION_TOP}
                    mobileTree={mobileTree}
                  />
                ))
              ) : (
                <p className="text-xs text-gray-400 px-4 py-2">파일이 없습니다.</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400 px-4 py-2">설정에서 연동하세요.</p>
          )}
        </div>
        )}

        {/* Local Section */}
        {isLocalMode && (
        <div>
          <div className="sticky top-0 bg-white dark:bg-odp-bgSoft px-3 py-2 flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 z-9999 border-b border-gray-100 dark:border-odp-surface">
            <span className="flex items-center gap-1">
              <IconFolder /> Local Folder
            </span>
            {localVaultReady && (
              <div className="flex gap-1">
                {onRefreshLocal && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isLocalTreeLoading) return;
                      void onRefreshLocal();
                    }}
                    disabled={isLocalTreeLoading}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation disabled:pointer-events-none disabled:opacity-70"
                    title="폴더 구조 새로고침"
                  >
                    <IconRefresh
                      size={22}
                      className={`shrink-0 w-5 h-5 md:w-[14px] md:h-[14px] ${isLocalTreeLoading ? 'animate-spin' : ''}`}
                    />
                  </button>
                )}
                <button
                  onClick={() => {
                    const { parentPath, parentDirHandle } = getCreateTargetForStorage('local');
                    onRequestUploadFile?.('local', parentPath, parentDirHandle);
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 파일 업로드 (여러 개 선택 가능)"
                >
                  <IconUpload size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
                <button
                  onClick={() => {
                    const { parentPath, parentDirHandle } = getCreateTargetForStorage('local');
                    onRequestUploadFolder?.('local', parentPath, parentDirHandle);
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 폴더 업로드 (폴더 전체)"
                >
                  <IconFolder size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
                <button
                  onClick={() => {
                    const target = getCreateTargetForStorage('local');
                    onCreateItem('local', target.parentPath, target.parentDirHandle, 'file');
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 파일 생성"
                >
                  <IconFilePlus size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
                <button
                  onClick={() => {
                    const target = getCreateTargetForStorage('local');
                    onCreateItem('local', target.parentPath, target.parentDirHandle, 'folder');
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 폴더 생성"
                >
                  <IconFolderPlus size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
              </div>
            )}
          </div>
          {!localVaultReady && (
            <div className="px-3 mb-2">
              <button
                onClick={onOpenLocalFolder}
                className="w-full bg-white dark:bg-odp-surface border border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong text-sm py-1.5 px-3 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-odp-focusBg transition flex items-center justify-center gap-2"
              >
                <IconFolder /> 폴더 선택
              </button>
            </div>
          )}
          <div className="space-y-0.5">
            <ChatWithMyselfEntry
              isActive={chatWithMyselfActive}
              onOpen={onOpenChatWithMyself}
            />
            <RootDropZone
              storageType="local"
              localRootHandle={localRootHandle}
              localVaultFsPath={localVaultFsPath}
              onDropOnFolder={onDropOnFolder}
              dropTarget={dropTarget}
              isFocused={
                !chatWithMyselfActive &&
                lastFocusedLocalFolder !== null &&
                lastFocusedLocalFolder.path === '' &&
                lastFocusedLocalFolder.handle === localRootHandle
              }
              onFocusRoot={() =>
                setLastFocusedLocalFolder({ path: '', handle: localRootHandle })
              }
              onContextMenu={(e, rootNode) => {
                setLastFocusedLocalFolder({ path: '', handle: localRootHandle });
                openTreeContextMenu('local', rootNode, e);
              }}
              mobileTree={mobileTree}
            />
            {isLocalTreeLoading && !filteredLocalTree.length && (
              <p className="text-xs text-gray-400 px-4 py-2">폴더 목록을 불러오는 중…</p>
            )}
            {localVaultReady ? (
              filteredLocalTree.length > 0 ? (
                filteredLocalTree.map((node) => (
                  <TreeNode
                    key={node.path}
                    node={node}
                    level={0}
                    rootDropNode={
                      localRootHandle
                        ? { path: '', type: 'folder', handle: localRootHandle }
                        : localVaultFsPath
                          ? { path: '', type: 'folder', handle: null }
                          : null
                    }
                    onSelect={onSelectFile}
                    storageType="local"
                    selectedIds={treeSelectedIds}
                    currentFile={treeCurrentFile}
                    onCreateFile={(p, h) => onCreateItem('local', p, h, 'file')}
                    onCreateFolder={(p, h) => onCreateItem('local', p, h, 'folder')}
                    onRequestMoveFolder={onRequestMoveFolder}
                    onDelete={(n, t) => requestDeleteNode(n, t)}
                    onRename={onRenameItem}
                    deletingFolderPath={deletingFolderPath}
                    isDeletingFolder={isDeletingFolder}
                    transferBusyItems={transferBusyItems}
                    isSearching={!!searchTerm}
                    expandedPaths={effectiveExpandedLocal}
                    onExpandedChange={handleExpandedChange}
                    onFolderFocus={(node) =>
                      setLastFocusedLocalFolder(
                        node ? { path: node.path || '', handle: node.handle } : null,
                      )
                    }
                    focusedFolderPath={
                      chatWithMyselfActive
                        ? undefined
                        : (lastFocusedLocalFolder?.path ?? undefined)
                    }
                    onDropOnFolder={onDropOnFolder}
                    dropTarget={dropTarget}
                    activeDragItemIds={activeDragItemIds}
                    isCopyDrag={isCopyDrag}
                    onOpenContextMenu={(e, n) => openTreeContextMenu('local', n, e)}
                    onActivate={(n) => activateTreeNode('local', n)}
                    isFolderLoading={localFolderLoadingPath}
                    renameTarget={renameTarget}
                    onClearRenameTarget={() => setRenameTarget(null)}
                    recordingBasePathSet={recordingBasePathSet}
                    stickyFoldersEnabled={treeStickyFolderPathEnabled}
                    showModifiedDate={showTreeModifiedDate}
                    stickyTopOffset={TREE_STICKY_SECTION_TOP}
                    mobileTree={mobileTree}
                  />
                ))
              ) : (
                <p className="text-xs text-gray-400 px-4 py-2">파일이 없습니다.</p>
              )
            ) : null}
          </div>
        </div>
        )}

        {isWebdavMode && (
        <div>
          <div className="sticky top-0 bg-white dark:bg-odp-bgSoft px-3 py-2 flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 z-9999 border-b border-gray-100 dark:border-odp-surface">
            <span className="flex items-center gap-1">
              <IconCloud /> WebDAV
            </span>
            {webdavReady && (
              <div className="flex gap-1">
                {onRefreshWebdav && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isWebdavTreeLoading) return;
                      void onRefreshWebdav();
                    }}
                    disabled={isWebdavTreeLoading}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation disabled:pointer-events-none disabled:opacity-70"
                    title="파일 구조 새로고침"
                  >
                    <IconRefresh
                      size={22}
                      className={`shrink-0 w-5 h-5 md:w-[14px] md:h-[14px] ${
                        isWebdavTreeLoading ? 'animate-spin' : ''
                      }`}
                    />
                  </button>
                )}
                <button
                  onClick={() => {
                    const { parentPath } = getCreateTargetForStorage('webdav');
                    onRequestUploadFile?.('webdav', parentPath, null);
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 파일 업로드 (여러 개 선택 가능)"
                >
                  <IconUpload size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
                <button
                  onClick={() => {
                    const { parentPath } = getCreateTargetForStorage('webdav');
                    onRequestUploadFolder?.('webdav', parentPath, null);
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 폴더 업로드 (폴더 전체)"
                >
                  <IconFolder size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
                <button
                  onClick={() => {
                    const target = getCreateTargetForStorage('webdav');
                    onCreateItem('webdav', target.parentPath, target.parentDirHandle, 'file');
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 파일 생성"
                >
                  <IconFilePlus size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
                <button
                  onClick={() => {
                    const target = getCreateTargetForStorage('webdav');
                    onCreateItem('webdav', target.parentPath, target.parentDirHandle, 'folder');
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 md:min-w-0 md:min-h-0 md:p-1 hover:text-blue-500 touch-manipulation"
                  title="선택된 폴더에 폴더 생성"
                >
                  <IconFolderPlus size={22} className="shrink-0 w-5 h-5 md:w-[14px] md:h-[14px]" />
                </button>
              </div>
            )}
          </div>
          {webdavReady ? (
            <div className="space-y-0.5">
              <ChatWithMyselfEntry
                isActive={chatWithMyselfActive}
                onOpen={onOpenChatWithMyself}
              />
              <RootDropZone
                storageType="webdav"
                localRootHandle={null}
                onDropOnFolder={onDropOnFolder}
                dropTarget={dropTarget}
                isFocused={
                  !chatWithMyselfActive && lastFocusedWebdavFolderPath === ''
                }
                onFocusRoot={() => setLastFocusedWebdavFolderPath('')}
                onContextMenu={(e, rootNode) => {
                  setLastFocusedWebdavFolderPath('');
                  openTreeContextMenu('webdav', rootNode, e);
                }}
                mobileTree={mobileTree}
              />
              {isWebdavTreeLoading && !filteredWebdavTree.length && (
                <p className="text-xs text-gray-400 px-4 py-2">폴더 목록을 불러오는 중…</p>
              )}
              {filteredWebdavTree.length > 0 ? (
                filteredWebdavTree.map((node) => (
                  <TreeNode
                    key={node.path}
                    node={node}
                    level={0}
                    rootDropNode={{ path: '', type: 'folder', handle: null }}
                    onSelect={onSelectFile}
                    storageType="webdav"
                    selectedIds={treeSelectedIds}
                    currentFile={treeCurrentFile}
                    onCreateFile={(p) => onCreateItem('webdav', p, null, 'file')}
                    onCreateFolder={(p) => onCreateItem('webdav', p, null, 'folder')}
                    onRequestMoveFolder={onRequestMoveFolder}
                    onDelete={(n, t) => requestDeleteNode(n, t)}
                    onRename={onRenameItem}
                    deletingFolderPath={deletingFolderPath}
                    isDeletingFolder={isDeletingFolder}
                    transferBusyItems={transferBusyItems}
                    isSearching={!!searchTerm}
                    expandedPaths={effectiveExpandedWebdav}
                    onExpandedChange={handleExpandedChange}
                    onFolderFocus={(node) =>
                      setLastFocusedWebdavFolderPath(node ? node.path || '' : null)
                    }
                    focusedFolderPath={
                      chatWithMyselfActive
                        ? undefined
                        : (lastFocusedWebdavFolderPath ?? undefined)
                    }
                    onDropOnFolder={onDropOnFolder}
                    dropTarget={dropTarget}
                    activeDragItemIds={activeDragItemIds}
                    isCopyDrag={isCopyDrag}
                    onOpenContextMenu={(e, n) => openTreeContextMenu('webdav', n, e)}
                    onActivate={(n) => activateTreeNode('webdav', n)}
                    isFolderLoading={webdavFolderLoadingPath}
                    renameTarget={renameTarget}
                    onClearRenameTarget={() => setRenameTarget(null)}
                    recordingBasePathSet={recordingBasePathSet}
                    stickyFoldersEnabled={treeStickyFolderPathEnabled}
                    showModifiedDate={showTreeModifiedDate}
                    stickyTopOffset={TREE_STICKY_SECTION_TOP}
                    mobileTree={mobileTree}
                  />
                ))
              ) : !isWebdavTreeLoading ? (
                <p className="text-xs text-gray-400 px-4 py-2">파일이 없습니다.</p>
              ) : null}
            </div>
          ) : (
            <p className="text-xs text-gray-400 px-4 py-2">설정에서 WebDAV 연결 정보를 저장해 주세요.</p>
          )}
        </div>
        )}
      </div>
      {typeof document !== 'undefined'
        ? createPortal(
            <DragOverlay dropAnimation={null} zIndex={TREE_DRAG_OVERLAY_Z_INDEX}>
              <TreeDragOverlayPreview items={activeDragItems} isCopy={isCopyDrag} />
            </DragOverlay>,
            document.body,
          )
        : null}
      {chatWithMyselfActive && activeDragItems?.length ? (
        <ChatTreeAttachDroppable
          host={chatAttachDropHost}
          enabled={Boolean(chatAttachDropHost)}
        />
      ) : null}
      </DndContext>
    </div>
  );
}

