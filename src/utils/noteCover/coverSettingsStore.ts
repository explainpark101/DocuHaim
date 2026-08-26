import { getObjectBody, headObject, putObject } from '@/utils/vault/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';

const COVER_JSON_KEY = '.settings/cover.json';
const LOCAL_STORAGE_KEY = 's3haim_cover_settings';
export const COVER_SETTINGS_CHANGED_EVENT = 's3haim-cover-settings-changed';

/** Legacy per-key localStorage (migrated once into LOCAL_STORAGE_KEY). */
const LEGACY_KEYS = {
  centerSnapEnabled: 's3haim_cover_center_snap',
  centerSnapTolerancePx: 's3haim_cover_center_snap_tolerance_px',
  objectSnapEnabled: 's3haim_cover_object_snap',
  objectSnapTolerancePx: 's3haim_cover_object_snap_tolerance_px',
  textContainerOutlineEnabled: 's3haim_cover_text_container_outline',
  placePreviewEnabled: 's3haim_cover_place_preview',
} as const;

export type CoverAppSettings = {
  version: 1;
  centerSnapEnabled: boolean;
  /** Screen-pixel snap distance for page midlines. */
  centerSnapTolerancePx: number;
  objectSnapEnabled: boolean;
  /** Screen-pixel snap distance for peer edges/centers. */
  objectSnapTolerancePx: number;
  textContainerOutlineEnabled: boolean;
  placePreviewEnabled: boolean;
};

export const COVER_SNAP_TOLERANCE_PX_MIN = 0.1;
export const COVER_SNAP_TOLERANCE_PX_MAX = 100;
export const COVER_SNAP_TOLERANCE_PX_DEFAULT = 5;

export const DEFAULT_COVER_APP_SETTINGS: CoverAppSettings = {
  version: 1,
  centerSnapEnabled: true,
  centerSnapTolerancePx: COVER_SNAP_TOLERANCE_PX_DEFAULT,
  objectSnapEnabled: false,
  objectSnapTolerancePx: COVER_SNAP_TOLERANCE_PX_DEFAULT,
  textContainerOutlineEnabled: false,
  placePreviewEnabled: true,
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
  cached: CoverAppSettings;
};

const store: StoreState = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
  cached: { ...DEFAULT_COVER_APP_SETTINGS },
};

let remoteSaveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingRemote: CoverAppSettings | null = null;

/**
 * Inject S3/local/WebDAV access from MainApp (same pattern as webfont / print settings).
 */
export function setCoverSettingsStore(payload: {
  getS3Client?: (() => unknown) | null;
  s3Creds?: { bucket?: string } | null;
  localRootHandle?: FileSystemDirectoryHandle | null;
  storageMode?: string;
  webdavConfig?: WebdavConfig | null | Record<string, unknown>;
}): void {
  if (!payload) return;
  if (payload.getS3Client !== undefined) store.getS3Client = payload.getS3Client;
  if (payload.s3Creds !== undefined) store.s3Creds = payload.s3Creds;
  if (payload.localRootHandle !== undefined) store.localRootHandle = payload.localRootHandle;
  if (payload.storageMode !== undefined) store.storageMode = payload.storageMode;
  if (payload.webdavConfig !== undefined) {
    store.webdavConfig = (payload.webdavConfig as WebdavConfig | null) ?? null;
  }
}

export function getCachedCoverSettings(): CoverAppSettings {
  return store.cached;
}

export function clampCoverSnapTolerancePx(n: number): number {
  if (!Number.isFinite(n)) return COVER_SNAP_TOLERANCE_PX_DEFAULT;
  const rounded = Math.round(n * 10) / 10;
  return Math.min(
    COVER_SNAP_TOLERANCE_PX_MAX,
    Math.max(COVER_SNAP_TOLERANCE_PX_MIN, rounded),
  );
}

