import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
  type RefObject,
} from 'react';
import Modal from '@/components/modals/Modal';
import { IconFolder, IconFolderPlus } from '@/components/icons';
import { findNodeByPath } from '@/utils/s3Tree';

/** Vault tree node shape used by the move-file folder picker. */
export type MoveFileTreeNode = {
  name: string;
  type: string;
  path: string;
  handle?: FileSystemDirectoryHandle;
  children?: MoveFileTreeNode[];
};

/** Open-file or sidebar node passed as the move subject. */
export type MoveFileSubject = {
  /** Editor open-file path identity. */
  id?: string;
  name?: string;
  /** Tree node path (sidebar move). */
  path?: string;
};

/** Destination folder chosen in the modal. */
export type MoveFileDestination = {
  path: string;
  handle?: FileSystemDirectoryHandle | null | undefined;
};

export type MoveFileModalProps = {
  isOpen: boolean;
  storageType?: string | null;
  s3Tree?: MoveFileTreeNode[] | null;
  localTree?: MoveFileTreeNode[] | null;
  webdavTree?: MoveFileTreeNode[] | null;
  idbTree?: MoveFileTreeNode[] | null;
  localRootHandle?: FileSystemDirectoryHandle | null;
  currentFile?: MoveFileSubject | null;
  fileToMove?: MoveFileSubject | null;
  onClose: () => void;
  onConfirm: (dest: MoveFileDestination) => void | Promise<void>;
  onRequestCreateFolder?: (
    parentPath: string,
    parentDirHandle: FileSystemDirectoryHandle | null | undefined,
  ) => void;
  selectPathAfterCreate?: string | null;
  onSelectPathAfterCreateApplied?: () => void;
};

function subjectParentKey(file: MoveFileSubject): string | undefined {
  return file.id || file.path;
}

