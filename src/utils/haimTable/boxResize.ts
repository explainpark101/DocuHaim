import {
  createDefaultHaimTableMeta,
  type HaimTableMeta,
} from '@/utils/haimTable/types';
import { findHaimTableBlocks, upsertHaimTableBlock } from '@/utils/haimTable/parse';

/**
 * Persist pixel box size for the table at `tableIndex` among preview `table` nodes
 * (same indexing as `useHaimTableEdit.openPreviewTable`).
 */
export function updateHaimTableBoxSizeInMarkdown(
  markdown: string,
  opts: {
    tableIndex: number;
    widthPx: number;
    heightPx: number;
  },
): { markdown: string; updated: boolean } {
  const blocks = findHaimTableBlocks(markdown);
  const block = blocks[opts.tableIndex];
  if (!block) return { markdown, updated: false };

  const widthPx = Math.max(48, Math.round(opts.widthPx));
  const heightPx = Math.max(32, Math.round(opts.heightPx));
  const base = block.meta ?? createDefaultHaimTableMeta();
  const meta: HaimTableMeta = {
    ...base,
    width: 'fit',
    boxWidth: `${widthPx}px`,
    boxHeight: `${heightPx}px`,
  };
  const next = upsertHaimTableBlock(markdown, block, meta, block.grid);
  return { markdown: next, updated: next !== markdown };
}

/** Index of `tableEl` among all `table` elements under `previewRoot`. */
export function indexOfPreviewTable(
  tableEl: HTMLTableElement,
  previewRoot: Element,
): number {
  const tables = [...previewRoot.querySelectorAll('table')];
  return tables.indexOf(tableEl);
}
