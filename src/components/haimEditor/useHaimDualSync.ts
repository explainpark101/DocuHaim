/**
 * Bidirectional TipTap <-> CodeMirror sync with debounce + origin tags.
 * After debounce the follower pane always receives the author's markdown;
 * the typing pane is never rewritten (avoids caret / IME flicker).
 */

import { useCallback, useEffect, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import type { EditorView } from '@codemirror/view';
import { editorToVaultMarkdown } from '@/components/haimEditor/markdownIo';
import {
  HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  replaceCmDocPreservingView,
  replaceTipTapPreservingView,
  shouldRewriteFollowerPane,
} from '@/components/haimEditor/haimDualSyncApply';

export type SyncOrigin = 'tiptap' | 'cm' | 'external' | null;

/** Re-export — idle debounce while local input is ongoing. */
export { HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS };

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
  /**
   * Updated on every local TipTap/CM edit schedule (Date.now).
   * Parent value sync uses this to avoid stomping mid-keystroke.
   */
  localInputAtRef?: React.MutableRefObject<number>;
};

function bumpScrollSuppress(
  ref: React.MutableRefObject<number> | undefined,
  ms = 120,
): void {
  if (!ref) return;
  ref.current = Math.max(ref.current, Date.now() + ms);
}

function bumpLocalInput(ref: React.MutableRefObject<number> | undefined): void {
  if (!ref) return;
  ref.current = Date.now();
}

/**
 * Keep origin set through the sync body and the following microtask so nested
 * TipTap transactions (trimCodeBlocks / migrateMath) still see the tag.
 * Do not clear in the same turn as the write.
 */
function runWithOrigin(
  originRef: React.MutableRefObject<SyncOrigin>,
  origin: Exclude<SyncOrigin, null>,
  fn: () => void,
): void {
  originRef.current = origin;
  try {
    fn();
  } finally {
    void Promise.resolve().then(() => {
      if (originRef.current === origin) originRef.current = null;
    });
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
  localInputAtRef,
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
  /** Last markdown pushed to vault / follower — skip no-op feedback sync. */
  const lastPushedMdRef = useRef<string | null>(null);

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

  const flush = useCallback(() => {
    if (!editor) return;
    clearTipTapTimer();
    clearCmTimer();
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    lastPushedMdRef.current = md;
    onVaultChangeRef.current(md);
  }, [editor, metaPrefixRef]);

  /** Cancel pending debounced sync (e.g. before image upload apply). */
  const cancelPending = useCallback(() => {
    clearTipTapTimer();
    clearCmTimer();
  }, []);

  /**
   * Push current TipTap vault markdown into CM immediately (even if CM focused).
   * Used after wiki-image upload so source + WYSIWYG stay in sync.
   */
  const pushEditorMarkdownToCmNow = useCallback(() => {
    if (!editor) return;
    clearTipTapTimer();
    clearCmTimer();
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    lastPushedMdRef.current = md;
    onVaultChangeRef.current(md);
    const cm = cmViewRef.current;
    if (!cm) return;
    bumpScrollSuppress(suppressScrollSyncUntilRef);
    runWithOrigin(originRef, 'external', () => {
      replaceCmDocPreservingView(cm, md);
    });
  }, [editor, cmViewRef, metaPrefixRef, suppressScrollSyncUntilRef]);

  /**
   * Push CM doc into TipTap + vault immediately.
   */
  const pushCmMarkdownToEditorNow = useCallback(() => {
    if (!editor) return;
    const cm = cmViewRef.current;
    if (!cm) return;
    clearTipTapTimer();
    clearCmTimer();
    bumpScrollSuppress(suppressScrollSyncUntilRef);
    runWithOrigin(originRef, 'external', () => {
      const md = cm.state.doc.toString();
      lastPushedMdRef.current = md;
      onVaultChangeRef.current(md);
      replaceTipTapPreservingView(
        editor,
        md,
        metaPrefixRef,
        wysiwygScrollRef?.current,
      );
    });
  }, [
    editor,
    cmViewRef,
    metaPrefixRef,
    suppressScrollSyncUntilRef,
    wysiwygScrollRef,
  ]);

  // TipTap → CM + vault
  useEffect(() => {
    if (!editor || !enabled) return undefined;

    const applyTipTapToOther = () => {
      if (!editor) return;
      if (isBlockDragActive()) return;
      const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
      // No-op feedback (e.g. trimCodeBlocks after CM→TipTap) — do not rewrite CM.
      if (md === lastPushedMdRef.current) return;
      runWithOrigin(originRef, 'tiptap', () => {
        lastPushedMdRef.current = md;
        onVaultChangeRef.current(md);
        const cm = cmViewRef.current;
        if (!cm) return;
        // Never rewrite CM while the user is typing in source.
        if (!shouldRewriteFollowerPane(cm.hasFocus)) return;
        bumpScrollSuppress(suppressScrollSyncUntilRef);
        replaceCmDocPreservingView(cm, md);
      });
    };

    const scheduleTipTapSync = () => {
      if (originRef.current === 'cm' || originRef.current === 'external') return;
      if (composingRef.current) return;
      if (isBlockDragActive()) return;
      bumpLocalInput(localInputAtRef);
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
    localInputAtRef,
  ]);

  const notifyCmDocChanged = () => {
    if (!enabled || !editor) return;
    if (originRef.current === 'tiptap' || originRef.current === 'external') return;
    if (isBlockDragActive()) return;
    bumpLocalInput(localInputAtRef);
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
      const md = cm.state.doc.toString();
      if (md === lastPushedMdRef.current) {
        const tipTapMd = editorToVaultMarkdown(editor, metaPrefixRef.current);
        if (tipTapMd === md) return;
      }
      runWithOrigin(originRef, 'cm', () => {
        lastPushedMdRef.current = md;
        onVaultChangeRef.current(md);
        // Never rewrite TipTap while the user is typing in WYSIWYG.
        if (!shouldRewriteFollowerPane(editor.isFocused)) return;
        bumpScrollSuppress(suppressScrollSyncUntilRef);
        replaceTipTapPreservingView(
          editor,
          md,
          metaPrefixRef,
          wysiwygScrollRef?.current,
        );
      });
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
