import { createStorageBackend } from '@/utils/storage/createStorageBackend.js';
import { downloadTelegramMedia } from '@/utils/telegram/media';

type SaveDeps = {
  mode: 's3' | 'local' | 'webdav' | 'idb';
  getS3Client?: () => unknown;
  bucket?: string;
  localRootHandle?: FileSystemDirectoryHandle | null;
  localVaultFsPath?: string;
  webdavConfig?: {
    endpoint: string;
    username: string;
    password: string;
    basePath: string;
  } | null;
};

function joinVaultPath(folder: string, name: string): string {
  const base = name.replace(/[\\/]/g, '_').replace(/\s+/g, ' ').trim() || 'telegram-file';
  const dir = folder.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  return dir ? `${dir}/${base}` : base;
}

export async function saveTelegramMediaToVault(
  deps: SaveDeps,
  folderPath: string,
  dialogId: string,
  messageId: number,
): Promise<string> {
  const media = await downloadTelegramMedia(dialogId, messageId);
  const dest = joinVaultPath(folderPath, media.name);
  const backend = createStorageBackend({
    mode: deps.mode,
    getS3Client: deps.getS3Client as never,
    s3Creds: { bucket: deps.bucket || '' },
    localRootHandle: deps.localRootHandle ?? null,
    localVaultFsPath: deps.localVaultFsPath || '',
    webdavConfig: deps.webdavConfig ?? null,
  });
  await backend.writeBytes(dest, media.bytes);
  return dest;
}
