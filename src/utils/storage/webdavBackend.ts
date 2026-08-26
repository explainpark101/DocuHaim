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
  type WebdavConfig,
  type WebdavPropfindEntry,
} from '@/utils/vault/webdavClient';
import { buildS3Tree } from '@/utils/vault/s3Tree';
import type { S3ListContentItem } from '@/utils/vault/vaultTreeTypes';
import { STORAGE_CAPABILITIES } from '@/utils/storage/capabilities';
import { buildWebdavTreeNodesFromPropfind } from '@/utils/vault/webdavTree';

/**
 * @param {{ endpoint: string, username: string, password: string, basePath: string } | null | undefined} config
 */
export function createWebdavBackend(config: WebdavConfig | null | undefined) {
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
      const entries: WebdavPropfindEntry[] = await webdavPropfindDeep(cfg, '');
      const contents: S3ListContentItem[] = entries
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

    async head(path: any) {
      const meta = await webdavHead(cfg, path);
      if (!meta) return null;
      return {
        etag: meta.etag,
        lastModified: meta.mtime ? new Date(meta.mtime) : null,
        contentLength: null,
        contentType: meta.contentType,
      };
    },

    async readBytes(path: any) {
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

    async readText(path: any) {
      const text = await webdavGetText(cfg, path);
      if (text == null) throw new Error(`WebDAV file not found: ${path}`);
      return {
        text,
        contentType: 'text/plain',
        contentLength: new TextEncoder().encode(text).length,
        lastModified: null,
      };
    },

    async writeBytes(path: any, body: any, contentType = 'application/octet-stream') {
      await webdavEnsureParentDirs(cfg, path);
      await webdavPut(cfg, path, body, { contentType });
    },

    async writeText(path: any, text: any, contentType = 'text/plain; charset=utf-8') {
      await webdavEnsureParentDirs(cfg, path);
      await webdavPut(cfg, path, text, { contentType });
    },

    async mkdir(path: any) {
      const key = path.replace(/\/?$/, '/');
      await webdavEnsureParentDirs(cfg, `${key}placeholder`);
      await webdavMkcol(cfg, key);
    },

    async delete(path: any) {
      await webdavDelete(cfg, path);
    },

    async deletePrefix(prefix: any) {
      const key = prefix.endsWith('/') ? prefix : `${prefix}/`;
      await webdavDelete(cfg, key);
    },

    async copy(fromPath: any, toPath: any) {
      await webdavEnsureParentDirs(cfg, toPath);
      try {
        await webdavCopy(cfg, fromPath, toPath);
      } catch {
        const { body, contentType } = await this.readBytes(fromPath);
        await this.writeBytes(toPath, body, contentType || 'application/octet-stream');
      }
    },

    async move(fromPath: any, toPath: any) {
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

    async trash(path: string, { additionalKeys = [] }: { additionalKeys?: string[] } = {}) {
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

    async getObjectUrl(path: any) {
      const result = await webdavGetBinary(cfg, path);
      if (!result) return null;
      return URL.createObjectURL(result.blob);
    },

    /** Connection smoke test — PROPFIND must succeed (listing may still be empty). */
    async testConnection() {
      const entries = await webdavPropfind(cfg, '');
      return Array.isArray(entries);
    },
  };
}
