/**
 * Helpers for multi-select tree drag-and-drop (move into folders).
 */

/**
 * @param {string} storageType
 * @param {string} path
 * @returns {string}
 */
export function toTreeSelectKey(storageType, path) {
  return `${storageType}:${path}`;
}

/**
 * @param {string} key
 * @returns {{ storageType: string, path: string }}
 */
export function parseTreeSelectKey(key) {
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
export function toDraggableId(storageType, path) {
  return toTreeSelectKey(storageType, path);
}

/**
 * Droppable id: `drop:storageType:path` (root path is empty string)
 * @param {string} storageType
 * @param {string} [path]
 * @returns {string}
 */
export function toDroppableId(storageType, path = '') {
  return `drop:${storageType}:${path ?? ''}`;
}

/**
 * @param {string | number} id
 * @returns {{ storageType: string, path: string } | null}
 */
export function parseDroppableId(id) {
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
export function pruneNestedMovePaths(items) {
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
export function resolveDragItems(activeKey, selectedIds, findNode) {
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
