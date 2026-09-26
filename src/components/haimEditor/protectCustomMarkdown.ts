/**
 * Protect custom markdown constructs TipTap cannot parse yet by wrapping
 * them as sentinel blocks, then restore on serialize.
 *
 * Sentinel form (avoids nested ``` fences):
 *   @@@haim-raw:mermaid
 *   ...original...
 *   @@@/haim-raw
 */

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

function wrapSentinel(kind: string, body: string): string {
  const trimmed = body.replace(/\s+$/, '');
  return `${SENTINEL_OPEN}${kind}\n${trimmed}\n${SENTINEL_CLOSE}\n\n`;
}

export function protectCustomMarkdown(src: string): string {
  let out = typeof src === 'string' ? src : '';

  out = out.replace(MERMAID_BLOCK_RE, (m) => wrapSentinel('mermaid', m));
  out = out.replace(HAIM_TABLE_RE, (m) => wrapSentinel('haim-table', m));
  out = out.replace(CHAT_SAVED_RE, (m) => wrapSentinel('chat-saved-note', m));

  const plan = PLAN_FM_RE.exec(out);
  if (plan && plan[0]) {
    out = wrapSentinel('plan-frontmatter', plan[0]) + out.slice(plan[0].length);
  }

  // Page breaks → HTML TipTap PageBreak can parse via Markdown html
  out = out.replace(/<pgbr\s*\/?\s*>/gi, '<pgbr></pgbr>');

  // Wiki images → HTML TipTap WikiImage can parse
  out = out.replace(/!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (_m, path, opts) => {
    const p = String(path || '').trim();
    const o = opts != null ? String(opts).trim() : '';
    return `<div data-haim-wiki-image="1" data-wiki-path="${escapeAttr(p)}" data-wiki-options="${escapeAttr(o)}"></div>`;
  });

  // Deep headings #######…########## → h6 data-heading-level
  out = out.replace(/^(#{7,10})\s+(.+)$/gm, (_m, hashes: string, title: string) => {
    const level = hashes.length;
    return `<h6 data-heading-level="${level}">${title}</h6>`;
  });

  return out;
}

export function restoreCustomMarkdown(src: string): string {
  let out = typeof src === 'string' ? src : '';

  // Restore haim-raw sentinels (non-nested delimiter)
  out = out.replace(
    /@@@haim-raw:([^\n]*)\n([\s\S]*?)\n@@@\/haim-raw/g,
    (_m, _kind, body) => {
      const text = String(body || '');
      return text.endsWith('\n') ? text : `${text}\n`;
    },
  );

  // TipTap may emit wiki HTML — read attrs without order dependency
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
      const text = String(inner).replace(/<[^>]+>/g, '').trim();
      return `${'#'.repeat(n)} ${text}`;
    },
  );

  return out;
}

function attr(tag: string, name: string): string {
  const m = new RegExp(`${name}="([^"]*)"`, 'i').exec(tag);
  return m ? unescapeAttr(m[1] || '') : '';
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
