import { Plugin, PluginKey, TextSelection, type EditorState, type Transaction } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';

/** Opening → closing pairs (code-editor style). Backtick is JS-family only. */
export const CODE_BLOCK_BRACKET_PAIRS: Readonly<Record<string, string>> = {
  '(': ')',
  '[': ']',
  '{': '}',
  "'": "'",
  '"': '"',
  '`': '`',
};

/** Fence languages where backtick pairs like `[` (template / string wrap). */
export const CODE_BLOCK_BACKTICK_LANGUAGES = new Set([
  'js',
  'javascript',
  'jsx',
  'mjs',
  'cjs',
  'ts',
  'typescript',
  'tsx',
]);

const CLOSE_CHARS = new Set(Object.values(CODE_BLOCK_BRACKET_PAIRS));

type KeyLike = Pick<
  KeyboardEvent,
  'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'isComposing' | 'defaultPrevented'
>;

const pluginKey = new PluginKey('haimCodeBlockBracketPairs');

function charAt(state: EditorState, pos: number): string {
  if (pos < 0 || pos >= state.doc.content.size) return '';
  return state.doc.textBetween(pos, pos + 1);
}

export function getCodeBlockLanguage(state: EditorState): string {
  const { $from } = state.selection;
  if ($from.parent.type.name !== 'codeBlock') return '';
  return String($from.parent.attrs.language || '')
    .trim()
    .toLowerCase();
}

export function isCodeBlockBacktickLanguage(language: string): boolean {
  return CODE_BLOCK_BACKTICK_LANGUAGES.has(String(language || '').trim().toLowerCase());
}

/** Both ends of the selection must sit inside the same codeBlock. */
export function isSelectionInsideSameCodeBlock(state: EditorState): boolean {
  const { $from, $to } = state.selection;
  if ($from.parent.type.name !== 'codeBlock') return false;
  if ($to.parent.type.name !== 'codeBlock') return false;
  return $from.before($from.depth) === $to.before($to.depth);
}

/**
 * Resolve the typed open/close character for bracket-pair handling.
 * Returns null when the key is not a pair trigger.
 */
export function resolveBracketPairKey(event: KeyLike): string | null {
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) {
    return null;
  }
  const { key, code } = event;
  if (key === '`' || (code === 'Backquote' && !event.shiftKey)) {
    return '`';
  }
  if (key in CODE_BLOCK_BRACKET_PAIRS || CLOSE_CHARS.has(key)) {
    return key;
  }
  // KO / layout-independent Quote key (same idea as mdEditorSelectionWrap)
  if (code === 'Quote') {
    return event.shiftKey ? '"' : "'";
  }
  return null;
}

function isWordish(ch: string): boolean {
  if (!ch) return false;
  return /[\w$]/.test(ch);
}

/**
 * Quotes should not auto-pair when they look like an apostrophe or sit next to a word.
 */
function shouldAutoPairQuote(state: EditorState, quote: string): boolean {
  const { from } = state.selection;
  const before = charAt(state, from - 1);
  const after = charAt(state, from);
  if (isWordish(before) || isWordish(after)) return false;
  if (after === quote) return false;
  return true;
}

/**
 * Build a transaction for code-block bracket/quote behavior, or null if no-op.
 * Backtick pairing only runs for JS-family fence languages.
 */
export function buildCodeBlockBracketTransaction(
  state: EditorState,
  typed: string,
): Transaction | null {
  if (!isSelectionInsideSameCodeBlock(state)) return null;

  if (typed === '`' && !isCodeBlockBacktickLanguage(getCodeBlockLanguage(state))) {
    return null;
  }

  const { selection } = state;
  const { from, to, empty } = selection;
  const close = CODE_BLOCK_BRACKET_PAIRS[typed];

  if (close !== undefined) {
    if (!empty) {
      const selected = state.doc.textBetween(from, to);
      const tr = state.tr.insertText(`${typed}${selected}${close}`, from, to);
      tr.setSelection(
        TextSelection.create(
          tr.doc,
          from + typed.length,
          from + typed.length + selected.length,
        ),
      );
      return tr;
    }

    if (typed === "'" || typed === '"' || typed === '`') {
      if (!shouldAutoPairQuote(state, typed)) {
        if (charAt(state, from) === typed) {
          return state.tr.setSelection(TextSelection.create(state.doc, from + 1));
        }
        return null;
      }
    }

    const tr = state.tr.insertText(`${typed}${close}`, from, to);
    tr.setSelection(TextSelection.create(tr.doc, from + typed.length));
    return tr;
  }

  if (CLOSE_CHARS.has(typed) && empty && charAt(state, from) === typed) {
    // Closing backtick skip only in JS-family (we never auto-inserted elsewhere)
    if (typed === '`' && !isCodeBlockBacktickLanguage(getCodeBlockLanguage(state))) {
      return null;
    }
    return state.tr.setSelection(TextSelection.create(state.doc, from + 1));
  }

  return null;
}

/** Backspace deletes an empty pair `(|)` → `|` when caret is between them. */
export function buildCodeBlockBracketBackspaceTransaction(
  state: EditorState,
): Transaction | null {
  if (!isSelectionInsideSameCodeBlock(state)) return null;
  const { selection } = state;
  if (!selection.empty) return null;

  const { from } = selection;
  const before = charAt(state, from - 1);
  const after = charAt(state, from);
  const expectedClose = CODE_BLOCK_BRACKET_PAIRS[before];
  if (!expectedClose || after !== expectedClose) return null;
  if (
    before === '`' &&
    !isCodeBlockBacktickLanguage(getCodeBlockLanguage(state))
  ) {
    return null;
  }

  return state.tr.delete(from - 1, from + 1);
}

export function tryHandleCodeBlockBracketKey(
  view: EditorView,
  event: KeyLike,
): boolean {
  if (event.defaultPrevented) return false;

  if (event.key === 'Backspace') {
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) {
      return false;
    }
    const tr = buildCodeBlockBracketBackspaceTransaction(view.state);
    if (!tr) return false;
    view.dispatch(tr);
    return true;
  }

  const typed = resolveBracketPairKey(event);
  if (!typed) return false;

  const tr = buildCodeBlockBracketTransaction(view.state, typed);
  if (!tr) return false;
  view.dispatch(tr);
  return true;
}

export function createCodeBlockBracketPairsPlugin(): Plugin {
  return new Plugin({
    key: pluginKey,
    props: {
      handleKeyDown(view, event) {
        return tryHandleCodeBlockBracketKey(view, event);
      },
    },
  });
}
