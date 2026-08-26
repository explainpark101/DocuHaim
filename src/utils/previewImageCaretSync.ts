/**
 * Mirror Edit: treat wiki/markdown image markup as an atomic caret unit.
 * Arrow keys jump over `![[...]]` / `![...](...)`, and preview caret
 * lands naturally before/after the rendered <img> (or wrapping figure).
 */

import { EditorSelection, type Text } from '@codemirror/state';

/** Wiki image: ![[path]] / ![[path|opts]] */
import type { EditorView } from '@codemirror/view';
const WIKI_IMAGE_LINE_RE = /!\[\[([^[\]]*)\]\]/g;
/** CommonMark / GFM image, optional attr block: ![alt](url){...} */
const MD_IMAGE_LINE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;

export type ImageSourceSpan = {
  from: number;
  to: number;
  kind: 'wiki' | 'markdown';
};

let caretOriginFromPreview = false;

/** Call when Mirror Edit caret was placed via a preview click. */
export function markMirrorEditCaretFromPreview(): void {
  caretOriginFromPreview = true;
}

/** Call when the user focuses/clicks the source editor directly. */
export function markMirrorEditCaretFromEditor(): void {
  caretOriginFromPreview = false;
}

export function isMirrorEditCaretFromPreview(): boolean {
  return caretOriginFromPreview;
}

function collectImageSpansOnLine(lineText: string, lineFrom: number): ImageSourceSpan[] {
  const spans: ImageSourceSpan[] = [];

  WIKI_IMAGE_LINE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = WIKI_IMAGE_LINE_RE.exec(lineText)) !== null) {
    spans.push({
      from: lineFrom + m.index,
      to: lineFrom + m.index + m[0].length,
      kind: 'wiki',
    });
  }

  MD_IMAGE_LINE_RE.lastIndex = 0;
  while ((m = MD_IMAGE_LINE_RE.exec(lineText)) !== null) {
    const from = lineFrom + m.index;
    const to = from + m[0].length;
    // Prefer wiki if overlapping (shouldn't normally).
    if (spans.some((s) => !(to <= s.from || from >= s.to))) continue;
    spans.push({ from, to, kind: 'markdown' });
  }

  spans.sort((a, b) => a.from - b.from);
  return spans;
}

/** Image span that contains `pos`, or has `pos` exactly on a boundary. */
export function findImageSpanAt(doc: Text, pos: number): ImageSourceSpan | null {
  const line = doc.lineAt(pos);
  const spans = collectImageSpansOnLine(line.text, line.from);
  for (const span of spans) {
    if (pos >= span.from && pos <= span.to) return span;
  }
  return null;
}

/**
 * Move caret across an image markup unit.
 * @returns true if handled (caller should not run default cursor motion).
 */
export function moveCaretSkippingImages(view: EditorView, dir: -1 | 1): boolean {
  if (!isMirrorEditCaretFromPreview()) return false;

  const head = view.state.selection.main.head;
  const doc = view.state.doc;

  // On/inside an image span → jump to the far side in one step.
  const covering = findImageSpanAt(doc, head);
  if (covering) {
    if (dir === 1 && head < covering.to) {
      view.dispatch({
        selection: EditorSelection.cursor(covering.to),
        scrollIntoView: true,
      });
      return true;
    }
    if (dir === -1 && head > covering.from) {
      view.dispatch({
        selection: EditorSelection.cursor(covering.from),
        scrollIntoView: true,
      });
      return true;
    }
  }

  // Stepping onto the first character of an image from the left.
  if (dir === 1 && head < doc.length) {
    const line = doc.lineAt(head);
    const starting = collectImageSpansOnLine(line.text, line.from).find(
      (s) => s.from === head,
    );
    if (starting) {
      view.dispatch({
        selection: EditorSelection.cursor(starting.to),
        scrollIntoView: true,
      });
      return true;
    }
  }

  // Stepping onto the last character of an image from the right.
  if (dir === -1 && head > 0) {
    const prevSpan = findImageSpanAt(doc, head - 1);
    if (prevSpan && prevSpan.to === head) {
      view.dispatch({
        selection: EditorSelection.cursor(prevSpan.from),
        scrollIntoView: true,
      });
      return true;
    }
  }

  return false;
}

/**
 * After a left/right move, if we landed inside (or on the entry edge of)
 * image markup, snap to the far side in the motion direction.
 */
export function snapCaretOutOfImageIfNeeded(view: EditorView, dir: -1 | 1): boolean {
  if (!isMirrorEditCaretFromPreview()) return false;
  const head = view.state.selection.main.head;
  const span = findImageSpanAt(view.state.doc, head);
  if (!span) return false;

  let target: number | null = null;
  if (head > span.from && head < span.to) {
    target = dir === 1 ? span.to : span.from;
  } else if (dir === 1 && head === span.from) {
    // Group/syntax motion landed on the image start → skip the whole unit.
    target = span.to;
  } else if (dir === -1 && head === span.to) {
    target = span.from;
  }
  if (target == null || target === head) return false;

  view.dispatch({
    selection: EditorSelection.cursor(target),
    scrollIntoView: true,
  });
  return true;
}

