import {
  listObjectsV2,
  getObjectBody,
  headObject,
  putObject,
  deleteObject,
  deleteObjects,
  copyObject,
  getSignedGetUrl,
  putS3FolderMarkers,
} from '@/utils/s3Client';
import { buildS3Tree } from '@/utils/s3Tree';
import { STORAGE_CAPABILITIES } from './capabilities.js';

/**
 * @param {{ getClient: () => import('@aws-sdk/client-s3').S3Client | null, bucket: string }} deps
 */
export function createS3Backend(deps) {
  const getClient = () => deps.getClient?.() ?? null;
  const getBucket = () => deps.bucket || '';

  return {
    mode: 's3',
    capabilities: STORAGE_CAPABILITIES.s3,

    isReady() {
      return Boolean(getClient() && getBucket());
    },

    async listAll() {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) return [];
      const contents = await listObjectsV2(client, bucket, '');
      return buildS3Tree(contents);
    },

    async listChildren() {
      return this.listAll();
    },

    async head(path) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) return null;
      const meta = await headObject(client, bucket, path);
      if (!meta) return null;
      return {
        etag: meta.ETag || null,
        lastModified: meta.LastModified
          ? meta.LastModified instanceof Date
            ? meta.LastModified
            : new Date(meta.LastModified)
          : null,
        contentLength: meta.ContentLength ?? null,
        contentType: meta.ContentType || null,
      };
    },

    async readBytes(path) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      const { body, ContentType, ContentLength, LastModified } = await getObjectBody(
        client,
        bucket,
        path,
      );
      return {
        body: body instanceof Uint8Array ? body : new Uint8Array(body),
        contentType: ContentType || null,
        contentLength: typeof ContentLength === 'number' ? ContentLength : null,
        lastModified: LastModified
          ? LastModified instanceof Date
            ? LastModified
            : new Date(LastModified)
          : null,
      };
    },

    async readText(path) {
      const { body, ...rest } = await this.readBytes(path);
      return { text: new TextDecoder('utf-8').decode(body), ...rest };
    },

    async writeBytes(path, body, contentType = 'application/octet-stream') {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      await putObject(client, {
        Bucket: bucket,
        Key: path,
        Body: body,
        ContentType: contentType,
      });
    },

    async writeText(path, text, contentType = 'text/plain; charset=utf-8') {
      await this.writeBytes(path, text, contentType);
    },

    async mkdir(path) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      const key = path.endsWith('/') ? path : `${path}/`;
      await putObject(client, {
        Bucket: bucket,
        Key: key,
        Body: '',
        ContentType: 'application/x-directory',
      });
      await putS3FolderMarkers(client, bucket, [key]);
    },

    async delete(path) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      await deleteObject(client, bucket, path);
    },

    async deletePrefix(prefix) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      const contents = await listObjectsV2(client, bucket, prefix);
      if (contents.length > 0) {
        await deleteObjects(
          client,
          bucket,
          contents.map(({ Key }) => ({ Key })),
        );
      }
    },

    async copy(fromPath, toPath) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      await copyObject(client, bucket, fromPath, toPath);
    },

    async move(fromPath, toPath) {
      await this.copy(fromPath, toPath);
      await this.delete(fromPath);
    },

    async ensureTrash() {
      try {
        await this.mkdir('.trash');
      } catch {
        /* ignore */
      }
    },

    async trash(path, { additionalKeys = [] } = {}) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) throw new Error('S3 is not connected');
      await this.ensureTrash();
      const isFolder = path.endsWith('/');
      if (isFolder) {
        const contents = await listObjectsV2(client, bucket, path);
        for (const { Key } of contents) {
          await copyObject(client, bucket, Key, `.trash/${Key}`);
        }
        if (contents.length > 0) {
          await deleteObjects(
            client,
            bucket,
            contents.map(({ Key }) => ({ Key })),
          );
        }
      } else {
        await copyObject(client, bucket, path, `.trash/${path}`);
        await deleteObject(client, bucket, path);
      }
      for (const key of additionalKeys) {
        try {
          await copyObject(client, bucket, key, `.trash/${key}`);
          await deleteObject(client, bucket, key);
        } catch (e) {
          if (e?.$metadata?.httpStatusCode !== 404) throw e;
        }
      }
    },

    async getObjectUrl(path, expiresIn = 3600) {
      const client = getClient();
      const bucket = getBucket();
      if (!client || !bucket) return null;
      return getSignedGetUrl(client, bucket, path, expiresIn);
    },
  };
}
