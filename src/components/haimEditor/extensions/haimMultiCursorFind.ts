/**
 * Occurrence / word helpers for Haim WYSIWYG multi-cursor (Mod-d / Mod-Shift-l).
 * Case-sensitive literal match within the document text stream
 * (textblocks joined with gaps so matches never cross blocks / non-text inlines).
 */

import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export type MultiRange = { from: number; to: number };

const WORD_CHAR_RE = /[\p{L}\p{N}_]/u;

/**
 * Expand caret to the word under `pos` (letters / numbers / underscore).
 * Returns null when there is no word character at or beside the caret.
 */
export function wordRangeAt(
  doc: ProseMirrorNode,
  pos: number,
): MultiRange | null {
  try {
    const $pos = doc.resolve(pos);
    if (!$pos.parent.isTextblock) return null;
    const start = $pos.start();
    const text = $pos.parent.textContent;
    if (!text) return null;
    let offset = Math.max(0, Math.min(text.length, pos - start));

    // Prefer the char before caret when caret sits on a boundary.
    let probe = offset;
    if (probe > 0 && (probe >= text.length || !WORD_CHAR_RE.test(text[probe]!))) {
      probe = offset - 1;
    }
    if (probe < 0 || probe >= text.length || !WORD_CHAR_RE.test(text[probe]!)) {
      return null;
    }

    let from = probe;
    let to = probe + 1;
    while (from > 0 && WORD_CHAR_RE.test(text[from - 1]!)) from -= 1;
    while (to < text.length && WORD_CHAR_RE.test(text[to]!)) to += 1;
    return { from: start + from, to: start + to };
  } catch {
    return null;
  }
}

type TextSlice = {
  /** Absolute doc position of this character. */
  pos: number;
  ch: string;
};

/**
 * Flatten document text for literal search.
 * Non-text inline leaves a gap marker so matches never span them;
 * textblock boundaries insert a newline gap.
 */
function flattenDocText(doc: ProseMirrorNode): TextSlice[] {
  const out: TextSlice[] = [];
  doc.descendants((node, pos) => {
    if (node.isTextblock) {
      if (out.length > 0) {
        // Gap between textblocks — never part of a match.
        out.push({ pos: -1, ch: '\n' });
      }
      node.forEach((child, offset) => {
        if (child.isText && child.text) {
          const base = pos + 1 + offset;
          for (let i = 0; i < child.text.length; i += 1) {
            out.push({ pos: base + i, ch: child.text[i]! });
          }
        } else if (!child.isText) {
          out.push({ pos: -1, ch: '\0' });
        }
      });
      return false;
    }
    return true;
  });
  return out;
}

/**
 * Find all non-overlapping occurrences of `query` in document order.
 * Skips empty query. Caps at `maxMatches` (CodeMirror selectSelectionMatches uses 1000).
 */
export function findAllOccurrences(
  doc: ProseMirrorNode,
  query: string,
  maxMatches = 1000,
): MultiRange[] {
  if (!query) return [];
  const slices = flattenDocText(doc);
  if (!slices.length) return [];
  const hay = slices.map((s) => s.ch).join('');
  const needle = query;
  if (!needle) return [];

  const results: MultiRange[] = [];
  let fromIndex = 0;
  while (results.length < maxMatches) {
    const idx = hay.indexOf(needle, fromIndex);
    if (idx < 0) break;
    const end = idx + needle.length;
    const startSlice = slices[idx];
    const endSlice = slices[end - 1];
    // Reject matches that cross a gap marker.
    let crossesGap = false;
    for (let i = idx; i < end; i += 1) {
      if (slices[i]!.pos < 0) {
        crossesGap = true;
        break;
      }
    }
    if (!crossesGap && startSlice && endSlice && startSlice.pos >= 0 && endSlice.pos >= 0) {
      results.push({ from: startSlice.pos, to: endSlice.pos + 1 });
    }
    fromIndex = idx + Math.max(1, needle.length);
  }
  return results;
}

/**
 * Next occurrence after `afterTo`, wrapping around. Skips ranges already selected.
 * When `wholeWord` is true, only accept matches that are exact word ranges.
 */
export function findNextOccurrence(
  doc: ProseMirrorNode,
  query: string,
  afterTo: number,
  occupied: readonly MultiRange[],
  wholeWord: boolean,
): MultiRange | null {
  const all = findAllOccurrences(doc, query);
  if (!all.length) return null;

  const isOccupied = (r: MultiRange) =>
    occupied.some((o) => o.from === r.from && o.to === r.to);

  const isWordOk = (r: MultiRange) => {
    if (!wholeWord) return true;
    const w = wordRangeAt(doc, r.from);
    return Boolean(w && w.from === r.from && w.to === r.to);
  };

  const after = all.find((r) => r.from >= afterTo && !isOccupied(r) && isWordOk(r));
  if (after) return after;

  // Wrap: first match not already occupied.
  return all.find((r) => !isOccupied(r) && isWordOk(r)) ?? null;
}

/** Plain text covered by a range (block-aware). */
export function rangeText(doc: ProseMirrorNode, range: MultiRange): string {
  if (range.from >= range.to) return '';
  try {
    return doc.textBetween(range.from, range.to, '\n');
  } catch {
    return '';
  }
}
