/**
 * LLM Assist selection / apply for HaimEditor (TipTap WYSIWYG + source CM).
 * Mirrors md-editor source-focus memory: after panel steals focus, use last
 * focused surface range — not a collapsed live caret.
 */

import type { Editor } from '@tiptap/react';
import type { EditorView as CmEditorView } from '@codemirror/view';
import { EditorSelection } from '@codemirror/state';
import {
  clampHaimInsertRange,
  type HaimInsertRange,
} from '@/utils/haimEditorInsertRange';

export type HaimLlmAssistSurface = 'tiptap' | 'cm';

export type HaimLlmAssistSelectionSnapshot = {
  text: string;
  from: number;
  to: number;
  surface: HaimLlmAssistSurface;
};

export type HaimLlmAssistFocusMemory = {
  surface: HaimLlmAssistSurface;
  from: number;
  to: number;
  everFocused: boolean;
};

export type ReadHaimLlmAssistSelectionOptions = {
  cm: CmEditorView | null | undefined;
  preferSource: boolean;
  sourceVisible?: boolean | undefined;
  /** Last TipTap/CM range while that surface had keyboard focus. */
  focusMemory?: HaimLlmAssistFocusMemory | null | undefined;
};

function tipTapSlice(
  editor: Editor,
  from: number,
  to: number,
): string {
  if (from === to) return '';
  const size = editor.state.doc.content.size;
  const clamped = clampHaimInsertRange(size, from, to);
  if (clamped.from === clamped.to) return '';
  return editor.state.doc.textBetween(clamped.from, clamped.to, '\n');
}

function cmSlice(cm: CmEditorView, from: number, to: number): string {
  if (from === to) return '';
  const len = cm.state.doc.length;
  const safeFrom = Math.max(0, Math.min(from, len));
  const safeTo = Math.max(safeFrom, Math.min(to, len));
  if (safeFrom === safeTo) return '';
  return cm.state.doc.sliceString(safeFrom, safeTo);
}

function liveTipTapSnapshot(editor: Editor): HaimLlmAssistSelectionSnapshot {
  const { from, to } = editor.state.selection;
  return {
    text: tipTapSlice(editor, from, to),
    from,
    to,
    surface: 'tiptap',
  };
}

function liveCmSnapshot(cm: CmEditorView): HaimLlmAssistSelectionSnapshot {
  const { from, to } = cm.state.selection.main;
  return {
    text: cmSlice(cm, from, to),
    from,
    to,
    surface: 'cm',
  };
}

function memorySnapshot(
  editor: Editor | null | undefined,
  cm: CmEditorView | null | undefined,
  memory: HaimLlmAssistFocusMemory,
): HaimLlmAssistSelectionSnapshot | null {
  if (!memory.everFocused) return null;
  if (memory.surface === 'cm' && cm) {
    return {
      text: cmSlice(cm, memory.from, memory.to),
      from: memory.from,
      to: memory.to,
      surface: 'cm',
    };
  }
  if (memory.surface === 'tiptap' && editor) {
    return {
      text: tipTapSlice(editor, memory.from, memory.to),
      from: memory.from,
      to: memory.to,
      surface: 'tiptap',
    };
  }
  return null;
}

/**
 * Read the selection LLM Assist should show / transform.
 * Focused surface wins; otherwise last focus memory; else live non-empty.
 */
export function readHaimLlmAssistSelection(
  editor: Editor | null | undefined,
  options: ReadHaimLlmAssistSelectionOptions,
): HaimLlmAssistSelectionSnapshot {
  const sourceVisible = options.sourceVisible !== false;
  const cm = sourceVisible ? options.cm : null;
  const memory = options.focusMemory ?? null;

  const cmFocused = Boolean(cm?.hasFocus);
  const tipTapFocused = Boolean(editor?.isFocused);

  if (cmFocused && cm) {
    return liveCmSnapshot(cm);
  }
  if (tipTapFocused && editor) {
    return liveTipTapSnapshot(editor);
  }

  // Panel / chrome focused: prefer last surface memory.
  const fromMemory = memory ? memorySnapshot(editor, cm, memory) : null;
  if (fromMemory && (fromMemory.text || fromMemory.from !== fromMemory.to)) {
    return fromMemory;
  }
  if (fromMemory) return fromMemory;

  if (options.preferSource && cm) {
    return liveCmSnapshot(cm);
  }
  if (editor) {
    const tip = liveTipTapSnapshot(editor);
    if (tip.text || !cm) return tip;
  }
  if (cm) return liveCmSnapshot(cm);
  return { text: '', from: 0, to: 0, surface: 'tiptap' };
}

