import { useEffect, useState } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { parseWikiImageInner } from '@/utils/wikiImageSyntax';
import { useChatImageLightbox } from '@/components/chatWithMyself/ChatImageLightbox';
import ChatImageFade from '@/components/chatWithMyself/ChatImageFade';
import { normalizeCssHexColor } from '@/utils/cssColor';

/**
 * Resolve and display a chat wiki image ![[path]] / ![[path|bg=#hex]].
 */
export default function ChatWikiImage({
  path,
  background,
  getPresignedUrl
}: any) {
  const parsed = parseWikiImageInner(path) || { path, background: null };
  const storagePath = parsed.path || path;
  const displayBg = normalizeCssHexColor(background ?? parsed.background);
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const openChatImage = useChatImageLightbox();

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setUrl(null);
    if (!storagePath || !getPresignedUrl) {
      setFailed(true);
      return undefined;
    }
    resolveWikiImageUrl(storagePath, getPresignedUrl)
      .then((u: any) => {
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
  }, [storagePath, getPresignedUrl]);

  if (failed) {
    return (
      <div className="mt-1 rounded border border-dashed border-gray-300 px-2 py-1 text-[11px] text-gray-400 dark:border-odp-borderSoft">
        이미지 로드 실패: {storagePath}
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
      style={(displayBg ? { backgroundColor: displayBg } : undefined) as any}
      onClick={(e: any) => {
        e.stopPropagation();
        openChatImage?.(url, { alt: storagePath || '', backgroundColor: displayBg });
      }}
      aria-label="이미지 크게 보기"
    >
      <ChatImageFade
        src={url || ''}
        alt=""
        className="max-h-64 max-w-full rounded-md object-contain"
        style={(displayBg ? { backgroundColor: displayBg } : undefined) as any}
        loading="lazy"
      />
    </button>
  );
}
