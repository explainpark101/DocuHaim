import type {
  HaimTableCells,
  HaimTableGrid,
  HaimTableMerge,
  HaimTableMeta,
} from '@/utils/haimTable/types';
import { cellKey, parseCellKey } from '@/utils/haimTable/types';
import { insertSizeSlot, removeSizeSlot } from '@/utils/haimTable/gridSize';

function remapCellsForRowInsert(cells: HaimTableCells, index: number): HaimTableCells {
  const next: HaimTableCells = {};
  for (const [key, style] of Object.entries(cells)) {
    const parsed = parseCellKey(key);
    if (!parsed) continue;
    const r = parsed.r >= index ? parsed.r + 1 : parsed.r;
    next[cellKey(r, parsed.c)] = style;
  }
  return next;
}

function remapCellsForColInsert(cells: HaimTableCells, index: number): HaimTableCells {
  const next: HaimTableCells = {};
  for (const [key, style] of Object.entries(cells)) {
    const parsed = parseCellKey(key);
    if (!parsed) continue;
    const c = parsed.c >= index ? parsed.c + 1 : parsed.c;
    next[cellKey(parsed.r, c)] = style;
  }
  return next;
}

function remapCellsForRowDelete(cells: HaimTableCells, index: number): HaimTableCells {
  const next: HaimTableCells = {};
  for (const [key, style] of Object.entries(cells)) {
    const parsed = parseCellKey(key);
    if (!parsed) continue;
    if (parsed.r === index) continue;
    const r = parsed.r > index ? parsed.r - 1 : parsed.r;
    next[cellKey(r, parsed.c)] = style;
  }
  return next;
}

function remapCellsForColDelete(cells: HaimTableCells, index: number): HaimTableCells {
  const next: HaimTableCells = {};
  for (const [key, style] of Object.entries(cells)) {
    const parsed = parseCellKey(key);
    if (!parsed) continue;
    if (parsed.c === index) continue;
    const c = parsed.c > index ? parsed.c - 1 : parsed.c;
    next[cellKey(parsed.r, c)] = style;
  }
  return next;
}

function remapMergesForRowInsert(merges: HaimTableMerge[], index: number): HaimTableMerge[] {
  return merges.map((m) => {
    if (m.r >= index) return { ...m, r: m.r + 1 };
    if (m.r + m.rowspan > index) return { ...m, rowspan: m.rowspan + 1 };
    return m;
  });
}

function remapMergesForColInsert(merges: HaimTableMerge[], index: number): HaimTableMerge[] {
  return merges.map((m) => {
    if (m.c >= index) return { ...m, c: m.c + 1 };
    if (m.c + m.colspan > index) return { ...m, colspan: m.colspan + 1 };
    return m;
  });
}

function normalizeMergeAfterEdit(m: HaimTableMerge): HaimTableMerge | null {
  if (m.rowspan < 1 || m.colspan < 1) return null;
  if (m.rowspan === 1 && m.colspan === 1) return null;
  return m;
}

function remapMergesForRowDelete(merges: HaimTableMerge[], index: number): HaimTableMerge[] {
  const out: HaimTableMerge[] = [];
  for (const m of merges) {
    if (m.r > index) {
      const next = normalizeMergeAfterEdit({ ...m, r: m.r - 1 });
      if (next) out.push(next);
      continue;
    }
    if (m.r === index) {
      if (m.rowspan <= 1) continue;
      const next = normalizeMergeAfterEdit({ ...m, rowspan: m.rowspan - 1 });
      if (next) out.push(next);
      continue;
    }
    if (m.r < index && m.r + m.rowspan > index) {
      const next = normalizeMergeAfterEdit({ ...m, rowspan: m.rowspan - 1 });
      if (next) out.push(next);
      continue;
    }
    out.push(m);
  }
  return out;
}

function remapMergesForColDelete(merges: HaimTableMerge[], index: number): HaimTableMerge[] {
  const out: HaimTableMerge[] = [];
  for (const m of merges) {
    if (m.c > index) {
      const next = normalizeMergeAfterEdit({ ...m, c: m.c - 1 });
      if (next) out.push(next);
      continue;
    }
    if (m.c === index) {
      if (m.colspan <= 1) continue;
      const next = normalizeMergeAfterEdit({ ...m, colspan: m.colspan - 1 });
      if (next) out.push(next);
      continue;
    }
    if (m.c < index && m.c + m.colspan > index) {
      const next = normalizeMergeAfterEdit({ ...m, colspan: m.colspan - 1 });
      if (next) out.push(next);
      continue;
    }
    out.push(m);
  }
  return out;
}

