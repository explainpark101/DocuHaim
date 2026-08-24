import {
  allocateUniqueNumberedName,
  treeChildNameTaken,
} from '@/utils/treeCopy';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';

export type UploadNameConflictChoice = 'replace' | 'rename' | 'cancel';

export type UploadNameConflictPrompt = (
  fileName: string,
  renameAs: string,
) => Promise<UploadNameConflictChoice>;

/**
 * Resolve the destination file name for an upload when a sibling may already exist.
 * Returns `null` when the user cancels this file.
 * Destination names are always NFC (macOS File.name is often NFD).
 */
export async function resolveUploadDestFileName(
  fileName: string,
  usedNames: Iterable<string>,
  askConflict: UploadNameConflictPrompt,
): Promise<string | null> {
  const name = normalizeUnicodeNfc(String(fileName || ''));
  if (!name) return null;
  if (!treeChildNameTaken(usedNames, name)) {
    return name;
  }
  const renameAs = allocateUniqueNumberedName(name, usedNames, { forceSuffix: true });
  const choice = await askConflict(name, renameAs);
  if (choice === 'cancel') return null;
  if (choice === 'replace') return name;
  return renameAs;
}