function parseCoverSettings(raw: unknown): CoverAppSettings {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_COVER_APP_SETTINGS };
  const o = raw as Record<string, unknown>;
  return {
    version: 1,
    centerSnapEnabled:
      typeof o.centerSnapEnabled === 'boolean'
        ? o.centerSnapEnabled
        : DEFAULT_COVER_APP_SETTINGS.centerSnapEnabled,
    centerSnapTolerancePx: clampCoverSnapTolerancePx(
      typeof o.centerSnapTolerancePx === 'number'
        ? o.centerSnapTolerancePx
        : DEFAULT_COVER_APP_SETTINGS.centerSnapTolerancePx,
    ),
    objectSnapEnabled:
      typeof o.objectSnapEnabled === 'boolean'
        ? o.objectSnapEnabled
        : DEFAULT_COVER_APP_SETTINGS.objectSnapEnabled,
    objectSnapTolerancePx: clampCoverSnapTolerancePx(
      typeof o.objectSnapTolerancePx === 'number'
        ? o.objectSnapTolerancePx
        : DEFAULT_COVER_APP_SETTINGS.objectSnapTolerancePx,
    ),
    textContainerOutlineEnabled:
      typeof o.textContainerOutlineEnabled === 'boolean'
        ? o.textContainerOutlineEnabled
        : DEFAULT_COVER_APP_SETTINGS.textContainerOutlineEnabled,
    placePreviewEnabled:
      typeof o.placePreviewEnabled === 'boolean'
        ? o.placePreviewEnabled
        : DEFAULT_COVER_APP_SETTINGS.placePreviewEnabled,
  };
}

function readLegacyBool(key: string, fallback: boolean): boolean {
  try {
    const raw = localStorage.getItem(key);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    /* ignore */
  }
  return fallback;
}

function readLegacyTolerance(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null || raw === '') return fallback;
    const n = Number(raw);
    if (!Number.isFinite(n)) return fallback;
    return clampCoverSnapTolerancePx(n);
  } catch {
    return fallback;
  }
}

function migrateLegacyLocalSettings(): CoverAppSettings | null {
  if (typeof window === 'undefined') return null;
  try {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) return null;
    const hasAny = Object.values(LEGACY_KEYS).some((k) => localStorage.getItem(k) != null);
    if (!hasAny) return null;
    return {
      version: 1,
      centerSnapEnabled: readLegacyBool(
        LEGACY_KEYS.centerSnapEnabled,
        DEFAULT_COVER_APP_SETTINGS.centerSnapEnabled,
      ),
      centerSnapTolerancePx: readLegacyTolerance(
        LEGACY_KEYS.centerSnapTolerancePx,
        DEFAULT_COVER_APP_SETTINGS.centerSnapTolerancePx,
      ),
      objectSnapEnabled: readLegacyBool(
        LEGACY_KEYS.objectSnapEnabled,
        DEFAULT_COVER_APP_SETTINGS.objectSnapEnabled,
      ),
      objectSnapTolerancePx: readLegacyTolerance(
        LEGACY_KEYS.objectSnapTolerancePx,
        DEFAULT_COVER_APP_SETTINGS.objectSnapTolerancePx,
      ),
      textContainerOutlineEnabled: readLegacyBool(
        LEGACY_KEYS.textContainerOutlineEnabled,
        DEFAULT_COVER_APP_SETTINGS.textContainerOutlineEnabled,
      ),
      placePreviewEnabled: readLegacyBool(
        LEGACY_KEYS.placePreviewEnabled,
        DEFAULT_COVER_APP_SETTINGS.placePreviewEnabled,
      ),
    };
  } catch {
    return null;
  }
}

function loadFromLocalStorage(): CoverAppSettings | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (raw) return parseCoverSettings(JSON.parse(raw));
    return migrateLegacyLocalSettings();
  } catch {
    return null;
  }
}

function saveToLocalStorage(settings: CoverAppSettings): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    }
  } catch {
    /* ignore quota */
  }
}

export function notifyCoverSettingsChanged(settings: CoverAppSettings): void {
  store.cached = settings;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(COVER_SETTINGS_CHANGED_EVENT, { detail: settings }),
  );
}

