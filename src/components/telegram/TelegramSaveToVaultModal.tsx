import { useEffect, useMemo, useState } from 'react';
import { FolderInput } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconFolder, IconX } from '@/components/icons';

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

type TelegramSaveToVaultModalProps = {
  tree: TreeNode[] | null | undefined;
  fileName: string;
  onClose: () => void;
  onConfirm: (folderPath: string) => void;
};

function FolderRow({
  node,
  depth,
  selected,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  selected: string | null;
  onSelect: (path: string) => void;
}) {
  const [open, setOpen] = useState(depth < 1);
  const kids = (node.children || []).filter((child) => child.type === 'folder');
  const isSelected = selected === node.path;
  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${
          isSelected
            ? 'bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100'
            : 'hover:bg-gray-100 dark:hover:bg-odp-focusBg'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          onSelect(node.path);
          setOpen(true);
        }}
      >
        <span className="w-3 shrink-0 text-gray-400">{kids.length ? (open ? '▾' : '▸') : ''}</span>
        <IconFolder size={14} />
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
            />
          ))
        : null}
    </div>
  );
}

export default function TelegramSaveToVaultModal({
  tree,
  fileName,
  onClose,
  onConfirm,
}: TelegramSaveToVaultModalProps) {
  const [selected, setSelected] = useState<string | null>('');
  useEffect(() => {
    setSelected('');
  }, [fileName]);
  const roots = useMemo(
    () => (Array.isArray(tree) ? tree.filter((node) => node.type === 'folder') : []),
    [tree],
  );

  return (
    <Modal isOpen onClose={onClose} contentClassName="max-w-md max-h-[90vh]">
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            Vault Tree에 저장
          </h2>
          <p className="mt-1 truncate text-xs text-gray-500 dark:text-odp-muted">{fileName}</p>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
          <button
            type="button"
            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${
              selected === '' ? 'bg-sky-50 dark:bg-sky-950/40' : 'hover:bg-gray-100 dark:hover:bg-odp-focusBg'
            }`}
            onClick={() => setSelected('')}
          >
            <IconFolder size={14} />
            루트
          </button>
          {roots.map((node) => (
            <FolderRow
              key={node.path}
              node={node}
              depth={0}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>
        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            닫기
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => onConfirm(selected || '')}
          >
            <FolderInput size={14} />
            저장
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
