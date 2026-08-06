/** Vault paths for Advanced Search inverted index. */

export const ADVANCED_SEARCH_FOLDER = '.advanced-search';

export const MANIFEST_FILE = 'manifest.json';
export const POSTINGS_FILE = 'postings.json.gz';
export const DOCS_FILE = 'docs.json.gz';

export function advancedSearchFolderPrefix(): string {
  return `${ADVANCED_SEARCH_FOLDER}/`;
}

export function manifestKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${MANIFEST_FILE}`;
}

export function postingsKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${POSTINGS_FILE}`;
}

export function docsKey(): string {
  return `${ADVANCED_SEARCH_FOLDER}/${DOCS_FILE}`;
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
