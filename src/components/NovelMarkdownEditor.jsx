import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Fragment } from '@tiptap/pm/model';
import TurndownService from 'turndown';
import {
  CharacterCount,
  Color,
  Command,
  CustomKeymap,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  HighlightExtension,
  HorizontalRule,
  ImageResizer,
  Placeholder,
  StarterKit,
  TaskList,
  TiptapLink,
  TiptapUnderline,
  TextStyle,
  UpdatedImage,
  handleCommandNavigation,
  renderItems,
  useEditor,
} from 'novel';
import 'tippy.js/dist/tippy.css';
import { Loader2 } from 'lucide-react';
import { WikiImage } from '@/extensions/wikiImageTiptap';
import { NovelParagraph } from '@/extensions/novelParagraph';
import { NovelTaskItem } from '@/extensions/novelTaskItem';
import {
  markdownToNovelEditorHtml,
  mergeWikiCaptionPairsForTurndown,
  wikiImageWithCaptionBlocksDocFromPaths,
} from '@/utils/wikiImageHtmlInject';
import { buildNovelSlashSuggestionItems } from '@/config/novelSlashSuggestionItems';
import NovelEditorToc, { NOVEL_TOC_MD_PADDING_CLASS } from '@/components/NovelEditorToc';
import { collectClipboardImageFiles } from '@/utils/clipboardImageFiles';
import { dbgClipboard, fileSummaries } from '@/utils/clipboardImageDebug';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { useNavigate } from 'react-router';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import '@/styles/novel-editor.css';

const DEBUG_WIKI_IMAGE = false;

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

turndown.addRule('wikiImageData', {
  filter: (node) => {
    if (node.nodeName !== 'IMG' || !node.getAttribute?.('data-wiki-path')) return false;
    if (node.closest?.('figure.novel-wiki-figure')) return false;
    return true;
  },
  replacement: (_content, node) => {
    const path = node.getAttribute('data-wiki-path');
    return path ? `![[${path}]]` : '';
  },
});

turndown.addRule('wikiFigureCaption', {
  filter: (node) => {
    if (node.nodeName !== 'FIGURE') return false;
    if (!node.classList?.contains('novel-wiki-figure')) return false;
    return Boolean(
      node.querySelector('img[data-wiki-path]') && node.querySelector('figcaption'),
    );
  },
  replacement: (_content, node) => {
    const path = node.querySelector('img[data-wiki-path]')?.getAttribute('data-wiki-path');
    if (!path) return '';
    const cap = node.querySelector('figcaption')?.textContent?.trim() ?? '';
    return cap ? `![[${path}]]\n\n${cap}` : `![[${path}]]`;
  },
});

turndown.addRule('tiptapTaskList', {
  filter: (node) =>
    node.nodeName === 'UL' && node.getAttribute('data-type') === 'taskList',
  replacement: (_content, node) => {
    const items = [...node.querySelectorAll(':scope > li[data-type="taskItem"]')];
    const lines = items.map((li) => {
      const checked = li.getAttribute('data-checked') === 'true';
      const div = li.querySelector(':scope > div');
      let body = '';
      if (div) {
        body = turndown.turndown(div.innerHTML).trim();
      }
      return `${checked ? '- [x]' : '- [ ]'} ${body}`;
    });
    return lines.length ? `${lines.join('\n')}\n\n` : '';
  },
});

/** 부모 taskList 안의 li는 위 규칙에서만 처리 — 기본 listItem·체크박스 잔여 출력 방지 */
turndown.addRule('tiptapTaskItem', {
  filter: (node) =>
    node.nodeName === 'LI' && node.getAttribute('data-type') === 'taskItem',
  replacement: () => '',
});

/**
 * EditorProvider 안에서만 useEditor() 가 유효하다. 부모에서 editorRef 만 쓰면 Vite HMR 등으로
 * 파괴된 에디터를 가리켜 insertContent 가 실제 문서에 반영되지 않을 수 있다.
 */
