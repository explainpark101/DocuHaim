/**
 * Chat storage backends: S3 / Local / WebDAV.
 */

import {
  getObjectBody,
  headObject,
  listObjectsV2,
  putObject,
  deleteObject,
  S3PreconditionFailedError,
} from '@/utils/s3Client';
import {
  getLocalDirectoryHandleForPath,
  getLocalFileHandleForPath,
} from '@/utils/localEditorImage';
import {
  webdavDelete,
  webdavEnsureParentDirs,
  webdavGetBinary,
  webdavGetText,
  webdavHead,
  webdavMkcol,
  webdavPropfind,
  webdavPut,
  WebdavPreconditionFailedError,
} from '@/utils/webdavClient';
import { CHAT_FOLDER, chatFolderPrefix } from '@/utils/chatWithMyself/paths.js';

export class ChatPreconditionFailedError extends Error {
  constructor(message = 'Precondition Failed') {
    super(message);
    this.name = 'ChatPreconditionFailedError';
    this.status = 412;
  }
}

function decodeBody(body) {
  if (typeof body === 'string') return body;
  return new TextDecoder().decode(body);
}

function normalizeEtag(etag) {
  if (!etag) return null;
  return String(etag).trim();
}

/**
 * @typedef {Object} ChatFileMeta
 * @property {string | null} etag
 * @property {number | null} mtime
 */

/**
 * @typedef {Object} ChatBackend
 * @property {() => Promise<void>} ensureChatFolder
 * @property {(key: string) => Promise<string | null>} getText
 * @property {(key: string) => Promise<ChatFileMeta | null>} headMeta
 * @property {(key: string, content: string, contentType?: string, etag?: string | null) => Promise<{ etag: string | null }>} putTextIfMatch
 * @property {(key: string, content: string, contentType?: string) => Promise<{ etag: string | null }>} putTextOverwrite
 * @property {(key: string, body: Uint8Array | Blob | File, contentType?: string) => Promise<void>} putBinary
 * @property {(key: string) => Promise<string | null>} getBinaryBlobUrl
 * @property {(key: string) => Promise<void>} deleteKey
 * @property {() => Promise<string[]>} listDayKeys
 * @property {(prefix: string) => Promise<string[]>} listKeys
 */

/**
 * @param {import('@/utils/chatWithMyself/storage.js').ChatStorageCtx} ctx
 * @returns {ChatBackend}
 */
export function createChatBackend(ctx) {
  if (!ctx?.mode) throw new Error('Chat storage context is required');
  if (ctx.mode === 's3') return createS3Backend(ctx);
  if (ctx.mode === 'webdav') return createWebdavBackend(ctx);
  if (ctx.mode === 'local') return createLocalBackend(ctx);
  throw new Error(`Unsupported chat storage mode: ${ctx.mode}`);
}

