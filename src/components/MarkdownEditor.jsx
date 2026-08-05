import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import TocResizeHandle from '@/components/TocResizeHandle';
import TocTitleWrapToolbar from '@/components/TocTitleWrapToolbar';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { EditorView, drawSelection, lineNumbers, keymap } from '@codemirror/view';
import { EditorSelection, EditorState, Prec } from '@codemirror/state';
import {
  addCursorAbove,
  addCursorBelow,
  cursorCharLeft,
  cursorCharRight,
  cursorLineDown,
  cursorLineUp,
  insertNewline,
} from '@codemirror/commands';
import { insertNewlineContinueMarkupCommand } from '@codemirror/lang-markdown';
import { loadAltVimNavigationEnabled } from '@/utils/altVimNavigationSettings';
import { highlightSelectionMatches, selectNextOccurrence } from '@codemirror/search';
import { Loader2 } from 'lucide-react';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { previewLinkTargetBlankPlugin } from '@/utils/previewLinkTargetBlankMarkdownIt';
import { pageBreakMarkdownItPlugin } from '@/utils/pageBreakMarkdownIt';
import { chatSavedNotePlugin } from '@/utils/chatSavedNoteMarkdownIt';
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
  updateMarkdownImageSizeInMarkdown,
  updateWikiImageSizeInMarkdown,
} from '@/utils/wikiImageSyntax';
import {
  clearPreviewSelectionMirror,
  mirrorCurrentPreviewSelection,
  syncPreviewSelectionToEditor,
} from '@/utils/previewSelectionSync';
import { usePerFileEditorUndoHistory } from '@/hooks/usePerFileEditorUndoHistory';

const DEBUG_WIKI_IMAGE = true;
const MD_EDITOR_TOC_WIDTH_KEY = 's3haim_md_editor_toc_width';
const MD_EDITOR_TOC_DEFAULT_WIDTH = 280;
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

function wrapSelectionWithInlineCode(view) {
  if (!view?.state) return false;
  const selection = view.state.selection?.main;
  if (!selection || selection.empty) return false;
  const selectedText = view.state.doc.sliceString(selection.from, selection.to);
  if (!selectedText) return false;
  let fence = '`';
  while (selectedText.includes(fence)) fence += '`';
  const wrapped = `${fence}${selectedText}${fence}`;
  view.dispatch({
    changes: { from: selection.from, to: selection.to, insert: wrapped },
    selection: {
      anchor: selection.from + fence.length,
      head: selection.from + fence.length + selectedText.length,
    },
  });
  return true;
}

function toggleBoldForSelection(view) {
  if (!view?.state) return false;

  const selection = view.state.selection?.main;
  if (!selection) return false;

  const boldMark = '**';
  const boldMarkLength = boldMark.length;
  const { from, to, empty } = selection;
  const selectedText = view.state.doc.sliceString(from, to);

  if (empty) {
    const inserted = `${boldMark}${boldMark}`;
    view.dispatch({
      changes: { from, to, insert: inserted },
      selection: { anchor: from + boldMarkLength },
    });
    return true;
  }

  // 선택 영역 자체가 **text** 형태면 언래핑
  if (
    selectedText.length >= boldMarkLength * 2 &&
    selectedText.startsWith(boldMark) &&
    selectedText.endsWith(boldMark)
  ) {
    const unwrapped = selectedText.slice(boldMarkLength, -boldMarkLength);
    view.dispatch({
      changes: { from, to, insert: unwrapped },
      selection: {
        anchor: from,
        head: from + unwrapped.length,
      },
    });
    return true;
  }

  // 선택 영역 바깥이 ** | ** 로 감싸져 있으면 언래핑
  const doc = view.state.doc;
  const leftMarkFrom = Math.max(0, from - boldMarkLength);
  const rightMarkTo = Math.min(doc.length, to + boldMarkLength);
  const leftMark = doc.sliceString(leftMarkFrom, from);
  const rightMark = doc.sliceString(to, rightMarkTo);

  if (leftMark === boldMark && rightMark === boldMark) {
    view.dispatch({
      changes: {
        from: leftMarkFrom,
        to: rightMarkTo,
        insert: selectedText,
      },
      selection: {
        anchor: leftMarkFrom,
        head: leftMarkFrom + selectedText.length,
      },
    });
    return true;
  }

  // 그 외에는 볼드 래핑
  const wrapped = `${boldMark}${selectedText}${boldMark}`;
  view.dispatch({
    changes: { from, to, insert: wrapped },
    selection: {
      anchor: from + boldMarkLength,
      head: from + boldMarkLength + selectedText.length,
    },
  });
  return true;
}

