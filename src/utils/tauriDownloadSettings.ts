const LOCAL_STORAGE_KEY = 's3haim_tauri_download_save_dialog';

/** Default: prompt for save path before each Tauri desktop download. */
export const TAURI_DOWNLOAD_SAVE_DIALOG_DEFAULT_ENABLED = true;

/** When true, Tauri desktop shows a save dialog before writing downloaded files. */
export function loadTauriDownloadSaveDialogEnabled(): boolean {
  if (typeof window === 'undefined') return TAURI_DOWNLOAD_SAVE_DIALOG_DEFAULT_ENABLED;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw == null) {
      saveTauriDownloadSaveDialogEnabled(TAURI_DOWNLOAD_SAVE_DIALOG_DEFAULT_ENABLED);
      return TAURI_DOWNLOAD_SAVE_DIALOG_DEFAULT_ENABLED;
    }
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    /* ignore */
  }
  return TAURI_DOWNLOAD_SAVE_DIALOG_DEFAULT_ENABLED;
}

export function saveTauriDownloadSaveDialogEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    /* ignore */
  }
}
