import type { VaultTreeNode, S3ListContentItem } from '@/utils/vault/vaultTreeTypes';

function folderPathFromParts(parts: string[], index: number): string {
  return `${parts.slice(0, index + 1).join('/')}/`;
}

function upgradeNodeToFolder(node: VaultTreeNode, folderPath: string): VaultTreeNode {
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

function ensureFolderPath(root: VaultTreeNode, key: string): void {
  const parts = key.replace(/\/$/, '').split('/').filter(Boolean);
  if (!parts.length) return;

  let current = root;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const folderPath = folderPathFromParts(parts, i);
    if (!current.children) current.children = [];

    let child = current.children.find((c) => c.name === part);
    if (!child) {
      child = {
        name: part,
        type: 'folder',
        path: folderPath,
        children: [],
        key,
      };
      current.children.push(child);
    } else {
      upgradeNodeToFolder(child, folderPath);
    }
    current = child;
  }
}

export const buildS3Tree = (contents: S3ListContentItem[]): VaultTreeNode[] => {
  const root: VaultTreeNode = { name: 'root', type: 'folder', path: '', children: [] };

  contents.forEach((item) => {
    if (!item?.Key) return;
    const parts = item.Key.split('/').filter(Boolean);
    if (!parts.length) return;

    let current: VaultTreeNode = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      const isFolder = i < parts.length - 1 || item.Key.endsWith('/');
      const nodePath = parts.slice(0, i + 1).join('/') + (isFolder ? '/' : '');

      if (!current.children) current.children = [];

      let child: VaultTreeNode | undefined = current.children.find((c) => c.name === part);
      if (!child) {
        const created: VaultTreeNode = {
          name: part,
          type: isFolder ? 'folder' : 'file',
          path: nodePath,
          key: item.Key,
        };
        if (isFolder) {
          created.children = [];
        } else {
          if (item.LastModified != null) created.lastModified = item.LastModified;
          if (item.Size != null) created.size = item.Size;
        }
        current.children.push(created);
        child = created;
      } else if (isFolder && child.type === 'file') {
        upgradeNodeToFolder(child, nodePath);
      } else if (!isFolder && child.type === 'file') {
        if (item.LastModified != null) child.lastModified = item.LastModified;
        if (item.Size != null) child.size = item.Size;
        child.key = item.Key;
      } else if (isFolder && child.type === 'folder' && !child.children) {
        child.children = [];
      }

      current = child;
    }
  });

  contents.forEach((item) => {
    if (item?.Key?.endsWith('/')) {
      ensureFolderPath(root, item.Key);
    }
  });

  const sortChildren = (nodes: VaultTreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
    });
    nodes.forEach((n) => {
      if (n.children && n.children.length > 0) {
        sortChildren(n.children);
      }
    });
  };

  sortChildren(root.children ?? []);

  return root.children ?? [];
};

/**
 * Collect path -> lastModified for all file nodes in the tree.
 */
export const getFileLastModifiedMap = (nodes: VaultTreeNode[] | null | undefined): Map<string, Date> => {
  const map = new Map<string, Date>();
  const walk = (list: VaultTreeNode[] | null | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.type === 'file' && node.path != null && node.lastModified != null) {
        map.set(
          node.path,
          node.lastModified instanceof Date ? node.lastModified : new Date(node.lastModified),
        );
      }
      if (node.children) walk(node.children);
    }
  };
  walk(nodes);
  return map;
};

/**
 * Collect all file nodes from the tree.
 */
const getAllFileNodes = (
  nodes: VaultTreeNode[] | null | undefined,
): { path: string; lastModified?: Date | string }[] => {
  const result: { path: string; lastModified?: Date | string }[] = [];
  const walk = (list: VaultTreeNode[] | null | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.type === 'file' && node.path) {
        const entry: { path: string; lastModified?: Date | string } = { path: node.path };
        if (node.lastModified != null) entry.lastModified = node.lastModified;
        result.push(entry);
      }
      if (node.children) walk(node.children);
    }
  };
  walk(nodes);
  return result;
};

/**
 * noteKey에 해당하는 녹음 파일 키 목록 (최신순)
 * 패턴: {base}-rec-{timestamp}.m4a | .webm
 */
