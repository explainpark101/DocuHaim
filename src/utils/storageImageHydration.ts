import { peekResolvedWikiImageUrl, resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import {
  adoptRetainedChatImage,
  retainExternalChatImages,
  retargetRetainedChatImage,
} from '@/utils/chatWithMyself/retainedChatImage';
import {
  decodeMarkdownImageSrc,
  isStorageImageSrc,
  resolveStorageImagePath,
} from '@/utils/storageImagePath';

const MAX_RETRIES = 2;
const PLACEHOLDER_SRC_PREFIX = 'data:';

type HydrateOptions = {
  getPresignedUrl: (path: string) => Promise<string | null>;
  currentNotePath?: string | null;
};

function imgSrcMatches(img: HTMLImageElement, url: string): boolean {
  const attr = img.getAttribute('src') || '';
  return attr === url || img.src === url;
}

function applySrc(img: HTMLImageElement, path: string, url: string) {
  if (!imgSrcMatches(img, url)) {
    img.src = url;
  }
  img.dataset.storageHydrated = path;
  delete img.dataset.storageHydrating;
}

function isChatMessageImage(img: HTMLImageElement): boolean {
  return Boolean(img.closest('.chat-message-markdown'));
}

function bindRetainedChatStorageImage(
  img: HTMLImageElement,
  path: string,
  getPresignedUrl: (path: string) => Promise<string | null>,
) {
  if (!img.isConnected && img.dataset.chatRetain !== '1') return;

  const mem = peekResolvedWikiImageUrl(path);
  if (
    img.dataset.chatRetain === '1' &&
    img.dataset.storageHydrated === path &&
    mem &&
    img.dataset.chatRetainSrc === mem
  ) {
    return;
  }

  const mount = (url: string) => {
    const live = adoptRetainedChatImage(img, url, {
      path,
      className: img.className,
      alt: img.alt,
      styleAttr: img.getAttribute('style'),
      wikiPath: img.getAttribute('data-wiki-path'),
      mdSrc: img.getAttribute('data-md-src'),
    });
    live.onerror = () => {
      const tries = Number(live.dataset.storageHydrateTries || '0');
      if (tries >= MAX_RETRIES) return;
      live.dataset.storageHydrateTries = String(tries + 1);
      delete live.dataset.storageHydrated;
      void resolveWikiImageUrl(path, getPresignedUrl, { skipCache: true }).then(
        (next: string | null) => {
          if (!next) return;
          retargetRetainedChatImage(live, next, true);
          live.dataset.storageHydrated = path;
        },
      );
    };
  };

  if (mem) {
    mount(mem);
    return;
  }

  if (img.dataset.storageHydrating === path) return;
  img.dataset.storageHydrating = path;
  delete img.dataset.storageHydrated;

  void resolveWikiImageUrl(path, getPresignedUrl).then((url: string | null) => {
    delete img.dataset.storageHydrating;
    if (url) mount(url);
  });
}

function bindResolvedSrc(
  img: HTMLImageElement,
  path: string,
  getPresignedUrl: (path: string) => Promise<string | null>,
) {
  if (isChatMessageImage(img)) {
    bindRetainedChatStorageImage(img, path, getPresignedUrl);
    return;
  }

  const mem = peekResolvedWikiImageUrl(path);
  const attrSrc = img.getAttribute('src') || '';
  const hasRealSrc = Boolean(attrSrc) && !attrSrc.startsWith(PLACEHOLDER_SRC_PREFIX);

  // Already showing a resolved URL for this path — keep it (no reload).
  if (img.dataset.storageHydrated === path && hasRealSrc) {
    if (mem && !imgSrcMatches(img, mem)) {
      applySrc(img, path, mem);
    }
    return;
  }

  // Sync path: reuse remembered URL before paint / before async IDB.
  if (mem) {
    applySrc(img, path, mem);
    img.onerror = () => {
      delete img.dataset.storageHydrated;
      void resolveWikiImageUrl(path, getPresignedUrl, { skipCache: true }).then((url: string | null) => {
        if (url) applySrc(img, path, url);
      });
    };
    return;
  }

  // In-flight for the same path — avoid duplicate fetch storms.
  if (img.dataset.storageHydrating === path) return;

  img.dataset.storageHydrating = path;
  delete img.dataset.storageHydrated;

  let retryCount = 0;
  const finishFail = () => {
    if (img.dataset.storageHydrating === path) {
      delete img.dataset.storageHydrating;
    }
  };
  const setSrc = (url: string | null | undefined) => {
    if (url) {
      applySrc(img, path, url);
      return;
    }
    finishFail();
  };
  img.onerror = () => {
    delete img.dataset.storageHydrated;
    if (retryCount >= MAX_RETRIES) {
      finishFail();
      return;
    }
    retryCount += 1;
    img.dataset.storageHydrating = path;
    void resolveWikiImageUrl(path, getPresignedUrl, { skipCache: true }).then(setSrc);
  };
  void resolveWikiImageUrl(path, getPresignedUrl).then(setSrc);
}

/**
 * Fill wiki `![[path]]` and standard markdown `![](./relative.png)` images from storage.
 */
export function hydrateStorageImagesInRoot(
  root: ParentNode | null | undefined,
  { getPresignedUrl, currentNotePath }: HydrateOptions,
): number {
  if (!root || typeof getPresignedUrl !== 'function') return 0;

  const imgs = root.querySelectorAll('img');
  let count = 0;

  imgs.forEach((node) => {
    if (!(node instanceof HTMLImageElement)) return;

    const wikiPath = node.getAttribute('data-wiki-path');
    if (wikiPath) {
      bindResolvedSrc(node, wikiPath, getPresignedUrl);
      count += 1;
      return;
    }

    const rawSrc = node.getAttribute('data-md-src') || node.getAttribute('src') || '';
    if (!isStorageImageSrc(rawSrc)) return;
    const path = resolveStorageImagePath(rawSrc, currentNotePath);
    if (!path) return;
    if (!node.getAttribute('data-md-src')) {
      node.setAttribute('data-md-src', decodeMarkdownImageSrc(rawSrc));
    }
    bindResolvedSrc(node, path, getPresignedUrl);
    count += 1;
  });

  retainExternalChatImages(root);

  return count;
}

export function markdownLikelyHasStorageImages(value: string | null | undefined): boolean {
  const text = String(value || '');
  if (/!\[\[/.test(text)) return true;
  const imageRe = /!\[[^\]]*]\(([^)\n]+)\)/g;
  let match = imageRe.exec(text);
  while (match) {
    if (isStorageImageSrc(match[1] || '')) return true;
    match = imageRe.exec(text);
  }
  return false;
}
