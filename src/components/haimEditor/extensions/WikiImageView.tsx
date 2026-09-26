import { useCallback, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { WIKI_IMAGE_PLACEHOLDER_SRC } from '@/components/haimEditor/extensions/wikiImageConstants';
import {
  buildWikiImageStyle,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';

type Corner = 'nw' | 'ne' | 'sw' | 'se';

const CORNERS: Corner[] = ['nw', 'ne', 'sw', 'se'];

function styleStringToObject(style: string | null): CSSProperties | undefined {
  if (!style) return undefined;
  const out: Record<string, string> = {};
  for (const part of style.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const i = trimmed.indexOf(':');
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    const val = trimmed.slice(i + 1).trim();
    const camel = key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[camel] = val;
  }
  return out as CSSProperties;
}

function optionsFromSizeAttrs(
  path: string,
  width: string | null,
  height: string | null,
  background: string | null,
): string {
  const markup = wikiImageMarkupFromAttrs({ path, width, height, background });
  const pipe = markup.indexOf('|');
  if (pipe < 0) return '';
  const end = markup.lastIndexOf(']]');
  return markup.slice(pipe + 1, end >= 0 ? end : undefined).trim();
}

function roundPx(n: number): string {
  return `${Math.max(24, Math.round(n))}px`;
}

/**
 * TipTap wiki-image node view: hydration target + corner resize + size modal.
 */
export default function WikiImageView({
  node,
  selected,
  editor,
  updateAttributes,
}: NodeViewProps) {
  const path = String(node.attrs.path || '');
  const options = String(node.attrs.options || '');
  const alt = String(node.attrs.alt || path);
  const width = (node.attrs.width as string | null) || null;
  const height = (node.attrs.height as string | null) || null;
  const background = (node.attrs.background as string | null) || null;
  const editable = editor.isEditable;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [liveSize, setLiveSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const imgStyle = useMemo(() => {
    if (liveSize) {
      return {
        ...styleStringToObject(
          buildWikiImageStyle({ width: null, height: null, background }),
        ),
        width: `${liveSize.width}px`,
        height: `${liveSize.height}px`,
      } as CSSProperties;
    }
    return styleStringToObject(
      buildWikiImageStyle({ width, height, background }),
    );
  }, [width, height, background, liveSize]);

  const commitSize = useCallback(
    (nextW: string | null, nextH: string | null) => {
      updateAttributes({
        width: nextW,
        height: nextH,
        options: optionsFromSizeAttrs(path, nextW, nextH, background),
      });
    },
    [updateAttributes, path, background],
  );

  const onResizePointerDown = useCallback(
    (corner: Corner, event: ReactPointerEvent) => {
      if (!editable) return;
      event.preventDefault();
      event.stopPropagation();

      const img = imgRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const startW = rect.width;
      const startH = rect.height;
      const startX = event.clientX;
      const startY = event.clientY;
      const ratio = startH > 0 ? startW / startH : 1;
      const pointerId = event.pointerId;
      (event.target as HTMLElement).setPointerCapture?.(pointerId);

      setLiveSize({ width: startW, height: startH });

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        let nextW = startW;
        let nextH = startH;

        if (corner.includes('e')) nextW = startW + dx;
        if (corner.includes('w')) nextW = startW - dx;
        if (corner.includes('s')) nextH = startH + dy;
        if (corner.includes('n')) nextH = startH - dy;

        nextW = Math.max(24, nextW);
        nextH = Math.max(24, nextH);

        // Shift (or touch) keeps aspect ratio
        const keepRatio = ev.shiftKey || ev.pointerType === 'touch';
        if (keepRatio) {
          if (Math.abs(dx) >= Math.abs(dy)) {
            nextH = nextW / ratio;
          } else {
            nextW = nextH * ratio;
          }
          nextW = Math.max(24, nextW);
          nextH = Math.max(24, nextH);
        }

        setLiveSize({ width: nextW, height: nextH });
      };

      const onUp = (ev: PointerEvent) => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        try {
          (ev.target as HTMLElement).releasePointerCapture?.(pointerId);
        } catch {
          // ignore
        }

        setLiveSize((cur) => {
          if (cur) {
            commitSize(roundPx(cur.width), roundPx(cur.height));
          }
          return null;
        });
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    },
    [editable, commitSize],
  );

  return (
    <NodeViewWrapper
      as="div"
      className={`haim-wiki-image-wrap${selected ? ' is-selected' : ''}${
        liveSize ? ' is-resizing' : ''
      }`}
      data-drag-handle
      onContextMenu={(e: ReactMouseEvent) => {
        if (!editable) return;
        e.preventDefault();
        e.stopPropagation();
        setSizeModalOpen(true);
      }}
    >
      <img
        ref={imgRef}
        src={WIKI_IMAGE_PLACEHOLDER_SRC}
        alt={alt}
        className="haim-wiki-image"
        data-wiki-path={path}
        {...(options ? { 'data-wiki-options': options } : {})}
        {...(width ? { 'data-wiki-width': width } : {})}
        {...(height ? { 'data-wiki-height': height } : {})}
        {...(background ? { 'data-wiki-bg': background } : {})}
        style={imgStyle}
        draggable={false}
      />
      {selected && editable
        ? CORNERS.map((corner) => (
            <button
              key={corner}
              type="button"
              className={`haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${corner}`}
              aria-label={`resize-${corner}`}
              data-resize-handle={corner}
              onPointerDown={(e) => onResizePointerDown(corner, e)}
            />
          ))
        : null}
      <WikiImageSizeModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        path={path}
        kind="wiki"
        initialWidth={width ?? ''}
        initialHeight={height ?? ''}
        imageSrc={imgRef.current?.currentSrc || imgRef.current?.src || ''}
        onApply={({ width: nextW, height: nextH }) => {
          commitSize(nextW, nextH);
          setSizeModalOpen(false);
        }}
      />
    </NodeViewWrapper>
  );
}
