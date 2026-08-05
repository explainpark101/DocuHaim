/**
 * Map a text selection in md-editor-rt preview (HTML) back to CodeMirror
 * source offsets using [data-line] block markers, and keep a visual
 * selection mirror in the preview after focus moves to the editor.
 */

import type { EditorView } from '@codemirror/view';

export const PREVIEW_SYNC_HIGHLIGHT_NAME = 's3haim-preview-sync-sel';
const PREVIEW_SYNC_OVERLAY_ATTR = 'data-preview-sel-mirror';
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
  if (!rootEl.contains(node)) return 0;
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
  let total = 0;
  let current = walker.nextNode();
  while (current) {
    if (current === node) {
      return total + Math.max(0, Math.min(offset, current.textContent?.length ?? 0));
    }
    total += current.textContent?.length ?? 0;
    current = walker.nextNode();
  }
  return total;
}

function getSourceBoundsForLineRange(
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
    const plain = block?.textContent ?? '';
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
    const plain = startBlock.textContent ?? '';
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
  const wrapper = previewRoot.closest('.md-editor-preview-wrapper');
  wrapper?.querySelectorAll(`[${PREVIEW_SYNC_OVERLAY_ATTR}]`).forEach((el) => el.remove());
}

export function clearPreviewSelectionMirror(previewRoot?: Element | null): void {
  setMirroredPreviewRange(null);
  cssHighlights()?.delete(PREVIEW_SYNC_HIGHLIGHT_NAME);
  if (previewRoot) removePreviewSelectionOverlay(previewRoot);
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

  if (getComputedStyle(host).position === 'static') {
    host.style.position = 'relative';
  }

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
 * Keep preview text looking selected after the browser selection moves to CodeMirror.
 */
export function mirrorPreviewSelection(previewRoot: Element, range: Range): boolean {
  if (range.collapsed) {
    clearPreviewSelectionMirror(previewRoot);
    return false;
  }

  setMirroredPreviewRange(range);

  const highlights = cssHighlights();
  if (highlights) {
    try {
      removePreviewSelectionOverlay(previewRoot);
      highlights.set(PREVIEW_SYNC_HIGHLIGHT_NAME, new Highlight(range.cloneRange()));
      return true;
    } catch {
      // fall through to overlay
    }
  }

  applyPreviewSelectionOverlay(previewRoot, range);
  return true;
}

export function mirrorCurrentPreviewSelection(previewRoot: Element): boolean {
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
  return mirrorPreviewSelection(previewRoot, range);
}

/**
 * Apply preview DOM selection onto the CodeMirror view and focus it for typing.
 */
export function syncPreviewSelectionToEditor(
  view: EditorView,
  previewRoot: Element,
  options: { focus?: boolean } = {},
): boolean {
  const focus = options.focus ?? true;
  const mapped = mapPreviewSelectionToEditorRange(view, previewRoot);
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
