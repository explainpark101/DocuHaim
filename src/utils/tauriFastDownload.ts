import { downloadDir, join } from '@tauri-apps/api/path';
import { allocateUniqueNumberedName } from '@/utils/vault/treeCopy';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { MARKDOWN_PICTURES_DIR } from '@/utils/markdownImageExport';

const REMEMBERED_FOLDER_KEY = 's3haim_tauri_fast_download_folder';

export function canUseTauriFastDownload(): boolean {
  return isTauriDesktopPlatform();
}

export function canUseWebDirectoryPicker(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

export function loadTauriFastDownloadFolder(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(REMEMBERED_FOLDER_KEY);
    const trimmed = String(raw || '').trim();
    return trimmed || null;
  } catch {
    return null;
  }
}

export function saveTauriFastDownloadFolder(path: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = String(path || '').trim();
    if (!trimmed) {
      window.localStorage.removeItem(REMEMBERED_FOLDER_KEY);
      return;
    }
    window.localStorage.setItem(REMEMBERED_FOLDER_KEY, trimmed);
  } catch {
    /* ignore */
  }
}

export async function getTauriSystemDownloadDir(): Promise<string> {
  return normalizeUnicodeNfc(await downloadDir());
}

export async function pickTauriFastDownloadFolder(title = '빠른 다운로드 폴더 선택'): Promise<string | null> {
  if (!canUseTauriFastDownload()) return null;
  const { open } = await import('@tauri-apps/plugin-dialog');
  const remembered = loadTauriFastDownloadFolder();
  const selected = await open({
    directory: true,
    multiple: false,
    title,
    ...(remembered ? { defaultPath: remembered } : {}),
  });
  if (!selected || Array.isArray(selected)) return null;
  const path = normalizeUnicodeNfc(String(selected));
  saveTauriFastDownloadFolder(path);
  return path;
}

export async function pickTauriExportDirectory(title = '보낼 폴더 선택'): Promise<string | null> {
  if (!canUseTauriFastDownload()) return null;
  const { open } = await import('@tauri-apps/plugin-dialog');
  const remembered = loadTauriFastDownloadFolder();
  const selected = await open({
    directory: true,
    multiple: false,
    title,
    ...(remembered ? { defaultPath: remembered } : {}),
  });
  if (!selected || Array.isArray(selected)) return null;
  return normalizeUnicodeNfc(String(selected));
}

async function fsApi() {
  return import('@tauri-apps/plugin-fs');
}

export async function ensureTauriDir(path: string): Promise<void> {
  const { exists, mkdir } = await fsApi();
  const normalized = normalizeUnicodeNfc(path);
  if (await exists(normalized)) return;
  await mkdir(normalized, { recursive: true });
}

export async function listTauriDirectoryEntryNames(dirPath: string): Promise<string[]> {
  const { readDir } = await fsApi();
  const entries = await readDir(normalizeUnicodeNfc(dirPath));
  return entries.map((entry) => normalizeUnicodeNfc(entry.name || '')).filter(Boolean);
}

export async function allocateUniqueTauriEntryName(
  dirPath: string,
  originalName: string,
  options?: { isFolder?: boolean },
): Promise<string> {
  const existing = await listTauriDirectoryEntryNames(dirPath);
  return allocateUniqueNumberedName(normalizeUnicodeNfc(originalName), existing, {
    isFolder: options?.isFolder === true,
  });
}

export async function writeBytesToTauriPath(filePath: string, bytes: Uint8Array): Promise<void> {
  const { writeFile } = await fsApi();
  const normalizedPath = normalizeUnicodeNfc(filePath);
  const parent = normalizedPath.replace(/[/\\][^/\\]+$/, '');
  if (parent && parent !== normalizedPath) {
    await ensureTauriDir(parent);
  }
  await writeFile(normalizedPath, bytes);
}

export async function writeTextToTauriPath(filePath: string, text: string): Promise<void> {
  await writeBytesToTauriPath(filePath, new TextEncoder().encode(text));
}

export async function writeBlobToTauriPath(filePath: string, blob: Blob): Promise<void> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await writeBytesToTauriPath(filePath, bytes);
}

export async function resolveTauriFastDownloadDirectory(): Promise<string> {
  const remembered = loadTauriFastDownloadFolder();
  if (remembered) {
    try {
      const { exists } = await fsApi();
      if (await exists(remembered)) return remembered;
      saveTauriFastDownloadFolder(null);
    } catch {
      saveTauriFastDownloadFolder(null);
    }
  }
  return getTauriSystemDownloadDir();
}

export type TauriFastDownloadWriteResult = {
  ok: boolean;
  savedPath?: string;
  savedName: string;
};

/** Write a blob into the fast-download directory (remembered folder or system Downloads). */
export async function writeBlobToTauriFastDirectory(
  blob: Blob,
  fileName: string,
): Promise<TauriFastDownloadWriteResult> {
  const normalizedName = normalizeUnicodeNfc(String(fileName || 'download'));
  const dirPath = await resolveTauriFastDownloadDirectory();
  const uniqueName = await allocateUniqueTauriEntryName(dirPath, normalizedName);
  const savedPath = normalizeUnicodeNfc(await join(dirPath, uniqueName));
  await writeBlobToTauriPath(savedPath, blob);
  return { ok: true, savedPath, savedName: uniqueName };
}

export async function writeMarkdownImageBundleToTauriDirectory(
  dirPath: string,
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

  const root = normalizeUnicodeNfc(dirPath);
  await ensureTauriDir(root);
  const mdPath = normalizeUnicodeNfc(await join(root, mdFileName));
  await writeTextToTauriPath(mdPath, markdown);
  tick();

  if (images.length === 0) return;

  const picturesDir = normalizeUnicodeNfc(await join(root, MARKDOWN_PICTURES_DIR));
  await ensureTauriDir(picturesDir);
  for (const image of images) {
    const baseName = normalizeUnicodeNfc(image.path.split(/[/\\]/).pop() || 'image');
    const imagePath = normalizeUnicodeNfc(await join(picturesDir, baseName));
    await writeBytesToTauriPath(imagePath, image.data);
    tick();
  }
}

export async function writeBytesToTauriRelativePath(
  rootPath: string,
  relativePath: string,
  bytes: Uint8Array,
): Promise<void> {
  const parts = normalizeUnicodeNfc(relativePath).split('/').filter(Boolean);
  if (parts.length === 0) return;
  const fileName = parts.pop();
  if (!fileName) return;
  let dirPath = normalizeUnicodeNfc(rootPath);
  for (const part of parts) {
    dirPath = normalizeUnicodeNfc(await join(dirPath, part));
    await ensureTauriDir(dirPath);
  }
  await writeBytesToTauriPath(normalizeUnicodeNfc(await join(dirPath, fileName)), bytes);
}

export async function describeTauriFastDownloadTarget(): Promise<string> {
  const remembered = loadTauriFastDownloadFolder();
  if (remembered) {
    try {
      const { exists } = await fsApi();
      if (await exists(remembered)) return remembered;
    } catch {
      /* fall through */
    }
  }
  return getTauriSystemDownloadDir();
}
