/**
 * In-flight tree move/copy busy markers for Sidebar TreeNode UI.
 */

export type TreeTransferAction = 'move' | 'copy';

export type TreeTransferBusyEntry = {
  storageType: string;
  /** Source path (file or folder; folders usually end with `/`). */
  path: string;
  nodeType: 'file' | 'folder';
  /** Destination parent folder path (`''` = root). */
  destFolderPath: string;
  action: TreeTransferAction;
};

export function treeTransferBusyKey(storageType: string, path: string): string {
  return `${storageType}:${String(path || '')}`;
}

export function formatTransferDestLabel(
  destFolderPath: string | null | undefined,
  storageType = 's3',
): string {
  const raw = String(destFolderPath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  const trimmed = raw.replace(/\/+$/, '');
  if (!trimmed) {
    return storageType === 's3' ? '루트 (버킷 최상위)' : '루트 폴더';
  }
  return trimmed;
}

export function transferBusyTooltipText(entry: TreeTransferBusyEntry | null | undefined): string {
  if (!entry) return '';
  const verb = entry.action === 'copy' ? '복제 중' : '이동 중';
  const dest = formatTransferDestLabel(entry.destFolderPath, entry.storageType);
  return `${verb} → ${dest}`;
}

function normalizeFolderPrefix(path: string): string {
  const p = String(path || '').replace(/\\/g, '/');
  if (!p) return '';
  return p.endsWith('/') ? p : `${p}/`;
}

/**
 * Find the busy entry that applies to this node (exact match or under a busy folder).
 */
export function findApplicableTransferBusy(
  items: TreeTransferBusyEntry[] | null | undefined,
  storageType: string,
  nodePath: string,
): TreeTransferBusyEntry | null {
  if (!Array.isArray(items) || !items.length || !nodePath) return null;
  const path = String(nodePath);
  let matched: TreeTransferBusyEntry | null = null;
  for (const entry of items) {
    if (!entry || entry.storageType !== storageType) continue;
    if (entry.path === path) {
      matched = entry;
      break;
    }
    if (entry.nodeType === 'folder') {
      const prefix = normalizeFolderPrefix(entry.path);
      if (prefix && path.startsWith(prefix)) {
        // Prefer the deepest matching folder if multiple (unlikely).
        if (!matched || normalizeFolderPrefix(entry.path).length > normalizeFolderPrefix(matched.path).length) {
          matched = entry;
        }
      }
    }
  }
  return matched;
}

export function upsertTreeTransferBusy(
  prev: TreeTransferBusyEntry[],
  entry: TreeTransferBusyEntry,
): TreeTransferBusyEntry[] {
  const key = treeTransferBusyKey(entry.storageType, entry.path);
  const next = (prev || []).filter(
    (e) => treeTransferBusyKey(e.storageType, e.path) !== key,
  );
  next.push(entry);
  return next;
}

export function removeTreeTransferBusy(
  prev: TreeTransferBusyEntry[],
  storageType: string,
  path: string,
): TreeTransferBusyEntry[] {
  const key = treeTransferBusyKey(storageType, path);
  return (prev || []).filter(
    (e) => treeTransferBusyKey(e.storageType, e.path) !== key,
  );
}
