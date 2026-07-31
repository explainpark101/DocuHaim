/**
 * Map a text selection in md-editor-rt preview (HTML) back to CodeMirror
 * source offsets using [data-line] block markers.
 */

/**
 * @param {Node | null} node
 * @param {Element} previewRoot
 * @returns {HTMLElement | null}
 */
export function findDataLineElement(node, previewRoot) {
  let el = node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  while (el && el !== previewRoot) {
    if (el instanceof HTMLElement && el.hasAttribute('data-line')) return el;
    el = el.parentElement;
  }
  return null;
}

/**
 * @param {Element} rootEl
 * @param {Node} node
 * @param {number} offset
 * @returns {number}
 */
function getTextOffsetInElement(rootEl, node, offset) {
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

/**
 * @param {import('@codemirror/view').EditorView} view
 * @param {Element} previewRoot
 * @param {number} startLine0
 * @param {number} endLine0
 * @returns {{ from: number, to: number }}
 */
function getSourceBoundsForLineRange(view, previewRoot, startLine0, endLine0) {
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

  let to;
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
 *
 * @param {string} source
 * @param {string} plain
 * @param {number} plainOffset
 * @returns {number}
 */
export function mapPlainOffsetToSource(source, plain, plainOffset) {
  const target = Math.max(0, Math.min(plainOffset, plain.length));
  let si = 0;
  let pi = 0;

  while (si < source.length && pi < target) {
    const sc = source[si];
    const pc = plain[pi];

    if (sc === pc) {
      si += 1;
      pi += 1;
      continue;
    }

    if (/\s/.test(sc) || /\s/.test(pc)) {
      while (si < source.length && /\s/.test(source[si])) si += 1;
      while (pi < target && /\s/.test(plain[pi])) pi += 1;
      continue;
    }

    // Skip markdown / punctuation in source that does not appear in preview text.
    si += 1;
  }

  return si;
}

/**
 * @param {string} haystack
 * @param {string} needle
 * @returns {number}
 */
function countOccurrences(haystack, needle) {
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

/**
 * @param {string} source
 * @param {string} needle
 * @param {number} nth zero-based occurrence index among exact matches
 * @returns {{ from: number, to: number } | null}
 */
function findNthExactInSource(source, needle, nth) {
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
 * @param {string} source
 * @param {number} from
 * @param {string} needle
 * @returns {{ from: number, to: number } | null}
 */
function tryMatchPlainAt(source, from, needle) {
  if (!needle || from >= source.length) return null;
  if (source[from] !== needle[0] && !( /\s/.test(source[from]) && /\s/.test(needle[0]) )) {
    return null;
  }

  let si = from;
  let pi = 0;
  while (si < source.length && pi < needle.length) {
    const sc = source[si];
    const pc = needle[pi];
    if (sc === pc) {
      si += 1;
      pi += 1;
      continue;
    }
    if (/\s/.test(sc) && /\s/.test(pc)) {
      while (si < source.length && /\s/.test(source[si])) si += 1;
      while (pi < needle.length && /\s/.test(needle[pi])) pi += 1;
      continue;
    }
    // Skip markdown markers in the middle (e.g. **bold** markers around matched run).
    if (sc !== pc && !/\s/.test(pc)) {
      si += 1;
      continue;
    }
    return null;
  }
  if (pi < needle.length) return null;
  return { from, to: si };
}

/**
 * Locate needle as a visible-text span inside markdown source via alignment.
 * @param {string} source
 * @param {string} needle
 * @param {number} nth
 * @returns {{ from: number, to: number } | null}
 */
function findNthAlignedInSource(source, needle, nth) {
  if (!needle) return null;
  const matches = [];
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
 *
 * @param {import('@codemirror/view').EditorView} view
 * @param {Element} previewRoot
 * @returns {{ from: number, to: number } | null}
 */
export function mapPreviewSelectionToEditorRange(view, previewRoot) {
  if (!view?.state || !previewRoot) return null;

  const sel = window.getSelection?.();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  if (!previewRoot.contains(range.commonAncestorContainer)) return null;

  const startBlock = findDataLineElement(range.startContainer, previewRoot);
  const endBlock = findDataLineElement(range.endContainer, previewRoot);
  if (!startBlock && !endBlock) return null;

  const startLine0 = Number((startBlock || endBlock).getAttribute('data-line'));
  const endLine0 = Number((endBlock || startBlock).getAttribute('data-line'));
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

  // Occurrence index among identical strings before the selection in the preview.
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

  // Align start/end using block plain text when selection stays in one block.
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

  // Fallback: select the whole mapped block range.
  return { from: blockFrom, to: blockTo };
}

/**
 * Apply preview DOM selection onto the CodeMirror view and focus it for typing.
 *
 * @param {import('@codemirror/view').EditorView} view
 * @param {Element} previewRoot
 * @param {{ focus?: boolean }} [options]
 * @returns {boolean}
 */
export function syncPreviewSelectionToEditor(view, previewRoot, options = {}) {
  const { focus = true } = options;
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
