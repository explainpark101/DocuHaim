/**
 * Chat storage backends: S3 / Local / WebDAV / IDB.
 */

import type { S3Client } from '@aws-sdk/client-s3';
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
  status: number;

  constructor(message = 'Precondition Failed') {
    super(message);
    this.name = 'ChatPreconditionFailedError';
    this.status = 412;
  }
}

export type ChatFileMeta = {
  etag: string | null;
  mtime: number | null;
};

export type ChatBackend = {
  ensureChatFolder: () => Promise<void>;
  getText: (key: string) => Promise<string | null>;
  headMeta: (key: string) => Promise<ChatFileMeta | null>;
  putTextIfMatch: (
    key: string,
    content: string,
    contentType?: string,
    etag?: string | null,
  ) => Promise<{ etag: string | null }>;
  putTextOverwrite: (
    key: string,
    content: string,
    contentType?: string,
  ) => Promise<{ etag: string | null }>;
  putBinary: (
    key: string,
    body: Uint8Array | Blob | File,
    contentType?: string,
  ) => Promise<void>;
  getBinaryBlobUrl: (key: string) => Promise<string | null>;
  deleteKey: (key: string) => Promise<void>;
  listDayKeys: () => Promise<string[]>;
  listKeys: (prefix: string) => Promise<string[]>;
};

export type ChatStorageCtx = {
  mode: 's3' | 'local' | 'webdav' | 'idb';
  client?: S3Client;
  bucket?: string;
  localRootHandle?: FileSystemDirectoryHandle;
  webdavConfig?: {
    endpoint: string;
    username: string;
    password: string;
    basePath: string;
  };
};

type AwsLikeError = {
  name?: string;
  Code?: string;
  status?: number;
  message?: string;
  $metadata?: { httpStatusCode?: number };
};

function asAwsError(e: unknown): AwsLikeError {
  return e && typeof e === 'object' ? (e as AwsLikeError) : {};
}

function decodeBody(body: unknown): string {
  if (typeof body === 'string') return body;
  if (body instanceof Uint8Array) return new TextDecoder().decode(body);
  if (body instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(body));
  return new TextDecoder().decode(new Uint8Array(body as ArrayBufferLike));
}

function normalizeEtag(etag: unknown): string | null {
  if (!etag) return null;
  return String(etag).trim();
}

export function createChatBackend(ctx: ChatStorageCtx): ChatBackend {
  if (!ctx?.mode) throw new Error('Chat storage context is required');
  if (ctx.mode === 's3') return createS3Backend(ctx);
  if (ctx.mode === 'webdav') return createWebdavBackend(ctx);
  if (ctx.mode === 'local') return createLocalBackend(ctx);
  if (ctx.mode === 'idb') return createIdbChatBackend();
  throw new Error(`Unsupported chat storage mode: ${(ctx as ChatStorageCtx).mode}`);
}

function createIdbChatBackend(): ChatBackend {
  /** Lazy import avoids circular deps with storage package barrel. */
  const getVault = () => import('@/utils/vault/idbVaultStore');

  return {
    async ensureChatFolder() {
      const { mkdir } = await getVault();
      await mkdir(CHAT_FOLDER);
    },

    async getText(key) {
      const { getEntry } = await getVault();
      const entry = await getEntry(key);
      if (!entry || entry.kind !== 'file' || !entry.blob) return null;
      return entry.blob.text();
    },

    async headMeta(key) {
      const { getEntry } = await getVault();
      const entry = await getEntry(key);
      if (!entry || entry.kind !== 'file') return null;
      return {
        etag: `idb-${entry.updatedAt}-${entry.size ?? 0}`,
        mtime: entry.updatedAt,
      };
    },

    async putTextIfMatch(key, content, contentType = 'text/plain; charset=utf-8', etag = null) {
      void etag;
      const { putFile, getEntry } = await getVault();
      await putFile(key, content, contentType);
      const entry = await getEntry(key);
      return { etag: entry ? `idb-${entry.updatedAt}-${entry.size ?? 0}` : null };
    },

    async putTextOverwrite(key, content, contentType = 'text/plain; charset=utf-8') {
      return this.putTextIfMatch(key, content, contentType, null);
    },

    async putBinary(key, body, contentType = 'application/octet-stream') {
      const { putFile } = await getVault();
      await putFile(key, body, contentType);
    },

    async getBinaryBlobUrl(key) {
      const { getEntry } = await getVault();
      const entry = await getEntry(key);
      if (!entry || entry.kind !== 'file' || !entry.blob) return null;
      return URL.createObjectURL(entry.blob);
    },

    async deleteKey(key) {
      const { deletePath } = await getVault();
      await deletePath(key);
    },

    async listDayKeys() {
      const { listChildren } = await getVault();
      try {
        const children = await listChildren(CHAT_FOLDER);
        return children
          .filter((c) => c.type === 'file' && /^\d{4}-\d{2}-\d{2}\.md$/.test(c.name))
          .map((c) => c.name.slice(0, -3))
          .sort()
          .reverse();
      } catch {
        return [];
      }
    },

    async listKeys(prefix) {
      const p = String(prefix || '').replace(/\/+$/, '');
      if (!p) return [];
      const { listChildren } = await getVault();
      try {
        const children = await listChildren(p);
        return children
          .filter((c) => c.type === 'file')
          .map((c) => `${p}/${c.name}`)
          .sort()
          .reverse();
      } catch {
        return [];
      }
    },
  };
}

