/**
 * Local vault backend for the Tauri desktop shell (absolute vault root + plugin-fs).
 * Plugin APIs are loaded lazily so plain web Vite never eagerly imports @tauri-apps/*.
 */

import { STORAGE_CAPABILITIES } from '@/utils/storage/capabilities';

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
        entries.map(async (entry: any) => {
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

export async function readTauriLocalDirectoryTree(vaultRoot: string) {
  const backend = createTauriLocalBackend(vaultRoot);
  const walk = async (rel: string): Promise<unknown[]> => {
    const children = await backend.listChildren(rel);
    const out = [];
    for (const child of children) {
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
