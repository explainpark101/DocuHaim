import { normalizeCssHexColor } from '@/utils/cssColor';

/**
 * Parse wiki image inner text: `path` or `path|options`.
 * Supported examples:
 * - ![[path|320]]            -> width 320px
 * - ![[path|320x200]]        -> width 320px, height 200px
 * - ![[path|w=50% h=240]]    -> width 50%, height 240px
 * - ![[path|width=480]]
 * - ![[path|bg=#ffffff]]     -> display background-color (does not alter the file)
 * - ![[path|w=320 bg=#fff]]
 */
export const WIKI_IMAGE_RE = /!\[\[([^[\]]+)\]\]/g;

function emptyWikiAttrs(path = null) {
  return { path, width: null, height: null, background: null };
}

export function parseWikiImageInner(rawInner) {
  const inner = String(rawInner ?? '').trim();
  if (!inner) return null;

  const lastPipe = inner.lastIndexOf('|');
  if (lastPipe < 0) {
    return emptyWikiAttrs(inner);
  }

  const pathCandidate = inner.slice(0, lastPipe).trim();
  const optionCandidate = inner.slice(lastPipe + 1).trim();
  const opts = parseWikiImageOptions(optionCandidate);

  if (!pathCandidate || !opts) {
    return emptyWikiAttrs(inner);
  }

  return { path: pathCandidate, ...opts };
}

/**
 * @returns {{ width: string | null, height: string | null, background: string | null } | null}
 */
export function parseWikiImageOptions(rawOption) {
  const option = String(rawOption ?? '').trim();
  if (!option) return null;

  const pxOnly = option.match(/^(\d+)$/);
  if (pxOnly) return { width: `${pxOnly[1]}px`, height: null, background: null };

  const pxByPx = option.match(/^(\d+)x(\d+)$/i);
  if (pxByPx) {
    return { width: `${pxByPx[1]}px`, height: `${pxByPx[2]}px`, background: null };
  }

  let width = null;
  let height = null;
  let background = null;
  let recognized = false;
  const chunks = option.split(/[,\s]+/).map((v) => v.trim()).filter(Boolean);

  for (const chunk of chunks) {
    const barePx = chunk.match(/^(\d+)$/);
    if (barePx) {
      width = `${barePx[1]}px`;
      recognized = true;
      continue;
    }
    const barePxByPx = chunk.match(/^(\d+)x(\d+)$/i);
    if (barePxByPx) {
      width = `${barePxByPx[1]}px`;
      height = `${barePxByPx[2]}px`;
      recognized = true;
      continue;
    }
    const kv = chunk.match(/^([a-zA-Z]+)=(.+)$/);
    if (!kv) continue;
    const key = kv[1].toLowerCase();
    if (key === 'bg' || key === 'background') {
      const color = normalizeCssHexColor(kv[2]);
      if (color) {
        background = color;
        recognized = true;
      }
      continue;
    }
    const normalized = normalizeSizeValue(kv[2]);
    if (!normalized) continue;
    if (key === 'w' || key === 'width') {
      width = normalized;
      recognized = true;
    }
    if (key === 'h' || key === 'height') {
      height = normalized;
      recognized = true;
    }
  }

  if (!recognized) return null;
  return { width, height, background };
}

/** @deprecated Use parseWikiImageOptions */
export function parseWikiImageSizeOption(rawOption) {
  const parsed = parseWikiImageOptions(rawOption);
  if (!parsed) return null;
  if (!parsed.width && !parsed.height) return null;
  return { width: parsed.width, height: parsed.height };
}

export function normalizeSizeValue(rawValue) {
  const value = String(rawValue ?? '').trim();
  if (!value) return null;
  if (/^\d+$/.test(value)) return `${value}px`;
  if (/^\d+(\.\d+)?(px|%|vh|vw)$/.test(value)) return value;
  return null;
}

export function buildWikiImageStyle({ width, height, background } = {}) {
  const style = [];
  if (width) style.push(`width:${width}`);
  if (height) style.push(`height:${height}`);
  const color = normalizeCssHexColor(background);
  if (color) style.push(`background-color:${color}`);
  return style.length ? `${style.join(';')};` : null;
}

