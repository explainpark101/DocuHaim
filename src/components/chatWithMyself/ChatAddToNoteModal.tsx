import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type KeyboardEvent,
} from 'react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { Switch } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import TreeNode from '@/components/TreeNode';
import { type SidebarTreeNode } from '@/components/shell/TreeNode';
import {
  RootDropZone,
  TreeDragOverlayPreview,
  treeCollisionDetection,
  TREE_DND_AUTO_SCROLL,
  TREE_DND_MEASURING,
} from '@/components/treeDnd';
import TreeDndLayoutSync from '@/components/shell/TreeDndLayoutSync';
import { IconFolderPlus } from '@/components/icons';
import { Folder, FolderInput, RotateCcw } from 'lucide-react';
import { findNodeByPath } from '@/utils/s3Tree';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import {
  resolveDragItems,
  parseDroppableId,
  toTreeSelectKey,
} from '@/utils/treeMove';
import { useTreeCopyDragModifier } from '@/hooks/useTreeCopyDragModifier';
import type { TreeCopyModifierEvent } from '@/utils/treeCopy';
import {
  detectTimeZone,
  formatMessageFileNameBase,
} from '@/utils/chatWithMyself';
import { filterVaultTreeForDisplay } from '@/utils/filterVaultTreeForDisplay';
import {
  isCreateItemPathTaken,
  listCreateItemFolderSuggestions,
  listMissingCreateParentFolders,
  resolveCreateItemAutocompleteContext,
  resolveCreateItemPath,
  type FolderSuggestItem,
} from '@/utils/createItemPath';
import type { BrowseTreeNode } from '@/utils/advancedSearch/browseDirectory';

const EMPTY_SELECTED_IDS: Set<string> = new Set();

/** Above Modal / ConfirmModal (`z-100000`) so the drag preview stays visible. */
const DRAG_OVERLAY_Z_INDEX = 100050;

const switchRootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

export type ChatAddToNoteMessage = {
  id?: string;
  at?: string;
  replyTo?: string | null;
  [key: string]: unknown;
};

export type ChatAddToNoteTreeNode = SidebarTreeNode & {
  childrenLoaded?: boolean;
  handle?: FileSystemDirectoryHandle | null;
};

export type ChatAddToNoteConfirmPayload = {
  /** Selected tree folder (base for relative path input). */
  parentPath: string;
  parentHandle?: FileSystemDirectoryHandle | null | undefined;
  /**
   * Path or file name relative to `parentPath` (or vault root when input
   * starts with `/`). May include nested folders: `notes/foo/bar.md`.
   */
  fileName: string;
  message: ChatAddToNoteMessage;
  includeReplyThread: boolean;
  /** Create missing parent folders after a one-time confirm. */
  createMissingFolders?: boolean;
};

type TreeMoveItem = {
  storageType: string;
  path: string;
  nodeType?: string;
  name?: string;
};

type DropTarget = {
  storageType: string;
  folderPath: string;
} | null;

type DropOnFolderAction = 'dragOver' | 'dragLeave' | 'drop';

type DropOnFolderPayload = {
  items?: TreeMoveItem[];
  copy?: boolean;
};

type RootFolderNode = {
  path: '';
  type: 'folder';
  name: 'root';
  handle: FileSystemDirectoryHandle | null;
};

type PendingMove = {
  targetNode: ChatAddToNoteTreeNode | RootFolderNode;
  targetStorageType: string;
  items: TreeMoveItem[];
  copy: boolean;
};

