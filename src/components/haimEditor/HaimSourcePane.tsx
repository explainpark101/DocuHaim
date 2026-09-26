import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  keymap,
  highlightActiveLine,
  lineNumbers,
  drawSelection,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

type Props = {
  initialValue: string;
  theme?: string;
  onDocChanged: () => void;
  viewRef: React.MutableRefObject<EditorView | null>;
  className?: string;
  /** Fired after CM create and again after destroy (scroll-sync rebind). */
  onViewReady?: (() => void) | undefined;
};

/**
 * Lazy-mounted markdown source pane for Haim dual mode.
 * Unmount destroys CM (clears history) — intentional for session cost.
 */
export default function HaimSourcePane({
  initialValue,
  theme = 'light',
  onDocChanged,
  viewRef,
  className = '',
  onViewReady,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const onDocChangedRef = useRef(onDocChanged);
  onDocChangedRef.current = onDocChanged;
  const onViewReadyRef = useRef(onViewReady);
  onViewReadyRef.current = onViewReady;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      drawSelection(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      markdown(),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onDocChangedRef.current();
      }),
      EditorView.theme({
        '&': { height: '100%', fontSize: '13px' },
        '.cm-scroller': {
          overflow: 'auto',
          fontFamily:
            'D2Coding, JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        },
        '&.cm-focused': { outline: 'none' },
      }),
      ...(theme === 'dark' ? [oneDark] : []),
    ];

    const view = new EditorView({
      parent: host,
      state: EditorState.create({
        doc: initialValue,
        extensions,
      }),
    });
    viewRef.current = view;
    onViewReadyRef.current?.();
    return () => {
      view.destroy();
      viewRef.current = null;
      onViewReadyRef.current?.();
    };
    // Mount once per dual session; parent pushes content via sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      className={`haim-source-pane h-full min-h-0 overflow-hidden border-r border-gray-200 dark:border-odp-borderStrong ${className}`}
    />
  );
}
