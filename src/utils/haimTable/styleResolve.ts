import type {
  HaimTableGrid,
  HaimTableMeta,
  HaimTableSectionKey,
  HaimTableStyle,
  HaimTableTemplate,
  HaimTableTemplateRule,
} from '@/utils/haimTable/types';
import { cellKey } from '@/utils/haimTable/types';
import { matchesNth } from '@/utils/haimTable/nthMatch';
import { sectionForRow, effectiveHeaderRows } from '@/utils/haimTable/sections';
import {
  mergeStyleOverwrite,
  mergeStylePreferExisting,
  normalizeHaimTableStyle,
} from '@/utils/haimTable/styleNormalize';

function ruleMatches(
  rule: HaimTableTemplateRule,
  row: number,
  col: number,
): boolean {
  const hasRows = rule.rows != null && String(rule.rows).trim() !== '';
  const hasCols = rule.cols != null && String(rule.cols).trim() !== '';
  if (!hasRows && !hasCols) return false;

  let rowOk = true;
  let colOk = true;
  if (hasRows) rowOk = matchesNth(String(rule.rows), row + 1);
  if (hasCols) colOk = matchesNth(String(rule.cols), col + 1);
  return rowOk && colOk;
}

/**
 * Resolve final style for one cell.
 * Priority (high → low): cell → section → table `style` → template nth rules → {}.
 */
export function resolveCellStyle(opts: {
  row: number;
  col: number;
  rowCount: number;
  colCount: number;
  meta: HaimTableMeta;
  template?: HaimTableTemplate | null;
}): HaimTableStyle {
  const { row, col, rowCount, colCount, meta, template } = opts;
  const section: HaimTableSectionKey = sectionForRow(
    row,
    rowCount,
    effectiveHeaderRows(meta, rowCount),
    meta.footerRows,
  );

  let style: HaimTableStyle = {};

  // Template nth rules: earlier wins (prefer-existing)
  if (template?.rules?.length) {
    for (const rule of template.rules) {
      if (!ruleMatches(rule, row, col)) continue;
      style = mergeStylePreferExisting(style, normalizeHaimTableStyle(rule));
    }
  }

  // Whole-table style (below section/cell)
  if (meta.style && Object.keys(meta.style).length) {
    style = mergeStyleOverwrite(style, normalizeHaimTableStyle(meta.style));
  }

  // Section: document meta beats template section
  if (meta.sections[section]) {
    style = mergeStyleOverwrite(style, meta.sections[section]!);
  } else if (template?.sections?.[section]) {
    style = mergeStyleOverwrite(style, template.sections[section]!);
  }

  // Cell override highest
  const cell = meta.cells[cellKey(row, col)];
  if (cell) {
    style = mergeStyleOverwrite(style, cell);
  }

  void colCount;
  return style;
}

/** Resolve styles for every cell in the grid. */
export function resolveGridStyles(
  grid: HaimTableGrid,
  meta: HaimTableMeta,
  template?: HaimTableTemplate | null,
): HaimTableStyle[][] {
  const rowCount = grid.rows.length;
  const colCount = Math.max(0, ...grid.rows.map((r) => r.length), grid.aligns.length);
  return grid.rows.map((_, r) =>
    Array.from({ length: colCount }, (__, c) => {
      const args: {
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
      if (template !== undefined) args.template = template;
      return resolveCellStyle(args);
    }),
  );
}

/**
 * Apply template sections into meta and set templateId.
 * Nth rules stay on the template and resolve at render via templateId.
 */
export function applyTemplateToMeta(
  meta: HaimTableMeta,
  template: HaimTableTemplate,
): HaimTableMeta {
  const sections = { ...meta.sections };
  if (template.sections) {
    for (const key of ['thead', 'tbody', 'tfoot'] as const) {
      if (template.sections[key]) {
        sections[key] = mergeStyleOverwrite(sections[key] ?? {}, template.sections[key]!);
      }
    }
  }
  return {
    ...meta,
    sections,
    templateId: template.id,
  };
}
