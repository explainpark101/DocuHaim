/**
 * Toolbar toggle flags for the CodeMirror source pane.
 * CommonMark nodes come from the markdown syntax tree. GFM-only wraps that
 * the source pane parser does not build (strike, underline, sub, sup, tasks)
 * are detected from the same markers the format toggles write.
 */

import { syntaxTree } from '@codemirror/language';
import type { EditorState } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';

// Same markers as editorMarkdownStyle list/quote toggles.
const TASK_CHECKBOX_LINE_RE = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX~])\](.*)$/;
const QUOTE_LINE_RE = /^(\s*)>\s?(.*)$/;

export type HaimToolbarToggleState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  code: boolean;
  codeBlock: boolean;
  h1: boolean;
  h2: boolean;
  h3: boolean;
  bullet: boolean;
  ordered: boolean;
  task: boolean;
  quote: boolean;
  link: boolean;
  sub: boolean;
  sup: boolean;
};

function findCovering(state: EditorState, names: readonly string[]): SyntaxNode | null {
  const { from, to } = state.selection.main;
  const wanted = new Set(names);
  let node: SyntaxNode | null = syntaxTree(state).resolveInner(from, 1);
  for (; node; node = node.parent) {
    if (!wanted.has(node.name)) continue;
    if (from === to) {
      if (from >= node.from && from < node.to) return node;
    } else if (from >= node.from && to <= node.to) {
      return node;
    }
  }
  return null;
}

function hasAncestor(node: SyntaxNode | null, name: string): boolean {
  for (let current = node; current; current = current.parent) {
    if (current.name === name) return true;
  }
  return false;
}

function stripBlockquoteMarkers(line: string): string {
  let rest = line;
  for (let i = 0; i < 24; i += 1) {
    const match = QUOTE_LINE_RE.exec(rest);
    if (!match) break;
    rest = `${match[1] ?? ''}${match[2] ?? ''}`;
  }
  return rest;
}

function selectionSlice(state: EditorState): { text: string; from: number; to: number } {
  const { from, to } = state.selection.main;
  const start = state.doc.lineAt(from).from;
  const end = state.doc.lineAt(to).to;
  return {
    text: state.doc.sliceString(start, end),
    from: from - start,
    to: to - start,
  };
}

function insideDelim(
  text: string,
  from: number,
  to: number,
  open: string,
  close: string,
): boolean {
  let i = 0;
  while (i < text.length) {
    const start = text.indexOf(open, i);
    if (start < 0) return false;
    const innerStart = start + open.length;
    const end = text.indexOf(close, innerStart);
    if (end < 0) return false;
    const outerEnd = end + close.length;
    if (from >= innerStart && to <= end) return true;
    if (from === start && to === outerEnd) return true;
    i = outerEnd;
  }
  return false;
}

/** Single-character wrap (`~sub~`, `^sup^`) that must not treat `~~` / `^^` as a pair. */
function insideSingletonDelim(
  text: string,
  from: number,
  to: number,
  ch: string,
): boolean {
  let i = 0;
  while (i < text.length) {
    const start = text.indexOf(ch, i);
    if (start < 0) return false;
    const prev = start > 0 ? text[start - 1] : '';
    const next = start + 1 < text.length ? text[start + 1] : '';
    if (prev === ch || next === ch) {
      i = start + 1;
      continue;
    }
    const innerStart = start + 1;
    let end = text.indexOf(ch, innerStart);
    while (end >= 0) {
      const endPrev = end > 0 ? text[end - 1] : '';
      const endNext = end + 1 < text.length ? text[end + 1] : '';
      if (endPrev === ch || endNext === ch) {
        end = text.indexOf(ch, end + 1);
        continue;
      }
      break;
    }
    if (end < 0) return false;
    const outerEnd = end + 1;
    if (from >= innerStart && to <= end) return true;
    if (from === start && to === outerEnd) return true;
    i = outerEnd;
  }
  return false;
}

function insideUnderline(state: EditorState, from: number, to: number): boolean {
  const winFrom = Math.max(0, from - 8000);
  const winTo = Math.min(state.doc.length, Math.max(to, from) + 8000);
  const text = state.doc.sliceString(winFrom, winTo);
  const relFrom = from - winFrom;
  const relTo = to - winFrom;
  const re = /<u\b[^>]*>|<\/u\s*>/gi;
  let innerStart = -1;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    const token = match[0];
    if (token.startsWith('</')) {
      if (innerStart >= 0) {
        const innerEnd = match.index;
        if (relFrom >= innerStart && relTo <= innerEnd) return true;
        innerStart = -1;
      }
      continue;
    }
    innerStart = match.index + token.length;
  }
  return false;
}

function linkAtSelection(state: EditorState): boolean {
  const node = findCovering(state, ['Link', 'Autolink']);
  if (!node) return false;
  return !hasAncestor(node, 'Image');
}

function taskAtSelection(state: EditorState): boolean {
  const item = findCovering(state, ['ListItem']);
  const pos = item ? item.from : state.selection.main.from;
  const line = stripBlockquoteMarkers(state.doc.lineAt(pos).text);
  return TASK_CHECKBOX_LINE_RE.test(line);
}

/**
 * Active format flags at the main source selection.
 * Empty carets count as inside a node when they sit in `[from, to)`.
 */
export function queryHaimSourceFormatState(state: EditorState): HaimToolbarToggleState {
  const codeBlock = Boolean(findCovering(state, ['FencedCode', 'CodeBlock']));
  const inInlineCode =
    !codeBlock && Boolean(findCovering(state, ['InlineCode']));
  const inCode = codeBlock || inInlineCode;
  const task = !inCode && taskAtSelection(state);
  const slice = inCode ? null : selectionSlice(state);
  const { from, to } = state.selection.main;
  const strike = slice
    ? insideDelim(slice.text, slice.from, slice.to, '~~', '~~')
    : false;
  const sub = slice
    ? insideSingletonDelim(slice.text, slice.from, slice.to, '~')
    : false;
  const sup = slice
    ? insideSingletonDelim(slice.text, slice.from, slice.to, '^')
    : false;

  return {
    // Inline code may sit inside ** or *. Literal ** inside `...` has no
    // StrongEmphasis ancestor, so those stay unmarked.
    bold: Boolean(findCovering(state, ['StrongEmphasis'])),
    italic: Boolean(findCovering(state, ['Emphasis'])),
    underline: slice ? insideUnderline(state, from, to) : false,
    strike,
    code: inInlineCode,
    codeBlock,
    h1: !inCode && Boolean(findCovering(state, ['ATXHeading1', 'SetextHeading1'])),
    h2: !inCode && Boolean(findCovering(state, ['ATXHeading2', 'SetextHeading2'])),
    h3: !inCode && Boolean(findCovering(state, ['ATXHeading3'])),
    bullet: !inCode && !task && Boolean(findCovering(state, ['BulletList'])),
    ordered: !inCode && !task && Boolean(findCovering(state, ['OrderedList'])),
    task,
    quote: !inCode && Boolean(findCovering(state, ['Blockquote'])),
    link: !inCode && linkAtSelection(state),
    sub,
    sup,
  };
}
