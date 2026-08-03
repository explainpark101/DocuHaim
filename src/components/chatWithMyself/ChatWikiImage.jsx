import { useEffect, useState } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { useChatImageLightbox } from '@/components/chatWithMyself/ChatImageLightbox';

/**
 * Resolve and display a chat wiki image ![[path]].
 */
export default function ChatWikiImage({ path, getPresignedUrl }) {
  const [url, setUrl] = useState(null);
  const [failed, setFailed] = useState(false);
  const openChatImage = useChatImageLightbox();

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setUrl(null);
    if (!path || !getPresignedUrl) {
      setFailed(true);
      return undefined;
    }
    resolveWikiImageUrl(path, getPresignedUrl)
      .then((u) => {
        if (!cancelled) {
          if (u) setUrl(u);
          else setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [path, getPresignedUrl]);

  if (failed) {
    return (
      <div className="mt-1 rounded border border-dashed border-gray-300 px-2 py-1 text-[11px] text-gray-400 dark:border-odp-borderSoft">
        이미지 로드 실패: {path}
      </div>
    );
  }

  if (!url) {
    return (
      <div className="mt-1 h-24 animate-pulse rounded-md bg-black/10 dark:bg-white/10" />
    );
  }

  return (
    <button
      type="button"
      className="mt-1 block max-w-full overflow-hidden rounded-md text-left"
      onClick={(e) => {
        e.stopPropagation();
        openChatImage?.(url, { alt: path || '' });
      }}
      aria-label="이미지 크게 보기"
    >
      <img
        src={url}
        alt=""
        className="max-h-64 max-w-full rounded-md object-contain"
        loading="lazy"
      />
    </button>
  );
}
