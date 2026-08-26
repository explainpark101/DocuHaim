import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { MdEditor, config } from 'md-editor-rt';

const MdEditorAny = MdEditor as any;
import {
  createScopedPreviewHeadingId,
  mdEditorIdFromReactId,
} from '@/utils/mdEditorInstanceId';
import { bindCatalogClickScrollFix } from '@/utils/catalogClickScrollFix';
// import 'md-editor-rt/lib/style.css';
import "@/styles/md-editor-rt/style.css";
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import LlmAssistModal from '@/components/llm/LlmAssistModal';
import LlmAssistToolbar from '@/components/llm/LlmAssistToolbar';
import ChecklistProgressFloatingPanel from '@/components/ChecklistProgressFloatingPanel';
import ChecklistProgressToolbar from '@/components/ChecklistProgressToolbar';
import ExportPDF from '@/components/print/ExportPDF';
import MarkdownPageBreakToolbar from '@/components/MarkdownPageBreakToolbar';
import MarkdownHeadingRemapToolbar from '@/components/editor/MarkdownHeadingRemapToolbar';
import HeadingRemapModal from '@/components/shared/modals/HeadingRemapModal';
import TocResizeHandle from '@/components/print/TocResizeHandle';
import TocTitleWrapToolbar from '@/components/TocTitleWrapToolbar';
import Base64ImageFoldToolbar from '@/components/Base64ImageFoldToolbar';
import EditorAutocompleteToolbar from '@/components/editor/EditorAutocompleteToolbar';
import MirrorEditToolbar from '@/components/editor/MirrorEditToolbar';
import ImageToolbar from '@/components/editor/ImageToolbar';
import MdEditorToolbarTooltips from '@/components/editor/MdEditorToolbarTooltips';
import PreviewFootnoteTooltips from '@/components/editor/PreviewFootnoteTooltips';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import ImageLinkModal from '@/components/shared/modals/ImageLinkModal';
import FootnoteComposeModal from '@/components/shared/modals/FootnoteComposeModal';
import ImageClipCropModal from '@/components/shared/modals/ImageClipCropModal';
import { MD_EDITOR_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import {
  EDITOR_ACTION_COMMANDS,
  registerEditorActions,
} from '@/utils/advancedSearch/editorActions';
import { subscribeOpenAdvancedSearch, requestOpenAdvancedSearch } from '@/utils/advancedSearch/openRequest';
import { registerFootnoteInsertHandlers } from '@/utils/advancedSearch/footnoteInsert';
import {
  insertExistingFootnoteRef,
  insertNewFootnote,
} from '@/utils/footnoteInsertApply';
import { setPendingPrintReturnState } from '@/utils/print/printNavigationState';
import { exportPdfPathnameForStoragePath } from '@/utils/appHref';
import { EditorView, drawSelection, keymap } from '@codemirror/view';
import { EditorSelection, EditorState, Prec } from '@codemirror/state';
import { closeCompletion, completionStatus } from '@codemirror/autocomplete';
import { useBase64ImageFold } from '@/hooks/useBase64ImageFold';
import { useEditorAutocomplete } from '@/hooks/useEditorAutocomplete';
import { useMirrorEdit } from '@/hooks/useMirrorEdit';
import {
  applyBase64ImageFoldEnabled,
  base64ImageFoldExtension,
} from '@/utils/base64ImageFoldExtension';
import {
  applyMermaidBase64FoldEnabled,
  mermaidBase64FoldExtension,
} from '@/utils/mermaidBase64FoldExtension';
import { loadBase64ImageFoldEnabled } from '@/utils/base64ImageFoldSettings';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
import { isSafariBrowser } from '@/utils/isSafariBrowser';
import { notifyMirrorEditCaretUpdate } from '@/utils/mirrorEditCaretBridge';
import {
  markMirrorEditCaretFromEditor,
  markMirrorEditCaretFromPreview,
  moveCaretSkippingImages,
  runMotionSkippingImages,
} from '@/utils/previewImageCaretSync';
import { insertPreviewHardBreak } from '@/utils/previewHardBreak';
import {
  addCursorAbove,
  addCursorBelow,
  cursorCharLeft,
  cursorCharRight,
  cursorGroupLeft,
  cursorGroupRight,
  cursorLineDown,
  cursorLineUp,
  cursorSyntaxLeft,
  cursorSyntaxRight,
  insertNewline,
  redo,
  selectGroupLeft,
  selectGroupRight,
  selectSyntaxLeft,
  selectSyntaxRight,
  undo,
} from '@codemirror/commands';
import { insertNewlineContinueMarkupCommand } from '@codemirror/lang-markdown';
import { loadAltVimNavigationEnabled } from '@/utils/altVimNavigationSettings';
import { highlightSelectionMatches, selectNextOccurrence } from '@codemirror/search';
import { Loader2 } from 'lucide-react';
import { applyAppMarkdownItPluginsFromList } from '@/utils/appMarkdownItPlugins';
import { TableEditModal } from '@/components/haimTable/TableEditModal';
import { HaimTableBoxResizeLayer } from '@/components/haimTable/HaimTableBoxResizeLayer';
import { PreviewTableContextMenu } from '@/components/haimTable/PreviewTableContextMenu';
import { useHaimTableEdit } from '@/hooks/useHaimTableEdit';
import { findHaimTableBlockAt } from '@/utils/haimTable';
import {
  createNoteCoverFoldExtension,
  setNoteCoverFoldDocKey,
} from '@/utils/noteCover/noteCoverFoldExtension';
import { getNoteCoverFoldKeyFromFile } from '@/utils/noteCover/noteCoverFoldStateDb';
import {
  hydrateNoteCoverPreviewsInRoot,
  teardownNoteCoverPreviewsInRoot,
} from '@/utils/noteCover/hydrateNoteCoverPreview';
import {
  enhancePreviewHeadingFolds,
  previewNeedsHeadingFoldEnhance,
} from '@/utils/previewHeadingFold';
import {
  getHeadingFoldCollapsedIds,
  getHeadingFoldKeyFromFile,
  saveHeadingFoldCollapsedIds,
} from '@/utils/headingFoldStateDb';
import {
  formatNoteCoverIssues,
  parseNoteCover,
} from '@/utils/noteCover';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { chatSavedNoteLinkTo } from '@/utils/chatWithMyself';
import { resolvePreviewHref } from '@/utils/appHref';
import { bindPreviewFootnoteClick } from '@/utils/previewFootnoteScroll';
import {
  FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT,
} from '@/utils/previewFootnotesSettings';
import { parseDocumentSettingsMeta } from '@/utils/documentSettingsMeta';
import { withFontFallback } from '@/utils/fontFallback';
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import WikiImageSizeModal from '@/components/shared/modals/WikiImageSizeModal';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { useTocTitleWrap } from '@/hooks/useTocTitleWrap';
import {
  getMarkdownImageOccurrenceInContainer,
  getResizableImageAttrsFromElement,
  getWikiImageOccurrenceInContainer,
  replaceMarkdownImageWithWikiPath,
  updateMarkdownImageSizeInMarkdown,
  updateWikiImagePathInMarkdown,
  updateWikiImageSizeInMarkdown,
} from '@/utils/wikiImageSyntax';
import { isDataImageUri, prepareMarkdownImageForWikiConvert } from '@/utils/markdownImageExport';
import { resolveImgbbFetchSrc, uploadImageToImgbb } from '@/utils/imgbbUpload';
import { upsertRemoteImageComment } from '@/utils/remoteImageComment';
import {
  convertAllMarkdownImagesToWiki,
  hasStandardMarkdownImages,
} from '@/utils/convertMarkdownImagesToWiki';
import {
  clearPreviewSelectionMirror,
  findDataLineElement,
  isPointInLivePreviewSelection,
  isPointInMirroredPreviewSelection,
  mirrorCurrentPreviewSelection,
  restoreMirroredPreviewSelection,
  syncPreviewSelectionToEditor,
} from '@/utils/previewSelectionSync';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { useLazyMermaidRender } from '@/hooks/useLazyMermaidRender';
import {
  attachPreviewMirrorEdit,
  abandonDetachedPreviewMirrorEdit,
  beginPreviewMirrorEditSession,
  cancelPreviewMirrorEdit,
  commitPreviewMirrorEdit,
  isMdEditorPreviewOnlyUi,
  isMirrorEditActiveIn,
  isMirrorEditTarget,
} from '@/utils/previewMirrorEdit';
import { registerMirrorEditCaretHandler } from '@/utils/mirrorEditCaretBridge';
import { createMirrorEditPreviewRemirror } from '@/utils/mirrorEditPreviewRemirror';
import { createPreviewScrollFollow } from '@/utils/previewScrollFollow';
import { usePerFileEditorUndoHistory } from '@/hooks/usePerFileEditorUndoHistory';
import {
  toggleBoldForSelection,
  toggleHeadingForSelection,
  toggleItalicForSelection,
  toggleListTypeBetweenUlAndOl,
  toggleOrderedListForSelection,
  toggleStrikeForSelection,
  toggleSubForSelection,
  toggleSupForSelection,
  toggleTaskCheckboxBetweenChecked,
  toggleUnderlineForSelection,
  toggleUnorderedListForSelection,
  wrapSelectionWithInlineCode,
  wrapLatexForSelection,
  wrapBracketsForSelection,
  wrapParenthesesForSelection,
  wrapBracesForSelection,
} from '@/utils/editorMarkdownStyle';

const MD_EDITOR_TOC_WIDTH_KEY = 's3haim_md_editor_toc_width';
const MD_EDITOR_TOC_DEFAULT_WIDTH = 360;

/** Windows: Ctrl, Mac: Cmd ? mod ? ??? ? ?? ??? ?? (keydown ???) */
function getKeyComboFromEvent(e: any) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const parts = [];
  if (isMac ? e.metaKey : e.ctrlKey) parts.push('mod');
  if (e.altKey) parts.push('alt');
  if (e.shiftKey) parts.push('shift');
  const key = (e.key || '').toLowerCase();
  if (!key || key === 'shift' || key === 'control' || key === 'alt' || key === 'meta') {
    return null;
  }
  parts.push(key);
  if (parts.length <= 1) return null;
  return parts.join('+');
}

/** ??? shortcut ???? ctrl/meta ? mod ? ??? (???) */
function normalizeShortcutForMatch(shortcut: any) {
  if (!shortcut || typeof shortcut !== 'string') return '';
  return shortcut
    .toLowerCase()
    .replace(/\bctrl\b/g, 'mod')
    .replace(/\bmeta\b/g, 'mod')
    .trim();
}

const markdownContinueMarkup = insertNewlineContinueMarkupCommand({ nonTightLists: false });

/** Remove blank line inserted before a new list item (loose-list continuation). */
function collapseEmptyLineBeforeListItem(view: any) {
  if (!view?.state) return;
  const { state } = view;
  const pos = state.selection?.main?.head;
  if (typeof pos !== 'number') return;
  const line = state.doc.lineAt(pos);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(line.text)) return;
  if (line.number < 2) return;
  const prevLine = state.doc.line(line.number - 1);
  if (prevLine.text.trim() !== '') return;
  const removed = line.from - prevLine.from;
  view.dispatch({
    changes: { from: prevLine.from, to: line.from, insert: '' },
    selection: EditorSelection.cursor(pos - removed),
  });
}

function markdownEnterSingleNewline(view: any) {
  if (markdownContinueMarkup(view)) {
    collapseEmptyLineBeforeListItem(view);
    return true;
  }
  // Preview Mirror Edit: keep a real <br> in the same block (not a blank gap line).
  if (insertPreviewHardBreak(view)) return true;
  return insertNewline(view);
}

const MARKDOWN_SINGLE_NEWLINE_ENTER_KEYMAP = Prec.highest(
  keymap.of([{ key: 'Enter', run: markdownEnterSingleNewline }]),
);

function insertLineAboveInEditorView(view: any) {
  if (!view?.state) return;
  const head = view.state.selection?.main?.head;
  if (typeof head !== 'number') return;
  const line = view.state.doc.lineAt(head);
  view.dispatch({
    changes: { from: line.from, to: line.from, insert: '\n' },
    selection: { anchor: line.from },
  });
}

