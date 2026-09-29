/**
 * Bracket / quote auto-pair inside markdown fenced code bodies in HaimSourcePane.
 * Mirrors TipTap codeBlockBracketPairs behavior (same pairs, quote rules, JS-family backticks).
 */

import {
  EditorSelection,
  EditorState,
  Prec,
  type TransactionSpec,
} from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import {
  CODE_BLOCK_BRACKET_PAIRS,
  isCodeBlockBacktickLanguage,
  resolveBracketPairKey,
} from '@/components/haimEditor/codeBlockBracketPairs';
import { findCodeFenceBodyAt } from '@/components/haimEditor/cmCodeFenceIndent';

const CLOSE_CHARS = new Set(Object.values(CODE_BLOCK_BRACKET_PAIRS));

type KeyLike = Pick<KeyboardEvent, 'key' | 'code'> &
  Partial<
    Pick<
      KeyboardEvent,
      'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'isComposing' | 'defaultPrevented'
    >
  >;

function charAt(state: EditorState, pos: number): string {
  if (pos < 0 || pos >= state.doc.length) return '';
  return state.doc.sliceString(pos, pos + 1);
}

/** Both ends of the selection must sit inside the same fence body. */
export function isSelectionInsideSameCodeFence(state: EditorState): boolean {
  const { from, to, empty } = state.selection.main;
  const fenceFrom = findCodeFenceBodyAt(state, from);
  if (!fenceFrom) return false;
  if (empty) return true;
  const fenceTo = findCodeFenceBodyAt(state, Math.max(from, to - 1));
  if (!fenceTo || fenceTo.bodyFrom !== fenceFrom.bodyFrom) return false;
  if (from < fenceFrom.bodyFrom || to > fenceFrom.bodyTo) return false;
  return true;
}

function fenceLanguage(state: EditorState): string {
  return findCodeFenceBodyAt(state, state.selection.main.from)?.language ?? '';
}

function isWordish(ch: string): boolean {
  if (!ch) return false;
  return /[\w$]/.test(ch);
}

function shouldAutoPairQuote(state: EditorState, quote: string): boolean {
  const { from } = state.selection.main;
  const before = charAt(state, from - 1);
  const after = charAt(state, from);
  if (isWordish(before) || isWordish(after)) return false;
  if (after === quote) return false;
  return true;
}

/**
 * Build a transaction for fence-body bracket/quote behavior, or null if no-op.
 * Backtick pairing only runs for JS-family fence languages.
 */
export function buildCodeFenceBracketTransaction(
  state: EditorState,
  typed: string,
): TransactionSpec | null {
  if (!isSelectionInsideSameCodeFence(state)) return null;

  if (typed === '`' && !isCodeBlockBacktickLanguage(fenceLanguage(state))) {
    return null;
  }

  const { from, to, empty } = state.selection.main;
  const close = CODE_BLOCK_BRACKET_PAIRS[typed];

  if (close !== undefined) {
    if (!empty) {
      const selected = state.doc.sliceString(from, to);
      return {
        changes: { from, to, insert: `${typed}${selected}${close}` },
        selection: EditorSelection.range(
          from + typed.length,
          from + typed.length + selected.length,
        ),
        userEvent: 'input.type',
      };
    }

    if (typed === "'" || typed === '"' || typed === '`') {
      if (!shouldAutoPairQuote(state, typed)) {
        if (charAt(state, from) === typed) {
          return {
            selection: EditorSelection.cursor(from + 1),
            userEvent: 'select',
          };
        }
        return null;
      }
    }

    return {
      changes: { from, to, insert: `${typed}${close}` },
      selection: EditorSelection.cursor(from + typed.length),
      userEvent: 'input.type',
    };
  }

  if (CLOSE_CHARS.has(typed) && empty && charAt(state, from) === typed) {
    if (typed === '`' && !isCodeBlockBacktickLanguage(fenceLanguage(state))) {
      return null;
    }
    return {
      selection: EditorSelection.cursor(from + 1),
      userEvent: 'select',
    };
  }

  return null;
}

/** Backspace deletes an empty pair `(|)` → `|` when caret is between them. */
export function buildCodeFenceBracketBackspaceTransaction(
  state: EditorState,
): TransactionSpec | null {
  if (!isSelectionInsideSameCodeFence(state)) return null;
  const { from, empty } = state.selection.main;
  if (!empty) return null;

  const before = charAt(state, from - 1);
  const after = charAt(state, from);
  const expectedClose = CODE_BLOCK_BRACKET_PAIRS[before];
  if (!expectedClose || after !== expectedClose) return null;
  if (
    before === '`' &&
    !isCodeBlockBacktickLanguage(fenceLanguage(state))
  ) {
    return null;
  }

  return {
    changes: { from: from - 1, to: from + 1, insert: '' },
    selection: EditorSelection.cursor(from - 1),
    userEvent: 'delete.backward',
  };
}

export function tryHandleCodeFenceBracketKey(
  view: EditorView,
  event: KeyLike,
): boolean {
  if (event.defaultPrevented) return false;

  if (event.key === 'Backspace') {
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) {
      return false;
    }
    const spec = buildCodeFenceBracketBackspaceTransaction(view.state);
    if (!spec) return false;
    view.dispatch(spec);
    return true;
  }

  const typed = resolveBracketPairKey(event);
  if (!typed) return false;

  const spec = buildCodeFenceBracketTransaction(view.state, typed);
  if (!spec) return false;
  view.dispatch(spec);
  return true;
}

/**
 * High precedence so fence bracket pairs run before default CM input.
 * Outside fences the handler returns false (normal editing unchanged).
 */
export const CODE_FENCE_BRACKET_PAIRS_EXTENSION = Prec.high(
  EditorView.domEventHandlers({
    keydown(event, view) {
      if (!tryHandleCodeFenceBracketKey(view, event)) return false;
      event.preventDefault();
      return true;
    },
  }),
);
