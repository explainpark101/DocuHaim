/**
 * Unused / duplicate image analysis and companion-image keys for note delete.
 */

import { buildEditorImagePathPrefix } from '@/utils/editorImageUpload';
import {
  formatStorageBytes,
  type StorageTreeNode,
} from '@/utils/storageUsageAnalysis';
import { normalizePathToNfc } from '@/utils/unicodeNfc';
import {
  parseWikiImageInner,
  WIKI_IMAGE_RE,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';

export { formatStorageBytes };

export const NOTES_IMAGES_PREFIX = '.images/';
export const CHAT_IMAGES_PREFIX = '.chat-with-myself/images/';

export type UnusedImageScope = 'notes' | 'notes+chat';
export type UnusedImageDeleteMode = 'trash' | 'hard';

export type UnusedImageDeleteOptions = {
  /** Deleted path -> kept path (duplicate cleanup rewrites ![[…]] before delete). */
  pathRemap?: Record<string, string>;
};

export type ImageFileEntry = {
  path: string;
  name: string;
  size: number | null;
  node: StorageTreeNode;
};

const IMAGE_EXTS = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'bmp',
  'ico',
  'avif',
  'svg',
]);

function normalizeStoragePath(path: string): string {
  return normalizePathToNfc(
    String(path || '')
      .replace(/\\/g, '/')
      .replace(/^\/+/, '')
      .replace(/\/{2,}/g, '/'),
  );
}

function isTrashPath(path: string): boolean {
  const p = normalizeStoragePath(path);
  return p === '.trash' || p.startsWith('.trash/');
}

function extOf(name: string): string {
  const lower = String(name || '').toLowerCase();
  const i = lower.lastIndexOf('.');
  return i >= 0 ? lower.slice(i + 1) : '';
}

function isImageFileName(name: string): boolean {
  return IMAGE_EXTS.has(extOf(name));
}

function isMarkdownFileName(name: string): boolean {
  const lower = String(name || '').toLowerCase();
  return lower.endsWith('.md') || lower.endsWith('.markdown');
}

function pathUnderPrefix(path: string, prefix: string): boolean {
  const p = normalizeStoragePath(path);
  const pref = normalizeStoragePath(prefix).replace(/\/+$/, '');
  return p === pref || p.startsWith(`${pref}/`);
}

function walkFiles(
  nodes: StorageTreeNode[] | null | undefined,
  visit: (node: StorageTreeNode) => void,
): void {
  if (!nodes?.length) return;
  for (const node of nodes) {
    if (node.type === 'file' && node.path && !isTrashPath(node.path)) {
      visit(node);
    }
    if (node.children?.length) walkFiles(node.children, visit);
  }
}

export function collectImageFiles(
  tree: StorageTreeNode[] | null | undefined,
  scope: UnusedImageScope,
): ImageFileEntry[] {
  const out: ImageFileEntry[] = [];
  walkFiles(tree, (node) => {
    const path = normalizeStoragePath(node.path || '');
    const name = node.name || path.split('/').pop() || path;
    if (!isImageFileName(name)) return;
    const inNotes = pathUnderPrefix(path, NOTES_IMAGES_PREFIX);
    const inChat = pathUnderPrefix(path, CHAT_IMAGES_PREFIX);
    if (scope === 'notes' && !inNotes) return;
    if (scope === 'notes+chat' && !inNotes && !inChat) return;
    out.push({
      path,
      name,
      size: typeof node.size === 'number' && Number.isFinite(node.size) ? node.size : null,
      node,
    });
  });
  return out;
}

export function collectMarkdownPaths(tree: StorageTreeNode[] | null | undefined): string[] {
  const out: string[] = [];
  walkFiles(tree, (node) => {
    const path = normalizeStoragePath(node.path || '');
    const name = node.name || path.split('/').pop() || path;
    if (!isMarkdownFileName(name)) return;
    out.push(path);
  });
  return out;
}

/** Normalize wiki image path for Set membership (strip leading slash). */
export function normalizeWikiImagePath(path: string): string {
  return normalizeStoragePath(path);
}

function buildNormalizedPathRemap(
  pathRemap: ReadonlyMap<string, string> | Record<string, string>,
): Map<string, string> {
  const entries =
    pathRemap instanceof Map ? [...pathRemap.entries()] : Object.entries(pathRemap);
  const out = new Map<string, string>();
  for (const [from, to] of entries) {
    const oldPath = normalizeWikiImagePath(from);
    const newPath = normalizeWikiImagePath(to);
    if (!oldPath || !newPath || oldPath === newPath) continue;
    out.set(oldPath, newPath);
  }
  return out;
}

