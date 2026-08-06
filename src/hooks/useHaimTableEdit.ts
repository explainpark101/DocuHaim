import { useCallback, useRef, useState } from 'react';
import {
  createDefaultHaimTableMeta,
  findHaimTableBlockAt,
  resolveHaimTableBlockFromPreview,
  upsertHaimTableBlock,
  type HaimTableBlock,
  type HaimTableGrid,
  type HaimTableMeta,
} from '@/utils/haimTable';

export type HaimTableEditState = {
  block: HaimTableBlock;
  meta: HaimTableMeta;
  grid: HaimTableGrid;
};

/**
 * Open / apply haim-table edit modal against a markdown string.
 */
export function useHaimTableEdit(opts: {
  getMarkdown: () => string;
  setMarkdown: (next: string) => void;
}) {
  const [editState, setEditState] = useState<HaimTableEditState | null>(null);
  const getMarkdownRef = useRef(opts.getMarkdown);
  const setMarkdownRef = useRef(opts.setMarkdown);
  getMarkdownRef.current = opts.getMarkdown;
  setMarkdownRef.current = opts.setMarkdown;

  const openAtOffset = useCallback((from: number, to = from) => {
    const md = getMarkdownRef.current();
    const block = findHaimTableBlockAt(md, from, to);
    if (!block) return false;
    setEditState({
      block,
      meta: block.meta ?? createDefaultHaimTableMeta(),
      grid: block.grid,
    });
    return true;
  }, []);

  const openPreviewTable = useCallback((tableEl: HTMLTableElement, previewRoot: Element) => {
    const md = getMarkdownRef.current();
    const block = resolveHaimTableBlockFromPreview(md, tableEl, previewRoot);
    if (!block) return false;

    setEditState({
      block,
      meta: block.meta ?? createDefaultHaimTableMeta(),
      grid: block.grid,
    });
    return true;
  }, []);

  const close = useCallback(() => setEditState(null), []);

  const apply = useCallback(
    (meta: HaimTableMeta, grid: HaimTableGrid) => {
      if (!editState) return;
      const md = getMarkdownRef.current();
      const block =
        findHaimTableBlockAt(md, editState.block.start, editState.block.start + 1) ??
        editState.block;
      const next = upsertHaimTableBlock(md, block, meta, grid);
      setMarkdownRef.current(next);
      setEditState(null);
    },
    [editState],
  );

  return {
    editState,
    openAtOffset,
    openPreviewTable,
    close,
    apply,
    isOpen: Boolean(editState),
  };
}
