/**
 * Tab / Shift-Tab indent inside markdown fenced code bodies in HaimSourcePane.
 * Outside fences the commands return false so indentWithTab (or other keymaps) can run.
 */

import { indentUnit, syntaxTree } from '@codemirror/language';
import {
  EditorSelection,
  EditorState,
  Prec,
  type ChangeSpec,
  type TransactionSpec,
} from '@codemirror/state';
import { keymap, type EditorView, type KeyBinding } from '@codemirror/view';
import {
  loadHaimCodeTabSettings,
  resolveHaimCodeTabWidth,
} from '@/utils/haimCodeTabSettings';

export type CodeFenceBodyContext = {
  language: string;
  /** Start of CodeText (body). */
  bodyFrom: number;
  /** End of CodeText (exclusive). */
  bodyTo: number;
};

function readFenceLanguage(
  state: EditorState,
  fenceFrom: number,
  fenceTo: number,
): string {
  let language = '';
  syntaxTree(state).iterate({
    from: fenceFrom,
    to: fenceTo,
    enter(node) {
      if (node.name !== 'CodeInfo') return;
      language = state.doc.sliceString(node.from, node.to).trim();
      return false;
    },
  });
  if (language) return language;
  // Fallback: ```lang on the opening line when CodeInfo is missing.
  const openLine = state.doc.lineAt(fenceFrom).text;
  const m = /^`{3,}\s*([^\s`]+)/.exec(openLine);
  return m?.[1]?.trim() ?? '';
}

/**
 * Resolve the fenced code body that contains `pos` (inside CodeText only).
 * Positions on fence marker / info lines return null.
 */
export function findCodeFenceBodyAt(
  state: EditorState,
  pos: number,
): CodeFenceBodyContext | null {
  const tree = syntaxTree(state);
  let cursor = tree.resolveInner(pos, -1);
  for (let node: typeof cursor | null = cursor; node; node = node.parent) {
    if (node.name !== 'FencedCode') continue;

    let bodyFrom = -1;
    let bodyTo = -1;
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.name === 'CodeText') {
        bodyFrom = child.from;
        bodyTo = child.to;
        break;
      }
    }
    if (bodyFrom < 0 || bodyTo < bodyFrom) return null;
    if (pos < bodyFrom || pos > bodyTo) return null;

    return {
      language: readFenceLanguage(state, node.from, node.to),
      bodyFrom,
      bodyTo,
    };
  }
  return null;
}

function resolveTabWidthForFence(language: string): number {
  return resolveHaimCodeTabWidth(language, loadHaimCodeTabSettings());
}

function leadingSpacesToRemove(line: string, tabWidth: number): number {
  const leading = line.match(/^ */)?.[0] ?? '';
  return Math.min(leading.length, tabWidth);
}

/** Line starts inside the fence body that intersect [from, to). */
export function collectFenceBodyLineStarts(
  state: EditorState,
  bodyFrom: number,
  bodyTo: number,
  from: number,
  to: number,
): number[] {
  const starts: number[] = [];
  const startLine = state.doc.lineAt(Math.max(from, bodyFrom));
  const endPos = Math.max(from, Math.min(to, bodyTo));
  const endLine = state.doc.lineAt(Math.max(bodyFrom, Math.min(endPos, bodyTo)));

  for (let n = startLine.number; n <= endLine.number; n += 1) {
    const line = state.doc.line(n);
    if (line.from >= bodyTo || line.to < bodyFrom) continue;
    // Only indent lines whose start is inside the body (never fence markers).
    if (line.from < bodyFrom || line.from >= bodyTo) continue;
    if (from < line.to && to > line.from) {
      starts.push(line.from);
    }
  }
  return starts;
}

export function buildCodeFenceIndentTransaction(
  state: EditorState,
  tabWidth: number,
): TransactionSpec | null {
  const { from, to, empty } = state.selection.main;
  const fence = findCodeFenceBodyAt(state, from);
  if (!fence) return null;
  if (!empty) {
    const fenceTo = findCodeFenceBodyAt(state, Math.max(from, to - 1));
    if (!fenceTo || fenceTo.bodyFrom !== fence.bodyFrom) return null;
  }

  const width = Math.max(1, Math.round(tabWidth));
  const indent = ' '.repeat(width);

  if (empty) {
    return {
      changes: { from, insert: indent },
      selection: EditorSelection.cursor(from + indent.length),
      userEvent: 'input.indent',
    };
  }

  const lineStarts = collectFenceBodyLineStarts(
    state,
    fence.bodyFrom,
    fence.bodyTo,
    from,
    to,
  );
  if (lineStarts.length === 0) return null;

  const changes: ChangeSpec[] = lineStarts.map((pos) => ({
    from: pos,
    insert: indent,
  }));
  const newFrom = lineStarts[0]!;
  const newTo = to + lineStarts.length * indent.length;
  return {
    changes,
    selection: EditorSelection.range(newFrom, newTo),
    userEvent: 'input.indent',
  };
}

