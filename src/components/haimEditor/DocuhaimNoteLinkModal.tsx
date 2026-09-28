import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import TreeNode from '@/components/TreeNode';
import type { SidebarTreeNode } from '@/components/shell/TreeNode';
import { useVault } from '@/App/hooks/useVault';
import { findNodeByPath } from '@/utils/s3Tree';
import { toTreeSelectKey } from '@/utils/vault/treeMove';

export type DocuhaimNoteLinkConfirm = {
  path: string;
  text: string;
};

export type DocuhaimNoteLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: DocuhaimNoteLinkConfirm) => void;
  /** Prefill display text (e.g. current editor selection). */
  initialText?: string | null | undefined;
};

function fileBaseName(path: string): string {
  const parts = path.replace(/\\/g, '/').split('/');
  return parts[parts.length - 1] || path;
}

/**
 * Pick a vault note file + display label for a `docuhaim://` markdown link.
 */
export default function DocuhaimNoteLinkModal({
  isOpen,
  onClose,
  onConfirm,
  initialText = '',
}: DocuhaimNoteLinkModalProps) {
  const {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    idbTree,
    loadLocalFolderChildren,
    loadWebdavFolderChildren,
    loadIdbFolderChildren,
    localFolderLoadingPath,
    webdavFolderLoadingPath,
    idbFolderLoadingPath,
  } = useVault();

  const storageType = storageMode || 's3';
  const tree = useMemo((): SidebarTreeNode[] => {
    if (storageType === 'local') return (localTree as SidebarTreeNode[]) || [];
    if (storageType === 'webdav') return (webdavTree as SidebarTreeNode[]) || [];
    if (storageType === 'idb') return (idbTree as SidebarTreeNode[]) || [];
    return (s3Tree as SidebarTreeNode[]) || [];
  }, [storageType, s3Tree, localTree, webdavTree, idbTree]);

  const folderLoadingPath =
    storageType === 'local'
      ? localFolderLoadingPath
      : storageType === 'webdav'
        ? webdavFolderLoadingPath
        : storageType === 'idb'
          ? idbFolderLoadingPath
          : null;

  const [expandedPaths, setExpandedPaths] = useState(() => new Set<string>());
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setExpandedPaths(new Set());
    setSelectedPath(null);
    setLabel(String(initialText || '').trim());
    setError('');
  }, [isOpen, initialText]);

  const selectedIds = useMemo(() => {
    if (!selectedPath) return new Set<string>();
    return new Set([toTreeSelectKey(storageType, selectedPath)]);
  }, [selectedPath, storageType]);

  const handleExpandedChange = useCallback(
    (_type: string, path: string, isOpenNext: boolean) => {
      setExpandedPaths((prev) => {
        const next = new Set(prev);
        if (isOpenNext) next.add(path);
        else next.delete(path);
        return next;
      });

      if (!isOpenNext) return;
      const node = findNodeByPath(tree, path) as SidebarTreeNode | null;
      if (!node || node.type !== 'folder') return;
      if ((node as SidebarTreeNode & { childrenLoaded?: boolean }).childrenLoaded === true) {
        return;
      }
      if (storageType === 'local') void loadLocalFolderChildren(node);
      else if (storageType === 'webdav') void loadWebdavFolderChildren(node);
      else if (storageType === 'idb') void loadIdbFolderChildren(node);
    },
    [
      tree,
      storageType,
      loadLocalFolderChildren,
      loadWebdavFolderChildren,
      loadIdbFolderChildren,
    ],
  );

  const handleSelect = useCallback(
    (_type: string, node: SidebarTreeNode) => {
      if (!node || node.type !== 'file') return;
      const path = String(node.path || '').trim();
      if (!path) return;
      setSelectedPath(path);
      setError('');
      setLabel((prev) => {
        if (prev.trim()) return prev;
        return fileBaseName(path);
      });
    },
    [],
  );

  const handleConfirm = () => {
    const path = String(selectedPath || '').trim();
    if (!path) {
      setError('노트 파일을 선택하세요.');
      return;
    }
    const text = label.trim() || fileBaseName(path);
    onConfirm({ path, text });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      ignoreEnterInFields
      contentClassName="flex max-h-[90vh] max-w-lg flex-col overflow-hidden"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderStrong">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            노트 링크
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            vault 파일을 고른 뒤 표시 텍스트를 입력합니다.
          </p>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          <div className="max-h-[min(40vh,320px)] min-h-45 overflow-auto rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderSoft dark:bg-odp-bg/40">
            {tree.length > 0 ? (
              tree.map((node) => (
                <TreeNode
                  key={node.path}
                  node={node}
                  level={0}
                  onSelect={handleSelect}
                  storageType={storageType}
                  selectedIds={selectedIds}
                  expandedPaths={expandedPaths}
                  onExpandedChange={handleExpandedChange}
                  stickyFoldersEnabled={false}
                  foldersOnly={false}
                  disableDrag
                  isFolderLoading={folderLoadingPath}
                />
              ))
            ) : (
              <div className="px-3 py-6 text-center text-xs text-gray-400 dark:text-odp-muted">
                표시할 파일이 없습니다.
              </div>
            )}
          </div>

          <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg">
            <span className="font-medium text-gray-500 dark:text-odp-muted">
              선택됨:{' '}
            </span>
            {selectedPath || '—'}
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fg">
              표시 텍스트
            </span>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="링크에 보일 텍스트"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}
        </div>

        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderStrong">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft"
          >
            <X size={14} />
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            <Check size={14} />
            삽입
          </button>
        </footer>
      </div>
    </Modal>
  );
}
