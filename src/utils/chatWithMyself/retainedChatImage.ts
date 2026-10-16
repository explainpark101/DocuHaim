/**
 * Keeps decoded chat <img> elements alive across virtua unmounts.
 * Scrolling a row offscreen parks the element instead of destroying it,
 * so the next mount reuses the same node and does not start a new request.
 */

const RETAIN_ATTR = '1';
const HOLDER_ID = 'chat-retained-images';

export type RetainedChatImageOptions = {
  src: string;
  alt?: string;
  className?: string;
  backgroundColor?: string;
  referrerPolicy?: ReferrerPolicy;
  draggable?: boolean;
};

export type AdoptRetainedChatImageAttrs = {
  path: string;
  className?: string;
  alt?: string;
  styleAttr?: string | null;
  wikiPath?: string | null;
  mdSrc?: string | null;
  backgroundColor?: string;
};

const freeBySrc = new Map<string, HTMLImageElement[]>();
const allBySrc = new Map<string, Set<HTMLImageElement>>();
let parkObserver: MutationObserver | null = null;

function holder(): HTMLElement {
  const existing = document.getElementById(HOLDER_ID);
  if (existing) return existing;
  const el = document.createElement('div');
  el.id = HOLDER_ID;
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText =
    'position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none;opacity:0;';
  document.body.appendChild(el);
  return el;
}

function track(src: string, img: HTMLImageElement) {
  let set = allBySrc.get(src);
  if (!set) {
    set = new Set();
    allBySrc.set(src, set);
  }
  set.add(img);
}

function untrack(src: string, img: HTMLImageElement) {
  const set = allBySrc.get(src);
  if (!set) return;
  set.delete(img);
  if (set.size === 0) allBySrc.delete(src);
  const free = freeBySrc.get(src);
  if (!free) return;
  const next = free.filter((node) => node !== img);
  if (next.length) freeBySrc.set(src, next);
  else freeBySrc.delete(src);
}

function parkDetachedTree(node: Node) {
  if (node instanceof HTMLImageElement) {
    if (node.dataset.chatRetain === RETAIN_ATTR && !node.isConnected) {
      parkRetainedChatImage(node);
    }
    return;
  }
  if (!(node instanceof Element)) return;
  node.querySelectorAll('img[data-chat-retain="1"]').forEach((img) => {
    if (img instanceof HTMLImageElement && !img.isConnected) {
      parkRetainedChatImage(img);
    }
  });
}

function ensureParkObserver() {
  if (parkObserver || typeof MutationObserver === 'undefined') return;
  if (typeof document === 'undefined') return;
  parkObserver = new MutationObserver((records) => {
    for (const record of records) {
      record.removedNodes.forEach((node) => {
        parkDetachedTree(node);
      });
    }
  });
  parkObserver.observe(document.body, { childList: true, subtree: true });
}

function revealIfDecoded(img: HTMLImageElement) {
  if (img.complete && img.naturalWidth > 0) {
    img.style.opacity = '1';
  }
}

function applyPresentation(img: HTMLImageElement, opts: RetainedChatImageOptions) {
  img.alt = opts.alt ?? '';
  img.className = opts.className ?? '';
  img.loading = 'eager';
  img.decoding = 'async';
  img.draggable = opts.draggable ?? false;
  img.style.width = '';
  img.style.height = '';
  img.style.maxWidth = '';
  img.style.maxHeight = '';
  if (opts.referrerPolicy) img.referrerPolicy = opts.referrerPolicy;
  img.style.backgroundColor = opts.backgroundColor ?? '';
  revealIfDecoded(img);
  if (img.dataset.chatRetainSrc !== opts.src) {
    img.dataset.chatRetainSrc = opts.src;
    img.src = opts.src;
    revealIfDecoded(img);
  }
}

function createRetainedImage(opts: RetainedChatImageOptions): HTMLImageElement {
  const img = document.createElement('img');
  img.dataset.chatRetain = RETAIN_ATTR;
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
  img.onload = () => {
    img.style.opacity = '1';
  };
  // applyPresentation assigns src. Do not preset data-chat-retain-src before that.
  applyPresentation(img, opts);
  track(opts.src, img);
  return img;
}

/** Take a parked image for `src`, or create one. Caller must insert it. */
export function acquireRetainedChatImage(
  opts: RetainedChatImageOptions,
): HTMLImageElement {
  ensureParkObserver();
  const free = freeBySrc.get(opts.src);
  const parked = free?.pop();
  if (parked) {
    if (free && free.length === 0) freeBySrc.delete(opts.src);
    applyPresentation(parked, opts);
    return parked;
  }
  return createRetainedImage(opts);
}

