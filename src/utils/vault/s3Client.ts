import {
  S3Client,
  ListObjectsV2Command,
  ListObjectVersionsCommand,
  GetBucketVersioningCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { normalizePathToNfc } from '@/utils/unicodeNfc';

export type S3Creds = {
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
  endpoint?: string;
};

export type S3ListedObject = {
  Key: string;
  LastModified?: Date;
  Size?: number;
};

export type S3ObjectVersionRow = {
  Key: string;
  VersionId?: string;
  IsLatest?: boolean;
  LastModified?: Date;
  Size?: number;
  ETag?: string;
  isDeleteMarker?: boolean;
};

export type S3DeleteObjectRef = {
  Key: string;
  VersionId?: string;
};

type AwsLikeError = {
  name?: string;
  Code?: string;
  message?: string;
  $metadata?: { httpStatusCode?: number };
};

function asAwsError(e: unknown): AwsLikeError {
  return e && typeof e === 'object' ? (e as AwsLikeError) : {};
}

/** Create an S3 client from credentials. */
export function createS3Client(creds: S3Creds | null | undefined): S3Client | null {
  if (!creds?.accessKeyId || !creds?.secretAccessKey) return null;
  const config: ConstructorParameters<typeof S3Client>[0] = {
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

/** List objects (v2) and return Contents array. */
export async function listObjectsV2(
  client: S3Client,
  bucket: string,
  prefix = '',
): Promise<S3ListedObject[]> {
  const contents: S3ListedObject[] = [];
  let continuationToken: string | undefined;

  do {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
    });
    const data = await client.send(command);
    if (data.Contents?.length) {
      for (const item of data.Contents) {
        if (!item.Key) continue;
        const row: S3ListedObject = { Key: item.Key };
        if (item.LastModified) row.LastModified = item.LastModified;
        if (typeof item.Size === 'number') row.Size = item.Size;
        contents.push(row);
      }
    }
    continuationToken = data.IsTruncated
      ? data.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return contents;
}

/**
 * Collect S3 folder marker keys (`…/`) for all parent directories in uploaded relative paths.
 */
export function collectS3DirectoryMarkersFromUpload(
  parentPath: string,
  files: FileList | File[],
): string[] {
  const dirs = new Set<string>();
  const fileList = Array.from(files);
  for (const file of fileList) {
    const relPath = normalizePathToNfc(
      (file.webkitRelativePath || file.name).replace(/\\/g, '/'),
    );
    const parts = relPath.replace(/\/$/, '').split('/').filter(Boolean);
    for (let j = 1; j < parts.length; j++) {
      dirs.add(`${parentPath}${parts.slice(0, j).join('/')}/`);
    }
  }
  return [...dirs];
}

/** Create zero-byte folder marker objects in S3. */
export async function putS3FolderMarkers(
  client: S3Client,
  bucket: string,
  keys: string[],
): Promise<void> {
  for (const key of keys) {
    await putObject(client, { Bucket: bucket, Key: key, Body: '' });
  }
}

export type GetObjectBodyOptions = {
  versionId?: string;
};

export type GetObjectBodyResult = {
  body: Uint8Array;
  ContentLength?: number;
  ContentType?: string;
  LastModified?: Date;
  VersionId?: string;
};

/** Get object body as Uint8Array and metadata. */
export async function getObjectBody(
  client: S3Client,
  bucket: string,
  key: string,
  options: GetObjectBodyOptions = {},
): Promise<GetObjectBodyResult> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ...(options.versionId ? { VersionId: options.versionId } : {}),
    ResponseCacheControl: 'no-cache, no-store, must-revalidate',
  });
  const response = await client.send(command);
  if (!response.Body) {
    throw new Error('S3 GetObject returned empty body');
  }
  const body = await response.Body.transformToByteArray();
  const result: GetObjectBodyResult = { body };
  if (typeof response.ContentLength === 'number') {
    result.ContentLength = response.ContentLength;
  }
  if (response.ContentType) result.ContentType = response.ContentType;
  if (response.LastModified) result.LastModified = response.LastModified;
  if (response.VersionId) result.VersionId = response.VersionId;
  return result;
}

