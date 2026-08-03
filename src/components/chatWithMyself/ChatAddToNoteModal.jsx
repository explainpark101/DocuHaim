import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '@/components/modals/Modal';
import { IconFolder, IconFolderPlus } from '@/components/icons';
import { FolderInput } from 'lucide-react';
import { findNodeByPath } from '@/utils/s3Tree';
import {
  detectTimeZone,
  formatMessageFileNameBase,
} from '@/utils/chatWithMyself';

function getAncestorPathsToExpand(path) {
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

function FolderNode({ node, level, onSelect, selectedPath, expandedPaths, selectedRowRef }) {
  if (node.type !== 'folder') return null;

  const mustBeOpen = expandedPaths?.has(node.path);
  const [userOpen, setUserOpen] = useState(true);
  const isOpen = mustBeOpen === true ? true : userOpen;
  const paddingLeft = `${level * 12 + 8}px`;
  const isSelected = selectedPath === node.path;

  const rowRef = (el) => {
    if (isSelected && selectedRowRef && el) {
      selectedRowRef.current = el;
    }
  };

  return (
    <div>
      <div
        ref={rowRef}
        className={`flex items-center justify-between py-1 pr-2 cursor-pointer text-sm ${
          isSelected
            ? 'bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong'
            : 'text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-bgSoft'
        }`}
        style={{ paddingLeft }}
        onClick={() => {
          if (mustBeOpen === true) return;
          setUserOpen((prev) => !prev);
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-gray-400 dark:text-gray-500 w-4 flex justify-center shrink-0">
            {isOpen ? '▾' : '▸'}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(node);
            }}
            className="flex items-center gap-1 min-w-0 flex-1 text-left"
          >
            <span className="text-gray-500 dark:text-gray-300 shrink-0">
              <IconFolder size={14} />
            </span>
            <span className="truncate min-w-0">{node.name || '/'}</span>
          </button>
        </div>
      </div>
      {isOpen &&
        node.children?.map((child) =>
          child.type === 'folder' ? (
            <FolderNode
              key={child.path}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
              expandedPaths={expandedPaths}
              selectedRowRef={selectedRowRef}
            />
          ) : null,
        )}
    </div>
  );
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
}) {
  const isS3 = storageType === 's3';
  const tree = isS3 ? s3Tree : localTree;
  const tz = timeZone || detectTimeZone();
  const defaultBaseName = useMemo(
    () => formatMessageFileNameBase(message?.at || new Date().toISOString(), tz),
    [message?.at, tz],
  );

  const [fileName, setFileName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedRoot, setSelectedRoot] = useState(true);
  const [error, setError] = useState('');
  const hasInitializedRef = useRef(false);
  const selectedRowRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
      return;
    }
    setFileName('');
    setError('');
    setSelectedRoot(true);
    setSelectedFolder(null);
    hasInitializedRef.current = false;
  }, [isOpen, message?.id]);

  useEffect(() => {
    if (!isOpen || !tree?.length || hasInitializedRef.current) return;

    if (selectPathAfterCreate) {
      const node = findNodeByPath(tree, selectPathAfterCreate);
      if (node && node.type === 'folder') {
        setSelectedFolder(node);
        setSelectedRoot(false);
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
      onSelectPathAfterCreateApplied?.();
    }
  }, [selectPathAfterCreate, tree, isOpen, onSelectPathAfterCreateApplied]);

  const pathToExpand = selectPathAfterCreate || selectedFolder?.path;
  const expandedPaths = pathToExpand
    ? new Set(getAncestorPathsToExpand(pathToExpand))
    : null;

  useEffect(() => {
    if (!selectedFolder || !scrollContainerRef.current) return;
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        selectedRowRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      });
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedFolder?.path, isOpen]);

  if (!isOpen || !message) return null;

  const parentPath = selectedRoot ? '' : selectedFolder?.path || '';
  const parentDirHandle = selectedRoot ? localRootHandle : selectedFolder?.handle;
  const canCreateFolder = isS3 || parentDirHandle != null;
  const canSubmit = isS3 ? true : !!(selectedRoot ? localRootHandle : selectedFolder?.handle);
  const canMoveFolder = !selectedRoot && selectedFolder?.type === 'folder';

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
      });
    } catch (e) {
      setError(e?.message || '노트 생성 실패');
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="flex max-h-[90vh] flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          노트로 추가
        </h2>
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          폴더를 선택한 뒤 노트를 생성합니다. 새 폴더 만들기·폴더 이동도 가능합니다.
        </p>

        <label className="block space-y-1">
          <span className="text-[11px] font-medium text-gray-600 dark:text-odp-muted">
            파일명
          </span>
          <div className="flex items-center gap-1">
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={defaultBaseName}
              className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
              autoFocus
            />
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

          <button
            type="button"
            onClick={() => {
              setSelectedRoot(true);
              setSelectedFolder(null);
            }}
            className={`flex items-center gap-2 border-b border-gray-100 px-3 py-2 text-left dark:border-odp-borderSoft ${
              selectedRoot
                ? 'bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong'
                : 'text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-bgSoft'
            }`}
          >
            <IconFolder size={14} />
            <span className="truncate">
              {isS3 ? '루트 (버킷 최상위)' : '루트 폴더'}
            </span>
          </button>

          <div ref={scrollContainerRef} className="flex-1 overflow-auto py-1">
            {tree && tree.length > 0 ? (
              tree
                .filter((n) => n.type === 'folder')
                .map((node) => (
                  <FolderNode
                    key={node.path}
                    node={node}
                    level={0}
                    onSelect={(n) => {
                      setSelectedRoot(false);
                      setSelectedFolder(n);
                    }}
                    selectedPath={!selectedRoot ? selectedFolder?.path : null}
                    expandedPaths={expandedPaths}
                    selectedRowRef={selectedRowRef}
                  />
                ))
            ) : (
              <div className="px-3 py-4 text-xs text-gray-400 dark:text-odp-muted">
                사용할 수 있는 폴더가 없습니다.
              </div>
            )}
          </div>
        </div>

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
  );
}