const UNORDERED_LIST_LINE_RE = /^(\s*)([-+*])(\s+)(.*)$/;
const ORDERED_LIST_LINE_RE = /^(\s*)(\d+)([.)])(\s+)(.*)$/;
/** GFM task list: `- [ ]` / `- [x]` (also *, +, ordered). */
const TASK_CHECKBOX_LINE_RE = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/;

function toggleListLineMarker(text) {
  const unordered = text.match(UNORDERED_LIST_LINE_RE);
  if (unordered) {
    return `${unordered[1]}1. ${unordered[4]}`;
  }
  const ordered = text.match(ORDERED_LIST_LINE_RE);
  if (ordered) {
    return `${ordered[1]}- ${ordered[5]}`;
  }
  return null;
}

/** Flip `- [ ]` <-> `- [x]` on a single line; null if not a task checkbox line. */
function toggleTaskCheckboxMarker(text) {
  const match = text.match(TASK_CHECKBOX_LINE_RE);
  if (!match) return null;
  const [, prefix, checked, rest] = match;
  const nextChecked = checked === ' ' ? 'x' : ' ';
  return `${prefix}[${nextChecked}]${rest}`;
}

/** Alt+- : unordered (-) <-> ordered (1.) on current or selected list lines. */
function toggleListTypeBetweenUlAndOl(view) {
  if (!view?.state) return false;

  const { state } = view;
  const lineNumbers = new Set();

  for (const range of state.selection.ranges) {
    const fromLine = state.doc.lineAt(range.from).number;
    const toLine = state.doc.lineAt(range.to).number;
    for (let n = fromLine; n <= toLine; n += 1) {
      lineNumbers.add(n);
    }
  }

  const changes = [];
  for (const lineNumber of lineNumbers) {
    const line = state.doc.line(lineNumber);
    const nextText = toggleListLineMarker(line.text);
    if (nextText !== null && nextText !== line.text) {
      changes.push({ from: line.from, to: line.to, insert: nextText });
    }
  }

  if (changes.length === 0) return false;

  view.dispatch({ changes });
  return true;
}

