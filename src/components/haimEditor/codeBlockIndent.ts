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

/** Indent every line in [from, to) text; empty selection inserts spaces at cursor. */
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

  const text = state.doc.textBetween(from, to, '\n', '\n');
  const indented = text
    .split('\n')
    .map((line) => indent + line)
    .join('\n');
  const tr = state.tr.insertText(indented, from, to);
  tr.setSelection(TextSelection.create(tr.doc, from, from + indented.length));
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
    const leading = currentLine.match(/^ */)?.[0] ?? '';
    const remove = Math.min(leading.length, width);
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
      tr.setSelection(
        TextSelection.create(tr.doc, $from.pos - remove),
      );
    }
    return tr;
  }

  const { from, to } = selection;
  const text = doc.textBetween(from, to, '\n', '\n');
  const outdented = text
    .split('\n')
    .map((line) => {
      const leading = line.match(/^ */)?.[0] ?? '';
      const remove = Math.min(leading.length, width);
      return line.slice(remove);
    })
    .join('\n');
  const tr = state.tr.insertText(outdented, from, to);
  tr.setSelection(TextSelection.create(tr.doc, from, from + outdented.length));
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
