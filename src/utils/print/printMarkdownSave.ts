import { deleteMemoDraft, getDraftKey } from '@/utils/memoDraftsDb';
import { getLocalFileHandleForPath } from '@/utils/localEditorImage';
import { getPrintSettingsStoreSnapshot } from '@/utils/printSettingsStore';
import { putObject } from '@/utils/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';

export type PrintSaveFile = {
  type?: string | null;
  id?: string | null;
  name?: string | null;
  viewer?: string | null;
  handle?: {
    createWritable: () => Promise<{
      write: (data: string) => Promise<void>;
      close: () => Promise<void>;
    }>;
  } | null;
};

type PrintSettingsSnapshot = {
  getS3Client: (() => unknown) | null;
  s3Creds: { bucket?: string | null } | null;
  localRootHandle: FileSystemDirectoryHandle | null;
  storageMode: string;
  webdavConfig: {
    endpoint?: string | null;
    username?: string | null;
  } | null;
};

function contentTypeForViewer(viewer: string | null | undefined): string {
  if (viewer === 'json') return 'application/json';
  if (viewer === 'raw') return 'text/plain';
  if (viewer === 'html') return 'text/html';
  if (viewer === 'svg') return 'image/svg+xml';
  return 'text/markdown';
}

export async function savePrintMarkdownToStorage(
  file: PrintSaveFile | null | undefined,
  markdown: string,
): Promise<{ mode: 'storage' | 'pending-only' }> {
  const text = String(markdown ?? '');
  const fileId = String(file?.id || '').trim();
  const type = file?.type || 's3';

  if (!fileId) {
    throw new Error('저장할 파일이 없습니다.');
  }

  if (type === 'session') {
    return { mode: 'pending-only' };
  }

  const snapshot = getPrintSettingsStoreSnapshot() as PrintSettingsSnapshot;
  const contentType = contentTypeForViewer(file?.viewer);

  if (type === 'local') {
    const handle =
      file?.handle ??
      (snapshot.localRootHandle
        ? await getLocalFileHandleForPath(snapshot.localRootHandle, fileId)
        : null);
    if (!handle) {
      throw new Error('로컬 파일 핸들을 찾을 수 없습니다.');
    }
    const writable = await handle.createWritable();
    await writable.write(text);
    await writable.close();
    await deleteMemoDraft(getDraftKey('local', fileId));
    return { mode: 'storage' };
  }

  if (type === 'webdav') {
    const cfg = snapshot.webdavConfig;
    if (!cfg?.endpoint || !cfg?.username) {
      throw new Error('WebDAV가 연결되지 않았습니다.');
    }
    const backend = createWebdavBackend(cfg as Parameters<typeof createWebdavBackend>[0]);
    await backend.writeText(fileId, text, contentType);
    await deleteMemoDraft(getDraftKey('webdav', fileId));
    return { mode: 'storage' };
  }

  const client = typeof snapshot.getS3Client === 'function' ? snapshot.getS3Client() : null;
  const bucket = snapshot.s3Creds?.bucket;
  if (!client || !bucket) {
    throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
  }
  await putObject(client as Parameters<typeof putObject>[0], {
    Bucket: bucket,
    Key: fileId,
    Body: text,
    ContentType: contentType,
  });
  await deleteMemoDraft(getDraftKey('s3', fileId));
  return { mode: 'storage' };
}
