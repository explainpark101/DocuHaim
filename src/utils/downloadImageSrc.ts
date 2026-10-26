import { imageSrcToPngBlob } from '@/utils/copyImageToClipboard';
import { triggerAppBlobDownload } from '@/utils/tauriBlobDownload';

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i;

/** Basename for a viewed image, or `image.<ext>` when the URL has none. */
export function imageDownloadFileName(src: string, fallbackExt = 'png'): string {
  const ext = fallbackExt.replace(/^\./, '') || 'png';
  const fallback = `image.${ext}`;
  try {
    const url = new URL(src, 'https://local.invalid');
    const base = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '');
    if (!base || base === '.' || base === '..' || base.includes('..')) return fallback;
    if (IMAGE_EXT.test(base)) return base;
    return `${base}.${ext}`;
  } catch {
    return fallback;
  }
}

export function downloadImageBlob(blob: Blob, fileName: string): Promise<boolean> {
  return triggerAppBlobDownload(blob, fileName);
}

/** Download the original bytes when CORS allows it; otherwise a PNG raster. */
export async function downloadImageSrc(src: string): Promise<boolean> {
  let blob: Blob;
  let name = imageDownloadFileName(src);
  try {
    const res = await fetch(src, { mode: 'cors', credentials: 'omit' });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    blob = await res.blob();
  } catch {
    blob = await imageSrcToPngBlob(src);
    name = name.replace(/\.[^.]+$/i, '');
    if (!name || name === 'image') name = 'image';
    name = `${name}.png`;
  }
  return downloadImageBlob(blob, name);
}
