/**
 * Shared props / bridge contract for NoteEditorSurface engines
 * (legacy md-editor-rt and Haim TipTap).
 */

export type NoteEditorFileRef = {
  id?: string | null;
  type?: string | null;
  name?: string | null;
  path?: string | null;
} | null;

export type NoteEditorSnippetConfig = {
  snippets?: unknown[];
};

export type NoteEditorProps = {
  value: string;
  onChange: (next: string) => void;
  onSave?: () => void;
  theme?: string;
  currentFile?: NoteEditorFileRef;
  previewOnly?: boolean;
  isMobileLayout?: boolean;
  onUploadImage?: (...args: unknown[]) => unknown;
  isUploadingEditorImage?: boolean;
  uploadImagePercent?: number;
  onCancelUploadImage?: (...args: unknown[]) => unknown;
  onResolveWikiImageUrl?: (...args: unknown[]) => unknown;
  snippetConfig?: NoteEditorSnippetConfig;
  llmProviderProfiles?: unknown[];
  getImgbbApiKey?: () => string | null | undefined;
  onOpenViewPath?: (...args: unknown[]) => unknown;
  onRequestConvertAllImagesToWiki?: (...args: unknown[]) => unknown;
  onRegisterConvertAllImagesToWiki?: (fn: (() => void) | null) => void;
  isActiveFile?: boolean;
  /** Focused / interactive surface. Visible but unfocused panes pause heavy work. */
  isSurfaceLive?: boolean;
};

/** Minimal API for LLM / Advanced Search bridges. */
export type NoteEditorExposeApi = {
  focus?: () => void;
  insert?: (payload: unknown) => void;
  getEditorView?: () => unknown;
  getMarkdown?: () => string;
};
