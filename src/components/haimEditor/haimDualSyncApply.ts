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

/**
 * Which dual pane last produced an edit event and drives content sync.
 * Default / unclear → source (CM).
 */
export type HaimDualSyncAuthor = 'tiptap' | 'cm';

/** Canonical fallback when no edit has been recorded yet. */
export const HAIM_DUAL_SYNC_DEFAULT_AUTHOR: HaimDualSyncAuthor = 'cm';

/**
 * Resolve the sync author from the last edit event.
 * Focus is intentionally ignored here (it only protects the follower caret).
 * When `lastAuthor` is missing/invalid, prefer source (CM).
 */
export function resolveHaimDualSyncAuthor(options: {
  lastAuthor: HaimDualSyncAuthor | null | undefined;
  /** Kept for call-site compatibility; not used for SoT. */
  tipTapFocused?: boolean;
  cmFocused?: boolean;
}): HaimDualSyncAuthor {
  const { lastAuthor } = options;
  if (lastAuthor === 'tiptap' || lastAuthor === 'cm') return lastAuthor;
  return HAIM_DUAL_SYNC_DEFAULT_AUTHOR;
}

/**
 * Follower pane must not be rewritten while it has focus (user is typing there).
 */
export function shouldRewriteFollowerPane(followerFocused: boolean): boolean {
  return !followerFocused;
}

/**
 * A pane may push markdown into the vault when the note body is loaded and
 * either it still has focus or it is the last-edit author (toolbar blur).
 */
export function canDriveVaultSync(options: {
  paneFocused: boolean;
  vaultReady: boolean;
  isLastEditAuthor?: boolean;
}): boolean {
  if (!options.vaultReady) return false;
  return options.paneFocused || Boolean(options.isLastEditAuthor);
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