async function loadFromWebdav(): Promise<CoverAppSettings | null> {
  const cfg = store.webdavConfig;
  if (!cfg?.endpoint || !cfg?.username) return null;
  try {
    const backend = createWebdavBackend(cfg);
    const head = await backend.head(COVER_JSON_KEY);
    if (!head) return null;
    const { text } = await backend.readText(COVER_JSON_KEY);
    return parseCoverSettings(JSON.parse(text));
  } catch (e) {
    console.warn('Cover settings load from WebDAV failed:', e);
    return null;
  }
}

async function loadFromS3(): Promise<CoverAppSettings | null> {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const head = await headObject(client as any, bucket, COVER_JSON_KEY);
    if (!head) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body } = await getObjectBody(client as any, bucket, COVER_JSON_KEY);
    const text = new TextDecoder('utf-8').decode(body);
    return parseCoverSettings(JSON.parse(text));
  } catch (e) {
    console.warn('Cover settings load from S3 failed:', e);
    return null;
  }
}

async function loadFromLocal(): Promise<CoverAppSettings | null> {
  const localHandle = store.localRootHandle;
  if (!localHandle) return null;
  try {
    const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: false });
    const fileHandle = await settingsDir.getFileHandle('cover.json', { create: false });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseCoverSettings(JSON.parse(text));
  } catch (e) {
    if ((e as { name?: string })?.name !== 'NotFound') {
      console.warn('Cover settings load from local failed:', e);
    }
    return null;
  }
}

async function writeRemote(settings: CoverAppSettings): Promise<void> {
  const payload = JSON.stringify(settings, null, 2);
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (cfg?.endpoint && cfg?.username) {
      const backend = createWebdavBackend(cfg);
      await backend.writeText(COVER_JSON_KEY, payload, 'application/json');
    }
  } else if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (localHandle) {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: true });
      const fileHandle = await settingsDir.getFileHandle('cover.json', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
    }
  } else {
    const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
    const bucket = store.s3Creds?.bucket;
    if (client && bucket) {
      await putObject(client as never, {
        Bucket: bucket,
        Key: COVER_JSON_KEY,
        Body: payload,
        ContentType: 'application/json',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    }
  }
}

function scheduleRemoteSave(settings: CoverAppSettings): void {
  pendingRemote = settings;
  if (remoteSaveTimer) clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(() => {
    const next = pendingRemote;
    pendingRemote = null;
    remoteSaveTimer = null;
    if (!next) return;
    void writeRemote(next).catch((e) => {
      console.warn('Cover settings save to vault failed:', e);
    });
  }, 400);
}

export async function loadCoverSettingsFromStorage(): Promise<CoverAppSettings> {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_COVER_APP_SETTINGS };
  const mode = store.storageMode || 's3';

  let remote: CoverAppSettings | null = null;
  if (mode === 'webdav') remote = await loadFromWebdav();
  else if (mode === 'local') remote = await loadFromLocal();
  else remote = await loadFromS3();

  const next = remote ?? fallback;
  store.cached = next;
  saveToLocalStorage(next);
  return next;
}

export async function saveCoverSettingsToStorage(
  settings: CoverAppSettings,
): Promise<CoverAppSettings> {
  const payloadSettings = parseCoverSettings(settings);
  saveToLocalStorage(payloadSettings);
  notifyCoverSettingsChanged(payloadSettings);
  await writeRemote(payloadSettings);
  return payloadSettings;
}

/**
 * Merge a partial update: cache + localStorage immediately, vault write debounced.
 */
export function patchCoverSettings(
  partial: Partial<Omit<CoverAppSettings, 'version'>>,
): CoverAppSettings {
  const next = parseCoverSettings({ ...store.cached, ...partial, version: 1 });
  saveToLocalStorage(next);
  notifyCoverSettingsChanged(next);
  scheduleRemoteSave(next);
  return next;
}

// Seed cache from localStorage (or legacy keys) at module load.
{
  const seeded = loadFromLocalStorage();
  if (seeded) {
    store.cached = seeded;
    saveToLocalStorage(seeded);
  }
}
