import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog, Tooltip } from 'radix-ui';
import {
  X,
  Hand,
  Pencil,
  Eraser,
  Undo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import {
  isInkApiAvailable,
  requestInkPresenter,
  type DelegatedInkTrailPresenter,
} from '@/components/haimEditor/haimImageInk';

const LIGHTBOX_EASE = [0.22, 1, 0.36, 1] as const;
const OVERLAY_TRANSITION = { duration: 0.2, ease: LIGHTBOX_EASE };
const PANEL_TRANSITION = { duration: 0.28, ease: LIGHTBOX_EASE };

const MIN_SCALE = 0.5;
const MAX_SCALE = 8;
const ZOOM_STEP = 1.25;
const DBLCLICK_ZOOM = 2;

const PEN_COLORS = [
  '#111827',
  '#ef4444',
  '#f59e0b',
  '#22c55e',
  '#3b82f6',
  '#a855f7',
  '#ffffff',
] as const;

const CHECKERBOARD_STYLE = {
  backgroundColor: '#ffffff',
  backgroundImage: [
    'linear-gradient(45deg, #d4d4d4 25%, transparent 25%)',
    'linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)',
    'linear-gradient(45deg, transparent 75%, #d4d4d4 75%)',
    'linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)',
  ].join(','),
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
};

type Tool = 'pan' | 'pen' | 'eraser';

type Point = { x: number; y: number };

type Stroke = {
  id: string;
  tool: 'pen' | 'eraser';
  color: string;
  diameter: number;
  points: Point[];
};

export type HaimImageLightboxProps = {
  src: string | null;
  alt?: string;
  open: boolean;
  onClose: () => void;
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function drawStroke(
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
  dpr: number,
): void {
  if (stroke.points.length < 1) return;
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke.diameter;
  if (stroke.tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = stroke.color;
  }
  ctx.beginPath();
  const first = stroke.points[0];
  if (!first) {
    ctx.restore();
    return;
  }
  ctx.moveTo(first.x, first.y);
  if (stroke.points.length === 1) {
    ctx.lineTo(first.x + 0.01, first.y);
  } else {
    for (let i = 1; i < stroke.points.length; i += 1) {
      const p = stroke.points[i];
      if (p) ctx.lineTo(p.x, p.y);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function redrawAll(
  canvas: HTMLCanvasElement,
  strokes: Stroke[],
  dpr: number,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of strokes) drawStroke(ctx, s, dpr);
}

function ToolTipBtn({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-white transition-colors disabled:opacity-40 ${
            active
              ? 'border-sky-400 bg-sky-500/30'
              : 'border-white/15 bg-white/10 hover:bg-white/20'
          }`}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={6}
          className="z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow"
        >
          {label}
          <Tooltip.Arrow className="fill-neutral-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/**
 * Fullscreen enlarge viewer: wheel/dblclick zoom, drag pan, Ink API drawing.
 */
export default function HaimImageLightbox({
  src,
  alt = '',
  open,
  onClose,
}: HaimImageLightboxProps) {
  const visible = Boolean(open && src);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<Tool>('pan');
  const [penColor, setPenColor] = useState<string>(PEN_COLORS[0]);
  const [penSize, setPenSize] = useState(4);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [inkReady, setInkReady] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const presenterRef = useRef<DelegatedInkTrailPresenter | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const drawingRef = useRef<Stroke | null>(null);
  const panDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const dprRef = useRef(1);
  const scaleRef = useRef(scale);

  strokesRef.current = strokes;
  scaleRef.current = scale;

  const resetView = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const clearInk = useCallback(() => {
    setStrokes([]);
    drawingRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Reset session when opened / source changes.
  useEffect(() => {
    if (!visible) return;
    resetView();
    clearInk();
    setTool('pan');
  }, [visible, src, resetView, clearInk]);

  const syncCanvasSize = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const w = img.clientWidth;
    const h = img.clientHeight;
    if (w < 1 || h < 1) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    dprRef.current = dpr;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    redrawAll(canvas, strokesRef.current, dpr);
  }, []);

  useLayoutEffect(() => {
    if (!visible) return undefined;
    syncCanvasSize();
    const img = imgRef.current;
    if (!img) return undefined;
    const onLoad = () => syncCanvasSize();
    img.addEventListener('load', onLoad);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncCanvasSize) : null;
    ro?.observe(img);
    window.addEventListener('resize', syncCanvasSize);
    return () => {
      img.removeEventListener('load', onLoad);
      ro?.disconnect();
      window.removeEventListener('resize', syncCanvasSize);
    };
  }, [visible, src, syncCanvasSize]);

  useEffect(() => {
    if (!visible) {
      presenterRef.current = null;
      setInkReady(false);
      return undefined;
    }
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas || !isInkApiAvailable()) {
      setInkReady(false);
      return undefined;
    }
    void requestInkPresenter(canvas).then((presenter) => {
      if (cancelled) return;
      presenterRef.current = presenter;
      setInkReady(Boolean(presenter));
    });
    return () => {
      cancelled = true;
      presenterRef.current = null;
    };
  }, [visible, src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;
    redrawAll(canvas, strokes, dprRef.current);
  }, [strokes, visible]);

  const zoomAt = useCallback(
    (nextScale: number, clientX: number, clientY: number) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        setScale(clamp(nextScale, MIN_SCALE, MAX_SCALE));
        return;
      }
      const rect = viewport.getBoundingClientRect();
      const cx = clientX - rect.left - rect.width / 2;
      const cy = clientY - rect.top - rect.height / 2;
      setScale((prev) => {
        const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
        const ratio = clamped / prev;
        setPan((p) => ({
          x: cx - (cx - p.x) * ratio,
          y: cy - (cy - p.y) * ratio,
        }));
        return clamped;
      });
    },
    [],
  );

  // Non-passive wheel so preventDefault actually blocks page scroll.
  useLayoutEffect(() => {
    if (!visible) return undefined;
    const el = viewportRef.current;
    if (!el) return undefined;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const direction = event.deltaY > 0 ? 1 / ZOOM_STEP : ZOOM_STEP;
      zoomAt(scaleRef.current * direction, event.clientX, event.clientY);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [visible, zoomAt]);

  const onImageDoubleClick = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (scale > 1.05) {
        resetView();
        return;
      }
      zoomAt(DBLCLICK_ZOOM, event.clientX, event.clientY);
    },
    [scale, resetView, zoomAt],
  );

  const canvasLocalPoint = useCallback((event: PointerEvent | ReactPointerEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return null;
    // Account for CSS transform on ancestors: getBoundingClientRect is post-transform.
    return {
      x: ((event.clientX - rect.left) / rect.width) * (canvas.width / dprRef.current),
      y: ((event.clientY - rect.top) / rect.height) * (canvas.height / dprRef.current),
    };
  }, []);

  const beginPan = useCallback(
    (event: ReactPointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
      panDragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: pan.x,
        originY: pan.y,
      };
    },
    [pan.x, pan.y],
  );

  const movePan = useCallback((event: ReactPointerEvent) => {
    const drag = panDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    setPan({
      x: drag.originX + (event.clientX - drag.startX),
      y: drag.originY + (event.clientY - drag.startY),
    });
  }, []);

  const endPan = useCallback((event: ReactPointerEvent) => {
    const drag = panDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    panDragRef.current = null;
    try {
      (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const beginDraw = useCallback(
    (event: ReactPointerEvent) => {
      if (tool !== 'pen' && tool !== 'eraser') return;
      event.preventDefault();
      event.stopPropagation();
      const pt = canvasLocalPoint(event);
      if (!pt) return;
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
      const stroke: Stroke = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        tool,
        color: penColor,
        diameter: penSize,
        points: [pt],
      };
      drawingRef.current = stroke;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) drawStroke(ctx, stroke, dprRef.current);

      if (tool === 'pen' && presenterRef.current && event.nativeEvent.isTrusted) {
        try {
          presenterRef.current.updateInkTrailStartPoint(event.nativeEvent, {
            color: penColor,
            diameter: Math.max(1, penSize),
          });
        } catch {
          // Ink API optional
        }
      }
    },
    [tool, penColor, penSize, canvasLocalPoint],
  );

  const moveDraw = useCallback(
    (event: ReactPointerEvent) => {
      const stroke = drawingRef.current;
      if (!stroke) return;
      event.preventDefault();
      const pt = canvasLocalPoint(event);
      if (!pt) return;
      stroke.points.push(pt);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && stroke.points.length >= 2) {
        const a = stroke.points[stroke.points.length - 2];
        const b = stroke.points[stroke.points.length - 1];
        if (a && b) {
          ctx.save();
          ctx.scale(dprRef.current, dprRef.current);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = stroke.diameter;
          if (stroke.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = stroke.color;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }
      if (stroke.tool === 'pen' && presenterRef.current && event.nativeEvent.isTrusted) {
        try {
          presenterRef.current.updateInkTrailStartPoint(event.nativeEvent, {
            color: stroke.color,
            diameter: Math.max(1, stroke.diameter),
          });
        } catch {
          // ignore
        }
      }
    },
    [canvasLocalPoint],
  );

  const endDraw = useCallback((event: ReactPointerEvent) => {
    const stroke = drawingRef.current;
    if (!stroke) return;
    drawingRef.current = null;
    try {
      (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
    } catch {
      // ignore
    }
    if (stroke.points.length > 0) {
      setStrokes((prev) => [...prev, { ...stroke, points: [...stroke.points] }]);
    }
  }, []);

  const onStagePointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (event.button === 1 || tool === 'pan') {
        beginPan(event);
        return;
      }
      if (tool === 'pen' || tool === 'eraser') {
        beginDraw(event);
      }
    },
    [tool, beginPan, beginDraw],
  );

  const onStagePointerMove = useCallback(
    (event: ReactPointerEvent) => {
      if (panDragRef.current) {
        movePan(event);
        return;
      }
      if (drawingRef.current) moveDraw(event);
    },
    [movePan, moveDraw],
  );

  const onStagePointerUp = useCallback(
    (event: ReactPointerEvent) => {
      if (panDragRef.current) endPan(event);
      if (drawingRef.current) endDraw(event);
    },
    [endPan, endDraw],
  );

  const undoStroke = useCallback(() => {
    setStrokes((prev) => prev.slice(0, -1));
  }, []);

  const cursorClass =
    tool === 'pan'
      ? panDragRef.current
        ? 'cursor-grabbing'
        : 'cursor-grab'
      : tool === 'eraser'
        ? 'cursor-cell'
        : 'cursor-crosshair';

  return (
    <Dialog.Root
      open={visible}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <AnimatePresence>
        {visible ? (
          <Dialog.Portal forceMount key="haim-image-lightbox">
            <Dialog.Overlay asChild forceMount>
              <Motion.div
                className="fixed inset-0 z-100060 bg-black/85"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={OVERLAY_TRANSITION}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => e.preventDefault()}
              onEscapeKeyDown={() => onClose()}
            >
              <Motion.div
                className="fixed inset-0 z-100061 flex flex-col outline-none"
                aria-label="이미지 크게 보기"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={PANEL_TRANSITION}
              >
                <Dialog.Title className="sr-only">이미지 크게 보기</Dialog.Title>
                <Dialog.Description className="sr-only">
                  스크롤·더블클릭으로 확대/축소, 드래그로 패닝, 하단 툴바로 그림을 그릴 수 있습니다.
                </Dialog.Description>

                <div
                  ref={viewportRef}
                  className={`relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${cursorClass}`}
                  onPointerDown={onStagePointerDown}
                  onPointerMove={onStagePointerMove}
                  onPointerUp={onStagePointerUp}
                  onPointerCancel={onStagePointerUp}
                >
                  {src ? (
                    <div
                      ref={stageRef}
                      className="relative will-change-transform"
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                        transformOrigin: 'center center',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl"
                        style={CHECKERBOARD_STYLE}
                      >
                        <img
                          ref={imgRef}
                          src={src}
                          alt={alt || ''}
                          className="block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none"
                          draggable={false}
                          onDoubleClick={onImageDoubleClick}
                        />
                        <canvas
                          ref={canvasRef}
                          className="pointer-events-none absolute inset-0 h-full w-full"
                          aria-hidden
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
                  <div
                    className="relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md">
                      <ToolTipBtn
                        label="패닝 (드래그로 이동)"
                        active={tool === 'pan'}
                        onClick={() => setTool('pan')}
                      >
                        <Hand size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="펜으로 그리기"
                        active={tool === 'pen'}
                        onClick={() => setTool('pen')}
                      >
                        <Pencil size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="지우개"
                        active={tool === 'eraser'}
                        onClick={() => setTool('eraser')}
                      >
                        <Eraser size={16} />
                      </ToolTipBtn>
                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />
                      {PEN_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          aria-label={`색상 ${c}`}
                          onClick={() => {
                            setPenColor(c);
                            setTool('pen');
                          }}
                          className={`h-6 w-6 rounded-full border-2 ${
                            penColor === c && tool === 'pen'
                              ? 'border-sky-400'
                              : 'border-white/30'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                      <label className="ml-1 flex items-center gap-1.5 text-[11px] text-white/80">
                        <span className="sr-only">선 굵기</span>
                        <input
                          type="range"
                          min={1}
                          max={32}
                          value={penSize}
                          onChange={(e) => setPenSize(Number(e.target.value) || 4)}
                          className="w-20 accent-sky-400"
                          aria-label="선 굵기"
                        />
                        <span className="w-5 tabular-nums">{penSize}</span>
                      </label>
                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />
                      <ToolTipBtn
                        label="실행 취소"
                        disabled={strokes.length === 0}
                        onClick={undoStroke}
                      >
                        <Undo2 size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="그림 지우기"
                        disabled={strokes.length === 0}
                        onClick={clearInk}
                      >
                        <Trash2 size={16} />
                      </ToolTipBtn>
                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />
                      <ToolTipBtn
                        label="축소"
                        onClick={() => {
                          const vp = viewportRef.current?.getBoundingClientRect();
                          if (!vp) {
                            setScale((s) => clamp(s / ZOOM_STEP, MIN_SCALE, MAX_SCALE));
                            return;
                          }
                          zoomAt(scale / ZOOM_STEP, vp.left + vp.width / 2, vp.top + vp.height / 2);
                        }}
                      >
                        <ZoomOut size={16} />
                      </ToolTipBtn>
                      <span className="min-w-10 text-center text-[11px] tabular-nums text-white/80">
                        {Math.round(scale * 100)}%
                      </span>
                      <ToolTipBtn
                        label="확대"
                        onClick={() => {
                          const vp = viewportRef.current?.getBoundingClientRect();
                          if (!vp) {
                            setScale((s) => clamp(s * ZOOM_STEP, MIN_SCALE, MAX_SCALE));
                            return;
                          }
                          zoomAt(scale * ZOOM_STEP, vp.left + vp.width / 2, vp.top + vp.height / 2);
                        }}
                      >
                        <ZoomIn size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn label="보기 초기화" onClick={resetView}>
                        <RotateCcw size={16} />
                      </ToolTipBtn>
                    </div>
                    <p className="max-w-xl text-center text-[10px] text-white/55">
                      스크롤·더블클릭 확대/축소 · 패닝 드래그 · 펜/지우개로 그리기
                      {inkReady ? ' · Ink API 저지연 스트로크 활성' : ''}
                    </p>
                  </div>
                </Tooltip.Provider>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="닫기"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </Motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
