import { useEffect } from 'react';
import {
  hydrateStorageImagesInRoot,
  markdownLikelyHasStorageImages,
} from '@/utils/storageImageHydration';
import { PRINT_SETTINGS_STORE_CHANGED_EVENT } from '@/utils/printSettingsStore';

/**
 * Wiki `![[path]]` and standard markdown storage images hydration.
 * Retries when the preview DOM settles, storage accessors appear, or the
 * network comes back online (Export PDF refresh / HMR / reconnect).
 * @param {{ current: HTMLElement | null }} rootRef
 * @param {string} value
 * @param {(path: string) => Promise<string|null>} [getPresignedUrl]
 * @param {string | null} [currentNotePath]
 */
export function useWikiImageHydration(rootRef, value, getPresignedUrl, currentNotePath = null) {
  useEffect(() => {
    if (!getPresignedUrl || !value) return undefined;

    let rafId = 0;
    let cancelled = false;

    const runHydration = () => {
      if (cancelled) return;
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

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        runHydration();
      });
    };

    const delays = [0, 100, 350, 700, 1200, 2500];
    const timers = delays.map((delay) => setTimeout(runHydration, delay));

    const root = rootRef?.current;
    let mutationObserver = null;
    if (root && typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(schedule);
      mutationObserver.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-wiki-path', 'data-md-src'],
      });
    }

    const onOnline = () => schedule();
    const onStoreReady = () => schedule();
    window.addEventListener('online', onOnline);
    window.addEventListener(PRINT_SETTINGS_STORE_CHANGED_EVENT, onStoreReady);

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      timers.forEach((t) => clearTimeout(t));
      mutationObserver?.disconnect();
      window.removeEventListener('online', onOnline);
      window.removeEventListener(PRINT_SETTINGS_STORE_CHANGED_EVENT, onStoreReady);
    };
  }, [value, getPresignedUrl, rootRef, currentNotePath]);
}
