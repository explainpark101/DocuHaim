import {
  getLocalDirectoryHandleForPath,
  getLocalFileHandleForPath,
  getLocalWikiImageObjectUrl,
} from '@/utils/localEditorImage';
import { readLocalDirectoryLevel } from '@/utils/vault/localTree';
import { STORAGE_CAPABILITIES } from '@/utils/storage/capabilities';

/**
 * @param {FileSystemDirectoryHandle | null} rootHandle
 */
export function createLocalBackend(rootHandle: any) {
  return {
    mode: 'local',
    capabilities: STORAGE_CAPABILITIES.local,

    isReady() {
      return Boolean(rootHandle);
    },

    async listChildren(path = '') {
      if (!rootHandle) return [];
      const basePath = path ? (path.endsWith('/') ? path : `${path}/`) : '';
      const dir = path
        ? await getLocalDirectoryHandleForPath(rootHandle, path.replace(/\/$/, ''), {
            create: false,
          })
        : rootHandle;
      return readLocalDirectoryLevel(dir, basePath);
    },

    async listAll() {
      return this.listChildren('');
    },

    async head(path: any) {
      if (!rootHandle) return null;
      try {
        const fileHandle = await getLocalFileHandleForPath(rootHandle, path, { create: false });
        const file = await fileHandle.getFile();
        return {
          etag: null,
          lastModified: new Date(file.lastModified),
          contentLength: file.size,
          contentType: file.type || null,
        };
      } catch {
        return null;
      }
    },

    async readBytes(path: any) {
      if (!rootHandle) throw new Error('Local folder is not open');
      const fileHandle = await getLocalFileHandleForPath(rootHandle, path, { create: false });
      const file = await fileHandle.getFile();
      const buf = new Uint8Array(await file.arrayBuffer());
      return {
        body: buf,
        contentType: file.type || null,
        contentLength: file.size,
        lastModified: new Date(file.lastModified),
      };
    },

    async readText(path: any) {
      if (!rootHandle) throw new Error('Local folder is not open');
      const fileHandle = await getLocalFileHandleForPath(rootHandle, path, { create: false });
      const file = await fileHandle.getFile();
      return {
        text: await file.text(),
        contentType: file.type || null,
        contentLength: file.size,
        lastModified: new Date(file.lastModified),
      };
    },

    async writeBytes(path: any, body: any) {
      if (!rootHandle) throw new Error('Local folder is not open');
      const fileHandle = await getLocalFileHandleForPath(rootHandle, path, { create: true });
      const writable = await fileHandle.createWritable();
      try {
        await writable.write(body);
      } finally {
        await writable.close();
      }
    },

    async writeText(path: any, text: any, _contentType?: any) {
      await this.writeBytes(path, text);
    },

    async mkdir(path: any) {
      if (!rootHandle) throw new Error('Local folder is not open');
      const normalized = path.replace(/\/+$/, '');
      await getLocalDirectoryHandleForPath(rootHandle, normalized, { create: true });
    },

    async delete(path: any) {
      if (!rootHandle) throw new Error('Local folder is not open');
      const normalized = path.replace(/^\/+/, '');
      const lastSlash = normalized.lastIndexOf('/');
      if (lastSlash < 0) {
        await rootHandle.removeEntry(normalized, { recursive: false });
        return;
      }
      const parentPath = normalized.slice(0, lastSlash);
      const name = normalized.slice(lastSlash + 1);
      const parent = await getLocalDirectoryHandleForPath(rootHandle, parentPath, {
        create: false,
      });
      await parent.removeEntry(name, { recursive: false });
    },

    async deletePrefix(prefix: any) {
      if (!rootHandle) throw new Error('Local folder is not open');
      const normalized = prefix.replace(/\/+$/, '').replace(/^\/+/, '');
      if (!normalized) throw new Error('Cannot delete local root');
      const lastSlash = normalized.lastIndexOf('/');
      if (lastSlash < 0) {
        await rootHandle.removeEntry(normalized, { recursive: true });
        return;
      }
      const parentPath = normalized.slice(0, lastSlash);
      const name = normalized.slice(lastSlash + 1);
      const parent = await getLocalDirectoryHandleForPath(rootHandle, parentPath, {
        create: false,
      });
      await parent.removeEntry(name, { recursive: true });
    },

    async copy(fromPath: any, toPath: any) {
      const { body } = await this.readBytes(fromPath);
      await this.writeBytes(toPath, body);
    },

    async move(fromPath: any, toPath: any) {
      await this.copy(fromPath, toPath);
      await this.delete(fromPath);
    },

    async ensureTrash() {
      await this.mkdir('.trash');
    },

    async trash(path: any, { additionalKeys = [] } = {}) {
      await this.ensureTrash();
      const isFolder = path.endsWith('/');
      const src = path.replace(/\/+$/, '');
      const dest = `.trash/${src}`;
      if (isFolder) {
        // Move folder into trash by recursive copy then remove
        const copyDir = async (fromRel: any, toRel: any) => {
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

    async getObjectUrl(path: any) {
      if (!rootHandle) return null;
      return getLocalWikiImageObjectUrl(rootHandle, path);
    },
  };
}
