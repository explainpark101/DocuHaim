export type LlmAssistEditorBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

function getMdEditorRootFromRef(editorRef: { current?: unknown } | null | undefined): Element | null {
  const current = editorRef?.current as { value?: { root?: unknown }; root?: unknown } | null | undefined;
  const api = current?.value ?? current ?? null;
  if (api && typeof api === 'object' && 'root' in api && api.root instanceof Element) {
    return api.root;
  }
  return null;
}

/** Editor content area below the md-editor toolbar (fixed viewport coords). */
export function getLlmAssistEditorBounds(
  editorRef: { current?: unknown } | null | undefined,
): LlmAssistEditorBounds {
  const margin = 8;
  const fallback: LlmAssistEditorBounds = {
    left: margin,
    top: margin,
    right: Math.max(margin, window.innerWidth - margin),
    bottom: Math.max(margin, window.innerHeight - margin),
    width: Math.max(0, window.innerWidth - margin * 2),
    height: Math.max(0, window.innerHeight - margin * 2),
  };

  const root = getMdEditorRootFromRef(editorRef);
  if (!root) return fallback;

  const rootRect = root.getBoundingClientRect();
  const toolbar =
    root.querySelector('.md-editor-toolbar-wrapper') || root.querySelector('.md-editor-toolbar');
  const toolbarRect = toolbar?.getBoundingClientRect();
  const top = toolbarRect ? toolbarRect.bottom : rootRect.top;
  const bottom = rootRect.bottom;
  const left = rootRect.left;
  const right = rootRect.right;

  return {
    left,
    top,
    right,
    bottom,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  };
}
