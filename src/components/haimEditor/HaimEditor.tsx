import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, EditorContent, EditorContext } from '@tiptap/react';
import type { NoteEditorProps } from '@/editor/contracts/noteEditorTypes';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';
import {
  editorToVaultMarkdown,
  markdownToEditorContent,
  setEditorMarkdown,
} from '@/components/haimEditor/markdownIo';
import { invalidateMarkdownCache } from '@/components/haimEditor/markdownCache';
import HaimToolbar from '@/components/haimEditor/HaimToolbar';
import HaimSourcePane from '@/components/haimEditor/HaimSourcePane';
import { useHaimDualSync } from '@/components/haimEditor/useHaimDualSync';
import { useHaimDoubleScrollSync } from '@/components/haimEditor/useHaimDoubleScrollSync';
import {
  HAIM_VIEW_MODE_CHANGED_EVENT,
  HAIM_VIEW_MODE_DOUBLE,
  HAIM_VIEW_MODE_SOURCE,
  HAIM_VIEW_MODE_WYSIWYG,
  loadHaimViewMode,
  type HaimViewMode,
} from '@/utils/haimViewModeSettings';
import {
  HAIM_DOUBLE_SCROLL_SYNC_CHANGED_EVENT,
  loadHaimDoubleScrollSyncEnabled,
  saveHaimDoubleScrollSyncEnabled,
} from '@/utils/haimDoubleScrollSyncSettings';
import { useLlmAssistSessionOptional } from '@/contexts/LlmAssistSessionContext';
import { registerEditorActions } from '@/utils/advancedSearch/editorActions';
import { openExportPdfSurface } from '@/utils/workspaceTabs/openExportPdfSurface';
import { useWorkspaceTabsCtxOptional } from '@/App/hooks/useWorkspaceTabsCtx';
import { useNavigate } from 'react-router';
import type { EditorView as CmEditorView } from '@codemirror/view';
import '@/styles/haim-editor/style.css';

/**
 * TipTap-based Haim Editor.
 * Default: WYSIWYG. Toolbar 3-way: wysiwyg | double | source.
 */
