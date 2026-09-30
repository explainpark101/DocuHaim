/**
 * TipTap multi-occurrence selection (VS Code-style Mod-d / Mod-Shift-l).
 *
 * ProseMirror only has one native Selection; secondary ranges live in plugin
 * state and are drawn as decorations. Typing / Backspace / Delete apply to
 * every range. Each Haim pane (WYSIWYG vs source CM) keeps its own selection.
 */

import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import {
  findAllOccurrences,
  findNextOccurrence,
  rangeText,
  wordRangeAt,
  type MultiRange,
} from '@/components/haimEditor/extensions/haimMultiCursorFind';

export type HaimMultiCursorState = {
  ranges: MultiRange[];
  mainIndex: number;
  /** Search string for successive Mod-d; null when idle. */
  query: string | null;
  /** True when the query came from word-expand (CM fullWord behavior). */
  wholeWord: boolean;
};

export const haimMultiCursorKey = new PluginKey<HaimMultiCursorState>(
  'haimMultiCursor',
);

const EMPTY_STATE: HaimMultiCursorState = {
  ranges: [],
  mainIndex: 0,
  query: null,
  wholeWord: false,
};

const META_SET = 'set';
const META_CLEAR = 'clear';

type MultiCursorMeta =
  | { type: typeof META_SET; state: HaimMultiCursorState }
  | { type: typeof META_CLEAR };

function getMultiState(state: EditorState): HaimMultiCursorState {
  return haimMultiCursorKey.getState(state) ?? EMPTY_STATE;
}

function mapRanges(
  ranges: readonly MultiRange[],
  mapping: Transaction['mapping'],
): MultiRange[] {
  const next: MultiRange[] = [];
  for (const r of ranges) {
    const from = mapping.map(r.from, 1);
    const to = mapping.map(r.to, -1);
    if (from <= to) next.push({ from, to });
  }
  // Merge overlaps (sorted).
  next.sort((a, b) => a.from - b.from || a.to - b.to);
  const merged: MultiRange[] = [];
  for (const r of next) {
    const last = merged[merged.length - 1];
    if (last && r.from <= last.to) {
      last.to = Math.max(last.to, r.to);
    } else {
      merged.push({ ...r });
    }
  }
  return merged;
}

function buildDecorations(
  doc: EditorState['doc'],
  st: HaimMultiCursorState,
): DecorationSet {
  if (st.ranges.length <= 1) return DecorationSet.empty;
  const main = st.ranges[st.mainIndex];
  const decos: Decoration[] = [];
  for (let i = 0; i < st.ranges.length; i += 1) {
    const r = st.ranges[i]!;
    if (main && r.from === main.from && r.to === main.to) continue;
    if (r.from === r.to) {
      decos.push(
        Decoration.widget(r.from, () => {
          const el = document.createElement('span');
          el.className = 'haim-multi-cursor';
          el.setAttribute('aria-hidden', 'true');
          return el;
        }, { side: -1 }),
      );
    } else {
      decos.push(
        Decoration.inline(r.from, r.to, { class: 'haim-multi-selection' }),
      );
    }
  }
  return DecorationSet.create(doc, decos);
}

/**
 * Replace every range with `text` (descending so positions stay valid).
 * Returns a transaction that also updates multi-cursor plugin state.
 */
export function replaceMultiRanges(
  state: EditorState,
  ranges: readonly MultiRange[],
  text: string,
  mainIndex: number,
): Transaction {
  const sorted = ranges
    .map((r, i) => ({ r, i }))
    .sort((a, b) => b.r.from - a.r.from || b.r.to - a.r.to);

  let tr = state.tr;
  const placed: { i: number; from: number; to: number }[] = [];

  for (const { r, i } of sorted) {
    tr = tr.insertText(text, r.from, r.to);
    placed.push({ i, from: r.from, to: r.from + text.length });
  }

  placed.sort((a, b) => a.from - b.from);
  const newRanges = placed.map((p) => ({ from: p.from, to: p.to }));
  const newMainIdx = Math.max(
    0,
    placed.findIndex((p) => p.i === mainIndex),
  );
  const main = newRanges[newMainIdx] ?? newRanges[0];
  if (main) {
    try {
      tr = tr.setSelection(TextSelection.create(tr.doc, main.from, main.to));
    } catch {
      // ignore invalid selection after edit
    }
  }

  const nextState: HaimMultiCursorState = {
    ranges: newRanges,
    mainIndex: newMainIdx >= 0 ? newMainIdx : 0,
    query: getMultiState(state).query,
    wholeWord: getMultiState(state).wholeWord,
  };
  tr.setMeta(haimMultiCursorKey, {
    type: META_SET,
    state: nextState,
  } satisfies MultiCursorMeta);
  tr.scrollIntoView();
  return tr;
}