function NovelImagePasteBridge({
  previewOnly,
  onUploadImage,
  isUploadingEditorImage,
  pasteImageUploadLockRef,
  insertWikiImagesFromPaths,
}) {
  const { editor } = useEditor();

  useEffect(() => {
    if (!editor || editor.isDestroyed || previewOnly || typeof onUploadImage !== 'function') return;
    const dom = editor.view?.dom;
    if (!dom) return;

    const onPasteCapture = (event) => {
      const imageFiles = collectClipboardImageFiles(event.clipboardData);
      dbgClipboard('novel:paste', {
        imageFileCount: imageFiles.length,
        files: fileSummaries(imageFiles),
        lock: pasteImageUploadLockRef.current,
        uploadingProp: isUploadingEditorImage,
      });
      if (!imageFiles.length) return;

      if (pasteImageUploadLockRef.current) {
        dbgClipboard('novel:paste:blocked', { reason: 'pasteImageUploadLockRef' });
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      pasteImageUploadLockRef.current = true;
      Promise.resolve()
        .then(() => onUploadImage(imageFiles))
        .then((paths) => {
          dbgClipboard('novel:paste:uploadResolved', {
            paths,
            pathCount: Array.isArray(paths) ? paths.length : 0,
          });
          insertWikiImagesFromPaths(paths, editor);
        })
        .catch((err) => {
          dbgClipboard('novel:paste:uploadRejected', { message: err?.message ?? String(err) });
        })
        .finally(() => {
          pasteImageUploadLockRef.current = false;
          dbgClipboard('novel:paste:unlock', {});
        });
    };

    dom.addEventListener('paste', onPasteCapture, true);
    return () => dom.removeEventListener('paste', onPasteCapture, true);
  }, [
    editor,
    previewOnly,
    onUploadImage,
    insertWikiImagesFromPaths,
    isUploadingEditorImage,
    pasteImageUploadLockRef,
  ]);

  return null;
}

export default function NovelMarkdownEditor({
  value,
  onChange,
  onSave,
  theme = 'light',
  currentFile = null,
  previewOnly = false,
  /** 상위(EditorPane)에서 목차 패널 표시 여부 */
  tocVisible = true,
  /** 모바일 목차 드로어·백드롭 닫기 */
  onTocRequestClose,
  /** 모바일에서 목차·백드롭이 시작할 뷰포트 상단 오프셋(px) — 상단 크롬 아래 */
  mobileTocOverlayTopPx = null,
  /** 저장 버튼 등에서 디바운스 전에 부모 onChange를 동기 반영하기 위한 플러시 콜백 등록 */
  onRegisterFlushBeforeSave,
  onUploadImage,
  isUploadingEditorImage = false,
  documentKey,
  onResolveWikiImageUrl,
}) {
  const navigate = useNavigate();
  const debounceTimerRef = useRef(null);
  const lastEmittedRef = useRef(null);
  const skipNextUpdateRef = useRef(true);
  const editorRef = useRef(null);
  /** 이미지 붙여넣기 업로드가 끝나기 전 중복 paste·onUploadImage 호출 방지 */
  const pasteImageUploadLockRef = useRef(false);
  const [hydrateTick, setHydrateTick] = useState(0);

  const [initialHtml, setInitialHtml] = useState(() => markdownToNovelEditorHtml(value ?? ''));

  /** `ExportPDF`(md-editor 툴바)와 동일: `/export-pdf` + state `{ value, theme }` */
  const openExportPdfPage = useCallback(
    (editor) => {
      let md = '';
      try {
        const merged = mergeWikiCaptionPairsForTurndown(editor.getHTML());
        md = turndown.turndown(merged);
      } catch {
        md = '';
      }
      setPendingPrintReturnState({ currentFile, editorContent: md });
      navigate('/export-pdf', { state: { value: md, theme } });
    },
    [navigate, theme, currentFile],
  );

  const slashSuggestionItems = useMemo(
    () =>
      buildNovelSlashSuggestionItems({
        onUploadImage,
        onExportPdf: openExportPdfPage,
        onSave,
      }),
    [onUploadImage, openExportPdfPage, onSave],
  );

  useEffect(() => {
    setInitialHtml(markdownToNovelEditorHtml(value ?? ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 문서 전환 시에만 상위 본문을 주입; `value`를 deps에 넣으면 입력할 때마다 에디터가 리셋됨
  }, [documentKey]);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        horizontalRule: false,
        paragraph: false,
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        dropcursor: { color: '#3b82f6', width: 3 },
      }),
      NovelParagraph,
      WikiImage,
      HorizontalRule,
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === 'heading' ? `제목 ${node.attrs.level}` : '내용을 입력하세요…',
        includeChildren: true,
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline underline-offset-2 dark:text-blue-400',
        },
      }),
      UpdatedImage.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg border border-gray-200 dark:border-odp-borderSoft max-w-full',
        },
      }),
      TaskList.configure({
        HTMLAttributes: { class: 'not-prose pl-2' },
      }),
      NovelTaskItem.configure({
        nested: true,
        HTMLAttributes: { class: 'novel-task-item' },
      }),
      HighlightExtension,
      CharacterCount.configure(),
      TiptapUnderline,
      TextStyle,
      Color,
      CustomKeymap,
      Command.configure({
        suggestion: {
          items: () => slashSuggestionItems,
          render: renderItems,
        },
      }),
    ],
    [slashSuggestionItems],
  );

  const emitMarkdown = useCallback(
    (html) => {
      let md = '';
      try {
        const merged = mergeWikiCaptionPairsForTurndown(html);
        md = turndown.turndown(merged);
      } catch {
        md = '';
      }
      if (md === lastEmittedRef.current) return;
      lastEmittedRef.current = md;
      onChange?.(md);
    },
    [onChange],
  );

  const handleUpdate = useCallback(
    ({ editor }) => {
      editorRef.current = editor;
      if (skipNextUpdateRef.current) {
        skipNextUpdateRef.current = false;
        return;
      }
      const html = editor.getHTML();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        emitMarkdown(html);
      }, 200);
      if (html.includes('data-wiki-path')) {
        setHydrateTick((t) => t + 1);
      }
    },
    [emitMarkdown],
  );

  const flushPendingMarkdown = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    const ed = editorRef.current;
    if (!ed || ed.isDestroyed) return;
    emitMarkdown(ed.getHTML());
  }, [emitMarkdown]);

  useEffect(() => {
    if (typeof onRegisterFlushBeforeSave !== 'function') return undefined;
    onRegisterFlushBeforeSave(flushPendingMarkdown);
    return () => onRegisterFlushBeforeSave(null);
  }, [onRegisterFlushBeforeSave, flushPendingMarkdown]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    lastEmittedRef.current = value ?? '';
  }, [documentKey, value]);

  useEffect(() => {
    skipNextUpdateRef.current = true;
  }, [documentKey]);

  const containerRef = useRef(null);

  function docHasWikiImageNode(ed) {
    let found = false;
    ed.state.doc.descendants((node) => {
      if (node.type.name === 'wikiImage') {
        found = true;
        return false;
      }
    });
    return found;
  }

  /**
   * 제목·코드 블록 안 등 커서 위치에서는 블록 삽입이 스키마상 거부될 수 있어, 실패 시 문서 끝에 삽입한다.
   * chain 이 stale 에디터에 걸리면 아무 것도 안 들어가므로, 마지막에 ProseMirror 트랜잭션으로 폴백한다.
   */
  function applyWikiImageBlocksToEditor(ed, blocks) {
    if (!ed || ed.isDestroyed) {
      dbgClipboard('novel:insert:abort', { reason: 'no editor or destroyed' });
      return false;
    }
    dbgClipboard('novel:insert:schema', {
      hasWikiImage: Boolean(ed.schema?.nodes?.wikiImage),
      isEditable: ed.isEditable,
    });

    ed.chain().focus().insertContent(blocks).run();
    let hasWiki = docHasWikiImageNode(ed);
    dbgClipboard('novel:insert:verify', { hasWikiAfterCursor: hasWiki });
    if (!hasWiki) {
      dbgClipboard('novel:insert:fallbackEnd', {});
      ed.chain().focus('end').insertContent(blocks).run();
      hasWiki = docHasWikiImageNode(ed);
      dbgClipboard('novel:insert:verify', { hasWikiAfterEnd: hasWiki });
    }
    if (!hasWiki) {
      dbgClipboard('novel:insert:fallbackManual', {});
      try {
        const nodes = blocks.map((j) => ed.schema.nodeFromJSON(j));
        const frag = Fragment.fromArray(nodes);
        const pos = ed.state.doc.content.size;
        ed.view.dispatch(ed.state.tr.replaceWith(pos, pos, frag));
        hasWiki = docHasWikiImageNode(ed);
        dbgClipboard('novel:insert:verify', { hasWikiAfterManual: hasWiki });
      } catch (e) {
        dbgClipboard('novel:insert:manual:error', { message: e?.message ?? String(e) });
      }
    }
    return hasWiki;
  }

  /** insertContent 직후 DOM에 img 가 있어도 `value` 가 아직 비어 있으면 effect 가 막히므로, 에디터 루트에서 즉시 presigned URL 을 붙인다. */
  const hydrateWikiImagesInEditorDom = useCallback(
    (ed) => {
      const dom = ed?.view?.dom;
      if (!dom || typeof onResolveWikiImageUrl !== 'function') return;
      const imgs = dom.querySelectorAll('img[data-wiki-path]');
      imgs.forEach((img) => {
        const path = img.getAttribute('data-wiki-path');
        if (!path) return;
        let retried = false;
        const setSrc = (url) => {
          if (url) img.src = url;
        };
        img.onerror = () => {
          if (retried) return;
          retried = true;
          resolveWikiImageUrl(path, onResolveWikiImageUrl, { skipCache: true }).then(setSrc);
        };
        resolveWikiImageUrl(path, onResolveWikiImageUrl).then(setSrc);
      });
    },
    [onResolveWikiImageUrl],
  );

  useEffect(() => {
    if (!onResolveWikiImageUrl) {
      if (DEBUG_WIKI_IMAGE && value && !onResolveWikiImageUrl) {
        console.log('[novel wiki-image] hydration skipped (no onResolveWikiImageUrl)');
      }
      return;
    }

    const runHydration = () => {
      const pm =
        editorRef.current?.view?.dom ??
        containerRef.current?.querySelector?.('.ProseMirror') ??
        containerRef.current;
      if (!pm) {
        dbgClipboard('novel:hydrate:skip', { reason: 'no prosemirror root' });
        return;
      }
      let imgs = pm.querySelectorAll('img[data-wiki-path]');
      let usedFallback = false;
      if (imgs.length === 0) {
        const inDoc = document.querySelectorAll('.ProseMirror img[data-wiki-path]');
        if (inDoc.length > 0) {
          imgs = inDoc;
          usedFallback = true;
        } else if (/!\[\[/.test(value ?? '')) {
          dbgClipboard('novel:hydrate:skip', { reason: 'wiki syntax in md but no img in DOM yet' });
          return;
        }
      }
      dbgClipboard('novel:hydrate:run', {
        imgCount: imgs.length,
        usedDocumentFallback: usedFallback,
        hydrateTick,
      });
      const MAX_RETRIES = 1;
      imgs.forEach((img) => {
        const path = img.getAttribute('data-wiki-path');
        if (!path) return;
        let retryCount = 0;
        const setSrc = (url) => {
          if (url) img.src = url;
        };
        const loadWithFreshUrl = () => {
          if (retryCount >= MAX_RETRIES) return;
          retryCount += 1;
          resolveWikiImageUrl(path, onResolveWikiImageUrl, { skipCache: true }).then((url) => {
            dbgClipboard('novel:hydrate:retryUrl', { path, hasUrl: Boolean(url) });
            if (url) setSrc(url);
          });
        };
        img.onerror = loadWithFreshUrl;
        resolveWikiImageUrl(path, onResolveWikiImageUrl).then((url) => {
          dbgClipboard('novel:hydrate:url', {
            path,
            hasUrl: Boolean(url),
            urlLength: url?.length ?? 0,
          });
          if (url) setSrc(url);
        });
      });
    };

    const delays = [80, 200, 450, 900];
    const timers = delays.map((delay) => setTimeout(() => runHydration(), delay));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [value, onResolveWikiImageUrl, hydrateTick]);

  /**
   * 업로드 직후 Tiptap onCreate 직전이면 editorRef 가 비어 있을 수 있어 rAF 로 재시도한다.
   * `editorOverride`: EditorProvider 내부에서 넘긴 살아 있는 에디터 (붙여넣기 권장).
   */
  const insertWikiImagesFromPaths = useCallback((paths, editorOverride) => {
    let list = paths;
    if (!list) {
      dbgClipboard('novel:insert:skip', { reason: 'paths null/undefined' });
      return;
    }
    if (!Array.isArray(list)) {
      list = [list].filter(Boolean);
    }
    if (!list.length) {
      dbgClipboard('novel:insert:skip', { reason: 'empty list', raw: paths });
      return;
    }
    const blocks = wikiImageWithCaptionBlocksDocFromPaths(list);
    if (!blocks.length) {
      dbgClipboard('novel:insert:skip', { reason: 'no doc blocks', list });
      return;
    }

    const runInsert = (ed, label) => {
      if (!ed || ed.isDestroyed) return false;
      dbgClipboard('novel:insert:apply', { mode: label, blockCount: blocks.length });
      applyWikiImageBlocksToEditor(ed, blocks);
      queueMicrotask(() => hydrateWikiImagesInEditorDom(ed));
      setHydrateTick((t) => t + 1);
      return true;
    };

    if (editorOverride) {
      dbgClipboard('novel:insert:start', {
        paths: list,
        hasEditorBeforeRun: true,
        source: 'bridge',
      });
      if (!runInsert(editorOverride, 'bridge')) {
        dbgClipboard('novel:insert:failed', { reason: 'editorOverride destroyed' });
      }
      return;
    }

    let attempts = 0;
    const maxAttempts = 120;
    const run = () => {
      const ed = editorRef.current;
      if (ed && !ed.isDestroyed) {
        dbgClipboard('novel:insert:start', {
          paths: list,
          hasEditorBeforeRun: true,
          source: 'ref',
          attempt: attempts,
        });
        runInsert(ed, 'ref');
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        if (attempts === 1 || attempts % 30 === 0) {
          dbgClipboard('novel:insert:waitEditor', { attempt: attempts, maxAttempts });
        }
        requestAnimationFrame(run);
      } else {
        dbgClipboard('novel:insert:timeout', { attempts: maxAttempts, tryingSetTimeout: true });
        setTimeout(() => {
          const ed2 = editorRef.current;
          if (ed2 && !ed2.isDestroyed) {
            dbgClipboard('novel:insert:apply:delayed', { blockCount: blocks.length });
            runInsert(ed2, 'ref-delayed');
          } else {
            dbgClipboard('novel:insert:failed', { reason: 'editorRef still null after timeout' });
          }
        }, 50);
      }
    };
    dbgClipboard('novel:insert:start', {
      paths: list,
      hasEditorBeforeRun: Boolean(editorRef.current),
      source: 'ref-async',
    });
    run();
  }, [hydrateWikiImagesInEditorDom]);

  const handleDrop = useCallback(
    (_view, event, _slice, moved) => {
      if (moved || previewOnly || isUploadingEditorImage || typeof onUploadImage !== 'function') {
        return false;
      }
      const dt = event.dataTransfer;
      if (!dt) return false;
      const imageFiles = collectClipboardImageFiles(dt);
      if (!imageFiles.length) return false;
      event.preventDefault();
      onUploadImage(imageFiles).then((paths) => insertWikiImagesFromPaths(paths));
      return true;
    },
    [insertWikiImagesFromPaths, isUploadingEditorImage, onUploadImage, previewOnly],
  );

  const surfaceModifier =
    theme === 'dark' ? 'novel-editor-surface novel-editor-surface--dark' : 'novel-editor-surface';

  const editorClass = useMemo(() => {
    const base = `${surfaceModifier} min-h-full w-full max-w-none px-4 py-3 outline-none min-h-[max(12rem,100%)] [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none`;
    return base;
  }, [surfaceModifier]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof onSave !== 'function') return;
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        flushPendingMarkdown();
        onSave();
      }
    };
    el.addEventListener('keydown', handleKeyDown, true);
    return () => el.removeEventListener('keydown', handleKeyDown, true);
  }, [onSave, flushPendingMarkdown]);

  return (
    <div ref={containerRef} className="relative flex h-full min-h-0 w-full flex-1 flex-col">
      {isUploadingEditorImage && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20"
          aria-live="polite"
        >
          <Loader2 size={16} className="animate-spin shrink-0" />
          <span>이미지 업로드 중…</span>
        </div>
      )}
      <EditorRoot key={documentKey ?? 'novel'}>
        <EditorContent
          className="relative flex h-full min-h-0 w-full flex-1 flex-col"
          editorContainerProps={{
            className: [
              'flex min-h-0 flex-1 flex-col overflow-y-auto novel-editor-scroll-area',
              'transition-[padding] duration-300 ease-out motion-reduce:transition-none',
              tocVisible ? NOVEL_TOC_MD_PADDING_CLASS : 'md:pr-0',
            ].join(' '),
          }}
          initialContent={initialHtml}
          extensions={extensions}
          editable={!previewOnly}
          onUpdate={handleUpdate}
          onCreate={({ editor }) => {
            editorRef.current = editor;
          }}
          editorProps={{
            handleDrop,
            handleDOMEvents: {
              keydown: (_view, event) => {
                if (handleCommandNavigation(event)) return true;
                return false;
              },
            },
            attributes: {
              class: editorClass,
            },
          }}
        >
          <NovelEditorToc
            theme={theme}
            open={tocVisible}
            onRequestClose={onTocRequestClose}
            mobileOverlayTopPx={mobileTocOverlayTopPx}
          />
          <NovelImagePasteBridge
            previewOnly={previewOnly}
            onUploadImage={onUploadImage}
            isUploadingEditorImage={isUploadingEditorImage}
            pasteImageUploadLockRef={pasteImageUploadLockRef}
            insertWikiImagesFromPaths={insertWikiImagesFromPaths}
          />
          <EditorCommand
            className="z-50 h-auto max-h-[min(330px,70vh)] w-[min(100%,18rem)] shrink-0 overflow-y-auto rounded-lg border border-gray-200 bg-white px-1 py-2 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface"
          >
            <EditorCommandEmpty className="px-2 py-1.5 text-sm text-gray-500 dark:text-odp-muted">
              결과 없음
            </EditorCommandEmpty>
            <EditorCommandList>
              {slashSuggestionItems.map((item) => (
                <EditorCommandItem
                  key={item.title}
                  value={item.title}
                  keywords={item.searchTerms ?? []}
                  onCommand={(payload) => item.command?.(payload)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100 aria-selected:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-bgSoft dark:aria-selected:bg-odp-bgSoft"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-odp-muted">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
          <ImageResizer />
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
