import type { MutableRefObject } from 'react';
import type { EditorView } from '@codemirror/view';
import type { EditorSelection } from '@codemirror/state';

/** md-editor-rt imperative API (package types are incomplete). */
export type MdEditorApi = {
  value?: MdEditorApi;
  getEditorView?: () => EditorView | null;
  execCommand?: (directive: string) => void;
  insert?: (fn: () => {
    targetValue: string;
    select: boolean;
    deviationStart: number;
    deviationEnd: number;
  }) => void;
  focus?: () => void;
  toggleCatalog?: (show: boolean) => void;
  togglePreviewOnly?: (previewOnly: boolean) => void;
  domEventHandlers?: (
    handlers: Record<string, (e: Event, view?: EditorView) => boolean | void | undefined>,
  ) => boolean;
};

export type MdEditorRef = MdEditorApi | { value: MdEditorApi } | null;

export function getMdEditorApi(ref: MutableRefObject<MdEditorRef>): MdEditorApi | null {
  const current = ref.current;
  if (!current) return null;
  if ('value' in current && current.value) return current.value;
  return current as MdEditorApi;
}

export type ExportPdfNavigateOptions = {
  openCoverEdit?: boolean;
};

export type WikiImageModalStateMd = {
  kind: 'wiki' | 'markdown';
  key: string;
  width?: string;
  height?: string;
  occurrence?: number;
  imageSrc?: string;
};

export type WikiImageModalStateNovel = {
  path: string;
  width?: string;
  height?: string;
  occurrence?: number;
  nodePos?: number | null;
  imageSrc?: string;
};

export type FreeTransformState = {
  kind: 'wiki' | 'markdown';
  key: string;
  occurrence: number;
  widthPx: number;
  heightPx: number;
  originalWidthPx: number;
  originalHeightPx: number;
};

export type CatalogHandleBox = {
  top: number;
  left: number;
  height: number;
};

export type FreeTransformOverlayRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type HeadingRemapSelection = {
  from: number;
  to: number;
  text: string;
} | null;

/** Novel / Tiptap editor instance (minimal surface used by NovelMarkdownEditor). */
export type NovelEditorInstance = {
  isDestroyed?: boolean;
  getHTML: () => string;
  commands: {
    setContent: (html: string) => void;
  };
  view?: {
    dom?: HTMLElement;
    posAtDOM: (node: Node, offset: number) => number;
    state: {
      doc: {
        nodeAt: (pos: number) => {
          type?: { name?: string };
          attrs?: Record<string, unknown>;
          marks?: unknown;
        } | null;
      };
    };
    dispatch: (tr: unknown) => void;
  };
  chain: () => {
    focus: (pos?: 'end') => {
      insertContent: (blocks: unknown) => { run: () => void };
    };
  };
  schema?: {
    nodes?: { wikiImage?: unknown };
    nodeFromJSON: (json: unknown) => unknown;
  };
  state: {
    doc: {
      content: { size: number };
      descendants: (fn: (node: { type: { name: string } }) => boolean | void) => void;
    };
  };
  isEditable?: boolean;
};

export type SnippetEntry = {
  prefix?: string;
  body?: string;
};

export type EditorSelectionSnapshot = EditorSelection | null;
