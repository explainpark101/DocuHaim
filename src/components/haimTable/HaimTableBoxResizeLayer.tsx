import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  applyLiveTableBoxSize,
  updateHaimTableBoxSizeInMarkdown,
} from '@/utils/haimTable';
import { indexOfPreviewTable } from '@/utils/haimTable/boxResize';
import {
  findExportPdfOverlayPortal,
  getCumulativeCssZoom,
  getElementLayoutSize,
  subscribeFixedOverlayRect,
  visualDeltaToLayoutDelta,
  type OverlayRect,
} from '@/utils/cssZoom';

type Corner = 'nw' | 'ne' | 'sw' | 'se';

type ActiveTable = {
  table: HTMLTableElement;
  tableIndex: number;
  widthPx: number;
  heightPx: number;
};

type OverlayRectState = OverlayRect | null;

type Props = {
  /** Root that contains `.md-editor-preview` (or the preview element itself). */
  containerRef: RefObject<HTMLElement | null>;
  getMarkdown: () => string;
  setMarkdown: (next: string) => void;
  /** When false, selection/handles are cleared. Default true. */
  enabled?: boolean;
};

const CORNERS: Corner[] = ['nw', 'ne', 'sw', 'se'];

const HANDLE_POS: Record<Corner, CSSProperties> = {
  nw: { left: 0, top: 0, cursor: 'nwse-resize', transform: 'translate(-50%, -50%)' },
  ne: { left: '100%', top: 0, cursor: 'nesw-resize', transform: 'translate(-50%, -50%)' },
  sw: { left: 0, top: '100%', cursor: 'nesw-resize', transform: 'translate(-50%, -50%)' },
  se: { left: '100%', top: '100%', cursor: 'nwse-resize', transform: 'translate(-50%, -50%)' },
};

function findPreviewRoot(container: HTMLElement | null): Element | null {
  if (!container) return null;
  if (container.classList?.contains('md-editor-preview')) return container;
  if (container.hasAttribute?.('data-export-pdf-preview') || container.id === 'export-pdf-preview') {
    return container.querySelector('.md-editor-preview') ?? container;
  }
  return (
    container.querySelector('.md-editor-preview')
    ?? container.querySelector('#export-pdf-preview .md-editor-preview')
    ?? container.querySelector('[data-export-pdf-preview] .md-editor-preview')
    ?? container
  );
}

/**
 * Corner-drag resize for preview / Export PDF tables.
 * Click a table to select; drag any corner to change box width & height.
 * Persists `boxWidth` / `boxHeight` into `<!-- haim-table -->`.
 */
