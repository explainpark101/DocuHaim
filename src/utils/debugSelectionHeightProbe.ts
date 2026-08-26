/**
 * Debug probe: selection highlight height on wrapped long lines (session 5a3455).
 * Remove after root cause is confirmed and fixed.
 */
import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';

const DEBUG_ENDPOINT =
  'http://127.0.0.1:7411/ingest/9d646e6d-6d0d-4a42-ac54-d85c9376eaf5';
const DEBUG_SESSION = '5a3455';

function postDebugLog(payload: Record<string, unknown>): void {
  // #region agent log
  fetch(DEBUG_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': DEBUG_SESSION,
    },
    body: JSON.stringify({
      sessionId: DEBUG_SESSION,
      timestamp: Date.now(),
      ...payload,
    }),
  }).catch(() => {});
  // #endregion
}

function readTransform(el: Element | null): string {
  if (!el) return '';
  return getComputedStyle(el).transform;
}

function rectSummary(rect: DOMRect): Record<string, number> {
  return {
    top: Math.round(rect.top * 10) / 10,
    left: Math.round(rect.left * 10) / 10,
    width: Math.round(rect.width * 10) / 10,
    height: Math.round(rect.height * 10) / 10,
  };
}

function measureEditorSelection(view: EditorView): void {
  const root = view.dom;
  const content = root.querySelector('.cm-content');
  const scroller = root.querySelector('.cm-scroller');
  const selectionEls = [...root.querySelectorAll('.cm-selectionBackground')];
  const matchEls = [...root.querySelectorAll('.cm-selectionMatch')];

  const main = view.state.selection.main;
  const line = view.state.doc.lineAt(main.from);
  const lineTextLen = line.text.length;

  const lineEl = view.lineBlockAt(main.from);
  const lineDom = view.domAtPos(main.from).node;
  const cmLine =
    lineDom instanceof Element
      ? lineDom.closest('.cm-line')
      : lineDom.parentElement?.closest('.cm-line') ?? null;

  const contentStyle = content instanceof HTMLElement ? getComputedStyle(content) : null;
  const cmLineStyle = cmLine ? getComputedStyle(cmLine) : null;

  let cmLineRect: DOMRect | null = null;
  let cmLineClientHeight = 0;
  if (cmLine) {
    cmLineRect = cmLine.getBoundingClientRect();
    cmLineClientHeight = cmLine.clientHeight;
  }

  const selectionRects = selectionEls.map((el) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return {
      ...rectSummary(rect),
      className: el.className,
      computedHeight: style.height,
    };
  });

  const maxSelHeight = selectionRects.reduce((max, r) => Math.max(max, r.height), 0);
  const parsedLineHeight = cmLineStyle
    ? Number.parseFloat(cmLineStyle.lineHeight)
    : NaN;
  const expectedLineHeight =
    Number.isFinite(parsedLineHeight) && parsedLineHeight > 0
      ? parsedLineHeight
      : cmLineStyle
        ? (Number.parseFloat(cmLineStyle.fontSize) || 14) * 1.2
        : 0;

  const wrappedVisualLines =
    cmLine && expectedLineHeight > 0
      ? Math.max(1, Math.round(cmLineClientHeight / expectedLineHeight))
      : null;

  const selectionInflated =
    maxSelHeight > 0
      && expectedLineHeight > 0
      && maxSelHeight > expectedLineHeight * 1.35;

  postDebugLog({
    location: 'debugSelectionHeightProbe.ts:measureEditorSelection',
    message: 'cm selection geometry',
    hypothesisId: selectionInflated ? 'A-B-D' : 'baseline',
    runId: 'pre-fix',
    data: {
      surface: 'editor',
      selectionFrom: main.from,
      selectionTo: main.to,
      selectionEmpty: main.empty,
      docLineNumber: line.number,
      lineTextLen,
      lineBlockHeight: Math.round(lineEl.height * 10) / 10,
      cmLineClientHeight,
      wrappedVisualLines,
      expectedLineHeight: Math.round(expectedLineHeight * 10) / 10,
      maxSelHeight: Math.round(maxSelHeight * 10) / 10,
      selectionInflated,
      selectionRectCount: selectionRects.length,
      selectionRects,
      selectionMatchCount: matchEls.length,
      cmLineRect: cmLineRect ? rectSummary(cmLineRect) : null,
      cmLineChildCount: cmLine?.childElementCount ?? null,
      hasBase64FoldWidget: Boolean(cmLine?.querySelector('.cm-base64-image-fold')),
      contentTransform: readTransform(content),
      scrollerTransform: readTransform(scroller),
      contentLineHeight: contentStyle?.lineHeight ?? null,
      cmLineLineHeight: cmLineStyle?.lineHeight ?? null,
      contentFontSize: contentStyle?.fontSize ?? null,
    },
  });
}

