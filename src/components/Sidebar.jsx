import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import TreeNode from '@/components/TreeNode';
import {
  RootDropZone,
  TreeDragOverlayPreview,
  treeCollisionDetection,
} from '@/components/treeDnd';
import {
  findNodeByPath,
  isRecordingCompanionFileKey,
  buildRecordingBasePathSetFromTrees,
} from '@/utils/s3Tree';
import {
  resolveDragItems,
  parseDroppableId,
  toTreeSelectKey,
} from '@/utils/treeMove';

const EXPANDED_FOLDERS_KEY = 's3haim_expandedFolders';
const EMPTY_SELECTED_IDS = new Set();

function loadExpandedPaths() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(EXPANDED_FOLDERS_KEY) : null;
    if (!raw) return { s3: new Set(), local: new Set() };
    const data = JSON.parse(raw);
    return {
      s3: new Set(Array.isArray(data.s3) ? data.s3 : []),
      local: new Set(Array.isArray(data.local) ? data.local : []),
    };
  } catch {
    return { s3: new Set(), local: new Set() };
  }
}

function saveExpandedPaths(expanded) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      EXPANDED_FOLDERS_KEY,
      JSON.stringify({
        s3: Array.from(expanded.s3),
        local: Array.from(expanded.local),
      }),
    );
  } catch (_) {}
}
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
} from '@/components/icons';
import { ArrowRightToLine, ChevronsLeft, Loader2, MessageCircle, Search, X } from 'lucide-react';
import SidebarContextMenu from '@/components/SidebarContextMenu';

function getParentPathFromFilePath(filePath) {
  if (!filePath || typeof filePath !== 'string') return '';
  const normalized = filePath.replace(/\/+$/, '');
  if (!normalized) return '';
  const lastSlashIndex = normalized.lastIndexOf('/');
  if (lastSlashIndex < 0) return '';
  return normalized.slice(0, lastSlashIndex + 1);
}

function isRenameableTreeNode(node) {
  if (!node || node.path === '.trash/' || node.path === '') return false;
  return node.type === 'file' || node.type === 'folder';
}

function isTypingElement(target) {
  if (!target || typeof target !== 'object') return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return false;
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
      <span className="text-gray-400 dark:text-gray-500 w-4 flex justify-center shrink-0">
        <MessageCircle size={14} />
      </span>
      <span className="text-gray-500 dark:text-gray-400 truncate">나와의 채팅</span>
    </button>
  );
}