/** Move an image out of a row and keep it decoded for the next mount. */
export function parkRetainedChatImage(img: HTMLImageElement) {
  if (img.dataset.chatRetain !== RETAIN_ATTR) return;
  const src = img.dataset.chatRetainSrc || '';
  if (!src) return;
  const free = freeBySrc.get(src) ?? [];
  if (!free.includes(img)) {
    free.push(img);
    freeBySrc.set(src, free);
  }
  track(src, img);
  const host = holder();
  if (img.parentElement !== host) host.appendChild(img);
}

/** Point a retained element at a new URL without leaving it keyed to the old src. */
export function retargetRetainedChatImage(
  img: HTMLImageElement,
  nextSrc: string,
  force = false,
) {
  const prev = img.dataset.chatRetainSrc || '';
  if (!nextSrc) return;
  if (prev === nextSrc && !force) return;
  if (prev && prev !== nextSrc) untrack(prev, img);
  img.dataset.chatRetain = RETAIN_ATTR;
  img.dataset.chatRetainSrc = nextSrc;
  if (force && prev === nextSrc) {
    img.removeAttribute('src');
  }
  img.src = nextSrc;
  track(nextSrc, img);
  revealIfDecoded(img);
}

/**
 * Keep non-storage <img> nodes inside chat markdown (external URLs) across row unmounts.
 * Storage wiki images are adopted by hydration instead.
 */
export function retainExternalChatImages(root: ParentNode | null | undefined) {
  if (!root || typeof document === 'undefined') return;
  root.querySelectorAll('img').forEach((node) => {
    if (!(node instanceof HTMLImageElement)) return;
    if (!node.isConnected || !node.closest('.chat-message-markdown')) return;
    if (node.dataset.chatRetain === RETAIN_ATTR) return;
    if (node.getAttribute('data-wiki-path') || node.getAttribute('data-md-src')) return;
    const attr = node.getAttribute('src') || '';
    if (!attr || attr.startsWith('data:')) return;
    const src = node.src || attr;
    if (!src || src.startsWith('data:')) return;
    adoptRetainedChatImage(node, src, {
      path: src,
      className: node.className,
      alt: node.alt,
      styleAttr: node.getAttribute('style'),
    });
  });
}

/** Drop every retained element for a src (explicit OG reload). */
export function forgetRetainedChatImages(src: string) {
  const set = allBySrc.get(src);
  if (!set) {
    freeBySrc.delete(src);
    return;
  }
  for (const img of set) {
    delete img.dataset.chatRetain;
    delete img.dataset.chatRetainSrc;
    img.remove();
  }
  allBySrc.delete(src);
  freeBySrc.delete(src);
}

function copyStorageAttrs(img: HTMLImageElement, attrs: AdoptRetainedChatImageAttrs) {
  img.dataset.storageHydrated = attrs.path;
  delete img.dataset.storageHydrating;
  if (attrs.wikiPath) img.setAttribute('data-wiki-path', attrs.wikiPath);
  else img.removeAttribute('data-wiki-path');
  if (attrs.mdSrc) img.setAttribute('data-md-src', attrs.mdSrc);
  else img.removeAttribute('data-md-src');
  if (attrs.styleAttr) {
    const opacity = img.style.opacity;
    const transition = img.style.transition;
    img.setAttribute('style', attrs.styleAttr);
    img.style.transition = transition;
    if (img.complete && img.naturalWidth > 0) img.style.opacity = '1';
    else if (opacity) img.style.opacity = opacity;
  }
  if (attrs.backgroundColor) img.style.backgroundColor = attrs.backgroundColor;
}

/**
 * Swap a placeholder <img> for the retained element that already has `src`.
 * If the placeholder is already gone, the retained element stays parked and keeps loading.
 */
export function adoptRetainedChatImage(
  placeholder: HTMLImageElement,
  src: string,
  attrs: AdoptRetainedChatImageAttrs,
): HTMLImageElement {
  if (
    placeholder.dataset.chatRetain === RETAIN_ATTR &&
    placeholder.dataset.chatRetainSrc === src
  ) {
    applyPresentation(placeholder, {
      src,
      alt: attrs.alt ?? placeholder.alt,
      className: attrs.className ?? placeholder.className,
      ...(attrs.backgroundColor ? { backgroundColor: attrs.backgroundColor } : {}),
    });
    copyStorageAttrs(placeholder, attrs);
    return placeholder;
  }

  const img = acquireRetainedChatImage({
    src,
    alt: attrs.alt ?? '',
    className: attrs.className ?? placeholder.className,
    ...(attrs.backgroundColor ? { backgroundColor: attrs.backgroundColor } : {}),
  });
  copyStorageAttrs(img, attrs);
  if (placeholder.isConnected && placeholder !== img) {
    placeholder.replaceWith(img);
  } else if (!img.isConnected) {
    parkRetainedChatImage(img);
  }
  return img;
}
