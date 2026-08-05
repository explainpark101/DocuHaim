/**
 * Apply markdown wrap / line-prefix style edits to every CodeMirror selection.
 */

import { EditorSelection, type ChangeSpec, type SelectionRange, type Text } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

const UNORDERED_LIST_LINE_RE = /^(\s*)([-+*])(\s+)(.*)$/;
const ORDERED_LIST_LINE_RE = /^(\s*)(\d+)([.)])(\s+)(.*)$/;
const TASK_CHECKBOX_LINE_RE = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/;
const QUOTE_LINE_RE = /^(\s*)>\s?(.*)$/;
const HEADING_LINE_RE = /^(#{1,6})\s+(.*)$/;

type WrapPlan = {
  change?: { from: number; to: number; insert: string };
  next: SelectionRange;
};

function isRepeatedCharMark(mark: string): boolean {
  if (!mark) return false;
  const first = mark[0];
  return [...mark].every((ch) => ch === first);
}

function hasSurroundingMarks(
  doc: Text,
  from: number,
  to: number,
  open: string,
  close: string,
): boolean {
  const leftFrom = from - open.length;
  const rightTo = to + close.length;
  if (leftFrom < 0 || rightTo > doc.length) return false;
  if (doc.sliceString(leftFrom, from) !== open) return false;
  if (doc.sliceString(to, rightTo) !== close) return false;
  if (open === close && isRepeatedCharMark(open)) {
    const ch = open[0] ?? '';
    if (leftFrom > 0 && doc.sliceString(leftFrom - 1, leftFrom) === ch) return false;
    if (rightTo < doc.length && doc.sliceString(rightTo, rightTo + 1) === ch) return false;
  }
  return true;
}

function planInlineWrap(
  doc: Text,
  range: SelectionRange,
  open: string,
  close: string,
): WrapPlan {
  const { from, to, empty } = range;

  if (empty) {
    const inserted = `${open}${close}`;
    return {
      change: { from, to, insert: inserted },
      next: EditorSelection.cursor(from + open.length),
    };
  }

  const selectedText = doc.sliceString(from, to);

  if (
    selectedText.length >= open.length + close.length
    && selectedText.startsWith(open)
    && selectedText.endsWith(close)
  ) {
    const inner = selectedText.slice(open.length, selectedText.length - close.length);
    return {
      change: { from, to, insert: inner },
      next: EditorSelection.range(from, from + inner.length),
    };
  }

  if (hasSurroundingMarks(doc, from, to, open, close)) {
    const leftFrom = from - open.length;
    const rightTo = to + close.length;
    return {
      change: { from: leftFrom, to: rightTo, insert: selectedText },
      next: EditorSelection.range(leftFrom, leftFrom + selectedText.length),
    };
  }

  const wrapped = `${open}${selectedText}${close}`;
  return {
    change: { from, to, insert: wrapped },
    next: EditorSelection.range(from + open.length, from + open.length + selectedText.length),
  };
}

function planInlineCodeWrap(doc: Text, range: SelectionRange): WrapPlan | null {
  if (range.empty) return null;
  const selectedText = doc.sliceString(range.from, range.to);
  if (!selectedText) return null;

  let fence = '`';
  while (selectedText.includes(fence)) fence += '`';

  if (selectedText.startsWith(fence) && selectedText.endsWith(fence) && selectedText.length > fence.length * 2) {
    const inner = selectedText.slice(fence.length, selectedText.length - fence.length);
    return {
      change: { from: range.from, to: range.to, insert: inner },
      next: EditorSelection.range(range.from, range.from + inner.length),
    };
  }

  if (hasSurroundingMarks(doc, range.from, range.to, fence, fence)) {
    const leftFrom = range.from - fence.length;
    const rightTo = range.to + fence.length;
    return {
      change: { from: leftFrom, to: rightTo, insert: selectedText },
      next: EditorSelection.range(leftFrom, leftFrom + selectedText.length),
    };
  }

  const wrapped = `${fence}${selectedText}${fence}`;
  return {
    change: { from: range.from, to: range.to, insert: wrapped },
    next: EditorSelection.range(
      range.from + fence.length,
      range.from + fence.length + selectedText.length,
    ),
  };
}

function dispatchRangePlans(view: EditorView, plans: WrapPlan[]): boolean {
  if (!plans.length) return false;
  const changes = plans
    .map((plan) => plan.change)
    .filter((change): change is { from: number; to: number; insert: string } => Boolean(change))
    .sort((a, b) => a.from - b.from);
  if (!changes.length) return false;

  const nextRanges = plans.map((plan) => plan.next);
  view.dispatch({
    changes,
    selection: EditorSelection.create(nextRanges, view.state.selection.mainIndex),
  });
  return true;
}

export function toggleInlineMarkdownWrap(
  view: EditorView,
  open: string,
  close: string = open,
): boolean {
  if (!view?.state || !open) return false;
  const plans = view.state.selection.ranges.map((range) => (
    planInlineWrap(view.state.doc, range, open, close)
  ));
  return dispatchRangePlans(view, plans);
}

export function toggleBoldForSelection(view: EditorView): boolean {
  return toggleInlineMarkdownWrap(view, '**');
}

export function toggleItalicForSelection(view: EditorView): boolean {
  return toggleInlineMarkdownWrap(view, '*');
}

export function toggleStrikeForSelection(view: EditorView): boolean {
  return toggleInlineMarkdownWrap(view, '~~');
}

export function toggleUnderlineForSelection(view: EditorView): boolean {
  return toggleInlineMarkdownWrap(view, '<u>', '</u>');
}

export function toggleSupForSelection(view: EditorView): boolean {
  return toggleInlineMarkdownWrap(view, '^');
}

export function toggleSubForSelection(view: EditorView): boolean {
  return toggleInlineMarkdownWrap(view, '~');
}

export function wrapSelectionWithInlineCode(view: EditorView): boolean {
  if (!view?.state) return false;
  const plans: WrapPlan[] = view.state.selection.ranges.map((range) => (
    planInlineCodeWrap(view.state.doc, range) ?? { next: range }
  ));
  return dispatchRangePlans(view, plans);
}

function collectLineNumbers(view: EditorView): number[] {
  const lineNumbers = new Set<number>();
  for (const range of view.state.selection.ranges) {
    const fromLine = view.state.doc.lineAt(range.from).number;
    const toLine = view.state.doc.lineAt(range.to).number;
    for (let n = fromLine; n <= toLine; n += 1) lineNumbers.add(n);
  }
  return [...lineNumbers].sort((a, b) => a - b);
}

function dispatchLineTextChanges(
  view: EditorView,
  transform: (text: string) => string | null,
): boolean {
  if (!view?.state) return false;
  const changes: ChangeSpec[] = [];
  for (const lineNumber of collectLineNumbers(view)) {
    const line = view.state.doc.line(lineNumber);
    const nextText = transform(line.text);
    if (nextText !== null && nextText !== line.text) {
      changes.push({ from: line.from, to: line.to, insert: nextText });
    }
  }
  if (!changes.length) return false;
  view.dispatch({ changes });
  return true;
}

function toggleListLineMarker(text: string): string | null {
  const unordered = text.match(UNORDERED_LIST_LINE_RE);
  if (unordered) return `${unordered[1] ?? ''}1. ${unordered[4] ?? ''}`;
  const ordered = text.match(ORDERED_LIST_LINE_RE);
  if (ordered) return `${ordered[1] ?? ''}- ${ordered[5] ?? ''}`;
  return null;
}

function toggleTaskCheckboxMarker(text: string): string | null {
  const match = text.match(TASK_CHECKBOX_LINE_RE);
  if (!match) return null;
  const prefix = match[1] ?? '';
  const checked = match[2] ?? ' ';
  const rest = match[3] ?? '';
  const nextChecked = checked === ' ' ? 'x' : ' ';
  return `${prefix}[${nextChecked}]${rest}`;
}

export function toggleListTypeBetweenUlAndOl(view: EditorView): boolean {
  return dispatchLineTextChanges(view, toggleListLineMarker);
}

export function toggleTaskCheckboxBetweenChecked(view: EditorView): boolean {
  return dispatchLineTextChanges(view, toggleTaskCheckboxMarker);
}

export function toggleUnorderedListForSelection(view: EditorView): boolean {
  return dispatchLineTextChanges(view, (text) => {
    const unordered = text.match(UNORDERED_LIST_LINE_RE);
    if (unordered) {
      const indent = unordered[1] ?? '';
      const body = unordered[4] ?? '';
      if (TASK_CHECKBOX_LINE_RE.test(text)) {
        return `${indent}- ${body.replace(/^\[[ xX]\]\s?/, '')}`;
      }
      return `${indent}${body}`;
    }
    const ordered = text.match(ORDERED_LIST_LINE_RE);
    if (ordered) return `${ordered[1] ?? ''}- ${ordered[5] ?? ''}`;
    return `- ${text}`;
  });
}

export function toggleOrderedListForSelection(view: EditorView): boolean {
  return dispatchLineTextChanges(view, (text) => {
    const ordered = text.match(ORDERED_LIST_LINE_RE);
    if (ordered) return `${ordered[1] ?? ''}${ordered[5] ?? ''}`;
    const unordered = text.match(UNORDERED_LIST_LINE_RE);
    if (unordered) return `${unordered[1] ?? ''}1. ${unordered[4] ?? ''}`;
    return `1. ${text}`;
  });
}

export function toggleTaskListForSelection(view: EditorView): boolean {
  return dispatchLineTextChanges(view, (text) => {
    if (TASK_CHECKBOX_LINE_RE.test(text)) {
      return text.replace(TASK_CHECKBOX_LINE_RE, (_full, prefix: string, _checked: string, rest: string) => (
        `${prefix}${rest.replace(/^\s/, '')}`
      ));
    }
    const unordered = text.match(UNORDERED_LIST_LINE_RE);
    if (unordered) {
      return `${unordered[1] ?? ''}${unordered[2] ?? '-'}${unordered[3] ?? ' '}[ ] ${unordered[4] ?? ''}`;
    }
    const ordered = text.match(ORDERED_LIST_LINE_RE);
    if (ordered) {
      return `${ordered[1] ?? ''}${ordered[2] ?? '1'}${ordered[3] ?? '.'}${ordered[4] ?? ' '}[ ] ${ordered[5] ?? ''}`;
    }
    return `- [ ] ${text}`;
  });
}

export function toggleQuoteForSelection(view: EditorView): boolean {
  return dispatchLineTextChanges(view, (text) => {
    const quote = text.match(QUOTE_LINE_RE);
    if (quote) return `${quote[1] ?? ''}${quote[2] ?? ''}`;
    return `> ${text}`;
  });
}

export function toggleHeadingForSelection(view: EditorView, level: number): boolean {
  if (level < 1 || level > 6) return false;
  const marks = '#'.repeat(level);
  return dispatchLineTextChanges(view, (text) => {
    const heading = text.match(HEADING_LINE_RE);
    if (heading) {
      if (heading[1]?.length === level) return heading[2] ?? '';
      return `${marks} ${heading[2] ?? ''}`;
    }
    return `${marks} ${text}`;
  });
}
