/**
 * Map Mirror Edit carets through GFM / haim pipe-table cells.
 * Empty cells have no text nodes, so plain-text offset mapping fails —
 * we use row/column indices and pipe spans instead.
 */

import type { EditorView } from '@codemirror/view';

export type PipeCellSpan = {
  /** Inclusive start of trimmed cell content within the source line. */
  contentFrom: number;
  /** Exclusive end of trimmed cell content within the source line. */
  contentTo: number;
  text: string;
};

function findDataLineElement(node: Node | null, previewRoot: Element): HTMLElement | null {
  let el: Node | null | undefined =
    node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  while (el && el !== previewRoot) {
    if (el instanceof HTMLElement && el.hasAttribute('data-line')) return el;
    el = el.parentElement;
  }
  return null;
}

export function findTableCell(
  node: Node | null,
  previewRoot: Element,
): HTMLTableCellElement | null {
  let el: Node | null | undefined =
    node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  while (el && el !== previewRoot) {
    if (el instanceof HTMLTableCellElement) return el;
    el = el.parentElement;
  }
  return null;
}

export function isSeparatorPipeLine(line: string): boolean {
  const t = line.trim();
  if (!t.includes('|') && !t.includes('-')) return false;
  const inner = t.replace(/^\|/, '').replace(/\|$/, '');
  const cells = inner.split('|');
  if (cells.length === 0) return false;
  return cells.every((c) => /^\s*:?-+:?\s*$/.test(c) && c.includes('-'));
}

export function isPipeTableLine(line: string): boolean {
  return line.includes('|');
}

/**
 * Parse a GFM pipe row into cell content spans with offsets into `line`.
 * Matches `splitPipeRow` semantics (trim; strip one leading/trailing `|`).
 */
export function parsePipeRowSpans(line: string): PipeCellSpan[] {
  const spans: PipeCellSpan[] = [];
  const leadingWs = line.match(/^\s*/)?.[0]?.length ?? 0;
  let inner = line.trim();
  if (!inner) return spans;

  let base = leadingWs;
  if (inner.startsWith('|')) {
    inner = inner.slice(1);
    base += 1;
  }
  if (inner.endsWith('|')) {
    inner = inner.slice(0, -1);
  }

  let i = 0;
  const n = inner.length;
  while (i <= n) {
    const rawStart = i;
    while (i < n && inner[i] !== '|') i += 1;
    const rawEnd = i;
    const raw = inner.slice(rawStart, rawEnd);
    const lead = raw.match(/^\s*/)?.[0]?.length ?? 0;
    const trail = raw.match(/\s*$/)?.[0]?.length ?? 0;
    const contentFrom = base + rawStart + lead;
    const contentTo = Math.max(contentFrom, base + rawEnd - trail);
    spans.push({
      contentFrom,
      contentTo,
      text: line.slice(contentFrom, contentTo),
    });
    if (i >= n) break;
    i += 1;
  }
  return spans;
}

function listTableRows(table: HTMLTableElement): HTMLTableRowElement[] {
  return [...table.querySelectorAll('tr')].filter(
    (tr): tr is HTMLTableRowElement => tr instanceof HTMLTableRowElement,
  );
}

/** Logical column index (accounts for colspan of preceding cells). */
export function getCellColumnIndex(cell: HTMLTableCellElement): number {
  const tr = cell.parentElement;
  if (!(tr instanceof HTMLTableRowElement)) return 0;
  let col = 0;
  for (const c of tr.querySelectorAll(':scope > th, :scope > td')) {
    if (!(c instanceof HTMLTableCellElement)) continue;
    if (c === cell) return col;
    col += Math.max(1, Number(c.getAttribute('colspan') || 1) || 1);
  }
  return 0;
}

export function getCellRowIndex(cell: HTMLTableCellElement): number {
  const table = cell.closest('table');
  if (!(table instanceof HTMLTableElement)) return -1;
  return listTableRows(table).indexOf(cell.parentElement as HTMLTableRowElement);
}

type TableDataRow = {
  /** 0-based document line number */
  line0: number;
  lineText: string;
  /** Absolute doc offset of line start */
  lineFrom: number;
  spans: PipeCellSpan[];
};

/**
 * Collect GFM data rows (header + body; skip separator) for a preview <table>.
 * Important: do NOT use getSourceBoundsForLineRange here — cell `data-line`
 * attrs inside the table would truncate the block to the first row only.
 */
