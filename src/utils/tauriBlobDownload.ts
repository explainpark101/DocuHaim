import type { ToastIcon } from '@/contexts/ToastContext';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { loadTauriDownloadSaveDialogEnabled } from '@/utils/tauriDownloadSettings';
import {
  canUseTauriFastDownload,
  writeBlobToTauriFastDirectory,
} from '@/utils/tauriFastDownload';

type ShowToastFn = (options: { message: string; icon?: ToastIcon }) => void;

let showToastImpl: ShowToastFn | null = null;

/** Wired by ToastProvider so non-React download helpers can trigger toasts. */
export function bindTauriDownloadToast(showToast: ShowToastFn | null): void {
  showToastImpl = showToast;
}

function extensionFromFileName(fileName: string): string | undefined {
  const base = fileName.split(/[/\\]/).pop() || fileName;
  const dot = base.lastIndexOf('.');
  if (dot <= 0 || dot === base.length - 1) return undefined;
  return base.slice(dot + 1).toLowerCase();
}

function triggerAnchorBlobDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = normalizeUnicodeNfc(String(fileName || 'download'));
  a.click();
  URL.revokeObjectURL(url);
}

export function notifyTauriDownloadComplete(fileName: string): void {
  if (!isDesktopApp()) return;
  const label = normalizeUnicodeNfc(String(fileName || 'download').trim() || 'download');
  showToastImpl?.({
    message: `「${label}」 다운로드 완료`,
    icon: 'check',
  });
}

export type AppBlobDownloadResult = {
  ok: boolean;
  savedPath?: string;
};

async function writeBlobWithTauriSaveDialog(
  blob: Blob,
  fileName: string,
): Promise<AppBlobDownloadResult> {
  const normalizedName = normalizeUnicodeNfc(String(fileName || 'download'));
  const { save } = await import('@tauri-apps/plugin-dialog');
  const extension = extensionFromFileName(normalizedName);
  const selectedPath = await save({
    defaultPath: normalizedName,
    title: '다운로드 위치 선택',
    ...(extension
      ? {
          filters: [
            {
              name: extension.toUpperCase(),
              extensions: [extension],
            },
          ],
        }
      : {}),
  });
  if (!selectedPath || Array.isArray(selectedPath)) return { ok: false };

  const savedPath = normalizeUnicodeNfc(String(selectedPath));
  const { writeFile } = await import('@tauri-apps/plugin-fs');
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await writeFile(savedPath, bytes);
  return { ok: true, savedPath };
}

async function writeBlobWithTauriFastDownload(
  blob: Blob,
  fileName: string,
): Promise<AppBlobDownloadResult> {
  const result = await writeBlobToTauriFastDirectory(blob, fileName);
  if (!result.ok || !result.savedPath) return { ok: false };
  notifyTauriDownloadComplete(result.savedName);
  return { ok: true, savedPath: result.savedPath };
}

async function downloadAppBlob(blob: Blob, fileName: string): Promise<AppBlobDownloadResult> {
  const normalizedName = normalizeUnicodeNfc(String(fileName || 'download'));

  if (isTauriDesktopPlatform() && loadTauriDownloadSaveDialogEnabled()) {
    try {
      const result = await writeBlobWithTauriSaveDialog(blob, normalizedName);
      if (!result.ok) return result;
      notifyTauriDownloadComplete(normalizedName);
      return result;
    } catch (error) {
      console.error('Tauri save download failed:', error);
      throw error;
    }
  }

  if (canUseTauriFastDownload()) {
    try {
      const result = await writeBlobWithTauriFastDownload(blob, normalizedName);
      if (result.ok) return result;
    } catch (error) {
      console.error('Tauri fast download failed, falling back to anchor download:', error);
    }
  }

  triggerAnchorBlobDownload(blob, normalizedName);
  notifyTauriDownloadComplete(normalizedName);
  return { ok: true };
}

/** Open a saved local file with the OS default application (Tauri desktop only). */
export async function openTauriPathWithDefaultApp(filePath: string): Promise<void> {
  if (!isTauriDesktopPlatform()) return;
  const normalized = normalizeUnicodeNfc(String(filePath || '').trim());
  if (!normalized) return;
  try {
    const { open } = await import('@tauri-apps/plugin-shell');
    await open(normalized);
  } catch (error) {
    console.warn('Failed to open downloaded file:', normalized, error);
  }
}

/**
 * Download a blob as a file.
 * - Save-dialog ON (Tauri desktop): per-file save dialog.
 * - Save-dialog OFF (Tauri desktop): fast write to remembered folder or system Downloads.
 * - Web: anchor download.
 *
 * @returns false when the user cancels the save dialog; true on success.
 */
export async function triggerAppBlobDownload(blob: Blob, fileName: string): Promise<boolean> {
  const result = await downloadAppBlob(blob, fileName);
  return result.ok;
}

/**
 * Tauri desktop: download a blob, then open it with the default app when a local path is known.
 */
export async function triggerAppBlobDownloadAndOpen(blob: Blob, fileName: string): Promise<boolean> {
  const result = await downloadAppBlob(blob, fileName);
  if (result.ok && result.savedPath) {
    await openTauriPathWithDefaultApp(result.savedPath);
  }
  return result.ok;
}
