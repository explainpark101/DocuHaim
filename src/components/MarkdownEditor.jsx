import { useEffect, useMemo, useRef } from 'react';
import { MdEditor, config } from 'md-editor-rt';
// import 'md-editor-rt/lib/style.css';
import "@/styles/md-editor-rt/style.css";
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import ExportPDF from '@/components/ExportPDF';
import { lineNumbers } from '@codemirror/view';
import { Loader2 } from 'lucide-react';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import {
  getCachedWikiImageObjectUrl,
  setCachedWikiImageBlob,
  getCachedWikiImageUrl,
  setCachedWikiImageUrl,
} from '@/utils/wikiImageCacheDb';
import { WIKI_IMAGE_CACHE_MODE_URL } from '@/utils/wikiImageSettings';
import { getWikiImageCacheMode } from '@/utils/wikiImageRuntime';
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
  markdownItPlugins(plugins) {
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
 *   - path에 대한 S3 Pre-signed GET URL을 반환하는 함수
 * @param {{ skipCache?: boolean }} [opts]
 *   - skipCache true면 Blob 캐시를 무시하고 새로 다운로드 (onerror 재시도용)
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
    getPresignedUrl(path).then(async (url) => {
      if (!url) {
        if (DEBUG_WIKI_IMAGE) {
          console.log('[wiki-image] resolveWikiImageUrl: presigned URL was null', { path });
        }
        return null;
      }
      const mode = getWikiImageCacheMode();
      // URL 모드: presigned URL 자체를 캐시에 저장
      if (mode === WIKI_IMAGE_CACHE_MODE_URL) {
        const expiresAt = Date.now() + 3600 * 1000;
        await setCachedWikiImageUrl({ path, url, expiresAt });
        if (DEBUG_WIKI_IMAGE) {
          console.log('[wiki-image] resolveWikiImageUrl: stored presigned URL in cache', { path });
        }
        return url;
      }
      // Blob 모드(기본): presigned URL로 Blob을 받아 IndexedDB에 저장
      try {
        const res = await fetch(url);
        if (!res.ok) {
          if (DEBUG_WIKI_IMAGE) {
            console.log('[wiki-image] resolveWikiImageUrl: fetch failed', { path, status: res.status });
          }
          return null;
        }
        const blob = await res.blob();
        await setCachedWikiImageBlob({ path, blob });
        const objectUrl = URL.createObjectURL(blob);
        if (DEBUG_WIKI_IMAGE) {
          console.log('[wiki-image] resolveWikiImageUrl: fetched & cached blob', { path });
        }
        return objectUrl;
      } catch (err) {
        if (DEBUG_WIKI_IMAGE) {
          console.log('[wiki-image] resolveWikiImageUrl: fetch error', { path, err });
        }
        return null;
      }
    });

  const p = skipCache
    ? (() => {
        if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: skipCache=true, requesting fresh presigned URL', { path, mode: getWikiImageCacheMode() });
        return fetchFresh();
      })()
    : (async () => {
        // 캐시 확인: 모드에 따라 Blob 또는 URL 캐시를 먼저 본다.
        const mode = getWikiImageCacheMode();
        if (mode === WIKI_IMAGE_CACHE_MODE_URL) {
          const cachedUrl = await getCachedWikiImageUrl(path);
          if (cachedUrl) {
            if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: cache hit (url)', { path });
            return cachedUrl;
          }
          if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: cache miss (url), requesting fresh presigned URL', { path });
          return fetchFresh();
        }
        const cachedObjectUrl = await getCachedWikiImageObjectUrl(path);
        if (cachedObjectUrl) {
          if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: cache hit (blob)', { path });
          return cachedObjectUrl;
        }
        if (DEBUG_WIKI_IMAGE) console.log('[wiki-image] resolveWikiImageUrl: cache miss (blob), requesting fresh presigned URL', { path });
        return fetchFresh();
      })();
  inFlight.set(inFlightKey, p);
  p.finally(() => { inFlight.delete(inFlightKey); });
  return p;
}

export default function MarkdownEditor({
  value,
  onChange,
  onSave,
  theme = 'light',
  previewOnly = false,
  onUploadImage,
  isUploadingEditorImage = false,
  onResolveWikiImageUrl,
  snippetConfig = { snippets: [] },
}) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const snippetConfigRef = useRef(snippetConfig);
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
        keydown: (e, view) => {
          if (!view) return;

          const keyCombo = getKeyComboFromEvent(e);
          if (!keyCombo) return;

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
      const config = snippetConfigRef.current;
      const snippets = config?.snippets || [];
      const normalizedCombo = normalizeShortcutForMatch(keyCombo);
      const entry = snippets.find(
        (s) => normalizeShortcutForMatch(s.prefix) === normalizedCombo && (s.body || '').trim(),
      );
      if (!entry) return;
      const api = editorRef.current?.value ?? editorRef.current;
      const view = api?.getView?.();
      if (!view) return;
      const container = containerRef.current;
      const target = e.target;
      if (!container?.contains(target) && !view.dom?.contains(target)) return;
      e.preventDefault();
      e.stopPropagation();
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

