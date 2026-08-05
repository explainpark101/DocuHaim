import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import { ArrowLeft, ListTree, Save, Settings } from 'lucide-react';
import PrintFontOptionsModal from '@/components/PrintFontOptionsModal';
import PrintImageMaxSizeControls from '@/components/print/PrintImageMaxSizeControls';
import PrintPageBreakOverlay from '@/components/print/PrintPageBreakOverlay';
import PrintPageSizeSelect from '@/components/print/PrintPageSizeSelect';
import PrintVisiblePageBadge from '@/components/print/PrintVisiblePageBadge';
import TocResizeHandle from '@/components/TocResizeHandle';
import TocTitleWrapToggle from '@/components/TocTitleWrapToggle';
import { loadPrintFontsFromStorage, DEFAULT_PRINT_FONTS, getPresignedUrlResolver } from '@/utils/printSettingsStore';
import {
  buildPrintLayoutCssVars,
  buildPrintPageAtRule,
  getPrintPageInnerSizePx,
  loadPrintPageLayout,
  savePrintPageLayout,
} from '@/utils/printPageLayout';
import { withFontFallback } from '@/utils/fontFallback';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { usePrintImageAspectFit } from '@/hooks/usePrintImageAspectFit';
import { usePrintPageInnerHeightPx } from '@/hooks/usePrintPageInnerHeightPx';
import { usePrintPageStarts } from '@/hooks/usePrintPageStarts';
import { usePrintPgbrSpacers } from '@/hooks/usePrintPgbrSpacers';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { tocTitleTextClass, useTocTitleWrap } from '@/hooks/useTocTitleWrap';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { savePrintMarkdownToStorage } from '@/utils/printMarkdownSave';
import { uploadPrintEditorImage } from '@/utils/printEditorImageUpload';
import { getVisualLineAtPoint, insertPgbrBeforeVisualLine } from '@/utils/printVisualLinePgbr';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import {
  getMarkdownImageOccurrenceInContainer,
  getResizableImageAttrsFromElement,
  getWikiImageOccurrenceInContainer,
  replaceMarkdownImageWithWikiPath,
  updateMarkdownImageSizeInMarkdown,
  updateWikiImagePathInMarkdown,
  updateWikiImageSizeInMarkdown,
} from '@/utils/wikiImageSyntax';

const EDITOR_ID = 'export-pdf-preview';
const PRINT_TOC_WIDTH_KEY = 's3haim_print_toc_width';
const PRINT_TOC_DEFAULT_WIDTH = 360;

const headingId = ({ index }) => `pdf-ex-heading-${index}`;
const PG_BR_RE = /^<pgbr\s*\/?\s*>$/i;
/** TOC stays active until the next heading crosses this viewport ratio from the top. */
const TOC_ACTIVE_SCAN_RATIO = 2 / 3;

