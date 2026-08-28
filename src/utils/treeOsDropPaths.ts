import { basename, join } from '@tauri-apps/api/path';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { isDesktopApp } from '@/utils/isDesktopApp';

export type FlatOsPathFile = {
  absolutePath: string;
  relativePath: string;
  baseName: string;
};

async function fsApi() {
  return import('@tauri-apps/plugin-fs');
}

async function walkOsPathTree(absPath: string, relPrefix: string, out: FlatOsPathFile[]): Promise<void> {
  const { stat, readDir } = await fsApi();
  const normalizedAbs = normalizeUnicodeNfc(absPath);
  const meta = await stat(normalizedAbs);
  if (meta.isDirectory) {
    const entries = await readDir(normalizedAbs);
    for (const entry of entries) {
      const childAbs = normalizeUnicodeNfc(await join(normalizedAbs, entry.name));
      const childRel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
      if (entry.isDirectory) {
        await walkOsPathTree(childAbs, childRel, out);
      } else {
        out.push({
          absolutePath: childAbs,
          relativePath: normalizeUnicodeNfc(childRel),
          baseName: normalizeUnicodeNfc(entry.name),
        });
      }
    }
    return;
  }

  const name = normalizeUnicodeNfc(await basename(normalizedAbs));
  out.push({
    absolutePath: normalizedAbs,
    relativePath: normalizeUnicodeNfc(relPrefix || name),
    baseName: name,
  });
}

/** Flatten absolute OS paths (files or folders) into uploadable file entries. */
export async function flattenOsDropPaths(paths: string[]): Promise<FlatOsPathFile[]> {
  if (!isDesktopApp()) return [];
  const out: FlatOsPathFile[] = [];
  for (const raw of paths) {
    const abs = normalizeUnicodeNfc(String(raw || '').trim());
    if (!abs) continue;
    const rootName = normalizeUnicodeNfc(await basename(abs));
    await walkOsPathTree(abs, rootName, out);
  }
  return out;
}

export function guessMimeTypeFromFileName(fileName: string): string {
  const lower = String(fileName || '').toLowerCase();
  const dot = lower.lastIndexOf('.');
  const ext = dot > -1 ? lower.slice(dot + 1) : '';
  const map: Record<string, string> = {
    md: 'text/markdown',
    markdown: 'text/markdown',
    txt: 'text/plain',
    json: 'application/json',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    mjs: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    heic: 'image/heic',
    heif: 'image/heif',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    zip: 'application/zip',
    mp4: 'video/mp4',
    m4a: 'audio/mp4',
    mp3: 'audio/mpeg',
  };
  return map[ext] || 'application/octet-stream';
}
