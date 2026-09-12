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
  /** Live drag preview (before confirm). */
  const [placementDraft, setPlacementDraft] = useState<PrintChromePlacementDraft | null>(null);
  /** Awaiting confirm after pointer-up. */
  const [pendingPlacement, setPendingPlacement] =
    useState<PrintChromePlacementDraft | null>(null);

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

  const onPlacementDraftChange = useCallback((draft: PrintChromePlacementDraft | null) => {
    setPlacementDraft(draft);
  }, []);

  const onPlacementDraftCommit = useCallback((draft: PrintChromePlacementDraft) => {
    setPlacementDraft(draft);
    setPendingPlacement(draft);
  }, []);

  const cancelPlacement = useCallback(() => {
    setPendingPlacement(null);
    setPlacementDraft(null);
  }, []);

  const applyPlacementAll = useCallback(() => {
    if (!pendingPlacement) return;
    const { templateId, placement } = pendingPlacement;
    setPreviewValue((prev) => {
      const { chrome } = parsePrintChrome(prev);
      const base = normalizePrintChromeDoc(chrome ?? DEFAULT_PRINT_CHROME_DOC);
      const templates = base.templates.map((t) =>
        t.id === templateId ? applyPrintChromePlacementToAll(t, placement) : t,
      );
      return upsertPrintChromeComment(prev, { ...base, templates });
    });
    setPendingPlacement(null);
    setPlacementDraft(null);
  }, [pendingPlacement, setPreviewValue]);

  const applyPlacementThisPage = useCallback(() => {
    if (!pendingPlacement) return;
    const { templateId, pageKey, placement } = pendingPlacement;
    setPreviewValue((prev) => {
      const { chrome } = parsePrintChrome(prev);
      const base = normalizePrintChromeDoc(chrome ?? DEFAULT_PRINT_CHROME_DOC);
      const templates = base.templates.map((t) =>
        t.id === templateId ? applyPrintChromePlacementToPage(t, pageKey, placement) : t,
      );
      return upsertPrintChromeComment(prev, { ...base, templates });
    });
    setPendingPlacement(null);
    setPlacementDraft(null);
  }, [pendingPlacement, setPreviewValue]);

  /** Draft used while dragging or while confirm is open. */
  const livePlacementDraft = pendingPlacement ?? placementDraft;

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
    livePlacementDraft,
    pendingPlacement,
    onPlacementDraftChange,
    onPlacementDraftCommit,
    cancelPlacement,
    applyPlacementAll,
    applyPlacementThisPage,
  };
}

export type ExportPdfPrintChromeState = ReturnType<typeof useExportPdfPrintChrome>;
