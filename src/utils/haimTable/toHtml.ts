import type { HaimTableGrid, HaimTableMeta, HaimTableTemplate } from '@/utils/haimTable/types';
import { coveredCellSet, mergeAt } from '@/utils/haimTable/merge';
import { findHaimTableBlocks } from '@/utils/haimTable/parse';
import { resolveCellStyle } from '@/utils/haimTable/styleResolve';
import { styleToCss } from '@/utils/haimTable/styleNormalize';
import { tableLayoutCss } from '@/utils/haimTable/layout';
import { appendGridSizeCss, sizeAt } from '@/utils/haimTable/gridSize';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function alignAttr(align: 'left' | 'center' | 'right' | null | undefined): string {
  if (!align) return '';
  return ` align="${align}"`;
}

/**
 * Convert a haim-table grid+meta to canonical HTML table string.
 */
export function haimTableToHtml(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  template?: HaimTableTemplate | null,
): string {
  const rowCount = grid.rows.length;
  const colCount = Math.max(1, ...grid.rows.map((r) => r.length), grid.aligns.length);
  const covered = coveredCellSet(meta.merges);
  const headerRows = Math.min(Math.max(0, meta.headerRows), rowCount);
  const footerRows = Math.min(Math.max(0, meta.footerRows), Math.max(0, rowCount - headerRows));
  const bodyStart = headerRows;
  const bodyEnd = rowCount - footerRows;

  const renderRow = (r: number, tag: 'th' | 'td'): string => {
    const cells: string[] = [];
    for (let c = 0; c < colCount; c += 1) {
      if (covered.has(`${r},${c}`)) continue;
      const merge = mergeAt(meta.merges, r, c);
      const colspan = merge?.colspan ?? 1;
      const rowspan = merge?.rowspan ?? 1;
      const styleArgs: {
        row: number;
        col: number;
        rowCount: number;
        colCount: number;
        meta: HaimTableMeta;
        template?: HaimTableTemplate | null;
      } = {
        row: r,
        col: c,
        rowCount,
        colCount,
        meta,
      };
      if (template !== undefined) styleArgs.template = template;
      const style = resolveCellStyle(styleArgs);
      let css = styleToCss(style);
      const colW = sizeAt(meta.colWidths, c);
      if (colW) css = appendGridSizeCss(css, `width:${colW}`);
      const rowH = sizeAt(meta.rowHeights, r);
      if (rowH) css = appendGridSizeCss(css, `height:${rowH}`);
      const align = grid.aligns[c] ?? null;
      const text = escapeHtml(grid.rows[r]?.[c] ?? '');
      const attrs = [
        colspan > 1 ? ` colspan="${colspan}"` : '',
        rowspan > 1 ? ` rowspan="${rowspan}"` : '',
        alignAttr(align),
        css ? ` style="${css}"` : '',
        ` data-haim-r="${r}"`,
        ` data-haim-c="${c}"`,
      ].join('');
      cells.push(`<${tag}${attrs}>${text}</${tag}>`);
    }
    const rowH = sizeAt(meta.rowHeights, r);
    const trStyle = rowH ? ` style="height:${rowH}"` : '';
    return `<tr${trStyle}>${cells.join('')}</tr>`;
  };

  const parts: string[] = [];
  const layoutCss = tableLayoutCss(meta);
  const tableAttrs = [
    ' data-haim-table="1"',
    ` data-haim-width="${meta.width}"`,
    meta.width === 'fit' || meta.boxWidth ? ` data-haim-align="${meta.align}"` : '',
    meta.boxWidth ? ` data-haim-box-w="${escapeHtml(meta.boxWidth)}"` : '',
    meta.boxHeight ? ` data-haim-box-h="${escapeHtml(meta.boxHeight)}"` : '',
    layoutCss ? ` style="${layoutCss}"` : '',
  ].join('');
  parts.push(`<table${tableAttrs}>`);

  if (headerRows > 0) {
    const sectionCss = styleToCss(meta.sections.thead ?? {}, { includeOuterBorder: true });
    parts.push(`<thead${sectionCss ? ` style="${sectionCss}"` : ''}>`);
    for (let r = 0; r < headerRows; r += 1) parts.push(renderRow(r, 'th'));
    parts.push('</thead>');
  }

  if (bodyEnd > bodyStart) {
    const sectionCss = styleToCss(meta.sections.tbody ?? {}, { includeOuterBorder: true });
    parts.push(`<tbody${sectionCss ? ` style="${sectionCss}"` : ''}>`);
    for (let r = bodyStart; r < bodyEnd; r += 1) parts.push(renderRow(r, 'td'));
    parts.push('</tbody>');
  }

  if (footerRows > 0) {
    const sectionCss = styleToCss(meta.sections.tfoot ?? {}, { includeOuterBorder: true });
    parts.push(`<tfoot${sectionCss ? ` style="${sectionCss}"` : ''}>`);
    for (let r = bodyEnd; r < rowCount; r += 1) parts.push(renderRow(r, 'td'));
    parts.push('</tfoot>');
  }

  parts.push('</table>');
  return parts.join('');
}

/**
 * Replace all haim-table comment+GFM blocks with HTML tables.
 * Plain GFM tables without comment are left unchanged.
 */
export function convertHaimTablesToHtmlInMarkdown(
  markdown: string,
  getTemplate?: (id: string) => HaimTableTemplate | null | undefined,
): string {
  const text = markdown.replace(/\r\n/g, '\n');
  const blocks = findHaimTableBlocks(text, { onlyWithComment: true });
  if (!blocks.length) return text;

  let out = '';
  let cursor = 0;
  for (const block of blocks) {
    out += text.slice(cursor, block.start);
    const meta = block.meta!;
    const template =
      meta.templateId && getTemplate ? getTemplate(meta.templateId) ?? null : null;
    out += haimTableToHtml(block.grid, meta, template);
    cursor = block.end;
    // Avoid double newline collapse issues: if end included trailing newline of last table line
  }
  out += text.slice(cursor);
  return out;
}
