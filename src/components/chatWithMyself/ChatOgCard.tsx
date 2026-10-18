import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ExternalLink, Link2, Play } from 'lucide-react';
import {
  isYouTubeUrl,
  loadAndArchiveOg,
  reloadOgCache,
  type OgPayload,
} from '@/utils/chatWithMyself/og';
import { canonicalOgFetchUrl } from '@/utils/chatWithMyself/ogIdentity';
import { useChatImageLightbox } from '@/components/chatWithMyself/ChatImageLightbox';
import RetainedChatImage from '@/components/chatWithMyself/RetainedChatImage';
import { forgetRetainedChatImages } from '@/utils/chatWithMyself/retainedChatImage';
import { useOpenLinksInNewWindow } from '@/components/chatWithMyself/ChatUiPrefsContext';
import { bindPreserveScrollOnHeightChange } from '@/utils/chatWithMyself/preserveScrollOnHeightChange';

type ChatOgCardProps = {
  /** Fetch / cache URL. YouTube timestamps are canonicalized inside the loader. */
  url: string;
  /** Click target. Defaults to `url` (keeps the first `t=` the author pasted). */
  href?: string;
  /** Bubble-stored preview. Skips the network until `reloadKey` changes. */
  seed?: OgPayload | null;
  onResolved?: (data: OgPayload) => void;
  ogStorage?: object;
  compact?: boolean;
  allowEmbed?: boolean;
  /** Bump (while mounted) to force-refresh OG from the network. */
  reloadKey?: number;
};

/**
 * Skeleton matching the loaded card footprint so virtua row height does not
 * jump when OG metadata / image arrives (avoids stick-bottom scroll fights).
 */
