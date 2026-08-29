import { gzip, gunzip, gunzipSync, strToU8 } from 'fflate';
import {
  docsKey,
  luceKey,
  manifestKey,
  postingsKey,
  advancedSearchFolderPrefix,
} from '@/utils/advancedSearch/paths';
import { loadDocsMapFromGzip } from '@/utils/advancedSearch/loadIndexDocsAsync';
import {
  emptyIndex,
  emptyManifest,
  INDEX_SCHEMA_VERSION,
  type DocMeta,
  type IndexManifest,
  type InMemoryIndex,
} from '@/utils/advancedSearch/types';

/** Minimal storage backend surface used by Advanced Search. */
export type AdvancedSearchBackend = {
  isReady?: () => boolean;
  readText?: (path: string) => Promise<{ text: string }>;
  readBytes?: (path: string) => Promise<{ body: Uint8Array }>;
  writeText?: (path: string, text: string, contentType?: string) => Promise<void>;
  writeBytes?: (
    path: string,
    body: Uint8Array | string,
    contentType?: string,
  ) => Promise<void>;
  delete?: (path: string) => Promise<void>;
  deletePrefix?: (prefix: string) => Promise<void>;
  listAll?: () => Promise<unknown[]>;
  mkdir?: (path: string) => Promise<void>;
};