export type ChatAddToNoteModalProps = {
  isOpen: boolean;
  message?: ChatAddToNoteMessage | null;
  storageType: string;
  s3Tree?: ChatAddToNoteTreeNode[] | null;
  localTree?: ChatAddToNoteTreeNode[] | null;
  webdavTree?: ChatAddToNoteTreeNode[] | null;
  idbTree?: ChatAddToNoteTreeNode[] | null;
  localRootHandle?: FileSystemDirectoryHandle | null;
  timeZone?: string | null;
  onClose?: (() => void) | undefined;
  onConfirm?:
    | ((payload: ChatAddToNoteConfirmPayload) => Promise<void> | void)
    | undefined;
  onRequestCreateFolder?:
    | ((
        parentPath: string,
        parentDirHandle?: FileSystemDirectoryHandle | null,
      ) => void)
    | undefined;
  onRequestMoveFolder?:
    | ((node: ChatAddToNoteTreeNode, storageType: string) => void)
    | undefined;
  selectPathAfterCreate?: string | null;
  onSelectPathAfterCreateApplied?: (() => void) | undefined;
  isSubmitting?: boolean;
  onDropOnFolder?:
    | ((
        targetNode: ChatAddToNoteTreeNode | RootFolderNode | SidebarTreeNode | null,
        targetStorageType: string | null,
        action: DropOnFolderAction,
        payload?: DropOnFolderPayload,
      ) => void)
    | undefined;
  dropTarget?: DropTarget;
  onLoadLocalFolderChildren?:
    | ((node: ChatAddToNoteTreeNode) => Promise<void> | void)
    | undefined;
  localFolderLoadingPath?: string | null;
};

function useIsMobileDragDisabled(): boolean {
  const [disabled, setDisabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  });
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () =>
      setDisabled(mq.matches || window.innerWidth < 768);
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);
  return disabled;
}

function getAncestorPathsToExpand(path: string): string[] {
  if (!path || path === '') return [];
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
  if (parts.length <= 1) return [];
  const result: string[] = [];
  let acc = '';
  for (let i = 0; i < parts.length - 1; i++) {
    acc += parts[i] + '/';
    result.push(acc);
  }
  return result;
}

function formatMoveTargetLabel(
  targetNode: ChatAddToNoteTreeNode | RootFolderNode | null | undefined,
  storageType: string,
): string {
  if (!targetNode || targetNode.path === '') {
    return storageType === 's3' ? '루트 (버킷 최상위)' : '루트 폴더';
  }
  return targetNode.name || targetNode.path;
}

function formatMoveConfirmMessage(
  items: TreeMoveItem[] | null | undefined,
  targetNode: ChatAddToNoteTreeNode | RootFolderNode | null | undefined,
  storageType: string,
  { copy = false }: { copy?: boolean } = {},
): string {
  const targetLabel = formatMoveTargetLabel(targetNode, storageType);
  const verb = copy ? '복제' : '이동';
  if (!items?.length) {
    return `"${targetLabel}"(으)로 ${verb}할까요?`;
  }
  if (items.length === 1) {
    const first = items[0]!;
    const name = first.name || first.path || '항목';
    return `"${name}"을(를) "${targetLabel}"(으)로 ${verb}할까요?`;
  }
  return `${items.length}개 항목을 "${targetLabel}"(으)로 ${verb}할까요?`;
}

/**
 * Pick a folder and create a note from a chat message.
 */
