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

  // Page breaks → HTML TipTap PageBreak can parse
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
