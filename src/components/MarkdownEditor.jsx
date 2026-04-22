import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
// import 'md-editor-rt/lib/style.css';
import "@/styles/md-editor-rt/style.css";
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import ExportPDF from '@/components/ExportPDF';
import MarkdownPageBreakToolbar from '@/components/MarkdownPageBreakToolbar';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
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
  uploadImagePercent = 0,
  onCancelUploadImage,
  onResolveWikiImageUrl,
  snippetConfig = { snippets: [] },
}) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const snippetConfigRef = useRef(snippetConfig);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
  const [freeTransformState, setFreeTransformState] = useState(null);
  const [freeTransformConfirmOpen, setFreeTransformConfirmOpen] = useState(false);
  const [freeTransformOverlayRect, setFreeTransformOverlayRect] = useState(null);
  const activeTransformRef = useRef(null);
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
      if (!key || typeof onChange !== 'function') return false;
      const width = Number.isFinite(widthPx) ? `${Math.round(widthPx)}px` : null;
      const height = Number.isFinite(heightPx) ? `${Math.round(heightPx)}px` : null;
      const next =
        kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(value, { path: key, occurrence, width, height })
          : updateMarkdownImageSizeInMarkdown(value, { src: key, occurrence, width, height });
      if (next.updated && next.markdown !== value) {
        onChange(next.markdown);
        return true;
      }
      return false;
    },
    [onChange, value],
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
        onChange={onChange}
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
    </div>
  );
}
