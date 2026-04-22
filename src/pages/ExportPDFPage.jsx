import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import { ArrowLeft, ListTree, Settings } from 'lucide-react';
import PrintFontOptionsModal from '@/components/PrintFontOptionsModal';
import { loadPrintFontsFromStorage, DEFAULT_PRINT_FONTS, getPresignedUrlResolver } from '@/utils/printSettingsStore';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
import Modal from '@/components/modals/Modal';
import {
  getMarkdownImageOccurrenceInContainer,
  getResizableImageAttrsFromElement,
  getWikiImageOccurrenceInContainer,
  updateMarkdownImageSizeInMarkdown,
  updateWikiImageSizeInMarkdown,
} from '@/utils/wikiImageSyntax';

const EDITOR_ID = 'export-pdf-preview';

const headingId = ({ index }) => `pdf-ex-heading-${index}`;
const PG_BR_RE = /^<pgbr\s*\/?\s*>$/i;

function isFenceStart(line) {
  return /^\s*(```+|~~~+)/.test(line);
}

function collectHeadingLineIndexes(markdown) {
  const lines = String(markdown ?? '').split('\n');
  const indexes = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (isFenceStart(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^\s{0,3}#{1,6}\s+\S/.test(line)) {
      indexes.push(i);
      continue;
    }
    const next = lines[i + 1] ?? '';
    if (
      line.trim() &&
      /^\s{0,3}(=+|-+)\s*$/.test(next)
    ) {
      indexes.push(i);
    }
  }

  return { lines, indexes };
}

function collectHrLineIndexes(markdown) {
  const lines = String(markdown ?? '').split('\n');
  const indexes = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (isFenceStart(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const t = line.trim();
    if (!t) continue;
    if (/^<hr\b[^>]*\/?>$/i.test(t)) {
      indexes.push(i);
      continue;
    }
    if (/^(\*\s*){3,}$/.test(t) || /^(-\s*){3,}$/.test(t) || /^(_\s*){3,}$/.test(t)) {
      indexes.push(i);
    }
  }

  return { lines, indexes };
}

function insertPgbrBeforeHeading(markdown, headingIndex) {
  if (!Number.isInteger(headingIndex) || headingIndex < 0) {
    return { markdown, updated: false };
  }
  const { lines, indexes } = collectHeadingLineIndexes(markdown);
  const lineIndex = indexes[headingIndex];
  if (!Number.isInteger(lineIndex)) return { markdown, updated: false };

  let prevIdx = lineIndex - 1;
  while (prevIdx >= 0 && !lines[prevIdx].trim()) prevIdx -= 1;
  if (prevIdx >= 0 && PG_BR_RE.test(lines[prevIdx].trim())) {
    return { markdown, updated: false };
  }

  const insertion = ['<pgbr/>', ''];
  if (lineIndex > 0 && lines[lineIndex - 1].trim() !== '') {
    insertion.unshift('');
  }
  lines.splice(lineIndex, 0, ...insertion);
  return { markdown: lines.join('\n'), updated: true };
}

function insertPgbrBeforeHr(markdown, hrIndex) {
  if (!Number.isInteger(hrIndex) || hrIndex < 0) {
    return { markdown, updated: false };
  }
  const { lines, indexes } = collectHrLineIndexes(markdown);
  const lineIndex = indexes[hrIndex];
  if (!Number.isInteger(lineIndex)) return { markdown, updated: false };

  let prevIdx = lineIndex - 1;
  while (prevIdx >= 0 && !lines[prevIdx].trim()) prevIdx -= 1;
  if (prevIdx >= 0 && PG_BR_RE.test(lines[prevIdx].trim())) {
    return { markdown, updated: false };
  }

  const insertion = ['<pgbr/>', ''];
  if (lineIndex > 0 && lines[lineIndex - 1].trim() !== '') {
    insertion.unshift('');
  }
  lines.splice(lineIndex, 0, ...insertion);
  return { markdown: lines.join('\n'), updated: true };
}

function removePgbrByOccurrence(markdown, targetOccurrence) {
  if (!Number.isInteger(targetOccurrence) || targetOccurrence < 0) {
    return { markdown, updated: false };
  }
  const source = String(markdown ?? '');
  const lines = source.split('\n');
  let inFence = false;
  let occurrence = -1;
  let updated = false;

  const nextLines = lines.map((line) => {
    if (isFenceStart(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;
    if (!/<pgbr\s*\/?\s*>/i.test(line)) return line;
    return line.replace(/<pgbr\s*\/?\s*>/gi, (m) => {
      occurrence += 1;
      if (occurrence !== targetOccurrence) return m;
      updated = true;
      return '';
    });
  });

  if (!updated) return { markdown, updated: false };
  return { markdown: nextLines.join('\n'), updated: true };
}

const printFontStyles = `
  #export-pdf-preview,
  #export-pdf-preview .md-editor-preview {
    background: #ffffff;
    color: #111827;
    font-family: var(--print-font-body, inherit);
  }
  #export-pdf-preview .md-editor-preview h1,
  #export-pdf-preview .md-editor-preview h2,
  #export-pdf-preview .md-editor-preview h3,
  #export-pdf-preview .md-editor-preview h4,
  #export-pdf-preview .md-editor-preview h5,
  #export-pdf-preview .md-editor-preview h6 {
    font-family: var(--print-font-heading, inherit);
  }
  #export-pdf-preview .md-editor-preview b,
  #export-pdf-preview .md-editor-preview strong {
    font-family: var(--print-font-bold, inherit);
  }
  #export-pdf-preview .md-editor-preview code,
  #export-pdf-preview .md-editor-preview pre,
  #export-pdf-preview .md-editor-preview .md-editor-code pre,
  #export-pdf-preview .md-editor-preview .md-editor-code pre code {
    font-family: var(--print-font-code, inherit);
  }
  #export-pdf-preview .md-editor-preview figure {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 0 1em;
  }
  #export-pdf-preview .md-editor-preview figure figcaption {
    text-align: left;
  }
  #export-pdf-preview .md-editor-preview .md-pgbr,
  #export-pdf-preview .md-editor-preview hr,
  #export-pdf-preview .md-editor-preview h1,
  #export-pdf-preview .md-editor-preview h2,
  #export-pdf-preview .md-editor-preview h3,
  #export-pdf-preview .md-editor-preview h4,
  #export-pdf-preview .md-editor-preview h5,
  #export-pdf-preview .md-editor-preview h6 {
    cursor: pointer;
  }
  #export-pdf-preview img {
    max-height: 100vh;
    object-fit: contain;
  }
  @media print {
    .export-pdf-preview-scroll {
      overflow: visible !important;
      max-height: none !important;
    }
    .export-pdf-page {
      display: block !important;
      overflow: visible !important;
    }
    #export-pdf-preview .md-editor-preview-wrapper {
      overflow: visible !important;
      max-height: none !important;
    }
  }
