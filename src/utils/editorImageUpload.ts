import { dbgClipboard } from '@/utils/clipboardImageDebug';
import { putObjectWithProgress } from '@/utils/vault/s3Client';
import { normalizePathToNfc } from '@/utils/unicodeNfc';
import type { S3Client } from '@aws-sdk/client-s3';

type EditorImageUploadOptions = {
  maxSizeBytes?: number;
  imagePathPrefix?: string;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

/**
 * 파일 앞부분 바이트로 image/* MIME 추정 (클립보드 File.type 비어 있을 때 사용)
 * @param {File} file
 * @returns {Promise<string>} 예: 'image/png', 없으면 ''
 */
export async function sniffImageMimeFromFile(file: any) {
  if (file.type?.startsWith('image/')) return file.type;
  const buf = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.length >= 4 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return 'image/png';
  }
  if (buf.length >= 4 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return 'image/gif';
  if (
    buf.length >= 12 &&
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return 'image/webp';
  }
  dbgClipboard('sniff:noMatch', {
    size: file.size,
    head: buf.length
      ? [...buf.slice(0, 8)].map((b) => b.toString(16).padStart(2, '0')).join(' ')
      : '(empty)',
  });
  return '';
}

/** @param {File} file */
export async function isFileProbablyImage(file: any) {
  const mime = await sniffImageMimeFromFile(file);
  const ok = Boolean(mime);
  dbgClipboard('sniff:isFileProbablyImage', {
    type: file.type || '(empty)',
    size: file.size,
    probablyImage: ok,
    inferredMime: mime || '(none)',
  });
  return ok;
}

/**
 * 현재 md 파일 경로에서 에디터 이미지 디렉터리 prefix 생성.
 * @param {string} [mdPath]
 * @returns {string} 예: '.images/notes/my-note'
 */
export function buildEditorImagePathPrefix(mdPath: any) {
  if (!mdPath) return '.images/note';
  const nfcPath = normalizePathToNfc(mdPath);
  const mdDir = nfcPath.includes('/') ? nfcPath.replace(/\/[^/]+$/, '/') : '';
  const mdNameNoExt = nfcPath.replace(/^.*\//, '').replace(/\.[^.]+$/, '') || 'note';
  return `.images/${mdDir}${mdNameNoExt}`;
}

/**
 * 에디터용 이미지 S3 업로드 — 위키 문법 ![[path]]용 path(S3 Object Key) 반환.
 * Key 형식: .images/<md파일경로>/<md파일이름>/<uuid>.<ext>
 * 예: .images/고려대학교/고려대학교/a1b2c3d4.png
 *
 * @param {import('@aws-sdk/client-s3').S3Client} client
 * @param {string} bucket
 * @param {File} file
 * @param {{ maxSizeBytes?: number, imagePathPrefix?: string, onProgress?: (percent: number) => void, signal?: AbortSignal }} [options]
 *   - maxSizeBytes: 기본 10MB
 *   - imagePathPrefix: '.images/<md경로>/<md이름>/' 형태. 미지정 시 '.images/note/' 사용
 * @returns {Promise<string>} S3 Object Key (path)
 */
export async function uploadEditorImage(
  client: S3Client,
  bucket: string,
  file: File,
  options: EditorImageUploadOptions = {},
) {
  const maxSizeBytes = options.maxSizeBytes ?? 10 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`이미지 크기는 ${Math.round(maxSizeBytes / 1024 / 1024)}MB 이하여야 합니다.`);
  }

  const prefix = normalizeEditorImagePathPrefix(options.imagePathPrefix);
  const uuid = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  let mime = file.type;
  if (!mime || mime === 'application/octet-stream') {
    mime = (await sniffImageMimeFromFile(file)) || mime;
  }
  const ext = getExtensionFromMime(mime);
  const key = `${prefix}${uuid}${ext}`;

  dbgClipboard('upload:start', {
    bucket,
    imagePathPrefix: prefix,
    key,
    fileSize: file.size,
    fileType: file.type || '(empty)',
    resolvedMime: mime || '(empty)',
    ext,
  });

  const body = new Uint8Array(await file.arrayBuffer());
  const contentType =
    mime && mime.startsWith('image/') ? mime : 'application/octet-stream';
  await putObjectWithProgress(
    client,
    {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    },
    {
      ...(options.onProgress ? { onProgress: options.onProgress } : {}),
      ...(options.signal ? { signal: options.signal } : {}),
    },
  );

  dbgClipboard('upload:done', { key, contentType, bodyBytes: body.byteLength });
  return key;
}

export function normalizeEditorImagePathPrefix(imagePathPrefix: any) {
  const raw =
    typeof imagePathPrefix === 'string' && imagePathPrefix
      ? imagePathPrefix.replace(/\/+$/, '') + '/'
      : '.images/note/';
  return normalizePathToNfc(raw);
}

export function getExtensionFromMime(mime: string | undefined) {
  if (!mime) return '.png';
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
  };
  return map[mime] || '.png';
}
