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
 * OG / YouTube card rendered inside a chat bubble (bottom attached).
 * @param {{ url: string, ogStorage?: object, compact?: boolean, allowEmbed?: boolean, reloadKey?: number }} props
 */
export default function ChatOgCard({
  url,
  ogStorage,
  compact = false,
  allowEmbed = true,
  /** Bump (while mounted) to force-refresh OG from the network. */
  reloadKey = 0,
}) {
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

    const load = async ({ force = false } = {}) => {
      setLoading(true);
      setShowEmbed(false);
      try {
        if (force) {
          const fresh = await reloadOgCache(url, ogStorage);
          if (!cancelled) {
            setData(fresh);
            setLoading(false);
          }
          return;
        }
        const result = await loadAndArchiveOg(url, ogStorage);
        if (!cancelled) {
          setData(result.data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData({
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

  if (loading && !data) {
    return (
      <div
        className={`mt-2 overflow-hidden rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 animate-pulse ${
          compact ? 'h-12' : 'h-20'
        }`}
      />
    );
  }

  if (!data) return null;

  const yt = isYouTubeUrl(url);

  if (compact) {
    return (
      <a
        href={url}
        {...linkTargetProps}
        className="mt-1.5 flex max-w-full items-center gap-2 overflow-hidden rounded-md border border-black/10 bg-white/80 px-2 py-1.5 text-left dark:border-white/15 dark:bg-odp-bgSoft/90"
        onClick={(e) => e.stopPropagation()}
      >
        {data.image ? (
          <button
            type="button"
            className="shrink-0 overflow-hidden rounded"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openChatImage?.(data.image, { alt: data.title || url });
            }}
            aria-label="이미지 크게 보기"
          >
            <ChatImageFade
              src={data.image}
              alt=""
              className="h-10 w-10 object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </button>
        ) : null}
        <div className="min-w-0 flex-1">
          {data.siteName ? (
            <div className="truncate text-[10px] uppercase tracking-wide text-gray-500">
              {data.siteName}
            </div>
          ) : null}
          <div className="truncate text-xs font-semibold text-gray-900 dark:text-odp-fgStrong">
            {data.title || url}
          </div>
        </div>
        <ExternalLink size={12} className="shrink-0 text-gray-400" />
      </a>
    );
  }

  return (
    <div className="mt-2 max-w-full min-w-0 overflow-hidden rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-odp-bgSoft/90 text-left">
      {showEmbed && allowEmbed && yt && data.embedHtml ? (
        <div
          className="aspect-video w-full bg-black [&_iframe]:h-full [&_iframe]:w-full"
          // oEmbed HTML from YouTube
          dangerouslySetInnerHTML={{ __html: data.embedHtml }}
        />
      ) : data.image ? (
        <button
          type="button"
          className="relative block w-full aspect-video bg-gray-100 dark:bg-odp-surface overflow-hidden"
          onClick={(e) => {
            e.stopPropagation();
            if (yt && data.embedHtml) {
              setShowEmbed(true);
              return;
            }
            openChatImage?.(data.image, { alt: data.title || url });
          }}
          aria-label={yt ? '동영상 재생' : '이미지 크게 보기'}
        >
          <ChatImageFade
            src={data.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {yt ? (
            <span className="absolute inset-0 flex items-center justify-center bg-black/25">
              <span className="rounded-full bg-red-600 p-2 text-white shadow">
                <Play size={22} fill="currentColor" />
              </span>
            </span>
          ) : null}
        </button>
      ) : null}
      <a
        href={url}
        {...linkTargetProps}
        className="block px-2.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition"
      >
        <div className="flex items-start gap-1.5">
          <div className="min-w-0 flex-1">
            {data.siteName ? (
              <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 truncate">
                {data.siteName}
              </div>
            ) : null}
            <div className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong line-clamp-2">
              {data.title || url}
            </div>
            {data.description ? (
              <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {data.description}
              </div>
            ) : null}
          </div>
          <ExternalLink size={14} className="shrink-0 mt-1 text-gray-400" />
        </div>
      </a>
    </div>
  );
}
