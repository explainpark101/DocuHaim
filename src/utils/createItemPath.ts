import {
  getBrowseChildren,
  normalizeDirPath,
  type BrowseTreeNode,
} from '@/utils/advancedSearch/browseDirectory';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';

export type CreateItemType = 'file' | 'folder';

export type ResolveCreateItemPathResult =
  | {
      ok: true;
      /** Vault-relative path (folders end with `/`). */
      path: string;
      /** Parent directory with trailing `/` (`''` = vault root). */
      parentDirPath: string;
      /** Final segment (files include `.md` when omitted). */
      baseName: string;
    }
  | {
      ok: false;
      reason: 'empty' | 'outside-root';
    };

export type ResolveCreateItemDirectoryResult =
  | { ok: true; dirPath: string }
  | { ok: false; reason: 'outside-root' };

export type CreateItemAutocompleteContext =
  | {
      ok: true;
      /** Directory to list (trailing `/`, or `''` for vault root). */
      listDir: string;
      /** Incomplete last segment used as filter. */
      prefix: string;
      /** Input kept when applying a suggestion (`stem + name + '/'`). */
      stem: string;
    }
  | { ok: false; reason: 'outside-root' };

function normalizeParentParts(parentPath: string): string[] {
  const parentNorm = String(parentPath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
  return parentNorm.split('/').filter(Boolean);
}

/**
 * Resolve a relative directory (may end with `/`) against `parentPath`.
 * Empty relative → `parentPath` itself. Leading `/` starts at vault root.
 */
export function resolveCreateItemDirectory(
  parentPath: string,
  relativeDirInput: string,
): ResolveCreateItemDirectoryResult {
  const raw = String(relativeDirInput || '').replace(/\\/g, '/');
  const trimmed = raw.trim();

  if (!trimmed) {
    return { ok: true, dirPath: normalizeDirPath(parentPath) };
  }

  const fromRoot = trimmed.startsWith('/');
  const nameNorm = trimmed.replace(/^\/+/, '').replace(/\/+$/, '');
  const stack = fromRoot ? [] : [...normalizeParentParts(parentPath)];

  if (!nameNorm) {
    return { ok: true, dirPath: fromRoot ? '' : normalizeDirPath(parentPath) };
  }

  for (const part of nameNorm.split('/').filter(Boolean)) {
    if (part === '.') continue;
    if (part === '..') {
      if (stack.length === 0) return { ok: false, reason: 'outside-root' };
      stack.pop();
      continue;
    }
    stack.push(normalizeUnicodeNfc(part));
  }

  return {
    ok: true,
    dirPath: stack.length ? `${stack.join('/')}/` : '',
  };
}

/**
 * Resolve a create-item name against `parentPath`, allowing `/` and `..`.
 * Leading `/` (or `\`) starts from the vault root. Escaping above root → outside-root.
 */
export function resolveCreateItemPath(
  parentPath: string,
  nameInput: string,
  type: CreateItemType,
): ResolveCreateItemPathResult {
  const trimmed = String(nameInput || '').trim();
  if (!trimmed) return { ok: false, reason: 'empty' };

  const nameSlashes = trimmed.replace(/\\/g, '/');
  const fromRoot = nameSlashes.startsWith('/');
  const nameNorm = nameSlashes.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!nameNorm && fromRoot) return { ok: false, reason: 'empty' };

  const parentParts = fromRoot ? [] : normalizeParentParts(parentPath);
  const nameParts = (nameNorm || '').split('/').filter((part) => part !== '');
  const stack = [...parentParts];

  for (const part of nameParts) {
    if (part === '.') continue;
    if (part === '..') {
      if (stack.length === 0) return { ok: false, reason: 'outside-root' };
      stack.pop();
      continue;
    }
    stack.push(normalizeUnicodeNfc(part));
  }

  if (stack.length === 0) return { ok: false, reason: 'empty' };

  let baseName = stack[stack.length - 1]!;
  const dirParts = stack.slice(0, -1);

  if (type === 'file' && !baseName.endsWith('.md')) {
    baseName = `${baseName}.md`;
  }

  const parentDirPath = dirParts.length ? `${dirParts.join('/')}/` : '';
  const path =
    type === 'folder'
      ? `${[...dirParts, baseName].join('/')}/`
      : `${parentDirPath}${baseName}`;

  return { ok: true, path, parentDirPath, baseName };
}

/**
 * Directory listing context while typing a create path (for folder autocomplete).
 */
export function resolveCreateItemAutocompleteContext(
  parentPath: string,
  nameInput: string,
): CreateItemAutocompleteContext {
  const raw = String(nameInput ?? '').replace(/\\/g, '/');

  if (!raw.trim()) {
    return {
      ok: true,
      listDir: normalizeDirPath(parentPath),
      prefix: '',
      stem: '',
    };
  }

  if (raw.endsWith('/')) {
    const dir = resolveCreateItemDirectory(parentPath, raw);
    if (!dir.ok) return dir;
    return { ok: true, listDir: dir.dirPath, prefix: '', stem: raw };
  }

  const lastSlash = raw.lastIndexOf('/');
  const stem = lastSlash >= 0 ? raw.slice(0, lastSlash + 1) : '';
  const prefix = lastSlash >= 0 ? raw.slice(lastSlash + 1) : raw;

  if (!stem) {
    return {
      ok: true,
      listDir: normalizeDirPath(parentPath),
      prefix,
      stem: '',
    };
  }

  const dir = resolveCreateItemDirectory(parentPath, stem);
  if (!dir.ok) return dir;
  return { ok: true, listDir: dir.dirPath, prefix, stem };
}

/** True when a same-type entry already exists at the resolved create path. */
export function isCreateItemPathTaken(
  trees: Array<BrowseTreeNode[] | null | undefined>,
  resolved: { path: string; parentDirPath: string; baseName: string },
  type: CreateItemType,
): boolean {
  const children = getBrowseChildren(trees, resolved.parentDirPath);
  if (type === 'folder') {
    const target = normalizeDirPath(resolved.path);
    return children.some(
      (n) =>
        n.type === 'folder'
        && normalizeDirPath(String(n.path || '')) === target,
    );
  }
  const target = resolved.path;
  return children.some(
    (n) => n.type === 'file' && String(n.path || '') === target,
  );
}

export type FolderSuggestItem = {
  /** Inserted folder segment (`..` or display name). */
  name: string;
  /** Full folder path when not `..`. */
  path?: string;
};

/** Folder suggestions for the current autocomplete list directory. */
export function listCreateItemFolderSuggestions(
  trees: Array<BrowseTreeNode[] | null | undefined>,
  listDir: string,
  prefix: string,
  limit = 40,
): FolderSuggestItem[] {
  const q = String(prefix || '').toLowerCase();
  const items: FolderSuggestItem[] = [];

  if (listDir) {
    if (!q || '..'.startsWith(q) || q === '..') {
      items.push({ name: '..' });
    }
  }

  const children = getBrowseChildren(trees, listDir);
  const folders = children
    .filter((n) => n.type === 'folder' && n.path)
    .map((n) => {
      const path = normalizeDirPath(String(n.path));
      const name =
        String(n.name || '').trim()
        || path.replace(/\/$/, '').split('/').filter(Boolean).pop()
        || path;
      return { name, path };
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    );

  for (const folder of folders) {
    if (q && !folder.name.toLowerCase().startsWith(q)) continue;
    items.push(folder);
    if (items.length >= limit) break;
  }

  return items.slice(0, limit);
}