function measurePreviewSelection(previewRoot: Element | null): void {
  if (!previewRoot) return;

  const sel = window.getSelection?.();
  if (!sel || sel.rangeCount === 0 || sel.getRangeAt(0).collapsed) return;

  const range = sel.getRangeAt(0);
  if (!previewRoot.contains(range.commonAncestorContainer)) return;

  const clientRects = [...range.getClientRects()].map(rectSummary);
  const maxRectHeight = clientRects.reduce((max, r) => Math.max(max, r.height), 0);

  const block = range.startContainer instanceof Element
    ? range.startContainer.closest('[data-line]')
    : range.startContainer.parentElement?.closest('[data-line]') ?? null;
  const blockStyle = block instanceof HTMLElement ? getComputedStyle(block) : null;
  const parsedLh = blockStyle ? Number.parseFloat(blockStyle.lineHeight) : NaN;
  const expectedLh =
    Number.isFinite(parsedLh) && parsedLh > 0
      ? parsedLh
      : blockStyle
        ? (Number.parseFloat(blockStyle.fontSize) || 14) * 1.5
        : 0;

  const mirrorBoxes = previewRoot.querySelectorAll('.s3haim-preview-sel-mirror-box');
  const mirrorRects = [...mirrorBoxes].map((el) => rectSummary(el.getBoundingClientRect()));

  postDebugLog({
    location: 'debugSelectionHeightProbe.ts:measurePreviewSelection',
    message: 'preview selection geometry',
    hypothesisId: maxRectHeight > expectedLh * 1.35 ? 'E' : 'baseline',
    runId: 'pre-fix',
    data: {
      surface: 'preview',
      selectedTextLen: sel.toString().length,
      clientRectCount: clientRects.length,
      maxRectHeight: Math.round(maxRectHeight * 10) / 10,
      expectedLineHeight: Math.round(expectedLh * 10) / 10,
      selectionInflated: maxRectHeight > expectedLh * 1.35,
      clientRects,
      mirrorRectCount: mirrorRects.length,
      mirrorRects,
      cssHighlightsSupported: typeof Highlight !== 'undefined' && 'highlights' in CSS,
    },
  });
}

let editorRaf = 0;
let previewRaf = 0;

function findPreviewRootForView(view: EditorView): Element | null {
  const shell = view.dom.closest('.md-editor');
  return shell?.querySelector('.md-editor-preview') ?? null;
}

export function createSelectionHeightDebugProbe(): Extension {
  return EditorView.updateListener.of((update) => {
    if (!update.selectionSet && !update.focusChanged) return;

    if (editorRaf) cancelAnimationFrame(editorRaf);
    editorRaf = requestAnimationFrame(() => {
      editorRaf = 0;
      measureEditorSelection(update.view);
      if (previewRaf) cancelAnimationFrame(previewRaf);
      previewRaf = requestAnimationFrame(() => {
        previewRaf = 0;
        measurePreviewSelection(findPreviewRootForView(update.view));
      });
    });
  });
}
