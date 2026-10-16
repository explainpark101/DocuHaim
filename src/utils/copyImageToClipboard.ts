/**
 * Copy a viewed image into the clipboard as PNG so it can be pasted
 * into chat, docs, and other apps.
 *
 * `clipboard.write` is started immediately and the blob is passed as a
 * Promise so the user gesture is still active while the image loads.
 */

export function isLightboxImageCopyShortcut(event: {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  isComposing?: boolean;
}): boolean {
  if (event.isComposing) return false;
  if (event.altKey || event.shiftKey) return false;
  if (!(event.metaKey || event.ctrlKey)) return false;
  return event.key.toLowerCase() === 'c';
}

export function canWriteClipboardImage(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.clipboard?.write === 'function' &&
    typeof ClipboardItem !== 'undefined'
  );
}

export async function imageSrcToPngBlob(src: string): Promise<Blob> {
  const source = await loadCopySource(src);
  try {
    return await rasterToPngBlob(source);
  } finally {
    if ('close' in source && typeof source.close === 'function') {
      try {
        source.close();
      } catch {
        // ignore
      }
    }
  }
}

export function copyPngBlobToClipboard(blob: Blob | Promise<Blob>): Promise<void> {
  if (!canWriteClipboardImage()) {
    return Promise.reject(new Error('Clipboard image write is not supported'));
  }
  const png = Promise.resolve(blob).then((value) =>
    value.type === 'image/png' ? value : transcodeBlobToPng(value),
  );
  return navigator.clipboard.write([
    new ClipboardItem({
      'image/png': png,
    }),
  ]);
}

export function copyImageSrcToClipboard(src: string): Promise<void> {
  return copyPngBlobToClipboard(imageSrcToPngBlob(src));
}

async function loadCopySource(src: string): Promise<ImageBitmap | HTMLImageElement> {
  try {
    const res = await fetch(src, { mode: 'cors', credentials: 'omit' });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  } catch {
    return await loadHtmlImage(src);
  }
}

function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = src;
  });
}

async function transcodeBlobToPng(blob: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(blob);
  try {
    return await rasterToPngBlob(bitmap);
  } finally {
    bitmap.close();
  }
}

function rasterToPngBlob(source: ImageBitmap | HTMLImageElement): Promise<Blob> {
  const width =
    source instanceof HTMLImageElement
      ? source.naturalWidth || source.width
      : source.width;
  const height =
    source instanceof HTMLImageElement
      ? source.naturalHeight || source.height
      : source.height;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(new Error('Canvas 2D unavailable'));
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to encode PNG'));
    }, 'image/png');
  });
}
