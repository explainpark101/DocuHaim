import { cacheOg, getCachedOg } from './chatDb.js';
import { ogArchiveKey } from './paths.js';
import { parseAppViewPath } from './format.js';
import { parseWikiImageInner } from '@/utils/wikiImageSyntax';

const URL_RE = /https?:\/\/[^\s<>"'`)\]]+/gi;

function trimUrlTrailingPunct(url) {
  return String(url).replace(/[.,;:!?)]+$/, '');
}

export function extractUrls(text) {
  if (!text) return [];
  const found = String(text).match(URL_RE) || [];
  const cleaned = found.map((u) => trimUrlTrailingPunct(u));
  return [...new Set(cleaned)];
}

const MD_LINK_RE =
  /\[([^\]]+)\]\(((?:\/view\/[^)\s]+|https?:\/\/[^)\s]+))\)/g;

/**
 * @param {string} path
 * @param {string} [name]
 */
function notePart(path, name) {
  const p = String(path || '').replace(/^\/+/, '').trim();
  if (!p) return null;
  const label =
    String(name || '').trim() ||
    p.split('/').filter(Boolean).pop() ||
    'note';
  return {
    type: 'note',
    path: p,
    name: label.replace(/[[\]|]/g, '_').trim() || 'note',
  };
}

/**
 * Split a plain-text chunk into text / note-card / markdown-link / bare-URL segments.
 * @param {string} ts
 * @returns {Array<{ type: 'text' | 'link' | 'note', value?: string, label?: string, path?: string, name?: string }>}
 */
function splitTextLinks(ts) {
  const out = [];
  let last = 0;
  const mdRe = new RegExp(MD_LINK_RE.source, MD_LINK_RE.flags);
  let md;
  while ((md = mdRe.exec(ts))) {
    if (md.index > last) {
      out.push({ type: 'text', value: ts.slice(last, md.index) });
    }
    const label = String(md[1] || '').trim();
    const url = String(md[2] || '').trim();
    if (url) {
      const viewPath = parseAppViewPath(url);
      if (viewPath) {
        const part = notePart(viewPath, label);
        if (part) out.push(part);
      } else {
        out.push({
          type: 'link',
          value: url,
          ...(label ? { label } : {}),
        });
      }
    }
    last = md.index + md[0].length;
  }
  if (last < ts.length) out.push({ type: 'text', value: ts.slice(last) });
  if (!out.length) out.push({ type: 'text', value: ts });

  const parts = [];
  for (const chunk of out) {
    if (chunk.type !== 'text') {
      parts.push(chunk);
      continue;
    }
    const re = new RegExp(URL_RE.source, URL_RE.flags);
    let tLast = 0;
    let m;
    const segment = chunk.value || '';
    while ((m = re.exec(segment))) {
      const raw = m[0];
      const url = trimUrlTrailingPunct(raw);
      const trailing = raw.slice(url.length);
      if (m.index > tLast) {
        parts.push({ type: 'text', value: segment.slice(tLast, m.index) });
      }
      if (url) {
        const viewPath = parseAppViewPath(url);
        if (viewPath) {
          const part = notePart(viewPath);
          if (part) parts.push(part);
        } else {
          parts.push({ type: 'link', value: url });
        }
      }
      if (trailing) parts.push({ type: 'text', value: trailing });
      tLast = m.index + raw.length;
    }
    if (tLast < segment.length) {
      parts.push({ type: 'text', value: segment.slice(tLast) });
    }
  }
  return parts.length ? parts : [{ type: 'text', value: ts }];
}

/**
 * Split plain text into text / link / note / wiki-image / file-card segments.
 * @param {string} text
 * @returns {Array<{ type: 'text' | 'link' | 'note' | 'wiki' | 'file', value?: string, label?: string, path?: string, name?: string, size?: number | null, background?: string | null }>}
 */
