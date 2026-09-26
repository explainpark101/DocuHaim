import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import HaimTocPanel from '@/components/haimEditor/HaimTocPanel';
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
import {
  HAIM_TOC_LAYOUT_CHANGED_EVENT,
  loadHaimTocLayout,
  type HaimTocLayout,
} from '@/utils/haimTocLayoutSettings';
import { useLlmAssistSessionOptional } from '@/contexts/LlmAssistSessionContext';
import { registerEditorActions } from '@/utils/advancedSearch/editorActions';
import { openExportPdfSurface } from '@/utils/workspaceTabs/openExportPdfSurface';
import { useWorkspaceTabsCtxOptional } from '@/App/hooks/useWorkspaceTabsCtx';
import { useNavigate } from 'react-router';
import type { EditorView as CmEditorView } from '@codemirror/view';
import { EditorSelection } from '@codemirror/state';
import HeadingRemapModal, {
  type HeadingRemapScope,
} from '@/components/modals/HeadingRemapModal';
import ImageLinkModal from '@/components/modals/ImageLinkModal';
import ImageClipCropModal from '@/components/modals/ImageClipCropModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal.jsx';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import {
  hydrateNoteCoverPreviewsInRoot,
  teardownNoteCoverPreviewsInRoot,
} from '@/utils/noteCover/hydrateNoteCoverPreview';
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import { Loader2 } from 'lucide-react';
import '@/styles/haim-editor/style.css';
import '@/styles/haim-editor/code-hljs-themes.css';
import '@/styles/editor-image-align.css';
import '@/styles/md-editor-rt/note-cover-placeholder.css';
import 'katex/dist/katex.min.css';