export default function ChatAddToNoteModal({
  isOpen,
  message,
  storageType,
  s3Tree,
  localTree,
  webdavTree,
  idbTree,
  localRootHandle,
  timeZone,
  onClose,
  onConfirm,
  onRequestCreateFolder,
  onRequestMoveFolder,
  selectPathAfterCreate,
  onSelectPathAfterCreateApplied,
  isSubmitting = false,
  onDropOnFolder,
  dropTarget,
  onLoadLocalFolderChildren,
  localFolderLoadingPath = null,
}: ChatAddToNoteModalProps) {
  const vaultWithoutHandle =
    storageType === 's3' || storageType === 'webdav' || storageType === 'idb';
  const tree = useMemo(() => {
    const raw =
      storageType === 's3'
        ? (s3Tree ?? [])
        : storageType === 'webdav'
          ? (webdavTree ?? [])
          : storageType === 'idb'
            ? (idbTree ?? [])
            : (localTree ?? []);
    return filterVaultTreeForDisplay(raw);
  }, [storageType, s3Tree, localTree, webdavTree, idbTree]);
  const tz = timeZone || detectTimeZone();
  const defaultBaseName = useMemo(
    () => formatMessageFileNameBase(message?.at || new Date().toISOString(), tz),
    [message?.at, tz],
  );

  const [fileName, setFileName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<ChatAddToNoteTreeNode | null>(null);
  const [selectedRoot, setSelectedRoot] = useState(true);
  const [error, setError] = useState('');
  const [confirmReplaceName, setConfirmReplaceName] = useState(false);
  const [pendingMissingFolders, setPendingMissingFolders] = useState<string[] | null>(
    null,
  );
  const [pendingMove, setPendingMove] = useState<PendingMove | null>(null);
  const [expandedPaths, setExpandedPaths] = useState(() => new Set<string>());
  const [activeDragItems, setActiveDragItems] = useState<TreeMoveItem[] | null>(null);
  const { isCopyDrag, isCopyDragRef, syncFromEvent: syncCopyModifierFromEvent } =
    useTreeCopyDragModifier(Boolean(activeDragItems?.length));
  const [includeReplyThread, setIncludeReplyThread] = useState(true);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeSuggest, setActiveSuggest] = useState(0);
  const hasInitializedRef = useRef(false);
  const activeDragItemsRef = useRef<TreeMoveItem[] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pathWrapRef = useRef<HTMLDivElement | null>(null);
  const pathListboxId = useId();
  const dragDisabled = useIsMobileDragDisabled();

  const browseTrees = useMemo(
    (): Array<BrowseTreeNode[] | null | undefined> => [tree as BrowseTreeNode[]],
    [tree],
  );

  // Mouse only — touch/mobile must not start tree reorder drags.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
      return;
    }
    setFileName('');
    setError('');
    setConfirmReplaceName(false);
    setPendingMissingFolders(null);
    setPendingMove(null);
    setSelectedRoot(true);
    setSelectedFolder(null);
    setExpandedPaths(new Set());
    setIncludeReplyThread(true);
    setSuggestOpen(false);
    setActiveSuggest(0);
    hasInitializedRef.current = false;
  }, [isOpen, message?.id]);

  useEffect(() => {
    if (!isOpen || !tree?.length || hasInitializedRef.current) return;

    if (selectPathAfterCreate) {
      const node = findNodeByPath(tree, selectPathAfterCreate) as ChatAddToNoteTreeNode | null;
      if (node && node.type === 'folder') {
        setSelectedFolder(node);
        setSelectedRoot(false);
        setExpandedPaths(new Set(getAncestorPathsToExpand(selectPathAfterCreate)));
        onSelectPathAfterCreateApplied?.();
      }
      hasInitializedRef.current = true;
      return;
    }

    setSelectedRoot(true);
    setSelectedFolder(null);
    hasInitializedRef.current = true;
  }, [isOpen, selectPathAfterCreate, tree, onSelectPathAfterCreateApplied]);

  useEffect(() => {
    if (!isOpen || !selectPathAfterCreate || !tree?.length) return;
    const node = findNodeByPath(tree, selectPathAfterCreate) as ChatAddToNoteTreeNode | null;
    if (node && node.type === 'folder') {
      setSelectedFolder(node);
      setSelectedRoot(false);
      setExpandedPaths((prev) => {
        const next = new Set(prev);
        getAncestorPathsToExpand(selectPathAfterCreate).forEach((p) => next.add(p));
        return next;
      });
      onSelectPathAfterCreateApplied?.();
    }
  }, [selectPathAfterCreate, tree, isOpen, onSelectPathAfterCreateApplied]);

  useEffect(() => {
    if (!selectedFolder || !scrollContainerRef.current) return;
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        const rows = scrollContainerRef.current?.querySelectorAll('[data-tree-node-row]');
        if (!rows?.length) return;
        for (const row of rows) {
          if (row.classList.contains('bg-blue-50')) {
            row.scrollIntoView({ block: 'nearest', behavior: 'instant' });
            break;
          }
        }
      });
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedFolder?.path, isOpen]);

  const selectedIds = useMemo(() => {
    if (selectedRoot || !selectedFolder?.path) return EMPTY_SELECTED_IDS;
    return new Set([toTreeSelectKey(storageType, selectedFolder.path)]);
  }, [selectedRoot, selectedFolder?.path, storageType]);

  const activeDragItemIds = useMemo(() => {
    if (!activeDragItems?.length) return null;
    return new Set(activeDragItems.map((item) => toTreeSelectKey(item.storageType, item.path)));
  }, [activeDragItems]);

  const findTreeNode = useCallback(
    (type: string, path: string): ChatAddToNoteTreeNode | RootFolderNode | null => {
      if (path === '') {
        return {
          path: '',
          type: 'folder',
          name: 'root',
          handle: type === 'local' ? localRootHandle ?? null : null,
        };
      }
      const source = (type === 's3' ? s3Tree : localTree) ?? [];
      return (findNodeByPath(source, path) as ChatAddToNoteTreeNode | null) ?? null;
    },
    [s3Tree, localTree, localRootHandle],
  );

  const resolveDropTargetNode = useCallback(
    (type: string, path: string): ChatAddToNoteTreeNode | RootFolderNode | null => {
      const node = findTreeNode(type, path);
      if (!node) return null;
      if (node.type === 'folder') return node;
      if (path === '' || (type === 'local' && path === '' && localRootHandle)) {
        return {
          path: '',
          type: 'folder',
          name: 'root',
          handle: type === 'local' ? localRootHandle ?? null : null,
        };
      }
      return node;
    },
    [findTreeNode, localRootHandle],
  );

  const handleExpandedChange = useCallback(
    (_type: string, path: string, isOpenNext: boolean) => {
      setExpandedPaths((prev) => {
        const next = new Set(prev);
        if (isOpenNext) next.add(path);
        else next.delete(path);
        return next;
      });

      if (storageType === 'local' && isOpenNext && onLoadLocalFolderChildren) {
        const node = findNodeByPath(localTree ?? [], path) as ChatAddToNoteTreeNode | null;
        if (node?.type === 'folder' && node.childrenLoaded !== true) {
          void onLoadLocalFolderChildren(node);
        }
      }
    },
    [storageType, localTree, onLoadLocalFolderChildren],
  );

  const handleSelectFolder = useCallback(
    (_type: string, node: ChatAddToNoteTreeNode) => {
      if (!node || node.type !== 'folder') return;
      setSelectedRoot(false);
      setSelectedFolder(node);
    },
    [],
  );

  const handleDndDragStart = useCallback(
    (event: DragStartEvent) => {
      if (dragDisabled) return;
      const activeId = String(event.active.id);
      const items = resolveDragItems(activeId, selectedIds, findTreeNode) as TreeMoveItem[];
      activeDragItemsRef.current = items;
      setActiveDragItems(items);
      syncCopyModifierFromEvent(event.activatorEvent as TreeCopyModifierEvent | null);
    },
    [dragDisabled, selectedIds, findTreeNode, syncCopyModifierFromEvent],
  );

  const handleDndDragOver = useCallback(
    (event: DragOverEvent) => {
      if (dragDisabled) return;
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
    [dragDisabled, onDropOnFolder, resolveDropTargetNode],
  );

  const handleDndDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { over } = event;
      const items = activeDragItemsRef.current;
      activeDragItemsRef.current = null;
      setActiveDragItems(null);
      onDropOnFolder?.(null, null, 'dragLeave');

      if (dragDisabled || !over || !items?.length) return;

      const parsed = parseDroppableId(String(over.id));
      if (!parsed) return;

      const targetNode = resolveDropTargetNode(parsed.storageType, parsed.path);
      if (!targetNode) return;

      setPendingMove({
        targetNode,
        targetStorageType: parsed.storageType,
        items,
        copy: isCopyDragRef.current,
      });
    },
    [dragDisabled, isCopyDragRef, onDropOnFolder, resolveDropTargetNode],
  );

  const handleDndDragCancel = useCallback(() => {
    activeDragItemsRef.current = null;
    setActiveDragItems(null);
    onDropOnFolder?.(null, null, 'dragLeave');
  }, [onDropOnFolder]);

  const handleConfirmMove = useCallback(() => {
    if (!pendingMove) return;
    const { targetNode, targetStorageType, items, copy } = pendingMove;
    setPendingMove(null);
    onDropOnFolder?.(targetNode, targetStorageType, 'drop', { items, copy });
  }, [pendingMove, onDropOnFolder]);

  const handleCancelMove = useCallback(() => {
    setPendingMove(null);
  }, []);

  const parentPath = selectedRoot ? '' : selectedFolder?.path || '';

  const pathInput = fileName.trim() || defaultBaseName;
  const resolvedPath = useMemo(
    () => resolveCreateItemPath(parentPath, pathInput, 'file'),
    [parentPath, pathInput],
  );
  const autocomplete = useMemo(
    () => resolveCreateItemAutocompleteContext(parentPath, fileName),
    [parentPath, fileName],
  );
  const suggestions = useMemo(() => {
    if (!autocomplete.ok) return [];
    return listCreateItemFolderSuggestions(
      browseTrees,
      autocomplete.listDir,
      autocomplete.prefix,
    );
  }, [autocomplete, browseTrees]);

  useEffect(() => {
    setActiveSuggest(0);
  }, [fileName, suggestions.length]);

  useEffect(() => {
    const el = pathWrapRef.current;
    if (!el) return undefined;
    const onPointerDown = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) setSuggestOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const applySuggestion = useCallback(
    (item: FolderSuggestItem) => {
      if (!autocomplete.ok) return;
      setFileName(`${autocomplete.stem}${item.name}/`);
      setSuggestOpen(true);
      setActiveSuggest(0);
    },
    [autocomplete],
  );

  if (!isOpen || !message) return null;

  const isReplyMessage = Boolean(message.replyTo);
  const parentDirHandle = selectedRoot ? localRootHandle : selectedFolder?.handle;
  const canCreateFolder = vaultWithoutHandle || parentDirHandle != null;
  // Prefer vault root handle when typing absolute/nested paths.
  const canSubmitBase = vaultWithoutHandle
    ? true
    : Boolean(localRootHandle || parentDirHandle);
  const canMoveFolder = !selectedRoot && selectedFolder?.type === 'folder';
  const isOutsideRoot =
    resolvedPath?.ok === false && resolvedPath.reason === 'outside-root';
  const isDuplicate =
    resolvedPath?.ok === true
    && isCreateItemPathTaken(browseTrees, resolvedPath, 'file');
  const canSubmit =
    canSubmitBase && resolvedPath?.ok === true && !isDuplicate && !isOutsideRoot;
  const showSuggestions =
    suggestOpen && !isOutsideRoot && autocomplete.ok && suggestions.length > 0;
  const listDirLabel = autocomplete.ok
    ? autocomplete.listDir || '(루트)'
    : '(루트 밖)';
  const rootLabel =
    storageType === 'local'
      ? '로컬: '
      : storageType === 'webdav'
        ? 'WebDAV: '
        : storageType === 'idb'
          ? 'IDB: '
          : 'S3: ';
  const previewPath = (() => {
    if (!pathInput.trim()) {
      return `${rootLabel}${parentPath || ''}${defaultBaseName}.md`;
    }
    if (resolvedPath?.ok) return `${rootLabel}${resolvedPath.path}`;
    if (isOutsideRoot) return `${rootLabel}(루트 밖 — 생성 불가)`;
    return `${rootLabel}${parentPath || ''}${pathInput}`;
  })();

  const applyDefaultFileName = () => {
    if (fileName.trim()) {
      setConfirmReplaceName(true);
      return;
    }
    setFileName(defaultBaseName);
  };

  const submitCreate = async (createMissingFolders: boolean) => {
    if (!onConfirm || isSubmitting || !message) return;
    if (!resolvedPath?.ok) {
      setError(
        resolvedPath?.reason === 'outside-root'
          ? '루트 밖으로 나갈 수 없습니다.'
          : '파일명을 입력하세요.',
      );
      return;
    }
    if (isDuplicate) {
      setError('같은 경로의 파일이 이미 있습니다.');
      return;
    }
    setError('');
    setSuggestOpen(false);
    try {
      await onConfirm({
        parentPath,
        parentHandle: parentDirHandle,
        fileName: pathInput,
        message,
        includeReplyThread: isReplyMessage ? includeReplyThread : false,
        createMissingFolders,
      });
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : '노트 생성 실패';
      setError(errMsg || '노트 생성 실패');
    }
  };

  const handleSubmit = async () => {
    if (!onConfirm || isSubmitting || !message) return;
    if (!resolvedPath?.ok) {
      setError(
        resolvedPath?.reason === 'outside-root'
          ? '루트 밖으로 나갈 수 없습니다.'
          : '파일명을 입력하세요.',
      );
      return;
    }
    if (isDuplicate) {
      setError('같은 경로의 파일이 이미 있습니다.');
      return;
    }
    const missing = listMissingCreateParentFolders(
      browseTrees,
      resolvedPath.parentDirPath,
    );
    if (missing.length > 0) {
      setPendingMissingFolders(missing);
      return;
    }
    await submitCreate(false);
  };

  const handlePathKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggest((i) => (i + 1) % suggestions.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggest(
        (i) => (i - 1 + suggestions.length) % suggestions.length,
      );
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const item = suggestions[activeSuggest] || suggestions[0];
      if (item) applySuggestion(item);
    }
  };

  const folderRoots = (tree || []).filter(
    (n): n is ChatAddToNoteTreeNode => n.type === 'folder',
  );

  return (
    <>
    <Modal isOpen={isOpen} onClose={isSubmitting ? undefined : onClose} onConfirm={canSubmit && !isSubmitting ? handleSubmit : undefined}>
      <div className="flex max-h-[90vh] flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          노트로 추가
        </h2>
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          폴더를 선택하거나 `/` 로 경로를 입력해 노트를 만듭니다. Tab으로 폴더를
          자동완성할 수 있습니다. 없는 폴더는 한 번 확인 후 생성됩니다.
        </p>

        <div ref={pathWrapRef} className="relative block space-y-1">
          <span className="text-[11px] font-medium text-gray-600 dark:text-odp-muted">
            경로 / 파일명
          </span>
          <div className="flex items-center gap-1">
            <input
              value={fileName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFileName(e.target.value);
                setSuggestOpen(true);
                setError('');
              }}
              onFocus={() => setSuggestOpen(true)}
              onKeyDown={handlePathKeyDown}
              placeholder={`${defaultBaseName} 또는 notes/폴더/${defaultBaseName}`}
              className={`min-w-0 flex-1 rounded-md border bg-white px-2 py-1.5 text-sm outline-none focus-visible:ring-2 dark:bg-odp-surface dark:text-odp-fgStrong ${
                isOutsideRoot || isDuplicate
                  ? 'border-red-500 focus-visible:ring-red-400 dark:border-red-500'
                  : 'border-gray-300 focus-visible:ring-blue-400 dark:border-odp-borderStrong'
              }`}
              autoFocus
              autoComplete="off"
              role="combobox"
              aria-expanded={showSuggestions}
              aria-autocomplete="list"
              aria-controls={pathListboxId}
              aria-activedescendant={
                showSuggestions && suggestions[activeSuggest]
                  ? `${pathListboxId}-opt-${activeSuggest}`
                  : undefined
              }
              aria-invalid={isOutsideRoot || isDuplicate}
              aria-label="경로 또는 파일명"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={applyDefaultFileName}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-gray-200"
              aria-label="기본 이름 적용"
            >
              <RotateCcw size={15} />
            </button>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-odp-muted">
            생성될 위치:{' '}
            <span
              className={`font-mono break-all ${
                isOutsideRoot || isDuplicate
                  ? 'text-red-600 dark:text-red-400'
                  : ''
              }`}
            >
              {previewPath}
            </span>
          </p>
          {showSuggestions ? (
            <div
              id={pathListboxId}
              role="listbox"
              aria-label={`폴더 자동완성 · ${listDirLabel}`}
              className="z-100010 max-h-40 overflow-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            >
              <div className="sticky top-0 border-b border-gray-100 bg-gray-50 px-3 py-1.5 text-[11px] text-gray-500 dark:border-odp-border dark:bg-odp-bgSofter dark:text-odp-muted">
                폴더 목록 · {listDirLabel}
              </div>
              {suggestions.map((item, index) => {
                const active = index === activeSuggest;
                return (
                  <button
                    key={`${item.name}:${item.path || ''}`}
                    type="button"
                    role="option"
                    id={`${pathListboxId}-opt-${index}`}
                    aria-selected={active}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                      active
                        ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100'
                        : 'text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg'
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applySuggestion(item);
                    }}
                    onMouseEnter={() => setActiveSuggest(index)}
                  >
                    <Folder
                      size={14}
                      className="shrink-0 text-gray-400 dark:text-odp-muted"
                      aria-hidden
                    />
                    <span className="truncate font-mono">{item.name}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex min-h-[200px] max-h-[320px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft">
          <div className="flex items-center justify-end gap-1 border-b border-gray-100 bg-gray-50 px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            {onRequestMoveFolder ? (
              <button
                type="button"
                onClick={() => {
                  if (!canMoveFolder || !selectedFolder) return;
                  onRequestMoveFolder(selectedFolder, storageType);
                }}
                disabled={!canMoveFolder}
                className="flex items-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg"
                title="선택한 폴더 이동"
              >
                <FolderInput size={14} />
                폴더 이동
              </button>
            ) : null}
            {onRequestCreateFolder ? (
              <button
                type="button"
                onClick={() => {
                  if (!canCreateFolder) return;
                  onRequestCreateFolder(parentPath, parentDirHandle);
                }}
                disabled={!canCreateFolder}
                className="flex items-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <IconFolderPlus size={14} />
                새 폴더
              </button>
            ) : null}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={treeCollisionDetection}
            onDragStart={handleDndDragStart}
            onDragOver={handleDndDragOver}
            onDragEnd={handleDndDragEnd}
            onDragCancel={handleDndDragCancel}
            autoScroll={TREE_DND_AUTO_SCROLL}
            measuring={TREE_DND_MEASURING}
          >
            <TreeDndLayoutSync scrollContainerRef={scrollContainerRef} />
            <div ref={scrollContainerRef} className="flex-1 overflow-auto py-1">
              <RootDropZone
                storageType={storageType}
                localRootHandle={localRootHandle}
                onDropOnFolder={
                  onDropOnFolder as ComponentProps<typeof RootDropZone>['onDropOnFolder']
                }
                dropTarget={dropTarget}
                isSelected={selectedRoot}
                onFocusRoot={() => {
                  setSelectedRoot(true);
                  setSelectedFolder(null);
                }}
              />
              {folderRoots.length > 0 ? (
                folderRoots.map((node) => (
                  <TreeNode
                    key={node.path}
                    node={node}
                    level={0}
                    rootDropNode={{
                      path: '',
                      type: 'folder',
                      handle: vaultWithoutHandle ? null : (localRootHandle ?? null),
                    }}
                    onSelect={handleSelectFolder}
                    storageType={storageType}
                    selectedIds={selectedIds}
                    onRequestMoveFolder={onRequestMoveFolder}
                    expandedPaths={expandedPaths}
                    onExpandedChange={handleExpandedChange}
                    onDropOnFolder={
                      onDropOnFolder as ComponentProps<typeof TreeNode>['onDropOnFolder']
                    }
                    dropTarget={dropTarget}
                    activeDragItemIds={activeDragItemIds}
                    isCopyDrag={isCopyDrag}
                    stickyFoldersEnabled={false}
                    foldersOnly
                    folderSelectMode
                    disableDrag={dragDisabled}
                    isFolderLoading={localFolderLoadingPath}
                  />
                ))
              ) : (
                <div className="px-3 py-4 text-xs text-gray-400 dark:text-odp-muted">
                  사용할 수 있는 폴더가 없습니다.
                </div>
              )}
            </div>
            <DragOverlay
              dropAnimation={null}
              style={{ zIndex: DRAG_OVERLAY_Z_INDEX }}
            >
              {activeDragItems?.length ? (
                <TreeDragOverlayPreview items={activeDragItems} isCopy={isCopyDrag} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {isReplyMessage ? (
          <label
            htmlFor="chat-add-to-note-include-thread"
            className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bg/40"
          >
            <span className="min-w-0">
              <span className="block text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                원본 메시지 쓰레드도 노트에 포함
              </span>
              <span className="mt-0.5 block text-xs text-gray-500 dark:text-odp-muted">
                답장 대상과 그 상위 원본을 노트 본문에 함께 넣습니다.
              </span>
            </span>
            <Switch.Root
              id="chat-add-to-note-include-thread"
              className={switchRootClass}
              checked={includeReplyThread}
              onCheckedChange={(next: boolean) => setIncludeReplyThread(Boolean(next))}
              aria-label="원본 메시지 쓰레드도 노트에 포함"
            >
              <Switch.Thumb className={switchThumbClass} />
            </Switch.Root>
          </label>
        ) : null}

        {error ? (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`rounded px-4 py-2 text-sm font-medium text-white transition ${
              canSubmit && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'cursor-not-allowed bg-blue-300'
            }`}
          >
            {isSubmitting ? '생성 중…' : '노트 생성'}
          </button>
        </div>
      </div>
    </Modal>
      <ConfirmModal
        isOpen={confirmReplaceName}
        title="파일명 대체"
        message="입력된 경로를 기본 파일 이름으로 바꿀까요?"
        confirmLabel="대체"
        cancelLabel="취소"
        onConfirm={() => {
          setFileName(defaultBaseName);
          setConfirmReplaceName(false);
        }}
        onCancel={() => setConfirmReplaceName(false)}
      />
      <ConfirmModal
        isOpen={Boolean(pendingMissingFolders?.length)}
        title="폴더 만들기"
        message={
          pendingMissingFolders?.length
            ? `없는 폴더가 있습니다. 아래 경로를 만든 뒤 노트를 생성할까요?\n\n${pendingMissingFolders.join('\n')}`
            : ''
        }
        confirmLabel="만들고 생성"
        cancelLabel="취소"
        onConfirm={() => {
          setPendingMissingFolders(null);
          void submitCreate(true);
        }}
        onCancel={() => setPendingMissingFolders(null)}
      />
      <ConfirmModal
        isOpen={Boolean(pendingMove)}
        title={pendingMove?.copy ? '폴더 복제' : '폴더 이동'}
        message={
          pendingMove
            ? formatMoveConfirmMessage(
                pendingMove.items,
                pendingMove.targetNode,
                pendingMove.targetStorageType,
                { copy: Boolean(pendingMove.copy) },
              )
            : ''
        }
        confirmLabel={pendingMove?.copy ? '복제' : '이동'}
        cancelLabel="취소"
        onConfirm={handleConfirmMove}
        onCancel={handleCancelMove}
      />
    </>
  );
}
