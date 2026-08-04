import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Create an S3 client from credentials.
 * @param {{ accessKeyId: string, secretAccessKey: string, region: string, endpoint?: string }} creds
 * @returns {S3Client | null}
 */
export function createS3Client(creds) {
  if (!creds?.accessKeyId || !creds?.secretAccessKey) return null;
  const config = {
    region: creds.region || 'ap-northeast-2',
    credentials: {
      accessKeyId: creds.accessKeyId,
      secretAccessKey: creds.secretAccessKey,
    },
  };
  if (creds.endpoint) {
    config.endpoint = creds.endpoint;
    config.forcePathStyle = true;
  }
  return new S3Client(config);
}

/**
 * List objects (v2) and return Contents array.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} prefix
 * @returns {Promise<{ Key: string, LastModified?: Date, Size?: number }[]>}
 */
export async function listObjectsV2(client, bucket, prefix = '') {
  const contents = [];
  let continuationToken;

  do {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken: continuationToken,
    });
    const data = await client.send(command);
    if (data.Contents?.length) {
      contents.push(...data.Contents.filter((item) => !!item.Key));
    }
    continuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
  } while (continuationToken);

  return contents;
}

/**
 * Collect S3 folder marker keys (`…/`) for all parent directories in uploaded relative paths.
 * @param {string} parentPath
 * @param {FileList | File[]} files
 * @returns {string[]}
 */
export function collectS3DirectoryMarkersFromUpload(parentPath, files) {
  const dirs = new Set();
  const fileList = Array.from(files);
  for (const file of fileList) {
    const relPath = (file.webkitRelativePath || file.name).replace(/\\/g, '/');
    const parts = relPath.replace(/\/$/, '').split('/').filter(Boolean);
    for (let j = 1; j < parts.length; j++) {
      dirs.add(`${parentPath}${parts.slice(0, j).join('/')}/`);
    }
  }
  return [...dirs];
}

/**
 * Create zero-byte folder marker objects in S3.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string[]} keys
 */
export async function putS3FolderMarkers(client, bucket, keys) {
  for (const key of keys) {
    await putObject(client, { Bucket: bucket, Key: key, Body: '' });
  }
}

/**
 * Get object body as Uint8Array and metadata.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @returns {Promise<{ body: Uint8Array, ContentLength?: number, ContentType?: string, LastModified?: Date }>}
 */
export async function getObjectBody(client, bucket, key) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseCacheControl: 'no-cache, no-store, must-revalidate',
  });
  const response = await client.send(command);
  const body = await response.Body.transformToByteArray();
  return {
    body,
    ContentLength: response.ContentLength,
    ContentType: response.ContentType,
    LastModified: response.LastModified,
  };
}

export class S3PreconditionFailedError extends Error {
  constructor(message = 'Precondition Failed') {
    super(message);
    this.name = 'S3PreconditionFailedError';
    this.status = 412;
  }
}

/**
 * Get object metadata (LastModified 등) without downloading body.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @returns {Promise<{ LastModified?: Date, ContentLength?: number, ContentType?: string, ETag?: string } | null>}
 *   객체가 없으면 null
 */
export async function headObject(client, bucket, key) {
  try {
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
    const response = await client.send(command);
    return {
      LastModified: response.LastModified,
      ContentLength: response.ContentLength,
      ContentType: response.ContentType,
      ETag: response.ETag,
    };
  } catch (e) {
    if (
      e?.name === 'NotFound' ||
      e?.Code === 'NoSuchKey' ||
      e?.$metadata?.httpStatusCode === 404
    )
      return null;
    throw e;
  }
}

/**
 * Put object.
 * Response Cache-Control is set to max-age=30 so GET responses are cached at most 30 seconds.
 * @param {S3Client} client
 * @param {{ Bucket: string, Key: string, Body: string | Uint8Array, ContentType?: string, CacheControl?: string, IfMatch?: string, IfNoneMatch?: string }} params
 * @returns {Promise<{ ETag?: string }>}
 */
export async function putObject(client, params) {
  const withCache = { ...params, CacheControl: params.CacheControl ?? 'max-age=30' };
  try {
    const response = await client.send(new PutObjectCommand(withCache));
    return { ETag: response.ETag };
  } catch (e) {
    const status = e?.$metadata?.httpStatusCode;
    if (
      status === 412 ||
      e?.name === 'PreconditionFailed' ||
      e?.Code === 'PreconditionFailed'
    ) {
      throw new S3PreconditionFailedError(e?.message || 'Precondition Failed');
    }
    throw e;
  }
}

/**
 * Generate a presigned PUT URL for an object.
 * @param {S3Client} client
 * @param {{ Bucket: string, Key: string, ContentType?: string, CacheControl?: string }} params
 * @param {number} expiresIn seconds
 * @returns {Promise<string>}
 */
