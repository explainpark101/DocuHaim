import { useEffect, useMemo, useRef } from 'react';
import { MdEditor, config } from 'md-editor-rt';
// import 'md-editor-rt/lib/style.css';
import "@/styles/md-editor-rt/style.css";
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import ExportPDF from '@/components/ExportPDF';
import { lineNumbers } from '@codemirror/view';
import { Loader2 } from 'lucide-react';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { getCachedWikiImageUrl, setCachedWikiImageUrl } from '@/utils/wikiImageCacheDb';

const PRESIGNED_EXPIRES_IN_S = 3600;
const DEBUG_WIKI_IMAGE = true;

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
  codeMirrorExtensions(extensions) {
    return [
      ...extensions,
      {
        type: 'lineNumbers',
        extension: lineNumbers(),
      },
    ];
  },
  markdownItPlugins(plugins, opts) {
    return [
      ...plugins,
      { type: 'wiki_image', plugin: wikiImagePlugin, options: {} },
    ];
  },
});


const inFlight = new Map();

/**
 * @param {string} path
 * @param {(path: string) => Promise<string|null>} getPresignedUrl
 * @param {{ skipCache?: boolean }} [opts] skipCache true면 캐시 무시하고 새 presigned URL 요청 (onerror 재시도용)
 */
function resolveWikiImageUrl(path, getPresignedUrl, opts = {}) {
  if (!path || typeof getPresignedUrl !== 'function') {
    if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: skip (no path or resolver)', { path: !!path, hasResolver: typeof getPresignedUrl === 'function' });
    return Promise.resolve(null);
  }
  const skipCache = opts.skipCache === true;
  const inFlightKey = skipCache ? `${path}:refresh` : path;
  if (inFlight.has(inFlightKey)) {
    if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: reuse in-flight', { path, skipCache });
    return inFlight.get(inFlightKey);
  }
  const fetchFresh = () =>
    getPresignedUrl(path).then((url) => {
      if (url) {
        const expiresAt = Date.now() + PRESIGNED_EXPIRES_IN_S * 1000;
        setCachedWikiImageUrl({ path, url, expiresAt }).catch(() => {});
      } else if (DEBUG_WIKI_IMAGE) {
        console.log('[wiki-image] resolveWikiImageUrl: presigned URL was null', { path });
      }
      return url;
    });

  const p = skipCache
    ? (() => {
        if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: skipCache=true, requesting fresh presigned URL', { path });
        return fetchFresh();
      })()
    : getCachedWikiImageUrl(path).then((cached) => {
        if (cached) {
          if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: cache hit', { path });
          return cached;
        }
        if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: cache miss, requesting presigned URL', { path });
        return fetchFresh();
      });
  inFlight.set(inFlightKey, p);
  p.finally(() => { inFlight.delete(inFlightKey); });
  return p;
}

export default function MarkdownEditor({ value, onChange, onSave, theme = 'light', previewOnly = false, onUploadImage, isUploadingEditorImage = false, onResolveWikiImageUrl }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

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

          const imageFiles = [];
          if (clipboardData.files?.length) {
            for (const f of clipboardData.files) {
              if (f.type?.startsWith('image/')) imageFiles.push(f);
            }
          }
          if (!imageFiles.length && clipboardData.items) {
            for (const item of clipboardData.items) {
              if (item.kind === 'file' && item.type?.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) imageFiles.push(file);
              }
            }
          }

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
              const v = api2?.getView?.() ?? pasteView;
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
      });
      return true;
    };
    if (!registerPasteHandler()) {
      const id = setTimeout(registerPasteHandler, 100);
      return () => clearTimeout(id);
    }
  }, [previewOnly, onUploadImage, isUploadingEditorImage]);

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

  const defToolbars = useMemo(() => [
    <ExportPDF
      key="export-pdf"
      value={value}
      theme={theme}
      language="ko-KR"
    />,
  ], [value, theme]);

  const toolbars = useMemo(() => [
    'bold', 'underline', 'italic', '-',
    'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-',
    'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex', '-',
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
    </div>
  );
}