/** Bucket versioning status: Enabled | Suspended | null (never enabled). */
export async function getBucketVersioningStatus(
  client: S3Client,
  bucket: string,
): Promise<'Enabled' | 'Suspended' | null> {
  const data = await client.send(
    new GetBucketVersioningCommand({ Bucket: bucket }),
  );
  const status = data?.Status;
  if (status === 'Enabled' || status === 'Suspended') return status;
  return null;
}

export type ListObjectVersionsOptions = {
  /** When true, keep only entries whose Key equals prefix. */
  exactKey?: boolean;
};

/** List object versions for a key/prefix (paginated). */
export async function listObjectVersions(
  client: S3Client,
  bucket: string,
  prefix = '',
  options: ListObjectVersionsOptions = {},
): Promise<{ versions: S3ObjectVersionRow[] }> {
  const versions: S3ObjectVersionRow[] = [];
  let keyMarker: string | undefined;
  let versionIdMarker: string | undefined;

  do {
    const data = await client.send(
      new ListObjectVersionsCommand({
        Bucket: bucket,
        Prefix: prefix,
        ...(keyMarker ? { KeyMarker: keyMarker } : {}),
        ...(versionIdMarker ? { VersionIdMarker: versionIdMarker } : {}),
      }),
    );
    for (const v of data.Versions || []) {
      if (!v.Key) continue;
      const row: S3ObjectVersionRow = {
        Key: v.Key,
        isDeleteMarker: false,
      };
      if (v.VersionId) row.VersionId = v.VersionId;
      if (typeof v.IsLatest === 'boolean') row.IsLatest = v.IsLatest;
      if (v.LastModified) row.LastModified = v.LastModified;
      if (typeof v.Size === 'number') row.Size = v.Size;
      if (v.ETag) row.ETag = v.ETag;
      versions.push(row);
    }
    for (const m of data.DeleteMarkers || []) {
      if (!m.Key) continue;
      const row: S3ObjectVersionRow = {
        Key: m.Key,
        Size: 0,
        isDeleteMarker: true,
      };
      if (m.VersionId) row.VersionId = m.VersionId;
      if (typeof m.IsLatest === 'boolean') row.IsLatest = m.IsLatest;
      if (m.LastModified) row.LastModified = m.LastModified;
      versions.push(row);
    }
    keyMarker = data.IsTruncated ? data.NextKeyMarker : undefined;
    versionIdMarker = data.IsTruncated ? data.NextVersionIdMarker : undefined;
  } while (keyMarker || versionIdMarker);

  const exact = options.exactKey === true;
  const filtered = exact
    ? versions.filter((v) => v.Key === prefix)
    : versions;

  filtered.sort((a, b) => {
    const ta = a.LastModified ? new Date(a.LastModified).getTime() : 0;
    const tb = b.LastModified ? new Date(b.LastModified).getTime() : 0;
    return tb - ta;
  });

  return { versions: filtered };
}

export class S3PreconditionFailedError extends Error {
  status = 412;

  constructor(message = 'Precondition Failed') {
    super(message);
    this.name = 'S3PreconditionFailedError';
  }
}

export type HeadObjectResult = {
  LastModified?: Date;
  ContentLength?: number;
  ContentType?: string;
  ETag?: string;
};

/** Get object metadata without downloading body. Returns null if missing. */
export async function headObject(
  client: S3Client,
  bucket: string,
  key: string,
): Promise<HeadObjectResult | null> {
  try {
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
    const response = await client.send(command);
    const result: HeadObjectResult = {};
    if (response.LastModified) result.LastModified = response.LastModified;
    if (typeof response.ContentLength === 'number') {
      result.ContentLength = response.ContentLength;
    }
    if (response.ContentType) result.ContentType = response.ContentType;
    if (response.ETag) result.ETag = response.ETag;
    return result;
  } catch (e: unknown) {
    const err = asAwsError(e);
    if (
      err.name === 'NotFound' ||
      err.Code === 'NoSuchKey' ||
      err.$metadata?.httpStatusCode === 404
    ) {
      return null;
    }
    throw e;
  }
}

