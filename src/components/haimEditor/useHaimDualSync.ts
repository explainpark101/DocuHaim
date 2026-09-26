/**
 * Bidirectional TipTap <-> CodeMirror sync with debounce + origin tags.
 * TipTap doc is the authority; CM is a derived editable view.
 */

import { useEffect, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import type { EditorView } from '@codemirror/view';
import { editorToVaultMarkdown } from '@/components/haimEditor/markdownIo';
import { setEditorMarkdown } from '@/components/haimEditor/markdownIo';

export type SyncOrigin = 'tiptap' | 'cm' | 'external' | null;

const DEFAULT_DEBOUNCE_MS = 200;

type Options = {
  editor: Editor | null;
  cmViewRef: React.MutableRefObject<EditorView | null>;
  metaPrefixRef: React.MutableRefObject<string>;
  enabled: boolean;
  debounceMs?: number;
  /** Parent vault onChange — markdown only. */
  onVaultChange: (markdown: string) => void;
};

export function useHaimDualSync({
  editor,
  cmViewRef,
  metaPrefixRef,
  enabled,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  onVaultChange,
}: Options): {
  originRef: React.MutableRefObject<SyncOrigin>;
  notifyCmDocChanged: () => void;
  flush: () => void;
} {
  const originRef = useRef<SyncOrigin>(null);
  const onVaultChangeRef = useRef(onVaultChange);
  onVaultChangeRef.current = onVaultChange;
  const tipTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composingRef = useRef(false);

  const flush = () => {
    if (!editor) return;
    if (tipTapTimer.current) {
      clearTimeout(tipTapTimer.current);
      tipTapTimer.current = null;
    }
    if (cmTimer.current) {
      clearTimeout(cmTimer.current);
      cmTimer.current = null;
    }
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    onVaultChangeRef.current(md);
  };

  // TipTap → CM + vault
  useEffect(() => {
    if (!editor || !enabled) return undefined;

    const onCompositionStart = () => {
      composingRef.current = true;
    };
    const onCompositionEnd = () => {
      composingRef.current = false;
    };
    const dom = editor.view.dom;
    dom.addEventListener('compositionstart', onCompositionStart);
    dom.addEventListener('compositionend', onCompositionEnd);

    const handleUpdate = () => {
      if (originRef.current === 'cm' || originRef.current === 'external') return;
      if (composingRef.current) return;
      if (tipTapTimer.current) clearTimeout(tipTapTimer.current);
      tipTapTimer.current = setTimeout(() => {
        tipTapTimer.current = null;
        if (!editor) return;
        originRef.current = 'tiptap';
        const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
        onVaultChangeRef.current(md);
        const cm = cmViewRef.current;
        if (cm && !cm.hasFocus) {
          const cur = cm.state.doc.toString();
          if (cur !== md) {
            cm.dispatch({
              changes: { from: 0, to: cur.length, insert: md },
            });
          }
        }
        originRef.current = null;
      }, debounceMs);
    };

    editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
      dom.removeEventListener('compositionstart', onCompositionStart);
      dom.removeEventListener('compositionend', onCompositionEnd);
      if (tipTapTimer.current) clearTimeout(tipTapTimer.current);
    };
  }, [editor, enabled, debounceMs, cmViewRef, metaPrefixRef]);

  const notifyCmDocChanged = () => {
    if (!enabled || !editor) return;
    if (originRef.current === 'tiptap' || originRef.current === 'external') return;
    if (cmTimer.current) clearTimeout(cmTimer.current);
    cmTimer.current = setTimeout(() => {
      cmTimer.current = null;
      const cm = cmViewRef.current;
      if (!cm || !editor) return;
      originRef.current = 'cm';
      const md = cm.state.doc.toString();
      onVaultChangeRef.current(md);
      if (!editor.isFocused) {
        setEditorMarkdown(editor, md, metaPrefixRef, { emitUpdate: false });
      }
      originRef.current = null;
    }, debounceMs);
  };

  return { originRef, notifyCmDocChanged, flush };
}
