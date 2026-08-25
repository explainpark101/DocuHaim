/**
 * Default Local Haim vault under app data (Android Tauri).
 * Desktop keeps user-picked absolute folders; web keeps FSA handles.
 */

import { isTauriAndroid } from '@/utils/tauriPlatform';
import {
  loadLocalVaultFsPath,
  saveLocalVaultFsPath,
} from '@/utils/localVaultPathStore';

const DEFAULT_FOLDER_NAME = 'LocalHaim';

/**
 * Ensure an app-private LocalHaim directory exists and is persisted.
 * Returns the absolute path, or null when not on Android Tauri.
 */
export async function ensureAndroidDefaultLocalVaultRoot(): Promise<string | null> {
  if (!isTauriAndroid()) return null;
  const existing = loadLocalVaultFsPath();
  if (existing) return existing;

  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const { mkdir, exists } = await import('@tauri-apps/plugin-fs');
  const base = await appDataDir();
  const root = await join(base, DEFAULT_FOLDER_NAME);
  if (!(await exists(root))) {
    await mkdir(root, { recursive: true });
  }
  saveLocalVaultFsPath(root, DEFAULT_FOLDER_NAME);
  return root;
}