/** Mac KO/US ??? `???\ ?? ?? ?? ?(Backquote/IntlBackslash)? ??? ?? ??? ?? */
function isInlineCodeFenceTriggerKey(e: any) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key, code } = e;
  if (key === '`' || key === '?' || key === '\\') return true;
  if (code === 'Backquote' || code === 'IntlBackslash') return true;
  return false;
}

/** Wrap the current selection when typing $, [, (, or {. Empty selection: no-op. */
function wrapSelectionWithPairIfTriggerKey(view: any, event: any) {
  if (event.defaultPrevented) return false;
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  switch (event.key) {
    case '$':
      return wrapLatexForSelection(view);
    case '[':
      return wrapBracketsForSelection(view);
    case '(':
      return wrapParenthesesForSelection(view);
    case '{':
      return wrapBracesForSelection(view);
    default:
      return false;
  }
}

function runAltVimNavigation(view: any, command: any) {
  if (!loadAltVimNavigationEnabled()) return false;
  return command(view);
}

const ALT_VIM_NAVIGATION_KEY_BINDINGS = [
  {
    key: 'Alt-h',
    preventDefault: true,
    run: (view: any) => runAltVimNavigation(view, cursorCharLeft),
  },
  {
    key: 'Alt-j',
    preventDefault: true,
    run: (view: any) => runAltVimNavigation(view, cursorLineDown),
  },
  {
    key: 'Alt-k',
    preventDefault: true,
    run: (view: any) => runAltVimNavigation(view, cursorLineUp),
  },
  {
    key: 'Alt-l',
    preventDefault: true,
    run: (view: any) => runAltVimNavigation(view, cursorCharRight),
  },
];

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
    // Non-Safari: near-instant preview for Mirror Edit / dual-pane sync.
    // Safari: restore library default ? renderDelay 0 makes typing very laggy.
    renderDelay: isSafariBrowser() ? 500 : 0,
  },
  codeMirrorExtensions(extensions: any, {
    keyBindings
  }: any) {
    const nextExtensions = [...extensions].filter(
      (item) =>
        item.type !== 'keymap'
        && item.type !== 'linkShortener'
        && item.type !== 'lineNumbers',
    );

    const baseKeyBindings = (keyBindings || []).filter((binding: any) => {
      const key = String(binding?.key || '').toLowerCase();
      const mac = String(binding?.mac || '').toLowerCase();
      return key !== 'ctrl-d' &&
      key !== 'mod-d' &&
      mac !== 'cmd-d' &&
      key !== 'ctrl-b' &&
      key !== 'mod-b' &&
      mac !== 'cmd-b' &&
      key !== 'ctrl-u' &&
      key !== 'mod-u' &&
      mac !== 'cmd-u' &&
      key !== 'ctrl-o' &&
      key !== 'mod-o' &&
      mac !== 'cmd-o' &&
      key !== 'ctrl-arrowup' &&
      key !== 'mod-arrowup' &&
      mac !== 'cmd-arrowup' &&
      key !== 'ctrl-arrowdown' &&
      key !== 'mod-arrowdown' &&
      mac !== 'cmd-arrowdown' &&
      !/^ctrl-[0-9]$/.test(key) &&
      !/^mod-[0-9]$/.test(key) &&
      !/^cmd-[0-9]$/.test(mac);
    });

    const multiCursorKeyBindings = [
      {
        key: 'ArrowLeft',
        run: (view: any) => moveCaretSkippingImages(view, -1),
      },
      {
        key: 'ArrowRight',
        run: (view: any) => moveCaretSkippingImages(view, 1),
      },
      // Ctrl/Alt+Arrow: CM group & syntax motion ? keep image markup atomic.
      {
        key: 'Ctrl-ArrowLeft',
        mac: 'Alt-ArrowLeft',
        run: (view: any) => runMotionSkippingImages(view, -1, cursorGroupLeft),
        shift: (view: any) => runMotionSkippingImages(view, -1, selectGroupLeft),
      },
      {
        key: 'Ctrl-ArrowRight',
        mac: 'Alt-ArrowRight',
        run: (view: any) => runMotionSkippingImages(view, 1, cursorGroupRight),
        shift: (view: any) => runMotionSkippingImages(view, 1, selectGroupRight),
      },
      {
        key: 'Alt-ArrowLeft',
        mac: 'Ctrl-ArrowLeft',
        run: (view: any) => runMotionSkippingImages(view, -1, cursorSyntaxLeft),
        shift: (view: any) => runMotionSkippingImages(view, -1, selectSyntaxLeft),
      },
      {
        key: 'Alt-ArrowRight',
        mac: 'Ctrl-ArrowRight',
        run: (view: any) => runMotionSkippingImages(view, 1, cursorSyntaxRight),
        shift: (view: any) => runMotionSkippingImages(view, 1, selectSyntaxRight),
      },
      ...ALT_VIM_NAVIGATION_KEY_BINDINGS,
      {
        key: 'Alt--',
        preventDefault: true,
        run: toggleListTypeBetweenUlAndOl,
      },
      {
        key: 'Ctrl-Tab',
        run: toggleTaskCheckboxBetweenChecked,
      },
      {
        key: 'Ctrl-d',
        mac: 'Cmd-d',
        preventDefault: true,
        run: (view: any) => {
          selectNextOccurrence(view);
          return true;
        },
      },
      {
        key: 'Ctrl-b',
        mac: 'Cmd-b',
        preventDefault: true,
        run: toggleBoldForSelection,
      },
      {
        key: 'Ctrl-i',
        mac: 'Cmd-i',
        preventDefault: true,
        run: toggleItalicForSelection,
      },
      {
        key: 'Ctrl-u',
        mac: 'Cmd-u',
        preventDefault: true,
        run: toggleUnderlineForSelection,
        shift: toggleUnorderedListForSelection,
      },
      {
        key: 'Ctrl-o',
        mac: 'Cmd-o',
        preventDefault: true,
        run: toggleOrderedListForSelection,
      },
      {
        key: 'Shift-Ctrl-s',
        mac: 'Shift-Cmd-s',
        preventDefault: true,
        run: toggleStrikeForSelection,
      },
      {
        key: 'Ctrl-ArrowUp',
        mac: 'Cmd-ArrowUp',
        preventDefault: true,
        run: toggleSupForSelection,
      },
      {
        key: 'Ctrl-ArrowDown',
        mac: 'Cmd-ArrowDown',
        preventDefault: true,
        run: toggleSubForSelection,
      },
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
        key: `Ctrl-${level}`,
        mac: `Cmd-${level}`,
        preventDefault: true,
        run: (view: any) => toggleHeadingForSelection(view, level),
      })),
      {
        key: 'Ctrl-0',
        mac: 'Cmd-0',
        preventDefault: true,
        run: (view: any) => toggleHeadingForSelection(view, 10),
      },
      {
        any: (view: any, event: any) => {
          if ((event.ctrlKey || event.metaKey) && event.altKey && event.code === 'KeyC') {
            return wrapSelectionWithInlineCode(view);
          }
          return wrapSelectionWithPairIfTriggerKey(view, event);
        },
      },
      { key: 'Mod-Alt-ArrowUp', run: addCursorAbove },
      { key: 'Mod-Alt-ArrowDown', run: addCursorBelow },
      ...baseKeyBindings,
    ];

    if (!nextExtensions.some((item) => item.type === 'drawSelection')) {
      nextExtensions.push({
        type: 'drawSelection',
        extension: drawSelection(),
      });
    }

    nextExtensions.push(
      {
        type: 'markdownSingleNewlineEnter',
        extension: MARKDOWN_SINGLE_NEWLINE_ENTER_KEYMAP,
      },
      {
        type: 'lineNumbers',
        extension: createNoteCoverFoldExtension(),
      },
      {
        type: 'allowMultipleSelections',
        extension: EditorState.allowMultipleSelections.of(true),
      },
      {
        type: 'clickAddsSelectionRange',
        extension: EditorView.clickAddsSelectionRange.of((event: any) => {
          const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
          return event.altKey || (isMac ? event.metaKey : event.ctrlKey);
        }),
      },
      {
        type: 'multiCursorPreview',
        // min 2: single-char matches wrap hundreds of spans and can stall CM paints.
        extension: highlightSelectionMatches({
          minSelectionLength: 2,
          maxMatches: 200,
        }),
      },
      {
        type: 'keymap',
        extension: keymap.of(multiCursorKeyBindings),
      },
      {
        type: 'base64ImageFold',
        extension: base64ImageFoldExtension(loadBase64ImageFoldEnabled()),
      },
      {
        type: 'mermaidBase64Fold',
        extension: mermaidBase64FoldExtension(loadBase64ImageFoldEnabled()),
      },
      {
        // md-editor-rt re-injects built-in completions; close them when preference is off.
        type: 'autocompleteGate',
        extension: EditorView.updateListener.of((update: any) => {
          notifyMirrorEditCaretUpdate(update);
          if (loadEditorAutocompleteEnabled()) return;
          if (completionStatus(update.state) === 'active') {
            closeCompletion(update.view);
          }
        }),
      },
    );

    return nextExtensions;
  },
  // Must use shared merge (includes mermaid fence). A hand-rolled list here
  // overwrote mdEditorConfig and dropped mermaid → plain code blocks.
  markdownItPlugins(plugins: any) {
    return applyAppMarkdownItPluginsFromList(plugins);
  },
});

