import { cacheOg, getCachedOg } from './chatDb.js';
import { ogArchiveKey } from './paths.js';

const URL_RE = /https?:\/\/[^\s<>"'`)\]]+/gi;

export function extractUrls(text) {
  if (!text) return [];
  const found = String(text).match(URL_RE) || [];
  const cleaned = found.map((u) => u.replace(/[.,;:!?)]+$/, ''));
  return [...new Set(cleaned)];
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
 * Load archived OG if any, then refresh live + archive via storage callbacks.
 * @param {string} url
 * @param {{
 *   readArchive: (key: string) => Promise<object|null>,
 *   writeArchive: (key: string, data: object) => Promise<void>,
 * }} storage
 */
export async function loadAndArchiveOg(url, storage) {
  const urlHash = await hashUrl(url);
  const key = ogArchiveKey(urlHash);

  let archived = null;
  const idb = await getCachedOg(urlHash);
  if (idb?.data) archived = idb.data;
  if (!archived && storage?.readArchive) {
    try {
      archived = await storage.readArchive(key);
    } catch {
      archived = null;
    }
  }

  let fresh = null;
  try {
    fresh = await fetchOgMetadata(url);
  } catch {
    fresh = null;
  }

  const result = fresh || archived || {
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

  if (fresh) {
    await cacheOg(urlHash, fresh);
    if (storage?.writeArchive) {
      try {
        await storage.writeArchive(key, fresh);
      } catch {
        /* ignore archive write errors for UI */
      }
    }
  }

  return { urlHash, key, data: result, fromArchive: !fresh && !!archived };
}
