import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { MdEditor, config } from 'md-editor-rt';
// import 'md-editor-rt/lib/style.css';
import "@/styles/md-editor-rt/style.css";
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import LlmAssistModal from '@/components/LlmAssistModal';
import LlmAssistToolbar from '@/components/LlmAssistToolbar';
import ChecklistProgressFloatingPanel from '@/components/ChecklistProgressFloatingPanel';
import ChecklistProgressToolbar from '@/components/ChecklistProgressToolbar';
import ExportPDF from '@/components/ExportPDF';
import MarkdownPageBreakToolbar from '@/components/MarkdownPageBreakToolbar';
import MarkdownHeadingRemapToolbar from '@/components/MarkdownHeadingRemapToolbar';
import HeadingRemapModal from '@/components/modals/HeadingRemapModal';
import TocResizeHandle from '@/components/TocResizeHandle';
import TocTitleWrapToolbar from '@/components/TocTitleWrapToolbar';
import Base64ImageFoldToolbar from '@/components/Base64ImageFoldToolbar';
import EditorAutocompleteToolbar from '@/components/EditorAutocompleteToolbar';
import MirrorEditToolbar from '@/components/MirrorEditToolbar';
import MdEditorToolbarTooltips from '@/components/MdEditorToolbarTooltips';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import {
  EDITOR_ACTION_COMMANDS,
  registerEditorActions,
} from '@/utils/advancedSearch/editorActions';
import { subscribeOpenAdvancedSearch } from '@/utils/advancedSearch/openRequest';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
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
import { loadBase64ImageFoldEnabled } from '@/utils/base64ImageFoldSettings';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
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
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { previewLinkTargetBlankPlugin } from '@/utils/previewLinkTargetBlankMarkdownIt';
import { pageBreakMarkdownItPlugin } from '@/utils/pageBreakMarkdownIt';
import { headingLevelsMarkdownItPlugin } from '@/utils/markdownItHeadingLevels';
import { chatSavedNotePlugin } from '@/utils/chatSavedNoteMarkdownIt';
import { noteCoverPlaceholderMarkdownItPlugin } from '@/utils/noteCoverPlaceholderMarkdownIt';
import { haimTableMarkdownItPlugin } from '@/utils/haimTable/markdownItPlugin';
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
import { enhancePreviewHeadingFolds } from '@/utils/previewHeadingFold';
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
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import {
  hydrateStorageImagesInRoot,
  markdownLikelyHasStorageImages,
} from '@/utils/storageImageHydration';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
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
import {
  clearPreviewSelectionMirror,
  isPointInLivePreviewSelection,
  isPointInMirroredPreviewSelection,
  mirrorCurrentPreviewSelection,
  restoreMirroredPreviewSelection,
  syncPreviewSelectionToEditor,
} from '@/utils/previewSelectionSync';
import {
  attachPreviewMirrorEdit,
  abandonDetachedPreviewMirrorEdit,
  cancelPreviewMirrorEdit,
  isMirrorEditActiveIn,
  isMirrorEditTarget,
} from '@/utils/previewMirrorEdit';
import { setMirrorEditCaretHandler } from '@/utils/mirrorEditCaretBridge';
import {
  scheduleMirrorEditPreviewRemirror,
  startMirrorEditPreviewRemirror,
  stopMirrorEditPreviewRemirror,
} from '@/utils/mirrorEditPreviewRemirror';
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
} from '@/utils/editorMarkdownStyle';

const DEBUG_WIKI_IMAGE = true;
const MD_EDITOR_TOC_WIDTH_KEY = 's3haim_md_editor_toc_width';
const MD_EDITOR_TOC_DEFAULT_WIDTH = 360;
const buildPreviewHeadingId = (arg1, _arg2, arg3) => {
  const fallbackIndex = Number.isInteger(arg3) ? arg3 : 0;
  const objectIndex = typeof arg1 === 'object' && arg1 !== null ? Number(arg1.index) : NaN;
  const index = Number.isInteger(objectIndex) ? objectIndex : fallbackIndex;
  return `md-preview-heading-${index}`;
};

