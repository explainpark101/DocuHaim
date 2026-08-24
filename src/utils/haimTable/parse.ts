import {
  createDefaultHaimTableMeta,
  cellKey,
  type HaimTableBlock,
  type HaimTableCells,
  type HaimTableGrid,
  type HaimTableMeta,
  type HaimTableSections,
  type HaimTableStyle,
  type HaimTableSectionKey,
} from '@/utils/haimTable/types';
import { normalizeMerges } from '@/utils/haimTable/merge';
import { isEmptyStyle, normalizeHaimTableStyle } from '@/utils/haimTable/styleNormalize';
import {
  normalizeHaimTableAlign,
  normalizeHaimTableBoxSize,
  normalizeHaimTableWidth,
} from '@/utils/haimTable/layout';
import {
  normalizeHaimTableSizeList,
  serializeSizeList,
} from '@/utils/haimTable/gridSize';
import { findSidecarCommentStackBefore } from '@/utils/pageBreakAvoid';

const HAIM_TABLE_COMMENT_RE = /<!--\s*haim-table\s*([\s\S]*?)-->/g;

/** Escape `--` so JSON never prematurely closes an HTML comment. */
export function escapeHaimTableJsonForComment(json: string): string {
  return String(json).replace(/--/g, '\\u002d\\u002d');
}

export function unescapeHaimTableJsonFromComment(raw: string): string {
  return String(raw).replace(/\\u002d\\u002d/g, '--');
}

function isPipeTableLine(line: string): boolean {
  const t = line.trim();
  if (!t.includes('|')) return false;
  // separator or data row
  return true;
}

function isSeparatorLine(line: string): boolean {
  const t = line.trim();
  if (!t.includes('|') && !t.includes('-')) return false;
  // Remove outer pipes and spaces
  const inner = t.replace(/^\|/, '').replace(/\|$/, '');
  const cells = inner.split('|');
  if (cells.length === 0) return false;
  // GFM prefers --- but md-editor-rt also accepts a single "-".
  return cells.every((c) => /^\s*:?-+:?\s*$/.test(c) && c.includes('-'));
}

function splitPipeRow(line: string): string[] {
  let t = line.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|')) t = t.slice(0, -1);
  return t.split('|').map((c) => c.trim());
}

function parseAligns(sepLine: string): Array<'left' | 'center' | 'right' | null> {
  return splitPipeRow(sepLine).map((cell) => {
    const left = cell.startsWith(':');
    const right = cell.endsWith(':');
    if (left && right) return 'center';
    if (right) return 'right';
    if (left) return 'left';
    return null;
  });
}

/**
 * Find a GFM pipe table starting at line index `from` in `lines`.
 * Returns inclusive line range [start, end] or null.
 */
export function findGfmTableLineRange(
  lines: string[],
  from = 0,
): { start: number; end: number } | null {
  for (let i = from; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    if (!isPipeTableLine(line)) continue;
    // Need a separator on next line (standard GFM)
    const next = lines[i + 1];
    if (next == null || !isSeparatorLine(next)) continue;
    let end = i + 1;
    while (end + 1 < lines.length && isPipeTableLine(lines[end + 1] ?? '') && !isSeparatorLine(lines[end + 1] ?? '')) {
      // allow continuation rows; stop on blank
      const cand = lines[end + 1] ?? '';
      if (!cand.trim()) break;
      if (!isPipeTableLine(cand)) break;
      end += 1;
    }
    // Also consume body rows that look like pipe rows
    while (end + 1 < lines.length) {
      const cand = lines[end + 1] ?? '';
      if (!cand.trim()) break;
      if (!isPipeTableLine(cand) || isSeparatorLine(cand)) break;
      end += 1;
    }
    return { start: i, end };
  }
  return null;
}

export function parseGfmTable(text: string): HaimTableGrid | null {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const range = findGfmTableLineRange(lines, 0);
  if (!range || range.start !== 0) {
    // Allow leading blank? require table at start of snippet
    const trimmedStart = lines.findIndex((l) => l.trim());
    if (trimmedStart < 0) return null;
    const r2 = findGfmTableLineRange(lines, trimmedStart);
    if (!r2 || r2.start !== trimmedStart) return null;
    return parseGfmTableLines(lines.slice(r2.start, r2.end + 1));
  }
  return parseGfmTableLines(lines.slice(range.start, range.end + 1));
}

