/**
 * Analyze a storage file tree for capacity usage (TreeSize-style).
 */

export type StorageTreeNode = {
  name: string;
  type: 'file' | 'folder' | string;
  path?: string;
  size?: number | null;
  children?: StorageTreeNode[] | null;
};

export type StorageUsageSummary = {
  totalSize: number;
  fileCount: number;
  folderCount: number;
  zeroByteCount: number;
  unknownSizeCount: number;
};

export type StorageUsageExtensionRow = {
  ext: string;
  label: string;
  count: number;
  size: number;
  percent: number;
};

export type StorageUsageFolderRow = {
  path: string;
  name: string;
  depth: number;
  size: number;
  fileCount: number;
  percent: number;
};

export type StorageUsageAnalysis = {
  summary: StorageUsageSummary;
  byExtension: StorageUsageExtensionRow[];
  folders: StorageUsageFolderRow[];
};

export function formatStorageBytes(bytes: number | null | undefined): string {
  if (bytes == null || Number.isNaN(bytes)) return '알 수 없음';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

function extensionOf(name: string): string {
  const lower = String(name || '').toLowerCase();
  const lastDot = lower.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === lower.length - 1) return '(none)';
  return lower.slice(lastDot + 1);
}

function nodeSize(node: StorageTreeNode): number {
  if (node.type === 'file') {
    return typeof node.size === 'number' && Number.isFinite(node.size) ? node.size : 0;
  }
  if (!node.children?.length) return 0;
  let sum = 0;
  for (const child of node.children) {
    sum += nodeSize(child);
  }
  return sum;
}

function countFilesInSubtree(node: StorageTreeNode): number {
  if (node.type === 'file') return 1;
  if (!node.children?.length) return 0;
  let count = 0;
  for (const child of node.children) {
    count += countFilesInSubtree(child);
  }
  return count;
}

/**
 * @param nodes - Root-level tree nodes from S3 / Local / WebDAV backends
 */
export function analyzeStorageTree(nodes: StorageTreeNode[] | null | undefined): StorageUsageAnalysis {
  const list = Array.isArray(nodes) ? nodes : [];

  let fileCount = 0;
  let folderCount = 0;
  let zeroByteCount = 0;
  let unknownSizeCount = 0;
  let totalSize = 0;
  /** @type {Map<string, { count: number, size: number }>} */
  const extMap = new Map();

  const walkFiles = (items: StorageTreeNode[]) => {
    for (const node of items) {
      if (node.type === 'folder') {
        folderCount += 1;
        if (node.children?.length) walkFiles(node.children);
        continue;
      }
      if (node.type !== 'file') continue;
      fileCount += 1;
      const hasSize = typeof node.size === 'number' && Number.isFinite(node.size);
      const size = hasSize ? (node.size as number) : 0;
      if (!hasSize) unknownSizeCount += 1;
      else if (size === 0) zeroByteCount += 1;
      totalSize += size;

      const ext = extensionOf(node.name);
      const prev = extMap.get(ext) ?? { count: 0, size: 0 };
      prev.count += 1;
      prev.size += size;
      extMap.set(ext, prev);
    }
  };
  walkFiles(list);

  const byExtension: StorageUsageExtensionRow[] = [...extMap.entries()]
    .map(([ext, { count, size }]) => ({
      ext,
      label: ext === '(none)' ? '(확장자 없음)' : `.${ext}`,
      count,
      size,
      percent: totalSize > 0 ? (size / totalSize) * 100 : 0,
    }))
    .sort((a, b) => b.size - a.size || b.count - a.count || a.label.localeCompare(b.label));

  const folders: StorageUsageFolderRow[] = [];
  const walkFolders = (items: StorageTreeNode[], depth: number) => {
    const ranked = items
      .filter((n) => n.type === 'folder')
      .map((n) => ({
        node: n,
        size: nodeSize(n),
        fileCount: countFilesInSubtree(n),
      }))
      .sort((a, b) => b.size - a.size || a.node.name.localeCompare(b.node.name));

    for (const { node, size, fileCount: fc } of ranked) {
      folders.push({
        path: node.path || `${node.name}/`,
        name: node.name,
        depth,
        size,
        fileCount: fc,
        percent: totalSize > 0 ? (size / totalSize) * 100 : 0,
      });
      if (node.children?.length) walkFolders(node.children, depth + 1);
    }
  };
  walkFolders(list, 0);

  return {
    summary: {
      totalSize,
      fileCount,
      folderCount,
      zeroByteCount,
      unknownSizeCount,
    },
    byExtension,
    folders,
  };
}
