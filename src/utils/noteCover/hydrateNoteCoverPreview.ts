/**
 * Mount CoverSlide into md-editor-rt preview note-cover hosts.
 */
import { createRoot, type Root } from 'react-dom/client';
import { createElement } from 'react';
import NoteCoverPreviewMount from '@/components/noteCover/NoteCoverPreviewMount';
import { parseNoteCover } from '@/utils/noteCover/parse';
import type { NoteCover } from '@/utils/noteCover/types';

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

const roots = new WeakMap<Element, Root>();

function unmountHost(mountEl: Element): void {
  const root = roots.get(mountEl);
  if (!root) return;
  root.unmount();
  roots.delete(mountEl);
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
 * Hydrate all `[data-note-cover-mount]` hosts under `root`.
 * Returns how many hosts were updated.
 */
export function hydrateNoteCoverPreviewsInRoot(
  root: ParentNode | null | undefined,
  markdown: string,
  getPresignedUrl?: GetPresignedUrl,
): number {
  if (!root || typeof (root as ParentNode).querySelectorAll !== 'function') {
    return 0;
  }

  const { cover } = parseNoteCover(markdown ?? '');
  const hosts = Array.from(
    (root as ParentNode).querySelectorAll('[data-note-cover-mount]'),
  );

  if (!cover?.enabled) {
    for (const host of hosts) {
      unmountHost(host);
      const placeholder = host.closest('[data-note-cover-placeholder]');
      placeholder?.classList.add('md-note-cover-placeholder--empty');
      placeholder?.classList.remove('md-note-cover-placeholder--ready');
    }
    return 0;
  }

  for (const host of hosts) {
    const placeholder = host.closest('[data-note-cover-placeholder]');
    placeholder?.classList.remove('md-note-cover-placeholder--empty');
    placeholder?.classList.add('md-note-cover-placeholder--ready');
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
