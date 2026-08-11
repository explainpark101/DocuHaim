import {
  WIKI_IMAGE_RE,
  markdownImageAttrsBlockFromSize,
  parseMarkdownImageAttrsBlock,
  parseWikiImageInner,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';
import {
  decodeMarkdownImageSrc,
  decodeStoragePath,
  extractMarkdownImageDestinationSrc,
  isStorageImageSrc,
  resolveStorageImagePath,
} from '@/utils/storageImagePath';
import type { DownloadImageSyntax } from '@/utils/downloadImageSyntaxSettings';
import { parseNoteCover, upsertNoteCoverComment } from '@/utils/noteCover/parse';
import type { NoteCover } from '@/utils/noteCover/types';

export const MARKDOWN_PICTURES_DIR = '.pictures';

export type PlanMarkdownImageExportOptions = {
  /** Image markup in the exported markdown. Default: markdown `![]()`. */
  syntax?: DownloadImageSyntax;
};

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
const FENCED_BLOCK_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;
const DATA_IMAGE_URI_RE = /^data:([^;,]+);base64,([A-Za-z0-9+/=\s]+)$/i;

/**
 * Rewrite note-cover `bg.imagePath` and image-element `path` values via `mapPath`.
 * `mapPath` returns the replacement, or null/undefined to leave the value unchanged.
 */
export function mapNoteCoverImagePaths(
  cover: NoteCover,
  mapPath: (src: string) => string | null | undefined,
): { cover: NoteCover; changed: boolean } {
  let changed = false;
  let imagePath = cover.bg.imagePath;
  if (imagePath) {
    const next = mapPath(imagePath);
    if (typeof next === 'string' && next !== imagePath) {
      imagePath = next;
      changed = true;
    }
  }
  const elements = cover.elements.map((el) => {
    if (el.type !== 'image') return el;
    const next = mapPath(el.path);
    if (typeof next !== 'string' || next === el.path) return el;
    changed = true;
    return { ...el, path: next };
  });
  if (!changed) return { cover, changed: false };
  return {
    cover: {
      ...cover,
      bg: { ...cover.bg, imagePath },
      elements,
    },
    changed: true,
  };
}

/** Apply `mapPath` to note-cover image fields in leading `<!-- note-cover -->` JSON. */
export function rewriteNoteCoverImagePathsInMarkdown(
  markdown: string,
  mapPath: (src: string) => string | null | undefined,
): string {
  const { cover } = parseNoteCover(markdown);
  if (!cover) return markdown;
  const mapped = mapNoteCoverImagePaths(cover, mapPath);
  if (!mapped.changed) return markdown;
  return upsertNoteCoverComment(markdown, mapped.cover);
}

export type MarkdownExportImage = {
  sourcePath: string;
  relativePath: string;
};

export type MarkdownImageExportPlan = {
  markdown: string;
  images: MarkdownExportImage[];
};

export function isMarkdownFileName(name: string | null | undefined): boolean {
  const lower = String(name || '').trim().toLowerCase();
  return lower.endsWith('.md') || lower.endsWith('.markdown');
}

export function zipFileNameForMarkdown(fileName: string): string {
  const name = String(fileName || 'download').trim() || 'download';
  if (/\.markdown$/i.test(name)) return name.replace(/\.markdown$/i, '.zip');
  if (/\.md$/i.test(name)) return name.replace(/\.md$/i, '.zip');
  return `${name}.zip`;
}

/**
 * Folder name for Storage API MD downloads (same as the markdown file name).
 * Files are written under `{pickedDir}/{bundleDir}/{mdFile}` (+ `.pictures/`).
 */
export function markdownExportBundleDirectoryName(fileName: string): string {
  const name = sanitizeExportFileName(String(fileName || 'download').trim() || 'download');
  return name || 'download';
}

function sanitizeExportFileName(name: string): string {
  const cleaned = String(name || '')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/^\.+$/, '')
    .trim();
  return cleaned || 'image';
}

