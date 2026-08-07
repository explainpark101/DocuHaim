/**
 * Map a text selection in md-editor-rt preview (HTML) back to CodeMirror
 * source offsets using [data-line] block markers, and keep a visual
 * selection mirror in the preview after focus moves to the editor.
 */

import type { EditorView } from '@codemirror/view';
import {
  caretRectBesideImage,
  findImageHostFromRange,
  mapEditorPosToImageRange,
} from '@/utils/previewImageCaretSync';
import {
  caretRectForTableCell,
  findTableCell,
  mapEditorPosToTableCellRange,
  mapPreviewTableCellToEditorRange,
} from '@/utils/previewTableCellSync';

export const PREVIEW_SYNC_HIGHLIGHT_NAME = 's3haim-preview-sync-sel';
const PREVIEW_SYNC_OVERLAY_ATTR = 'data-preview-sel-mirror';
const PREVIEW_CARET_OVERLAY_ATTR = 'data-preview-caret-mirror';
const MIRROR_HIT_SLOP_PX = 4;

let mirroredPreviewRange: Range | null = null;

function setMirroredPreviewRange(range: Range | null): void {
  mirroredPreviewRange = range ? range.cloneRange() : null;
}

export function findDataLineElement(node: Node | null, previewRoot: Element): HTMLElement | null {
  let el: Node | null | undefined = node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  while (el && el !== previewRoot) {
    if (el instanceof HTMLElement && el.hasAttribute('data-line')) return el;
    el = el.parentElement;
  }
  return null;
}

function getTextOffsetInElement(rootEl: Element, node: Node, offset: number): number {
  if (!rootEl.contains(node) && node !== rootEl) return 0;

  let total = 0;
  const walk = (current: Node): boolean => {
    if (current === node) {
      if (current.nodeType === Node.TEXT_NODE) {
        total += Math.max(0, Math.min(offset, current.textContent?.length ?? 0));
        return true;
      }
      // Element caret: offset is child index.
      if (current instanceof Element) {
        for (let i = 0; i < Math.min(offset, current.childNodes.length); i += 1) {
          total += plainLengthOfNode(current.childNodes[i]!);
        }
        return true;
      }
    }
    if (current.nodeType === Node.TEXT_NODE) {
      total += current.textContent?.length ?? 0;
      return false;
    }
    if (current instanceof HTMLBRElement) {
      total += 1;
      return false;
    }
    if (current instanceof Element) {
      for (const child of current.childNodes) {
        if (walk(child)) return true;
      }
    }
    return false;
  };

  walk(rootEl);
  return total;
}

function plainLengthOfNode(node: Node): number {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent?.length ?? 0;
  if (node instanceof HTMLBRElement) return 1;
  let n = 0;
  if (node instanceof Element) {
    for (const child of node.childNodes) n += plainLengthOfNode(child);
  }
  return n;
}

/** Preview plain text with <br> treated as `\\n` (textContent alone concatenates lines). */
export function getPreviewPlainWithBreaks(root: Element): string {
  let out = '';
  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      out += node.textContent ?? '';
      return;
    }
    if (node instanceof HTMLBRElement) {
      out += '\n';
      return;
    }
    if (node instanceof Element) {
      for (const child of node.childNodes) walk(child);
    }
  };
  walk(root);
  return out;
}

function positionAfterNode(node: Node): { node: Node; offset: number } | null {
  const parent = node.parentNode;
  if (!parent) return null;
  const index = Array.prototype.indexOf.call(parent.childNodes, node);
  if (index < 0) return null;
  return { node: parent, offset: index + 1 };
}

export function getSourceBoundsForLineRange(
  view: EditorView,
  previewRoot: Element,
  startLine0: number,
  endLine0: number,
): { from: number; to: number } {
  const doc = view.state.doc;
  const line0Start = Math.max(0, Math.min(startLine0, endLine0));
  const line0End = Math.max(startLine0, endLine0);

  const dataLines = [...previewRoot.querySelectorAll('[data-line]')]
    .map((el) => Number(el.getAttribute('data-line')))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);

  const nextAfterEnd = dataLines.find((n) => n > line0End);
  const fromLine = Math.min(doc.lines, Math.max(1, line0Start + 1));
  const from = doc.line(fromLine).from;

  let to: number;
  if (nextAfterEnd != null && nextAfterEnd + 1 <= doc.lines) {
    to = doc.line(nextAfterEnd + 1).from;
  } else {
    to = doc.length;
  }

  if (to < from) return { from, to: from };
  return { from, to };
}

