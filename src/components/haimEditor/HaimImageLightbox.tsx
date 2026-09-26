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
  PenLine,
  Highlighter,
  Flame,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Save,
  CopyPlus,
} from 'lucide-react';
import {
  compositeAnnotatedImageBlob,
  isInkApiAvailable,
  requestInkPresenter,
  type DelegatedInkTrailPresenter,
} from '@/components/haimEditor/haimImageInk';
import { isHaimAnnotateUploadAvailable } from '@/utils/haimImageAnnotateUpload';

const LIGHTBOX_EASE = [0.22, 1, 0.36, 1] as const;
const OVERLAY_TRANSITION = { duration: 0.2, ease: LIGHTBOX_EASE };
const PANEL_TRANSITION = { duration: 0.28, ease: LIGHTBOX_EASE };

const MIN_SCALE = 0.5;
const MAX_SCALE = 8;
const ZOOM_STEP = 1.25;
const DBLCLICK_ZOOM = 2;

const MIN_PEN = 0.5;
const MAX_PEN = 128;
const LASER_FADE_MS = 4000;
/** Cap long edge of ink buffer to avoid huge memory on multi-megapixel photos. */
const MAX_BUFFER_EDGE = 8192;

const PEN_COLORS = [
  '#111827',
  '#ef4444',
  '#f59e0b',
  '#22c55e',
  '#3b82f6',
  '#a855f7',
  '#ffffff',
] as const;

