import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { WIKI_IMAGE_PLACEHOLDER_SRC } from '@/components/haimEditor/extensions/wikiImageConstants';
import {
  buildWikiImageStyle,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
import HaimImageLightbox from '@/components/haimEditor/HaimImageLightbox';

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

function findWysiwygScroller(from: HTMLElement | null): HTMLElement | null {
  if (!from) return null;
  return (
    (from.closest('.overflow-auto') as HTMLElement | null) ||
    (from.parentElement as HTMLElement | null)
  );
}

/**
 * TipTap wiki-image node view: hydration target + corner resize + size modal.
 */
export default function WikiImageView({
  node,
  selected,
  editor,
  getPos,
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
  const liveSizeRef = useRef<{ width: number; height: number } | null>(null);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [liveSize, setLiveSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  liveSizeRef.current = liveSize;

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
      const nextAttrs = {
        width: nextW,
        height: nextH,
        options: optionsFromSizeAttrs(path, nextW, nextH, background),
      };

      const scroller = findWysiwygScroller(editor.view.dom);
      const savedTop = scroller?.scrollTop ?? null;
      const pos = typeof getPos === 'function' ? getPos() : null;

      if (typeof pos === 'number') {
        const tr = editor.state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          ...nextAttrs,
        });
        // Avoid TipTap/PM scrolling the node into view (jumps to top).
        editor.view.dispatch(tr);
      } else {
        updateAttributes(nextAttrs);
      }

      const restore = () => {
        if (scroller && savedTop != null) scroller.scrollTop = savedTop;
      };
      restore();
      requestAnimationFrame(restore);
      requestAnimationFrame(() => requestAnimationFrame(restore));
    },
    [editor, getPos, updateAttributes, path, background, node.attrs],
  );

  const exitSizeEditMode = useCallback(() => {
    const cur = liveSizeRef.current;
    if (cur) {
      commitSize(roundPx(cur.width), roundPx(cur.height));
      setLiveSize(null);
      liveSizeRef.current = null;
    }
    const pos = typeof getPos === 'function' ? getPos() : null;
    if (typeof pos === 'number') {
      const after = pos + (node.nodeSize || 1);
      editor.commands.setTextSelection(after);
    }
    editor.commands.blur();
  }, [commitSize, editor, getPos, node.nodeSize]);

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

      const initial = { width: startW, height: startH };
      liveSizeRef.current = initial;
      setLiveSize(initial);

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

        const next = { width: nextW, height: nextH };
        liveSizeRef.current = next;
        setLiveSize(next);
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

        const cur = liveSizeRef.current;
        if (cur) {
          commitSize(roundPx(cur.width), roundPx(cur.height));
        }
        liveSizeRef.current = null;
        setLiveSize(null);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    },
    [editable, commitSize],
  );

  useEffect(() => {
    if (!selected || !editable || sizeModalOpen || lightboxOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const t = event.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      exitSizeEditMode();
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [selected, editable, sizeModalOpen, lightboxOpen, exitSizeEditMode]);

  /** Single click → node selection (resize / edit mode). */
  const selectForEdit = useCallback(
    (event: ReactMouseEvent) => {
      if (event.detail > 1) return;
      // Allow context-menu / resize handles to own their events.
      if (
        event.target instanceof Element &&
        event.target.closest('[data-resize-handle]')
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const pos = typeof getPos === 'function' ? getPos() : null;
      if (typeof pos !== 'number') return;
      editor.chain().focus().setNodeSelection(pos).run();
    },
    [editor, getPos],
  );

  /** Double click → fullscreen enlarge viewer. */
  const openEnlarge = useCallback((event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const img = imgRef.current;
    const src = img?.currentSrc || img?.src || '';
    if (!src) return;
    setLightboxSrc(src);
    setLightboxOpen(true);
  }, []);

  return (
    <NodeViewWrapper
      as="div"
      className={`haim-wiki-image-wrap${selected ? ' is-selected' : ''}${
        liveSize ? ' is-resizing' : ''
      }`}
      data-drag-handle
      style={{ width: '100%', maxWidth: '100%' }}
      onClick={selectForEdit}
      onDoubleClick={openEnlarge}
      onContextMenu={(e: ReactMouseEvent) => {
        if (!editable) return;
        e.preventDefault();
        e.stopPropagation();
        setSizeModalOpen(true);
      }}
    >
      <div className="haim-wiki-image-frame">
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
      </div>
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
      <HaimImageLightbox
        src={lightboxSrc}
        alt={alt}
        open={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          setLightboxSrc(null);
        }}
      />
    </NodeViewWrapper>
  );
}
