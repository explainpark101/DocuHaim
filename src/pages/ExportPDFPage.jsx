import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import { ArrowLeft, LayoutTemplate, ListTree, Printer, Save, Settings } from 'lucide-react';
import PrintFontOptionsModal from '@/components/PrintFontOptionsModal';
import PrintImageMaxSizeControls from '@/components/print/PrintImageMaxSizeControls';
import PrintPageBreakOverlay from '@/components/print/PrintPageBreakOverlay';
import PrintPageSizeSelect from '@/components/print/PrintPageSizeSelect';
import PrintPreviewFirstPageSingleSwitch from '@/components/print/PrintPreviewFirstPageSingleSwitch';
import PrintPreviewNavSelect from '@/components/print/PrintPreviewNavSelect';
import PrintPreviewPagesSelect from '@/components/print/PrintPreviewPagesSelect';
import PrintPreviewStage, {
  logicalPageIndexForHeading,
  spreadIndexForLogicalPage,
} from '@/components/print/PrintPreviewStage';
import PrintPreviewZoomControls from '@/components/print/PrintPreviewZoomControls';
import PrintVisiblePageBadge from '@/components/print/PrintVisiblePageBadge';
import CoverEditor from '@/components/noteCover/CoverEditor';
import CoverSlide from '@/components/noteCover/CoverSlide';
import CoverSidebar, {
  COVER_LAYERS_SIDEBAR_DEFAULT_WIDTH,
  COVER_LAYERS_SIDEBAR_WIDTH_KEY,
  COVER_SIDEBAR_DEFAULT_WIDTH,
  COVER_SIDEBAR_WIDTH_KEY,
  loadCoverLayersDetached,
  saveCoverLayersDetached,
} from '@/components/noteCover/CoverSidebar';
import { useCoverUndoHistory } from '@/hooks/useCoverUndoHistory';
import { useScrollPointerPan } from '@/hooks/useScrollPointerPan';
import { useUnsavedNavigationGuard } from '@/hooks/useUnsavedNavigationGuard';
import TocResizeHandle from '@/components/TocResizeHandle';
import TocTitleWrapToggle from '@/components/TocTitleWrapToggle';
import { loadPrintFontsFromStorage, DEFAULT_PRINT_FONTS, getPresignedUrlResolver } from '@/utils/printSettingsStore';
import {
  PRINT_PAGE_SIZES,
  buildPrintLayoutCssVars,
  buildPrintPageAtRule,
  getPrintPageInnerSizePx,
  loadPrintPageLayout,
  savePrintPageLayout,
} from '@/utils/printPageLayout';
import {
  paperActionId,
  registerPrintActions,
  registerPrintPreviewNavigator,
  registerPrintTocProvider,
} from '@/utils/advancedSearch/printActions';
import {
  clampZoomPercent,
  loadPrintPreviewView,
  savePrintPreviewView,
  stepZoomPercent,
} from '@/utils/printPreviewView';
import { withFontFallback } from '@/utils/fontFallback';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { usePrintImageAspectFit } from '@/hooks/usePrintImageAspectFit';
import { usePrintPageInnerHeightPx } from '@/hooks/usePrintPageInnerHeightPx';
import { usePrintPageStarts } from '@/hooks/usePrintPageStarts';
import { usePrintPgbrSpacers } from '@/hooks/usePrintPgbrSpacers';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { tocTitleTextClass, useTocTitleWrap } from '@/hooks/useTocTitleWrap';
import { parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { savePrintMarkdownToStorage } from '@/utils/printMarkdownSave';
import { uploadPrintEditorImage } from '@/utils/printEditorImageUpload';
import { getVisualLineAtPoint, insertPgbrBeforeVisualLine } from '@/utils/printVisualLinePgbr';
import {
  createDefaultNoteCover,
  formatNoteCoverIssues,
  nudgeCoverFontSizes,
  parseNoteCover,
  setCoverTextAlign,
  stripNoteCoverComment,
  upsertNoteCoverComment,
} from '@/utils/noteCover';
import {
  loadCoverCenterSnapEnabled,
  loadCoverCenterSnapTolerance,
  loadCoverObjectSnapEnabled,
  loadCoverObjectSnapTolerance,
  loadCoverPlacePreviewEnabled,
  loadCoverTextContainerOutlineEnabled,
  saveCoverCenterSnapTolerance,
  saveCoverObjectSnapTolerance,
} from '@/utils/noteCover/snapSettings';
import {
  COVER_SETTINGS_CHANGED_EVENT,
  getCachedCoverSettings,
} from '@/utils/coverSettingsStore';
import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useAlertModal } from '@/contexts/AlertModalContext';
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
  :is(#export-pdf-preview, [data-export-pdf-preview]),
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
    background: #ffffff;
    color: #111827;
    font-family: var(--print-font-body, inherit);
    color-scheme: light;
    /* Force light table chrome even when html/app is .dark (preview.css). */
    --md-theme-table-stripe-color: #f9fafb;
    --md-theme-table-tr-bg-color: #ffffff;
    --md-theme-table-td-border-color: #e5e7eb;
    --md-theme-table-td-border-color-horizontal: #cbd5e1;
    --md-theme-table-border-color: #e5e7eb;
    --md-theme-table-thead-bg-color: #f3f4f6;
    --md-theme-table-th-color: #f3f4f6;
    --md-theme-table-tht-color: #1e3a8a;
    --md-theme-table-tr-nc-color: #f8fafc;
    --md-theme-table-trh-color: #f3f4f6;
    --md-theme-table-color: #111827;
    --md-theme-border-color: #e5e7eb;
    --md-theme-bg-color: #ffffff;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview [class$="-theme"] {
    color-scheme: light;
    --md-theme-table-stripe-color: #f9fafb;
    --md-theme-table-tr-bg-color: #ffffff;
    --md-theme-table-td-border-color: #e5e7eb;
    --md-theme-table-td-border-color-horizontal: #cbd5e1;
    --md-theme-table-border-color: #e5e7eb;
    --md-theme-table-thead-bg-color: #f3f4f6;
    --md-theme-table-th-color: #f3f4f6;
    --md-theme-table-tht-color: #1e3a8a;
    --md-theme-table-tr-nc-color: #f8fafc;
    --md-theme-table-trh-color: #f3f4f6;
    --md-theme-table-color: #111827;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr td {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr {
    background-color: #ffffff !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr:nth-child(2n) {
    background-color: #f9fafb !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table thead,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table thead tr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th {
    background-color: #f3f4f6 !important;
    color: #111827 !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr td {
    border-color: #e5e7eb !important;
    color: #111827;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h1,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h2,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h3,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h4,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h5,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h6 {
    font-family: var(--print-font-heading, inherit);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview b,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview strong {
    font-family: var(--print-font-bold, inherit);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview code,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview pre,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code {
    font-family: var(--print-font-code, inherit);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code {
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
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code .md-editor-code-head {
    background-color: #e2e8f0;
    border-bottom: 1px solid #cbd5e1;
    color: #475569;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code .md-editor-code-head .md-editor-code-lang,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code .md-editor-code-head .md-editor-code-flag span,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code .md-editor-code-head .md-editor-code-action {
    color: #475569;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre {
    margin: 0;
    background-color: #f8fafc;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code {
    background-color: #f8fafc;
    color: #0f172a;
    border: none;
    border-radius: 0;
    padding: 1em 1.2em;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview :not(pre) > code {
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    border: none;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.92em;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview figure {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 0 1em;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview figure figcaption {
    text-align: left;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-pgbr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview hr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h1,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h2,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h3,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h4,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h5,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h6 {
    cursor: pointer;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) img:not([data-print-free-transform]),
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview img:not([data-print-free-transform]) {
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
  .export-pdf-cover {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    break-after: page;
    page-break-after: always;
    /* Prefer cover hit-testing if paper box ever overlaps the cover sibling. */
    position: relative;
    z-index: 2;
  }
  .export-pdf-cover [data-cover-el],
  .export-pdf-cover [data-cover-shape] {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .export-pdf-cover-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .export-pdf-source-measure {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    /* Prefer visibility over opacity so print engines still paint with @media print. */
    visibility: hidden;
    pointer-events: none;
    z-index: -1;
  }
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-content,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-preview-wrapper,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-preview {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
  }
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]),
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-content,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview-wrapper,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
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
    .export-pdf-preview-stage {
      display: none !important;
    }
    .export-pdf-source-measure {
      position: static !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: auto !important;
      width: auto !important;
    }
    .export-pdf-page {
      display: block !important;
      overflow: visible !important;
      background: #ffffff !important;
    }
    .export-pdf-cover-stack {
      gap: 0 !important;
      align-items: stretch !important;
    }
    .export-pdf-cover {
      width: 100% !important;
      max-width: none !important;
      /* Absolute-positioned cover elements need an explicit page box or the slide collapses. */
      height: var(--print-page-inner-height) !important;
      min-height: var(--print-page-inner-height) !important;
      max-height: var(--print-page-inner-height) !important;
      margin: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      break-after: page !important;
      page-break-after: always !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
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
    :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview-wrapper {
      overflow: visible !important;
      max-height: none !important;
    }
  }
`;

export default function ExportPDFPage({
  documentValue = '',
  documentFile = null,
  openCoverEdit: openCoverEditProp = false,
  isDocumentLoading = false,
  hasNavigationSession = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlertModal();
  const locationState = location.state && typeof location.state === 'object' ? location.state : null;
  const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
  const initialValue =
    typeof locationState?.value === 'string'
      ? locationState.value
      : typeof documentValue === 'string'
        ? documentValue
        : '';
  const initialFile = locationState?.currentFile ?? documentFile ?? null;
  const openCoverEdit = Boolean(locationState?.openCoverEdit ?? openCoverEditProp);

  const [previewValue, setPreviewValue] = useState(() => initialValue);
  const coverIssuesAlertSigRef = useRef('');
  const [savedValue, setSavedValue] = useState(() => initialValue);
  const [currentFile, setCurrentFile] = useState(() => initialFile);
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
  const [coverEditMode, setCoverEditMode] = useState(() => Boolean(openCoverEdit));
  const [coverSelectedIds, setCoverSelectedIds] = useState([]);
  const [coverPlaceMode, setCoverPlaceMode] = useState(null);
  const [coverCenterSnap, setCoverCenterSnap] = useState(() => loadCoverCenterSnapEnabled());
  const [coverCenterSnapTolerance, setCoverCenterSnapTolerance] = useState(() =>
    loadCoverCenterSnapTolerance(),
  );
  const [coverObjectSnap, setCoverObjectSnap] = useState(() => loadCoverObjectSnapEnabled());
  const [coverObjectSnapTolerance, setCoverObjectSnapTolerance] = useState(() =>
    loadCoverObjectSnapTolerance(),
  );
  const [coverTextContainerOutline, setCoverTextContainerOutline] = useState(() =>
    loadCoverTextContainerOutlineEnabled(),
  );
  const [coverPlacePreview, setCoverPlacePreview] = useState(() => loadCoverPlacePreviewEnabled());
  const [coverLayersDetached, setCoverLayersDetached] = useState(() => loadCoverLayersDetached());
  const [previewView, setPreviewView] = useState(() => loadPrintPreviewView());
  const [flipIndex, setFlipIndex] = useState(0);
  const [stageVisiblePages, setStageVisiblePages] = useState(null);
  const activeTransformRef = useRef(null);
  const headerRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [previewPanRoot, setPreviewPanRoot] = useState(null);
  const setPreviewContainerRef = useCallback((node) => {
    previewContainerRef.current = node;
    setPreviewPanRoot(node);
  }, []);
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
  const {
    width: coverSidebarWidth,
    isResizing: coverSidebarResizing,
    handleProps: coverSidebarResizeHandleProps,
  } = useResizablePanelWidth({
    storageKey: COVER_SIDEBAR_WIDTH_KEY,
    defaultWidth: COVER_SIDEBAR_DEFAULT_WIDTH,
    minWidth: 220,
    maxWidth: 480,
    edge: 'left',
  });
  const {
    width: coverLayersSidebarWidth,
    isResizing: coverLayersSidebarResizing,
    handleProps: coverLayersSidebarResizeHandleProps,
  } = useResizablePanelWidth({
    storageKey: COVER_LAYERS_SIDEBAR_WIDTH_KEY,
    defaultWidth: COVER_LAYERS_SIDEBAR_DEFAULT_WIDTH,
    minWidth: 200,
    maxWidth: 420,
    edge: 'left',
  });
  const coverChromeWidth =
    coverSidebarWidth + (coverLayersDetached ? coverLayersSidebarWidth : 0);
  const getPresignedUrl = useMemo(() => getPresignedUrlResolver(currentFile?.type), [currentFile?.type]);
  const hydratedFileIdRef = useRef(
    locationState?.value != null ? (initialFile?.id ?? null) : null,
  );

  // After refresh, MainApp loads the note from `/export-pdf/*` into props.
  useEffect(() => {
    if (locationState?.value != null) return;
    if (!documentFile?.id) return;
    if (hydratedFileIdRef.current === documentFile.id) return;
    hydratedFileIdRef.current = documentFile.id;
    setCurrentFile(documentFile);
    const nextValue = typeof documentValue === 'string' ? documentValue : '';
    setPreviewValue(nextValue);
    setSavedValue(nextValue);
  }, [documentFile, documentValue, locationState]);

  const bodyMarkdown = useMemo(() => stripNoteCoverComment(previewValue), [previewValue]);
  const parsedCoverResult = useMemo(() => parseNoteCover(previewValue), [previewValue]);
  const parsedCover = parsedCoverResult.cover;
  const activeCover = parsedCover;
  const effectiveNavigation = coverEditMode ? 'scroll' : previewView.navigation;
  const effectivePages = coverEditMode ? 1 : previewView.pages;
  const isLiveScroll1 = effectiveNavigation === 'scroll' && effectivePages === 1;
  const viewControlsLocked = Boolean(coverEditMode);

  const updatePreviewView = useCallback((partial) => {
    setPreviewView((prev) => {
      const next = { ...prev, ...partial };
      if (Object.prototype.hasOwnProperty.call(partial, 'zoomPercent')) {
        next.zoomPercent = clampZoomPercent(partial.zoomPercent);
      }
      savePrintPreviewView(next);
      return next;
    });
  }, []);

  const handleStageZoomChange = useCallback((zoomPercent) => {
    updatePreviewView({ zoomPercent });
  }, [updatePreviewView]);

  const navigatePreviewToHeading = useCallback((headingId) => {
    if (!headingId) return;
    const el = document.getElementById(headingId);
    if (!el) return;

    if (isLiveScroll1) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }

    const paper = paperContentRef.current;
    if (!paper) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }
    const logical = logicalPageIndexForHeading(
      el,
      paper,
      pageStarts,
      Boolean(activeCover?.enabled),
    );
    const totalLogical =
      (activeCover?.enabled ? 1 : 0) + Math.max(1, pageStarts.length);
    const nextFlip = spreadIndexForLogicalPage(
      logical,
      totalLogical,
      effectivePages,
      previewView.firstPageSingle,
    );
    setFlipIndex(nextFlip);
  }, [
    activeCover?.enabled,
    effectivePages,
    isLiveScroll1,
    pageStarts,
    previewView.firstPageSingle,
  ]);

  useEffect(() => {
    const { issues } = parsedCoverResult;
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
  }, [parsedCoverResult, showAlert]);

  const handleCoverChange = useCallback((nextCover) => {
    setPreviewValue((prev) => {
      const next = upsertNoteCoverComment(prev, nextCover);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next,
      });
      return next;
    });
  }, [currentFile]);

  const {
    onCoverChange,
    undo: undoCover,
    redo: redoCover,
    canUndo: canUndoCover,
    canRedo: canRedoCover,
  } = useCoverUndoHistory({
    currentFile,
    enabled: Boolean(coverEditMode && activeCover),
    cover: activeCover,
    applyCover: handleCoverChange,
  });

  const toggleCoverEditMode = useCallback(() => {
    setCoverEditMode((prev) => {
      const next = !prev;
      if (!next) {
        setCoverSelectedIds([]);
        setCoverPlaceMode(null);
      }
      return next;
    });
    setPreviewValue((md) => {
      if (coverEditMode) return md;
      if (parseNoteCover(md).cover) return md;
      const created = createDefaultNoteCover();
      const next = upsertNoteCoverComment(md, created);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next,
      });
      return next;
    });
  }, [coverEditMode, currentFile]);

  const handleCoverCenterSnapChange = useCallback((enabled) => {
    setCoverCenterSnap(enabled);
    setSettingsToggle('settings-cover-center-snap', enabled);
  }, []);

  const handleCoverCenterSnapToleranceChange = useCallback((value) => {
    setCoverCenterSnapTolerance(value);
    saveCoverCenterSnapTolerance(value);
  }, []);

  const handleCoverObjectSnapChange = useCallback((enabled) => {
    setCoverObjectSnap(enabled);
    setSettingsToggle('settings-cover-object-snap', enabled);
  }, []);

  const handleCoverObjectSnapToleranceChange = useCallback((value) => {
    setCoverObjectSnapTolerance(value);
    saveCoverObjectSnapTolerance(value);
  }, []);

  const handleCoverTextContainerOutlineChange = useCallback((enabled) => {
    setCoverTextContainerOutline(enabled);
    setSettingsToggle('settings-cover-text-outline', enabled);
  }, []);

  const handleCoverPlacePreviewChange = useCallback((enabled) => {
    setCoverPlacePreview(enabled);
    setSettingsToggle('settings-cover-place-preview', enabled);
  }, []);

  const handleCoverLayersDetachedChange = useCallback((detached) => {
    setCoverLayersDetached(detached);
    saveCoverLayersDetached(detached);
  }, []);

  useWikiImageHydration(
    previewContainerRef,
    bodyMarkdown,
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
    const syncCoverPrefs = () => {
      const s = getCachedCoverSettings();
      setCoverCenterSnap(s.centerSnapEnabled);
      setCoverCenterSnapTolerance(s.centerSnapTolerancePx);
      setCoverObjectSnap(s.objectSnapEnabled);
      setCoverObjectSnapTolerance(s.objectSnapTolerancePx);
      setCoverTextContainerOutline(s.textContainerOutlineEnabled);
      setCoverPlacePreview(s.placePreviewEnabled);
    };
    window.addEventListener(COVER_SETTINGS_CHANGED_EVENT, syncCoverPrefs);
    return () => window.removeEventListener(COVER_SETTINGS_CHANGED_EVENT, syncCoverPrefs);
  }, []);

  useEffect(() => {
    if (location.state == null) {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

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
  }, [bodyMarkdown]);

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
  }, [tocItems, bodyMarkdown]);

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
    const path = currentFile?.id || routeExportPath;
    if (path) {
      navigate(`/view/${path}`);
      return;
    }
    navigate(-1);
  }, [currentFile?.id, navigate, routeExportPath]);

  const handleExport = useCallback(() => {
    const target = document.querySelector(`#${EDITOR_ID}`);
    if (!target) return;
    window.print();
  }, []);

  const isDirty = previewValue !== savedValue;
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;
  const isPrintDirty = useCallback(() => isDirtyRef.current, []);
  const {
    isBlocked: isLeaveBlocked,
    proceed: proceedLeave,
    reset: resetLeave,
  } = useUnsavedNavigationGuard({ isDirty: isPrintDirty });

  const handleSave = useCallback(async () => {
    if (!currentFile?.id || isSaving) return false;
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
      return true;
    } catch (error) {
      alert(`저장 실패: ${error?.message || error}`);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [currentFile, isSaving, previewValue, printLayout]);

  const handleNavGuardSaveAndLeave = useCallback(async () => {
    const ok = await handleSave();
    if (!ok) return;
    proceedLeave();
  }, [handleSave, proceedLeave]);

  const handleNavGuardDiscardAndLeave = useCallback(() => {
    setPendingPrintReturnState({
      currentFile,
      editorContent: savedValue,
    });
    proceedLeave();
  }, [currentFile, proceedLeave, savedValue]);

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
    navigatePreviewToHeading(id);
  }, [navigatePreviewToHeading]);

  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return;

    const COVER_SEL = '.export-pdf-cover, [data-note-cover="1"]';

    const isCoverContextMenu = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(COVER_SEL)) return true;
      if (typeof event.composedPath === 'function') {
        for (const node of event.composedPath()) {
          if (node instanceof Element && node.matches?.(COVER_SEL)) return true;
        }
      }
      const top = document.elementFromPoint(event.clientX, event.clientY);
      if (top?.closest?.(COVER_SEL)) return true;
      // Geometry fallback: paper can paint above a cover sibling when boxes overlap.
      for (const cover of root.querySelectorAll(COVER_SEL)) {
        const rect = cover.getBoundingClientRect();
        if (
          event.clientX >= rect.left
          && event.clientX <= rect.right
          && event.clientY >= rect.top
          && event.clientY <= rect.bottom
        ) {
          return true;
        }
      }
      return false;
    };

    const onContextMenu = (event) => {
      // Cover has its own menus (e.g. image aspect); never treat it as paper pgbr insert.
      if (isCoverContextMenu(event)) return;
      // macOS Ctrl+click fires contextmenu — do not treat it as pgbr insert.
      if (event.ctrlKey) return;

      const contentRoot = paperContentRef.current;
      if (!contentRoot) return;

      const pgbr = event.target?.closest?.('.md-pgbr[data-md-pgbr="1"], .md-pgbr');
      if (pgbr && contentRoot.contains(pgbr)) {
        event.preventDefault();
        const pgbrs = [...contentRoot.querySelectorAll('.md-pgbr[data-md-pgbr="1"], .md-pgbr')];
        const occurrence = pgbrs.findIndex((el) => el === pgbr);
        if (occurrence < 0) return;
        setPgbrDeleteModalState({ occurrence });
        return;
      }

      const img = event.target?.closest?.('img[data-wiki-path], img[data-md-src]');
      if (img && contentRoot.contains(img)) {
        const attrs = getResizableImageAttrsFromElement(img);
        if (!attrs.kind || !attrs.key) return;
        event.preventDefault();
        const occurrence =
          attrs.kind === 'wiki'
            ? getWikiImageOccurrenceInContainer(contentRoot, img, attrs.key)
            : getMarkdownImageOccurrenceInContainer(contentRoot, img, attrs.key);
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
      if (heading && contentRoot.contains(heading)) {
        event.preventDefault();
        const headings = [...contentRoot.querySelectorAll('h1, h2, h3, h4, h5, h6')];
        const index = headings.findIndex((h) => h === heading);
        if (!Number.isInteger(index) || index < 0) return;
        setHeadingPgbrModalState({
          headingIndex: index,
          headingText: heading.textContent?.trim() || '',
        });
        return;
      }

      const hr = event.target?.closest?.('hr');
      if (hr && contentRoot.contains(hr)) {
        event.preventDefault();
        const hrs = [...contentRoot.querySelectorAll('hr')];
        const index = hrs.findIndex((el) => el === hr);
        if (!Number.isInteger(index) || index < 0) return;
        setHrPgbrModalState({ hrIndex: index });
        return;
      }

      // Only insert-by-line when the click actually landed in the paper body.
      if (!(event.target instanceof Node) || !contentRoot.contains(event.target)) return;
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

  // Advanced Search: print toolbar actions + live TOC headings.
  useEffect(() => {
    /** @type {Record<string, () => void>} */
    const handlers = {
      'print-save': () => {
        void handleSave();
      },
      'print-font-settings': () => setFontModalOpen(true),
      'print-export': () => handleExport(),
      'print-toggle-toc': () => setTocVisible((v) => !v),
      'print-view-scroll': () => updatePreviewView({ navigation: 'scroll' }),
      'print-view-flip': () => updatePreviewView({ navigation: 'flip' }),
      'print-view-pages-1': () => updatePreviewView({ pages: 1 }),
      'print-view-pages-2': () => updatePreviewView({ pages: 2 }),
      'print-toggle-first-page-single': () => {
        setPreviewView((prev) => {
          const next = { ...prev, firstPageSingle: !prev.firstPageSingle };
          savePrintPreviewView(next);
          return next;
        });
      },
      'print-zoom-in': () => {
        setPreviewView((prev) => {
          const next = { ...prev, zoomPercent: stepZoomPercent(prev.zoomPercent, 1) };
          savePrintPreviewView(next);
          return next;
        });
      },
      'print-zoom-out': () => {
        setPreviewView((prev) => {
          const next = { ...prev, zoomPercent: stepZoomPercent(prev.zoomPercent, -1) };
          savePrintPreviewView(next);
          return next;
        });
      },
      'print-zoom-reset': () => updatePreviewView({ zoomPercent: 100 }),
      'print-cover-place-text': () => {
        if (!coverEditMode) {
          toggleCoverEditMode();
        }
        setCoverPlaceMode((prev) => (prev?.kind === 'text' ? null : { kind: 'text' }));
      },
      'print-cover-place-rect': () => {
        if (!coverEditMode) {
          toggleCoverEditMode();
        }
        setCoverPlaceMode((prev) => (
          prev?.kind === 'shape' && prev.shapeType === 'rect'
            ? null
            : { kind: 'shape', shapeType: 'rect' }
        ));
      },
      'print-cover-place-ellipse': () => {
        if (!coverEditMode) {
          toggleCoverEditMode();
        }
        setCoverPlaceMode((prev) => (
          prev?.kind === 'shape' && prev.shapeType === 'ellipse'
            ? null
            : { kind: 'shape', shapeType: 'ellipse' }
        ));
      },
      'print-cover-font-size-up': () => {
        if (!coverEditMode || !activeCover || !coverSelectedIds.length) return;
        const next = nudgeCoverFontSizes(activeCover, coverSelectedIds, 1);
        if (next !== activeCover) onCoverChange(next);
      },
      'print-cover-font-size-down': () => {
        if (!coverEditMode || !activeCover || !coverSelectedIds.length) return;
        const next = nudgeCoverFontSizes(activeCover, coverSelectedIds, -1);
        if (next !== activeCover) onCoverChange(next);
      },
      'print-cover-text-align-left': () => {
        if (!coverEditMode || !activeCover || !coverSelectedIds.length) return;
        const next = setCoverTextAlign(activeCover, coverSelectedIds, 'left');
        if (next !== activeCover) onCoverChange(next);
      },
      'print-cover-text-align-center': () => {
        if (!coverEditMode || !activeCover || !coverSelectedIds.length) return;
        const next = setCoverTextAlign(activeCover, coverSelectedIds, 'center');
        if (next !== activeCover) onCoverChange(next);
      },
      'print-cover-text-align-right': () => {
        if (!coverEditMode || !activeCover || !coverSelectedIds.length) return;
        const next = setCoverTextAlign(activeCover, coverSelectedIds, 'right');
        if (next !== activeCover) onCoverChange(next);
      },
    };
    for (const size of PRINT_PAGE_SIZES) {
      handlers[paperActionId(size.id)] = () => {
        updatePrintLayout({ pageSizeId: size.id });
      };
    }
    return registerPrintActions(handlers);
  }, [
    handleSave,
    handleExport,
    updatePrintLayout,
    updatePreviewView,
    coverEditMode,
    toggleCoverEditMode,
    activeCover,
    coverSelectedIds,
    onCoverChange,
  ]);

  useEffect(() => {
    return registerPrintPreviewNavigator(({ headingId }) => {
      navigatePreviewToHeading(headingId);
    });
  }, [navigatePreviewToHeading]);

  useEffect(() => {
    return registerPrintTocProvider(() =>
      tocItems.map((item) => ({
        id: item.id,
        text: item.text,
        level: item.level,
      })),
    );
  }, [tocItems]);

  // Ctrl/Cmd + wheel zoom on preview.
  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return undefined;
    const onWheel = (event) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      setPreviewView((prev) => {
        const next = { ...prev, zoomPercent: stepZoomPercent(prev.zoomPercent, direction) };
        savePrintPreviewView(next);
        return next;
      });
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    return () => root.removeEventListener('wheel', onWheel);
  }, [previewPanRoot]);

  // Space+drag / middle-mouse drag pans the preview scroll area.
  useScrollPointerPan(previewPanRoot);

  const fontStyleVars = {
    ...buildPrintLayoutCssVars(printLayout),
    '--print-font-body': withFontFallback(fonts.body),
    '--print-font-heading': withFontFallback(fonts.heading),
    '--print-font-bold': withFontFallback(fonts.bold),
    '--print-font-code': withFontFallback(fonts.code, 'mono'),
  };

  if (isDocumentLoading) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800">
        <p className="text-sm text-gray-600 dark:text-odp-fg">문서를 불러오는 중…</p>
      </div>
    );
  }

  if (!hasNavigationSession && locationState == null && !routeExportPath && !previewValue) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800">
        <p className="text-sm text-gray-600 dark:text-odp-fg">
          인쇄 미리보기 세션이 없습니다. 편집기에서 다시 열어 주세요.
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        >
          <ArrowLeft size={18} />
          뒤로 가기
        </button>
      </div>
    );
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
            data-print-toolbar="back"
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
              data-print-toolbar="font"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition"
              aria-label="폰트 설정"
            >
              <Settings size={16} />
              폰트 설정
            </button>
            <button
              type="button"
              onClick={() => setTocVisible((v) => !v)}
              data-print-toolbar="toc"
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
              data-print-toolbar="save"
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
              className="md-editor-btn inline-flex items-center gap-1.5"
              data-print-toolbar="export"
              onClick={handleExport}
              aria-label="내보내기"
            >
              <Printer size={16} />
              내보내기
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={toggleCoverEditMode}
            data-print-toolbar="cover"
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded transition ${
              coverEditMode
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
                : 'text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg'
            }`}
            aria-label={parsedCover ? '표지 편집' : '표지 추가'}
            aria-pressed={coverEditMode}
            title={parsedCover ? '표지 편집' : '표지 추가'}
          >
            <LayoutTemplate size={16} />
            {parsedCover ? '표지 편집' : '표지 추가'}
          </button>
          <PrintPageSizeSelect
            value={printLayout.pageSizeId}
            onValueChange={(pageSizeId) => updatePrintLayout({ pageSizeId })}
          />
          <PrintPreviewNavSelect
            value={effectiveNavigation}
            disabled={viewControlsLocked}
            onValueChange={(navigation) => {
              updatePreviewView({ navigation });
              setFlipIndex(0);
            }}
          />
          <PrintPreviewPagesSelect
            value={effectivePages}
            disabled={viewControlsLocked}
            onValueChange={(pages) => {
              updatePreviewView({ pages });
              setFlipIndex(0);
            }}
          />
          {effectivePages === 2 && !viewControlsLocked ? (
            <PrintPreviewFirstPageSingleSwitch
              checked={previewView.firstPageSingle}
              onCheckedChange={(firstPageSingle) => {
                updatePreviewView({ firstPageSingle });
                setFlipIndex(0);
              }}
            />
          ) : null}
          <PrintPreviewZoomControls
            value={previewView.zoomPercent}
            onChange={(zoomPercent) => updatePreviewView({ zoomPercent })}
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
        style={{
          '--export-toc-width': `${tocWidth}px`,
          '--export-cover-sidebar-width': `${coverChromeWidth}px`,
        }}
      >
        <div
          ref={setPreviewContainerRef}
          className={`export-pdf-preview-scroll relative px-4 py-6 min-h-0 flex-1 bg-neutral-200 dark:bg-neutral-800 text-gray-900 print:bg-white print:h-auto print:max-h-none print:overflow-visible print:p-0 ${
            isLiveScroll1 ? 'overflow-auto' : 'overflow-hidden'
          } ${tocVisible ? 'md:pr-(--export-toc-width)' : ''} ${
            coverEditMode ? 'md:pl-(--export-cover-sidebar-width)' : ''
          }`}
        >
          {!isLiveScroll1 ? (
            <div
              className={`absolute inset-0 print:hidden ${
                tocVisible ? 'md:right-(--export-toc-width)' : ''
              }`}
            >
              <PrintPreviewStage
                navigation={effectiveNavigation}
                pages={effectivePages}
                firstPageSingle={previewView.firstPageSingle}
                zoomPercent={previewView.zoomPercent}
                onZoomChange={handleStageZoomChange}
                pageSizeId={printLayout.pageSizeId}
                pageStarts={pageStarts}
                pageInnerHeightPx={pageInnerHeightPx}
                hasCover={Boolean(activeCover?.enabled)}
                coverNode={
                  activeCover?.enabled ? (
                    <CoverSlide
                      cover={activeCover}
                      getPresignedUrl={getPresignedUrl}
                      className="h-full w-full shadow-none"
                    />
                  ) : null
                }
                sourceContentRef={paperContentRef}
                layoutKey={`${printLayoutKey}|${bodyMarkdown}|${pageInnerHeightPx}`}
                flipIndex={flipIndex}
                onFlipIndexChange={setFlipIndex}
                onVisibleLogicalPagesChange={setStageVisiblePages}
              />
            </div>
          ) : null}
          <div
            className={`export-pdf-cover-stack mx-auto w-full print:mx-0 ${
              isLiveScroll1 ? '' : 'export-pdf-source-measure'
            }`}
            style={
              isLiveScroll1
                ? { zoom: previewView.zoomPercent / 100 }
                : undefined
            }
            aria-hidden={isLiveScroll1 ? undefined : true}
          >
            {activeCover?.enabled || coverEditMode ? (
              coverEditMode && activeCover ? (
                <>
                  <CoverEditor
                    cover={activeCover}
                    selectedIds={coverSelectedIds}
                    onSelectIds={setCoverSelectedIds}
                    onChange={onCoverChange}
                    getPresignedUrl={getPresignedUrl}
                    currentFile={currentFile}
                    centerSnapEnabled={coverCenterSnap}
                    centerSnapTolerance={coverCenterSnapTolerance}
                    objectSnapEnabled={coverObjectSnap}
                    objectSnapTolerance={coverObjectSnapTolerance}
                    textContainerOutlineEnabled={coverTextContainerOutline}
                    placePreviewEnabled={coverPlacePreview}
                    placeMode={coverPlaceMode}
                    onPlaceModeChange={setCoverPlaceMode}
                    onUndo={undoCover}
                    onRedo={redoCover}
                    className="mx-auto print:hidden print:mx-0"
                  />
                  {activeCover.enabled ? (
                    <CoverSlide
                      cover={activeCover}
                      getPresignedUrl={getPresignedUrl}
                      className="mx-auto hidden shadow-none print:block print:mx-0"
                    />
                  ) : null}
                </>
              ) : activeCover?.enabled ? (
                <CoverSlide
                  cover={activeCover}
                  getPresignedUrl={getPresignedUrl}
                  className="mx-auto shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none print:mx-0"
                />
              ) : null
            ) : null}
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
                  value={bodyMarkdown}
                  mdHeadingId={headingId}
                  codeFoldable={false}
                  showCodeRowNumber={false}
                />
              </div>
            </div>
          </div>
        </div>
        <PrintVisiblePageBadge
          pageStarts={pageStarts}
          contentHeight={contentHeight}
          paperRef={paperContentRef}
          scrollRef={previewContainerRef}
          overridePages={isLiveScroll1 ? null : stageVisiblePages}
        />
        {coverEditMode && activeCover ? (
          <CoverSidebar
            cover={activeCover}
            selectedIds={coverSelectedIds}
            onSelectIds={setCoverSelectedIds}
            onChange={onCoverChange}
            currentFile={currentFile}
            topPx={tocTopPx}
            width={coverSidebarWidth}
            isResizing={coverSidebarResizing}
            resizeHandleProps={coverSidebarResizeHandleProps}
            layersDetached={coverLayersDetached}
            onLayersDetachedChange={handleCoverLayersDetachedChange}
            layersWidth={coverLayersSidebarWidth}
            layersIsResizing={coverLayersSidebarResizing}
            layersResizeHandleProps={coverLayersSidebarResizeHandleProps}
            centerSnapEnabled={coverCenterSnap}
            onCenterSnapEnabledChange={handleCoverCenterSnapChange}
            centerSnapTolerance={coverCenterSnapTolerance}
            onCenterSnapToleranceChange={handleCoverCenterSnapToleranceChange}
            objectSnapEnabled={coverObjectSnap}
            onObjectSnapEnabledChange={handleCoverObjectSnapChange}
            objectSnapTolerance={coverObjectSnapTolerance}
            onObjectSnapToleranceChange={handleCoverObjectSnapToleranceChange}
            textContainerOutlineEnabled={coverTextContainerOutline}
            onTextContainerOutlineEnabledChange={handleCoverTextContainerOutlineChange}
            placePreviewEnabled={coverPlacePreview}
            onPlacePreviewEnabledChange={handleCoverPlacePreviewChange}
            placeMode={coverPlaceMode}
            onPlaceModeChange={setCoverPlaceMode}
            canUndo={canUndoCover}
            canRedo={canRedoCover}
            onUndo={undoCover}
            onRedo={redoCover}
          />
        ) : null}
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
        isOpen={isLeaveBlocked}
        title="저장하지 않은 변경사항"
        message="저장하지 않은 변경사항이 있습니다. 이동하면 변경사항이 사라집니다."
        confirmLabel="저장 후 이동"
        cancelLabel="취소"
        discardLabel="저장 안 하고 이동"
        onConfirm={() => {
          void handleNavGuardSaveAndLeave();
        }}
        onCancel={resetLeave}
        onDiscard={handleNavGuardDiscardAndLeave}
        confirmDisabled={!currentFile?.id || isSaving}
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
