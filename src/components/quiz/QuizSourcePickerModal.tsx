import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconCheck, IconFolder } from '@/components/icons';
import { isQuizMdPath } from '@/utils/quiz/quizPath';

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

type QuizSourcePickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tree: TreeNode[] | null | undefined;
  selected: string[];
  excludePath?: string | null;
  onConfirm: (paths: string[]) => void;
  onExpandFolder?: ((node: TreeNode) => void | Promise<void>) | undefined;
  onDropHostChange?: (node: HTMLElement | null) => void;
  onRegisterDropPathsMerge?: (handler: ((paths: string[]) => void) | null) => void;
};

function collectMdFiles(nodes: TreeNode[], excludePath?: string | null): TreeNode[] {
  const out: TreeNode[] = [];
  const walk = (list: TreeNode[]) => {
    for (const n of list) {
      if (n.type === 'folder' && n.children) walk(n.children);
      else if (n.type === 'file') {
        const lower = (n.path || n.name || '').toLowerCase();
        if (!lower.endsWith('.md')) continue;
        if (excludePath && n.path === excludePath) continue;
        if (isQuizMdPath(n.path) && excludePath && n.path === excludePath) continue;
        out.push(n);
      }
    }
  };
  walk(nodes || []);
  return out;
}

export default function QuizSourcePickerModal({
  isOpen,
  onClose,
  tree,
  selected,
  excludePath,
  onConfirm,
  onExpandFolder,
  onDropHostChange,
  onRegisterDropPathsMerge,
}: QuizSourcePickerModalProps) {
  const [picked, setPicked] = useState<string[]>(selected);
  const [folderPath, setFolderPath] = useState('');

  const nodes = useMemo(() => (Array.isArray(tree) ? tree : []), [tree]);

  useEffect(() => {
    if (isOpen) setPicked(selected);
  }, [isOpen, selected]);

  const mergeDroppedPaths = useCallback((incoming: string[]) => {
    if (!incoming.length) return;
    setPicked((prev) => {
      const next = new Set(prev);
      for (const p of incoming) next.add(p);
      return [...next].sort((a, b) => a.localeCompare(b));
    });
  }, []);

  useEffect(() => {
    onRegisterDropPathsMerge?.(mergeDroppedPaths);
    return () => onRegisterDropPathsMerge?.(null);
  }, [mergeDroppedPaths, onRegisterDropPathsMerge]);

  useEffect(() => {
    return () => onDropHostChange?.(null);
  }, [onDropHostChange]);

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

  const toggle = (path: string) => {
    setPicked((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="quiz-pane max-w-lg max-h-[90vh]">
      <div className="flex max-h-[min(75vh,640px)] flex-col gap-3 p-4 text-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
          근거 문서 선택
        </h2>
        <p className="text-xs text-gray-600 dark:text-odp-muted">
          vault의 `.md` 파일을 다중 선택하거나, 사이드바에서 끌어다 놓을 수 있습니다.
          (현재 quiz 파일은 제외)
        </p>
        {folderPath ? (
          <button
            type="button"
            className="text-left text-xs text-blue-600 hover:underline"
            onClick={() => {
              const parts = folderPath.replace(/\/$/, '').split('/').filter(Boolean);
              parts.pop();
              setFolderPath(parts.length ? `${parts.join('/')}/` : '');
            }}
          >
            ← 상위 폴더
          </button>
        ) : null}
        <div
          ref={onDropHostChange}
          className="relative min-h-48 flex-1"
        >
          <ul className="h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft">
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
              const lower = (n.path || '').toLowerCase();
              if (!lower.endsWith('.md')) return null;
              if (excludePath && n.path === excludePath) return null;
              const checked = picked.includes(n.path);
              return (
                <li key={n.path}>
                  <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(n.path)}
                    />
                    <span className="truncate">{n.name}</span>
                  </label>
                </li>
              );
            })}
            {visibleChildren.length === 0 ? (
              <li className="px-2 py-6 text-center text-xs text-gray-400">항목 없음</li>
            ) : null}
          </ul>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          {picked.length}개 선택됨
          {collectMdFiles(nodes, excludePath).length
            ? ` / vault md ${collectMdFiles(nodes, excludePath).length}개`
            : ''}
        </p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              onConfirm(picked);
              onClose();
            }}
          >
            <IconCheck size={14} />
            적용
          </Button>
        </div>
      </div>
    </Modal>
  );
}