export async function getSignedPutUrl(client, params, expiresIn = 300) {
  const command = new PutObjectCommand({
    ...params,
    CacheControl: params.CacheControl ?? 'max-age=30',
  });
  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Put object with upload progress and abort support.
 * @param {S3Client} client
 * @param {{ Bucket: string, Key: string, Body: string | Uint8Array, ContentType?: string, CacheControl?: string }} params
 * @param {{ onProgress?: (percent: number) => void, signal?: AbortSignal }} [options]
 */
export async function putObjectWithProgress(client, params, options = {}) {
  const signedUrl = await getSignedPutUrl(
    client,
    {
      Bucket: params.Bucket,
      Key: params.Key,
      ContentType: params.ContentType,
      CacheControl: params.CacheControl,
    },
    300,
  );
  const body = params.Body;
  const totalBytes =
    typeof body === 'string'
      ? new TextEncoder().encode(body).byteLength
      : body?.byteLength ?? 0;

  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl, true);
    if (params.ContentType) xhr.setRequestHeader('Content-Type', params.ContentType);
    if (params.CacheControl) xhr.setRequestHeader('Cache-Control', params.CacheControl);

    const abortBySignal = () => xhr.abort();
    if (options.signal) {
      if (options.signal.aborted) {
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }
      options.signal.addEventListener('abort', abortBySignal, { once: true });
    }

    xhr.upload.onprogress = (event) => {
      if (!options.onProgress) return;
      if (event.lengthComputable && event.total > 0) {
        options.onProgress(Math.min(100, (event.loaded / event.total) * 100));
        return;
      }
      if (totalBytes > 0) {
        options.onProgress(Math.min(100, (event.loaded / totalBytes) * 100));
      }
    };

    xhr.onload = () => {
      if (options.signal) options.signal.removeEventListener('abort', abortBySignal);
      if (xhr.status >= 200 && xhr.status < 300) {
        if (options.onProgress) options.onProgress(100);
        resolve();
      } else {
        reject(new Error(`PUT upload failed with status ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      if (options.signal) options.signal.removeEventListener('abort', abortBySignal);
      reject(new Error('PUT upload failed due to network error'));
    };
    xhr.onabort = () => {
      if (options.signal) options.signal.removeEventListener('abort', abortBySignal);
      reject(new DOMException('Aborted', 'AbortError'));
    };

    xhr.send(body);
  });
}

/**
 * Delete a single object.
 */
export async function deleteObject(client, bucket, key) {
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

/**
 * Delete multiple objects.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {{ Key: string }[]} objects
 */
export async function deleteObjects(client, bucket, objects) {
  if (objects.length === 0) return;
  await client.send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: objects, Quiet: false },
    })
  );
}

/**
 * Copy object within the same bucket.
 * Sets CacheControl to max-age=30 on the copy.
 */
export async function copyObject(client, bucket, copySourceKey, key) {
  const copySource = `${bucket}/${encodeURIComponent(copySourceKey)}`;
  await client.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: copySource,
      Key: key,
      CacheControl: 'max-age=30',
    })
  );
}

/**
 * Stream S3 object to FileSystemWritableFileStream with progress callback.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @param {FileSystemWritableFileStream} writable
 * @param {(percent: number) => void} [onProgress] 0–100
 * @returns {Promise<{ ContentLength?: number }>}
 */
export async function streamS3ObjectToWritable(client, bucket, key, writable, onProgress) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseCacheControl: 'no-cache, no-store, must-revalidate',
  });
  const response = await client.send(command);
  const contentLength = response.ContentLength ?? 0;
  const body = response.Body;

  let stream;
  if (body.transformToWebStream) {
    stream = body.transformToWebStream();
  } else if (body && typeof body.getReader === 'function') {
    stream = body;
  } else {
    const bytes = await body.transformToByteArray();
    await writable.write(bytes);
    await writable.close();
    if (onProgress) onProgress(100);
    return { ContentLength: contentLength };
  }

  const reader = stream.getReader();
  let received = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      await writable.write(value);
      received += value.length;
      if (onProgress && contentLength) {
        onProgress(Math.min(100, (received / contentLength) * 100));
      }
    }
  } finally {
    await writable.close();
  }
  return { ContentLength: contentLength };
}

/**
 * Generate a presigned GET URL for an object.
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @param {number} expiresIn seconds
 * @returns {Promise<string>}
 */
export async function getSignedGetUrl(client, bucket, key, expiresIn = 60) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseCacheControl: 'no-cache, no-store, must-revalidate',
  });
  const url = await getSignedUrl(client, command, { expiresIn });
  return url;
}
