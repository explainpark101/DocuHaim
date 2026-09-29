import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  keymap,
  highlightActiveLine,
  drawSelection,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import {
  applyBase64ImageFoldEnabled,
  base64ImageFoldExtension,
} from '@/utils/base64ImageFoldExtension';
import { loadBase64ImageFoldEnabled } from '@/utils/base64ImageFoldSettings';
import {
  applyMermaidBase64FoldEnabled,
  mermaidBase64FoldExtension,
} from '@/utils/mermaidBase64FoldExtension';
import {
  createNoteCoverFoldExtension,
  setNoteCoverFoldDocKey,
} from '@/utils/noteCover/noteCoverFoldExtension';
import {
  makeToggleTaskCheckboxHandler,
} from '@/utils/editorMarkdownStyle';
import { INSERT_LINE_ABOVE_KEYMAP } from '@/utils/cmInsertLineAbove';
import type { TaskCheckboxKind } from '@/utils/taskCheckboxStatus';
import { DEFAULT_DOCUMENT_TASK_CHECKBOX } from '@/utils/documentSettingsMeta';

type Props = {
  initialValue: string;
  theme?: string;
  onDocChanged: () => void;
  viewRef: React.MutableRefObject<EditorView | null>;
  className?: string;
  /** Fired after CM create and again after destroy (scroll-sync rebind). */
  onViewReady?: (() => void) | undefined;
  /** Clipboard / OS image paste → upload as wiki images. */
  onPasteImages?: ((files: File[]) => void) | undefined;
  /** IndexedDB key for per-document note-cover fold persistence. */
  noteCoverFoldDocKey?: string | null | undefined;
  /** Collapse long `data:image/...;base64,...` payloads (and mermaid fences). */
  foldBase64Images?: boolean | undefined;
  /** Document task-checkbox mode (from document-settings). */
  getTaskCheckboxKind?: (() => TaskCheckboxKind) | undefined;
};

/**
 * Lazy-mounted markdown source pane for Haim dual mode.
 * Unmount destroys CM (clears history) — intentional for session cost.
 * Includes note-cover + base64 image fold (same CM extensions as MarkdownEditor).
 */
export default function HaimSourcePane({
  initialValue,
  theme = 'light',
  onDocChanged,
  viewRef,
  className = '',
  onViewReady,
  onPasteImages,
  noteCoverFoldDocKey = null,
  foldBase64Images = true,
  getTaskCheckboxKind,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const onDocChangedRef = useRef(onDocChanged);
  onDocChangedRef.current = onDocChanged;
  const onViewReadyRef = useRef(onViewReady);
  onViewReadyRef.current = onViewReady;
  const onPasteImagesRef = useRef(onPasteImages);
  onPasteImagesRef.current = onPasteImages;
  const foldDocKeyRef = useRef(noteCoverFoldDocKey);
  foldDocKeyRef.current = noteCoverFoldDocKey;
  const getTaskCheckboxKindRef = useRef(getTaskCheckboxKind);
  getTaskCheckboxKindRef.current = getTaskCheckboxKind;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const foldEnabled =
      typeof foldBase64Images === 'boolean'
        ? foldBase64Images
        : loadBase64ImageFoldEnabled();

    const extensions = [
      // Includes lineNumbers + cover/heading fold gutter (do not add lineNumbers again).
      createNoteCoverFoldExtension(),
      base64ImageFoldExtension(foldEnabled),
      mermaidBase64FoldExtension(foldEnabled),
      highlightActiveLine(),
      drawSelection(),
      history(),
      INSERT_LINE_ABOVE_KEYMAP,
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        {
          key: 'Ctrl-Tab',
          run: makeToggleTaskCheckboxHandler(
            () =>
              getTaskCheckboxKindRef.current?.() ?? DEFAULT_DOCUMENT_TASK_CHECKBOX,
          ),
        },
      ]),
      markdown(),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onDocChangedRef.current();
      }),
      EditorView.domEventHandlers({
        paste(event) {
          const handler = onPasteImagesRef.current;
          if (!handler) return false;
          const files = collectClipboardImageFiles(event.clipboardData);
          if (!files.length) return false;
          event.preventDefault();
          handler(files);
          return true;
        },
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
    setNoteCoverFoldDocKey(view, foldDocKeyRef.current ?? null);
    onViewReadyRef.current?.();
    return () => {
      view.destroy();
      viewRef.current = null;
      onViewReadyRef.current?.();
    };
    // Mount once per dual session; parent pushes content via sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore / rebind note-cover fold persistence when the open file changes.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    setNoteCoverFoldDocKey(view, noteCoverFoldDocKey ?? null);
  }, [noteCoverFoldDocKey, viewRef]);

  // Toggle base64 / mermaid payload folding without remounting the view.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    applyBase64ImageFoldEnabled(view, foldBase64Images !== false);
    applyMermaidBase64FoldEnabled(view, foldBase64Images !== false);
  }, [foldBase64Images, viewRef]);

  return (
    <div
      ref={hostRef}
      className={`haim-source-pane h-full min-h-0 overflow-hidden border-r border-gray-200 dark:border-odp-borderStrong ${className}`}
    />
  );
}
