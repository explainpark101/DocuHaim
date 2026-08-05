import { useEffect } from 'react';
import {
  hydrateStorageImagesInRoot,
  markdownLikelyHasStorageImages,
} from '@/utils/storageImageHydration';

/**
 * Wiki `![[path]]` and standard markdown storage images hydration.
 * @param {{ current: HTMLElement | null }} rootRef
 * @param {string} value
 * @param {(path: string) => Promise<string|null>} [getPresignedUrl]
 * @param {string | null} [currentNotePath]
 */
export function useWikiImageHydration(rootRef, value, getPresignedUrl, currentNotePath = null) {
  useEffect(() => {
    if (!getPresignedUrl || !value) return;

    const runHydration = () => {
      const root = rootRef?.current;
      const scopedCount = hydrateStorageImagesInRoot(root, {
        getPresignedUrl,
        currentNotePath,
      });
      if (scopedCount > 0) return;
      if (!markdownLikelyHasStorageImages(value)) return;
      hydrateStorageImagesInRoot(document, {
        getPresignedUrl,
        currentNotePath,
      });
    };

    const delays = [100, 350, 700, 1200];
    const timers = delays.map((delay) => setTimeout(runHydration, delay));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [value, getPresignedUrl, rootRef, currentNotePath]);
}