export type PutObjectParams = {
  Bucket: string;
  Key: string;
  Body: string | Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  IfMatch?: string;
  IfNoneMatch?: string;
};

/** Put object. Default Cache-Control max-age=30. */
export async function putObject(
  client: S3Client,
  params: PutObjectParams,
): Promise<{ ETag?: string }> {
  const withCache = {
    ...params,
    CacheControl: params.CacheControl ?? 'max-age=30',
  };
  try {
    const response = await client.send(new PutObjectCommand(withCache));
    return response.ETag ? { ETag: response.ETag } : {};
  } catch (e: unknown) {
    const err = asAwsError(e);
    const status = err.$metadata?.httpStatusCode;
    if (
      status === 412 ||
      err.name === 'PreconditionFailed' ||
      err.Code === 'PreconditionFailed'
    ) {
      throw new S3PreconditionFailedError(err.message || 'Precondition Failed');
    }
    throw e;
  }
}

export type SignedPutParams = {
  Bucket: string;
  Key: string;
  ContentType?: string;
  CacheControl?: string;
};

/** Generate a presigned PUT URL for an object. */
export async function getSignedPutUrl(
  client: S3Client,
  params: SignedPutParams,
  expiresIn = 300,
): Promise<string> {
  const command = new PutObjectCommand({
    ...params,
    CacheControl: params.CacheControl ?? 'max-age=30',
  });
  return getSignedUrl(client, command, { expiresIn });
}