const HaimFindReplaceBar = lazy(
  () => import('@/components/haimEditor/HaimFindReplaceBar'),
);
const HaimDragHandleLayer = lazy(
  () => import('@/components/haimEditor/HaimDragHandleLayer'),
);

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
  isUploadingEditorImage = false,
  uploadImagePercent = 0,
  onCancelUploadImage,
  onResolveWikiImageUrl,
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
  const [tocOpen, setTocOpen] = useState(false);
  const [tocLayout, setTocLayout] = useState<HaimTocLayout>(() => loadHaimTocLayout());
  const [cmRevision, setCmRevision] = useState(0);
  const [headingRemapOpen, setHeadingRemapOpen] = useState(false);
  const [headingRemapSelection, setHeadingRemapSelection] = useState('');
  const headingRemapRangeRef = useRef<{ from: number; to: number } | null>(null);
  const [imageLinkOpen, setImageLinkOpen] = useState(false);
  const [clipCropFile, setClipCropFile] = useState<File | null>(null);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [invisibleCharsVisible, setInvisibleCharsVisible] = useState(false);
  const [checklistHint, setChecklistHint] = useState<string | null>(null);
  const [coverExportConfirmOpen, setCoverExportConfirmOpen] = useState(false);
  const [localImageUploading, setLocalImageUploading] = useState(false);
  const imageUploadingRef = useRef(false);

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

  useEffect(() => {
    const onEvt = () => setTocLayout(loadHaimTocLayout());
    window.addEventListener(HAIM_TOC_LAYOUT_CHANGED_EVENT, onEvt);
    return () => window.removeEventListener(HAIM_TOC_LAYOUT_CHANGED_EVENT, onEvt);
  }, []);

  const extensions = useMemo(
    () =>
      createHaimExtensions({
        placeholder: previewOnly ? '' : '내용을 입력하세요…',
        profile: 'note',
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
          class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[12rem] py-2 pl-10 pr-3 ${
            theme === 'dark' ? 'haim-editor--dark' : ''
          }`,
        },
      },
      onCreate: ({ editor: ed }) => {
        metaPrefixRef.current = initial.prefix;
        if ((value || '') !== joinCheck(initial.prefix, initial.content)) {
          setEditorMarkdown(ed, value || '', metaPrefixRef, { emitUpdate: false });
        }
      },
    },
    [extensions],
  );

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!previewOnly && isSurfaceLive);
  }, [editor, previewOnly, isSurfaceLive]);

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

  const {
    notifyCmDocChanged,
    flush,
    originRef,
    cancelPending,
    pushEditorMarkdownToCmNow,
    pushCmMarkdownToEditorNow,
  } = useHaimDualSync({
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
    cmRevision,
  });

  const resolveWikiUrl = useCallback(
    async (path: string): Promise<string | null> => {
      if (!onResolveWikiImageUrl) return null;
      try {
        const result = await onResolveWikiImageUrl(path);
        return typeof result === 'string' ? result : null;
      } catch {
        return null;
      }
    },
    [onResolveWikiImageUrl],
  );

  useWikiImageHydration(
    wysiwygScrollRef,
    value || '',
    onResolveWikiImageUrl ? resolveWikiUrl : null,
    currentFile?.path ?? currentFile?.id ?? null,
    {
      enabled: Boolean(
        showWysiwyg && isSurfaceLive && onResolveWikiImageUrl,
      ),
    },
  );

  useEffect(() => {
    if (!showWysiwyg || !isSurfaceLive) return undefined;
    const root = wysiwygScrollRef.current;
    if (!root) return undefined;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      hydrateNoteCoverPreviewsInRoot(root, value || '', resolveWikiUrl, {
        load: true,
      });
    };
    const delays = [0, 100, 350, 700];
    const timers = delays.map((d) => setTimeout(run, d));
    const mo =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(() => run())
        : null;
    mo?.observe(root, { childList: true, subtree: true });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      mo?.disconnect();
      teardownNoteCoverPreviewsInRoot(root);
    };
  }, [
    value,
    showWysiwyg,
    isSurfaceLive,
    resolveWikiUrl,
    currentFile?.id,
    editor,
  ]);

  useEffect(() => {
    const root = wysiwygScrollRef.current;
    if (!root || !showWysiwyg) return undefined;
    const activate = (target: EventTarget | null) => {
      const el =
        target instanceof Element
          ? target.closest('[data-note-cover-placeholder]')
          : null;
      if (!el || !root.contains(el)) return false;
      setCoverExportConfirmOpen(true);
      return true;
    };
    const onClick = (e: MouseEvent) => {
      if (activate(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (activate(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKeyDown);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKeyDown);
    };
  }, [showWysiwyg, editor]);

  useEffect(() => {
    return () => {
      flush();
    };
  }, [flush]);

  useEffect(() => {
    if (!editor || previewOnly) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        flush();
        onSave?.();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setFindReplaceOpen(true);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [editor, previewOnly, flush, onSave]);

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

  const navigateToExportPdf = useCallback(
    (options: { openCoverEdit?: boolean } = {}) => {
      if (!editor) return;
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
        openCoverEdit: Boolean(options.openCoverEdit),
        openInFocusedPane: (tabId) =>
          Boolean(
            tabsCtx?.workspaceTabsEnabled &&
              tabsCtx.openExportPdfInFocusedPane?.(tabId),
          ),
      });
    },
    [editor, currentFile, theme, navigate, tabsCtx],
  );

  const openHeadingRemap = useCallback(() => {
    if (!editor) return;
    const { from, to, empty } = editor.state.selection;
    if (empty) {
      headingRemapRangeRef.current = null;
      setHeadingRemapSelection('');
    } else {
      headingRemapRangeRef.current = { from, to };
      setHeadingRemapSelection(editor.state.doc.textBetween(from, to, '\n'));
    }
    setHeadingRemapOpen(true);
  }, [editor]);

  const applyHeadingRemap = useCallback(
    (nextMarkdown: string, scope: HeadingRemapScope) => {
      if (!editor) return;
      if (scope === 'selection' && headingRemapRangeRef.current) {
        const { from, to } = headingRemapRangeRef.current;
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .insertContentAt(from, nextMarkdown, {
            contentType: 'markdown',
          } as never)
          .run();
      } else {
        setEditorMarkdown(editor, nextMarkdown, metaPrefixRef, { emitUpdate: true });
        emitVault(nextMarkdown);
      }
      setHeadingRemapOpen(false);
      setHeadingRemapSelection('');
      headingRemapRangeRef.current = null;
    },
    [editor, emitVault],
  );

  /**
   * Upload files as wiki images and insert at the selection captured
   * when the upload started (paste / toolbar), not after async wait.
   */
  const handleUploadFiles = useCallback(
    async (files: File[]) => {
      if (!onUploadImage || !files.length || !editor) return;
      if (imageUploadingRef.current || isUploadingEditorImage) return;

      // Snapshot cursor/selection BEFORE await — paste-time position.
      const cmAtStart = cmViewRef.current;
      const preferSource =
        Boolean(cmAtStart) &&
        (cmAtStart.hasFocus ||
          effectiveMode === HAIM_VIEW_MODE_SOURCE ||
          (showSource && !showWysiwyg));
      const insertTarget = preferSource && cmAtStart
        ? {
            surface: 'cm' as const,
            from: cmAtStart.state.selection.main.from,
            to: cmAtStart.state.selection.main.to,
          }
        : {
            surface: 'tiptap' as const,
            from: editor.state.selection.from,
            to: editor.state.selection.to,
          };

      imageUploadingRef.current = true;
      setLocalImageUploading(true);
      try {
        const result = await onUploadImage(files);
        const paths = Array.isArray(result)
          ? result.map((p) => String(p || '').trim()).filter(Boolean)
          : typeof result === 'string' && result.trim()
            ? [result.trim()]
            : [];
        if (!paths.length) return;

        cancelPending();
        const markup = `${paths.map((p) => `![[${p}]]`).join('\n\n')}\n\n`;

        if (insertTarget.surface === 'cm') {
          const cm = cmViewRef.current;
          if (!cm) return;
          const docLen = cm.state.doc.length;
          const from = Math.max(0, Math.min(insertTarget.from, docLen));
          const to = Math.max(from, Math.min(insertTarget.to, docLen));
          originRef.current = 'external';
          cm.dispatch({
            changes: { from, to, insert: markup },
            selection: EditorSelection.cursor(from + markup.length),
          });
          pushCmMarkdownToEditorNow();
          originRef.current = null;
        } else {
          originRef.current = 'external';
          // Insert all wiki nodes at the captured TipTap range (first replaces).
          const size = editor.state.doc.content.size;
          let from = Math.max(0, Math.min(insertTarget.from, size));
          let to = Math.max(from, Math.min(insertTarget.to, size));
          const nodes = paths.map((path) => ({
            type: 'wikiImage' as const,
            attrs: {
              path,
              options: '',
              alt: path,
              width: null,
              height: null,
              background: null,
            },
          }));
          editor.chain().focus().insertContentAt({ from, to }, nodes).run();
          invalidateMarkdownCache(editor);
          pushEditorMarkdownToCmNow();
          originRef.current = null;
        }
      } catch {
        // parent alerts
      } finally {
        imageUploadingRef.current = false;
        setLocalImageUploading(false);
      }
    },
    [
      onUploadImage,
      editor,
      isUploadingEditorImage,
      cancelPending,
      effectiveMode,
      showSource,
      showWysiwyg,
      originRef,
      pushCmMarkdownToEditorNow,
      pushEditorMarkdownToCmNow,
    ],
  );

  const showImageUploadOverlay =
    Boolean(isUploadingEditorImage) || localImageUploading;
  const uploadPercentLabel = Math.max(
    0,
    Math.min(100, Math.round(Number(uploadImagePercent) || 0)),
  );

  const toggleInvisibleChars = useCallback(() => {
    if (!editor) return;
    const cmds = editor.commands as typeof editor.commands & {
      toggleInvisibleCharacters?: () => boolean;
    };
    if (typeof cmds.toggleInvisibleCharacters === 'function') {
      cmds.toggleInvisibleCharacters();
      setInvisibleCharsVisible((v) => !v);
    }
  }, [editor]);

  useEffect(() => {
    if (previewOnly || !isSurfaceLive || !editor) return undefined;
    const run = (fn: () => unknown) => {
      fn();
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
      'editor-catalog': () => setTocOpen((v) => !v),
      'editor-llm-assist': () => {
        llmAssist?.toggleAssist?.();
      },
      'editor-heading-remap': () => openHeadingRemap(),
      'editor-checklist-progress': () => {
        const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
        const tasks = (md.match(/^\s*[-*]\s+\[[ xX]\]/gm) || []).length;
        const done = (md.match(/^\s*[-*]\s+\[[xX]\]/gm) || []).length;
        setChecklistHint(
          tasks
            ? `체크리스트 ${done}/${tasks} 완료`
            : '문서에 체크리스트 항목이 없습니다',
        );
        window.setTimeout(() => setChecklistHint(null), 3200);
      },
      'editor-image-upload': () => {
        // Advanced Search: open file picker via hidden input is awkward; prompt path
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = () => {
          void handleUploadFiles(Array.from(input.files || []));
        };
        input.click();
      },
      'editor-image-clip': () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
          const file = input.files?.[0];
          if (file) setClipCropFile(file);
        };
        input.click();
      },
    });
    return unregister;
  }, [
    editor,
    previewOnly,
    isSurfaceLive,
    flush,
    navigateToExportPdf,
    onRequestConvertAllImagesToWiki,
    llmAssist,
    openHeadingRemap,
    handleUploadFiles,
  ]);

  useEffect(() => {
    onRegisterConvertAllImagesToWiki?.(null);
  }, [onRegisterConvertAllImagesToWiki]);

  useEffect(() => {
    if (!editor || previewOnly || !onUploadImage) return undefined;
    const dom = editor.view.dom;
    const onPaste = (e: ClipboardEvent) => {
      if (imageUploadingRef.current || isUploadingEditorImage) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const imageFiles = collectClipboardImageFiles(e.clipboardData);
      if (!imageFiles.length) return;
      e.preventDefault();
      e.stopPropagation();
      void handleUploadFiles(imageFiles);
    };
    // Capture so TipTap does not insert clipboard images as base64 first.
    dom.addEventListener('paste', onPaste, true);
    return () => dom.removeEventListener('paste', onPaste, true);
  }, [editor, previewOnly, onUploadImage, handleUploadFiles, isUploadingEditorImage]);

  const providerValue = useMemo(() => ({ editor }), [editor]);

  const vaultMarkdown = editor
    ? editorToVaultMarkdown(editor, metaPrefixRef.current)
    : value || '';

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
          tocOpen={tocOpen}
          onTocOpenChange={setTocOpen}
          {...(onSave ? { onSave } : {})}
          appActions={{
            onExportPdf: () => {
              flush();
              navigateToExportPdf();
            },
            onLlmAssist: () => llmAssist?.toggleAssist?.(),
            llmAssistActive: Boolean(llmAssist?.open),
            onHeadingRemap: openHeadingRemap,
            onChecklistProgress: () => {
              const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
              const tasks = (md.match(/^\s*[-*]\s+\[[ xX]\]/gm) || []).length;
              const done = (md.match(/^\s*[-*]\s+\[[xX]\]/gm) || []).length;
              setChecklistHint(
                tasks
                  ? `체크리스트 ${done}/${tasks} 완료`
                  : '문서에 체크리스트 항목이 없습니다',
              );
              window.setTimeout(() => setChecklistHint(null), 3200);
            },
            onImageLink: () => setImageLinkOpen(true),
            onImageUpload: (files) => {
              void handleUploadFiles(files);
            },
            onImageClip: (file) => setClipCropFile(file),
            imageDisabled:
              typeof onUploadImage !== 'function' || showImageUploadOverlay,
            onInsertMermaid: () => {
              editor
                .chain()
                .focus()
                .insertContent('```mermaid\ngraph TD\n  A-->B\n```\n', {
                  contentType: 'markdown',
                } as never)
                .run();
            },
            onInsertKatex: () => {
              const cmds = editor.commands as typeof editor.commands & {
                insertBlockMath?: (opts: { latex: string }) => boolean;
              };
              if (typeof cmds.insertBlockMath === 'function') {
                cmds.insertBlockMath({ latex: 'E=mc^2' });
                return;
              }
              editor
                .chain()
                .focus()
                .insertContent(
                  '<div data-type="block-math" data-latex="E=mc^2"></div>',
                )
                .run();
            },
            findReplaceOpen,
            onFindReplaceOpenChange: setFindReplaceOpen,
            invisibleCharsVisible,
            onInvisibleCharsToggle: toggleInvisibleChars,
          }}
        />
        {findReplaceOpen && !previewOnly ? (
          <Suspense fallback={null}>
            <HaimFindReplaceBar
              editor={editor}
              onClose={() => setFindReplaceOpen(false)}
            />
          </Suspense>
        ) : null}
        {checklistHint ? (
          <div className="shrink-0 border-b border-slate-200 bg-indigo-50 px-3 py-1 text-xs text-indigo-900 dark:border-odp-borderStrong dark:bg-indigo-950/40 dark:text-indigo-100">
            {checklistHint}
          </div>
        ) : null}
        <div className="relative flex min-h-0 flex-1">
          {showImageUploadOverlay ? (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-blue-300/40 text-sm text-blue-700 dark:bg-blue-800/50 dark:text-blue-300"
              aria-live="polite"
              aria-busy="true"
            >
              <Loader2 size={16} className="shrink-0 animate-spin" aria-hidden />
              <span>
                이미지 업로드 중…
                {isUploadingEditorImage && uploadPercentLabel > 0
                  ? ` ${uploadPercentLabel}%`
                  : ''}
              </span>
              {typeof onCancelUploadImage === 'function' ? (
                <button
                  type="button"
                  onClick={() => onCancelUploadImage()}
                  className="ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950"
                >
                  취소
                </button>
              ) : null}
            </div>
          ) : null}
          <div className="relative flex min-h-0 min-w-0 flex-1">
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
                  onViewReady={() => setCmRevision((n) => n + 1)}
                  {...(onUploadImage && !previewOnly
                    ? {
                        onPasteImages: (files: File[]) => {
                          if (imageUploadingRef.current || isUploadingEditorImage)
                            return;
                          void handleUploadFiles(files);
                        },
                      }
                    : {})}
                />
              </div>
            ) : null}
            {showWysiwyg ? (
              <div
                ref={wysiwygScrollRef}
                className={`relative min-h-0 overflow-auto ${
                  doublePane ? 'w-1/2 flex-1' : 'flex-1'
                }`}
              >
                {!previewOnly && isSurfaceLive ? (
                  <Suspense fallback={null}>
                    <HaimDragHandleLayer editor={editor} />
                  </Suspense>
                ) : null}
                <EditorContent editor={editor} className="haim-editor-content h-full" />
              </div>
            ) : (
              <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
                <EditorContent editor={editor} />
              </div>
            )}
          </div>
          <HaimTocPanel
            editor={editor}
            open={tocOpen}
            onClose={() => setTocOpen(false)}
            showWysiwyg={showWysiwyg}
            wysiwygScrollRef={wysiwygScrollRef}
            cmViewRef={cmViewRef}
            layout={tocLayout}
          />
        </div>
      </div>

      <HeadingRemapModal
        isOpen={headingRemapOpen}
        markdown={vaultMarkdown}
        selectedMarkdown={headingRemapSelection}
        onClose={() => {
          setHeadingRemapOpen(false);
          setHeadingRemapSelection('');
          headingRemapRangeRef.current = null;
        }}
        onApply={applyHeadingRemap}
      />
      <ImageLinkModal
        isOpen={imageLinkOpen}
        onClose={() => setImageLinkOpen(false)}
        onConfirm={({ desc, url }) => {
          const alt = desc || url;
          editor
            .chain()
            .focus()
            .insertContent(`![${alt}](${url})\n`, {
              contentType: 'markdown',
            } as never)
            .run();
        }}
      />
      <ImageClipCropModal
        isOpen={Boolean(clipCropFile)}
        file={clipCropFile}
        onClose={() => setClipCropFile(null)}
        onConfirm={async (file) => {
          setClipCropFile(null);
          await handleUploadFiles([file]);
        }}
      />
      <ConfirmModal
        isOpen={coverExportConfirmOpen}
        title="표지 편집"
        message="표지를 편집하려면 Export PDF 페이지를 열어야 합니다. 계속할까요?"
        confirmLabel="열기"
        cancelLabel="취소"
        onConfirm={() => {
          setCoverExportConfirmOpen(false);
          navigateToExportPdf({ openCoverEdit: true });
        }}
        onCancel={() => setCoverExportConfirmOpen(false)}
      />
    </EditorContext.Provider>
  );
}

function joinCheck(prefix: string, _content: string): string {
  return prefix;
}
