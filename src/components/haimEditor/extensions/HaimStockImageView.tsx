import { useCallback, useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import HaimImageLightbox, {
  type HaimImageLightboxSaveMode,
} from '@/components/haimEditor/HaimImageLightbox';
import { isRenderableImageSrc } from '@/components/haimEditor/extensions/stockImageSrc';
import { uploadHaimAnnotatedImage } from '@/utils/haimImageAnnotateUpload';
import { isStorageImageSrc } from '@/utils/storageImagePath';

/**
 * Stock TipTap Image node view: click = select (edit), double-click = enlarge.
 */
export default function HaimStockImageView({
  node,
  selected,
  editor,
  getPos,
  updateAttributes,
}: NodeViewProps) {
  const src = String(node.attrs.src || '');
  const alt = String(node.attrs.alt || '');
  const title = String(node.attrs.title || '');
  const editable = editor.isEditable;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [src]);

  // Vault paths stay mounted so storage hydration can replace a 404 src.
  // Unknown schemes (attachment:) and failed remote URLs use the placeholder.
  const showFallback =
    !isRenderableImageSrc(src) || (loadFailed && !isStorageImageSrc(src));

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
      if (!isRenderableImageSrc(src) || loadFailed) return;
      setLightboxSrc(src);
      setLightboxOpen(true);
    },
    [loadFailed, src],
  );

  const saveAnnotated = useCallback(
    async (mode: HaimImageLightboxSaveMode, file: File) => {
      if (!editable) return;
      const newPath = await uploadHaimAnnotatedImage(file);
      const pos = typeof getPos === 'function' ? getPos() : null;
      const previewUrl = URL.createObjectURL(file);

      if (mode === 'overwrite') {
        // Replace stock image with a wiki image pointing at the annotated file.
        if (typeof pos === 'number') {
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + node.nodeSize })
            .insertContentAt(pos, {
              type: 'wikiImage',
              attrs: {
                path: newPath,
                options: '',
                alt: newPath,
                width: null,
                height: null,
                background: null,
              },
            })
            .run();
        } else {
          updateAttributes({ src: previewUrl });
        }
        setLightboxSrc(previewUrl);
        return;
      }

      if (typeof pos !== 'number') return;
      const insertAt = pos + node.nodeSize;
      editor
        .chain()
        .focus()
        .insertContentAt(insertAt, {
          type: 'wikiImage',
          attrs: {
            path: newPath,
            options: '',
            alt: newPath,
            width: null,
            height: null,
            background: null,
          },
        })
        .run();
    },
    [editable, editor, getPos, updateAttributes, node.nodeSize],
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
      {showFallback ? (
        <div
          className="haim-stock-image-fallback"
          role="img"
          aria-label={alt || '이미지를 불러올 수 없습니다'}
        >
          <span className="haim-stock-image-fallback-title">이미지를 불러올 수 없습니다</span>
          {alt ? <span className="haim-stock-image-fallback-alt">{alt}</span> : null}
          {src ? <span className="haim-stock-image-fallback-src">{src}</span> : null}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          {...(title ? { title } : {})}
          className="haim-stock-image max-w-full h-auto cursor-pointer"
          draggable={false}
          onError={() => {
            if (!isStorageImageSrc(src)) setLoadFailed(true);
          }}
        />
      )}
      <HaimImageLightbox
        src={showFallback ? null : lightboxSrc || src || null}
        alt={alt}
        open={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          setLightboxSrc(null);
        }}
        {...(editable ? { onSaveAnnotated: saveAnnotated } : {})}
      />
    </NodeViewWrapper>
  );
}