/**
 * Replace wiki image paths in markdown when duplicate files are removed.
 * Preserves size/background options on each token.
 */
export function rewriteWikiImagePathsInMarkdown(
  markdown: string,
  pathRemap: ReadonlyMap<string, string> | Record<string, string>,
): { markdown: string; updated: boolean } {
  const remap = buildNormalizedPathRemap(pathRemap);
  if (!remap.size) return { markdown, updated: false };

  const source = String(markdown ?? '');
  let updated = false;
  const re = new RegExp(WIKI_IMAGE_RE.source, 'g');
  const next = source.replace(re, (full, rawInner: string) => {
    const parsed = parseWikiImageInner(rawInner);
    if (!parsed?.path) return full;
    const nextPath = remap.get(normalizeWikiImagePath(parsed.path));
    if (!nextPath) return full;
    updated = true;
    return wikiImageMarkupFromAttrs({
      path: nextPath,
      width: parsed.width,
      height: parsed.height,
      background: parsed.background,
    });
  });
  return { markdown: next, updated };
}

/**
 * Scan vault markdown and rewrite references to paths being deleted.
 * @returns paths of files that were written.
 */
export async function rewriteDuplicateImageReferencesInVault(params: {
  tree: StorageTreeNode[] | null | undefined;
  pathRemap: Record<string, string>;
  readText: (path: string) => Promise<string>;
  writeText: (path: string, text: string) => Promise<void>;
  signal?: AbortSignal;
}): Promise<string[]> {
  const remap = buildNormalizedPathRemap(params.pathRemap);
  if (!remap.size) return [];

  const mdPaths = collectMarkdownPaths(params.tree);
  const updatedPaths: string[] = [];
  await mapPool(
    mdPaths,
    6,
    async (mdPath) => {
      if (params.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      try {
        const text = await params.readText(mdPath);
        const { markdown, updated } = rewriteWikiImagePathsInMarkdown(text, remap);
        if (!updated) return;
        await params.writeText(mdPath, markdown);
        updatedPaths.push(mdPath);
      } catch {
        // skip unreadable
      }
    },
    { signal: params.signal },
  );
  return updatedPaths;
}

export function extractWikiImagePaths(markdown: string): string[] {
  const paths: string[] = [];
  const re = new RegExp(WIKI_IMAGE_RE.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(String(markdown || ''))) !== null) {
    const parsed = parseWikiImageInner(match[1] ?? '');
    const p = parsed?.path;
    if (!p) continue;
    paths.push(normalizeWikiImagePath(p));
  }
  return paths;
}

export function findUnusedImages(params: {
  images: ImageFileEntry[];
  referencedPaths: Iterable<string>;
}): ImageFileEntry[] {
  const refs = new Set(
    [...params.referencedPaths].map((p) => normalizeWikiImagePath(p)).filter(Boolean),
  );
  const unused = params.images.filter((img) => !refs.has(normalizeWikiImagePath(img.path)));
  unused.sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
  return unused;
}

export type DuplicateImageGroup = {
  hash: string;
  size: number;
  files: ImageFileEntry[];
  /** Default keep: lexicographically first path. */
  keepPath: string;
};

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const digest = await crypto.subtle.digest('SHA-256', copy);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Group images with identical content (SHA-256). Size-buckets first; only buckets with 2+ files are hashed.
 */
