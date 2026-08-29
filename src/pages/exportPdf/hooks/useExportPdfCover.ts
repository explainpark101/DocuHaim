import { useCallback, useEffect, useState } from 'react';
import { useCoverUndoHistory } from '@/hooks/useCoverUndoHistory';
import {
  loadCoverLayersDetached,
  saveCoverLayersDetached,
} from '@/components/noteCover/CoverSidebar';
import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';
import {
  COVER_SETTINGS_CHANGED_EVENT,
  getCachedCoverSettings,
} from '@/utils/coverSettingsStore';
import {
  createDefaultNoteCover,
  parseNoteCover,
  upsertNoteCoverComment,
  type NoteCover,
} from '@/utils/noteCover';
import type { CoverPlaceMode } from '@/utils/noteCover/placeMode';
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
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import type { PrintPageLayout } from '@/utils/printPageLayout';
import type { ExportPdfDocumentState } from '@/pages/exportPdf/hooks/useExportPdfDocument';

type UseExportPdfCoverArgs = Pick<
  ExportPdfDocumentState,
  | 'setPreviewValue'
  | 'currentFile'
  | 'activeCover'
  | 'parsedCover'
  | 'openCoverEdit'
> & {
  printLayoutRef: React.RefObject<PrintPageLayout>;
};

export function useExportPdfCover({
  setPreviewValue,
  currentFile,
  activeCover,
  parsedCover,
  openCoverEdit,
  printLayoutRef,
}: UseExportPdfCoverArgs) {
  const [coverEditMode, setCoverEditMode] = useState(() => Boolean(openCoverEdit));
  const [coverSelectedIds, setCoverSelectedIds] = useState<string[]>([]);
  const [coverPlaceMode, setCoverPlaceMode] = useState<CoverPlaceMode>(null);
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

  const handleCoverChange = useCallback(
    (nextCover: NoteCover) => {
      setPreviewValue((prev) => {
        const next = upsertNoteCoverComment(prev, nextCover);
        setPendingPrintReturnState({
          currentFile,
          editorContent: next,
        });
        return next;
      });
    },
    [currentFile, setPreviewValue],
  );

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
      const pageSizeId = printLayoutRef.current.pageSizeId;
      const created = createDefaultNoteCover({ pageSizeId });
      const next = upsertNoteCoverComment(md, created);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next,
      });
      return next;
    });
  }, [coverEditMode, currentFile, printLayoutRef, setPreviewValue]);

  const handleCoverCenterSnapChange = useCallback((enabled: boolean) => {
    setCoverCenterSnap(enabled);
    setSettingsToggle('settings-cover-center-snap', enabled);
  }, []);

  const handleCoverCenterSnapToleranceChange = useCallback((value: number) => {
    setCoverCenterSnapTolerance(value);
    saveCoverCenterSnapTolerance(value);
  }, []);

  const handleCoverObjectSnapChange = useCallback((enabled: boolean) => {
    setCoverObjectSnap(enabled);
    setSettingsToggle('settings-cover-object-snap', enabled);
  }, []);

  const handleCoverObjectSnapToleranceChange = useCallback((value: number) => {
    setCoverObjectSnapTolerance(value);
    saveCoverObjectSnapTolerance(value);
  }, []);

  const handleCoverTextContainerOutlineChange = useCallback((enabled: boolean) => {
    setCoverTextContainerOutline(enabled);
    setSettingsToggle('settings-cover-text-outline', enabled);
  }, []);

  const handleCoverPlacePreviewChange = useCallback((enabled: boolean) => {
    setCoverPlacePreview(enabled);
    setSettingsToggle('settings-cover-place-preview', enabled);
  }, []);

  const handleCoverLayersDetachedChange = useCallback((detached: boolean) => {
    setCoverLayersDetached(detached);
    saveCoverLayersDetached(detached);
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

  return {
    coverEditMode,
    setCoverEditMode,
    coverSelectedIds,
    setCoverSelectedIds,
    coverPlaceMode,
    setCoverPlaceMode,
    coverCenterSnap,
    coverCenterSnapTolerance,
    coverObjectSnap,
    coverObjectSnapTolerance,
    coverTextContainerOutline,
    coverPlacePreview,
    coverLayersDetached,
    handleCoverChange,
    onCoverChange,
    undoCover,
    redoCover,
    canUndoCover,
    canRedoCover,
    toggleCoverEditMode,
    handleCoverCenterSnapChange,
    handleCoverCenterSnapToleranceChange,
    handleCoverObjectSnapChange,
    handleCoverObjectSnapToleranceChange,
    handleCoverTextContainerOutlineChange,
    handleCoverPlacePreviewChange,
    handleCoverLayersDetachedChange,
    parsedCover,
  };
}

export type ExportPdfCoverState = ReturnType<typeof useExportPdfCover>;
