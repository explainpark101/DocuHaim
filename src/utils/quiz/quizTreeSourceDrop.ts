/**
 * Sidebar TreeNode → quiz RAG source picker (dnd-kit droppable id + resolve).
 */

import {
  collectFileNodesUnderFolder,
  type TreeAttachSourceItem,
  type TreeFileNode,
} from '@/utils/chatWithMyself/treeAttachDrop';

export const QUIZ_TREE_SOURCE_DROPPABLE_ID = 'quiz-tree-source-drop';

export function isQuizTreeSourceDroppableId(
  id: string | number | null | undefined,
): boolean {
  return String(id || '') === QUIZ_TREE_SOURCE_DROPPABLE_ID;
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

function isEligibleQuizSourceMd(path: string, excludePath?: string | null): boolean {
  const p = normalizePath(path);
  if (!p || isTrashPath(p)) return false;
  const lower = p.toLowerCase();
  if (!lower.endsWith('.md')) return false;
  if (excludePath && normalizePath(excludePath) === p) return false;
  return true;
}

/**
 * Resolve tree drag items to vault `.md` paths for quiz RAG sources.
 * Files add one path; folders add all descendant `.md` files (tree snapshot).
 */
export function resolveQuizSourceMdPaths(
  items: TreeAttachSourceItem[] | null | undefined,
  findNode: (storageType: string, path: string) => TreeFileNode | null,
  options?: { excludePath?: string | null },
): string[] {
  if (!Array.isArray(items) || !items.length) return [];
  const excludePath = options?.excludePath ?? null;
  const out: string[] = [];
  const seen = new Set<string>();

  const pushPath = (raw: string) => {
    const p = normalizePath(raw);
    if (!isEligibleQuizSourceMd(p, excludePath)) return;
    if (seen.has(p)) return;
    seen.add(p);
    out.push(p);
  };

  for (const item of items) {
    if (!item) continue;
    const storageType = String(item.storageType || '').trim() || 's3';
    const path = normalizePath(item.path);
    if (!path || isTrashPath(path)) continue;
    const node = findNode(storageType, path);
    if (!node) continue;

    if (node.type === 'file') {
      pushPath(node.path || path);
      continue;
    }

    if (node.type === 'folder') {
      for (const file of collectFileNodesUnderFolder(node)) {
        pushPath(file.path || '');
      }
    }
  }

  out.sort((a, b) => a.localeCompare(b));
  return out;
}
