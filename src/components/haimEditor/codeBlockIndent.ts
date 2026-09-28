import { Plugin, PluginKey, TextSelection, type EditorState, type Transaction } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import {
  loadHaimCodeTabSettings,
  resolveHaimCodeTabWidth,
} from '@/utils/haimCodeTabSettings';

const pluginKey = new PluginKey('haimCodeBlockIndent');

function getCodeBlockLanguage(state: EditorState): string {
  const { $from } = state.selection;
  if ($from.parent.type.name !== 'codeBlock') return '';
  return String($from.parent.attrs.language || '');
}

function isInCodeBlock(state: EditorState): boolean {
  return state.selection.$from.parent.type.name === 'codeBlock';
}

/**
 * Absolute start positions of code-block lines that intersect [from, to).
 * Partial mid-line selections still include the whole line.
 */
export function collectIntersectingCodeBlockLineStarts(
  state: EditorState,
  from: number,
  to: number,
): number[] {
  const $from = state.doc.resolve(from);
  if ($from.parent.type.name !== 'codeBlock') return [];
  const codeStart = $from.start();
  const codeEnd = $from.end();
  const text = state.doc.textBetween(codeStart, codeEnd, '\n', '\n');
  const lines = text.split('\n');
  const starts: number[] = [];

  let lineStart = codeStart;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    const nextStart =
      i < lines.length - 1 ? lineStart + line.length + 1 : codeEnd;
    // Intersect [from, to) with [lineStart, nextStart)
    if (from < nextStart && to > lineStart) {
      starts.push(lineStart);
    }
    lineStart = nextStart;
  }
  return starts;
}

function leadingSpacesToRemove(line: string, tabWidth: number): number {
  const leading = line.match(/^ */)?.[0] ?? '';
  return Math.min(leading.length, tabWidth);
}

/** Indent every line intersecting the selection; empty selection inserts spaces at cursor. */
export function buildCodeBlockIndentTransaction(
  state: EditorState,
  tabWidth: number,
): Transaction | null {
  if (!isInCodeBlock(state)) return null;
  const width = Math.max(1, Math.round(tabWidth));
  const indent = ' '.repeat(width);
  const { selection } = state;
  const { from, to, empty } = selection;

  if (empty) {
    const tr = state.tr.insertText(indent, from);
    tr.setSelection(TextSelection.create(tr.doc, from + indent.length));
    return tr;
  }

  const lineStarts = collectIntersectingCodeBlockLineStarts(state, from, to);
  if (lineStarts.length === 0) return null;

  const tr = state.tr;
  for (let i = lineStarts.length - 1; i >= 0; i -= 1) {
    tr.insertText(indent, lineStarts[i]!);
  }

  const newFrom = lineStarts[0]!;
  const newTo = tr.mapping.map(to);
  tr.setSelection(TextSelection.create(tr.doc, newFrom, newTo));
  return tr;
}

/** Outdent leading spaces on the current line (empty) or each selected line. */
export function buildCodeBlockOutdentTransaction(
  state: EditorState,
  tabWidth: number,
): Transaction | null {
  if (!isInCodeBlock(state)) return null;
  const width = Math.max(1, Math.round(tabWidth));
  const { selection, doc } = state;
  const { $from, empty } = selection;

  if (empty) {
    const codeStart = $from.start();
    const codeEnd = $from.end();
    const allText = doc.textBetween(codeStart, codeEnd, '\n', '\n');
    const lines = allText.split('\n');
    const relative = $from.pos - codeStart;

    let currentLineIndex = 0;
    let charCount = 0;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i] ?? '';
      if (charCount + line.length >= relative) {
        currentLineIndex = i;
        break;
      }
      charCount += line.length + 1;
      if (i === lines.length - 1) currentLineIndex = i;
    }

    const currentLine = lines[currentLineIndex] ?? '';
    const remove = leadingSpacesToRemove(currentLine, width);
    if (remove === 0) return state.tr; // handled (no-op) so Tab focus doesn't move

    let lineStart = codeStart;
    for (let i = 0; i < currentLineIndex; i += 1) {
      lineStart += (lines[i]?.length ?? 0) + 1;
    }

    const tr = state.tr.delete(lineStart, lineStart + remove);
    const cursorInLine = $from.pos - lineStart;
    if (cursorInLine <= remove) {
      tr.setSelection(TextSelection.create(tr.doc, lineStart));
    } else {
      tr.setSelection(TextSelection.create(tr.doc, $from.pos - remove));
    }
    return tr;
  }

  const { from, to } = selection;
  const lineStarts = collectIntersectingCodeBlockLineStarts(state, from, to);
  if (lineStarts.length === 0) return null;

  const codeStart = $from.start();
  const codeEnd = $from.end();
  const allText = doc.textBetween(codeStart, codeEnd, '\n', '\n');
  const allLines = allText.split('\n');
  const lineStartToText = new Map<number, string>();
  {
    let pos = codeStart;
    for (let i = 0; i < allLines.length; i += 1) {
      const line = allLines[i] ?? '';
      lineStartToText.set(pos, line);
      pos += line.length + (i < allLines.length - 1 ? 1 : 0);
    }
  }

  const tr = state.tr;
  let removedBeforeFrom = 0;
  let removedTotal = 0;

  for (let i = lineStarts.length - 1; i >= 0; i -= 1) {
    const lineStart = lineStarts[i]!;
    const line = lineStartToText.get(lineStart) ?? '';
    const remove = leadingSpacesToRemove(line, width);
    if (remove === 0) continue;
    tr.delete(lineStart, lineStart + remove);
    removedTotal += remove;
    if (lineStart < from) removedBeforeFrom += remove;
  }

  if (removedTotal === 0) return tr; // no-op but still handled

  const newFrom = Math.max(lineStarts[0]!, from - removedBeforeFrom);
  const newTo = tr.mapping.map(to);
  tr.setSelection(TextSelection.create(tr.doc, newFrom, Math.max(newFrom, newTo)));
  return tr;
}

export function tryHandleCodeBlockIndentKey(
  view: EditorView,
  event: KeyboardEvent,
): boolean {
  if (event.defaultPrevented || event.isComposing) return false;
  if (event.key !== 'Tab') return false;
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  if (!isInCodeBlock(view.state)) return false;

  const lang = getCodeBlockLanguage(view.state);
  const tabWidth = resolveHaimCodeTabWidth(lang, loadHaimCodeTabSettings());
  const tr = event.shiftKey
    ? buildCodeBlockOutdentTransaction(view.state, tabWidth)
    : buildCodeBlockIndentTransaction(view.state, tabWidth);
  if (!tr) return false;
  view.dispatch(tr);
  return true;
}

export function createCodeBlockIndentPlugin(): Plugin {
  return new Plugin({
    key: pluginKey,
    props: {
      handleKeyDown(view, event) {
        return tryHandleCodeBlockIndentKey(view, event);
      },
    },
  });
}
