/**
 * Build lazy tree nodes from a depth-1 PROPFIND result.
 * @param {{ key: string, etag: string | null, mtime: number | null, isCollection: boolean, size?: number }[]} entries
 * @param {string} parentPath
 */
export function buildWebdavTreeNodesFromPropfind(entries, parentPath = '') {
  const parentNorm = String(parentPath || '')
    .replace(/^\/+/, '')
    .replace(/\/?$/, '');
  const nodes = [];

  for (const entry of entries) {
    let key = String(entry.key || '').replace(/^\/+/, '');
    if (!key) continue;

    // Only direct children
    const relative = parentNorm
      ? key.startsWith(parentNorm + '/')
        ? key.slice(parentNorm.length + 1)
        : key === parentNorm
          ? ''
          : null
      : key;
    if (relative == null || relative === '') continue;
    if (relative.includes('/')) continue;

    const name = relative.replace(/\/$/, '');
    if (!name) continue;

    if (entry.isCollection) {
      const path = parentNorm ? `${parentNorm}/${name}/` : `${name}/`;
      nodes.push({
        name,
        type: 'folder',
        path,
        children: [],
        childrenLoaded: false,
        lastModified: entry.mtime ? new Date(entry.mtime) : undefined,
      });
    } else {
      const path = parentNorm ? `${parentNorm}/${name}` : name;
      nodes.push({
        name,
        type: 'file',
        path,
        lastModified: entry.mtime ? new Date(entry.mtime) : undefined,
        size: entry.size,
      });
    }
  }

  nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
  });

  return nodes;
}

/**
 * Patch children into a webdav tree (same shape as localTree patch).
 * @param {Array} tree
 * @param {string} folderPath
 * @param {Array} children
 */
export function patchWebdavTreeChildren(tree, folderPath, children) {
  const target = folderPath.replace(/\/?$/, '/');
  const walk = (nodes) => {
    if (!nodes) return false;
    for (const node of nodes) {
      if (node.type === 'folder' && node.path === target) {
        node.children = children;
        node.childrenLoaded = true;
        return true;
      }
      if (node.children && walk(node.children)) return true;
    }
    return false;
  };
  const next = structuredClone ? structuredClone(tree) : JSON.parse(JSON.stringify(tree));
  walk(next);
  return next;
}
