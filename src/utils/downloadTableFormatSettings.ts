export type DownloadTableFormat = 'haim' | 'html';

const STORAGE_KEY = 's3haim_download_table_format';

export function isDownloadTableFormat(v: unknown): v is DownloadTableFormat {
  return v === 'haim' || v === 'html';
}

export function loadDownloadTableFormat(): DownloadTableFormat {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (isDownloadTableFormat(raw)) return raw;
  } catch {
    /* ignore */
  }
  return 'haim';
}

export function saveDownloadTableFormat(format: DownloadTableFormat): void {
  try {
    localStorage.setItem(STORAGE_KEY, format);
  } catch {
    /* ignore */
  }
}