`;

export default function ExportPDFPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { value = '', currentFile = null } = location.state ?? {};
  const [previewValue, setPreviewValue] = useState(() => value);
  const [fonts, setFonts] = useState(() => ({ ...DEFAULT_PRINT_FONTS }));
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [tocVisible, setTocVisible] = useState(true);
  const [tocTopPx, setTocTopPx] = useState(0);
  const [tocItems, setTocItems] = useState([]);
  const [visibleHeadingIds, setVisibleHeadingIds] = useState([]);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
  const [headingPgbrModalState, setHeadingPgbrModalState] = useState(null);
  const [hrPgbrModalState, setHrPgbrModalState] = useState(null);
  const [pgbrDeleteModalState, setPgbrDeleteModalState] = useState(null);
  const headerRef = useRef(null);
  const previewContainerRef = useRef(null);
  const tocListRef = useRef(null);
  const tocProgrammaticScrollRef = useRef(false);
  const tocProgrammaticResetTimerRef = useRef(null);
  const tocAutoFollowPausedUntilRef = useRef(0);
  const getPresignedUrl = useMemo(() => getPresignedUrlResolver(), []);

  useWikiImageHydration(previewContainerRef, previewValue, getPresignedUrl ?? undefined);

  useEffect(() => {
    let cancelled = false;
    loadPrintFontsFromStorage().then((loaded) => {
      if (!cancelled) setFonts(loaded);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (location.state == null) {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    setPreviewValue(value);
  }, [value]);

  useEffect(() => {
    const updateTocTop = () => {
      const el = headerRef.current;
      if (!el) {
        setTocTopPx(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      setTocTopPx(Math.max(0, Math.round(rect.bottom)));
    };
    updateTocTop();
    window.addEventListener('resize', updateTocTop);
    window.addEventListener('scroll', updateTocTop, true);
    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      ro = new ResizeObserver(updateTocTop);
      ro.observe(headerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateTocTop);
      window.removeEventListener('scroll', updateTocTop, true);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return undefined;
    const collectItems = () => {
      const headings = [...root.querySelectorAll('#export-pdf-preview .md-editor-preview h1, #export-pdf-preview .md-editor-preview h2, #export-pdf-preview .md-editor-preview h3, #export-pdf-preview .md-editor-preview h4, #export-pdf-preview .md-editor-preview h5, #export-pdf-preview .md-editor-preview h6')];
      const next = headings.map((el, index) => ({
        id: el.id || headingId({ index }),
        level: Number(el.tagName?.slice?.(1)) || 1,
        text: (el.textContent || '').trim() || '(빈 제목)',
      }));
      setTocItems(next);
    };
    const timers = [60, 180, 420].map((delay) => setTimeout(collectItems, delay));
    const observer = new MutationObserver(() => collectItems());
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => {
      timers.forEach((t) => clearTimeout(t));
      observer.disconnect();
    };
  }, [previewValue]);

  useEffect(() => {
    if (!tocItems.length) {
      setVisibleHeadingIds([]);
      return undefined;
    }

    const headingEls = tocItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!headingEls.length) {
      setVisibleHeadingIds([]);
      return undefined;
    }

    const visibleSet = new Set();
    headingEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        visibleSet.add(el.id);
      }
    });
    setVisibleHeadingIds(headingEls.map((el) => el.id).filter((id) => visibleSet.has(id)));

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        entries.forEach((entry) => {
          const id = entry.target?.id;
          if (!id) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            if (!visibleSet.has(id)) {
              visibleSet.add(id);
              changed = true;
            }
          } else if (visibleSet.delete(id)) {
            changed = true;
          }
        });
        if (changed) {
          setVisibleHeadingIds(headingEls.map((el) => el.id).filter((id) => visibleSet.has(id)));
        }
      },
      {
        root: null,
        threshold: [0, 0.01, 0.1, 0.25, 0.5],
      },
    );

    headingEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [tocItems, previewValue]);

  useEffect(() => {
    if (!tocVisible || !visibleHeadingIds.length) return;
    if (Date.now() < tocAutoFollowPausedUntilRef.current) return;

    const tocList = tocListRef.current;
    if (!tocList) return;

    const firstVisibleId = tocItems.find((item) => visibleHeadingIds.includes(item.id))?.id;
    if (!firstVisibleId) return;

    const target = tocList.querySelector(`button[data-toc-id="${firstVisibleId}"]`);
    if (!target) return;

    const listRect = tocList.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const isWithinViewport = targetRect.top >= listRect.top + 8 && targetRect.bottom <= listRect.bottom - 8;
    if (isWithinViewport) return;

    tocProgrammaticScrollRef.current = true;
    target.scrollIntoView({ block: 'nearest' });
    if (tocProgrammaticResetTimerRef.current) {
      window.clearTimeout(tocProgrammaticResetTimerRef.current);
    }
    tocProgrammaticResetTimerRef.current = window.setTimeout(() => {
      tocProgrammaticScrollRef.current = false;
    }, 120);
  }, [tocItems, tocVisible, visibleHeadingIds]);

  useEffect(() => () => {
    if (tocProgrammaticResetTimerRef.current) {
      window.clearTimeout(tocProgrammaticResetTimerRef.current);
    }
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleExport = useCallback(() => {
    const target = document.querySelector(`#${EDITOR_ID}`);
    if (!target) return;
    window.print();
  }, []);

  const handleTocItemClick = useCallback((id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return;
    const onContextMenu = (event) => {
      const pgbr = event.target?.closest?.('.md-pgbr[data-md-pgbr="1"], .md-pgbr');
      if (pgbr && root.contains(pgbr)) {
        event.preventDefault();
        const pgbrs = [...root.querySelectorAll('.md-pgbr[data-md-pgbr="1"], .md-pgbr')];
        const occurrence = pgbrs.findIndex((el) => el === pgbr);
        if (occurrence < 0) return;
        setPgbrDeleteModalState({ occurrence });
        return;
      }

      const img = event.target?.closest?.('img[data-wiki-path], img[data-md-src]');
      if (img && root.contains(img)) {
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
        return;
      }

      const heading = event.target?.closest?.('h1, h2, h3, h4, h5, h6');
      if (heading && root.contains(heading)) {
        event.preventDefault();
        const headings = [...root.querySelectorAll('h1, h2, h3, h4, h5, h6')];
        const index = headings.findIndex((h) => h === heading);
        if (!Number.isInteger(index) || index < 0) return;
        setHeadingPgbrModalState({
          headingIndex: index,
          headingText: heading.textContent?.trim() || '',
        });
        return;
      }

      const hr = event.target?.closest?.('hr');
      if (!hr || !root.contains(hr)) return;
      event.preventDefault();
      const hrs = [...root.querySelectorAll('hr')];
      const index = hrs.findIndex((el) => el === hr);
      if (!Number.isInteger(index) || index < 0) return;
      setHrPgbrModalState({ hrIndex: index });
    };
    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, []);

  const handleApplyWikiImageSize = useCallback(
    ({ width, height }) => {
      const modal = wikiImageModalState;
      if (!modal?.key) return;
      const next =
        modal.kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(previewValue, {
              path: modal.key,
              occurrence: modal.occurrence ?? 0,
              width,
              height,
            })
          : updateMarkdownImageSizeInMarkdown(previewValue, {
              src: modal.key,
              occurrence: modal.occurrence ?? 0,
              width,
              height,
            });
      if (!next.updated || next.markdown === previewValue) return;
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next.markdown,
      });
    },
    [currentFile, previewValue, wikiImageModalState],
  );

  const handleInsertPgbrBeforeHeading = useCallback(() => {
    const modal = headingPgbrModalState;
    if (!modal || !Number.isInteger(modal.headingIndex)) return;
    const next = insertPgbrBeforeHeading(previewValue, modal.headingIndex);
    if (!next.updated || next.markdown === previewValue) {
      setHeadingPgbrModalState(null);
      return;
    }
    setPreviewValue(next.markdown);
    setPendingPrintReturnState({
      currentFile,
      editorContent: next.markdown,
    });
    setHeadingPgbrModalState(null);
  }, [currentFile, headingPgbrModalState, previewValue]);

  const handleDeletePgbr = useCallback(() => {
    const modal = pgbrDeleteModalState;
    if (!modal || !Number.isInteger(modal.occurrence)) return;
    const next = removePgbrByOccurrence(previewValue, modal.occurrence);
    if (!next.updated || next.markdown === previewValue) {
      setPgbrDeleteModalState(null);
      return;
    }
    setPreviewValue(next.markdown);
    setPendingPrintReturnState({
      currentFile,
      editorContent: next.markdown,
    });
    setPgbrDeleteModalState(null);
  }, [currentFile, pgbrDeleteModalState, previewValue]);

  const handleInsertPgbrBeforeHr = useCallback(() => {
    const modal = hrPgbrModalState;
    if (!modal || !Number.isInteger(modal.hrIndex)) return;
    const next = insertPgbrBeforeHr(previewValue, modal.hrIndex);
    if (!next.updated || next.markdown === previewValue) {
      setHrPgbrModalState(null);
      return;
    }
    setPreviewValue(next.markdown);
    setPendingPrintReturnState({
      currentFile,
      editorContent: next.markdown,
    });
    setHrPgbrModalState(null);
  }, [currentFile, hrPgbrModalState, previewValue]);

  const fontStyleVars = {
    '--print-font-body': fonts.body || 'inherit',
    '--print-font-heading': fonts.heading || 'inherit',
    '--print-font-bold': fonts.bold || 'inherit',
    '--print-font-code': fonts.code || 'inherit',
  };

  if (location.state == null) {
    return null;
  }

  return (
    <div
      className="export-pdf-page flex flex-col min-h-full bg-white dark:bg-odp-bgSofter print:bg-white min-w-0"
      style={fontStyleVars}
    >
      <style>{printFontStyles}</style>
      <div ref={headerRef} className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft shrink-0 print:hidden">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg px-3 py-2 rounded transition"
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={18} />
          뒤로 가기
        </button>
        <h2 className="font-semibold text-gray-800 dark:text-odp-fg truncate flex-1 text-center">
          PDF로 내보내기
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFontModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition"
            aria-label="폰트 설정"
          >
            <Settings size={16} />
            폰트 설정
          </button>
          <button
            type="button"
            onClick={() => setTocVisible((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition"
            aria-label={tocVisible ? '목차 숨기기' : '목차 보이기'}
            aria-pressed={tocVisible}
            title={tocVisible ? '목차 숨기기' : '목차 보이기'}
          >
            <ListTree size={16} />
            목차
          </button>
          <button
            type="button"
            className="md-editor-btn"
            onClick={handleExport}
          >
            내보내기
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <div
          ref={previewContainerRef}
          className={`export-pdf-preview-scroll flex-1 overflow-auto min-h-0 bg-white text-gray-900 h-full ${tocVisible ? 'md:pr-56' : ''}`}
        >
          <MdPreview
            id={EDITOR_ID}
            theme="light"
            language="ko-KR"
            value={previewValue}
            mdHeadingId={headingId}
            codeFoldable={false}
            showCodeRowNumber={false}
          />
        </div>
        {tocVisible && (
          <aside
            className="hidden md:flex fixed right-0 bottom-0 w-56 border-l border-gray-200 dark:border-odp-borderSoft bg-white/95 dark:bg-odp-bgSoft/95 backdrop-blur-sm z-30 print:hidden"
            style={{ top: tocTopPx }}
          >
            <div className="flex flex-col w-full min-h-0 p-2">
              <div className="px-1.5 py-1 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong uppercase">
                목차
              </div>
              <ul
                ref={tocListRef}
                onScroll={() => {
                  if (!tocProgrammaticScrollRef.current) {
                    tocAutoFollowPausedUntilRef.current = Date.now() + 900;
                  }
                }}
                onWheel={() => {
                  tocAutoFollowPausedUntilRef.current = Date.now() + 900;
                }}
                onTouchMove={() => {
                  tocAutoFollowPausedUntilRef.current = Date.now() + 900;
                }}
                className="mt-1 flex-1 min-h-0 overflow-y-auto space-y-1"
              >
                {tocItems.length === 0 ? (
                  <li className="px-1.5 text-xs text-gray-500 dark:text-odp-muted">제목 없음</li>
                ) : (
                  tocItems.map((item, i) => (
                    <li
                      key={`${item.id}-${i}`}
                      style={{ paddingLeft: `${Math.min(item.level - 1, 5) * 0.45}rem` }}
                    >
                      <button
                        type="button"
                        data-toc-id={item.id}
                        onClick={() => handleTocItemClick(item.id)}
                        className={`group relative w-full text-left truncate rounded px-1.5 py-1 text-sm transition ${
                          visibleHeadingIds.includes(item.id)
                            ? 'font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-odp-focusBg'
                            : 'text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg'
                        }`}
                        title={item.text}
                      >
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded ${
                            visibleHeadingIds.includes(item.id) ? 'bg-red-500' : 'bg-transparent'
                          }`}
                          aria-hidden
                        />
                        {item.text}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        )}
      </div>

      <PrintFontOptionsModal
        isOpen={fontModalOpen}
        onClose={() => setFontModalOpen(false)}
        fonts={fonts}
        onFontsChange={(next) => setFonts(next)}
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
      <Modal
        isOpen={Boolean(headingPgbrModalState)}
        onClose={() => setHeadingPgbrModalState(null)}
        onConfirm={handleInsertPgbrBeforeHeading}
      >
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            페이지 나누기 삽입
          </h2>
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            아래 heading 앞에 <code className="px-1 rounded bg-gray-100 dark:bg-odp-bgSoft">{'<pgbr/>'}</code> 를 삽입합니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-odp-fg break-all">
            {headingPgbrModalState?.headingText || '(제목 텍스트 없음)'}
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setHeadingPgbrModalState(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleInsertPgbrBeforeHeading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              삽입
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={Boolean(pgbrDeleteModalState)}
        onClose={() => setPgbrDeleteModalState(null)}
        onConfirm={handleDeletePgbr}
      >
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            페이지 나누기 삭제
          </h2>
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            선택한 <code className="px-1 rounded bg-gray-100 dark:bg-odp-bgSoft">{'<pgbr/>'}</code> 를 삭제합니다.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setPgbrDeleteModalState(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleDeletePgbr}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition"
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={Boolean(hrPgbrModalState)}
        onClose={() => setHrPgbrModalState(null)}
        onConfirm={handleInsertPgbrBeforeHr}
      >
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            페이지 나누기 삽입
          </h2>
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            선택한 구분선(HR) 앞에 <code className="px-1 rounded bg-gray-100 dark:bg-odp-bgSoft">{'<pgbr/>'}</code> 를 삽입합니다.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setHrPgbrModalState(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleInsertPgbrBeforeHr}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              삽입
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
