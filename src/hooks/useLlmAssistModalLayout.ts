import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clampLlmModalLayout,
  loadLlmModalLayout,
  saveLlmModalLayout,
  type LlmModalLayout,
} from '@/utils/llmModalLayout';
import { getLlmAssistEditorBounds } from '@/utils/llmAssistEditorBounds';

const DRAG_THRESHOLD_PX = 5;
type ResizeHandle = 'sw' | 'se' | 'w' | 'e';

type DragState = {
  active: boolean;
  startX: number;
  startY: number;
  startLayout: LlmModalLayout;
  touchIdentifier?: number;
};

type ResizeState = {
  corner: ResizeHandle;
  startX: number;
  startY: number;
  startLayout: LlmModalLayout;
};

const RESIZE_CURSOR_STYLE_ID = 'llm-assist-modal-resize-cursor-style';
const RESIZE_ROOT_CLASS = 'llm-assist-modal-corner-resize';

function ensureResizeCursorStyle() {
  if (document.getElementById(RESIZE_CURSOR_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = RESIZE_CURSOR_STYLE_ID;
  style.textContent = `
    html.${RESIZE_ROOT_CLASS},
    html.${RESIZE_ROOT_CLASS} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `;
  document.head.appendChild(style);
}

function resizeCursorForHandle(handle: ResizeHandle): string {
  if (handle === 'e' || handle === 'w') return 'ew-resize';
  return handle === 'se' ? 'nwse-resize' : 'nesw-resize';
}

function lockResizeCursor(handle: ResizeHandle) {
  ensureResizeCursorStyle();
  const cursor = resizeCursorForHandle(handle);
  document.documentElement.style.setProperty('--llm-assist-resize-cursor', cursor);
  document.documentElement.classList.add(RESIZE_ROOT_CLASS);
  document.body.style.userSelect = 'none';
}

function unlockResizeCursor() {
  document.documentElement.classList.remove(RESIZE_ROOT_CLASS);
  document.documentElement.style.removeProperty('--llm-assist-resize-cursor');
  document.body.style.userSelect = '';
}

export function useLlmAssistModalLayout(
  editorRef: { current?: unknown } | null | undefined,
  { enabled = true }: { enabled?: boolean } = {},
) {
  const boundsRef = useRef(getLlmAssistEditorBounds(editorRef));
  const [layout, setLayout] = useState<LlmModalLayout>(() =>
    loadLlmModalLayout(boundsRef.current),
  );
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    startY: 0,
    startLayout: layout,
  });
  const resizeRef = useRef<ResizeState | null>(null);

  const refreshBounds = useCallback(() => {
    boundsRef.current = getLlmAssistEditorBounds(editorRef);
    setLayout((prev) => clampLlmModalLayout(prev, boundsRef.current));
  }, [editorRef]);

  useEffect(() => {
    if (!enabled) return undefined;
    refreshBounds();

    const onWindowChange = () => refreshBounds();
    window.addEventListener('resize', onWindowChange);
    window.addEventListener('scroll', onWindowChange, true);

    const root =
      (editorRef?.current as { value?: { root?: Element }; root?: Element } | null | undefined)
        ?.value?.root ??
      (editorRef?.current as { root?: Element } | null | undefined)?.root ??
      null;

    let resizeObserver: ResizeObserver | null = null;
    if (root && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(onWindowChange);
      resizeObserver.observe(root);
      const toolbar =
        root.querySelector('.md-editor-toolbar-wrapper') || root.querySelector('.md-editor-toolbar');
      if (toolbar) resizeObserver.observe(toolbar);
    }

    return () => {
      window.removeEventListener('resize', onWindowChange);
      window.removeEventListener('scroll', onWindowChange, true);
      resizeObserver?.disconnect();
    };
  }, [enabled, editorRef, refreshBounds]);

  const persistLayout = useCallback((next: LlmModalLayout) => {
    const clamped = clampLlmModalLayout(next, boundsRef.current);
    saveLlmModalLayout(clamped, boundsRef.current);
    return clamped;
  }, []);

  const applyDragDelta = useCallback((clientX: number, clientY: number) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = clientX - drag.startX;
    const dy = clientY - drag.startY;
    setLayout(
      clampLlmModalLayout(
        {
          ...drag.startLayout,
          leftPx: drag.startLayout.leftPx + dx,
          topPx: drag.startLayout.topPx + dy,
        },
        boundsRef.current,
      ),
    );
  }, []);

  const startPositionDrag = useCallback(
    (e: React.PointerEvent, { onTap }: { onTap?: () => void } = {}) => {
      if (e.pointerType === 'touch') return;
      if (e.button !== 0) return;
      e.preventDefault();

      const startX = e.clientX;
      const startY = e.clientY;
      let dragged = false;

      dragRef.current = {
        active: true,
        startX,
        startY,
        startLayout: layout,
      };

      const onMove = (ev: PointerEvent) => {
        if (!dragRef.current.active) return;
        if (Math.hypot(ev.clientX - startX, ev.clientY - startY) > DRAG_THRESHOLD_PX) {
          dragged = true;
        }
        applyDragDelta(ev.clientX, ev.clientY);
      };

      const onUp = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        setLayout((prev) => persistLayout(prev));
        if (!dragged) onTap?.();
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    },
    [applyDragDelta, layout, persistLayout],
  );

  const startPositionTouchDrag = useCallback(
    (e: React.TouchEvent, { onTap }: { onTap?: () => void } = {}) => {
      const touches = e.changedTouches;
      if (!touches?.length) return;

      const touch = touches[0];
      if (!touch) return;
      const identifier = touch.identifier;
      const startX = touch.clientX;
      const startY = touch.clientY;
      e.preventDefault();

      let dragged = false;
      dragRef.current = {
        active: true,
        startX,
        startY,
        startLayout: layout,
        touchIdentifier: identifier,
      };

      const onTouchMove = (ev: TouchEvent) => {
        if (!dragRef.current.active) return;
        const current = Array.from(ev.touches).find((t) => t.identifier === identifier);
        if (!current) return;

        if (Math.hypot(current.clientX - startX, current.clientY - startY) > DRAG_THRESHOLD_PX) {
          dragged = true;
        }
        applyDragDelta(current.clientX, current.clientY);
        ev.preventDefault();
      };

      const finalize = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('touchcancel', onTouchEnd);
        setLayout((prev) => persistLayout(prev));
        if (!dragged) onTap?.();
      };

      const onTouchEnd = (ev: TouchEvent) => {
        if (!dragRef.current.active) return;
        const ended = Array.from(ev.changedTouches).some((t) => t.identifier === identifier);
        if (!ended) return;
        finalize();
      };

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd, { passive: false });
      document.addEventListener('touchcancel', onTouchEnd, { passive: false });
    },
    [applyDragDelta, layout, persistLayout],
  );

  const applyResizeDelta = useCallback((clientX: number, clientY: number) => {
    const resize = resizeRef.current;
    if (!resize) return;

    const dx = clientX - resize.startX;
    const dy = clientY - resize.startY;
    const start = resize.startLayout;
    let next: LlmModalLayout;

    if (resize.corner === 'se') {
      next = {
        leftPx: start.leftPx,
        topPx: start.topPx,
        widthPx: start.widthPx + dx,
        heightPx: start.heightPx + dy,
      };
    } else if (resize.corner === 'sw') {
      next = {
        leftPx: start.leftPx + dx,
        topPx: start.topPx,
        widthPx: start.widthPx - dx,
        heightPx: start.heightPx + dy,
      };
    } else if (resize.corner === 'e') {
      next = {
        leftPx: start.leftPx,
        topPx: start.topPx,
        widthPx: start.widthPx + dx,
        heightPx: start.heightPx,
      };
    } else {
      // 'w'
      next = {
        leftPx: start.leftPx + dx,
        topPx: start.topPx,
        widthPx: start.widthPx - dx,
        heightPx: start.heightPx,
      };
    }

    setLayout(clampLlmModalLayout(next, boundsRef.current));
  }, []);

  const startEdgeResize = useCallback(
    (handle: ResizeHandle, e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();

      resizeRef.current = {
        corner: handle,
        startX: e.clientX,
        startY: e.clientY,
        startLayout: layout,
      };

      lockResizeCursor(handle);

      const target = e.currentTarget;
      if (target instanceof HTMLElement && typeof target.setPointerCapture === 'function') {
        target.setPointerCapture(e.pointerId);
      }

      const finish = () => {
        resizeRef.current = null;
        unlockResizeCursor();
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointercancel', onUp);
      };

      const onMove = (ev: PointerEvent) => {
        ev.preventDefault();
        applyResizeDelta(ev.clientX, ev.clientY);
      };

      const onUp = () => {
        if (!resizeRef.current) return;
        finish();
        setLayout((prev) => persistLayout(prev));
      };

      document.addEventListener('pointermove', onMove, { passive: false });
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
    },
    [applyResizeDelta, layout, persistLayout],
  );

  /** @deprecated Prefer startEdgeResize; kept for existing bottom-corner callers. */
  const startCornerResize = useCallback(
    (corner: 'sw' | 'se', e: React.PointerEvent) => startEdgeResize(corner, e),
    [startEdgeResize],
  );

  const panelStyle = {
    left: layout.leftPx,
    top: layout.topPx,
    width: layout.widthPx,
    height: layout.heightPx,
  };

  return {
    layout,
    panelRef,
    panelStyle,
    startPositionDrag,
    startPositionTouchDrag,
    startCornerResize,
    startEdgeResize,
    refreshBounds,
  };
}
