import type { HaimTableMeta, HaimTableSectionKey } from '@/utils/haimTable/types';

/** Header row count used for thead/tbody split (0 when `noHeader`). */
export function effectiveHeaderRows(
  meta: Pick<HaimTableMeta, 'headerRows' | 'noHeader'>,
  rowCount: number,
): number {
  if (meta.noHeader) return 0;
  return Math.min(Math.max(0, meta.headerRows), rowCount);
}

export function sectionForRow(
  rowIndex: number,
  rowCount: number,
  headerRows: number,
  footerRows: number,
): HaimTableSectionKey {
  const header = Math.min(Math.max(0, headerRows), rowCount);
  const footer = Math.min(Math.max(0, footerRows), Math.max(0, rowCount - header));
  if (rowIndex < header) return 'thead';
  if (rowIndex >= rowCount - footer && footer > 0) return 'tfoot';
  return 'tbody';
}
