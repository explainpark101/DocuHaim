import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/shared/modals/Modal';
import { IconFolder, IconFolderPlus } from '@/components/icons';

type TreeNodeLike = {
  name: string;
  type: string;
  path: string;
  handle?: FileSystemDirectoryHandle;
  children?: TreeNodeLike[];
};

type Props = {
  isOpen: boolean;
  storageType: 's3' | 'local' | 'webdav' | string;
  s3Tree?: TreeNodeLike[];
  localTree?: TreeNodeLike[];
  webdavTree?: TreeNodeLike[];
  localRootHandle?: FileSystemDirectoryHandle | null;
  defaultFileName?: string;
  /** Vault-relative parent folder (trailing `/`) to pre-select on open. */
  defaultParentPath?: string;
  isSaving?: boolean;
  onClose: () => void;
  onConfirm: (payload: {
    path: string;
    fileName: string;
    handle?: FileSystemDirectoryHandle | null;
  }) => void | Promise<void>;
  onRequestCreateFolder?: (
    parentPath: string,
    parentDirHandle: FileSystemDirectoryHandle | null,
  ) => void;
  selectPathAfterCreate?: string | null;
  onSelectPathAfterCreateApplied?: () => void;
};

function findFolderByPath(nodes: TreeNodeLike[], path: string): TreeNodeLike | null {
  for (const node of nodes) {
    if (node.path === path) return node;
    if (node.children?.length) {
      const found = findFolderByPath(node.children, path);
      if (found) return found;
    }
  }
  return null;
}

function getAncestorPathsToExpand(path: string): string[] {
  if (!path || path === '') return [];
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
  if (parts.length <= 1) return [];
  const result: string[] = [];
  let acc = '';
  for (let i = 0; i < parts.length - 1; i++) {
    acc += `${parts[i]}/`;
    result.push(acc);
  }
  return result;
}

function FolderNode({
  node,
  level,
  onSelect,
  selectedPath,
  expandedPaths,
}: {
  node: TreeNodeLike;
  level: number;
  onSelect: (node: TreeNodeLike) => void;
  selectedPath: string | null;
  expandedPaths?: Set<string> | null | undefined;
}) {
  const mustBeOpen = expandedPaths?.has(node.path);
  const [userOpen, setUserOpen] = useState(true);
  const isOpen = mustBeOpen === true ? true : userOpen;
  if (node.type !== 'folder') return null;
  const isSelected = selectedPath === node.path;

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center py-1 pr-2 text-sm ${
          isSelected
            ? 'bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong'
            : 'text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-bgSoft'
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (mustBeOpen === true) return;
          setUserOpen((value) => !value);
        }}
      >
        <span className="flex w-4 shrink-0 justify-center text-gray-400 dark:text-gray-500">
          {isOpen ? '▾' : '▸'}
        </span>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1 text-left"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(node);
          }}
        >
          <IconFolder size={14} />
          <span className="truncate">{node.name || '/'}</span>
        </button>
      </div>
      {isOpen
        ? (node.children ?? []).map((child) => (
            <FolderNode
              key={child.path}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
              expandedPaths={expandedPaths}
            />
          ))
        : null}
    </div>
  );
}

export default function SaveSessionToNoteModal({
  isOpen,
  storageType,
  s3Tree = [],
  localTree = [],
  webdavTree = [],
  localRootHandle = null,
  defaultFileName = 'untitled.md',
  defaultParentPath = '',
  isSaving = false,
  onClose,
  onConfirm,
  onRequestCreateFolder,
  selectPathAfterCreate,
  onSelectPathAfterCreateApplied,
}: Props) {
  const isS3 = storageType === 's3';
  const isWebdav = storageType === 'webdav';
  const tree = isS3 ? s3Tree : isWebdav ? webdavTree : localTree;
  const [selectedRoot, setSelectedRoot] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<TreeNodeLike | null>(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      initializedRef.current = false;
      return;
    }
    if (initializedRef.current) return;

    setFileName(defaultFileName);

    if (selectPathAfterCreate) {
      const node = findFolderByPath(tree, selectPathAfterCreate);
      if (node && node.type === 'folder') {
        setSelectedRoot(false);
        setSelectedFolder(node);
      } else {
        setSelectedRoot(true);
        setSelectedFolder(null);
      }
      initializedRef.current = true;
      return;
    }

    const parentPath = String(defaultParentPath || '');
    if (!parentPath) {
      setSelectedRoot(true);
      setSelectedFolder(null);
    } else {
      const node = findFolderByPath(tree, parentPath);
      if (node && node.type === 'folder') {
        setSelectedRoot(false);
        setSelectedFolder(node);
      } else {
        setSelectedRoot(true);
        setSelectedFolder(null);
      }
    }
    initializedRef.current = true;
  }, [isOpen, defaultFileName, defaultParentPath, selectPathAfterCreate, tree]);

  useEffect(() => {
    if (!isOpen || !selectPathAfterCreate) return;
    const node = findFolderByPath(tree, selectPathAfterCreate);
    if (node && node.type === 'folder') {
      setSelectedRoot(false);
      setSelectedFolder(node);
    }
    onSelectPathAfterCreateApplied?.();
  }, [isOpen, selectPathAfterCreate, tree, onSelectPathAfterCreateApplied]);

  if (!isOpen) return null;

  const parentPath = selectedRoot ? '' : selectedFolder?.path || '';
  const parentDirHandle = selectedRoot ? localRootHandle : selectedFolder?.handle || null;
  const canSubmit = isS3 || isWebdav ? true : Boolean(selectedRoot ? localRootHandle : selectedFolder?.handle);
  const pathToExpand = selectPathAfterCreate || selectedFolder?.path || defaultParentPath || '';
  const expandedPaths = pathToExpand
    ? new Set(getAncestorPathsToExpand(pathToExpand))
    : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSaving ? undefined : onClose}
      onConfirm={
        canSubmit && !isSaving
          ? () =>
              void onConfirm({
                path: parentPath,
                fileName,
                ...(parentDirHandle ? { handle: parentDirHandle } : {}),
              })
          : undefined
      }
    >
      <div className="flex max-h-[90vh] flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">내 노트에 저장</h2>
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          현재 다운로드 세션 문서를 연결된 저장소에 노트로 저장합니다.
        </p>
        <label className="block text-xs font-medium text-gray-500 dark:text-odp-muted">
          파일명
          <input
            type="text"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
          />
        </label>
        <div className="flex min-h-[200px] max-h-[320px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft">
          {onRequestCreateFolder ? (
            <div className="flex justify-end border-b border-gray-100 bg-gray-50 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
              <button
                type="button"
                onClick={() => onRequestCreateFolder(parentPath, parentDirHandle)}
                className="flex items-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <IconFolderPlus size={14} />
                새 폴더
              </button>
            </div>
          ) : null}
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
            <span className="truncate">{isS3 ? '루트 (버킷 최상위)' : '루트 폴더'}</span>
          </button>
          <div className="flex-1 overflow-auto py-1">
            {tree.filter((node) => node.type === 'folder').map((node) => (
              <FolderNode
                key={node.path}
                node={node}
                level={0}
                onSelect={(next) => {
                  setSelectedRoot(false);
                  setSelectedFolder(next);
                }}
                selectedPath={selectedRoot ? null : selectedFolder?.path || null}
                {...(expandedPaths ? { expandedPaths } : {})}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-60 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            취소
          </button>
          <button
            type="button"
            disabled={!canSubmit || isSaving}
            onClick={() =>
              void onConfirm({
                path: parentPath,
                fileName,
                ...(parentDirHandle ? { handle: parentDirHandle } : {}),
              })
            }
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
