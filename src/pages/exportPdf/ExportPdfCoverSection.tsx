import type { RefObject } from 'react';
import CoverEditor from '@/components/noteCover/CoverEditor';
import CoverSlide from '@/components/noteCover/CoverSlide';
import CoverSidebar from '@/components/noteCover/CoverSidebar';
import PrintChromeLayer from '@/components/print/PrintChromeLayer';
import PrintCoverPageChrome from '@/components/print/PrintCoverPageChrome';
import type { NoteCover } from '@/utils/noteCover';
import type { CoverPlaceMode } from '@/utils/noteCover/placeMode';
import type { PrintPageMarginsMm } from '@/utils/printPageLayout';
import type { PrintChromeDoc } from '@/utils/printChrome';
import type { PrintChromePlacementDraft } from '@/components/print/PrintChromeLayer';
import type { ExportPdfCoverChromeState } from '@/pages/exportPdf/hooks/useExportPdfCoverChrome';
import type { ExportPdfDocumentFile } from '@/pages/exportPdf/exportPdfTypes';

type CoverPagesProps = {
  coverEditMode: boolean;
  activeCover: NoteCover | null | undefined;
  hasEnabledCover: boolean;
  isLiveScroll1: boolean;
  coverPageRef: RefObject<HTMLDivElement | null>;
  coverSelectedIds: string[];
  setCoverSelectedIds: (ids: string[]) => void;
  onCoverChange: (next: NoteCover) => void;
  getPresignedUrl: ((path: string) => Promise<string | null>) | null | undefined;
  currentFile: ExportPdfDocumentFile;
  coverCenterSnap: boolean;
  coverCenterSnapTolerance: number;
  coverObjectSnap: boolean;
  coverObjectSnapTolerance: number;
  coverTextContainerOutline: boolean;
  coverPlacePreview: boolean;
  coverPlaceMode: CoverPlaceMode;
  setCoverPlaceMode: React.Dispatch<React.SetStateAction<CoverPlaceMode>>;
  undoCover: () => void;
  redoCover: () => void;
  printChrome?: PrintChromeDoc | null;
  printChromeMarginsMm?: PrintPageMarginsMm;
  bodyPageCount?: number;
  chromeEditable?: boolean;
  chromeDraftPlacement?: PrintChromePlacementDraft | null;
  onChromePlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onChromePlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
  onChromeRequestCancelPlacement?: (() => void) | undefined;
};

export function ExportPdfCoverPages({
  coverEditMode,
  activeCover,
  hasEnabledCover,
  isLiveScroll1,
  coverPageRef,
  coverSelectedIds,
  setCoverSelectedIds,
  onCoverChange,
  getPresignedUrl,
  currentFile,
  coverCenterSnap,
  coverCenterSnapTolerance,
  coverObjectSnap,
  coverObjectSnapTolerance,
  coverTextContainerOutline,
  coverPlacePreview,
  coverPlaceMode,
  setCoverPlaceMode,
  undoCover,
  redoCover,
  printChrome = null,
  printChromeMarginsMm = { top: 10, right: 10, bottom: 10, left: 10 },
  bodyPageCount = 1,
  chromeEditable = false,
  chromeDraftPlacement = null,
  onChromePlacementDraftChange,
  onChromePlacementDraftCommit,
  onChromeRequestCancelPlacement,
}: CoverPagesProps) {
  const coverChromeOverlay =
    printChrome && printChrome.showOnCover && printChrome.templates.length > 0 ? (
      <PrintChromeLayer
        chrome={printChrome}
        isCover
        hasCover={Boolean(activeCover?.enabled)}
        bodyPageCount={bodyPageCount}
        marginsMm={printChromeMarginsMm}
        getPresignedUrl={getPresignedUrl}
        editable={chromeEditable}
        draftPlacement={chromeDraftPlacement}
        onPlacementDraftChange={onChromePlacementDraftChange}
        onPlacementDraftCommit={onChromePlacementDraftCommit}
        onRequestCancelPlacement={onChromeRequestCancelPlacement}
      />
    ) : null;

  if (!activeCover?.enabled && !coverEditMode) {
    return null;
  }

  if (coverEditMode && activeCover) {
    return (
      <>
        <div ref={coverPageRef}>
          <PrintCoverPageChrome
            showPageMarker={hasEnabledCover && isLiveScroll1}
            className="mx-auto w-fit max-w-full"
          >
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
            <div className="pointer-events-none absolute inset-0 print:hidden">
              {coverChromeOverlay}
            </div>
          </PrintCoverPageChrome>
        </div>
        {activeCover.enabled ? (
          <div className="relative mx-auto hidden w-fit max-w-full print:block">
            <CoverSlide
              cover={activeCover}
              getPresignedUrl={getPresignedUrl}
              className="mx-auto shadow-none print:mx-0"
            />
            {coverChromeOverlay}
          </div>
        ) : null}
      </>
    );
  }

  if (activeCover?.enabled) {
    return (
      <div ref={coverPageRef}>
        <PrintCoverPageChrome
          showPageMarker={isLiveScroll1}
          className="mx-auto w-fit max-w-full"
        >
          <CoverSlide
            cover={activeCover}
            getPresignedUrl={getPresignedUrl}
            className="mx-auto shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none print:mx-0"
          />
          {coverChromeOverlay}
        </PrintCoverPageChrome>
      </div>
    );
  }

  return null;
}

type CoverSidebarProps = CoverPagesProps &
  Pick<
    ExportPdfCoverChromeState,
    | 'coverSidebarWidth'
    | 'coverSidebarResizing'
    | 'coverSidebarResizeHandleProps'
    | 'coverLayersSidebarWidth'
    | 'coverLayersSidebarResizing'
    | 'coverLayersSidebarResizeHandleProps'
  > & {
    tocTopPx: number;
    coverLayersDetached: boolean;
    handleCoverLayersDetachedChange: (detached: boolean) => void;
    handleCoverCenterSnapChange: (enabled: boolean) => void;
    handleCoverCenterSnapToleranceChange: (value: number) => void;
    handleCoverObjectSnapChange: (enabled: boolean) => void;
    handleCoverObjectSnapToleranceChange: (value: number) => void;
    handleCoverTextContainerOutlineChange: (enabled: boolean) => void;
    handleCoverPlacePreviewChange: (enabled: boolean) => void;
    canUndoCover: boolean;
    canRedoCover: boolean;
  };

export function ExportPdfCoverSidebar({
  coverEditMode,
  activeCover,
  coverSelectedIds,
  setCoverSelectedIds,
  onCoverChange,
  currentFile,
  tocTopPx,
  coverSidebarWidth,
  coverSidebarResizing,
  coverSidebarResizeHandleProps,
  coverLayersDetached,
  handleCoverLayersDetachedChange,
  coverLayersSidebarWidth,
  coverLayersSidebarResizing,
  coverLayersSidebarResizeHandleProps,
  coverCenterSnap,
  handleCoverCenterSnapChange,
  coverCenterSnapTolerance,
  handleCoverCenterSnapToleranceChange,
  coverObjectSnap,
  handleCoverObjectSnapChange,
  coverObjectSnapTolerance,
  handleCoverObjectSnapToleranceChange,
  coverTextContainerOutline,
  handleCoverTextContainerOutlineChange,
  coverPlacePreview,
  handleCoverPlacePreviewChange,
  coverPlaceMode,
  setCoverPlaceMode,
  canUndoCover,
  canRedoCover,
  undoCover,
  redoCover,
}: CoverSidebarProps) {
  if (!coverEditMode || !activeCover) {
    return null;
  }

  return (
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
  );
}
