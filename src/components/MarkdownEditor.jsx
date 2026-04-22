import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
// import 'md-editor-rt/lib/style.css';
import "@/styles/md-editor-rt/style.css";
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import ExportPDF from '@/components/ExportPDF';
import MarkdownPageBreakToolbar from '@/components/MarkdownPageBreakToolbar';
import { lineNumbers, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { addCursorAbove, addCursorBelow } from '@codemirror/commands';
import { highlightSelectionMatches, selectNextOccurrence } from '@codemirror/search';
import { Loader2 } from 'lucide-react';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { previewLinkTargetBlankPlugin } from '@/utils/previewLinkTargetBlankMarkdownIt';
import { pageBreakMarkdownItPlugin } from '@/utils/pageBreakMarkdownIt';
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
import {
  getMarkdownImageOccurrenceInContainer,
  getResizableImageAttrsFromElement,
  getWikiImageOccurrenceInContainer,
  updateMarkdownImageSizeInMarkdown,
  updateWikiImageSizeInMarkdown,
} from '@/utils/wikiImageSyntax';
const DEBUG_WIKI_IMAGE = true;

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

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
  codeMirrorExtensions(extensions, { keyBindings }) {
    const nextExtensions = [...extensions].filter((item) => item.type !== 'keymap');

    const baseKeyBindings = (keyBindings || []).filter((binding) => {
      const key = String(binding?.key || '').toLowerCase();
      const mac = String(binding?.mac || '').toLowerCase();
      return key !== 'ctrl-d' && key !== 'mod-d' && mac !== 'cmd-d';
    });

    const multiCursorKeyBindings = [
      {
        key: 'Ctrl-d',
        mac: 'Cmd-d',
        preventDefault: true,
        run: (view) => {
          selectNextOccurrence(view);
          return true;
        },
      },
      { key: 'Mod-Alt-ArrowUp', run: addCursorAbove },
      { key: 'Mod-Alt-ArrowDown', run: addCursorBelow },
      ...baseKeyBindings,
    ];

    nextExtensions.push(
      {
        type: 'lineNumbers',
        extension: lineNumbers(),
      },
      {
        type: 'allowMultipleSelections',
        extension: EditorState.allowMultipleSelections.of(true),
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
  onResolveWikiImageUrl,
  snippetConfig = { snippets: [] },
}) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const snippetConfigRef = useRef(snippetConfig);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
  useEffect(() => {
    snippetConfigRef.current = snippetConfig || { snippets: [] };
  }, [snippetConfig]);

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
      let imgs = root.querySelectorAll('img[data-wiki-path]');
      if (imgs.length === 0) {
        const inDoc = document.querySelectorAll('img[data-wiki-path]');
        if (inDoc.length > 0) {
          if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: imgs found in document but not in containerRef, using document');
          imgs = inDoc;
        } else if (/!\[\[/.test(value)) {
          if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: value contains ![[ but no img[data-wiki-path] in DOM (attempt ' + (attempt + 1) + ', will retry)');
          return;
        }
      }
      if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: found imgs', { count: imgs.length, paths: [...imgs].map((el) => el.getAttribute('data-wiki-path')), attempt: attempt + 1 });
      const MAX_RETRIES = 1;
      imgs.forEach((img) => {
        const path = img.getAttribute('data-wiki-path');
        if (!path) return;
        let retryCount = 0;
        const setSrc = (url) => {
          if (url) img.src = url;
          else if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: setSrc skipped (no url)', { path });
        };
        const loadWithFreshUrl = () => {
          if (retryCount >= MAX_RETRIES) {
            if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: onerror max retries reached', { path });
            return;
          }
          retryCount += 1;
          if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: onerror retry (skipCache)', { path, retryCount });
          resolveWikiImageUrl(path, onResolveWikiImageUrl, { skipCache: true }).then((url) => {
            if (url) setSrc(url);
          });
        };
        img.onerror = loadWithFreshUrl;
        resolveWikiImageUrl(path, onResolveWikiImageUrl).then((url) => {
          if (url) setSrc(url);
          else if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] Hydration: no url resolved', { path });
        });
      });
    };

    const delays = [100, 350, 700, 1200];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        runHydration(i);
      }, delay)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [value, onResolveWikiImageUrl]);

  useEffect(() => {
    if (!previewOnly) return;
    const api = editorRef.current?.value ?? editorRef.current;
    api?.togglePreviewOnly?.(true);
  }, [previewOnly]);

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

  const handleApplyWikiImageSize = useCallback(
    ({ width, height }) => {
      const modal = wikiImageModalState;
      if (!modal?.key || typeof onChange !== 'function') return;
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
        onChange(next.markdown);
      }
    },
    [wikiImageModalState, onChange, value],
  );

  const defToolbars = useMemo(() => [
    <ExportPDF
      key="export-pdf"
      value={value}
      theme={theme}
      currentFile={currentFile}
      language="ko-KR"
    />,
    <MarkdownPageBreakToolbar key="insert-pgbr" editorRef={editorRef} />,
  ], [value, theme, currentFile]);

  const toolbars = useMemo(() => [
    'bold', 'underline', 'italic', '-',
    'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-',
    'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex', 1, '-',
    'revoke', 'next', 0, '=',
    'pageFullscreen', 'fullscreen', 'previewOnly', 'preview',  'htmlPreview', 'catalog',
  ], []);

  const onUploadImg = useMemo(() => {
    if (typeof onUploadImage !== 'function') return undefined;
    return async (files, callback) => {
      if (isUploadingEditorImage) return;
      const paths = await onUploadImage(files);
      if (paths?.length) callback(paths.map((p) => `![[${p}]]`));
    };
  }, [onUploadImage, isUploadingEditorImage]);

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col relative">
      {isUploadingEditorImage && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20"
          aria-live="polite"
        >
          <Loader2 size={16} className="animate-spin shrink-0" />
          <span>이미지 업로드 중…</span>
        </div>
      )}
      <MdEditor
        ref={editorRef}
        modelValue={value}
        onChange={onChange}
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
      />
    </div>
  );
}
