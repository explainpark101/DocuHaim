/**
 * Per-file Haim Editor view mode.
 * Web: IndexedDB (Dexie). Tauri: JSON in appDataDir (one hydrate + debounced write).
 */
import {
  HAIM_VIEW_MODE_DEFAULT,
  isHaimViewMode,
  loadHaimViewMode,
  normalizeHaimViewMode,
  type HaimViewMode,
} from '@/utils/haimViewModeSettings';

function isTauriRuntime(): boolean {
  try {
    if (import.meta.env.VITE_ELECTRON === 'true') return true;
  } catch {
    // ignore
  }
  if (typeof window === 'undefined') return false;
  try {
    return '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
  } catch {
    return false;
  }
}

const IDB_NAME = 's3haim-haim-view-mode';
const TAURI_FILE_NAME = 'haim-view-modes.json';
const TAURI_WRITE_DEBOUNCE_MS = 200;
const STORE_VERSION = 1;

export const HAIM_VIEW_MODE_FILE_CHANGED_EVENT = 's3haim-haim-view-mode-file';

export type HaimViewModeFileRecord = {
  key: string;
  mode: HaimViewMode;
  updatedAt: number;
};

type TauriPayload = {
  v: number;
  modes: Record<string, string>;
};

const memory = new Map<string, HaimViewMode>();
let hydrated = false;
let hydratePromise: Promise<void> | null = null;
let tauriWriteTimer: ReturnType<typeof setTimeout> | null = null;
let tauriWriteChain: Promise<void> = Promise.resolve();

let idbTable: {
  get: (key: string) => Promise<HaimViewModeFileRecord | undefined>;
  put: (row: HaimViewModeFileRecord) => Promise<string>;
  toArray: () => Promise<HaimViewModeFileRecord[]>;
} | null = null;

async function getIdbTable() {
  if (idbTable) return idbTable;
  try {
    const { default: Dexie } = await import('dexie');
    const db = new Dexie(IDB_NAME);
    db.version(1).stores({
      modes: 'key, updatedAt',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
    idbTable = (db as any).modes;
    return idbTable;
  } catch {
    return null;
  }
}

const FILE_TYPES = new Set(['s3', 'local', 'webdav', 'idb', 'session']);

export function getHaimViewModeFileKey(
  storageType: string,
  path: string,
): string {
  return `${storageType}:${path}`;
}

export function getHaimViewModeFileKeyFromFile(
  currentFile: { type?: string | null; id?: string | null } | null | undefined,
): string | null {
  const type = String(currentFile?.type || '').trim();
  const id = String(currentFile?.id || '').trim();
  if (!type || !id || !FILE_TYPES.has(type)) return null;
  return getHaimViewModeFileKey(type, id);
}

function mergeLoaded(entries: Iterable<[string, HaimViewMode]>): void {
  for (const [key, mode] of entries) {
    if (!key || memory.has(key)) continue;
    memory.set(key, mode);
  }
}

function parseTauriPayload(raw: string): Array<[string, HaimViewMode]> {
  try {
    const parsed = JSON.parse(raw) as TauriPayload;
    if (!parsed || typeof parsed !== 'object' || !parsed.modes) return [];
    const out: Array<[string, HaimViewMode]> = [];
    for (const [key, value] of Object.entries(parsed.modes)) {
      const mode = normalizeHaimViewMode(value);
      if (key && mode) out.push([key, mode]);
    }
    return out;
  } catch {
    return [];
  }
}

function serializeTauriPayload(): string {
  const modes: Record<string, string> = {};
  for (const [key, mode] of memory) {
    modes[key] = mode;
  }
  const payload: TauriPayload = { v: STORE_VERSION, modes };
  return JSON.stringify(payload);
}

async function hydrateFromTauri(): Promise<void> {
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const { exists, readFile } = await import('@tauri-apps/plugin-fs');
  const dir = await appDataDir();
  const filePath = await join(dir, TAURI_FILE_NAME);
  if (!(await exists(filePath))) return;
  const body = await readFile(filePath);
  const text = new TextDecoder('utf-8').decode(body);
  mergeLoaded(parseTauriPayload(text));
}

async function hydrateFromIdb(): Promise<void> {
  const table = await getIdbTable();
  if (!table) return;
  const rows = await table.toArray();
  const entries: Array<[string, HaimViewMode]> = [];
  for (const row of rows) {
    const mode = normalizeHaimViewMode(row?.mode);
    if (row?.key && mode) entries.push([row.key, mode]);
  }
  mergeLoaded(entries);
}

export function ensureHaimViewModeFileStoreHydrated(): Promise<void> {
  if (hydrated) return Promise.resolve();
  if (hydratePromise) return hydratePromise;
  hydratePromise = (async () => {
    try {
      if (isTauriRuntime()) {
        await hydrateFromTauri();
      } else {
        await hydrateFromIdb();
      }
    } catch {
      // ignore
    } finally {
      hydrated = true;
    }
  })();
  return hydratePromise;
}

async function persistTauriMap(): Promise<void> {
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const { writeFile } = await import('@tauri-apps/plugin-fs');
  const dir = await appDataDir();
  const filePath = await join(dir, TAURI_FILE_NAME);
  const body = new TextEncoder().encode(serializeTauriPayload());
  await writeFile(filePath, body);
}

function scheduleTauriPersist(): void {
  if (tauriWriteTimer) clearTimeout(tauriWriteTimer);
  tauriWriteTimer = setTimeout(() => {
    tauriWriteTimer = null;
    tauriWriteChain = tauriWriteChain
      .then(() => persistTauriMap())
      .catch(() => {
        // ignore
      });
  }, TAURI_WRITE_DEBOUNCE_MS);
}

async function persistIdbKey(key: string, mode: HaimViewMode): Promise<void> {
  const table = await getIdbTable();
  if (!table) return;
  await table.put({ key, mode, updatedAt: Date.now() });
}

function broadcastFileMode(key: string, mode: HaimViewMode): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(HAIM_VIEW_MODE_FILE_CHANGED_EVENT, {
      detail: { key, mode },
    }),
  );
}

