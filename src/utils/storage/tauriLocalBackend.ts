/**
 * Local vault backend for the Tauri desktop shell (absolute vault root + plugin-fs).
 * Plugin APIs are loaded lazily so plain web Vite never eagerly imports @tauri-apps/*.
 */

import { patchLocalTreeChildren } from '@/utils/localTree';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';
import { STORAGE_CAPABILITIES } from '@/utils/storage/capabilities.js';

function joinVault(root: string, rel: string): string {
  const base = String(root || '').replace(/[/\\]+$/, '');
  const r = String(rel || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  if (!r) return base;
  return `${base}/${r}`.replace(/\\/g, '/');
}

function parentRel(path: string): { parent: string; name: string } {
  const normalized = String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
  const i = normalized.lastIndexOf('/');
  if (i < 0) return { parent: '', name: normalized };
  return { parent: normalized.slice(0, i), name: normalized.slice(i + 1) };
}

async function fsApi() {
  return import('@tauri-apps/plugin-fs');
}

export function createTauriLocalBackend(vaultRoot: string) {
  const root = String(vaultRoot || '').trim();

  return {
    mode: 'local' as const,
    capabilities: STORAGE_CAPABILITIES.local,
    vaultRoot: root,

    isReady() {
      return Boolean(root);
    },

    async listChildren(path = '') {
      if (!root) return [];
      const { readDir, stat } = await fsApi();
      const basePath = path ? (path.endsWith('/') ? path : `${path}/`) : '';
      const abs = joinVault(root, path.replace(/\/$/, ''));
      const entries = await readDir(abs);
      const nodes = await Promise.all(
        entries.map(async (entry) => {
          const name = entry.name;
          const childRel = `${basePath}${name}`;
          const childAbs = joinVault(root, childRel.replace(/\/$/, ''));
          if (entry.isDirectory) {
            return {
              name,
              type: 'folder' as const,
              path: `${childRel.replace(/\/$/, '')}/`,
              children: [],
              childrenLoaded: false,
            };
          }
          let size: number | undefined;
          let lastModified: Date | undefined;
          try {
            const meta = await stat(childAbs);
            size = Number(meta.size) || undefined;
            if (meta.mtime) lastModified = new Date(meta.mtime);
          } catch {
            /* ignore */
          }
          return {
            name,
            type: 'file' as const,
            path: childRel,
            size,
            lastModified,
          };
        }),
      );
      nodes.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
      });
      return nodes;
    },

    async listAll() {
      return this.listChildren('');
    },

    async head(path: string) {
      if (!root) return null;
      try {
        const { stat } = await fsApi();
        const meta = await stat(joinVault(root, path));
        return {
          etag: null,
          lastModified: meta.mtime ? new Date(meta.mtime) : null,
          contentLength: Number(meta.size) || 0,
          contentType: null,
        };
      } catch {
        return null;
      }
    },

    async readBytes(path: string) {
      if (!root) throw new Error('Local vault path is not set');
      const { readFile } = await fsApi();
      const body = await readFile(joinVault(root, path));
      return {
        body,
        contentType: null,
        contentLength: body.byteLength,
        lastModified: null,
      };
    },

    async readText(path: string) {
      const { body, ...rest } = await this.readBytes(path);
      return {
        text: new TextDecoder('utf-8').decode(body),
        ...rest,
      };
    },

    async writeBytes(path: string, body: Uint8Array) {
      if (!root) throw new Error('Local vault path is not set');
      const { mkdir, writeFile } = await fsApi();
      const { parent } = parentRel(path);
      if (parent) {
        await mkdir(joinVault(root, parent), { recursive: true });
      }
      await writeFile(joinVault(root, path), body);
    },

    async writeText(path: string, text: string, _contentType?: string) {
      await this.writeBytes(path, new TextEncoder().encode(text));
    },

    async mkdir(path: string) {
      if (!root) throw new Error('Local vault path is not set');
      const { mkdir } = await fsApi();
      await mkdir(joinVault(root, path.replace(/\/+$/, '')), { recursive: true });
    },

    async delete(path: string) {
      if (!root) throw new Error('Local vault path is not set');
      const { remove } = await fsApi();
      await remove(joinVault(root, path.replace(/\/+$/, '')));
    },

    async deletePrefix(prefix: string) {
      if (!root) throw new Error('Local vault path is not set');
      const { remove } = await fsApi();
      const normalized = prefix.replace(/\/+$/, '').replace(/^\/+/, '');
      if (!normalized) throw new Error('Cannot delete local root');
      await remove(joinVault(root, normalized), { recursive: true });
    },

    async copy(fromPath: string, toPath: string) {
      if (!root) throw new Error('Local vault path is not set');
      const { copyFile, mkdir } = await fsApi();
      const { parent } = parentRel(toPath);
      if (parent) await mkdir(joinVault(root, parent), { recursive: true });
      await copyFile(joinVault(root, fromPath), joinVault(root, toPath));
    },

    async move(fromPath: string, toPath: string) {
      if (!root) throw new Error('Local vault path is not set');
      const { rename, mkdir } = await fsApi();
      const { parent } = parentRel(toPath);
      if (parent) await mkdir(joinVault(root, parent), { recursive: true });
      await rename(joinVault(root, fromPath), joinVault(root, toPath));
    },

    async ensureTrash() {
      await this.mkdir('.trash');
    },

    async trash(path: string, { additionalKeys = [] }: { additionalKeys?: string[] } = {}) {
      await this.ensureTrash();
      const isFolder = path.endsWith('/');
      const src = path.replace(/\/+$/, '');
      const dest = `.trash/${src}`;
      if (isFolder) {
        const copyDir = async (fromRel: string, toRel: string) => {
          await this.mkdir(toRel);
          const children = await this.listChildren(fromRel.endsWith('/') ? fromRel : `${fromRel}/`);
          for (const child of children) {
            if (child.type === 'folder') {
              await copyDir(child.path.replace(/\/$/, ''), `${toRel}/${child.name}`);
            } else {
              await this.copy(child.path, `${toRel}/${child.name}`);
            }
          }
        };
        await copyDir(src, dest);
        await this.deletePrefix(src);
      } else {
        await this.copy(path, `.trash/${path}`);
        await this.delete(path);
      }
      for (const key of additionalKeys) {
        try {
          await this.copy(key, `.trash/${key}`);
          await this.delete(key);
        } catch {
          /* missing companion ok */
        }
      }
    },

    async getObjectUrl(path: string) {
      if (!root) return null;
      try {
        const { readFile } = await fsApi();
        const bytes = await readFile(joinVault(root, path));
        const blob = new Blob([bytes as BlobPart]);
        return URL.createObjectURL(blob);
      } catch {
        return null;
      }
    },
  };
}

