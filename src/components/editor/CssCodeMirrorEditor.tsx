import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  keymap,
  highlightActiveLine,
  highlightActiveLineGutter,
  lineNumbers,
  drawSelection,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';

type Props = {
  value: string;
  onChange: (next: string) => void;
  className?: string;
};

/**
 * Lightweight CodeMirror 6 CSS editor for webfont @font-face / @import CSS.
 * Uses Atom One Dark (`@codemirror/theme-one-dark`).
 */
export function CssCodeMirrorEditor({ value, onChange, className = '' }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const view = new EditorView({
      parent: host,
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          drawSelection(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          css(),
          oneDark,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString());
            }
          }),
          EditorView.theme({
            '&': {
              height: '100%',
              fontSize: '12px',
            },
            '.cm-scroller': {
              overflow: 'auto',
              fontFamily:
                'JetBrains Mono, D2Coding, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
            '&.cm-focused': {
              outline: 'none',
            },
          }),
        ],
      }),
    });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Mount once; external value sync handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
    });
  }, [value]);

  return (
    <div
      ref={hostRef}
      className={`min-h-0 overflow-hidden rounded border border-gray-700/80 ${className}`}
    />
  );
}
