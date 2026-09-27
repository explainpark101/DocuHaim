import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, EditorContent, EditorContext } from '@tiptap/react';
import { Loader2 } from 'lucide-react';
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
import HaimLinkHoverHint from '@/components/haimEditor/HaimLinkHoverHint';
import { getHaimSelectedPlainText } from '@/components/haimEditor/getHaimSelectedPlainText';
import {
  HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  useHaimDualSync,
} from '@/components/haimEditor/useHaimDualSync';
import { useHaimDoubleScrollSync } from '@/components/haimEditor/useHaimDoubleScrollSync';
import {
  registerHaimAnnotateUpload,
  normalizeUploadResult,
} from '@/utils/haimImageAnnotateUpload';
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
import { NodeSelection } from '@tiptap/pm/state';
import HeadingRemapModal, {
  type HeadingRemapScope,
} from '@/components/modals/HeadingRemapModal';
import ImageLinkModal from '@/components/modals/ImageLinkModal';
import ImageClipCropModal from '@/components/modals/ImageClipCropModal';
import QrCodeCreateModal from '@/components/modals/QrCodeCreateModal';
import WhiteboardCreateModal from '@/components/modals/WhiteboardCreateModal';
import HaimImageLightbox, {
  type HaimImageLightboxSaveMode,
} from '@/components/haimEditor/HaimImageLightbox';
import { uploadHaimAnnotatedImage } from '@/utils/haimImageAnnotateUpload';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { TableEditModal } from '@/components/haimTable/TableEditModal';
import { PreviewTableContextMenu } from '@/components/haimTable/PreviewTableContextMenu';
import { HaimTableBoxResizeLayer } from '@/components/haimTable/HaimTableBoxResizeLayer';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import {
  hydrateNoteCoverPreviewsInRoot,
  teardownNoteCoverPreviewsInRoot,
} from '@/utils/noteCover/hydrateNoteCoverPreview';
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import { useBase64ImageFold } from '@/hooks/useBase64ImageFold';
import { getNoteCoverFoldKeyFromFile } from '@/utils/noteCover/noteCoverFoldStateDb';
import {
  createEmptyHaimTableRaw,
  parseHaimTableRawText,
  serializeHaimTableRawText,
} from '@/components/haimEditor/haimTableRawText';
import {
  HAIM_TABLE_EDIT_REQUEST_EVENT,
  type HaimTableEditRequestDetail,
} from '@/components/haimEditor/haimTableEditEvents';
import {
  findHaimTableBlockAt,
  findHaimTableBlocks,
  resolveHaimTableBlockFromPreview,
  upsertHaimTableBlock,
  type HaimTableBlock,
  type HaimTableGrid,
  type HaimTableMeta,
} from '@/utils/haimTable';
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

