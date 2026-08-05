import {
  getLocalDirectoryHandleForPath,
  getLocalFileHandleForPath,
} from '@/utils/localEditorImage';

export type LocalFileNode = {
  name: string;
  type: 'file';
  path: string;
  handle: FileSystemFileHandle;
  parentHandle: FileSystemDirectoryHandle;
};

/**
 * Resolve a local file node by storage path without requiring a fully expanded tree.
 */
export async function resolveLocalFileNode(
  rootHandle: FileSystemDirectoryHandle | null | undefined,
  path: string,
): Promise<LocalFileNode | null> {
  if (!rootHandle) return null;
  const normalized = String(path || '').replace(/^\/+/, '');
  if (!normalized || normalized.endsWith('/')) return null;

  try {
    const fileHandle = await getLocalFileHandleForPath(rootHandle, normalized, { create: false });
    const lastSlash = normalized.lastIndexOf('/');
    const name = lastSlash >= 0 ? normalized.slice(lastSlash + 1) : normalized;
    const parentHandle =
      lastSlash >= 0
        ? await getLocalDirectoryHandleForPath(rootHandle, normalized.slice(0, lastSlash), {
            create: false,
          })
        : rootHandle;
    return {
      name,
      type: 'file',
      path: normalized,
      handle: fileHandle,
      parentHandle,
    };
  } catch {
    return null;
  }
}
