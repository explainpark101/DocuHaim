import { useEffect, useState } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';

type Resolver = ((path: string) => Promise<string | null>) | null | undefined;

/**
 * Resolve a vault image path to a display URL for cover elements / backgrounds.
 */
export function useCoverImageUrl(
  path: string | null | undefined,
  getPresignedUrl: Resolver,
): string | null {
  const [url, setUrl] = useState<string | null>(null);
  const trimmed = String(path ?? '').trim();

  useEffect(() => {
    if (!trimmed || typeof getPresignedUrl !== 'function') {
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
