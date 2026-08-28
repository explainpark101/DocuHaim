/** Extensions opened in the image viewer or treated as raster images. */
export const VIEWER_IMAGE_EXTENSIONS = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'bmp',
  'ico',
  'avif',
  'heic',
  'heif',
] as const;

export function extensionOfFileName(fileName: string): string {
  const base = String(fileName || '');
  const dot = base.lastIndexOf('.');
  if (dot <= 0 || dot === base.length - 1) return '';
  return base.slice(dot + 1).toLowerCase();
}

export function isViewerImageExtension(ext: string): boolean {
  return VIEWER_IMAGE_EXTENSIONS.includes(ext as (typeof VIEWER_IMAGE_EXTENSIONS)[number]);
}

export function isViewerImageFileName(fileName: string): boolean {
  return isViewerImageExtension(extensionOfFileName(fileName));
}