/**
 * Greedy aligner: map a plain-text (preview) offset into a markdown source offset
 * by matching characters and skipping markdown syntax that is not visible.
 */
export function mapPlainOffsetToSource(source: string, plain: string, plainOffset: number): number {
  const target = Math.max(0, Math.min(plainOffset, plain.length));
  let si = 0;
  let pi = 0;

  while (si < source.length && pi < target) {
    const sc = source[si];
    const pc = plain[pi];
    if (sc === undefined || pc === undefined) break;

    if (sc === pc) {
      si += 1;
      pi += 1;
      continue;
    }

    if (/\s/.test(sc) || /\s/.test(pc)) {
      while (si < source.length && /\s/.test(source[si] ?? '')) si += 1;
      while (pi < target && /\s/.test(plain[pi] ?? '')) pi += 1;
      continue;
    }

    si += 1;
  }

  return si;
}

/**
 * Inverse of mapPlainOffsetToSource: source caret offset → visible plain offset.
 */
export function mapSourceOffsetToPlain(source: string, plain: string, sourceOffset: number): number {
  const target = Math.max(0, Math.min(sourceOffset, source.length));
  let si = 0;
  let pi = 0;

  while (si < target && si < source.length) {
    const sc = source[si];
    const pc = plain[pi];
    if (sc === undefined) break;

    if (pc !== undefined && sc === pc) {
      si += 1;
      pi += 1;
      continue;
    }

    if (pc !== undefined && (/\s/.test(sc) || /\s/.test(pc))) {
      while (si < target && /\s/.test(source[si] ?? '')) si += 1;
      while (pi < plain.length && /\s/.test(plain[pi] ?? '')) pi += 1;
      continue;
    }

    si += 1;
  }

  return Math.max(0, Math.min(pi, plain.length));
}

function setPlainOffsetInElement(
  rootEl: Element,
  plainOffset: number,
): { node: Node; offset: number } | null {
  let remaining = Math.max(0, plainOffset);
  let lastText: { node: Node; offset: number } | null = null;

  const walk = (node: Node): { node: Node; offset: number } | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length ?? 0;
      if (remaining <= len) {
        return { node, offset: remaining };
      }
      remaining -= len;
      lastText = { node, offset: len };
      return null;
    }

    if (node instanceof HTMLBRElement) {
      // Plain uses one `\\n` per <br>.
      if (remaining === 0) {
        return positionAfterNode(node);
      }
      remaining -= 1;
      // Caret immediately after the break character sits after the <br>.
      if (remaining === 0) {
        return positionAfterNode(node);
      }
      return null;
    }

    if (node instanceof Element) {
      for (const child of node.childNodes) {
        const hit = walk(child);
        if (hit) return hit;
      }
    }
    return null;
  };

  const hit = walk(rootEl);
  if (hit) return hit;
  if (lastText) return lastText;
  return { node: rootEl, offset: 0 };
}

export function findDataLineBlockForSourceLine(
  previewRoot: Element,
  line0: number,
): HTMLElement | null {
  let best: HTMLElement | null = null;
  let bestLine = -1;
  for (const el of previewRoot.querySelectorAll('[data-line]')) {
    if (!(el instanceof HTMLElement)) continue;
    const n = Number(el.getAttribute('data-line'));
    if (!Number.isFinite(n)) continue;
    if (n <= line0 && n >= bestLine) {
      best = el;
      bestLine = n;
    }
  }
  return best;
}

/**
 * Map CodeMirror main selection to a Range inside the preview DOM.
 */