/**
 * Sync peek: stored mode, `null` if hydrated with no override, `undefined` if unknown.
 */
export function peekHaimViewModeForFile(
  key: string | null | undefined,
): HaimViewMode | null | undefined {
  if (!key) return null;
  if (memory.has(key)) return memory.get(key) ?? null;
  if (hydrated) return null;
  return undefined;
}

export async function loadHaimViewModeForFile(
  key: string | null | undefined,
): Promise<HaimViewMode | null> {
  if (!key) return null;
  if (memory.has(key)) return memory.get(key) ?? null;
  await ensureHaimViewModeFileStoreHydrated();
  return memory.get(key) ?? null;
}

export async function saveHaimViewModeForFile(
  key: string | null | undefined,
  mode: HaimViewMode,
  options?: { broadcast?: boolean },
): Promise<void> {
  if (!key || !isHaimViewMode(mode)) return;
  memory.set(key, mode);
  const broadcast = options?.broadcast !== false;
  if (broadcast) broadcastFileMode(key, mode);
  try {
    await ensureHaimViewModeFileStoreHydrated();
    if (isTauriRuntime()) {
      scheduleTauriPersist();
    } else {
      await persistIdbKey(key, mode);
    }
  } catch {
    // ignore
  }
}

export function resolveHaimViewModeForFile(
  stored: HaimViewMode | null | undefined,
): HaimViewMode {
  if (stored && isHaimViewMode(stored)) return stored;
  if (typeof window === 'undefined') return HAIM_VIEW_MODE_DEFAULT;
  return loadHaimViewMode();
}

/** Test helper — wipe in-memory cache and hydrate flags. */
export function resetHaimViewModeFileStoreForTests(): void {
  memory.clear();
  hydrated = false;
  hydratePromise = null;
  if (tauriWriteTimer) {
    clearTimeout(tauriWriteTimer);
    tauriWriteTimer = null;
  }
}
