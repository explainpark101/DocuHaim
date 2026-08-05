import { buildEditorImagePathPrefix } from '@/utils/editorImageUpload';
import {
  collectMarkdownExportImageBytes,
  extractMarkdownDataUriImages,
  planMarkdownImageExport,
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
}): Promise<{
  markdown: string;
  images: Array<{ path: string; data: Uint8Array }>;
  missing: string[];
}> {
  const plan = planMarkdownImageExport(options.markdown, options.notePath);
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

  return { markdown, images, missing: bundled.missing };
}