function getActiveHeadingId(headingEls) {
  const scanY = window.innerHeight * TOC_ACTIVE_SCAN_RATIO;
  let activeId = null;
  for (const el of headingEls) {
    if (!el?.id) continue;
    if (el.getBoundingClientRect().top <= scanY) {
      activeId = el.id;
    }
  }
  return activeId;
}

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
  #export-pdf-preview .md-editor-preview .md-editor-code {
    --md-theme-code-block-color: #0f172a;
    --md-theme-code-block-bg-color: #f1f5f9;
    --md-theme-code-before-bg-color: #e2e8f0;
    margin: 1.25em 0;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
    background-color: #f1f5f9;
  }
  #export-pdf-preview .md-editor-preview .md-editor-code .md-editor-code-head {
    background-color: #e2e8f0;
    border-bottom: 1px solid #cbd5e1;
    color: #475569;
  }
  #export-pdf-preview .md-editor-preview .md-editor-code .md-editor-code-head .md-editor-code-lang,
  #export-pdf-preview .md-editor-preview .md-editor-code .md-editor-code-head .md-editor-code-flag span,
  #export-pdf-preview .md-editor-preview .md-editor-code .md-editor-code-head .md-editor-code-action {
    color: #475569;
  }
  #export-pdf-preview .md-editor-preview .md-editor-code pre {
    margin: 0;
    background-color: #f8fafc;
  }
  #export-pdf-preview .md-editor-preview .md-editor-code pre code {
    background-color: #f8fafc;
    color: #0f172a;
    border: none;
    border-radius: 0;
    padding: 1em 1.2em;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  #export-pdf-preview .md-editor-preview :not(pre) > code {
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    border: none;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.92em;
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
  #export-pdf-preview img:not([data-print-free-transform]),
  #export-pdf-preview .md-editor-preview img:not([data-print-free-transform]) {
    max-width: var(--print-img-max-width, 100%);
    max-height: var(--print-img-max-height, var(--print-page-inner-height, 100vh));
    object-fit: contain;
  }
  .export-pdf-paper .md-pgbr {
    height: auto;
    min-height: 1px;
    margin: 0;
    padding: 0;
    border: none;
    border-block-start: 2px dashed #ef4444;
    background-color: #f3f4f6;
    background-image: repeating-linear-gradient(
      -45deg,
      #f9fafb,
      #f9fafb 6px,
      #f3f4f6 6px,
      #f3f4f6 12px
    );
  }
  .export-pdf-paper-metric {
    height: var(--print-page-inner-height);
  }
  .export-pdf-paper #export-pdf-preview,
  .export-pdf-paper #export-pdf-preview .md-editor,
  .export-pdf-paper #export-pdf-preview .md-editor-content,
  .export-pdf-paper #export-pdf-preview .md-editor-preview-wrapper,
  .export-pdf-paper #export-pdf-preview .md-editor-preview {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
  }
  @media print {
    .export-pdf-preview-scroll {
      overflow: visible !important;
      max-height: none !important;
      background: #ffffff !important;
      padding: 0 !important;
    }
    .export-pdf-page {
      display: block !important;
      overflow: visible !important;
      background: #ffffff !important;
    }
    .export-pdf-paper {
      width: auto !important;
      max-width: none !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      background: #ffffff !important;
    }
    .export-pdf-paper .md-pgbr {
      background: transparent !important;
      background-image: none !important;
      border: none !important;
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
  const [savedValue, setSavedValue] = useState(() => value);
  const [isSaving, setIsSaving] = useState(false);
  const [fonts, setFonts] = useState(() => ({ ...DEFAULT_PRINT_FONTS }));
  const [printLayout, setPrintLayout] = useState(() => loadPrintPageLayout());
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [tocVisible, setTocVisible] = useState(true);
  const [tocTopPx, setTocTopPx] = useState(0);
  const [tocItems, setTocItems] = useState([]);
  const [wrapTitles, setWrapTitles] = useTocTitleWrap();
  const [visibleHeadingIds, setVisibleHeadingIds] = useState([]);
  const [wikiImageModalState, setWikiImageModalState] = useState(null);
  const [headingPgbrModalState, setHeadingPgbrModalState] = useState(null);
  const [linePgbrModalState, setLinePgbrModalState] = useState(null);
  const [hrPgbrModalState, setHrPgbrModalState] = useState(null);
  const [pgbrDeleteModalState, setPgbrDeleteModalState] = useState(null);
  const [freeTransformState, setFreeTransformState] = useState(null);
  const [freeTransformConfirmOpen, setFreeTransformConfirmOpen] = useState(false);
  const [freeTransformOverlayRect, setFreeTransformOverlayRect] = useState(null);
  const activeTransformRef = useRef(null);
  const headerRef = useRef(null);
  const previewContainerRef = useRef(null);
  const paperContentRef = useRef(null);
  const imageMaxProbeRef = useRef(null);
  const printLayoutKey = `${printLayout.pageSizeId}|${printLayout.imageMaxWidth}|${printLayout.imageMaxHeight}`;
  const { metricRef, pageInnerHeightPx } = usePrintPageInnerHeightPx(printLayoutKey);
  usePrintImageAspectFit(paperContentRef, imageMaxProbeRef, printLayoutKey);
  usePrintPgbrSpacers(paperContentRef, pageInnerHeightPx, printLayoutKey);
  const { pageStarts, contentHeight } = usePrintPageStarts(
    paperContentRef,
    pageInnerHeightPx,
    `${printLayoutKey}|${previewValue}`,
  );
  const printPageInnerPx = getPrintPageInnerSizePx(printLayout.pageSizeId);
  const tocListRef = useRef(null);
  const tocProgrammaticScrollRef = useRef(false);
  const tocProgrammaticResetTimerRef = useRef(null);
  const tocAutoFollowPausedUntilRef = useRef(0);
  const {
    width: tocWidth,
    isResizing: tocResizing,
    handleProps: tocResizeHandleProps,
  } = useResizablePanelWidth({
    storageKey: PRINT_TOC_WIDTH_KEY,
    defaultWidth: PRINT_TOC_DEFAULT_WIDTH,
    minWidth: 180,
    collapseBelowWidth: 90,
    maxWidth: 640,
    edge: 'right',
    onCollapseBelowMin: () => setTocVisible(false),
  });
  const getPresignedUrl = useMemo(() => getPresignedUrlResolver(currentFile?.type), [currentFile?.type]);

  useWikiImageHydration(
    previewContainerRef,
    previewValue,
    getPresignedUrl ?? undefined,
    currentFile?.id,
  );

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
    setSavedValue(value);
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

    const scrollRoot = previewContainerRef.current;
    let rafId = 0;

    const applyActiveHeading = () => {
      const activeId = getActiveHeadingId(headingEls);
      const nextIds = activeId ? [activeId] : [];
      setVisibleHeadingIds((prev) => (
        prev.length === nextIds.length && prev.every((id, index) => id === nextIds[index])
          ? prev
          : nextIds
      ));
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyActiveHeading();
      });
    };

    applyActiveHeading();
    scrollRoot?.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
    window.addEventListener('resize', scheduleUpdate);

    let resizeObserver = null;
    const resizeTarget = scrollRoot?.querySelector(`#${EDITOR_ID}`) ?? scrollRoot;
    if (typeof ResizeObserver !== 'undefined' && resizeTarget) {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(resizeTarget);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      scrollRoot?.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate, { capture: true });
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
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

  const isDirty = previewValue !== savedValue;

  const handleSave = useCallback(async () => {
    if (!currentFile?.id || isSaving) return;
    setIsSaving(true);
    try {
      savePrintPageLayout(printLayout);
      const nextFile = {
        ...currentFile,
        content: previewValue,
      };
      setPendingPrintReturnState({
        currentFile: nextFile,
        editorContent: previewValue,
      });
      const result = await savePrintMarkdownToStorage(currentFile, previewValue);
      setSavedValue(previewValue);
      if (result.mode === 'pending-only') {
        alert('세션 노트는 뒤로 가면 편집기에 반영됩니다.');
      }
    } catch (error) {
      alert(`저장 실패: ${error?.message || error}`);
    } finally {
      setIsSaving(false);
    }
  }, [currentFile, isSaving, previewValue, printLayout]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 's') return;
      event.preventDefault();
      handleSave();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave]);

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
          imageSrc: img.currentSrc || img.src || '',
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
      if (hr && root.contains(hr)) {
        event.preventDefault();
        const hrs = [...root.querySelectorAll('hr')];
        const index = hrs.findIndex((el) => el === hr);
        if (!Number.isInteger(index) || index < 0) return;
        setHrPgbrModalState({ hrIndex: index });
        return;
      }

      const contentRoot = paperContentRef.current;
      if (!contentRoot) return;
      const visualLine = getVisualLineAtPoint(contentRoot, event.clientX, event.clientY);
      if (!visualLine?.lineText) return;
      event.preventDefault();
      setLinePgbrModalState(visualLine);
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

  const handleCropWikiImage = useCallback(
    async ({ file }) => {
      const modal = wikiImageModalState;
      if (!modal?.key) {
        throw new Error('자를 이미지를 찾을 수 없습니다.');
      }
      const nextPath = await uploadPrintEditorImage(file, currentFile);
      const next =
        modal.kind === 'wiki'
          ? updateWikiImagePathInMarkdown(previewValue, {
              path: modal.key,
              occurrence: modal.occurrence ?? 0,
              nextPath,
            })
          : replaceMarkdownImageWithWikiPath(previewValue, {
              src: modal.key,
              occurrence: modal.occurrence ?? 0,
              nextPath,
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

  const findResizableImageElement = useCallback((target) => {
    const root = previewContainerRef.current;
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
    img.setAttribute('data-print-free-transform', '1');
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

    const onHandleDown = (event) => {
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

    const onOutsidePointerDown = (event) => {
      const clickedHandle = event.target?.closest?.('[data-transform-handle]');
      const clickedImage = event.target?.closest?.('img[data-wiki-path], img[data-md-src]');
      if (clickedHandle || clickedImage === target) return;
      setFreeTransformConfirmOpen(true);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setFreeTransformConfirmOpen(true);
      }
    };
    document.addEventListener('pointerdown', onHandleDown, true);
    document.addEventListener('pointerdown', onOutsidePointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onHandleDown, true);
      document.removeEventListener('pointerdown', onOutsidePointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [freeTransformState, findResizableImageElement]);

  const handleConfirmTransformApply = useCallback(() => {
    const active = activeTransformRef.current || freeTransformState;
    if (!active?.key) return;
    const width = `${Math.round(active.widthPx)}px`;
    const height = `${Math.round(active.heightPx)}px`;
    const next =
      active.kind === 'wiki'
        ? updateWikiImageSizeInMarkdown(previewValue, {
            path: active.key,
            occurrence: active.occurrence ?? 0,
            width,
            height,
          })
        : updateMarkdownImageSizeInMarkdown(previewValue, {
            src: active.key,
            occurrence: active.occurrence ?? 0,
            width,
            height,
          });
    if (next.updated && next.markdown !== previewValue) {
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next.markdown,
      });
    }
    const img = findResizableImageElement(active);
    img?.removeAttribute('data-print-free-transform');
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [currentFile, findResizableImageElement, freeTransformState, previewValue]);

  const handleConfirmTransformReset = useCallback(() => {
    const active = activeTransformRef.current || freeTransformState;
    if (!active) return;
    const img = findResizableImageElement(active);
    if (img) {
      img.style.width = `${active.originalWidthPx}px`;
      img.style.height = `${active.originalHeightPx}px`;
      img.removeAttribute('data-print-free-transform');
    }
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [findResizableImageElement, freeTransformState]);

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

  const handleInsertPgbrBeforeLine = useCallback(() => {
    const modal = linePgbrModalState;
    if (!modal?.lineText || !Number.isInteger(modal.occurrence)) return;
    const next = insertPgbrBeforeVisualLine(previewValue, modal.lineText, modal.occurrence);
    if (!next.updated || next.markdown === previewValue) {
      setLinePgbrModalState(null);
      return;
    }
    setPreviewValue(next.markdown);
    setPendingPrintReturnState({
      currentFile,
      editorContent: next.markdown,
    });
    setLinePgbrModalState(null);
  }, [currentFile, linePgbrModalState, previewValue]);

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

  const updatePrintLayout = useCallback((partial) => {
    setPrintLayout((prev) => {
      const next = { ...prev, ...partial };
      savePrintPageLayout(next);
      return next;
    });
  }, []);

  const fontStyleVars = {
    ...buildPrintLayoutCssVars(printLayout),
    '--print-font-body': withFontFallback(fonts.body),
    '--print-font-heading': withFontFallback(fonts.heading),
    '--print-font-bold': withFontFallback(fonts.bold),
    '--print-font-code': withFontFallback(fonts.code, 'mono'),
  };

  if (location.state == null) {
    return null;
  }

  return (
    <div
      className="export-pdf-page flex flex-col h-full min-h-0 overflow-hidden print:h-auto print:min-h-0 print:overflow-visible bg-neutral-200 dark:bg-neutral-800 print:bg-white min-w-0"
      style={fontStyleVars}
    >
      <style>{printFontStyles}</style>
      <style>{buildPrintPageAtRule(printLayout.pageSizeId)}</style>
      <div ref={headerRef} className="sticky top-0 z-20 flex flex-col gap-2 px-4 py-3 border-b border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft shrink-0 print:hidden">
        <div className="flex items-center justify-between gap-4">
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
              onClick={handleSave}
              disabled={!currentFile?.id || isSaving || !isDirty}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700"
              aria-label="저장"
              title="이미지 크기와 페이지 나누기를 노트에 저장 (Ctrl+S)"
            >
              <Save size={16} />
              {isSaving ? '저장 중…' : '저장'}
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
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <PrintPageSizeSelect
            value={printLayout.pageSizeId}
            onValueChange={(pageSizeId) => updatePrintLayout({ pageSizeId })}
          />
          <PrintImageMaxSizeControls
            maxWidth={printLayout.imageMaxWidth}
            maxHeight={printLayout.imageMaxHeight}
            widthFallback={`${printPageInnerPx.widthPx}px`}
            heightFallback={`${printPageInnerPx.heightPx}px`}
            onChange={({ maxWidth, maxHeight }) => updatePrintLayout({
              imageMaxWidth: maxWidth,
              imageMaxHeight: maxHeight,
            })}
          />
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 flex-col"
        style={{ '--export-toc-width': `${tocWidth}px` }}
      >
        <div
          ref={previewContainerRef}
          className={`export-pdf-preview-scroll px-4 py-6 min-h-0 flex-1 overflow-auto bg-neutral-200 dark:bg-neutral-800 text-gray-900 print:bg-white print:h-auto print:max-h-none print:overflow-visible print:p-0 ${
            tocVisible ? 'md:pr-(--export-toc-width)' : ''
          }`}
        >
          <div
            className="export-pdf-paper relative mx-auto bg-white text-gray-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none print:mx-0"
            style={{
              width: 'var(--print-page-width)',
              minHeight: 'var(--print-page-height)',
              padding: 'var(--print-page-margin)',
            }}
          >
            <div
              ref={metricRef}
              className="export-pdf-paper-metric pointer-events-none absolute top-0 left-0 -z-10 w-px opacity-0 print:hidden"
              aria-hidden
            />
            <div ref={paperContentRef} className="export-pdf-paper-content relative">
              <div
                ref={imageMaxProbeRef}
                className="pointer-events-none absolute top-0 left-0 -z-10 opacity-0 print:hidden"
                style={{
                  width: 'var(--print-img-max-width)',
                  height: 'var(--print-img-max-height)',
                }}
                aria-hidden
              />
              <PrintPageBreakOverlay
                pageStarts={pageStarts}
                contentHeight={contentHeight}
              />
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
          </div>
        </div>
        <PrintVisiblePageBadge
          pageStarts={pageStarts}
          contentHeight={contentHeight}
          paperRef={paperContentRef}
          scrollRef={previewContainerRef}
        />
        {tocVisible && (
          <aside
            className="hidden md:flex fixed right-0 bottom-0 border-l border-gray-200 dark:border-odp-borderSoft bg-white/95 dark:bg-odp-bgSoft/95 backdrop-blur-sm z-30 print:hidden"
            style={{ top: tocTopPx, width: tocWidth }}
          >
            <TocResizeHandle
              handleProps={tocResizeHandleProps}
              isResizing={tocResizing}
              visibleOnHover
              label="목차 너비 조절"
            />
            <div className="relative flex flex-col w-full min-h-0 p-2 pl-2.5">
              <div className="flex items-center justify-between gap-2 px-1.5 py-1">
                <div className="text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong uppercase">
                  목차
                </div>
                <TocTitleWrapToggle
                  checked={wrapTitles}
                  onChange={setWrapTitles}
                  isDark={
                    typeof document !== 'undefined' &&
                    document.documentElement.classList.contains('dark')
                  }
                />
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
                        onContextMenu={(event) => {
                          event.preventDefault();
                          setHeadingPgbrModalState({
                            headingIndex: i,
                            headingText: item.text || '',
                          });
                        }}
                        className={`group relative w-full text-left rounded px-1.5 py-1 text-sm transition ${tocTitleTextClass(wrapTitles)} ${
                          visibleHeadingIds.includes(item.id)
                            ? 'font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-odp-focusBg'
                            : 'text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg'
                        }`}
                        title={item.text}
                      >
                        <span
                          className={`absolute left-0 w-0.5 rounded ${
                            wrapTitles ? 'top-2 h-4' : 'top-1/2 h-4 -translate-y-1/2'
                          } ${
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
        imageSrc={wikiImageModalState?.imageSrc ?? ''}
        onApply={handleApplyWikiImageSize}
        onStartFreeTransform={startFreeTransform}
        onCrop={handleCropWikiImage}
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
          className="fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm print:hidden"
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
      <ConfirmModal
        isOpen={Boolean(headingPgbrModalState)}
        title="페이지 나누기 삽입"
        message={`아래 heading 앞에 <pgbr/> 를 삽입합니다.\n\n${headingPgbrModalState?.headingText || '(제목 텍스트 없음)'}`}
        confirmLabel="삽입"
        cancelLabel="취소"
        onConfirm={handleInsertPgbrBeforeHeading}
        onCancel={() => setHeadingPgbrModalState(null)}
      />
      <ConfirmModal
        isOpen={Boolean(linePgbrModalState)}
        title="페이지 나누기 삽입"
        message={`아래 줄 앞에 <pgbr/> 를 삽입합니다.\n\n${linePgbrModalState?.lineText || '(텍스트 없음)'}`}
        confirmLabel="삽입"
        cancelLabel="취소"
        onConfirm={handleInsertPgbrBeforeLine}
        onCancel={() => setLinePgbrModalState(null)}
      />
      <ConfirmModal
        isOpen={Boolean(pgbrDeleteModalState)}
        title="페이지 나누기 삭제"
        message={"선택한 <pgbr/> 를 삭제합니다."}
        variant="danger"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={handleDeletePgbr}
        onCancel={() => setPgbrDeleteModalState(null)}
      />
      <ConfirmModal
        isOpen={Boolean(hrPgbrModalState)}
        title="페이지 나누기 삽입"
        message={"선택한 구분선(HR) 앞에 <pgbr/> 를 삽입합니다."}
        confirmLabel="삽입"
        cancelLabel="취소"
        onConfirm={handleInsertPgbrBeforeHr}
        onCancel={() => setHrPgbrModalState(null)}
      />
    </div>
  );
}
