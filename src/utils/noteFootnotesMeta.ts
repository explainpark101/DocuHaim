/**
 * Per-document footnotes meta: leading HTML comment JSON (after note-cover).
 *
 * <!-- footnotes
 * {"v":1,"enabled":true}
 * -->
 */

export type NoteFootnotesMeta = {
  v: 1;
  /** When false, preview does not link [^N] or render Sources. Default true when omitted. */
  enabled: boolean;
};

export const DEFAULT_NOTE_FOOTNOTES_META: NoteFootnotesMeta = {
  v: 1,
  enabled: true,
};

const FOOTNOTES_COMMENT_RE = /<!--\s*footnotes\s*([\s\S]*?)-->/i;

/** Escape `--` so the payload is safe inside an HTML comment. */
export function escapeFootnotesJsonForComment(json: string): string {
  return String(json || '').replace(/--/g, '\\u002d\\u002d');
}

export function unescapeFootnotesJsonFromComment(raw: string): string {
  return String(raw || '').replace(/\\u002d\\u002d/g, '--');
}

function normalizeMeta(parsed: unknown): NoteFootnotesMeta {
  const obj = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  return {
    v: 1,
    enabled: obj.enabled === false ? false : true,
  };
}

export type ParseNoteFootnotesMetaResult = {
  meta: NoteFootnotesMeta | null;
  /** Markdown with the footnotes comment removed (leading whitespace cleaned). */
  body: string;
  /** Full comment match range in original markdown, or null. */
  range: { start: number; end: number } | null;
};

/**
 * Find `<!-- footnotes … -->` near the document top (after optional note-cover / blanks).
 */
export function parseNoteFootnotesMeta(markdown: string): ParseNoteFootnotesMetaResult {
  const src = String(markdown ?? '');
  const match = FOOTNOTES_COMMENT_RE.exec(src);
  if (!match || match.index === undefined) {
    return { meta: null, body: src, range: null };
  }

  // Only accept when everything before the comment is leading comments/whitespace
  // (note-cover, blanks) — not mid-document.
  const before = src.slice(0, match.index);
  if (!isLeadingMetaRegion(before)) {
    return { meta: null, body: src, range: null };
  }

  let meta: NoteFootnotesMeta | null = null;
  try {
    const json = unescapeFootnotesJsonFromComment(match[1] ?? '').trim();
    meta = normalizeMeta(JSON.parse(json || '{}'));
  } catch {
    meta = { ...DEFAULT_NOTE_FOOTNOTES_META };
  }

  const start = match.index;
  const end = start + match[0].length;
  let body = `${src.slice(0, start)}${src.slice(end)}`;
  body = body.replace(/^\uFEFF?[\t ]*\n/, '');
  return { meta, body, range: { start, end } };
}

/** True when `before` is only BOM, whitespace, and/or a leading note-cover comment. */
function isLeadingMetaRegion(before: string): boolean {
  const rest = String(before || '')
    .replace(/^\uFEFF/, '')
    .replace(/<!--\s*note-cover\b[\s\S]*?-->/i, '')
    .trim();
  return rest === '';
}

export function isNoteFootnotesEnabledInMarkdown(markdown: string): boolean {
  const { meta } = parseNoteFootnotesMeta(markdown);
  if (!meta) return DEFAULT_NOTE_FOOTNOTES_META.enabled;
  return meta.enabled !== false;
}

export function serializeNoteFootnotesComment(meta: NoteFootnotesMeta): string {
  const payload = {
    v: 1 as const,
    enabled: meta.enabled !== false,
  };
  const json = JSON.stringify(payload);
  return `<!-- footnotes\n${escapeFootnotesJsonForComment(json)}\n-->`;
}

/**
 * Insert/replace leading footnotes comment (keeps note-cover first when present).
 */
export function upsertNoteFootnotesMeta(
  markdown: string,
  meta: NoteFootnotesMeta | null,
): string {
  const src = String(markdown ?? '');
  const { body } = parseNoteFootnotesMeta(src);

  if (!meta) return body;

  const comment = serializeNoteFootnotesComment(meta);
  const coverMatch = /^[\uFEFF\s]*<!--\s*note-cover\b[\s\S]*?-->/.exec(body);
  if (coverMatch) {
    const head = coverMatch[0];
    const rest = body.slice(head.length).replace(/^\n*/, '\n');
    return `${head}\n${comment}${rest}`;
  }

  const stripped = body.replace(/^\uFEFF/, '').replace(/^\n+/, '');
  return `${comment}\n${stripped}`;
}
