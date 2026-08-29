/** Vault paths for Advanced Search inverted index (Lucivy LUCE + docs meta). */

export const ADVANCED_SEARCH_FOLDER = '.advanced-search';

/**
 * Vault folders always skipped by the inverted index (not user-selectable).
 * Paths without trailing slash. Includes underscore alias of the index folder.
 */
export const SYSTEM_INDEX_EXCLUDED_FOLDERS = [
  ADVANCED_SEARCH_FOLDER,
  '.advanced_search',
  '.trash',
] as const;

/** True for `.trash`, `.advanced-search`, `.advanced_search` (root or descendant). */
export function isSystemIndexExcludedFolder(path: string): boolean {
  const p = String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .trim();
  if (!p) return false;
  for (const folder of SYSTEM_INDEX_EXCLUDED_FOLDERS) {
    if (p === folder || p.startsWith(`${folder}/`)) return true;
  }
  return false;
}

/**
 * Soft-trash destination path (mirrors vault `.trash/${src}` layout).
 * Preserves trailing slash for folder prefixes.
 */
export function vaultTrashDestPath(path: string): string {
  const raw = String(path || '').replace(/^\/+/, '');
  const trailing = raw.endsWith('/');
  const p = raw.replace(/\/+$/, '');
  if (!p) return trailing ? '.trash/' : '.trash';
  if (p === '.trash' || p.startsWith('.trash/')) {
    return trailing ? `${p}/` : p;
  }
  return trailing ? `.trash/${p}/` : `.trash/${p}`;
}

export const MANIFEST_FILE = 'manifest.json';
export const DOCS_FILE = 'docs.json.gz';
export const LUCE_FILE = 'index.luce.gz';
/** @deprecated schema v1 — cleared on migrate */
export const POSTINGS_FILE = 'postings.json.gz';

export function advancedSearchFolderPrefix(): string {
  return `${ADVANCED_SEARCH_FOLDER}/`;
}

export function manifestKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${MANIFEST_FILE}`;
}

export function docsKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${DOCS_FILE}`;
}

export function luceKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${LUCE_FILE}`;
}

/** @deprecated schema v1 */
export function postingsKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${POSTINGS_FILE}`;
}

export function fileDocId(path: string): string {
  return `file:${String(path || '').replace(/^\/+/, '')}`;
}

export function chatDocId(dateStr: string, messageId: string): string {
  return `chat:${dateStr}#${messageId}`;
}

export function parseFileDocId(docId: string): string | null {
  if (!docId.startsWith('file:')) return null;
  return docId.slice('file:'.length);
}

export function parseChatDocId(
  docId: string,
): { dateStr: string; messageId: string } | null {
  if (!docId.startsWith('chat:')) return null;
  const rest = docId.slice('chat:'.length);
  const hash = rest.indexOf('#');
  if (hash < 0) return null;
  const dateStr = rest.slice(0, hash);
  const messageId = rest.slice(hash + 1);
  if (!dateStr || !messageId) return null;
  return { dateStr, messageId };
}
