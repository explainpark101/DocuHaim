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

async function writeBlobWithTauriSaveDialog(blob: Blob, fileName: string): Promise<boolean> {
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
  if (!selectedPath || Array.isArray(selectedPath)) return false;

  const { writeFile } = await import('@tauri-apps/plugin-fs');
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await writeFile(String(selectedPath), bytes);
  return true;
}

async function writeBlobWithTauriFastDownload(blob: Blob, fileName: string): Promise<boolean> {
  const result = await writeBlobToTauriFastDirectory(blob, fileName);
  if (!result.ok) return false;
  notifyTauriDownloadComplete(result.savedName);
  return true;
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
  const normalizedName = normalizeUnicodeNfc(String(fileName || 'download'));

  if (isTauriDesktopPlatform() && loadTauriDownloadSaveDialogEnabled()) {
    try {
      const saved = await writeBlobWithTauriSaveDialog(blob, normalizedName);
      if (!saved) return false;
      notifyTauriDownloadComplete(normalizedName);
      return true;
    } catch (error) {
      console.error('Tauri save download failed:', error);
      throw error;
    }
  }

  if (canUseTauriFastDownload()) {
    try {
      return await writeBlobWithTauriFastDownload(blob, normalizedName);
    } catch (error) {
      console.error('Tauri fast download failed, falling back to anchor download:', error);
    }
  }

  triggerAnchorBlobDownload(blob, normalizedName);
  notifyTauriDownloadComplete(normalizedName);
  return true;
}