function filterTree(
  nodes,
  { hideDotFolders, hideRecordingCompanionFiles, searchTerm } = {},
) {
  const q = searchTerm ? searchTerm.toLowerCase() : '';
  const walk = (node) => {
    if (hideDotFolders && node.type === 'folder' && node.name.startsWith('.')) {
      return null;
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

function getSelectedFolderForMove(selectedIds, s3Tree, localTree) {
  if (!selectedIds?.size) return null;
  for (const key of selectedIds) {
    const colonIdx = key.indexOf(':');
    const storageType = colonIdx >= 0 ? key.slice(0, colonIdx) : 's3';
    const path = colonIdx >= 0 ? key.slice(colonIdx + 1) : key;
    const tree = storageType === 's3' ? s3Tree : localTree;
    const node = findNodeByPath(tree, path);
    if (node?.type === 'folder' && path !== '.trash/') {
      return { node, storageType };
    }
  }
  return null;
}

export default function Sidebar({
  appName = 'S3 Haim',
  storageMode = 's3',
  s3Tree,
  s3Bucket,
  localTree,
  localRootHandle,
  isLocalTreeLoading = false,
  localFolderLoadingPath = null,
  onLoadLocalFolderChildren,
  onRefreshLocal,
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
  onOpenSettings,
  theme,
  onToggleTheme,
  onRenameItem,
  showHiddenFolders,
  hideRecordingCompanions = false,
  treeStickyFolderPathEnabled = true,
  onRequestCollapseSidebar,
  deletingFolderPath,
  isDeletingFolder,
  onDropOnFolder,
  onDragEndNode,
  dropTarget,
  expandPathsRef,
  onRefreshS3,
  onDownloadNode,
  onDuplicateNode,
  onRequestMoveFile,
  onOpenInNewWindow,
  onOpenChatWithMyself,
  chatWithMyselfActive = false,
}) {
  const TREE_STICKY_SECTION_TOP = 33;
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const isSearchPending = searchInput !== searchTerm;
  /** null = no explicit folder; '' = bucket/project root selected */
  const [lastFocusedS3FolderPath, setLastFocusedS3FolderPath] = useState(null);
  /** null = no explicit folder; { path: '', handle } = project root */
  const [lastFocusedLocalFolder, setLastFocusedLocalFolder] = useState(null);

  // While Chat with Myself is open, tree must not show another file/folder as selected.
  const treeSelectedIds = chatWithMyselfActive ? EMPTY_SELECTED_IDS : selectedIds;
  const treeCurrentFile = chatWithMyselfActive ? null : currentFile;

  const [expandedPaths, setExpandedPaths] = useState(loadExpandedPaths);
  const [contextMenu, setContextMenu] = useState(null);
  const [renameTarget, setRenameTarget] = useState(null);
  const [lastActivatedNode, setLastActivatedNode] = useState(null);
  const [isS3Refreshing, setIsS3Refreshing] = useState(false);
  const [isS3SpinFinishing, setIsS3SpinFinishing] = useState(false);
  const [activeDragItems, setActiveDragItems] = useState(null);
  const scrollContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const activeDragItemsRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const EDGE_THRESHOLD = 48;
  const AUTO_SCROLL_SPEED = 12;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const findTreeNode = useCallback(
    (storageType, path) => {
      const tree = storageType === 's3' ? s3Tree : localTree;
      return findNodeByPath(tree, path);
    },
    [s3Tree, localTree],
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
      if (!node || node.type !== 'folder') return null;
      return node;
    },
    [findTreeNode, localRootHandle],
  );

  const handleDragStartNode = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const handleDragEndNode = useCallback(() => {
    isDraggingRef.current = false;
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    onDragEndNode?.();
  }, [onDragEndNode]);

  const handleDndDragStart = useCallback(
    (event) => {
      const activeId = String(event.active.id);
      const items = resolveDragItems(activeId, selectedIds, findTreeNode);
      activeDragItemsRef.current = items;
      setActiveDragItems(items);
      handleDragStartNode();
    },
    [selectedIds, findTreeNode, handleDragStartNode],
  );

  const handleDndDragOver = useCallback(
    (event) => {
      const { over } = event;
      if (!over) {
        onDropOnFolder?.(null, null, 'dragLeave');
        return;
      }
      const parsed = parseDroppableId(String(over.id));
      if (!parsed) return;
      const targetNode = resolveDropTargetNode(parsed.storageType, parsed.path);
      if (!targetNode) return;
      onDropOnFolder?.(targetNode, parsed.storageType, 'dragOver');
    },
    [onDropOnFolder, resolveDropTargetNode],
  );

  const handleDndDragEnd = useCallback(
    (event) => {
      const { over } = event;
      const items = activeDragItemsRef.current;
      activeDragItemsRef.current = null;
      setActiveDragItems(null);
      handleDragEndNode();

      if (!over || !items?.length) {
        onDropOnFolder?.(null, null, 'dragLeave');
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

      onDropOnFolder?.(targetNode, parsed.storageType, 'drop', { items });
    },
    [handleDragEndNode, onDropOnFolder, resolveDropTargetNode],
  );

  const handleDndDragCancel = useCallback(() => {
    activeDragItemsRef.current = null;
    setActiveDragItems(null);
    handleDragEndNode();
    onDropOnFolder?.(null, null, 'dragLeave');
  }, [handleDragEndNode, onDropOnFolder]);

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
      };
      const set = storageType === 's3' ? next.s3 : next.local;
      if (isOpen) set.add(path);
      else set.delete(path);
      saveExpandedPaths(next);
      return next;
    });

    if (storageType === 'local' && isOpen && onLoadLocalFolderChildren) {
      const node = findNodeByPath(localTree, path);
      if (node?.type === 'folder' && node.childrenLoaded !== true) {
        void onLoadLocalFolderChildren(node);
      }
    }
  }, [localTree, onLoadLocalFolderChildren]);

  const expandPathsForNewItem = useCallback((storageType, paths) => {
    if (!paths?.length) return;
    setExpandedPaths((prev) => {
      const next = {
        s3: new Set(prev.s3),
        local: new Set(prev.local),
      };
      const set = storageType === 's3' ? next.s3 : next.local;
      paths.forEach((p) => set.add(p));
      saveExpandedPaths(next);
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
        hideRecordingCompanionFiles: hideRecordingCompanions,
        searchTerm,
      }),
    [s3Tree, searchTerm, showHiddenFolders, hideRecordingCompanions],
  );
  const filteredLocalTree = useMemo(
    () =>
      filterTree(localTree, {
        hideDotFolders: !showHiddenFolders,
        hideRecordingCompanionFiles: hideRecordingCompanions,
        searchTerm,
      }),
    [localTree, searchTerm, showHiddenFolders, hideRecordingCompanions],
  );

  /** 필터 전 원본 트리 기준 — 숨김 옵션과 무관하게 녹음 연결 여부 표시 */
  const recordingBasePathSet = useMemo(
    () => buildRecordingBasePathSetFromTrees(s3Tree, localTree),
    [s3Tree, localTree],
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

  const selectedFolderForMove = getSelectedFolderForMove(selectedIds, s3Tree, localTree);

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
    [currentFile, lastFocusedLocalFolder, lastFocusedS3FolderPath, localRootHandle],
  );

  const isS3Mode = storageMode === 's3';
  const isLocalMode = storageMode === 'local';
  const isWebdavMode = storageMode === 'webdav';

  const activateTreeNode = useCallback((storageType, node) => {
    setLastActivatedNode({ storageType, node });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'F2' || e.defaultPrevented) return;
      if (isTypingElement(e.target)) return;
      if (isWebdavMode || !lastActivatedNode) return;

      const { storageType, node } = lastActivatedNode;
      if ((isS3Mode && storageType !== 's3') || (isLocalMode && storageType !== 'local')) return;
      if (!isRenameableTreeNode(node)) return;

      e.preventDefault();
      setRenameTarget({ storageType, node });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isWebdavMode, isS3Mode, isLocalMode, lastActivatedNode]);

  return (
    <div className="w-full h-full min-h-0 bg-white dark:bg-odp-bgSoft border-r border-gray-200 dark:border-odp-bgSofter flex flex-col">
      {contextMenu && contextMenuNode && (
        <SidebarContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextMenuNode}
          storageType={contextMenuStorageType}
          isTrashRoot={contextMenuNode.path === '.trash/'}
          onClose={() => setContextMenu(null)}
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
          onDelete={() => onSetDeleteTarget({ node: contextMenuNode, type: contextMenuStorageType })}
          onDuplicate={onDuplicateNode ? () => onDuplicateNode(contextMenuStorageType, contextMenuNode) : undefined}
          onMove={() => {
            if (contextMenuNode.type === 'folder') {
              onRequestMoveFolder?.(contextMenuNode, contextMenuStorageType);
            } else {
              onRequestMoveFile?.(contextMenuNode, contextMenuStorageType);
            }
          }}
          onOpenInNewWindow={onOpenInNewWindow}
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
              <h1
                data-sidebar-brand
                className="font-bold text-lg text-gray-700 dark:text-odp-fgStrong truncate"
              >
                {appName}
              </h1>
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
          <Search size={16} className="shrink-0 text-gray-700 dark:text-odp-fgStrong" aria-hidden />
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
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-4 space-y-6"
        onDragEnter={handleScrollAreaDragEnter}
        onDragOver={handleScrollAreaDragOver}
        onClick={(e) => {
          if (
            !e.target.closest('[data-tree-node-row]') &&
            !e.target.closest('[data-tree-root-drop-zone]') &&
            !e.target.closest('button') &&
            !e.target.closest('input')
          ) {
            setLastFocusedS3FolderPath(null);
            setLastFocusedLocalFolder(null);
            onClearSelection?.();
          }
        }}
        role="presentation"
      >
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
                  activateTreeNode('s3', rootNode);
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    node: rootNode,
                    storageType: 's3',
                  });
                }}
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
                    onDelete={(n, t) => onSetDeleteTarget({ node: n, type: t })}
                    onRename={onRenameItem}
                    deletingFolderPath={deletingFolderPath}
                    isDeletingFolder={isDeletingFolder}
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
                    onOpenContextMenu={(e, n) => {
                      activateTreeNode('s3', n);
                      setContextMenu({
                        x: e.clientX,
                        y: e.clientY,
                        node: n,
                        storageType: 's3',
                      });
                    }}
                    onActivate={(n) => activateTreeNode('s3', n)}
                    renameTarget={renameTarget}
                    onClearRenameTarget={() => setRenameTarget(null)}
                    recordingBasePathSet={recordingBasePathSet}
                    stickyFoldersEnabled={treeStickyFolderPathEnabled}
                    stickyTopOffset={TREE_STICKY_SECTION_TOP}
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
            {localRootHandle && (
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
          {!localRootHandle && (
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
                activateTreeNode('local', rootNode);
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  node: rootNode,
                  storageType: 'local',
                });
              }}
            />
            {isLocalTreeLoading && !filteredLocalTree.length && (
              <p className="text-xs text-gray-400 px-4 py-2">폴더 목록을 불러오는 중…</p>
            )}
            {localRootHandle ? (
              filteredLocalTree.length > 0 ? (
                filteredLocalTree.map((node) => (
                  <TreeNode
                    key={node.path}
                    node={node}
                    level={0}
                    rootDropNode={
                      localRootHandle
                        ? { path: '', type: 'folder', handle: localRootHandle }
                        : null
                    }
                    onSelect={onSelectFile}
                    storageType="local"
                    selectedIds={treeSelectedIds}
                    currentFile={treeCurrentFile}
                    onCreateFile={(p, h) => onCreateItem('local', p, h, 'file')}
                    onCreateFolder={(p, h) => onCreateItem('local', p, h, 'folder')}
                    onRequestMoveFolder={onRequestMoveFolder}
                    onDelete={(n, t) => onSetDeleteTarget({ node: n, type: t })}
                    onRename={onRenameItem}
                    deletingFolderPath={deletingFolderPath}
                    isDeletingFolder={isDeletingFolder}
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
                    onOpenContextMenu={(e, n) => {
                      activateTreeNode('local', n);
                      setContextMenu({
                        x: e.clientX,
                        y: e.clientY,
                        node: n,
                        storageType: 'local',
                      });
                    }}
                    onActivate={(n) => activateTreeNode('local', n)}
                    isFolderLoading={localFolderLoadingPath}
                    renameTarget={renameTarget}
                    onClearRenameTarget={() => setRenameTarget(null)}
                    recordingBasePathSet={recordingBasePathSet}
                    stickyFoldersEnabled={treeStickyFolderPathEnabled}
                    stickyTopOffset={TREE_STICKY_SECTION_TOP}
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
          <div className="px-4 py-3">
            <p className="text-xs text-gray-500 dark:text-odp-muted">
              WebDAV 모드가 선택되었습니다. 설정 페이지에서 WebDAV 연결 정보를 저장해 주세요.
            </p>
          </div>
        )}
      </div>
      <DragOverlay dropAnimation={null}>
        <TreeDragOverlayPreview items={activeDragItems} />
      </DragOverlay>
      </DndContext>
    </div>
  );
}

