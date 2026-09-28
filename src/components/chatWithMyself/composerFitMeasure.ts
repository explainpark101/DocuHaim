/**
 * Measure chat composer heights for dock autoFit (reply / edit).
 * Editor body height uses canvas pretext wrap so multi-line edit drafts
 * expand the dock instead of collapsing to ~1 visible line.
 */

import {
  fontShorthandFromElement,
  measurePretextBlockHeight,
} from '@/utils/pretextMeasure';

export type ComposerFitMeasure = {
  /** Reply/edit preview block height including vertical margins. */
  previewHeight: number;
  /** Pretext (or fallback) height for the editor surface. */
  editorHeight: number;
  /**
   * Natural composer height: non-editor chrome (preview, attachments, group
   * row, helper) + pretext editor height. Independent of the current dock
   * height so fillParent collapse cannot under-report.
   */
  contentHeight: number;
};

function blockHeightWithMargin(el: Element | null): number {
  if (!(el instanceof HTMLElement)) return 0;
  const rect = el.getBoundingClientRect();
  const cs = window.getComputedStyle(el);
  const mb = parseFloat(cs.marginBottom) || 0;
  const mt = parseFloat(cs.marginTop) || 0;
  return Math.ceil(rect.height + mt + mb);
}

function resolveProbeElement(editorWrap: HTMLElement): HTMLElement {
  const textarea = editorWrap.querySelector(
    'textarea[data-chat-composer-textarea]',
  );
  if (textarea instanceof HTMLElement) return textarea;
  const cm = editorWrap.querySelector('.cm-content');
  if (cm instanceof HTMLElement) return cm;
  const pm = editorWrap.querySelector('.ProseMirror');
  if (pm instanceof HTMLElement) return pm;
  return editorWrap;
}

/**
 * Pretext-based height for the composer editor body (plain text value).
 */
export function measureComposerEditorPretextHeight(
  editorWrap: HTMLElement | null,
  text: string,
  {
    minHeight,
    maxHeight,
  }: {
    minHeight: number;
    maxHeight: number;
  },
): number {
  if (!editorWrap) return minHeight;
  const probe = resolveProbeElement(editorWrap);
  const cs = window.getComputedStyle(probe);
  const paddingY =
    (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
  const paddingX =
    (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
  const lineHeightPx =
    parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) || 14) * 1.45;
  // Prefer wrap width when the probe collapsed under fillParent.
  const contentWidth = Math.max(
    0,
    (probe.clientWidth > 0 ? probe.clientWidth : editorWrap.clientWidth) -
      paddingX,
  );
  const font = fontShorthandFromElement(probe);
  const textHeight = measurePretextBlockHeight(text, {
    font,
    contentWidth: Math.max(1, contentWidth),
    lineHeightPx,
    paddingY,
    minHeight: 0,
    maxHeight,
  });
  const toolbar =
    editorWrap.querySelector('.md-editor-toolbar-wrapper') ||
    editorWrap.querySelector('.md-editor-toolbar');
  const toolbarH =
    toolbar instanceof HTMLElement ? Math.ceil(toolbar.offsetHeight) : 0;
  let height = textHeight + toolbarH;
  if (minHeight > 0) height = Math.max(minHeight, height);
  if (maxHeight > 0) height = Math.min(maxHeight, height);
  return Math.ceil(height);
}

/**
 * Height of the controls strip above the editor (attach + group + markdown),
 * excluding the editor row itself.
 */
function measureControlsChrome(
  controls: HTMLElement | null,
  editorWrap: HTMLElement | null,
): number {
  if (!controls) return 0;
  if (!editorWrap || !controls.contains(editorWrap)) {
    return blockHeightWithMargin(controls);
  }
  const cs = window.getComputedStyle(controls);
  const gap = parseFloat(cs.rowGap || cs.gap) || 0;
  let chrome = 0;
  let trackCount = 0;
  for (const kid of Array.from(controls.children) as HTMLElement[]) {
    if (kid.contains(editorWrap) || kid === editorWrap) {
      // Editor row: side buttons share the row — counted via editorHeight.
      continue;
    }
    chrome += blockHeightWithMargin(kid);
    trackCount += 1;
  }
  // Gaps between chrome tracks and before the editor row.
  const gaps = trackCount > 0 ? trackCount * gap : 0;
  return Math.ceil(chrome + gaps);
}

/**
 * Measure preview bump + content-sized composer height for dock autoFit.
 */
export function measureComposerFitHeights(
  root: HTMLElement | null,
  editorWrap: HTMLElement | null,
  text: string,
  {
    editing,
    minEditorHeight,
    maxEditorHeight,
  }: {
    editing: boolean;
    minEditorHeight: number;
    maxEditorHeight: number;
  },
): ComposerFitMeasure {
  if (!root) {
    return {
      previewHeight: 0,
      editorHeight: minEditorHeight,
      contentHeight: minEditorHeight,
    };
  }

  const previewHeight = blockHeightWithMargin(
    root.querySelector('[data-composer-fit-preview]'),
  );
  const attachmentsHeight = blockHeightWithMargin(
    root.querySelector('[data-composer-fit-attachments]'),
  );
  const helperHeight = blockHeightWithMargin(
    root.querySelector('[data-composer-fit-helper]'),
  );
  const controls = root.querySelector(
    '[data-composer-fit-controls]',
  ) as HTMLElement | null;
  const controlsChrome = measureControlsChrome(controls, editorWrap);

  const liveEditorH = editorWrap
    ? Math.ceil(editorWrap.getBoundingClientRect().height)
    : 0;

  const editorHeight = editing
    ? measureComposerEditorPretextHeight(editorWrap, text, {
        minHeight: minEditorHeight,
        maxHeight: maxEditorHeight,
      })
    : Math.max(minEditorHeight, liveEditorH);

  const csRoot = window.getComputedStyle(root);
  const rootPad =
    (parseFloat(csRoot.paddingTop) || 0) +
    (parseFloat(csRoot.paddingBottom) || 0);

  const contentHeight = Math.ceil(
    rootPad +
      previewHeight +
      attachmentsHeight +
      controlsChrome +
      editorHeight +
      helperHeight,
  );

  return {
    previewHeight,
    editorHeight,
    contentHeight: Math.max(minEditorHeight, contentHeight),
  };
}
