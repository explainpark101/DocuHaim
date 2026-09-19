export type ExportPdfDocumentFile = {
  id?: string | null;
  type?: string | null;
  content?: string;
  [key: string]: unknown;
} | null;

export type ExportPDFPageProps = {
  documentValue?: string;
  documentFile?: ExportPdfDocumentFile;
  openCoverEdit?: boolean;
  isDocumentLoading?: boolean;
  hasNavigationSession?: boolean;
  /**
   * Pane-embedded mode: close the print surface without router navigation.
   * When set, back / leave calls this instead of `navigate('/view/...')`.
   */
  onRequestClose?: (result?: {
    editorContent: string;
    currentFile: ExportPdfDocumentFile;
  }) => void;
};

export type ExportPdfTocItem = {
  id: string;
  level: number;
  text: string;
};

export type ExportPdfWikiImageModalState = {
  kind: 'wiki' | 'markdown';
  key: string;
  width: string;
  height: string;
  occurrence: number;
  imageSrc: string;
} | null;

export type ExportPdfFreeTransformState = {
  kind: 'wiki' | 'markdown' | 'mermaid';
  key: string;
  occurrence: number;
  widthPx: number;
  heightPx: number;
  originalWidthPx: number;
  originalHeightPx: number;
} | null;

export type ExportPdfHeadingPgbrModalState = {
  headingIndex: number;
  headingText: string;
} | null;

export type ExportPdfOverlayRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  positioning: 'zoom-root-absolute' | 'viewport-fixed';
} | null;
