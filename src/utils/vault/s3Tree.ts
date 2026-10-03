import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';

/** Long-task budget per MWG break-up-long-tasks (~50ms). */
const TREE_BUILD_YIELD_BUDGET_MS = 50;

export type S3TreeNode = {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: S3TreeNode[] | undefined;
  key?: string | undefined;
  lastModified?: Date | string | undefined;
  size?: number | undefined;
};

/**
 * Duck-typed tree node for walk/find helpers (Sidebar / chat / modals).
 * Keep fields optional + unknown where callers diverge under EOPT.
 */
export type VaultTreeWalkNode = {
  name?: string | undefined;
  type?: string | undefined;
  path?: string | undefined;
  children?: readonly VaultTreeWalkNode[] | undefined;
  key?: string | undefined;
  lastModified?: unknown;
  size?: number | undefined;
};

/** Any node that may have a path + nested children (find/walk). */
type PathWalkNode = {
  path?: string | undefined;
  type?: string | undefined;
  children?: readonly PathWalkNode[] | undefined;
};

type S3ListItem = {
  Key?: string | undefined;
  LastModified?: Date | string | undefined;
  Size?: number | undefined;
};

type BuildNode = S3TreeNode & {
  /** Temporary name→child index for O(1) lookup while building. */
  _childIndex?: Map<string, BuildNode> | undefined;
};

function folderPathFromParts(parts: string[], index: number): string {
  return `${parts.slice(0, index + 1).join('/')}/`;
}

function ensureChildIndex(node: BuildNode): Map<string, BuildNode> {
  if (node._childIndex) return node._childIndex;
  const map = new Map<string, BuildNode>();
  if (node.children?.length) {
    for (const child of node.children as BuildNode[]) {
      map.set(child.name, child);
    }
  }
  node._childIndex = map;
  return map;
}

function upgradeNodeToFolder(node: BuildNode, folderPath: string): BuildNode {
  if (node.type === 'folder') {
    if (!node.children) node.children = [];
    return node;
  }
  node.type = 'folder';
  node.path = folderPath;
  node.children = [];
  delete node.lastModified;
  delete node.size;
  return node;
}

function getOrCreateChild(
  parent: BuildNode,
  name: string,
  create: () => BuildNode,
): BuildNode {
  if (!parent.children) parent.children = [];
  const index = ensureChildIndex(parent);
  let child = index.get(name);
  if (!child) {
    child = create();
    index.set(name, child);
    parent.children.push(child);
  }
  return child;
}

function ensureFolderPath(root: BuildNode, key: string): void {
  const parts = key.replace(/\/$/, '').split('/').filter(Boolean);
  if (!parts.length) return;

  let current = root;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const folderPath = folderPathFromParts(parts, i);
    current = getOrCreateChild(current, part, () => ({
      name: part,
      type: 'folder',
      path: folderPath,
      children: [],
      key,
    }));
    upgradeNodeToFolder(current, folderPath);
  }
}

function insertListItem(root: BuildNode, item: S3ListItem): void {
  if (!item?.Key) return;
  const parts = item.Key.split('/').filter(Boolean);
  if (!parts.length) return;

  let current = root;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const isFolder = i < parts.length - 1 || item.Key.endsWith('/');
    const nodePath = parts.slice(0, i + 1).join('/') + (isFolder ? '/' : '');

    const child = getOrCreateChild(current, part, () => {
      const created: BuildNode = {
        name: part,
        type: isFolder ? 'folder' : 'file',
        path: nodePath,
        key: item.Key,
      };
      if (isFolder) {
        created.children = [];
      } else {
        if (item.LastModified !== undefined) {
          created.lastModified = item.LastModified;
        }
        if (item.Size !== undefined) {
          created.size = item.Size;
        }
      }
      return created;
    });

    if (isFolder && child.type === 'file') {
      upgradeNodeToFolder(child, nodePath);
    } else if (!isFolder && child.type === 'file') {
      if (item.LastModified !== undefined) {
        child.lastModified = item.LastModified;
      } else {
        delete child.lastModified;
      }
      if (item.Size !== undefined) {
        child.size = item.Size;
      } else {
        delete child.size;
      }
      child.key = item.Key;
    } else if (isFolder && child.type === 'folder' && !child.children) {
      child.children = [];
    }

    current = child;
  }
}

function stripBuildIndexes(nodes: BuildNode[]): void {
  for (const node of nodes) {
    delete node._childIndex;
    if (node.children?.length) stripBuildIndexes(node.children as BuildNode[]);
  }
}

