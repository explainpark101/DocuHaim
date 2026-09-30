/**
 * Filter vault trees for TreeNode UIs (Sidebar + pickers).
 * Honors Settings visibility: hidden (dot) folders, trash, recording companions.
 */

import {
  loadShowHiddenFolders,
  loadShowTrashFolder,
} from '@/utils/treeVisibilitySettings';
import { loadHideRecordingCompanions } from '@/utils/recording/recordingVisibilitySettings';
import { isRecordingCompanionFileKey } from '@/utils/s3Tree';

export type VaultTreeNodeLike = {
  type?: string | undefined;
  name?: string | undefined;
  path?: string | undefined;
  children?: VaultTreeNodeLike[] | undefined;
};

export type FilterVaultTreeOptions = {
  hideDotFolders?: boolean | undefined;
  hideTrashFolder?: boolean | undefined;
  hideRecordingCompanionFiles?: boolean | undefined;
  searchTerm?: string | undefined;
};

function isTrashFolderNode(node: VaultTreeNodeLike): boolean {
  return (
    node.type === 'folder' &&
    (node.name === '.trash' || node.path === '.trash/')
  );
}

/**
 * Filter a vault tree (non-destructive). Same rules as the Sidebar tree.
 */
export function filterVaultTree<T extends VaultTreeNodeLike>(
  nodes: T[] | null | undefined,
  options: FilterVaultTreeOptions = {},
): T[] {
  if (!nodes?.length) return [];
  const {
    hideDotFolders = false,
    hideTrashFolder = false,
    hideRecordingCompanionFiles = false,
    searchTerm = '',
  } = options;
  const q = searchTerm ? searchTerm.toLowerCase() : '';

  const walk = (node: T): T | null => {
    if (node.type === 'folder') {
      if (isTrashFolderNode(node)) {
        if (hideTrashFolder) return null;
      } else if (hideDotFolders && String(node.name || '').startsWith('.')) {
        return null;
      }
    }
    if (
      node.type === 'file' &&
      hideRecordingCompanionFiles &&
      isRecordingCompanionFileKey(node.path)
    ) {
      return null;
    }
    const nameMatch =
      !q ||
      String(node.name || '')
        .toLowerCase()
        .includes(q) ||
      (node.path && String(node.path).toLowerCase().includes(q));
    if (node.type === 'folder' && node.children) {
      const children = (node.children as T[])
        .map(walk)
        .filter((child): child is T => child !== null);
      if (children.length || nameMatch) {
        return { ...node, children };
      }
      return null;
    }
    return nameMatch ? node : null;
  };

  return nodes.map(walk).filter((node): node is T => node !== null);
}

/**
 * Apply current Settings visibility toggles (localStorage) — use for every TreeNode picker.
 */
export function filterVaultTreeForDisplay<T extends VaultTreeNodeLike>(
  nodes: T[] | null | undefined,
  options?: { searchTerm?: string | undefined } | undefined,
): T[] {
  return filterVaultTree(nodes, {
    hideDotFolders: !loadShowHiddenFolders(),
    hideTrashFolder: !loadShowTrashFolder(),
    hideRecordingCompanionFiles: loadHideRecordingCompanions(),
    searchTerm: options?.searchTerm,
  });
}