/** Ctrl-Tab: cycle task checkbox checked state on current or selected lines. */
function toggleTaskCheckboxBetweenChecked(view) {
  if (!view?.state) return false;

  const { state } = view;
  const lineNumbers = new Set();

  for (const range of state.selection.ranges) {
    const fromLine = state.doc.lineAt(range.from).number;
    const toLine = state.doc.lineAt(range.to).number;
    for (let n = fromLine; n <= toLine; n += 1) {
      lineNumbers.add(n);
    }
  }

  const changes = [];
  for (const lineNumber of lineNumbers) {
    const line = state.doc.line(lineNumber);
    const nextText = toggleTaskCheckboxMarker(line.text);
    if (nextText !== null && nextText !== line.text) {
      changes.push({ from: line.from, to: line.to, insert: nextText });
    }
  }

  if (changes.length === 0) return false;

  view.dispatch({ changes });
  return true;
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
  },
  codeMirrorExtensions(extensions, { keyBindings }) {
    const nextExtensions = [...extensions].filter(
      (item) => item.type !== 'keymap' && item.type !== 'linkShortener',
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
        mac !== 'cmd-b'
      );
    });

    const multiCursorKeyBindings = [
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
        extension: lineNumbers(),
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
    );

    return nextExtensions;
  },
  markdownItPlugins(plugins) {
    let next = plugins;
    // wiki_image는 @/config/mdEditorConfig에서 전역 등록됨. 여기서는 중복 추가 방지.
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
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const snippetConfigRef = useRef(snippetConfig);
  const { onChange: onChangeWithUndoHistory } = usePerFileEditorUndoHistory({
    currentFile,
    value,
    onChange,
    editorRef,
    enabled: !previewOnly,
  });
  const [llmAssistOpen, setLlmAssistOpen] = useState(false);
  const [checklistProgressOpen, setChecklistProgressOpen] = useState(false);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
  const [freeTransformState, setFreeTransformState] = useState(null);
  const [freeTransformConfirmOpen, setFreeTransformConfirmOpen] = useState(false);
  const [freeTransformOverlayRect, setFreeTransformOverlayRect] = useState(null);
  const [catalogEl, setCatalogEl] = useState(null);
  const [catalogHandleBox, setCatalogHandleBox] = useState(null);
  const activeTransformRef = useRef(null);
  const [wrapTitles, setWrapTitles] = useTocTitleWrap();
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

  // Do not portal into md-editor-rt catalog DOM: that host is reconciled by MdEditor
  // and wipes foreign children. Track geometry and render the handle in our tree.
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !catalogEl) {
      setCatalogHandleBox(null);
      return undefined;
    }

    const updateBox = () => {
      const rootRect = root.getBoundingClientRect();
      const catRect = catalogEl.getBoundingClientRect();
      if (catRect.width <= 0 || catRect.height <= 0) {
        setCatalogHandleBox(null);
        return;
      }
      setCatalogHandleBox({
        top: catRect.top - rootRect.top,
        left: catRect.left - rootRect.left,
        height: catRect.height,
      });
    };

    updateBox();
    const ro = new ResizeObserver(updateBox);
    ro.observe(root);
    ro.observe(catalogEl);
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

  useEffect(() => {
    if (!previewOnly) return;
    const api = editorRef.current?.value ?? editorRef.current;
    api?.togglePreviewOnly?.(true);
  }, [previewOnly]);

  // Preview selection → CodeMirror selection + mirrored highlight on both panes.
  useEffect(() => {
    if (previewOnly) return undefined;
    const root = containerRef.current;
    if (!root) return undefined;

    const getPreviewRoot = () => root.querySelector('.md-editor-preview');

    const shouldIgnoreTarget = (target) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]',
        ),
      );
    };

    const syncFromPreview = () => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      const sel = window.getSelection?.();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      if (!previewRoot.contains(range.commonAncestorContainer)) return;

      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (!view) return;

      if (range.collapsed) {
        clearPreviewSelectionMirror(previewRoot);
      } else {
        mirrorCurrentPreviewSelection(previewRoot);
      }
      syncPreviewSelectionToEditor(view, previewRoot, { focus: true });
    };

    const onMouseDown = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (previewRoot.contains(target)) {
        clearPreviewSelectionMirror(previewRoot);
        return;
      }

      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getEditorView?.();
      if (view?.dom.contains(target)) {
        clearPreviewSelectionMirror(previewRoot);
      }
    };

    const onMouseUp = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      if (shouldIgnoreTarget(e.target)) return;
      requestAnimationFrame(syncFromPreview);
    };

    const onTouchEnd = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) return;
      if (shouldIgnoreTarget(e.target)) return;
      requestAnimationFrame(syncFromPreview);
    };

    // If focus/selection is still on the preview, move editing into CodeMirror.
    // Do not synthesize insertText here — that breaks IME (e.g. Korean).
    const onKeyDownCapture = (e) => {
      const previewRoot = getPreviewRoot();
      if (!previewRoot) return;

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

      if (selInPreview) {
        if (!sel.getRangeAt(0).collapsed) {
          mirrorCurrentPreviewSelection(previewRoot);
        }
        syncPreviewSelectionToEditor(view, previewRoot, { focus: true });
      } else {
        view.focus();
      }
    };

    root.addEventListener('mousedown', onMouseDown);
    root.addEventListener('mouseup', onMouseUp);
    root.addEventListener('touchend', onTouchEnd, { passive: true });
    root.addEventListener('keydown', onKeyDownCapture, true);
    return () => {
      clearPreviewSelectionMirror(getPreviewRoot());
      root.removeEventListener('mousedown', onMouseDown);
      root.removeEventListener('mouseup', onMouseUp);
      root.removeEventListener('touchend', onTouchEnd);
      root.removeEventListener('keydown', onKeyDownCapture, true);
    };
  }, [previewOnly]);

  useEffect(() => {
    const root = containerRef.current;
    const previewRoot = root?.querySelector('.md-editor-preview');
    if (previewRoot) clearPreviewSelectionMirror(previewRoot);
  }, [value, currentFile?.id]);

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
      });
    };
    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const onClick = (event) => {
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
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
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
  ], [value, theme, currentFile, wrapTitles, setWrapTitles]);

  const toolbars = useMemo(() => [
    'bold', 'underline', 'italic', '-',
    'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-',
    'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex', 1, 2, 3, '-',
    'revoke', 'next', 0, '=',
    'pageFullscreen', 'fullscreen', 'previewOnly', 'preview',  'htmlPreview', 'catalog',
    ...(catalogEl ? [4] : []),
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
      {catalogHandleBox && (
        <TocResizeHandle
          handleProps={catalogResizeHandleProps}
          isResizing={catalogResizing}
          visibleOnHover
          label="목차 너비 조절"
          className="z-10003"
          style={{
            top: catalogHandleBox.top,
            left: catalogHandleBox.left,
            height: catalogHandleBox.height,
            bottom: 'auto',
          }}
        />
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
        onApply={handleApplyWikiImageSize}
        onStartFreeTransform={startFreeTransform}
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
