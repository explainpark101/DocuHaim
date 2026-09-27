/**
 * Full-vault export: Storage API / Tauri directory write, or ZIP download fallback.
 */
import { buildZipBlob } from '@/utils/zipBuilder';
import { ensureDirectoryReadWritePermission } from '@/utils/localFolderStore';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  pickTauriExportDirectory,
  writeBytesToTauriRelativePath,
  ensureTauriDir,
} from '@/utils/tauriFastDownload';
import { listAllDirPaths, listAllFiles } from '@/utils/vault/idbVaultStore';
import { getAppNameByStorageMode } from '@/utils/storageSettings';

export type VaultExportChannel = 'directory' | 'zip';

export type VaultExportProgress = {
  completed: number;
  total: number;
  detail?: string;
};

export type VaultExportFileEntry = {
  path: string;
  data: Uint8Array;
};

export type VaultExportResult = {
  channel: VaultExportChannel;
  dirHandle?: FileSystemDirectoryHandle | null;
  tauriPath?: string | null;
  zipFileName?: string;
  fileCount: number;
};

function supportsDirectoryPicker(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

function isAndroidBrowserUa(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent || '');
}

function shouldUseZipFallback(): boolean {
  if (isAndroidBrowserUa()) return true;
  if (supportsDirectoryPicker()) return false;
  if (isDesktopApp()) return false;
  return true;
}

async function writeEntriesToDirectoryHandle(
  root: FileSystemDirectoryHandle,
  entries: VaultExportFileEntry[],
  onProgress?: (p: VaultExportProgress) => void,
): Promise<void> {
  const total = entries.length;
  let completed = 0;
  for (const entry of entries) {
    const parts = entry.path.replace(/^\/+/, '').split('/').filter(Boolean);
    if (!parts.length) continue;
    let dir = root;
    for (let i = 0; i < parts.length - 1; i += 1) {
      dir = await dir.getDirectoryHandle(parts[i]!, { create: true });
    }
    const fileName = parts[parts.length - 1]!;
    const fileHandle = await dir.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    try {
      const copy = new Uint8Array(entry.data.byteLength);
      copy.set(entry.data);
      await writable.write(copy);
    } finally {
      await writable.close();
    }
    completed += 1;
    onProgress?.({
      completed,
      total,
      detail: `${completed}/${total}`,
    });
  }
}

async function writeEntriesToTauriPath(
  rootAbs: string,
  entries: VaultExportFileEntry[],
  onProgress?: (p: VaultExportProgress) => void,
): Promise<void> {
  await ensureTauriDir(rootAbs);
  const total = entries.length;
  let completed = 0;
  for (const entry of entries) {
    await writeBytesToTauriRelativePath(rootAbs, entry.path, entry.data);
    completed += 1;
    onProgress?.({
      completed,
      total,
      detail: `${completed}/${total}`,
    });
  }
}

/**
 * Collect all files from a StorageBackend (listChildren recursive + readBytes).
 */
export async function collectBackendVaultFiles(
  backend: {
    listChildren: (path?: string) => Promise<any[]>;
    readBytes: (path: string) => Promise<{ body: Uint8Array }>;
  },
  onProgress?: (p: VaultExportProgress) => void,
): Promise<VaultExportFileEntry[]> {
  const files: VaultExportFileEntry[] = [];
  const walk = async (path = '') => {
    const children = await backend.listChildren(path);
    for (const child of children || []) {
      if (child.type === 'folder') {
        const folderPath = String(child.path || '').replace(/\/+$/, '');
        await walk(folderPath ? `${folderPath}/` : '');
      } else if (child.type === 'file' && child.path) {
        const { body } = await backend.readBytes(child.path);
        files.push({
          path: String(child.path).replace(/^\/+/, ''),
          data: body instanceof Uint8Array ? body : new Uint8Array(body),
        });
        onProgress?.({
          completed: files.length,
          total: Math.max(files.length, 1),
          detail: child.path,
        });
      }
    }
  };
  await walk('');
  return files;
}

/** Collect IDB vault files (faster than recursive listChildren). */
export async function collectIdbVaultFiles(): Promise<VaultExportFileEntry[]> {
  const files = await listAllFiles();
  return Promise.all(
    files.map(async (f) => ({
      path: f.path,
      data: new Uint8Array(await f.blob.arrayBuffer()),
    })),
  );
}

