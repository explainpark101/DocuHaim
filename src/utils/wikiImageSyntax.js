/**
 * Parse wiki image inner text: `path` or `path|size`.
 * Supported size examples:
 * - ![[path|320]]            -> width 320px
 * - ![[path|320x200]]        -> width 320px, height 200px
 * - ![[path|w=50% h=240]]    -> width 50%, height 240px
 * - ![[path|width=480]]
 */
export const WIKI_IMAGE_RE = /!\[\[([^[\]]+)\]\]/g;

export function parseWikiImageInner(rawInner) {
  const inner = String(rawInner ?? '').trim();
  if (!inner) return null;

  const lastPipe = inner.lastIndexOf('|');
  if (lastPipe < 0) {
    return { path: inner, width: null, height: null };
  }

  const pathCandidate = inner.slice(0, lastPipe).trim();
  const optionCandidate = inner.slice(lastPipe + 1).trim();
  const size = parseWikiImageSizeOption(optionCandidate);

  if (!pathCandidate || !size) {
    return { path: inner, width: null, height: null };
  }

  return { path: pathCandidate, width: size.width, height: size.height };
}

export function parseWikiImageSizeOption(rawOption) {
  const option = String(rawOption ?? '').trim();
  if (!option) return null;

  const pxOnly = option.match(/^(\d+)$/);
  if (pxOnly) return { width: `${pxOnly[1]}px`, height: null };

  const pxByPx = option.match(/^(\d+)x(\d+)$/i);
  if (pxByPx) return { width: `${pxByPx[1]}px`, height: `${pxByPx[2]}px` };

  let width = null;
  let height = null;
  const chunks = option.split(/[,\s]+/).map((v) => v.trim()).filter(Boolean);

  for (const chunk of chunks) {
    const kv = chunk.match(/^([a-zA-Z]+)=(.+)$/);
    if (!kv) continue;
    const key = kv[1].toLowerCase();
    const normalized = normalizeSizeValue(kv[2]);
    if (!normalized) continue;
    if (key === 'w' || key === 'width') width = normalized;
    if (key === 'h' || key === 'height') height = normalized;
  }

  if (!width && !height) return null;
  return { width, height };
}

export function normalizeSizeValue(rawValue) {
  const value = String(rawValue ?? '').trim();
  if (!value) return null;
  if (/^\d+$/.test(value)) return `${value}px`;
  if (/^\d+(\.\d+)?(px|%|vh|vw)$/.test(value)) return value;
  return null;
}

export function buildWikiImageStyle({ width, height }) {
  const style = [];
  if (width) style.push(`width:${width}`);
  if (height) style.push(`height:${height}`);
  return style.length ? `${style.join(';')};` : null;
}

export function wikiImageMarkupFromAttrs({ path, width, height }) {
  if (!path) return '';
  const size = [];
  if (width) size.push(`w=${width}`);
  if (height) size.push(`h=${height}`);
  if (size.length === 0) return `![[${path}]]`;
  return `![[${path}|${size.join(' ')}]]`;
}

export function getWikiImageAttrsFromElement(img) {
  if (!img || typeof img.getAttribute !== 'function') {
    return { path: null, width: null, height: null };
  }
  const path = img.getAttribute('data-wiki-path');
  const width = img.getAttribute('data-wiki-width');
  const height = img.getAttribute('data-wiki-height');
  return {
    path: path || null,
    width: width || null,
    height: height || null,
  };
}

export function getWikiImageOccurrenceInContainer(container, img, path) {
  if (!container || !img || !path) return 0;
  const imgs = [...container.querySelectorAll('img[data-wiki-path]')];
  const matches = imgs.filter((el) => el.getAttribute('data-wiki-path') === path);
  const occurrence = matches.findIndex((el) => el === img);
  return occurrence >= 0 ? occurrence : 0;
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
    return wikiImageMarkupFromAttrs({ path, width, height });
  });
  return { markdown: next, updated };
}

export function parseMarkdownImageAttrsBlock(rawBlock) {
  const block = String(rawBlock ?? '').trim();
  if (!block) return { width: null, height: null };
  const inner = block.replace(/^\{/, '').replace(/\}$/, '').trim();
  if (!inner) return { width: null, height: null };

  let width = null;
  let height = null;
  const chunks = inner.split(/[,\s]+/).map((v) => v.trim()).filter(Boolean);
  for (const chunk of chunks) {
    const kv = chunk.match(/^([a-zA-Z]+)=(.+)$/);
    if (!kv) continue;
    const key = kv[1].toLowerCase();
    const normalized = normalizeSizeValue(kv[2]);
    if (!normalized) continue;
    if (key === 'w' || key === 'width') width = normalized;
    if (key === 'h' || key === 'height') height = normalized;
  }
  return { width, height };
}

export function markdownImageAttrsBlockFromSize({ width, height }) {
  const attrs = [];
  if (width) attrs.push(`w=${width}`);
  if (height) attrs.push(`h=${height}`);
  if (!attrs.length) return '';
  return `{${attrs.join(' ')}}`;
}

export function getResizableImageAttrsFromElement(img) {
  if (!img || typeof img.getAttribute !== 'function') {
    return { kind: null, key: null, width: null, height: null };
  }
  const wikiPath = img.getAttribute('data-wiki-path');
  if (wikiPath) {
    return {
      kind: 'wiki',
      key: wikiPath,
      width: img.getAttribute('data-wiki-width') || null,
      height: img.getAttribute('data-wiki-height') || null,
    };
  }
  const markdownSrc = img.getAttribute('data-md-src');
  if (markdownSrc) {
    return {
      kind: 'markdown',
      key: markdownSrc,
      width: img.getAttribute('data-md-width') || null,
      height: img.getAttribute('data-md-height') || null,
    };
  }
  return { kind: null, key: null, width: null, height: null };
}

export function getMarkdownImageOccurrenceInContainer(container, img, src) {
  if (!container || !img || !src) return 0;
  const imgs = [...container.querySelectorAll('img[data-md-src]')];
  const matches = imgs.filter((el) => el.getAttribute('data-md-src') === src);
  const occurrence = matches.findIndex((el) => el === img);
  return occurrence >= 0 ? occurrence : 0;
}

export function updateMarkdownImageSizeInMarkdown(markdown, { src, occurrence = 0, width = null, height = null }) {
  if (!src) return { markdown, updated: false };
  const source = String(markdown ?? '');
  const IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
  const attrsBlock = markdownImageAttrsBlockFromSize({ width, height });
  let matchedCount = -1;
  let updated = false;
  const next = source.replace(IMAGE_RE, (full, alt, destination, rawAttrs = '') => {
    const dest = String(destination ?? '');
    const mdSrc = dest.trim().split(/\s+/)[0];
    if (!mdSrc || mdSrc !== src) return full;
    matchedCount += 1;
    if (matchedCount !== occurrence) return full;
    updated = true;
    const base = `![${alt}](${destination})`;
    return attrsBlock ? `${base}${attrsBlock}` : base;
  });
  return { markdown: next, updated };
}

