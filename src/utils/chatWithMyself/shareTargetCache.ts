/**
 * Temporary Cache Storage for Web Share Target file payloads.
 * The service worker writes; the client reads once and deletes.
 */

export const SHARE_TARGET_CACHE = 's3haim-share-target-v1';
export const SHARE_TARGET_FLAG = 'share-target';
export const SHARE_TARGET_FILE_PARAM = 'media';

const META_PATH = '__share_target_meta__';
const FILE_PREFIX = '__share_target_file__/';

type ShareTargetMetaEntry = {
  key: string;
  name: string;
  type: string;
  size: number;
};

type ShareTargetMeta = {
  files: ShareTargetMetaEntry[];
};

function shareTargetBaseHref(): string {
  const base = import.meta.env.BASE_URL || '/';
  const origin =
    typeof self !== 'undefined' && self.location?.origin
      ? self.location.origin
      : '';
  return new URL(base, origin || undefined).href;
}

function metaRequestUrl(): string {
  return new URL(META_PATH, shareTargetBaseHref()).href;
}

function fileRequestUrl(index: number): string {
  return new URL(`${FILE_PREFIX}${index}`, shareTargetBaseHref()).href;
}

function isBlobLike(value: unknown): value is Blob {
  return (
    typeof Blob !== 'undefined' &&
    value instanceof Blob &&
    typeof (value as Blob).size === 'number'
  );
}

/**
 * Persist shared files for the next client navigation (303 redirect).
 */
export async function storeShareTargetFiles(
  files: Array<Blob | File>,
): Promise<void> {
  await caches.delete(SHARE_TARGET_CACHE);
  const list = (Array.isArray(files) ? files : []).filter(isBlobLike);
  if (!list.length) return;

  const cache = await caches.open(SHARE_TARGET_CACHE);
  const meta: ShareTargetMeta = { files: [] };

  for (let i = 0; i < list.length; i += 1) {
    const file = list[i];
    if (!file) continue;
    const name =
      file instanceof File && file.name
        ? file.name
        : `shared-${i + 1}`;
    const type = file.type || 'application/octet-stream';
    const key = fileRequestUrl(i);
    meta.files.push({
      key,
      name,
      type,
      size: file.size || 0,
    });
    await cache.put(
      key,
      new Response(file, {
        headers: { 'Content-Type': type },
      }),
    );
  }

  await cache.put(
    metaRequestUrl(),
    new Response(JSON.stringify(meta), {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

/**
 * Read and clear share-target files once.
 */
export async function takeShareTargetFiles(): Promise<File[]> {
  let cache: Cache;
  try {
    cache = await caches.open(SHARE_TARGET_CACHE);
  } catch {
    return [];
  }

  try {
    const metaRes = await cache.match(metaRequestUrl());
    if (!metaRes) return [];

    let meta: ShareTargetMeta;
    try {
      meta = (await metaRes.json()) as ShareTargetMeta;
    } catch {
      return [];
    }

    const out: File[] = [];
    for (const entry of Array.isArray(meta?.files) ? meta.files : []) {
      if (!entry?.key) continue;
      const res = await cache.match(entry.key);
      if (!res) continue;
      const blob = await res.blob();
      out.push(
        new File([blob], entry.name || 'shared-file', {
          type: entry.type || blob.type || 'application/octet-stream',
        }),
      );
    }
    return out;
  } finally {
    try {
      await caches.delete(SHARE_TARGET_CACHE);
    } catch {
      /* ignore */
    }
  }
}

export function isChatShareTargetPath(pathname: string): boolean {
  const path = String(pathname || '').replace(/\/+$/, '') || '/';
  return path.endsWith('/chat');
}