async function ensureEmptyDirsInDirectory(
  root: FileSystemDirectoryHandle,
  dirPaths: string[],
): Promise<void> {
  for (const dirPath of dirPaths) {
    const parts = dirPath.replace(/^\/+/, '').split('/').filter(Boolean);
    let dir = root;
    for (const part of parts) {
      dir = await dir.getDirectoryHandle(part, { create: true });
    }
  }
}

export type ExportVaultArchiveOptions = {
  /** Pre-collected entries; if omitted, pass backend or useIdb. */
  entries?: VaultExportFileEntry[];
  backend?: {
    listChildren: (path?: string) => Promise<any[]>;
    readBytes: (path: string) => Promise<{ body: Uint8Array }>;
  };
  /** Prefer IDB listAllFiles when exporting IDB Haim. */
  useIdb?: boolean;
  storageMode?: string;
  /** Force ZIP even when FSA is available. */
  preferZip?: boolean;
  onProgress?: (p: VaultExportProgress) => void;
  triggerBlobDownload: (blob: Blob, fileName: string) => void | Promise<boolean>;
  zipBaseName?: string;
};

/**
 * Export full vault to a picked directory (FSA/Tauri) or ZIP download.
 */
export async function exportVaultArchive(
  options: ExportVaultArchiveOptions,
): Promise<VaultExportResult | null> {
  const {
    backend,
    useIdb,
    preferZip,
    onProgress,
    triggerBlobDownload,
    storageMode = 'idb',
    zipBaseName,
  } = options;

  let entries = options.entries;
  if (!entries) {
    if (useIdb) {
      entries = await collectIdbVaultFiles();
    } else if (backend) {
      entries = await collectBackendVaultFiles(backend, onProgress);
    } else {
      throw new Error('exportVaultArchive requires entries, backend, or useIdb');
    }
  }

  const appName = getAppNameByStorageMode(storageMode).replace(/\s+/g, '-');
  const zipName = `${zipBaseName || appName}-vault.zip`;

  if (preferZip || shouldUseZipFallback()) {
    onProgress?.({ completed: 0, total: entries.length, detail: 'ZIP 생성 중' });
    const zipBlob = await buildZipBlob(
      entries.map((e) => ({ path: e.path, data: e.data })),
    );
    await triggerBlobDownload(zipBlob, zipName);
    onProgress?.({ completed: entries.length, total: entries.length, detail: '완료' });
    return {
      channel: 'zip',
      zipFileName: zipName,
      fileCount: entries.length,
    };
  }

  if (isDesktopApp() && !supportsDirectoryPicker()) {
    const exportRoot = await pickTauriExportDirectory('Vault 내보내기 폴더 선택');
    if (!exportRoot) return null;
    const { join } = await import('@tauri-apps/api/path');
    const folderName = zipBaseName || `${appName}-vault`;
    const targetRoot = await join(exportRoot, folderName);
    await writeEntriesToTauriPath(targetRoot, entries, onProgress);
    return {
      channel: 'directory',
      tauriPath: targetRoot,
      fileCount: entries.length,
    };
  }

  if (!supportsDirectoryPicker()) {
    onProgress?.({ completed: 0, total: entries.length, detail: 'ZIP 생성 중' });
    const zipBlob = await buildZipBlob(
      entries.map((e) => ({ path: e.path, data: e.data })),
    );
    await triggerBlobDownload(zipBlob, zipName);
    return {
      channel: 'zip',
      zipFileName: zipName,
      fileCount: entries.length,
    };
  }

  const dirHandle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
  const canWrite = await ensureDirectoryReadWritePermission(dirHandle);
  if (!canWrite) {
    throw new Error('선택한 폴더에 쓰기 권한이 필요합니다.');
  }

  if (useIdb) {
    const dirs = await listAllDirPaths();
    await ensureEmptyDirsInDirectory(dirHandle, dirs);
  }

  await writeEntriesToDirectoryHandle(dirHandle, entries, onProgress);
  return {
    channel: 'directory',
    dirHandle,
    fileCount: entries.length,
  };
}

export function canUseVaultDirectoryExport(): boolean {
  return supportsDirectoryPicker() || isDesktopApp();
}
