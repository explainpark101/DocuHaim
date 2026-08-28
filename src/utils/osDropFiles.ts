import { readOpenPathBytes } from '@/utils/shared/desktopOpenFiles';
import { flattenOsDropPaths, guessMimeTypeFromFileName } from '@/utils/treeOsDropPaths';

/** Build browser File objects from Tauri native OS drop paths. */
export async function filesFromOsPaths(paths: string[]): Promise<File[]> {
  const flatFiles = await flattenOsDropPaths(paths);
  if (!flatFiles.length) return [];

  const files: File[] = [];
  for (const entry of flatFiles) {
    try {
      const bytes = await readOpenPathBytes(entry.absolutePath);
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      files.push(
        new File([copy], entry.baseName, {
          type: guessMimeTypeFromFileName(entry.baseName),
        }),
      );
    } catch (error) {
      console.warn('Failed to read OS drop path for chat upload:', entry.absolutePath, error);
    }
  }
  return files;
}
