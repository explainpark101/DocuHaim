/**
 * Measure chat composer heights for dock autoFit (reply / edit).
 * Editor body height prefers live DOM (scrollHeight / ProseMirror children)
 * so TipTap/CM wrapping matches what the user sees. Canvas pretext is only
 * a fallback before the surface mounts.
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
   * row, helper) + editor height. Independent of the current dock height so
   * fillParent collapse cannot under-report.
   */
  contentHeight: number;
};

/** Note-editor scroll-center uses ~50vh padding — never treat that as fit chrome. */
const MAX_SANE_EDITOR_PAD_Y = 64;
const FALLBACK_EDITOR_PAD_Y = 8;

/**
 * Extra bottom room for single-line edit fit only (multi-line already feels fine).
 * Keeps the caret / last glyphs from sitting flush against the border.
 */
export const COMPOSER_SINGLE_LINE_BOTTOM_PAD_PX = 6;

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
 * Clamp note-editor scroll-center padding (50vh) so it cannot inflate
 * composer autoFit height.
 */
export function saneComposerPaddingY(paddingY: number): number {
  if (!Number.isFinite(paddingY) || paddingY < 0) return 0;
  if (paddingY > MAX_SANE_EDITOR_PAD_Y) {
    return FALLBACK_EDITOR_PAD_Y * 2;
  }
  return paddingY;
}

/**
 * Resolve used line-height in px. `normal` / invalid → ~1.2× font-size
 * (not 1.45 — that over-sized edit fit and left empty space under text).
 */