function basename(path: string): string {
  const normalized = String(path || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const parts = normalized.split('/').filter(Boolean);
  return parts[parts.length - 1] || 'image';
}

function uniqueExportName(rawName: string, used: Set<string>): string {
  const sanitized = sanitizeExportFileName(rawName);
  if (!used.has(sanitized.toLowerCase())) {
    used.add(sanitized.toLowerCase());
    return sanitized;
  }
  const lastDot = sanitized.lastIndexOf('.');
  const stem = lastDot > 0 ? sanitized.slice(0, lastDot) : sanitized;
  const ext = lastDot > 0 ? sanitized.slice(lastDot) : '';
  let index = 2;
  let candidate = `${stem}-${index}${ext}`;
  while (used.has(candidate.toLowerCase())) {
    index += 1;
    candidate = `${stem}-${index}${ext}`;
  }
  used.add(candidate.toLowerCase());
  return candidate;
}

function mapOutsideFences(source: string, transform: (chunk: string) => string): string {
  return source
    .split(FENCED_BLOCK_RE)
    .map((part, index) => (index % 2 === 1 ? part : transform(part)))
    .join('');
}

/** Wiki keys and `.images/...` markdown dests are vault-root object keys. */
function resolveExportSourcePath(src: string, notePath?: string | null): string | null {
  // Use decodeStoragePath so cover/wiki vault keys with spaces are not truncated
  // (decodeMarkdownImageSrc splits on whitespace for optional MD titles).
  const decoded = decodeStoragePath(src);
  if (!decoded || !isStorageImageSrc(decoded)) return null;
  const normalized = decoded.replace(/^\/+/, '');
  if (normalized.startsWith('.images/')) return normalized;
  return resolveStorageImagePath(decoded, notePath);
}

/** Destination src for `![](...)`; keep full `data:` payloads (may contain spaces). */
function markdownImageDestinationSrc(destination: string): string {
  const trimmed = String(destination || '').trim();
  if (/^data:/i.test(trimmed)) return trimmed;
  return extractMarkdownImageDestinationSrc(trimmed);
}

/**
 * Rewrite wiki/storage images to `.pictures/name` references and collect vault paths to bundle.
 * Also rewrites note-cover `bg.imagePath` / image-element `path` fields the same way.
 * `syntax: 'markdown'` → `![](.pictures/name){…}` (default)
 * `syntax: 'wiki'` → `![[.pictures/name|…]]`
 */
export function planMarkdownImageExport(
  markdown: string,
  notePath?: string | null,
  options?: PlanMarkdownImageExportOptions,
): MarkdownImageExportPlan {
  const syntax: DownloadImageSyntax = options?.syntax === 'wiki' ? 'wiki' : 'markdown';
  const source = String(markdown ?? '');
  const usedNames = new Set<string>();
  const pathToRelative = new Map<string, string>();
  const images: MarkdownExportImage[] = [];

  const allocate = (storagePath: string): string => {
    const existing = pathToRelative.get(storagePath);
    if (existing) return existing;
    const fileName = uniqueExportName(basename(storagePath), usedNames);
    const relativePath = `${MARKDOWN_PICTURES_DIR}/${fileName}`;
    pathToRelative.set(storagePath, relativePath);
    images.push({ sourcePath: storagePath, relativePath });
    return relativePath;
  };

  let rewritten = mapOutsideFences(source, (chunk) => {
    const placeholders: string[] = [];
    let next = chunk.replace(new RegExp(WIKI_IMAGE_RE.source, 'g'), (full, rawInner: string) => {
      const parsed = parseWikiImageInner(rawInner);
      const storagePath = String(parsed?.path || '').replace(/^\/+/, '');
      if (!storagePath) return full;
      const relativePath = allocate(storagePath);
      const size = {
        width: parsed?.width ?? null,
        height: parsed?.height ?? null,
        background: parsed?.background ?? null,
      };
      const replacement =
        syntax === 'wiki'
          ? wikiImageMarkupFromAttrs({ path: relativePath, ...size })
          : (() => {
              const attrs = markdownImageAttrsBlockFromSize(size);
              return attrs ? `![](${relativePath})${attrs}` : `![](${relativePath})`;
            })();
      const token = `\0MDIMG${placeholders.length}\0`;
      placeholders.push(replacement);
      return token;
    });

    next = next.replace(
      new RegExp(MARKDOWN_IMAGE_RE.source, 'g'),
      (full, alt: string, destination: string, rawAttrs = '') => {
        const dest = String(destination ?? '');
        const mdSrc = markdownImageDestinationSrc(dest);
        if (!mdSrc || !isStorageImageSrc(mdSrc)) return full;
        const resolved = resolveExportSourcePath(mdSrc, notePath);
        if (!resolved) return full;
        const relativePath = allocate(resolved);
        if (syntax === 'wiki') {
          const size = parseMarkdownImageAttrsBlock(rawAttrs);
          return wikiImageMarkupFromAttrs({ path: relativePath, ...size });
        }
        const srcIndex = dest.indexOf(mdSrc);
        const titlePart = srcIndex >= 0 ? dest.slice(srcIndex + mdSrc.length) : '';
        return `![${alt}](${relativePath}${titlePart})${rawAttrs || ''}`;
      },
    );

    placeholders.forEach((replacement, index) => {
      next = next.replace(`\0MDIMG${index}\0`, replacement);
    });
    return next;
  });

  rewritten = rewriteNoteCoverImagePathsInMarkdown(rewritten, (src) => {
    if (!isStorageImageSrc(src)) return null;
    const resolved = resolveExportSourcePath(src, notePath);
    if (!resolved) return null;
    return allocate(resolved);
  });

  return { markdown: rewritten, images };
}

export async function collectMarkdownExportImageBytes(
  images: MarkdownExportImage[],
  readBytes: (path: string) => Promise<Uint8Array>,
  onProgress?: (completed: number, total: number) => void,
): Promise<{ entries: Array<{ path: string; data: Uint8Array }>; missing: string[] }> {
  const entries: Array<{ path: string; data: Uint8Array }> = [];
  const missing: string[] = [];
  const total = images.length;
  let completed = 0;

  for (const image of images) {
    try {
      const data = await readBytes(image.sourcePath);
      entries.push({
        path: image.relativePath,
        data: data instanceof Uint8Array ? data : new Uint8Array(data),
      });
    } catch (error) {
      console.warn('[markdown-export] failed to read image', image.sourcePath, error);
      missing.push(image.sourcePath);
    }
    completed += 1;
    onProgress?.(completed, total);
  }

  return { entries, missing };
}

export function buildMarkdownImageZipEntries(
  mdFileName: string,
  markdown: string,
  images: Array<{ path: string; data: Uint8Array }>,
): Array<{ path: string; data: Uint8Array }> {
  return [
    { path: mdFileName, data: new TextEncoder().encode(markdown) },
    ...images,
  ];
}

export async function writeMarkdownImageBundleToDirectory(
  dirHandle: FileSystemDirectoryHandle,
  mdFileName: string,
  markdown: string,
  images: Array<{ path: string; data: Uint8Array }>,
  onProgress?: (percent: number) => void,
): Promise<void> {
  const total = 1 + images.length;
  let done = 0;
  const tick = () => {
    done += 1;
    onProgress?.(Math.min(100, Math.round((done / total) * 100)));
  };

  const mdHandle = await dirHandle.getFileHandle(mdFileName, { create: true });
  const mdWritable = await mdHandle.createWritable();
  try {
    await mdWritable.write(markdown);
  } finally {
    await mdWritable.close();
  }
  tick();

  if (images.length === 0) return;

  const picturesDir = await dirHandle.getDirectoryHandle(MARKDOWN_PICTURES_DIR, { create: true });
  for (const image of images) {
    const fileName = basename(image.path);
    const fileHandle = await picturesDir.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    try {
      const bytes = new Uint8Array(image.data.byteLength);
      bytes.set(image.data);
      await writable.write(bytes);
    } finally {
      await writable.close();
    }
    tick();
  }
}

export function formatMissingExportImagesMessage(missing: string[]): string {
  if (!missing.length) return '';
  const preview = missing.slice(0, 5).join('\n');
  const more = missing.length > 5 ? `\n… 외 ${missing.length - 5}개` : '';
  return `일부 이미지를 포함하지 못했습니다:\n${preview}${more}`;
}

export function sniffImageMimeFromBytes(data: Uint8Array, fileName?: string): string {
  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return 'image/jpeg';
  if (data.length >= 4 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47) {
    return 'image/png';
  }
  if (data.length >= 4 && data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46) return 'image/gif';
  if (
    data.length >= 12 &&
    data[0] === 0x52 &&
    data[1] === 0x49 &&
    data[2] === 0x46 &&
    data[3] === 0x46 &&
    data[8] === 0x57 &&
    data[9] === 0x45 &&
    data[10] === 0x42 &&
    data[11] === 0x50
  ) {
    return 'image/webp';
  }
  const ext = String(fileName || '')
    .split('.')
    .pop()
    ?.toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'svg') return 'image/svg+xml';
  if (ext === 'bmp') return 'image/bmp';
  if (ext === 'avif') return 'image/avif';
  return 'application/octet-stream';
}