/** Windows: Ctrl, Mac: Cmd 를 mod 로 통일한 키 조합 문자열 반환 (keydown 매칭용) */
function getKeyComboFromEvent(e) {
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

/** 저장된 shortcut 문자열의 ctrl/meta 를 mod 로 정규화 (비교용) */
function normalizeShortcutForMatch(shortcut) {
  if (!shortcut || typeof shortcut !== 'string') return '';
  return shortcut
    .toLowerCase()
    .replace(/\bctrl\b/g, 'mod')
    .replace(/\bmeta\b/g, 'mod')
    .trim();
}

const markdownContinueMarkup = insertNewlineContinueMarkupCommand({ nonTightLists: false });

/** Remove blank line inserted before a new list item (loose-list continuation). */
function collapseEmptyLineBeforeListItem(view) {
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

function markdownEnterSingleNewline(view) {
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

function insertLineAboveInEditorView(view) {
  if (!view?.state) return;
  const head = view.state.selection?.main?.head;
  if (typeof head !== 'number') return;
  const line = view.state.doc.lineAt(head);
  view.dispatch({
    changes: { from: line.from, to: line.from, insert: '\n' },
    selection: { anchor: line.from },
  });
}

/** Mac KO/US 등에서 `·₩·\ 문자 또는 물리 키(Backquote/IntlBackslash)로 인라인 코드 감싸기 시도 */
function isInlineCodeFenceTriggerKey(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key, code } = e;
  if (key === '`' || key === '₩' || key === '\\') return true;
  if (code === 'Backquote' || code === 'IntlBackslash') return true;
  return false;
}

function runAltVimNavigation(view, command) {
  if (!loadAltVimNavigationEnabled()) return false;
  return command(view);
}

const ALT_VIM_NAVIGATION_KEY_BINDINGS = [
  {
    key: 'Alt-h',
    preventDefault: true,
    run: (view) => runAltVimNavigation(view, cursorCharLeft),
  },
  {
    key: 'Alt-j',
    preventDefault: true,
    run: (view) => runAltVimNavigation(view, cursorLineDown),
  },
  {
    key: 'Alt-k',
    preventDefault: true,
    run: (view) => runAltVimNavigation(view, cursorLineUp),
  },
  {
    key: 'Alt-l',
    preventDefault: true,
    run: (view) => runAltVimNavigation(view, cursorCharRight),
  },
];

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
    // Default library value is 500ms; Mirror Edit / dual-pane needs near-instant preview.
    renderDelay: 0,
  },
  codeMirrorExtensions(extensions, { keyBindings }) {
    const nextExtensions = [...extensions].filter(
      (item) =>
        item.type !== 'keymap'
        && item.type !== 'linkShortener'
        && item.type !== 'lineNumbers',
    );

    const baseKeyBindings = (keyBindings || []).filter((binding) => {
      const key = String(binding?.key || '').toLowerCase();
      const mac = String(binding?.mac || '').toLowerCase();
      return (
        key !== 'ctrl-d' &&
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
        !/^cmd-[0-9]$/.test(mac)
      );
    });

    const multiCursorKeyBindings = [
      {
        key: 'ArrowLeft',
        run: (view) => moveCaretSkippingImages(view, -1),
      },
      {
        key: 'ArrowRight',
        run: (view) => moveCaretSkippingImages(view, 1),
      },
      // Ctrl/Alt+Arrow: CM group & syntax motion — keep image markup atomic.
      {
        key: 'Ctrl-ArrowLeft',
        mac: 'Alt-ArrowLeft',
        run: (view) => runMotionSkippingImages(view, -1, cursorGroupLeft),
        shift: (view) => runMotionSkippingImages(view, -1, selectGroupLeft),
      },
      {
        key: 'Ctrl-ArrowRight',
        mac: 'Alt-ArrowRight',
        run: (view) => runMotionSkippingImages(view, 1, cursorGroupRight),
        shift: (view) => runMotionSkippingImages(view, 1, selectGroupRight),
      },
      {
        key: 'Alt-ArrowLeft',
        mac: 'Ctrl-ArrowLeft',
        run: (view) => runMotionSkippingImages(view, -1, cursorSyntaxLeft),
        shift: (view) => runMotionSkippingImages(view, -1, selectSyntaxLeft),
      },
      {
        key: 'Alt-ArrowRight',
        mac: 'Ctrl-ArrowRight',
        run: (view) => runMotionSkippingImages(view, 1, cursorSyntaxRight),
        shift: (view) => runMotionSkippingImages(view, 1, selectSyntaxRight),
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
        run: (view) => {
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
        run: (view) => toggleHeadingForSelection(view, level),
      })),
      {
        key: 'Ctrl-0',
        mac: 'Cmd-0',
        preventDefault: true,
        run: (view) => toggleHeadingForSelection(view, 10),
      },
      {
        any: (view, event) => {
          if ((event.ctrlKey || event.metaKey) && event.altKey && event.code === 'KeyC') {
            return wrapSelectionWithInlineCode(view);
          }
          return false;
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
        extension: EditorView.clickAddsSelectionRange.of((event) => {
          const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
          return event.altKey || (isMac ? event.metaKey : event.ctrlKey);
        }),
      },
      {
        type: 'multiCursorPreview',
        extension: highlightSelectionMatches({
          minSelectionLength: 1,
          maxMatches: 300,
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
        // md-editor-rt re-injects built-in completions; close them when preference is off.
        type: 'autocompleteGate',
        extension: EditorView.updateListener.of((update) => {
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
  markdownItPlugins(plugins) {
    let next = plugins;
    // wiki_image는 @/config/mdEditorConfig에서 전역 등록됨. 여기서는 중복 추가 방지.
    if (!next.some((p) => p.type === 'heading_levels')) {
      next = [...next, { type: 'heading_levels', plugin: headingLevelsMarkdownItPlugin, options: {} }];
    }
    if (!next.some((p) => p.type === 'wiki_image')) {
      next = [...next, { type: 'wiki_image', plugin: wikiImagePlugin, options: {} }];
    }
    if (!next.some((p) => p.type === 'preview_link_target_blank')) {
      next = [...next, { type: 'preview_link_target_blank', plugin: previewLinkTargetBlankPlugin, options: {} }];
    }
    if (!next.some((p) => p.type === 'pgbr')) {
      next = [...next, { type: 'pgbr', plugin: pageBreakMarkdownItPlugin, options: {} }];
    }
    if (!next.some((p) => p.type === 'chat_saved_note')) {
      next = [...next, { type: 'chat_saved_note', plugin: chatSavedNotePlugin, options: {} }];
    }
    if (!next.some((p) => p.type === 'note_cover_placeholder')) {
      next = [
        ...next,
        { type: 'note_cover_placeholder', plugin: noteCoverPlaceholderMarkdownItPlugin, options: {} },
      ];
    }
    if (!next.some((p) => p.type === 'haim_table')) {
      next = [...next, { type: 'haim_table', plugin: haimTableMarkdownItPlugin, options: {} }];
    }
    return next;
  },
});

export default function MarkdownEditor({
  value,
  onChange,
  onSave,
  theme = 'light',
  currentFile = null,
  previewOnly = false,
  onUploadImage,
  isUploadingEditorImage = false,
  uploadImagePercent = 0,
  onCancelUploadImage,
  onResolveWikiImageUrl,
  snippetConfig = { snippets: [] },
  getGeminiApiKey,
  onOpenViewPath,
}) {
  const navigate = useNavigate();
  const { showAlert } = useAlertModal();
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const snippetConfigRef = useRef(snippetConfig);
  const valueRef = useRef(value);
  const currentFileRef = useRef(currentFile);
  const themeRef = useRef(theme);
  const coverIssuesAlertSigRef = useRef('');
  valueRef.current = value;
  currentFileRef.current = currentFile;
  themeRef.current = theme;

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
      title: '표지 데이터 오류',
      message: `표지(note-cover) 데이터에 문제가 있습니다.\n\n${sig}`,
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
  openHaimTableEditRef.current = haimTableEdit.openAtOffset;
  openHaimTablePreviewRef.current = haimTableEdit.openPreviewTable;
  const [llmAssistOpen, setLlmAssistOpen] = useState(false);
  const [headingRemapOpen, setHeadingRemapOpen] = useState(false);
  const [checklistProgressOpen, setChecklistProgressOpen] = useState(false);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
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
  const [mirrorEditEnabled, setMirrorEditEnabled] = useMirrorEdit();

  /** Selection before Advanced Search steals focus (so bold/etc still apply to the prior range). */
  const asSelectionSnapshotRef = useRef(null);

  useEffect(() => {
    if (previewOnly) return undefined;

    const snapshotSelection = () => {
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;
      asSelectionSnapshotRef.current = view.state.selection;
    };

    const onKeyDown = (e) => {
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

    const getApi = () => editorRef.current?.value ?? editorRef.current;

    const restoreSelectionIfNeeded = () => {
      const api = getApi();
      const view = api?.getEditorView?.();
      const snap = asSelectionSnapshotRef.current;
      if (!view || !snap) return;
      view.dispatch({ selection: snap, scrollIntoView: true });
    };

    const runDirective = (direct) => {
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
        handlers[cmd.id] = () => runDirective(cmd.directive);
      }
    }
    handlers['editor-revoke'] = () => {
      restoreSelectionIfNeeded();
      const view = getApi()?.getEditorView?.();
      if (!view) return;
      view.focus();
      undo(view);
    };
    handlers['editor-next'] = () => {
      restoreSelectionIfNeeded();
      const view = getApi()?.getEditorView?.();
      if (!view) return;
      view.focus();
      redo(view);
    };
    handlers['editor-llm-assist'] = () => setLlmAssistOpen(true);
    handlers['editor-export-pdf'] = openExport;
    handlers['editor-pgbr'] = () => {
      restoreSelectionIfNeeded();
      insertPgbr();
    };
    handlers['editor-heading-remap'] = () => setHeadingRemapOpen(true);
    handlers['editor-checklist-progress'] = () => setChecklistProgressOpen(true);
    handlers['editor-table-edit'] = () => {
      restoreSelectionIfNeeded();
      const view = getApi()?.getEditorView?.();
      if (!view) return;
      const { from, to } = view.state.selection.main;
      const opened = openHaimTableEditRef.current(from, to);
      if (!opened) {
        showAlert({
          title: '표 편집',
          message: '커서 또는 선택 영역이 마크다운 표 안에 있어야 합니다.',
        });
      }
    };

    return registerEditorActions(handlers);
  }, [previewOnly, navigateToExportPdf, showAlert]);
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
      const api = editorRef.current?.value ?? editorRef.current;
      api?.toggleCatalog?.(false);
    },
  });

  useEffect(() => {
    snippetConfigRef.current = snippetConfig || { snippets: [] };
  }, [snippetConfig]);

  useEffect(() => {
    const apply = () => {
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return false;
      applyBase64ImageFoldEnabled(view, foldBase64Images);
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
    root.style.setProperty('--md-catalog-width', `${catalogWidth}px`);
  }, [catalogWidth]);

  // MdEditor reconcile wipes foreign catalog children, so overlay the handle on document.body.
  useLayoutEffect(() => {
    if (!catalogEl) {
      setCatalogHandleBox(null);
      return undefined;
    }

    const updateBox = () => {
      const catRect = catalogEl.getBoundingClientRect();
      if (catRect.width <= 0 || catRect.height <= 0) {
        setCatalogHandleBox(null);
        return;
      }
      setCatalogHandleBox({
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

  useEffect(() => {
    if (!onResolveWikiImageUrl || !value) {
      if (DEBUG_WIKI_IMAGE && value && !onResolveWikiImageUrl) {
        console.log('[wiki-image] Hydration: skipped (no onResolveWikiImageUrl)');
      }
      return;
    }

    const runHydration = (attempt = 0) => {
      const root = containerRef.current;
      if (!root) {
        if (DEBUG_WIKI_IMAGE && attempt === 0) console.log('[wiki-image] Hydration: no containerRef.current');
        return;
      }
      const count = hydrateStorageImagesInRoot(root, {
        getPresignedUrl: onResolveWikiImageUrl,
        currentNotePath: currentFile?.id,
      });
      if (count === 0 && markdownLikelyHasStorageImages(value)) {
        if (DEBUG_WIKI_IMAGE) {
          console.log('[wiki-image] Hydration: storage images in markdown but none in DOM yet', {
            attempt: attempt + 1,
          });
        }
      } else if (DEBUG_WIKI_IMAGE) {
        console.log('[wiki-image] Hydration: bound imgs', { count, attempt: attempt + 1 });
      }
    };

    const delays = [100, 350, 700, 1200];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        runHydration(i);
      }, delay)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [value, onResolveWikiImageUrl, currentFile?.id]);

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
      const hosts = root.querySelectorAll('[data-note-cover-mount]');
      if (!hosts.length) return;
      const needs =
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
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !value) return undefined;

    const docKey = getHeadingFoldKeyFromFile(currentFile);
    const collapsedRef = { current: /** @type {string[]} */ ([]) };
    let cancelled = false;
    /** @type {(() => void) | null} */
    let cleanupEnhance = null;

    const run = async () => {
      if (docKey) {
        const saved = await getHeadingFoldCollapsedIds(docKey);
        if (cancelled) return;
        if (saved) collapsedRef.current = saved;
      }
      const preview = container.querySelector('.md-editor-preview');
      if (!preview || cancelled) return;
      cleanupEnhance?.();
      cleanupEnhance = enhancePreviewHeadingFolds(preview, {
        collapsedIds: collapsedRef.current,
        onCollapsedChange: (ids) => {
          collapsedRef.current = ids;
          if (docKey) void saveHeadingFoldCollapsedIds(docKey, ids);
        },
      });
    };

    const delays = [100, 320, 650, 1200];
    const timers = delays.map((delay) => setTimeout(() => { void run(); }, delay));
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      cleanupEnhance?.();
    };
  }, [value, currentFile?.id, currentFile?.type]);

  useEffect(() => {
    if (!previewOnly) return;
    const api = editorRef.current?.value ?? editorRef.current;
    api?.togglePreviewOnly?.(true);
  }, [previewOnly]);

  // Preview selection → CodeMirror selection + mirrored highlight/caret on both panes.
  useEffect(() => {
    if (previewOnly) return undefined;
    const root = containerRef.current;
    if (!root) return undefined;

    const getPreviewRoot = () => root.querySelector('.md-editor-preview');
    const mirrorEditOn = () => mirrorEditEnabled;

    const shouldIgnoreTarget = (target) => {
      if (!(target instanceof Element)) return false;
      if (isMirrorEditTarget(target)) return true;
      return Boolean(
        target.closest(
          'a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]',
        ),
      );
    };

    const syncFromPreview = (eventTarget) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      if (isMirrorEditActiveIn(previewRoot)) return;
      const sel = window.getSelection?.();
      if (!sel || sel.rangeCount === 0) {
        // Empty table cells often cannot host a native selection — still map by target.
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

      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;

      const allowCollapsed = mirrorEditOn();
      if (sel?.rangeCount && previewRoot.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        const range = sel.getRangeAt(0);
        if (allowCollapsed || !range.collapsed) {
          mirrorCurrentPreviewSelection(previewRoot, { allowCollapsed });
        } else {
          clearPreviewSelectionMirror(previewRoot);
        }
      }
      syncPreviewSelectionToEditor(view, previewRoot, {
        focus: true,
        target: eventTarget,
      });
      if (allowCollapsed) {
        markMirrorEditCaretFromPreview();
        scheduleMirrorEditPreviewRemirror({ withRetries: true });
      }
    };

    const isContextMenuMouseDown = (e) => (
      e.button === 2 || (e.button === 0 && e.ctrlKey)
    );

    const restorePreviewSelectionForContextMenu = (e, previewRoot) => {
      if (isPointInLivePreviewSelection(previewRoot, e.clientX, e.clientY)) return true;
      if (!isPointInMirroredPreviewSelection(e.clientX, e.clientY)) return false;
      return restoreMirroredPreviewSelection(previewRoot);
    };

    const onMouseDown = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (previewRoot.contains(target) && isContextMenuMouseDown(e)) {
        restorePreviewSelectionForContextMenu(e, previewRoot);
        return;
      }

      if (previewRoot.contains(target)) {
        if (!isMirrorEditTarget(target) && !mirrorEditOn()) {
          clearPreviewSelectionMirror(previewRoot);
        }
        return;
      }

      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (view?.dom.contains(target)) {
        if (isContextMenuMouseDown(e)) return;
        markMirrorEditCaretFromEditor();
        if (!mirrorEditOn()) clearPreviewSelectionMirror(previewRoot);
      }
    };

    const onContextMenuCapture = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      restorePreviewSelectionForContextMenu(e, previewRoot);
    };

    const onMouseUp = (e) => {
      if (isContextMenuMouseDown(e)) return;
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      if (shouldIgnoreTarget(e.target)) return;
      requestAnimationFrame(() => syncFromPreview(e.target));
    };

    const onTouchEnd = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      if (shouldIgnoreTarget(e.target)) return;
      requestAnimationFrame(() => syncFromPreview(e.target));
    };

    // If focus/selection is still on the preview, move editing into CodeMirror.
    // Do not synthesize insertText here — that breaks IME (e.g. Korean).
    const onKeyDownCapture = (e) => {
      if (isMirrorEditTarget(e.target)) return;
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      if (isMirrorEditActiveIn(previewRoot)) return;

      const target = e.target;
      const focusInPreview =
        target instanceof Node && previewRoot.contains(target);
      const sel = window.getSelection?.();
      const selInPreview =
        sel?.rangeCount > 0
        && previewRoot.contains(sel.getRangeAt(0).commonAncestorContainer);

      if (!focusInPreview && !selInPreview) return;

      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;
      if (view.hasFocus) return;

      const allowCollapsed = mirrorEditOn();
      if (selInPreview) {
        if (allowCollapsed || !sel.getRangeAt(0).collapsed) {
          mirrorCurrentPreviewSelection(previewRoot, { allowCollapsed });
        }
        syncPreviewSelectionToEditor(view, previewRoot, { focus: true });
        if (allowCollapsed) {
          scheduleMirrorEditPreviewRemirror({ withRetries: true });
        }
      } else {
        view.focus();
      }
    };

    root.addEventListener('mousedown', onMouseDown, true);
    root.addEventListener('contextmenu', onContextMenuCapture, true);
    root.addEventListener('mouseup', onMouseUp);
    root.addEventListener('touchend', onTouchEnd, { passive: true });
    root.addEventListener('keydown', onKeyDownCapture, true);
    return () => {
      clearPreviewSelectionMirror(getPreviewRoot());
      root.removeEventListener('mousedown', onMouseDown, true);
      root.removeEventListener('contextmenu', onContextMenuCapture, true);
      root.removeEventListener('mouseup', onMouseUp);
      root.removeEventListener('touchend', onTouchEnd);
      root.removeEventListener('keydown', onKeyDownCapture, true);
    };
  }, [previewOnly, mirrorEditEnabled]);

  // Mirror Edit: keep preview caret/selection aligned while typing in CodeMirror.
  useEffect(() => {
    if (previewOnly || !mirrorEditEnabled) {
      setMirrorEditCaretHandler(null);
      stopMirrorEditPreviewRemirror();
      markMirrorEditCaretFromEditor();
      return undefined;
    }

    const root = containerRef.current;
    startMirrorEditPreviewRemirror({
      getPreviewRoot: () =>
        (root ?? containerRef.current)?.querySelector('.md-editor-preview'),
      getView: () => {
        const api = editorRef.current?.value ?? editorRef.current;
        return api?.getEditorView?.();
      },
    });

    setMirrorEditCaretHandler((_view, update) => {
      scheduleMirrorEditPreviewRemirror({ withRetries: update.docChanged });
    });

    return () => {
      setMirrorEditCaretHandler(null);
      stopMirrorEditPreviewRemirror();
    };
  }, [previewOnly, mirrorEditEnabled]);

  // Mirror Edit: double-click preview block → contentEditable in place.
  useEffect(() => {
    if (previewOnly || !mirrorEditEnabled) {
      cancelPreviewMirrorEdit();
      return undefined;
    }
    const root = containerRef.current;
    if (!root) return undefined;

    return attachPreviewMirrorEdit(root, {
      getPreviewRoot: () => root.querySelector('.md-editor-preview'),
      getView: () => {
        const api = editorRef.current?.value ?? editorRef.current;
        return api?.getEditorView?.();
      },
      isEnabled: () => mirrorEditEnabled,
    });
  }, [previewOnly, mirrorEditEnabled]);

  useEffect(() => {
    const root = containerRef.current;
    const previewRoot = root?.querySelector('.md-editor-preview');
    abandonDetachedPreviewMirrorEdit();
    if (!previewRoot) return;

    if (mirrorEditEnabled && !isMirrorEditActiveIn(previewRoot)) {
      // Preview HTML rebuilds with `value`; remirror after that settles.
      scheduleMirrorEditPreviewRemirror({ withRetries: true });
      return;
    }

    if (!mirrorEditEnabled) clearPreviewSelectionMirror(previewRoot);
  }, [value, currentFile?.id, mirrorEditEnabled]);

  useEffect(() => {
    if (previewOnly) return;
    const registerPasteHandler = () => {
      const api = editorRef.current?.value ?? editorRef.current;
      if (!api?.domEventHandlers) return false;
      api.domEventHandlers({
        paste: (e, view) => {
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
            onUploadImage(imageFiles).then((paths) => {
              if (!paths?.length) return;
              const markdown = paths.map((p) => `![[${p}]]`).join('\n');
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
        keydown: (e, view) => {
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

  // 스니펫 단축키를 에디터 기본 단축키(cmd+[, cmd+] 등)보다 우선 적용: document 캡처로 최우선 처리
  useEffect(() => {
    if (previewOnly) return;
    const handleKeyDownCapture = (e) => {
      const keyCombo = getKeyComboFromEvent(e);
      if (!keyCombo || keyCombo === 'mod+s') return;
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;
      const container = containerRef.current;
      const target = e.target;
      if (!container?.contains(target) && !view.dom?.contains(target)) return;

      const config = snippetConfigRef.current;
      const snippets = config?.snippets || [];
      const normalizedCombo = normalizeShortcutForMatch(keyCombo);
      const entry = snippets.find(
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
    const el = containerRef.current;
    if (!el || typeof onSave !== 'function') return;
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
    };
    el.addEventListener('keydown', handleKeyDown, true);
    return () => el.removeEventListener('keydown', handleKeyDown, true);
  }, [onSave]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const onContextMenu = (event) => {
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
      if (cm && root.contains(cm)) {
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
      if (!img || !root.contains(img)) return;
      const attrs = getResizableImageAttrsFromElement(img);
      if (!attrs.kind || !attrs.key) return;
      event.preventDefault();
      const occurrence =
        attrs.kind === 'wiki'
          ? getWikiImageOccurrenceInContainer(root, img, attrs.key)
          : getMarkdownImageOccurrenceInContainer(root, img, attrs.key);
      setWikiImageModalState({
        kind: attrs.kind,
        key: attrs.key,
        width: attrs.width,
        height: attrs.height,
        occurrence,
        imageSrc: img.currentSrc || img.src || '',
      });
    };
    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, [showAlert]);

  // Double-click preview table → table editor (mirror-edit already ignores tables).
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const onDblClick = (event) => {
      if (
        event.target?.closest?.(
          '[data-haim-table-resize-handle], [data-haim-table-resize-overlay]',
        )
      ) {
        return;
      }
      const previewRoot = root.querySelector('.md-editor-preview');
      const table = event.target?.closest?.('table');
      if (!table || !previewRoot || !previewRoot.contains(table)) return;

      event.preventDefault();
      event.stopPropagation();
      const opened = openHaimTablePreviewRef.current(table, previewRoot);
      if (!opened) {
        showAlert({
          title: '표 편집',
          message: '이 표를 마크다운 표로 찾지 못했습니다. 소스의 파이프 표인지 확인해 주세요.',
        });
      }
    };

    root.addEventListener('dblclick', onDblClick, true);
    return () => root.removeEventListener('dblclick', onDblClick, true);
  }, [showAlert]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const onCoverPlaceholderActivate = (coverPlaceholder) => {
      // Auto-loaded cover (or empty): open Export cover editor confirm.
      if (
        coverPlaceholder.classList.contains('md-note-cover-placeholder--ready')
        || coverPlaceholder.classList.contains('md-note-cover-placeholder--empty')
        || coverPlaceholder.classList.contains('md-note-cover-placeholder--pending')
      ) {
        setCoverExportConfirmOpen(true);
      }
    };

    const onClick = (event) => {
      const coverPlaceholder = event.target?.closest?.('[data-note-cover-placeholder]');
      if (coverPlaceholder && root.contains(coverPlaceholder)) {
        event.preventDefault();
        event.stopPropagation();
        onCoverPlaceholderActivate(coverPlaceholder);
        return;
      }

      const card = event.target?.closest?.('[data-chat-saved-note]');
      if (card && root.contains(card)) {
        event.preventDefault();
        event.stopPropagation();
        navigate(
          chatSavedNoteLinkTo({
            id: card.getAttribute('data-chat-id') || '',
            href: card.getAttribute('data-chat-href') || card.getAttribute('href') || '',
          }),
        );
        return;
      }

      const anchor = event.target?.closest?.('a[href]');
      if (!anchor || !root.contains(anchor)) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof event.button === 'number' && event.button !== 0) return;

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

    const onKeyDown = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const coverPlaceholder = event.target?.closest?.('[data-note-cover-placeholder]');
      if (!coverPlaceholder || !root.contains(coverPlaceholder)) return;
      event.preventDefault();
      event.stopPropagation();
      onCoverPlaceholderActivate(coverPlaceholder);
    };

    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKeyDown);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKeyDown);
    };
  }, [navigate, currentFile?.id, currentFile?.type, onOpenViewPath]);

  const handleApplyWikiImageSize = useCallback(
    ({ width, height }) => {
      const modal = wikiImageModalState;
      if (!modal?.key || typeof onChangeWithUndoHistory !== 'function') return;
      const next =
        modal.kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(value, {
              path: modal.key,
              occurrence: modal.occurrence ?? 0,
              width,
              height,
            })
          : updateMarkdownImageSizeInMarkdown(value, {
              src: modal.key,
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
    async ({ file }) => {
      const modal = wikiImageModalState;
      if (!modal?.key || typeof onUploadImage !== 'function') {
        throw new Error('이미지 업로드를 사용할 수 없습니다.');
      }
      const paths = await onUploadImage([file]);
      const nextPath = paths?.[0];
      if (!nextPath) {
        throw new Error('자른 이미지 업로드에 실패했습니다.');
      }
      if (typeof onChangeWithUndoHistory !== 'function') return;
      const next =
        modal.kind === 'wiki'
          ? updateWikiImagePathInMarkdown(value, {
              path: modal.key,
              occurrence: modal.occurrence ?? 0,
              nextPath,
            })
          : replaceMarkdownImageWithWikiPath(value, {
              src: modal.key,
              occurrence: modal.occurrence ?? 0,
              nextPath,
            });
      if (next.updated && next.markdown !== value) {
        onChangeWithUndoHistory(next.markdown);
      }
    },
    [onChangeWithUndoHistory, onUploadImage, value, wikiImageModalState],
  );

  const findResizableImageElement = useCallback((target) => {
    const root = containerRef.current;
    if (!root || !target?.kind || !target?.key) return null;
    const selector =
      target.kind === 'wiki' ? 'img[data-wiki-path]' : 'img[data-md-src]';
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
    ({ kind, key, occurrence, widthPx, heightPx }) => {
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
    if (!modal?.kind || !modal?.key) return;
    const img = findResizableImageElement(modal);
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const widthPx = Math.max(24, Math.round(rect.width));
    const heightPx = Math.max(24, Math.round(rect.height));
    const next = {
      kind: modal.kind,
      key: modal.key,
      occurrence: modal.occurrence ?? 0,
      widthPx,
      heightPx,
      originalWidthPx: widthPx,
      originalHeightPx: heightPx,
    };
    img.style.width = `${widthPx}px`;
    img.style.height = `${heightPx}px`;
    activeTransformRef.current = next;
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

    const onPointerDown = (event) => {
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
        start.heightPx > 0 ? start.widthPx / start.heightPx : 1;

      const onMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        let width = start.widthPx;
        let height = start.heightPx;
        if (dir.includes('e')) width = start.widthPx + dx;
        if (dir.includes('w')) width = start.widthPx - dx;
        if (dir.includes('s')) height = start.heightPx + dy;
        if (dir.includes('n')) height = start.heightPx - dy;
        width = Math.max(24, width);
        height = Math.max(24, height);

        const keepAspect = isTouchResize || moveEvent.shiftKey;
        if (keepAspect) {
          const widthChangeRate = Math.abs((width - start.widthPx) / Math.max(1, start.widthPx));
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

    const onKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setFreeTransformConfirmOpen(true);
      }
    };
    const onPointerDownOutside = (event) => {
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
      img.style.width = `${active.originalWidthPx}px`;
      img.style.height = `${active.originalHeightPx}px`;
    }
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [findResizableImageElement, freeTransformState]);

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
      onOpen={() => {
        setHeadingRemapOpen(true);
      }}
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
    <MirrorEditToolbar
      key="mirror-edit"
      checked={mirrorEditEnabled}
      onChange={setMirrorEditEnabled}
      theme={theme}
    />,
  ], [value, theme, currentFile, wrapTitles, setWrapTitles, foldBase64Images, setFoldBase64Images, autocompleteEnabled, setAutocompleteEnabled, mirrorEditEnabled, setMirrorEditEnabled]);

  const toolbars = useMemo(() => [
    'bold', 'underline', 'italic', '-',
    'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-',
    'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex', 1, 2, 3, 4, '-',
    'revoke', 'next', 0, '=',
    6, 7, 8, 'pageFullscreen', 'fullscreen', 'previewOnly', 'preview',  'htmlPreview', 'catalog',
    ...(catalogEl ? [5] : []),
  ], [catalogEl]);

  const onUploadImg = useMemo(() => {
    if (typeof onUploadImage !== 'function') return undefined;
    return async (files, callback) => {
      if (isUploadingEditorImage) return;
      const paths = await onUploadImage(files);
      if (paths?.length) callback(paths.map((p) => `![[${p}]]`));
    };
  }, [onUploadImage, isUploadingEditorImage]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full flex flex-col relative${wrapTitles ? ' toc-titles-wrap' : ''}`}
      style={{ '--md-catalog-width': `${catalogWidth}px` }}
    >
      {catalogHandleBox &&
        createPortal(
          <TocResizeHandle
            handleProps={catalogResizeHandleProps}
            isResizing={catalogResizing}
            visibleOnHover
            label="목차 너비 조절"
            style={{
              position: 'fixed',
              top: catalogHandleBox.top,
              left: catalogHandleBox.left,
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
          <span>이미지 업로드 중… {Math.max(0, Math.min(100, Math.round(uploadImagePercent)))}%</span>
          {typeof onCancelUploadImage === 'function' && (
            <button
              type="button"
              onClick={onCancelUploadImage}
              className="ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950"
            >
              취소
            </button>
          )}
        </div>
      )}
      <MdEditor
        ref={editorRef}
        modelValue={value}
        onChange={onChangeWithUndoHistory}
        mdHeadingId={buildPreviewHeadingId}
        className="h-full! max-h-dvh"
        theme={theme}
        language="ko-KR"
        previewOnly={previewOnly}
        autoDetectCode={true}
        toolbars={toolbars}
        defToolbars={defToolbars}
        onUploadImg={onUploadImg}
      />
      <MdEditorToolbarTooltips containerRef={containerRef} />
      <WikiImageSizeModal
        key={
          wikiImageModalState
            ? `${wikiImageModalState.kind}|${wikiImageModalState.key}|${wikiImageModalState.width ?? ''}|${wikiImageModalState.height ?? ''}|${wikiImageModalState.occurrence ?? 0}`
            : 'wiki-image-size-modal'
        }
        isOpen={Boolean(wikiImageModalState)}
        onClose={() => setWikiImageModalState(null)}
        path={wikiImageModalState?.key ?? ''}
        kind={wikiImageModalState?.kind ?? 'wiki'}
        initialWidth={wikiImageModalState?.width ?? ''}
        initialHeight={wikiImageModalState?.height ?? ''}
        imageSrc={wikiImageModalState?.imageSrc ?? ''}
        onApply={handleApplyWikiImageSize}
        onStartFreeTransform={startFreeTransform}
        onCrop={handleCropWikiImage}
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
        setMarkdown={(next) => {
          if (typeof onChangeWithUndoHistory === 'function') onChangeWithUndoHistory(next);
          else if (typeof onChange === 'function') onChange(next);
        }}
        onEditTable={(table, previewRoot) => openHaimTablePreviewRef.current(table, previewRoot)}
        onEditFailed={() => {
          showAlert({
            title: '표 편집',
            message: '이 표를 마크다운 표로 찾지 못했습니다. 소스의 파이프 표인지 확인해 주세요.',
          });
        }}
      />
      <HaimTableBoxResizeLayer
        containerRef={containerRef}
        getMarkdown={() => valueRef.current ?? ''}
        setMarkdown={(next) => {
          if (typeof onChangeWithUndoHistory === 'function') onChangeWithUndoHistory(next);
        }}
        enabled={!haimTableEdit.isOpen}
      />
      {freeTransformState && freeTransformOverlayRect && (
        <div
          className="fixed z-70 pointer-events-none border-2 border-blue-500"
          style={{
            left: `${freeTransformOverlayRect.left}px`,
            top: `${freeTransformOverlayRect.top}px`,
            width: `${freeTransformOverlayRect.width}px`,
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
        </div>
      )}
      {freeTransformState && (
        <button
          type="button"
          onClick={() => setFreeTransformConfirmOpen(true)}
          className="fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm"
        >
          <span className="block font-semibold mb-1">이미지 자유변형 안내</span>
          <span className="block">- Shift + 드래그: 원본 비율 유지 / 일반 드래그: 비율 무시</span>
          <span className="block">- 터치 드래그: 원본 비율 유지</span>
          <span className="block">- 다른 곳 클릭(이 토스트 포함): 변형 완료 확인</span>
        </button>
      )}
      <ConfirmModal
        isOpen={coverExportConfirmOpen}
        title="표지 편집으로 이동"
        message="PDF 내보내기 페이지에서 표지를 확인하고 편집할 수 있습니다. 이동할까요?"
        confirmLabel="이동"
        cancelLabel="취소"
        onConfirm={() => {
          setCoverExportConfirmOpen(false);
          navigateToExportPdf({ openCoverEdit: true });
        }}
        onCancel={() => setCoverExportConfirmOpen(false)}
      />
      <ConfirmModal
        isOpen={freeTransformConfirmOpen}
        title="자유변형 저장"
        message="현재 변형을 어떻게 처리할까요?"
        confirmLabel="적용"
        cancelLabel="계속 수정"
        discardLabel="변형 초기화"
        onConfirm={handleConfirmTransformApply}
        onCancel={() => setFreeTransformConfirmOpen(false)}
        onDiscard={handleConfirmTransformReset}
      />
      <HeadingRemapModal
        isOpen={headingRemapOpen}
        markdown={value}
        onClose={() => setHeadingRemapOpen(false)}
        onApply={(next) => {
          onChangeWithUndoHistory(next);
          setHeadingRemapOpen(false);
        }}
      />
      <LlmAssistModal
        editorRef={editorRef}
        onChange={onChangeWithUndoHistory}
        getGeminiApiKey={getGeminiApiKey ?? (() => '')}
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
    </div>
  );
}
