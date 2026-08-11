import { useEffect, useState } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';

type Resolver = ((path: string) => Promise<string | null>) | null | undefined;

/**
 * Resolve a vault image path to a display URL for cover elements / backgrounds.
 * Also accepts data:/http(s)/blob URLs from single-file (base64) exports.
 */
export function useCoverImageUrl(
  path: string | null | undefined,
  getPresignedUrl: Resolver,
): string | null {
  const [url, setUrl] = useState<string | null>(null);
  const trimmed = String(path ?? '').trim();

  useEffect(() => {
    if (!trimmed) {
      setUrl(null);
      return;
    }
    let cancelled = false;
    void resolveWikiImageUrl(trimmed, getPresignedUrl).then((resolved: string | null) => {
      if (!cancelled) setUrl(resolved || null);
    });
    return () => {
      cancelled = true;
    };
  }, [trimmed, getPresignedUrl]);

  return url;
}
