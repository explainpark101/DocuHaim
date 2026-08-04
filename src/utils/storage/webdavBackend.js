import {
  webdavDelete,
  webdavEnsureParentDirs,
  webdavGetBinary,
  webdavGetText,
  webdavHead,
  webdavMkcol,
  webdavMove,
  webdavCopy,
  webdavPropfind,
  webdavPut,
  webdavPropfindDeep,
} from '@/utils/webdavClient';
import { buildS3Tree } from '@/utils/s3Tree';
import { STORAGE_CAPABILITIES } from './capabilities.js';
import { buildWebdavTreeNodesFromPropfind } from '@/utils/webdavTree';

/**
 * @param {{ endpoint: string, username: string, password: string, basePath: string } | null | undefined} config
 */
export function createWebdavBackend(config) {
  const cfg = config || { endpoint: '', username: '', password: '', basePath: '' };

  return {
    mode: 'webdav',
    capabilities: STORAGE_CAPABILITIES.webdav,

    isReady() {
      return Boolean(cfg.endpoint && cfg.username);
    },

    async listChildren(path = '') {
      const entries = await webdavPropfind(cfg, path);
      return buildWebdavTreeNodesFromPropfind(entries, path);
    },

    async listAll() {
      const entries = await webdavPropfindDeep(cfg, '');
      const contents = entries
        .filter((e) => !e.isCollection)
        .map((e) => ({
          Key: e.key,
          LastModified: e.mtime ? new Date(e.mtime) : undefined,
          Size: e.size ?? undefined,
        }));
      // Also include empty folder markers
      for (const e of entries.filter((x) => x.isCollection && x.key)) {
        const folderKey = e.key.endsWith('/') ? e.key : `${e.key}/`;
        contents.push({ Key: folderKey });
      }
      return buildS3Tree(contents);
    },

    async head(path) {
      const meta = await webdavHead(cfg, path);
      if (!meta) return null;
      return {
        etag: meta.etag,
        lastModified: meta.mtime ? new Date(meta.mtime) : null,
        contentLength: null,
        contentType: meta.contentType,
      };
    },

    async readBytes(path) {
      const result = await webdavGetBinary(cfg, path);
      if (!result) throw new Error(`WebDAV file not found: ${path}`);
      const body = new Uint8Array(await result.blob.arrayBuffer());
      return {
        body,
        contentType: result.contentType,
        contentLength: body.byteLength,
        lastModified: null,
      };
    },

    async readText(path) {
      const text = await webdavGetText(cfg, path);
      if (text == null) throw new Error(`WebDAV file not found: ${path}`);
      return {
        text,
        contentType: 'text/plain',
        contentLength: new TextEncoder().encode(text).length,
        lastModified: null,
      };
    },

    async writeBytes(path, body, contentType = 'application/octet-stream') {
      await webdavEnsureParentDirs(cfg, path);
      await webdavPut(cfg, path, body, { contentType });
    },

    async writeText(path, text, contentType = 'text/plain; charset=utf-8') {
      await webdavEnsureParentDirs(cfg, path);
      await webdavPut(cfg, path, text, { contentType });
    },

    async mkdir(path) {
      const key = path.replace(/\/?$/, '/');
      await webdavEnsureParentDirs(cfg, `${key}placeholder`);
      await webdavMkcol(cfg, key);
    },

    async delete(path) {
      await webdavDelete(cfg, path);
    },

    async deletePrefix(prefix) {
      const key = prefix.endsWith('/') ? prefix : `${prefix}/`;
      await webdavDelete(cfg, key);
    },

    async copy(fromPath, toPath) {
      await webdavEnsureParentDirs(cfg, toPath);
      try {
        await webdavCopy(cfg, fromPath, toPath);
      } catch {
        const { body, contentType } = await this.readBytes(fromPath);
        await this.writeBytes(toPath, body, contentType || 'application/octet-stream');
      }
    },

    async move(fromPath, toPath) {
      await webdavEnsureParentDirs(cfg, toPath);
      try {
        await webdavMove(cfg, fromPath, toPath);
      } catch {
        await this.copy(fromPath, toPath);
        await this.delete(fromPath);
      }
    },

    async ensureTrash() {
      try {
        await this.mkdir('.trash');
      } catch {
        /* ignore */
      }
    },

    async trash(path, { additionalKeys = [] } = {}) {
      await this.ensureTrash();
      const dest = `.trash/${path.replace(/^\//, '')}`;
      await this.move(path, dest);
      for (const key of additionalKeys) {
        try {
          await this.move(key, `.trash/${key.replace(/^\//, '')}`);
        } catch {
          /* missing ok */
        }
      }
    },

    async getObjectUrl(path) {
      const result = await webdavGetBinary(cfg, path);
      if (!result) return null;
      return URL.createObjectURL(result.blob);
    },

    /** Connection smoke test */
    async testConnection() {
      await webdavPropfind(cfg, '');
      return true;
    },
  };
}
