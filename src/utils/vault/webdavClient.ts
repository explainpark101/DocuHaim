/**
 * Minimal WebDAV client for chat-with-myself (browser fetch + Basic Auth).
 */
import {
  collectDavResponses,
  firstDavElement,
  isDavCollection,
  joinWebdavStorageKey,
  webdavHrefToStorageKey,
} from '@/utils/vault/webdavHref';

export class WebdavPreconditionFailedError extends Error {
  status: any;
  constructor(message = 'Precondition Failed') {
    super(message);
    this.name = 'WebdavPreconditionFailedError';
    this.status = 412;
  }
}

export class WebdavHttpError extends Error {
  status: any;
  /**
   * @param {number} status
   * @param {string} message
   */
  constructor(status: any, message: any) {
    super(message);
    this.name = 'WebdavHttpError';
    this.status = status;
  }
}

/**
 * @typedef {{ endpoint: string, username: string, password: string, basePath: string }} WebdavConfig
 */

export type WebdavConfig = {
  endpoint: string;
  username: string;
  password: string;
  basePath: string;
};

export type WebdavPropfindEntry = {
  key: string;
  etag: string | null;
  mtime: number | null;
  isCollection: boolean;
  size?: number;
};

type WebdavFetchOptions = {
  headers?: Record<string, string>;
  body?: BodyInit | null;
  signal?: AbortSignal;
};

type WebdavPutOptions = {
  contentType?: string;
  ifMatch?: string | null;
  ifNoneMatch?: string | null;
};

type PropfindParseOptions = {
  directChildrenOnly?: boolean;
};

/**
 * @param {WebdavConfig} config
 * @returns {string}
 */
function authHeader(config: WebdavConfig) {
  const user = config?.username ?? '';
  const pass = config?.password ?? '';
  // btoa only accepts Latin1; encode Unicode credentials safely
  const bytes = new TextEncoder().encode(`${user}:${pass}`);
  let bin = '';
  for (const byte of bytes) {
    bin += String.fromCharCode(byte);
  }
  if (typeof btoa !== 'function') {
    throw new Error('WebDAV Basic Auth requires btoa in this environment');
  }
  return `Basic ${btoa(bin)}`;
}

/**
 * Join endpoint + basePath + relative key into an absolute URL.
 * @param {WebdavConfig} config
 * @param {string} key
 */
export function webdavUrl(config: WebdavConfig, key = '') {
  const endpoint = String(config?.endpoint || '').replace(/\/+$/, '');
  if (!endpoint) throw new Error('WebDAV endpoint is required');
  const base = String(config?.basePath || '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
  const rel = String(key || '')
    .replace(/^\/+/, '')
    .replace(/\\/g, '/');
  const parts = [endpoint];
  if (base) parts.push(base);
  if (rel) parts.push(rel);
  return parts.join('/');
}

/**
 * @param {WebdavConfig} config
 * @param {string} method
 * @param {string} key
 * @param {{ headers?: Record<string, string>, body?: BodyInit | null, signal?: AbortSignal }} [opts]
 */
async function webdavFetch(config: WebdavConfig, method: string, key: string, opts: WebdavFetchOptions = {}) {
  const url = webdavUrl(config, key);
  let response;
  try {
    const init: RequestInit = {
      method,
      headers: {
        Authorization: authHeader(config),
        ...(opts.headers || {}),
      },
    };
    if (opts.body != null) init.body = opts.body;
    if (opts.signal != null) init.signal = opts.signal;
    response = await fetch(url, init);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/Failed to fetch|NetworkError|CORS/i.test(msg)) {
      throw new WebdavHttpError(
        0,
        'WebDAV request failed (network or CORS). Check endpoint CORS and credentials.',
      );
    }
    throw err;
  }

  if (response.status === 401 || response.status === 403) {
    throw new WebdavHttpError(
      response.status,
      'WebDAV authentication failed. Check username and password.',
    );
  }
  if (response.status === 412) {
    throw new WebdavPreconditionFailedError('Precondition Failed');
  }
  return response;
}

/**
 * @param {WebdavConfig} config
 * @param {string} key
 * @returns {Promise<{ etag: string | null, mtime: number | null, contentType: string | null } | null>}
 */
export async function webdavHead(config: any, key: any) {
  const response = await webdavFetch(config, 'HEAD', key);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV HEAD failed (${response.status})`,
    );
  }
  const etag = response.headers.get('etag');
  const lm = response.headers.get('last-modified');
  return {
    etag: etag || null,
    mtime: lm ? Date.parse(lm) || null : null,
    contentType: response.headers.get('content-type'),
  };
}

/**
 * @param {WebdavConfig} config
 * @param {string} key
 * @returns {Promise<string | null>}
 */
export async function webdavGetText(config: any, key: any) {
  const response = await webdavFetch(config, 'GET', key, {
    headers: { Accept: 'text/plain, application/json, */*' },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV GET failed (${response.status})`,
    );
  }
  return await response.text();
}

