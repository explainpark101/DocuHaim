/**
 * 에디터용 이미지 S3 업로드 — 위키 문법 ![[path]]용 path(S3 Object Key) 반환.
 * Key 형식: .images/<md파일경로>/<md파일이름>/<uuid>.<ext>
 * 예: .images/고려대학교/고려대학교/a1b2c3d4.png
 *
 * @param {import('@aws-sdk/client-s3').S3Client} client
 * @param {string} bucket
 * @param {File} file
 * @param {{ maxSizeBytes?: number, imagePathPrefix?: string }} [options]
 *   - maxSizeBytes: 기본 10MB
 *   - imagePathPrefix: '.images/<md경로>/<md이름>/' 형태. 미지정 시 '.images/note/' 사용
 * @returns {Promise<string>} S3 Object Key (path)
 */
export async function uploadEditorImage(client, bucket, file, options = {}) {
  const maxSizeBytes = options.maxSizeBytes ?? 10 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`이미지 크기는 ${Math.round(maxSizeBytes / 1024 / 1024)}MB 이하여야 합니다.`);
  }

  const prefix = typeof options.imagePathPrefix === 'string' && options.imagePathPrefix
    ? options.imagePathPrefix.replace(/\/+$/, '') + '/'
    : '.images/note/';
  const uuid = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const ext = getExtensionFromMime(file.type);
  const key = `${prefix}${uuid}${ext}`;

  const { putObject } = await import('@/utils/s3Client');
  const body = new Uint8Array(await file.arrayBuffer());
  await putObject(client, {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: file.type || 'application/octet-stream',
  });

  return key;
}

function getExtensionFromMime(mime) {
  if (!mime) return '.png';
  const map = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
  };
  return map[mime] || '.png';
}
