import {
  allocateUniqueNumberedName,
  treeChildNameTaken,
} from '@/utils/vault/treeCopy';
import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';

export type TreeNameConflictChoice = 'replace' | 'rename' | 'cancel';

export type TreeNameConflictKind = 'file' | 'folder';

export type TreeNameConflictAction = 'move' | 'copy' | 'upload';

export type TreeNameConflictCompare = {
  existingText?: string | null;
  incomingText?: string | null;
  existingLabel?: string;
  incomingLabel?: string;
  binary?: boolean;
  truncated?: boolean;
};

export type TreeNameConflictPromptPayload = {
  name: string;
  renameAs: string;
  kind: TreeNameConflictKind;
  action: TreeNameConflictAction;
} & TreeNameConflictCompare;

export type TreeNameConflictPrompt = (
  payload: TreeNameConflictPromptPayload,
) => Promise<TreeNameConflictChoice>;

/**
 * Resolve destination name when a sibling may already exist.
 * Returns `null` when the user cancels.
 * Destination names are always NFC (macOS File.name is often NFD).
 */
export async function resolveTreeDestName(options: {
  name: string;
  usedNames: Iterable<string>;
  kind: TreeNameConflictKind;
  action: TreeNameConflictAction;
  askConflict: TreeNameConflictPrompt;
  /** Load compare payloads only when a conflict exists (files). */
  loadCompare?: () => Promise<TreeNameConflictCompare | null | undefined>;
}): Promise<string | null> {
  const name = normalizeUnicodeNfc(String(options.name || ''));
  if (!name) return null;
  if (!treeChildNameTaken(options.usedNames, name)) {
    return name;
  }
  const renameAs = allocateUniqueNumberedName(name, options.usedNames, {
    forceSuffix: true,
    isFolder: options.kind === 'folder',
  });
  let compare: TreeNameConflictCompare = {};
  if (options.kind === 'file' && typeof options.loadCompare === 'function') {
    try {
      compare = (await options.loadCompare()) || {};
    } catch {
      compare = { binary: true };
    }
  }
  const choice = await options.askConflict({
    name,
    renameAs,
    kind: options.kind,
    action: options.action,
    ...compare,
  });
  if (choice === 'cancel') return null;
  if (choice === 'replace') return name;
  return renameAs;
}
