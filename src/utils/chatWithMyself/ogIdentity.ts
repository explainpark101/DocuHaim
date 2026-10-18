/**
 * Open Graph identity for chat bubbles.
 * Before fetch, only a definitive YouTube id is shared: video `v`
 * (or the same id in a youtu.be / embed / shorts / live path) or playlist `list`
 * when there is no video id. Other query params such as `t` are ignored for that id.
 * After fetch, cards collapse only when title and image are exactly the same strings.
 */

export type OgUrlGroup = {
  /** Stable identity before fetch (YouTube video id, otherwise the raw URL). */
  key: string;
  /** URL sent to OG providers and the archive cache. */
  fetchUrl: string;
  /** First link in the bubble; used as the card href. */
  displayUrl: string;
  urls: string[];
};

export type OgPayloadIdentityInput = {
  url?: string;
  title?: string;
  image?: string;
  siteName?: string;
  provider?: string;
};

const YT_VIDEO_ID_RE = /^[A-Za-z0-9_-]{6,}$/;
const YT_LIST_ID_RE = /^[A-Za-z0-9_-]{2,}$/;

function isYouTubeHost(hostname: string): boolean {
  return (
    /(^|\.)youtube\.com$/i.test(hostname) ||
    /(^|\.)youtu\.be$/i.test(hostname) ||
    /(^|\.)youtube-nocookie\.com$/i.test(hostname)
  );
}

function validVideoId(raw: string | null | undefined): string | null {
  const id = String(raw || '').trim();
  if (!YT_VIDEO_ID_RE.test(id)) return null;
  return id;
}

function validPlaylistId(raw: string | null | undefined): string | null {
  const id = String(raw || '').trim();
  if (!YT_LIST_ID_RE.test(id)) return null;
  return id;
}

/** Video id for watch / youtu.be / embed / shorts / live URLs. */
export function youtubeVideoId(url: string | null | undefined): string | null {
  const raw = String(url || '').trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (!isYouTubeHost(u.hostname)) return null;
    if (/(^|\.)youtu\.be$/i.test(u.hostname)) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return validVideoId(id);
    }
    const fromQuery = validVideoId(u.searchParams.get('v'));
    if (fromQuery) return fromQuery;
    const parts = u.pathname.split('/').filter(Boolean);
    const markers = new Set(['embed', 'shorts', 'live', 'v']);
    const markerAt = parts.findIndex((part) => markers.has(part.toLowerCase()));
    if (markerAt >= 0) return validVideoId(parts[markerAt + 1]);
    return null;
  } catch {
    return null;
  }
}

/** Playlist id from a YouTube `list` param. Ignored when a video id is also present. */
export function youtubePlaylistId(url: string | null | undefined): string | null {
  const raw = String(url || '').trim();
  if (!raw || youtubeVideoId(raw)) return null;
  try {
    const u = new URL(raw);
    if (!isYouTubeHost(u.hostname)) return null;
    return validPlaylistId(u.searchParams.get('list'));
  } catch {
    return null;
  }
}

/**
 * URL used for fetch + cache.
 * A YouTube video id collapses to `watch?v=`. A playlist id collapses to `playlist?list=`.
 */
export function canonicalOgFetchUrl(url: string | null | undefined): string {
  const raw = String(url || '').trim();
  if (!raw) return '';
  const videoId = youtubeVideoId(raw);
  if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
  const listId = youtubePlaylistId(raw);
  if (listId) return `https://www.youtube.com/playlist?list=${listId}`;
  return raw;
}

/**
 * Pre-fetch grouping key.
 * Same YouTube `v` (or path video id) or, with no video id, the same `list`.
 * Every other URL stays on its own until title and image match exactly.
 */
export function ogUrlIdentityKey(url: string | null | undefined): string {
  const raw = String(url || '').trim();
  const videoId = youtubeVideoId(raw);
  if (videoId) return `yt:v:${videoId}`;
  const listId = youtubePlaylistId(raw);
  if (listId) return `yt:list:${listId}`;
  return `url:${raw}`;
}

export function groupUrlsByOgIdentity(
  urls: readonly string[] | null | undefined,
): OgUrlGroup[] {
  const groups: OgUrlGroup[] = [];
  const index = new Map<string, OgUrlGroup>();
  for (const raw of urls || []) {
    const url = String(raw || '').trim();
    if (!url) continue;
    const key = ogUrlIdentityKey(url);
    const existing = index.get(key);
    if (existing) {
      if (!existing.urls.includes(url)) existing.urls.push(url);
      continue;
    }
    const group: OgUrlGroup = {
      key,
      fetchUrl: canonicalOgFetchUrl(url),
      displayUrl: url,
      urls: [url],
    };
    index.set(key, group);
    groups.push(group);
  }
  return groups;
}

/**
 * Identity of a fetched preview.
 * Collapse only when both title and image are non-empty and character-for-character equal.
 * `soloKey` keeps every other payload on its own source URL.
 */
export function ogPayloadIdentity(
  data: OgPayloadIdentityInput | null | undefined,
  soloKey?: string,
): string {
  const title = String(data?.title ?? '');
  const image = String(data?.image ?? '');
  if (title.trim() && image.trim()) return `exact:${title}\0${image}`;
  const solo = String(soloKey || data?.url || '').trim();
  return `solo:${solo}`;
}