function collectTableDataRows(
  view: EditorView,
  previewRoot: Element,
  table: HTMLTableElement,
): TableDataRow[] {
  const lineAnchor =
    findDataLineElement(table, previewRoot)
    || (table.hasAttribute('data-line') ? table : null);
  if (!lineAnchor) return [];

  const tableLine0 = Number(lineAnchor.getAttribute('data-line'));
  if (!Number.isFinite(tableLine0)) return [];

  const doc = view.state.doc;
  const descendantLines = [...table.querySelectorAll('[data-line]')]
    .map((el) => Number(el.getAttribute('data-line')))
    .filter((n) => Number.isFinite(n));
  const minLine0 = Math.min(tableLine0, ...descendantLines);
  const maxLine0 = Math.max(tableLine0, ...descendantLines);

  // Start at first pipe row at/after minLine0 (skip haim-table comment lines).
  let start1 = Math.min(doc.lines, Math.max(1, minLine0 + 1));
  while (start1 <= doc.lines) {
    const text = doc.line(start1).text;
    if (isPipeTableLine(text)) break;
    if (!text.trim() || /haim-table/i.test(text) || text.trim().startsWith('<!--')) {
      start1 += 1;
      continue;
    }
    break;
  }
  if (start1 > doc.lines || !isPipeTableLine(doc.line(start1).text)) return [];

  // Walk forward through contiguous pipe rows (including separator).
  let end1 = start1;
  while (end1 + 1 <= doc.lines) {
    const next = doc.line(end1 + 1).text;
    if (!next.trim()) break;
    if (!isPipeTableLine(next)) break;
    end1 += 1;
  }
  // Ensure we at least cover descendant data-lines (body rows).
  end1 = Math.max(end1, Math.min(doc.lines, maxLine0 + 1));
  while (end1 + 1 <= doc.lines) {
    const next = doc.line(end1 + 1).text;
    if (!next.trim()) break;
    if (!isPipeTableLine(next) || isSeparatorPipeLine(next)) break;
    end1 += 1;
  }

  const rows: TableDataRow[] = [];
  for (let i = start1; i <= end1; i += 1) {
    const line = doc.line(i);
    if (!isPipeTableLine(line.text)) continue;
    if (isSeparatorPipeLine(line.text)) continue;
    rows.push({
      line0: i - 1,
      lineText: line.text,
      lineFrom: line.from,
      spans: parsePipeRowSpans(line.text),
    });
  }
  return rows;
}

function cellIndexAtLineOffset(spans: PipeCellSpan[], offsetInLine: number): number {
  if (!spans.length) return 0;
  for (let i = 0; i < spans.length; i += 1) {
    const span = spans[i]!;
    // Include the gap up to the next cell's content (pipes/spaces between cells).
    const next = spans[i + 1];
    const limit = next ? next.contentFrom : span.contentTo + 1;
    if (offsetInLine < limit || offsetInLine <= span.contentTo) return i;
  }
  return spans.length - 1;
}

function rangeInTableCell(
  cell: HTMLTableCellElement,
  plainOffset = 0,
): Range | null {
  try {
    const range = document.createRange();
    const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
    let remaining = Math.max(0, plainOffset);
    let current = walker.nextNode();
    let last: Node | null = null;

    while (current) {
      last = current;
      const len = current.textContent?.length ?? 0;
      if (remaining <= len) {
        range.setStart(current, remaining);
        range.collapse(true);
        return range;
      }
      remaining -= len;
      current = walker.nextNode();
    }

    if (last) {
      range.setStart(last, last.textContent?.length ?? 0);
      range.collapse(true);
      return range;
    }

    // Empty cell: caret at start of the cell element.
    range.setStart(cell, 0);
    range.collapse(true);
    return range;
  } catch {
    return null;
  }
}

/**
 * Preview DOM selection inside a table cell → CM source offsets.
 */