function parseGfmTableLines(tableLines: string[]): HaimTableGrid | null {
  if (tableLines.length < 2) return null;
  const header = splitPipeRow(tableLines[0] ?? '');
  const sep = tableLines[1] ?? '';
  if (!isSeparatorLine(sep)) return null;
  const aligns = parseAligns(sep);
  const colCount = Math.max(header.length, aligns.length);
  const rows: string[][] = [padRow(header, colCount)];
  for (let i = 2; i < tableLines.length; i += 1) {
    rows.push(padRow(splitPipeRow(tableLines[i] ?? ''), colCount));
  }
  while (aligns.length < colCount) aligns.push(null);
  return { rows, aligns: aligns.slice(0, colCount) };
}

function padRow(cells: string[], colCount: number): string[] {
  const out = cells.slice(0, colCount);
  while (out.length < colCount) out.push('');
  return out;
}

export function serializeGfmTable(grid: HaimTableGrid): string {
  const colCount = Math.max(
    grid.aligns.length,
    ...grid.rows.map((r) => r.length),
    1,
  );
  const aligns = [...grid.aligns];
  while (aligns.length < colCount) aligns.push(null);

  const fmt = (cells: string[]) => {
    const padded = padRow(cells, colCount);
    return `| ${padded.join(' | ')} |`;
  };

  const sepCells = aligns.map((a) => {
    if (a === 'center') return ':---:';
    if (a === 'right') return '---:';
    if (a === 'left') return ':---';
    return '---';
  });

  const lines = [
    fmt(grid.rows[0] ?? Array(colCount).fill('')),
    `| ${sepCells.join(' | ')} |`,
    ...grid.rows.slice(1).map((r) => fmt(r)),
  ];
  return lines.join('\n');
}

function normalizeSections(raw: unknown): HaimTableSections {
  if (!raw || typeof raw !== 'object') return {};
  const o = raw as Record<string, unknown>;
  const out: HaimTableSections = {};
  for (const key of ['thead', 'tbody', 'tfoot'] as HaimTableSectionKey[]) {
    if (o[key]) {
      const s = normalizeHaimTableStyle(o[key]);
      if (!isEmptyStyle(s)) out[key] = s;
    }
  }
  return out;
}

function normalizeCells(raw: unknown): HaimTableCells {
  if (!raw || typeof raw !== 'object') return {};
  const o = raw as Record<string, unknown>;
  const out: HaimTableCells = {};
  for (const [k, v] of Object.entries(o)) {
    if (!/^\d+,\d+$/.test(k)) continue;
    const s = normalizeHaimTableStyle(v);
    if (!isEmptyStyle(s)) out[k] = s;
  }
  return out;
}

export function normalizeHaimTableMeta(raw: unknown): HaimTableMeta | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const base = createDefaultHaimTableMeta();
  let headerRows = base.headerRows;
  let footerRows = base.footerRows;
  if (typeof o.headerRows === 'number' && Number.isInteger(o.headerRows) && o.headerRows >= 0) {
    headerRows = o.headerRows;
  }
  if (typeof o.footerRows === 'number' && Number.isInteger(o.footerRows) && o.footerRows >= 0) {
    footerRows = o.footerRows;
  }
  const noHeaderRaw = o.noHeader ?? o.no_header;
  const noHeader = noHeaderRaw === true || noHeaderRaw === 1 || noHeaderRaw === 'true';
  const meta: HaimTableMeta = {
    v: 1,
    headerRows,
    footerRows,
    width: normalizeHaimTableWidth(o.width ?? o.layout),
    align: normalizeHaimTableAlign(o.align),
    merges: normalizeMerges(o.merges),
    style: normalizeHaimTableStyle(o.style ?? o.tableStyle),
    sections: normalizeSections(o.sections),
    cells: normalizeCells(o.cells),
  };
  if (noHeader) meta.noHeader = true;
  const boxWidth = normalizeHaimTableBoxSize(o.boxWidth ?? o.box_width);
  const boxHeight = normalizeHaimTableBoxSize(o.boxHeight ?? o.box_height);
  if (boxWidth) meta.boxWidth = boxWidth;
  if (boxHeight) meta.boxHeight = boxHeight;
  const colWidths = normalizeHaimTableSizeList(o.colWidths ?? o.col_widths);
  const rowHeights = normalizeHaimTableSizeList(o.rowHeights ?? o.row_heights);
  if (colWidths) meta.colWidths = colWidths;
  if (rowHeights) meta.rowHeights = rowHeights;
  if (typeof o.templateId === 'string' && o.templateId.trim()) {
    meta.templateId = o.templateId.trim();
  }
  if (o.templateOverrides && typeof o.templateOverrides === 'object') {
    const ov = normalizeHaimTableMeta(o.templateOverrides);
    if (ov) {
      const partial: Partial<HaimTableMeta> = {
        headerRows: ov.headerRows,
        footerRows: ov.footerRows,
        width: ov.width,
        align: ov.align,
        merges: ov.merges,
        style: ov.style,
        sections: ov.sections,
        cells: ov.cells,
      };
      if (ov.noHeader) partial.noHeader = true;
      if (ov.boxWidth) partial.boxWidth = ov.boxWidth;
      if (ov.boxHeight) partial.boxHeight = ov.boxHeight;
      if (ov.colWidths) partial.colWidths = ov.colWidths;
      if (ov.rowHeights) partial.rowHeights = ov.rowHeights;
      meta.templateOverrides = partial;
    }
  }
  return meta;
}

