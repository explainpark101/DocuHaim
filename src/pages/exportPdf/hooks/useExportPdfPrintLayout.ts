import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyMermaidRender } from '@/hooks/useLazyMermaidRender';
import { usePrintImageAspectFit } from '@/hooks/usePrintImageAspectFit';
import { usePrintMermaidFit } from '@/hooks/usePrintMermaidFit';
import { usePrintPageInnerHeightPx } from '@/hooks/usePrintPageInnerHeightPx';
import { usePrintTableFit } from '@/hooks/usePrintTableFit';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { bindPreviewFootnoteClick } from '@/utils/previewFootnoteScroll';
import { FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT } from '@/utils/previewFootnotesSettings';
import { printFontCssVarValue } from '@/utils/fontFallback';
import {
  buildPrintLayoutCssVars,
  getPrintPageInnerSizePx,
  loadPrintPageLayout,
  savePrintPageLayout,
  type PrintPageLayout,
} from '@/utils/printPageLayout';
import {
  clampZoomPercent,
  DEFAULT_PRINT_PREVIEW_VIEW,
  loadPrintPreviewView,
  savePrintPreviewView,
  type PrintPreviewViewState,
} from '@/utils/printPreviewView';
import {
  DEFAULT_PRINT_FONTS,
  getPresignedUrlResolver,
  getPrintSettingsStoreEpoch,
  loadPrintFontsFromStorage,
  PRINT_SETTINGS_STORE_CHANGED_EVENT,
} from '@/utils/printSettingsStore';
import type { ExportPdfCoverState } from '@/pages/exportPdf/hooks/useExportPdfCover';
import type { ExportPdfDocumentState } from '@/pages/exportPdf/hooks/useExportPdfDocument';
import { usePagedJsPreview } from '@/pages/exportPdf/hooks/usePagedJsPreview';
import type { ExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';
import { mountExportPdfBrowserPrintPrep, prepareExportPdfBrowserPrint } from '@/utils/exportPdf/prepareExportPdfBrowserPrint';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';

type UseExportPdfPrintLayoutArgs = Pick<
  ExportPdfDocumentState,
  | 'bodyMarkdown'
  | 'currentFile'
  | 'documentSettings'
  | 'previewValue'
  | 'activeCover'
  | 'hasEnabledCover'
> &
  Pick<ExportPdfCoverState, 'coverEditMode' | 'handleCoverChange'> & {
    refs: Pick<
      ExportPdfPreviewRefs,
      | 'paperContentRef'
      | 'pagesHostRef'
      | 'imageMaxProbeRef'
      | 'previewContainerRef'
      | 'previewPanRoot'
    >;
    printLayoutRef: React.MutableRefObject<PrintPageLayout>;
  };

export function useExportPdfPrintLayout({
  bodyMarkdown,
  currentFile,
  documentSettings,
  previewValue,
  activeCover,
  hasEnabledCover,
  coverEditMode,
  handleCoverChange,
  refs,
  printLayoutRef,
}: UseExportPdfPrintLayoutArgs) {
  const { paperContentRef, pagesHostRef, imageMaxProbeRef, previewContainerRef, previewPanRoot } =
    refs;

  const [fonts, setFonts] = useState(() => ({ ...DEFAULT_PRINT_FONTS }));
  const [printLayout, setPrintLayout] = useState<PrintPageLayout>(() => loadPrintPageLayout());
  printLayoutRef.current = printLayout;

  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [previewView, setPreviewView] = useState<PrintPreviewViewState>(() =>
    loadPrintPreviewView(),
  );
  const [flipIndex, setFlipIndex] = useState(0);
  const [stageVisiblePages, setStageVisiblePages] = useState<number[] | null>(null);
  const [previewFootnotesRenderKey, setPreviewFootnotesRenderKey] = useState(0);
  const [printStoreEpoch, setPrintStoreEpoch] = useState(() => getPrintSettingsStoreEpoch());

  const printLayoutKey = `${printLayout.pageSizeId}|${printLayout.imageMaxWidth}|${printLayout.imageMaxHeight}`;
  const fontLayoutKey = `${fonts.baseFontSizePx}|${fonts.bodyLineHeight}|${fonts.headingLineHeight}`;
  const { metricRef, pageInnerHeightPx } = usePrintPageInnerHeightPx(printLayoutKey);
  usePrintImageAspectFit(paperContentRef, imageMaxProbeRef, printLayoutKey);
  usePrintTableFit(paperContentRef, `${printLayoutKey}|${previewValue}`);
  useLazyMermaidRender(paperContentRef, {
    eager: true,
    layoutKey: `${printLayoutKey}|${previewValue}`,
  });
  usePrintMermaidFit(paperContentRef, imageMaxProbeRef, `${printLayoutKey}|${previewValue}`);

  useEffect(() => mountExportPdfBrowserPrintPrep(), []);

  const printPageInnerPx = getPrintPageInnerSizePx(printLayout.pageSizeId);
  const effectivePageInnerHeightPx =
    pageInnerHeightPx > 1 ? pageInnerHeightPx : printPageInnerPx.heightPx;
  const pagedSourceKey = `${printLayoutKey}|${fontLayoutKey}|${previewValue}|${effectivePageInnerHeightPx}`;
  const {
    pageCount: bodyPageCount,
    packLayoutKey,
  } = usePagedJsPreview({
    sourceRef: paperContentRef,
    outputRef: pagesHostRef,
    layoutKey: pagedSourceKey,
    pageSizeId: printLayout.pageSizeId,
    bodyLineHeight: fonts.bodyLineHeight || DEFAULT_PRINT_FONTS.bodyLineHeight,
    headingLineHeight: fonts.headingLineHeight || DEFAULT_PRINT_FONTS.headingLineHeight,
    baseFontSizePx: fonts.baseFontSizePx || DEFAULT_PRINT_FONTS.baseFontSizePx,
  });

  useEffect(() => {
    const onStore = () => setPrintStoreEpoch(getPrintSettingsStoreEpoch());
    window.addEventListener(PRINT_SETTINGS_STORE_CHANGED_EVENT, onStore);
    setPrintStoreEpoch(getPrintSettingsStoreEpoch());
    return () => window.removeEventListener(PRINT_SETTINGS_STORE_CHANGED_EVENT, onStore);
  }, []);

  const getPresignedUrl = useMemo(
    () =>
      getPresignedUrlResolver(
        currentFile?.type as 'local' | 's3' | 'webdav' | null | undefined,
      ),
    // printStoreEpoch: MainApp injects S3/local/WebDAV after mount; type alone is not enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- epoch proxies store readiness
    [currentFile?.type, printStoreEpoch],
  );

  useEffect(() => {
    let cancelled = false;
    void loadPrintFontsFromStorage().then((loaded) => {
      if (!cancelled) setFonts(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useWikiImageHydration(
    previewContainerRef,
    bodyMarkdown,
    getPresignedUrl ?? undefined,
    currentFile?.id,
  );

  useEffect(() => {
    if (!previewPanRoot) return undefined;
    return bindPreviewFootnoteClick(previewPanRoot);
  }, [previewPanRoot]);

  useEffect(() => {
    const onFootnotesSourcesChanged = () => {
      setPreviewFootnotesRenderKey((k) => k + 1);
    };
    window.addEventListener(FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT, onFootnotesSourcesChanged);
    return () => {
      window.removeEventListener(FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT, onFootnotesSourcesChanged);
    };
  }, []);

  // Preview is locked to scroll + 1 page (2-page / flip modes are disabled).
  const effectiveNavigation = 'scroll' as const;
  const effectivePages = 1 as const;
  const isLiveScroll1 = true;

  const updatePreviewView = useCallback((partial: Partial<PrintPreviewViewState>) => {
    setPreviewView((prev) => {
      const next = {
        ...prev,
        ...partial,
        // Keep preview locked to scroll + 1 page while alternate modes are disabled.
        navigation: DEFAULT_PRINT_PREVIEW_VIEW.navigation,
        pages: DEFAULT_PRINT_PREVIEW_VIEW.pages,
        firstPageSingle: DEFAULT_PRINT_PREVIEW_VIEW.firstPageSingle,
      };
      if (Object.prototype.hasOwnProperty.call(partial, 'zoomPercent')) {
        next.zoomPercent = clampZoomPercent(partial.zoomPercent ?? prev.zoomPercent);
      }
      savePrintPreviewView(next);
      return next;
    });
  }, []);

  const handleStageZoomChange = useCallback(
    (zoomPercent: number) => {
      updatePreviewView({ zoomPercent });
    },
    [updatePreviewView],
  );

  const updatePrintLayout = useCallback(
    (partial: Partial<PrintPageLayout>) => {
      setPrintLayout((prev) => {
        const next = { ...prev, ...partial };
        savePrintPageLayout(next);
        return next;
      });
      if (
        partial.pageSizeId &&
        activeCover &&
        partial.pageSizeId !== activeCover.pageSizeId
      ) {
        handleCoverChange({ ...activeCover, pageSizeId: partial.pageSizeId });
      }
    },
    [activeCover, handleCoverChange],
  );

  useEffect(() => {
    if (!coverEditMode || !activeCover?.pageSizeId) return;
    if (activeCover.pageSizeId === printLayout.pageSizeId) return;
    setPrintLayout((prev) => {
      if (prev.pageSizeId === activeCover.pageSizeId) return prev;
      const next = { ...prev, pageSizeId: activeCover.pageSizeId };
      savePrintPageLayout(next);
      return next;
    });
  }, [activeCover?.pageSizeId, coverEditMode, printLayout.pageSizeId]);

  const handleExport = useCallback(() => {
    const pages = document.querySelector('[data-export-pdf-pages]');
    if (!pages) return;
    const hasPages =
      pages.querySelector(`[${PRINT_BODY_PAGE_ATTR}]`) != null
      || pages.querySelector('.pagedjs_page') != null
      || pages.children.length > 0;
    if (!hasPages) return;

    const restore = prepareExportPdfBrowserPrint();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      restore();
    };
    window.addEventListener('afterprint', finish, { once: true });
    window.setTimeout(finish, 5000);
    window.print();
  }, []);

  const fontStyleVars = {
    ...buildPrintLayoutCssVars(printLayout),
    ...Object.fromEntries(
      [
        ['--print-font-body', printFontCssVarValue(documentSettings.fonts?.body || fonts.body)],
        [
          '--print-font-heading',
          printFontCssVarValue(documentSettings.fonts?.heading || fonts.heading),
        ],
        ['--print-font-bold', printFontCssVarValue(documentSettings.fonts?.bold || fonts.bold)],
        [
          '--print-font-code',
          printFontCssVarValue(documentSettings.fonts?.code || fonts.code, 'mono'),
        ],
        ['--print-line-height-body', fonts.bodyLineHeight || DEFAULT_PRINT_FONTS.bodyLineHeight],
        [
          '--print-line-height-heading',
          fonts.headingLineHeight || DEFAULT_PRINT_FONTS.headingLineHeight,
        ],
        [
          '--print-font-size',
          `${fonts.baseFontSizePx || DEFAULT_PRINT_FONTS.baseFontSizePx}px`,
        ],
      ].filter((entry): entry is [string, string] => entry[1] != null && entry[1] !== ''),
    ),
  };

  return {
    fonts,
    setFonts,
    printLayout,
    setPrintLayout,
    fontModalOpen,
    setFontModalOpen,
    previewView,
    setPreviewView,
    flipIndex,
    setFlipIndex,
    stageVisiblePages,
    setStageVisiblePages,
    previewFootnotesRenderKey,
    printStoreEpoch,
    getPresignedUrl,
    printLayoutKey,
    packLayoutKey,
    bodyPageCount,
    effectivePageInnerHeightPx,
    printPageInnerPx,
    metricRef,
    effectiveNavigation,
    effectivePages,
    isLiveScroll1,
    updatePreviewView,
    handleStageZoomChange,
    updatePrintLayout,
    handleExport,
    fontStyleVars,
    hasEnabledCover,
  };
}

export type ExportPdfPrintLayoutState = ReturnType<typeof useExportPdfPrintLayout>;
