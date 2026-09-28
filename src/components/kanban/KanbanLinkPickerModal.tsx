import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconCheck, IconFolder, IconX } from '@/components/icons';
import { FileText } from 'lucide-react';
import { normalizeLinkPaths } from '@/utils/kanban/kanbanDocument';

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

type KanbanLinkPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tree: TreeNode[] | null | undefined;
  /** Currently linked paths (multi-select). */
  selected: string[];
  excludePath?: string | null;
  onConfirm: (paths: string[]) => void;
  onExpandFolder?: ((node: TreeNode) => void | Promise<void>) | undefined;
};

export default function KanbanLinkPickerModal({
  isOpen,
  onClose,
  tree,
  selected,
  excludePath,
  onConfirm,
  onExpandFolder,
}: KanbanLinkPickerModalProps) {
  const [picked, setPicked] = useState<string[]>(() => normalizeLinkPaths(selected));
  const [folderPath, setFolderPath] = useState('');

  const nodes = useMemo(() => (Array.isArray(tree) ? tree : []), [tree]);

  useEffect(() => {
    if (isOpen) {
      setPicked(normalizeLinkPaths(selected));
      setFolderPath('');
    }
  }, [isOpen, selected]);

  const pickedSet = useMemo(() => new Set(picked), [picked]);

  const visibleChildren = useMemo(() => {
    if (!folderPath) return nodes;
    const find = (list: TreeNode[]): TreeNode | null => {
      for (const n of list) {
        if (n.path === folderPath) return n;
        if (n.children) {
          const f = find(n.children);
          if (f) return f;
        }
      }
      return null;
    };
    return find(nodes)?.children || [];
  }, [nodes, folderPath]);

  const togglePath = (path: string) => {
    setPicked((prev) => {
      if (prev.includes(path)) return prev.filter((p) => p !== path);
      return normalizeLinkPaths([...prev, path]);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="max-w-lg max-h-[90vh]">
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            카드에 vault 파일 연결
          </h2>
          <p className="mt-1 text-xs text-gray-600 dark:text-odp-muted">
            여러 파일을 선택할 수 있습니다. 선택된 경로 {picked.length}개.
          </p>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {folderPath ? (
            <button
              type="button"
              className="mb-2 inline-flex items-center gap-1 text-left text-xs text-blue-600 hover:underline"
              onClick={() => {
                const parts = folderPath.replace(/\/$/, '').split('/').filter(Boolean);
                parts.pop();
                setFolderPath(parts.length ? `${parts.join('/')}/` : '');
              }}
            >
              ← 상위 폴더
            </button>
          ) : null}
          <ul className="min-h-48 space-y-1 rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft">
            {visibleChildren.map((n) => {
              if (n.type === 'folder') {
                return (
                  <li key={n.path}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg"
                      onClick={async () => {
                        await onExpandFolder?.(n);
                        setFolderPath(n.path.endsWith('/') ? n.path : `${n.path}/`);
                      }}
                    >
                      <IconFolder size={14} />
                      {n.name}
                    </button>
                  </li>
                );
              }
              if (excludePath && n.path === excludePath) return null;
              const active = pickedSet.has(n.path);
              return (
                <li key={n.path}>
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg ${
                      active ? 'bg-blue-50 dark:bg-blue-950/40' : ''
                    }`}
                    onClick={() => togglePath(n.path)}
                    aria-pressed={active}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                        active
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 dark:border-odp-borderStrong'
                      }`}
                      aria-hidden
                    >
                      {active ? '✓' : ''}
                    </span>
                    <FileText size={14} />
                    {n.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {picked.length > 0 ? (
            <div className="mt-3 space-y-1">
              <p className="text-xs font-medium text-gray-600 dark:text-odp-muted">
                선택됨
              </p>
              <ul className="space-y-1">
                {picked.map((p) => (
                  <li key={p} className="flex items-center gap-1">
                    <span className="min-w-0 flex-1 truncate text-[11px] text-gray-700 dark:text-odp-fg">
                      {p}
                    </span>
                    <button
                      type="button"
                      className="shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg"
                      aria-label={`${p} 선택 해제`}
                      onClick={() => togglePath(p)}
                    >
                      <IconX size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            취소
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setPicked([])}
            disabled={picked.length === 0}
          >
            모두 해제
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              onConfirm(normalizeLinkPaths(picked));
              onClose();
            }}
          >
            <IconCheck size={14} />
            적용
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
