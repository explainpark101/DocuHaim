/**
 * Sidebar TreeNode → chat note/folder share (dnd-kit droppable id + resolve).
 */

import { formatFolderShareChatBody, formatNoteShareChatBody } from '@/utils/chatWithMyself/format.js';
import { normalizeStoragePath } from '@/utils/chatWithMyself/noteRefs.ts';

export const CHAT_TREE_ATTACH_DROPPABLE_ID = 'chat-tree-attach-drop';

export function isChatTreeAttachDroppableId(
  id: string | number | null | undefined,
): boolean {
  return String(id || '') === CHAT_TREE_ATTACH_DROPPABLE_ID;
}

export type TreeAttachSourceItem = {
  storageType: string;
  path: string;
  nodeType?: string;
  name?: string;
};

export type TreeFileNode = {
  path?: string;
  name?: string;
  type?: string;
  handle?: { getFile?: () => Promise<File> } | null;
  children?: TreeFileNode[] | null;
};

function isTrashPath(path: string): boolean {
  const p = normalizeStoragePath(path);
  return p === '.trash' || p.startsWith('.trash/');
}

function normalizeFolderPath(path: string): string {
  const p = normalizeStoragePath(path);
  if (!p) return '';
  return p.endsWith('/') ? p : `${p}/`;
}

/** Collect file nodes under a folder (depth-first). */
export function collectFileNodesUnderFolder(folder: TreeFileNode | null | undefined): TreeFileNode[] {
  if (!folder || folder.type !== 'folder') return [];
  const out: TreeFileNode[] = [];
  const walk = (nodes: TreeFileNode[] | null | undefined) => {
    if (!Array.isArray(nodes)) return;
    for (const child of nodes) {
      if (!child) continue;
      if (child.type === 'file' && child.path && !isTrashPath(child.path)) {
        out.push(child);
      } else if (child.type === 'folder' && child.path && !isTrashPath(child.path)) {
        walk(child.children);
      }
    }
  };
  walk(folder.children);
  return out;
}

/**
 * List descendant files under a folder path in the current tree snapshot.
 */
export function listFilesUnderFolderPath(
  tree: TreeFileNode[] | null | undefined,
  folderPath: string,
  findNode: (path: string) => TreeFileNode | null,
): Array<{ path: string; name: string }> {
  const key = normalizeFolderPath(folderPath);
  if (!key) return [];
  const node = findNode(key) || findNode(key.replace(/\/+$/, ''));
  if (!node || node.type !== 'folder') {
    // Fallback: scan tree roots if findNode missed trailing-slash variants.
    void tree;
    return [];
  }
  return collectFileNodesUnderFolder(node).map((file) => ({
    path: normalizeStoragePath(file.path),
    name:
      String(file.name || '').trim() ||
      normalizeStoragePath(file.path).split('/').filter(Boolean).pop() ||
      'file',
  })).filter((f) => f.path);
}

/**
 * Resolve tree drag items to note/folder share descriptors (folders not expanded).
 */
export function buildTreeShareItems(
  items: TreeAttachSourceItem[] | null | undefined,
  findNode: (storageType: string, path: string) => TreeFileNode | null,
): Array<{ kind: 'note' | 'folder'; path: string; name: string }> {
  if (!Array.isArray(items) || !items.length) return [];
  const out: Array<{ kind: 'note' | 'folder'; path: string; name: string }> = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!item) continue;
    const storageType = String(item.storageType || '').trim() || 's3';
    const path = normalizeStoragePath(item.path);
    if (!path || isTrashPath(path)) continue;
    const node = findNode(storageType, path);
    if (!node) continue;

    if (node.type === 'file') {
      const key = normalizeStoragePath(node.path);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const name =
        String(node.name || '').trim() ||
        key.split('/').filter(Boolean).pop() ||
        'note';
      out.push({ kind: 'note', path: key, name });
      continue;
    }

    if (node.type === 'folder') {
      const key = normalizeFolderPath(node.path || path);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const name =
        String(node.name || '').trim() ||
        key.replace(/\/+$/, '').split('/').filter(Boolean).pop() ||
        'folder';
      out.push({ kind: 'folder', path: key, name });
    }
  }

  return out;
}

/**
 * Build chat bodies for tree drag items.
 * Files → `[[note:…]]`; folders → single `[[folder:…]]` (not expanded).
 */
export function buildTreeNoteShareBodies(
  items: TreeAttachSourceItem[] | null | undefined,
  findNode: (storageType: string, path: string) => TreeFileNode | null,
): string[] {
  return buildTreeShareItems(items, findNode)
    .map((item) =>
      item.kind === 'folder'
        ? formatFolderShareChatBody({ path: item.path, name: item.name })
        : formatNoteShareChatBody({ path: item.path, name: item.name }),
    )
    .filter(Boolean);
}

/** @deprecated Use buildTreeNoteShareBodies (folders are no longer expanded). */
export function resolveTreeAttachFileNodes(
  items: TreeAttachSourceItem[] | null | undefined,
  findNode: (storageType: string, path: string) => TreeFileNode | null,
): TreeFileNode[] {
  if (!Array.isArray(items) || !items.length) return [];
  const out: TreeFileNode[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    if (!item) continue;
    const storageType = String(item.storageType || '').trim() || 's3';
    const path = normalizeStoragePath(item.path);
    if (!path || isTrashPath(path)) continue;
    const node = findNode(storageType, path);
    if (!node || node.type !== 'file') continue;
    const key = normalizeStoragePath(node.path);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(node);
  }
  return out;
}
