import { getObjectBody, headObject, putObject, getSignedGetUrl } from '@/utils/s3Client';
import { getLocalWikiImageObjectUrl } from '@/utils/localEditorImage';

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
};

/**
 * ExportPDFPage 등에서 wiki 이미지용 URL resolver를 가져올 때 사용.
 * @param {'s3' | 'local' | null | undefined} [fileType]
 * @returns {((path: string) => Promise<string|null>) | null}
 */
export function getPresignedUrlResolver(fileType = null) {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  const localHandle = store.localRootHandle;

  if (fileType === 'local' && localHandle) {
    return (path) => getLocalWikiImageObjectUrl(localHandle, path);
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
 * MainApp에서 S3/로컬 접근을 주입합니다.
 * @param {{ getS3Client: () => import('@aws-sdk/client-s3').S3Client | null, s3Creds: object | null, localRootHandle: FileSystemDirectoryHandle | null }} payload
 */
export function setPrintSettingsStore(payload) {
  if (payload) {
    store.getS3Client = payload.getS3Client ?? store.getS3Client;
    store.s3Creds = payload.s3Creds !== undefined ? payload.s3Creds : store.s3Creds;
    store.localRootHandle = payload.localRootHandle !== undefined ? payload.localRootHandle : store.localRootHandle;
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
  } catch (_) {}
}

/**
 * S3 .settings/print.json → 로컬 .settings/print.json → localStorage 순으로 읽습니다.
 * @returns {Promise<{ bold: string, heading: string, body: string, code: string }>}
 */
export async function loadPrintFontsFromStorage() {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_PRINT_FONTS };

  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (client && bucket) {
    try {
      const head = await headObject(client, bucket, PRINT_JSON_KEY);
      if (head) {
        const { body } = await getObjectBody(client, bucket, PRINT_JSON_KEY);
        const text = new TextDecoder('utf-8').decode(body);
        const parsed = JSON.parse(text);
        return parseFontsJson(parsed);
      }
    } catch (e) {
      console.warn('Print settings load from S3 failed:', e);
    }
  }

  const localHandle = store.localRootHandle;
  if (localHandle) {
    try {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: false });
      const fileHandle = await settingsDir.getFileHandle('print.json', { create: false });
      const file = await fileHandle.getFile();
      const text = await file.text();
      const parsed = JSON.parse(text);
      return parseFontsJson(parsed);
    } catch (e) {
      if (e?.name !== 'NotFound') console.warn('Print settings load from local failed:', e);
    }
  }

  return fallback;
}

/**
 * S3(연결 시)와 로컬(폴더 열림 시)에 .settings/print.json으로 저장하고, 항상 localStorage에도 저장합니다.
 * @param {{ bold: string, heading: string, body: string, code: string }} fonts
 */
export async function savePrintFontsToStorage(fonts) {
  const payload = JSON.stringify(fonts ?? DEFAULT_PRINT_FONTS, null, 2);

  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (client && bucket) {
    try {
      await putObject(client, {
        Bucket: bucket,
        Key: PRINT_JSON_KEY,
        Body: payload,
        ContentType: 'application/json',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    } catch (e) {
      console.error('Print settings save to S3 failed:', e);
      throw e;
    }
  }

  const localHandle = store.localRootHandle;
  if (localHandle) {
    try {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: true });
      const fileHandle = await settingsDir.getFileHandle('print.json', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
    } catch (e) {
      console.error('Print settings save to local failed:', e);
      throw e;
    }
  }

  saveToLocalStorage(fonts ?? DEFAULT_PRINT_FONTS);
}
