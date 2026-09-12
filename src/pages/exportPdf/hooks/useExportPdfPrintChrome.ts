import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_PRINT_CHROME_DOC,
  applyPrintChromePlacementToAll,
  applyPrintChromePlacementToPage,
  createDefaultImageTemplate,
  createDefaultPageNumberTemplate,
  createDefaultTextTemplate,
  normalizePrintChromeDoc,
  parsePrintChrome,
  upsertPrintChromeComment,
  type PrintChromeDoc,
  type PrintChromeTemplate,
} from '@/utils/printChrome';
import type { PrintChromePlacementDraft } from '@/components/print/PrintChromeLayer';

type Args = {
  previewValue: string;
  setPreviewValue: React.Dispatch<React.SetStateAction<string>>;
};

function withAddedTemplate(
  markdown: string,
  factory: () => PrintChromeTemplate,
): string {
  const { chrome } = parsePrintChrome(markdown);
  const base = chrome ?? { ...DEFAULT_PRINT_CHROME_DOC, templates: [] };
  return upsertPrintChromeComment(markdown, {
    ...base,
    templates: [...base.templates, factory()],
  });
}

/**
 * Parse / upsert note `<!-- print-chrome -->` and modal open state for Export PDF.
 */
export function useExportPdfPrintChrome({ previewValue, setPreviewValue }: Args) {
  const [chromeModalOpen, setChromeModalOpen] = useState(false);
  /** Live / staged drag placement (bar visible when not dragging). */
  const [placementDraft, setPlacementDraft] = useState<PrintChromePlacementDraft | null>(null);
  /** Confirm modal opened from the bottom bar (apply all / this page). */
  const [placementConfirmOpen, setPlacementConfirmOpen] = useState(false);
  /** Confirm discarding unsaved placement changes. */
  const [placementDiscardConfirmOpen, setPlacementDiscardConfirmOpen] = useState(false);

  const parsedChrome = useMemo(() => {
    const { chrome } = parsePrintChrome(previewValue);
    return chrome;
  }, [previewValue]);

  const chromeDoc: PrintChromeDoc = parsedChrome ?? DEFAULT_PRINT_CHROME_DOC;

  const applyChrome = useCallback(
    (next: PrintChromeDoc | null) => {
      setPreviewValue((prev) => upsertPrintChromeComment(prev, next));
    },
    [setPreviewValue],
  );

  const openChromeModal = useCallback(() => {
    setChromeModalOpen(true);
  }, []);

  const addPageNumberAndOpen = useCallback(() => {
    setPreviewValue((prev) => withAddedTemplate(prev, () => createDefaultPageNumberTemplate()));
    setChromeModalOpen(true);
  }, [setPreviewValue]);

  const addTextAndOpen = useCallback(() => {
    setPreviewValue((prev) => withAddedTemplate(prev, () => createDefaultTextTemplate()));
    setChromeModalOpen(true);
  }, [setPreviewValue]);

  const addImageAndOpen = useCallback(() => {
    setPreviewValue((prev) => withAddedTemplate(prev, () => createDefaultImageTemplate()));
    setChromeModalOpen(true);
  }, [setPreviewValue]);

  const isPlacementDraftDirty = useCallback((draft: PrintChromePlacementDraft | null) => {
    if (!draft) return false;
    return (
      draft.placement.xPercent !== draft.origin.xPercent ||
      draft.placement.yPercent !== draft.origin.yPercent
    );
  }, []);

  const clearPlacementDraft = useCallback(() => {
    setPlacementConfirmOpen(false);
    setPlacementDiscardConfirmOpen(false);
    setPlacementDraft(null);
  }, []);

  const onPlacementDraftChange = useCallback((draft: PrintChromePlacementDraft | null) => {
    setPlacementDraft(draft);
    if (!draft) {
      setPlacementConfirmOpen(false);
      setPlacementDiscardConfirmOpen(false);
    }
  }, []);

  /** Pointer-up after a move: keep draft for the bottom bar (do not open modal yet). */
  const onPlacementDraftCommit = useCallback((draft: PrintChromePlacementDraft) => {
    setPlacementDraft({ ...draft, dragging: false, moveMode: true });
    setPlacementConfirmOpen(false);
  }, []);

  const openPlacementConfirm = useCallback(() => {
    if (!placementDraft || placementDraft.dragging || !placementDraft.moveMode) return;
    setPlacementDiscardConfirmOpen(false);
    setPlacementConfirmOpen(true);
  }, [placementDraft]);

  /** Bar cancel / outside click: ask before discarding dirty moves. */
  const requestCancelPlacement = useCallback(() => {
    if (!placementDraft) return;
    if (!isPlacementDraftDirty(placementDraft)) {
      clearPlacementDraft();
      return;
    }
    setPlacementConfirmOpen(false);
    setPlacementDiscardConfirmOpen(true);
  }, [clearPlacementDraft, isPlacementDraftDirty, placementDraft]);

  const confirmDiscardPlacement = useCallback(() => {
    clearPlacementDraft();
  }, [clearPlacementDraft]);

  /** Close discard confirm only; keep draft + bar so the user can adjust again. */
  const closePlacementDiscardConfirm = useCallback(() => {
    setPlacementDiscardConfirmOpen(false);
  }, []);

  /** Close apply confirm modal only; keep draft + bar so the user can adjust again. */
  const closePlacementConfirm = useCallback(() => {
    setPlacementConfirmOpen(false);
  }, []);

  const applyPlacementAll = useCallback(() => {
    if (!placementDraft) return;
    const { templateId, placement } = placementDraft;
    setPreviewValue((prev) => {
      const { chrome } = parsePrintChrome(prev);
      const base = normalizePrintChromeDoc(chrome ?? DEFAULT_PRINT_CHROME_DOC);
      const templates = base.templates.map((t) =>
        t.id === templateId ? applyPrintChromePlacementToAll(t, placement) : t,
      );
      return upsertPrintChromeComment(prev, { ...base, templates });
    });
    clearPlacementDraft();
  }, [clearPlacementDraft, placementDraft, setPreviewValue]);

  const applyPlacementThisPage = useCallback(() => {
    if (!placementDraft) return;
    const { templateId, pageKey, placement } = placementDraft;
    setPreviewValue((prev) => {
      const { chrome } = parsePrintChrome(prev);
      const base = normalizePrintChromeDoc(chrome ?? DEFAULT_PRINT_CHROME_DOC);
      const templates = base.templates.map((t) =>
        t.id === templateId ? applyPrintChromePlacementToPage(t, pageKey, placement) : t,
      );
      return upsertPrintChromeComment(prev, { ...base, templates });
    });
    clearPlacementDraft();
  }, [clearPlacementDraft, placementDraft, setPreviewValue]);

  return {
    parsedChrome,
    chromeDoc,
    chromeModalOpen,
    setChromeModalOpen,
    applyChrome,
    openChromeModal,
    addPageNumberAndOpen,
    addTextAndOpen,
    addImageAndOpen,
    livePlacementDraft: placementDraft,
    placementDraft,
    placementConfirmOpen,
    placementDiscardConfirmOpen,
    onPlacementDraftChange,
    onPlacementDraftCommit,
    openPlacementConfirm,
    requestCancelPlacement,
    cancelPlacement: requestCancelPlacement,
    confirmDiscardPlacement,
    closePlacementDiscardConfirm,
    closePlacementConfirm,
    applyPlacementAll,
    applyPlacementThisPage,
  };
}

export type ExportPdfPrintChromeState = ReturnType<typeof useExportPdfPrintChrome>;
