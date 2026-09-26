import { useMemo } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { haimTableToHtml } from '@/utils/haimTable';
import { parseHaimTableRawText } from '@/components/haimEditor/haimTableRawText';
import { dispatchHaimTableEditRequest } from '@/components/haimEditor/haimTableEditEvents';

/**
 * TipTap raw-markdown node view.
 * haim-table → rendered HTML preview; other kinds stay as opaque pre.
 */
export default function RawMarkdownBlockView({
  node,
  editor,
  selected,
  getPos,
}: NodeViewProps) {
  const kind = String(node.attrs.kind || 'raw');
  const text = String(node.attrs.text || '');
  const editable = editor.isEditable;

  const tableHtml = useMemo(() => {
    if (kind !== 'haim-table') return null;
    const parsed = parseHaimTableRawText(text);
    if (!parsed) return null;
    return haimTableToHtml(parsed.grid, parsed.meta);
  }, [kind, text]);

  const openTableEdit = () => {
    if (!editable || kind !== 'haim-table') return;
    const pos = typeof getPos === 'function' ? getPos() : null;
    if (typeof pos !== 'number') return;
    dispatchHaimTableEditRequest(editor.view.dom, { pos, text });
  };

  if (kind === 'haim-table' && tableHtml) {
    return (
      <NodeViewWrapper
        as="div"
        className={`haim-raw-md haim-raw-md--haim-table${selected ? ' is-selected' : ''}`}
        data-haim-raw-md="1"
        data-kind="haim-table"
        contentEditable={false}
        onDoubleClick={(e: ReactMouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          openTableEdit();
        }}
      >
        <div
          className="haim-haim-table-preview"
          // Parsed from our own serializer; not user HTML.
          dangerouslySetInnerHTML={{ __html: tableHtml }}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      as="pre"
      className={`haim-raw-md${selected ? ' is-selected' : ''}`}
      data-haim-raw-md="1"
      data-kind={kind}
      contentEditable={false}
    >
      {text}
    </NodeViewWrapper>
  );
}
