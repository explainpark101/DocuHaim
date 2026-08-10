/**
 * Per-mount ids for md-editor-rt.
 *
 * Workspace keep-alive mounts multiple MarkdownEditors at once. The library
 * default id (`md-editor-rt`) and global heading ids (`md-preview-heading-N`)
 * collide, so catalog click / scrollElement querySelector hit a hidden tab.
 */

/** Strip characters that are unsafe or awkward in HTML id / CSS selectors. */
export function sanitizeMdEditorIdFragment(raw: string): string {
  const cleaned = String(raw || '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
  return cleaned || 'doc';
}

/**
 * Build a stable MdEditor `id` from React `useId()` (unique per mount).
 * Colons from useId are removed so the value is a valid HTML id / querySelector.
 */
export function mdEditorIdFromReactId(reactId: string): string {
  return `md-ed-${sanitizeMdEditorIdFragment(reactId)}`;
}

type MdHeadingIdArg = {
  index?: number;
  text?: string;
  level?: number;
};

/**
 * Heading id builder scoped to one editor instance (matches md-editor-rt mdHeadingId).
 */
export function createScopedPreviewHeadingId(editorId: string) {
  const prefix = `${editorId}-h`;
  return (arg1: MdHeadingIdArg | number, _arg2?: unknown, arg3?: number): string => {
    const fallbackIndex = Number.isInteger(arg3) ? (arg3 as number) : 0;
    const objectIndex =
      typeof arg1 === 'object' && arg1 !== null ? Number(arg1.index) : NaN;
    const index = Number.isInteger(objectIndex) ? objectIndex : fallbackIndex;
    return `${prefix}-${index}`;
  };
}
