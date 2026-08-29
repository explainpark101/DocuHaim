import { getObjectBody, headObject, putObject } from '@/utils/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';
import { isSystemIndexExcludedFolder } from '@/utils/advancedSearch/paths';

/** Haim vault path — shared across devices for the same storage root. */
export const ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY =
  '.settings/advanced-search-exclude-folders.json';

const LOCAL_STORAGE_KEY = 's3haim_advanced_search_exclude_folders';

export const ADVANCED_SEARCH_EXCLUDE_FOLDERS_CHANGED_EVENT =
  's3haim-advanced-search-exclude-folders-changed';

export type AdvancedSearchExcludeFoldersSettings = {
  version: 1;
  folders: string[];
};

export const DEFAULT_ADVANCED_SEARCH_EXCLUDE_FOLDERS_SETTINGS: AdvancedSearchExcludeFoldersSettings =
  {
    version: 1,
    folders: [],
  };

type WebdavConfig = {
  endpoint: string;
  username: string;
  password: string;
  basePath: string;
};

type StoreState = {
  getS3Client: (() => unknown) | null;
  s3Creds: { bucket?: string } | null;
  localRootHandle: FileSystemDirectoryHandle | null;
  storageMode: string;
  webdavConfig: WebdavConfig | null;
  cached: AdvancedSearchExcludeFoldersSettings;
};

const store: StoreState = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
  cached: { ...DEFAULT_ADVANCED_SEARCH_EXCLUDE_FOLDERS_SETTINGS, folders: [] },
};

/** Normalize vault-relative folder path (no leading/trailing slashes). */
export function normalizeExcludeFolderPath(path: string): string {
  return String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .trim();
}

/**
 * Sort + dedupe + drop folders already covered by a parent entry.
 * Selecting a folder implies all descendants are excluded.
 */
export function normalizeExcludeFolders(
  paths: readonly string[] | null | undefined,
): string[] {
  const cleaned = (paths || [])
    .map(normalizeExcludeFolderPath)
    .filter(Boolean)
    .filter((p) => !isSystemIndexExcludedFolder(p));
  cleaned.sort((a, b) => a.localeCompare(b));
  const out: string[] = [];
  for (const p of cleaned) {
    if (out.some((parent) => p === parent || p.startsWith(`${parent}/`))) {
      continue;
    }
    out.push(p);
  }
  return out;
}

/** True when `path` is the folder itself or any descendant. */
export function isPathUnderExcludedFolders(
  path: string,
  folders: readonly string[],
): boolean {
  const p = normalizeExcludeFolderPath(path);
  if (!p || folders.length === 0) return false;
  for (const folder of folders) {
    if (!folder) continue;
    if (p === folder || p.startsWith(`${folder}/`)) return true;
  }
  return false;
}

/** Add a folder; remove redundant children; no-op if already covered by a parent. */
export function addExcludeFolder(
  current: readonly string[],
  path: string,
): string[] {
  const next = normalizeExcludeFolderPath(path);
  if (!next) return normalizeExcludeFolders(current);
  if (isSystemIndexExcludedFolder(next)) {
    return normalizeExcludeFolders(current);
  }
  if (isPathUnderExcludedFolders(next, current)) {
    return normalizeExcludeFolders(current);
  }
  const withoutChildren = current.filter(
    (f) => f !== next && !f.startsWith(`${next}/`),
  );
  return normalizeExcludeFolders([...withoutChildren, next]);
}

export function removeExcludeFolder(
  current: readonly string[],
  path: string,
): string[] {
  const target = normalizeExcludeFolderPath(path);
  return normalizeExcludeFolders(current.filter((f) => f !== target));
}

export function setAdvancedSearchExcludeFoldersStore(payload: {
  getS3Client?: (() => unknown) | null;
  s3Creds?: { bucket?: string } | null;
  localRootHandle?: FileSystemDirectoryHandle | null;
  storageMode?: string;
  webdavConfig?: WebdavConfig | null | Record<string, unknown>;
}): void {
  if (!payload) return;
  if (payload.getS3Client !== undefined) store.getS3Client = payload.getS3Client;
  if (payload.s3Creds !== undefined) store.s3Creds = payload.s3Creds;
  if (payload.localRootHandle !== undefined) {
    store.localRootHandle = payload.localRootHandle;
  }
  if (payload.storageMode !== undefined) store.storageMode = payload.storageMode;
  if (payload.webdavConfig !== undefined) {
    store.webdavConfig = (payload.webdavConfig as WebdavConfig | null) ?? null;
  }
}

export function getCachedAdvancedSearchExcludeFolders(): string[] {
  return [...store.cached.folders];
}

function parseExcludeFoldersSettings(raw: unknown): AdvancedSearchExcludeFoldersSettings {
  if (Array.isArray(raw)) {
    return {
      version: 1,
      folders: normalizeExcludeFolders(
        raw.filter((x): x is string => typeof x === 'string'),
      ),
    };
  }
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_ADVANCED_SEARCH_EXCLUDE_FOLDERS_SETTINGS, folders: [] };
  }
  const o = raw as Record<string, unknown>;
  const foldersRaw = Array.isArray(o.folders) ? o.folders : [];
  return {
    version: 1,
    folders: normalizeExcludeFolders(
      foldersRaw.filter((x): x is string => typeof x === 'string'),
    ),
  };
}

