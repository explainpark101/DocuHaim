import type {
  MarkdownLexerConfiguration,
  MarkdownToken,
  MarkdownTokenizer,
} from '@tiptap/core';
import {
  OrderedList,
  parsePlainTextOrderedListPaste,
} from '@tiptap/extension-list';
import { Plugin } from '@tiptap/pm/state';

/**
 * Letter and roman markers (`a.`, `A.`, `i.`, `iv.`, `b)`) stay plain text.
 * Numeric markers (`1.`, `2)`) stay ordered lists.
 */
const LETTER_ORDERED_MARKER_LINE = /^[ \t]*[a-zA-Z]+[.)][ \t]+/;

export function isLetterOrderedListLine(line: string): boolean {
  return LETTER_ORDERED_MARKER_LINE.test(line);
}

/**
 * Reject a block that starts with a letter marker, and cut the source before
 * a later one so it is not absorbed into a numeric list.
 * `null` means this block must not enter the ordered-list tokenizer.
 */
export function markdownWithoutLetterOrderedItems(src: string): string | null {
  const lines = src.split('\n');
  if (isLetterOrderedListLine(lines[0] ?? '')) return null;
  const cut = lines.findIndex(
    (line, index) => index > 0 && isLetterOrderedListLine(line),
  );
  if (cut === -1) return src;
  return lines.slice(0, cut).join('\n');
}

const parentTokenizer = OrderedList.config.markdownTokenizer;

function haimOrderedListTokenizer(): MarkdownTokenizer | undefined {
  if (!parentTokenizer) return undefined;
  const tokenizeParent = parentTokenizer.tokenize.bind(parentTokenizer);
  return {
    ...parentTokenizer,
    tokenize(
      src: string,
      tokens: MarkdownToken[],
      lexer: MarkdownLexerConfiguration,
    ) {
      const next = markdownWithoutLetterOrderedItems(src);
      if (next == null) return undefined;
      return tokenizeParent(next, tokens, lexer);
    },
  };
}

const letterSafeTokenizer = haimOrderedListTokenizer();

export const HaimOrderedList = OrderedList.extend({
  ...(letterSafeTokenizer ? { markdownTokenizer: letterSafeTokenizer } : {}),

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            const html = event.clipboardData?.getData('text/html');
            if (html?.trim()) return false;

            const text = event.clipboardData?.getData('text/plain');
            if (!text) return false;

            const first =
              text.split('\n').find((line) => line.trim().length > 0) ?? '';
            if (isLetterOrderedListLine(first)) return false;

            const content = parsePlainTextOrderedListPaste(text);
            if (!content) return false;
            const markerType = content.attrs?.type;
            if (typeof markerType === 'string' && markerType !== '1') {
              return false;
            }

            try {
              const node = view.state.schema.nodeFromJSON(content);
              view.dispatch(view.state.tr.replaceSelectionWith(node));
              return true;
            } catch {
              return false;
            }
          },
        },
      }),
    ];
  },
});
