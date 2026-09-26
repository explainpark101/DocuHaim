/**
 * Bridge so wiki-image node views can upload annotated PNGs without prop drilling.
 * Registered by HaimEditor while mounted.
 */

export type HaimAnnotateUploadFn = (files: File[]) => Promise<string[]>;

let uploadFn: HaimAnnotateUploadFn | null = null;

export function registerHaimAnnotateUpload(fn: HaimAnnotateUploadFn | null): void {
  uploadFn = fn;
}

export function isHaimAnnotateUploadAvailable(): boolean {
  return typeof uploadFn === 'function';
}

export async function uploadHaimAnnotatedImage(file: File): Promise<string> {
  if (!uploadFn) {
    throw new Error('Image upload is not available');
  }
  const paths = await uploadFn([file]);
  const path = paths[0]?.trim();
  if (!path) {
    throw new Error('Upload returned no path');
  }
  return path;
}

export function normalizeUploadResult(result: unknown): string[] {
  if (Array.isArray(result)) {
    return result.map((p) => String(p || '').trim()).filter(Boolean);
  }
  if (typeof result === 'string' && result.trim()) {
    return [result.trim()];
  }
  return [];
}
