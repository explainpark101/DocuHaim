import {
  listChildren,
  type IdbChildNode,
} from '@/utils/vault/idbVaultStore';

function sortIdbTreeChildren(nodes: IdbChildNode[]): IdbChildNode[] {
  nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
  });
  nodes.forEach((node) => {
    if (node.children?.length) sortIdbTreeChildren(node.children);
  });
  return nodes;
}

/** Tag tree nodes with storage type `idb` for sidebar / open routing. */
function tagIdbNodes(nodes: IdbChildNode[]): any[] {
  return nodes.map((node) => {
    if (node.type === 'folder') {
      return {
        ...node,
        storageType: 'idb',
        children: tagIdbNodes(node.children || []),
      };
    }
    return {
      ...node,
      storageType: 'idb',
      type: 'file',
    };
  });
}

export async function readIdbDirectoryLevel(basePath = ''): Promise<any[]> {
  const normalized = String(basePath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
  const children = await listChildren(normalized);
  return tagIdbNodes(sortIdbTreeChildren(children));
}

export async function readIdbDirectoryTree(basePath = ''): Promise<any[]> {
  const level = await readIdbDirectoryLevel(basePath);
  const walk = async (nodes: any[]): Promise<any[]> => {
    const out: any[] = [];
    for (const node of nodes) {
      if (node.type === 'folder' && !node.childrenLoaded) {
        const folderPath = String(node.path || '').replace(/\/+$/, '');
        const children = await readIdbDirectoryLevel(folderPath);
        out.push({
          ...node,
          children: await walk(children),
          childrenLoaded: true,
        });
      } else if (node.type === 'folder') {
        out.push({
          ...node,
          children: await walk(node.children || []),
          childrenLoaded: true,
        });
      } else {
        out.push(node);
      }
    }
    return out;
  };
  return walk(level);
}

export function patchIdbTreeChildren(
  tree: any[],
  folderPath: string,
  children: any[],
): any[] {
  const target = String(folderPath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  const targetWithSlash = target.endsWith('/') ? target : `${target}/`;

  const walk = (nodes: any[]): any[] =>
    nodes.map((node) => {
      if (node.type !== 'folder') return node;
      const nodePath = String(node.path || '');
      if (nodePath === targetWithSlash || nodePath.replace(/\/+$/, '') === target.replace(/\/+$/, '')) {
        return {
          ...node,
          children,
          childrenLoaded: true,
        };
      }
      if (node.children?.length) {
        return { ...node, children: walk(node.children) };
      }
      return node;
    });

  return walk(tree || []);
}