export const getRecordingKeysFromTree = (
  nodes: VaultTreeNode[] | null | undefined,
  noteKey: string | null | undefined,
): { key: string; timestamp: number; lastModified?: Date | string }[] => {
  const base = !noteKey || typeof noteKey !== 'string' ? '' : noteKey.replace(/\.[^.]+$/, '') || noteKey;
  if (!base) return [];
  const prefix = base + '-rec-';
  const suffixRegex = /\.(m4a|webm)$/;
  const files = getAllFileNodes(nodes);
  const results: { key: string; timestamp: number; lastModified?: Date | string }[] = [];
  for (const { path, lastModified } of files) {
    if (!path.startsWith(prefix) || !suffixRegex.test(path)) continue;
    const match = path.match(/-rec-(\d+)\.(m4a|webm)$/);
    if (match?.[1]) {
      const entry: { key: string; timestamp: number; lastModified?: Date | string } = {
        key: path,
        timestamp: parseInt(match[1], 10),
      };
      if (lastModified != null) entry.lastModified = lastModified;
      results.push(entry);
    }
  }
  results.sort((a, b) => b.timestamp - a.timestamp);
  return results;
};

/**
 * 노트 파일 경로에서 확장자를 뺀 베이스 (`notes/a.md` → `notes/a`, 녹음 키 prefix와 동일)
 */
export function getFilePathBaseForRecordingLookup(filePath: string | null | undefined): string {
  if (!filePath || typeof filePath !== 'string') return '';
  const lastDot = filePath.lastIndexOf('.');
  return lastDot <= 0 ? filePath : filePath.slice(0, lastDot);
}

/**
 * 트리에 있는 녹음 오디오 파일(`…-rec-{ts}.m4a|webm|mp4`)을 스캔해 베이스 경로 Set
 */
export function buildRecordingBasePathSet(nodes: VaultTreeNode[] | null | undefined): Set<string> {
  const set = new Set<string>();
  const walk = (list: VaultTreeNode[] | null | undefined) => {
    if (!list?.length) return;
    for (const node of list) {
      if (node.type === 'file' && node.path) {
        const m = node.path.match(/^(.*)-rec-\d+\.(m4a|webm|mp4)$/i);
        if (m?.[1]) set.add(m[1]);
      }
      if (node.children?.length) walk(node.children);
    }
  };
  walk(nodes);
  return set;
}

/**
 * S3 + 로컬 트리에서 녹음이 연결된 노트 베이스 경로 합집합
 */
export function buildRecordingBasePathSetFromTrees(
  s3Nodes: VaultTreeNode[] | null | undefined,
  localNodes: VaultTreeNode[] | null | undefined,
): Set<string> {
  const set = buildRecordingBasePathSet(s3Nodes || []);
  for (const base of buildRecordingBasePathSet(localNodes || [])) {
    set.add(base);
  }
  return set;
}

/**
 * 녹음 동반 S3/로컬 파일인지 (트리에서 숨김 처리용)
 * 오디오: …-rec-{ts}.m4a|webm|mp4
 * 필기 동기화: …-rec-{ts}.sync.pb|.sync.json
 */
export function isRecordingCompanionFileKey(path: string | null | undefined): boolean {
  if (!path || typeof path !== 'string') return false;
  return (
    /-rec-\d+\.(m4a|webm|mp4)$/i.test(path) || /-rec-\d+\.sync\.(pb|json)$/i.test(path)
  );
}

/**
 * Find a file node by path in the tree.
 */
export const findFileNodeByPath = (
  nodes: VaultTreeNode[] | null | undefined,
  path: string,
): VaultTreeNode | null => {
  const walk = (list: VaultTreeNode[] | null | undefined): VaultTreeNode | null => {
    if (!list) return null;
    for (const node of list) {
      if (node.type === 'file' && node.path === path) return node;
      const found = node.children ? walk(node.children) : null;
      if (found) return found;
    }
    return null;
  };
  return walk(nodes);
};

/**
 * Flatten tree to array of paths in display order (depth-first).
 */
export const flattenTreeToPaths = (nodes: VaultTreeNode[] | null | undefined): string[] => {
  const result: string[] = [];
  const walk = (list: VaultTreeNode[] | null | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.path) result.push(node.path);
      if (node.children) walk(node.children);
    }
  };
  walk(nodes);
  return result;
};

/**
 * Find any node (file or folder) by path in the tree.
 */
export const findNodeByPath = (
  nodes: VaultTreeNode[] | null | undefined,
  path: string,
): VaultTreeNode | null => {
  const walk = (list: VaultTreeNode[] | null | undefined): VaultTreeNode | null => {
    if (!list) return null;
    for (const node of list) {
      if (node.path === path) return node;
      const found = node.children ? walk(node.children) : null;
      if (found) return found;
    }
    return null;
  };
  return walk(nodes);
};
