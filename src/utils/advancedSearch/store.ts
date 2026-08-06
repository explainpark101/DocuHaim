import { gzip, gunzipSync, strToU8, strFromU8 } from 'fflate';
import {
  docsKey,
  manifestKey,
  postingsKey,
  advancedSearchFolderPrefix,
} from './paths';
import {
  emptyIndex,
  emptyManifest,
  INDEX_SCHEMA_VERSION,
  type DocMeta,
  type IndexManifest,
  type InMemoryIndex,
} from './types';

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

/** Public alias for Worker / callers that need gzipped JSON bytes. */
export function gzipJsonBytes(value: unknown): Promise<Uint8Array> {
  return gzipJsonAsync(value);
}

function gunzipJson<T>(body: Uint8Array): T {
  const raw = gunzipSync(body);
  return JSON.parse(strFromU8(raw)) as T;
}

/** Hydrate an in-memory index from pre-gzipped vault blobs (Worker finalize). */
export function hydrateIndexFromBlobs(
  manifest: IndexManifest,
  postingsGz: Uint8Array,
  docsGz: Uint8Array,
): InMemoryIndex {
  const postingsObj = gunzipJson<Record<string, string[]>>(postingsGz);
  const docsObj = gunzipJson<Record<string, DocMeta>>(docsGz);
  return {
    manifest: {
      ...emptyManifest(),
      ...manifest,
      initialized: true,
    },
    postings: objectToPostings(postingsObj),
    docs: objectToDocs(docsObj),
  };
}

export function postingsToObject(
  postings: Map<string, Set<string>>,
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [term, set] of postings) {
    out[term] = Array.from(set);
  }
  return out;
}

/** Build postings payload while yielding so large indexes do not freeze the UI. */
export async function postingsToObjectAsync(
  postings: Map<string, Set<string>>,
  yieldEvery = 400,
): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {};
  let i = 0;
  for (const [term, set] of postings) {
    out[term] = Array.from(set);
    i += 1;
    if (i % yieldEvery === 0) {
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }
  return out;
}

export function objectToPostings(
  obj: Record<string, string[]> | null | undefined,
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  if (!obj || typeof obj !== 'object') return map;
  for (const [term, ids] of Object.entries(obj)) {
    if (!Array.isArray(ids) || ids.length === 0) continue;
    map.set(term, new Set(ids));
  }
  return map;
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

async function readGzipJson<T>(
  backend: AdvancedSearchBackend,
  path: string,
): Promise<T | null> {
  if (!backend.readBytes) return null;
  try {
    const { body } = await backend.readBytes(path);
    return gunzipJson<T>(body);
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

export async function loadIndexFromVault(
  backend: AdvancedSearchBackend,
): Promise<InMemoryIndex> {
  const index = emptyIndex();
  if (typeof backend.isReady === 'function' && !backend.isReady()) {
    return index;
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
    return index;
  }

  const [postingsObj, docsObj] = await Promise.all([
    readGzipJson<Record<string, string[]>>(backend, postingsKey()),
    readGzipJson<Record<string, DocMeta>>(backend, docsKey()),
  ]);

  index.manifest = {
    ...emptyManifest(),
    ...manifest,
    initialized:
      manifest.initialized === true ||
      (docsObj != null && Object.keys(docsObj).length > 0),
  };
  index.postings = objectToPostings(postingsObj);
  index.docs = objectToDocs(docsObj);
  return index;
}

export async function saveIndexToVault(
  backend: AdvancedSearchBackend,
  index: InMemoryIndex,
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
  // Yield between heavy sync steps (object build + JSON.stringify inside gzip).
  const postingsObj = await postingsToObjectAsync(index.postings);
  await new Promise<void>((r) => setTimeout(r, 0));
  await writeGzipJson(backend, postingsKey(), postingsObj);
  await new Promise<void>((r) => setTimeout(r, 0));
  const docsObj = await docsToObjectAsync(index.docs);
  await writeGzipJson(backend, docsKey(), docsObj);
}

/** Persist Worker-produced gzip blobs without re-compressing. */
export async function saveIndexBlobsToVault(
  backend: AdvancedSearchBackend,
  manifest: IndexManifest,
  postingsGz: Uint8Array,
  docsGz: Uint8Array,
): Promise<void> {
  if (!backend.writeText || !backend.writeBytes) {
    throw new Error('Storage backend cannot persist advanced search index');
  }
  try {
    await backend.mkdir?.(advancedSearchFolderPrefix().replace(/\/$/, ''));
  } catch {
    // ignore
  }
  await backend.writeText(
    manifestKey(),
    JSON.stringify(manifest, null, 2),
    'application/json; charset=utf-8',
  );
  await backend.writeBytes(postingsKey(), postingsGz, 'application/gzip');
  await backend.writeBytes(docsKey(), docsGz, 'application/gzip');
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
  for (const key of [manifestKey(), postingsKey(), docsKey()]) {
    try {
      await backend.delete?.(key);
    } catch {
      // ignore missing
    }
  }
}