export function mapEditorSelectionToPreviewRange(
  view: EditorView,
  previewRoot: Element,
): Range | null {
  if (!view?.state || !previewRoot) return null;

  const main = view.state.selection.main;
  const fromPos = main.from;
  const toPos = main.to;

  // Images first: atomic before/after the rendered <img>.
  if (fromPos === toPos) {
    const imageRange = mapEditorPosToImageRange(view, previewRoot, fromPos);
    if (imageRange) return imageRange;
  } else {
    const startImg = mapEditorPosToImageRange(view, previewRoot, fromPos);
    const endImg = mapEditorPosToImageRange(view, previewRoot, toPos);
    if (startImg && endImg) {
      try {
        const range = document.createRange();
        range.setStart(startImg.startContainer, startImg.startOffset);
        range.setEnd(endImg.startContainer, endImg.startOffset);
        return range;
      } catch {
        // fall through
      }
    }
  }

  // Table cells (esp. empty): pipe/row mapping beats plain-text alignment.
  if (fromPos === toPos) {
    const cellRange = mapEditorPosToTableCellRange(view, previewRoot, fromPos);
    if (cellRange) return cellRange;
  } else {
    const startCellRange = mapEditorPosToTableCellRange(view, previewRoot, fromPos);
    const endCellRange = mapEditorPosToTableCellRange(view, previewRoot, toPos);
    if (startCellRange && endCellRange) {
      try {
        const range = document.createRange();
        range.setStart(startCellRange.startContainer, startCellRange.startOffset);
        range.setEnd(endCellRange.startContainer, endCellRange.startOffset);
        return range;
      } catch {
        // fall through
      }
    }
  }

  const fromLine0 = view.state.doc.lineAt(fromPos).number - 1;
  const toLine0 = view.state.doc.lineAt(toPos).number - 1;

  const startBlock = findDataLineBlockForSourceLine(previewRoot, fromLine0);
  const endBlock = findDataLineBlockForSourceLine(previewRoot, toLine0);
  if (!startBlock || !endBlock) return null;

  const resolve = (pos: number, block: HTMLElement) => {
    const line0 = Number(block.getAttribute('data-line'));
    if (!Number.isFinite(line0)) return null;
    const { from: blockFrom, to: blockTo } = getSourceBoundsForLineRange(
      view,
      previewRoot,
      line0,
      line0,
    );
    const sourceSlice = view.state.doc.sliceString(blockFrom, blockTo);
    const plain = getPreviewPlainWithBreaks(block);
    const plainOffset = mapSourceOffsetToPlain(
      sourceSlice,
      plain,
      Math.max(0, Math.min(pos, blockTo) - blockFrom),
    );
    return setPlainOffsetInElement(block, plainOffset);
  };

  const start = resolve(fromPos, startBlock);
  const end = resolve(toPos, endBlock);
  if (!start || !end) return null;

  try {
    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    return range;
  } catch {
    return null;
  }
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let from = 0;
  let idx = haystack.indexOf(needle, from);
  while (idx !== -1) {
    count += 1;
    from = idx + Math.max(1, needle.length);
    idx = haystack.indexOf(needle, from);
  }
  return count;
}

function findNthExactInSource(
  source: string,
  needle: string,
  nth: number,
): { from: number; to: number } | null {
  if (!needle) return null;
  let from = 0;
  let found = -1;
  let count = 0;
  while ((found = source.indexOf(needle, from)) !== -1) {
    if (count === nth) {
      return { from: found, to: found + needle.length };
    }
    count += 1;
    from = found + 1;
  }
  return null;
}

/**
 * Try to match `needle` as visible text starting at `from` in markdown source.
 * `from` must be the index of the first visible character (not a leading marker).
 */
function tryMatchPlainAt(
  source: string,
  from: number,
  needle: string,
): { from: number; to: number } | null {
  if (!needle || from >= source.length) return null;
  const startChar = source[from];
  const needleStart = needle[0];
  if (startChar === undefined || needleStart === undefined) return null;
  if (startChar !== needleStart && !( /\s/.test(startChar) && /\s/.test(needleStart) )) {
    return null;
  }

  let si = from;
  let pi = 0;
  while (si < source.length && pi < needle.length) {
    const sc = source[si];
    const pc = needle[pi];
    if (sc === undefined || pc === undefined) break;
    if (sc === pc) {
      si += 1;
      pi += 1;
      continue;
    }
    if (/\s/.test(sc) && /\s/.test(pc)) {
      while (si < source.length && /\s/.test(source[si] ?? '')) si += 1;
      while (pi < needle.length && /\s/.test(needle[pi] ?? '')) pi += 1;
      continue;
    }
    if (sc !== pc && !/\s/.test(pc)) {
      si += 1;
      continue;
    }
    return null;
  }
  if (pi < needle.length) return null;
  return { from, to: si };
}