function createS3Backend(ctx: ChatStorageCtx): ChatBackend {
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
        const err = asAwsError(e);
        if (
          err.name === 'NoSuchKey' ||
          err.$metadata?.httpStatusCode === 404 ||
          err.Code === 'NoSuchKey'
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
      const params: Record<string, unknown> = {
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
        const result = await putObject(client, params as never);
        return { etag: normalizeEtag((result as { ETag?: string } | undefined)?.ETag) };
      } catch (e) {
        const err = asAwsError(e);
        if (e instanceof S3PreconditionFailedError || err.status === 412) {
          throw new ChatPreconditionFailedError(err.message || 'Precondition Failed');
        }
        const status = err.$metadata?.httpStatusCode;
        const unsupported =
          !etag &&
          (err.name === 'NotImplemented' ||
            err.Code === 'NotImplemented' ||
            err.Code === 'InvalidArgument' ||
            status === 400 ||
            status === 501);
        if (unsupported) {
          const result = await putObject(client, {
            Bucket: bucket,
            Key: key,
            Body: content,
            ContentType: contentType,
          });
          return { etag: normalizeEtag((result as { ETag?: string } | undefined)?.ETag) };
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
      return { etag: normalizeEtag((result as { ETag?: string } | undefined)?.ETag) };
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
      const payload =
        body instanceof Uint8Array
          ? body
          : body instanceof ArrayBuffer
            ? new Uint8Array(body)
            : new Uint8Array(await body.arrayBuffer());
      await putObject(client, {
        Bucket: bucket,
        Key: key,
        Body: payload,
        ContentType: contentType,
      });
    },

    async getBinaryBlobUrl(key) {
      try {
        const { body, ContentType } = await getObjectBody(client, bucket, key);
        const bytes =
          body instanceof Uint8Array
            ? body
            : new TextEncoder().encode(decodeBody(body));
        const copy = new Uint8Array(bytes.byteLength);
        copy.set(bytes);
        const blob = new Blob([copy], {
          type: ContentType || 'application/octet-stream',
        });
        return URL.createObjectURL(blob);
      } catch (e) {
        const err = asAwsError(e);
        if (
          err.name === 'NoSuchKey' ||
          err.$metadata?.httpStatusCode === 404 ||
          err.Code === 'NoSuchKey'
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
        .map((c: { Key?: string }) => c.Key)
        .filter(
          (k: string | undefined): k is string =>
            Boolean(k && /^\.chat-with-myself\/\d{4}-\d{2}-\d{2}\.md$/.test(k)),
        )
        .map((k) => k.slice(prefix.length, -3))
        .sort()
        .reverse();
    },

    async listKeys(prefix) {
      const p = String(prefix || '');
      const contents = await listObjectsV2(client, bucket, p);
      return contents
        .map((c: { Key?: string }) => c.Key)
        .filter(
          (k: string | undefined): k is string =>
            typeof k === 'string' && k.startsWith(p) && !k.endsWith('/'),
        )
        .sort()
        .reverse();
    },
  };
}

function createWebdavBackend(ctx: ChatStorageCtx): ChatBackend {
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
        mtime: meta.mtime ?? null,
      };
    },

    async putTextIfMatch(key, content, contentType = 'text/plain; charset=utf-8', etag = null) {
      await webdavEnsureParentDirs(config, key);
      try {
        const result = await webdavPut(config, key, content, {
          contentType,
          ...(etag ? { ifMatch: etag } : { ifNoneMatch: '*' }),
        });
        return { etag: normalizeEtag(result?.etag) };
      } catch (e) {
        const err = asAwsError(e);
        if (e instanceof WebdavPreconditionFailedError || err.status === 412) {
          throw new ChatPreconditionFailedError(err.message || 'Precondition Failed');
        }
        // Some servers reject If-None-Match on create
        if (!etag && (err.status === 400 || err.status === 501)) {
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
        .filter((c: { isCollection?: boolean }) => !c.isCollection)
        .map((c: { key: string }) => {
          const name = c.key.includes('/') ? c.key.split('/').pop() : c.key;
          return name;
        })
        .filter(
          (name: string | undefined): name is string =>
            Boolean(name && /^\d{4}-\d{2}-\d{2}\.md$/.test(name)),
        )
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
          .filter((c: { isCollection?: boolean }) => !c.isCollection)
          .map((c: { key: string }) => c.key)
          .filter((k: string) => typeof k === 'string' && k.startsWith(`${p}/`))
          .sort()
          .reverse();
      } catch {
        return [];
      }
    },
  };
}

function createLocalBackend(ctx: ChatStorageCtx): ChatBackend {
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
        if (body instanceof Blob) {
          await writable.write(body);
        } else {
          const bytes = body instanceof Uint8Array ? body : new Uint8Array(body);
          const copy = new Uint8Array(bytes.byteLength);
          copy.set(bytes);
          await writable.write(copy);
        }
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
        const days: string[] = [];
        const entries = (
          dir as FileSystemDirectoryHandle & {
            entries: () => AsyncIterableIterator<[string, FileSystemHandle]>;
          }
        ).entries();
        for await (const [name, handle] of entries) {
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
        const keys: string[] = [];
        const entries = (
          dir as FileSystemDirectoryHandle & {
            entries: () => AsyncIterableIterator<[string, FileSystemHandle]>;
          }
        ).entries();
        for await (const [name, handle] of entries) {
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
