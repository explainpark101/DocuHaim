/**
 * Text-level fold for chat → note origin cards in Haim protectCustomMarkdown.
 * Mirrors chat-saved-note.md Spec §3 / chatSavedNoteMarkdownIt fold:
 * meta comment + optional blockquote + optional chat-link paragraph only.
 */

const COMMENT_OPEN_RE = /<!--\s*chat-with-myself\b/i;
const CHAT_LINK_HREF_RE = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i;

function isBlankLine(line: string): boolean {
  return !String(line ?? '').trim();
}

function isBlockquoteLine(line: string): boolean {
  return /^\s{0,3}>/.test(String(line ?? ''));
}

function isChatLinkParagraphLine(line: string): boolean {
  const t = String(line ?? '').trim();
  const m = /^\[([^\]]*)\]\(([^)\s]+)\)$/.exec(t);
  if (!m) return false;
  const href = m[2] || '';
  return CHAT_LINK_HREF_RE.test(href) || /#msg-/.test(href);
}

/**
 * Advance `pos` past consecutive blank lines (each ends at `\n` or EOF).
 * Does not consume a non-blank line.
 */
function skipBlankLines(text: string, pos: number): number {
  let i = pos;
  while (i < text.length) {
    const nl = text.indexOf('\n', i);
    const lineEnd = nl < 0 ? text.length : nl;
    const line = text.slice(i, lineEnd);
    if (!isBlankLine(line)) return i;
    i = nl < 0 ? text.length : nl + 1;
  }
  return i;
}

/**
 * From `fromIndex`, find the next chat-with-myself card source span.
 * Returns null when no comment is found.
 */
export function findChatSavedNoteCardSpan(
  src: string,
  fromIndex = 0,
): { start: number; end: number } | null {
  const text = String(src ?? '');
  const slice = text.slice(fromIndex);
  const open = COMMENT_OPEN_RE.exec(slice);
  if (!open) return null;
  const start = fromIndex + open.index;
  const afterOpen = start + open[0].length;
  const closeIdx = text.indexOf('-->', afterOpen);
  if (closeIdx < 0) return null;

  let pos = closeIdx + 3;

  // Optional newline(s) / blank lines after the comment
  pos = skipBlankLines(text, pos);

  // Optional contiguous blockquote lines
  if (pos < text.length) {
    const nl = text.indexOf('\n', pos);
    const firstLine = text.slice(pos, nl < 0 ? text.length : nl);
    if (isBlockquoteLine(firstLine)) {
      while (pos < text.length) {
        const lineNl = text.indexOf('\n', pos);
        const lineEnd = lineNl < 0 ? text.length : lineNl;
        const line = text.slice(pos, lineEnd);
        if (!isBlockquoteLine(line)) break;
        pos = lineNl < 0 ? text.length : lineNl + 1;
      }
      pos = skipBlankLines(text, pos);
    }
  }

  // Optional single chat deep-link paragraph (do not consume trailing blank)
  if (pos < text.length) {
    const nl = text.indexOf('\n', pos);
    const lineEnd = nl < 0 ? text.length : nl;
    const line = text.slice(pos, lineEnd);
    if (isChatLinkParagraphLine(line)) {
      pos = nl < 0 ? text.length : nl;
      // Include the newline that ends the link paragraph when present,
      // so the following blank line stays as body separator.
      if (nl >= 0) pos = nl + 1;
    }
  }

  return { start, end: pos };
}

/**
 * Replace each chat-saved-note card span with `wrap(body)`.
 * Message body after the card is left untouched.
 */
export function replaceChatSavedNoteCardSpans(
  src: string,
  wrap: (cardSource: string) => string,
): string {
  const text = String(src ?? '');
  let out = '';
  let cursor = 0;
  while (cursor < text.length) {
    const span = findChatSavedNoteCardSpan(text, cursor);
    if (!span) {
      out += text.slice(cursor);
      break;
    }
    out += text.slice(cursor, span.start);
    out += wrap(text.slice(span.start, span.end));
    cursor = span.end;
  }
  return out;
}
