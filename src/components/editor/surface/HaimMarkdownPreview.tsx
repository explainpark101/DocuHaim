/**
 * Read-only TipTap Haim preview for MarkdownPreviewSurface.
 * Emits a `.md-editor-preview` root so ExportPDF paged.js wait/selectors keep working.
 */

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';
import {
  markdownToEditorContent,
  setEditorMarkdown,
} from '@/components/haimEditor/markdownIo';
import { applyHaimPreviewExportPdfAliases } from '@/utils/exportPdf/normalizeHaimPreviewForExportPdf';
import '@/styles/haim-editor/style.css';
import '@/styles/haim-editor/preview-tokens.css';
import '@/styles/haim-editor/code-hljs-themes.css';
import 'katex/dist/katex.min.css';

export type HaimMdHeadingIdArgs = {
  text?: string;
  level?: number;
  index: number;
};

export type HaimMarkdownPreviewProps = {
  id?: string;
  /** Vault markdown (ExportPDF / some call sites). */
  value?: string;
  /** md-editor-rt alias used by quiz / chat / freeze. */
  modelValue?: string;
  theme?: 'light' | 'dark' | string;
  /** Reserved; Haim code blocks render mermaid themselves when present. */
  noMermaid?: boolean;
  mdHeadingId?: (args: HaimMdHeadingIdArgs) => string;
  className?: string;
  /** Unused md-editor-rt props are accepted and ignored. */
  [key: string]: unknown;
};

function joinCheck(prefix: string, _content: string): string {
  return prefix;
}

export default function HaimMarkdownPreview({
  id,
  value,
  modelValue,
  theme = 'light',
  mdHeadingId,
  className = '',
}: HaimMarkdownPreviewProps) {
  const markdown = String(value ?? modelValue ?? '');
  const metaPrefixRef = useRef('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === 'dark';

  const extensions = useMemo(
    () =>
      createHaimExtensions({
        placeholder: '',
        profile: 'note',
      }),
    [],
  );

  const initial = useMemo(() => markdownToEditorContent(markdown), []);

  const editor = useEditor(
    {
      extensions,
      content: initial.content,
      contentType: 'markdown',
      editable: false,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[2rem] py-1 px-0 ${
            isDark ? 'haim-editor--dark' : ''
          }`,
        },
      },
      onCreate: ({ editor: ed }) => {
        metaPrefixRef.current = initial.prefix;
        if (markdown !== joinCheck(initial.prefix, initial.content)) {
          setEditorMarkdown(ed, markdown, metaPrefixRef, { emitUpdate: false });
        }
      },
    },
    [extensions],
  );

  useEffect(() => {
    if (!editor) return;
    setEditorMarkdown(editor, markdown, metaPrefixRef, { emitUpdate: false });
  }, [editor, markdown]);

  useEffect(() => {
    if (!editor) return;
    editor.view.dom.classList.toggle('haim-editor--dark', isDark);
  }, [editor, isDark]);

  // Alias Haim node-view classes onto md-editor-* for ExportPDF fit / paged clone.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !editor) return;

    const apply = () => applyHaimPreviewExportPdfAliases(root);
    apply();

    const mo = new MutationObserver(() => apply());
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [editor, markdown]);

  // ExportPDF TOC / pgbr: assign heading ids like md-editor-rt mdHeadingId (1-based).
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !mdHeadingId) return;
    const headings = root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6');
    headings.forEach((el, i) => {
      const index = i + 1;
      const level = Number(el.tagName.slice(1)) || 1;
      const nextId = mdHeadingId({
        text: el.textContent || '',
        level,
        index,
      });
      if (nextId && el.id !== nextId) el.id = nextId;
    });
  }, [editor, markdown, mdHeadingId]);

  return (
    <div id={id} className={`haim-markdown-preview-host ${className}`.trim()}>
      <div
        ref={rootRef}
        className="md-editor-preview haim-markdown-preview"
        data-haim-markdown-preview=""
      >
        <div
          className={`haim-editor ${isDark ? 'haim-editor--dark' : ''}`.trim()}
          data-haim-preview-only=""
        >
          <EditorContent editor={editor} className="haim-editor-content" />
        </div>
      </div>
    </div>
  );
}
