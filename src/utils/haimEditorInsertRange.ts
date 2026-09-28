import type { Editor } from '@tiptap/react';

export type HaimInsertRange = {
  from: number;
  to: number;
};

export type HaimInsertPlacement = 'cursor' | 'end';

export type ResolveHaimInsertRangeOptions = {
  /** Explicit “append at document end” (modal secondary action). */
  forceAppendAtEnd?: boolean;
  /** Last selection while the editor had keyboard focus. */
  lastFocusedRange?: HaimInsertRange | null;
  /** True after the user has focused this editor at least once for the doc. */
  everFocused?: boolean;
};

/** Clamp a ProseMirror range into `0..doc.content.size`. */
export function clampHaimInsertRange(
  docSize: number,
  from: number,
  to: number,
): HaimInsertRange {
  const safeFrom = Math.max(0, Math.min(from, docSize));
  const safeTo = Math.max(safeFrom, Math.min(to, docSize));
  return { from: safeFrom, to: safeTo };
}

/**
 * Resolve where a toolbar/modal insert should land.
 *
 * - forceAppendAtEnd → document end
 * - never focused → document end (fallback)
 * - editor focused → live selection
 * - editor blurred → last focused range, else live selection as last cursor
 */
export function resolveHaimInsertRange(
  editor: Editor,
  {
    forceAppendAtEnd = false,
    lastFocusedRange = null,
    everFocused = false,
  }: ResolveHaimInsertRangeOptions = {},
): HaimInsertRange {
  const size = editor.state.doc.content.size;
  if (forceAppendAtEnd || !everFocused) {
    return { from: size, to: size };
  }
  if (editor.isFocused) {
    const { from, to } = editor.state.selection;
    return clampHaimInsertRange(size, from, to);
  }
  if (lastFocusedRange) {
    return clampHaimInsertRange(
      size,
      lastFocusedRange.from,
      lastFocusedRange.to,
    );
  }
  const { from, to } = editor.state.selection;
  return clampHaimInsertRange(size, from, to);
}

/** Escape display text for a markdown `[label](href)` insert. */
export function escapeMarkdownLinkLabel(label: string): string {
  return label
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');
}