export function wikiImageMarkupFromAttrs({ path, width, height, background } = {}) {
  if (!path) return '';
  const opts = [];
  if (width) opts.push(`w=${width}`);
  if (height) opts.push(`h=${height}`);
  const color = normalizeCssHexColor(background);
  if (color) opts.push(`bg=${color}`);
  if (opts.length === 0) return `![[${path}]]`;
  return `![[${path}|${opts.join(' ')}]]`;
}

export function getWikiImageAttrsFromElement(img) {
  if (!img || typeof img.getAttribute !== 'function') {
    return emptyWikiAttrs(null);
  }
  const path = img.getAttribute('data-wiki-path');
  const width = img.getAttribute('data-wiki-width');
  const height = img.getAttribute('data-wiki-height');
  const background = normalizeCssHexColor(img.getAttribute('data-wiki-bg'));
  return {
    path: path || null,
    width: width || null,
    height: height || null,
    background,
  };
}

export function getWikiImageOccurrenceInContainer(container, img, path) {
  if (!container || !img || !path) return 0;
  const imgs = [...container.querySelectorAll('img[data-wiki-path]')];
  const matches = imgs.filter((el) => el.getAttribute('data-wiki-path') === path);
  const occurrence = matches.findIndex((el) => el === img);
  return occurrence >= 0 ? occurrence : 0;
}

export function updateWikiImagePathInMarkdown(markdown, {
  path,
  occurrence = 0,
  nextPath,
  width,
  height,
}) {
  if (!path || !nextPath) return { markdown, updated: false };
  const source = String(markdown ?? '');
  let matchedCount = -1;
  let updated = false;
  const next = source.replace(WIKI_IMAGE_RE, (full, rawInner) => {
    const parsed = parseWikiImageInner(rawInner);
    if (!parsed || parsed.path !== path) return full;
    matchedCount += 1;
    if (matchedCount !== occurrence) return full;
    updated = true;
    return wikiImageMarkupFromAttrs({
      path: nextPath,
      width: width === undefined ? parsed.width : width,
      height: height === undefined ? parsed.height : height,
      background: parsed.background,
    });
  });
  return { markdown: next, updated };
}

export function updateWikiImageSizeInMarkdown(markdown, { path, occurrence = 0, width = null, height = null }) {
  if (!path) return { markdown, updated: false };
  const source = String(markdown ?? '');
  let matchedCount = -1;
  let updated = false;
  const next = source.replace(WIKI_IMAGE_RE, (full, rawInner) => {
    const parsed = parseWikiImageInner(rawInner);
    if (!parsed || parsed.path !== path) return full;
    matchedCount += 1;
    if (matchedCount !== occurrence) return full;
    updated = true;
    return wikiImageMarkupFromAttrs({
      path,
      width,
      height,
      background: parsed.background,
    });
  });
  return { markdown: next, updated };
}

export function parseMarkdownImageAttrsBlock(rawBlock) {
  const block = String(rawBlock ?? '').trim();
  if (!block) return { width: null, height: null, background: null };
  const inner = block.replace(/^\{/, '').replace(/\}$/, '').trim();
  if (!inner) return { width: null, height: null, background: null };

  let width = null;
  let height = null;
  let background = null;
  const chunks = inner.split(/[,\s]+/).map((v) => v.trim()).filter(Boolean);
  for (const chunk of chunks) {
    const kv = chunk.match(/^([a-zA-Z]+)=(.+)$/);
    if (!kv) continue;
    const key = kv[1].toLowerCase();
    if (key === 'bg' || key === 'background') {
      const color = normalizeCssHexColor(kv[2]);
      if (color) background = color;
      continue;
    }
    const normalized = normalizeSizeValue(kv[2]);
    if (!normalized) continue;
    if (key === 'w' || key === 'width') width = normalized;
    if (key === 'h' || key === 'height') height = normalized;
  }
  return { width, height, background };
}

export function markdownImageAttrsBlockFromSize({ width, height, background } = {}) {
  const attrs = [];
  if (width) attrs.push(`w=${width}`);
  if (height) attrs.push(`h=${height}`);
  const color = normalizeCssHexColor(background);
  if (color) attrs.push(`bg=${color}`);
  if (!attrs.length) return '';
  return `{${attrs.join(' ')}}`;
}

