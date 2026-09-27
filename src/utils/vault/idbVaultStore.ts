import Dexie, { type Table } from 'dexie';

export type IdbVaultEntryKind = 'file' | 'dir';

export type IdbVaultEntry = {
  path: string;
  kind: IdbVaultEntryKind;
  /** File bytes only; dirs omit blob. */
  blob?: Blob;
  contentType?: string | null;
  size?: number;
  updatedAt: number;
};

class IdbVaultDatabase extends Dexie {
  entries!: Table<IdbVaultEntry, string>;

  constructor() {
    super('s3haim-idb-vault');
    this.version(1).stores({
      entries: 'path, kind, updatedAt',
    });
  }
}

const db = new IdbVaultDatabase();

function normalizePath(path: string): string {
  return String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

function parentPathOf(path: string): string {
  const normalized = normalizePath(path);
  const idx = normalized.lastIndexOf('/');
  return idx < 0 ? '' : normalized.slice(0, idx);
}

function nameOf(path: string): string {
  const normalized = normalizePath(path);
  const idx = normalized.lastIndexOf('/');
  return idx < 0 ? normalized : normalized.slice(idx + 1);
}

export async function ensureParentDirs(path: string): Promise<void> {
  const normalized = normalizePath(path);
  if (!normalized) return;
  const parts = normalized.split('/');
  let current = '';
  for (let i = 0; i < parts.length - 1; i += 1) {
    current = current ? `${current}/${parts[i]}` : String(parts[i]);
    const existing = await db.entries.get(current);
    if (!existing) {
      await db.entries.put({
        path: current,
        kind: 'dir',
        updatedAt: Date.now(),
      });
    } else if (existing.kind === 'file') {
      throw new Error(`Cannot create directory under file path: ${current}`);
    }
  }
}

export async function getEntry(path: string): Promise<IdbVaultEntry | undefined> {
  const normalized = normalizePath(path);
  if (!normalized) return undefined;
  return db.entries.get(normalized);
}

export async function mkdir(path: string): Promise<void> {
  const normalized = normalizePath(path);
  if (!normalized) return;
  await ensureParentDirs(`${normalized}/x`);
  const existing = await db.entries.get(normalized);
  if (existing?.kind === 'file') {
    throw new Error(`Path is a file: ${normalized}`);
  }
  await db.entries.put({
    path: normalized,
    kind: 'dir',
    updatedAt: Date.now(),
  });
}

function toBlob(
  body: Uint8Array | ArrayBuffer | Blob | string,
  contentType?: string | null,
): Blob {
  if (body instanceof Blob) return body;
  if (typeof body === 'string') {
    return new Blob([body], { type: contentType || 'text/plain; charset=utf-8' });
  }
  const bytes = body instanceof Uint8Array ? body : new Uint8Array(body);
  // Copy into a fresh ArrayBuffer-backed view for BlobPart typing.
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new Blob([copy], {
    type: contentType || 'application/octet-stream',
  });
}

export async function putFile(
  path: string,
  body: Uint8Array | ArrayBuffer | Blob | string,
  contentType?: string | null,
): Promise<void> {
  const normalized = normalizePath(path);
  if (!normalized) throw new Error('Invalid path');
  await ensureParentDirs(normalized);
  const blob = toBlob(body, contentType);
  await db.entries.put({
    path: normalized,
    kind: 'file',
    blob,
    contentType: contentType ?? (blob.type || null),
    size: blob.size,
    updatedAt: Date.now(),
  });
}

export async function deletePath(path: string): Promise<void> {
  const normalized = normalizePath(path);
  if (!normalized) throw new Error('Cannot delete root');
  const entry = await db.entries.get(normalized);
  if (!entry) return;
  if (entry.kind === 'dir') {
    await deletePrefix(normalized);
    return;
  }
  await db.entries.delete(normalized);
}

export async function deletePrefix(prefix: string): Promise<void> {
  const normalized = normalizePath(prefix);
  if (!normalized) throw new Error('Cannot delete root');
  const withSlash = `${normalized}/`;
  await db.transaction('rw', db.entries, async () => {
    const all = await db.entries.toArray();
    const toDelete = all
      .filter((e) => e.path === normalized || e.path.startsWith(withSlash))
      .map((e) => e.path);
    await db.entries.bulkDelete(toDelete);
  });
}

export type IdbChildNode = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
  lastModified?: Date;
  children?: IdbChildNode[];
  childrenLoaded?: boolean;
};

