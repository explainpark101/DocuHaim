/**
 * Shared root discovery for 「서식 유지 복사」 / ImgBB candidate scan.
 * Haim live editor uses TipTap prose (not `.md-editor-preview`).
 */

export const COPY_FORMATTED_HTML_ROOT_SELECTORS = [
  '.tiptap.haim-editor-prose',
  '.haim-editor-prose.ProseMirror',
  '.md-editor-preview',
] as const;

export function findFormattedHtmlCopyRoot(
  scope: ParentNode = document,
): HTMLElement | null {
  for (const selector of COPY_FORMATTED_HTML_ROOT_SELECTORS) {
    const roots = [...scope.querySelectorAll(selector)];
    const visible = roots.find(
      (el): el is HTMLElement => {
        if (!(el instanceof HTMLElement)) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      },
    );
    if (visible) return visible;
  }
  return null;
}