export function parseHaimTableCommentPayload(raw: string): HaimTableMeta | null {
  const unescaped = unescapeHaimTableJsonFromComment(raw.trim());
  try {
    return normalizeHaimTableMeta(JSON.parse(unescaped));
  } catch {
    return null;
  }
}

export function serializeHaimTableComment(meta: HaimTableMeta): string {
  const payload: Record<string, unknown> = {
    v: 1,
    headerRows: meta.headerRows,
    footerRows: meta.footerRows,
    width: meta.width,
    align: meta.align,
  };
  if (meta.noHeader) payload.noHeader = true;
  if (meta.merges.length) payload.merges = meta.merges;
  if (meta.boxWidth) payload.boxWidth = meta.boxWidth;
  if (meta.boxHeight) payload.boxHeight = meta.boxHeight;
  const colWidths = serializeSizeList(meta.colWidths);
  const rowHeights = serializeSizeList(meta.rowHeights);
  if (colWidths) payload.colWidths = colWidths;
  if (rowHeights) payload.rowHeights = rowHeights;
  if (meta.style && Object.keys(meta.style).length && !isEmptyStyle(meta.style)) {
    payload.style = meta.style;
  }
  if (Object.keys(meta.sections).length) payload.sections = meta.sections;
  if (Object.keys(meta.cells).length) payload.cells = meta.cells;
  if (meta.templateId) payload.templateId = meta.templateId;
  if (meta.templateOverrides && Object.keys(meta.templateOverrides).length) {
    payload.templateOverrides = meta.templateOverrides;
  }
  const json = JSON.stringify(payload);
  return `<!-- haim-table\n${escapeHaimTableJsonForComment(json)}\n-->`;
}

function lineOffsets(text: string): number[] {
  const offsets = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') offsets.push(i + 1);
  }
  return offsets;
}

function exclusiveEndAfterLine(offsets: number[], textLen: number, lastLineIndex: number): number {
  if (lastLineIndex + 1 < offsets.length) return offsets[lastLineIndex + 1] ?? textLen;
  return textLen;
}

/**
 * Find all haim-table blocks (comment + following GFM table) and plain GFM tables.
 * When `onlyWithComment` is true, skip tables without a preceding haim-table comment.
 * Block `end` is exclusive and includes a trailing newline after the table when present.
 */
