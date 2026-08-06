import type { HaimTableAlign, HaimTableMeta, HaimTableWidth } from '@/utils/haimTable/types';

export function normalizeHaimTableWidth(raw: unknown): HaimTableWidth {
  if (raw === 'fit' || raw === 'min' || raw === 'auto') return 'fit';
  if (raw === 'full' || raw === '100%' || raw === 'page') return 'full';
  return 'full';
}

export function normalizeHaimTableAlign(raw: unknown): HaimTableAlign {
  if (raw === 'right') return 'right';
  return 'left';
}

const BOX_SIZE_RE = /^\d+(\.\d+)?(px|%|em|rem|pt)?$/i;

/** Normalize CSS length for table box width/height (bare digits → px). */
export function normalizeHaimTableBoxSize(raw: unknown): string | undefined {
  if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) {
    return `${Math.round(raw)}px`;
  }
  if (typeof raw !== 'string') return undefined;
  const s = raw.trim();
  if (!s) return undefined;
  if (/^\d+(\.\d+)?$/.test(s)) return `${s}px`;
  if (!BOX_SIZE_RE.test(s)) return undefined;
  return s;
}

export type HaimTableLayoutMeta = Pick<
  HaimTableMeta,
  'width' | 'align' | 'boxWidth' | 'boxHeight' | 'colWidths' | 'rowHeights'
>;

/** Inline CSS for the `<table>` element from width/align/box meta. */
export function tableLayoutCss(meta: HaimTableLayoutMeta): string {
  const parts: string[] = [];
  const hasBoxW = Boolean(meta.boxWidth);
  const hasBoxH = Boolean(meta.boxHeight);
  const hasGridSizes =
    Boolean(meta.colWidths?.some((s) => s && s.trim()))
    || Boolean(meta.rowHeights?.some((s) => s && s.trim()));

  if (hasBoxW) {
    parts.push(`width:${meta.boxWidth}`);
    parts.push('max-width:100%');
    parts.push('table-layout:fixed');
  } else if (meta.width === 'fit') {
    parts.push('width:auto');
    parts.push('max-width:100%');
  } else {
    parts.push('width:100%');
  }

  if (hasBoxH) {
    parts.push(`height:${meta.boxHeight}`);
    if (!hasBoxW) parts.push('table-layout:fixed');
  }

  if (hasGridSizes && !hasBoxW && !hasBoxH) {
    parts.push('table-layout:fixed');
  }

  if (hasBoxW || meta.width === 'fit') {
    if (meta.align === 'right') {
      parts.push('margin-left:auto');
      parts.push('margin-right:0');
    } else {
      parts.push('margin-left:0');
      parts.push('margin-right:auto');
    }
  }

  return parts.map((p) => (p.endsWith(';') ? p : `${p};`)).join('');
}

export function applyTableLayoutAttrs(
  attrSet: (name: string, value: string) => void,
  meta: HaimTableLayoutMeta,
  existingStyle?: string | null,
): void {
  attrSet('data-haim-width', meta.width);
  if (meta.width === 'fit' || meta.boxWidth) {
    attrSet('data-haim-align', meta.align);
  }
  if (meta.boxWidth) attrSet('data-haim-box-w', meta.boxWidth);
  if (meta.boxHeight) attrSet('data-haim-box-h', meta.boxHeight);

  const layout = tableLayoutCss(meta);
  const prev = (existingStyle || '').trim();
  if (prev && !prev.endsWith(';')) {
    attrSet('style', `${prev};${layout}`);
  } else {
    attrSet('style', `${prev}${layout}`);
  }
}

/** Apply live pixel box size onto a rendered table element (during drag). */
export function applyLiveTableBoxSize(
  table: HTMLTableElement,
  widthPx: number,
  heightPx: number,
): void {
  const w = Math.max(48, Math.round(widthPx));
  const h = Math.max(32, Math.round(heightPx));
  table.style.width = `${w}px`;
  table.style.height = `${h}px`;
  table.style.maxWidth = '100%';
  table.style.tableLayout = 'fixed';
  table.setAttribute('data-haim-box-w', `${w}px`);
  table.setAttribute('data-haim-box-h', `${h}px`);
}
