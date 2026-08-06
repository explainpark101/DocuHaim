import {
  createDefaultHaimTableMeta,
  type HaimTableMeta,
  type HaimTableTemplate,
} from '@/utils/haimTable/types';
import { coveredCellSet, mergeAt } from '@/utils/haimTable/merge';
import { parseHaimTableCommentPayload } from '@/utils/haimTable/parse';
import { resolveCellStyle } from '@/utils/haimTable/styleResolve';
import { styleToCss } from '@/utils/haimTable/styleNormalize';
import { applyTableLayoutAttrs } from '@/utils/haimTable/layout';
import { appendGridSizeCss, sizeAt } from '@/utils/haimTable/gridSize';
import { getCachedTableStyleTemplate } from '@/utils/tableStyleSettingsStore';

const COMMENT_OPEN_RE = /^<!--\s*haim-table\b/;

type MdToken = {
  type: string;
  tag: string;
  content: string;
  hidden?: boolean;
  children?: MdToken[] | null;
  attrSet: (name: string, value: string) => void;
  attrGet: (name: string) => string | null;
};

type MdState = {
  tokens: MdToken[];
  Token: new (type: string, tag: string, nesting: number) => MdToken;
};

type MdLike = {
  core: {
    ruler: {
      after: (before: string, name: string, fn: (state: MdState) => void) => void;
    };
  };
};

function isHaimTableCommentToken(token: MdToken | undefined): boolean {
  if (!token) return false;
  if (token.type !== 'html_block' && token.type !== 'html_inline') return false;
  return COMMENT_OPEN_RE.test(String(token.content || '').trim());
}

function extractMetaFromComment(content: string): HaimTableMeta {
  const m = /<!--\s*haim-table\s*([\s\S]*?)-->/.exec(content);
  if (!m) return createDefaultHaimTableMeta();
  return parseHaimTableCommentPayload(m[1] ?? '') ?? createDefaultHaimTableMeta();
}

function findTableRange(
  tokens: MdToken[],
  from: number,
): { start: number; end: number } | null {
  for (let i = from; i < Math.min(tokens.length, from + 8); i += 1) {
    if (tokens[i]?.type === 'table_open') {
      for (let j = i + 1; j < tokens.length; j += 1) {
        if (tokens[j]?.type === 'table_close') return { start: i, end: j };
      }
      return null;
    }
    const t = tokens[i];
    if (!t) continue;
    if (t.type === 'paragraph_open' || t.type === 'paragraph_close') continue;
    if (t.type === 'inline' && !String(t.content || '').trim()) continue;
    if (t.type === 'html_block' || t.type === 'html_inline') continue;
    if (t.hidden) continue;
    // Unexpected token before table
    if (t.type !== 'table_open') return null;
  }
  return null;
}

type CellInfo = {
  openIdx: number;
  closeIdx: number;
  inlineIdx: number;
};

type RowInfo = {
  openIdx: number;
  closeIdx: number;
  cells: CellInfo[];
};

function collectRows(tokens: MdToken[], tableStart: number, tableEnd: number): RowInfo[] {
  const rows: RowInfo[] = [];
  let i = tableStart + 1;
  while (i < tableEnd) {
    const t = tokens[i];
    if (!t) break;
    if (t.type === 'tr_open') {
      const row: RowInfo = { openIdx: i, closeIdx: -1, cells: [] };
      i += 1;
      while (i < tableEnd) {
        const c = tokens[i];
        if (!c) break;
        if (c.type === 'tr_close') {
          row.closeIdx = i;
          i += 1;
          break;
        }
        if (c.type === 'th_open' || c.type === 'td_open') {
          const openIdx = i;
          let inlineIdx = -1;
          let closeIdx = -1;
          i += 1;
          while (i < tableEnd) {
            const x = tokens[i];
            if (!x) break;
            if (x.type === 'inline') inlineIdx = i;
            if (x.type === 'th_close' || x.type === 'td_close') {
              closeIdx = i;
              i += 1;
              break;
            }
            i += 1;
          }
          if (closeIdx >= 0) row.cells.push({ openIdx, closeIdx, inlineIdx });
          continue;
        }
        i += 1;
      }
      rows.push(row);
      continue;
    }
    i += 1;
  }
  return rows;
}

