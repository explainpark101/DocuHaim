/**
 * Bidirectional TipTap <-> CodeMirror sync with debounce + origin tags.
 * After debounce the follower pane always receives the author's markdown;
 * the typing pane is never rewritten (avoids caret / IME flicker).
 */

import { useEffect, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import type { EditorView } from '@codemirror/view';
import { editorToVaultMarkdown } from '@/components/haimEditor/markdownIo';
import { setEditorMarkdown } from '@/components/haimEditor/markdownIo';

export type SyncOrigin = 'tiptap' | 'cm' | 'external' | null;

/** Idle debounce before cross-pane content sync. */
export const HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS = 150;

type Options = {
  editor: Editor | null;
  cmViewRef: React.MutableRefObject<EditorView | null>;
  metaPrefixRef: React.MutableRefObject<string>;
  enabled: boolean;
  debounceMs?: number;
  /** Parent vault onChange — markdown only. */
  onVaultChange: (markdown: string) => void;
  /** WYSIWYG overflow scroller — preserve scroll when applying CM → TipTap. */
  wysiwygScrollRef?: React.RefObject<HTMLElement | null>;
  /**
   * Timestamp (ms) until which scroll sync should ignore echo events from
   * cross-pane doc writes (avoids flicker on the typing pane).
   */
  suppressScrollSyncUntilRef?: React.MutableRefObject<number>;
  /**
   * When true, skip scheduling / applying cross-pane content sync so block
   * drag-and-drop is not aborted by setContent / CM replace.
   */
  blockDragActiveRef?: React.MutableRefObject<boolean>;
};

function bumpScrollSuppress(
  ref: React.MutableRefObject<number> | undefined,
  ms = 120,
): void {
  if (!ref) return;
  ref.current = Math.max(ref.current, Date.now() + ms);
}

function replaceCmDocPreservingScroll(cm: EditorView, md: string): boolean {
  const cur = cm.state.doc.toString();
  if (cur === md) return false;
  const scrollDom = cm.scrollDOM;
  const savedTop = scrollDom.scrollTop;
  const savedLeft = scrollDom.scrollLeft;
  cm.dispatch({ changes: { from: 0, to: cur.length, insert: md } });
  scrollDom.scrollTop = savedTop;
  scrollDom.scrollLeft = savedLeft;
  return true;
}

function replaceTipTapPreservingScroll(
  editor: Editor,
  md: string,
  metaPrefixRef: React.MutableRefObject<string>,
  wysiwygScrollEl: HTMLElement | null | undefined,
): void {
  const savedTop = wysiwygScrollEl?.scrollTop ?? null;
  const savedLeft = wysiwygScrollEl?.scrollLeft ?? null;
  setEditorMarkdown(editor, md, metaPrefixRef, { emitUpdate: false });
  if (wysiwygScrollEl && savedTop != null) {
    wysiwygScrollEl.scrollTop = savedTop;
    if (savedLeft != null) wysiwygScrollEl.scrollLeft = savedLeft;
  }
}

export function useHaimDualSync({
  editor,
  cmViewRef,
  metaPrefixRef,
  enabled,
  debounceMs = HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  onVaultChange,
  wysiwygScrollRef,
  suppressScrollSyncUntilRef,
  blockDragActiveRef,
}: Options): {
  originRef: React.MutableRefObject<SyncOrigin>;
  notifyCmDocChanged: () => void;
  flush: () => void;
  cancelPending: () => void;
  pushEditorMarkdownToCmNow: () => void;
  pushCmMarkdownToEditorNow: () => void;
} {
  const originRef = useRef<SyncOrigin>(null);
  const onVaultChangeRef = useRef(onVaultChange);
  onVaultChangeRef.current = onVaultChange;
  const tipTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composingRef = useRef(false);

  const isBlockDragActive = () => Boolean(blockDragActiveRef?.current);

  const clearTipTapTimer = () => {
    if (tipTapTimer.current) {
      clearTimeout(tipTapTimer.current);
      tipTapTimer.current = null;
    }
  };

  const clearCmTimer = () => {
    if (cmTimer.current) {
      clearTimeout(cmTimer.current);
      cmTimer.current = null;
    }
  };

  const flush = () => {
    if (!editor) return;
    clearTipTapTimer();
    clearCmTimer();
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    onVaultChangeRef.current(md);
  };

  /** Cancel pending debounced sync (e.g. before image upload apply). */
  const cancelPending = () => {
    clearTipTapTimer();
    clearCmTimer();
  };

  /**
   * Push current TipTap vault markdown into CM immediately (even if CM focused).
   * Used after wiki-image upload so source + WYSIWYG stay in sync.
   */
  const pushEditorMarkdownToCmNow = () => {
    if (!editor) return;
    cancelPending();
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    onVaultChangeRef.current(md);
    const cm = cmViewRef.current;
    if (!cm) return;
    bumpScrollSuppress(suppressScrollSyncUntilRef);
    originRef.current = 'external';
    replaceCmDocPreservingScroll(cm, md);
    originRef.current = null;
  };

  /**
   * Push CM doc into TipTap + vault immediately.
   */
  const pushCmMarkdownToEditorNow = () => {
    if (!editor) return;
    const cm = cmViewRef.current;
    if (!cm) return;
    cancelPending();
    bumpScrollSuppress(suppressScrollSyncUntilRef);
    originRef.current = 'external';
    const md = cm.state.doc.toString();
    onVaultChangeRef.current(md);
    replaceTipTapPreservingScroll(
      editor,
      md,
      metaPrefixRef,
      wysiwygScrollRef?.current,
    );
    originRef.current = null;
  };

  // TipTap → CM + vault
  useEffect(() => {
    if (!editor || !enabled) return undefined;

    const applyTipTapToOther = () => {
      if (!editor) return;
      if (isBlockDragActive()) return;
      originRef.current = 'tiptap';
      try {
        const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
        onVaultChangeRef.current(md);
        const cm = cmViewRef.current;
        if (!cm) return;
        // Always sync follower (CM) after debounce — both panes must match.
        bumpScrollSuppress(suppressScrollSyncUntilRef);
        replaceCmDocPreservingScroll(cm, md);
      } finally {
        originRef.current = null;
      }
    };

    const scheduleTipTapSync = () => {
      if (originRef.current === 'cm' || originRef.current === 'external') return;
      if (composingRef.current) return;
      if (isBlockDragActive()) return;
      // Latest author wins — drop pending CM → TipTap so we do not stomp TipTap.
      clearCmTimer();
      clearTipTapTimer();
      tipTapTimer.current = setTimeout(() => {
        tipTapTimer.current = null;
        if (!editor) return;
        if (originRef.current === 'cm' || originRef.current === 'external') return;
        if (isBlockDragActive()) return;
        applyTipTapToOther();
      }, debounceMs);
    };

    const onCompositionStart = () => {
      composingRef.current = true;
    };
    const onCompositionEnd = () => {
      composingRef.current = false;
      // IME commit may not emit another update — force cross-pane sync.
      scheduleTipTapSync();
    };
    const dom = editor.view.dom;
    dom.addEventListener('compositionstart', onCompositionStart);
    dom.addEventListener('compositionend', onCompositionEnd);

    editor.on('update', scheduleTipTapSync);
    return () => {
      editor.off('update', scheduleTipTapSync);
      dom.removeEventListener('compositionstart', onCompositionStart);
      dom.removeEventListener('compositionend', onCompositionEnd);
      clearTipTapTimer();
    };
  }, [
    editor,
    enabled,
    debounceMs,
    cmViewRef,
    metaPrefixRef,
    suppressScrollSyncUntilRef,
    blockDragActiveRef,
  ]);

  const notifyCmDocChanged = () => {
    if (!enabled || !editor) return;
    if (originRef.current === 'tiptap' || originRef.current === 'external') return;
    if (isBlockDragActive()) return;
    // Latest author wins — drop pending TipTap → CM so we do not stomp CM.
    clearTipTapTimer();
    clearCmTimer();
    cmTimer.current = setTimeout(() => {
      cmTimer.current = null;
      if (!editor) return;
      if (originRef.current === 'tiptap' || originRef.current === 'external') return;
      if (isBlockDragActive()) return;
      const cm = cmViewRef.current;
      if (!cm) return;
      originRef.current = 'cm';
      try {
        const md = cm.state.doc.toString();
        onVaultChangeRef.current(md);
        // Always sync follower (TipTap) after debounce — both panes must match.
        bumpScrollSuppress(suppressScrollSyncUntilRef);
        replaceTipTapPreservingScroll(
          editor,
          md,
          metaPrefixRef,
          wysiwygScrollRef?.current,
        );
      } finally {
        originRef.current = null;
      }
    }, debounceMs);
  };

  return {
    originRef,
    notifyCmDocChanged,
    flush,
    cancelPending,
    pushEditorMarkdownToCmNow,
    pushCmMarkdownToEditorNow,
  };
}
