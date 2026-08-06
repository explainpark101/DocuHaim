import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import {
  decodeMarkdownImageSrc,
  isStorageImageSrc,
  resolveStorageImagePath,
} from '@/utils/storageImagePath';

const MAX_RETRIES = 2;

type HydrateOptions = {
  getPresignedUrl: (path: string) => Promise<string | null>;
  currentNotePath?: string | null;
};

function bindResolvedSrc(
  img: HTMLImageElement,
  path: string,
  getPresignedUrl: (path: string) => Promise<string | null>,
) {
  // Already showing a resolved URL for this path.
  if (img.dataset.storageHydrated === path && img.getAttribute('src') && !img.src.startsWith('data:')) {
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
      img.src = url;
      img.dataset.storageHydrated = path;
      delete img.dataset.storageHydrating;
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
