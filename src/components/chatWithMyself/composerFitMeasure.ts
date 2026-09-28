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

/** Sum vertical / horizontal padding from a computed style. */
export function paddingBoxFromComputedStyle(cs: CSSStyleDeclaration): {
  paddingY: number;
  paddingX: number;
} {
  return {
    paddingY:
      (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0),
    paddingX:
      (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0),
  };
}

/**
 * Padding lives on `.cm-scroller` for CodeMirror (`.cm-content` is pad 0).
 * Textarea / ProseMirror keep padding on the probe itself.
 */
export function resolveComposerPaddingBox(
  editorWrap: HTMLElement,
  probe: HTMLElement,
): HTMLElement {
  const scroller = editorWrap.querySelector('.cm-scroller');
  if (
    scroller instanceof HTMLElement &&
    (probe.classList.contains('cm-content') ||
      probe.closest('.cm-editor') != null)
  ) {
    return scroller;
  }
  return probe;
}

function measureComposerToolbarHeight(editorWrap: HTMLElement): number {
  const toolbar =
    editorWrap.querySelector('[data-composer-toolbar]') ||
    editorWrap.querySelector('.md-editor-toolbar-wrapper') ||
    editorWrap.querySelector('.md-editor-toolbar');
  return toolbar instanceof HTMLElement
    ? Math.ceil(toolbar.offsetHeight)
    : 0;
}

/**
 * Pretext-based height for the composer editor body (plain text value).
 * Includes the editor's top/bottom padding box (scroller for CodeMirror).
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
  const paddingBox = resolveComposerPaddingBox(editorWrap, probe);
  const padCs = window.getComputedStyle(paddingBox);
  const { paddingY, paddingX } = paddingBoxFromComputedStyle(padCs);
  const probeCs = window.getComputedStyle(probe);
  const lineHeightPx =
    parseFloat(probeCs.lineHeight) ||
    (parseFloat(probeCs.fontSize) || 14) * 1.45;
  // Prefer padding-box width when the probe collapsed under fillParent.
  const boxWidth =
    paddingBox.clientWidth > 0
      ? paddingBox.clientWidth
      : probe.clientWidth > 0
        ? probe.clientWidth
        : editorWrap.clientWidth;
  const contentWidth = Math.max(0, boxWidth - paddingX);
  const font = fontShorthandFromElement(probe);
  const textHeight = measurePretextBlockHeight(text, {
    font,
    contentWidth: Math.max(1, contentWidth),
    lineHeightPx,
    paddingY,
    minHeight: 0,
    maxHeight,
  });
  const toolbarH = measureComposerToolbarHeight(editorWrap);
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

  // Edit: pretext-sized body (incl. padding + toolbar). Reply: min editor +
  // toolbar only — live fillParent height tracks the dock and would force
  // grow-only.
  const toolbarH = editorWrap ? measureComposerToolbarHeight(editorWrap) : 0;
  const editorHeight = editing
    ? measureComposerEditorPretextHeight(editorWrap, text, {
        minHeight: minEditorHeight,
        maxHeight: maxEditorHeight,
      })
    : minEditorHeight + toolbarH;

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
