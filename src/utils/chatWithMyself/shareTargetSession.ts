import { isMarkdownFileName } from '@/utils/markdownImageExport';
import type { SessionOrigin } from '@/utils/sessionWorkspace';

const MARKDOWN_MIME_TYPES = new Set([
  'text/markdown',
  'text/x-markdown',
  'text/x-web-markdown',
]);

export type ShareLikeFile = {
  name?: string;
  type?: string;
};

export function isShareTargetMarkdownMime(type: string | null | undefined): boolean {
  const mime = String(type || '').split(';')[0]?.trim().toLowerCase() ?? '';
  return MARKDOWN_MIME_TYPES.has(mime);
}

export function isShareTargetMarkdownFile(
  file: ShareLikeFile | null | undefined,
): boolean {
  if (!file) return false;
  if (isMarkdownFileName(file.name)) return true;
  return isShareTargetMarkdownMime(file.type);
}

function withMarkdownFileName(file: File): File {
  if (isMarkdownFileName(file.name)) return file;
  const raw = String(file.name || '').trim();
  const base = raw.replace(/\.[^./\\]+$/, '') || 'untitled';
  return new File([file], `${base}.md`, {
    type: file.type || 'text/markdown',
  });
}

export function canOpenShareFilesAsSession(
  files: readonly ShareLikeFile[] | null | undefined,
): boolean {
  if (!files?.length) return false;
  return files.some((file) => isShareTargetMarkdownFile(file));
}

/**
 * Files to open as a download session. Keeps companion files (images, etc.)
 * when at least one markdown file is present.
 */
export function filesForShareTargetSession(files: File[]): File[] {
  if (!canOpenShareFilesAsSession(files)) return [];
  return files.map((file) =>
    isShareTargetMarkdownFile(file) ? withMarkdownFileName(file) : file,
  );
}

export function sessionOriginForShareTargetFiles(files: File[]): SessionOrigin {
  if (files.length === 1 && isShareTargetMarkdownFile(files[0])) return 'md';
  return 'folder';
}
