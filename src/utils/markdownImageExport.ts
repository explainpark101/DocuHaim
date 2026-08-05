import {
  WIKI_IMAGE_RE,
  markdownImageAttrsBlockFromSize,
  parseWikiImageInner,
} from '@/utils/wikiImageSyntax';
import {
  decodeMarkdownImageSrc,
  isStorageImageSrc,
  resolveStorageImagePath,
} from '@/utils/storageImagePath';

export const MARKDOWN_PICTURES_DIR = '.pictures';

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
const FENCED_BLOCK_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;

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

function sanitizeExportFileName(name: string): string {
  const cleaned = String(name || '')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
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
  const decoded = decodeMarkdownImageSrc(src);
  if (!decoded || !isStorageImageSrc(decoded)) return null;
  const normalized = decoded.replace(/^\/+/, '');
  if (normalized.startsWith('.images/')) return normalized;
  return resolveStorageImagePath(decoded, notePath);
}

/**
 * Rewrite wiki/storage images to `![](.pictures/name)` and collect vault paths to bundle.
 */
export function planMarkdownImageExport(
  markdown: string,
  notePath?: string | null,
): MarkdownImageExportPlan {
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

  const rewritten = mapOutsideFences(source, (chunk) => {
    const placeholders: string[] = [];
    let next = chunk.replace(new RegExp(WIKI_IMAGE_RE.source, 'g'), (full, rawInner: string) => {
      const parsed = parseWikiImageInner(rawInner);
      const storagePath = String(parsed?.path || '').replace(/^\/+/, '');
      if (!storagePath) return full;
      const relativePath = allocate(storagePath);
      const attrs = markdownImageAttrsBlockFromSize({
        width: parsed?.width ?? null,
        height: parsed?.height ?? null,
      });
      const replacement = attrs ? `![](${relativePath})${attrs}` : `![](${relativePath})`;
      const token = `\0MDIMG${placeholders.length}\0`;
      placeholders.push(replacement);
      return token;
    });

    next = next.replace(
      new RegExp(MARKDOWN_IMAGE_RE.source, 'g'),
      (full, alt: string, destination: string, rawAttrs = '') => {
        const dest = String(destination ?? '');
        const mdSrc = dest.trim().split(/\s+/)[0] || '';
        if (!mdSrc || !isStorageImageSrc(mdSrc)) return full;
        const resolved = resolveExportSourcePath(mdSrc, notePath);
        if (!resolved) return full;
        const relativePath = allocate(resolved);
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
      await writable.write(new Blob([image.data]));
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
