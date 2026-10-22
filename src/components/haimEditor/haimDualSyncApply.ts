/**
 * Pure helpers + view writes for TipTap ↔ CodeMirror dual sync.
 * Keeps caret/scroll stable: never rewrite a focused follower, never
 * scrollIntoView on programmatic doc replaces.
 */

import type { Editor } from '@tiptap/react';
import { TextSelection } from '@tiptap/pm/state';
import { setEditorMarkdown } from '@/components/haimEditor/markdownIo';
import {
  replaceCmDocPreservingView,
  replaceCmDocPreservingViewAsync,
} from '@/components/haimEditor/haimCmDocReplace';
import { HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT } from '@/utils/haimDualSyncDebounceSettings';
import {
  captureHaimScrollerPin,
  haimMaxScrollTop,
  retainHaimScrollerPin,
} from '@/components/haimEditor/haimDoubleScrollSyncCore';

export { replaceCmDocPreservingView, replaceCmDocPreservingViewAsync };

/** Idle debounce while local input is ongoing (TipTap or CM). Default 150ms. */
export const HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS = HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT;

/** Which dual pane owns keyboard focus and drives content sync. */
export type HaimDualSyncAuthor = 'tiptap' | 'cm';

/**
 * Resolve the sync author from keyboard focus.
 * Focused pane wins; if neither (or both) report focus, keep `lastAuthor`.
 */
export function resolveHaimDualSyncAuthor(options: {
  tipTapFocused: boolean;
  cmFocused: boolean;
  lastAuthor: HaimDualSyncAuthor;
}): HaimDualSyncAuthor {
  const { tipTapFocused, cmFocused, lastAuthor } = options;
  if (tipTapFocused && !cmFocused) return 'tiptap';
  if (cmFocused && !tipTapFocused) return 'cm';
  return lastAuthor;
}

/**
 * Follower pane must not be rewritten while it has focus (user is typing there).
 */
export function shouldRewriteFollowerPane(followerFocused: boolean): boolean {
  return !followerFocused;
}

/**
 * Only a pane that actually has keyboard focus may push markdown into the
 * vault. `lastAuthor` fallback is for follower sync, not for unfocused
 * split panes (those were writing "" over a loaded note on mount).
 */
export function canDriveVaultSync(options: {
  paneFocused: boolean;
  vaultReady: boolean;
}): boolean {
  return options.paneFocused && options.vaultReady;
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
  if (debounceMs <= 0) return false;
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
 * Replace TipTap markdown while preserving WYSIWYG scroll + best-effort caret.
 * Does not call focus() / scrollIntoView.
 */
export function replaceTipTapPreservingView(
  editor: Editor,
  md: string,
  metaPrefixRef: { current: string },
  wysiwygScrollEl: HTMLElement | null | undefined,
): void {
  const pin = wysiwygScrollEl
    ? captureHaimScrollerPin(
        wysiwygScrollEl.scrollTop,
        haimMaxScrollTop(wysiwygScrollEl),
        wysiwygScrollEl.scrollLeft,
      )
    : null;
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

  if (wysiwygScrollEl && pin) retainHaimScrollerPin(wysiwygScrollEl, pin);
}
