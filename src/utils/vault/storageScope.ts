export type StorageScopeMode = 's3' | 'local' | 'webdav';

export type StorageScopeInput = {
  mode?: string | null;
  bucket?: string | null;
  s3Creds?: { bucket?: string | null } | null;
  localRootHandle?: { name?: string } | null;
  webdavConfig?: {
    endpoint?: string | null;
    basePath?: string | null;
  } | null;
};

function normalizeMode(mode?: string | null): StorageScopeMode {
  if (mode === 'local' || mode === 'webdav') return mode;
  return 's3';
}

/**
 * Stable cache/identity key for the active storage backend.
 * Keeps S3 / Local / WebDAV (and distinct buckets/folders/servers) isolated.
 */
export function getStorageScopeId(input?: StorageScopeInput | null): string {
  const mode = normalizeMode(input?.mode);
  if (mode === 'local') {
    const name = String(input?.localRootHandle?.name || '').trim();
    return name ? `local:${encodeURIComponent(name)}` : 'local';
  }
  if (mode === 'webdav') {
    const endpoint = String(input?.webdavConfig?.endpoint || '')
      .trim()
      .replace(/\/+$/, '');
    const basePath = String(input?.webdavConfig?.basePath || '').trim();
    return `webdav:${endpoint}|${basePath}`;
  }
  const bucket = String(input?.bucket || input?.s3Creds?.bucket || '').trim();
  return bucket ? `s3:${bucket}` : 's3';
}

/** Null when the backend identity is not ready (no bucket / folder / endpoint). */
export function tryGetStorageScopeId(
  input?: StorageScopeInput | null,
): string | null {
  const mode = normalizeMode(input?.mode);
  if (mode === 'local') {
    const name = String(input?.localRootHandle?.name || '').trim();
    return name ? `local:${encodeURIComponent(name)}` : null;
  }
  if (mode === 'webdav') {
    const endpoint = String(input?.webdavConfig?.endpoint || '')
      .trim()
      .replace(/\/+$/, '');
    if (!endpoint) return null;
    const basePath = String(input?.webdavConfig?.basePath || '').trim();
    return `webdav:${endpoint}|${basePath}`;
  }
  const bucket = String(input?.bucket || input?.s3Creds?.bucket || '').trim();
  return bucket ? `s3:${bucket}` : null;
}

export function isS3StorageScope(scope: string): boolean {
  return scope === 's3' || scope.startsWith('s3:');
}
