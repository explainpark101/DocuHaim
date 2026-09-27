/**
 * Protect custom markdown constructs TipTap cannot parse yet by wrapping
 * them as HTML raw blocks (or sentinels), then restore on serialize.
 *
 * Preferred form (TipTap HTML parse → RawMarkdownBlock):
 *   <pre data-haim-raw-md="1" data-kind="mermaid">…</pre>
 *
 * Legacy sentinel form (still restored):
 *   @@@haim-raw:mermaid
 *   ...original...
 *   @@@/haim-raw
 */

import {
  parseWikiImageInner,
  WIKI_IMAGE_RE,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';
import { wikiImageToProtectedHtml } from '@/components/haimEditor/extensions/WikiImage';

const SENTINEL_OPEN = '@@@haim-raw:';
const SENTINEL_CLOSE = '@@@/haim-raw';

/** Mermaid fence (optional size comment immediately above). */
const MERMAID_BLOCK_RE =
  /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g;

/** Haim table comment + following GFM table. */
const HAIM_TABLE_RE =
  /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g;

/** Plan YAML frontmatter at document start (after meta comments already stripped). */
const PLAN_FM_RE = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/;

/** Chat-saved note card comment block. */
const CHAT_SAVED_RE =
  /<!--\s*chat-with-myself\b[\s\S]*?-->[\s\S]*?(?=\n<!--|\n#{1,6}\s|\n*$)/g;

function wrapRawHtml(kind: string, body: string): string {
  const trimmed = body.replace(/\s+$/, '');
  return `<pre data-haim-raw-md="1" data-kind="${escapeAttr(kind)}">${escapeHtml(trimmed)}</pre>\n\n`;
}

export function protectCustomMarkdown(src: string): string {
  let out = typeof src === 'string' ? src : '';

  // Mermaid fences stay as ```mermaid for TipTap codeBlock (chart node view).
  // Only protect size-comment + fence as a unit so the comment is not dropped.
  out = out.replace(MERMAID_BLOCK_RE, (m) => {
    if (/<!--\s*mermaid-size\b/i.test(m)) {
      return wrapRawHtml('mermaid', m);
    }
    return m;
  });
  out = out.replace(HAIM_TABLE_RE, (m) => wrapRawHtml('haim-table', m));
  out = out.replace(CHAT_SAVED_RE, (m) => wrapRawHtml('chat-saved-note', m));

  const plan = PLAN_FM_RE.exec(out);
  if (plan?.[0]) {
    out = wrapRawHtml('plan-frontmatter', plan[0]) + out.slice(plan[0].length);
  }

  // Normalize page breaks to `<pgbr/>` for PageBreak.markdownTokenizer.
  out = out.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, '<pgbr/>');

  // Wiki images → canonical <img data-wiki-path> for TipTap WikiImage + hydration
  // Spec: invalid option suffix → treat entire INNER as path (no options).
  out = out.replace(WIKI_IMAGE_RE, (m, inner) => {
    const parsed = parseWikiImageInner(inner);
    if (!parsed?.path) return m;
    const innerTrim = String(inner).trim();
    const lastPipe = innerTrim.lastIndexOf('|');
    let options = '';
    if (lastPipe >= 0) {
      const pathCandidate = innerTrim.slice(0, lastPipe).trim();
      const optionCandidate = innerTrim.slice(lastPipe + 1).trim();
      // Only attach options when parseWikiImageInner accepted them as options
      // (parsed.path === pathCandidate). Otherwise path is the full INNER.
      if (parsed.path === pathCandidate && optionCandidate) {
        options = optionCandidate;
      }
    }
    return wikiImageToProtectedHtml(parsed.path, options);
  });

  // Fold following caption line into <figure> (wiki-image.md caption post-process)
  out = foldWikiImageCaptions(out);

  // Deep headings #######…########## → h6 data-heading-level
  out = out.replace(/^(#{7,10})\s+(.+)$/gm, (_m, hashes: string, title: string) => {
    const level = hashes.length;
    return `<h6 data-heading-level="${level}">${escapeHtml(title)}</h6>`;
  });

  // Display math $$…$$ → TipTap BlockMath (must run before single-$ inline)
  out = out.replace(/\$\$([\s\S]+?)\$\$/g, (_m, latex) => {
    const body = String(latex || '').trim();
    if (!body) return _m;
    return `<div data-type="block-math" data-latex="${escapeAttr(body)}"></div>\n\n`;
  });

  // Inline math $…$ → TipTap InlineMath (skip currency-like $100$)
  out = out.replace(/\$(?!\d+\$)([^$\n]+?)\$(?!\d)/g, (_m, latex) => {
    const body = String(latex || '').trim();
    if (!body) return _m;
    return `<span data-type="inline-math" data-latex="${escapeAttr(body)}"></span>`;
  });

  return out;
}

export function restoreCustomMarkdown(src: string): string {
  let out = typeof src === 'string' ? src : '';

  // Preferred: <pre data-haim-raw-md>…</pre>
  out = out.replace(
    /<pre\b[^>]*\bdata-haim-raw-md\b[^>]*>([\s\S]*?)<\/pre>/gi,
    (_m, inner) => {
      const text = unescapeHtml(String(inner || ''));
      return text.endsWith('\n') ? text : `${text}\n`;
    },
  );

  // Legacy @@@haim-raw sentinels
  out = out.replace(
    /@@@haim-raw:([^\n]*)\n([\s\S]*?)\n@@@\/haim-raw/g,
    (_m, _kind, body) => {
      const text = String(body || '');
      return text.endsWith('\n') ? text : `${text}\n`;
    },
  );

  // Note-cover WYSIWYG host — vault comment lives in metaPrefix
  out = stripNoteCoverPlaceholderHosts(out);

  // TipTap figure (wiki image + caption) → vault ![[path]] + next-line caption
  out = out.replace(
    /<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi,
    (_m, inner) => {
      const imgMatch = String(inner).match(
        /<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i,
      );
      const capMatch = String(inner).match(
        /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i,
      );
      if (!imgMatch?.[0]) return String(inner);
      const imageMd = wikiImgTagToMarkup(imgMatch[0]);
      const caption = capMatch
        ? htmlInlineToMarkdownText(capMatch[1] || '').trim()
        : '';
      return caption ? `${imageMd}\n${caption}` : imageMd;
    },
  );

  // TipTap may emit wiki <img> or legacy wiki <div>
  out = out.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (tag) =>
    wikiImgTagToMarkup(tag),
  );
  out = out.replace(
    /<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi,
    (tag) => {
      const path = attr(tag, 'data-wiki-path');
      const opts = attr(tag, 'data-wiki-options');
      if (!path) return tag;
      return opts ? `![[${path}|${opts}]]` : `![[${path}]]`;
    },
  );

  // Page break HTML variants
  out = out.replace(/<div[^>]*data-haim-pgbr[^>]*>[\s\S]*?<\/div>/gi, '<pgbr/>');
  out = out.replace(/<pgbr><\/pgbr>/gi, '<pgbr/>');
  out = out.replace(/<pgbr\s*\/?\s*>/gi, '<pgbr/>');

  // Deep headings back to ATX
  out = out.replace(
    /<h6[^>]*data-heading-level="(\d+)"[^>]*>([\s\S]*?)<\/h6>/gi,
    (_m, level, inner) => {
      const n = Math.min(10, Math.max(7, Number(level) || 7));
      const text = unescapeHtml(String(inner).replace(/<[^>]+>/g, '')).trim();
      return `${'#'.repeat(n)} ${text}`;
    },
  );

  // TipTap BlockMath / InlineMath HTML → vault dollars
  out = out.replace(
    /<div\b[^>]*\bdata-type=["']block-math["'][^>]*>[\s\S]*?<\/div>/gi,
    (tag) => {
      const latex = attr(tag, 'data-latex');
      if (!latex) return tag;
      return `$$\n${latex}\n$$\n`;
    },
  );
  out = out.replace(
    /<span\b[^>]*\bdata-type=["']inline-math["'][^>]*>[\s\S]*?<\/span>/gi,
    (tag) => {
      const latex = attr(tag, 'data-latex');
      if (!latex) return tag;
      return `$${latex}$`;
    },
  );

  // Collapse blank lines left by stripped note-cover host
  out = out.replace(/^\n+/, '');

  return out;
}

/** @deprecated Use wrapRawHtml path; kept for tests referencing sentinel string. */
export const HAIM_RAW_SENTINEL = {
  open: SENTINEL_OPEN,
  close: SENTINEL_CLOSE,
} as const;

function attr(tag: string, name: string): string {
  const m = new RegExp(`${name}="([^"]*)"`, 'i').exec(tag);
  return m ? unescapeAttr(m[1] || '') : '';
}

function wikiImgTagToMarkup(tag: string): string {
  const path = attr(tag, 'data-wiki-path');
  if (!path) return tag;
  const width = attr(tag, 'data-wiki-width') || null;
  const height = attr(tag, 'data-wiki-height') || null;
  const background = attr(tag, 'data-wiki-bg') || null;
  const options = attr(tag, 'data-wiki-options');
  if (width || height || background) {
    return wikiImageMarkupFromAttrs({ path, width, height, background });
  }
  return options ? `![[${path}|${options}]]` : `![[${path}]]`;
}

/**
 * After wiki `<img>` protect, fold the next caption line into a TipTap figure.
 * Matches wiki-image.md: same-line softbreak caption or adjacent paragraph.
 */
function foldWikiImageCaptions(src: string): string {
  const lines = src.split('\n');
  const out: string[] = [];
  const imgOnlyRe = /^(\s*)(<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>)\s*$/i;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    const imgMatch = imgOnlyRe.exec(line);
    if (!imgMatch) {
      out.push(line);
      continue;
    }

    const indent = imgMatch[1] ?? '';
    const imgTag = imgMatch[2] ?? '';
    let captionIdx = i + 1;
    if (captionIdx < lines.length && String(lines[captionIdx]).trim() === '') {
      captionIdx += 1;
    }
    const captionLine =
      captionIdx < lines.length ? String(lines[captionIdx] ?? '') : '';
    if (isWikiCaptionCandidate(captionLine)) {
      const captionText = captionLine.trim();
      out.push(
        `${indent}<figure data-haim-wiki-figure="1">${imgTag}<figcaption>${escapeHtml(captionText)}</figcaption></figure>`,
      );
      i = captionIdx;
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}

/** True when a line can be the wiki-image caption (not a new block construct). */
function isWikiCaptionCandidate(line: string): boolean {
  const t = String(line ?? '').trim();
  if (!t) return false;
  if (/^#{1,10}\s/.test(t)) return false;
  if (/^```/.test(t)) return false;
  if (/^!\[\[/.test(t)) return false;
  if (/^</.test(t)) return false;
  if (/^\|/.test(t)) return false;
  if (/^>\s?/.test(t)) return false;
  if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(t)) return false;
  if (/^([-*+]|\d+[.)])\s+/.test(t)) return false;
  if (/^\$\$/.test(t)) return false;
  return true;
}

/** Strip simple HTML from figcaption back toward vault caption text. */
function htmlInlineToMarkdownText(html: string): string {
  let s = String(html || '');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|h[1-6])>/gi, '\n');
  s = s.replace(/<[^>]+>/g, '');
  return unescapeHtml(s).replace(/\s+/g, ' ').trim();
}

/** Remove TipTap/md note-cover preview hosts (nested spinner markup OK). */
function stripNoteCoverPlaceholderHosts(src: string): string {
  const openRe = /<div\b[^>]*\bdata-note-cover-placeholder\b[^>]*>/gi;
  let out = '';
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = openRe.exec(src))) {
    const start = match.index;
    out += src.slice(last, start);
    const afterOpen = start + match[0].length;
    let depth = 1;
    let i = afterOpen;
    while (i < src.length && depth > 0) {
      const nextOpen = src.indexOf('<div', i);
      const nextClose = src.indexOf('</div>', i);
      if (nextClose < 0) {
        i = src.length;
        break;
      }
      if (nextOpen >= 0 && nextOpen < nextClose) {
        depth += 1;
        i = nextOpen + 4;
      } else {
        depth -= 1;
        i = nextClose + 6;
      }
    }
    last = i;
    openRe.lastIndex = i;
  }
  out += src.slice(last);
  return out;
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function unescapeAttr(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function unescapeHtml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
