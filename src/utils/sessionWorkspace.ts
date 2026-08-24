import { BlobReader, Uint8ArrayWriter, ZipReader } from '@zip.js/zip.js';
import { buildZipBlob } from '@/utils/zipBuilder';
import { isMarkdownFileName } from '@/utils/markdownImageExport';
import { normalizePathToNfc } from '@/utils/unicodeNfc';

export const SESSION_STORAGE_TYPE = 'session' as const;

export type SessionOrigin = 'md' | 'zip' | 'folder';

export type SessionFileRecord = {
  path: string;
  name: string;
  bytes: Uint8Array;
};

export type SessionWorkspace = {
  origin: SessionOrigin;
  originName: string;
  files: Record<string, SessionFileRecord>;
};

export type SessionTreeNode = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: SessionTreeNode[];
  size?: number;
};

export type SessionInputFile = {
  relativePath: string;
  file: File;
};

const TEXT_EXTS = new Set([
  'md',
  'markdown',
  'txt',
  'json',
  'html',
  'htm',
  'svg',
  'css',
  'js',
  'ts',
  'tsx',
  'jsx',
  'csv',
  'xml',
  'yml',
  'yaml',
  'toml',
  'ini',
  'log',
]);

const IMAGE_EXTS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif']);
const AUDIO_EXTS = new Set(['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba']);
const VIDEO_EXTS = new Set(['mp4', 'webm', 'ogv', 'mov', 'mkv']);

export type SessionViewer =
  | 'markdown'
  | 'json'
  | 'html'
  | 'svg'
  | 'raw'
  | 'image'
  | 'pdf'
  | 'audio'
  | 'video'
  | 'unsupported';

function extOf(name: string): string {
  const lower = String(name || '').toLowerCase();
  const i = lower.lastIndexOf('.');
  return i >= 0 ? lower.slice(i + 1) : '';
}