export function findHaimTableBlocks(
  markdown: string,
  opts?: { onlyWithComment?: boolean },
): HaimTableBlock[] {
  const text = markdown.replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const offsets = lineOffsets(text);
  const blocks: HaimTableBlock[] = [];
  const consumed = new Set<number>();

  const re = new RegExp(HAIM_TABLE_COMMENT_RE.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const commentStart = m.index;
    const commentEnd = m.index + m[0].length;
    const meta = parseHaimTableCommentPayload(m[1] ?? '');

    let searchFrom = 0;
    while (searchFrom < lines.length && (offsets[searchFrom] ?? 0) < commentEnd) {
      searchFrom += 1;
    }
    while (searchFrom < lines.length) {
      const line = (lines[searchFrom] ?? '').trim();
      if (!line) {
        searchFrom += 1;
        continue;
      }
      // Allow stacked sidecars between haim-table comment and GFM table.
      if (/^<!--\s*page-break-avoid\s*-->$/i.test(line)) {
        searchFrom += 1;
        continue;
      }
      break;
    }

    const range = findGfmTableLineRange(lines, searchFrom);
    if (!range || range.start !== searchFrom) continue;

    const grid = parseGfmTableLines(lines.slice(range.start, range.end + 1));
    if (!grid) continue;

    const tableStart = offsets[range.start] ?? 0;
    const tableEnd = exclusiveEndAfterLine(offsets, text.length, range.end);
    const rawTable = lines.slice(range.start, range.end + 1).join('\n');

    for (let li = range.start; li <= range.end; li += 1) consumed.add(li);

    blocks.push({
      start: commentStart,
      end: tableEnd,
      commentStart,
      commentEnd,
      tableStart,
      tableEnd,
      meta: meta ?? createDefaultHaimTableMeta(),
      grid,
      rawComment: m[0],
      rawTable,
    });
  }

  if (!opts?.onlyWithComment) {
    let from = 0;
    while (from < lines.length) {
      const range = findGfmTableLineRange(lines, from);
      if (!range) break;
      let already = false;
      for (let li = range.start; li <= range.end; li += 1) {
        if (consumed.has(li)) {
          already = true;
          break;
        }
      }
      if (already) {
        from = range.end + 1;
        continue;
      }
      const grid = parseGfmTableLines(lines.slice(range.start, range.end + 1));
      if (!grid) {
        from = range.end + 1;
        continue;
      }
      const tableStart = offsets[range.start] ?? 0;
      const tableEnd = exclusiveEndAfterLine(offsets, text.length, range.end);
      const rawTable = lines.slice(range.start, range.end + 1).join('\n');
      for (let li = range.start; li <= range.end; li += 1) consumed.add(li);
      blocks.push({
        start: tableStart,
        end: tableEnd,
        commentStart: null,
        commentEnd: null,
        tableStart,
        tableEnd,
        meta: null,
        grid,
        rawComment: null,
        rawTable,
      });
      from = range.end + 1;
    }
  }

  blocks.sort((a, b) => a.start - b.start);
  return blocks;
}

/** Find block containing absolute offset (or overlapping selection). */
export function findHaimTableBlockAt(
  markdown: string,
  from: number,
  to = from,
): HaimTableBlock | null {
  const blocks = findHaimTableBlocks(markdown);
  const a = Math.min(from, to);
  const b = Math.max(from, to);
  for (const block of blocks) {
    if (block.end > a && block.start < b) return block;
    if (a >= block.start && a <= block.end) return block;
  }
  // Cursor at end of block
  for (const block of blocks) {
    if (a >= block.start && a <= block.end) return block;
  }
  return null;
}

export function upsertHaimTableBlock(
  markdown: string,
  block: HaimTableBlock,
  meta: HaimTableMeta,
  grid: HaimTableGrid,
): string {
  const text = markdown.replace(/\r\n/g, '\n');
  const comment = serializeHaimTableComment(meta);
  const table = serializeGfmTable(grid);
  const { stackStart, comments } = findSidecarCommentStackBefore(text, block.tableStart);
  const others = comments
    .map((c) => c.raw.trim())
    .filter((c) => c && !/^<!--\s*haim-table\b/i.test(c));
  const replacement = [...others, comment, table].join('\n');
  return `${text.slice(0, stackStart)}${replacement}${text.slice(block.tableEnd)}`;
}

/** Remove a haim / GFM table block (comment + table) from markdown. */
export function deleteHaimTableBlock(markdown: string, block: HaimTableBlock): string {
  const text = markdown.replace(/\r\n/g, '\n');
  const fresh =
    findHaimTableBlockAt(text, block.start, Math.min(block.start + 1, block.end)) ?? block;
  let start = fresh.start;
  let end = fresh.end;
  // Prefer dropping one blank line gap left behind the table.
  if (text[end] === '\n' && text[end + 1] === '\n') end += 1;
  else if (start > 0 && text[start - 1] === '\n' && text[end] === '\n') {
    // keep a single newline
  } else if (start > 1 && text[start - 1] === '\n' && text[start - 2] === '\n') {
    start -= 1;
  }
  return `${text.slice(0, start)}${text.slice(end)}`;
}

export { sectionForRow, effectiveHeaderRows } from '@/utils/haimTable/sections';

export function setCellStyle(
  meta: HaimTableMeta,
  r: number,
  c: number,
  style: HaimTableStyle,
): HaimTableMeta {
  const cells = { ...meta.cells };
  const key = cellKey(r, c);
  if (isEmptyStyle(style)) delete cells[key];
  else cells[key] = style;
  return { ...meta, cells };
}
