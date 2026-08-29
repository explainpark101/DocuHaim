import { useEffect } from 'react';
import { useScrollPointerPan } from '@/hooks/useScrollPointerPan';
import {
  paperActionId,
  registerPrintActions,
  registerPrintPreviewNavigator,
  registerPrintTocProvider,
} from '@/utils/advancedSearch/printActions';
import {
  nudgeCoverFontSizes,
  setCoverTextAlign,
} from '@/utils/noteCover';
import type { CoverPlaceMode } from '@/utils/noteCover/placeMode';
import { PRINT_PAGE_SIZES } from '@/utils/printPageLayout';
import {
  savePrintPreviewView,
  stepZoomPercent,
} from '@/utils/printPreviewView';
import type { ExportPdfCoverState } from '@/pages/exportPdf/hooks/useExportPdfCover';
import type { ExportPdfDocumentState } from '@/pages/exportPdf/hooks/useExportPdfDocument';
import type { ExportPdfPrintLayoutState } from '@/pages/exportPdf/hooks/useExportPdfPrintLayout';
import type { ExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';
import type { ExportPdfTocState } from '@/pages/exportPdf/hooks/useExportPdfToc';

type UseExportPdfPrintActionsArgs = Pick<ExportPdfDocumentState, 'handleSave' | 'activeCover'> &
  Pick<
    ExportPdfPrintLayoutState,
    | 'handleExport'
    | 'setFontModalOpen'
    | 'setPreviewView'
    | 'updatePreviewView'
    | 'updatePrintLayout'
  > &
  Pick<ExportPdfCoverState, 'coverEditMode' | 'coverSelectedIds' | 'onCoverChange' | 'toggleCoverEditMode'> & {
    setCoverPlaceMode: React.Dispatch<React.SetStateAction<CoverPlaceMode>>;
  } &
  Pick<ExportPdfTocState, 'setTocVisible' | 'navigatePreviewToHeading' | 'tocItems'> & {
    refs: Pick<ExportPdfPreviewRefs, 'previewContainerRef' | 'previewPanRoot'>;
  };

export function useExportPdfPrintActions({
  handleSave,
  activeCover,
  handleExport,
  setFontModalOpen,
  setPreviewView,
  updatePreviewView,
  updatePrintLayout,
  coverEditMode,
  coverSelectedIds,
  onCoverChange,
  toggleCoverEditMode,
  setCoverPlaceMode,
  setTocVisible,
  navigatePreviewToHeading,
  tocItems,
  refs,
}: UseExportPdfPrintActionsArgs) {
  const { previewContainerRef, previewPanRoot } = refs;

  useEffect(() => {
    const handlers: Record<string, () => void> = {
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
        setCoverPlaceMode((prev) =>
          prev?.kind === 'shape' && prev.shapeType === 'rect'
            ? null
            : { kind: 'shape', shapeType: 'rect' },
        );
      },
      'print-cover-place-ellipse': () => {
        if (!coverEditMode) {
          toggleCoverEditMode();
        }
        setCoverPlaceMode((prev) =>
          prev?.kind === 'shape' && prev.shapeType === 'ellipse'
            ? null
            : { kind: 'shape', shapeType: 'ellipse' },
        );
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
    activeCover,
    coverEditMode,
    coverSelectedIds,
    handleExport,
    handleSave,
    onCoverChange,
    setCoverPlaceMode,
    setFontModalOpen,
    setPreviewView,
    setTocVisible,
    toggleCoverEditMode,
    updatePreviewView,
    updatePrintLayout,
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

  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return undefined;
    const onWheel = (event: WheelEvent) => {
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
  }, [previewContainerRef, previewPanRoot, setPreviewView]);

  useScrollPointerPan(previewPanRoot, true, { middleClick: Boolean(coverEditMode) });
}