export default function MarkdownEditor({
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
  snippetConfig = { snippets: [] },
  llmProviderProfiles = [],
  getImgbbApiKey,
  onOpenViewPath,
  onRequestConvertAllImagesToWiki,
  onRegisterConvertAllImagesToWiki
}: any) {
  const navigate = useNavigate();
  const { showAlert } = useAlertModal();
  // Unique per keep-alive mount so catalog getElementById / preview-wrapper
  // selectors do not hit a hidden sibling tab (default id is shared).
  const reactId = useId();
  const editorId = useMemo(() => mdEditorIdFromReactId(reactId), [reactId]);
  const buildPreviewHeadingId = useMemo(
    () => createScopedPreviewHeadingId(editorId),
    [editorId],
  );
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const previewScrollFollowRef = useRef(null);
  const mirrorEditRemirrorRef = useRef(null);
  const snippetConfigRef = useRef(snippetConfig);
  const valueRef = useRef(value);
  const currentFileRef = useRef(currentFile);
  const themeRef = useRef(theme);
  const coverIssuesAlertSigRef = useRef('');

  useEffect(() => {
    valueRef.current = value;
    currentFileRef.current = currentFile;
    themeRef.current = theme;
  }, [value, currentFile, theme]);

  useEffect(() => {
    const { issues } = parseNoteCover(value ?? '');
    if (!issues.length) {
      coverIssuesAlertSigRef.current = '';
      return;
    }
    const sig = formatNoteCoverIssues(issues);
    if (sig === coverIssuesAlertSigRef.current) return;
    coverIssuesAlertSigRef.current = sig;
    showAlert({
      title: 'Cover syntax error',
      message: `note-cover has invalid syntax.\n\n${sig}`,
    });
  }, [value, showAlert]);

  const navigateToExportPdf = useCallback((options = {}) => {
    const content = valueRef.current ?? '';
    const file = currentFileRef.current;
    setPendingPrintReturnState({ currentFile: file, editorContent: content });
    navigate(exportPdfPathnameForStoragePath(file?.id), {
      state: {
        value: content,
        theme: themeRef.current === 'dark' ? 'dark' : 'light',
        currentFile: file,
        // @ts-expect-error TS(2339): Property 'openCoverEdit' does not exist on type '{... Remove this comment to see the full error message
        ...(options.openCoverEdit ? { openCoverEdit: true } : {}),
      },
    });
  }, [navigate]);
  const { onChange: onChangeWithUndoHistory } = usePerFileEditorUndoHistory({
    currentFile,
    value,
    onChange,
    editorRef,
    enabled: !previewOnly,
  });

  const haimTableEdit = useHaimTableEdit({
    getMarkdown: () => valueRef.current ?? '',
    setMarkdown: (next) => {
      if (typeof onChange === 'function') onChange(next);
    },
  });
  const openHaimTableEditRef = useRef(haimTableEdit.openAtOffset);
  const openHaimTablePreviewRef = useRef(haimTableEdit.openPreviewTable);
  useEffect(() => {
    openHaimTableEditRef.current = haimTableEdit.openAtOffset;
    openHaimTablePreviewRef.current = haimTableEdit.openPreviewTable;
  }, [haimTableEdit.openAtOffset, haimTableEdit.openPreviewTable]);
  const handleToolbarImageUploadRef = useRef(null);
  const [llmAssistOpen, setLlmAssistOpen] = useState(false);
  const [headingRemapOpen, setHeadingRemapOpen] = useState(false);
  /** Snapshot of CM selection when opening heading remap ({ from, to, text } or null). */
  const [headingRemapSelection, setHeadingRemapSelection] = useState(null);
  const openHeadingRemapRef = useRef(() => {});
  const [checklistProgressOpen, setChecklistProgressOpen] = useState(false);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
  const [previewFootnotesRenderKey, setPreviewFootnotesRenderKey] = useState(0);
  const [imageLinkModalOpen, setImageLinkModalOpen] = useState(false);
  const [footnoteComposeOpen, setFootnoteComposeOpen] = useState(false);
  const footnoteInsertRangeRef = useRef({ from: 0, to: 0 });
  const onChangeWithUndoHistoryRef = useRef(onChangeWithUndoHistory);
  useEffect(() => {
    onChangeWithUndoHistoryRef.current = onChangeWithUndoHistory;
  }, [onChangeWithUndoHistory]);
  const [clipCropFile, setClipCropFile] = useState(null);
  const [freeTransformState, setFreeTransformState] = useState(null);
  const [freeTransformConfirmOpen, setFreeTransformConfirmOpen] = useState(false);
  const [freeTransformOverlayRect, setFreeTransformOverlayRect] = useState(null);
  const [coverExportConfirmOpen, setCoverExportConfirmOpen] = useState(false);
  const [catalogEl, setCatalogEl] = useState(null);
  const [catalogHandleBox, setCatalogHandleBox] = useState(null);
  const activeTransformRef = useRef(null);
  const [wrapTitles, setWrapTitles] = useTocTitleWrap();
  const [foldBase64Images, setFoldBase64Images] = useBase64ImageFold();
  const [autocompleteEnabled, setAutocompleteEnabled] = useEditorAutocomplete();
  const [mirrorEditPref, setMirrorEditEnabled] = useMirrorEdit();
  // Safari: skip Mirror Edit (unstable). Dual-pane scroll still uses previewScrollFollow.
  const safariMdEditor = useMemo(() => isSafariBrowser(), []);
  const mirrorEditEnabled = safariMdEditor ? false : mirrorEditPref;

  /** Selection before Advanced Search steals focus (so bold/etc still apply to the prior range). */
  const asSelectionSnapshotRef = useRef(null);

  useEffect(() => {
    if (previewOnly) return undefined;

    const snapshotSelection = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;
      asSelectionSnapshotRef.current = view.state.selection;
    };

    const onKeyDown = (e: any) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
      if (e.key.toLowerCase() !== 'k') return;
      snapshotSelection();
    };

    window.addEventListener('keydown', onKeyDown, true);
    const unsubOpen = subscribeOpenAdvancedSearch(snapshotSelection);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      unsubOpen();
    };
  }, [previewOnly]);

  // Expose toolbar actions to Advanced Search (Cmd/Ctrl+K) while this editor is mounted.
  useEffect(() => {
    if (previewOnly) return undefined;

    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
    const getApi = () => editorRef.current?.value ?? editorRef.current;

    const restoreSelectionIfNeeded = () => {
      const api = getApi();
      const view = api?.getEditorView?.();
      const snap = asSelectionSnapshotRef.current;
      if (!view || !snap) return;
      view.dispatch({ selection: snap, scrollIntoView: true });
    };

    const runDirective = (direct: any) => {
      const api = getApi();
      if (!api) return;
      restoreSelectionIfNeeded();
      api.focus?.();
      if (typeof api.execCommand === 'function') {
        api.execCommand(direct);
      }
    };

    const insertPgbr = () => {
      const api = getApi();
      if (!api) return;
      const insertion = '\n\n<pgbr/>\n\n';
      if (typeof api.insert === 'function') {
        api.insert(() => ({
          targetValue: insertion,
          select: false,
          deviationStart: 0,
          deviationEnd: 0,
        }));
        api.focus?.();
        return;
      }
      const view = api.getEditorView?.();
      if (!view) return;
      view.dispatch(view.state.replaceSelection(insertion));
      view.focus?.();
    };

    const openExport = (options = {}) => {
      navigateToExportPdf(options);
    };

    /** @type {Record<string, () => void>} */
    const handlers = {};
    for (const cmd of EDITOR_ACTION_COMMANDS) {
      if (cmd.directive) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        handlers[cmd.id] = () => runDirective(cmd.directive);
      }
    }
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-revoke'] = () => {
      restoreSelectionIfNeeded();
      const view = getApi()?.getEditorView?.();
      if (!view) return;
      view.focus();
      undo(view);
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-next'] = () => {
      restoreSelectionIfNeeded();
      const view = getApi()?.getEditorView?.();
      if (!view) return;
      view.focus();
      redo(view);
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-llm-assist'] = () => setLlmAssistOpen(true);
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-export-pdf'] = openExport;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-pgbr'] = () => {
      restoreSelectionIfNeeded();
      insertPgbr();
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-heading-remap'] = () => {
      restoreSelectionIfNeeded();
      openHeadingRemapRef.current();
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-checklist-progress'] = () => setChecklistProgressOpen(true);
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-table-edit'] = () => {
      restoreSelectionIfNeeded();
      const view = getApi()?.getEditorView?.();
      if (!view) return;
      const { from, to } = view.state.selection.main;
      const opened = openHaimTableEditRef.current(from, to);
      if (!opened) {
        showAlert({
          title: 'No table',
          message: 'No haim-table found at the cursor or selection position.',
        });
      }
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-image-upload'] = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.onchange = () => {
        const files = Array.from(input.files || []);
        // @ts-expect-error TS(2349): This expression is not callable.
        if (files.length) void handleToolbarImageUploadRef.current?.(files);
      };
      input.click();
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-image-clip'] = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        const file = input.files?.[0];
        // @ts-expect-error TS(2345): Argument of type 'File' is not assignable to param... Remove this comment to see the full error message
        if (file) setClipCropFile(file);
      };
      input.click();
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-convert-all-images-to-wiki'] = () => {
      if (typeof onRequestConvertAllImagesToWiki === 'function') {
        onRequestConvertAllImagesToWiki();
      }
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-insert-footnote'] = () => {
      requestOpenAdvancedSearch({ mode: 'footnote-insert' });
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-insert-circle-number'] = (payload: any) => {
      const glyph = typeof payload === 'string' ? payload : '';
      if (!glyph) {
        requestOpenAdvancedSearch({ mode: 'circle-number' });
        return;
      }

      restoreSelectionIfNeeded();
      const api = getApi();
      const view = api?.getEditorView?.();
      if (!view) return;

      view.dispatch(view.state.replaceSelection(glyph));
      view.focus?.();
    };

    // Advanced Search snippet insertion: host passes snippet body as payload.
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handlers['editor-insert-snippet'] = (payload: any) => {
      const body = typeof payload === 'string' ? payload : '';
      if (!body) return;

      restoreSelectionIfNeeded();
      const api = getApi();
      const view = api?.getEditorView?.();
      if (!view) return;

      view.dispatch(view.state.replaceSelection(body));
      view.focus?.();
    };

    return registerEditorActions(handlers);
  }, [previewOnly, navigateToExportPdf, showAlert, onRequestConvertAllImagesToWiki]);

  useEffect(() => {
    if (previewOnly) return undefined;

    const getView = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      return api?.getEditorView?.() ?? null;
    };

    const restoreSelection = () => {
      const view = getView();
      const snap = asSelectionSnapshotRef.current;
      if (!view || !snap) return;
      view.dispatch({ selection: snap, scrollIntoView: true });
    };

    const applyDoc = (next: any, caret: any) => {
      const view = getView();
      if (view) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: next },
          selection: { anchor: caret },
          scrollIntoView: true,
        });
        view.focus?.();
      }
      onChangeWithUndoHistoryRef.current?.(next);
    };

    return registerFootnoteInsertHandlers({
      getMarkdown: () => getView()?.state.doc.toString() ?? valueRef.current ?? '',
      insertExisting: (label) => {
        restoreSelection();
        const view = getView();
        const markdown = view?.state.doc.toString() ?? valueRef.current ?? '';
        const sel = view?.state.selection.main;
        const result = insertExistingFootnoteRef(
          markdown,
          sel?.from ?? 0,
          sel?.to ?? 0,
          label,
        );
        applyDoc(result.next, result.caret);
      },
      openCompose: () => {
        restoreSelection();
        const view = getView();
        const sel = view?.state.selection.main;
        footnoteInsertRangeRef.current = {
          from: sel?.from ?? 0,
          to: sel?.to ?? 0,
        };
        setFootnoteComposeOpen(true);
      },
    });
  }, [previewOnly]);

  const {
    width: catalogWidth,
    isResizing: catalogResizing,
    handleProps: catalogResizeHandleProps,
  } = useResizablePanelWidth({
    storageKey: MD_EDITOR_TOC_WIDTH_KEY,
    defaultWidth: MD_EDITOR_TOC_DEFAULT_WIDTH,
    minWidth: 160,
    collapseBelowWidth: 80,
    maxWidth: 640,
    edge: 'right',
    onCollapseBelowMin: () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      api?.toggleCatalog?.(false);
    },
  });

  const documentSettings = useMemo(() => {
    const { meta } = parseDocumentSettingsMeta(value ?? '');
    return meta;
  }, [value]);

  const documentFontStyleVars = useMemo(() => {
    const fonts = documentSettings?.fonts;
    if (!fonts) return {};
    return {
      '--print-font-body': withFontFallback(fonts.body),
      '--print-font-heading': withFontFallback(fonts.heading),
      '--print-font-bold': withFontFallback(fonts.bold),
      '--print-font-code': withFontFallback(fonts.code, 'mono'),
    };
  }, [documentSettings]);

  useEffect(() => {
    snippetConfigRef.current = snippetConfig || { snippets: [] };
  }, [snippetConfig]);

  useEffect(() => {
    const apply = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return false;
      applyBase64ImageFoldEnabled(view, foldBase64Images);
      applyMermaidBase64FoldEnabled(view, foldBase64Images);
      return true;
    };
    if (apply()) return undefined;
    const t1 = window.setTimeout(apply, 50);
    const t2 = window.setTimeout(apply, 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [foldBase64Images]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const syncCatalog = () => {
      // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const next = root.querySelector(
        '.md-editor-catalog-fixed, .md-editor-catalog-flat',
      );
      setCatalogEl((prev) => (prev === next ? prev : next));
    };
    syncCatalog();

    const mo = new MutationObserver(syncCatalog);
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    // @ts-expect-error TS(2339): Property 'style' does not exist on type 'never'.
    root.style.setProperty('--md-catalog-width', `${catalogWidth}px`);
  }, [catalogWidth]);

  // MdEditor reconcile wipes foreign catalog children, so overlay the handle on document.body.
  useLayoutEffect(() => {
    if (!catalogEl) {
      setCatalogHandleBox(null);
      return undefined;
    }

    const updateBox = () => {
      // @ts-expect-error TS(2339): Property 'getBoundingClientRect' does not exist on... Remove this comment to see the full error message
      const catRect = catalogEl.getBoundingClientRect();
      if (catRect.width <= 0 || catRect.height <= 0) {
        setCatalogHandleBox(null);
        return;
      }
      setCatalogHandleBox({
        // @ts-expect-error TS(2345): Argument of type '{ top: any; left: any; height: a... Remove this comment to see the full error message
        top: catRect.top,
        left: catRect.left,
        height: catRect.height,
      });
    };

    updateBox();
    const ro = new ResizeObserver(updateBox);
    ro.observe(catalogEl);
    const root = containerRef.current;
    if (root) ro.observe(root);
    window.addEventListener('resize', updateBox);
    window.addEventListener('scroll', updateBox, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateBox);
      window.removeEventListener('scroll', updateBox, true);
    };
  }, [catalogEl, catalogWidth]);

  // Replace md-editor-rt catalog offsetTop scroll (breaks with keep-alive id
  // collisions and preview containment/transforms) with getBoundingClientRect.
  useEffect(() => {
    if (!catalogEl) return undefined;
    return bindCatalogClickScrollFix(catalogEl, {
      getEditorRoot: () => containerRef.current,
      mdHeadingId: (args) => buildPreviewHeadingId(args),
    });
  }, [catalogEl, buildPreviewHeadingId]);

  useWikiImageHydration(
    containerRef,
    value,
    onResolveWikiImageUrl,
    currentFile?.id ?? null,
  );
  useLazyMermaidRender(containerRef, { layoutKey: `${theme}|${value}` });

  // Auto-mount note-cover CoverSlide in preview; re-run when preview DOM settles/recreates.
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !value) return undefined;

    let rafId = 0;
    const runCoverHydration = () => {
      hydrateNoteCoverPreviewsInRoot(root, value, onResolveWikiImageUrl, {
        load: true,
      });
    };
    const scheduleIfNeeded = () => {
      // @ts-expect-error TS(2339): Property 'querySelectorAll' does not exist on type... Remove this comment to see the full error message
      const hosts = root.querySelectorAll('[data-note-cover-mount]');
      if (!hosts.length) return;
      const needs =
        // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
        root.querySelector('.md-note-cover-placeholder--pending')
        || [...hosts].some((host) => host.childNodes.length === 0);
      if (!needs) return;
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        runCoverHydration();
      });
    };

    const delays = [0, 80, 280, 600, 1100, 2000];
    const timers = delays.map((delay) => setTimeout(runCoverHydration, delay));

    // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
    const preview = root.querySelector('.md-editor-preview') || root;
    const mutationObserver =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(scheduleIfNeeded)
        : null;
    mutationObserver?.observe(preview, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      timers.forEach((t) => clearTimeout(t));
      mutationObserver?.disconnect();
    };
  }, [value, onResolveWikiImageUrl, currentFile?.id]);

  useEffect(() => {
    const root = containerRef.current;
    return () => {
      teardownNoteCoverPreviewsInRoot(root);
    };
  }, []);

  // Persist / restore note-cover fold per document (IndexedDB).
  useEffect(() => {
    if (previewOnly) return undefined;
    const key = getNoteCoverFoldKeyFromFile(currentFile);
    const apply = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return false;
      setNoteCoverFoldDocKey(view, key);
      return true;
    };
    if (apply()) return undefined;
    const timers = [50, 200, 500, 1000].map((delay) => setTimeout(apply, delay));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [currentFile?.id, currentFile?.type, previewOnly]);

  // Preview heading fold chevrons (persist collapsed ids per document).
  // Do not depend on `value` ? tearing down on every keystroke flashes chevrons.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const docKey = getHeadingFoldKeyFromFile(currentFile);
    const collapsedRef = { current: /** @type {string[]} */ ([]) };
    let cancelled = false;
    /** @type {(() => void) | null} */
    let cleanupEnhance: any = null;
    /** @type {MutationObserver | null} */
    let mutationObserver: any = null;
    /** @type {ReturnType<typeof setTimeout>[]} */
    let timers: any = [];

    // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
    const getPreview = () => container.querySelector('.md-editor-preview');

    const applyEnhance = () => {
      if (cancelled) return;
      const preview = getPreview();
      if (!preview) return;
      // Preview HTML rebuild drops old chevrons with the nodes. Only bind headings
      // that lack the enhance marker ? never strip live chevrons (avoids flicker
      // and MutationObserver loops from inserting buttons).
      if (!previewNeedsHeadingFoldEnhance(preview)) return;

      const nextCleanup = enhancePreviewHeadingFolds(preview, {
        collapsedIds: collapsedRef.current,
        onCollapsedChange: (ids) => {
          // @ts-expect-error TS(2322): Type 'string[]' is not assignable to type 'never[]... Remove this comment to see the full error message
          collapsedRef.current = ids;
          if (docKey) void saveHeadingFoldCollapsedIds(docKey, ids);
        },
      });
      const prevCleanup = cleanupEnhance;
      cleanupEnhance = () => {
        prevCleanup?.();
        nextCleanup();
      };
    };

    const ensureObserver = (preview: any) => {
      if (!preview || mutationObserver || typeof MutationObserver === 'undefined') return;
      mutationObserver = new MutationObserver(applyEnhance);
      mutationObserver.observe(preview, {
        childList: true,
        subtree: true,
      });
    };

    const boot = async () => {
      if (docKey) {
        const saved = await getHeadingFoldCollapsedIds(docKey);
        if (cancelled) return;
        // @ts-expect-error TS(2322): Type 'string[]' is not assignable to type 'never[]... Remove this comment to see the full error message
        if (saved) collapsedRef.current = saved;
      }
      if (cancelled) return;

      ensureObserver(getPreview());
      applyEnhance();

      // Preview root / headings may appear slightly after mount.
      timers = [80, 250, 600].map((delay) =>
        setTimeout(() => {
          if (cancelled) return;
          ensureObserver(getPreview());
          applyEnhance();
        }, delay),
      );
    };

    void boot();

    return () => {
      cancelled = true;
      // @ts-expect-error TS(7006): Parameter 't' implicitly has an 'any' type.
      timers.forEach((t) => clearTimeout(t));
      mutationObserver?.disconnect();
      mutationObserver = null;
      cleanupEnhance?.();
      cleanupEnhance = null;
    };
  }, [currentFile?.id, currentFile?.type]);

  useEffect(() => {
    if (!previewOnly) return;
    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
    const api = editorRef.current?.value ?? editorRef.current;
    api?.togglePreviewOnly?.(true);
  }, [previewOnly]);

  // Mobile: opening a note starts in toolbar Preview Only with Mirror Edit off.
  // Do not lock the `previewOnly` prop ? user can still toggle either control.
  useEffect(() => {
    if (!isMobileLayout || previewOnly) return undefined;
    if (!currentFile?.id) return undefined;

    setMirrorEditEnabled(false);

    const applyPreviewOnly = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      api?.togglePreviewOnly?.(true);
    };
    applyPreviewOnly();
    const timers = [80, 240, 600].map((ms) => setTimeout(applyPreviewOnly, ms));
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isMobileLayout, previewOnly, currentFile?.id, setMirrorEditEnabled]);

  // Preview selection ? CodeMirror selection + mirrored highlight/caret on both panes.
  useEffect(() => {
    if (previewOnly || safariMdEditor) return undefined;
    const root = containerRef.current;
    if (!root) return undefined;

    // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
    const getPreviewRoot = () => root.querySelector('.md-editor-preview');
    const mirrorEditOn = () => mirrorEditEnabled;
    let pointerDown: any = null;

    const shouldIgnoreTarget = (target: any) => {
      if (!(target instanceof Element)) return false;
      if (isMirrorEditTarget(target)) return true;
      return Boolean(
        target.closest(
          'a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]',
        ),
      );
    };

    const syncFromPreview = (eventTarget: any) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      if (isMirrorEditActiveIn(previewRoot)) return;

      // Mirror Edit OFF: preview may keep a non-collapsed selection for copy,
      // but must not drive the markdown caret or steal focus for typing.
      if (!mirrorEditOn()) {
        const sel = window.getSelection?.();
        if (
          sel?.rangeCount
          && previewRoot.contains(sel.getRangeAt(0).commonAncestorContainer)
          && !sel.getRangeAt(0).collapsed
        ) {
          mirrorCurrentPreviewSelection(previewRoot, { allowCollapsed: false });
        } else {
          clearPreviewSelectionMirror(previewRoot);
        }
        return;
      }

      const sel = window.getSelection?.();
      if (!sel || sel.rangeCount === 0) {
        // Empty table cells often cannot host a native selection ? still map by target.
        if (!(eventTarget instanceof Element) || !eventTarget.closest('td, th')) return;
      } else {
        const range = sel.getRangeAt(0);
        if (
          !previewRoot.contains(range.commonAncestorContainer)
          && !(eventTarget instanceof Element && eventTarget.closest('td, th'))
        ) {
          return;
        }
      }

      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;

      if (sel?.rangeCount && previewRoot.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        mirrorCurrentPreviewSelection(previewRoot, { allowCollapsed: true });
      }
      syncPreviewSelectionToEditor(view, previewRoot, {
        focus: true,
        target: eventTarget,
      });
      markMirrorEditCaretFromPreview();
      // @ts-expect-error TS(2339): Property 'schedule' does not exist on type 'never'... Remove this comment to see the full error message
      mirrorEditRemirrorRef.current?.schedule({ withRetries: true });
    };

    const isContextMenuMouseDown = (e: any) => e.button === 2 || (e.button === 0 && e.ctrlKey);

    const restorePreviewSelectionForContextMenu = (e: any, previewRoot: any) => {
      if (isPointInLivePreviewSelection(previewRoot, e.clientX, e.clientY)) return true;
      if (!isPointInMirroredPreviewSelection(e.clientX, e.clientY)) return false;
      return restoreMirroredPreviewSelection(previewRoot);
    };

    const onMouseDown = (e: any) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (previewRoot.contains(target) && isContextMenuMouseDown(e)) {
        restorePreviewSelectionForContextMenu(e, previewRoot);
        return;
      }

      if (previewRoot.contains(target)) {
        pointerDown = { x: e.clientX, y: e.clientY };
        if (!isMirrorEditTarget(target) && !mirrorEditOn()) {
          clearPreviewSelectionMirror(previewRoot);
        }
        return;
      }

      pointerDown = null;
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (view?.dom.contains(target)) {
        if (isContextMenuMouseDown(e)) return;
        markMirrorEditCaretFromEditor();
        if (!mirrorEditOn()) clearPreviewSelectionMirror(previewRoot);
      }
    };

    const onContextMenuCapture = (e: any) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      restorePreviewSelectionForContextMenu(e, previewRoot);
    };

    const onMouseUp = (e: any) => {
      if (isContextMenuMouseDown(e)) return;
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      if (shouldIgnoreTarget(e.target)) return;

      // Toolbar preview-only: source CM is width 0% ? never focus it (breaks Hangul IME).
      if (isMdEditorPreviewOnlyUi(root)) {
        const dragged = Boolean(
          pointerDown
          && Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) > 6,
        );
        pointerDown = null;
        if (!mirrorEditOn() || dragged) return;
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        const api = editorRef.current?.value ?? editorRef.current;
        const view = api?.getEditorView?.();
        const block =
          e.target instanceof Element
            ? findDataLineElement(e.target, previewRoot)
            : null;
        if (view && block) {
          markMirrorEditCaretFromPreview();
          beginPreviewMirrorEditSession(block, view, previewRoot, e.clientX, e.clientY);
        }
        return;
      }

      pointerDown = null;
      requestAnimationFrame(() => syncFromPreview(e.target));
    };

    const onTouchEnd = (e: any) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      if (shouldIgnoreTarget(e.target)) return;

      if (isMdEditorPreviewOnlyUi(root)) {
        if (!mirrorEditOn()) return;
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        const api = editorRef.current?.value ?? editorRef.current;
        const view = api?.getEditorView?.();
        const touch = e.changedTouches?.[0];
        const block =
          e.target instanceof Element
            ? findDataLineElement(e.target, previewRoot)
            : null;
        if (view && block && touch) {
          markMirrorEditCaretFromPreview();
          beginPreviewMirrorEditSession(
            block,
            view,
            previewRoot,
            touch.clientX,
            touch.clientY,
          );
        }
        return;
      }

      requestAnimationFrame(() => syncFromPreview(e.target));
    };

    // Mirror Edit ON only: if focus/selection is still on the preview, move editing
    // into CodeMirror. Skip while composing (Korean IME). In preview-only UI, never
    // steal focus to the zero-width source pane ? contentEditable handles input instead.
    const onKeyDownCapture = (e: any) => {
      if (!mirrorEditOn()) return;
      if (e.isComposing || e.keyCode === 229 || e.key === 'Process') return;
      if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S' || e.code === 'KeyS')) {
        return;
      }
      if (isMirrorEditTarget(e.target)) return;
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      if (isMirrorEditActiveIn(previewRoot)) return;
      if (isMdEditorPreviewOnlyUi(root)) return;

      const target = e.target;
      const focusInPreview =
        target instanceof Node && previewRoot.contains(target);
      const sel = window.getSelection?.();
      const selInPreview =
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        sel?.rangeCount > 0
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        && previewRoot.contains(sel.getRangeAt(0).commonAncestorContainer);

      if (!focusInPreview && !selInPreview) return;

      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;
      if (view.hasFocus) return;

      if (selInPreview) {
        mirrorCurrentPreviewSelection(previewRoot, { allowCollapsed: true });
        syncPreviewSelectionToEditor(view, previewRoot, { focus: true });
        // @ts-expect-error TS(2339): Property 'schedule' does not exist on type 'never'... Remove this comment to see the full error message
        mirrorEditRemirrorRef.current?.schedule({ withRetries: true });
      } else {
        view.focus();
      }
    };

    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('mousedown', onMouseDown, true);
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('contextmenu', onContextMenuCapture, true);
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('mouseup', onMouseUp);
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('touchend', onTouchEnd, { passive: true });
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('keydown', onKeyDownCapture, true);
    return () => {
      clearPreviewSelectionMirror(getPreviewRoot());
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('mousedown', onMouseDown, true);
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('contextmenu', onContextMenuCapture, true);
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('mouseup', onMouseUp);
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('touchend', onTouchEnd);
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('keydown', onKeyDownCapture, true);
    };
  }, [previewOnly, mirrorEditEnabled, safariMdEditor]);

  // Dual-pane: bidirectional scroll sync + preview follow for editor caret.
  // Mirror Edit: also remirror caret/selection overlays onto the preview.
  // Safari: keep data-line scroll sync; skip Mirror Edit remirror only.
  useEffect(() => {
    if (previewOnly) {
      // @ts-expect-error TS(2339): Property 'stop' does not exist on type 'never'.
      previewScrollFollowRef.current?.stop();
      previewScrollFollowRef.current = null;
      // @ts-expect-error TS(2339): Property 'stop' does not exist on type 'never'.
      mirrorEditRemirrorRef.current?.stop();
      mirrorEditRemirrorRef.current = null;
      markMirrorEditCaretFromEditor();
      return undefined;
    }

    const root = containerRef.current;
    const getPreviewRoot = () =>
      // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      (root ?? containerRef.current)?.querySelector('.md-editor-preview');
    const getView = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      return api?.getEditorView?.();
    };

    // @ts-expect-error TS(2339): Property 'stop' does not exist on type 'never'.
    previewScrollFollowRef.current?.stop();
    const scrollFollow = createPreviewScrollFollow({ getPreviewRoot, getView });
    // @ts-expect-error TS(2322): Type 'PreviewScrollFollowController' is not assign... Remove this comment to see the full error message
    previewScrollFollowRef.current = scrollFollow;

    // @ts-expect-error TS(2339): Property 'stop' does not exist on type 'never'.
    mirrorEditRemirrorRef.current?.stop();
    mirrorEditRemirrorRef.current = null;
    if (mirrorEditEnabled) {
      // @ts-expect-error TS(2322): Type 'MirrorEditRemirrorController' is not assigna... Remove this comment to see the full error message
      mirrorEditRemirrorRef.current = createMirrorEditPreviewRemirror({
        getPreviewRoot,
        getView,
      });
    } else {
      markMirrorEditCaretFromEditor();
    }

    const unregisterCaret = registerMirrorEditCaretHandler((view, update) => {
      const own = getView();
      if (!own || view !== own) return;
      scrollFollow.schedule({ withRetries: update.docChanged });
      if (mirrorEditEnabled) {
        // @ts-expect-error TS(2339): Property 'schedule' does not exist on type 'never'... Remove this comment to see the full error message
        mirrorEditRemirrorRef.current?.schedule({ withRetries: update.docChanged });
      }
    });

    return () => {
      unregisterCaret();
      // @ts-expect-error TS(2339): Property 'stop' does not exist on type 'never'.
      mirrorEditRemirrorRef.current?.stop();
      mirrorEditRemirrorRef.current = null;
      // @ts-expect-error TS(2339): Property 'stop' does not exist on type 'never'.
      previewScrollFollowRef.current?.stop();
      previewScrollFollowRef.current = null;
    };
  }, [previewOnly, mirrorEditEnabled]);

  // Mirror Edit: double-click preview block ? contentEditable in place.
  useEffect(() => {
    if (previewOnly || safariMdEditor || !mirrorEditEnabled) {
      cancelPreviewMirrorEdit();
      return undefined;
    }
    const root = containerRef.current;
    if (!root) return undefined;

    return attachPreviewMirrorEdit(root, {
      // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      getPreviewRoot: () => root.querySelector('.md-editor-preview'),
      getView: () => {
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        const api = editorRef.current?.value ?? editorRef.current;
        return api?.getEditorView?.();
      },
      isEnabled: () => mirrorEditEnabled,
    });
  }, [previewOnly, mirrorEditEnabled, safariMdEditor]);

  useEffect(() => {
    const root = containerRef.current;
    // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
    const previewRoot = root?.querySelector('.md-editor-preview');
    abandonDetachedPreviewMirrorEdit();
    if (!previewRoot) return;

    // Preview HTML rebuilds with `value`; re-follow caret after DOM settles.
    // @ts-expect-error TS(2339): Property 'schedule' does not exist on type 'never'... Remove this comment to see the full error message
    previewScrollFollowRef.current?.schedule({ withRetries: true });

    if (safariMdEditor) return;

    if (mirrorEditEnabled && !isMirrorEditActiveIn(previewRoot)) {
      // @ts-expect-error TS(2339): Property 'schedule' does not exist on type 'never'... Remove this comment to see the full error message
      mirrorEditRemirrorRef.current?.schedule({ withRetries: true });
      return;
    }

    if (!mirrorEditEnabled) clearPreviewSelectionMirror(previewRoot);
  }, [value, currentFile?.id, mirrorEditEnabled, safariMdEditor]);

  useEffect(() => {
    if (previewOnly) return;
    const registerPasteHandler = () => {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      if (!api?.domEventHandlers) return false;
      api.domEventHandlers({
        paste: (e: any, view: any) => {
          const clipboardData = e.clipboardData;
          if (!clipboardData || !view) return;

          const imageFiles = collectClipboardImageFiles(clipboardData);

          if (imageFiles.length && typeof onUploadImage === 'function') {
            if (isUploadingEditorImage) {
              e.preventDefault();
              return false;
            }
            e.preventDefault();
            const pasteView = view;
            onUploadImage(imageFiles).then((paths: any) => {
              if (!paths?.length) return;
              const markdown = paths.map((p: any) => `![[${p}]]`).join('\n');
              // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
              const api2 = editorRef.current?.value ?? editorRef.current;
              const v = api2?.getEditorView?.() ?? pasteView;
              if (v) v.dispatch(v.state.replaceSelection(markdown));
            });
            return false;
          }

          const text = clipboardData.getData('text/plain') ?? '';
          if (text) {
            e.preventDefault();
            view.dispatch(view.state.replaceSelection(text));
            return false;
          }
        },
        keydown: (e: any, view: any) => {
          if (!view) return;

          if (!view.composing && isInlineCodeFenceTriggerKey(e)) {
            const wrapped = wrapSelectionWithInlineCode(view);
            if (wrapped) {
              e.preventDefault();
              e.stopPropagation();
              // CodeMirror: handled event must return true so later handlers / default are skipped
              return true;
            }
          }

          if (!view.composing && wrapSelectionWithPairIfTriggerKey(view, e)) {
            e.preventDefault();
            e.stopPropagation();
            return true;
          }

          const keyCombo = getKeyComboFromEvent(e);
          if (!keyCombo) return;

          if (keyCombo === 'mod+shift+enter') {
            e.preventDefault();
            e.stopPropagation();
            insertLineAboveInEditorView(view);
            return false;
          }

          if (keyCombo === 'mod+s') return;

          const config = snippetConfigRef.current;
          const snippets = config?.snippets || [];
          const normalizedCombo = normalizeShortcutForMatch(keyCombo);
          const entry = snippets.find(
            // @ts-expect-error TS(7006): Parameter 's' implicitly has an 'any' type.
            (s) => normalizeShortcutForMatch(s.prefix) === normalizedCombo && (s.body || '').trim(),
          );
          if (entry) {
            e.preventDefault();
            e.stopPropagation();
            view.dispatch(view.state.replaceSelection(entry.body));
            return false;
          }
        },
      });
      return true;
    };
    if (!registerPasteHandler()) {
      const id = setTimeout(registerPasteHandler, 100);
      return () => clearTimeout(id);
    }
  }, [previewOnly, onUploadImage, isUploadingEditorImage]);

  // ??? ???? ??? ?? ???(cmd+[, cmd+] ?)?? ?? ??: document ??? ??? ??
  useEffect(() => {
    if (previewOnly) return;
    const handleKeyDownCapture = (e: any) => {
      const keyCombo = getKeyComboFromEvent(e);
      if (!keyCombo || keyCombo === 'mod+s') return;
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;
      const container = containerRef.current;
      const target = e.target;
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (!container?.contains(target) && !view.dom?.contains(target)) return;

      const config = snippetConfigRef.current;
      const snippets = config?.snippets || [];
      const normalizedCombo = normalizeShortcutForMatch(keyCombo);
      const entry = snippets.find(
        // @ts-expect-error TS(7006): Parameter 's' implicitly has an 'any' type.
        (s) => normalizeShortcutForMatch(s.prefix) === normalizedCombo && (s.body || '').trim(),
      );
      if (!entry) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();
      view.dispatch(view.state.replaceSelection(entry.body));
    };
    document.addEventListener('keydown', handleKeyDownCapture, true);
    return () => document.removeEventListener('keydown', handleKeyDownCapture, true);
  }, [previewOnly, snippetConfig]);

  useEffect(() => {
    if (typeof onSave !== 'function') return undefined;
    const handleKeyDown = (e: any) => {
      if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
      if (e.key !== 's' && e.key !== 'S' && e.code !== 'KeyS') return;

      const root = containerRef.current;
      if (!root) return;

      const target = e.target;
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      const inEditor = target instanceof Node && root.contains(target);
      // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const previewRoot = root.querySelector('.md-editor-preview');
      const sel = window.getSelection?.();
      const selInPreview = Boolean(
        previewRoot
        && sel?.rangeCount
        && previewRoot.contains(sel.getRangeAt(0).commonAncestorContainer),
      );
      if (!inEditor && !selInPreview && !isMirrorEditActiveIn(previewRoot)) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();

      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      commitPreviewMirrorEdit(view);
      onSave();
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [onSave]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const onContextMenu = (event: any) => {
      // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const previewRoot = root.querySelector('.md-editor-preview');

      // Preview tables: PreviewTableContextMenu owns the menu.
      const table = event.target?.closest?.('table');
      if (table && previewRoot && previewRoot.contains(table)) return;

      if (
        previewRoot
        && (isPointInLivePreviewSelection(previewRoot, event.clientX, event.clientY)
          || isPointInMirroredPreviewSelection(event.clientX, event.clientY))
      ) {
        return;
      }

      // Editor (CodeMirror) selection in a GFM / haim-table block
      const cm = event.target?.closest?.('.cm-editor');
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (cm && root.contains(cm)) {
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        const api = editorRef.current?.value ?? editorRef.current;
        const view = api?.getEditorView?.();
        if (view) {
          const { from, to } = view.state.selection.main;
          const md = valueRef.current ?? '';
          const block = findHaimTableBlockAt(md, from, to);
          if (block) {
            event.preventDefault();
            openHaimTableEditRef.current(from, to);
            return;
          }
        }
      }

      const img = event.target?.closest?.('img[data-wiki-path], img[data-md-src]');
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (!img || !root.contains(img)) return;
      const attrs = getResizableImageAttrsFromElement(img);
      if (!attrs.kind || !attrs.key) return;
      event.preventDefault();
      const occurrence =
        attrs.kind === 'wiki'
          ? getWikiImageOccurrenceInContainer(root, img, attrs.key)
          : getMarkdownImageOccurrenceInContainer(root, img, attrs.key);
      setWikiImageModalState({
        // @ts-expect-error TS(2345): Argument of type '{ kind: string; key: any; width:... Remove this comment to see the full error message
        kind: attrs.kind,
        key: attrs.key,
        width: attrs.width,
        height: attrs.height,
        occurrence,
        imageSrc: img.currentSrc || img.src || '',
      });
    };
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('contextmenu', onContextMenu);
    // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, [showAlert]);

  // Double-click preview table ? table editor (mirror-edit already ignores tables).
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const onDblClick = (event: any) => {
      if (
        event.target?.closest?.(
          '[data-haim-table-resize-handle], [data-haim-table-resize-overlay]',
        )
      ) {
        return;
      }
      // @ts-expect-error TS(2339): Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const previewRoot = root.querySelector('.md-editor-preview');
      const table = event.target?.closest?.('table');
      if (!table || !previewRoot || !previewRoot.contains(table)) return;

      event.preventDefault();
      event.stopPropagation();
      const opened = openHaimTablePreviewRef.current(table, previewRoot);
      if (!opened) {
        showAlert({
          title: 'No table',
          message: 'No haim-table found at this position. Click inside a table cell and try again.',
        });
      }
    };

    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('dblclick', onDblClick, true);
    // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
    return () => root.removeEventListener('dblclick', onDblClick, true);
  }, [showAlert]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    return bindPreviewFootnoteClick(root);
  }, []);

  useEffect(() => {
    const onFootnotesSourcesChanged = () => {
      setPreviewFootnotesRenderKey((k) => k + 1);
    };
    window.addEventListener(FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT, onFootnotesSourcesChanged);
    return () => {
      window.removeEventListener(FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT, onFootnotesSourcesChanged);
    };
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const onCoverPlaceholderActivate = (coverPlaceholder: any) => {
      // Auto-loaded cover (or empty): open Export cover editor confirm.
      if (
        coverPlaceholder.classList.contains('md-note-cover-placeholder--ready')
        || coverPlaceholder.classList.contains('md-note-cover-placeholder--empty')
        || coverPlaceholder.classList.contains('md-note-cover-placeholder--pending')
      ) {
        setCoverExportConfirmOpen(true);
      }
    };

    const onClick = (event: any) => {
      const coverPlaceholder = event.target?.closest?.('[data-note-cover-placeholder]');
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (coverPlaceholder && root.contains(coverPlaceholder)) {
        event.preventDefault();
        event.stopPropagation();
        onCoverPlaceholderActivate(coverPlaceholder);
        return;
      }

      const card = event.target?.closest?.('[data-chat-saved-note]');
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (card && root.contains(card)) {
        event.preventDefault();
        event.stopPropagation();
        navigate(
          chatSavedNoteLinkTo({
            id: card.getAttribute('data-chat-id') || '',
            href: card.getAttribute('data-chat-href') || card.getAttribute('href') || '',
          }) as any,
        );
        return;
      }

      const anchor = event.target?.closest?.('a[href]');
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (!anchor || !root.contains(anchor)) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof event.button === 'number' && event.button !== 0) return;
      // Footnote in-preview nav is handled by bindPreviewFootnoteClick (capture).
      if (anchor.hasAttribute('data-md-footnote-to')) return;

      const href = anchor.getAttribute('href') || '';
      const resolved = resolvePreviewHref(href, {
        currentViewPath: currentFile?.type ? currentFile.id : null,
      });
      if (resolved.kind !== 'app') return;

      event.preventDefault();
      event.stopPropagation();
      if (resolved.viewPath && typeof onOpenViewPath === 'function') {
        onOpenViewPath(resolved.viewPath);
        return;
      }
      const search = resolved.search || '';
      const hash = resolved.hash || '';
      navigate(`${resolved.pathname || '/'}${search}${hash}`);
    };

    const onKeyDown = (event: any) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const coverPlaceholder = event.target?.closest?.('[data-note-cover-placeholder]');
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (!coverPlaceholder || !root.contains(coverPlaceholder)) return;
      event.preventDefault();
      event.stopPropagation();
      onCoverPlaceholderActivate(coverPlaceholder);
    };

    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('click', onClick);
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    root.addEventListener('keydown', onKeyDown);
    return () => {
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('click', onClick);
      // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
      root.removeEventListener('keydown', onKeyDown);
    };
  }, [navigate, currentFile?.id, currentFile?.type, onOpenViewPath]);

  const handleApplyWikiImageSize = useCallback(
    ({
      width,
      height
    }: any) => {
      const modal = wikiImageModalState;
      // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
      if (!modal?.key || typeof onChangeWithUndoHistory !== 'function') return;
      const next =
        // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
        modal.kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(value, {
              // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
              path: modal.key,
              // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
              occurrence: modal.occurrence ?? 0,
              width,
              height,
            })
          : updateMarkdownImageSizeInMarkdown(value, {
              // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
              src: modal.key,
              // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
              occurrence: modal.occurrence ?? 0,
              width,
              height,
            });
      if (next.updated && next.markdown !== value) {
        onChangeWithUndoHistory(next.markdown);
      }
    },
    [wikiImageModalState, onChangeWithUndoHistory, value],
  );

  const handleCropWikiImage = useCallback(
    async ({
      file
    }: any) => {
      const modal = wikiImageModalState;
      // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
      if (!modal?.key || typeof onUploadImage !== 'function') {
        throw new Error('Upload handler not available.');
      }
      const paths = await onUploadImage([file]);
      const nextPath = paths?.[0];
      if (!nextPath) {
        throw new Error('Upload succeeded but no path was returned.');
      }
      if (typeof onChangeWithUndoHistory !== 'function') return;
      const next =
        // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
        modal.kind === 'wiki'
          ? updateWikiImagePathInMarkdown(value, {
              // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
              path: modal.key,
              // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
              occurrence: modal.occurrence ?? 0,
              nextPath,
            })
          : replaceMarkdownImageWithWikiPath(value, {
              // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
              src: modal.key,
              // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
              occurrence: modal.occurrence ?? 0,
              nextPath,
            });
      if (next.updated && next.markdown !== value) {
        onChangeWithUndoHistory(next.markdown);
      }
    },
    [onChangeWithUndoHistory, onUploadImage, value, wikiImageModalState],
  );

  const handleConvertMarkdownToWiki = useCallback(
    async ({
      width,
      height
    }: any) => {
      const modal = wikiImageModalState;
      // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
      if (!modal?.key || modal.kind !== 'markdown') {
        throw new Error('Cannot convert: not a markdown image.');
      }
      if (typeof onChangeWithUndoHistory !== 'function') {
        throw new Error('Cannot apply change.');
      }
      const prepared = await prepareMarkdownImageForWikiConvert({
        // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
        markdownSrc: modal.key,
        // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type 'never'... Remove this comment to see the full error message
        displaySrc: modal.imageSrc,
        currentNotePath: currentFile?.id ?? null,
      });
      let nextPath = '';
      if (prepared.mode === 'path') {
        nextPath = prepared.path;
      } else {
        if (typeof onUploadImage !== 'function') {
          throw new Error('Upload handler not available.');
        }
        const paths = await onUploadImage([prepared.file]);
        nextPath = paths?.[0] || '';
        if (!nextPath) {
          throw new Error('Upload succeeded but no path was returned.');
        }
      }
      const next = replaceMarkdownImageWithWikiPath(value, {
        // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
        src: modal.key,
        // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
        occurrence: modal.occurrence ?? 0,
        nextPath,
        width,
        height,
      });
      if (next.updated && next.markdown !== value) {
        onChangeWithUndoHistory(next.markdown);
      }
    },
    [currentFile?.id, onChangeWithUndoHistory, onUploadImage, value, wikiImageModalState],
  );

  const handleConvertToImgbb = useCallback(
    async ({
      width,
      height
    }: any) => {
      const modal = wikiImageModalState;
      // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
      if (!modal?.key || !modal?.kind) {
        throw new Error('Cannot convert: image target is missing.');
      }
      if (typeof onChangeWithUndoHistory !== 'function') {
        throw new Error('Cannot apply change.');
      }
      const apiKey =
        typeof getImgbbApiKey === 'function'
          ? String((await Promise.resolve(getImgbbApiKey())) || '').trim()
          : '';
      if (!apiKey) {
        throw new Error('ImgBB API key is missing. Please add it in settings.');
      }
      const fetchSrc = resolveImgbbFetchSrc({
        // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
        path: modal.key,
        // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type 'never'... Remove this comment to see the full error message
        imageSrc: modal.imageSrc,
      });
      if (!fetchSrc) {
        throw new Error('Cannot determine image source URL for upload.');
      }
      // @ts-expect-error TS(2379): Argument of type '{ apiKey: string; image: string;... Remove this comment to see the full error message
      const uploaded = await uploadImageToImgbb({
        apiKey,
        image: fetchSrc,
        // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
        name: isDataImageUri(modal.key) ? 'image' : undefined,
      });
      const nextUrl = uploaded.url;
      // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
      const occurrence = modal.occurrence ?? 0;
      let nextMarkdown = value;
      const sized =
        // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
        modal.kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(nextMarkdown, {
              // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
              path: modal.key,
              occurrence,
              width,
              height,
            })
          : updateMarkdownImageSizeInMarkdown(nextMarkdown, {
              // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
              src: modal.key,
              occurrence,
              width,
              height,
            });
      if (sized.updated) nextMarkdown = sized.markdown;
      const sidecar = await upsertRemoteImageComment(
        nextMarkdown,
        {
          // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
          kind: modal.kind === 'wiki' ? 'wiki' : 'markdown',
          // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
          key: modal.key,
          occurrence,
        },
        nextUrl,
      );
      if (!sidecar.updated && nextMarkdown === value) {
        throw new Error('ImgBB upload succeeded but markdown could not be updated.');
      }
      onChangeWithUndoHistory(sidecar.markdown);
    },
    [getImgbbApiKey, onChangeWithUndoHistory, value, wikiImageModalState],
  );

  useEffect(() => {
    if (typeof onRegisterConvertAllImagesToWiki !== 'function') return undefined;
    onRegisterConvertAllImagesToWiki(async () => {
      if (previewOnly) {
        throw new Error('Cannot convert images in preview-only mode.');
      }
      if (typeof onChangeWithUndoHistory !== 'function') {
        throw new Error('Cannot apply change.');
      }
      if (!hasStandardMarkdownImages(value)) {
        return { markdown: value, converted: 0, failed: [] };
      }
      const result = await convertAllMarkdownImagesToWiki(value, {
        currentNotePath: currentFile?.id ?? null,
        uploadFiles: async (files) => {
          if (typeof onUploadImage !== 'function') {
            throw new Error('Upload handler not available.');
          }
          return onUploadImage(files);
        },
      });
      if (result.markdown !== value) {
        onChangeWithUndoHistory(result.markdown);
      }
      return result;
    });
    return () => onRegisterConvertAllImagesToWiki(null);
  }, [
    currentFile?.id,
    onChangeWithUndoHistory,
    onRegisterConvertAllImagesToWiki,
    onUploadImage,
    previewOnly,
    value,
  ]);

  const findResizableImageElement = useCallback((target: any) => {
    const root = containerRef.current;
    if (!root || !target?.kind || !target?.key) return null;
    const selector =
      target.kind === 'wiki' ? 'img[data-wiki-path]' : 'img[data-md-src]';
    // @ts-expect-error TS(2339): Property 'querySelectorAll' does not exist on type... Remove this comment to see the full error message
    const images = [...root.querySelectorAll(selector)];
    const matched = images.filter((img) => {
      const key =
        target.kind === 'wiki'
          ? img.getAttribute('data-wiki-path')
          : img.getAttribute('data-md-src');
      return key === target.key;
    });
    return matched[target.occurrence ?? 0] ?? null;
  }, []);

  const applyTransformSizeToMarkdown = useCallback(
    ({
      kind,
      key,
      occurrence,
      widthPx,
      heightPx
    }: any) => {
      if (!key || typeof onChangeWithUndoHistory !== 'function') return false;
      const width = Number.isFinite(widthPx) ? `${Math.round(widthPx)}px` : null;
      const height = Number.isFinite(heightPx) ? `${Math.round(heightPx)}px` : null;
      const next =
        kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(value, { path: key, occurrence, width, height })
          : updateMarkdownImageSizeInMarkdown(value, { src: key, occurrence, width, height });
      if (next.updated && next.markdown !== value) {
        onChangeWithUndoHistory(next.markdown);
        return true;
      }
      return false;
    },
    [onChangeWithUndoHistory, value],
  );

  const startFreeTransform = useCallback(() => {
    const modal = wikiImageModalState;
    // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
    if (!modal?.kind || !modal?.key) return;
    const img = findResizableImageElement(modal);
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const widthPx = Math.max(24, Math.round(rect.width));
    const heightPx = Math.max(24, Math.round(rect.height));
    const next = {
      // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
      kind: modal.kind,
      // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
      key: modal.key,
      // @ts-expect-error TS(2339): Property 'occurrence' does not exist on type 'neve... Remove this comment to see the full error message
      occurrence: modal.occurrence ?? 0,
      widthPx,
      heightPx,
      originalWidthPx: widthPx,
      originalHeightPx: heightPx,
    };
    img.style.width = `${widthPx}px`;
    img.style.height = `${heightPx}px`;
    // @ts-expect-error TS(2322): Type '{ kind: any; key: any; occurrence: any; widt... Remove this comment to see the full error message
    activeTransformRef.current = next;
    // @ts-expect-error TS(2345): Argument of type '{ kind: any; key: any; occurrenc... Remove this comment to see the full error message
    setFreeTransformState(next);
    setFreeTransformConfirmOpen(false);
  }, [findResizableImageElement, wikiImageModalState]);

  useEffect(() => {
    if (!freeTransformState) {
      setFreeTransformOverlayRect(null);
      return undefined;
    }
    const img = findResizableImageElement(freeTransformState);
    if (!img) {
      setFreeTransformState(null);
      setFreeTransformOverlayRect(null);
      return undefined;
    }
    let rafId = 0;
    const updateRect = () => {
      const rect = img.getBoundingClientRect();
      setFreeTransformOverlayRect({
        // @ts-expect-error TS(2345): Argument of type '{ left: any; top: any; width: an... Remove this comment to see the full error message
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
      rafId = requestAnimationFrame(updateRect);
    };
    rafId = requestAnimationFrame(updateRect);
    return () => cancelAnimationFrame(rafId);
  }, [freeTransformState, findResizableImageElement]);

  useEffect(() => {
    if (!freeTransformState) return undefined;
    const target = findResizableImageElement(freeTransformState);
    if (!target) return undefined;

    const onPointerDown = (event: any) => {
      const handle = event.target?.closest?.('[data-transform-handle]');
      if (!handle) return;
      event.preventDefault();
      const dir = handle.getAttribute('data-transform-handle');
      if (!dir) return;
      const isTouchResize = event.pointerType === 'touch';
      const start = activeTransformRef.current || freeTransformState;
      const startX = event.clientX;
      const startY = event.clientY;
      const baseRatio =
        // @ts-expect-error TS(2339): Property 'heightPx' does not exist on type 'never'... Remove this comment to see the full error message
        start.heightPx > 0 ? start.widthPx / start.heightPx : 1;

      const onMove = (moveEvent: any) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        // @ts-expect-error TS(2339): Property 'widthPx' does not exist on type 'never'.
        let width = start.widthPx;
        // @ts-expect-error TS(2339): Property 'heightPx' does not exist on type 'never'... Remove this comment to see the full error message
        let height = start.heightPx;
        // @ts-expect-error TS(2339): Property 'widthPx' does not exist on type 'never'.
        if (dir.includes('e')) width = start.widthPx + dx;
        // @ts-expect-error TS(2339): Property 'widthPx' does not exist on type 'never'.
        if (dir.includes('w')) width = start.widthPx - dx;
        // @ts-expect-error TS(2339): Property 'heightPx' does not exist on type 'never'... Remove this comment to see the full error message
        if (dir.includes('s')) height = start.heightPx + dy;
        // @ts-expect-error TS(2339): Property 'heightPx' does not exist on type 'never'... Remove this comment to see the full error message
        if (dir.includes('n')) height = start.heightPx - dy;
        width = Math.max(24, width);
        height = Math.max(24, height);

        const keepAspect = isTouchResize || moveEvent.shiftKey;
        if (keepAspect) {
          // @ts-expect-error TS(2339): Property 'widthPx' does not exist on type 'never'.
          const widthChangeRate = Math.abs((width - start.widthPx) / Math.max(1, start.widthPx));
          // @ts-expect-error TS(2339): Property 'heightPx' does not exist on type 'never'... Remove this comment to see the full error message
          const heightChangeRate = Math.abs((height - start.heightPx) / Math.max(1, start.heightPx));
          if (widthChangeRate >= heightChangeRate) {
            height = Math.max(24, width / Math.max(0.0001, baseRatio));
          } else {
            width = Math.max(24, height * baseRatio);
          }
        }

        width = Math.max(24, Math.round(width));
        height = Math.max(24, Math.round(height));
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
        const next = { ...(activeTransformRef.current || start), widthPx: width, heightPx: height };
        activeTransformRef.current = next;
        setFreeTransformState(next);
      };
      const onUp = () => {
        document.removeEventListener('pointermove', onMove, true);
        document.removeEventListener('pointerup', onUp, true);
      };
      document.addEventListener('pointermove', onMove, true);
      document.addEventListener('pointerup', onUp, true);
    };

    const onKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setFreeTransformConfirmOpen(true);
      }
    };
    const onPointerDownOutside = (event: any) => {
      const clickedHandle = event.target?.closest?.('[data-transform-handle]');
      const clickedImage = event.target?.closest?.('img[data-wiki-path], img[data-md-src]');
      if (clickedHandle || clickedImage === target) return;
      setFreeTransformConfirmOpen(true);
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDownOutside, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('pointerdown', onPointerDownOutside, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [freeTransformState, findResizableImageElement]);

  const handleConfirmTransformApply = useCallback(() => {
    const active = activeTransformRef.current || freeTransformState;
    if (!active) return;
    applyTransformSizeToMarkdown(active);
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [applyTransformSizeToMarkdown, freeTransformState]);

  const handleConfirmTransformReset = useCallback(() => {
    const active = activeTransformRef.current || freeTransformState;
    if (!active) return;
    const img = findResizableImageElement(active);
    if (img) {
      // @ts-expect-error TS(2339): Property 'originalWidthPx' does not exist on type ... Remove this comment to see the full error message
      img.style.width = `${active.originalWidthPx}px`;
      // @ts-expect-error TS(2339): Property 'originalHeightPx' does not exist on type... Remove this comment to see the full error message
      img.style.height = `${active.originalHeightPx}px`;
    }
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [findResizableImageElement, freeTransformState]);

  const insertMarkdownAtCursor = useCallback((markdown: any) => {
    const text = String(markdown || '');
    if (!text) return;
    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
    const api = editorRef.current?.value ?? editorRef.current;
    if (typeof api?.insert === 'function') {
      api.insert(() => ({
        targetValue: text,
        select: false,
        deviationStart: 0,
        deviationEnd: 0,
      }));
      api.focus?.();
      return;
    }
    const view = api?.getEditorView?.();
    if (!view) return;
    view.dispatch(view.state.replaceSelection(text));
    view.focus?.();
  }, []);

  const handleToolbarImageUpload = useCallback(async (files: any) => {
    if (!files?.length || typeof onUploadImage !== 'function') return;
    if (isUploadingEditorImage) return;
    const paths = await onUploadImage(files);
    if (!paths?.length) return;
    insertMarkdownAtCursor(`${paths.map((p: any) => `![[${p}]]`).join('\n')}\n`);
  }, [insertMarkdownAtCursor, isUploadingEditorImage, onUploadImage]);
  useEffect(() => {
    // @ts-expect-error TS(2322): Type '(files: any) => Promise<void>' is not assign... Remove this comment to see the full error message
    handleToolbarImageUploadRef.current = handleToolbarImageUpload;
  }, [handleToolbarImageUpload]);

  const handleToolbarImageClipConfirm = useCallback(async (file: any) => {
    if (!file || typeof onUploadImage !== 'function') {
      throw new Error('Upload handler not available.');
    }
    const paths = await onUploadImage([file]);
    const nextPath = paths?.[0];
    if (!nextPath) {
      throw new Error('Upload succeeded but no path was returned.');
    }
    insertMarkdownAtCursor(`![[${nextPath}]]\n`);
    setClipCropFile(null);
  }, [insertMarkdownAtCursor, onUploadImage]);

  const openHeadingRemap = useCallback(() => {
    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
    const api = editorRef.current?.value ?? editorRef.current;
    const view = api?.getEditorView?.();
    let snapshot = null;
    if (view) {
      const { from, to } = view.state.selection.main;
      if (from !== to) {
        snapshot = {
          // @ts-expect-error TS(2345): Argument of type '{ from: any; to: any; text: any;... Remove this comment to see the full error message
          from,
          to,
          text: view.state.doc.sliceString(from, to),
        };
      }
    }
    setHeadingRemapSelection(snapshot);
    setHeadingRemapOpen(true);
  }, []);
  useEffect(() => {
    openHeadingRemapRef.current = openHeadingRemap;
  }, [openHeadingRemap]);

  const defToolbars = useMemo(() => [
    <ExportPDF
      key="export-pdf"
      value={value}
      theme={theme}
      currentFile={currentFile}
      language="ko-KR"
    />,
    <MarkdownPageBreakToolbar key="insert-pgbr" editorRef={editorRef} />,
    <MarkdownHeadingRemapToolbar
      key="heading-remap"
      onOpen={openHeadingRemap}
    />,
    <LlmAssistToolbar
      key="llm-assist"
      onOpen={() => {
        setLlmAssistOpen(true);
      }}
    />,
    <ChecklistProgressToolbar
      key="checklist-progress"
      onOpen={() => {
        setChecklistProgressOpen(true);
      }}
    />,
    <TocTitleWrapToolbar
      key="toc-title-wrap"
      checked={wrapTitles}
      onChange={setWrapTitles}
      theme={theme}
    />,
    <Base64ImageFoldToolbar
      key="base64-image-fold"
      checked={foldBase64Images}
      onChange={setFoldBase64Images}
      theme={theme}
    />,
    <EditorAutocompleteToolbar
      key="editor-autocomplete"
      checked={autocompleteEnabled}
      onChange={setAutocompleteEnabled}
      theme={theme}
    />,
    // Keep index 8 stable for `toolbars` (9 = ImageToolbar). Safari hides Mirror Edit.
    safariMdEditor ? null : (
      <MirrorEditToolbar
        key="mirror-edit"
        checked={mirrorEditEnabled}
        onChange={setMirrorEditEnabled}
        theme={theme}
      />
    ),
    <ImageToolbar
      key="image-toolbar"
      disabled={typeof onUploadImage !== 'function'}
      onRequestLink={() => setImageLinkModalOpen(true)}
      onRequestUpload={(files: any) => {
        void handleToolbarImageUpload(files);
      }}
      onRequestClip={(file: any) => setClipCropFile(file)}
    />,
  ], [
    value,
    theme,
    currentFile,
    wrapTitles,
    setWrapTitles,
    foldBase64Images,
    setFoldBase64Images,
    autocompleteEnabled,
    setAutocompleteEnabled,
    safariMdEditor,
    mirrorEditEnabled,
    setMirrorEditEnabled,
    onUploadImage,
    handleToolbarImageUpload,
    openHeadingRemap,
  ]);

  const toolbars = useMemo(() => [
    'bold', 'underline', 'italic', '-',
    'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-',
    // 9 = ImageToolbar (replaces built-in `image` / Cropper.js 1 clip)
    // 8 = MirrorEditToolbar (hidden on Safari)
    'codeRow', 'code', 'link', 9, 'table', 'mermaid', 'katex', 1, 2, 3, 4, '-',
    'revoke', 'next', 0, '=',
    6, 7, ...(safariMdEditor ? [] : [8]), 'pageFullscreen', 'fullscreen', 'previewOnly', 'preview',  'htmlPreview', 
    ...(catalogEl ? [5] : []),
    'catalog',
  ], [catalogEl, safariMdEditor]);

  const onUploadImg = useMemo(() => {
    if (typeof onUploadImage !== 'function') return undefined;
    return async (files: any, callback: any) => {
      if (isUploadingEditorImage) return;
      const paths = await onUploadImage(files);
      if (paths?.length) callback(paths.map((p: any) => `![[${p}]]`));
    };
  }, [onUploadImage, isUploadingEditorImage]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full flex flex-col relative${wrapTitles ? ' toc-titles-wrap' : ''}`}
      style={{ '--md-catalog-width': `${catalogWidth}px`, ...documentFontStyleVars } as any}
    >
      {documentSettings?.webfontCss ? (
        <style data-s3haim-document-webfonts="1">{documentSettings.webfontCss}</style>
      ) : null}
      {catalogHandleBox &&
        createPortal(
          <TocResizeHandle
            handleProps={catalogResizeHandleProps}
            isResizing={catalogResizing}
            visibleOnHover
            label="TOC resize handle"
            style={{
              position: 'fixed',
              // @ts-expect-error TS(2339): Property 'top' does not exist on type 'never'.
              top: catalogHandleBox.top,
              // @ts-expect-error TS(2339): Property 'left' does not exist on type 'never'.
              left: catalogHandleBox.left,
              // @ts-expect-error TS(2339): Property 'height' does not exist on type 'never'.
              height: catalogHandleBox.height,
              bottom: 'auto',
              zIndex: 10003,
            }}
          />,
          document.body,
        )}
      {isUploadingEditorImage && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20"
          aria-live="polite"
        >
          <Loader2 size={16} className="animate-spin shrink-0" />
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span>Uploading image... {Math.max(0, Math.min(100, Math.round(uploadImagePercent)))}%</span>
          {typeof onCancelUploadImage === 'function' && (
            <button
              type="button"
              onClick={onCancelUploadImage}
              className="ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950"
            >
              Cancel
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          )}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      )}
      <MdEditorAny
        key={`footnotes-${previewFootnotesRenderKey}`}
        ref={editorRef}
        id={editorId}
        modelValue={value}
        onChange={onChangeWithUndoHistory}
        mdHeadingId={buildPreviewHeadingId}
        className="h-full! max-h-dvh"
        theme={theme}
        language="ko-KR"
        codeTheme={MD_EDITOR_CODE_THEME}
        customIcon={MD_EDITOR_CUSTOM_ICONS}
        previewOnly={previewOnly}
        noMermaid
        autoDetectCode={true}
        // Built-in scrollAuto uses stale data-line maps + height ratios; images break it.
        // previewScrollFollow: image-aware bidirectional scroll + caret follow.
        scrollAuto={false}
        footers={['markdownTotal']}
        toolbars={toolbars as any}
        defToolbars={defToolbars as any}
        onUploadImg={onUploadImg}
      />
      <MdEditorToolbarTooltips containerRef={containerRef} />
      <PreviewFootnoteTooltips containerRef={containerRef} />
      <WikiImageSizeModal
        key={
          wikiImageModalState
            // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
            ? `${wikiImageModalState.kind}|${wikiImageModalState.key}|${wikiImageModalState.width ?? ''}|${wikiImageModalState.height ?? ''}|${wikiImageModalState.occurrence ?? 0}`
            : 'wiki-image-size-modal'
        }
        isOpen={Boolean(wikiImageModalState)}
        onClose={() => setWikiImageModalState(null)}
        // @ts-expect-error TS(2339): Property 'key' does not exist on type 'never'.
        path={wikiImageModalState?.key ?? ''}
        // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
        kind={wikiImageModalState?.kind ?? 'wiki'}
        // @ts-expect-error TS(2339): Property 'width' does not exist on type 'never'.
        initialWidth={wikiImageModalState?.width ?? ''}
        // @ts-expect-error TS(2339): Property 'height' does not exist on type 'never'.
        initialHeight={wikiImageModalState?.height ?? ''}
        // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type 'never'... Remove this comment to see the full error message
        imageSrc={wikiImageModalState?.imageSrc ?? ''}
        onApply={handleApplyWikiImageSize}
        onStartFreeTransform={startFreeTransform}
        onCrop={handleCropWikiImage}
        onConvertToWiki={handleConvertMarkdownToWiki}
        onConvertToImgbb={handleConvertToImgbb}
      />
      <ImageLinkModal
        isOpen={imageLinkModalOpen}
        onClose={() => setImageLinkModalOpen(false)}
        onConfirm={({
          desc,
          url
        }: any) => {
          const alt = desc || '';
          insertMarkdownAtCursor(`![${alt}](${url})\n`);
        }}
      />
      <FootnoteComposeModal
        isOpen={footnoteComposeOpen}
        onClose={() => setFootnoteComposeOpen(false)}
        onConfirm={({
          line1,
          line2
        }: any) => {
          // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
          const api = editorRef.current?.value ?? editorRef.current;
          const view = api?.getEditorView?.();
          const markdown = view?.state.doc.toString() ?? valueRef.current ?? '';
          const { from, to } = footnoteInsertRangeRef.current;
          const result = insertNewFootnote(markdown, from, to, line1, line2);
          if (view) {
            view.dispatch({
              changes: { from: 0, to: view.state.doc.length, insert: result.next },
              selection: { anchor: result.caret },
              scrollIntoView: true,
            });
            view.focus?.();
          }
          onChangeWithUndoHistoryRef.current?.(result.next);
        }}
      />
      <ImageClipCropModal
        isOpen={Boolean(clipCropFile)}
        file={clipCropFile}
        onClose={() => setClipCropFile(null)}
        onConfirm={handleToolbarImageClipConfirm}
      />
      <TableEditModal
        isOpen={haimTableEdit.isOpen}
        initialMeta={haimTableEdit.editState?.meta ?? null}
        initialGrid={haimTableEdit.editState?.grid ?? { rows: [['']], aligns: [null] }}
        onClose={haimTableEdit.close}
        onSave={haimTableEdit.apply}
      />
      <PreviewTableContextMenu
        containerRef={containerRef}
        getMarkdown={() => valueRef.current ?? ''}
        setMarkdown={(next: any) => {
          if (typeof onChangeWithUndoHistory === 'function') onChangeWithUndoHistory(next);
          else if (typeof onChange === 'function') onChange(next);
        }}
        onEditTable={(table: any, previewRoot: any) => openHaimTablePreviewRef.current(table, previewRoot)}
        onEditFailed={() => {
          showAlert({
            title: '? ??',
            message: '? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???.',
          });
        }}
      />
      <HaimTableBoxResizeLayer
        containerRef={containerRef}
        getMarkdown={() => valueRef.current ?? ''}
        setMarkdown={(next: any) => {
          if (typeof onChangeWithUndoHistory === 'function') onChangeWithUndoHistory(next);
        }}
        enabled={!haimTableEdit.isOpen}
      />
      {freeTransformState && freeTransformOverlayRect && (
        <div
          className="fixed z-70 pointer-events-none border-2 border-blue-500"
          style={{
            // @ts-expect-error TS(2339): Property 'left' does not exist on type 'never'.
            left: `${freeTransformOverlayRect.left}px`,
            // @ts-expect-error TS(2339): Property 'top' does not exist on type 'never'.
            top: `${freeTransformOverlayRect.top}px`,
            // @ts-expect-error TS(2339): Property 'width' does not exist on type 'never'.
            width: `${freeTransformOverlayRect.width}px`,
            // @ts-expect-error TS(2339): Property 'height' does not exist on type 'never'.
            height: `${freeTransformOverlayRect.height}px`,
          }}
        >
          {['nw', 'ne', 'sw', 'se'].map((dir) => (
            <button
              key={dir}
              type="button"
              data-transform-handle={dir}
              className="absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white"
              style={{
                left: dir.includes('w') ? '-7px' : 'auto',
                right: dir.includes('e') ? '-7px' : 'auto',
                top: dir.includes('n') ? '-7px' : 'auto',
                bottom: dir.includes('s') ? '-7px' : 'auto',
                cursor:
                  dir === 'nw' || dir === 'se' ? 'nwse-resize' : 'nesw-resize',
              }}
              aria-label={`transform-${dir}`}
            />
          ))}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      )}
      {freeTransformState && (
        <button
          type="button"
          onClick={() => setFreeTransformConfirmOpen(true)}
          className="fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm"
        >
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="block font-semibold mb-1">Free transform guide</span>
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="block">- Shift + drag: keep aspect ratio / plain drag: ignore ratio</span>
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="block">- Touch drag: keeps aspect ratio</span>
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="block">- Click elsewhere (including this banner): confirm transform</span>
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      )}
      <ConfirmModal
        isOpen={coverExportConfirmOpen}
        title="Cover export"
        message="You need to open the Export PDF page to export the cover. Continue?"
        confirmLabel="Continue"
        cancelLabel="Cancel"
        onConfirm={() => {
          setCoverExportConfirmOpen(false);
          navigateToExportPdf({ openCoverEdit: true });
        }}
        onCancel={() => setCoverExportConfirmOpen(false)}
      />
      <ConfirmModal
        isOpen={freeTransformConfirmOpen}
        title="Save transform"
        message="How would you like to handle the current transform?"
        confirmLabel="Apply"
        cancelLabel="Keep editing"
        discardLabel="Reset transform"
        onConfirm={handleConfirmTransformApply}
        onCancel={() => setFreeTransformConfirmOpen(false)}
        onDiscard={handleConfirmTransformReset}
      />
      <HeadingRemapModal
        isOpen={headingRemapOpen}
        markdown={value}
        // @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'.
        selectedMarkdown={headingRemapSelection?.text ?? ''}
        onClose={() => {
          setHeadingRemapOpen(false);
          setHeadingRemapSelection(null);
        }}
        onApply={(next: any, scope: any) => {
          if (scope === 'selection' && headingRemapSelection) {
            const { from, to } = headingRemapSelection;
            const base = valueRef.current ?? value;
            const spliced = `${base.slice(0, from)}${next}${base.slice(to)}`;
            if (spliced !== base) onChangeWithUndoHistory(spliced);
          } else if (next !== value) {
            onChangeWithUndoHistory(next);
          }
          setHeadingRemapOpen(false);
          setHeadingRemapSelection(null);
        }}
      />
      <LlmAssistModal
        editorRef={editorRef}
        onChange={onChangeWithUndoHistory}
        getMarkdown={() => {
          // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
          const api = editorRef.current?.value ?? editorRef.current;
          const view = api?.getEditorView?.();
          return view?.state?.doc?.toString?.() ?? valueRef.current ?? '';
        }}
        llmProviderProfiles={llmProviderProfiles}
        open={llmAssistOpen}
        onOpenChange={setLlmAssistOpen}
        theme={theme}
      />
      <ChecklistProgressFloatingPanel
        editorRef={editorRef}
        onChange={onChangeWithUndoHistory}
        open={checklistProgressOpen}
        onOpenChange={setChecklistProgressOpen}
      />
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}