export function splitTextWithUrls(text) {
  const s = String(text ?? '');
  if (!s) return [{ type: 'text', value: '' }];

  // Images: ![[path]]  Files: [[file:...]]  Notes: [[note:path|name?]]
  const tokenRe =
    /!\[\[([^\]]+)\]\]|\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]|\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g;
  const coarse = [];
  let last = 0;
  let tm;
  while ((tm = tokenRe.exec(s))) {
    if (tm.index > last) {
      coarse.push({ type: 'text', value: s.slice(last, tm.index) });
    }
    if (tm[1] != null) {
      const parsed = parseWikiImageInner(tm[1].trim());
      const path = parsed?.path || tm[1].trim();
      if (path) {
        coarse.push({
          type: 'wiki',
          value: path,
          path,
          background: parsed?.background || null,
        });
      }
    } else if (tm[2] != null) {
      const path = String(tm[2] || '').trim();
      const name = String(tm[3] || path.split('/').filter(Boolean).pop() || 'file')
        .replace(/[[\]|]/g, '_')
        .trim();
      const sizeNum = tm[4] != null ? Number(tm[4]) : null;
      coarse.push({
        type: 'file',
        path,
        name: name || 'file',
        size: Number.isFinite(sizeNum) ? sizeNum : null,
      });
    } else {
      const part = notePart(tm[5], tm[6]);
      if (part) coarse.push(part);
    }
    last = tm.index + tm[0].length;
  }
  if (last < s.length) coarse.push({ type: 'text', value: s.slice(last) });
  if (!coarse.length) coarse.push({ type: 'text', value: s });

  const parts = [];
  for (const chunk of coarse) {
    if (chunk.type !== 'text') {
      parts.push(chunk);
      continue;
    }
    parts.push(...splitTextLinks(chunk.value || ''));
  }
  return parts.length ? parts : [{ type: 'text', value: s }];
}

export function isYouTubeUrl(url) {
  try {
    const u = new URL(url);
    return (
      /(^|\.)youtube\.com$/i.test(u.hostname) ||
      /(^|\.)youtu\.be$/i.test(u.hostname) ||
      /(^|\.)youtube-nocookie\.com$/i.test(u.hostname)
    );
  } catch {
    return false;
  }
}

export async function hashUrl(url) {
  const data = new TextEncoder().encode(url);
  if (typeof crypto !== 'undefined' && crypto.subtle?.digest) {
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 32);
  }
  let h = 0;
  for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) >>> 0;
  return `h${h.toString(16)}`;
}

async function fetchYouTubeOembed(url) {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`YouTube oEmbed ${res.status}`);
  const data = await res.json();
  return {
    url,
    fetchedAt: new Date().toISOString(),
    title: data.title || '',
    description: data.author_name ? `by ${data.author_name}` : '',
    image: data.thumbnail_url || '',
    siteName: 'YouTube',
    type: 'video.other',
    provider: 'youtube-oembed',
    embedHtml: data.html || '',
  };
}

async function fetchMicrolink(url) {
  const endpoint = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Microlink ${res.status}`);
  const json = await res.json();
  const d = json?.data || {};
  return {
    url,
    fetchedAt: new Date().toISOString(),
    title: d.title || '',
    description: d.description || '',
    image: d.image?.url || d.logo?.url || '',
    siteName: d.publisher || d.author || '',
    type: d.type || 'website',
    provider: 'microlink',
    embedHtml: '',
  };
}

async function fetchOgHtmlViaProxy(url) {
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxy);
  if (!res.ok) throw new Error(`OG proxy ${res.status}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const get = (sel, attr = 'content') =>
    doc.querySelector(sel)?.getAttribute(attr) || '';
  const title =
    get('meta[property="og:title"]') ||
    get('meta[name="twitter:title"]') ||
    doc.querySelector('title')?.textContent ||
    '';
  const description =
    get('meta[property="og:description"]') ||
    get('meta[name="description"]') ||
    '';
  const image =
    get('meta[property="og:image"]') ||
    get('meta[name="twitter:image"]') ||
    '';
  const siteName = get('meta[property="og:site_name"]') || '';
  return {
    url,
    fetchedAt: new Date().toISOString(),
    title: title.trim(),
    description: description.trim(),
    image,
    siteName,
    type: get('meta[property="og:type"]') || 'website',
    provider: 'og-html',
    embedHtml: '',
  };
}