function getParentFolderPath(filePath: string | undefined): string {
  if (!filePath || typeof filePath !== 'string') return '';
  const parts = filePath.split('/').filter(Boolean);
  if (parts.length <= 1) return '';
  return parts.slice(0, -1).join('/') + '/';
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

type FolderNodeProps = {
  node: MoveFileTreeNode;
  level: number;
  onSelect: (node: MoveFileTreeNode) => void;
  selectedPath: string | null | undefined;
  expandedPaths: Set<string> | null;
  selectedRowRef: RefObject<HTMLDivElement | null>;
};

function FolderNode({
  node,
  level,
  onSelect,
  selectedPath,
  expandedPaths,
  selectedRowRef,
}: FolderNodeProps) {
  if (node.type !== 'folder') return null;

  const mustBeOpen = expandedPaths?.has(node.path);
  const [userOpen, setUserOpen] = useState(true);
  const isOpen = mustBeOpen === true ? true : userOpen;
  const paddingLeft = `${level * 12 + 8}px`;
  const isSelected = selectedPath === node.path;

  const rowRef = (el: HTMLDivElement | null) => {
    if (isSelected && selectedRowRef && el) {
      selectedRowRef.current = el;
    }
  };

  const handleToggle = () => {
    if (mustBeOpen === true) return;
    setUserOpen((prev) => !prev);
  };

  const handleSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelect(node);
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
        onClick={handleToggle}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-gray-400 dark:text-gray-500 w-4 flex justify-center shrink-0">
            {isOpen ? '▾' : '▸'}
          </span>
          <button
            type="button"
            onClick={handleSelect}
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
 * Pick a destination folder for moving a file (S3 / WebDAV / local).
 */
export function MoveFileModal({
  isOpen,
  storageType,
  s3Tree,
  localTree,
  webdavTree = [],
  idbTree = [],
  localRootHandle,
  currentFile,
  fileToMove,
  onClose,
  onConfirm,
  onRequestCreateFolder,
  selectPathAfterCreate,
  onSelectPathAfterCreateApplied,
}: MoveFileModalProps) {
  const effectiveFile = fileToMove || currentFile;
  if (!effectiveFile) return null;

  const isS3 = storageType === 's3';
  const isWebdav = storageType === 'webdav';
  const isIdb = storageType === 'idb';
  const tree = isS3 ? s3Tree : isWebdav ? webdavTree : isIdb ? idbTree : localTree;

  const [selectedFolder, setSelectedFolder] = useState<MoveFileTreeNode | null>(null);
  const [selectedRoot, setSelectedRoot] = useState(true);
  const hasInitializedRef = useRef(false);
  const selectedRowRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    hasInitializedRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !tree?.length || hasInitializedRef.current) return;

    if (selectPathAfterCreate) {
      const node = findNodeByPath(tree, selectPathAfterCreate) as MoveFileTreeNode | null;
      if (node && node.type === 'folder') {
        setSelectedFolder(node);
        setSelectedRoot(false);
        onSelectPathAfterCreateApplied?.();
      }
      hasInitializedRef.current = true;
      return;
    }

    // Editor files use `id`; sidebar tree nodes typically use `path`.
    const parentPath = getParentFolderPath(subjectParentKey(effectiveFile));
    if (!parentPath) {
      setSelectedRoot(true);
      setSelectedFolder(null);
    } else {
      const node = findNodeByPath(tree, parentPath) as MoveFileTreeNode | null;
      if (node && node.type === 'folder') {
        setSelectedFolder(node);
        setSelectedRoot(false);
      } else {
        setSelectedRoot(true);
        setSelectedFolder(null);
      }
    }
    hasInitializedRef.current = true;
  }, [
    isOpen,
    selectPathAfterCreate,
    tree,
    effectiveFile.id,
    effectiveFile.path,
    onSelectPathAfterCreateApplied,
  ]);

  const pathToExpand = selectPathAfterCreate || selectedFolder?.path;
  const expandedPaths = pathToExpand
    ? new Set(getAncestorPathsToExpand(pathToExpand))
    : null;

  useEffect(() => {
    if (!selectedFolder || !scrollContainerRef.current) return;
    const scrollToSelected = () => {
      requestAnimationFrame(() => {
        const el = selectedRowRef.current;
        if (el) {
          el.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
      });
    };
    const timer = setTimeout(scrollToSelected, 280);
    return () => clearTimeout(timer);
  }, [selectedFolder?.path, isOpen]);

  const handleSelectRoot = () => {
    setSelectedRoot(true);
    setSelectedFolder(null);
  };

  const handleSelectFolder = (node: MoveFileTreeNode) => {
    setSelectedRoot(false);
    setSelectedFolder(node);
  };

  const parentPath = selectedRoot ? '' : selectedFolder?.path || '';
  const parentDirHandle = selectedRoot ? localRootHandle : selectedFolder?.handle;
  const canCreateFolder = isS3 || isWebdav || isIdb || parentDirHandle != null;

  const handleRequestCreateFolder = () => {
    if (!canCreateFolder || !onRequestCreateFolder) return;
    onRequestCreateFolder(parentPath, parentDirHandle);
  };

  const handleSubmit = () => {
    if (!onConfirm) return;

    if (isS3 || isWebdav || isIdb) {
      const destPath = selectedRoot ? '' : selectedFolder?.path || '';
      void onConfirm({
        path: destPath,
      });
    } else {
      const destPath = selectedRoot ? '' : selectedFolder?.path || '';
      const destHandle = selectedRoot ? localRootHandle : selectedFolder?.handle;
      void onConfirm({
        path: destPath,
        handle: destHandle,
      });
    }
  };

  const canSubmit =
    isS3 || isWebdav || isIdb
      ? true
      : !!(selectedRoot ? localRootHandle : selectedFolder?.handle);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={canSubmit ? handleSubmit : undefined}
    >
      <div className="p-6 flex flex-col gap-4 max-h-[90vh]">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          파일 이동
        </h2>
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          이동할 대상 폴더를 선택하세요. 현재 파일:{' '}
          <span className="font-mono text-[11px]">
            {effectiveFile.name}
          </span>
        </p>
        <div className="border border-gray-200 dark:border-odp-borderSoft rounded-lg overflow-hidden bg-gray-50 dark:bg-odp-bgSoft text-sm flex-1 min-h-[200px] max-h-[320px] flex flex-col">
          {onRequestCreateFolder && (
            <div className="flex justify-end px-3 py-2 border-b border-gray-100 dark:border-odp-borderSoft bg-gray-50 dark:bg-odp-bgSoft">
              <button
                type="button"
                onClick={handleRequestCreateFolder}
                disabled={!canCreateFolder}
                className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
              >
                <IconFolderPlus size={14} />
                새 폴더
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={handleSelectRoot}
            className={`flex items-center gap-2 px-3 py-2 border-b border-gray-100 dark:border-odp-borderSoft text-left ${
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
                    onSelect={handleSelectFolder}
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
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-4 py-2 text-sm font-medium text-white rounded transition ${
              canSubmit
                ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            이동
          </button>
        </div>
      </div>
    </Modal>
  );
}
