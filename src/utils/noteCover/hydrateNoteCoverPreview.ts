/**
 * Mount CoverSlide into md-editor-rt preview note-cover hosts.
 * Auto-loads when the cover is enabled; re-hydrate when preview DOM is recreated.
 */
import { createRoot, type Root } from 'react-dom/client';
import { createElement } from 'react';
import NoteCoverPreviewMount from '@/components/noteCover/NoteCoverPreviewMount';
import { parseNoteCover } from '@/utils/noteCover/parse';
import type { NoteCover } from '@/utils/noteCover/types';

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

export type HydrateNoteCoverOptions = {
  /**
   * When true (default), mount CoverSlide into hosts.
   * Set false only to show a pending placeholder without mounting.
   */
  load?: boolean;
};

const roots = new WeakMap<Element, Root>();

const FALLBACK_LOAD = '표지 불러오는 중…';
const FALLBACK_EMPTY = '표지';

function unmountHost(mountEl: Element): void {
  const root = roots.get(mountEl);
  if (!root) return;
  root.unmount();
  roots.delete(mountEl);
}

function setFallbackText(
  placeholder: Element | null,
  text: string,
): void {
  if (!placeholder) return;
  const fallback = placeholder.querySelector(
    '.md-note-cover-placeholder__fallback',
  );
  if (fallback) fallback.textContent = text;
}

function setPlaceholderState(
  placeholder: Element | null,
  state: 'pending' | 'ready' | 'empty',
): void {
  if (!placeholder) return;
  placeholder.classList.toggle(
    'md-note-cover-placeholder--pending',
    state === 'pending',
  );
  placeholder.classList.toggle(
    'md-note-cover-placeholder--ready',
    state === 'ready',
  );
  placeholder.classList.toggle(
    'md-note-cover-placeholder--empty',
    state === 'empty',
  );
  if (state === 'pending') setFallbackText(placeholder, FALLBACK_LOAD);
  else if (state === 'empty') setFallbackText(placeholder, FALLBACK_EMPTY);
}

function renderIntoHost(
  mountEl: Element,
  cover: NoteCover,
  getPresignedUrl: GetPresignedUrl,
): void {
  let root = roots.get(mountEl);
  if (!root) {
    root = createRoot(mountEl);
    roots.set(mountEl, root);
  }
  root.render(
    createElement(NoteCoverPreviewMount, {
      cover,
      getPresignedUrl: getPresignedUrl ?? undefined,
    }),
  );
}

/**
 * Hydrate or prepare all `[data-note-cover-mount]` hosts under `root`.
 * Returns how many hosts were mounted (0 when `load` is false).
 */
export function hydrateNoteCoverPreviewsInRoot(
  root: ParentNode | null | undefined,
  markdown: string,
  getPresignedUrl?: GetPresignedUrl,
  options?: HydrateNoteCoverOptions,
): number {
  if (!root || typeof (root as ParentNode).querySelectorAll !== 'function') {
    return 0;
  }

  const load = options?.load !== false;
  const { cover } = parseNoteCover(markdown ?? '');
  const hosts = Array.from(
    (root as ParentNode).querySelectorAll('[data-note-cover-mount]'),
  );

  if (!cover?.enabled) {
    for (const host of hosts) {
      unmountHost(host);
      const placeholder = host.closest('[data-note-cover-placeholder]');
      setPlaceholderState(placeholder, 'empty');
    }
    return 0;
  }

  if (!load) {
    for (const host of hosts) {
      unmountHost(host);
      const placeholder = host.closest('[data-note-cover-placeholder]');
      setPlaceholderState(placeholder, 'pending');
    }
    return 0;
  }

  for (const host of hosts) {
    const placeholder = host.closest('[data-note-cover-placeholder]');
    setPlaceholderState(placeholder, 'ready');
    renderIntoHost(host, cover, getPresignedUrl);
  }

  return hosts.length;
}

/** Unmount all cover preview roots under `root`. */
export function teardownNoteCoverPreviewsInRoot(
  root: ParentNode | null | undefined,
): void {
  if (!root || typeof (root as ParentNode).querySelectorAll !== 'function') {
    return;
  }
  const hosts = Array.from(
    (root as ParentNode).querySelectorAll('[data-note-cover-mount]'),
  );
  for (const host of hosts) {
    unmountHost(host);
  }
}
