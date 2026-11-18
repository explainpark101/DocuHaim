import type { LlmAssistEditorBridge } from '@/contexts/LlmAssistSessionContext';

/**
 * Prefer the active editor bridge selection, then fall back to the DOM selection.
 */
export function readLlmAssistLiveSelectionText(
  editorBridge?: LlmAssistEditorBridge | null,
): string {
  if (typeof editorBridge?.getSelection === 'function') {
    const snap = editorBridge.getSelection();
    const text = String(snap?.text || '').trim();
    if (text) return text;
  }

  try {
    const api = editorBridge?.getEditorApi?.();
    const selected = api?.getSelectedText?.();
    const text = String(selected || '').trim();
    if (text) return text;
  } catch {
    // ignore
  }

  try {
    const dom = window.getSelection?.()?.toString() ?? '';
    return dom.trim();
  } catch {
    return '';
  }
}

export type LlmAssistSelectionAnchor = {
  text: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

/** DOM selection rect for floating "add to chat" UI. */
export function readLlmAssistDomSelectionAnchor(): LlmAssistSelectionAnchor | null {
  try {
    const sel = window.getSelection?.();
    if (!sel || sel.isCollapsed || sel.rangeCount < 1) return null;
    const text = sel.toString().trim();
    if (!text) return null;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return null;
    return {
      text,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  } catch {
    return null;
  }
}