/**
 * List direct children under prefix ('' = vault root).
 */
export async function listChildren(prefix = ''): Promise<IdbChildNode[]> {
  const base = normalizePath(prefix);
  const basePrefix = base ? `${base}/` : '';
  const all = await db.entries.toArray();
  const childMap = new Map<string, IdbVaultEntry & { hasNested?: boolean }>();

  for (const entry of all) {
    if (base) {
      if (entry.path === base) continue;
      if (!entry.path.startsWith(basePrefix)) continue;
    }
    const rest = base ? entry.path.slice(basePrefix.length) : entry.path;
    if (!rest) continue;
    const slash = rest.indexOf('/');
    const childName = slash < 0 ? rest : rest.slice(0, slash);
    const childPath = basePrefix + childName;
    if (slash >= 0) {
      const existing = childMap.get(childPath);
      if (!existing) {
        childMap.set(childPath, {
          path: childPath,
          kind: 'dir',
          updatedAt: entry.updatedAt,
          hasNested: true,
        });
      } else {
        existing.hasNested = true;
      }
    } else {
      childMap.set(childPath, { ...entry, hasNested: entry.kind === 'dir' });
    }
  }

  // Mark dirs that have any descendants.
  for (const entry of all) {
    if (!entry.path.startsWith(basePrefix) || entry.path === base) continue;
    const rest = entry.path.slice(basePrefix.length);
    const slash = rest.indexOf('/');
    if (slash < 0) continue;
    const childPath = basePrefix + rest.slice(0, slash);
    const node = childMap.get(childPath);
    if (node) node.hasNested = true;
  }

  const nodes: IdbChildNode[] = [];
  for (const entry of childMap.values()) {
    const name = nameOf(entry.path);
    if (entry.kind === 'file') {
      const fileNode: IdbChildNode = {
        name,
        type: 'file',
        path: entry.path,
      };
      if (entry.size != null) fileNode.size = entry.size;
      if (entry.updatedAt) fileNode.lastModified = new Date(entry.updatedAt);
      nodes.push(fileNode);
    } else {
      const hasNested = Boolean(
        (entry as { hasNested?: boolean }).hasNested ||
          all.some((e) => e.path.startsWith(`${entry.path}/`)),
      );
      const folderNode: IdbChildNode = {
        name,
        type: 'folder',
        path: `${entry.path}/`,
        children: [],
        childrenLoaded: !hasNested,
      };
      if (entry.updatedAt) folderNode.lastModified = new Date(entry.updatedAt);
      nodes.push(folderNode);
    }
  }

  nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
  });
  return nodes;
}

export async function listAllFiles(): Promise<
  { path: string; blob: Blob; contentType: string | null; size: number; updatedAt: number }[]
> {
  const all = await db.entries.toArray();
  const files: {
    path: string;
    blob: Blob;
    contentType: string | null;
    size: number;
    updatedAt: number;
  }[] = [];
  for (const entry of all) {
    if (entry.kind !== 'file' || !entry.blob) continue;
    files.push({
      path: entry.path,
      blob: entry.blob,
      contentType: entry.contentType ?? null,
      size: entry.size ?? entry.blob.size,
      updatedAt: entry.updatedAt,
    });
  }
  files.sort((a, b) => a.path.localeCompare(b.path));
  return files;
}

export async function listAllDirPaths(): Promise<string[]> {
  const all = await db.entries.toArray();
  return all
    .filter((e) => e.kind === 'dir')
    .map((e) => e.path)
    .sort((a, b) => a.localeCompare(b));
}

export async function isVaultEmpty(): Promise<boolean> {
  const count = await db.entries.count();
  return count === 0;
}

export async function countEntries(): Promise<number> {
  return db.entries.count();
}

export { normalizePath, parentPathOf, nameOf, db as idbVaultDb };