function createS3Backend(ctx) {
  if (!ctx.client || !ctx.bucket) {
    throw new Error('S3 credentials are required');
  }
  const { client, bucket } = ctx;

  return {
    async ensureChatFolder() {
      await putObject(client, {
        Bucket: bucket,
        Key: chatFolderPrefix(),
        Body: '',
        ContentType: 'application/x-directory',
      });
    },

    async getText(key) {
      try {
        const { body } = await getObjectBody(client, bucket, key);
        return decodeBody(body);
      } catch (e) {
        if (
          e?.name === 'NoSuchKey' ||
          e?.$metadata?.httpStatusCode === 404 ||
          e?.Code === 'NoSuchKey'
        ) {
          return null;
        }
        throw e;
      }
    },

    async headMeta(key) {
      const meta = await headObject(client, bucket, key);
      if (!meta) return null;
      return {
        etag: normalizeEtag(meta.ETag),
        mtime: meta.LastModified ? new Date(meta.LastModified).getTime() : null,
      };
    },

    async putTextIfMatch(key, content, contentType = 'text/plain; charset=utf-8', etag = null) {
      if (key.includes('/og/')) {
        await putObject(client, {
          Bucket: bucket,
          Key: `${CHAT_FOLDER}/og/`,
          Body: '',
        });
      }
      const params = {
        Bucket: bucket,
        Key: key,
        Body: content,
        ContentType: contentType,
      };
      if (etag) {
        params.IfMatch = etag;
      } else {
        params.IfNoneMatch = '*';
      }
      try {
        const result = await putObject(client, params);
        return { etag: normalizeEtag(result?.ETag) };
      } catch (e) {
        if (e instanceof S3PreconditionFailedError || e?.status === 412) {
          throw new ChatPreconditionFailedError(e.message);
        }
        const status = e?.$metadata?.httpStatusCode;
        const unsupported =
          !etag &&
          (e?.name === 'NotImplemented' ||
            e?.Code === 'NotImplemented' ||
            e?.Code === 'InvalidArgument' ||
            status === 400 ||
            status === 501);
        if (unsupported) {
          const result = await putObject(client, {
            Bucket: bucket,
            Key: key,
            Body: content,
            ContentType: contentType,
          });
          return { etag: normalizeEtag(result?.ETag) };
        }
        throw e;
      }
    },

    async putTextOverwrite(key, content, contentType = 'text/plain; charset=utf-8') {
      if (key.includes('/og/')) {
        await putObject(client, {
          Bucket: bucket,
          Key: `${CHAT_FOLDER}/og/`,
          Body: '',
        });
      }
      const result = await putObject(client, {
        Bucket: bucket,
        Key: key,
        Body: content,
        ContentType: contentType,
      });
      return { etag: normalizeEtag(result?.ETag) };
    },

    async putBinary(key, body, contentType = 'application/octet-stream') {
      const parent = key.includes('/') ? key.slice(0, key.lastIndexOf('/') + 1) : '';
      if (parent) {
        await putObject(client, {
          Bucket: bucket,
          Key: parent,
          Body: '',
          ContentType: 'application/x-directory',
        });
      }
      await putObject(client, {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      });
    },

    async getBinaryBlobUrl(key) {
      try {
        const { body, ContentType } = await getObjectBody(client, bucket, key);
        const bytes = body instanceof Uint8Array ? body : new TextEncoder().encode(decodeBody(body));
        const blob = new Blob([bytes], {
          type: ContentType || 'application/octet-stream',
        });
        return URL.createObjectURL(blob);
      } catch (e) {
        if (
          e?.name === 'NoSuchKey' ||
          e?.$metadata?.httpStatusCode === 404 ||
          e?.Code === 'NoSuchKey'
        ) {
          return null;
        }
        throw e;
      }
    },

    async deleteKey(key) {
      await deleteObject(client, bucket, key);
    },

    async listDayKeys() {
      const prefix = chatFolderPrefix();
      const contents = await listObjectsV2(client, bucket, prefix);
      return contents
        .map((c) => c.Key)
        .filter((k) => k && /^\.chat-with-myself\/\d{4}-\d{2}-\d{2}\.md$/.test(k))
        .map((k) => k.slice(prefix.length, -3))
        .sort()
        .reverse();
    },

    async listKeys(prefix) {
      const p = String(prefix || '');
      const contents = await listObjectsV2(client, bucket, p);
      return contents
        .map((c) => c.Key)
        .filter((k) => typeof k === 'string' && k.startsWith(p) && !k.endsWith('/'))
        .sort()
        .reverse();
    },
  };
}

function createWebdavBackend(ctx) {
  const config = ctx.webdavConfig;
  if (!config?.endpoint) {
    throw new Error('WebDAV configuration is required');
  }

  return {
    async ensureChatFolder() {
      await webdavMkcol(config, CHAT_FOLDER);
    },

    async getText(key) {
      return webdavGetText(config, key);
    },

    async headMeta(key) {
      const meta = await webdavHead(config, key);
      if (!meta) return null;
      return {
        etag: normalizeEtag(meta.etag),
        mtime: meta.mtime,
      };
    },

    async putTextIfMatch(key, content, contentType = 'text/plain; charset=utf-8', etag = null) {
      await webdavEnsureParentDirs(config, key);
      try {
        const result = await webdavPut(config, key, content, {
          contentType,
          ifMatch: etag || undefined,
          ifNoneMatch: etag ? undefined : '*',
        });
        return { etag: normalizeEtag(result?.etag) };
      } catch (e) {
        if (e instanceof WebdavPreconditionFailedError || e?.status === 412) {
          throw new ChatPreconditionFailedError(e.message);
        }
        // Some servers reject If-None-Match on create
        if (!etag && (e?.status === 400 || e?.status === 501)) {
          const result = await webdavPut(config, key, content, { contentType });
          return { etag: normalizeEtag(result?.etag) };
        }
        throw e;
      }
    },

    async putTextOverwrite(key, content, contentType = 'text/plain; charset=utf-8') {
      await webdavEnsureParentDirs(config, key);
      const result = await webdavPut(config, key, content, { contentType });
      return { etag: normalizeEtag(result?.etag) };
    },

    async putBinary(key, body, contentType = 'application/octet-stream') {
      await webdavEnsureParentDirs(config, key);
      await webdavPut(config, key, body, { contentType });
    },

    async getBinaryBlobUrl(key) {
      const result = await webdavGetBinary(config, key);
      if (!result) return null;
      return URL.createObjectURL(result.blob);
    },

    async deleteKey(key) {
      await webdavDelete(config, key);
    },

    async listDayKeys() {
      const children = await webdavPropfind(config, CHAT_FOLDER);
      return children
        .filter((c) => !c.isCollection)
        .map((c) => {
          const name = c.key.includes('/') ? c.key.split('/').pop() : c.key;
          return name;
        })
        .filter((name) => name && /^\d{4}-\d{2}-\d{2}\.md$/.test(name))
        .map((name) => name.slice(0, -3))
        .sort()
        .reverse();
    },

    async listKeys(prefix) {
      const p = String(prefix || '').replace(/\/+$/, '');
      if (!p) return [];
      try {
        const children = await webdavPropfind(config, p);
        return children
          .filter((c) => !c.isCollection)
          .map((c) => c.key)
          .filter((k) => typeof k === 'string' && k.startsWith(`${p}/`))
          .sort()
          .reverse();
      } catch {
        return [];
      }
    },
  };
}

