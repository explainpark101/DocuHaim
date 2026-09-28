/**
 * Chat composer dock height helpers (toolbar chrome bump + autoFit target).
 * Kept free of React so unit tests can import without the dock UI graph.
 */

/** Floor while auto-fitting: edit banner + group row + min editor + padding. */
export const CHAT_COMPOSER_DOCK_MIN_FIT_H = 160;

export const CHAT_COMPOSER_DOCK_MIN_H = 140;

/**
 * Editor toolbar chrome height (Haim `h-8`; legacy md-editor toolbar is similar).
 * Dock grows by this when the toolbar is visible so the input keeps ≥1 line.
 */
export const COMPOSER_TOOLBAR_CHROME_H = 32;

/**
 * Resolve autoFit dock height from content measure and/or preview bump.
 * Prefer `fitContentHeight` when set so the dock can shrink with shorter
 * pretext or when helper chrome is removed.
 */
export function resolveChatComposerDockFitHeight({
  maxHeight,
  minFitHeight = CHAT_COMPOSER_DOCK_MIN_FIT_H,
  baseHeight,
  fitPreviewHeight = 0,
  fitContentHeight = null,
  toolbarChromeHeight = 0,
}: {
  maxHeight: number;
  minFitHeight?: number;
  baseHeight: number;
  fitPreviewHeight?: number;
  fitContentHeight?: number | null;
  toolbarChromeHeight?: number;
}): number {
  const previewBump = Math.max(0, Math.ceil(fitPreviewHeight || 0));
  const toolbarBump = Math.max(0, Math.ceil(toolbarChromeHeight || 0));
  const withPreview = baseHeight + previewBump + toolbarBump;
  const contentFloor =
    typeof fitContentHeight === 'number' && fitContentHeight > 0
      ? Math.ceil(fitContentHeight)
      : 0;
  return Math.min(
    maxHeight,
    Math.max(minFitHeight, contentFloor > 0 ? contentFloor : withPreview),
  );
}

/** Resolve the animated dock height (persisted base + optional chrome). */
export function resolveChatComposerDockTargetHeight({
  height,
  maxHeight,
  minHeight = CHAT_COMPOSER_DOCK_MIN_H,
  autoFit,
  fitHeight,
  isResizing,
  toolbarChromeHeight = 0,
  helperChromeHeight = 0,
}: {
  height: number;
  maxHeight: number;
  minHeight?: number;
  autoFit: boolean;
  fitHeight: number | null;
  isResizing: boolean;
  toolbarChromeHeight?: number;
  helperChromeHeight?: number;
}): number {
  const toolbarBump = Math.max(0, Math.ceil(toolbarChromeHeight || 0));
  const helperBump = Math.max(0, Math.ceil(helperChromeHeight || 0));
  if (autoFit && fitHeight != null && !isResizing) {
    // autoFit measure already folds toolbar/helper chrome into fitHeight.
    return Math.min(maxHeight, Math.max(minHeight, fitHeight));
  }
  if (autoFit) {
    // Live drag during autoFit: height is the visual target (no extra bump).
    return Math.min(maxHeight, Math.max(minHeight, height));
  }
  return Math.min(
    maxHeight,
    Math.max(minHeight, height + toolbarBump + helperBump),
  );
}
