/**
 * Sidebar TreeNode → Kanban board card drop (dnd-kit droppable id + resolve).
 * Cards are created with title + linkPath; body stays empty.
 */

import {
  collectFileNodesUnderFolder,
  type TreeAttachSourceItem,
  type TreeFileNode,
} from '@/utils/chatWithMyself/treeAttachDrop';

export const KANBAN_TREE_CARD_DROPPABLE_ID = 'kanban-tree-card-drop';

export type KanbanTreeDropCardSeed = {
  title: string;
  linkPath: string;
};

export function isKanbanTreeCardDroppableId(
  id: string | number | null | undefined,
): boolean {
  return String(id || '') === KANBAN_TREE_CARD_DROPPABLE_ID;
}

function normalizePath(path: string): string {
  return String(path || '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
}

function isTrashPath(path: string): boolean {
  const p = normalizePath(path);
  return p === '.trash' || p.startsWith('.trash/');
}

function basenameFromPath(path: string): string {
  const parts = normalizePath(path).split('/').filter(Boolean);
  return parts[parts.length - 1] || path;
}

/** Prefer display name; fall back to path basename (keep extension for clarity). */
export function kanbanCardTitleFromTreeNode(
  path: string,
  name?: string | null,
): string {
  const n = String(name || '').trim();
  if (n) return n;
  return basenameFromPath(path) || 'Untitled';
}

function isEligibleKanbanLinkFile(
  path: string,
  excludePath?: string | null,
): boolean {
  const p = normalizePath(path);
  if (!p || isTrashPath(p)) return false;
  if (excludePath && normalizePath(excludePath) === p) return false;
  return true;
}

/**
 * Resolve tree drag items to kanban card seeds (title + vault linkPath).
 * Files add one card; folders add all descendant files (tree snapshot).
 * Skips chat rows, trash, and the open kanban file itself.
 */
export function resolveKanbanTreeDropCards(
  items: TreeAttachSourceItem[] | null | undefined,
  findNode: (storageType: string, path: string) => TreeFileNode | null,
  options?: { excludePath?: string | null },
): KanbanTreeDropCardSeed[] {
  if (!Array.isArray(items) || !items.length) return [];
  const excludePath = options?.excludePath ?? null;
  const out: KanbanTreeDropCardSeed[] = [];
  const seen = new Set<string>();

  const pushFile = (pathRaw: string, name?: string | null) => {
    const linkPath = normalizePath(pathRaw);
    if (!isEligibleKanbanLinkFile(linkPath, excludePath)) return;
    if (seen.has(linkPath)) return;
    seen.add(linkPath);
    out.push({
      title: kanbanCardTitleFromTreeNode(linkPath, name),
      linkPath,
    });
  };

  for (const item of items) {
    if (!item) continue;
    const nodeType = String(item.nodeType || '').trim();
    if (nodeType === 'chat') continue;

    const storageType = String(item.storageType || '').trim() || 's3';
    const path = normalizePath(item.path);
    if (!path || isTrashPath(path)) continue;

    const node = findNode(storageType, path);
    if (!node) {
      // Snapshot may lag; still accept explicit file rows from the drag payload.
      if (nodeType === 'file' || !nodeType) {
        pushFile(path, item.name);
      }
      continue;
    }

    if (node.type === 'file') {
      pushFile(node.path || path, node.name || item.name);
      continue;
    }

    if (node.type === 'folder') {
      for (const file of collectFileNodesUnderFolder(node)) {
        pushFile(file.path || '', file.name);
      }
    }
  }

  return out;
}
