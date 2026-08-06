import type { HaimTableSectionKey } from '@/utils/haimTable/types';

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
