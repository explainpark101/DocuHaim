/**
 * Shared helpers for code-block / fence Enter indent + blank-line exit.
 */

/** Leading spaces/tabs to copy onto the next line after Enter. */
export function leadingLineIndent(line: string): string {
  return String(line ?? '').match(/^[ \t]*/)?.[0] ?? '';
}

/** Empty or whitespace-only code line. */
export function isBlankCodeLine(line: string): boolean {
  return /^[ \t]*$/.test(String(line ?? ''));
}

/**
 * True when `text` ends with at least two blank (ws-only) lines —
 * the TipTap exitOnTripleEnter condition, tolerant of indented blanks.
 */
export function endsWithTwoBlankCodeLines(text: string): boolean {
  const lines = String(text ?? '').split('\n');
  if (lines.length < 2) return false;
  return (
    isBlankCodeLine(lines[lines.length - 1]!) &&
    isBlankCodeLine(lines[lines.length - 2]!)
  );
}

/**
 * Drop leading/trailing blank (empty or whitespace-only) lines from a fence body.
 */
export function trimCodeFenceBlankLines(text: string): string {
  const lines = String(text ?? '').split('\n');
  let start = 0;
  let end = lines.length;
  while (start < end && isBlankCodeLine(lines[start]!)) start += 1;
  while (end > start && isBlankCodeLine(lines[end - 1]!)) end -= 1;
  return lines.slice(start, end).join('\n');
}

/** Indent of the line that contains `offset` within `text` (0-based). */
export function indentAtOffset(text: string, offset: number): string {
  const safe = String(text ?? '');
  const pos = Math.max(0, Math.min(offset, safe.length));
  const lineStart = safe.lastIndexOf('\n', pos - 1) + 1;
  const lineEnd = safe.indexOf('\n', pos);
  const line = safe.slice(lineStart, lineEnd === -1 ? safe.length : lineEnd);
  return leadingLineIndent(line);
}