function loadFromLocalStorage(): AdvancedSearchExcludeFoldersSettings | null {
  try {
    const raw =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(LOCAL_STORAGE_KEY)
        : null;
    if (!raw) return null;
    return parseExcludeFoldersSettings(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveToLocalStorage(settings: AdvancedSearchExcludeFoldersSettings): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings.folders));
  } catch {
    /* ignore quota */
  }
}

export function notifyAdvancedSearchExcludeFoldersChanged(
  settings: AdvancedSearchExcludeFoldersSettings,
): void {
  store.cached = settings;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(ADVANCED_SEARCH_EXCLUDE_FOLDERS_CHANGED_EVENT, {
      detail: settings,
    }),
  );
}

async function loadFromWebdav(): Promise<AdvancedSearchExcludeFoldersSettings | null> {
  const cfg = store.webdavConfig;
  if (!cfg?.endpoint || !cfg?.username) return null;
  try {
    const backend = createWebdavBackend(cfg);
    const head = await backend.head(ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY);
    if (!head) return null;
    const { text } = await backend.readText(ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY);
    return parseExcludeFoldersSettings(JSON.parse(text));
  } catch (e) {
    console.warn('Advanced Search exclude folders load from WebDAV failed:', e);
    return null;
  }
}

async function loadFromS3(): Promise<AdvancedSearchExcludeFoldersSettings | null> {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const head = await headObject(client as any, bucket, ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY);
    if (!head) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body } = await getObjectBody(
      client as any,
      bucket,
      ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY,
    );
    const text = new TextDecoder('utf-8').decode(body);
    return parseExcludeFoldersSettings(JSON.parse(text));
  } catch (e) {
    console.warn('Advanced Search exclude folders load from S3 failed:', e);
    return null;
  }
}

async function loadFromLocal(): Promise<AdvancedSearchExcludeFoldersSettings | null> {
  const localHandle = store.localRootHandle;
  if (!localHandle) return null;
  try {
    const settingsDir = await localHandle.getDirectoryHandle('.settings', {
      create: false,
    });
    const fileHandle = await settingsDir.getFileHandle(
      'advanced-search-exclude-folders.json',
      { create: false },
    );
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseExcludeFoldersSettings(JSON.parse(text));
  } catch (e) {
    if ((e as { name?: string })?.name !== 'NotFound') {
      console.warn('Advanced Search exclude folders load from local failed:', e);
    }
    return null;
  }
}

async function writeRemote(settings: AdvancedSearchExcludeFoldersSettings): Promise<void> {
  const payload = JSON.stringify(settings, null, 2);
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (cfg?.endpoint && cfg?.username) {
      const backend = createWebdavBackend(cfg);
      await backend.writeText(
        ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY,
        payload,
        'application/json',
      );
    }
  } else if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (localHandle) {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', {
        create: true,
      });
      const fileHandle = await settingsDir.getFileHandle(
        'advanced-search-exclude-folders.json',
        { create: true },
      );
      const writable = await fileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
    }
  } else {
    const client =
      typeof store.getS3Client === 'function' ? store.getS3Client() : null;
    const bucket = store.s3Creds?.bucket;
    if (client && bucket) {
      await putObject(client as never, {
        Bucket: bucket,
        Key: ADVANCED_SEARCH_EXCLUDE_FOLDERS_JSON_KEY,
        Body: payload,
        ContentType: 'application/json',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    }
  }
}

export async function loadAdvancedSearchExcludeFoldersFromStorage(): Promise<string[]> {
  const fallback =
    loadFromLocalStorage() ?? {
      ...DEFAULT_ADVANCED_SEARCH_EXCLUDE_FOLDERS_SETTINGS,
      folders: [],
    };
  const mode = store.storageMode || 's3';

  let remote: AdvancedSearchExcludeFoldersSettings | null = null;
  if (mode === 'webdav') remote = await loadFromWebdav();
  else if (mode === 'local') remote = await loadFromLocal();
  else remote = await loadFromS3();

  const next = remote ?? fallback;
  store.cached = next;
  saveToLocalStorage(next);

  // One-shot migrate: browser-only list -> vault when vault file is missing.
  if (!remote && next.folders.length > 0) {
    void writeRemote(next).catch((e) => {
      console.warn('Advanced Search exclude folders migrate to vault failed:', e);
    });
  }

  return [...next.folders];
}

/** Sync read from in-memory cache (seeded from localStorage at module load). */
export function loadAdvancedSearchExcludeFolders(): string[] {
  return getCachedAdvancedSearchExcludeFolders();
}

/** Update cache + localStorage; persist to vault asynchronously. */
export function saveAdvancedSearchExcludeFolders(paths: readonly string[]): string[] {
  const folders = normalizeExcludeFolders(paths);
  const settings: AdvancedSearchExcludeFoldersSettings = { version: 1, folders };
  saveToLocalStorage(settings);
  notifyAdvancedSearchExcludeFoldersChanged(settings);
  void writeRemote(settings).catch((e) => {
    console.warn('Advanced Search exclude folders save to vault failed:', e);
  });
  return folders;
}

// Seed cache from localStorage at module load.
{
  const seeded = loadFromLocalStorage();
  if (seeded) {
    store.cached = seeded;
  }
}