function deleteMultiRangesOrChars(
  view: EditorView,
  direction: 'backward' | 'forward',
): boolean {
  const st = getMultiState(view.state);
  if (st.ranges.length <= 1) return false;

  const anyNonEmpty = st.ranges.some((r) => r.from !== r.to);
  if (anyNonEmpty) {
    view.dispatch(
      replaceMultiRanges(view.state, st.ranges, '', st.mainIndex),
    );
    return true;
  }

  // Collapsed carets: delete one character before/after each.
  const expanded: MultiRange[] = [];
  for (const r of st.ranges) {
    if (direction === 'backward') {
      if (r.from <= 1) {
        expanded.push(r);
        continue;
      }
      try {
        const $pos = view.state.doc.resolve(r.from);
        const delFrom = Math.max($pos.start(), r.from - 1);
        expanded.push({ from: delFrom, to: r.from });
      } catch {
        expanded.push(r);
      }
    } else {
      try {
        const $pos = view.state.doc.resolve(r.from);
        const delTo = Math.min($pos.end(), r.from + 1);
        expanded.push({ from: r.from, to: delTo });
      } catch {
        expanded.push(r);
      }
    }
  }
  view.dispatch(
    replaceMultiRanges(view.state, expanded, '', st.mainIndex),
  );
  return true;
}

function applyMultiState(
  state: EditorState,
  next: HaimMultiCursorState,
  scrollToMain = true,
): Transaction {
  const main = next.ranges[next.mainIndex] ?? next.ranges[0];
  let tr = state.tr;
  if (main) {
    try {
      tr = tr.setSelection(TextSelection.create(tr.doc, main.from, main.to));
    } catch {
      // keep existing selection
    }
  }
  tr.setMeta(haimMultiCursorKey, {
    type: META_SET,
    state: next,
  } satisfies MultiCursorMeta);
  if (scrollToMain) tr.scrollIntoView();
  return tr;
}

/**
 * Mod-d: expand empty selection to word, else add next occurrence.
 */
export function selectNextOccurrenceCommand(
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
): boolean {
  const st = getMultiState(state);
  const { selection } = state;
  const primary: MultiRange = { from: selection.from, to: selection.to };

  // Seed ranges from plugin state or current selection.
  let ranges: MultiRange[];
  let mainIndex: number;
  if (st.ranges.length > 0) {
    ranges = st.ranges.map((r, i) =>
      i === st.mainIndex ? primary : { ...r },
    );
    mainIndex = st.mainIndex;
  } else {
    ranges = [primary];
    mainIndex = 0;
  }

  const anyEmpty = ranges.some((r) => r.from === r.to);
  if (anyEmpty) {
    const expanded = ranges.map((r) => {
      if (r.from !== r.to) return r;
      return wordRangeAt(state.doc, r.from) ?? r;
    });
    if (
      expanded.every(
        (r, i) => r.from === ranges[i]!.from && r.to === ranges[i]!.to,
      )
    ) {
      return false;
    }
    const query = rangeText(state.doc, expanded[0]!);
    const next: HaimMultiCursorState = {
      ranges: expanded,
      mainIndex,
      query,
      wholeWord: true,
    };
    if (dispatch) dispatch(applyMultiState(state, next));
    return true;
  }

  const query = st.query ?? rangeText(state.doc, ranges[0]!);
  if (!query) return false;
  if (ranges.some((r) => rangeText(state.doc, r) !== query)) return false;

  const last = ranges[ranges.length - 1]!;
  const found = findNextOccurrence(
    state.doc,
    query,
    last.to,
    ranges,
    st.wholeWord,
  );
  if (!found) return false;

  const nextRanges = [...ranges, found];
  const next: HaimMultiCursorState = {
    ranges: nextRanges,
    mainIndex: nextRanges.length - 1,
    query,
    wholeWord: st.wholeWord,
  };
  if (dispatch) dispatch(applyMultiState(state, next));
  return true;
}

/**
 * Mod-Shift-l: select every occurrence of the current (single) selection.
 */