export function resolveComposerLineHeightPx(cs: CSSStyleDeclaration): number {
  const fontSize = parseFloat(cs.fontSize) || 14;
  const raw = cs.lineHeight;
  if (raw && raw !== 'normal') {
    const parsed = parseFloat(raw);
    if (Number.isFinite(parsed) && parsed > 0) {
      // Computed style is usually px; unitless multipliers are rare here.
      if (raw.endsWith('px') || parsed > fontSize * 0.5) return parsed;
      return parsed * fontSize;
    }
  }
  return fontSize * 1.2;
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

function clampEditorHeight(
  height: number,
  minHeight: number,
  maxHeight: number,
): number {
  let next = Math.ceil(height);
  if (minHeight > 0) next = Math.max(minHeight, next);
  if (maxHeight > 0) next = Math.min(maxHeight, next);
  return next;
}

/** True when there is at most one hard line (trailing newlines ignored). */
export function isComposerSingleHardLineText(text: string): boolean {
  const t = String(text ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\n+$/g, '');
  return !t.includes('\n');
}

/**
 * Bottom pad for single-line drafts only. Soft-wrapped tall single hard lines
 * (already ~2+ rows) skip the boost so multi-line feel stays unchanged.
 */
export function composerSingleLineBottomPad(
  text: string,
  measuredHeight: number,
  lineHeightPx: number,
): number {
  if (!isComposerSingleHardLineText(text)) return 0;
  const lh = Math.max(1, lineHeightPx);
  // measuredHeight includes padding; one row + pad stays under ~2*lh + pad.
  if (measuredHeight > lh * 2 + 16) return 0;
  return COMPOSER_SINGLE_LINE_BOTTOM_PAD_PX;
}

function lineHeightPxFromEditorWrap(editorWrap: HTMLElement): number {
  const probe = resolveProbeElement(editorWrap);
  return resolveComposerLineHeightPx(window.getComputedStyle(probe));
}

/**
 * Live textarea height (height:auto → scrollHeight). Matches rendered glyphs.
 */
function measureTextareaContentHeight(textarea: HTMLTextAreaElement): number {
  const prevHeight = textarea.style.height;
  const prevMin = textarea.style.minHeight;
  textarea.style.height = 'auto';
  textarea.style.minHeight = '0';
  const contentH = Math.ceil(textarea.scrollHeight);
  textarea.style.height = prevHeight;
  textarea.style.minHeight = prevMin;
  return contentH;
}

/**
 * ProseMirror / TipTap: distance from content top to last block bottom +
 * sane padding. Avoids scroll-center padding-bottom and flex-fill empty gap.
 */
function measureProseMirrorContentHeight(pm: HTMLElement): number {
  const cs = window.getComputedStyle(pm);
  const padTop = parseFloat(cs.paddingTop) || 0;
  const rawPadBottom = parseFloat(cs.paddingBottom) || 0;
  const padBottom =
    rawPadBottom > MAX_SANE_EDITOR_PAD_Y
      ? FALLBACK_EDITOR_PAD_Y
      : rawPadBottom;

  const kids = pm.children;
  if (kids.length === 0) {
    const lh = resolveComposerLineHeightPx(cs);
    return Math.ceil(padTop + padBottom + lh);
  }

  const first = kids[0];
  const last = kids[kids.length - 1];
  if (!(first instanceof HTMLElement) || !(last instanceof HTMLElement)) {
    return Math.ceil(pm.scrollHeight - rawPadBottom + padBottom);
  }
  const top = first.getBoundingClientRect().top;
  const bottom = last.getBoundingClientRect().bottom;
  return Math.ceil(Math.max(0, bottom - top) + padTop + padBottom);
}

/**
 * CodeMirror content height + scroller padding (sanitized).
 */
function measureCodeMirrorContentHeight(
  editorWrap: HTMLElement,
  content: HTMLElement,
): number {
  const scroller = editorWrap.querySelector('.cm-scroller');
  let padY = 0;
  if (scroller instanceof HTMLElement) {
    const cs = window.getComputedStyle(scroller);
    padY = saneComposerPaddingY(
      (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0),
    );
  }
  return Math.ceil(content.scrollHeight + padY);
}

/**
 * Prefer live DOM height; fall back to canvas pretext when unmounted.
 * Includes editor top/bottom padding (and toolbar when present).
 * Single-line drafts get a small bottom pad; multi-line is unchanged.
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

  const toolbarH = measureComposerToolbarHeight(editorWrap);
  const lineHeightPx = lineHeightPxFromEditorWrap(editorWrap);

  const finish = (bodyHeight: number) =>
    clampEditorHeight(
      bodyHeight +
        toolbarH +
        composerSingleLineBottomPad(text, bodyHeight, lineHeightPx),
      minHeight,
      maxHeight,
    );

  const textarea = editorWrap.querySelector(
    'textarea[data-chat-composer-textarea]',
  );
  if (textarea instanceof HTMLTextAreaElement) {
    // Only trust scrollHeight when the node is laid out (width > 0).
    if (textarea.clientWidth > 0) {
      return finish(measureTextareaContentHeight(textarea));
    }
  }

  const pm = editorWrap.querySelector('.ProseMirror');
  if (pm instanceof HTMLElement && pm.clientWidth > 0) {
    return finish(measureProseMirrorContentHeight(pm));
  }

  const cm = editorWrap.querySelector('.cm-content');
  if (cm instanceof HTMLElement && cm.clientWidth > 0) {
    return finish(measureCodeMirrorContentHeight(editorWrap, cm));
  }

  // Fallback: canvas pretext (surface not ready / zero width).
  const probe = resolveProbeElement(editorWrap);
  const paddingBox = resolveComposerPaddingBox(editorWrap, probe);
  const padCs = window.getComputedStyle(paddingBox);
  const { paddingY: rawPadY, paddingX } = paddingBoxFromComputedStyle(padCs);
  const paddingY = saneComposerPaddingY(rawPadY);
  const boxWidth =
    paddingBox.clientWidth > 0
      ? paddingBox.clientWidth
      : probe.clientWidth > 0
        ? probe.clientWidth
        : editorWrap.clientWidth;
  const contentWidth = Math.max(0, boxWidth - paddingX);
  // Avoid width=1 character-break blow-ups before layout.
  if (contentWidth < 8) {
    return finish(minHeight);
  }
  const textHeight = measurePretextBlockHeight(text, {
    font: fontShorthandFromElement(probe),
    contentWidth,
    lineHeightPx,
    paddingY,
    minHeight: 0,
    maxHeight,
  });
  return finish(textHeight);
}

/**
 * Vertical chrome above the editor row (attach / group strip + gaps).
 * Prefer top-delta over summing siblings: toolbar grid places attach + group
 * on one row, so per-child height sums would double-count and leave empty
 * space below helper text while editing (no flex-1 absorb).
 */
export function chromeHeightAboveEditorRow(
  controlsTop: number,
  editorRowTop: number,
): number {
  return Math.max(0, Math.ceil(editorRowTop - controlsTop));
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
  let editorRow: HTMLElement | null = null;
  for (const kid of Array.from(controls.children) as HTMLElement[]) {
    if (kid === editorWrap || kid.contains(editorWrap)) {
      editorRow = kid;
      break;
    }
  }
  if (!editorRow) {
    return blockHeightWithMargin(controls);
  }
  return chromeHeightAboveEditorRow(
    controls.getBoundingClientRect().top,
    editorRow.getBoundingClientRect().top,
  );
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

  // Edit: DOM/pretext-sized body (incl. padding + toolbar). Reply: min editor +
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