type HaimTableEditSession =
  | { mode: 'node'; pos: number; meta: HaimTableMeta; grid: HaimTableGrid }
  | { mode: 'md'; block: HaimTableBlock; meta: HaimTableMeta; grid: HaimTableGrid }
  | { mode: 'insert'; meta: HaimTableMeta; grid: HaimTableGrid };

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
  const [foldBase64Images] = useBase64ImageFold();
  const noteCoverFoldDocKey = getNoteCoverFoldKeyFromFile(currentFile);
  const [tocOpen, setTocOpen] = useState(false);
  const [tocLayout, setTocLayout] = useState<HaimTocLayout>(() => loadHaimTocLayout());
  const [cmRevision, setCmRevision] = useState(0);
  const [headingRemapOpen, setHeadingRemapOpen] = useState(false);
  const [headingRemapSelection, setHeadingRemapSelection] = useState('');
  const headingRemapRangeRef = useRef<{ from: number; to: number } | null>(null);
  const [imageLinkOpen, setImageLinkOpen] = useState(false);
  const [qrCodeOpen, setQrCodeOpen] = useState(false);
  const [qrCodeInitialText, setQrCodeInitialText] = useState('');
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [whiteboardLightbox, setWhiteboardLightbox] = useState<{
    src: string;
    wikiPath: string;
  } | null>(null);
  const [clipCropFile, setClipCropFile] = useState<File | null>(null);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [invisibleCharsVisible, setInvisibleCharsVisible] = useState(false);
  const [checklistHint, setChecklistHint] = useState<string | null>(null);
  const [coverExportConfirmOpen, setCoverExportConfirmOpen] = useState(false);
  const [localImageUploading, setLocalImageUploading] = useState(false);
  const imageUploadingRef = useRef(false);
  const [tableEdit, setTableEdit] = useState<HaimTableEditSession | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const effectiveMode: HaimViewMode = viewMode;
  const showSource =
    !previewOnly &&
    (effectiveMode === HAIM_VIEW_MODE_DOUBLE ||
      effectiveMode === HAIM_VIEW_MODE_SOURCE);
  const showWysiwyg =
    previewOnly ||
    effectiveMode === HAIM_VIEW_MODE_WYSIWYG ||
    effectiveMode === HAIM_VIEW_MODE_DOUBLE;
  const doublePane = showSource && showWysiwyg;
  /** Narrow / mobile: stack source above WYSIWYG instead of hiding double mode. */
  const stackDouble = Boolean(doublePane && isMobileLayout);

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
        getMetaPrefix: () => metaPrefixRef.current,
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
        // Rebuild data-line after metaPrefix is known (initial create may race).
        try {
          ed.commands.updateDecorations('haimSourceLine');
        } catch {
          // ignore if command unavailable
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
    if (blockDragActiveRef.current) return;
    const current = editorToVaultMarkdown(editor, metaPrefixRef.current);
    if (current === (value || '')) return;
    setEditorMarkdown(editor, value || '', metaPrefixRef, { emitUpdate: false });
    try {
      editor.commands.updateDecorations('haimSourceLine');
    } catch {
      // ignore
    }
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

  const suppressScrollSyncUntilRef = useRef(0);
  const blockDragActiveRef = useRef(false);

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
    debounceMs: HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
    onVaultChange: emitVault,
    wysiwygScrollRef,
    suppressScrollSyncUntilRef,
    blockDragActiveRef,
  });

  useHaimDoubleScrollSync({
    enabled: Boolean(doublePane && scrollSyncEnabled && isSurfaceLive),
    wysiwygScrollRef,
    cmViewRef,
    cmRevision,
    suppressScrollSyncUntilRef,
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

  const openQrCodeCreate = useCallback(() => {
    if (typeof onUploadImage !== 'function' || showImageUploadOverlay) return;
    setQrCodeInitialText(
      getHaimSelectedPlainText(editor, cmViewRef.current, {
        sourceVisible: showSource,
      }),
    );
    setQrCodeOpen(true);
  }, [editor, onUploadImage, showImageUploadOverlay, showSource]);

  const openHaimTableEditor = useCallback(
    (detail: HaimTableEditRequestDetail) => {
      if (typeof detail.pos === 'number') {
        const parsed = parseHaimTableRawText(detail.text);
        if (!parsed) return;
        setTableEdit({
          mode: 'node',
          pos: detail.pos,
          meta: parsed.meta,
          grid: parsed.grid,
        });
        return;
      }
      const empty = createEmptyHaimTableRaw();
      setTableEdit({ mode: 'insert', meta: empty.meta, grid: empty.grid });
    },
    [],
  );

  const openHaimTableFromPreview = useCallback(
    (tableEl: HTMLTableElement, previewRoot: Element) => {
      if (!editor) return false;
      const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
      const block = resolveHaimTableBlockFromPreview(md, tableEl, previewRoot);
      if (!block) return false;
      setTableEdit({
        mode: 'md',
        block,
        meta: block.meta ?? createEmptyHaimTableRaw().meta,
        grid: block.grid,
      });
      return true;
    },
    [editor],
  );

  const openHaimTableFromSelection = useCallback(() => {
    if (!editor) return;
    // Prefer CodeMirror selection when source pane is active
    const cm = cmViewRef.current;
    const preferCm =
      cm != null &&
      (cm.hasFocus ||
        effectiveMode === HAIM_VIEW_MODE_SOURCE ||
        (showSource && !showWysiwyg));
    if (preferCm) {
      const md = cm.state.doc.toString();
      const { from, to } = cm.state.selection.main;
      const block = findHaimTableBlockAt(md, from, to);
      if (block) {
        setTableEdit({
          mode: 'md',
          block,
          meta: block.meta ?? createEmptyHaimTableRaw().meta,
          grid: block.grid,
        });
        return;
      }
      const empty = createEmptyHaimTableRaw();
      setTableEdit({ mode: 'insert', meta: empty.meta, grid: empty.grid });
      return;
    }

    // TipTap: selected / parent rawMarkdownBlock
    const { selection } = editor.state;
    const tryNode = (
      pos: number,
      node: { type: { name: string }; attrs: Record<string, unknown> } | null,
    ) => {
      if (!node || node.type.name !== 'rawMarkdownBlock') return false;
      if (String(node.attrs.kind || '') !== 'haim-table') return false;
      const parsed = parseHaimTableRawText(String(node.attrs.text || ''));
      if (!parsed) return false;
      setTableEdit({
        mode: 'node',
        pos,
        meta: parsed.meta,
        grid: parsed.grid,
      });
      return true;
    };

    if (selection instanceof NodeSelection) {
      if (tryNode(selection.from, selection.node as never)) return;
    }

    const selNode = selection.$from.nodeAfter ?? selection.$from.nodeBefore;
    const selPos =
      selection.$from.nodeAfter != null
        ? selection.$from.pos
        : selection.$from.pos - (selection.$from.nodeBefore?.nodeSize ?? 0);
    if (selNode && tryNode(selPos, selNode as never)) return;

    for (let d = selection.$from.depth; d > 0; d -= 1) {
      const node = selection.$from.node(d);
      if (tryNode(selection.$from.before(d), node as never)) return;
    }

    // Fallback: first haim-table in doc, or insert new
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    const blocks = findHaimTableBlocks(md);
    if (blocks[0]) {
      const block = blocks[0];
      setTableEdit({
        mode: 'md',
        block,
        meta: block.meta ?? createEmptyHaimTableRaw().meta,
        grid: block.grid,
      });
      return;
    }
    const empty = createEmptyHaimTableRaw();
    setTableEdit({ mode: 'insert', meta: empty.meta, grid: empty.grid });
  }, [editor, effectiveMode, showSource, showWysiwyg]);

  const applyHaimTableEdit = useCallback(
    (meta: HaimTableMeta, grid: HaimTableGrid) => {
      if (!editor || !tableEdit) return;
      const text = serializeHaimTableRawText(meta, grid);

      if (tableEdit.mode === 'node') {
        const node = editor.state.doc.nodeAt(tableEdit.pos);
        if (node?.type.name === 'rawMarkdownBlock') {
          editor
            .chain()
            .focus()
            .command(({ tr, dispatch }) => {
              tr.setNodeMarkup(tableEdit.pos, undefined, {
                ...node.attrs,
                text,
                kind: 'haim-table',
              });
              dispatch?.(tr);
              return true;
            })
            .run();
          invalidateMarkdownCache(editor);
          pushEditorMarkdownToCmNow();
        }
      } else if (tableEdit.mode === 'md') {
        const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
        const next = upsertHaimTableBlock(md, tableEdit.block, meta, grid);
        originRef.current = 'external';
        setEditorMarkdown(editor, next, metaPrefixRef, { emitUpdate: false });
        emitVault(next);
        pushEditorMarkdownToCmNow();
        originRef.current = null;
      } else {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'rawMarkdownBlock',
            attrs: { text, kind: 'haim-table' },
          })
          .run();
        invalidateMarkdownCache(editor);
        pushEditorMarkdownToCmNow();
      }
      setTableEdit(null);
    },
    [editor, tableEdit, emitVault, originRef, pushEditorMarkdownToCmNow],
  );

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
    async (files: File[]): Promise<string[]> => {
      if (!onUploadImage || !files.length || !editor) return [];
      if (imageUploadingRef.current || isUploadingEditorImage) return [];

      // Snapshot cursor/selection BEFORE await — paste-time position.
      const cmAtStart = cmViewRef.current;
      const preferSource =
        cmAtStart != null &&
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
        if (!paths.length) return [];

        cancelPending();
        const markup = `${paths.map((p) => `![[${p}]]`).join('\n\n')}\n\n`;

        if (insertTarget.surface === 'cm') {
          const cm = cmViewRef.current;
          if (!cm) return paths;
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
        return paths;
      } catch {
        // parent alerts
        return [];
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

  // Bridge for lightbox annotate save (wiki / stock image node views).
  useEffect(() => {
    if (previewOnly || typeof onUploadImage !== 'function') {
      registerHaimAnnotateUpload(null);
      return () => registerHaimAnnotateUpload(null);
    }
    registerHaimAnnotateUpload(async (files) => {
      const result = await onUploadImage(files);
      return normalizeUploadResult(result);
    });
    return () => registerHaimAnnotateUpload(null);
  }, [onUploadImage, previewOnly]);

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

  /**
   * Insert `<pgbr/>` at the active surface caret (CM source or TipTap),
   * then sync so raw shows vault markdown and WYSIWYG shows the break.
   */
  const insertPageBreak = useCallback(() => {
    if (!editor) return;
    const cm = cmViewRef.current;
    const preferCm =
      cm != null &&
      (cm.hasFocus ||
        effectiveMode === HAIM_VIEW_MODE_SOURCE ||
        (showSource && !showWysiwyg));

    if (preferCm && cm) {
      const { from, to } = cm.state.selection.main;
      const insertion = '\n\n<pgbr/>\n\n';
      cm.dispatch({
        changes: { from, to, insert: insertion },
        selection: { anchor: from + insertion.length },
        scrollIntoView: true,
      });
      cm.focus();
      pushCmMarkdownToEditorNow();
      return;
    }

    const ok = editor.chain().focus().setPageBreak().run();
    if (ok) {
      invalidateMarkdownCache(editor);
      pushEditorMarkdownToCmNow();
    }
  }, [
    editor,
    effectiveMode,
    showSource,
    showWysiwyg,
    pushCmMarkdownToEditorNow,
    pushEditorMarkdownToCmNow,
  ]);

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
      'editor-pgbr': () => run(() => insertPageBreak()),
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
      'editor-create-qrcode': () => {
        openQrCodeCreate();
      },
      'editor-create-whiteboard': () => {
        if (typeof onUploadImage !== 'function' || showImageUploadOverlay) return;
        setWhiteboardOpen(true);
      },
      'editor-table-edit': () => openHaimTableFromSelection(),
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
    openQrCodeCreate,
    handleUploadFiles,
    openHaimTableFromSelection,
    onUploadImage,
    showImageUploadOverlay,
    insertPageBreak,
  ]);

  useEffect(() => {
    if (!editor || previewOnly) return undefined;
    const onEditRequest = (event: Event) => {
      const ce = event as CustomEvent<HaimTableEditRequestDetail>;
      if (!ce.detail) return;
      openHaimTableEditor(ce.detail);
    };
    const dom = editor.view.dom;
    dom.addEventListener(HAIM_TABLE_EDIT_REQUEST_EVENT, onEditRequest);
    return () =>
      dom.removeEventListener(HAIM_TABLE_EDIT_REQUEST_EVENT, onEditRequest);
  }, [editor, previewOnly, openHaimTableEditor]);

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
      const imageFiles = e.clipboardData
        ? collectClipboardImageFiles(e.clipboardData)
        : [];
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
      <div
        className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-white dark:bg-odp-surface"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Loader2
          size={18}
          className="animate-spin text-gray-400 dark:text-gray-500"
          aria-hidden
        />
        <div className="text-sm text-gray-500 dark:text-odp-muted">
          Haim Editor 로딩 중…
        </div>
      </div>
    );
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div
        ref={rootRef}
        className={`haim-editor flex h-full min-h-0 flex-col bg-white dark:bg-odp-surface ${
          theme === 'dark' ? 'haim-editor--dark' : ''
        }`}
      >
        <HaimToolbar
          editor={editor}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          previewOnly={previewOnly}
          onInsertPageBreak={insertPageBreak}
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
            onCreateQrCode: () => openQrCodeCreate(),
            onCreateWhiteboard: () => setWhiteboardOpen(true),
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
          <div
            className={`relative flex min-h-0 min-w-0 flex-1 ${
              stackDouble ? 'flex-col' : ''
            }`}
          >
            {showSource ? (
              <div
                className={`min-h-0 shrink-0 ${
                  doublePane
                    ? stackDouble
                      ? 'h-1/2 w-full border-b border-slate-200 dark:border-odp-borderStrong'
                      : 'w-1/2'
                    : 'w-full'
                }`}
              >
                <HaimSourcePane
                  key={`haim-source-${currentFile?.id || 'untitled'}`}
                  initialValue={value || ''}
                  theme={theme}
                  onDocChanged={notifyCmDocChanged}
                  viewRef={cmViewRef}
                  onViewReady={() => setCmRevision((n) => n + 1)}
                  noteCoverFoldDocKey={noteCoverFoldDocKey}
                  foldBase64Images={foldBase64Images}
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
                  doublePane
                    ? stackDouble
                      ? 'h-1/2 w-full flex-1'
                      : 'w-1/2 flex-1'
                    : 'flex-1'
                }`}
              >
                {!previewOnly && isSurfaceLive ? (
                  <Suspense fallback={null}>
                    <HaimDragHandleLayer
                      editor={editor}
                      onDraggingChange={(dragging) => {
                        blockDragActiveRef.current = dragging;
                        if (dragging) cancelPending();
                      }}
                    />
                  </Suspense>
                ) : null}
                <EditorContent editor={editor} className="haim-editor-content h-full" />
                <HaimLinkHoverHint
                  editor={editor}
                  enabled={!previewOnly && isSurfaceLive}
                />
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
      <QrCodeCreateModal
        isOpen={qrCodeOpen}
        initialText={qrCodeInitialText}
        onClose={() => {
          setQrCodeOpen(false);
          setQrCodeInitialText('');
        }}
        disabled={
          typeof onUploadImage !== 'function' || showImageUploadOverlay
        }
        onConfirm={async (file) => {
          await handleUploadFiles([file]);
        }}
        onInsertDecodedText={(decodedText) => {
          if (!editor) return;
          editor.chain().focus().insertContent(decodedText).run();
        }}
      />
      <WhiteboardCreateModal
        isOpen={whiteboardOpen}
        onClose={() => setWhiteboardOpen(false)}
        disabled={
          typeof onUploadImage !== 'function' || showImageUploadOverlay
        }
        onConfirm={async (file) => {
          const preview = URL.createObjectURL(file);
          const paths = await handleUploadFiles([file]);
          const wikiPath = paths[0];
          if (!wikiPath) {
            URL.revokeObjectURL(preview);
            return;
          }
          setWhiteboardLightbox({ src: preview, wikiPath });
        }}
      />
      <HaimImageLightbox
        src={whiteboardLightbox?.src ?? null}
        alt={whiteboardLightbox?.wikiPath ?? 'whiteboard'}
        open={Boolean(whiteboardLightbox)}
        onClose={() => {
          if (whiteboardLightbox?.src?.startsWith('blob:')) {
            URL.revokeObjectURL(whiteboardLightbox.src);
          }
          setWhiteboardLightbox(null);
        }}
        onSaveAnnotated={async (mode: HaimImageLightboxSaveMode, file: File) => {
          if (!editor || !whiteboardLightbox) return;
          const newPath = await uploadHaimAnnotatedImage(file);
          const targetPath = whiteboardLightbox.wikiPath;
          if (mode === 'overwrite') {
            let foundPos: number | null = null;
            editor.state.doc.descendants((node, pos) => {
              if (foundPos != null) return false;
              if (
                node.type.name === 'wikiImage' &&
                String(node.attrs.path || '') === targetPath
              ) {
                foundPos = pos;
                return false;
              }
              return undefined;
            });
            if (foundPos != null) {
              const node = editor.state.doc.nodeAt(foundPos);
              editor.view.dispatch(
                editor.state.tr.setNodeMarkup(foundPos, undefined, {
                  ...(node?.attrs || {}),
                  path: newPath,
                  alt: newPath,
                }),
              );
            }
            const preview = URL.createObjectURL(file);
            if (whiteboardLightbox.src.startsWith('blob:')) {
              URL.revokeObjectURL(whiteboardLightbox.src);
            }
            setWhiteboardLightbox({ src: preview, wikiPath: newPath });
            return;
          }
          // saveAs — insert another wiki image after the target
          let foundPos: number | null = null;
          let nodeSize = 1;
          editor.state.doc.descendants((node, pos) => {
            if (foundPos != null) return false;
            if (
              node.type.name === 'wikiImage' &&
              String(node.attrs.path || '') === targetPath
            ) {
              foundPos = pos;
              nodeSize = node.nodeSize;
              return false;
            }
            return undefined;
          });
          const insertAt =
            foundPos != null
              ? foundPos + nodeSize
              : editor.state.doc.content.size;
          editor
            .chain()
            .focus()
            .insertContentAt(insertAt, {
              type: 'wikiImage',
              attrs: {
                path: newPath,
                options: '',
                alt: newPath,
                width: null,
                height: null,
                background: null,
              },
            })
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
      <TableEditModal
        isOpen={Boolean(tableEdit)}
        initialMeta={tableEdit?.meta ?? null}
        initialGrid={
          tableEdit?.grid ?? { rows: [['']], aligns: [null] }
        }
        onClose={() => setTableEdit(null)}
        onSave={applyHaimTableEdit}
      />
      {!previewOnly && isSurfaceLive ? (
        <>
          <PreviewTableContextMenu
            containerRef={rootRef}
            getMarkdown={() =>
              editor
                ? editorToVaultMarkdown(editor, metaPrefixRef.current)
                : valueRef.current || ''
            }
            setMarkdown={(next) => {
              if (!editor) return;
              originRef.current = 'external';
              setEditorMarkdown(editor, next, metaPrefixRef, {
                emitUpdate: false,
              });
              emitVault(next);
              pushEditorMarkdownToCmNow();
              originRef.current = null;
            }}
            onEditTable={openHaimTableFromPreview}
            findPreviewRoot={(container) =>
              container.querySelector('.ProseMirror')
              ?? container.querySelector('.md-editor-preview')
            }
          />
          <HaimTableBoxResizeLayer
            containerRef={rootRef}
            getMarkdown={() =>
              editor
                ? editorToVaultMarkdown(editor, metaPrefixRef.current)
                : valueRef.current || ''
            }
            setMarkdown={(next) => {
              if (!editor) return;
              originRef.current = 'external';
              setEditorMarkdown(editor, next, metaPrefixRef, {
                emitUpdate: false,
              });
              emitVault(next);
              pushEditorMarkdownToCmNow();
              originRef.current = null;
            }}
            enabled={!tableEdit}
          />
        </>
      ) : null}
    </EditorContext.Provider>
  );
}

function joinCheck(prefix: string, _content: string): string {
  return prefix;
}
