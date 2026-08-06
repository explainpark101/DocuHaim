/**
 * List folder/file entries for Advanced Search "Browse Directory" mode.
 */

import type { AdvancedSearchHit } from './query';
import type { AppCommandId } from './commands';
import { fuzzyMatchText, scoreFuzzyRelevance } from './fuzzyMatch';

export type BrowseTreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: BrowseTreeNode[];
  childrenLoaded?: boolean;
  handle?: unknown;
};

type BrowseCreateAction = {
  commandId: Extract<AppCommandId, 'browse-new-file' | 'browse-new-folder'>;
  title: string;
  preview: string;
  keywords: string[];
  emptyScore: number;
};

const BROWSE_CREATE_ACTIONS: readonly BrowseCreateAction[] = [
  {
    commandId: 'browse-new-file',
    title: '새 파일',
    preview: '현재 폴더에 마크다운 파일 만들기',
    keywords: [
      '새 파일',
      'new file',
      'create file',
      '파일 만들기',
      '파일 생성',
      'md',
      'markdown',
    ],
    emptyScore: 2,
  },
  {
    commandId: 'browse-new-folder',
    title: '새 폴더',
    preview: '현재 폴더에 하위 폴더 만들기',
    keywords: [
      '새 폴더',
      'new folder',
      'create folder',
      '폴더 만들기',
      '폴더 생성',
      '디렉토리',
      'mkdir',
    ],
    emptyScore: 1,
  },
];

function listBrowseCreateHits(
  folderPath: string,
  query: string,
): AdvancedSearchHit[] {
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  const parent = normalizeDirPath(folderPath);
  const location = parent || '루트';

  const hits: AdvancedSearchHit[] = [];
  for (const action of BROWSE_CREATE_ACTIONS) {
    let score = action.emptyScore;
    if (q) {
      score = Math.max(
        scoreFuzzyRelevance(action.title, q),
        ...action.keywords.map((k) => scoreFuzzyRelevance(k, q)),
        scoreFuzzyRelevance(action.preview, q),
      );
      if (score <= 0 && !fuzzyMatchText(`${action.title} ${action.keywords.join(' ')}`, q)) {
        continue;
      }
      if (score <= 0) continue;
    }
    hits.push({
      docId: `browse-action:${action.commandId}`,
      kind: 'command',
      path: parent,
      title: action.title,
      preview: `${action.preview} · ${location}`,
      commandId: action.commandId,
      reasons: ['command'],
      score,
    });
  }
  return hits;
}

function normalizeDirPath(path: string): string {
  let p = String(path || '').replace(/^\/+/, '').replace(/\\/g, '/');
  if (p && !p.endsWith('/')) p = `${p}/`;
  return p;
}

function parentDirPath(dirPath: string): string {
  const p = normalizeDirPath(dirPath);
  if (!p) return '';
  const trimmed = p.replace(/\/+$/, '');
  const idx = trimmed.lastIndexOf('/');
  if (idx < 0) return '';
  return `${trimmed.slice(0, idx + 1)}`;
}

function displayName(node: BrowseTreeNode): string {
  const n = String(node.name || '').trim();
  if (n) return n;
  const path = String(node.path || '').replace(/\/+$/, '');
  return path.split('/').filter(Boolean).pop() || path || '(unnamed)';
}

function nodeMatchesQuery(node: BrowseTreeNode, q: string): boolean {
  if (!q) return true;
  return fuzzyMatchText(`${displayName(node)} ${node.path || ''}`, q);
}

/** Find a folder node by path across trees (exact match, with/without trailing slash). */
export function findBrowseFolderNode(
  trees: Array<BrowseTreeNode[] | null | undefined>,
  folderPath: string,
): BrowseTreeNode | null {
  const target = normalizeDirPath(folderPath);
  if (!target) return null;

  const walk = (nodes: BrowseTreeNode[] | undefined): BrowseTreeNode | null => {
    if (!nodes) return null;
    for (const node of nodes) {
      if (node.type === 'folder' && node.path) {
        if (normalizeDirPath(node.path) === target) return node;
        const found = walk(node.children);
        if (found) return found;
      }
    }
    return null;
  };

  for (const tree of trees) {
    const found = walk(tree || undefined);
    if (found) return found;
  }
  return null;
}

/** Direct children at folderPath ('' = vault root across all trees). */
export function getBrowseChildren(
  trees: Array<BrowseTreeNode[] | null | undefined>,
  folderPath: string,
): BrowseTreeNode[] {
  const target = normalizeDirPath(folderPath);
  if (!target) {
    const roots: BrowseTreeNode[] = [];
    const seen = new Set<string>();
    for (const tree of trees) {
      for (const node of tree || []) {
        const key = `${node.type}:${normalizeDirPath(node.path || node.name || '')}`;
        if (seen.has(key)) continue;
        seen.add(key);
        roots.push(node);
      }
    }
    return roots;
  }

  const folder = findBrowseFolderNode(trees, target);
  return folder?.children ? [...folder.children] : [];
}

export function browseParentPath(folderPath: string): string {
  return parentDirPath(folderPath);
}

/**
 * Build Advanced Search hits for the current browse folder.
 * Create actions are always pinned at the bottom; above them: "..", folders, files.
 */
export function listBrowseDirectoryHits(
  trees: Array<BrowseTreeNode[] | null | undefined>,
  folderPath: string,
  query: string,
  limit = 200,
): AdvancedSearchHit[] {
  const q = String(query || '').trim().toLowerCase();
  const current = normalizeDirPath(folderPath);
  const createHits = listBrowseCreateHits(current, q);
  const hits: AdvancedSearchHit[] = [];

  if (!q && current) {
    hits.push({
      docId: 'browse:parent',
      kind: 'folder',
      path: browseParentPath(current),
      title: '..',
      preview: '상위 폴더',
      reasons: ['path'],
      score: 300,
    });
  }

  const children = getBrowseChildren(trees, current);
  const folders = children.filter((n) => n.type === 'folder' && n.path);
  const files = children.filter((n) => n.type === 'file' && n.path);

  const sortByName = (a: BrowseTreeNode, b: BrowseTreeNode) =>
    displayName(a).localeCompare(displayName(b), undefined, { sensitivity: 'base' });

  folders.sort(sortByName);
  files.sort(sortByName);

  let index = 0;
  for (const node of folders) {
    if (!nodeMatchesQuery(node, q)) continue;
    const path = normalizeDirPath(String(node.path));
    hits.push({
      docId: `browse-folder:${path}`,
      kind: 'folder',
      path,
      title: displayName(node),
      preview: path || '폴더',
      reasons: ['path'],
      score: q ? scoreFuzzyRelevance(displayName(node), q) : 200 - index,
    });
    index += 1;
  }

  for (const node of files) {
    if (!nodeMatchesQuery(node, q)) continue;
    const path = String(node.path || '');
    hits.push({
      docId: `file:${path}`,
      kind: 'file',
      path,
      title: displayName(node),
      preview: path,
      reasons: ['name'],
      score: q ? scoreFuzzyRelevance(displayName(node), q) : 100 - index,
    });
    index += 1;
  }

  hits.sort(
    (a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'),
  );

  // Always pin create actions below folders/files (order: 새 파일, 새 폴더).
  const room = Math.max(0, limit - createHits.length);
  return [...hits.slice(0, room), ...createHits].slice(0, limit);
}

export { normalizeDirPath };
