/**
 * Large-file indexing: chunk splits + rebuild queue priority.
 */

/** Lucivy body chunk size (matches tokenize cap). */
export const FILE_INDEX_CHUNK_CHARS = 80_000;

/** Known vault file sizes at or above this are indexed after smaller files. */
export const FILE_INDEX_LARGE_BYTES = 80_000;

const CHUNK_SUFFIX_RE = /#c:(\d+)$/;

export type IndexableTreeNode = {
  type?: string;
  path?: string;
  size?: number;
  children?: IndexableTreeNode[];
};

export function normalizeVaultPath(path: string): string {
  return String(path || '').replace(/^\/+/, '');
}

/**
 * Doc id for a file chunk.
 * Single-chunk files use `file:path`; multi-chunk files use `file:path#c:N`.
 */
export function fileChunkDocId(
  path: string,
  chunkIndex: number,
  totalChunks = 1,
): string {
  const p = normalizeVaultPath(path);
  if (totalChunks <= 1) return `file:${p}`;
  return `file:${p}#c:${chunkIndex}`;
}

/** Vault path from a file doc id (strips `#c:N` chunk suffix). */
export function vaultPathFromFileDocId(docId: string): string | null {
  if (!docId.startsWith('file:')) return null;
  const rest = docId.slice('file:'.length);
  const m = rest.match(CHUNK_SUFFIX_RE);
  if (m) return rest.slice(0, rest.length - m[0].length);
  return rest;
}

/** 0-based chunk index encoded in a file doc id (0 when absent). */
export function parseFileChunkIndex(docId: string): number {
  const m = docId.match(CHUNK_SUFFIX_RE);
  if (!m?.[1]) return 0;
  const n = Number.parseInt(m[1], 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function countIndexChunksForLength(length: number): number {
  const n = Math.max(0, length);
  if (n <= FILE_INDEX_CHUNK_CHARS) return 1;
  return Math.ceil(n / FILE_INDEX_CHUNK_CHARS);
}

/**
 * Split long text into index chunks. Prefers breaking at newlines near the limit.
 */
export function splitTextIntoIndexChunks(
  text: string,
  chunkSize: number = FILE_INDEX_CHUNK_CHARS,
): string[] {
  const t = String(text || '');
  if (t.length <= chunkSize) return t.length === 0 ? [''] : [t];

  const chunks: string[] = [];
  let start = 0;
  while (start < t.length) {
    let end = Math.min(start + chunkSize, t.length);
    if (end < t.length) {
      const nl = t.lastIndexOf('\n', end);
      const minBreak = start + Math.floor(chunkSize * 0.5);
      if (nl >= minBreak) end = nl + 1;
    }
    chunks.push(t.slice(start, end));
    start = end;
  }
  return chunks.length > 0 ? chunks : [''];
}

export function buildFileSizeMapFromTree(
  nodes: IndexableTreeNode[] | null | undefined,
): Map<string, number> {
  const map = new Map<string, number>();
  const walk = (list: IndexableTreeNode[] | undefined) => {
    if (!list) return;
    for (const node of list) {
      if (node.path && typeof node.size === 'number' && node.size >= 0) {
        map.set(normalizeVaultPath(node.path), node.size);
      }
      if (node.children?.length) walk(node.children);
    }
  };
  walk(nodes || []);
  return map;
}

/**
 * Order paths for indexing: smaller known files first, unknown size next,
 * known large files last (larger files later within the large tier).
 */
export function orderFilePathsForIndexing(
  paths: readonly string[],
  sizeByPath: Map<string, number>,
  largeBytes: number = FILE_INDEX_LARGE_BYTES,
): string[] {
  const unknownRank = largeBytes;
  const rank = (path: string): number => {
    const size = sizeByPath.get(normalizeVaultPath(path));
    if (size == null) return unknownRank;
    if (size >= largeBytes) return largeBytes + size;
    return size;
  };
  return [...paths].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return normalizeVaultPath(a).localeCompare(normalizeVaultPath(b), 'ko');
  });
}

export function isKnownLargeIndexFile(
  path: string,
  sizeByPath: Map<string, number>,
  largeBytes: number = FILE_INDEX_LARGE_BYTES,
): boolean {
  const size = sizeByPath.get(normalizeVaultPath(path));
  return typeof size === 'number' && size >= largeBytes;
}
