import { getAppEditorNavbarBottom, getAppEditorNavbarElement } from '@/utils/appEditorNavbar';
import { getAppStatusBarTop } from '@/utils/appStatusBar';

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

/**
 * Drag/resize bounds for the floating LLM Assist panel (viewport coords).
 * - top: bottom of the editor filename navbar (panel must not overlap it)
 * - bottom: top of the app status bar (purple header must stay visible above it)
 * - left/right: editor root when available, else viewport margins
 */
export function getLlmAssistEditorBounds(
  editorRef: { current?: unknown } | null | undefined,
): LlmAssistEditorBounds {
  const margin = 8;
  const navbarBottom = getAppEditorNavbarBottom();
  const statusBarTop = getAppStatusBarTop();
  const bottom = Math.max(navbarBottom + 1, statusBarTop);

  const fallback: LlmAssistEditorBounds = {
    left: margin,
    top: Math.max(margin, navbarBottom),
    right: Math.max(margin, window.innerWidth - margin),
    bottom,
    width: Math.max(0, window.innerWidth - margin * 2),
    height: Math.max(0, bottom - Math.max(margin, navbarBottom)),
  };

  const root = getMdEditorRootFromRef(editorRef);
  if (!root) return fallback;

  const rootRect = root.getBoundingClientRect();
  const navbarEl = getAppEditorNavbarElement();
  const top = navbarEl ? navbarEl.getBoundingClientRect().bottom : Math.max(rootRect.top, navbarBottom);
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