/**
 * @param {WebdavConfig} config
 * @param {string} key
 * @returns {Promise<{ blob: Blob, contentType: string | null } | null>}
 */
export async function webdavGetBinary(config: any, key: any) {
  const response = await webdavFetch(config, 'GET', key);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV GET failed (${response.status})`,
    );
  }
  const blob = await response.blob();
  return {
    blob,
    contentType: response.headers.get('content-type'),
  };
}

/**
 * @param {WebdavConfig} config
 * @param {string} key
 * @param {string | Uint8Array | Blob} body
 * @param {{ contentType?: string, ifMatch?: string | null, ifNoneMatch?: string | null }} [options]
 * @returns {Promise<{ etag: string | null }>}
 */
export async function webdavPut(
  config: WebdavConfig,
  key: string,
  body: BodyInit,
  options: WebdavPutOptions = {},
) {
  const headers: Record<string, string> = {};
  if (options.contentType) headers['Content-Type'] = options.contentType;
  if (options.ifMatch) headers['If-Match'] = options.ifMatch;
  if (options.ifNoneMatch) headers['If-None-Match'] = options.ifNoneMatch;

  const response = await webdavFetch(config, 'PUT', key, {
    headers,
    body,
  });
  if (!response.ok && response.status !== 201 && response.status !== 204) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV PUT failed (${response.status})`,
    );
  }
  return { etag: response.headers.get('etag') };
}

/**
 * Create a collection (directory). Ignores 405/409 if it already exists.
 * @param {WebdavConfig} config
 * @param {string} dirKey trailing slash optional
 */
export async function webdavMkcol(config: any, dirKey: any) {
  const key = String(dirKey || '').replace(/\/?$/, '/');
  const response = await webdavFetch(config, 'MKCOL', key);
  if (
    response.ok ||
    response.status === 201 ||
    response.status === 405 ||
    response.status === 409 ||
    response.status === 301 ||
    response.status === 302
  ) {
    return;
  }
  if (response.status === 404) {
    throw new WebdavHttpError(404, `WebDAV MKCOL failed (${response.status})`);
  }
  if (!response.ok) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV MKCOL failed (${response.status})`,
    );
  }
}

/**
 * Ensure parent directories exist for a file key (e.g. a/b/c.txt → MKCOL a/, a/b/).
 * @param {WebdavConfig} config
 * @param {string} fileKey
 */
export async function webdavEnsureParentDirs(config: any, fileKey: any) {
  const parts = String(fileKey || '')
    .replace(/^\/+/, '')
    .split('/')
    .filter(Boolean);
  if (parts.length <= 1) return;
  let acc = '';
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!part) continue;
    acc = acc ? `${acc}/${part}` : part;
    await webdavMkcol(config, acc);
  }
}

/**
 * Depth-1 PROPFIND; returns child hrefs relative to basePath as storage keys.
 * @param {WebdavConfig} config
 * @param {string} dirKey
 * @returns {Promise<{ key: string, etag: string | null, mtime: number | null, isCollection: boolean, size?: number }[]>}
 */
export async function webdavPropfind(config: any, dirKey = '') {
  const key = String(dirKey || '').replace(/\/?$/, '/');
  const response = await webdavFetch(config, 'PROPFIND', key, {
    headers: {
      Depth: '1',
      'Content-Type': 'application/xml; charset=utf-8',
    },
    body: `<?xml version="1.0" encoding="utf-8"?>
<d:propfind xmlns:d="DAV:">
  <d:prop>
    <d:getetag/>
    <d:getlastmodified/>
    <d:getcontentlength/>
    <d:resourcetype/>
  </d:prop>
</d:propfind>`,
  });
  if (response.status === 404) return [];
  if (!response.ok && response.status !== 207) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV PROPFIND failed (${response.status})`,
    );
  }
  const xml = await response.text();
  return parsePropfindResponse(xml, config, key);
}

/**
 * @param {string} xml
 * @param {WebdavConfig} config
 * @param {string} dirKey
 */
