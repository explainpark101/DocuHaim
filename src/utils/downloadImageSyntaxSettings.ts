export type DownloadImageSyntax = 'wiki' | 'markdown';

const STORAGE_KEY = 's3haim_download_image_syntax';

export function isDownloadImageSyntax(value: unknown): value is DownloadImageSyntax {
  return value === 'wiki' || value === 'markdown';
}

export function loadDownloadImageSyntax(): DownloadImageSyntax {
  if (typeof window === 'undefined') return 'markdown';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (isDownloadImageSyntax(raw)) return raw;
  } catch {
    /* ignore */
  }
  return 'markdown';
}

export function saveDownloadImageSyntax(syntax: DownloadImageSyntax): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, syntax);
  } catch {
    /* ignore */
  }
}
