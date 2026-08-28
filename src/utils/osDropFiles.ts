import { readOpenPathBytes } from '@/utils/shared/desktopOpenFiles';
import { flattenOsDropPaths, guessMimeTypeFromFileName } from '@/utils/treeOsDropPaths';

/** Build browser File objects from Tauri native OS drop paths. */
export async function filesFromOsPaths(paths: string[]): Promise<File[]> {
  const flatFiles = await flattenOsDropPaths(paths);
  if (!flatFiles.length) return [];

  return Promise.all(
    flatFiles.map(async (entry) => {
      const bytes = await readOpenPathBytes(entry.absolutePath);
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      return new File([copy], entry.baseName, {
        type: guessMimeTypeFromFileName(entry.baseName),
      });
    }),
  );
}
