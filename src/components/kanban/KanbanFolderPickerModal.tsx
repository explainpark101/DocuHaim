import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconCheck, IconFolder, IconX } from '@/components/icons';

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

type KanbanFolderPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tree: TreeNode[] | null | undefined;
  selected: string | null;
  onConfirm: (folderPath: string | null) => void;
  onExpandFolder?: ((node: TreeNode) => void | Promise<void>) | undefined;
};

function FolderRow({
  node,
  depth,
  selected,
  onSelect,
  onExpand,
}: {
  node: TreeNode;
  depth: number;
  selected: string | null;
  onSelect: (path: string) => void;
  onExpand?: ((node: TreeNode) => void | Promise<void>) | undefined;
}) {
  const [open, setOpen] = useState(depth < 1);
  const isSelected = selected === node.path;
  const kids = (node.children || []).filter((c) => c.type === 'folder');

  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${
          isSelected
            ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200'
            : 'text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          onSelect(node.path);
          setOpen(true);
          void onExpand?.(node);
        }}
      >
        <span className="w-3 shrink-0 text-gray-400">{kids.length ? (open ? '▾' : '▸') : ''}</span>
        <IconFolder size={14} className="shrink-0 text-gray-500" />
        <span className="min-w-0 truncate">{node.name || '/'}</span>
      </button>
      {open
        ? kids.map((child) => (
            <FolderRow
              key={child.path}
              node={child}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
              {...(onExpand ? { onExpand } : {})}
            />
          ))
        : null}
    </div>
  );
}

/**
 * Pick a vault folder for column quick-add binding.
 */
export default function KanbanFolderPickerModal({
  isOpen,
  onClose,
  tree,
  selected,
  onConfirm,
  onExpandFolder,
}: KanbanFolderPickerModalProps) {
  const [draft, setDraft] = useState<string | null>(selected);

  useEffect(() => {
    if (isOpen) setDraft(selected);
  }, [isOpen, selected]);

  const roots = useMemo(
    () => (Array.isArray(tree) ? tree.filter((n) => n.type === 'folder') : []),
    [tree],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-md max-h-[85vh]"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            열 폴더 선택
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
            노트 빠른 추가에 사용할 vault 폴더
          </p>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <button
            type="button"
            className={`mb-2 flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${
              draft === '' || draft === '/'
                ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200'
                : 'text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg'
            }`}
            onClick={() => setDraft('')}
          >
            <IconFolder size={14} />
            루트
          </button>
          {roots.map((node) => (
            <FolderRow
              key={node.path}
              node={node}
              depth={0}
              selected={draft}
              onSelect={setDraft}
              {...(onExpandFolder ? { onExpand: onExpandFolder } : {})}
            />
          ))}
          {roots.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-gray-500">
              폴더가 없습니다
            </p>
          ) : null}
        </div>
        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-5 py-3 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            취소
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onConfirm(null);
              onClose();
            }}
          >
            연결 해제
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              onConfirm(draft === '/' ? '' : draft);
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
