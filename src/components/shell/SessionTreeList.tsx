import { useState } from 'react';
import { IconChevronDown, IconChevronRight, IconFile, IconFolder } from '@/components/icons';
import type { SessionTreeNode } from '@/utils/vault/sessionWorkspace';

type Props = {
  nodes: SessionTreeNode[];
  currentPath?: string | null | undefined;
  onSelectFile: (node: SessionTreeNode) => void;
};

function SessionTreeItem({
  node,
  depth,
  currentPath,
  onSelectFile,
}: {
  node: SessionTreeNode;
  depth: number;
  currentPath?: string | null | undefined;
  onSelectFile: (node: SessionTreeNode) => void;
}) {
  const [open, setOpen] = useState(depth < 2);
  const isActive = node.type === 'file' && currentPath === node.path;
  const paddingLeft = 8 + depth * 12;

  if (node.type === 'folder') {
    return (
      <div>
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        <button
          type="button"
          className="flex w-full items-center gap-1 py-1 pr-2 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg"
          style={{ paddingLeft }}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
          <IconFolder size={14} />
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="truncate">{node.name}</span>
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
        {open
          ? (node.children ?? []).map((child) => (
              <SessionTreeItem
                key={child.path}
                node={child}
                depth={depth + 1}
                currentPath={currentPath}
                onSelectFile={onSelectFile}
              />
            ))
          : null}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`flex w-full items-center gap-1 py-1 pr-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-odp-focusBg ${
        isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
          : 'text-gray-700 dark:text-odp-fg'
      }`}
      style={{ paddingLeft: paddingLeft + 18 }}
      onClick={() => onSelectFile(node)}
    >
      <IconFile size={14} />
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <span className="truncate">{node.name}</span>
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    </button>
  );
}

export default function SessionTreeList({ nodes, currentPath, onSelectFile }: Props) {
  if (!nodes.length) {
    return <p className="px-4 py-2 text-xs text-gray-400">열린 파일이 없습니다.</p>;
  }

  return (
    <div className="space-y-0.5">
      {nodes.map((node) => (
        <SessionTreeItem
          key={node.path}
          node={node}
          depth={0}
          currentPath={currentPath}
          onSelectFile={onSelectFile}
        />
      ))}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}