export function selectAllOccurrencesCommand(
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
): boolean {
  const st = getMultiState(state);
  if (st.ranges.length > 1) return false;
  const { selection } = state;
  if (selection.empty) return false;

  const query = rangeText(state.doc, {
    from: selection.from,
    to: selection.to,
  });
  if (!query) return false;

  const all = findAllOccurrences(state.doc, query);
  if (all.length <= 1) return false;

  let mainIndex = all.findIndex(
    (r) => r.from === selection.from && r.to === selection.to,
  );
  if (mainIndex < 0) mainIndex = 0;

  const next: HaimMultiCursorState = {
    ranges: all,
    mainIndex,
    query,
    wholeWord: false,
  };
  if (dispatch) dispatch(applyMultiState(state, next));
  return true;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    haimMultiCursor: {
      selectNextOccurrence: () => ReturnType;
      selectAllOccurrences: () => ReturnType;
      clearMultiCursor: () => ReturnType;
    };
  }
}

/** ProseMirror plugin — exported for unit tests (TipTap headless node has empty state.plugins). */
export function createHaimMultiCursorPlugin(): Plugin<HaimMultiCursorState> {
  return new Plugin<HaimMultiCursorState>({
    key: haimMultiCursorKey,
    state: {
      init: () => EMPTY_STATE,
      apply(tr, value) {
        const meta = tr.getMeta(haimMultiCursorKey) as
          | MultiCursorMeta
          | undefined;
        if (meta?.type === META_CLEAR) return EMPTY_STATE;
        if (meta?.type === META_SET) return meta.state;

        if (value.ranges.length === 0) return value;

        let next = value;
        if (tr.docChanged) {
          const ranges = mapRanges(value.ranges, tr.mapping);
          if (ranges.length === 0) return EMPTY_STATE;
          const mainIndex = Math.min(value.mainIndex, ranges.length - 1);
          next = { ...value, ranges, mainIndex };
        }

        if (tr.selectionSet) {
          const { from, to } = tr.selection;
          const idx = next.ranges.findIndex(
            (r) => r.from === from && r.to === to,
          );
          if (idx >= 0) {
            return { ...next, mainIndex: idx };
          }
          // Selection moved away from multi ranges → drop extras.
          return EMPTY_STATE;
        }

        return next;
      },
    },
    props: {
      decorations(state) {
        return buildDecorations(state.doc, getMultiState(state));
      },
      handleTextInput(view, _from, _to, text) {
        const st = getMultiState(view.state);
        if (st.ranges.length <= 1) return false;
        view.dispatch(
          replaceMultiRanges(view.state, st.ranges, text, st.mainIndex),
        );
        return true;
      },
      handleKeyDown(view, event) {
        const st = getMultiState(view.state);
        if (st.ranges.length <= 1) return false;
        if (event.key === 'Backspace') {
          event.preventDefault();
          return deleteMultiRangesOrChars(view, 'backward');
        }
        if (event.key === 'Delete') {
          event.preventDefault();
          return deleteMultiRangesOrChars(view, 'forward');
        }
        return false;
      },
      handleClick(view) {
        const st = getMultiState(view.state);
        if (st.ranges.length <= 1) return false;
        // Plain click collapses multi-selection (selectionSet apply clears).
        view.dispatch(
          view.state.tr.setMeta(haimMultiCursorKey, {
            type: META_CLEAR,
          } satisfies MultiCursorMeta),
        );
        return false;
      },
    },
  });
}

export const HaimMultiCursor = Extension.create({
  name: 'haimMultiCursor',
  priority: 1000,

  addCommands() {
    return {
      selectNextOccurrence:
        () =>
        ({ state, dispatch }) =>
          selectNextOccurrenceCommand(state, dispatch),
      selectAllOccurrences:
        () =>
        ({ state, dispatch }) =>
          selectAllOccurrencesCommand(state, dispatch),
      clearMultiCursor:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta(haimMultiCursorKey, {
              type: META_CLEAR,
            } satisfies MultiCursorMeta);
            dispatch(tr);
          }
          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-d': ({ editor }) => editor.commands.selectNextOccurrence(),
      'Mod-Shift-l': ({ editor }) => editor.commands.selectAllOccurrences(),
      Escape: ({ editor }) => {
        const st = getMultiState(editor.state);
        if (st.ranges.length <= 1) return false;
        return editor.commands.clearMultiCursor();
      },
    };
  },

  addProseMirrorPlugins() {
    return [createHaimMultiCursorPlugin()];
  },
});

export default HaimMultiCursor;