export function uint8ToBase64(data: Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    let part = '';
    for (let j = 0; j < chunk.length; j += 1) {
      part += String.fromCharCode(chunk[j] ?? 0);
    }
    binary += part;
  }
  return btoa(binary);
}

/**
 * Replace `.pictures/...` destinations produced by `planMarkdownImageExport`
 * with `data:` URIs so the note can be downloaded as a single markdown file.
 */
export function imageExtensionFromMime(mime: string): string {
  const normalized = String(mime || '').toLowerCase();
  if (normalized.includes('jpeg') || normalized.includes('jpg')) return '.jpg';
  if (normalized.includes('png')) return '.png';
  if (normalized.includes('gif')) return '.gif';
  if (normalized.includes('webp')) return '.webp';
  if (normalized.includes('svg')) return '.svg';
  if (normalized.includes('bmp')) return '.bmp';
  if (normalized.includes('avif')) return '.avif';
  return '.png';
}

export function base64ToUint8Array(b64: string): Uint8Array {
  const cleaned = String(b64 || '').replace(/\s/g, '');
  const binary = atob(cleaned);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

export function isDataImageUri(value: string | null | undefined): boolean {
  return /^data:image\//i.test(String(value || '').trim());
}

/**
 * Build a File from a `data:image/...;base64,...` URI for vault/wiki upload.
 */
export function fileFromDataImageUri(dataUri: string, fileName?: string): File {
  const raw = String(dataUri || '').trim();
  const match = /^data:([^;,]+);base64,([A-Za-z0-9+/=\s]+)$/i.exec(raw);
  if (!match) {
    throw new Error('Invalid data image URI');
  }
  const mime = match[1] || 'image/png';
  const data = base64ToUint8Array(match[2] || '');
  const name = fileName || `image${imageExtensionFromMime(mime)}`;
  return new File([data as BlobPart], name, { type: mime });
}

export async function fileFromImageUrl(url: string, fileName?: string): Promise<File> {
  const raw = String(url || '').trim();
  if (!raw) {
    throw new Error('Image URL is empty');
  }
  if (isDataImageUri(raw)) {
    return fileFromDataImageUri(raw, fileName);
  }
  const response = await fetch(raw);
  if (!response.ok) {
    throw new Error(`Failed to fetch image (${response.status})`);
  }
  const blob = await response.blob();
  const mime = blob.type?.startsWith('image/') ? blob.type : 'image/png';
  const fromUrl = basename(decodeMarkdownImageSrc(raw).split('?')[0] || '');
  const name =
    fileName ||
    (fromUrl && /\.[a-z0-9]+$/i.test(fromUrl)
      ? sanitizeExportFileName(fromUrl)
      : `image${imageExtensionFromMime(mime)}`);
  return new File([blob], name, { type: mime });
}

export type PrepareMarkdownImageForWikiConvertResult =
  | { mode: 'path'; path: string }
  | { mode: 'file'; file: File };

/**
 * Prepare a standard markdown image for wiki conversion.
 * Vault-relative destinations reuse the resolved path; data/remote need upload.
 */
export async function prepareMarkdownImageForWikiConvert(options: {
  markdownSrc: string;
  displaySrc?: string | null;
  currentNotePath?: string | null;
}): Promise<PrepareMarkdownImageForWikiConvertResult> {
  const src = decodeMarkdownImageSrc(options.markdownSrc);
  if (!src) {
    throw new Error('Image source is empty');
  }

  if (isDataImageUri(src)) {
    return { mode: 'file', file: fileFromDataImageUri(src) };
  }

  if (isStorageImageSrc(src)) {
    const path = resolveStorageImagePath(src, options.currentNotePath);
    if (path) {
      return { mode: 'path', path };
    }
  }

  const display = String(options.displaySrc || '').trim();
  const fetchUrl = display || src;
  if (!fetchUrl) {
    throw new Error('No image URL available for upload');
  }

  const preferredName = isStorageImageSrc(src)
    ? basename(src)
    : basename(decodeMarkdownImageSrc(src).split('?')[0] || '');
  const file = await fileFromImageUrl(
    fetchUrl,
    preferredName && preferredName !== 'image' ? preferredName : undefined,
  );
  return { mode: 'file', file };
}

/**
 * Turn inlined `data:image/...;base64,...` markdown / note-cover images into `.pictures/` files.
 */
export function extractMarkdownDataUriImages(
  markdown: string,
  options?: { reservedNames?: Iterable<string> },
): {
  markdown: string;
  images: Array<{ path: string; data: Uint8Array }>;
} {
  const used = new Set<string>();
  for (const name of options?.reservedNames ?? []) {
    const fileName = basename(String(name || ''));
    if (fileName) used.add(fileName.toLowerCase());
  }
  const images: Array<{ path: string; data: Uint8Array }> = [];

  const allocateDataUri = (dataUri: string): string | null => {
    const match = DATA_IMAGE_URI_RE.exec(dataUri);
    if (!match) return null;
    const mime = match[1] || 'image/png';
    const data = base64ToUint8Array(match[2] || '');
    const fileName = uniqueExportName(`image${imageExtensionFromMime(mime)}`, used);
    const relativePath = `${MARKDOWN_PICTURES_DIR}/${fileName}`;
    images.push({ path: relativePath, data });
    return relativePath;
  };

  let rewritten = mapOutsideFences(String(markdown ?? ''), (chunk) =>
    chunk.replace(
      new RegExp(MARKDOWN_IMAGE_RE.source, 'g'),
      (full, alt: string, destination: string, rawAttrs = '') => {
        const dest = String(destination ?? '');
        const mdSrc = markdownImageDestinationSrc(dest);
        const relativePath = allocateDataUri(mdSrc);
        if (!relativePath) return full;
        const srcIndex = dest.indexOf(mdSrc);
        const titlePart = srcIndex >= 0 ? dest.slice(srcIndex + mdSrc.length) : '';
        return `![${alt}](${relativePath}${titlePart})${rawAttrs || ''}`;
      },
    ),
  );

  rewritten = rewriteNoteCoverImagePathsInMarkdown(rewritten, (src) => allocateDataUri(src));

  return { markdown: rewritten, images };
}

export function embedMarkdownImagesAsDataUris(
  markdown: string,
  images: Array<{ path: string; data: Uint8Array }>,
): string {
  const byPath = new Map(images.map((image) => [image.path, image]));
  const toDataUri = (src: string): string | null => {
    const image = byPath.get(src);
    if (!image) return null;
    const mime = sniffImageMimeFromBytes(image.data, src);
    return `data:${mime};base64,${uint8ToBase64(image.data)}`;
  };

  let next = mapOutsideFences(String(markdown ?? ''), (chunk) =>
    chunk.replace(
      new RegExp(MARKDOWN_IMAGE_RE.source, 'g'),
      (full, alt: string, destination: string, rawAttrs = '') => {
        const dest = String(destination ?? '');
        const mdSrc = markdownImageDestinationSrc(dest);
        const dataUri = mdSrc ? toDataUri(mdSrc) : null;
        if (!dataUri) return full;
        const srcIndex = dest.indexOf(mdSrc);
        const titlePart = srcIndex >= 0 ? dest.slice(srcIndex + mdSrc.length) : '';
        return `![${alt}](${dataUri}${titlePart})${rawAttrs || ''}`;
      },
    ),
  );

  next = rewriteNoteCoverImagePathsInMarkdown(next, (src) => toDataUri(src));
  return next;
}