export async function pickTauriLocalVaultDirectory(): Promise<string | null> {
  const { open } = await import('@tauri-apps/plugin-dialog');
  const selected = await open({
    directory: true,
    multiple: false,
    title: 'Open Local Haim folder',
  });
  if (!selected || Array.isArray(selected)) return null;
  return String(selected);
}

/** Read one directory level only (lazy tree; matches web FSA `readLocalDirectoryLevel`). */
export async function readTauriLocalDirectoryLevel(
  vaultRoot: string,
  basePath = '',
): Promise<unknown[]> {
  const backend = createTauriLocalBackend(vaultRoot);
  return backend.listChildren(basePath);
}

/**
 * Load children for expanded folders after a lazy root read (breadth-first by depth).
 */
export async function hydrateExpandedTauriLocalFolders(
  vaultRoot: string,
  nodes: unknown[],
  expandedPaths?: Iterable<string> | Set<string> | null,
): Promise<unknown[]> {
  const expanded =
    expandedPaths instanceof Set ? expandedPaths : new Set(expandedPaths ?? []);
  if (!Array.isArray(nodes) || nodes.length === 0 || expanded.size === 0) {
    return nodes;
  }

  const backend = createTauriLocalBackend(vaultRoot);
  let tree = nodes;
  for (;;) {
    const toLoad: Array<{ path: string }> = [];
    const visit = (list: unknown[]) => {
      if (!list?.length) return;
      for (const node of list) {
        const folder = node as {
          type?: string;
          path?: string;
          childrenLoaded?: boolean;
          children?: unknown[];
        };
        if (folder?.type !== 'folder') continue;
        if (
          folder.path &&
          expanded.has(folder.path) &&
          folder.childrenLoaded !== true
        ) {
          toLoad.push({ path: folder.path });
        }
        if (folder.children?.length) visit(folder.children);
      }
    };
    visit(tree);
    if (toLoad.length === 0) return tree;

    const loaded = await Promise.all(
      toLoad.map(async (folder) => ({
        path: folder.path,
        children: await backend.listChildren(folder.path),
      })),
    );

    for (const { path, children } of loaded) {
      tree = patchLocalTreeChildren(tree, path, children);
    }
    await yieldToMain();
  }
}

/** Fast startup path: root level + previously expanded folders only. */
export async function loadTauriLocalTreeInitial(
  vaultRoot: string,
  expandedPaths?: Iterable<string> | Set<string> | null,
): Promise<unknown[]> {
  const level = await readTauriLocalDirectoryLevel(vaultRoot);
  return hydrateExpandedTauriLocalFolders(vaultRoot, level, expandedPaths);
}

/** Full recursive scan — use for explicit refresh / storage usage analysis only. */
export async function readTauriLocalDirectoryTree(vaultRoot: string) {
  const backend = createTauriLocalBackend(vaultRoot);
  let scanned = 0;
  const walk = async (rel: string): Promise<unknown[]> => {
    const children = await backend.listChildren(rel);
    const out = [];
    for (const child of children) {
      scanned += 1;
      if (scanned % 16 === 0) await yieldToMain();
      if (child.type === 'folder') {
        const nested = await walk(child.path);
        out.push({ ...child, children: nested, childrenLoaded: true });
      } else {
        out.push(child);
      }
    }
    return out;
  };
  return walk('');
}
