import { useEffect, useState } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';

type KanbanCoverImageProps = {
  path: string | null | undefined;
  /** Same resolver shape as NoteEditor / wiki images. */
  resolveUrl?:
    | ((path: string) => Promise<string | null | undefined>)
    | ((...args: unknown[]) => unknown)
    | undefined;
  className?: string;
  /** Compact strip for column header vs taller card cover. */
  variant?: 'column' | 'card';
};

/**
 * Resolve a vault cover path to an object/presigned URL and render a thumbnail.
 */
export default function KanbanCoverImage({
  path,
  resolveUrl,
  className = '',
  variant = 'card',
}: KanbanCoverImageProps) {
  const [url, setUrl] = useState<string | null>(null);
  const heightClass = variant === 'column' ? 'h-10' : 'h-24';

  useEffect(() => {
    let cancelled = false;
    setUrl(null);
    const p = String(path || '').trim();
    if (!p || !resolveUrl) return undefined;

    const run = async () => {
      try {
        const raw = await Promise.resolve(resolveUrl(p));
        const next =
          typeof raw === 'string' && raw.trim()
            ? raw.trim()
            : await resolveWikiImageUrl(
                p,
                resolveUrl as (path: string) => Promise<string | null>,
              );
        if (!cancelled) setUrl(next || null);
      } catch {
        if (!cancelled) setUrl(null);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [path, resolveUrl]);

  if (!path) return null;
  if (!url) {
    return (
      <div
        className={`${heightClass} w-full animate-pulse bg-gray-200/80 dark:bg-odp-focusBg ${className}`.trim()}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`${heightClass} w-full overflow-hidden bg-gray-100 dark:bg-odp-bgSoft ${className}`.trim()}
    >
      <img
        src={url}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}
