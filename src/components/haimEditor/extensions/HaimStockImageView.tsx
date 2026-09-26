import { useCallback, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import HaimImageLightbox from '@/components/haimEditor/HaimImageLightbox';

/**
 * Stock TipTap Image node view: click = select (edit), double-click = enlarge.
 */
export default function HaimStockImageView({
  node,
  selected,
  editor,
  getPos,
}: NodeViewProps) {
  const src = String(node.attrs.src || '');
  const alt = String(node.attrs.alt || '');
  const title = String(node.attrs.title || '');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectForEdit = useCallback(
    (event: ReactMouseEvent) => {
      // Ignore the 2nd click of a double-click pair.
      if (event.detail > 1) return;
      event.preventDefault();
      event.stopPropagation();
      const pos = typeof getPos === 'function' ? getPos() : null;
      if (typeof pos !== 'number') return;
      editor.chain().focus().setNodeSelection(pos).run();
    },
    [editor, getPos],
  );

  const openEnlarge = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!src) return;
      setLightboxOpen(true);
    },
    [src],
  );

  return (
    <NodeViewWrapper
      as="span"
      className={`haim-stock-image-wrap${selected ? ' is-selected' : ''}`}
      data-drag-handle
      style={{ width: '100%', maxWidth: '100%' }}
      onClick={selectForEdit}
      onDoubleClick={openEnlarge}
    >
      <img
        src={src}
        alt={alt}
        {...(title ? { title } : {})}
        className="haim-stock-image max-w-full h-auto cursor-pointer"
        draggable={false}
      />
      <HaimImageLightbox
        src={src || null}
        alt={alt}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </NodeViewWrapper>
  );
}
