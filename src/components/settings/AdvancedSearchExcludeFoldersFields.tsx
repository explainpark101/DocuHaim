import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import { IconFolder } from '@/components/icons';
import {
  addExcludeFolder,
  isPathUnderExcludedFolders,
  normalizeExcludeFolderPath,
  removeExcludeFolder,
} from '@/utils/advancedSearch/settings';

type FolderTreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: FolderTreeNode[];
};

type AdvancedSearchExcludeFoldersFieldsProps = {
  folders: readonly string[];
  disabled?: boolean;
  onChange: (next: string[]) => void;
  /** Load vault folder tree for the picker (same as coverage scan). */
  onRequestTree?: () => Promise<FolderTreeNode[]>;
  canRequestTree?: boolean;
};

function FolderPickNode({
  node,
  level,
  onSelect,
  selectedPath,
  excludedFolders,
}: {
  node: FolderTreeNode;
  level: number;
  onSelect: (path: string) => void;
  selectedPath: string | null;
  excludedFolders: readonly string[];
}) {
  const [open, setOpen] = useState(level < 2);
  if (node.type !== 'folder' || !node.path) return null;

  const path = normalizeExcludeFolderPath(node.path);
  const isSelected = selectedPath === path;
  const isDisabled = isPathUnderExcludedFolders(path, excludedFolders);
  const paddingLeft = `${level * 12 + 8}px`;

  return (
    <div>
      <div
        className={`flex items-center justify-between py-1 pr-2 text-sm ${
          isSelected
            ? 'bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong'
            : 'text-gray-700 dark:text-odp-fg'
        } ${isDisabled ? 'opacity-40' : 'hover:bg-gray-100 dark:hover:bg-odp-bgSoft'}`}
        style={{ paddingLeft }}
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <button
            type="button"
            className="flex w-4 shrink-0 justify-center text-gray-400 dark:text-gray-500"
            aria-label={open ? '접기' : '펼치기'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '▾' : '▸'}
          </button>
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => onSelect(path)}
            className="flex min-w-0 items-center gap-1 text-left disabled:cursor-not-allowed"
          >
            <span className="shrink-0 text-gray-500 dark:text-gray-300">
              <IconFolder size={14} />
            </span>
            <span className="truncate">{node.name || path || '/'}</span>
          </button>
        </div>
      </div>
      {open &&
        node.children?.map((child) =>
          child.type === 'folder' ? (
            <FolderPickNode
              key={child.path}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
              excludedFolders={excludedFolders}
            />
          ) : null,
        )}
    </div>
  );
}

/**
 * User-selected vault folders excluded from the inverted index (subtree included).
 */
export default function AdvancedSearchExcludeFoldersFields({
  folders,
  disabled = false,
  onChange,
  onRequestTree,
  canRequestTree = true,
}: AdvancedSearchExcludeFoldersFieldsProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tree, setTree] = useState<FolderTreeNode[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    if (!pickerOpen) {
      setSelectedPath(null);
      setError(null);
    }
  }, [pickerOpen]);

  const openPicker = useCallback(async () => {
    if (disabled || typeof onRequestTree !== 'function') return;
    setPickerOpen(true);
    setLoading(true);
    setError(null);
    try {
      const next = await onRequestTree();
      setTree(Array.isArray(next) ? next : []);
    } catch (e) {
      setTree(null);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [disabled, onRequestTree]);

  const confirmAdd = () => {
    if (!selectedPath) return;
    onChange(addExcludeFolder(folders, selectedPath));
    setPickerOpen(false);
  };

  return (
    <div className="mt-3 space-y-2 rounded-md border border-gray-200 bg-white px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
      <div>
        <p className="text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
          역색인 제외 폴더
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
          선택한 폴더와 그 하위 폴더·파일은 역색인·Live Scan 본문 검색에서 빠집니다.
          파일명 검색은 그대로입니다. 변경 후 「다시 색인」이 필요합니다.
        </p>
      </div>

      {folders.length === 0 ? (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          제외된 폴더 없음
        </p>
      ) : (
        <ul className="space-y-1">
          {folders.map((path) => (
            <li
              key={path}
              className="flex items-center gap-2 rounded border border-gray-100 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"
            >
              <IconFolder size={14} className="shrink-0 text-gray-500" />
              <span className="min-w-0 flex-1 truncate font-mono">{path}/</span>
              <button
                type="button"
                disabled={disabled}
                aria-label={`${path} 제외 해제`}
                onClick={() => onChange(removeExcludeFolder(folders, path))}
                className="rounded p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        disabled={disabled || !canRequestTree || typeof onRequestTree !== 'function'}
        onClick={() => {
          void openPicker();
        }}
        className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft"
      >
        폴더 추가…
      </button>

      <Modal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        contentClassName="max-w-lg max-h-[90vh]"
      >
        <div className="space-y-3 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">
            역색인 제외 폴더 선택
          </h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted">
            폴더를 고르면 하위 경로도 모두 제외됩니다. 이미 제외된 폴더는 선택할 수 없습니다.
          </p>
          {loading ? (
            <p className="text-xs text-gray-500">폴더 트리 불러오는 중…</p>
          ) : error ? (
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          ) : (
            <div className="max-h-[min(50vh,360px)] overflow-auto rounded border border-gray-200 dark:border-odp-borderSoft">
              {(tree || [])
                .filter((n) => n.type === 'folder')
                .map((node) => (
                  <FolderPickNode
                    key={node.path}
                    node={node}
                    level={0}
                    onSelect={setSelectedPath}
                    selectedPath={selectedPath}
                    excludedFolders={folders}
                  />
                ))}
              {(tree || []).filter((n) => n.type === 'folder').length === 0 ? (
                <p className="p-3 text-xs text-gray-500">표시할 폴더가 없습니다.</p>
              ) : null}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setPickerOpen(false)}
              className="rounded border border-gray-300 px-3 py-1.5 text-xs dark:border-odp-borderStrong"
            >
              취소
            </button>
            <button
              type="button"
              disabled={!selectedPath}
              onClick={confirmAdd}
              className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
            >
              추가
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