function findNthAlignedInSource(
  source: string,
  needle: string,
  nth: number,
): { from: number; to: number } | null {
  if (!needle) return null;
  const matches: Array<{ from: number; to: number }> = [];
  for (let i = 0; i < source.length; i += 1) {
    const hit = tryMatchPlainAt(source, i, needle);
    if (!hit) continue;
    matches.push(hit);
    if (matches.length > nth) break;
    i = Math.max(i, hit.to - 1);
  }
  return matches[nth] ?? matches[0] ?? null;
}

/**
 * Map the current window selection inside previewRoot to CM document offsets.
 */
export function mapPreviewSelectionToEditorRange(
  view: EditorView,
  previewRoot: Element,
): { from: number; to: number } | null {
  if (!view?.state || !previewRoot) return null;

  const sel = window.getSelection?.();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  if (!previewRoot.contains(range.commonAncestorContainer)) return null;

  const tableMapped = mapPreviewTableCellToEditorRange(view, previewRoot, range);
  if (tableMapped) return tableMapped;

  const startBlock = findDataLineElement(range.startContainer, previewRoot);
  const endBlock = findDataLineElement(range.endContainer, previewRoot);
  if (!startBlock && !endBlock) return null;

  const startLine0 = Number((startBlock || endBlock)?.getAttribute('data-line'));
  const endLine0 = Number((endBlock || startBlock)?.getAttribute('data-line'));
  if (!Number.isFinite(startLine0) || !Number.isFinite(endLine0)) return null;

  const { from: blockFrom, to: blockTo } = getSourceBoundsForLineRange(
    view,
    previewRoot,
    startLine0,
    endLine0,
  );
  const sourceSlice = view.state.doc.sliceString(blockFrom, blockTo);
  if (!sourceSlice) {
    return { from: blockFrom, to: blockFrom };
  }

  if (range.collapsed) {
    const block = startBlock || endBlock;
    const plain = block ? getPreviewPlainWithBreaks(block) : '';
    const plainOffset = block
      ? getTextOffsetInElement(block, range.startContainer, range.startOffset)
      : 0;
    const sourceOffset = mapPlainOffsetToSource(sourceSlice, plain, plainOffset);
    const pos = blockFrom + Math.max(0, Math.min(sourceOffset, sourceSlice.length));
    return { from: pos, to: pos };
  }

  const selectedText = sel.toString();
  if (!selectedText) return null;

  let occurrence = 0;
  try {
    const before = document.createRange();
    before.setStart(previewRoot, 0);
    before.setEnd(range.startContainer, range.startOffset);
    occurrence = countOccurrences(before.toString(), selectedText);
  } catch {
    occurrence = 0;
  }

  const exact = findNthExactInSource(sourceSlice, selectedText, occurrence)
    || findNthExactInSource(sourceSlice, selectedText, 0);
  if (exact) {
    return { from: blockFrom + exact.from, to: blockFrom + exact.to };
  }

  if (startBlock && startBlock === endBlock) {
    const plain = getPreviewPlainWithBreaks(startBlock);
    const plainFrom = getTextOffsetInElement(startBlock, range.startContainer, range.startOffset);
    const plainTo = getTextOffsetInElement(startBlock, range.endContainer, range.endOffset);
    const a = Math.min(plainFrom, plainTo);
    const b = Math.max(plainFrom, plainTo);
    const srcFrom = mapPlainOffsetToSource(sourceSlice, plain, a);
    const srcTo = mapPlainOffsetToSource(sourceSlice, plain, b);
    return {
      from: blockFrom + Math.min(srcFrom, srcTo),
      to: blockFrom + Math.max(srcFrom, srcTo),
    };
  }

  const aligned = findNthAlignedInSource(sourceSlice, selectedText, occurrence)
    || findNthAlignedInSource(sourceSlice, selectedText, 0);
  if (aligned) {
    return { from: blockFrom + aligned.from, to: blockFrom + aligned.to };
  }

  return { from: blockFrom, to: blockTo };
}