export function buildCodeFenceOutdentTransaction(
  state: EditorState,
  tabWidth: number,
): TransactionSpec | null {
  const { from, to, empty } = state.selection.main;
  const fence = findCodeFenceBodyAt(state, from);
  if (!fence) return null;
  if (!empty) {
    const fenceTo = findCodeFenceBodyAt(state, Math.max(from, to - 1));
    if (!fenceTo || fenceTo.bodyFrom !== fence.bodyFrom) return null;
  }

  const width = Math.max(1, Math.round(tabWidth));
  const lineStarts = empty
    ? (() => {
        const line = state.doc.lineAt(from);
        if (line.from < fence.bodyFrom || line.from >= fence.bodyTo) return [];
        return [line.from];
      })()
    : collectFenceBodyLineStarts(
        state,
        fence.bodyFrom,
        fence.bodyTo,
        from,
        to,
      );

  if (lineStarts.length === 0) return null;

  const changes: ChangeSpec[] = [];
  let removedBeforeFrom = 0;
  let removedTotal = 0;

  for (let i = lineStarts.length - 1; i >= 0; i -= 1) {
    const lineStart = lineStarts[i]!;
    const line = state.doc.lineAt(lineStart);
    const remove = leadingSpacesToRemove(line.text, width);
    if (remove === 0) continue;
    changes.push({ from: lineStart, to: lineStart + remove, insert: '' });
    removedTotal += remove;
    if (lineStart < from) removedBeforeFrom += remove;
  }

  // No-op outdent still counts as handled so focus does not leave the editor.
  if (removedTotal === 0) {
    return { changes: [], userEvent: 'delete.dedent' };
  }

  if (empty) {
    const lineStart = lineStarts[0]!;
    const cursorInLine = from - lineStart;
    const remove = leadingSpacesToRemove(
      state.doc.lineAt(lineStart).text,
      width,
    );
    const anchor =
      cursorInLine <= remove ? lineStart : from - remove;
    return {
      changes,
      selection: EditorSelection.cursor(anchor),
      userEvent: 'delete.dedent',
    };
  }

  const newFrom = Math.max(lineStarts[0]!, from - removedBeforeFrom);
  const newTo = Math.max(newFrom, to - removedTotal);
  return {
    changes,
    selection: EditorSelection.range(newFrom, newTo),
    userEvent: 'delete.dedent',
  };
}

function tabWidthForSelection(state: EditorState): number | null {
  const fence = findCodeFenceBodyAt(state, state.selection.main.from);
  if (!fence) return null;
  return resolveTabWidthForFence(fence.language);
}

export function indentCodeFence(view: EditorView): boolean {
  const width = tabWidthForSelection(view.state);
  if (width == null) return false;
  const spec = buildCodeFenceIndentTransaction(view.state, width);
  if (!spec) return false;
  view.dispatch(spec);
  return true;
}

export function outdentCodeFence(view: EditorView): boolean {
  const width = tabWidthForSelection(view.state);
  if (width == null) return false;
  const spec = buildCodeFenceOutdentTransaction(view.state, width);
  if (!spec) return false;
  view.dispatch(spec);
  return true;
}

const CODE_FENCE_INDENT_BINDING: KeyBinding = {
  key: 'Tab',
  run: indentCodeFence,
  shift: outdentCodeFence,
};

/**
 * High precedence so Tab indents inside fences before other keymaps.
 * Commands return false outside fences so indentWithTab can handle general indent.
 */
export const CODE_FENCE_INDENT_KEYMAP = Prec.high(
  keymap.of([CODE_FENCE_INDENT_BINDING]),
);

/** Optional: align CM indentUnit with Haim default when creating the pane. */
export function haimCodeFenceIndentUnitExtension(): ReturnType<
  typeof indentUnit.of
> {
  return indentUnit.of(' '.repeat(resolveTabWidthForFence('')));
}