export default function HaimEditor({
  value,
  onChange,
  onSave,
  theme = 'light',
  currentFile = null,
  previewOnly = false,
  isMobileLayout = false,
  onUploadImage,
  isActiveFile = true,
  isSurfaceLive = true,
  onRequestConvertAllImagesToWiki,
  onRegisterConvertAllImagesToWiki,
}: NoteEditorProps) {
  const metaPrefixRef = useRef('');
  const cmViewRef = useRef<CmEditorView | null>(null);
  const wysiwygScrollRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  valueRef.current = value;
  onChangeRef.current = onChange;

  const [viewMode, setViewMode] = useState<HaimViewMode>(() => loadHaimViewMode());
  const [scrollSyncEnabled, setScrollSyncEnabled] = useState(() =>
    loadHaimDoubleScrollSyncEnabled(),
  );
  // Mobile: double collapses to wysiwyg; source stays full-width CM.
  const effectiveMode: HaimViewMode =
    isMobileLayout && viewMode === HAIM_VIEW_MODE_DOUBLE && !previewOnly
      ? HAIM_VIEW_MODE_WYSIWYG
      : viewMode;
  const showSource =
    !previewOnly &&
    (effectiveMode === HAIM_VIEW_MODE_DOUBLE ||
      effectiveMode === HAIM_VIEW_MODE_SOURCE);
  const showWysiwyg =
    previewOnly ||
    effectiveMode === HAIM_VIEW_MODE_WYSIWYG ||
    effectiveMode === HAIM_VIEW_MODE_DOUBLE;
  const doublePane = showSource && showWysiwyg;

  const llmAssist = useLlmAssistSessionOptional();
  const navigate = useNavigate();
  const tabsCtx = useWorkspaceTabsCtxOptional();

  useEffect(() => {
    const onEvt = () => setViewMode(loadHaimViewMode());
    window.addEventListener(HAIM_VIEW_MODE_CHANGED_EVENT, onEvt);
    return () => window.removeEventListener(HAIM_VIEW_MODE_CHANGED_EVENT, onEvt);
  }, []);

  useEffect(() => {
    const onEvt = () => setScrollSyncEnabled(loadHaimDoubleScrollSyncEnabled());
    window.addEventListener(HAIM_DOUBLE_SCROLL_SYNC_CHANGED_EVENT, onEvt);
    return () =>
      window.removeEventListener(HAIM_DOUBLE_SCROLL_SYNC_CHANGED_EVENT, onEvt);
  }, []);

  const extensions = useMemo(
    () =>
      createHaimExtensions({
        placeholder: previewOnly ? '' : '내용을 입력하세요…',
      }),
    [previewOnly],
  );

  const initial = useMemo(() => markdownToEditorContent(value || ''), []);

  const editor = useEditor(
    {
      extensions,
      content: initial.content,
      contentType: 'markdown',
      editable: !previewOnly && isSurfaceLive,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[12rem] px-3 py-2 ${
            theme === 'dark' ? 'haim-editor--dark' : ''
          }`,
        },
      },
      onCreate: ({ editor: ed }) => {
        metaPrefixRef.current = initial.prefix;
        // Ensure body matches current value after create
        if ((value || '') !== joinCheck(initial.prefix, initial.content)) {
          setEditorMarkdown(ed, value || '', metaPrefixRef, { emitUpdate: false });
        }
      },
    },
    [extensions],
  );

  // Keep editable in sync
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!previewOnly && isSurfaceLive);
  }, [editor, previewOnly, isSurfaceLive]);

  // External value changes (file switch / remote refresh)
  useEffect(() => {
    if (!editor) return;
    const current = editorToVaultMarkdown(editor, metaPrefixRef.current);
    if (current === (value || '')) return;
    setEditorMarkdown(editor, value || '', metaPrefixRef, { emitUpdate: false });
    const cm = cmViewRef.current;
    if (cm) {
      const cur = cm.state.doc.toString();
      const md = value || '';
      if (cur !== md) {
        cm.dispatch({ changes: { from: 0, to: cur.length, insert: md } });
      }
    }
  }, [editor, value, currentFile?.id]);

  const emitVault = useCallback((md: string) => {
    if (md !== valueRef.current) onChangeRef.current(md);
  }, []);

  const { notifyCmDocChanged, flush, originRef } = useHaimDualSync({
    editor,
    cmViewRef,
    metaPrefixRef,
    enabled: Boolean(editor) && isSurfaceLive && !previewOnly,
    debounceMs:
      effectiveMode === HAIM_VIEW_MODE_DOUBLE ||
      effectiveMode === HAIM_VIEW_MODE_SOURCE
        ? 200
        : 160,
    onVaultChange: emitVault,
  });

  useHaimDoubleScrollSync({
    enabled: Boolean(doublePane && scrollSyncEnabled && isSurfaceLive),
    wysiwygScrollRef,
    cmViewRef,
  });

  // WYSIWYG-only: still need TipTap → vault (useHaimDualSync handles it when enabled)
  // Flush on unmount / blur save
  useEffect(() => {
    return () => {
      flush();
    };
  }, [flush]);

  // Save shortcut
  useEffect(() => {
    if (!editor || previewOnly) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        flush();
        onSave?.();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [editor, previewOnly, flush, onSave]);

  // LLM bridge
  const registerBridge = llmAssist?.registerEditorBridge;
  useEffect(() => {
    if (previewOnly || !isActiveFile || !registerBridge || !editor) return undefined;
    const documentKey =
      currentFile?.type && currentFile?.id
        ? `${currentFile.type}:${currentFile.id}`
        : undefined;
    return registerBridge({
      editorRef: {
        current: {
          focus: () => {
            editor.commands.focus();
          },
          insert: (payload: unknown) => {
            if (typeof payload === 'string') {
              editor.commands.insertContent(payload, {
                contentType: 'markdown',
              } as never);
            }
          },
        },
      },
      onChange: (next: string) => {
        originRef.current = 'external';
        setEditorMarkdown(editor, next, metaPrefixRef, { emitUpdate: false });
        emitVault(next);
        originRef.current = null;
      },
      getMarkdown: () => editorToVaultMarkdown(editor, metaPrefixRef.current),
      ...(documentKey ? { documentKey } : {}),
    });
  }, [
    editor,
    previewOnly,
    isActiveFile,
    registerBridge,
    currentFile?.id,
    currentFile?.type,
    emitVault,
    originRef,
  ]);

  // Advanced Search actions (subset for Haim)
  useEffect(() => {
    if (previewOnly || !isSurfaceLive || !editor) return undefined;
    const run = (fn: () => unknown) => {
      fn();
    };
    const navigateToExportPdf = () => {
      openExportPdfSurface({
        currentFile: currentFile
          ? {
              id: currentFile.id ?? null,
              type: currentFile.type ?? null,
              name: currentFile.name ?? undefined,
            }
          : null,
        editorContent: editorToVaultMarkdown(editor, metaPrefixRef.current),
        theme: theme === 'dark' ? 'dark' : 'light',
        navigate,
        openInFocusedPane: (tabId) =>
          Boolean(
            tabsCtx?.workspaceTabsEnabled &&
              tabsCtx.openExportPdfInFocusedPane?.(tabId),
          ),
      });
    };
    const unregister = registerEditorActions({
      'editor-bold': () => run(() => editor.chain().focus().toggleBold().run()),
      'editor-italic': () => run(() => editor.chain().focus().toggleItalic().run()),
      'editor-underline': () =>
        run(() => editor.chain().focus().toggleUnderline().run()),
      'editor-strikeThrough': () =>
        run(() => editor.chain().focus().toggleStrike().run()),
      'editor-quote': () =>
        run(() => editor.chain().focus().toggleBlockquote().run()),
      'editor-unorderedList': () =>
        run(() => editor.chain().focus().toggleBulletList().run()),
      'editor-orderedList': () =>
        run(() => editor.chain().focus().toggleOrderedList().run()),
      'editor-task': () => run(() => editor.chain().focus().toggleTaskList().run()),
      'editor-codeRow': () => run(() => editor.chain().focus().toggleCode().run()),
      'editor-code': () =>
        run(() => editor.chain().focus().toggleCodeBlock().run()),
      'editor-link': () => {
        const url = window.prompt('URL', 'https://');
        if (!url) return;
        run(() => editor.chain().focus().setLink({ href: url }).run());
      },
      'editor-table': () =>
        run(() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run(),
        ),
      'editor-revoke': () => run(() => editor.chain().focus().undo().run()),
      'editor-next': () => run(() => editor.chain().focus().redo().run()),
      'editor-pgbr': () =>
        run(() => editor.chain().focus().insertContent({ type: 'pageBreak' }).run()),
      'editor-export-pdf': () => {
        flush();
        navigateToExportPdf();
      },
      'editor-convert-all-images-to-wiki': () => {
        onRequestConvertAllImagesToWiki?.();
      },
      'editor-sub': () =>
        run(() => editor.chain().focus().toggleSubscript().run()),
      'editor-sup': () =>
        run(() => editor.chain().focus().toggleSuperscript().run()),
      'editor-h1': () =>
        run(() => editor.chain().focus().toggleHeading({ level: 1 }).run()),
      'editor-h2': () =>
        run(() => editor.chain().focus().toggleHeading({ level: 2 }).run()),
      'editor-h3': () =>
        run(() => editor.chain().focus().toggleHeading({ level: 3 }).run()),
      'editor-h4': () =>
        run(() => editor.chain().focus().toggleHeading({ level: 4 }).run()),
    });
    return unregister;
  }, [
    editor,
    previewOnly,
    isSurfaceLive,
    navigate,
    tabsCtx,
    flush,
    onRequestConvertAllImagesToWiki,
    currentFile,
    theme,
  ]);

  useEffect(() => {
    onRegisterConvertAllImagesToWiki?.(null);
  }, [onRegisterConvertAllImagesToWiki]);

  // Wiki image paste / upload hook (basic): insert wiki node after upload
  const handleUpload = useCallback(
    async (file: File) => {
      if (!onUploadImage || !editor) return;
      try {
        const result = await onUploadImage(file);
        const path =
          typeof result === 'string'
            ? result
            : result && typeof result === 'object' && 'path' in result
              ? String((result as { path: string }).path)
              : '';
        if (path) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: 'wikiImage',
              attrs: { path, options: '', alt: file.name },
            })
            .run();
          invalidateMarkdownCache(editor);
        }
      } catch {
        // parent alerts
      }
    },
    [editor, onUploadImage],
  );

  useEffect(() => {
    if (!editor || previewOnly) return undefined;
    const dom = editor.view.dom;
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            void handleUpload(file);
          }
          break;
        }
      }
    };
    dom.addEventListener('paste', onPaste);
    return () => dom.removeEventListener('paste', onPaste);
  }, [editor, previewOnly, handleUpload]);

  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (!editor) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-odp-muted">
        Haim Editor 로딩 중…
      </div>
    );
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div
        className={`haim-editor flex h-full min-h-0 flex-col bg-white dark:bg-odp-surface ${
          theme === 'dark' ? 'haim-editor--dark' : ''
        }`}
      >
        <HaimToolbar
          editor={editor}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          previewOnly={previewOnly}
          onInsertPageBreak={() => {
            editor.chain().focus().insertContent({ type: 'pageBreak' }).run();
          }}
          scrollSyncEnabled={scrollSyncEnabled}
          onScrollSyncChange={(next) => {
            setScrollSyncEnabled(next);
            saveHaimDoubleScrollSyncEnabled(next);
          }}
          {...(onSave ? { onSave } : {})}
        />
        <div className="relative flex min-h-0 flex-1">
          {showSource ? (
            <div
              className={`min-h-0 shrink-0 ${
                doublePane ? 'w-1/2' : 'w-full'
              }`}
            >
              <HaimSourcePane
                key={`haim-source-${currentFile?.id || 'untitled'}`}
                initialValue={value || ''}
                theme={theme}
                onDocChanged={notifyCmDocChanged}
                viewRef={cmViewRef}
              />
            </div>
          ) : null}
          {showWysiwyg ? (
            <div
              ref={wysiwygScrollRef}
              className={`min-h-0 overflow-auto ${
                doublePane ? 'w-1/2 flex-1' : 'flex-1'
              }`}
            >
              <EditorContent editor={editor} className="haim-editor-content h-full" />
            </div>
          ) : (
            /* Keep TipTap mounted off-screen in source mode for sync authority */
            <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
              <EditorContent editor={editor} />
            </div>
          )}
        </div>
      </div>
    </EditorContext.Provider>
  );
}

function joinCheck(prefix: string, _content: string): string {
  return prefix;
}
