/**
 * Pure helpers + view writes for TipTap ↔ CodeMirror dual sync.
 * Keeps caret/scroll stable: never rewrite a focused follower, never
 * scrollIntoView on programmatic doc replaces.
 */

import { ChangeSet } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type { Editor } from '@tiptap/react';
import { TextSelection } from '@tiptap/pm/state';
import { setEditorMarkdown } from '@/components/haimEditor/markdownIo';

/** Idle debounce while local input is ongoing (TipTap or CM). */
export const HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS = 300;

/**
 * Follower pane must not be rewritten while it has focus (user is typing there).
 */
export function shouldRewriteFollowerPane(followerFocused: boolean): boolean {
  return !followerFocused;
}

/**
 * True while local typing is still inside the dual-sync debounce window.
 * Parent `value` must not replace the live doc in that window (except file switch).
 */
export function isLocalInputDebounceActive(
  nowMs: number,
  lastLocalInputAtMs: number,
  debounceMs: number = HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
): boolean {
  if (lastLocalInputAtMs <= 0) return false;
  return nowMs - lastLocalInputAtMs < debounceMs;
}

/** Clamp a ProseMirror selection into a valid range for `doc.content.size`. */
export function clampPmSelection(
  from: number,
  to: number,
  contentSize: number,
): { from: number; to: number } {
  const maxPos = Math.max(1, contentSize);
  const a = Math.max(1, Math.min(from, maxPos));
  const b = Math.max(1, Math.min(to, maxPos));
  return a <= b ? { from: a, to: b } : { from: b, to: a };
}

/** Clamp a CodeMirror offset into `[0, docLength]`. */
export function clampCmOffset(pos: number, docLength: number): number {
  return Math.max(0, Math.min(pos, Math.max(0, docLength)));
}

/**
 * Replace CM doc while preserving scroll + mapped selection.
 * `scrollIntoView: false` avoids jumping the caret to the bottom of the pane.
 */
export function replaceCmDocPreservingView(cm: EditorView, md: string): boolean {
  const cur = cm.state.doc.toString();
  if (cur === md) return false;
  const scrollDom = cm.scrollDOM;
  const savedTop = scrollDom.scrollTop;
  const savedLeft = scrollDom.scrollLeft;
  const change = { from: 0, to: cur.length, insert: md };
  const mapped = cm.state.selection.map(ChangeSet.of(change, cur.length));
  cm.dispatch({
    changes: change,
    selection: mapped,
    scrollIntoView: false,
  });
  scrollDom.scrollTop = savedTop;
  scrollDom.scrollLeft = savedLeft;
  return true;
}

/**
 * Replace TipTap markdown while preserving WYSIWYG scroll + best-effort caret.
 * Does not call focus() / scrollIntoView.
 */
export function replaceTipTapPreservingView(
  editor: Editor,
  md: string,
  metaPrefixRef: { current: string },
  wysiwygScrollEl: HTMLElement | null | undefined,
): void {
  const savedTop = wysiwygScrollEl?.scrollTop ?? null;
  const savedLeft = wysiwygScrollEl?.scrollLeft ?? null;
  const { from, to } = editor.state.selection;

  setEditorMarkdown(editor, md, metaPrefixRef, { emitUpdate: false });

  try {
    const next = clampPmSelection(from, to, editor.state.doc.content.size);
    const $from = editor.state.doc.resolve(next.from);
    const $to = editor.state.doc.resolve(next.to);
    const tr = editor.state.tr.setSelection(TextSelection.between($from, $to));
    editor.view.dispatch(tr);
  } catch {
    // Selection restore is best-effort after full markdown replace.
  }

  if (wysiwygScrollEl && savedTop != null) {
    wysiwygScrollEl.scrollTop = savedTop;
    if (savedLeft != null) wysiwygScrollEl.scrollLeft = savedLeft;
  }
}
