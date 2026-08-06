import { findHaimTableBlocks } from '@/utils/haimTable/parse';
import type { HaimTableBlock } from '@/utils/haimTable/types';

/**
 * Map a preview DOM `table` to its markdown `HaimTableBlock`
 * (same indexing as box-resize / table edit).
 */
export function resolveHaimTableBlockFromPreview(
  markdown: string,
  tableEl: HTMLTableElement,
  previewRoot: Element,
): HaimTableBlock | null {
  const blocks = findHaimTableBlocks(markdown);
  if (!blocks.length) return null;

  const tables = [...previewRoot.querySelectorAll('table')];
  const index = tables.indexOf(tableEl);
  let block = index >= 0 ? blocks[index] : undefined;

  if (!block) {
    const haimTables = tables.filter((t) => t.getAttribute('data-haim-table') === '1');
    const haimIdx = haimTables.indexOf(tableEl);
    if (haimIdx >= 0) {
      const withMeta = blocks.filter((b) => b.meta != null);
      block = withMeta[haimIdx];
    }
  }
  if (!block && blocks.length === 1) block = blocks[0];
  return block ?? null;
}