export function mapPreviewTableCellToEditorRange(
  view: EditorView,
  previewRoot: Element,
  range: Range,
): { from: number; to: number } | null {
  const startCell = findTableCell(range.startContainer, previewRoot);
  const endCell = findTableCell(range.endContainer, previewRoot);
  if (!startCell && !endCell) return null;

  const cell = startCell || endCell;
  if (!cell) return null;
  const table = cell.closest('table');
  if (!(table instanceof HTMLTableElement)) return null;

  const dataRows = collectTableDataRows(view, previewRoot, table);
  if (!dataRows.length) return null;

  const rowIndex = getCellRowIndex(cell);
  if (rowIndex < 0 || rowIndex >= dataRows.length) return null;

  const colIndex = getCellColumnIndex(cell);
  const row = dataRows[rowIndex]!;
  const span = row.spans[colIndex] ?? row.spans[row.spans.length - 1];
  if (!span) {
    return { from: row.lineFrom, to: row.lineFrom };
  }

  // Place caret at start of cell content (empty → between spaces / around pipes).
  // Prefer contentFrom; if empty, keep a collapsed range there so CM lands in the cell.
  let from = row.lineFrom + span.contentFrom;
  let to = from;

  if (!range.collapsed && startCell && endCell && startCell === endCell) {
    const a = Math.min(
      getPlainOffsetInCell(cell, range.startContainer, range.startOffset),
      getPlainOffsetInCell(cell, range.endContainer, range.endOffset),
    );
    const b = Math.max(
      getPlainOffsetInCell(cell, range.startContainer, range.startOffset),
      getPlainOffsetInCell(cell, range.endContainer, range.endOffset),
    );
    from = row.lineFrom + span.contentFrom + Math.min(a, span.text.length);
    to = row.lineFrom + span.contentFrom + Math.min(b, span.text.length);
  } else if (!range.collapsed && startCell && endCell && startCell !== endCell) {
    const endRowIndex = getCellRowIndex(endCell);
    const endCol = getCellColumnIndex(endCell);
    const endRow = dataRows[Math.min(endRowIndex, dataRows.length - 1)]!;
    const endSpan = endRow.spans[endCol] ?? endRow.spans[endRow.spans.length - 1];
    from = row.lineFrom + span.contentFrom;
    to = endSpan
      ? endRow.lineFrom + endSpan.contentTo
      : row.lineFrom + span.contentTo;
  } else {
    // Collapsed: if the cell has text and selection is inside it, keep relative offset.
    const plainOff = getPlainOffsetInCell(cell, range.startContainer, range.startOffset);
    from = row.lineFrom + span.contentFrom + Math.min(plainOff, span.text.length);
    to = from;
  }

  return { from, to };
}

function getPlainOffsetInCell(
  cell: HTMLTableCellElement,
  node: Node,
  offset: number,
): number {
  if (node === cell) {
    // Element offset: 0 = before children, childNodes.length = after.
    if (offset <= 0) return 0;
    let total = 0;
    for (let i = 0; i < Math.min(offset, cell.childNodes.length); i += 1) {
      total += cell.childNodes[i]?.textContent?.length ?? 0;
    }
    return total;
  }
  if (!cell.contains(node)) return 0;
  const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
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
 * CM caret/selection → preview Range inside the matching table cell.
 */
export function mapEditorPosToTableCellRange(
  view: EditorView,
  previewRoot: Element,
  pos: number,
): Range | null {
  const line = view.state.doc.lineAt(pos);
  const lineText = line.text;
  if (!isPipeTableLine(lineText) || isSeparatorPipeLine(lineText)) return null;

  const line0 = line.number - 1;
  const offsetInLine = pos - line.from;
  const spans = parsePipeRowSpans(lineText);
  if (!spans.length) return null;
  const colIndex = cellIndexAtLineOffset(spans, offsetInLine);
  const span = spans[colIndex]!;
  const plainOffset = Math.max(
    0,
    Math.min(span.text.length, offsetInLine - span.contentFrom),
  );

  // Find table whose data rows include this source line.
  const tables = [...previewRoot.querySelectorAll('table')];
  for (const table of tables) {
    if (!(table instanceof HTMLTableElement)) continue;
    const dataRows = collectTableDataRows(view, previewRoot, table);
    const rowIndex = dataRows.findIndex((r) => r.line0 === line0);
    if (rowIndex < 0) continue;

    const tr = listTableRows(table)[rowIndex];
    if (!tr) continue;

    const cell = findCellAtColumn(tr, colIndex);
    if (!cell) continue;

    return rangeInTableCell(cell, plainOffset);
  }

  return null;
}

function findCellAtColumn(
  tr: HTMLTableRowElement,
  colIndex: number,
): HTMLTableCellElement | null {
  let col = 0;
  for (const c of tr.querySelectorAll(':scope > th, :scope > td')) {
    if (!(c instanceof HTMLTableCellElement)) continue;
    const span = Math.max(1, Number(c.getAttribute('colspan') || 1) || 1);
    if (colIndex >= col && colIndex < col + span) return c;
    col += span;
  }
  return null;
}

/** Prefer the cell box when drawing a caret for an empty td/th. */
export function caretRectForTableCell(
  cell: HTMLTableCellElement,
): DOMRect {
  const br = cell.getBoundingClientRect();
  const style = window.getComputedStyle(cell);
  const padL = Number.parseFloat(style.paddingLeft) || 0;
  const padT = Number.parseFloat(style.paddingTop) || 0;
  const padB = Number.parseFloat(style.paddingBottom) || 0;
  const height = Math.max(br.height - padT - padB, 14);
  return new DOMRect(br.left + padL, br.top + padT, 0, height);
}
