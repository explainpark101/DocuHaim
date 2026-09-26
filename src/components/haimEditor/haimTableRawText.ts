import {
  createDefaultHaimTableMeta,
  findHaimTableBlocks,
  serializeGfmTable,
  serializeHaimTableComment,
  type HaimTableGrid,
  type HaimTableMeta,
} from '@/utils/haimTable';

/**
 * Parse a rawMarkdownBlock `text` (haim-table comment + GFM) into meta + grid.
 */
export function parseHaimTableRawText(
  text: string,
): { meta: HaimTableMeta; grid: HaimTableGrid } | null {
  const blocks = findHaimTableBlocks(String(text || ''));
  const block = blocks[0];
  if (!block) return null;
  return {
    meta: block.meta ?? createDefaultHaimTableMeta(),
    grid: block.grid,
  };
}

/** Serialize meta + grid back to the opaque raw block text. */
export function serializeHaimTableRawText(
  meta: HaimTableMeta,
  grid: HaimTableGrid,
): string {
  return `${serializeHaimTableComment(meta)}\n${serializeGfmTable(grid)}`;
}

/** Default empty 3×3 haim-table for new inserts. */
export function createEmptyHaimTableRaw(): {
  meta: HaimTableMeta;
  grid: HaimTableGrid;
  text: string;
} {
  const meta = createDefaultHaimTableMeta();
  const grid: HaimTableGrid = {
    rows: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    aligns: [null, null, null],
  };
  return { meta, grid, text: serializeHaimTableRawText(meta, grid) };
}
