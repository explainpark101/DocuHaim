import { appCacheDir, join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/core';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { isTauriAndroid } from '@/utils/tauriPlatform';

/**
 * Request legacy storage permission on API ≤ 28.
 * On Android 10+ MediaStore writes do not need the dialog; still calls through for consistency.
 */
export async function ensureAndroidStoragePermission(): Promise<boolean> {
  if (!isTauriAndroid()) return false;
  try {
    await invoke('android_ensure_storage_permission');
    return true;
  } catch (error) {
    console.warn('Android storage permission request failed:', error);
    return false;
  }
}

export type AndroidPublicDownloadResult = {
  ok: boolean;
  savedName: string;
};

/**
 * Write a blob into the shared Downloads folder via MediaStore (Q+) / legacy path.
 * Always requests storage permission first when the platform requires it.
 */
export async function writeBlobToAndroidPublicDownloads(
  blob: Blob,
  fileName: string,
): Promise<AndroidPublicDownloadResult> {
  if (!isTauriAndroid()) return { ok: false, savedName: fileName };

  const savedName = normalizeUnicodeNfc(String(fileName || 'download').trim() || 'download');
  const granted = await ensureAndroidStoragePermission();
  if (!granted) {
    throw new Error('저장소 권한이 필요합니다. 설정에서 권한을 허용한 뒤 다시 시도하세요.');
  }

  const cacheRoot = normalizeUnicodeNfc(await appCacheDir());
  const tempName = `dl-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const tempPath = normalizeUnicodeNfc(await join(cacheRoot, tempName));

  const { writeFile, remove, exists } = await import('@tauri-apps/plugin-fs');
  const bytes = new Uint8Array(await blob.arrayBuffer());
  try {
    await writeFile(tempPath, bytes);
    await invoke('android_save_file_to_downloads', {
      path: tempPath,
      fileName: savedName,
    });
    return { ok: true, savedName };
  } finally {
    try {
      if (await exists(tempPath)) await remove(tempPath);
    } catch {
      /* ignore temp cleanup */
    }
  }
}
