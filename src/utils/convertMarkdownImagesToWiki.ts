import {
  prepareMarkdownImageForWikiConvert,
} from '@/utils/markdownImageExport';
import {
  parseMarkdownImageAttrsBlock,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
const FENCED_BLOCK_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;

function mapOutsideFences(source: string, transform: (chunk: string) => string): string {
  return source
    .split(FENCED_BLOCK_RE)
    .map((part, index) => (index % 2 === 1 ? part : transform(part)))
    .join('');
}

function extractMarkdownImageSrc(destination: string): string {
  const dest = String(destination ?? '');
  return dest.trim().split(/\s+/)[0] || '';
}

/** True when markdown (outside fenced code) contains at least one `![…](…)`. */
export function hasStandardMarkdownImages(markdown: string | null | undefined): boolean {
  const source = String(markdown ?? '');
  if (!source.includes('![')) return false;
  let found = false;
  mapOutsideFences(source, (chunk) => {
    if (found) return chunk;
    MARKDOWN_IMAGE_RE.lastIndex = 0;
    if (MARKDOWN_IMAGE_RE.test(chunk)) found = true;
    return chunk;
  });
  return found;
}

export function countStandardMarkdownImages(markdown: string | null | undefined): number {
  let count = 0;
  mapOutsideFences(String(markdown ?? ''), (chunk) => {
    MARKDOWN_IMAGE_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = MARKDOWN_IMAGE_RE.exec(chunk)) !== null) {
      const src = extractMarkdownImageSrc(match[2] || '');
      if (src) count += 1;
    }
    return chunk;
  });
  return count;
}

export type ConvertMarkdownImagesToWikiFailure = {
  src: string;
  error: string;
};

export type ConvertMarkdownImagesToWikiResult = {
  markdown: string;
  converted: number;
  failed: ConvertMarkdownImagesToWikiFailure[];
};

type PreparedOk =
  | { src: string; mode: 'path'; path: string }
  | { src: string; mode: 'file'; file: File };

type PreparedErr = { src: string; mode: 'error'; error: string };

/**
 * Convert every standard markdown image outside fenced code to wiki `![[path]]`.
 * Vault-relative destinations are reused; data URIs and remotes are uploaded once per unique src.
 */
export async function convertAllMarkdownImagesToWiki(
  markdown: string,
  options: {
    currentNotePath?: string | null;
    uploadFiles: (files: File[]) => Promise<string[] | null | undefined>;
  },
): Promise<ConvertMarkdownImagesToWikiResult> {
  const source = String(markdown ?? '');
  const uniqueSrcs: string[] = [];
  const seen = new Set<string>();

  mapOutsideFences(source, (chunk) => {
    MARKDOWN_IMAGE_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = MARKDOWN_IMAGE_RE.exec(chunk)) !== null) {
      const src = extractMarkdownImageSrc(match[2] || '');
      if (!src || seen.has(src)) continue;
      seen.add(src);
      uniqueSrcs.push(src);
    }
    return chunk;
  });

  if (uniqueSrcs.length === 0) {
    return { markdown: source, converted: 0, failed: [] };
  }

  const prepared = await Promise.all(
    uniqueSrcs.map(async (src): Promise<PreparedOk | PreparedErr> => {
      try {
        const result = await prepareMarkdownImageForWikiConvert({
          markdownSrc: src,
          currentNotePath: options.currentNotePath ?? null,
        });
        if (result.mode === 'path') {
          return { src, mode: 'path', path: result.path };
        }
        return { src, mode: 'file', file: result.file };
      } catch (err) {
        const message =
          err instanceof Error && err.message ? err.message : 'Failed to prepare image';
        return { src, mode: 'error', error: message };
      }
    }),
  );

  const failed: ConvertMarkdownImagesToWikiFailure[] = [];
  const resolved = new Map<string, string>();
  const toUpload: Array<{ src: string; file: File }> = [];

  for (const item of prepared) {
    if (item.mode === 'path') {
      resolved.set(item.src, item.path);
    } else if (item.mode === 'file') {
      toUpload.push({ src: item.src, file: item.file });
    } else {
      failed.push({ src: item.src, error: item.error });
    }
  }

  if (toUpload.length > 0) {
    const paths = (await options.uploadFiles(toUpload.map((item) => item.file))) ?? [];
    toUpload.forEach((item, index) => {
      const path = paths[index];
      if (path) {
        resolved.set(item.src, path);
      } else {
        failed.push({ src: item.src, error: 'Image upload failed' });
      }
    });
  }

  let converted = 0;
  const next = mapOutsideFences(source, (chunk) =>
    chunk.replace(
      new RegExp(MARKDOWN_IMAGE_RE.source, 'g'),
      (full, alt: string, destination: string, rawAttrs = '') => {
        const src = extractMarkdownImageSrc(destination);
        const nextPath = src ? resolved.get(src) : undefined;
        if (!nextPath) return full;
        converted += 1;
        const existing = parseMarkdownImageAttrsBlock(rawAttrs);
        const markup = wikiImageMarkupFromAttrs({
          path: nextPath,
          width: existing.width,
          height: existing.height,
          background: existing.background,
        });
        const caption = String(alt ?? '').trim();
        return caption ? `${markup}\n${caption}` : markup;
      },
    ),
  );

  return { markdown: next, converted, failed };
}

export type ConvertAllMarkdownImagesToWikiFn = () => Promise<ConvertMarkdownImagesToWikiResult>;