function sortChildren(nodes: S3TreeNode[]): void {
  nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  });
  for (const n of nodes) {
    if (n.children && n.children.length > 0) {
      sortChildren(n.children);
    }
  }
}

/** Iterative sort with cooperative yields for large trees. */
async function sortChildrenAsync(
  nodes: S3TreeNode[],
  yieldFn: () => Promise<void>,
  budgetMs: number,
  deadlineRef: { current: number },
): Promise<void> {
  const stack: S3TreeNode[][] = [nodes];
  while (stack.length) {
    const list = stack.pop()!;
    list.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name, undefined, {
        sensitivity: 'base',
        numeric: true,
      });
    });
    for (let i = list.length - 1; i >= 0; i--) {
      const n = list[i]!;
      if (n.children && n.children.length > 0) {
        stack.push(n.children);
      }
    }
    if (performance.now() >= deadlineRef.current) {
      await yieldFn();
      deadlineRef.current = performance.now() + budgetMs;
    }
  }
}

function buildS3TreeSyncCore(contents: S3ListItem[] | null | undefined): S3TreeNode[] {
  const root: BuildNode = { name: 'root', type: 'folder', path: '', children: [] };
  const list = contents || [];

  for (const item of list) {
    insertListItem(root, item);
  }

  for (const item of list) {
    if (item?.Key?.endsWith('/')) {
      ensureFolderPath(root, item.Key);
    }
  }

  const children = (root.children || []) as BuildNode[];
  stripBuildIndexes(children);
  sortChildren(children);
  return children;
}

/**
 * Build nested folder/file tree from flat S3 (or S3-shaped) object list.
 * Prefer {@link buildS3TreeAsync} on the UI thread for large vaults.
 */
export const buildS3Tree = (
  contents: S3ListItem[] | null | undefined,
): S3TreeNode[] => buildS3TreeSyncCore(contents);

export type BuildS3TreeAsyncOptions = {
  /** Cooperative yield (defaults to yieldToMain / scheduler.yield). */
  yieldFn?: (() => Promise<void>) | undefined;
  /** Soft budget before yielding (ms). Default 50. */
  budgetMs?: number | undefined;
};

/**
 * Same as {@link buildS3Tree} but yields to the browser every ~50ms so resize
 * and input stay responsive during initial S3 / WebDAV list hydration.
 */
export async function buildS3TreeAsync(
  contents: S3ListItem[] | null | undefined,
  options: BuildS3TreeAsyncOptions = {},
): Promise<S3TreeNode[]> {
  const yieldFn = options.yieldFn ?? yieldToMain;
  const budgetMs = options.budgetMs ?? TREE_BUILD_YIELD_BUDGET_MS;
  const root: BuildNode = { name: 'root', type: 'folder', path: '', children: [] };
  const list = contents || [];
  let deadline = performance.now() + budgetMs;

  for (let i = 0; i < list.length; i++) {
    insertListItem(root, list[i]!);
    if (performance.now() >= deadline) {
      await yieldFn();
      deadline = performance.now() + budgetMs;
    }
  }

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item?.Key?.endsWith('/')) {
      ensureFolderPath(root, item.Key);
    }
    if (performance.now() >= deadline) {
      await yieldFn();
      deadline = performance.now() + budgetMs;
    }
  }

  const children = (root.children || []) as BuildNode[];
  stripBuildIndexes(children);
  await sortChildrenAsync(children, yieldFn, budgetMs, { current: deadline });
  return children;
}

/**
 * Collect path -> lastModified for all file nodes in the tree.
 */
function toDateOrNull(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'number' || typeof value === 'string') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export const getFileLastModifiedMap = (
  nodes: readonly VaultTreeWalkNode[] | null | undefined,
): Map<string, Date> => {
  const map = new Map<string, Date>();
  const walk = (list: readonly VaultTreeWalkNode[] | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.type === 'file' && node.path != null) {
        const d = toDateOrNull(node.lastModified);
        if (d) map.set(node.path, d);
      }
      if (node.children) walk(node.children);
    }
  };
  walk(nodes || undefined);
  return map;
};

const getAllFileNodes = (
  nodes: readonly VaultTreeWalkNode[] | null | undefined,
): { path: string; lastModified?: unknown }[] => {
  const result: { path: string; lastModified?: unknown }[] = [];
  const walk = (list: readonly VaultTreeWalkNode[] | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.type === 'file' && node.path) {
        const entry: { path: string; lastModified?: unknown } = { path: node.path };
        if (node.lastModified !== undefined) {
          entry.lastModified = node.lastModified;
        }
        result.push(entry);
      }
      if (node.children) walk(node.children);
    }
  };
  walk(nodes || undefined);
  return result;
};

