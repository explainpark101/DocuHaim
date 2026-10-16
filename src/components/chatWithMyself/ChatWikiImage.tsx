import { useEffect, useRef, useState } from 'react';
import { peekResolvedWikiImageUrl, resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { parseWikiImageInner } from '@/utils/wikiImageSyntax';
import { useChatImageLightbox } from '@/components/chatWithMyself/ChatImageLightbox';
import RetainedChatImage from '@/components/chatWithMyself/RetainedChatImage';
import { normalizeCssHexColor } from '@/utils/cssColor';

type ChatWikiImageProps = {
  path: string;
  background?: string | null;
  getPresignedUrl?: ((path: string) => Promise<string | null>) | null;
};

/**
 * Resolve and display a chat wiki image ![[path]] / ![[path|bg=#hex]].
 * A resolved URL stays mounted via RetainedChatImage across list recycling.
 */
export default function ChatWikiImage({
  path,
  background,
  getPresignedUrl,
}: ChatWikiImageProps) {
  const parsed = parseWikiImageInner(path) || { path, background: null };
  const storagePath = parsed.path || path;
  const displayBg = normalizeCssHexColor(background ?? parsed.background);
  const [url, setUrl] = useState<string | null>(() =>
    peekResolvedWikiImageUrl(storagePath),
  );
  const [failed, setFailed] = useState(false);
  const urlRef = useRef(url);
  urlRef.current = url;
  const openChatImage = useChatImageLightbox();

  useEffect(() => {
    let cancelled = false;
    const remembered = peekResolvedWikiImageUrl(storagePath);
    if (remembered) {
      setUrl(remembered);
      setFailed(false);
      return undefined;
    }
    if (!storagePath || !getPresignedUrl) {
      if (!urlRef.current) setFailed(true);
      return undefined;
    }
    resolveWikiImageUrl(storagePath, getPresignedUrl)
      .then((resolved: string | null) => {
        if (cancelled) return;
        if (resolved) {
          setUrl(resolved);
          setFailed(false);
        } else if (!urlRef.current) {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled && !urlRef.current) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [storagePath, getPresignedUrl]);

  if (failed && !url) {
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
      style={displayBg ? { backgroundColor: displayBg } : undefined}
      onClick={(e) => {
        e.stopPropagation();
        openChatImage?.(url, { alt: storagePath || '', backgroundColor: displayBg });
      }}
      aria-label="이미지 크게 보기"
    >
      <RetainedChatImage
        src={url}
        alt=""
        className="max-h-64 max-w-full rounded-md object-contain"
        {...(displayBg ? { backgroundColor: displayBg } : {})}
      />
    </button>
  );
}
