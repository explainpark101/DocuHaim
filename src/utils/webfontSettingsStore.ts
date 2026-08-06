import { getObjectBody, headObject, putObject } from '@/utils/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';

const WEBFONTS_JSON_KEY = '.settings/webfonts.json';
const LOCAL_STORAGE_KEY = 's3haim_webfonts';
export const WEBFONTS_CHANGED_EVENT = 's3haim-webfonts-changed';

export type WebfontSettings = {
  version: 1;
  /** Raw CSS (@font-face / @import) injected app-wide. */
  css: string;
};

export const DEFAULT_WEBFONT_SETTINGS: WebfontSettings = {
  version: 1,
  css: '',
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
  cached: WebfontSettings;
};

const store: StoreState = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
  cached: { ...DEFAULT_WEBFONT_SETTINGS },
};

/**
 * Inject S3/local/WebDAV access from MainApp (same pattern as print settings).
 */
export function setWebfontSettingsStore(payload: {
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

export function getCachedWebfontSettings(): WebfontSettings {
  return store.cached;
}

export function getCachedWebfontCss(): string {
  return store.cached.css || '';
}

function parseWebfontSettings(raw: unknown): WebfontSettings {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_WEBFONT_SETTINGS };
  const o = raw as Record<string, unknown>;
  return {
    version: 1,
    css: typeof o.css === 'string' ? o.css : '',
  };
}

function loadFromLocalStorage(): WebfontSettings | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (!raw) return null;
    return parseWebfontSettings(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveToLocalStorage(settings: WebfontSettings): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    }
  } catch {
    /* ignore quota */
  }
}

/** Parse font-family names declared inside @font-face blocks. */
export function extractFontFamilyNamesFromCss(css: string): string[] {
  if (!css || typeof css !== 'string') return [];
  const names = new Set<string>();
  const faceRe = /@font-face\s*\{([\s\S]*?)\}/gi;
  let match: RegExpExecArray | null;
  while ((match = faceRe.exec(css)) !== null) {
    const block = match[1] ?? '';
    const fam = /font-family\s*:\s*([^;]+)/i.exec(block);
    if (!fam?.[1]) continue;
    let name = fam[1].trim();
    name = name.split(',')[0]?.trim() ?? '';
    name = name.replace(/^['"]+|['"]+$/g, '').trim();
    if (name) names.add(name);
  }
  return [...names].sort((a, b) => a.localeCompare(b, 'ko'));
}

export function getCachedWebfontFamilyNames(): string[] {
  return extractFontFamilyNamesFromCss(store.cached.css);
}

export function notifyWebfontsChanged(settings: WebfontSettings): void {
  store.cached = settings;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(WEBFONTS_CHANGED_EVENT, {
      detail: {
        css: settings.css,
        families: extractFontFamilyNamesFromCss(settings.css),
      },
    }),
  );
}

async function loadFromWebdav(): Promise<WebfontSettings | null> {
  const cfg = store.webdavConfig;
  if (!cfg?.endpoint || !cfg?.username) return null;
  try {
    const backend = createWebdavBackend(cfg);
    const head = await backend.head(WEBFONTS_JSON_KEY);
    if (!head) return null;
    const { text } = await backend.readText(WEBFONTS_JSON_KEY);
    return parseWebfontSettings(JSON.parse(text));
  } catch (e) {
    console.warn('Webfont settings load from WebDAV failed:', e);
    return null;
  }
}

async function loadFromS3(): Promise<WebfontSettings | null> {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const head = await headObject(client as any, bucket, WEBFONTS_JSON_KEY);
    if (!head) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body } = await getObjectBody(client as any, bucket, WEBFONTS_JSON_KEY);
    const text = new TextDecoder('utf-8').decode(body);
    return parseWebfontSettings(JSON.parse(text));
  } catch (e) {
    console.warn('Webfont settings load from S3 failed:', e);
    return null;
  }
}

async function loadFromLocal(): Promise<WebfontSettings | null> {
  const localHandle = store.localRootHandle;
  if (!localHandle) return null;
  try {
    const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: false });
    const fileHandle = await settingsDir.getFileHandle('webfonts.json', { create: false });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseWebfontSettings(JSON.parse(text));
  } catch (e) {
    if ((e as { name?: string })?.name !== 'NotFound') {
      console.warn('Webfont settings load from local failed:', e);
    }
    return null;
  }
}

export async function loadWebfontsFromStorage(): Promise<WebfontSettings> {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_WEBFONT_SETTINGS };
  const mode = store.storageMode || 's3';

  let remote: WebfontSettings | null = null;
  if (mode === 'webdav') remote = await loadFromWebdav();
  else if (mode === 'local') remote = await loadFromLocal();
  else remote = await loadFromS3();

  const next = remote ?? fallback;
  store.cached = next;
  saveToLocalStorage(next);
  return next;
}

export async function saveWebfontsToStorage(settings: WebfontSettings): Promise<WebfontSettings> {
  const payloadSettings: WebfontSettings = {
    version: 1,
    css: typeof settings?.css === 'string' ? settings.css : '',
  };
  const payload = JSON.stringify(payloadSettings, null, 2);
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (cfg?.endpoint && cfg?.username) {
      const backend = createWebdavBackend(cfg);
      await backend.writeText(WEBFONTS_JSON_KEY, payload, 'application/json');
    }
  } else if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (localHandle) {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: true });
      const fileHandle = await settingsDir.getFileHandle('webfonts.json', { create: true });
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
        Key: WEBFONTS_JSON_KEY,
        Body: payload,
        ContentType: 'application/json',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    }
  }

  saveToLocalStorage(payloadSettings);
  notifyWebfontsChanged(payloadSettings);
  return payloadSettings;
}
