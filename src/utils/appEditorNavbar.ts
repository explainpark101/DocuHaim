/** Filename / editor top navbar in EditorPane. */
export const APP_EDITOR_NAVBAR_SELECTOR = '[data-app-editor-navbar]';

/** Fallback when the bar is missing (min-h-14 ≈ 56px under typical app chrome). */
export const APP_EDITOR_NAVBAR_FALLBACK_BOTTOM_PX = 56;

export function getAppEditorNavbarElement(): HTMLElement | null {
  const el = document.querySelector(APP_EDITOR_NAVBAR_SELECTOR);
  return el instanceof HTMLElement ? el : null;
}

/** Bottom edge of the editor filename navbar in viewport coords. */
export function getAppEditorNavbarBottom(): number {
  const el = getAppEditorNavbarElement();
  if (el) return el.getBoundingClientRect().bottom;
  return APP_EDITOR_NAVBAR_FALLBACK_BOTTOM_PX;
}
