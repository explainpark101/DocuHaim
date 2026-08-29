/**
 * In-memory cache for rendered Mermaid SVG markup.
 * Preview re-parses markdown on every edit; reuse SVG when source + theme match.
 */

const MAX_ENTRIES = 64;

type CacheEntry = {
  svgHtml: string;
  source: string;
};

const cache = new Map<string, CacheEntry>();

/** Fast sync fingerprint for cache keys (not for security). */
export function mermaidSourceFingerprint(source: string): string {
  const text = String(source || '');
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    h ^= code;
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

export function mermaidRenderCacheKey(theme: string, source: string): string {
  return `${theme}:${mermaidSourceFingerprint(source)}:${source.length}`;
}

export function getCachedMermaidSvg(theme: string, source: string): string | null {
  const entry = cache.get(mermaidRenderCacheKey(theme, source));
  if (!entry || entry.source !== source) return null;
  return entry.svgHtml;
}

export function setCachedMermaidSvg(
  theme: string,
  source: string,
  svgHtml: string,
): void {
  const key = mermaidRenderCacheKey(theme, source);
  if (cache.has(key)) cache.delete(key);
  cache.set(key, { svgHtml, source });
  while (cache.size > MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest == null) break;
    cache.delete(oldest);
  }
}

export function clearMermaidRenderCache(): void {
  cache.clear();
}
