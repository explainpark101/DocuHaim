/**
 * Open a vault / session file with the OS default application (Tauri desktop only).
 * Local vault with an absolute root opens in place; otherwise download then open.
 */

import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  openTauriPathWithDefaultApp,
  triggerAppBlobDownloadAndOpen,
} from '@/utils/tauriBlobDownload';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';

export function joinVaultAbsolutePath(
  vaultRoot: string,
  relativePath: string,
): string {
  const base = String(vaultRoot || '').replace(/[/\\]+$/, '');
  const rel = String(relativePath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  if (!base) return rel;
  if (!rel) return base;
  return `${base}/${rel}`.replace(/\\/g, '/');
}

export type OpenFileWithDefaultAppParams = {
  storageType: string | null | undefined;
  path: string | null | undefined;
  fileName?: string | null | undefined;
  /** When set (local Tauri vault), open this absolute path without copying. */
  localAbsolutePath?: string | null | undefined;
  /** In-memory / object URL already loaded in the viewer. */
  objectUrl?: string | null | undefined;
  readBytes?: ((storageType: string, path: string) => Promise<ArrayBuffer | Uint8Array>) | null;
};

function fileLabel(fileName: string | null | undefined, path: string | null | undefined): string {
  const fromName = String(fileName || '').trim();
  if (fromName) return normalizeUnicodeNfc(fromName);
  const base = String(path || '')
    .split(/[/\\]/)
    .filter(Boolean)
    .pop();
  return normalizeUnicodeNfc(base || 'download');
}

/**
 * @returns true when the file was opened (or saved+opened); false if cancelled / unsupported.
 */
export async function openFileWithDefaultApp(
  params: OpenFileWithDefaultAppParams,
): Promise<boolean> {
  if (!isTauriDesktopPlatform()) return false;

  const abs = String(params.localAbsolutePath || '').trim();
  if (abs) {
    await openTauriPathWithDefaultApp(abs);
    return true;
  }

  const label = fileLabel(params.fileName, params.path);
  const objectUrl = String(params.objectUrl || '').trim();
  if (objectUrl) {
    const response = await fetch(objectUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const blob = await response.blob();
    return triggerAppBlobDownloadAndOpen(blob, label);
  }

  const storageType = String(params.storageType || '').trim();
  const path = String(params.path || '').trim();
  if (!storageType || !path || typeof params.readBytes !== 'function') {
    return false;
  }
  const body = await params.readBytes(storageType, path);
  const bytes = body instanceof Uint8Array ? body : new Uint8Array(body);
  return triggerAppBlobDownloadAndOpen(new Blob([bytes as BlobPart]), label);
}
