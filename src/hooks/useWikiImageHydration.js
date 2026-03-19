import { useEffect } from 'react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';

/**
 * ![[path]] 위키 이미지 hydration: DOM의 img[data-wiki-path]에 실제 URL 주입
 * @param {{ current: HTMLElement | null }} rootRef - 프리뷰 컨테이너 ref
 * @param {string} value - 마크다운 본문
 * @param {(path: string) => Promise<string|null>} [getPresignedUrl] - Pre-signed URL 반환 함수
 */
export function useWikiImageHydration(rootRef, value, getPresignedUrl) {
  useEffect(() => {
    if (!getPresignedUrl || !value) return;

    const runHydration = (attempt = 0) => {
      const root = rootRef?.current;
      let imgs = root ? root.querySelectorAll('img[data-wiki-path]') : [];
      if (imgs.length === 0) {
        const inDoc = document.querySelectorAll('img[data-wiki-path]');
        if (inDoc.length > 0) imgs = inDoc;
        else if (/!\[\[/.test(value) && attempt < 4) return;
      }
      const MAX_RETRIES = 1;
      imgs.forEach((img) => {
        const path = img.getAttribute('data-wiki-path');
        if (!path) return;
        let retryCount = 0;
        const setSrc = (url) => {
          if (url) img.src = url;
        };
        const loadWithFreshUrl = () => {
          if (retryCount >= MAX_RETRIES) return;
          retryCount += 1;
          resolveWikiImageUrl(path, getPresignedUrl, { skipCache: true }).then((url) => {
            if (url) setSrc(url);
          });
        };
        img.onerror = loadWithFreshUrl;
        resolveWikiImageUrl(path, getPresignedUrl).then((url) => {
          if (url) setSrc(url);
        });
      });
    };

    const delays = [100, 350, 700, 1200];
    const timers = delays.map((delay, i) =>
      setTimeout(() => runHydration(i), delay)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [value, getPresignedUrl, rootRef]);
}
