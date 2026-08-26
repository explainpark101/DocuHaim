import { getObjectBody, headObject, putObject } from '@/utils/vault/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend';

/**
 * Deploy template: Social Preview Inspector (HTMLRewriter OG/Twitter extract).
 * @see https://cloudflare-experiments.com/docs/experiments/social-preview-inspector
 */
export const OG_WORKER_DEPLOY_URL =
  'https://deploy.workers.cloudflare.com/?url=https://github.com/explainpark101/og/tree/main/';

export const OG_WORKER_DEPLOY_BUTTON_IMG =
  'https://deploy.workers.cloudflare.com/button';

/** Haim vault path — one worker URL per connected storage root. */
export const OG_WORKER_JSON_KEY = '.settings/og-worker.json';

const LOCAL_STORAGE_KEY = 's3haim_og_worker_url';
export const OG_WORKER_SETTINGS_CHANGED_EVENT = 's3haim-og-worker-settings-changed';

const PATH_SUFFIX_RE = /\/(inspect|metadata)$/i;

export type OgWorkerSettings = {
  version: 1;
  /** Normalized worker base URL, or '' when unset. */
  url: string;
};

export const DEFAULT_OG_WORKER_SETTINGS: OgWorkerSettings = {
  version: 1,
  url: '',
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
  cached: OgWorkerSettings;
};

const store: StoreState = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
  cached: { ...DEFAULT_OG_WORKER_SETTINGS },
};

/**
 * Normalize a worker origin / base URL.
 * Accepts `https://….workers.dev`, trailing slashes, or `/inspect` / `/metadata`.
 * Returns '' when empty or not http(s).
 */
export function normalizeOgWorkerBaseUrl(
  raw: string | null | undefined,
): string {
  let s = String(raw || '').trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) return '';
  try {
    const u = new URL(s);
    let path = u.pathname.replace(/\/+$/, '');
    if (PATH_SUFFIX_RE.test(path)) {
      path = path.replace(PATH_SUFFIX_RE, '');
    }
    u.pathname = path || '/';
    u.search = '';
    u.hash = '';
    return u.toString().replace(/\/+$/, '');
  } catch {
    return '';
  }
}

/** Build `GET {base}/inspect?url=…` for Social Preview Inspector. */
export function buildOgWorkerInspectUrl(
  baseUrl: string,
  targetUrl: string,
): string {
  const base = normalizeOgWorkerBaseUrl(baseUrl);
  if (!base) throw new Error('Invalid OG worker URL');
  return `${base}/inspect?url=${encodeURIComponent(targetUrl)}`;
}

/** @deprecated Use buildOgWorkerInspectUrl */
export const buildOgWorkerMetadataUrl = buildOgWorkerInspectUrl;

/**
 * Inject S3/local/WebDAV access from MainApp (same pattern as cover / webfont settings).
 */
export function setOgWorkerSettingsStore(payload: {
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

export function getCachedOgWorkerSettings(): OgWorkerSettings {
  return store.cached;
}

/** Sync read of cached worker base URL (for OG fetch path). */
export function loadOgWorkerUrl(): string {
  return store.cached.url;
}

function parseOgWorkerSettings(raw: unknown): OgWorkerSettings {
  if (typeof raw === 'string') {
    return { version: 1, url: normalizeOgWorkerBaseUrl(raw) };
  }
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_OG_WORKER_SETTINGS };
  const o = raw as Record<string, unknown>;
  const urlRaw =
    typeof o.url === 'string'
      ? o.url
      : typeof o.workerUrl === 'string'
        ? o.workerUrl
        : '';
  return {
    version: 1,
    url: normalizeOgWorkerBaseUrl(urlRaw),
  };
}

function loadFromLocalStorage(): OgWorkerSettings | null {
  try {
    const raw =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(LOCAL_STORAGE_KEY)
        : null;
    if (raw == null || raw === '') return null;
    // Legacy: plain URL string before vault JSON.
    if (raw.startsWith('{')) {
      return parseOgWorkerSettings(JSON.parse(raw));
    }
    return { version: 1, url: normalizeOgWorkerBaseUrl(raw) };
  } catch {
    return null;
  }
}

function saveToLocalStorage(settings: OgWorkerSettings): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* ignore quota */
  }
}

