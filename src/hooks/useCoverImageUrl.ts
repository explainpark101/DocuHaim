import { useEffect, useState } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { isInlineOrRemoteImageSrc } from '@/utils/storageImagePath';

type Resolver = ((path: string) => Promise<string | null>) | null | undefined;

/**
 * Sync display src for cover images that need no storage lookup
 * (`data:` / http(s) / blob — e.g. single-file base64 export).
 */
export function peekCoverImageUrl(path: string | null | undefined): string | null {
  const trimmed = String(path ?? '').trim();
  if (!trimmed) return null;
  return isInlineOrRemoteImageSrc(trimmed) ? trimmed : null;
}

/**
 * Resolve a vault image path to a display URL for cover elements / backgrounds.
 * Inline data:/http(s)/blob URLs are returned synchronously so preview/print
 * still show images when CoverSlide remounts before an async effect settles.
 */
export function useCoverImageUrl(
  path: string | null | undefined,
  getPresignedUrl: Resolver,
): string | null {
  const trimmed = String(path ?? '').trim();
  const inline = peekCoverImageUrl(trimmed);
  const [url, setUrl] = useState<string | null>(() => inline);

  useEffect(() => {
    if (!trimmed) {
      setUrl(null);
      return;
    }
    if (isInlineOrRemoteImageSrc(trimmed)) {
      setUrl(trimmed);
      return;
    }
    let cancelled = false;
    setUrl(null);
    void resolveWikiImageUrl(trimmed, getPresignedUrl).then((resolved: string | null) => {
      if (!cancelled) setUrl(resolved || null);
    });
    return () => {
      cancelled = true;
    };
  }, [trimmed, getPresignedUrl]);

  if (inline) return inline;
  return url;
}
