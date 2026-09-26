/**
 * Selection wrap on typing pair/fence keys (shared by MarkdownEditor + chat composer).
 */

import type { EditorView } from '@codemirror/view';
import {
  wrapBracesForSelection,
  wrapBracketsForSelection,
  wrapDoubleQuoteForSelection,
  wrapLatexForSelection,
  wrapParenthesesForSelection,
  wrapSelectionWithInlineCode,
  wrapSingleQuoteForSelection,
} from '@/utils/editorMarkdownStyle';

type KeyLike = Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'isComposing' | 'defaultPrevented'>;

/** macOS / iOS / iPadOS — KO layouts map the backtick key to ₩ / \\. */
export function isApplePlatformForInlineCodeFence(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || '';
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua) || /iPhone|iPad|iPod/i.test(platform)) return true;
  if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) return true;
  return false;
}

/**
 * Inline-code wrap trigger for a non-empty selection.
 * Always: ` / Backquote.
 * Apple only: ₩ / \\ / IntlBackslash (Mac KO layouts; not Windows/Android backslash).
 */
export function isInlineCodeFenceTriggerKey(e: KeyLike): boolean {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key, code } = e;
  if (key === '`') return true;
  if (code === 'Backquote') return true;
  if (!isApplePlatformForInlineCodeFence()) return false;
  if (key === '₩' || key === '\\') return true;
  if (code === 'IntlBackslash') return true;
  return false;
}

/** Wrap the current selection when typing $, [, (, {, ', or ". Empty selection: no-op. */
export function wrapSelectionWithPairIfTriggerKey(
  view: EditorView,
  event: KeyLike,
): boolean {
  if (event.defaultPrevented) return false;
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  switch (event.key) {
    case '$':
      return wrapLatexForSelection(view);
    case '[':
      return wrapBracketsForSelection(view);
    case '(':
      return wrapParenthesesForSelection(view);
    case '{':
      return wrapBracesForSelection(view);
    case "'":
      return wrapSingleQuoteForSelection(view);
    case '"':
      return wrapDoubleQuoteForSelection(view);
    default:
      if (event.code === 'Quote') {
        return event.shiftKey
          ? wrapDoubleQuoteForSelection(view)
          : wrapSingleQuoteForSelection(view);
      }
      return false;
  }
}

/**
 * Handle keydown wrap for non-empty selections (inline code + pair chars).
 * Caller should preventDefault/stopPropagation when this returns true.
 */
export function handleMdEditorSelectionWrapKeydown(
  e: KeyLike & { preventDefault?: () => void },
  view: EditorView | null | undefined,
): boolean {
  if (!view || view.composing) return false;

  if (isInlineCodeFenceTriggerKey(e)) {
    if (wrapSelectionWithInlineCode(view)) return true;
  }

  return wrapSelectionWithPairIfTriggerKey(view, e);
}
