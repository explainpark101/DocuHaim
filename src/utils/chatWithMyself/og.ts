import { cacheOg, deleteCachedOg, getCachedOg } from './chatDb.js';
import { ogArchiveKey } from './paths.js';
import { parseAppViewPath } from './format.js';
import { parseWikiImageInner } from '@/utils/wikiImageSyntax';
import {
  buildOgWorkerInspectUrl,
  loadOgWorkerUrl,
} from '@/utils/ogWorkerSettings';

const URL_RE = /https?:\/\/[^\s<>"'`)\]]+/gi;

const MD_LINK_RE =
  /\[([^\]]+)\]\(((?:\/view\/[^)\s]+|https?:\/\/[^)\s]+))\)/g;

export type OGData = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
};

export type OgPayload = {
  url: string;
  fetchedAt: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
  type: string;
  provider: string;
  embedHtml: string;
};

export type OgArchiveStorage = {
  readArchive?: (key: string) => Promise<OgPayload | null | undefined>;
  writeArchive?: (key: string, data: OgPayload) => Promise<void>;
};

export type ChatTextPart =
  | { type: 'text'; value: string }
  | { type: 'link'; value: string; label?: string }
  | { type: 'note'; path: string; name: string }
  | {
      type: 'wiki';
      value: string;
      path: string;
      background?: string | null;
    }
  | {
      type: 'file';
      path: string;
      name: string;
      size?: number | null;
    };

type OgHtmlProxy = {
  id: string;
  fetchHtml: (targetUrl: string) => Promise<string>;
};

type CachedOgRecord = {
  urlHash: string;
  key: string;
  data: OgPayload;
};

type LoadOgResult = CachedOgRecord & {
  fromArchive: boolean;
};

type ReloadBodyResult = {
  urls: string[];
  results: Array<{ url: string; ok: boolean; error?: string }>;
};

const OG_FETCH_INIT = Object.freeze({ cache: 'no-store' as RequestCache });

const inflightOgRefresh = new Map<string, Promise<OgPayload>>();

function trimUrlTrailingPunct(url: string): string {
  return String(url).replace(/[.,;:!?)]+$/, '');
}

export function extractUrls(text: string | null | undefined): string[] {
  if (!text) return [];
  const found = String(text).match(URL_RE) || [];
  const cleaned = found.map((u) => trimUrlTrailingPunct(u));
  return [...new Set(cleaned)];
}