function parsePropfindResponse(
  xml: string,
  config: WebdavConfig,
  dirKey: string,
  options: PropfindParseOptions = {},
) {
  const results: WebdavPropfindEntry[] = [];
  if (typeof DOMParser === 'undefined') return results;
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const responses = collectDavResponses(doc);
  const listingUrl = webdavUrl(config, dirKey).replace(/\/?$/, '/');
  const directChildrenOnly = options.directChildrenOnly !== false;

  for (const node of responses) {
    const hrefEl = firstDavElement(node, 'href');
    if (!hrefEl) continue;
    const href = (hrefEl.textContent || '').trim();
    if (!href) continue;

    const key = webdavHrefToStorageKey(href, listingUrl, { directChildrenOnly });
    if (key == null || key === '') continue;

    const isCollection = isDavCollection(node, href);
    const etagEl = firstDavElement(node, 'getetag');
    const lmEl = firstDavElement(node, 'getlastmodified');
    const sizeEl = firstDavElement(node, 'getcontentlength');
    const etag = etagEl?.textContent?.trim() || null;
    const lm = lmEl?.textContent?.trim();
    const mtime = lm ? Date.parse(lm) || null : null;
    const sizeRaw = sizeEl?.textContent?.trim();
    const sizeParsed = sizeRaw != null && sizeRaw !== '' ? Number(sizeRaw) : NaN;
    const size = Number.isFinite(sizeParsed) ? sizeParsed : undefined;

    const entry: WebdavPropfindEntry = { key, etag, mtime, isCollection };
    if (size !== undefined) entry.size = size;
    results.push(entry);
  }
  return results;
}

/**
 * Delete a resource.
 * @param {WebdavConfig} config
 * @param {string} key
 */
export async function webdavDelete(config: any, key: any) {
  const response = await webdavFetch(config, 'DELETE', key);
  if (response.status === 404) return;
  if (!response.ok && response.status !== 204) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV DELETE failed (${response.status})`,
    );
  }
}

/**
 * MOVE resource (Destination must be absolute URL).
 * @param {WebdavConfig} config
 * @param {string} fromKey
 * @param {string} toKey
 */
export async function webdavMove(config: any, fromKey: any, toKey: any) {
  const destination = webdavUrl(config, toKey);
  const response = await webdavFetch(config, 'MOVE', fromKey, {
    headers: {
      Destination: destination,
      Overwrite: 'T',
    },
  });
  if (!response.ok && response.status !== 201 && response.status !== 204) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV MOVE failed (${response.status})`,
    );
  }
}

/**
 * COPY resource.
 * @param {WebdavConfig} config
 * @param {string} fromKey
 * @param {string} toKey
 */
export async function webdavCopy(config: any, fromKey: any, toKey: any) {
  const destination = webdavUrl(config, toKey);
  const response = await webdavFetch(config, 'COPY', fromKey, {
    headers: {
      Destination: destination,
      Overwrite: 'T',
    },
  });
  if (!response.ok && response.status !== 201 && response.status !== 204) {
    throw new WebdavHttpError(
      response.status,
      `WebDAV COPY failed (${response.status})`,
    );
  }
}

/**
 * Recursive PROPFIND (Depth: infinity). Falls back to BFS depth-1 if server rejects infinity.
 * @param {WebdavConfig} config
 * @param {string} dirKey
 * @returns {Promise<{ key: string, etag: string | null, mtime: number | null, isCollection: boolean, size?: number }[]>}
 */
export async function webdavPropfindDeep(config: any, dirKey = '') {
  const key = String(dirKey || '').replace(/\/?$/, '/');
  try {
    const response = await webdavFetch(config, 'PROPFIND', key, {
      headers: {
        Depth: 'infinity',
        'Content-Type': 'application/xml; charset=utf-8',
      },
      body: `<?xml version="1.0" encoding="utf-8"?>
<d:propfind xmlns:d="DAV:">
  <d:prop>
    <d:getetag/>
    <d:getlastmodified/>
    <d:getcontentlength/>
    <d:resourcetype/>
  </d:prop>
</d:propfind>`,
    });
    if (response.ok || response.status === 207) {
      const xml = await response.text();
      return parsePropfindResponse(xml, config, key, { directChildrenOnly: false });
    }
  } catch {
    /* fall through to BFS */
  }

  const all = [];
  const queue = [key];
  const seen = new Set();
  while (queue.length) {
    const dir = queue.shift();
    if (!dir || seen.has(dir)) continue;
    seen.add(dir);
    const children = await webdavPropfind(config, dir);
    for (const child of children) {
      const fullKey = joinWebdavStorageKey(dir, child.key);
      all.push({ ...child, key: fullKey });
      if (child.isCollection) {
        const childDir = fullKey.endsWith('/') ? fullKey : `${fullKey}/`;
        queue.push(childDir);
      }
    }
  }
  return all;
}