function OgCardSkeleton({ compact }: { compact: boolean }) {
  if (compact) {
    return (
      <div
        className="mt-1.5 flex max-w-full items-center gap-2 overflow-hidden rounded-md border border-black/10 bg-white/80 px-2 py-1.5 dark:border-white/15 dark:bg-odp-bgSoft/90"
        aria-hidden
      >
        <div className="h-10 w-10 shrink-0 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-2 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10" />
          <div className="h-3 w-3/4 max-w-48 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-2 max-w-full min-w-0 overflow-hidden rounded-md border border-black/10 bg-white/80 dark:border-white/15 dark:bg-odp-bgSoft/90"
      aria-busy="true"
      aria-label="링크 미리보기 불러오는 중"
      role="status"
    >
      {/* Same aspect as final OG image / YouTube frame — reserve height first. */}
      <div className="aspect-video w-full animate-pulse bg-gray-100 dark:bg-odp-surface" />
      <div className="space-y-2 px-2.5 py-2">
        <div className="h-2 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-[88%] animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  );
}

const ogMemoryByUrl = new Map<string, OgPayload>();

function rememberChatOg(url: string, data: OgPayload) {
  ogMemoryByUrl.set(url, data);
}

/** Empty media slot — same aspect-video as skeleton / image card (CLS-stable). */
function OgMediaPlaceholder() {
  return (
    <div
      className="flex aspect-video w-full items-center justify-center bg-gray-100 text-gray-400 dark:bg-odp-surface dark:text-gray-500"
      aria-hidden
    >
      <Link2 size={28} strokeWidth={1.5} />
    </div>
  );
}

/**
 * OG / YouTube card rendered inside a chat bubble (bottom attached).
 * Height stays reserved across loading → loaded (with or without image) so
 * off-screen / overscan OG hydration does not shift the virtua scroll offset.
 */
export default function ChatOgCard({
  url,
  href,
  seed = null,
  onResolved,
  ogStorage,
  compact = false,
  allowEmbed = true,
  reloadKey = 0,
}: ChatOgCardProps) {
  const cacheKey = canonicalOgFetchUrl(url) || url;
  const linkHref = href || url;
  const seedKey = seed
    ? `${seed.fetchedAt}|${seed.provider}|${seed.title}|${seed.image}|${seed.url}`
    : '';
  const onResolvedRef = useRef(onResolved);
  onResolvedRef.current = onResolved;
  const [data, setData] = useState<OgPayload | null>(
    () => seed ?? ogMemoryByUrl.get(cacheKey) ?? null,
  );
  const [loading, setLoading] = useState(
    () => !seed && !ogMemoryByUrl.has(cacheKey),
  );
  const [showEmbed, setShowEmbed] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const prevReloadKeyRef = useRef(reloadKey);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const openChatImage = useChatImageLightbox();
  const openInNewWindow = useOpenLinksInNewWindow();
  const linkTargetProps = openInNewWindow
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  // Start network fetch only near the viewport (overscan still mounts rows).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: '320px 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const shouldForce = reloadKey > prevReloadKeyRef.current;
    // Keep the reload bump until the card is near the viewport.
    if (shouldForce && !nearViewport) return undefined;
    prevReloadKeyRef.current = reloadKey;

    const load = async ({ force = false } = {}) => {
      if (!force && seed) {
        rememberChatOg(cacheKey, seed);
        setData(seed);
        setLoading(false);
        onResolvedRef.current?.(seed);
        return;
      }
      if (!nearViewport) return;
      if (!force) {
        const remembered = ogMemoryByUrl.get(cacheKey);
        if (remembered) {
          setData(remembered);
          setLoading(false);
          onResolvedRef.current?.(remembered);
          return;
        }
      } else {
        const previous = ogMemoryByUrl.get(cacheKey);
        ogMemoryByUrl.delete(cacheKey);
        if (previous?.image) forgetRetainedChatImages(previous.image);
      }
      setLoading(true);
      setShowEmbed(false);
      // Drop stale card so we keep the reserved skeleton height instead of
      // flashing a differently sized previous OG while the next one loads.
      setData(null);
      try {
        const next = force
          ? await reloadOgCache(cacheKey, ogStorage)
          : (await loadAndArchiveOg(cacheKey, ogStorage)).data;
        if (!cancelled) {
          const resolved: OgPayload = (next as OgPayload | null) ?? {
            url: cacheKey,
            fetchedAt: '',
            title: cacheKey,
            description: '',
            image: '',
            siteName: '',
            type: '',
            provider: '',
            embedHtml: '',
          };
          rememberChatOg(cacheKey, resolved);
          setData(resolved);
          setLoading(false);
          onResolvedRef.current?.(resolved);
        }
      } catch {
        if (!cancelled) {
          const fallback: OgPayload = {
            url: cacheKey,
            fetchedAt: '',
            title: cacheKey,
            description: '',
            image: '',
            siteName: '',
            type: '',
            provider: '',
            embedHtml: '',
          };
          rememberChatOg(cacheKey, fallback);
          setData(fallback);
          setLoading(false);
          onResolvedRef.current?.(fallback);
        }
      }
    };

    void load({ force: shouldForce });

    return () => {
      cancelled = true;
    };
    // ogStorage identity may change; archive adapters are equivalent for a given url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, reloadKey, nearViewport, seedKey]);

  useEffect(() => {
    if (!allowEmbed) setShowEmbed(false);
  }, [allowEmbed]);

  // Belt-and-suspenders: if height still changes above the viewport, keep offset.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    return bindPreserveScrollOnHeightChange(el, { rootMarginTopPx: 0 });
  }, [loading, data, compact, showEmbed]);

  const body =
    loading || !data ? (
      <OgCardSkeleton compact={compact} />
    ) : compact ? (
      <a
        href={linkHref}
        {...linkTargetProps}
        className="mt-1.5 flex max-w-full items-center gap-2 overflow-hidden rounded-md border border-black/10 bg-white/80 px-2 py-1.5 text-left dark:border-white/15 dark:bg-odp-bgSoft/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Always reserve thumb slot (matches skeleton) even without image. */}
        {data.image ? (
          <button
            type="button"
            className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-odp-surface"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openChatImage?.(data.image!, { alt: data.title || linkHref });
            }}
            aria-label="이미지 크게 보기"
          >
            <RetainedChatImage
              src={data.image}
              alt=""
              className="h-10 w-10 object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ) : (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-400 dark:bg-odp-surface dark:text-gray-500"
            aria-hidden
          >
            <Link2 size={16} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          {data.siteName ? (
            <div className="truncate text-[10px] uppercase tracking-wide text-gray-500">
              {data.siteName}
            </div>
          ) : null}
          <div className="truncate text-xs font-semibold text-gray-900 dark:text-odp-fgStrong">
            {data.title || linkHref}
          </div>
        </div>
        <ExternalLink size={12} className="shrink-0 text-gray-400" />
      </a>
    ) : (
      <div className="mt-2 max-w-full min-w-0 overflow-hidden rounded-md border border-black/10 bg-white/80 text-left dark:border-white/15 dark:bg-odp-bgSoft/90">
        {/* Always keep aspect-video media band so height matches skeleton. */}
        {showEmbed && allowEmbed && isYouTubeUrl(url) && data.embedHtml ? (
          <div
            className="aspect-video w-full bg-black [&_iframe]:h-full [&_iframe]:w-full"
            // oEmbed HTML from YouTube
            dangerouslySetInnerHTML={{ __html: data.embedHtml }}
          />
        ) : data.image ? (
          <button
            type="button"
            className="relative block aspect-video w-full overflow-hidden bg-gray-100 dark:bg-odp-surface"
            onClick={(e) => {
              e.stopPropagation();
              if (isYouTubeUrl(url) && data.embedHtml) {
                setShowEmbed(true);
                return;
              }
              openChatImage?.(data.image!, { alt: data.title || linkHref });
            }}
            aria-label={isYouTubeUrl(url) ? '동영상 재생' : '이미지 크게 보기'}
          >
            <RetainedChatImage
              src={data.image}
              alt=""
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isYouTubeUrl(url) ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                <span className="rounded-full bg-red-600 p-2 text-white shadow">
                  <Play size={22} fill="currentColor" />
                </span>
              </span>
            ) : null}
          </button>
        ) : (
          <OgMediaPlaceholder />
        )}
        <a
          href={linkHref}
          {...linkTargetProps}
          className="block px-2.5 py-2 transition hover:bg-black/5 dark:hover:bg-white/5"
        >
          <div className="flex items-start gap-1.5">
            <div className="min-w-0 flex-1">
              {data.siteName ? (
                <div className="truncate text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {data.siteName}
                </div>
              ) : null}
              <div className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">
                {data.title || linkHref}
              </div>
              {data.description ? (
                <div className="mt-0.5 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                  {data.description}
                </div>
              ) : null}
            </div>
            <ExternalLink size={14} className="mt-1 shrink-0 text-gray-400" />
          </div>
        </a>
      </div>
    );

  return (
    <div ref={rootRef} className="min-w-0 max-w-full [overflow-anchor:none]">
      {body}
    </div>
  );
}