export async function findDuplicateImageGroups(
  files: ImageFileEntry[],
  readBytes: (path: string) => Promise<Uint8Array>,
  options?: {
    signal?: AbortSignal;
    onProgress?: (done: number, total: number) => void;
  },
): Promise<DuplicateImageGroup[]> {
  const bySize = new Map<number, ImageFileEntry[]>();
  for (const f of files) {
    const size = f.size ?? 0;
    if (size <= 0) continue;
    const list = bySize.get(size);
    if (list) list.push(f);
    else bySize.set(size, [f]);
  }

  const candidates: ImageFileEntry[] = [];
  for (const list of bySize.values()) {
    if (list.length >= 2) candidates.push(...list);
  }

  const total = candidates.length;
  let done = 0;
  options?.onProgress?.(0, total);

  const byHash = new Map<string, ImageFileEntry[]>();
  for (const file of candidates) {
    if (options?.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    try {
      const bytes = await readBytes(file.path);
      const hash = await sha256Hex(bytes);
      const list = byHash.get(hash);
      if (list) list.push(file);
      else byHash.set(hash, [file]);
    } catch {
      // skip unreadable
    }
    done += 1;
    options?.onProgress?.(done, total);
  }

  const groups: DuplicateImageGroup[] = [];
  for (const [hash, groupFiles] of byHash) {
    if (groupFiles.length < 2) continue;
    const sorted = [...groupFiles].sort((a, b) => a.path.localeCompare(b.path));
    groups.push({
      hash,
      size: sorted[0]?.size ?? 0,
      files: sorted,
      keepPath: sorted[0]!.path,
    });
  }
  groups.sort((a, b) => b.size * b.files.length - a.size * a.files.length);
  return groups;
}

/** Prefix for companion images of an md note (with trailing slash). */
export function companionImagePrefixForMd(mdPath: string): string {
  const base = String(buildEditorImagePathPrefix(mdPath) || '.images/note').replace(/\/+$/, '');
  return `${base}/`;
}

/**
 * Collect file keys under a storage prefix from an in-memory tree.
 */
export function collectFileKeysUnderPrefix(
  tree: StorageTreeNode[] | null | undefined,
  prefix: string,
): string[] {
  const pref = normalizeStoragePath(prefix).replace(/\/+$/, '');
  if (!pref) return [];
  const out: string[] = [];
  walkFiles(tree, (node) => {
    const path = normalizeStoragePath(node.path || '');
    if (path === pref || path.startsWith(`${pref}/`)) out.push(path);
  });
  return out;
}

/**
 * Collect markdown paths under a folder node (inclusive of nested files).
 */
export function collectMarkdownPathsUnderFolder(
  tree: StorageTreeNode[] | null | undefined,
  folderPath: string,
): string[] {
  const folder = normalizeStoragePath(folderPath).replace(/\/+$/, '');
  if (!folder) return collectMarkdownPaths(tree);
  const out: string[] = [];
  walkFiles(tree, (node) => {
    const path = normalizeStoragePath(node.path || '');
    const name = node.name || path.split('/').pop() || path;
    if (!isMarkdownFileName(name)) return;
    if (path === folder || path.startsWith(`${folder}/`)) out.push(path);
  });
  return out;
}

/**
 * Companion `.images/…` keys for a note or folder delete (auto orphan policy).
 * Missing prefixes yield empty lists (safe to ignore).
 * Paths under `.trash/` resolve companions under `.trash/.images/…` as well.
 */
export function collectCompanionImageKeysForDelete(
  node: { type?: string; path?: string; name?: string },
  tree: StorageTreeNode[] | null | undefined,
): string[] {
  const path = normalizeStoragePath(node.path || '');
  if (!path) return [];

  const inTrash = isTrashPath(path);
  const logicalPath = inTrash ? path.replace(/^\.trash\//, '') : path;
  if (!logicalPath || logicalPath === '.trash') return [];

  const seen = new Set<string>();
  const addPrefix = (mdPath: string) => {
    const logicalMd = inTrash ? mdPath.replace(/^\.trash\//, '') : mdPath;
    const prefix = companionImagePrefixForMd(logicalMd);
    const candidates = inTrash ? [`.trash/${prefix}`, prefix] : [prefix];
    for (const p of candidates) {
      for (const key of collectFileKeysUnderPrefix(tree, p)) {
        seen.add(key);
      }
    }
  };

  if (node.type === 'folder') {
    for (const md of collectMarkdownPathsUnderFolder(tree, path)) {
      addPrefix(md);
    }
  } else {
    const name = node.name || path.split('/').pop() || path;
    if (!isMarkdownFileName(name)) return [];
    addPrefix(path);
  }

  return [...seen];
}

/**
 * Run map with limited concurrency.
 */
export async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
  options?: { signal?: AbortSignal; onProgress?: (done: number, total: number) => void },
): Promise<R[]> {
  const total = items.length;
  const results = new Array<R>(total);
  let nextIndex = 0;
  let done = 0;
  options?.onProgress?.(0, total);

  const workers = Array.from({ length: Math.max(1, Math.min(concurrency, total || 1)) }, async () => {
    while (true) {
      if (options?.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      const i = nextIndex;
      nextIndex += 1;
      if (i >= total) return;
      results[i] = await mapper(items[i]!, i);
      done += 1;
      options?.onProgress?.(done, total);
    }
  });

  await Promise.all(workers);
  return results;
}
