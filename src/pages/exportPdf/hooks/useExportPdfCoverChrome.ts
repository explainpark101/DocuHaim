import {
  COVER_LAYERS_SIDEBAR_DEFAULT_WIDTH,
  COVER_LAYERS_SIDEBAR_WIDTH_KEY,
  COVER_SIDEBAR_DEFAULT_WIDTH,
  COVER_SIDEBAR_WIDTH_KEY,
} from '@/components/noteCover/CoverSidebar';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

export function useExportPdfCoverChrome(coverLayersDetached: boolean) {
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

  return {
    coverSidebarWidth,
    coverSidebarResizing,
    coverSidebarResizeHandleProps,
    coverLayersSidebarWidth,
    coverLayersSidebarResizing,
    coverLayersSidebarResizeHandleProps,
    coverChromeWidth,
  };
}

export type ExportPdfCoverChromeState = ReturnType<typeof useExportPdfCoverChrome>;