function cssHighlights(): HighlightRegistry | null {
  const css = globalThis.CSS;
  if (!css || !('highlights' in css) || typeof Highlight === 'undefined') return null;
  return css.highlights;
}

function removePreviewSelectionOverlay(previewRoot: Element): void {
  previewRoot.querySelectorAll(`[${PREVIEW_SYNC_OVERLAY_ATTR}]`).forEach((el) => el.remove());
  previewRoot.querySelectorAll(`[${PREVIEW_CARET_OVERLAY_ATTR}]`).forEach((el) => el.remove());
  const wrapper = previewRoot.closest('.md-editor-preview-wrapper');
  wrapper?.querySelectorAll(`[${PREVIEW_SYNC_OVERLAY_ATTR}]`).forEach((el) => el.remove());
  wrapper?.querySelectorAll(`[${PREVIEW_CARET_OVERLAY_ATTR}]`).forEach((el) => el.remove());
}

export function clearPreviewSelectionMirror(previewRoot?: Element | null): void {
  setMirroredPreviewRange(null);
  cssHighlights()?.delete(PREVIEW_SYNC_HIGHLIGHT_NAME);
  if (previewRoot) removePreviewSelectionOverlay(previewRoot);
}

function ensurePreviewHostPositioned(host: HTMLElement): void {
  if (getComputedStyle(host).position === 'static') {
    host.style.position = 'relative';
  }
}

const PREVIEW_SCROLL_PAD_PX = 32;