/**
 * When the merge origin row is deleted but the merge still spans later rows,
 * move origin text (and cell style) to the next row so content survives.
 * Call before splicing the row out; destination is still at old `index + 1`.
 */
function relocateMergeOriginForRowDelete(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  index: number,
): GridMetaPair {
  const targets = meta.merges.filter((m) => m.r === index && m.rowspan > 1);
  if (targets.length === 0) return { grid, meta };

  const rows = grid.rows.map((row) => [...row]);
  const cells: HaimTableCells = { ...meta.cells };
  const destR = index + 1;

  for (const m of targets) {
    const originRow = rows[index];
    const destRow = rows[destR];
    if (!originRow || !destRow) continue;

    while (destRow.length <= m.c) destRow.push('');
    while (originRow.length <= m.c) originRow.push('');

    const text = originRow[m.c] ?? '';
    if (text) {
      destRow[m.c] = text;
      originRow[m.c] = '';
    }

    const fromKey = cellKey(index, m.c);
    const toKey = cellKey(destR, m.c);
    const originStyle = cells[fromKey];
    if (originStyle) {
      cells[toKey] = { ...originStyle };
      delete cells[fromKey];
    }
  }

  return {
    grid: { rows, aligns: [...grid.aligns] },
    meta: { ...meta, cells },
  };
}

/**
 * When the merge origin column is deleted but the merge still spans later cols,
 * move origin text (and cell style) to the next column.
 */
function relocateMergeOriginForColDelete(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  index: number,
): GridMetaPair {
  const targets = meta.merges.filter((m) => m.c === index && m.colspan > 1);
  if (targets.length === 0) return { grid, meta };

  const rows = grid.rows.map((row) => [...row]);
  const cells: HaimTableCells = { ...meta.cells };

  for (const m of targets) {
    const row = rows[m.r];
    if (!row) continue;

    while (row.length <= m.c + 1) row.push('');

    const text = row[m.c] ?? '';
    if (text) {
      row[m.c + 1] = text;
      row[m.c] = '';
    }

    const fromKey = cellKey(m.r, index);
    const toKey = cellKey(m.r, index + 1);
    const originStyle = cells[fromKey];
    if (originStyle) {
      cells[toKey] = { ...originStyle };
      delete cells[fromKey];
    }
  }

  return {
    grid: { rows, aligns: [...grid.aligns] },
    meta: { ...meta, cells },
  };
}

export type GridMetaPair = {
  grid: HaimTableGrid;
  meta: HaimTableMeta;
};

/**
 * Insert an empty row at `index` (0 = before first row, rowCount = after last).
 * Updates merges, cell styles, and header/footer counts when inserting into those zones.
 */
export function insertRowAt(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  index: number,
): GridMetaPair {
  const colCount = Math.max(1, ...grid.rows.map((r) => r.length), grid.aligns.length, 1);
  const rowCount = grid.rows.length;
  const at = Math.max(0, Math.min(index, rowCount));

  const empty = Array.from({ length: colCount }, () => '');
  const rows = [...grid.rows.slice(0, at), empty, ...grid.rows.slice(at)];

  let headerRows = meta.headerRows;
  let footerRows = meta.footerRows;
  if (at < headerRows) headerRows += 1;
  else if (footerRows > 0 && at >= rowCount - footerRows) footerRows += 1;

  return {
    grid: { rows, aligns: [...grid.aligns] },
    meta: (() => {
      const nextMeta: HaimTableMeta = {
        ...meta,
        headerRows,
        footerRows,
        merges: remapMergesForRowInsert(meta.merges, at),
        cells: remapCellsForRowInsert(meta.cells, at),
      };
      if (meta.rowHeights?.length) {
        const rowHeights = insertSizeSlot(meta.rowHeights, at);
        if (rowHeights) nextMeta.rowHeights = rowHeights;
      }
      return nextMeta;
    })(),
  };
}

/**
 * Insert an empty column at `index` (0 = before first col, colCount = after last).
 */
export function insertColAt(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  index: number,
): GridMetaPair {
  const colCount = Math.max(1, ...grid.rows.map((r) => r.length), grid.aligns.length, 1);
  const at = Math.max(0, Math.min(index, colCount));

  const rows = grid.rows.map((row) => {
    const next = [...row];
    while (next.length < colCount) next.push('');
    next.splice(at, 0, '');
    return next;
  });
  if (rows.length === 0) {
    rows.push(Array.from({ length: colCount + 1 }, () => ''));
  }

  const aligns = [...grid.aligns];
  while (aligns.length < colCount) aligns.push(null);
  aligns.splice(at, 0, null);

  return {
    grid: { rows, aligns },
    meta: (() => {
      const nextMeta: HaimTableMeta = {
        ...meta,
        merges: remapMergesForColInsert(meta.merges, at),
        cells: remapCellsForColInsert(meta.cells, at),
      };
      if (meta.colWidths?.length) {
        const colWidths = insertSizeSlot(meta.colWidths, at);
        if (colWidths) nextMeta.colWidths = colWidths;
      }
      return nextMeta;
    })(),
  };
}

