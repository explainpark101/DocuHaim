/**
 * Folder-level inverted-index coverage (indexable files vs indexed).
 */

import {
  chatDateFromPath,
  isChatDayPath,
  isIndexableFilePath,
  type IndexablePathOptions,
} from '@/utils/advancedSearch/collectSources';
import { parseChatDocId } from '@/utils/advancedSearch/paths';
import type { DocMeta } from '@/utils/advancedSearch/types';
import type { StorageTreeNode } from '@/utils/storageUsageAnalysis';

export type IndexCoverageSummary = {
  indexableCount: number;
  indexedCount: number;
  /** 0–100 when indexableCount > 0 */
  percent: number;
};

export type IndexCoverageFolderRow = {
  path: string;
  name: string;
  depth: number;
  parentPath: string | null;
  hasChildFolders: boolean;
  indexableCount: number;
  indexedCount: number;
  /** 0–100 when indexableCount > 0 */
  percent: number;
};

export type IndexCoverageAnalysis = {
  summary: IndexCoverageSummary;
  folders: IndexCoverageFolderRow[];
};

type IndexedState = {
  files: Set<string>;
  chatDates: Set<string>;
};

function normalizePath(path: string): string {
  return String(path || '').replace(/^\/+/, '');
}

export function collectIndexedState(docs: Map<string, DocMeta>): IndexedState {
  const files = new Set<string>();
  const chatDates = new Set<string>();
  for (const [docId, meta] of docs) {
    if (meta.kind === 'file') {
      files.add(normalizePath(meta.path));
      continue;
    }
    const parsed = parseChatDocId(docId);
    if (parsed) chatDates.add(parsed.dateStr);
  }
  return { files, chatDates };
}

function isPathIndexed(path: string, indexed: IndexedState): boolean {
  const p = normalizePath(path);
  if (isChatDayPath(p)) {
    const date = chatDateFromPath(p);
    return Boolean(date && indexed.chatDates.has(date));
  }
  return indexed.files.has(p);
}

function countCoverageInSubtree(
  node: StorageTreeNode,
  indexed: IndexedState,
  options: IndexablePathOptions,
): { indexableCount: number; indexedCount: number } {
  let indexableCount = 0;
  let indexedCount = 0;

  const walk = (n: StorageTreeNode) => {
    if (n.type === 'file' && n.path) {
      const p = normalizePath(n.path);
      const indexable =
        isChatDayPath(p) || isIndexableFilePath(p, options);
      if (!indexable) return;
      indexableCount += 1;
      if (isPathIndexed(p, indexed)) indexedCount += 1;
      return;
    }
    if (n.children?.length) {
      for (const child of n.children) walk(child);
    }
  };

  walk(node);
  return { indexableCount, indexedCount };
}

function coveragePercent(indexed: number, indexable: number): number {
  if (indexable <= 0) return 0;
  return (indexed / indexable) * 100;
}

export function formatIndexCoveragePercent(
  percent: number,
  indexableCount: number,
): string {
  if (indexableCount <= 0) return '—';
  if (percent > 0 && percent < 0.1) return '< 0.1%';
  return `${percent.toFixed(1)}%`;
}

/**
 * @param nodes - Root-level tree nodes from S3 / Local / WebDAV backends
 * @param docs - Current in-memory Advanced Search doc map
 */
export function analyzeIndexCoverage(
  nodes: StorageTreeNode[] | null | undefined,
  docs: Map<string, DocMeta>,
  options: IndexablePathOptions = {},
): IndexCoverageAnalysis {
  const list = Array.isArray(nodes) ? nodes : [];
  const indexed = collectIndexedState(docs);

  let totalIndexable = 0;
  let totalIndexed = 0;
  const folders: IndexCoverageFolderRow[] = [];

  const walkFolders = (
    items: StorageTreeNode[],
    depth: number,
    parentPath: string | null,
  ) => {
    const ranked = items
      .filter((n) => n.type === 'folder')
      .map((n) => ({
        node: n,
        ...countCoverageInSubtree(n, indexed, options),
      }))
      .sort(
        (a, b) =>
          b.indexableCount - a.indexableCount ||
          a.node.name.localeCompare(b.node.name),
      );

    for (const { node, indexableCount, indexedCount } of ranked) {
      const path = node.path || `${node.name}/`;
      const hasChildFolders = (node.children ?? []).some(
        (child) => child.type === 'folder',
      );
      const percent = coveragePercent(indexedCount, indexableCount);
      folders.push({
        path,
        name: node.name,
        depth,
        parentPath,
        hasChildFolders,
        indexableCount,
        indexedCount,
        percent,
      });
      if (node.children?.length) {
        walkFolders(node.children, depth + 1, path);
      }
    }
  };

  for (const root of list) {
    const counts = countCoverageInSubtree(root, indexed, options);
    totalIndexable += counts.indexableCount;
    totalIndexed += counts.indexedCount;
  }

  walkFolders(list, 0, null);

  return {
    summary: {
      indexableCount: totalIndexable,
      indexedCount: totalIndexed,
      percent: coveragePercent(totalIndexed, totalIndexable),
    },
    folders,
  };
}