function createLocalBackend(ctx) {
  if (!ctx.localRootHandle) {
    throw new Error('Local folder not open');
  }
  const root = ctx.localRootHandle;

  return {
    async ensureChatFolder() {
      await root.getDirectoryHandle(CHAT_FOLDER, { create: true });
    },

    async getText(key) {
      try {
        const handle = await getLocalFileHandleForPath(root, key, { create: false });
        const file = await handle.getFile();
        return await file.text();
      } catch {
        return null;
      }
    },

    async headMeta(key) {
      try {
        const handle = await getLocalFileHandleForPath(root, key, { create: false });
        const file = await handle.getFile();
        return {
          etag: `local-${file.lastModified}-${file.size}`,
          mtime: file.lastModified,
        };
      } catch {
        return null;
      }
    },

    async putTextIfMatch(key, content, contentType = 'text/plain; charset=utf-8', etag = null) {
      void contentType;
      void etag;
      const handle = await getLocalFileHandleForPath(root, key, { create: true });
      const writable = await handle.createWritable();
      try {
        await writable.write(content);
      } finally {
        await writable.close();
      }
      const file = await handle.getFile();
      return { etag: `local-${file.lastModified}-${file.size}` };
    },

    async putTextOverwrite(key, content, contentType = 'text/plain; charset=utf-8') {
      return this.putTextIfMatch(key, content, contentType, null);
    },

    async putBinary(key, body, contentType = 'application/octet-stream') {
      void contentType;
      const handle = await getLocalFileHandleForPath(root, key, { create: true });
      const writable = await handle.createWritable();
      try {
        await writable.write(body);
      } finally {
        await writable.close();
      }
    },

    async getBinaryBlobUrl(key) {
      try {
        const handle = await getLocalFileHandleForPath(root, key, { create: false });
        const file = await handle.getFile();
        return URL.createObjectURL(file);
      } catch {
        return null;
      }
    },

    async deleteKey(key) {
      const lastSlash = key.lastIndexOf('/');
      if (lastSlash < 0) {
        await root.removeEntry(key);
        return;
      }
      const dir = await getLocalDirectoryHandleForPath(root, key.slice(0, lastSlash), {
        create: false,
      });
      await dir.removeEntry(key.slice(lastSlash + 1));
    },

    async listDayKeys() {
      try {
        const dir = await getLocalDirectoryHandleForPath(root, CHAT_FOLDER, {
          create: false,
        });
        const days = [];
        for await (const [name, handle] of dir.entries()) {
          if (handle.kind === 'file' && /^\d{4}-\d{2}-\d{2}\.md$/.test(name)) {
            days.push(name.slice(0, -3));
          }
        }
        return days.sort().reverse();
      } catch {
        return [];
      }
    },

    async listKeys(prefix) {
      const p = String(prefix || '').replace(/\/+$/, '');
      if (!p) return [];
      try {
        const dir = await getLocalDirectoryHandleForPath(root, p, {
          create: false,
        });
        const keys = [];
        for await (const [name, handle] of dir.entries()) {
          if (handle.kind === 'file') {
            keys.push(`${p}/${name}`);
          }
        }
        return keys.sort().reverse();
      } catch {
        return [];
      }
    },
  };
}
