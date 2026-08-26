/**
 * Normalize markdown source / DOM textContent for print-preview targeting
 * (pgbr insert, heading match).
 */

export function normalizePrintVisibleText(value: string): string {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strip common inline markdown so preview textContent can match source lines.
 * Single `_italic_` only when underscores are not mid-identifier (snake_case safe).
 */
export function visibleInlineTextFromMarkdown(value: string): string {
  let s = String(value ?? '');
  s = s.replace(/!\[[^\]]*]\([^)]*\)/g, '');
  s = s.replace(/\[([^\]]*)]\([^)]*\)/g, '$1');
  s = s.replace(/`([^`]+)`/g, '$1');
  for (let i = 0; i < 3; i += 1) {
    s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
    s = s.replace(/__([^_]+)__/g, '$1');
    s = s.replace(/~~([^~]+)~~/g, '$1');
    // Single * italic — avoid mid-token glitches; allow start/end and punctuation flanks.
    s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, '$1$2');
    // Single _ italic — do not treat snake_case (is_role_writable) as emphasis.
    s = s.replace(
      /(^|[^A-Za-z0-9_])_([^_\n]+)_(?=[^A-Za-z0-9_]|$)/g,
      '$1$2',
    );
  }
  return normalizePrintVisibleText(s);
}