export function notifyOgWorkerSettingsChanged(settings: OgWorkerSettings): void {
  store.cached = settings;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(OG_WORKER_SETTINGS_CHANGED_EVENT, { detail: settings }),
  );
}

async function loadFromWebdav(): Promise<OgWorkerSettings | null> {
  const cfg = store.webdavConfig;
  if (!cfg?.endpoint || !cfg?.username) return null;
  try {
    const backend = createWebdavBackend(cfg);
    const head = await backend.head(OG_WORKER_JSON_KEY);
    if (!head) return null;
    const { text } = await backend.readText(OG_WORKER_JSON_KEY);
    return parseOgWorkerSettings(JSON.parse(text));
  } catch (e) {
    console.warn('OG worker settings load from WebDAV failed:', e);
    return null;
  }
}

async function loadFromS3(): Promise<OgWorkerSettings | null> {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const head = await headObject(client as any, bucket, OG_WORKER_JSON_KEY);
    if (!head) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body } = await getObjectBody(client as any, bucket, OG_WORKER_JSON_KEY);
    const text = new TextDecoder('utf-8').decode(body);
    return parseOgWorkerSettings(JSON.parse(text));
  } catch (e) {
    console.warn('OG worker settings load from S3 failed:', e);
    return null;
  }
}

async function loadFromLocal(): Promise<OgWorkerSettings | null> {
  const localHandle = store.localRootHandle;
  if (!localHandle) return null;
  try {
    const settingsDir = await localHandle.getDirectoryHandle('.settings', {
      create: false,
    });
    const fileHandle = await settingsDir.getFileHandle('og-worker.json', {
      create: false,
    });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseOgWorkerSettings(JSON.parse(text));
  } catch (e) {
    if ((e as { name?: string })?.name !== 'NotFound') {
      console.warn('OG worker settings load from local failed:', e);
    }
    return null;
  }
}

async function writeRemote(settings: OgWorkerSettings): Promise<void> {
  const payload = JSON.stringify(settings, null, 2);
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (cfg?.endpoint && cfg?.username) {
      const backend = createWebdavBackend(cfg);
      await backend.writeText(OG_WORKER_JSON_KEY, payload, 'application/json');
    }
  } else if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (localHandle) {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', {
        create: true,
      });
      const fileHandle = await settingsDir.getFileHandle('og-worker.json', {
        create: true,
      });
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
        Key: OG_WORKER_JSON_KEY,
        Body: payload,
        ContentType: 'application/json',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    }
  }
}

export async function loadOgWorkerSettingsFromStorage(): Promise<OgWorkerSettings> {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_OG_WORKER_SETTINGS };
  const mode = store.storageMode || 's3';

  let remote: OgWorkerSettings | null = null;
  if (mode === 'webdav') remote = await loadFromWebdav();
  else if (mode === 'local') remote = await loadFromLocal();
  else remote = await loadFromS3();

  const next = remote ?? fallback;
  store.cached = next;
  saveToLocalStorage(next);

  // One-shot migrate: browser-only URL → vault when vault file is missing.
  if (!remote && next.url) {
    void writeRemote(next).catch((e) => {
      console.warn('OG worker settings migrate to vault failed:', e);
    });
  }

  return next;
}

/**
 * Persist worker base URL to cache + Haim vault.
 * Empty / invalid clears the setting.
 * @returns normalized URL that was stored ('' if cleared)
 */
export async function saveOgWorkerUrl(
  raw: string | null | undefined,
): Promise<string> {
  const settings: OgWorkerSettings = {
    version: 1,
    url: normalizeOgWorkerBaseUrl(raw),
  };
  saveToLocalStorage(settings);
  notifyOgWorkerSettingsChanged(settings);
  try {
    await writeRemote(settings);
  } catch (e) {
    console.warn('OG worker settings save to vault failed:', e);
  }
  return settings.url;
}

export async function saveOgWorkerSettingsToStorage(
  settings: OgWorkerSettings,
): Promise<OgWorkerSettings> {
  const next = parseOgWorkerSettings(settings);
  saveToLocalStorage(next);
  notifyOgWorkerSettingsChanged(next);
  await writeRemote(next);
  return next;
}

// Seed cache from localStorage (incl. legacy plain URL) at module load.
{
  const seeded = loadFromLocalStorage();
  if (seeded) {
    store.cached = seeded;
    saveToLocalStorage(seeded);
  }
}
