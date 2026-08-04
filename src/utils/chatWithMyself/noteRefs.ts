/**
 * Helpers for chat → note path references (`notePath` meta).
 * Note→chat share tokens `[[note:...]]` are kept in message bodies and
 * rendered disabled when the file is missing from the storage tree.
 */

export type DeletedNoteScope = {
  /** Exact file paths removed (or moved to trash). */
  exact: string[];
  /** Folder prefixes (always with trailing `/`). */
  prefixes: string[];
};

/** Normalize a storage path for comparison. */
export function normalizeStoragePath(path: string | null | undefined): string {
  return String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .trim();
}

/**
 * Build delete scope from a tree node about to be removed (or trashed).
 * Folders match any note under their prefix; files match exact path.
 */
export function deletedNoteScopeFromNode(node: {
  type?: string;
  path?: string;
} | null): DeletedNoteScope {
  const path = normalizeStoragePath(node?.path);
  if (!path) return { exact: [], prefixes: [] };
  if (node?.type === 'folder') {
    const prefix = path.endsWith('/') ? path : `${path}/`;
    return { exact: [], prefixes: [prefix] };
  }
  return { exact: [path], prefixes: [] };
}

/** Whether `path` is covered by a delete scope. */
export function pathAffectedByDelete(
  path: string | null | undefined,
  scope: DeletedNoteScope | null | undefined,
): boolean {
  const p = normalizeStoragePath(path);
  if (!p || !scope) return false;
  for (const ex of scope.exact || []) {
    if (p === normalizeStoragePath(ex)) return true;
  }
  for (const raw of scope.prefixes || []) {
    const prefix = normalizeStoragePath(raw).replace(/\/?$/, '/');
    if (!prefix || prefix === '/') continue;
    if (p.startsWith(prefix)) return true;
  }
  return false;
}

/**
 * True when message was created-from-chat (`notePath`) and that path is deleted.
 * Does not consider `[[note:]]` share tokens — those stay and render disabled.
 */
export function messageNeedsNoteUnlink(
  msg: { notePath?: string } | null | undefined,
  scope: DeletedNoteScope,
): boolean {
  if (!msg) return false;
  return pathAffectedByDelete(msg.notePath, scope);
}
