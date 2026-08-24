/**
 * Lucivy-wasm backend for Advanced Search (OPFS + LUCE snapshots).
 * Loaded only when indexing is enabled and cross-origin isolation is ready.
 */

import { isSearchIsolationReady, searchIsolationBlockedReason } from './isolation';

export const LUCIVY_OPFS_PATH = '/s3haim-advanced-search';

export const LUCIVY_FIELDS = [
  { name: 'title', type: 'text' },
  { name: 'body', type: 'text' },
  { name: 'path', type: 'text' },
  { name: 'kind', type: 'text' },
  { name: 'dateStr', type: 'text' },
] as const;

export type LucivyDocFields = {
  title: string;
  body: string;
  path: string;
  kind: string;
  dateStr?: string;
};

export type LucivySearchHit = {
  docId: number;
  score: number;
  fields?: Record<string, string>;
};

type LucivyIndexApi = {
  add: (docId: number, fields: Record<string, string>) => Promise<unknown>;
  update: (docId: number, fields: Record<string, string>) => Promise<unknown>;
  remove: (docId: number) => Promise<unknown>;
  commit: () => Promise<unknown>;
  search: (
    query: unknown,
    options?: { limit?: number; highlights?: boolean; fields?: boolean },
  ) => Promise<unknown>;
  exportSnapshot: () => Promise<Uint8Array | ArrayBuffer>;
  close: () => Promise<unknown>;
  destroy: () => Promise<unknown>;
};

type LucivyRuntimeApi = {
  ready: Promise<unknown>;
  create: (
    path: string,
    fields: Array<{ name: string; type: string }>,
    stemmer?: string,
  ) => Promise<LucivyIndexApi>;
  open: (path: string) => Promise<LucivyIndexApi>;
  importSnapshot: (data: Uint8Array, path: string) => Promise<LucivyIndexApi>;
  terminate: () => void;
};

type LucivyModule = {
  Lucivy: new (workerUrl: string) => LucivyRuntimeApi;
};

let lucivyMod: LucivyModule | null = null;
let runtime: LucivyRuntimeApi | null = null;
let indexHandle: LucivyIndexApi | null = null;

function workerScriptUrl(): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  return new URL(`${base}lucivy/js/lucivy-worker.js`, window.location.origin).href;
}

async function loadLucivyModule(): Promise<LucivyModule> {
  if (lucivyMod) return lucivyMod;
  lucivyMod = (await import('lucivy-wasm')) as LucivyModule;
  return lucivyMod;
}

export function isLucivyOpen(): boolean {
  return indexHandle != null;
}

export async function ensureLucivyRuntime(): Promise<LucivyRuntimeApi> {
  if (!isSearchIsolationReady()) {
    throw new Error(searchIsolationBlockedReason() || 'Search isolation unavailable');
  }
  if (runtime) return runtime;
  const mod = await loadLucivyModule();
  runtime = new mod.Lucivy(workerScriptUrl());
  await runtime.ready;
  return runtime;
}

export async function openOrCreateLucivyIndex(
  snapshot: Uint8Array | null,
): Promise<LucivyIndexApi> {
  const lucivy = await ensureLucivyRuntime();
  if (indexHandle) {
    try {
      await indexHandle.close();
    } catch {
      // ignore
    }
    indexHandle = null;
  }

  if (snapshot && snapshot.byteLength > 0) {
    indexHandle = await lucivy.importSnapshot(snapshot, LUCIVY_OPFS_PATH);
    return indexHandle;
  }

  try {
    indexHandle = await lucivy.open(LUCIVY_OPFS_PATH);
    return indexHandle;
  } catch {
    indexHandle = await lucivy.create(LUCIVY_OPFS_PATH, [...LUCIVY_FIELDS], '');
    return indexHandle;
  }
}

export function getLucivyIndex(): LucivyIndexApi | null {
  return indexHandle;
}

export async function requireLucivyIndex(): Promise<LucivyIndexApi> {
  if (indexHandle) return indexHandle;
  return openOrCreateLucivyIndex(null);
}

function fieldsRecord(fields: LucivyDocFields): Record<string, string> {
  const out: Record<string, string> = {
    title: fields.title,
    body: fields.body,
    path: fields.path,
    kind: fields.kind,
  };
  if (fields.dateStr) out.dateStr = fields.dateStr;
  return out;
}

export async function lucivyAdd(
  numericId: number,
  fields: LucivyDocFields,
): Promise<void> {
  const index = await requireLucivyIndex();
  await index.add(numericId, fieldsRecord(fields));
}

export async function lucivyUpdate(
  numericId: number,
  fields: LucivyDocFields,
): Promise<void> {
  const index = await requireLucivyIndex();
  await index.update(numericId, fieldsRecord(fields));
}

export async function lucivyRemove(numericId: number): Promise<void> {
  const index = await requireLucivyIndex();
  await index.remove(numericId);
}

export async function lucivyCommit(): Promise<void> {
  const index = await requireLucivyIndex();
  await index.commit();
}

export async function lucivyExportSnapshot(): Promise<Uint8Array> {
  const index = await requireLucivyIndex();
  const snap = await index.exportSnapshot();
  if (snap instanceof Uint8Array) return snap;
  return new Uint8Array(snap);
}

export async function lucivySearch(
  query: Record<string, unknown>,
  options: { limit?: number; fields?: boolean } = {},
): Promise<LucivySearchHit[]> {
  const index = await requireLucivyIndex();
  const raw = await index.search(query, {
    limit: options.limit ?? 50,
    fields: options.fields ?? false,
  });
  if (!Array.isArray(raw)) return [];
  return raw.map((r: { docId?: number; score?: number; fields?: Record<string, string> }) => ({
    docId: Number(r.docId) || 0,
    score: Number(r.score) || 0,
    ...(r.fields ? { fields: r.fields } : {}),
  }));
}

/** Build AND-of-contains query (legacy postings AND semantics). */
export function buildContainsAndQuery(
  field: string,
  terms: string[],
): Record<string, unknown> | null {
  const cleaned = terms.map((t) => String(t || '').trim()).filter((t) => t.length >= 1);
  if (cleaned.length === 0) return null;
  if (cleaned.length === 1) {
    return { type: 'contains', field, value: cleaned[0] };
  }
  return {
    type: 'boolean',
    must: cleaned.map((value) => ({ type: 'contains', field, value })),
  };
}

export async function destroyLucivyIndex(): Promise<void> {
  if (indexHandle) {
    try {
      await indexHandle.destroy();
    } catch {
      // ignore
    }
    indexHandle = null;
  }
}

export function terminateLucivyRuntime(): void {
  indexHandle = null;
  if (runtime) {
    try {
      runtime.terminate();
    } catch {
      // ignore
    }
    runtime = null;
  }
}
