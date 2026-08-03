import { useEffect, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { isYouTubeUrl, loadAndArchiveOg } from '@/utils/chatWithMyself/og.js';

/**
 * OG / YouTube card rendered inside a chat bubble (bottom attached).
 */
export default function ChatOgCard({ url, ogStorage }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const result = await loadAndArchiveOg(url, ogStorage);
        if (!cancelled) setData(result.data);
      } catch {
        if (!cancelled) {
          setData({
            url,
            title: url,
            description: '',
            image: '',
            siteName: '',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // ogStorage identity may change; archive adapters are equivalent for a given url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (loading && !data) {
    return (
      <div className="mt-2 overflow-hidden rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 animate-pulse h-20" />
    );
  }

  if (!data) return null;

  const yt = isYouTubeUrl(url);

  return (
    <div className="mt-2 overflow-hidden rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-odp-bgSoft/90 text-left">
      {showEmbed && yt && data.embedHtml ? (
        <div
          className="aspect-video w-full bg-black [&_iframe]:h-full [&_iframe]:w-full"
          // oEmbed HTML from YouTube
          dangerouslySetInnerHTML={{ __html: data.embedHtml }}
        />
      ) : data.image ? (
        <button
          type="button"
          className="relative block w-full aspect-video bg-gray-100 dark:bg-odp-surface overflow-hidden"
          onClick={() => {
            if (yt && data.embedHtml) setShowEmbed(true);
            else window.open(url, '_blank', 'noopener,noreferrer');
          }}
        >
          <img
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
        target="_blank"
        rel="noopener noreferrer"
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
