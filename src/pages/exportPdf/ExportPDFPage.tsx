import { useRef } from 'react';
import { ExportPdfBodyPreview } from '@/pages/exportPdf/ExportPdfBodyPreview';
import { ExportPdfCoverPages, ExportPdfCoverSidebar } from '@/pages/exportPdf/ExportPdfCoverSection';
import { ExportPdfShell } from '@/pages/exportPdf/ExportPdfShell';
import type { ExportPDFPageProps } from '@/pages/exportPdf/exportPdfTypes';
import { useExportPdfCover } from '@/pages/exportPdf/hooks/useExportPdfCover';
import { useExportPdfCoverChrome } from '@/pages/exportPdf/hooks/useExportPdfCoverChrome';
import { useExportPdfDocument } from '@/pages/exportPdf/hooks/useExportPdfDocument';
import { useExportPdfHaimTableInteractions } from '@/pages/exportPdf/hooks/useExportPdfHaimTableInteractions';
import { useExportPdfImageInteractions } from '@/pages/exportPdf/hooks/useExportPdfImageInteractions';
import { useExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';
import { useExportPdfPrintActions } from '@/pages/exportPdf/hooks/useExportPdfPrintActions';
import { useExportPdfPrintLayout } from '@/pages/exportPdf/hooks/useExportPdfPrintLayout';
import { useExportPdfToc } from '@/pages/exportPdf/hooks/useExportPdfToc';
import { loadPrintPageLayout } from '@/utils/printPageLayout';

export default function ExportPDFPage(props: ExportPDFPageProps) {
  const refs = useExportPdfPreviewRefs();
  const printLayoutRef = useRef(loadPrintPageLayout());

  const doc = useExportPdfDocument({ ...props, refs, printLayoutRef });
  const cover = useExportPdfCover({
    setPreviewValue: doc.setPreviewValue,
    currentFile: doc.currentFile,
    activeCover: doc.activeCover,
    parsedCover: doc.parsedCover,
    openCoverEdit: doc.openCoverEdit,
    printLayoutRef,
  });
  const layout = useExportPdfPrintLayout({
    bodyMarkdown: doc.bodyMarkdown,
    currentFile: doc.currentFile,
    documentSettings: doc.documentSettings,
    previewValue: doc.previewValue,
    activeCover: doc.activeCover,
    hasEnabledCover: doc.hasEnabledCover,
    coverEditMode: cover.coverEditMode,
    handleCoverChange: cover.handleCoverChange,
    refs,
    printLayoutRef,
  });
  const chrome = useExportPdfCoverChrome(cover.coverLayersDetached);
  const toc = useExportPdfToc({
    bodyMarkdown: doc.bodyMarkdown,
    setPreviewValue: doc.setPreviewValue,
    currentFileRef: doc.currentFileRef,
    previewValueRef: doc.previewValueRef,
    activeCover: doc.activeCover,
    bodyPageCount: layout.bodyPageCount,
    effectivePages: layout.effectivePages,
    isLiveScroll1: layout.isLiveScroll1,
    previewView: layout.previewView,
    setFlipIndex: layout.setFlipIndex,
    refs,
  });
  const images = useExportPdfImageInteractions({
    previewValue: doc.previewValue,
    setPreviewValue: doc.setPreviewValue,
    currentFile: doc.currentFile,
    currentFileRef: doc.currentFileRef,
    previewValueRef: doc.previewValueRef,
    refs,
  });
  const tables = useExportPdfHaimTableInteractions({
    previewValue: doc.previewValue,
    setPreviewValue: doc.setPreviewValue,
    previewValueRef: doc.previewValueRef,
    refs,
  });

  useExportPdfPrintActions({
    handleSave: doc.handleSave,
    activeCover: doc.activeCover,
    handleExport: layout.handleExport,
    setFontModalOpen: layout.setFontModalOpen,
    setPreviewView: layout.setPreviewView,
    updatePreviewView: layout.updatePreviewView,
    updatePrintLayout: layout.updatePrintLayout,
    coverEditMode: cover.coverEditMode,
    coverSelectedIds: cover.coverSelectedIds,
    onCoverChange: cover.onCoverChange,
    toggleCoverEditMode: cover.toggleCoverEditMode,
    setCoverPlaceMode: cover.setCoverPlaceMode,
    setTocVisible: toc.setTocVisible,
    navigatePreviewToHeading: toc.navigatePreviewToHeading,
    tocItems: toc.tocItems,
    refs,
  });

  const coverPages = (
    <ExportPdfCoverPages
      coverEditMode={cover.coverEditMode}
      activeCover={doc.activeCover}
      hasEnabledCover={doc.hasEnabledCover}
      isLiveScroll1={layout.isLiveScroll1}
      coverPageRef={refs.coverPageRef}
      coverSelectedIds={cover.coverSelectedIds}
      setCoverSelectedIds={cover.setCoverSelectedIds}
      onCoverChange={cover.onCoverChange}
      getPresignedUrl={layout.getPresignedUrl}
      currentFile={doc.currentFile}
      coverCenterSnap={cover.coverCenterSnap}
      coverCenterSnapTolerance={cover.coverCenterSnapTolerance}
      coverObjectSnap={cover.coverObjectSnap}
      coverObjectSnapTolerance={cover.coverObjectSnapTolerance}
      coverTextContainerOutline={cover.coverTextContainerOutline}
      coverPlacePreview={cover.coverPlacePreview}
      coverPlaceMode={cover.coverPlaceMode}
      setCoverPlaceMode={cover.setCoverPlaceMode}
      undoCover={cover.undoCover}
      redoCover={cover.redoCover}
    />
  );

  const previewContent = (
    <ExportPdfBodyPreview
      coverPages={coverPages}
      isLiveScroll1={layout.isLiveScroll1}
      tocVisible={toc.tocVisible}
      previewViewZoomPercent={layout.previewView.zoomPercent}
      effectiveNavigation={layout.effectiveNavigation}
      effectivePages={layout.effectivePages}
      firstPageSingle={layout.previewView.firstPageSingle}
      onStageZoomChange={layout.handleStageZoomChange}
      pageSizeId={layout.printLayout.pageSizeId}
      bodyPageCount={layout.bodyPageCount}
      packLayoutKey={layout.packLayoutKey}
      activeCover={doc.activeCover}
      getPresignedUrl={layout.getPresignedUrl}
      flipIndex={layout.flipIndex}
      setFlipIndex={layout.setFlipIndex}
      setStageVisiblePages={layout.setStageVisiblePages}
      pagesHostRef={refs.pagesHostRef}
      paperContentRef={refs.paperContentRef}
      imageMaxProbeRef={refs.imageMaxProbeRef}
      metricRef={layout.metricRef}
      bodyMarkdown={doc.bodyMarkdown}
      previewFootnotesRenderKey={layout.previewFootnotesRenderKey}
    />
  );

  const coverSidebar = (
    <ExportPdfCoverSidebar
      coverEditMode={cover.coverEditMode}
      activeCover={doc.activeCover}
      hasEnabledCover={doc.hasEnabledCover}
      isLiveScroll1={layout.isLiveScroll1}
      coverPageRef={refs.coverPageRef}
      coverSelectedIds={cover.coverSelectedIds}
      setCoverSelectedIds={cover.setCoverSelectedIds}
      onCoverChange={cover.onCoverChange}
      getPresignedUrl={layout.getPresignedUrl}
      currentFile={doc.currentFile}
      coverCenterSnap={cover.coverCenterSnap}
      coverCenterSnapTolerance={cover.coverCenterSnapTolerance}
      coverObjectSnap={cover.coverObjectSnap}
      coverObjectSnapTolerance={cover.coverObjectSnapTolerance}
      coverTextContainerOutline={cover.coverTextContainerOutline}
      coverPlacePreview={cover.coverPlacePreview}
      coverPlaceMode={cover.coverPlaceMode}
      setCoverPlaceMode={cover.setCoverPlaceMode}
      undoCover={cover.undoCover}
      redoCover={cover.redoCover}
      tocTopPx={toc.tocTopPx}
      coverSidebarWidth={chrome.coverSidebarWidth}
      coverSidebarResizing={chrome.coverSidebarResizing}
      coverSidebarResizeHandleProps={chrome.coverSidebarResizeHandleProps}
      coverLayersDetached={cover.coverLayersDetached}
      handleCoverLayersDetachedChange={cover.handleCoverLayersDetachedChange}
      coverLayersSidebarWidth={chrome.coverLayersSidebarWidth}
      coverLayersSidebarResizing={chrome.coverLayersSidebarResizing}
      coverLayersSidebarResizeHandleProps={chrome.coverLayersSidebarResizeHandleProps}
      handleCoverCenterSnapChange={cover.handleCoverCenterSnapChange}
      handleCoverCenterSnapToleranceChange={cover.handleCoverCenterSnapToleranceChange}
      handleCoverObjectSnapChange={cover.handleCoverObjectSnapChange}
      handleCoverObjectSnapToleranceChange={cover.handleCoverObjectSnapToleranceChange}
      handleCoverTextContainerOutlineChange={cover.handleCoverTextContainerOutlineChange}
      handleCoverPlacePreviewChange={cover.handleCoverPlacePreviewChange}
      canUndoCover={cover.canUndoCover}
      canRedoCover={cover.canRedoCover}
    />
  );

  return (
    <ExportPdfShell
      isDocumentLoading={Boolean(props.isDocumentLoading)}
      hasNavigationSession={Boolean(props.hasNavigationSession)}
      locationState={doc.locationState}
      routeExportPath={doc.routeExportPath}
      previewValue={doc.previewValue}
      handleBack={doc.handleBack}
      fontStyleVars={layout.fontStyleVars}
      documentSettings={doc.documentSettings}
      printLayout={layout.printLayout}
      printPageInnerPx={layout.printPageInnerPx}
      headerRef={refs.headerRef}
      setPreviewContainerRef={refs.setPreviewContainerRef}
      previewContainerRef={refs.previewContainerRef}
      previewPanRoot={refs.previewPanRoot}
      paperContentRef={refs.paperContentRef}
      previewValueRef={refs.previewValueRef}
      currentFileRef={refs.currentFileRef}
      setPreviewValue={doc.setPreviewValue}
      handleSave={doc.handleSave}
      handleExport={layout.handleExport}
      isSaving={doc.isSaving}
      isDirty={doc.isDirty}
      currentFile={doc.currentFile}
      setFontModalOpen={layout.setFontModalOpen}
      fontModalOpen={layout.fontModalOpen}
      fonts={layout.fonts}
      setFonts={layout.setFonts}
      toggleCoverEditMode={cover.toggleCoverEditMode}
      coverEditMode={cover.coverEditMode}
      parsedCover={doc.parsedCover}
      updatePrintLayout={layout.updatePrintLayout}
      updatePreviewView={layout.updatePreviewView}
      previewView={layout.previewView}
      tocVisible={toc.tocVisible}
      setTocVisible={toc.setTocVisible}
      isLiveScroll1={layout.isLiveScroll1}
      coverChromeWidth={chrome.coverChromeWidth}
      tocWidth={toc.tocWidth}
      tocTopPx={toc.tocTopPx}
      tocResizing={toc.tocResizing}
      tocResizeHandleProps={toc.tocResizeHandleProps}
      tocListRef={toc.tocListRef}
      tocProgrammaticScrollRef={toc.tocProgrammaticScrollRef}
      tocAutoFollowPausedUntilRef={toc.tocAutoFollowPausedUntilRef}
      wrapTitles={toc.wrapTitles}
      setWrapTitles={toc.setWrapTitles}
      tocItems={toc.tocItems}
      visibleHeadingIds={toc.visibleHeadingIds}
      handleTocItemClick={toc.handleTocItemClick}
      setHeadingPgbrModalState={toc.setHeadingPgbrModalState}
      pagesHostRef={refs.pagesHostRef}
      coverPageRef={refs.coverPageRef}
      hasEnabledCover={doc.hasEnabledCover}
      bodyPageCount={layout.bodyPageCount}
      stageVisiblePages={layout.stageVisiblePages}
      previewContent={previewContent}
      coverSidebar={coverSidebar}
      wikiImageModalState={images.wikiImageModalState}
      setWikiImageModalState={images.setWikiImageModalState}
      handleApplyWikiImageSize={images.handleApplyWikiImageSize}
      startFreeTransform={images.startFreeTransform}
      handleCropWikiImage={images.handleCropWikiImage}
      handleConvertMarkdownToWiki={images.handleConvertMarkdownToWiki}
      handleConvertToImgbb={images.handleConvertToImgbb}
      freeTransformState={images.freeTransformState}
      freeTransformOverlayRect={images.freeTransformOverlayRect}
      freeTransformConfirmOpen={images.freeTransformConfirmOpen}
      setFreeTransformConfirmOpen={images.setFreeTransformConfirmOpen}
      isLeaveBlocked={doc.isLeaveBlocked}
      handleNavGuardSaveAndLeave={doc.handleNavGuardSaveAndLeave}
      resetLeave={doc.resetLeave}
      handleNavGuardDiscardAndLeave={doc.handleNavGuardDiscardAndLeave}
      handleConfirmTransformApply={images.handleConfirmTransformApply}
      handleConfirmTransformReset={images.handleConfirmTransformReset}
      headingPgbrModalState={toc.headingPgbrModalState}
      handleInsertPgbrBeforeHeading={toc.handleInsertPgbrBeforeHeading}
      haimTableEdit={tables.haimTableEdit}
      onHaimTableEditFailed={tables.onEditFailed}
    />
  );
}
