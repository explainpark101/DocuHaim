import {
  deletePath,
  deletePrefix,
  getEntry,
  listChildren,
  mkdir,
  putFile,
  normalizePath,
} from '@/utils/vault/idbVaultStore';
import { STORAGE_CAPABILITIES } from '@/utils/storage/capabilities.js';

/**
 * IndexedDB-backed StorageBackend (IDB Haim).
 */
export function createIdbBackend() {
  return {
    mode: 'idb' as const,
    capabilities: STORAGE_CAPABILITIES.idb,

    isReady() {
      return true;
    },

    async listChildren(path = '') {
      const basePath = path ? (path.endsWith('/') ? path.slice(0, -1) : path) : '';
      return listChildren(basePath);
    },

    async listAll() {
      return this.listChildren('');
    },

    async head(path: string) {
      const entry = await getEntry(path);
      if (!entry || entry.kind !== 'file') return null;
      return {
        etag: `idb-${entry.updatedAt}-${entry.size ?? 0}`,
        lastModified: new Date(entry.updatedAt),
        contentLength: entry.size ?? entry.blob?.size ?? 0,
        contentType: entry.contentType || null,
      };
    },

    async readBytes(path: string) {
      const entry = await getEntry(path);
      if (!entry || entry.kind !== 'file' || !entry.blob) {
        throw new Error(`IDB file not found: ${path}`);
      }
      const buf = new Uint8Array(await entry.blob.arrayBuffer());
      return {
        body: buf,
        contentType: entry.contentType || null,
        contentLength: buf.byteLength,
        lastModified: new Date(entry.updatedAt),
      };
    },

    async readText(path: string) {
      const entry = await getEntry(path);
      if (!entry || entry.kind !== 'file' || !entry.blob) {
        throw new Error(`IDB file not found: ${path}`);
      }
      const text = await entry.blob.text();
      return {
        text,
        contentType: entry.contentType || null,
        contentLength: entry.size ?? entry.blob.size,
        lastModified: new Date(entry.updatedAt),
      };
    },

    async writeBytes(
      path: string,
      body: Uint8Array | ArrayBuffer | Blob | string,
      contentType = 'application/octet-stream',
    ) {
      await putFile(path, body, contentType);
    },

    async writeText(path: string, text: string, contentType = 'text/plain; charset=utf-8') {
      await putFile(path, text, contentType);
    },

    async mkdir(path: string) {
      await mkdir(path);
    },

    async delete(path: string) {
      await deletePath(path);
    },

    async deletePrefix(prefix: string) {
      await deletePrefix(prefix);
    },

    async copy(fromPath: string, toPath: string) {
      const { body, contentType } = await this.readBytes(fromPath);
      await this.writeBytes(toPath, body, contentType || 'application/octet-stream');
    },

    async move(fromPath: string, toPath: string) {
      const from = normalizePath(fromPath);
      const to = normalizePath(toPath);
      const entry = await getEntry(from);
      if (!entry) throw new Error(`IDB path not found: ${fromPath}`);
      if (entry.kind === 'dir') {
        const children = await listChildren(from);
        await mkdir(to);
        for (const child of children) {
          const childName = child.name;
          const childFrom =
            child.type === 'folder'
              ? `${from}/${childName}`
              : `${from}/${childName}`;
          const childTo = `${to}/${childName}`;
          if (child.type === 'folder') {
            await this.move(childFrom, childTo);
          } else {
            await this.copy(childFrom, childTo);
            await this.delete(childFrom);
          }
        }
        await deletePath(from);
        return;
      }
      await this.copy(from, to);
      await this.delete(from);
    },

    async ensureTrash() {
      await mkdir('.trash');
    },

    async trash(path: string, { additionalKeys = [] }: { additionalKeys?: string[] } = {}) {
      await this.ensureTrash();
      const isFolder = path.endsWith('/');
      const src = path.replace(/\/+$/, '');
      const dest = `.trash/${src}`;
      if (isFolder) {
        await this.move(src, dest);
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
      const entry = await getEntry(path);
      if (!entry || entry.kind !== 'file' || !entry.blob) return null;
      return URL.createObjectURL(entry.blob);
    },
  };
}

export type IdbBackend = ReturnType<typeof createIdbBackend>;