/**
 * Always attempts a live fetch (for archive refresh).
 * @param {string} url
 */
export async function fetchOgMetadata(url) {
  if (isYouTubeUrl(url)) {
    try {
      return await fetchYouTubeOembed(url);
    } catch {
      /* fall through */
    }
  }
  try {
    return await fetchMicrolink(url);
  } catch {
    /* fall through */
  }
  try {
    return await fetchOgHtmlViaProxy(url);
  } catch {
    return {
      url,
      fetchedAt: new Date().toISOString(),
      title: url,
      description: '',
      image: '',
      siteName: '',
      type: 'website',
      provider: 'fallback',
      embedHtml: '',
    };
  }
}

/**
 * Read OG from IndexedDB, then day-file archive. No network.
 * @returns {Promise<{ urlHash: string, key: string, data: object } | null>}
 */
export async function readCachedOg(url, storage) {
  const urlHash = await hashUrl(url);
  const key = ogArchiveKey(urlHash);

  const idb = await getCachedOg(urlHash);
  if (idb?.data) return { urlHash, key, data: idb.data };

  if (storage?.readArchive) {
    try {
      const archived = await storage.readArchive(key);
      if (archived) {
        // Warm IDB for next paint.
        void cacheOg(urlHash, archived);
        return { urlHash, key, data: archived };
      }
    } catch {
      /* ignore */
    }
  }

  return null;
}

/**
 * Live fetch + write IDB / archive.
 * @returns {Promise<object>} OG payload
 */
export async function refreshAndArchiveOg(url, storage, { urlHash, key } = {}) {
  const hash = urlHash || (await hashUrl(url));
  const archiveKey = key || ogArchiveKey(hash);
  const fresh = await fetchOgMetadata(url);
  await cacheOg(hash, fresh);
  if (storage?.writeArchive) {
    try {
      await storage.writeArchive(archiveKey, fresh);
    } catch {
      /* ignore archive write errors for UI */
    }
  }
  return fresh;
}

/**
 * Stale-while-revalidate: return cache immediately when present; refresh network
 * in the background and call `onUpdate` with the fresh result.
 *
 * @param {string} url
 * @param {{
 *   readArchive: (key: string) => Promise<object|null>,
 *   writeArchive: (key: string, data: object) => Promise<void>,
 * }} storage
 * @param {{ onUpdate?: (payload: { urlHash: string, key: string, data: object, fromArchive: boolean }) => void }} [options]
 */
export async function loadAndArchiveOg(url, storage, options = {}) {
  const { onUpdate } = options;
  const cached = await readCachedOg(url, storage);

  const fallback = {
    url,
    fetchedAt: new Date().toISOString(),
    title: url,
    description: '',
    image: '',
    siteName: '',
    type: 'website',
    provider: 'fallback',
    embedHtml: '',
  };

  if (cached?.data) {
    const urlHash = cached.urlHash;
    const key = cached.key;
    void (async () => {
      try {
        const fresh = await refreshAndArchiveOg(url, storage, { urlHash, key });
        onUpdate?.({
          urlHash,
          key,
          data: fresh,
          fromArchive: false,
        });
      } catch {
        /* keep showing cached card */
      }
    })();
    return {
      urlHash,
      key,
      data: cached.data,
      fromArchive: true,
    };
  }

  const urlHash = await hashUrl(url);
  const key = ogArchiveKey(urlHash);
  let fresh = null;
  try {
    fresh = await refreshAndArchiveOg(url, storage, { urlHash, key });
  } catch {
    fresh = null;
  }

  return {
    urlHash,
    key,
    data: fresh || fallback,
    fromArchive: false,
  };
}

