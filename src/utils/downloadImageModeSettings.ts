export type DownloadImageMode = 'files' | 'base64';

const LOCAL_STORAGE_KEY = 's3haim_download_image_mode';

export function isDownloadImageMode(value: unknown): value is DownloadImageMode {
  return value === 'files' || value === 'base64';
}

export function loadDownloadImageMode(): DownloadImageMode {
  if (typeof window === 'undefined') return 'files';
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isDownloadImageMode(raw)) return raw;
  } catch {
    /* ignore */
  }
  return 'files';
}

export function saveDownloadImageMode(mode: DownloadImageMode): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}
