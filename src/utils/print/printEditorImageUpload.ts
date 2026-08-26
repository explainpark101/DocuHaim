import {
  buildEditorImagePathPrefix,
  getExtensionFromMime,
  normalizeEditorImagePathPrefix,
  sniffImageMimeFromFile,
  uploadEditorImage,
} from '@/utils/editorImageUpload';
import { uploadLocalEditorImage } from '@/utils/localEditorImage';
import { getPrintSettingsStoreSnapshot } from '@/utils/print/printSettingsStore';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';

type PrintImageFile = {
  type?: string | null;
  id?: string | null;
};

type PrintSettingsSnapshot = {
  getS3Client: (() => unknown) | null;
  s3Creds: { bucket?: string | null } | null;
  localRootHandle: FileSystemDirectoryHandle | null;
  webdavConfig: {
    endpoint?: string | null;
    username?: string | null;
    password?: string | null;
    basePath?: string | null;
  } | null;
};

export async function uploadPrintEditorImage(
  file: File,
  currentFile: PrintImageFile | null | undefined,
): Promise<string> {
  const type = currentFile?.type || 's3';
  const fileId = String(currentFile?.id || '').trim();
  const imagePathPrefix = fileId ? buildEditorImagePathPrefix(fileId) : '.images/note';
  const snapshot = getPrintSettingsStoreSnapshot() as PrintSettingsSnapshot;

  if (type === 'session') {
    throw new Error('세션 노트 이미지 자르기는 편집기에서 진행해 주세요.');
  }

  if (type === 'local') {
    if (!snapshot.localRootHandle) {
      throw new Error('로컬 폴더를 찾을 수 없습니다.');
    }
    return uploadLocalEditorImage(snapshot.localRootHandle, file, { imagePathPrefix });
  }

  if (type === 'webdav') {
    const cfg = snapshot.webdavConfig;
    if (!cfg?.endpoint || !cfg?.username) {
      throw new Error('WebDAV가 연결되지 않았습니다.');
    }
    const backend = createWebdavBackend(cfg as Parameters<typeof createWebdavBackend>[0]);
    const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
    const uuid = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    let mime = file.type;
    if (!mime || mime === 'application/octet-stream') {
      mime = (await sniffImageMimeFromFile(file)) || mime;
    }
    const ext = getExtensionFromMime(mime);
    const path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
    const body = new Uint8Array(await file.arrayBuffer());
    await backend.writeBytes(path, body, mime || 'application/octet-stream');
    return path;
  }

  const client = typeof snapshot.getS3Client === 'function' ? snapshot.getS3Client() : null;
  const bucket = snapshot.s3Creds?.bucket;
  if (!client || !bucket) {
    throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
  }
  return uploadEditorImage(
    client as Parameters<typeof uploadEditorImage>[0],
    bucket,
    file,
    { imagePathPrefix },
  );
}
