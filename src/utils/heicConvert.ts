import { extensionOfFileName, isViewerImageFileName } from '@/utils/imageExtensions';

const HEIC_EXTENSIONS = new Set(['heic', 'heif']);

export function isHeicFileName(fileName: string): boolean {
  return HEIC_EXTENSIONS.has(extensionOfFileName(fileName));
}

export function isHeicMimeType(mimeType: string): boolean {
  const lower = String(mimeType || '').toLowerCase();
  return lower === 'image/heic' || lower === 'image/heif' || lower === 'image/heic-sequence';
}

export function blobLooksLikeHeic(blob: Blob, fileName?: string): boolean {
  if (isHeicMimeType(blob.type)) return true;
  if (fileName && isHeicFileName(fileName)) return true;
  return false;
}

/** Convert HEIC/HEIF blob to a browser-displayable JPEG blob. */
export async function convertHeicBlobToJpeg(blob: Blob): Promise<Blob> {
  const { default: heic2any } = await import('heic2any');
  const result = await heic2any({
    blob,
    toType: 'image/gif',
    quality: 0.92,
    gifInterval: 1,
  });
  const out = Array.isArray(result) ? result[0] : result;
  if (!(out instanceof Blob)) {
    throw new Error('HEIC conversion failed');
  }
  return out;
}

/** Return a blob suitable for `<img src={blob:...}>` (converts HEIC when needed). */
export async function toDisplayableImageBlob(blob: Blob, fileName?: string): Promise<Blob> {
  if (!blobLooksLikeHeic(blob, fileName)) return blob;
  return convertHeicBlobToJpeg(blob);
}

export async function toDisplayableImageObjectUrl(
  blob: Blob,
  fileName?: string,
): Promise<string> {
  const displayable = await toDisplayableImageBlob(blob, fileName);
  return URL.createObjectURL(displayable);
}

export async function toDisplayableImageFile(file: File): Promise<File> {
  if (!blobLooksLikeHeic(file, file.name)) return file;
  const jpeg = await convertHeicBlobToJpeg(file);
  const base = file.name.replace(/\.[^.]+$/, '') || 'image';
  return new File([jpeg], `${base}.jpg`, { type: 'image/jpeg', lastModified: file.lastModified });
}

/** HEIC files are images even when MIME sniffing fails. */
export function isProbablyHeicFile(file: File | null | undefined): boolean {
  if (!file) return false;
  if (isHeicMimeType(file.type)) return true;
  return isHeicFileName(file.name);
}

export function isDisplayableImageFileName(fileName: string): boolean {
  return isViewerImageFileName(fileName);
}
