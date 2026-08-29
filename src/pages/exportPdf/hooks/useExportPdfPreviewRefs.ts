import { useCallback, useRef, useState } from 'react';

export function useExportPdfPreviewRefs() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const [previewPanRoot, setPreviewPanRoot] = useState<HTMLDivElement | null>(null);
  const setPreviewContainerRef = useCallback((node: HTMLDivElement | null) => {
    previewContainerRef.current = node;
    setPreviewPanRoot(node);
  }, []);
  const paperContentRef = useRef<HTMLDivElement | null>(null);
  const pagesHostRef = useRef<HTMLDivElement | null>(null);
  const coverPageRef = useRef<HTMLDivElement | null>(null);
  const imageMaxProbeRef = useRef<HTMLDivElement | null>(null);
  const previewValueRef = useRef('');
  const currentFileRef = useRef<import('@/pages/exportPdf/exportPdfTypes').ExportPdfDocumentFile>(null);

  return {
    headerRef,
    previewContainerRef,
    setPreviewContainerRef,
    previewPanRoot,
    paperContentRef,
    pagesHostRef,
    coverPageRef,
    imageMaxProbeRef,
    previewValueRef,
    currentFileRef,
  };
}

export type ExportPdfPreviewRefs = ReturnType<typeof useExportPdfPreviewRefs>;
