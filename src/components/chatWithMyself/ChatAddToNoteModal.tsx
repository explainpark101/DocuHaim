import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Switch } from 'radix-ui';
import Modal from '@/components/shared/modals/Modal';
import TreeNode from '@/components/shell/TreeNode';
import {
  RootDropZone,
  TreeDragOverlayPreview,
  treeCollisionDetection,
} from '@/components/shell/treeDnd';
import { IconFolderPlus } from '@/components/icons';
import { FolderInput, RotateCcw } from 'lucide-react';
import { findNodeByPath } from '@/utils/vault/s3Tree';
import type { VaultTreeNode } from '@/utils/vault/vaultTreeTypes';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import {
  resolveDragItems,
  parseDroppableId,
  toTreeSelectKey,
} from '@/utils/vault/treeMove';
import { useTreeCopyDragModifier } from '@/hooks/useTreeCopyDragModifier';
import {
  detectTimeZone,
  formatMessageFileNameBase,
} from '@/utils/chatWithMyself';

const EMPTY_SELECTED_IDS = new Set();

/** Above Modal / ConfirmModal (`z-100000`) so the drag preview stays visible. */
const DRAG_OVERLAY_Z_INDEX = 100050;

const switchRootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';


function useIsMobileDragDisabled() {
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

function getAncestorPathsToExpand(path: any) {
  if (!path || path === '') return [];
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
  if (parts.length <= 1) return [];
  const result = [];
  let acc = '';
  for (let i = 0; i < parts.length - 1; i++) {
    acc += parts[i] + '/';
    result.push(acc);
  }
  return result;
}

function formatMoveTargetLabel(targetNode: any, storageType: any) {
  if (!targetNode || targetNode.path === '') {
    return storageType === 's3' ? '루트 (버킷 최상위)' : '루트 폴더';
  }
  return targetNode.name || targetNode.path;
}

function formatMoveConfirmMessage(items: any, targetNode: any, storageType: any, { copy = false } = {}) {
  const targetLabel = formatMoveTargetLabel(targetNode, storageType);
  const verb = copy ? '복제' : '이동';
  if (!items?.length) {
    return `"${targetLabel}"(으)로 ${verb}할까요?`;
  }
  if (items.length === 1) {
    const name = items[0].name || items[0].path || '항목';
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
  localFolderLoadingPath = null
}: any) {
  const isS3 = storageType === 's3';
  const tree = isS3 ? s3Tree : localTree;
  const tz = timeZone || detectTimeZone();
  const defaultBaseName = useMemo(
    () => formatMessageFileNameBase(message?.at || new Date().toISOString(), tz),
    [message?.at, tz],
  );

  const [fileName, setFileName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<VaultTreeNode | null>(null);
  const [selectedRoot, setSelectedRoot] = useState(true);
  const [error, setError] = useState('');
  const [confirmReplaceName, setConfirmReplaceName] = useState(false);
  const [pendingMove, setPendingMove] = useState<any>(null);
  const [expandedPaths, setExpandedPaths] = useState(() => new Set());
  const [activeDragItems, setActiveDragItems] = useState<any[] | null>(null);
  const { isCopyDrag, isCopyDragRef, syncFromEvent: syncCopyModifierFromEvent } =
    useTreeCopyDragModifier(Boolean(activeDragItems?.length));
  const [includeReplyThread, setIncludeReplyThread] = useState(true);
  const hasInitializedRef = useRef(false);
  const activeDragItemsRef = useRef<any[] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dragDisabled = useIsMobileDragDisabled();

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
    setPendingMove(null);
    setSelectedRoot(true);
    setSelectedFolder(null);
    setExpandedPaths(new Set());
    setIncludeReplyThread(true);
    hasInitializedRef.current = false;
  }, [isOpen, message?.id]);

  useEffect(() => {
    if (!isOpen || !tree?.length || hasInitializedRef.current) return;

    if (selectPathAfterCreate) {
      const node = findNodeByPath(tree, selectPathAfterCreate);
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
    const node = findNodeByPath(tree, selectPathAfterCreate);
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
    return new Set(activeDragItems.map((item: any) => toTreeSelectKey(item.storageType, item.path)));
  }, [activeDragItems]);

  const findTreeNode = useCallback(
    (type: any, path: any) => {
      if (path === '') {
        return {
          path: '',
          type: 'folder',
          name: 'root',
          handle: type === 'local' ? localRootHandle : null,
        };
      }
      const source = type === 's3' ? s3Tree : localTree;
      return findNodeByPath(source, path);
    },
    [s3Tree, localTree, localRootHandle],
  );

  const resolveDropTargetNode = useCallback(
    (type: any, path: any) => {
      const node = findTreeNode(type, path);
      if (!node) return null;
      if (node.type === 'folder') return node;
      if (path === '' || (type === 'local' && path === '' && localRootHandle)) {
        return {
          path: '',
          type: 'folder',
          name: 'root',
          handle: type === 'local' ? localRootHandle : null,
        };
      }
      return node;
    },
    [findTreeNode, localRootHandle],
  );

  const handleExpandedChange = useCallback(
    (_type: any, path: any, isOpenNext: any) => {
      setExpandedPaths((prev) => {
        const next = new Set(prev);
        if (isOpenNext) next.add(path);
        else next.delete(path);
        return next;
      });

      if (storageType === 'local' && isOpenNext && onLoadLocalFolderChildren) {
        const node = findNodeByPath(localTree, path);
        if (node?.type === 'folder' && node.childrenLoaded !== true) {
          void onLoadLocalFolderChildren(node);
        }
      }
    },
    [storageType, localTree, onLoadLocalFolderChildren],
  );

  const handleSelectFolder = useCallback(
    (_type: any, node: any) => {
      if (!node || node.type !== 'folder') return;
      setSelectedRoot(false);
      setSelectedFolder(node);
    },
    [],
  );

  const handleDndDragStart = useCallback(
    (event: any) => {
      if (dragDisabled) return;
      const activeId = String(event.active.id);
      const items = resolveDragItems(activeId, selectedIds, findTreeNode);
      activeDragItemsRef.current = items;
      setActiveDragItems(items);
      syncCopyModifierFromEvent(event.activatorEvent);
    },
    [dragDisabled, selectedIds, findTreeNode, syncCopyModifierFromEvent],
  );

  const handleDndDragOver = useCallback(
    (event: any) => {
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
    (event: any) => {
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

  if (!isOpen || !message) return null;

  const isReplyMessage = Boolean(message.replyTo);
  const parentPath = selectedRoot ? '' : selectedFolder?.path || '';
  const parentDirHandle = selectedRoot ? localRootHandle : selectedFolder?.handle;
  const canCreateFolder = isS3 || parentDirHandle != null;
  const canSubmit = isS3 ? true : !!(selectedRoot ? localRootHandle : selectedFolder?.handle);
  const canMoveFolder = !selectedRoot && selectedFolder?.type === 'folder';

  const applyDefaultFileName = () => {
    if (fileName.trim()) {
      setConfirmReplaceName(true);
      return;
    }
    setFileName(defaultBaseName);
  };

  const handleSubmit = async () => {
    if (!onConfirm || isSubmitting) return;
    const raw = (fileName.trim() || defaultBaseName).replace(/\.md$/i, '');
    if (!raw) {
      setError('파일명을 입력하세요.');
      return;
    }
    if (raw.includes('/') || raw.includes('\\')) {
      setError('파일명에 / 를 넣을 수 없습니다.');
      return;
    }
    setError('');
    try {
      await onConfirm({
        parentPath,
        parentHandle: parentDirHandle,
        fileName: `${raw}.md`,
        message,
        includeReplyThread: isReplyMessage ? includeReplyThread : false,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '노트 생성 실패');
    }
  };

  const folderRoots = (tree || []).filter((n: any) => n.type === 'folder');

  return <>
  <Modal isOpen={isOpen} onClose={isSubmitting ? undefined : onClose} onConfirm={canSubmit && !isSubmitting ? handleSubmit : undefined}>
    <div className="flex max-h-[90vh] flex-col gap-4 p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
        노트로 추가
      </h2>
      <p className="text-xs text-gray-500 dark:text-odp-muted">
        폴더를 선택한 뒤 노트를 생성합니다. 새 폴더 만들기·폴더 이동이 가능하며,
        데스크톱에서는 드래그로 폴더를 옮길 수 있습니다(확인 후 적용).
      </p>

      <label className="block space-y-1">
        <span className="text-[11px] font-medium text-gray-600 dark:text-odp-muted">
          파일명
        </span>
        <div className="flex items-center gap-1">
          <input
            value={fileName}
            onChange={(e: any) => setFileName(e.target.value)}
            placeholder={defaultBaseName}
            className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
            autoFocus
          />
          <button
            type="button"
            onClick={applyDefaultFileName}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-gray-200"
            title="기본 이름 적용"
            aria-label="기본 이름 적용"
          >
            <RotateCcw size={15} />
          </button>
          <span className="shrink-0 text-xs text-gray-400">.md</span>
        </div>
      </label>

      <div className="flex min-h-[200px] max-h-[320px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft">
        <div className="flex items-center justify-end gap-1 border-b border-gray-100 bg-gray-50 px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
          {onRequestMoveFolder ? (
            <button
              type="button"
              onClick={() => {
                if (!canMoveFolder) return;
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
          autoScroll
        >
          <div ref={scrollContainerRef} className="flex-1 overflow-auto py-1">
            <RootDropZone
              storageType={storageType}
              localRootHandle={localRootHandle}
              onDropOnFolder={onDropOnFolder}
              dropTarget={dropTarget}
              isSelected={selectedRoot}
              onFocusRoot={() => {
                setSelectedRoot(true);
                setSelectedFolder(null);
              }}
            />
            {folderRoots.length > 0 ? (
              folderRoots.map((node: any) => <TreeNode
                key={node.path}
                node={node}
                level={0}
                rootDropNode={{
                  path: '',
                  type: 'folder',
                  handle: isS3 ? null : localRootHandle,
                }}
                onSelect={handleSelectFolder}
                storageType={storageType}
                selectedIds={selectedIds}
                onRequestMoveFolder={onRequestMoveFolder}
                expandedPaths={expandedPaths}
                onExpandedChange={handleExpandedChange}
                onDropOnFolder={onDropOnFolder}
                dropTarget={dropTarget}
                activeDragItemIds={activeDragItemIds}
                isCopyDrag={isCopyDrag}
                stickyFoldersEnabled={false}
                foldersOnly
                folderSelectMode
                disableDrag={dragDisabled}
                isFolderLoading={localFolderLoadingPath}
              />)
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
            onCheckedChange={(next: any) => setIncludeReplyThread(Boolean(next))}
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
      message="입력된 파일명을 기본 이름으로 바꿀까요?"
      confirmLabel="대체"
      cancelLabel="취소"
      onConfirm={() => {
        setFileName(defaultBaseName);
        setConfirmReplaceName(false);
      }}
      onCancel={() => setConfirmReplaceName(false)}
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
  </>;
}
