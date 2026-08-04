import { getObjectBody, headObject, putObject, getSignedGetUrl } from '@/utils/s3Client';
import { getLocalWikiImageObjectUrl } from '@/utils/localEditorImage';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';

const PRINT_JSON_KEY = '.settings/print.json';
const LOCAL_STORAGE_KEY = 's3haim_print_fonts';

export const DEFAULT_PRINT_FONTS = {
  bold: '',
  heading: '',
  body: '',
  code: '',
};

const store = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
};

/**
 * ExportPDFPage etc.: wiki image URL resolver.
 * @param {'s3' | 'local' | 'webdav' | null | undefined} [fileType]
 * @returns {((path: string) => Promise<string|null>) | null}
 */
export function getPresignedUrlResolver(fileType = null) {
  const mode = fileType || store.storageMode || 's3';
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  const localHandle = store.localRootHandle;
  const webdavCfg = store.webdavConfig;

  if (mode === 'local' && localHandle) {
    return (path) => getLocalWikiImageObjectUrl(localHandle, path);
  }
  if (mode === 'webdav' && webdavCfg?.endpoint && webdavCfg?.username) {
    const backend = createWebdavBackend(webdavCfg);
    return (path) => backend.getObjectUrl(path);
  }
  if (client && bucket) {
    return (path) => getSignedGetUrl(client, bucket, path, 3600);
  }
  if (localHandle) {
    return (path) => getLocalWikiImageObjectUrl(localHandle, path);
  }
  return null;
}

/**
 * Inject S3/local/WebDAV access from MainApp.
 * @param {{ getS3Client: Function, s3Creds: object | null, localRootHandle: FileSystemDirectoryHandle | null, storageMode?: string, webdavConfig?: object | null }} payload
 */
export function setPrintSettingsStore(payload) {
  if (payload) {
    store.getS3Client = payload.getS3Client ?? store.getS3Client;
    store.s3Creds = payload.s3Creds !== undefined ? payload.s3Creds : store.s3Creds;
    store.localRootHandle =
      payload.localRootHandle !== undefined ? payload.localRootHandle : store.localRootHandle;
    if (payload.storageMode !== undefined) store.storageMode = payload.storageMode;
    if (payload.webdavConfig !== undefined) store.webdavConfig = payload.webdavConfig;
  }
}

function parseFontsJson(parsed) {
  if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_PRINT_FONTS };
  return {
    bold: typeof parsed.bold === 'string' ? parsed.bold : DEFAULT_PRINT_FONTS.bold,
    heading: typeof parsed.heading === 'string' ? parsed.heading : DEFAULT_PRINT_FONTS.heading,
    body: typeof parsed.body === 'string' ? parsed.body : DEFAULT_PRINT_FONTS.body,
    code: typeof parsed.code === 'string' ? parsed.code : DEFAULT_PRINT_FONTS.code,
  };
}

function loadFromLocalStorage() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (!raw) return null;
    return parseFontsJson(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveToLocalStorage(fonts) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fonts));
    }
  } catch {
    /* ignore quota errors */
  }
}

async function loadPrintFontsFromWebdav() {
  const cfg = store.webdavConfig;
  if (!cfg?.endpoint || !cfg?.username) return null;
  try {
    const backend = createWebdavBackend(cfg);
    const head = await backend.head(PRINT_JSON_KEY);
    if (!head) return null;
    const { text } = await backend.readText(PRINT_JSON_KEY);
    return parseFontsJson(JSON.parse(text));
  } catch (e) {
    console.warn('Print settings load from WebDAV failed:', e);
    return null;
  }
}

async function loadPrintFontsFromS3() {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    const head = await headObject(client, bucket, PRINT_JSON_KEY);
    if (!head) return null;
    const { body } = await getObjectBody(client, bucket, PRINT_JSON_KEY);
    const text = new TextDecoder('utf-8').decode(body);
    return parseFontsJson(JSON.parse(text));
  } catch (e) {
    console.warn('Print settings load from S3 failed:', e);
    return null;
  }
}

async function loadPrintFontsFromLocal() {
  const localHandle = store.localRootHandle;
  if (!localHandle) return null;
  try {
    const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: false });
    const fileHandle = await settingsDir.getFileHandle('print.json', { create: false });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseFontsJson(JSON.parse(text));
  } catch (e) {
    if (e?.name !== 'NotFound') console.warn('Print settings load from local failed:', e);
    return null;
  }
}

/**
 * Active storage mode only, then localStorage fallback.
 * @returns {Promise<{ bold: string, heading: string, body: string, code: string }>}
 */
export async function loadPrintFontsFromStorage() {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_PRINT_FONTS };
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const fromWebdav = await loadPrintFontsFromWebdav();
    if (fromWebdav) return fromWebdav;
  } else if (mode === 'local') {
    const fromLocal = await loadPrintFontsFromLocal();
    if (fromLocal) return fromLocal;
  } else {
    const fromS3 = await loadPrintFontsFromS3();
    if (fromS3) return fromS3;
  }

  return fallback;
}

/**
 * Save to active storage mode (when available) and always to localStorage.
 * @param {{ bold: string, heading: string, body: string, code: string }} fonts
 */
export async function savePrintFontsToStorage(fonts) {
  const payload = JSON.stringify(fonts ?? DEFAULT_PRINT_FONTS, null, 2);
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (cfg?.endpoint && cfg?.username) {
      const backend = createWebdavBackend(cfg);
      await backend.writeText(PRINT_JSON_KEY, payload, 'application/json');
    }
  } else if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (localHandle) {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: true });
      const fileHandle = await settingsDir.getFileHandle('print.json', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
    }
  } else {
    const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
    const bucket = store.s3Creds?.bucket;
    if (client && bucket) {
      await putObject(client, {
        Bucket: bucket,
        Key: PRINT_JSON_KEY,
        Body: payload,
        ContentType: 'application/json',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    }
  }

  saveToLocalStorage(fonts ?? DEFAULT_PRINT_FONTS);
}