export function getResizableImageAttrsFromElement(img) {
  if (!img || typeof img.getAttribute !== 'function') {
    return { kind: null, key: null, width: null, height: null, background: null };
  }
  const wikiPath = img.getAttribute('data-wiki-path');
  if (wikiPath) {
    return {
      kind: 'wiki',
      key: wikiPath,
      width: img.getAttribute('data-wiki-width') || null,
      height: img.getAttribute('data-wiki-height') || null,
      background: normalizeCssHexColor(img.getAttribute('data-wiki-bg')),
    };
  }
  const markdownSrc = img.getAttribute('data-md-src');
  if (markdownSrc) {
    return {
      kind: 'markdown',
      key: markdownSrc,
      width: img.getAttribute('data-md-width') || null,
      height: img.getAttribute('data-md-height') || null,
      background: normalizeCssHexColor(img.getAttribute('data-md-bg')),
    };
  }
  return { kind: null, key: null, width: null, height: null, background: null };
}

export function getMarkdownImageOccurrenceInContainer(container, img, src) {
  if (!container || !img || !src) return 0;
  const imgs = [...container.querySelectorAll('img[data-md-src]')];
  const matches = imgs.filter((el) => el.getAttribute('data-md-src') === src);
  const occurrence = matches.findIndex((el) => el === img);
  return occurrence >= 0 ? occurrence : 0;
}

export function replaceMarkdownImageWithWikiPath(markdown, {
  src,
  occurrence = 0,
  nextPath,
  width,
  height,
}) {
  if (!src || !nextPath) return { markdown, updated: false };
  const source = String(markdown ?? '');
  const IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
  let matchedCount = -1;
  let updated = false;
  const next = source.replace(IMAGE_RE, (full, alt, destination, rawAttrs = '') => {
    const dest = String(destination ?? '');
    const mdSrc = dest.trim().split(/\s+/)[0];
    if (!mdSrc || mdSrc !== src) return full;
    matchedCount += 1;
    if (matchedCount !== occurrence) return full;
    updated = true;
    const existing = parseMarkdownImageAttrsBlock(rawAttrs);
    const markup = wikiImageMarkupFromAttrs({
      path: nextPath,
      width: width === undefined ? existing.width : width,
      height: height === undefined ? existing.height : height,
      background: existing.background,
    });
    // Markdown `![alt]()` becomes an implicit wiki caption (next line).
    const caption = String(alt ?? '').trim();
    return caption ? `${markup}\n${caption}` : markup;
  });
  return { markdown: next, updated };
}

export function updateMarkdownImageSizeInMarkdown(markdown, { src, occurrence = 0, width = null, height = null }) {
  if (!src) return { markdown, updated: false };
  const source = String(markdown ?? '');
  const IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
  let matchedCount = -1;
  let updated = false;
  const next = source.replace(IMAGE_RE, (full, alt, destination, rawAttrs = '') => {
    const dest = String(destination ?? '');
    const mdSrc = dest.trim().split(/\s+/)[0];
    if (!mdSrc || mdSrc !== src) return full;
    matchedCount += 1;
    if (matchedCount !== occurrence) return full;
    updated = true;
    const existing = parseMarkdownImageAttrsBlock(rawAttrs);
    const attrsBlock = markdownImageAttrsBlockFromSize({
      width,
      height,
      background: existing.background,
    });
    const base = `![${alt}](${destination})`;
    return attrsBlock ? `${base}${attrsBlock}` : base;
  });
  return { markdown: next, updated };
}

/** Replace a standard markdown image destination (keep alt + size attrs). */
export function updateMarkdownImageSrcInMarkdown(markdown, {
  src,
  occurrence = 0,
  nextSrc,
  width,
  height,
}) {
  if (!src || !nextSrc) return { markdown, updated: false };
  const source = String(markdown ?? '');
  const IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
  let matchedCount = -1;
  let updated = false;
  const next = source.replace(IMAGE_RE, (full, alt, destination, rawAttrs = '') => {
    const dest = String(destination ?? '');
    const mdSrc = dest.trim().split(/\s+/)[0];
    if (!mdSrc || mdSrc !== src) return full;
    matchedCount += 1;
    if (matchedCount !== occurrence) return full;
    updated = true;
    const existing = parseMarkdownImageAttrsBlock(rawAttrs);
    const attrsBlock = markdownImageAttrsBlockFromSize({
      width: width === undefined ? existing.width : width,
      height: height === undefined ? existing.height : height,
      background: existing.background,
    });
    const base = `![${alt}](${nextSrc})`;
    return attrsBlock ? `${base}${attrsBlock}` : base;
  });
  return { markdown: next, updated };
}