const HIGHLIGHT_COLORS = [
  'rgba(250, 204, 21, 0.45)',
  'rgba(244, 114, 182, 0.45)',
  'rgba(56, 189, 248, 0.4)',
  'rgba(74, 222, 128, 0.4)',
  'rgba(251, 146, 60, 0.45)',
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

type Tool = 'pan' | 'pen' | 'pressure' | 'highlighter' | 'laser' | 'eraser';

type Point = { x: number; y: number; pressure: number };

type StrokeKind = 'pen' | 'pressure' | 'highlighter' | 'laser' | 'eraser';

type Stroke = {
  id: string;
  seq: number;
  kind: StrokeKind;
  color: string;
  diameter: number;
  points: Point[];
  /** Laser: remove after this timestamp (ms). */
  expiresAt?: number;
};

export type HaimImageLightboxSaveMode = 'overwrite' | 'saveAs';

export type HaimImageLightboxProps = {
  src: string | null;
  alt?: string;
  open: boolean;
  onClose: () => void;
  /** Persist annotated PNG into the document (wiki / stock image). */
  onSaveAnnotated?: (
    mode: HaimImageLightboxSaveMode,
    file: File,
  ) => Promise<void>;
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function roundSize(n: number): number {
  return Math.round(n * 10) / 10;
}

function sizeStep(current: number): number {
  return Math.max(0.1, roundSize(current / 10));
}

function bumpSize(current: number, direction: 1 | -1): number {
  return roundSize(clamp(current + direction * sizeStep(current), MIN_PEN, MAX_PEN));
}

function readPressure(event: PointerEvent | ReactPointerEvent, usePressure: boolean): number {
  if (!usePressure) return 1;
  const p = event.pressure;
  if (typeof p !== 'number' || Number.isNaN(p)) return 0.5;
  // Mouse reports 0.5 while down; keep usable width.
  if (event.pointerType === 'mouse') return 0.5;
  return clamp(p || 0.05, 0.05, 1);
}

function strokeWidth(stroke: Stroke, pressure: number): number {
  if (stroke.kind === 'pressure') return Math.max(0.5, stroke.diameter * pressure);
  return stroke.diameter;
}

/** Points + diameters are stored in high-res buffer pixel space. */
function drawStrokeOnCtx(ctx: CanvasRenderingContext2D, stroke: Stroke): void {
  if (stroke.points.length < 1) return;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.miterLimit = 2;

  if (stroke.kind === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = stroke.diameter;
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
    return;
  }

  if (stroke.kind === 'highlighter') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.diameter;
    ctx.beginPath();
    const first = stroke.points[0];
    if (!first) {
      ctx.restore();
      return;
    }
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < stroke.points.length; i += 1) {
      const p = stroke.points[i];
      if (p) ctx.lineTo(p.x, p.y);
    }
    if (stroke.points.length === 1) ctx.lineTo(first.x + 0.01, first.y);
    ctx.stroke();
    ctx.restore();
    return;
  }

  // pen / pressure / laser — segment widths for pressure
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = stroke.color;
  if (stroke.kind !== 'pressure' || stroke.points.length < 2) {
    const p0 = stroke.points[0];
    if (!p0) {
      ctx.restore();
      return;
    }
    ctx.lineWidth = strokeWidth(stroke, p0.pressure);
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    if (stroke.points.length === 1) {
      ctx.lineTo(p0.x + 0.01, p0.y);
    } else {
      for (let i = 1; i < stroke.points.length; i += 1) {
        const p = stroke.points[i];
        if (p) ctx.lineTo(p.x, p.y);
      }
    }
    ctx.stroke();
  } else {
    for (let i = 1; i < stroke.points.length; i += 1) {
      const a = stroke.points[i - 1];
      const b = stroke.points[i];
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.lineWidth = strokeWidth(stroke, (a.pressure + b.pressure) / 2);
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function redrawLayer(canvas: HTMLCanvasElement | null, strokes: Stroke[]): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  for (const s of strokes) drawStrokeOnCtx(ctx, s);
}

/**
 * Prefer image natural pixels; never go below displayed CSS * devicePixelRatio
 * so zoomed-in drawing stays sharp on retina.
 */
function resolveInkBufferSize(
  img: HTMLImageElement,
): { bufW: number; bufH: number; cssW: number; cssH: number } {
  const cssW = Math.max(1, img.clientWidth);
  const cssH = Math.max(1, img.clientHeight);
  const natW = img.naturalWidth > 0 ? img.naturalWidth : cssW;
  const natH = img.naturalHeight > 0 ? img.naturalHeight : cssH;
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  let bufW = Math.max(natW, Math.round(cssW * dpr));
  let bufH = Math.max(natH, Math.round(cssH * dpr));
  const longEdge = Math.max(bufW, bufH);
  if (longEdge > MAX_BUFFER_EDGE) {
    const s = MAX_BUFFER_EDGE / longEdge;
    bufW = Math.max(1, Math.round(bufW * s));
    bufH = Math.max(1, Math.round(bufH * s));
  }
  return { bufW, bufH, cssW, cssH };
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
 * Fullscreen enlarge viewer: wheel/dblclick zoom, drag pan, Ink drawing tools.
 */
export default function HaimImageLightbox({
  src,
  alt = '',
  open,
  onClose,
  onSaveAnnotated,
}: HaimImageLightboxProps) {
  const visible = Boolean(open && src);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<Tool>('pan');
  const [penColor, setPenColor] = useState<string>(PEN_COLORS[0]);
  const [highlightColor, setHighlightColor] = useState<string>(HIGHLIGHT_COLORS[0]);
  const [penSize, setPenSize] = useState(4);
  const [inkStrokes, setInkStrokes] = useState<Stroke[]>([]);
  const [highlightStrokes, setHighlightStrokes] = useState<Stroke[]>([]);
  const [laserStrokes, setLaserStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<
    Array<{ layer: 'ink' | 'highlight' | 'both'; stroke: Stroke }>
  >([]);
  const strokeSeqRef = useRef(0);
  const [inkReady, setInkReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inkCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const laserCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const presenterRef = useRef<DelegatedInkTrailPresenter | null>(null);
  const inkRef = useRef<Stroke[]>([]);
  const highlightRef = useRef<Stroke[]>([]);
  const laserRef = useRef<Stroke[]>([]);
  const drawingRef = useRef<Stroke | null>(null);
  const drawingLayerRef = useRef<'ink' | 'highlight' | 'laser' | null>(null);
  const panDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const bufferScaleRef = useRef(1);
  const scaleRef = useRef(scale);
  const sizeRangeRef = useRef<HTMLLabelElement | null>(null);
  const laserTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  inkRef.current = inkStrokes;
  highlightRef.current = highlightStrokes;
  laserRef.current = laserStrokes;
  scaleRef.current = scale;

  const canSave =
    Boolean(onSaveAnnotated) &&
    isHaimAnnotateUploadAvailable() &&
    (inkStrokes.length > 0 || highlightStrokes.length > 0);

  const resetView = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const clearLaserTimers = useCallback(() => {
    for (const t of laserTimersRef.current.values()) clearTimeout(t);
    laserTimersRef.current.clear();
  }, []);

  const clearAllDrawings = useCallback(() => {
    setInkStrokes([]);
    setHighlightStrokes([]);
    setLaserStrokes([]);
    setRedoStack([]);
    drawingRef.current = null;
    drawingLayerRef.current = null;
    clearLaserTimers();
    for (const c of [inkCanvasRef.current, highlightCanvasRef.current, laserCanvasRef.current]) {
      if (!c) continue;
      const ctx = c.getContext('2d');
      ctx?.clearRect(0, 0, c.width, c.height);
    }
  }, [clearLaserTimers]);

  useEffect(() => {
    if (!visible) return;
    resetView();
    clearAllDrawings();
    setTool('pan');
    setSaveError(null);
  }, [visible, src, resetView, clearAllDrawings]);

  useEffect(() => {
    if (visible) return;
    clearLaserTimers();
  }, [visible, clearLaserTimers]);

  const syncCanvasSize = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const { bufW, bufH, cssW, cssH } = resolveInkBufferSize(img);
    if (cssW < 1 || cssH < 1) return;
    bufferScaleRef.current = bufW / cssW;
    for (const canvas of [
      inkCanvasRef.current,
      highlightCanvasRef.current,
      laserCanvasRef.current,
    ]) {
      if (!canvas) continue;
      const sizeChanged = canvas.width !== bufW || canvas.height !== bufH;
      if (sizeChanged) {
        canvas.width = bufW;
        canvas.height = bufH;
      }
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
    }
    redrawLayer(inkCanvasRef.current, inkRef.current);
    redrawLayer(highlightCanvasRef.current, highlightRef.current);
    redrawLayer(laserCanvasRef.current, laserRef.current);
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
    const canvas = inkCanvasRef.current;
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
    if (!visible) return;
    redrawLayer(inkCanvasRef.current, inkStrokes);
  }, [inkStrokes, visible]);

  useEffect(() => {
    if (!visible) return;
    redrawLayer(highlightCanvasRef.current, highlightStrokes);
  }, [highlightStrokes, visible]);

  useEffect(() => {
    if (!visible) return;
    redrawLayer(laserCanvasRef.current, laserStrokes);
  }, [laserStrokes, visible]);

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

  const canvasLocalPoint = useCallback(
    (
      event: PointerEvent | ReactPointerEvent,
      usePressure: boolean,
    ): Point | null => {
      const canvas = inkCanvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return null;
      // Map screen → high-res buffer pixels (natural / retina buffer).
      return {
        x: ((event.clientX - rect.left) / rect.width) * canvas.width,
        y: ((event.clientY - rect.top) / rect.height) * canvas.height,
        pressure: readPressure(event, usePressure),
      };
    },
    [],
  );

  const cssDiameterForTool = useCallback(
    (kind: StrokeKind): number => {
      if (kind === 'highlighter') return Math.max(8, penSize * 3);
      if (kind === 'laser') return Math.max(2, penSize * 0.75);
      return penSize;
    },
    [penSize],
  );

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

  const scheduleLaserExpiry = useCallback((strokeId: string) => {
    const prev = laserTimersRef.current.get(strokeId);
    if (prev) clearTimeout(prev);
    const timer = setTimeout(() => {
      laserTimersRef.current.delete(strokeId);
      setLaserStrokes((list) => list.filter((s) => s.id !== strokeId));
    }, LASER_FADE_MS);
    laserTimersRef.current.set(strokeId, timer);
  }, []);

  const beginDraw = useCallback(
    (event: ReactPointerEvent) => {
      if (
        tool !== 'pen' &&
        tool !== 'pressure' &&
        tool !== 'highlighter' &&
        tool !== 'laser' &&
        tool !== 'eraser'
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const usePressure = tool === 'pressure';
      const pt = canvasLocalPoint(event, usePressure);
      if (!pt) return;
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);

      const kind: StrokeKind =
        tool === 'eraser'
          ? 'eraser'
          : tool === 'highlighter'
            ? 'highlighter'
            : tool === 'laser'
              ? 'laser'
              : tool === 'pressure'
                ? 'pressure'
                : 'pen';

      const color =
        kind === 'laser'
          ? '#ef4444'
          : kind === 'highlighter'
            ? highlightColor
            : kind === 'eraser'
              ? 'rgba(0,0,0,1)'
              : penColor;

      // Scale brush from CSS px → high-res buffer px so strokes stay sharp when saved.
      const cssDia = cssDiameterForTool(kind);
      const diameter = Math.max(0.5, cssDia * bufferScaleRef.current);

      const stroke: Stroke = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        seq: ++strokeSeqRef.current,
        kind,
        color,
        diameter,
        points: [pt],
      };
      drawingRef.current = stroke;

      if (kind === 'highlighter') {
        drawingLayerRef.current = 'highlight';
        const ctx = highlightCanvasRef.current?.getContext('2d');
        if (ctx) drawStrokeOnCtx(ctx, stroke);
      } else if (kind === 'laser') {
        drawingLayerRef.current = 'laser';
        const ctx = laserCanvasRef.current?.getContext('2d');
        if (ctx) drawStrokeOnCtx(ctx, stroke);
        scheduleLaserExpiry(stroke.id);
      } else if (kind === 'eraser') {
        // Eraser hits ink + highlight layers.
        drawingLayerRef.current = 'ink';
        const inkCtx = inkCanvasRef.current?.getContext('2d');
        const hiCtx = highlightCanvasRef.current?.getContext('2d');
        if (inkCtx) drawStrokeOnCtx(inkCtx, stroke);
        if (hiCtx) drawStrokeOnCtx(hiCtx, stroke);
      } else {
        drawingLayerRef.current = 'ink';
        const ctx = inkCanvasRef.current?.getContext('2d');
        if (ctx) drawStrokeOnCtx(ctx, stroke);
        if (presenterRef.current && event.nativeEvent.isTrusted) {
          try {
            // Ink trail uses CSS pixels (screen), not buffer pixels.
            presenterRef.current.updateInkTrailStartPoint(event.nativeEvent, {
              color: penColor,
              diameter: Math.max(1, cssDia * (kind === 'pressure' ? pt.pressure : 1)),
            });
          } catch {
            // optional
          }
        }
      }
    },
    [
      tool,
      penColor,
      highlightColor,
      canvasLocalPoint,
      cssDiameterForTool,
      scheduleLaserExpiry,
    ],
  );

  const moveDraw = useCallback(
    (event: ReactPointerEvent) => {
      const stroke = drawingRef.current;
      if (!stroke) return;
      event.preventDefault();
      const pt = canvasLocalPoint(event, stroke.kind === 'pressure');
      if (!pt) return;
      const prev = stroke.points[stroke.points.length - 1];
      stroke.points.push(pt);

      const paintSegment = (canvas: HTMLCanvasElement | null) => {
        const ctx = canvas?.getContext('2d');
        if (!ctx || !prev) return;
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        if (stroke.kind === 'eraser') {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          ctx.lineWidth = stroke.diameter;
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = stroke.color;
          ctx.lineWidth = strokeWidth(stroke, (prev.pressure + pt.pressure) / 2);
        }
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
        ctx.restore();
      };

      if (stroke.kind === 'highlighter') {
        paintSegment(highlightCanvasRef.current);
      } else if (stroke.kind === 'laser') {
        paintSegment(laserCanvasRef.current);
        scheduleLaserExpiry(stroke.id);
      } else if (stroke.kind === 'eraser') {
        paintSegment(inkCanvasRef.current);
        paintSegment(highlightCanvasRef.current);
      } else {
        paintSegment(inkCanvasRef.current);
        if (presenterRef.current && event.nativeEvent.isTrusted) {
          try {
            const cssDia = stroke.diameter / Math.max(0.001, bufferScaleRef.current);
            presenterRef.current.updateInkTrailStartPoint(event.nativeEvent, {
              color: stroke.color,
              diameter: Math.max(
                1,
                cssDia * (stroke.kind === 'pressure' ? pt.pressure : 1),
              ),
            });
          } catch {
            // ignore
          }
        }
      }
    },
    [canvasLocalPoint, scheduleLaserExpiry],
  );

  const endDraw = useCallback(
    (event: ReactPointerEvent) => {
      const stroke = drawingRef.current;
      if (!stroke) return;
      drawingRef.current = null;
      drawingLayerRef.current = null;
      try {
        (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
      } catch {
        // ignore
      }
      if (stroke.points.length === 0) return;

      if (stroke.kind === 'laser') {
        setLaserStrokes((prev) => [...prev, { ...stroke, points: [...stroke.points] }]);
        scheduleLaserExpiry(stroke.id);
        return;
      }

      setRedoStack([]);
      const copy = { ...stroke, points: [...stroke.points] };
      if (stroke.kind === 'highlighter') {
        setHighlightStrokes((prev) => [...prev, copy]);
      } else if (stroke.kind === 'eraser') {
        // Store one eraser stroke on ink history; also apply visual already done.
        setInkStrokes((prev) => [...prev, copy]);
        setHighlightStrokes((prev) => [...prev, copy]);
      } else {
        setInkStrokes((prev) => [...prev, copy]);
      }
    },
    [scheduleLaserExpiry],
  );

  const onStagePointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (event.button === 1 || tool === 'pan') {
        beginPan(event);
        return;
      }
      beginDraw(event);
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

  const undoStrokeClean = useCallback(() => {
    const ink = inkRef.current;
    const hi = highlightRef.current;
    const lastInk = ink[ink.length - 1];
    const lastHi = hi[hi.length - 1];
    if (!lastInk && !lastHi) return;

    if (lastInk && lastHi && lastInk.id === lastHi.id && lastInk.kind === 'eraser') {
      setRedoStack((r) => [...r, { layer: 'both', stroke: lastInk }]);
      setInkStrokes(ink.slice(0, -1));
      setHighlightStrokes(hi.slice(0, -1));
      return;
    }

    const inkSeq = lastInk?.seq ?? -1;
    const hiSeq = lastHi?.seq ?? -1;
    if (inkSeq >= hiSeq && lastInk) {
      setRedoStack((r) => [...r, { layer: 'ink', stroke: lastInk }]);
      setInkStrokes(ink.slice(0, -1));
      return;
    }
    if (lastHi) {
      setRedoStack((r) => [...r, { layer: 'highlight', stroke: lastHi }]);
      setHighlightStrokes(hi.slice(0, -1));
    }
  }, []);

  const redoStroke = useCallback(() => {
    setRedoStack((stack) => {
      if (!stack.length) return stack;
      const next = stack[stack.length - 1];
      if (!next) return stack;
      if (next.layer === 'both' || next.stroke.kind === 'eraser') {
        setInkStrokes((prev) => [...prev, next.stroke]);
        setHighlightStrokes((prev) => [...prev, next.stroke]);
      } else if (next.layer === 'ink') {
        setInkStrokes((prev) => [...prev, next.stroke]);
      } else {
        setHighlightStrokes((prev) => [...prev, next.stroke]);
      }
      return stack.slice(0, -1);
    });
  }, []);

  const adjustPenSize = useCallback((direction: 1 | -1) => {
    setPenSize((s) => bumpSize(s, direction));
  }, []);

  // Non-passive wheel on brush-size control (React onWheel is often passive).
  useLayoutEffect(() => {
    if (!visible) return undefined;
    const el = sizeRangeRef.current;
    if (!el) return undefined;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      adjustPenSize(event.deltaY > 0 ? -1 : 1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [visible, adjustPenSize]);

  const runSave = useCallback(
    async (mode: HaimImageLightboxSaveMode) => {
      if (!onSaveAnnotated || !src || saving) return;
      if (inkStrokes.length === 0 && highlightStrokes.length === 0) return;
      setSaving(true);
      setSaveError(null);
      try {
        const blob = await compositeAnnotatedImageBlob({
          src,
          inkCanvas: inkCanvasRef.current,
          highlightCanvas: highlightCanvasRef.current,
        });
        const file = new File([blob], `annotated-${Date.now()}.png`, {
          type: 'image/png',
        });
        await onSaveAnnotated(mode, file);
        if (mode === 'overwrite') {
          clearAllDrawings();
        }
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : String(err));
      } finally {
        setSaving(false);
      }
    },
    [
      onSaveAnnotated,
      src,
      saving,
      inkStrokes.length,
      highlightStrokes.length,
      clearAllDrawings,
    ],
  );

  // Capture-phase shortcuts while lightbox is open (nested over editor undo).
  useEffect(() => {
    if (!visible) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const typing =
        tag === 'input' || tag === 'textarea' || target?.isContentEditable;

      const mod = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      if (mod && key === 's') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        void runSave(event.shiftKey ? 'saveAs' : 'overwrite');
        return;
      }

      if (mod && key === 'z' && !event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        undoStrokeClean();
        return;
      }
      if (mod && (key === 'y' || (key === 'z' && event.shiftKey))) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        redoStroke();
        return;
      }

      if (typing) return;

      if (event.key === '[') {
        event.preventDefault();
        event.stopPropagation();
        adjustPenSize(-1);
        return;
      }
      if (event.key === ']') {
        event.preventDefault();
        event.stopPropagation();
        adjustPenSize(1);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [visible, runSave, undoStrokeClean, redoStroke, adjustPenSize]);

  const cursorClass =
    tool === 'pan'
      ? 'cursor-grab'
      : tool === 'eraser'
        ? 'cursor-cell'
        : 'cursor-crosshair';

  const permanentCount = inkStrokes.length + highlightStrokes.length;

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
                  확대/축소, 패닝, 펜·형광펜·레이저로 그리고 저장할 수 있습니다.
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
                          ref={inkCanvasRef}
                          className="pointer-events-none absolute inset-0 h-full w-full"
                          aria-hidden
                        />
                        <canvas
                          ref={highlightCanvasRef}
                          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
                          aria-hidden
                        />
                        <canvas
                          ref={laserCanvasRef}
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
                        label="패닝"
                        active={tool === 'pan'}
                        onClick={() => setTool('pan')}
                      >
                        <Hand size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="일반 펜 (필압 없음)"
                        active={tool === 'pen'}
                        onClick={() => setTool('pen')}
                      >
                        <Pencil size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="필압 펜"
                        active={tool === 'pressure'}
                        onClick={() => setTool('pressure')}
                      >
                        <PenLine size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="형광펜 (오버레이)"
                        active={tool === 'highlighter'}
                        onClick={() => setTool('highlighter')}
                      >
                        <Highlighter size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="레이저 포인터 (4초 후 사라짐)"
                        active={tool === 'laser'}
                        onClick={() => setTool('laser')}
                      >
                        <Flame size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="지우개"
                        active={tool === 'eraser'}
                        onClick={() => setTool('eraser')}
                      >
                        <Eraser size={16} />
                      </ToolTipBtn>

                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />

                      {tool === 'highlighter'
                        ? HIGHLIGHT_COLORS.map((c) => (
                            <button
                              key={c}
                              type="button"
                              aria-label={`형광펜 색상`}
                              onClick={() => {
                                setHighlightColor(c);
                                setTool('highlighter');
                              }}
                              className={`h-6 w-6 rounded-full border-2 ${
                                highlightColor === c ? 'border-sky-400' : 'border-white/30'
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))
                        : PEN_COLORS.map((c) => (
                            <button
                              key={c}
                              type="button"
                              aria-label={`색상 ${c}`}
                              onClick={() => {
                                setPenColor(c);
                                if (tool === 'pan' || tool === 'eraser' || tool === 'laser') {
                                  setTool('pen');
                                }
                              }}
                              className={`h-6 w-6 rounded-full border-2 ${
                                penColor === c && (tool === 'pen' || tool === 'pressure')
                                  ? 'border-sky-400'
                                  : 'border-white/30'
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}

                      <label
                        ref={sizeRangeRef}
                        className="ml-1 flex items-center gap-1.5 text-[11px] text-white/80"
                      >
                        <span className="sr-only">선 굵기 ([ ] / 휠)</span>
                        <input
                          type="range"
                          min={MIN_PEN}
                          max={MAX_PEN}
                          step={0.1}
                          value={penSize}
                          onChange={(e) =>
                            setPenSize(roundSize(Number(e.target.value) || 4))
                          }
                          className="w-20 accent-sky-400"
                          aria-label="선 굵기"
                        />
                        <span className="w-8 tabular-nums">{penSize}</span>
                      </label>

                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />

                      <ToolTipBtn
                        label="실행 취소 (Ctrl+Z)"
                        disabled={permanentCount === 0}
                        onClick={undoStrokeClean}
                      >
                        <Undo2 size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="다시 실행 (Ctrl+Y)"
                        disabled={redoStack.length === 0}
                        onClick={redoStroke}
                      >
                        <Redo2 size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="그림 지우기"
                        disabled={permanentCount === 0 && laserStrokes.length === 0}
                        onClick={clearAllDrawings}
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
                          zoomAt(
                            scale / ZOOM_STEP,
                            vp.left + vp.width / 2,
                            vp.top + vp.height / 2,
                          );
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
                          zoomAt(
                            scale * ZOOM_STEP,
                            vp.left + vp.width / 2,
                            vp.top + vp.height / 2,
                          );
                        }}
                      >
                        <ZoomIn size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn label="보기 초기화" onClick={resetView}>
                        <RotateCcw size={16} />
                      </ToolTipBtn>

                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />

                      <ToolTipBtn
                        label="덮어쓰기 저장 (Ctrl+S)"
                        disabled={!canSave || saving}
                        onClick={() => void runSave('overwrite')}
                      >
                        <Save size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="다른 이름으로 저장 (Ctrl+Shift+S)"
                        disabled={!canSave || saving}
                        onClick={() => void runSave('saveAs')}
                      >
                        <CopyPlus size={16} />
                      </ToolTipBtn>
                    </div>
                    <p className="max-w-xl text-center text-[10px] text-white/55">
                      [ ] 브러시 크기 · 휠 줌 · 더블클릭 줌 · Ctrl+Z/Y 실행취소
                      {inkReady ? ' · Ink API' : ''}
                      {saving ? ' · 저장 중…' : ''}
                    </p>
                    {saveError ? (
                      <p className="max-w-xl text-center text-[10px] text-red-300">{saveError}</p>
                    ) : null}
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
