import type { RefObject } from 'react';
import CoverEditor from '@/components/noteCover/CoverEditor';
import CoverSlide from '@/components/noteCover/CoverSlide';
import CoverSidebar from '@/components/noteCover/CoverSidebar';
import PrintCoverPageChrome from '@/components/print/PrintCoverPageChrome';
import type { NoteCover } from '@/utils/noteCover';
import type { CoverPlaceMode } from '@/utils/noteCover/placeMode';
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
}: CoverPagesProps) {
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
          </PrintCoverPageChrome>
        </div>
        {activeCover.enabled ? (
          <CoverSlide
            cover={activeCover}
            getPresignedUrl={getPresignedUrl}
            className="mx-auto hidden shadow-none print:block print:mx-0"
          />
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