function notePart(
  path: string | null | undefined,
  name?: string | null,
): Extract<ChatTextPart, { type: 'note' }> | null {
  const p = String(path || '')
    .replace(/^\/+/, '')
    .trim();
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
 */
function splitTextLinks(ts: string): ChatTextPart[] {
  const out: ChatTextPart[] = [];
  let last = 0;
  const mdRe = new RegExp(MD_LINK_RE.source, MD_LINK_RE.flags);
  let md: RegExpExecArray | null;
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
      } else if (label) {
        out.push({ type: 'link', value: url, label });
      } else {
        out.push({ type: 'link', value: url });
      }
    }
    last = md.index + md[0].length;
  }
  if (last < ts.length) out.push({ type: 'text', value: ts.slice(last) });
  if (!out.length) out.push({ type: 'text', value: ts });

  const parts: ChatTextPart[] = [];
  for (const chunk of out) {
    if (chunk.type !== 'text') {
      parts.push(chunk);
      continue;
    }
    const re = new RegExp(URL_RE.source, URL_RE.flags);
    let tLast = 0;
    let m: RegExpExecArray | null;
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
 */
export function splitTextWithUrls(
  text: string | null | undefined,
): ChatTextPart[] {
  const s = String(text ?? '');
  if (!s) return [{ type: 'text', value: '' }];

  // Images: ![[path]]  Files: [[file:...]]  Notes: [[note:path|name?]]
  const tokenRe =
    /!\[\[([^\]]+)\]\]|\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]|\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g;
  const coarse: ChatTextPart[] = [];
  let last = 0;
  let tm: RegExpExecArray | null;
  while ((tm = tokenRe.exec(s))) {
    if (tm.index > last) {
      coarse.push({ type: 'text', value: s.slice(last, tm.index) });
    }
    if (tm[1] != null) {
      const parsed = parseWikiImageInner(tm[1].trim()) as {
        path?: string;
        background?: string | null;
      } | null;
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
      const name = String(
        tm[3] || path.split('/').filter(Boolean).pop() || 'file',
      )
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

  const parts: ChatTextPart[] = [];
  for (const chunk of coarse) {
    if (chunk.type !== 'text') {
      parts.push(chunk);
      continue;
    }
    parts.push(...splitTextLinks(chunk.value || ''));
  }
  return parts.length ? parts : [{ type: 'text', value: s }];
}

export function isYouTubeUrl(url: string): boolean {
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

export async function hashUrl(url: string): Promise<string> {
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

function isBrowserOnline(): boolean {
  return typeof navigator === 'undefined' || navigator.onLine !== false;
}

function isFallbackOg(data: OgPayload | null | undefined): boolean {
  return !data || data.provider === 'fallback';
}

function hasOgContent(data: OgPayload | null | undefined): boolean {
  if (!data || isFallbackOg(data)) return false;
  return Boolean(
    String(data.title || '').trim() ||
      String(data.description || '').trim() ||
      String(data.image || '').trim() ||
      String(data.embedHtml || '').trim(),
  );
}

function makeFallbackOg(url: string): OgPayload {
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

async function fetchYouTubeOembed(url: string): Promise<OgPayload> {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(endpoint, OG_FETCH_INIT);
  if (!res.ok) throw new Error(`YouTube oEmbed ${res.status}`);
  const data = (await res.json()) as {
    title?: string;
    author_name?: string;
    thumbnail_url?: string;
    html?: string;
  };
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

async function fetchMicrolink(
  url: string,
  { force = false }: { force?: boolean } = {},
): Promise<OgPayload> {
  const params = new URLSearchParams({ url });
  if (force) params.set('force', 'true');
  const endpoint = `https://api.microlink.io/?${params.toString()}`;
  const res = await fetch(endpoint, OG_FETCH_INIT);
  if (!res.ok) throw new Error(`Microlink ${res.status}`);
  const json = (await res.json()) as {
    data?: {
      title?: string;
      description?: string;
      image?: { url?: string };
      logo?: { url?: string };
      publisher?: string;
      author?: string;
      type?: string;
      url?: string;
    };
  };
  const d = json?.data || {};
  const payload: OgPayload = {
    url: d.url || url,
    fetchedAt: new Date().toISOString(),
    title: d.title || '',
    description: d.description || '',
    image: d.image?.url || d.logo?.url || '',
    siteName: d.publisher || d.author || '',
    type: d.type || 'website',
    provider: 'microlink',
    embedHtml: '',
  };
  if (!hasOgContent(payload)) throw new Error('Microlink empty payload');
  return payload;
}

type SocialPreviewField = {
  value?: string | null;
  source?: string | null;
  status?: string;
};

type SocialPreviewInspectResponse = {
  url?: string;
  extracted?: {
    title?: string | null;
    description?: string | null;
    openGraph?: Record<string, string>;
    twitter?: Record<string, string>;
  };
  previews?: {
    openGraph?: { fields?: Record<string, SocialPreviewField> };
    twitter?: { fields?: Record<string, SocialPreviewField> };
  };
  error?: string;
  code?: string;
};

function previewFieldValue(
  fields: Record<string, SocialPreviewField> | undefined,
  key: string,
): string {
  return String(fields?.[key]?.value || '').trim();
}

/**
 * User-configured Cloudflare Worker (Social Preview Inspector).
 * GET {base}/inspect?url=…
 * @see https://cloudflare-experiments.com/docs/experiments/social-preview-inspector
 */
async function fetchOgViaCloudflareWorker(
  url: string,
  workerBaseUrl: string,
): Promise<OgPayload> {
  const endpoint = buildOgWorkerInspectUrl(workerBaseUrl, url);
  const res = await fetch(endpoint, OG_FETCH_INIT);
  if (!res.ok) throw new Error(`og-worker ${res.status}`);
  const data = (await res.json()) as SocialPreviewInspectResponse;
  if (data.error) {
    throw new Error(`og-worker: ${data.error}${data.code ? ` (${data.code})` : ''}`);
  }

  const extracted = data.extracted || {};
  const ogTags = extracted.openGraph || {};
  const twTags = extracted.twitter || {};
  const ogFields = data.previews?.openGraph?.fields;
  const twFields = data.previews?.twitter?.fields;

  const title =
    previewFieldValue(ogFields, 'title') ||
    ogTags['og:title'] ||
    twTags['twitter:title'] ||
    extracted.title ||
    '';
  const description =
    previewFieldValue(ogFields, 'description') ||
    ogTags['og:description'] ||
    twTags['twitter:description'] ||
    extracted.description ||
    '';
  const image =
    previewFieldValue(ogFields, 'image') ||
    ogTags['og:image'] ||
    twTags['twitter:image'] ||
    previewFieldValue(twFields, 'image') ||
    '';
  const siteName = ogTags['og:site_name'] || '';
  const type =
    previewFieldValue(ogFields, 'type') || ogTags['og:type'] || 'website';
  const canonical =
    previewFieldValue(ogFields, 'url') ||
    ogTags['og:url'] ||
    data.url ||
    url;

  const payload: OgPayload = {
    url: canonical,
    fetchedAt: new Date().toISOString(),
    title: String(title || '').trim(),
    description: String(description || '').trim(),
    image: String(image || '').trim(),
    siteName: String(siteName || '').trim(),
    type: String(type || 'website').trim() || 'website',
    provider: 'og-worker',
    embedHtml: '',
  };
  if (!hasOgContent(payload)) throw new Error('og-worker empty payload');
  return payload;
}

/**
 * Last-resort public API: https://www.opengraph.to/api (10 req/hour/IP).
 * @see https://www.opengraph.to/api
 */
async function fetchOpenGraphTo(url: string): Promise<OgPayload> {
  const endpoint = `https://www.opengraph.to/api/v1/og?url=${encodeURIComponent(url)}`;
  const res = await fetch(endpoint, OG_FETCH_INIT);
  if (res.status === 429) {
    throw new Error('opengraph.to rate limited');
  }
  if (!res.ok) throw new Error(`opengraph.to ${res.status}`);
  const data = (await res.json()) as {
    url?: string;
    title?: string;
    description?: string;
    siteName?: string;
    type?: string;
    image?: { url?: string } | null;
    twitter?: { image?: string; title?: string; description?: string };
    error?: string;
  };
  if (data.error) throw new Error(`opengraph.to: ${data.error}`);

  const image =
    data.image?.url ||
    data.twitter?.image ||
    '';
  const payload: OgPayload = {
    url: data.url || url,
    fetchedAt: new Date().toISOString(),
    title: data.title || data.twitter?.title || '',
    description: data.description || data.twitter?.description || '',
    image,
    siteName: data.siteName || '',
    type: data.type || 'website',
    provider: 'opengraph.to',
    embedHtml: '',
  };
  if (!hasOgContent(payload)) throw new Error('opengraph.to empty payload');
  return payload;
}

/**
 * CORS HTML proxies tried in order. Each returns the target page HTML.
 */
const OG_HTML_PROXIES: readonly OgHtmlProxy[] = Object.freeze([
  {
    id: 'corsproxy.io',
    async fetchHtml(targetUrl: string) {
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyUrl, OG_FETCH_INIT);
      if (!res.ok) throw new Error(`corsproxy.io ${res.status}`);
      const html = await res.text();
      if (!String(html || '').trim()) {
        throw new Error('corsproxy.io empty body');
      }
      return html;
    },
  },
  {
    id: 'allorigins.win',
    async fetchHtml(targetUrl: string) {
      // allorigins.win returns JSON { contents: "<html>..." } (CORS-unlocked).
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyUrl, OG_FETCH_INIT);
      if (!res.ok) throw new Error(`allorigins.win ${res.status}`);
      const data = (await res.json()) as { contents?: string };
      const html = String(data?.contents ?? '');
      if (!html.trim()) throw new Error('allorigins.win empty body');
      return html;
    },
  },
]);

function absolutizeUrl(
  maybeRelative: string | null | undefined,
  baseUrl: string,
): string {
  const raw = String(maybeRelative || '').trim();
  if (!raw) return '';
  try {
    return new URL(raw, baseUrl).href;
  } catch {
    return raw;
  }
}

/**
 * Parse Open Graph / twitter / document meta from an HTML string.
 */
export function parseOpenGraphHtml(
  htmlString: string,
  targetUrl: string,
): OGData {
  const doc = new DOMParser().parseFromString(
    String(htmlString || ''),
    'text/html',
  );
  const getMetaProperty = (prop: string): string | undefined => {
    const content =
      doc.querySelector(`meta[property="${prop}"]`)?.getAttribute('content') ||
      doc.querySelector(`meta[name="${prop}"]`)?.getAttribute('content') ||
      '';
    const trimmed = String(content || '').trim();
    return trimmed || undefined;
  };

  const image =
    getMetaProperty('og:image') || getMetaProperty('twitter:image');
  const siteName = getMetaProperty('og:site_name');

  const result: OGData = {
    title:
      getMetaProperty('og:title') ||
      getMetaProperty('twitter:title') ||
      doc.querySelector('title')?.textContent?.trim() ||
      '',
    description:
      getMetaProperty('og:description') ||
      getMetaProperty('twitter:description') ||
      getMetaProperty('description') ||
      '',
    url: getMetaProperty('og:url') || targetUrl,
    type: getMetaProperty('og:type') || 'website',
  };
  if (image) result.image = absolutizeUrl(image, targetUrl);
  if (siteName) result.siteName = siteName;
  return result;
}

function ogDataHasContent(og: OGData | null | undefined): boolean {
  if (!og) return false;
  return Boolean(
    String(og.title || '').trim() ||
      String(og.description || '').trim() ||
      String(og.image || '').trim(),
  );
}

function toOgPayload(
  url: string,
  og: OGData & { provider?: string },
): OgPayload {
  return {
    url: og.url || url,
    fetchedAt: new Date().toISOString(),
    title: String(og.title || '').trim(),
    description: String(og.description || '').trim(),
    image: String(og.image || '').trim(),
    siteName: String(og.siteName || '').trim(),
    type: String(og.type || 'website').trim() || 'website',
    provider: og.provider || 'og-html',
    embedHtml: '',
  };
}

/**
 * Fetch page HTML via CORS proxies and extract Open Graph fields.
 * Proxy order: corsproxy.io → allorigins.win.
 */
export async function fetchOpenGraph(
  targetUrl: string,
): Promise<OGData & { provider: string }> {
  const url = String(targetUrl || '').trim();
  if (!url) throw new Error('Invalid OpenGraph url');

  let lastError: unknown = null;
  for (const proxy of OG_HTML_PROXIES) {
    try {
      const html = await proxy.fetchHtml(url);
      const og = parseOpenGraphHtml(html, url);
      if (!ogDataHasContent(og)) {
        throw new Error(`${proxy.id} empty OpenGraph`);
      }
      return {
        ...og,
        provider: `og-html:${proxy.id}`,
      };
    } catch (error) {
      lastError = error;
      console.error(`OpenGraph loading failed (${proxy.id}):`, error);
    }
  }

  if (lastError instanceof Error) throw lastError;
  throw new Error('OpenGraph loading failed');
}

async function fetchOpenGraphViaProxy(
  targetUrl: string,
  proxy: OgHtmlProxy,
): Promise<OgPayload> {
  const html = await proxy.fetchHtml(targetUrl);
  const og = parseOpenGraphHtml(html, targetUrl);
  if (!ogDataHasContent(og)) {
    throw new Error(`${proxy.id} empty OpenGraph`);
  }
  return toOgPayload(targetUrl, {
    ...og,
    provider: `og-html:${proxy.id}`,
  });
}

/** Higher = richer preview card. */
function scoreOgPayload(data: OgPayload, sourceUrl: string): number {
  const title = String(data.title || '').trim();
  const description = String(data.description || '').trim();
  const image = String(data.image || '').trim();
  const siteName = String(data.siteName || '').trim();
  const embedHtml = String(data.embedHtml || '').trim();
  let score = 0;
  if (title && title !== sourceUrl) score += 3;
  else if (title) score += 1;
  if (description) score += 2;
  if (image) score += 4;
  if (siteName) score += 1;
  if (embedHtml) score += 5;
  return score;
}

/** Good enough to stop trying more providers (title+image, or playable embed). */
function isStrongOg(data: OgPayload, sourceUrl: string): boolean {
  const title = String(data.title || '').trim();
  const image = String(data.image || '').trim();
  const embedHtml = String(data.embedHtml || '').trim();
  if (embedHtml && (title || image)) return true;
  if (image && title && title !== sourceUrl) return true;
  return scoreOgPayload(data, sourceUrl) >= 8;
}

function pickNonEmpty(
  payloads: OgPayload[],
  sourceUrl: string,
  field: keyof OgPayload,
  preferRealTitle = false,
): string {
  const ranked = [...payloads].sort(
    (a, b) => scoreOgPayload(b, sourceUrl) - scoreOgPayload(a, sourceUrl),
  );
  for (const p of ranked) {
    const value = String(p[field] || '').trim();
    if (!value) continue;
    if (preferRealTitle && value === sourceUrl) continue;
    return value;
  }
  if (preferRealTitle) {
    for (const p of ranked) {
      const value = String(p[field] || '').trim();
      if (value) return value;
    }
  }
  return '';
}

/**
 * Merge provider results so missing fields are filled from the next-best source.
 */
function mergeOgPayloads(sourceUrl: string, payloads: OgPayload[]): OgPayload {
  if (!payloads.length) {
    throw new Error('OG empty payload');
  }
  const providers = [
    ...new Set(payloads.map((p) => p.provider).filter(Boolean)),
  ];
  const best = [...payloads].sort(
    (a, b) => scoreOgPayload(b, sourceUrl) - scoreOgPayload(a, sourceUrl),
  )[0]!;

  return {
    url: pickNonEmpty(payloads, sourceUrl, 'url') || sourceUrl,
    fetchedAt: new Date().toISOString(),
    title: pickNonEmpty(payloads, sourceUrl, 'title', true),
    description: pickNonEmpty(payloads, sourceUrl, 'description'),
    image: pickNonEmpty(payloads, sourceUrl, 'image'),
    siteName: pickNonEmpty(payloads, sourceUrl, 'siteName'),
    type: pickNonEmpty(payloads, sourceUrl, 'type') || best.type || 'website',
    provider: providers.join('+') || best.provider,
    embedHtml: pickNonEmpty(payloads, sourceUrl, 'embedHtml'),
  };
}

function mergedIsStrong(
  sourceUrl: string,
  payloads: OgPayload[],
): boolean {
  if (!payloads.length) return false;
  return isStrongOg(mergeOgPayloads(sourceUrl, payloads), sourceUrl);
}

/**
 * Live fetch. Optional user Cloudflare Worker (Social Preview Inspector) runs
 * first when configured; then YouTube oEmbed, Microlink, HTML proxies,
 * opengraph.to. Merges richest fields; stops early on a strong preview.
 */
export async function fetchOgMetadata(
  url: string,
  options: { force?: boolean } = {},
): Promise<OgPayload> {
  const target = String(url || '').trim();
  if (!target) throw new Error('Invalid OG url');
  const force = Boolean(options.force);
  const collected: OgPayload[] = [];

  const tryProvider = async (
    label: string,
    run: () => Promise<OgPayload>,
  ): Promise<void> => {
    try {
      const payload = await run();
      if (hasOgContent(payload)) collected.push(payload);
    } catch (error) {
      console.error(`OpenGraph loading failed (${label}):`, error);
    }
  };

  // Preferred path when set in Settings — before every other provider.
  // Docs: https://cloudflare-experiments.com/docs/experiments/social-preview-inspector
  const workerBase = loadOgWorkerUrl();
  if (workerBase) {
    await tryProvider('og-worker', () =>
      fetchOgViaCloudflareWorker(target, workerBase),
    );
    if (mergedIsStrong(target, collected)) {
      return mergeOgPayloads(target, collected);
    }
  }

  if (isYouTubeUrl(target)) {
    await tryProvider('youtube-oembed', () => fetchYouTubeOembed(target));
    if (mergedIsStrong(target, collected)) {
      return mergeOgPayloads(target, collected);
    }
  }

  await tryProvider('microlink', () => fetchMicrolink(target, { force }));
  if (mergedIsStrong(target, collected)) {
    return mergeOgPayloads(target, collected);
  }

  for (const proxy of OG_HTML_PROXIES) {
    await tryProvider(`og-html:${proxy.id}`, () =>
      fetchOpenGraphViaProxy(target, proxy),
    );
    if (mergedIsStrong(target, collected)) {
      return mergeOgPayloads(target, collected);
    }
  }

  // Rate-limited (10/hour/IP) — only after other providers fail to get a strong card.
  // Docs: https://www.opengraph.to/api
  await tryProvider('opengraph.to', () => fetchOpenGraphTo(target));

  if (!collected.length) throw new Error('OpenGraph loading failed');
  const merged = mergeOgPayloads(target, collected);
  if (!hasOgContent(merged)) throw new Error('OG empty payload');
  return merged;
}

/**
 * Read OG from IndexedDB, then storage archive. Prefers non-fallback records.
 */
export async function readCachedOg(
  url: string,
  storage?: OgArchiveStorage | null,
): Promise<CachedOgRecord | null> {
  const urlHash = await hashUrl(url);
  const key = ogArchiveKey(urlHash);

  const idb = (await getCachedOg(urlHash)) as
    | { data?: OgPayload }
    | undefined;
  if (idb?.data && !isFallbackOg(idb.data)) {
    return { urlHash, key, data: idb.data };
  }

  if (storage?.readArchive) {
    try {
      const archived = await storage.readArchive(key);
      if (archived && !isFallbackOg(archived)) {
        void cacheOg(urlHash, archived);
        return { urlHash, key, data: archived };
      }
    } catch {
      /* ignore */
    }
  }

  if (idb?.data) return { urlHash, key, data: idb.data };
  return null;
}

async function refreshAndArchiveOgOnce(
  url: string,
  storage: OgArchiveStorage | null | undefined,
  options: { urlHash?: string; key?: string; force?: boolean } = {},
): Promise<OgPayload> {
  const hash = options.urlHash || (await hashUrl(url));
  const archiveKey = options.key || ogArchiveKey(hash);
  const fresh = await fetchOgMetadata(
    url,
    options.force != null ? { force: options.force } : {},
  );
  if (!hasOgContent(fresh)) {
    throw new Error('OG empty payload');
  }
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
 * Live fetch + write IDB / archive. Dedupes in-flight requests per URL.
 */
export async function refreshAndArchiveOg(
  url: string,
  storage?: OgArchiveStorage | null,
  options: { urlHash?: string; key?: string; force?: boolean } = {},
): Promise<OgPayload> {
  const existing = inflightOgRefresh.get(url);
  if (existing) return existing;

  const pending = refreshAndArchiveOgOnce(url, storage, {
    force: options.force ?? true,
    ...(options.urlHash ? { urlHash: options.urlHash } : {}),
    ...(options.key ? { key: options.key } : {}),
  }).finally(() => {
    if (inflightOgRefresh.get(url) === pending) inflightOgRefresh.delete(url);
  });
  inflightOgRefresh.set(url, pending);
  return pending;
}

/**
 * User-initiated OG reload: drop IDB cache + in-flight fetch, then force-refresh.
 */
export async function reloadOgCache(
  url: string,
  storage?: OgArchiveStorage | null,
): Promise<OgPayload> {
  const target = String(url || '').trim();
  if (!target) throw new Error('Invalid OG url');
  const urlHash = await hashUrl(target);
  const key = ogArchiveKey(urlHash);
  try {
    await deleteCachedOg(urlHash);
  } catch {
    /* ignore */
  }
  inflightOgRefresh.delete(target);
  return refreshAndArchiveOg(target, storage, { urlHash, key, force: true });
}

/**
 * Reload OG for every http(s) URL found in a message body.
 */
export async function reloadOgCacheForMessageBody(
  body: string | null | undefined,
  storage?: OgArchiveStorage | null,
): Promise<ReloadBodyResult> {
  const urls = extractUrls(body);
  const results: ReloadBodyResult['results'] = [];
  for (const url of urls) {
    try {
      await reloadOgCache(url, storage);
      results.push({ url, ok: true });
    } catch (e) {
      results.push({
        url,
        ok: false,
        error: String(
          e instanceof Error ? e.message : e || 'reload failed',
        ),
      });
    }
  }
  return { urls, results };
}

/**
 * Cache-first: return archived OG immediately. When online, re-fetch with a
 * fresh connection in the background and call `onUpdate`.
 */
export async function loadAndArchiveOg(
  url: string,
  storage?: OgArchiveStorage | null,
  options: {
    onUpdate?: (payload: LoadOgResult) => void;
  } = {},
): Promise<LoadOgResult> {
  const { onUpdate } = options;
  const cached = await readCachedOg(url, storage);
  const fallback = makeFallbackOg(url);

  const refreshInBackground = (urlHash: string, key: string) => {
    if (!isBrowserOnline()) return;
    void (async () => {
      try {
        const fresh = await refreshAndArchiveOg(url, storage, {
          urlHash,
          key,
          force: true,
        });
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
  };

  if (cached?.data) {
    const urlHash = cached.urlHash;
    const key = cached.key;
    refreshInBackground(urlHash, key);
    return {
      urlHash,
      key,
      data: cached.data,
      fromArchive: true,
    };
  }

  const urlHash = await hashUrl(url);
  const key = ogArchiveKey(urlHash);

  if (!isBrowserOnline()) {
    return {
      urlHash,
      key,
      data: fallback,
      fromArchive: false,
    };
  }

  try {
    const fresh = await refreshAndArchiveOg(url, storage, {
      urlHash,
      key,
      force: false,
    });
    return {
      urlHash,
      key,
      data: fresh,
      fromArchive: false,
    };
  } catch {
    return {
      urlHash,
      key,
      data: fallback,
      fromArchive: false,
    };
  }
}