export function HaimTableBoxResizeLayer({
  containerRef,
  getMarkdown,
  setMarkdown,
  enabled = true,
}: Props) {
  const [active, setActive] = useState<ActiveTable | null>(null);
  const [overlayRect, setOverlayRect] = useState<OverlayRectState>(null);
  const activeRef = useRef<ActiveTable | null>(null);
  const draggingRef = useRef(false);
  activeRef.current = active;

  const clearActive = useCallback(() => {
    setActive(null);
    setOverlayRect(null);
    activeRef.current = null;
  }, []);

  useEffect(() => {
    if (!enabled) clearActive();
  }, [clearActive, enabled]);

  // Keep overlay glued to the selected table (scroll + CSS zoom aware).
  useEffect(() => {
    if (!active?.table) {
      setOverlayRect(null);
      return undefined;
    }
    const table = active.table;
    return subscribeFixedOverlayRect(
      () => (table.isConnected ? table : null),
      (rect) => {
        if (!rect) {
          clearActive();
          return;
        }
        setOverlayRect(rect);
      },
    );
  }, [active, clearActive]);

  // Click table to select; click outside to deselect
  useEffect(() => {
    if (!enabled) return undefined;
    const container = containerRef.current;
    if (!container) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (draggingRef.current) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest?.('[data-haim-table-resize-handle]')) return;
      // Don't steal image free-transform handles
      if (target.closest?.('[data-transform-handle]')) return;

      const previewRoot = findPreviewRoot(container);
      if (!previewRoot) return;
      if (!previewRoot.contains(target)) {
        clearActive();
        return;
      }

      const table = target.closest?.('table') as HTMLTableElement | null;
      if (!table || !previewRoot.contains(table)) {
        clearActive();
        return;
      }

      // Ignore interactive controls inside cells
      if (target.closest?.('a, button, input, textarea, select')) return;

      const tableIndex = indexOfPreviewTable(table, previewRoot);
      if (tableIndex < 0) return;

      const layout = getElementLayoutSize(table);
      const next: ActiveTable = {
        table,
        tableIndex,
        widthPx: Math.max(48, layout.width),
        heightPx: Math.max(32, layout.height),
      };
      activeRef.current = next;
      setActive(next);
    };

    container.addEventListener('pointerdown', onPointerDown, true);
    return () => container.removeEventListener('pointerdown', onPointerDown, true);
  }, [clearActive, containerRef, enabled]);

  const onHandlePointerDown = useCallback(
    (event: ReactPointerEvent, dir: Corner) => {
      event.preventDefault();
      event.stopPropagation();
      const start = activeRef.current;
      if (!start?.table) return;

      draggingRef.current = true;
      const startX = event.clientX;
      const startY = event.clientY;
      const baseW = start.widthPx;
      const baseH = start.heightPx;
      const baseRatio = baseH > 0 ? baseW / baseH : 1;
      const isTouch = event.pointerType === 'touch';
      let moved = false;

      const onMove = (moveEvent: PointerEvent) => {
        const zoom = getCumulativeCssZoom(start.table);
        const dx = visualDeltaToLayoutDelta(moveEvent.clientX - startX, zoom);
        const dy = visualDeltaToLayoutDelta(moveEvent.clientY - startY, zoom);
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) moved = true;
        let width = baseW;
        let height = baseH;
        if (dir.includes('e')) width = baseW + dx;
        if (dir.includes('w')) width = baseW - dx;
        if (dir.includes('s')) height = baseH + dy;
        if (dir.includes('n')) height = baseH - dy;
        width = Math.max(48, width);
        height = Math.max(32, height);

        const keepAspect = isTouch || moveEvent.shiftKey;
        if (keepAspect) {
          const wr = Math.abs((width - baseW) / Math.max(1, baseW));
          const hr = Math.abs((height - baseH) / Math.max(1, baseH));
          if (wr >= hr) height = Math.max(32, width / Math.max(0.0001, baseRatio));
          else width = Math.max(48, height * baseRatio);
        }

        width = Math.max(48, Math.round(width));
        height = Math.max(32, Math.round(height));
        applyLiveTableBoxSize(start.table, width, height);
        const next = { ...start, widthPx: width, heightPx: height };
        activeRef.current = next;
        setActive(next);
      };

      const onUp = () => {
        document.removeEventListener('pointermove', onMove, true);
        document.removeEventListener('pointerup', onUp, true);
        document.removeEventListener('pointercancel', onUp, true);
        draggingRef.current = false;
        const cur = activeRef.current;
        if (!cur || !moved) return;
        if (cur.widthPx === baseW && cur.heightPx === baseH) return;
        const result = updateHaimTableBoxSizeInMarkdown(getMarkdown(), {
          tableIndex: cur.tableIndex,
          widthPx: cur.widthPx,
          heightPx: cur.heightPx,
        });
        if (result.updated) setMarkdown(result.markdown);
      };

      document.addEventListener('pointermove', onMove, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('pointercancel', onUp, true);
    },
    [getMarkdown, setMarkdown],
  );

  if (!enabled || !active || !overlayRect || typeof document === 'undefined') {
    return null;
  }

  const overlayPortal =
    overlayRect.positioning === 'zoom-root-absolute'
      ? findExportPdfOverlayPortal(containerRef.current)
      : null;
  const useZoomRootOverlay = Boolean(overlayPortal);

  return createPortal(
    <div
      className={`pointer-events-none z-100040 border-2 border-blue-500 print:hidden ${
        useZoomRootOverlay ? 'absolute' : 'fixed'
      }`}
      style={{
        left: overlayRect.left,
        top: overlayRect.top,
        width: overlayRect.width,
        height: overlayRect.height,
      }}
      data-haim-table-resize-overlay=""
    >
      {CORNERS.map((dir) => (
        <button
          key={dir}
          type="button"
          aria-label={`표 크기 조절 ${dir}`}
          data-haim-table-resize-handle={dir}
          className="pointer-events-auto absolute h-3.5 w-3.5 rounded-sm border-2 border-blue-500 bg-white shadow-sm dark:bg-odp-surface"
          style={HANDLE_POS[dir]}
          onPointerDown={(e) => onHandlePointerDown(e, dir)}
        />
      ))}
    </div>,
    useZoomRootOverlay ? overlayPortal! : document.body,
  );
}
