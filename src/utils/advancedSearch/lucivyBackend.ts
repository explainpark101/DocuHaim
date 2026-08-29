/**
 * Lucivy backend for Advanced Search.
 * - Web/PWA: lucivy-wasm (OPFS + SharedArrayBuffer / COOP+COEP)
 * - Tauri: native lucivy-core via invoke (no isolation required)
 */

import { isSearchIsolationReady, searchIsolationBlockedReason } from '@/utils/advancedSearch/isolation';
import { isTauriIndexBackendAvailable } from '@/utils/advancedSearch/tauriIndexBackend';

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
/** True when the open index is the Tauri native session (not wasm). */
let nativeOpen = false;

function useNative(): boolean {
  return isTauriIndexBackendAvailable();
}

function workerScriptUrl(): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  return new URL(`${base}lucivy/js/lucivy-worker.js`, window.location.origin).href;
}

async function loadLucivyModule(): Promise<LucivyModule> {
  if (lucivyMod) return lucivyMod;
  lucivyMod = (await import('lucivy-wasm')) as LucivyModule;
  return lucivyMod;
}

async function tauriApi() {
  return import('./tauriIndexBackend');
}

export function isLucivyOpen(): boolean {
  if (useNative()) {
    return nativeOpen;
  }
  return indexHandle != null;
}

export async function ensureLucivyRuntime(): Promise<LucivyRuntimeApi | null> {
  if (useNative()) return null;
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
): Promise<LucivyIndexApi | null> {
  if (useNative()) {
    const api = await tauriApi();
    await api.openTauriIndexSession(snapshot);
    nativeOpen = true;
    indexHandle = null;
    return null;
  }

  const lucivy = await ensureLucivyRuntime();
  if (!lucivy) throw new Error('Lucivy runtime unavailable');
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

export async function requireLucivyIndex(): Promise<LucivyIndexApi | null> {
  if (useNative()) {
    if (!nativeOpen) await openOrCreateLucivyIndex(null);
    return null;
  }
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
  if (useNative()) {
    const api = await tauriApi();
    await api.tauriUpsertDoc(numericId, fields);
    return;
  }
  const index = await requireLucivyIndex();
  if (!index) throw new Error('Lucivy index not open');
  await index.add(numericId, fieldsRecord(fields));
}

export async function lucivyUpdate(
  numericId: number,
  fields: LucivyDocFields,
): Promise<void> {
  if (useNative()) {
    const api = await tauriApi();
    await api.tauriUpsertDoc(numericId, fields);
    return;
  }
  const index = await requireLucivyIndex();
  if (!index) throw new Error('Lucivy index not open');
  await index.update(numericId, fieldsRecord(fields));
}

export async function lucivyRemove(numericId: number): Promise<void> {
  if (useNative()) {
    const api = await tauriApi();
    await api.tauriRemove(numericId);
    return;
  }
  const index = await requireLucivyIndex();
  if (!index) throw new Error('Lucivy index not open');
  await index.remove(numericId);
}

export async function lucivyCommit(): Promise<void> {
  if (useNative()) {
    const api = await tauriApi();
    await api.tauriCommit();
    return;
  }
  const index = await requireLucivyIndex();
  if (!index) throw new Error('Lucivy index not open');
  await index.commit();
}

export async function lucivyExportSnapshot(): Promise<Uint8Array> {
  if (useNative()) {
    const api = await tauriApi();
    return api.tauriExportSnapshot();
  }
  const index = await requireLucivyIndex();
  if (!index) throw new Error('Lucivy index not open');
  const snap = await index.exportSnapshot();
  if (snap instanceof Uint8Array) return snap;
  return new Uint8Array(snap);
}

function extractContainsAndTerms(
  query: Record<string, unknown>,
): { field: string; terms: string[] } | null {
  const type = String(query.type || '');
  if (type === 'contains') {
    const field = String(query.field || '');
    const value = String(query.value || '').trim();
    if (!field || !value) return null;
    return { field, terms: [value] };
  }
  if (type === 'boolean' && Array.isArray(query.must)) {
    const terms: string[] = [];
    let field = '';
    for (const raw of query.must) {
      if (!raw || typeof raw !== 'object') continue;
      const sub = raw as Record<string, unknown>;
      if (String(sub.type || '') !== 'contains') continue;
      const f = String(sub.field || '');
      const value = String(sub.value || '').trim();
      if (!value) continue;
      if (!field) field = f;
      terms.push(value);
    }
    if (field && terms.length > 0) return { field, terms };
  }
  return null;
}

export async function lucivySearch(
  query: Record<string, unknown>,
  options: { limit?: number; fields?: boolean } = {},
): Promise<LucivySearchHit[]> {
  if (useNative()) {
    const extracted = extractContainsAndTerms(query);
    if (!extracted) return [];
    const api = await tauriApi();
    return api.tauriSearchContainsAnd(
      extracted.field,
      extracted.terms,
      options.limit ?? 50,
    );
  }
  const index = await requireLucivyIndex();
  if (!index) return [];
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
  if (useNative()) {
    const api = await tauriApi();
    await api.closeTauriIndexSession();
    nativeOpen = false;
    return;
  }
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
  if (useNative()) {
    void tauriApi().then((api) => {
      api.terminateTauriIndexRuntime();
    });
    nativeOpen = false;
    return;
  }
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

/** Request cancel on the native index session (no-op on wasm). */
export async function lucivyCancelNative(): Promise<void> {
  if (!useNative()) return;
  const api = await tauriApi();
  await api.tauriCancelIndex();
}
