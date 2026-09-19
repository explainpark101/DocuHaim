import { useEffect, useRef, type RefObject } from 'react';
import {
  hydrateStorageImagesInRoot,
  markdownLikelyHasStorageImages,
} from '@/utils/storageImageHydration';
import { PRINT_SETTINGS_STORE_CHANGED_EVENT } from '@/utils/printSettingsStore';

export type UseWikiImageHydrationOptions = {
  /** When false, disconnect observers and skip hydrate passes (paused pane). */
  enabled?: boolean;
};

/**
 * Wiki `![[path]]` and standard markdown storage images hydration.
 * Retries when the preview DOM settles, storage accessors appear, or the
 * network comes back online (Export PDF refresh / HMR / reconnect).
 *
 * Does not tear down observers on every markdown `value` change — that would
 * delay re-binding and flash placeholders. DOM mutations drive re-hydrate;
 * `value` only schedules a sync pass (memory cache hits before paint).
 */
export function useWikiImageHydration(
  rootRef: RefObject<HTMLElement | null> | { current: HTMLElement | null },
  value: string,
  getPresignedUrl?: ((path: string) => Promise<string | null>) | null,
  currentNotePath: string | null = null,
  options: UseWikiImageHydrationOptions = {},
): void {
  const { enabled = true } = options;
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (!enabled || !getPresignedUrl) return undefined;

    let cancelled = false;
    let mutationObserver: MutationObserver | null = null;

    const ensureObserver = (root: HTMLElement | null) => {
      if (!root || mutationObserver || typeof MutationObserver === 'undefined') return;
      // Sync in the MO callback so remembered URLs attach before paint.
      mutationObserver = new MutationObserver(() => {
        if (cancelled) return;
        runHydration();
      });
      mutationObserver.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-wiki-path', 'data-md-src'],
      });
    };

    const runHydration = () => {
      if (cancelled) return;
      const root = rootRef?.current ?? null;
      ensureObserver(root);
      const scopedCount = hydrateStorageImagesInRoot(root, {
        getPresignedUrl,
        currentNotePath,
      });
      if (scopedCount > 0) return;
      if (!markdownLikelyHasStorageImages(valueRef.current)) return;
      hydrateStorageImagesInRoot(document, {
        getPresignedUrl,
        currentNotePath,
      });
    };

    ensureObserver(rootRef?.current ?? null);

    // Initial settle only (not on every keystroke).
    const delays = [0, 100, 350, 700];
    const timers = delays.map((delay) => setTimeout(runHydration, delay));

    const onOnline = () => runHydration();
    const onStoreReady = () => runHydration();
    window.addEventListener('online', onOnline);
    window.addEventListener(PRINT_SETTINGS_STORE_CHANGED_EVENT, onStoreReady);

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      mutationObserver?.disconnect();
      mutationObserver = null;
      window.removeEventListener('online', onOnline);
      window.removeEventListener(PRINT_SETTINGS_STORE_CHANGED_EVENT, onStoreReady);
    };
  }, [enabled, getPresignedUrl, rootRef, currentNotePath]);

  // Markdown edits rebuild preview HTML. Apply remembered URLs immediately;
  // MutationObserver covers cases where React commits after this effect.
  useEffect(() => {
    if (!enabled || !getPresignedUrl || !value) return;
    if (!markdownLikelyHasStorageImages(value)) return;
    hydrateStorageImagesInRoot(rootRef?.current ?? null, {
      getPresignedUrl,
      currentNotePath,
    });
  }, [enabled, value, getPresignedUrl, rootRef, currentNotePath]);
}