/**
 * Delete a single row at `index`. Keeps at least one row.
 */
export function deleteRowAt(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  index: number,
): GridMetaPair {
  const rowCount = grid.rows.length;
  if (rowCount <= 1) return { grid, meta };
  if (index < 0 || index >= rowCount) return { grid, meta };

  const relocated = relocateMergeOriginForRowDelete(grid, meta, index);
  const rows = [
    ...relocated.grid.rows.slice(0, index),
    ...relocated.grid.rows.slice(index + 1),
  ];

  let headerRows = relocated.meta.headerRows;
  let footerRows = relocated.meta.footerRows;
  if (index < headerRows) headerRows = Math.max(0, headerRows - 1);
  else if (footerRows > 0 && index >= rowCount - footerRows) {
    footerRows = Math.max(0, footerRows - 1);
  }
  const nextRowCount = rows.length;
  if (headerRows + footerRows > nextRowCount) {
    footerRows = Math.max(0, nextRowCount - headerRows);
  }

  const nextMeta: HaimTableMeta = {
    ...relocated.meta,
    headerRows,
    footerRows,
    merges: remapMergesForRowDelete(relocated.meta.merges, index),
    cells: remapCellsForRowDelete(relocated.meta.cells, index),
  };
  if (relocated.meta.rowHeights?.length) {
    const rowHeights = removeSizeSlot(relocated.meta.rowHeights, index);
    if (rowHeights) nextMeta.rowHeights = rowHeights;
    else delete nextMeta.rowHeights;
  }

  return {
    grid: { rows, aligns: [...relocated.grid.aligns] },
    meta: nextMeta,
  };
}

/**
 * Delete a single column at `index`. Keeps at least one column.
 */
export function deleteColAt(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  index: number,
): GridMetaPair {
  const colCount = Math.max(1, ...grid.rows.map((r) => r.length), grid.aligns.length, 1);
  if (colCount <= 1) return { grid, meta };
  if (index < 0 || index >= colCount) return { grid, meta };

  const relocated = relocateMergeOriginForColDelete(grid, meta, index);

  const rows = relocated.grid.rows.map((row) => {
    const next = [...row];
    while (next.length < colCount) next.push('');
    next.splice(index, 1);
    return next;
  });

  const aligns = [...relocated.grid.aligns];
  while (aligns.length < colCount) aligns.push(null);
  aligns.splice(index, 1);

  const nextMeta: HaimTableMeta = {
    ...relocated.meta,
    merges: remapMergesForColDelete(relocated.meta.merges, index),
    cells: remapCellsForColDelete(relocated.meta.cells, index),
  };
  if (relocated.meta.colWidths?.length) {
    const colWidths = removeSizeSlot(relocated.meta.colWidths, index);
    if (colWidths) nextMeta.colWidths = colWidths;
    else delete nextMeta.colWidths;
  }

  return {
    grid: { rows, aligns },
    meta: nextMeta,
  };
}

/** Delete multiple rows (unique indices), highest first. Always leaves ≥1 row. */
export function deleteRowsAt(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  indices: number[],
): GridMetaPair {
  const unique = [...new Set(indices.filter((i) => Number.isInteger(i) && i >= 0))].sort(
    (a, b) => b - a,
  );
  let next = { grid, meta };
  for (const index of unique) {
    if (next.grid.rows.length <= 1) break;
    next = deleteRowAt(next.grid, next.meta, index);
  }
  return next;
}

/** Delete multiple columns (unique indices), highest first. Always leaves ≥1 column. */
export function deleteColsAt(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  indices: number[],
): GridMetaPair {
  const unique = [...new Set(indices.filter((i) => Number.isInteger(i) && i >= 0))].sort(
    (a, b) => b - a,
  );
  let next = { grid, meta };
  for (const index of unique) {
    const colCount = Math.max(
      1,
      ...next.grid.rows.map((r) => r.length),
      next.grid.aligns.length,
      1,
    );
    if (colCount <= 1) break;
    next = deleteColAt(next.grid, next.meta, index);
  }
  return next;
}
