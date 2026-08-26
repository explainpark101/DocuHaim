/**
 * Helpers for multi-select tree drag-and-drop (move into folders).
 */

/**
 * Parent folder path for a file or folder path (trailing slash). Root → ''.
 * @param {string} path
 * @returns {string}
 */
export function getParentFolderPath(path: any) {
  if (!path || typeof path !== 'string') return '';
  const normalized = path.replace(/\/+$/, '');
  if (!normalized) return '';
  const lastSlashIndex = normalized.lastIndexOf('/');
  if (lastSlashIndex < 0) return '';
  return normalized.slice(0, lastSlashIndex + 1);
}

/**
 * @param {string} storageType
 * @param {string} path
 * @returns {string}
 */
export function toTreeSelectKey(storageType: any, path: any) {
  return `${storageType}:${path}`;
}

/**
 * @param {string} key
 * @returns {{ storageType: string, path: string }}
 */
export function parseTreeSelectKey(key: any) {
  if (typeof key !== 'string') return { storageType: 's3', path: '' };
  const colonIdx = key.indexOf(':');
  if (colonIdx < 0) return { storageType: 's3', path: key };
  return {
    storageType: key.slice(0, colonIdx),
    path: key.slice(colonIdx + 1),
  };
}

/**
 * Draggable id matches select key: `storageType:path`
 * @param {string} storageType
 * @param {string} path
 * @returns {string}
 */
export function toDraggableId(storageType: any, path: any) {
  return toTreeSelectKey(storageType, path);
}

/**
 * Droppable id: `drop:storageType:path` (root path is empty string)
 * @param {string} storageType
 * @param {string} [path]
 * @returns {string}
 */
export function toDroppableId(storageType: any, path = '') {
  return `drop:${storageType}:${path ?? ''}`;
}

/**
 * @param {string | number} id
 * @returns {{ storageType: string, path: string } | null}
 */
export function parseDroppableId(id: any) {
  if (typeof id !== 'string' || !id.startsWith('drop:')) return null;
  const rest = id.slice(5);
  const colonIdx = rest.indexOf(':');
  if (colonIdx < 0) return null;
  return {
    storageType: rest.slice(0, colonIdx),
    path: rest.slice(colonIdx + 1),
  };
}

/**
 * @typedef {{ storageType: string, path: string, nodeType: string, name?: string }} TreeMoveItem
 */

/**
 * If an ancestor folder is also selected, drop descendant paths (they move with the folder).
 * @param {TreeMoveItem[]} items
 * @returns {TreeMoveItem[]}
 */
export function pruneNestedMovePaths(items: any) {
  if (!Array.isArray(items) || items.length <= 1) return items || [];

  const folderPaths = items
    .filter((i) => i.nodeType === 'folder' && i.path)
    .map((i) => i.path);

  if (!folderPaths.length) return items;

  return items.filter((item) => {
    for (const folderPath of folderPaths) {
      if (item.path === folderPath) continue;
      if (item.path.startsWith(folderPath)) return false;
    }
    return true;
  });
}

/**
 * Resolve which tree nodes to move when dragging starts.
 * If the active node is in the selection, move all selected items of the same storage;
 * otherwise move only the active node.
 *
 * @param {string} activeKey - `storageType:path`
 * @param {Set<string> | null | undefined} selectedIds
 * @param {(storageType: string, path: string) => { type?: string, name?: string, path?: string } | null} findNode
 * @returns {TreeMoveItem[]}
 */
export function resolveDragItems(activeKey: any, selectedIds: any, findNode: any) {
  const { storageType, path } = parseTreeSelectKey(activeKey);
  const activeNode = findNode(storageType, path);
  if (!activeNode || activeNode.path === '.trash/') return [];

  /** @type {TreeMoveItem[]} */
  let items;

  if (selectedIds?.has?.(activeKey) && selectedIds.size > 1) {
    items = [];
    for (const key of selectedIds) {
      const parsed = parseTreeSelectKey(key);
      if (parsed.storageType !== storageType) continue;
      if (parsed.path === '.trash/') continue;
      const node = findNode(parsed.storageType, parsed.path);
      if (!node) continue;
      items.push({
        storageType: parsed.storageType,
        path: parsed.path,
        nodeType: node.type,
        name: node.name,
      });
    }
    if (!items.length) {
      items = [
        {
          storageType,
          path,
          nodeType: activeNode.type,
          name: activeNode.name,
        },
      ];
    }
  } else {
    items = [
      {
        storageType,
        path,
        nodeType: activeNode.type,
        name: activeNode.name,
      },
    ];
  }

  return pruneNestedMovePaths(items);
}

/**
 * @typedef {{ node: { path?: string, type?: string, name?: string, [key: string]: unknown }, type: string }} DeleteTarget
 */

/**
 * Resolve which tree nodes to delete.
 * If the clicked node is in a multi-selection, delete all selected items of the same storage
 * (nested descendants under a selected folder are pruned). Otherwise delete only the clicked node.
 *
 * @param {{ path?: string, type?: string, name?: string } | null | undefined} clickedNode
 * @param {string} storageType
 * @param {Set<string> | null | undefined} selectedIds
 * @param {(storageType: string, path: string) => { type?: string, name?: string, path?: string, [key: string]: unknown } | null} findNode
 * @returns {DeleteTarget[]}
 */
export function resolveDeleteTargets(clickedNode: any, storageType: any, selectedIds: any, findNode: any) {
  if (!clickedNode?.path || clickedNode.path === '.trash/') {
    return clickedNode?.path === '.trash/'
      ? [{ node: clickedNode, type: storageType }]
      : [];
  }

  const clickedKey = toTreeSelectKey(storageType, clickedNode.path);

  /** @type {DeleteTarget[]} */
  let targets;

  if (selectedIds?.has?.(clickedKey) && selectedIds.size > 1) {
    /** @type {TreeMoveItem[]} */
    const items = [];
    for (const key of selectedIds) {
      const parsed = parseTreeSelectKey(key);
      if (parsed.storageType !== storageType) continue;
      if (parsed.path === '.trash/') continue;
      const node = findNode(parsed.storageType, parsed.path);
      if (!node) continue;
      items.push({
        storageType: parsed.storageType,
        path: parsed.path,
        nodeType: node.type || 'file',
        name: node.name,
      });
    }
    const pruned = pruneNestedMovePaths(items);
    targets = [];
    for (const item of pruned) {
      const node = findNode(item.storageType, item.path);
      if (node) targets.push({ node, type: item.storageType });
    }
    if (!targets.length) {
      targets = [{ node: clickedNode, type: storageType }];
    }
  } else {
    targets = [{ node: clickedNode, type: storageType }];
  }

  return targets;
}
