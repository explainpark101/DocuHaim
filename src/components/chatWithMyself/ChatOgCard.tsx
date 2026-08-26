import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import {
  isYouTubeUrl,
  loadAndArchiveOg,
  reloadOgCache,
} from '@/utils/chatWithMyself/og';
import { useChatImageLightbox } from '@/components/chatWithMyself/ChatImageLightbox';
import ChatImageFade from '@/components/chatWithMyself/ChatImageFade';
import { useOpenLinksInNewWindow } from '@/components/chatWithMyself/ChatUiPrefsContext';

/**
 * Skeleton matching the loaded card footprint so virtua row height does not
 * jump when OG metadata / image arrives (avoids stick-bottom scroll fights).
 */
function OgCardSkeleton({
  compact
}: any) {
  if (compact) {
    return (
      <div
        className="mt-1.5 flex max-w-full items-center gap-2 overflow-hidden rounded-md border border-black/10 bg-white/80 px-2 py-1.5 dark:border-white/15 dark:bg-odp-bgSoft/90"
        aria-hidden
      >
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="h-10 w-10 shrink-0 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="min-w-0 flex-1 space-y-1.5">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="h-2 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10" />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="h-3 w-3/4 max-w-48 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="aspect-video w-full animate-pulse bg-gray-100 dark:bg-odp-surface" />
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="space-y-2 px-2.5 py-2">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="h-2 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="h-4 w-[88%] animate-pulse rounded bg-black/10 dark:bg-white/10" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="h-3 w-full animate-pulse rounded bg-black/10 dark:bg-white/10" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="h-3 w-2/3 animate-pulse rounded bg-black/10 dark:bg-white/10" />
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

/**
 * OG / YouTube card rendered inside a chat bubble (bottom attached).
 * @param {{ url: string, ogStorage?: object, compact?: boolean, allowEmbed?: boolean, reloadKey?: number }} props
 */
export default function ChatOgCard({
  url,
  ogStorage,
  compact = false,
  allowEmbed = true,

  /** Bump (while mounted) to force-refresh OG from the network. */
  reloadKey = 0
}: any) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmbed, setShowEmbed] = useState(false);
  const prevReloadKeyRef = useRef(reloadKey);
  const openChatImage = useChatImageLightbox();
  const openInNewWindow = useOpenLinksInNewWindow();
  const linkTargetProps = openInNewWindow
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  useEffect(() => {
    let cancelled = false;
    const shouldForce = reloadKey > prevReloadKeyRef.current;
    prevReloadKeyRef.current = reloadKey;

    const preloadImage = (src: any) => new Promise((resolve) => {
      if (!src || typeof Image === 'undefined') {
        // @ts-expect-error TS(2794) FIXME: Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
        resolve();
        return;
      }
      const img = new Image();
      img.decoding = 'async';
      // @ts-expect-error TS(2794) FIXME: Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
      img.onload = () => resolve();
      // @ts-expect-error TS(2794) FIXME: Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
      img.onerror = () => resolve();
      img.referrerPolicy = 'no-referrer';
      img.src = src;
    });

    const load = async ({ force = false } = {}) => {
      setLoading(true);
      setShowEmbed(false);
      // Drop stale card so we keep the reserved skeleton height instead of
      // flashing a differently sized previous OG while the next one loads.
      setData(null);
      try {
        const next = force
          ? await reloadOgCache(url, ogStorage)
          : (await loadAndArchiveOg(url, ogStorage)).data;
        // Decode OG image while skeleton still holds aspect-video height.
        if (next?.image) {
          await preloadImage(next.image);
        }
        if (!cancelled) {
          // @ts-expect-error TS(2345) FIXME: Argument of type 'OgPayload' is not assignable to ... Remove this comment to see the full error message
          setData(next);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData({
            // @ts-expect-error TS(2345) FIXME: Argument of type '{ url: any; title: any; descript... Remove this comment to see the full error message
            url,
            title: url,
            description: '',
            image: '',
            siteName: '',
          });
          setLoading(false);
        }
      }
    };

    void load({ force: shouldForce });

    return () => {
      cancelled = true;
    };
    // ogStorage identity may change; archive adapters are equivalent for a given url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reloadKey]);

  useEffect(() => {
    if (!allowEmbed) setShowEmbed(false);
  }, [allowEmbed]);

  if (loading || !data) {
    return <OgCardSkeleton compact={compact} />;
  }

  const yt = isYouTubeUrl(url);

  if (compact) {
    return (
      <a
        href={url}
        {...linkTargetProps}
        className="mt-1.5 flex max-w-full items-center gap-2 overflow-hidden rounded-md border border-black/10 bg-white/80 px-2 py-1.5 text-left dark:border-white/15 dark:bg-odp-bgSoft/90"
        onClick={(e: any) => e.stopPropagation()}
      >
        // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
        // @ts-expect-error TS(2339) FIXME: Property 'image' does not exist on type 'never'.
        // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
        // @ts-expect-error TS(2339) FIXME: Property 'image' does not exist on type 'never'.
        {data.image ? (
          <button
            type="button"
            className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-odp-surface"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              // @ts-expect-error TS(2349) FIXME: This expression is not callable.
              openChatImage?.(data.image, { alt: data.title || url });
            }}
            aria-label="이미지 크게 보기"
          >
            <ChatImageFade
              // @ts-expect-error TS(2339) FIXME: Property 'image' does not exist on type 'never'.
              src={data.image}
              alt=""
              className="h-10 w-10 object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
        ) : null}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="min-w-0 flex-1">
          // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
          {data.siteName ? (
            <div className="truncate text-[10px] uppercase tracking-wide text-gray-500">
              // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
              {data.siteName}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
          ) : null}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="truncate text-xs font-semibold text-gray-900 dark:text-odp-fgStrong">
            // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
            // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type 'never'.
            // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
            // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type 'never'.
            {data.title || url}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
        <ExternalLink size={12} className="shrink-0 text-gray-400" />
      // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      </a>
    );
  }

  return (
    <div className="mt-2 max-w-full min-w-0 overflow-hidden rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-odp-bgSoft/90 text-left">
      // @ts-expect-error TS(2339): Property 'embedHtml' does not exist on type 'never... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'embedHtml' does not exist on type 'never... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'embedHtml' does not exist on type 'never... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'embedHtml' does not exist on type 'never... Remove this comment to see the full error message
      {showEmbed && allowEmbed && yt && data.embedHtml ? (
        <div
          className="aspect-video w-full bg-black [&_iframe]:h-full [&_iframe]:w-full"
          // oEmbed HTML from YouTube
          // @ts-expect-error TS(2339) FIXME: Property 'embedHtml' does not exist on type 'never... Remove this comment to see the full error message
          dangerouslySetInnerHTML={{ __html: data.embedHtml }}
        />
      // @ts-expect-error TS(2339) FIXME: Property 'image' does not exist on type 'never'.
      ) : data.image ? (
        <button
          type="button"
          className="relative block w-full aspect-video bg-gray-100 dark:bg-odp-surface overflow-hidden"
          onClick={(e: any) => {
            e.stopPropagation();
            // @ts-expect-error TS(2339) FIXME: Property 'embedHtml' does not exist on type 'never... Remove this comment to see the full error message
            if (yt && data.embedHtml) {
              setShowEmbed(true);
              return;
            }
            // @ts-expect-error TS(2349) FIXME: This expression is not callable.
            openChatImage?.(data.image, { alt: data.title || url });
          }}
          aria-label={yt ? '동영상 재생' : '이미지 크게 보기'}
        >
          {/* Parent aspect-video already reserves height; fade only paints pixels. */}
          <ChatImageFade
            // @ts-expect-error TS(2339) FIXME: Property 'image' does not exist on type 'never'.
            src={data.image}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          {yt ? (
            <span className="absolute inset-0 flex items-center justify-center bg-black/25">
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              <span className="rounded-full bg-red-600 p-2 text-white shadow">
                <Play size={22} fill="currentColor" />
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              </span>
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
          ) : null}
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      <a
        href={url}
        {...linkTargetProps}
        className="block px-2.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition"
      >
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex items-start gap-1.5">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="min-w-0 flex-1">
            // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
            {data.siteName ? (
              <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 truncate">
                // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'siteName' does not exist on type 'never'... Remove this comment to see the full error message
                {data.siteName}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            ) : null}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong line-clamp-2">
              // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
              // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type 'never'.
              // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
              // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type 'never'.
              {data.title || url}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
            // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
            {data.description ? (
              <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                {data.description}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            ) : null}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          <ExternalLink size={14} className="shrink-0 mt-1 text-gray-400" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      </a>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}
