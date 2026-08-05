function sortLocalTreeChildren(nodes) {
  nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
  });
  nodes.forEach((node) => {
    if (node.children?.length) sortLocalTreeChildren(node.children);
  });
  return nodes;
}

async function collectDirectoryEntries(dirHandle) {
  const entries = [];
  for await (const entry of dirHandle.values()) {
    entries.push(entry);
  }
  return entries;
}

async function directoryHasEntries(dirHandle) {
  for await (const _ of dirHandle.values()) {
    return true;
  }
  return false;
}

/**
 * Read one directory level only (lazy tree).
 * Empty subfolders are marked childrenLoaded: true; others start unloaded.
 * @param {FileSystemDirectoryHandle} dirHandle
 * @param {string} [basePath]
 * @param {FileSystemDirectoryHandle | null} [parentHandle]
 */
export async function readLocalDirectoryLevel(dirHandle, basePath = '', parentHandle = null) {
  const resolvedParent = parentHandle ?? dirHandle;
  const entries = await collectDirectoryEntries(dirHandle);

  const childNodes = await Promise.all(
    entries.map(async (entry) => {
      const path = basePath + entry.name;
      if (entry.kind === 'file') {
        let size;
        let lastModified;
        try {
          const file = await entry.getFile();
          size = file.size;
          lastModified = new Date(file.lastModified);
        } catch {
          /* metadata unavailable */
        }
        return {
          name: entry.name,
          type: 'file',
          path,
          handle: entry,
          parentHandle: resolvedParent,
          size,
          lastModified,
        };
      }
      if (entry.kind === 'directory') {
        const hasEntries = await directoryHasEntries(entry);
        return {
          name: entry.name,
          type: 'folder',
          path: `${path}/`,
          handle: entry,
          parentHandle: resolvedParent,
          children: [],
          childrenLoaded: !hasEntries,
        };
      }
      return null;
    }),
  );

  return sortLocalTreeChildren(childNodes.filter(Boolean));
}

/**
 * Full tree scan with parallel sibling reads (used for explicit refresh).
 * @param {FileSystemDirectoryHandle} dirHandle
 * @param {string} [basePath]
 * @param {FileSystemDirectoryHandle | null} [parentHandle]
 */
export async function readLocalDirectoryTree(dirHandle, basePath = '', parentHandle = null) {
  const resolvedParent = parentHandle ?? dirHandle;
  const entries = await collectDirectoryEntries(dirHandle);

  const childNodes = await Promise.all(
    entries.map(async (entry) => {
      const path = basePath + entry.name;
      if (entry.kind === 'file') {
        let size;
        let lastModified;
        try {
          const file = await entry.getFile();
          size = file.size;
          lastModified = new Date(file.lastModified);
        } catch {
          /* metadata unavailable */
        }
        return {
          name: entry.name,
          type: 'file',
          path,
          handle: entry,
          parentHandle: resolvedParent,
          size,
          lastModified,
        };
      }
      if (entry.kind === 'directory') {
        const subChildren = await readLocalDirectoryTree(entry, `${path}/`, entry);
        return {
          name: entry.name,
          type: 'folder',
          path: `${path}/`,
          handle: entry,
          parentHandle: resolvedParent,
          children: subChildren,
          childrenLoaded: true,
        };
      }
      return null;
    }),
  );

  return sortLocalTreeChildren(childNodes.filter(Boolean));
}

/**
 * @param {Array} nodes
 * @param {string} folderPath
 * @param {Array} children
 */
export function patchLocalTreeChildren(nodes, folderPath, children) {
  if (!nodes?.length) return nodes;
  return nodes.map((node) => {
    if (node.type === 'folder' && node.path === folderPath) {
      return { ...node, children, childrenLoaded: true };
    }
    if (node.type === 'folder' && node.children?.length) {
      return {
        ...node,
        children: patchLocalTreeChildren(node.children, folderPath, children),
      };
    }
    return node;
  });
}