function gzipJsonAsync(value: unknown): Promise<Uint8Array> {
  const json = JSON.stringify(value);
  const input = strToU8(json);
  return new Promise((resolve, reject) => {
    gzip(input, { level: 6 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

/** Public alias for callers that need gzipped JSON bytes. */
export function gzipJsonBytes(value: unknown): Promise<Uint8Array> {
  return gzipJsonAsync(value);
}

function gzipBytesAsync(input: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    gzip(input, { level: 6 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export function gunzipBytes(body: Uint8Array): Uint8Array {
  return gunzipSync(body);
}

/** Async gunzip so startup index load does not block the UI thread. */
export function gunzipBytesAsync(body: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    gunzip(body, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export function docsToObject(
  docs: Map<string, DocMeta>,
): Record<string, DocMeta> {
  const out: Record<string, DocMeta> = {};
  for (const [id, meta] of docs) out[id] = meta;
  return out;
}

export async function docsToObjectAsync(
  docs: Map<string, DocMeta>,
  yieldEvery = 200,
): Promise<Record<string, DocMeta>> {
  const out: Record<string, DocMeta> = {};
  let i = 0;
  for (const [id, meta] of docs) {
    out[id] = meta;
    i += 1;
    if (i % yieldEvery === 0) {
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }
  return out;
}

export function objectToDocs(
  obj: Record<string, DocMeta> | null | undefined,
): Map<string, DocMeta> {
  const map = new Map<string, DocMeta>();
  if (!obj || typeof obj !== 'object') return map;
  for (const [id, meta] of Object.entries(obj)) {
    if (!meta || typeof meta !== 'object') continue;
    map.set(id, meta);
  }
  return map;
}

export async function objectToDocsAsync(
  obj: Record<string, DocMeta> | null | undefined,
  yieldEvery = 200,
): Promise<Map<string, DocMeta>> {
  const map = new Map<string, DocMeta>();
  if (!obj || typeof obj !== 'object') return map;
  let i = 0;
  for (const [id, meta] of Object.entries(obj)) {
    if (!meta || typeof meta !== 'object') continue;
    map.set(id, meta);
    i += 1;
    if (i % yieldEvery === 0) {
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }
  return map;
}

/** Absolute path to vault-relative key when backend exposes `vaultRoot` (Tauri local). */
export function resolveVaultAbsPath(
  backend: AdvancedSearchBackend,
  relPath: string,
): string | null {
  const root = (backend as { vaultRoot?: string }).vaultRoot;
  if (!root) return null;
  const base = String(root).replace(/[/\\]+$/, '');
  const rel = String(relPath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  if (!rel) return base;
  return `${base}/${rel}`.replace(/\\/g, '/');
}

async function readDocsGzipMap(
  backend: AdvancedSearchBackend,
  path: string,
): Promise<Map<string, DocMeta> | null> {
  if (!backend.readBytes) return null;
  try {
    const { body } = await backend.readBytes(path);
    return loadDocsMapFromGzip(body);
  } catch {
    return null;
  }
}

async function writeGzipJson(
  backend: AdvancedSearchBackend,
  path: string,
  value: unknown,
): Promise<void> {
  if (!backend.writeBytes) {
    throw new Error('Storage backend cannot write bytes');
  }
  const compressed = await gzipJsonAsync(value);
  await backend.writeBytes(path, compressed, 'application/gzip');
}

export type LoadDocsOptions = {
  /** Skip reading LUCE bytes (Tauri opens snapshot from disk path instead). */
  skipLuceBytes?: boolean;
};

export async function loadManifestFromVault(
  backend: AdvancedSearchBackend,
): Promise<IndexManifest | null> {
  if (typeof backend.isReady === 'function' && !backend.isReady()) return null;
  try {
    if (!backend.readText) return null;
    const { text } = await backend.readText(manifestKey());
    const manifest = JSON.parse(text) as IndexManifest;
    if (manifest.schemaVersion !== INDEX_SCHEMA_VERSION) return null;
    return manifest;
  } catch {
    return null;
  }
}

export async function loadDocsAndManifestFromVault(
  backend: AdvancedSearchBackend,
  options: LoadDocsOptions = {},
): Promise<{
  index: InMemoryIndex;
  luceGz: Uint8Array | null;
  luceSnapshotAbsPath: string | null;
}> {
  const index = emptyIndex();
  if (typeof backend.isReady === 'function' && !backend.isReady()) {
    return { index, luceGz: null, luceSnapshotAbsPath: null };
  }

  let manifest: IndexManifest | null = null;
  try {
    if (backend.readText) {
      const { text } = await backend.readText(manifestKey());
      manifest = JSON.parse(text) as IndexManifest;
    }
  } catch {
    manifest = null;
  }

  if (!manifest || manifest.schemaVersion !== INDEX_SCHEMA_VERSION) {
    return { index, luceGz: null, luceSnapshotAbsPath: null };
  }

  const docsMap = await readDocsGzipMap(backend, docsKey());
  let luceGz: Uint8Array | null = null;
  const luceSnapshotAbsPath = resolveVaultAbsPath(backend, luceKey());
  if (!options.skipLuceBytes && backend.readBytes) {
    try {
      const { body } = await backend.readBytes(luceKey());
      luceGz = body;
    } catch {
      luceGz = null;
    }
  }

  index.manifest = {
    ...emptyManifest(),
    ...manifest,
    schemaVersion: INDEX_SCHEMA_VERSION,
    initialized:
      manifest.initialized === true ||
      (docsMap != null && docsMap.size > 0),
  };
  index.docs = docsMap ?? new Map();
  return { index, luceGz, luceSnapshotAbsPath };
}

/** @deprecated use loadDocsAndManifestFromVault + Lucivy import */
export async function loadIndexFromVault(
  backend: AdvancedSearchBackend,
): Promise<InMemoryIndex> {
  const { index } = await loadDocsAndManifestFromVault(backend);
  return index;
}

export async function saveIndexToVault(
  backend: AdvancedSearchBackend,
  index: InMemoryIndex,
  luceSnapshot: Uint8Array,
): Promise<void> {
  if (!backend.writeText || !backend.writeBytes) {
    throw new Error('Storage backend cannot persist advanced search index');
  }
  try {
    await backend.mkdir?.(advancedSearchFolderPrefix().replace(/\/$/, ''));
  } catch {
    // ignore — S3/WebDAV may not need explicit mkdir
  }
  await backend.writeText(
    manifestKey(),
    JSON.stringify(index.manifest, null, 2),
    'application/json; charset=utf-8',
  );
  await new Promise<void>((r) => setTimeout(r, 0));
  const docsObj = await docsToObjectAsync(index.docs);
  await writeGzipJson(backend, docsKey(), docsObj);
  await new Promise<void>((r) => setTimeout(r, 0));
  const luceGz = await gzipBytesAsync(luceSnapshot);
  await backend.writeBytes(luceKey(), luceGz, 'application/gzip');
  // Drop legacy v1 postings if present
  try {
    await backend.delete?.(postingsKey());
  } catch {
    // ignore
  }
}

export async function clearIndexInVault(
  backend: AdvancedSearchBackend,
): Promise<void> {
  if (backend.deletePrefix) {
    try {
      await backend.deletePrefix(advancedSearchFolderPrefix());
      return;
    } catch {
      // fall through to per-key delete
    }
  }
  for (const key of [manifestKey(), docsKey(), luceKey(), postingsKey()]) {
    try {
      await backend.delete?.(key);
    } catch {
      // ignore missing
    }
  }
}

export async function readLuceSnapshotFromVault(
  backend: AdvancedSearchBackend,
): Promise<Uint8Array | null> {
  if (!backend.readBytes) return null;
  try {
    const { body } = await backend.readBytes(luceKey());
    if (!body?.byteLength) return null;
    return gunzipBytes(body);
  } catch {
    return null;
  }
}