/**
 * Recording keys for a note (`{base}-rec-{timestamp}.m4a|webm`), newest first.
 */
export const getRecordingKeysFromTree = (
  nodes: readonly VaultTreeWalkNode[] | null | undefined,
  noteKey: string,
): {
  key: string;
  timestamp: number;
  lastModified?: unknown;
}[] => {
  const base =
    !noteKey || typeof noteKey !== 'string'
      ? ''
      : noteKey.replace(/\.[^.]+$/, '') || noteKey;
  if (!base) return [];
  const prefix = `${base}-rec-`;
  const suffixRegex = /\.(m4a|webm)$/;
  const files = getAllFileNodes(nodes);
  const results: {
    key: string;
    timestamp: number;
    lastModified?: unknown;
  }[] = [];
  for (const { path, lastModified } of files) {
    if (!path.startsWith(prefix) || !suffixRegex.test(path)) continue;
    const match = path.match(/-rec-(\d+)\.(m4a|webm)$/);
    if (match) {
      const entry: {
        key: string;
        timestamp: number;
        lastModified?: unknown;
      } = {
        key: path,
        timestamp: parseInt(match[1]!, 10),
      };
      if (lastModified !== undefined) {
        entry.lastModified = lastModified;
      }
      results.push(entry);
    }
  }
  results.sort((a, b) => b.timestamp - a.timestamp);
  return results;
};

/** Note path without extension (`notes/a.md` → `notes/a`). */
export function getFilePathBaseForRecordingLookup(filePath: string): string {
  if (!filePath || typeof filePath !== 'string') return '';
  const lastDot = filePath.lastIndexOf('.');
  return lastDot <= 0 ? filePath : filePath.slice(0, lastDot);
}

/** Bases that have a companion recording file in the tree. */
export function buildRecordingBasePathSet(
  nodes: readonly PathWalkNode[] | null | undefined,
): Set<string> {
  const set = new Set<string>();
  const walk = (list: readonly PathWalkNode[] | undefined) => {
    if (!list?.length) return;
    for (const node of list) {
      if (node.type === 'file' && node.path) {
        const m = node.path.match(/^(.*)-rec-\d+\.(m4a|webm|mp4)$/i);
        if (m) set.add(m[1]!);
      }
      if (node.children?.length) walk(node.children);
    }
  };
  walk(nodes || undefined);
  return set;
}

/** Union of recording bases across S3 + local-shaped trees. */
export function buildRecordingBasePathSetFromTrees(
  s3Nodes: readonly PathWalkNode[] | null | undefined,
  localNodes: readonly PathWalkNode[] | null | undefined,
): Set<string> {
  const set = buildRecordingBasePathSet(s3Nodes || []);
  for (const base of buildRecordingBasePathSet(localNodes || [])) {
    set.add(base);
  }
  return set;
}

/** Hidden companion keys (audio + sync sidecars). */
export function isRecordingCompanionFileKey(path: string): boolean {
  if (!path || typeof path !== 'string') return false;
  return (
    /-rec-\d+\.(m4a|webm|mp4)$/i.test(path) ||
    /-rec-\d+\.sync\.(pb|json)$/i.test(path)
  );
}

export function findFileNodeByPath<T extends PathWalkNode>(
  nodes: readonly T[] | null | undefined,
  path: string,
): T | null {
  const walk = (list: readonly T[] | undefined): T | null => {
    if (!list) return null;
    for (const node of list) {
      if (node.type === 'file' && node.path === path) return node;
      const found = node.children
        ? walk(node.children as readonly T[])
        : null;
      if (found) return found;
    }
    return null;
  };
  return walk(nodes || undefined);
}

export function flattenTreeToPaths(
  nodes: readonly PathWalkNode[] | null | undefined,
): string[] {
  const result: string[] = [];
  const walk = (list: readonly PathWalkNode[] | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.path) result.push(node.path);
      if (node.children) walk(node.children);
    }
  };
  walk(nodes || undefined);
  return result;
}

export function findNodeByPath<T extends PathWalkNode>(
  nodes: readonly T[] | null | undefined,
  path: string,
): T | null {
  const walk = (list: readonly T[] | undefined): T | null => {
    if (!list) return null;
    for (const node of list) {
      if (node.path === path) return node;
      const found = node.children
        ? walk(node.children as readonly T[])
        : null;
      if (found) return found;
    }
    return null;
  };
  return walk(nodes || undefined);
}
