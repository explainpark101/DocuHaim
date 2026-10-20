/**
 * Keep a source `\~` through TipTap markdown parse.
 * Marked stores an escape as the bare character, and Haim serialize does not
 * put the backslash back. A word-joiner pair around `~` round-trips as `\~`
 * and still displays as a tilde.
 */

const ESCAPED_TILDE = '\u2060~\u2060';

export function protectEscapedTildes(src: string): string {
  if (!src || !src.includes('\\~')) return src;
  let out = '';
  let i = 0;
  while (i < src.length) {
    const fence = openFence(src, i);
    if (fence) {
      const end = closeFence(src, fence.contentFrom, fence.marker);
      out += src.slice(i, end);
      i = end;
      continue;
    }
    if (src[i] === '`') {
      let n = 1;
      while (src[i + n] === '`') n += 1;
      if (n < 3) {
        const close = src.indexOf('`'.repeat(n), i + n);
        const end = close === -1 ? src.length : close + n;
        out += src.slice(i, end);
        i = end;
        continue;
      }
    }
    if (src[i] === '\\' && src[i + 1] === '~' && src[i - 1] !== '\\') {
      out += ESCAPED_TILDE;
      i += 2;
      continue;
    }
    out += src[i];
    i += 1;
  }
  return out;
}

export function restoreEscapedTildes(src: string): string {
  if (!src || !src.includes(ESCAPED_TILDE)) return src;
  return src.split(ESCAPED_TILDE).join('\\~');
}

function openFence(
  src: string,
  i: number,
): { marker: string; contentFrom: number } | null {
  if (i > 0 && src[i - 1] !== '\n') return null;
  let j = i;
  let spaces = 0;
  while (src[j] === ' ' && spaces < 3) {
    j += 1;
    spaces += 1;
  }
  const marker = /^(```+|~~~+)/.exec(src.slice(j));
  if (!marker?.[1]) return null;
  const lineEnd = src.indexOf('\n', j);
  const contentFrom = lineEnd === -1 ? src.length : lineEnd + 1;
  return { marker: marker[1], contentFrom };
}

function closeFence(src: string, from: number, marker: string): number {
  const needle = `\n${marker}`;
  const at = src.indexOf(needle, from);
  if (at === -1) return src.length;
  const after = at + needle.length;
  const lineEnd = src.indexOf('\n', after);
  return lineEnd === -1 ? src.length : lineEnd + 1;
}