function applyOneTable(
  state: MdState,
  commentIdx: number,
  tableStart: number,
  tableEnd: number,
  meta: HaimTableMeta,
  template: HaimTableTemplate | null,
): void {
  const tokens = state.tokens;
  const rows = collectRows(tokens, tableStart, tableEnd);
  if (!rows.length) {
    // Still hide comment
    if (tokens[commentIdx]) {
      tokens[commentIdx]!.hidden = true;
      tokens[commentIdx]!.content = '';
    }
    return;
  }

  const rowCount = rows.length;
  const colCount = Math.max(1, ...rows.map((r) => r.cells.length));
  const covered = coveredCellSet(meta.merges);
  const headerRows = Math.min(Math.max(0, meta.headerRows), rowCount);
  const footerRows = Math.min(Math.max(0, meta.footerRows), Math.max(0, rowCount - headerRows));

  tokens[tableStart]?.attrSet('data-haim-table', '1');
  if (tokens[tableStart]) {
    applyTableLayoutAttrs(
      (name, value) => tokens[tableStart]!.attrSet(name, value),
      meta,
      tokens[tableStart].attrGet('style'),
    );
  }

  for (let r = 0; r < rows.length; r += 1) {
    const row = rows[r]!;
    for (let c = 0; c < row.cells.length; c += 1) {
      const cell = row.cells[c]!;
      const open = tokens[cell.openIdx];
      if (!open) continue;

      if (covered.has(`${r},${c}`)) {
        open.hidden = true;
        if (cell.inlineIdx >= 0 && tokens[cell.inlineIdx]) tokens[cell.inlineIdx]!.hidden = true;
        if (tokens[cell.closeIdx]) tokens[cell.closeIdx]!.hidden = true;
        continue;
      }

      const merge = mergeAt(meta.merges, r, c);
      if (merge) {
        if (merge.colspan > 1) open.attrSet('colspan', String(merge.colspan));
        if (merge.rowspan > 1) open.attrSet('rowspan', String(merge.rowspan));
      }

      const style = resolveCellStyle({
        row: r,
        col: c,
        rowCount,
        colCount,
        meta,
        template,
      });
      let css = styleToCss(style);
      const colW = sizeAt(meta.colWidths, c);
      if (colW) css = appendGridSizeCss(css, `width:${colW}`);
      const rowH = sizeAt(meta.rowHeights, r);
      if (rowH) css = appendGridSizeCss(css, `height:${rowH}`);
      if (css) open.attrSet('style', css);
      open.attrSet('data-haim-r', String(r));
      open.attrSet('data-haim-c', String(c));
    }
    const rowH = sizeAt(meta.rowHeights, r);
    if (rowH && tokens[row.openIdx]) {
      const tr = tokens[row.openIdx]!;
      tr.attrSet('style', appendGridSizeCss(tr.attrGet('style'), `height:${rowH}`));
    }
  }

  const head = rows.slice(0, headerRows);
  const body = rows.slice(headerRows, rowCount - footerRows);
  const foot = footerRows > 0 ? rows.slice(rowCount - footerRows) : [];

  for (const row of head) {
    for (const cell of row.cells) {
      const open = tokens[cell.openIdx];
      const close = tokens[cell.closeIdx];
      if (open) {
        open.tag = 'th';
        open.type = 'th_open';
      }
      if (close) {
        close.tag = 'th';
        close.type = 'th_close';
      }
    }
  }
  for (const row of [...body, ...foot]) {
    for (const cell of row.cells) {
      const open = tokens[cell.openIdx];
      const close = tokens[cell.closeIdx];
      if (open) {
        open.tag = 'td';
        open.type = 'td_open';
      }
      if (close) {
        close.tag = 'td';
        close.type = 'td_close';
      }
    }
  }

  const newMiddle: MdToken[] = [];
  const pushSection = (section: 'thead' | 'tbody' | 'tfoot', rowSlice: RowInfo[]) => {
    if (!rowSlice.length) return;
    const open = new state.Token(`${section}_open`, section, 1);
    const css = styleToCss(meta.sections[section] ?? {}, { includeOuterBorder: true });
    if (css) open.attrSet('style', css);
    open.attrSet('data-haim-section', section);
    newMiddle.push(open);
    for (const row of rowSlice) {
      for (let idx = row.openIdx; idx <= row.closeIdx; idx += 1) {
        const tok = tokens[idx];
        if (tok) newMiddle.push(tok);
      }
    }
    newMiddle.push(new state.Token(`${section}_close`, section, -1));
  };

  pushSection('thead', head);
  pushSection('tbody', body);
  pushSection('tfoot', foot);

  const next = [
    ...tokens.slice(0, tableStart + 1),
    ...newMiddle,
    ...tokens.slice(tableEnd),
  ];

  // Hide comment (still before tableStart in next)
  if (commentIdx >= 0 && commentIdx < next.length && isHaimTableCommentToken(next[commentIdx])) {
    next[commentIdx]!.hidden = true;
    next[commentIdx]!.content = '';
  } else {
    for (const t of next) {
      if (isHaimTableCommentToken(t)) {
        t.hidden = true;
        t.content = '';
      }
    }
  }

  state.tokens.length = 0;
  state.tokens.push(...next);
}

export function haimTableMarkdownItPlugin(md: MdLike): void {
  md.core.ruler.after('block', 'haim_table', (state) => {
    // Process last pair repeatedly until none remain unprocessed.
    // Each apply rebuilds tokens and hides the comment.
    for (let guard = 0; guard < 50; guard += 1) {
      let found: {
        commentIdx: number;
        tableStart: number;
        tableEnd: number;
        meta: HaimTableMeta;
      } | null = null;

      for (let i = 0; i < state.tokens.length; i += 1) {
        const t = state.tokens[i];
        if (!t || !isHaimTableCommentToken(t) || t.hidden) continue;
        const meta = extractMetaFromComment(t.content);
        const range = findTableRange(state.tokens, i + 1);
        if (!range) continue;
        found = {
          commentIdx: i,
          tableStart: range.start,
          tableEnd: range.end,
          meta,
        };
        // keep scanning to take the last? Process first to keep indices simple
        break;
      }

      if (!found) break;

      const template = found.meta.templateId
        ? getCachedTableStyleTemplate(found.meta.templateId)
        : null;

      applyOneTable(
        state,
        found.commentIdx,
        found.tableStart,
        found.tableEnd,
        found.meta,
        template,
      );
    }
  });
}
