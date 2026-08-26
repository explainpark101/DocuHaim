import { CHAT_FOLDER } from '@/utils/chatWithMyself/paths';
import { ADVANCED_SEARCH_FOLDER } from '@/utils/advancedSearch/paths';

/** Always indexed when Advanced Search index is built. */
export const MARKDOWN_EXTENSIONS = new Set(['md', 'markdown']);

/**
 * Extra text-ish extensions when “include other files” is on.
 * Binaries / media stay excluded via path prefixes and missing from this set.
 */
export const OTHER_TEXT_EXTENSIONS = new Set([
  'txt',
  'json',
  'html',
  'htm',
  'svg',
  'csv',
]);

/** @deprecated Prefer MARKDOWN_EXTENSIONS + OTHER_TEXT_EXTENSIONS */
export const INDEXABLE_EXTENSIONS = new Set([
  ...MARKDOWN_EXTENSIONS,
  ...OTHER_TEXT_EXTENSIONS,
]);

const EXCLUDED_PREFIXES = [
  `${ADVANCED_SEARCH_FOLDER}/`,
  '.trash/',
  '.images/',
  '.pictures/',
];

export type IndexablePathOptions = {
  /** When true, also index OTHER_TEXT_EXTENSIONS. Default false. */
  includeOtherFiles?: boolean;
};

export function isExcludedPath(path: string): boolean {
  const p = String(path || '').replace(/^\/+/, '');
  if (!p) return true;
  for (const prefix of EXCLUDED_PREFIXES) {
    if (p === prefix.slice(0, -1) || p.startsWith(prefix)) return true;
  }
  // Chat attachment binaries live under .chat-with-myself/images|files|...
  if (p.startsWith(`${CHAT_FOLDER}/`)) {
    if (/^\.chat-with-myself\/\d{4}-\d{2}-\d{2}\.md$/i.test(p)) return false;
    return true;
  }
  return false;
}

function fileExtension(path: string): string {
  const base = path.split('/').pop() || '';
  return (base.split('.').pop() || '').toLowerCase();
}

export function isMarkdownFilePath(path: string): boolean {
  const p = String(path || '').replace(/^\/+/, '');
  if (!p || isExcludedPath(p)) return false;
  const base = p.split('/').pop() || '';
  if (base.startsWith('.')) return false;
  return MARKDOWN_EXTENSIONS.has(fileExtension(p));
}

export function isIndexableFilePath(
  path: string,
  options: IndexablePathOptions = {},
): boolean {
  const p = String(path || '').replace(/^\/+/, '');
  if (!p || isExcludedPath(p)) return false;
  const base = p.split('/').pop() || '';
  if (base.startsWith('.')) return false;
  const ext = fileExtension(p);
  if (MARKDOWN_EXTENSIONS.has(ext)) return true;
  if (options.includeOtherFiles && OTHER_TEXT_EXTENSIONS.has(ext)) return true;
  return false;
}

export function isChatDayPath(path: string): boolean {
  const p = String(path || '').replace(/^\/+/, '');
  return /^\.chat-with-myself\/\d{4}-\d{2}-\d{2}\.md$/i.test(p);
}

export function chatDateFromPath(path: string): string | null {
  const p = String(path || '').replace(/^\/+/, '');
  const m = p.match(/^\.chat-with-myself\/(\d{4}-\d{2}-\d{2})\.md$/i);
  return m?.[1] || null;
}

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

/** Collect indexable vault files + chat day paths from a storage tree. */
export function collectIndexablePathsFromTree(
  nodes: TreeNode[] | null | undefined,
  options: IndexablePathOptions = {},
): {
  filePaths: string[];
  chatDayPaths: string[];
} {
  const filePaths: string[] = [];
  const chatDayPaths: string[] = [];
  const walk = (list: TreeNode[] | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.type === 'file' && node.path) {
        if (isChatDayPath(node.path)) chatDayPaths.push(node.path);
        else if (isIndexableFilePath(node.path, options)) filePaths.push(node.path);
      }
      if (node.children) walk(node.children);
    }
  };
  walk(nodes || []);
  return { filePaths, chatDayPaths };
}

/** Flat file entries for filename/path matching (excludes chat system files). */
export function collectSearchableFileEntries(
  nodes: TreeNode[] | null | undefined,
): Array<{ path: string; name: string }> {
  const out: Array<{ path: string; name: string }> = [];
  const walk = (list: TreeNode[] | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.type === 'file' && node.path) {
        const p = node.path;
        if (isExcludedPath(p) || isChatDayPath(p)) {
          // skip
        } else {
          const name = node.name || p.split('/').pop() || p;
          out.push({ path: p, name });
        }
      }
      if (node.children) walk(node.children);
    }
  };
  walk(nodes || []);
  return out;
}