export function findPreviewScrollContainer(previewRoot: Element): HTMLElement | null {
  const wrapper = previewRoot.closest('.md-editor-preview-wrapper');
  if (wrapper instanceof HTMLElement) return wrapper;

  let el: HTMLElement | null =
    previewRoot instanceof HTMLElement ? previewRoot : previewRoot.parentElement;
  while (el) {
    const style = getComputedStyle(el);
    if (
      /(auto|scroll|overlay)/.test(style.overflowY)
      || /(auto|scroll|overlay)/.test(style.overflowX)
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

function scrollRectIntoPreviewScroller(
  scroller: HTMLElement,
  rect: DOMRect,
): void {
  const pad = PREVIEW_SCROLL_PAD_PX;
  const sRect = scroller.getBoundingClientRect();
  let dy = 0;
  let dx = 0;

  if (rect.top < sRect.top + pad) {
    dy = rect.top - (sRect.top + pad);
  } else if (rect.bottom > sRect.bottom - pad) {
    dy = rect.bottom - (sRect.bottom - pad);
  }

  if (rect.left < sRect.left + pad) {
    dx = rect.left - (sRect.left + pad);
  } else if (rect.right > sRect.right - pad) {
    dx = rect.right - (sRect.right - pad);
  }

  if (dy !== 0) scroller.scrollTop += dy;
  if (dx !== 0) scroller.scrollLeft += dx;
}

/** Keep the mirrored caret/selection inside the preview pane's scrollport. */
export function scrollPreviewCaretIntoView(
  previewRoot: Element,
  range: Range,
  caretRect?: DOMRect | null,
): void {
  const scroller = findPreviewScrollContainer(previewRoot);
  if (!scroller) return;

  let rect: DOMRect | null = caretRect ?? null;
  if (!rect) {
    const bar = previewRoot.querySelector('.s3haim-preview-caret-mirror-bar');
    if (bar instanceof HTMLElement) {
      const br = bar.getBoundingClientRect();
      if (br.height > 0 || br.width > 0) rect = br;
    }
  }
  if (!rect) {
    const imageHost = findImageHostFromRange(range, previewRoot);
    if (imageHost) {
      rect = caretRectBesideImage(imageHost.host, imageHost.side);
    }
  }
  if (!rect) {
    try {
      const rects = range.getClientRects();
      if (rects.length > 0) {
        rect = range.collapsed ? rects[0]! : rects[rects.length - 1]!;
      } else {
        const b = range.getBoundingClientRect();
        if (b.height > 0 || b.width > 0) rect = b;
      }
    } catch {
      rect = null;
    }
  }
  if (!rect || (rect.height <= 0 && rect.width <= 0)) {
    const block = findDataLineElement(range.startContainer, previewRoot);
    if (block) {
      scrollRectIntoPreviewScroller(scroller, block.getBoundingClientRect());
    }
    return;
  }

  scrollRectIntoPreviewScroller(scroller, rect);
}

/**
 * Scroll preview so the CodeMirror caret/selection stays in view.
 * Does not draw Mirror Edit overlays — safe for always-on dual-pane follow.
 */
export function scrollPreviewToEditorSelection(
  view: EditorView,
  previewRoot: Element,
): boolean {
  if (!view?.state || !previewRoot) return false;

  const range = mapEditorSelectionToPreviewRange(view, previewRoot);
  if (range) {
    scrollPreviewCaretIntoView(previewRoot, range);
    return true;
  }

  const line0 = view.state.doc.lineAt(view.state.selection.main.head).number - 1;
  const block = findDataLineBlockForSourceLine(previewRoot, line0);
  if (!block) return false;
  const scroller = findPreviewScrollContainer(previewRoot);
  if (!scroller) return false;
  scrollRectIntoPreviewScroller(scroller, block.getBoundingClientRect());
  return true;
}

function applyPreviewCaretOverlay(
  previewRoot: Element,
  range: Range,
  caretRect?: DOMRect | null,
): void {
  const host = previewRoot instanceof HTMLElement ? previewRoot : null;
  if (!host) return;
  ensurePreviewHostPositioned(host);

  let rect: DOMRect | null = caretRect ?? null;
  const imageHost = rect ? null : findImageHostFromRange(range, previewRoot);
  const cell = rect ? null : findTableCell(range.startContainer, previewRoot);

  if (rect) {
    // Explicit blank-gap / caller-provided caret box.
  } else if (imageHost) {
    rect = caretRectBesideImage(imageHost.host, imageHost.side);
  } else if (cell) {
    // Always anchor to the cell box so 2nd/3rd columns stay visible even when
    // the native Range has no client rects (empty / whitespace-only cells).
    rect = caretRectForTableCell(cell);
    try {
      const rects = range.getClientRects();
      const textRect = rects.length > 0 ? rects[0] : null;
      if (textRect && textRect.height > 0 && textRect.width >= 0) {
        const br = cell.getBoundingClientRect();
        if (
          textRect.left >= br.left - 1
          && textRect.right <= br.right + 1
          && textRect.top >= br.top - 1
          && textRect.bottom <= br.bottom + 1
        ) {
          rect = new DOMRect(
            textRect.left,
            textRect.top,
            0,
            Math.max(textRect.height, 14),
          );
        }
      }
    } catch {
      // keep cell rect
    }
  } else {
    try {
      const rects = range.getClientRects();
      if (rects.length > 0) {
        rect = rects[0]!;
      } else {
        const b = range.getBoundingClientRect();
        if (b.height > 0 || b.width > 0) rect = b;
      }
    } catch {
      rect = null;
    }

    if (!rect || rect.height <= 0) {
      // Caret after a <br> often has empty client rects — sit on the next visual line.
      if (range.collapsed && range.startContainer instanceof Element) {
        const prev = range.startContainer.childNodes[range.startOffset - 1];
        if (prev instanceof HTMLBRElement) {
          const parentEl = prev.parentElement ?? host;
          const style = getComputedStyle(parentEl);
          const lh =
            Number.parseFloat(style.lineHeight)
            || (Number.parseFloat(style.fontSize) || 16) * 1.5;
          let left = parentEl.getBoundingClientRect().left;
          let top = prev.getBoundingClientRect().bottom;
          const before = prev.previousSibling;
          if (before) {
            try {
              const probe = document.createRange();
              probe.selectNodeContents(before);
              const box = probe.getBoundingClientRect();
              if (box.height > 0 || box.width > 0) {
                left = box.left;
                top = box.bottom;
              }
            } catch {
              // keep defaults
            }
          }
          rect = new DOMRect(left, top, 0, Math.max(lh * 0.85, 14));
        }
      }
    }

    if (!rect || rect.height <= 0) {
      const block =
        findDataLineElement(range.startContainer, previewRoot)
        || (range.startContainer instanceof HTMLElement ? range.startContainer : null);
      if (block) {
        const br = block.getBoundingClientRect();
        rect = new DOMRect(br.left, br.top, 0, Math.max(br.height || 0, 16));
      }
    }
  }

  if (!rect || rect.height <= 0) return;

  removePreviewSelectionOverlay(previewRoot);

  const hostRect = host.getBoundingClientRect();
  const layer = document.createElement('div');
  layer.setAttribute(PREVIEW_CARET_OVERLAY_ATTR, '');
  layer.className = 's3haim-preview-caret-mirror';
  layer.setAttribute('aria-hidden', 'true');

  const caret = document.createElement('div');
  caret.className = 's3haim-preview-caret-mirror-bar';
  caret.style.left = `${rect.left - hostRect.left}px`;
  caret.style.top = `${rect.top - hostRect.top}px`;
  caret.style.height = `${Math.max(rect.height, 14)}px`;
  layer.appendChild(caret);
  host.appendChild(layer);
}

function isPointInClientRect(rect: DOMRect, x: number, y: number, slop = 0): boolean {
  return (
    x >= rect.left - slop
    && x <= rect.right + slop
    && y >= rect.top - slop
    && y <= rect.bottom + slop
  );
}

export function isPointInMirroredPreviewSelection(x: number, y: number): boolean {
  if (!mirroredPreviewRange || mirroredPreviewRange.collapsed) return false;
  try {
    for (const rect of mirroredPreviewRange.getClientRects()) {
      if (isPointInClientRect(rect, x, y, MIRROR_HIT_SLOP_PX)) return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function isPointInLivePreviewSelection(
  previewRoot: Element,
  x: number,
  y: number,
): boolean {
  const sel = window.getSelection?.();
  if (!sel || sel.rangeCount === 0) return false;
  const range = sel.getRangeAt(0);
  if (range.collapsed) return false;
  if (!previewRoot.contains(range.commonAncestorContainer)) return false;
  try {
    for (const rect of range.getClientRects()) {
      if (isPointInClientRect(rect, x, y, MIRROR_HIT_SLOP_PX)) return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Put the mirrored preview range back into window.getSelection so a right-click
 * is treated as a Selection context menu (Copy, search, …).
 */
export function restoreMirroredPreviewSelection(previewRoot: Element): boolean {
  if (!mirroredPreviewRange || mirroredPreviewRange.collapsed) return false;
  try {
    if (!previewRoot.contains(mirroredPreviewRange.commonAncestorContainer)) {
      return false;
    }
    const sel = window.getSelection?.();
    if (!sel) return false;
    const next = mirroredPreviewRange.cloneRange();
    sel.removeAllRanges();
    sel.addRange(next);

    const active = document.activeElement;
    if (active instanceof HTMLElement && !previewRoot.contains(active)) {
      active.blur();
    }

    return Boolean(sel.rangeCount && !sel.getRangeAt(0)?.collapsed);
  } catch {
    return false;
  }
}

function applyPreviewSelectionOverlay(previewRoot: Element, range: Range): void {
  removePreviewSelectionOverlay(previewRoot);
  const host = previewRoot instanceof HTMLElement ? previewRoot : null;
  if (!host) return;

  ensurePreviewHostPositioned(host);

  const hostRect = host.getBoundingClientRect();
  const layer = document.createElement('div');
  layer.setAttribute(PREVIEW_SYNC_OVERLAY_ATTR, '');
  layer.className = 's3haim-preview-sel-mirror';
  layer.setAttribute('aria-hidden', 'true');

  for (const rect of range.getClientRects()) {
    if (rect.width <= 0 || rect.height <= 0) continue;
    const box = document.createElement('div');
    box.className = 's3haim-preview-sel-mirror-box';
    box.style.left = `${rect.left - hostRect.left}px`;
    box.style.top = `${rect.top - hostRect.top}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    layer.appendChild(box);
  }

  if (!layer.childElementCount) return;
  host.appendChild(layer);
}

/**
 * Keep preview text looking selected (or show a caret) after focus moves to CodeMirror.
 * Pass `allowCollapsed: true` (Mirror Edit) to keep a blinking caret for collapsed ranges.
 */
export function mirrorPreviewSelection(
  previewRoot: Element,
  range: Range,
  options: { allowCollapsed?: boolean; caretRect?: DOMRect | null } = {},
): boolean {
  const allowCollapsed = options.allowCollapsed === true;

  if (range.collapsed && !allowCollapsed) {
    clearPreviewSelectionMirror(previewRoot);
    return false;
  }

  setMirroredPreviewRange(range);

  if (range.collapsed) {
    cssHighlights()?.delete(PREVIEW_SYNC_HIGHLIGHT_NAME);
    applyPreviewCaretOverlay(previewRoot, range, options.caretRect);
    scrollPreviewCaretIntoView(previewRoot, range, options.caretRect);
    return true;
  }

  const highlights = cssHighlights();
  if (highlights) {
    try {
      removePreviewSelectionOverlay(previewRoot);
      highlights.set(PREVIEW_SYNC_HIGHLIGHT_NAME, new Highlight(range.cloneRange()));
      scrollPreviewCaretIntoView(previewRoot, range);
      return true;
    } catch {
      // fall through to overlay
    }
  }

  applyPreviewSelectionOverlay(previewRoot, range);
  scrollPreviewCaretIntoView(previewRoot, range);
  return true;
}

export function mirrorCurrentPreviewSelection(
  previewRoot: Element,
  options: { allowCollapsed?: boolean } = {},
): boolean {
  const sel = window.getSelection?.();
  if (!sel || sel.rangeCount === 0) {
    clearPreviewSelectionMirror(previewRoot);
    return false;
  }
  const range = sel.getRangeAt(0);
  if (!previewRoot.contains(range.commonAncestorContainer)) {
    clearPreviewSelectionMirror(previewRoot);
    return false;
  }
  return mirrorPreviewSelection(previewRoot, range, options);
}

/**
 * Mirror the current CodeMirror selection onto the preview (selection highlight or caret).
 */
export function syncEditorSelectionToPreview(
  view: EditorView,
  previewRoot: Element,
  options: { allowCollapsed?: boolean } = {},
): boolean {
  const range = mapEditorSelectionToPreviewRange(view, previewRoot);
  if (!range) {
    if (!options.allowCollapsed) clearPreviewSelectionMirror(previewRoot);
    return false;
  }
  return mirrorPreviewSelection(previewRoot, range, {
    ...(options.allowCollapsed ? { allowCollapsed: true } : {}),
  });
}

/**
 * Apply preview DOM selection onto the CodeMirror view and focus it for typing.
 * When clicking an empty table cell, pass `target` so we can map by cell even if
 * the browser could not place a native caret inside it.
 */
export function syncPreviewSelectionToEditor(
  view: EditorView,
  previewRoot: Element,
  options: {
    focus?: boolean;
    target?: EventTarget | null;
  } = {},
): boolean {
  const focus = options.focus ?? true;

  let mapped: { from: number; to: number } | null = null;

  const cellHit =
    options.target instanceof Element
      ? options.target.closest('td, th')
      : null;
  if (cellHit instanceof HTMLTableCellElement && previewRoot.contains(cellHit)) {
    try {
      const cellRange = document.createRange();
      cellRange.selectNodeContents(cellHit);
      cellRange.collapse(true);
      mapped = mapPreviewTableCellToEditorRange(view, previewRoot, cellRange);
      if (mapped) {
        // Keep a preview caret on this cell after focus moves to CM.
        mirrorPreviewSelection(previewRoot, cellRange, { allowCollapsed: true });
      }
    } catch {
      mapped = null;
    }
  }

  if (!mapped) {
    mapped = mapPreviewSelectionToEditorRange(view, previewRoot);
  }
  if (!mapped || !view) return false;

  const docLen = view.state.doc.length;
  const from = Math.max(0, Math.min(mapped.from, docLen));
  const to = Math.max(0, Math.min(mapped.to, docLen));

  view.dispatch({
    selection: { anchor: from, head: to },
    scrollIntoView: true,
  });

  if (focus) {
    view.focus();
  }
  return true;
}
