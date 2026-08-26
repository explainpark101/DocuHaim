function sortLocalTreeChildren(nodes: any) {
  nodes.sort((a: any, b: any) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
  });
  nodes.forEach((node: any) => {
    if (node.children?.length) sortLocalTreeChildren(node.children);
  });
  return nodes;
}

async function collectDirectoryEntries(dirHandle: any) {
  const entries = [];
  for await (const entry of dirHandle.values()) {
    entries.push(entry);
  }
  return entries;
}

async function directoryHasEntries(dirHandle: any) {
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
export async function readLocalDirectoryLevel(dirHandle: any, basePath = '', parentHandle: any = null): Promise<any> {
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
export async function readLocalDirectoryTree(dirHandle: any, basePath = '', parentHandle: any = null): Promise<any> {
  const resolvedParent = parentHandle ?? dirHandle;
  const entries = await collectDirectoryEntries(dirHandle);

  const childNodes: any = await Promise.all(
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
        const subChildren: any = await readLocalDirectoryTree(entry, `${path}/`, entry);
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
export function patchLocalTreeChildren(nodes: any, folderPath: any, children: any) {
  if (!nodes?.length) return nodes;
  return nodes.map((node: any) => {
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

/**
 * Recursively load children for expanded folders (breadth-first by visible depth).
 * Nested expanded folders are loaded after their parents appear in the tree.
 * @param {Array} nodes
 * @param {Set<string> | Iterable<string> | null | undefined} expandedPaths
 */
export async function hydrateExpandedLocalFolders(nodes: any, expandedPaths: any) {
  const expanded =
    expandedPaths instanceof Set ? expandedPaths : new Set(expandedPaths ?? []);
  if (!Array.isArray(nodes) || nodes.length === 0 || expanded.size === 0) {
    return nodes;
  }

  let tree = nodes;
  for (;;) {
    const toLoad: any = [];
    const visit = (list: any) => {
      if (!list?.length) return;
      for (const node of list) {
        if (node?.type !== 'folder') continue;
        if (expanded.has(node.path) && node.childrenLoaded !== true && node.handle) {
          toLoad.push(node);
        }
        if (node.children?.length) visit(node.children);
      }
    };
    visit(tree);
    if (toLoad.length === 0) return tree;

    const loaded = await Promise.all(
      // @ts-expect-error TS(7006): Parameter 'folder' implicitly has an 'any' type.
      toLoad.map(async (folder) => ({
        path: folder.path,
        children: await readLocalDirectoryLevel(folder.handle, folder.path, folder.handle),
      })),
    );

    for (const { path, children } of loaded) {
      tree = patchLocalTreeChildren(tree, path, children);
    }
  }
}