export type PutObjectWithProgressOptions = {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

/** Put object with upload progress and abort support. */
export async function putObjectWithProgress(
  client: S3Client,
  params: PutObjectParams,
  options: PutObjectWithProgressOptions = {},
): Promise<void> {
  const signedUrl = await getSignedPutUrl(
    client,
    {
      Bucket: params.Bucket,
      Key: params.Key,
      ...(params.ContentType ? { ContentType: params.ContentType } : {}),
      ...(params.CacheControl ? { CacheControl: params.CacheControl } : {}),
    },
    300,
  );
  const body = params.Body;
  const totalBytes =
    typeof body === 'string'
      ? new TextEncoder().encode(body).byteLength
      : body?.byteLength ?? 0;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl, true);
    if (params.ContentType) xhr.setRequestHeader('Content-Type', params.ContentType);
    if (params.CacheControl) {
      xhr.setRequestHeader('Cache-Control', params.CacheControl);
    }

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
      if (options.signal) {
        options.signal.removeEventListener('abort', abortBySignal);
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        options.onProgress?.(100);
        resolve();
      } else {
        reject(new Error(`PUT upload failed with status ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      if (options.signal) {
        options.signal.removeEventListener('abort', abortBySignal);
      }
      reject(new Error('PUT upload failed due to network error'));
    };
    xhr.onabort = () => {
      if (options.signal) {
        options.signal.removeEventListener('abort', abortBySignal);
      }
      reject(new DOMException('Aborted', 'AbortError'));
    };

    // Uint8Array is a valid XHR body; DOM typings omit ArrayBufferView in some targets.
    xhr.send(body as XMLHttpRequestBodyInit);
  });
}

/** Delete a single object. */
export async function deleteObject(
  client: S3Client,
  bucket: string,
  key: string,
): Promise<void> {
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export type DeleteObjectsResult = {
  deleted: { Key?: string; VersionId?: string }[];
  errors: {
    Key?: string;
    VersionId?: string;
    Code?: string;
    Message?: string;
  }[];
};

/** Delete multiple objects (optional VersionId for permanent version delete). */
export async function deleteObjects(
  client: S3Client,
  bucket: string,
  objects: S3DeleteObjectRef[],
): Promise<DeleteObjectsResult> {
  if (objects.length === 0) return { deleted: [], errors: [] };
  const deleted: DeleteObjectsResult['deleted'] = [];
  const errors: DeleteObjectsResult['errors'] = [];
  const CHUNK = 1000;
  for (let i = 0; i < objects.length; i += CHUNK) {
    const chunk = objects.slice(i, i + CHUNK);
    const data = await client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: { Objects: chunk, Quiet: false },
      }),
    );
    for (const d of data.Deleted || []) {
      const row: DeleteObjectsResult['deleted'][number] = {};
      if (d.Key) row.Key = d.Key;
      if (d.VersionId) row.VersionId = d.VersionId;
      deleted.push(row);
    }
    for (const e of data.Errors || []) {
      const row: DeleteObjectsResult['errors'][number] = {};
      if (e.Key) row.Key = e.Key;
      if (e.VersionId) row.VersionId = e.VersionId;
      if (e.Code) row.Code = e.Code;
      if (e.Message) row.Message = e.Message;
      errors.push(row);
    }
  }
  return { deleted, errors };
}

/** Copy object within the same bucket. Sets CacheControl max-age=30. */
export async function copyObject(
  client: S3Client,
  bucket: string,
  copySourceKey: string,
  key: string,
): Promise<void> {
  const copySource = `${bucket}/${encodeURIComponent(copySourceKey)}`;
  await client.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: copySource,
      Key: key,
      CacheControl: 'max-age=30',
    }),
  );
}

/**
 * Stream S3 object to FileSystemWritableFileStream with progress callback.
 */
export async function streamS3ObjectToWritable(
  client: S3Client,
  bucket: string,
  key: string,
  writable: FileSystemWritableFileStream,
  onProgress?: (percent: number) => void,
): Promise<{ ContentLength?: number }> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseCacheControl: 'no-cache, no-store, must-revalidate',
  });
  const response = await client.send(command);
  const contentLength = response.ContentLength ?? 0;
  const body = response.Body;
  if (!body) {
    await writable.close();
    onProgress?.(100);
    return contentLength ? { ContentLength: contentLength } : {};
  }

  type StreamLike = {
    transformToWebStream?: () => ReadableStream<Uint8Array>;
    getReader?: () => ReadableStreamDefaultReader<Uint8Array>;
    transformToByteArray: () => Promise<Uint8Array>;
  };
  const streamBody = body as StreamLike;

  let stream: ReadableStream<Uint8Array> | null = null;
  if (typeof streamBody.transformToWebStream === 'function') {
    stream = streamBody.transformToWebStream();
  } else if (typeof streamBody.getReader === 'function') {
    stream = streamBody as unknown as ReadableStream<Uint8Array>;
  } else {
    const bytes = await streamBody.transformToByteArray();
    await writable.write(bytes as FileSystemWriteChunkType);
    await writable.close();
    onProgress?.(100);
    return contentLength ? { ContentLength: contentLength } : {};
  }

  const reader = stream.getReader();
  let received = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        await writable.write(value as FileSystemWriteChunkType);
        received += value.length;
        if (onProgress && contentLength) {
          onProgress(Math.min(100, (received / contentLength) * 100));
        }
      }
    }
  } finally {
    await writable.close();
  }
  return contentLength ? { ContentLength: contentLength } : {};
}

export type SignedGetOptions = {
  versionId?: string;
};

/** Generate a presigned GET URL for an object. */
export async function getSignedGetUrl(
  client: S3Client,
  bucket: string,
  key: string,
  expiresIn = 60,
  options: SignedGetOptions = {},
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ...(options.versionId ? { VersionId: options.versionId } : {}),
    ResponseCacheControl: 'no-cache, no-store, must-revalidate',
  });
  return getSignedUrl(client, command, { expiresIn });
}