export type ApplyHaimLlmAssistResultOptions = {
  editor: Editor;
  cm?: CmEditorView | null | undefined;
  result: string;
  forceAppendAtEnd?: boolean | undefined;
  preferSource: boolean;
  sourceVisible?: boolean | undefined;
  focusMemory?: HaimLlmAssistFocusMemory | null | undefined;
};

/**
 * Replace last Haim selection (or append at doc end) with LLM output.
 */
export function applyHaimLlmAssistResult({
  editor,
  cm,
  result,
  forceAppendAtEnd = false,
  preferSource,
  sourceVisible = true,
  focusMemory = null,
}: ApplyHaimLlmAssistResultOptions): boolean {
  const snap = readHaimLlmAssistSelection(editor, {
    cm,
    preferSource,
    sourceVisible,
    focusMemory,
  });
  const everFocused = Boolean(focusMemory?.everFocused);
  const surfaceFocused = Boolean(editor.isFocused || cm?.hasFocus);

  const useCm =
    Boolean(cm)
    && sourceVisible
    && (forceAppendAtEnd
      ? preferSource
      : snap.surface === 'cm' || (preferSource && !editor.isFocused));

  if (useCm && cm) {
    const docLen = cm.state.doc.length;
    if (forceAppendAtEnd || (!everFocused && !surfaceFocused && snap.from === snap.to)) {
      const insert =
        docLen > 0 && !cm.state.doc.sliceString(docLen - 1).endsWith('\n')
          ? `\n${result}`
          : result;
      cm.dispatch({
        changes: { from: docLen, to: docLen, insert },
        selection: EditorSelection.cursor(docLen + insert.length),
      });
      cm.focus();
      return true;
    }
    const from = Math.max(0, Math.min(snap.from, docLen));
    const to = Math.max(from, Math.min(snap.to, docLen));
    cm.dispatch({
      changes: { from, to, insert: result },
      selection: EditorSelection.cursor(from + result.length),
    });
    cm.focus();
    return true;
  }

  const size = editor.state.doc.content.size;
  let range: HaimInsertRange;
  if (forceAppendAtEnd || (!everFocused && !surfaceFocused)) {
    range = { from: size, to: size };
  } else if (snap.surface === 'tiptap') {
    range = clampHaimInsertRange(size, snap.from, snap.to);
  } else if (focusMemory?.everFocused && focusMemory.surface === 'tiptap') {
    range = clampHaimInsertRange(size, focusMemory.from, focusMemory.to);
  } else if (editor.isFocused) {
    const { from, to } = editor.state.selection;
    range = clampHaimInsertRange(size, from, to);
  } else if (focusMemory?.everFocused) {
    range = clampHaimInsertRange(size, focusMemory.from, focusMemory.to);
  } else {
    range = { from: size, to: size };
  }

  const ok = editor
    .chain()
    .focus()
    .insertContentAt(
      range.from === range.to ? range.from : { from: range.from, to: range.to },
      result,
      { contentType: 'markdown' } as never,
    )
    .run();
  return Boolean(ok);
}

/** Record focus memory from a live TipTap selection. */
export function tipTapFocusMemory(editor: Editor): HaimLlmAssistFocusMemory {
  const { from, to } = editor.state.selection;
  return { surface: 'tiptap', from, to, everFocused: true };
}

/** Record focus memory from a live CodeMirror selection. */
export function cmFocusMemory(cm: CmEditorView): HaimLlmAssistFocusMemory {
  const { from, to } = cm.state.selection.main;
  return { surface: 'cm', from, to, everFocused: true };
}
