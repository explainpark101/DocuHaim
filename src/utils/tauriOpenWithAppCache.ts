/**
 * Temp-folder cache for "open with OS default app" (Tauri desktop).
 * Writes under OS temp / DocuHaim / open-with-app and purges by retention TTL.
 * Path/fs APIs are loaded lazily so web Vite never eagerly imports @tauri-apps/*.
 */

import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  loadOpenWithAppCacheRetentionSettings,
  openWithAppCacheRetentionToMs,
} from '@/utils/tauriOpenWithAppCacheSettings';

const CACHE_FOLDER_SEGMENTS = ['DocuHaim', 'open-with-app'] as const;

async function pathApi() {
  return import('@tauri-apps/api/path');
}

async function fsApi() {
  return import('@tauri-apps/plugin-fs');
}

async function fastDownloadApi() {
  return import('@/utils/tauriFastDownload');
}

let cachedDirPromise: Promise<string> | null = null;
let purgeInFlight: Promise<number> | null = null;

export async function resolveOpenWithAppCacheDir(): Promise<string> {
  if (!cachedDirPromise) {
    cachedDirPromise = (async () => {
      const { join, tempDir } = await pathApi();
      const { ensureTauriDir } = await fastDownloadApi();
      let dir = normalizeUnicodeNfc(await tempDir());
      for (const segment of CACHE_FOLDER_SEGMENTS) {
        dir = normalizeUnicodeNfc(await join(dir, segment));
      }
      await ensureTauriDir(dir);
      return dir;
    })().catch((error) => {
      cachedDirPromise = null;
      throw error;
    });
  }
  return cachedDirPromise;
}

function mtimeMs(meta: { mtime?: unknown; birthtime?: unknown }): number | null {
  const raw = meta.mtime ?? meta.birthtime;
  if (raw == null) return null;
  if (raw instanceof Date) {
    const t = raw.getTime();
    return Number.isFinite(t) ? t : null;
  }
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    // plugin-fs may return seconds or ms; treat small values as seconds.
    return raw < 1e12 ? raw * 1000 : raw;
  }
  const parsed = new Date(String(raw)).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Delete cached open-with-app files older than the configured retention.
 * @returns number of removed files
 */
export async function purgeExpiredOpenWithAppCache(
  nowMs: number = Date.now(),
): Promise<number> {
  if (!isTauriDesktopPlatform()) return 0;
  if (purgeInFlight) return purgeInFlight;

  purgeInFlight = (async () => {
    const retentionMs = openWithAppCacheRetentionToMs(
      loadOpenWithAppCacheRetentionSettings(),
    );
    if (!(retentionMs > 0)) return 0;

    const { join } = await pathApi();
    const { readDir, stat, remove } = await fsApi();
    const dir = await resolveOpenWithAppCacheDir();
    const entries = await readDir(dir);
    let removed = 0;
    const cutoff = nowMs - retentionMs;

    for (const entry of entries) {
      const name = normalizeUnicodeNfc(entry.name || '');
      if (!name || entry.isDirectory) continue;
      const abs = normalizeUnicodeNfc(await join(dir, name));
      try {
        const meta = await stat(abs);
        const stamp = mtimeMs(meta);
        if (stamp == null || stamp > cutoff) continue;
        await remove(abs);
        removed += 1;
      } catch (error) {
        console.warn('Failed to purge open-with-app cache entry:', abs, error);
      }
    }
    return removed;
  })().finally(() => {
    purgeInFlight = null;
  });

  return purgeInFlight;
}

export type OpenWithAppCacheWriteResult = {
  ok: boolean;
  savedPath?: string;
  savedName: string;
};

/** Write a blob into the open-with-app temp cache (no save dialog). */
export async function writeBlobToOpenWithAppCache(
  blob: Blob,
  fileName: string,
): Promise<OpenWithAppCacheWriteResult> {
  if (!isTauriDesktopPlatform()) {
    return { ok: false, savedName: normalizeUnicodeNfc(String(fileName || 'download')) };
  }
  const { join } = await pathApi();
  const { allocateUniqueTauriEntryName, writeBlobToTauriPath } = await fastDownloadApi();
  const normalizedName = normalizeUnicodeNfc(String(fileName || 'download'));
  const dir = await resolveOpenWithAppCacheDir();
  void purgeExpiredOpenWithAppCache().catch((error) => {
    console.warn('Open-with-app cache purge failed:', error);
  });
  const uniqueName = await allocateUniqueTauriEntryName(dir, normalizedName);
  const savedPath = normalizeUnicodeNfc(await join(dir, uniqueName));
  await writeBlobToTauriPath(savedPath, blob);
  return { ok: true, savedPath, savedName: uniqueName };
}

/** Boot hook: purge expired temp open-with-app files once. */
export function initTauriOpenWithAppCacheCleanup(): void {
  if (!isTauriDesktopPlatform()) return;
  void purgeExpiredOpenWithAppCache().catch((error) => {
    console.warn('Open-with-app cache boot purge failed:', error);
  });
}