/**
 * Run a CodeMirror motion command, then treat image markup as atomic
 * (Ctrl/Alt+Arrow group & syntax moves).
 * @returns true if Mirror Edit handled the key (caller should not fall through).
 */
export function runMotionSkippingImages(
  view: EditorView,
  dir: -1 | 1,
  motion: (view: EditorView) => boolean,
): boolean {
  if (!isMirrorEditCaretFromPreview()) return false;

  // Already inside / on an image → jump out in one step (same as char arrows).
  if (moveCaretSkippingImages(view, dir)) return true;

  const moved = motion(view);
  if (!moved) return false;

  snapCaretOutOfImageIfNeeded(view, dir);
  return true;
}

function countImagesBefore(doc: Text, pos: number, kind: 'wiki' | 'markdown'): number {
  // Count completed image starts strictly before `pos`.
  // If `pos` is inside/at start of an image, that image is not "before".
  const spanAt = findImageSpanAt(doc, pos);
  const limit = spanAt && pos > spanAt.from ? spanAt.from : pos;
  const text = doc.sliceString(0, limit);
  if (kind === 'wiki') {
    const matches = text.match(/!\[\[[^[\]]*\]\]/g);
    return matches?.length ?? 0;
  }
  const matches = text.match(/!\[[^\]]*\]\([^)\n]+\)(?:\{[^}\n]*\})?/g);
  return matches?.length ?? 0;
}

function atomicPreviewImageHost(img: HTMLElement): HTMLElement {
  const figure = img.closest('figure');
  if (figure instanceof HTMLElement) return figure;
  const line = img.closest(
    'p.novel-wiki-image-line, p.md-editor-wiki-image, span.md-editor-wiki-image',
  );
  if (line instanceof HTMLElement) {
    // Only treat the paragraph as atomic when it is essentially the image.
    const text = (line.textContent ?? '').replace(/\u00a0/g, ' ').trim();
    if (!text) return line;
  }
  return img;
}

function listPreviewImages(previewRoot: Element, kind: 'wiki' | 'markdown'): HTMLElement[] {
  if (kind === 'wiki') {
    return [...previewRoot.querySelectorAll('img[data-wiki-path]')].filter(
      (el): el is HTMLImageElement => el instanceof HTMLImageElement,
    );
  }
  return [...previewRoot.querySelectorAll('img')].filter(
    (el): el is HTMLImageElement =>
      el instanceof HTMLImageElement && !el.hasAttribute('data-wiki-path'),
  );
}

function rangeBesideImage(host: HTMLElement, side: 'before' | 'after'): Range | null {
  try {
    const range = document.createRange();
    if (side === 'before') {
      range.setStartBefore(host);
    } else {
      range.setStartAfter(host);
    }
    range.collapse(true);
    return range;
  } catch {
    return null;
  }
}

/**
 * Map a CM position on/beside image markup to a preview Range before/after the image.
 */
export function mapEditorPosToImageRange(
  view: EditorView,
  previewRoot: Element,
  pos: number,
): Range | null {
  const doc = view.state.doc;
  let span = findImageSpanAt(doc, pos);
  let side: 'before' | 'after' | null = null;

  if (span) {
    if (pos <= span.from) side = 'before';
    else if (pos >= span.to) side = 'after';
    else side = pos - span.from <= span.to - pos ? 'before' : 'after';
  }

  // Blank source lines / preview Enter use `<br/>` hard breaks (see previewHardBreak).

  if (!span || !side) return null;

  const index = countImagesBefore(doc, span.from, span.kind);
  const imgs = listPreviewImages(previewRoot, span.kind);
  const img = imgs[index];
  if (!img) return null;

  const host = atomicPreviewImageHost(img);
  return rangeBesideImage(host, side);
}

/** Caret overlay rect just before/after an image host. */
export function caretRectBesideImage(
  host: HTMLElement,
  side: 'before' | 'after',
): DOMRect {
  const br = host.getBoundingClientRect();
  const h = Math.max(br.height, 14);
  if (side === 'before') {
    return new DOMRect(br.left, br.top, 0, h);
  }
  return new DOMRect(br.right, br.top, 0, h);
}

export function findImageHostFromRange(
  range: Range,
  previewRoot: Element,
): { host: HTMLElement; side: 'before' | 'after' } | null {
  try {
    if (range.startContainer instanceof Element) {
      const parent = range.startContainer;
      const before = parent.childNodes[range.startOffset - 1];
      const after = parent.childNodes[range.startOffset];

      const asHost = (node: ChildNode | undefined | null): HTMLElement | null => {
        if (!(node instanceof HTMLElement)) return null;
        if (node.tagName === 'IMG') return atomicPreviewImageHost(node);
        if (node.tagName === 'FIGURE') return node;
        const img = node.querySelector?.('img');
        if (img instanceof HTMLElement) return atomicPreviewImageHost(img);
        return null;
      };

      const afterHost = asHost(after);
      if (afterHost && previewRoot.contains(afterHost)) {
        return { host: afterHost, side: 'before' };
      }
      const beforeHost = asHost(before);
      if (beforeHost && previewRoot.contains(beforeHost)) {
        return { host: beforeHost, side: 'after' };
      }
    }
  } catch {
    // ignore
  }
  return null;
}
