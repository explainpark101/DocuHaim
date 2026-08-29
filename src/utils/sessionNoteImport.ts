import { buildEditorImagePathPrefix } from '@/utils/editorImageUpload';
import {
  collectMarkdownExportImageBytes,
  extractMarkdownDataUriImages,
  planMarkdownImageExport,
  rewriteNoteCoverImagePathsInMarkdown,
} from '@/utils/markdownImageExport';

function basename(path: string): string {
  const normalized = String(path || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const parts = normalized.split('/').filter(Boolean);
  return parts[parts.length - 1] || 'image';
}

export async function bundleSessionMarkdownImages(options: {
  markdown: string;
  notePath: string;
  readBytes: (path: string) => Promise<Uint8Array>;
  imageSyntax?: 'wiki' | 'markdown';
}): Promise<{
  markdown: string;
  images: Array<{ path: string; data: Uint8Array }>;
  missing: string[];
}> {
  const plan = planMarkdownImageExport(options.markdown, options.notePath, {
    syntax: options.imageSyntax === 'wiki' ? 'wiki' : 'markdown',
  });
  const extracted = extractMarkdownDataUriImages(plan.markdown, {
    reservedNames: plan.images.map((image) => image.relativePath),
  });
  const { entries, missing } = await collectMarkdownExportImageBytes(
    plan.images,
    options.readBytes,
  );
  return {
    markdown: extracted.markdown,
    images: [...entries, ...extracted.images],
    missing,
  };
}

export async function prepareSessionMarkdownForVault(options: {
  markdown: string;
  sessionNotePath: string;
  destNotePath: string;
  readBytes: (path: string) => Promise<Uint8Array>;
}): Promise<{
  markdown: string;
  images: Array<{ path: string; data: Uint8Array }>;
  missing: string[];
}> {
  const bundled = await bundleSessionMarkdownImages({
    markdown: options.markdown,
    notePath: options.sessionNotePath,
    readBytes: options.readBytes,
  });

  const prefix = `${String(buildEditorImagePathPrefix(options.destNotePath) || '.images/note').replace(/\/+$/, '')}/`;
  const usedNames = new Set<string>();
  const images: Array<{ path: string; data: Uint8Array }> = [];
  const rewriteMap = new Map<string, string>();

  for (const entry of bundled.images) {
    const fileName = basename(entry.path);
    let uniqueName = fileName;
    let index = 2;
    while (usedNames.has(uniqueName.toLowerCase())) {
      const lastDot = fileName.lastIndexOf('.');
      const stem = lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
      const ext = lastDot > 0 ? fileName.slice(lastDot) : '';
      uniqueName = `${stem}-${index}${ext}`;
      index += 1;
    }
    usedNames.add(uniqueName.toLowerCase());
    const vaultPath = `${prefix}${uniqueName}`.replace(/\/+/g, '/').replace(/^\//, '');
    images.push({ path: vaultPath, data: entry.data });
    rewriteMap.set(entry.path, vaultPath);
  }

  let markdown = bundled.markdown;
  for (const [from, to] of rewriteMap) {
    markdown = markdown.split(`](${from}`).join(`](${to}`);
  }
  markdown = rewriteNoteCoverImagePathsInMarkdown(
    markdown,
    (src) => rewriteMap.get(src) ?? null,
  );

  return { markdown, images, missing: bundled.missing };
}

function parentDirAbsPath(filePath: string): string {
  const normalized = String(filePath || '').replace(/\\/g, '/');
  const idx = normalized.lastIndexOf('/');
  return idx > 0 ? normalized.slice(0, idx) : normalized;
}

function absPathJoin(dir: string, rel: string): string {
  const base = String(dir || '').replace(/\/+$/, '');
  const tail = String(rel || '').replace(/^\/+/, '').replace(/\\/g, '/');
  return `${base}/${tail}`;
}

/** Bundle markdown + sidecar images for writing next to a local absolute file path. */
export async function prepareSessionMarkdownForLocalAbs(options: {
  markdown: string;
  sessionNotePath: string;
  destAbsPath: string;
  readBytes: (path: string) => Promise<Uint8Array>;
}): Promise<{
  markdown: string;
  files: Array<{ absPath: string; data: Uint8Array }>;
  missing: string[];
}> {
  const destName = basename(options.destAbsPath);
  const prepared = await prepareSessionMarkdownForVault({
    markdown: options.markdown,
    sessionNotePath: options.sessionNotePath,
    destNotePath: destName,
    readBytes: options.readBytes,
  });
  const parentDir = parentDirAbsPath(options.destAbsPath);
  const files = prepared.images.map((image) => ({
    absPath: absPathJoin(parentDir, image.path),
    data: image.data,
  }));
  return { markdown: prepared.markdown, files, missing: prepared.missing };
}