export function basenameOfPath(path: string): string {
  const normalized = String(path || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const parts = normalized.split('/').filter(Boolean);
  return parts[parts.length - 1] || path;
}

export function normalizeSessionPath(path: string): string {
  return normalizePathToNfc(
    String(path || '')
      .replace(/\\/g, '/')
      .replace(/^\/+/, '')
      .replace(/\/{2,}/g, '/'),
  );
}

function shouldSkipArchivePath(path: string): boolean {
  const n = normalizeSessionPath(path);
  if (!n) return true;
  if (n.startsWith('__MACOSX/') || n.includes('/__MACOSX/')) return true;
  const base = basenameOfPath(n);
  return base === '.DS_Store' || base === 'Thumbs.db';
}

export function isTextEditableFileName(name: string): boolean {
  const ext = extOf(name);
  if (!ext) return true;
  return TEXT_EXTS.has(ext);
}

export function sessionViewerForName(name: string): SessionViewer {
  const ext = extOf(name);
  if (ext === 'md' || ext === 'markdown' || ext === '') return 'markdown';
  if (ext === 'json') return 'json';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (ext === 'svg') return 'svg';
  if (IMAGE_EXTS.has(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  if (AUDIO_EXTS.has(ext)) return 'audio';
  if (VIDEO_EXTS.has(ext)) return 'video';
  if (TEXT_EXTS.has(ext)) return 'raw';
  return 'unsupported';
}

export function mimeForSessionFileName(name: string): string {
  const ext = extOf(name);
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'bmp') return 'image/bmp';
  if (ext === 'ico') return 'image/x-icon';
  if (ext === 'avif') return 'image/avif';
  if (ext === 'svg') return 'image/svg+xml';
  if (ext === 'pdf') return 'application/pdf';
  if (ext === 'md' || ext === 'markdown') return 'text/markdown';
  if (ext === 'json') return 'application/json';
  if (ext === 'html' || ext === 'htm') return 'text/html';
  if (ext === 'mp3') return 'audio/mpeg';
  if (ext === 'm4a') return 'audio/mp4';
  if (ext === 'wav') return 'audio/wav';
  if (ext === 'ogg') return 'audio/ogg';
  if (ext === 'mp4' || ext === 'mov') return 'video/mp4';
  if (ext === 'webm') return 'video/webm';
  return 'application/octet-stream';
}

export function decodeSessionText(bytes: Uint8Array): string {
  return new TextDecoder('utf-8').decode(bytes);
}

export function encodeSessionText(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function stripCommonRoot(paths: string[]): string[] {
  if (paths.length === 0) return paths;
  const split = paths.map((p) => p.split('/').filter(Boolean));
  const first = split[0];
  if (!first?.length) return paths;
  let depth = 0;
  while (first.length > depth + 1) {
    const token = first[depth];
    if (!token || !split.every((parts) => parts[depth] === token && parts.length > depth + 1)) break;
    depth += 1;
  }
  if (depth === 0) return paths;
  return split.map((parts) => parts.slice(depth).join('/'));
}

export async function workspaceFromInputFiles(
  items: SessionInputFile[],
  origin: SessionOrigin,
  originName: string,
): Promise<SessionWorkspace> {
  const cleaned = items
    .map((item) => ({
      relativePath: normalizeSessionPath(item.relativePath || item.file.name),
      file: item.file,
    }))
    .filter((item) => item.relativePath && !shouldSkipArchivePath(item.relativePath));

  if (!cleaned.length) {
    throw new Error('열 수 있는 파일이 없습니다.');
  }

  const strippedPaths =
    origin === 'folder' || origin === 'zip'
      ? stripCommonRoot(cleaned.map((item) => item.relativePath))
      : cleaned.map((item) => basenameOfPath(item.relativePath));

  const files: Record<string, SessionFileRecord> = {};
  await Promise.all(
    cleaned.map(async (item, index) => {
      const path = strippedPaths[index] || basenameOfPath(item.relativePath);
      if (!path || shouldSkipArchivePath(path)) return;
      files[path] = {
        path,
        name: basenameOfPath(path),
        bytes: new Uint8Array(await item.file.arrayBuffer()),
      };
    }),
  );

  return { origin, originName, files };
}

export async function workspaceFromMarkdownFile(file: File): Promise<SessionWorkspace> {
  const name = file.name || 'untitled.md';
  return workspaceFromInputFiles([{ relativePath: name, file }], 'md', name);
}

export async function workspaceFromZipBlob(blob: Blob, originName: string): Promise<SessionWorkspace> {
  const zipReader = new ZipReader(new BlobReader(blob), { useWebWorkers: true });
  try {
    const entries = await zipReader.getEntries();
    const items: SessionInputFile[] = [];
    for (const entry of entries) {
      if (entry.directory) continue;
      const relativePath = normalizeSessionPath(entry.filename || '');
      if (!relativePath || shouldSkipArchivePath(relativePath)) continue;
      if (entry.encrypted) {
        throw new Error('암호가 걸린 ZIP은 아직 지원하지 않습니다.');
      }
      const bytes = await entry.getData(new Uint8ArrayWriter());
      const file = new File([bytes as BlobPart], basenameOfPath(relativePath));
      items.push({ relativePath, file });
    }
    if (!items.length) throw new Error('ZIP에서 파일을 찾지 못했습니다.');
    return workspaceFromInputFiles(items, 'zip', originName.replace(/\.zip$/i, '') || 'archive');
  } finally {
    await zipReader.close();
  }
}

export async function workspaceFromDirectoryHandle(
  dirHandle: FileSystemDirectoryHandle,
): Promise<SessionWorkspace> {
  const items: SessionInputFile[] = [];

  const walk = async (handle: FileSystemDirectoryHandle, prefix: string) => {
    const iterable = handle as FileSystemDirectoryHandle & {
      values: () => AsyncIterable<FileSystemHandle>;
    };
    for await (const entry of iterable.values()) {
      if (entry.kind === 'file') {
        const file = await (entry as FileSystemFileHandle).getFile();
        items.push({ relativePath: `${prefix}${entry.name}`, file });
      } else if (entry.kind === 'directory') {
        await walk(entry as FileSystemDirectoryHandle, `${prefix}${entry.name}/`);
      }
    }
  };

  await walk(dirHandle, '');
  return workspaceFromInputFiles(items, 'folder', dirHandle.name || 'folder');
}

export async function workspaceFromFileList(fileList: ArrayLike<File>, origin: SessionOrigin): Promise<SessionWorkspace> {
  const files = Array.from(fileList);
  if (!files.length) throw new Error('선택한 파일이 없습니다.');

  if (origin === 'zip' || (files.length === 1 && /\.zip$/i.test(files[0]?.name || ''))) {
    const zipFile = files[0];
    if (!zipFile) throw new Error('ZIP 파일이 없습니다.');
    return workspaceFromZipBlob(zipFile, zipFile.name || 'archive.zip');
  }

  if (origin === 'md' || (files.length === 1 && isMarkdownFileName(files[0]?.name || ''))) {
    const mdFile = files[0];
    if (!mdFile) throw new Error('Markdown 파일이 없습니다.');
    return workspaceFromMarkdownFile(mdFile);
  }

  const items: SessionInputFile[] = files.map((file) => ({
    relativePath: normalizeSessionPath((file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name),
    file,
  }));
  const firstRel = items[0]?.relativePath || 'folder';
  const originName = firstRel.includes('/') ? firstRel.split('/')[0] || 'folder' : 'folder';
  return workspaceFromInputFiles(items, 'folder', originName || 'folder');
}

async function readDirectoryEntry(
  entry: FileSystemDirectoryEntry,
  prefix: string,
  out: SessionInputFile[],
): Promise<void> {
  const reader = entry.createReader();
  const readBatch = (): Promise<FileSystemEntry[]> =>
    new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });

  let batch = await readBatch();
  while (batch.length) {
    await Promise.all(
      batch.map(async (child) => {
        if (child.isFile) {
          const file = await new Promise<File>((resolve, reject) => {
            (child as FileSystemFileEntry).file(resolve, reject);
          });
          out.push({ relativePath: `${prefix}${child.name}`, file });
        } else if (child.isDirectory) {
          await readDirectoryEntry(child as FileSystemDirectoryEntry, `${prefix}${child.name}/`, out);
        }
      }),
    );
    batch = await readBatch();
  }
}

export async function collectDataTransferFiles(dataTransfer: DataTransfer): Promise<SessionInputFile[]> {
  const items = dataTransfer.items;
  if (items?.length) {
    const collected: SessionInputFile[] = [];
    const tasks: Promise<void>[] = [];
    for (const item of Array.from(items)) {
      if (item.kind !== 'file') continue;
      const entry = typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null;
      if (entry?.isDirectory) {
        tasks.push(readDirectoryEntry(entry as FileSystemDirectoryEntry, `${entry.name}/`, collected));
        continue;
      }
      if (entry?.isFile) {
        tasks.push(
          new Promise<void>((resolve, reject) => {
            (entry as FileSystemFileEntry).file((file) => {
              collected.push({ relativePath: file.name, file });
              resolve();
            }, reject);
          }),
        );
        continue;
      }
      const file = item.getAsFile();
      if (file) {
        collected.push({
          relativePath: (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name,
          file,
        });
      }
    }
    await Promise.all(tasks);
    if (collected.length) return collected;
  }

  return Array.from(dataTransfer.files || []).map((file) => ({
    relativePath: (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name,
    file,
  }));
}

export async function workspaceFromDataTransfer(dataTransfer: DataTransfer): Promise<SessionWorkspace> {
  const items = await collectDataTransferFiles(dataTransfer);
  if (!items.length) throw new Error('드롭된 파일이 없습니다.');

  if (items.length === 1) {
    const only = items[0];
    if (!only) throw new Error('드롭된 파일이 없습니다.');
    if (/\.zip$/i.test(only.file.name)) {
      return workspaceFromZipBlob(only.file, only.file.name);
    }
    if (isMarkdownFileName(only.file.name) || isMarkdownFileName(only.relativePath)) {
      return workspaceFromMarkdownFile(only.file);
    }
  }

  const looksLikeZipOnly = items.length === 1 && /\.zip$/i.test(items[0]?.file.name || '');
  if (looksLikeZipOnly && items[0]) {
    return workspaceFromZipBlob(items[0].file, items[0].file.name);
  }

  const originName =
    items[0]?.relativePath.includes('/') ? items[0].relativePath.split('/')[0] || 'folder' : 'folder';
  return workspaceFromInputFiles(items, 'folder', originName || 'folder');
}

export function listSessionMarkdownPaths(workspace: SessionWorkspace): string[] {
  return Object.keys(workspace.files)
    .filter((path) => isMarkdownFileName(path))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
}

export function pickDefaultSessionOpenPath(workspace: SessionWorkspace): string | null {
  const markdownPaths = listSessionMarkdownPaths(workspace);
  if (markdownPaths[0]) return markdownPaths[0];
  const all = Object.keys(workspace.files).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }),
  );
  return all[0] ?? null;
}

export function buildSessionTree(workspace: SessionWorkspace): SessionTreeNode[] {
  const root: SessionTreeNode = { name: 'root', type: 'folder', path: '', children: [] };

  const ensureFolder = (parts: string[]): SessionTreeNode => {
    let current = root;
    for (let i = 0; i < parts.length; i += 1) {
      const name = parts[i];
      if (!name) continue;
      const folderPath = `${parts.slice(0, i + 1).join('/')}/`;
      if (!current.children) current.children = [];
      let child = current.children.find((node) => node.name === name && node.type === 'folder');
      if (!child) {
        child = { name, type: 'folder', path: folderPath, children: [] };
        current.children.push(child);
      } else if (!child.children) {
        child.children = [];
      }
      current = child;
    }
    return current;
  };

  for (const record of Object.values(workspace.files)) {
    const parts = record.path.split('/').filter(Boolean);
    if (!parts.length) continue;
    const fileName = parts.pop();
    if (!fileName) continue;
    const parent = parts.length ? ensureFolder(parts) : root;
    if (!parent.children) parent.children = [];
    parent.children.push({
      name: fileName,
      type: 'file',
      path: record.path,
      size: record.bytes.byteLength,
    });
  }

  const sortNodes = (nodes: SessionTreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
    });
    nodes.forEach((node) => {
      if (node.children?.length) sortNodes(node.children);
    });
  };

  sortNodes(root.children ?? []);
  return root.children ?? [];
}

export function updateSessionFileText(
  workspace: SessionWorkspace,
  path: string,
  text: string,
): SessionWorkspace {
  const key = normalizeSessionPath(path);
  const prev = workspace.files[key];
  const nextRecord: SessionFileRecord = {
    path: key,
    name: prev?.name || basenameOfPath(key),
    bytes: encodeSessionText(text),
  };
  return {
    ...workspace,
    files: {
      ...workspace.files,
      [key]: nextRecord,
    },
  };
}

export function putSessionFileBytes(
  workspace: SessionWorkspace,
  path: string,
  bytes: Uint8Array,
): SessionWorkspace {
  const key = normalizeSessionPath(path);
  return {
    ...workspace,
    files: {
      ...workspace.files,
      [key]: {
        path: key,
        name: basenameOfPath(key),
        bytes,
      },
    },
  };
}

export function renameSessionFile(
  workspace: SessionWorkspace,
  fromPath: string,
  toName: string,
): SessionWorkspace {
  const from = normalizeSessionPath(fromPath);
  const prev = workspace.files[from];
  if (!prev) return workspace;
  const lastSlash = from.lastIndexOf('/');
  const dir = lastSlash >= 0 ? from.slice(0, lastSlash + 1) : '';
  const nextPath = `${dir}${toName.trim()}`;
  if (!nextPath || nextPath === from) return workspace;
  const { [from]: _removed, ...rest } = workspace.files;
  return {
    ...workspace,
    files: {
      ...rest,
      [nextPath]: {
        path: nextPath,
        name: basenameOfPath(nextPath),
        bytes: prev.bytes,
      },
    },
  };
}

export function countSessionFiles(workspace: SessionWorkspace): number {
  return Object.keys(workspace.files).length;
}

export async function buildSessionDownload(workspace: SessionWorkspace): Promise<{
  blob: Blob;
  fileName: string;
}> {
  const paths = Object.keys(workspace.files);
  const onlyPath = paths.length === 1 ? paths[0] : null;
  const onlyRecord = onlyPath ? workspace.files[onlyPath] : undefined;

  if (onlyRecord && (workspace.origin === 'md' || isMarkdownFileName(onlyRecord.name))) {
    return {
      blob: new Blob([onlyRecord.bytes as BlobPart], { type: 'text/markdown;charset=utf-8' }),
      fileName: onlyRecord.name || 'untitled.md',
    };
  }

  const entries = Object.values(workspace.files).map((record) => ({
    path: record.path,
    data: record.bytes,
  }));
  const zipBlob = await buildZipBlob(entries);
  const stem = String(workspace.originName || 'download').replace(/\.zip$/i, '') || 'download';
  return { blob: zipBlob, fileName: `${stem}.zip` };
}
