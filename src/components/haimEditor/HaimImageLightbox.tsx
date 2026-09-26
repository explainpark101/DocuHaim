import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog, Select, Tooltip } from 'radix-ui';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
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
  Circle,
  Square,
  Type,
} from 'lucide-react';
import FontFamilyInput from '@/components/FontFamilyInput';
import { getModKeyLabel } from '@/components/Kbd';
import {
  compositeAnnotatedImageBlob,
  isInkApiAvailable,
  requestInkPresenter,
  type DelegatedInkTrailPresenter,
} from '@/components/haimEditor/haimImageInk';
import {
  FONT_WEIGHT_OPTIONS,
  HIGHLIGHT_BLEND_OPTIONS,
  dashArrayFor,
  drawAnnotateTextsOnCanvas,
  lineCapFor,
  lineJoinFor,
  liveStrokeNeedsFullRepaint,
  paintAnnotateStrokeIncremental,
  paintAnnotateStrokeOnCtx,
  pointsToSvgPath,
  rasterizeHighlightLayer,
  rasterizeInkLayer,
  resolveInkBufferSize,
  sampleStampCenters,
  strokeRefDiameter,
  usesStampBrush,
  type AnnotateStroke,
  type AnnotateText,
  type BrushDash,
  type BrushShape,
  type HighlightBlendMode,
  type StrokeKind,
  type StrokePoint,
  appendSmoothedPoints,
  bufferScaleFromCss,
  clamp,
  clampStrokeDiameter,
  followPointerTip,
  stampTangentAngle,
} from '@/components/haimEditor/haimImageStrokes';
import { isHaimAnnotateUploadAvailable } from '@/utils/haimImageAnnotateUpload';
import {
  CSS_HEX_CHECKER_STYLE,
  cssHexToInputValue,
  normalizeCssHexColor,
} from '@/utils/cssColor';

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
const LASER_FADE_OUT_MS = 450;

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
  '#facc15',
  '#f472b6',
  '#38bdf8',
  '#4ade80',
  '#fb923c',
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

type Tool = 'pan' | 'pen' | 'pressure' | 'highlighter' | 'laser' | 'eraser' | 'text';

type HistoryEntry =
  | { layer: 'ink' | 'highlight' | 'both'; stroke: AnnotateStroke }
  | { layer: 'text'; text: AnnotateText };

export type HaimImageLightboxSaveMode = 'overwrite' | 'saveAs';

export type HaimImageLightboxProps = {
  src: string | null;
  alt?: string;
  open: boolean;
  onClose: () => void;
  onSaveAnnotated?: (
    mode: HaimImageLightboxSaveMode,
    file: File,
  ) => Promise<void>;
};

function roundSize(n: number): number {
  return Math.round(n * 10) / 10;
}

function sizeStep(current: number): number {
  return Math.max(0.1, roundSize(current / 10));
}

function bumpSize(current: number, direction: 1 | -1): number {
  return roundSize(clamp(current + direction * sizeStep(current), MIN_PEN, MAX_PEN));
}

const MIN_FONT_PX = 8;
const MAX_FONT_PX = 400;

function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || '';
  const ua = navigator.userAgent || '';
  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac OS/i.test(ua);
}

const IS_APPLE = isApplePlatform();
const MOD_LABEL = getModKeyLabel();
const REDO_SHORTCUT = IS_APPLE ? `${MOD_LABEL}+Shift+Z` : `${MOD_LABEL}+Y`;

function bumpFontSize(current: number, direction: 1 | -1): number {
  const step = Math.max(1, Math.round(current / 10));
  return clamp(Math.round(current + direction * step), MIN_FONT_PX, MAX_FONT_PX);
}

function readPressure(
  event: PointerEvent | ReactPointerEvent,
  usePressure: boolean,
): number {
  if (!usePressure) return 1;
  const p = event.pressure;
  if (typeof p !== 'number' || Number.isNaN(p)) return 0.5;
  if (event.pointerType === 'mouse') return 0.5;
  return clamp(p || 0.05, 0.05, 1);
}

function ToolTipBtn({
  label,
  active = false,
  disabled = false,
  tone = 'default',
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  tone?: 'default' | 'save' | 'saveAs';
  onClick: () => void;
  children: ReactNode;
}) {
  const toneClass =
    tone === 'save'
      ? 'border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40'
      : tone === 'saveAs'
        ? 'border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40'
        : active
          ? 'border-sky-400 bg-sky-500/30 text-white'
          : 'border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40';

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${toneClass}`}
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

const RAINBOW_SWATCH_STYLE = {
  backgroundImage:
    'conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)',
} as const;

function SolidLineIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 8h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DashedLineIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 8h3M7 8h3M12 8h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StrokePath({
  stroke,
  fading = false,
}: {
  stroke: AnnotateStroke;
  fading?: boolean;
}) {
  const isEraser = stroke.kind === 'eraser';
  const paint = isEraser ? '#000' : stroke.color;
  const baseOpacity = isEraser ? 1 : stroke.opacity;
  const fadeStyle = fading
    ? {
        opacity: 0,
        transition: `opacity ${LASER_FADE_OUT_MS}ms ease-out`,
      }
    : { opacity: baseOpacity };

  if (usesStampBrush(stroke)) {
    const spacing =
      Math.max(0.75, Math.min(stroke.diameterX, stroke.diameterY) * 0.4);
    const stamps = sampleStampCenters(stroke.points, spacing);
    return (
      <g style={fadeStyle}>
        {stamps.map((pt, i) => {
          const srcIdx = Math.min(
            stroke.points.length - 1,
            Math.round(
              (i / Math.max(1, stamps.length - 1)) *
                (stroke.points.length - 1),
            ),
          );
          const angleDeg =
            (stampTangentAngle(stroke.points, srcIdx) * 180) / Math.PI;
          const tipScale = stroke.kind === 'pressure' ? pt.pressure : 1;
          const hx = Math.max(0.25, (stroke.diameterX * tipScale) / 2);
          const hy = Math.max(0.25, (stroke.diameterY * tipScale) / 2);
          if (stroke.shape === 'square') {
            return (
              <rect
                key={`${stroke.id}-st-${i}`}
                x={-hx}
                y={-hy}
                width={hx * 2}
                height={hy * 2}
                fill={paint}
                transform={`translate(${pt.x} ${pt.y}) rotate(${angleDeg})`}
              />
            );
          }
          return (
            <ellipse
              key={`${stroke.id}-st-${i}`}
              cx={0}
              cy={0}
              rx={hx}
              ry={hy}
              fill={paint}
              transform={`translate(${pt.x} ${pt.y}) rotate(${angleDeg})`}
            />
          );
        })}
      </g>
    );
  }

  const refD = strokeRefDiameter(stroke);

  if (stroke.kind === 'pressure' && stroke.points.length >= 2) {
    return (
      <g style={fadeStyle}>
        {stroke.points.slice(1).map((b, i) => {
          const a = stroke.points[i]!;
          const w = Math.max(0.5, refD * ((a.pressure + b.pressure) / 2));
          return (
            <path
              key={`${stroke.id}-p-${i}`}
              d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              fill="none"
              stroke={paint}
              strokeWidth={w}
              strokeLinecap={lineCapFor(stroke.shape)}
              strokeLinejoin={lineJoinFor(stroke.shape)}
              strokeDasharray={dashArrayFor({
                ...stroke,
                diameterX: w,
                diameterY: w,
              })}
            />
          );
        })}
      </g>
    );
  }

  const d = pointsToSvgPath(stroke.points);
  if (!d) return null;
  return (
    <path
      d={d}
      fill="none"
      stroke={paint}
      strokeWidth={refD}
      strokeLinecap={lineCapFor(stroke.shape)}
      strokeLinejoin={lineJoinFor(stroke.shape)}
      strokeDasharray={dashArrayFor(stroke)}
      style={fadeStyle}
    />
  );
}

/**
 * Fullscreen enlarge viewer: vector ink, wheel zoom, brush cursor, annotate save.
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
  const [penColor, setPenColor] = useState<string>('#111827ff');
  const [highlightColor, setHighlightColor] = useState<string>('#facc15ff');
  const [penSizeW, setPenSizeW] = useState(4);
  const [penSizeH, setPenSizeH] = useState(4);
  const [penOpacity, setPenOpacity] = useState(1);
  const [highlightOpacity, setHighlightOpacity] = useState(0.45);
  const [highlightBlend, setHighlightBlend] =
    useState<HighlightBlendMode>('multiply');
  const [brushShape, setBrushShape] = useState<BrushShape>('circle');
  const [brushDash, setBrushDash] = useState<BrushDash>('solid');
  const [inkStrokes, setInkStrokes] = useState<AnnotateStroke[]>([]);
  const [highlightStrokes, setHighlightStrokes] = useState<AnnotateStroke[]>([]);
  const [laserStrokes, setLaserStrokes] = useState<AnnotateStroke[]>([]);
  const [textObjects, setTextObjects] = useState<AnnotateText[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  /** Actively editing in a textarea (subset of selected). */
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [textFontFamily, setTextFontFamily] = useState('Paperozi, sans-serif');
  const [textFontSizePx, setTextFontSizePx] = useState(24);
  const [textFontWeight, setTextFontWeight] = useState('400');
  const [textFontStyle, setTextFontStyle] = useState<'normal' | 'italic'>('normal');
  const [fadingLaserIds, setFadingLaserIds] = useState<Set<string>>(() => new Set());
  /** Eraser-only React live preview (needs SVG masks). Other tools use live canvas. */
  const [liveEraserStroke, setLiveEraserStroke] = useState<AnnotateStroke | null>(
    null,
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [redoStack, setRedoStack] = useState<HistoryEntry[]>([]);
  const [bufSize, setBufSize] = useState({ w: 1, h: 1 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [inkReady, setInkReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [paletteExpanded, setPaletteExpanded] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const stageHitRef = useRef<HTMLDivElement | null>(null);
  const presenterRef = useRef<DelegatedInkTrailPresenter | null>(null);
  const inkRef = useRef<AnnotateStroke[]>([]);
  const highlightRef = useRef<AnnotateStroke[]>([]);
  const textsRef = useRef<AnnotateText[]>([]);
  const drawingRef = useRef<AnnotateStroke | null>(null);
  const strokeTipRef = useRef<StrokePoint | null>(null);
  const liveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const livePaintedLenRef = useRef(0);
  const liveRafRef = useRef<number | null>(null);
  const cursorRafRef = useRef<number | null>(null);
  const cursorSmoothRef = useRef<{ x: number; y: number } | null>(null);
  const textDragRef = useRef<{
    id: string;
    pointerId: number;
    startClientX: number;
    startClientY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const textEditRef = useRef<HTMLTextAreaElement | null>(null);
  const panDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const bufferScaleRef = useRef(1);
  const scaleRef = useRef(scale);
  const strokeSeqRef = useRef(0);
  const laserTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  /** Texts removed via Del/Backspace — restored by undo before stroke undo. */
  const deletedTextUndoRef = useRef<AnnotateText[]>([]);
  const wheelCleanupRef = useRef<(() => void) | null>(null);

  inkRef.current = inkStrokes;
  highlightRef.current = highlightStrokes;
  textsRef.current = textObjects;
  scaleRef.current = scale;

  const canSave =
    Boolean(onSaveAnnotated) &&
    isHaimAnnotateUploadAvailable() &&
    (inkStrokes.length > 0 ||
      highlightStrokes.length > 0 ||
      textObjects.some((t) => t.text.trim().length > 0));

  const selectedText =
    textObjects.find((t) => t.id === selectedTextId) ?? null;

  const activeColor = tool === 'highlighter' ? highlightColor : penColor;
  const activeOpacity = tool === 'highlighter' ? highlightOpacity : penOpacity;

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
    setTextObjects([]);
    setSelectedTextId(null);
    setEditingTextId(null);
    setFadingLaserIds(new Set());
    setRedoStack([]);
    deletedTextUndoRef.current = [];
    setLiveEraserStroke(null);
    setIsDrawing(false);
    drawingRef.current = null;
    strokeTipRef.current = null;
    livePaintedLenRef.current = 0;
    const liveCtx = liveCtxRef.current;
    const liveCanvas = liveCanvasRef.current;
    if (liveCtx && liveCanvas) {
      liveCtx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);
    }
    if (liveRafRef.current != null) {
      cancelAnimationFrame(liveRafRef.current);
      liveRafRef.current = null;
    }
    textDragRef.current = null;
    clearLaserTimers();
  }, [clearLaserTimers]);

  const prevVisibleRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      prevVisibleRef.current = false;
      return;
    }
    const justOpened = !prevVisibleRef.current;
    prevVisibleRef.current = true;
    // Keep strokes/tool when src refreshes after save; only reset on open.
    if (!justOpened) return;
    resetView();
    clearAllDrawings();
    setTool('pan');
    setSaveError(null);
    setCursorPos(null);
  }, [visible, src, resetView, clearAllDrawings]);

  useEffect(() => {
    if (visible) return;
    clearLaserTimers();
    wheelCleanupRef.current?.();
    wheelCleanupRef.current = null;
  }, [visible, clearLaserTimers]);

  const syncBufferSize = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const { bufW, bufH, cssW } = resolveInkBufferSize(img);
    // Skip bogus layouts (hidden / not measured) so scale does not explode.
    if (cssW < 8 || img.clientHeight < 8) return;
    bufferScaleRef.current = bufferScaleFromCss(bufW, cssW);
    setBufSize({ w: bufW, h: bufH });
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    syncBufferSize();
    const img = imgRef.current;
    if (!img) return undefined;
    const onLoad = () => syncBufferSize();
    img.addEventListener('load', onLoad);
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(syncBufferSize)
        : null;
    ro?.observe(img);
    window.addEventListener('resize', syncBufferSize);
    return () => {
      img.removeEventListener('load', onLoad);
      ro?.disconnect();
      window.removeEventListener('resize', syncBufferSize);
    };
  }, [visible, src, syncBufferSize]);

  useEffect(() => {
    if (!visible) {
      presenterRef.current = null;
      setInkReady(false);
      return undefined;
    }
    let cancelled = false;
    const area = stageHitRef.current;
    if (!area || !isInkApiAvailable()) {
      setInkReady(false);
      return undefined;
    }
    void requestInkPresenter(area).then((presenter) => {
      if (cancelled) return;
      presenterRef.current = presenter;
      setInkReady(Boolean(presenter));
    });
    return () => {
      cancelled = true;
      presenterRef.current = null;
    };
  }, [visible, src, bufSize.w]);

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

  /** Callback ref so wheel binds after Dialog portal mounts (fixes missed zoom). */
  const setViewportNode = useCallback(
    (node: HTMLDivElement | null) => {
      wheelCleanupRef.current?.();
      wheelCleanupRef.current = null;
      viewportRef.current = node;
      if (!node) return;
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const direction = event.deltaY > 0 ? 1 / ZOOM_STEP : ZOOM_STEP;
        zoomAt(scaleRef.current * direction, event.clientX, event.clientY);
      };
      node.addEventListener('wheel', onWheel, { passive: false, capture: true });
      wheelCleanupRef.current = () => {
        node.removeEventListener('wheel', onWheel, true);
      };
    },
    [zoomAt],
  );

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

  const bufferPoint = useCallback(
    (
      event: PointerEvent | ReactPointerEvent,
      usePressure: boolean,
    ): StrokePoint | null => {
      const hit = stageHitRef.current;
      if (!hit) return null;
      const rect = hit.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return null;
      return {
        x: ((event.clientX - rect.left) / rect.width) * bufSize.w,
        y: ((event.clientY - rect.top) / rect.height) * bufSize.h,
        pressure: readPressure(event, usePressure),
      };
    },
    [bufSize.w, bufSize.h],
  );

  const cssBrushForTool = useCallback(
    (kind: StrokeKind): { w: number; h: number } => {
      // Highlighter W/H are already tip sizes in CSS px — do not multiply
      // (old ×3 made stamps flood the trajectory bounding box).
      const scaleFor = kind === 'laser' ? 0.75 : 1;
      const minAxis = kind === 'highlighter' ? 4 : kind === 'laser' ? 2 : MIN_PEN;
      if (kind === 'highlighter') {
        return {
          w: Math.max(minAxis, penSizeW * scaleFor),
          h: Math.max(minAxis, penSizeH * scaleFor),
        };
      }
      // Pens / pressure / laser / eraser: square aspect (1:1).
      const s = Math.max(minAxis, penSizeW * scaleFor);
      return { w: s, h: s };
    },
    [penSizeW, penSizeH],
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
      (event.currentTarget as HTMLElement).releasePointerCapture?.(
        event.pointerId,
      );
    } catch {
      // ignore
    }
  }, []);

  const scheduleLaserExpiry = useCallback((strokeId: string) => {
    const prev = laserTimersRef.current.get(strokeId);
    if (prev) clearTimeout(prev);
    const timer = setTimeout(() => {
      setFadingLaserIds((s) => {
        const next = new Set(s);
        next.add(strokeId);
        return next;
      });
      const removeTimer = setTimeout(() => {
        laserTimersRef.current.delete(strokeId);
        setFadingLaserIds((s) => {
          const next = new Set(s);
          next.delete(strokeId);
          return next;
        });
        setLaserStrokes((list) => list.filter((st) => st.id !== strokeId));
      }, LASER_FADE_OUT_MS);
      laserTimersRef.current.set(strokeId, removeTimer);
    }, LASER_FADE_MS);
    laserTimersRef.current.set(strokeId, timer);
  }, []);

  const ensureLiveCtx = useCallback((): CanvasRenderingContext2D | null => {
    const canvas = liveCanvasRef.current;
    if (!canvas) return null;
    if (
      canvas.width !== bufSize.w ||
      canvas.height !== bufSize.h
    ) {
      canvas.width = Math.max(1, bufSize.w);
      canvas.height = Math.max(1, bufSize.h);
      liveCtxRef.current = null;
      livePaintedLenRef.current = 0;
    }
    if (!liveCtxRef.current) {
      liveCtxRef.current = canvas.getContext('2d', { alpha: true });
      if (liveCtxRef.current) {
        liveCtxRef.current.imageSmoothingEnabled = true;
        liveCtxRef.current.imageSmoothingQuality = 'high';
      }
    }
    return liveCtxRef.current;
  }, [bufSize.w, bufSize.h]);

  const clearLiveCanvas = useCallback(() => {
    const canvas = liveCanvasRef.current;
    const ctx = liveCtxRef.current ?? canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    livePaintedLenRef.current = 0;
  }, []);

  /** Paint live stroke on canvas — no React re-render (main latency win). */
  const paintLiveCanvas = useCallback(() => {
    const stroke = drawingRef.current;
    if (!stroke || stroke.kind === 'eraser') return;
    const ctx = ensureLiveCtx();
    const canvas = liveCanvasRef.current;
    if (!ctx || !canvas) return;

    if (
      liveStrokeNeedsFullRepaint(stroke) ||
      livePaintedLenRef.current === 0
    ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.fillStyle = stroke.color;
      paintAnnotateStrokeOnCtx(ctx, stroke);
      ctx.restore();
      livePaintedLenRef.current = stroke.points.length;
      return;
    }

    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    livePaintedLenRef.current = paintAnnotateStrokeIncremental(
      ctx,
      stroke,
      livePaintedLenRef.current,
    );
    ctx.restore();
  }, [ensureLiveCtx]);

  const flushLiveEraser = useCallback(() => {
    if (liveRafRef.current != null) return;
    liveRafRef.current = requestAnimationFrame(() => {
      liveRafRef.current = null;
      const stroke = drawingRef.current;
      if (!stroke || stroke.kind !== 'eraser') {
        setLiveEraserStroke(null);
        return;
      }
      setLiveEraserStroke({ ...stroke, points: stroke.points.slice() });
    });
  }, []);

  const collectRawPoints = useCallback(
    (
      event: ReactPointerEvent,
      usePressure: boolean,
    ): StrokePoint[] => {
      const native = event.nativeEvent;
      const coalesced =
        typeof native.getCoalescedEvents === 'function'
          ? native.getCoalescedEvents()
          : [];
      const sources = coalesced.length > 0 ? coalesced : [native];
      const out: StrokePoint[] = [];
      for (const ev of sources) {
        const pt = bufferPoint(ev, usePressure);
        if (pt) out.push(pt);
      }
      if (out.length === 0) {
        const fallback = bufferPoint(event, usePressure);
        if (fallback) out.push(fallback);
      }
      return out;
    },
    [bufferPoint],
  );

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
      const raws = collectRawPoints(event, usePressure);
      const pt = raws[raws.length - 1];
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
              ? '#000000'
              : penColor;

      const cssBrush = cssBrushForTool(kind);
      const liveScale = clamp(bufferScaleRef.current, 0.25, 12);
      const diameterX = clampStrokeDiameter(
        Math.max(0.5, cssBrush.w * liveScale),
        bufSize.w,
        bufSize.h,
      );
      const diameterY = clampStrokeDiameter(
        Math.max(0.5, cssBrush.h * liveScale),
        bufSize.w,
        bufSize.h,
      );
      const opacity =
        kind === 'eraser'
          ? 1
          : kind === 'laser'
            ? 0.9
            : kind === 'highlighter'
              ? highlightOpacity
              : penOpacity;

      const stroke: AnnotateStroke = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        seq: ++strokeSeqRef.current,
        kind,
        color,
        diameterX,
        diameterY,
        points: [pt],
        shape: brushShape,
        dash: brushDash,
        opacity,
        ...(kind === 'highlighter' ? { blend: highlightBlend } : {}),
      };
      drawingRef.current = stroke;
      strokeTipRef.current = { ...pt };
      setIsDrawing(true);
      livePaintedLenRef.current = 0;

      if (kind === 'eraser') {
        clearLiveCanvas();
        setLiveEraserStroke({ ...stroke, points: [...stroke.points] });
      } else {
        setLiveEraserStroke(null);
        clearLiveCanvas();
        // Sync paint first point immediately.
        const ctx = ensureLiveCtx();
        if (ctx && liveCanvasRef.current) {
          ctx.clearRect(0, 0, liveCanvasRef.current.width, liveCanvasRef.current.height);
          ctx.save();
          ctx.strokeStyle = stroke.color;
          ctx.fillStyle = stroke.color;
          paintAnnotateStrokeOnCtx(ctx, stroke);
          ctx.restore();
          livePaintedLenRef.current = stroke.points.length;
        }
      }

      if (kind === 'laser') scheduleLaserExpiry(stroke.id);

      if (
        (kind === 'pen' || kind === 'pressure') &&
        presenterRef.current &&
        event.nativeEvent.isTrusted
      ) {
        try {
          const trailDia = Math.max(cssBrush.w, cssBrush.h);
          presenterRef.current.updateInkTrailStartPoint(event.nativeEvent, {
            color: penColor,
            diameter: Math.max(
              1,
              trailDia * (kind === 'pressure' ? pt.pressure : 1),
            ),
          });
        } catch {
          // optional
        }
      }
    },
    [
      tool,
      penColor,
      highlightColor,
      highlightOpacity,
      penOpacity,
      highlightBlend,
      brushShape,
      brushDash,
      collectRawPoints,
      cssBrushForTool,
      scheduleLaserExpiry,
      clearLiveCanvas,
      ensureLiveCtx,
    ],
  );

  const moveDraw = useCallback(
    (event: ReactPointerEvent) => {
      const stroke = drawingRef.current;
      if (!stroke) return;
      event.preventDefault();
      const usePressure = stroke.kind === 'pressure';
      const raws = collectRawPoints(event, usePressure);
      if (!raws.length) return;

      const tip = strokeTipRef.current ?? stroke.points[stroke.points.length - 1];
      if (!tip) return;
      strokeTipRef.current = appendSmoothedPoints(stroke.points, tip, raws);

      if (stroke.kind === 'eraser') {
        flushLiveEraser();
      } else {
        // Paint synchronously for lowest input→pixel latency.
        paintLiveCanvas();
      }

      if (stroke.kind === 'laser') scheduleLaserExpiry(stroke.id);

      if (
        (stroke.kind === 'pen' || stroke.kind === 'pressure') &&
        presenterRef.current &&
        event.nativeEvent.isTrusted
      ) {
        try {
          const last = strokeTipRef.current;
          const refBuf = strokeRefDiameter(stroke);
          const cssDia = refBuf / Math.max(0.001, bufferScaleRef.current);
          presenterRef.current.updateInkTrailStartPoint(event.nativeEvent, {
            color: stroke.color,
            diameter: Math.max(
              1,
              cssDia * (stroke.kind === 'pressure' ? last?.pressure ?? 1 : 1),
            ),
          });
        } catch {
          // ignore
        }
      }
    },
    [
      collectRawPoints,
      flushLiveEraser,
      paintLiveCanvas,
      scheduleLaserExpiry,
    ],
  );

  const endDraw = useCallback(
    (event: ReactPointerEvent) => {
      const stroke = drawingRef.current;
      if (!stroke) return;

      // Snap tip to final pointer so the stroke lands on the cursor.
      const usePressure = stroke.kind === 'pressure';
      const raws = collectRawPoints(event, usePressure);
      const lastRaw = raws[raws.length - 1];
      if (lastRaw && strokeTipRef.current) {
        const snapped = followPointerTip(strokeTipRef.current, lastRaw, 1);
        const last = stroke.points[stroke.points.length - 1];
        if (
          !last ||
          last.x !== snapped.x ||
          last.y !== snapped.y
        ) {
          stroke.points.push(snapped);
        } else {
          last.pressure = snapped.pressure;
        }
        strokeTipRef.current = snapped;
      }

      // Final live paint includes snap before we hand off to SVG.
      if (stroke.kind !== 'eraser') {
        paintLiveCanvas();
      }

      drawingRef.current = null;
      strokeTipRef.current = null;
      if (liveRafRef.current != null) {
        cancelAnimationFrame(liveRafRef.current);
        liveRafRef.current = null;
      }
      setLiveEraserStroke(null);
      setIsDrawing(false);
      try {
        (event.currentTarget as HTMLElement).releasePointerCapture?.(
          event.pointerId,
        );
      } catch {
        // ignore
      }
      if (stroke.points.length === 0) {
        clearLiveCanvas();
        return;
      }
      const copy = { ...stroke, points: [...stroke.points] };

      if (stroke.kind === 'laser') {
        setLaserStrokes((prev) => [...prev, copy]);
        scheduleLaserExpiry(stroke.id);
        // Keep canvas until SVG commits to avoid a blank frame.
        requestAnimationFrame(() => clearLiveCanvas());
        return;
      }

      setRedoStack([]);
      if (stroke.kind === 'highlighter') {
        setHighlightStrokes((prev) => [...prev, copy]);
      } else if (stroke.kind === 'eraser') {
        setInkStrokes((prev) => [...prev, copy]);
        setHighlightStrokes((prev) => [...prev, copy]);
        clearLiveCanvas();
        return;
      } else {
        setInkStrokes((prev) => [...prev, copy]);
      }
      requestAnimationFrame(() => clearLiveCanvas());
    },
    [
      collectRawPoints,
      scheduleLaserExpiry,
      clearLiveCanvas,
      paintLiveCanvas,
    ],
  );

  const updateSelectedText = useCallback(
    (patch: Partial<AnnotateText>) => {
      if (!selectedTextId) return;
      setTextObjects((list) =>
        list.map((t) => (t.id === selectedTextId ? { ...t, ...patch } : t)),
      );
    },
    [selectedTextId],
  );

  const placeOrSelectText = useCallback(
    (event: ReactPointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const pt = bufferPoint(event, false);
      if (!pt) return;

      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const next: AnnotateText = {
        id,
        seq: ++strokeSeqRef.current,
        x: pt.x,
        y: pt.y,
        text: '',
        color: penColor,
        opacity: penOpacity,
        fontSizePx: textFontSizePx,
        fontFamily: textFontFamily,
        fontWeight: textFontWeight,
        fontStyle: textFontStyle,
      };
      setRedoStack([]);
      setTextObjects((prev) => [...prev, next]);
      setSelectedTextId(id);
      setEditingTextId(id);
      window.setTimeout(() => textEditRef.current?.focus(), 30);
    },
    [
      bufferPoint,
      penColor,
      penOpacity,
      textFontSizePx,
      textFontFamily,
      textFontWeight,
      textFontStyle,
    ],
  );

  const onStagePointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (event.button === 1 || tool === 'pan') {
        beginPan(event);
        return;
      }
      if (tool === 'text') {
        // Empty canvas click → finish current edit, then place new text.
        setEditingTextId(null);
        placeOrSelectText(event);
        return;
      }
      setSelectedTextId(null);
      setEditingTextId(null);
      beginDraw(event);
    },
    [tool, beginPan, beginDraw, placeOrSelectText],
  );

  const onStagePointerMove = useCallback(
    (event: ReactPointerEvent) => {
      // Skip brush-cursor React updates while drawing (cursor is hidden anyway).
      if (!drawingRef.current) {
        const rawCursor = { x: event.clientX, y: event.clientY };
        const prev = cursorSmoothRef.current;
        if (!prev) {
          cursorSmoothRef.current = rawCursor;
          setCursorPos(rawCursor);
        } else {
          // Snappier cursor follow when idle.
          cursorSmoothRef.current = {
            x: prev.x + (rawCursor.x - prev.x) * 0.72,
            y: prev.y + (rawCursor.y - prev.y) * 0.72,
          };
          if (cursorRafRef.current == null) {
            cursorRafRef.current = requestAnimationFrame(() => {
              cursorRafRef.current = null;
              if (cursorSmoothRef.current) {
                setCursorPos({ ...cursorSmoothRef.current });
              }
            });
          }
        }
      }

      const drag = textDragRef.current;
      if (drag && drag.pointerId === event.pointerId) {
        event.preventDefault();
        const hit = stageHitRef.current;
        if (!hit) return;
        const rect = hit.getBoundingClientRect();
        const dx =
          ((event.clientX - drag.startClientX) / Math.max(1, rect.width)) *
          bufSize.w;
        const dy =
          ((event.clientY - drag.startClientY) / Math.max(1, rect.height)) *
          bufSize.h;
        setTextObjects((list) =>
          list.map((t) =>
            t.id === drag.id
              ? { ...t, x: drag.originX + dx, y: drag.originY + dy }
              : t,
          ),
        );
        return;
      }
      if (panDragRef.current) {
        movePan(event);
        return;
      }
      if (drawingRef.current) moveDraw(event);
    },
    [movePan, moveDraw, bufSize.w, bufSize.h],
  );

  const onStagePointerUp = useCallback(
    (event: ReactPointerEvent) => {
      if (textDragRef.current?.pointerId === event.pointerId) {
        textDragRef.current = null;
        try {
          (event.currentTarget as HTMLElement).releasePointerCapture?.(
            event.pointerId,
          );
        } catch {
          // ignore
        }
      }
      if (panDragRef.current) endPan(event);
      if (drawingRef.current) endDraw(event);
    },
    [endPan, endDraw],
  );

  const finishTextEditing = useCallback(() => {
    const id = editingTextId ?? selectedTextId;
    try {
      textEditRef.current?.blur();
    } catch {
      // ignore
    }
    if (id) {
      const t = textsRef.current.find((x) => x.id === id);
      if (t && !t.text.trim()) {
        setTextObjects((list) => list.filter((x) => x.id !== id));
        setSelectedTextId(null);
      }
    }
    // Leave object selected (completed look) unless it was removed as empty.
    setEditingTextId(null);
  }, [editingTextId, selectedTextId]);

  const deleteSelectedText = useCallback(() => {
    const id = selectedTextId;
    if (!id) return;
    const t = textsRef.current.find((x) => x.id === id);
    if (!t) return;
    deletedTextUndoRef.current.push({ ...t });
    setRedoStack([]);
    setTextObjects((list) => list.filter((x) => x.id !== id));
    setSelectedTextId(null);
    setEditingTextId(null);
  }, [selectedTextId]);

  const undoStrokeClean = useCallback(() => {
    const restored = deletedTextUndoRef.current.pop();
    if (restored) {
      setTextObjects((prev) => [...prev, restored]);
      setSelectedTextId(restored.id);
      setEditingTextId(null);
      return;
    }

    const ink = inkRef.current;
    const hi = highlightRef.current;
    const texts = textsRef.current;
    const lastInk = ink[ink.length - 1];
    const lastHi = hi[hi.length - 1];
    const lastText = texts[texts.length - 1];
    const inkSeq = lastInk?.seq ?? -1;
    const hiSeq = lastHi?.seq ?? -1;
    const textSeq = lastText?.seq ?? -1;
    const maxSeq = Math.max(inkSeq, hiSeq, textSeq);
    if (maxSeq < 0) return;

    if (textSeq === maxSeq && lastText) {
      setRedoStack((r) => [...r, { layer: 'text', text: lastText }]);
      setTextObjects(texts.slice(0, -1));
      setSelectedTextId((id) => (id === lastText.id ? null : id));
      return;
    }

    if (
      lastInk &&
      lastHi &&
      lastInk.id === lastHi.id &&
      lastInk.kind === 'eraser' &&
      lastInk.seq === maxSeq
    ) {
      setRedoStack((r) => [...r, { layer: 'both', stroke: lastInk }]);
      setInkStrokes(ink.slice(0, -1));
      setHighlightStrokes(hi.slice(0, -1));
      return;
    }

    if (inkSeq >= hiSeq && lastInk && inkSeq === maxSeq) {
      setRedoStack((r) => [...r, { layer: 'ink', stroke: lastInk }]);
      setInkStrokes(ink.slice(0, -1));
      return;
    }
    if (lastHi && hiSeq === maxSeq) {
      setRedoStack((r) => [...r, { layer: 'highlight', stroke: lastHi }]);
      setHighlightStrokes(hi.slice(0, -1));
    }
  }, []);

  const redoStroke = useCallback(() => {
    setRedoStack((stack) => {
      if (!stack.length) return stack;
      const next = stack[stack.length - 1];
      if (!next) return stack;
      if (next.layer === 'text') {
        setTextObjects((prev) => [...prev, next.text]);
      } else if (next.layer === 'both' || next.stroke.kind === 'eraser') {
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
    setPenSizeW((s) => bumpSize(s, direction));
    setPenSizeH((s) => bumpSize(s, direction));
  }, []);

  const adjustTextFontSize = useCallback(
    (direction: 1 | -1) => {
      const id = selectedTextId;
      const current =
        (id
          ? textsRef.current.find((t) => t.id === id)?.fontSizePx
          : null) ?? textFontSizePx;
      const next = bumpFontSize(current, direction);
      setTextFontSizePx(next);
      if (id) {
        setTextObjects((list) =>
          list.map((t) => (t.id === id ? { ...t, fontSizePx: next } : t)),
        );
      }
    },
    [selectedTextId, textFontSizePx],
  );

  const setUniformPenSize = useCallback((n: number) => {
    const v = roundSize(clamp(n, MIN_PEN, MAX_PEN));
    setPenSizeW(v);
    setPenSizeH(v);
  }, []);

  const selectHighlighter = useCallback(() => {
    setTool('highlighter');
    setBrushDash('solid');
    setBrushShape('square');
  }, []);

  const runSave = useCallback(
    async (mode: HaimImageLightboxSaveMode) => {
      if (!onSaveAnnotated || !src || saving) return;
      const hasText = textObjects.some((t) => t.text.trim().length > 0);
      if (inkStrokes.length === 0 && highlightStrokes.length === 0 && !hasText) {
        return;
      }
      setSaving(true);
      setSaveError(null);
      try {
        const inkCanvas = rasterizeInkLayer(bufSize.w, bufSize.h, inkStrokes);
        const inkCtx = inkCanvas.getContext('2d');
        if (inkCtx) {
          drawAnnotateTextsOnCanvas(
            inkCtx,
            textObjects,
            bufferScaleRef.current,
          );
        }
        const highlightCanvas = rasterizeHighlightLayer(
          bufSize.w,
          bufSize.h,
          highlightStrokes,
        );
        const blob = await compositeAnnotatedImageBlob({
          src,
          inkCanvas,
          highlightCanvas,
        });
        const file = new File([blob], `annotated-${Date.now()}.png`, {
          type: 'image/png',
        });
        await onSaveAnnotated(mode, file);
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
      inkStrokes,
      highlightStrokes,
      textObjects,
      bufSize.w,
      bufSize.h,
    ],
  );

  useEffect(() => {
    if (!visible) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const typing =
        tag === 'input' || tag === 'textarea' || target?.isContentEditable;

      const mod = IS_APPLE ? event.metaKey : event.ctrlKey;
      const key = event.key.toLowerCase();
      const code = event.code;

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

      const textFontTarget = Boolean(selectedTextId) || tool === 'text';
      const fontDec =
        mod &&
        ((event.shiftKey &&
          (event.key === '<' ||
            event.key === ',' ||
            code === 'Comma')) ||
          (!event.shiftKey &&
            (event.key === '[' || code === 'BracketLeft')));
      const fontInc =
        mod &&
        ((event.shiftKey &&
          (event.key === '>' ||
            event.key === '.' ||
            code === 'Period')) ||
          (!event.shiftKey &&
            (event.key === ']' || code === 'BracketRight')));

      if (textFontTarget && (fontDec || fontInc)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        adjustTextFontSize(fontDec ? -1 : 1);
        return;
      }

      // Text mode / selected or editing: Esc commits edit (do not close lightbox).
      if (
        event.key === 'Escape' &&
        (tool === 'text' || selectedTextId || editingTextId)
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (editingTextId) {
          finishTextEditing();
        } else {
          setSelectedTextId(null);
        }
        return;
      }

      // Selected text (not typing chars): Del / Backspace removes the object.
      if (
        selectedTextId &&
        !mod &&
        (key === 'backspace' || key === 'delete')
      ) {
        // While caret-editing with content, let the textarea handle the key.
        if (editingTextId && typing && tag === 'textarea') {
          const ta = target as HTMLTextAreaElement;
          if (ta.value.length > 0) return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        deleteSelectedText();
        return;
      }

      if (typing) return;
      if (!mod && event.key === '[') {
        event.preventDefault();
        event.stopPropagation();
        adjustPenSize(-1);
        return;
      }
      if (!mod && event.key === ']') {
        event.preventDefault();
        event.stopPropagation();
        adjustPenSize(1);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [
    visible,
    runSave,
    undoStrokeClean,
    redoStroke,
    adjustPenSize,
    adjustTextFontSize,
    selectedTextId,
    editingTextId,
    tool,
    finishTextEditing,
    deleteSelectedText,
  ]);

  const showBrushCursor =
    tool !== 'pan' &&
    tool !== 'text' &&
    cursorPos != null &&
    !panDragRef.current &&
    !isDrawing;
  const brushCss = cssBrushForTool(
    tool === 'eraser'
      ? 'eraser'
      : tool === 'highlighter'
        ? 'highlighter'
        : tool === 'laser'
          ? 'laser'
          : tool === 'pressure'
            ? 'pressure'
            : 'pen',
  );
  const brushScreenW = Math.max(4, brushCss.w * scale);
  const brushScreenH = Math.max(4, brushCss.h * scale);

  const inkErasers = inkStrokes.filter((s) => s.kind === 'eraser');
  const inkDraw = inkStrokes.filter((s) => s.kind !== 'eraser');
  const hiErasers = highlightStrokes.filter((s) => s.kind === 'eraser');
  const hiDraw = highlightStrokes.filter((s) => s.kind !== 'eraser');

  const liveCanvasStyle: CSSProperties =
    isDrawing && tool === 'highlighter'
      ? { mixBlendMode: highlightBlend }
      : {};

  const permanentCount =
    inkStrokes.length + highlightStrokes.length + textObjects.length;
  const colorHex = cssHexToInputValue(
    normalizeCssHexColor(activeColor) || '#111827ff',
  );

  const selectTriggerClass =
    'inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20';
  const selectContentClass =
    'z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow';
  const [selectPortalEl, setSelectPortalEl] = useState<HTMLElement | null>(
    null,
  );

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
              onEscapeKeyDown={(e) => {
                if (tool === 'text' || selectedTextId || editingTextId) {
                  e.preventDefault();
                  if (editingTextId) finishTextEditing();
                  else setSelectedTextId(null);
                  return;
                }
                onClose();
              }}
            >
              <Motion.div
                ref={setSelectPortalEl}
                className="fixed inset-0 z-100061 flex flex-col outline-none"
                aria-label="이미지 크게 보기"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={PANEL_TRANSITION}
              >
                <Dialog.Title className="sr-only">이미지 크게 보기</Dialog.Title>
                <Dialog.Description className="sr-only">
                  벡터 펜으로 그리고 확대/축소·저장할 수 있습니다.
                </Dialog.Description>

                <div
                  ref={setViewportNode}
                  className={`relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${
                    tool === 'pan'
                      ? 'cursor-grab'
                      : tool === 'text'
                        ? 'cursor-text'
                        : 'cursor-none'
                  }`}
                  onPointerDown={onStagePointerDown}
                  onPointerMove={onStagePointerMove}
                  onPointerUp={onStagePointerUp}
                  onPointerCancel={onStagePointerUp}
                  onPointerLeave={() => {
                    setCursorPos(null);
                    cursorSmoothRef.current = null;
                  }}
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
                        ref={stageHitRef}
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
                        <svg
                          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                          viewBox={`0 0 ${bufSize.w} ${bufSize.h}`}
                          preserveAspectRatio="none"
                          aria-hidden
                        >
                          <defs>
                            <mask id="haim-ink-erase-mask">
                              <rect
                                x="0"
                                y="0"
                                width={bufSize.w}
                                height={bufSize.h}
                                fill="#fff"
                              />
                              {inkErasers.map((s) => (
                                <StrokePath key={`em-${s.id}`} stroke={s} />
                              ))}
                              {liveEraserStroke ? (
                                <StrokePath stroke={liveEraserStroke} />
                              ) : null}
                            </mask>
                            <mask id="haim-hi-erase-mask">
                              <rect
                                x="0"
                                y="0"
                                width={bufSize.w}
                                height={bufSize.h}
                                fill="#fff"
                              />
                              {hiErasers.map((s) => (
                                <StrokePath key={`hem-${s.id}`} stroke={s} />
                              ))}
                              {liveEraserStroke ? (
                                <StrokePath stroke={liveEraserStroke} />
                              ) : null}
                            </mask>
                          </defs>

                          <g mask="url(#haim-ink-erase-mask)">
                            {inkDraw.map((s) => (
                              <StrokePath key={s.id} stroke={s} />
                            ))}
                          </g>

                          <g
                            mask="url(#haim-hi-erase-mask)"
                            style={{ mixBlendMode: highlightBlend }}
                          >
                            {hiDraw.map((s) => (
                              <g
                                key={s.id}
                                style={{
                                  mixBlendMode: s.blend || highlightBlend,
                                }}
                              >
                                <StrokePath stroke={s} />
                              </g>
                            ))}
                          </g>

                          <g>
                            {laserStrokes.map((s) => (
                              <StrokePath
                                key={s.id}
                                stroke={s}
                                fading={fadingLaserIds.has(s.id)}
                              />
                            ))}
                          </g>
                        </svg>

                        <canvas
                          ref={liveCanvasRef}
                          className="pointer-events-none absolute inset-0 h-full w-full"
                          width={bufSize.w}
                          height={bufSize.h}
                          style={liveCanvasStyle}
                          aria-hidden
                        />

                        {/* HTML text layer (editable, scales with stage transform). */}
                        {textObjects.map((t) => {
                          const selected = t.id === selectedTextId;
                          const editing = t.id === editingTextId;
                          const leftPct = (t.x / Math.max(1, bufSize.w)) * 100;
                          const topPct = (t.y / Math.max(1, bufSize.h)) * 100;
                          return (
                            <div
                              key={t.id}
                              className={`absolute z-1 min-w-8 max-w-[90%] ${
                                selected
                                  ? 'ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent'
                                  : ''
                              }`}
                              style={{
                                left: `${leftPct}%`,
                                top: `${topPct}%`,
                                color: t.color,
                                opacity: t.opacity,
                                fontFamily: t.fontFamily,
                                fontSize: `${t.fontSizePx}px`,
                                fontWeight: t.fontWeight,
                                fontStyle: t.fontStyle,
                                lineHeight: 1.3,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                cursor: tool === 'text' || selected ? 'move' : 'default',
                                pointerEvents: tool === 'text' || selected ? 'auto' : 'none',
                              }}
                              onPointerDown={(e) => {
                                if (tool !== 'text' && tool !== 'pan') return;
                                e.stopPropagation();
                                e.preventDefault();
                                setTool('text');
                                // Select only — do not enter edit (Del can delete object).
                                if (editingTextId && editingTextId !== t.id) {
                                  finishTextEditing();
                                }
                                setEditingTextId(null);
                                setSelectedTextId(t.id);
                                setTextFontFamily(t.fontFamily);
                                setTextFontSizePx(t.fontSizePx);
                                setTextFontWeight(t.fontWeight);
                                setTextFontStyle(t.fontStyle);
                                textDragRef.current = {
                                  id: t.id,
                                  pointerId: e.pointerId,
                                  startClientX: e.clientX,
                                  startClientY: e.clientY,
                                  originX: t.x,
                                  originY: t.y,
                                };
                                (e.currentTarget as HTMLElement).setPointerCapture?.(
                                  e.pointerId,
                                );
                              }}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setTool('text');
                                setSelectedTextId(t.id);
                                setEditingTextId(t.id);
                                setTextFontFamily(t.fontFamily);
                                setTextFontSizePx(t.fontSizePx);
                                setTextFontWeight(t.fontWeight);
                                setTextFontStyle(t.fontStyle);
                                window.setTimeout(() => textEditRef.current?.focus(), 20);
                              }}
                            >
                              {editing ? (
                                <textarea
                                  ref={textEditRef}
                                  value={t.text}
                                  rows={Math.max(1, t.text.split('\n').length)}
                                  placeholder="텍스트 입력"
                                  className="block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40"
                                  style={{
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    fontStyle: 'inherit',
                                    lineHeight: 'inherit',
                                    color: 'inherit',
                                    fieldSizing: 'content',
                                  } as CSSProperties}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setTextObjects((list) =>
                                      list.map((item) =>
                                        item.id === t.id
                                          ? { ...item, text: value }
                                          : item,
                                      ),
                                    );
                                  }}
                                  onBlur={() => {
                                    // Commit edit when focus leaves the field.
                                    if (editingTextId === t.id) {
                                      finishTextEditing();
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      finishTextEditing();
                                      return;
                                    }
                                    if (
                                      (e.key === 'Backspace' ||
                                        e.key === 'Delete') &&
                                      e.currentTarget.value.length === 0
                                    ) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      deleteSelectedText();
                                    }
                                  }}
                                />
                              ) : (
                                <span className="block">
                                  {t.text || '텍스트'}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>

                {showBrushCursor && cursorPos ? (
                  <div
                    className="pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow"
                    style={{
                      left: cursorPos.x - brushScreenW / 2,
                      top: cursorPos.y - brushScreenH / 2,
                      width: brushScreenW,
                      height: brushScreenH,
                      borderRadius: brushShape === 'circle' ? '9999px' : '2px',
                      borderStyle: brushDash === 'dashed' ? 'dashed' : 'solid',
                      opacity: clamp(activeOpacity, 0.25, 0.85),
                      backgroundColor:
                        tool === 'eraser'
                          ? 'transparent'
                          : normalizeCssHexColor(activeColor) || undefined,
                    }}
                    aria-hidden
                  />
                ) : null}

                {(tool === 'text' || selectedText) && (
                  <aside
                    className="absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                      <Type size={14} aria-hidden />
                      텍스트 스타일
                    </div>
                    <label className="flex flex-col gap-1 text-[11px] text-white/70">
                      <span>Font family</span>
                      <FontFamilyInput
                        value={
                          selectedText?.fontFamily ?? textFontFamily
                        }
                        onChange={(v) => {
                          setTextFontFamily(v);
                          updateSelectedText({ fontFamily: v });
                        }}
                        className="w-full"
                        inputClassName="!bg-neutral-900 !text-white !border-white/20 !text-xs"
                        allowAddWebfont
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] text-white/70">
                      <span>Font size</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={MIN_FONT_PX}
                          max={MAX_FONT_PX}
                          step={1}
                          value={selectedText?.fontSizePx ?? textFontSizePx}
                          onChange={(e) => {
                            const v = clamp(
                              Math.round(Number(e.target.value) || 24),
                              MIN_FONT_PX,
                              MAX_FONT_PX,
                            );
                            setTextFontSizePx(v);
                            updateSelectedText({ fontSizePx: v });
                          }}
                          className="w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white"
                          aria-label="Font size (px)"
                        />
                        <span className="shrink-0 text-white/60">px</span>
                      </div>
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] text-white/70">
                      <span>Font weight</span>
                      <Select.Root
                        value={selectedText?.fontWeight ?? textFontWeight}
                        onValueChange={(v) => {
                          setTextFontWeight(v);
                          updateSelectedText({ fontWeight: v });
                        }}
                      >
                        <Select.Trigger
                          className="inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white"
                          aria-label="Font weight"
                        >
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Portal container={selectPortalEl}>
                          <Select.Content
                            className={selectContentClass}
                            position="popper"
                            side="bottom"
                            sideOffset={6}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                          >
                            <Select.Viewport className="p-1">
                              {FONT_WEIGHT_OPTIONS.map((opt) => (
                                <Select.Item
                                  key={opt.value}
                                  value={opt.value}
                                  className="cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15"
                                >
                                  <Select.ItemText>{opt.label}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] text-white/70">
                      <span>Font style</span>
                      <Select.Root
                        value={selectedText?.fontStyle ?? textFontStyle}
                        onValueChange={(v) => {
                          const style = v === 'italic' ? 'italic' : 'normal';
                          setTextFontStyle(style);
                          updateSelectedText({ fontStyle: style });
                        }}
                      >
                        <Select.Trigger
                          className="inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white"
                          aria-label="Font style"
                        >
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Portal container={selectPortalEl}>
                          <Select.Content
                            className={selectContentClass}
                            position="popper"
                            side="bottom"
                            sideOffset={6}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                          >
                            <Select.Viewport className="p-1">
                              <Select.Item
                                value="normal"
                                className="cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15"
                              >
                                <Select.ItemText>Normal</Select.ItemText>
                              </Select.Item>
                              <Select.Item
                                value="italic"
                                className="cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15"
                              >
                                <Select.ItemText>Italic</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </label>
                    <p className="text-[10px] leading-4 text-white/45">
                      클릭으로 텍스트 추가 · 더블클릭 편집 · 드래그 이동
                      <br />
                      Esc 편집 완료 · 선택 후 Del/Backspace 삭제 · 더블클릭 편집
                      <br />
                      {MOD_LABEL}+[ ] / {MOD_LABEL}+Shift+&lt;&gt; 글자 크기
                    </p>
                  </aside>
                )}

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
                        label="일반 펜"
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
                        label="형광펜"
                        active={tool === 'highlighter'}
                        onClick={selectHighlighter}
                      >
                        <Highlighter size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="레이저 (4초 후 페이드)"
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
                      <ToolTipBtn
                        label="텍스트"
                        active={tool === 'text'}
                        onClick={() => setTool('text')}
                      >
                        <Type size={16} />
                      </ToolTipBtn>

                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />

                      <div className="relative flex items-center">
                        {/* Collapsed: current color only. Expanded: stack upward. */}
                        <button
                          type="button"
                          aria-label="펜 색상"
                          aria-expanded={paletteExpanded}
                          onClick={() => {
                            setPaletteExpanded((v) => {
                              if (v) setColorPopoverOpen(false);
                              return !v;
                            });
                          }}
                          className="relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow"
                          style={{
                            backgroundColor:
                              normalizeCssHexColor(activeColor) || '#111827',
                          }}
                        />

                        <AnimatePresence mode="popLayout">
                          {paletteExpanded ? (
                            <Motion.div
                              key="haim-color-palette"
                              initial={{ opacity: 0, y: 16, scale: 0.85 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 12, scale: 0.9 }}
                              transition={{
                                type: 'spring',
                                stiffness: 420,
                                damping: 28,
                                mass: 0.7,
                              }}
                              className="absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md"
                            >
                              {(tool === 'highlighter'
                                ? HIGHLIGHT_COLORS
                                : PEN_COLORS
                              ).map((c, i, arr) => {
                                const selected =
                                  (normalizeCssHexColor(activeColor) || '')
                                    .slice(0, 7)
                                    .toLowerCase() === c.toLowerCase();
                                // flex-col-reverse: pop from trigger upward (last DOM item first)
                                const delay = 0.03 * (arr.length - i);
                                return (
                                  <Motion.button
                                    key={c}
                                    type="button"
                                    aria-label={`색상 ${c}`}
                                    initial={{ opacity: 0, y: 8, scale: 0.5 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 500,
                                      damping: 30,
                                      delay,
                                    }}
                                    onClick={() => {
                                      setColorPopoverOpen(false);
                                      if (tool === 'highlighter') {
                                        setHighlightColor(`${c}ff`);
                                      } else {
                                        setPenColor(`${c}ff`);
                                        if (
                                          tool === 'pan' ||
                                          tool === 'eraser' ||
                                          tool === 'laser'
                                        ) {
                                          setTool('pen');
                                        }
                                      }
                                      setPaletteExpanded(false);
                                    }}
                                    className={`h-7 w-7 rounded-full border-2 shadow ${
                                      selected
                                        ? 'border-sky-300 scale-110'
                                        : 'border-white/40'
                                    }`}
                                    style={{ backgroundColor: c }}
                                  />
                                );
                              })}
                              <Motion.button
                                type="button"
                                aria-label="사용자 색상"
                                aria-pressed={colorPopoverOpen}
                                initial={{ opacity: 0, y: 8, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 30,
                                  delay: 0,
                                }}
                                onClick={() => setColorPopoverOpen((v) => !v)}
                                className={`h-7 w-7 rounded-full border-2 shadow ${
                                  colorPopoverOpen
                                    ? 'border-sky-300 scale-110'
                                    : 'border-white/50'
                                }`}
                                style={RAINBOW_SWATCH_STYLE}
                              />
                            </Motion.div>
                          ) : null}
                        </AnimatePresence>

                        <AnimatePresence>
                          {paletteExpanded && colorPopoverOpen ? (
                            <Motion.div
                              key="haim-color-picker"
                              initial={{ opacity: 0, x: -6, scale: 0.96 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: -4, scale: 0.96 }}
                              transition={{ duration: 0.18, ease: LIGHTBOX_EASE }}
                              className="absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md"
                            >
                            <div
                              className="mb-2 h-8 w-full rounded border border-white/20"
                              style={{
                                ...CSS_HEX_CHECKER_STYLE,
                                backgroundColor: activeColor,
                              }}
                            />
                            <div className="[&_.react-colorful]:h-36 [&_.react-colorful]:w-full">
                              <HexAlphaColorPicker
                                color={colorHex}
                                onChange={(next) => {
                                  const color = normalizeCssHexColor(
                                    next.startsWith('#') ? next : `#${next}`,
                                  );
                                  if (!color) return;
                                  if (tool === 'highlighter') {
                                    setHighlightColor(color);
                                  } else {
                                    setPenColor(color);
                                    if (
                                      tool === 'pan' ||
                                      tool === 'eraser' ||
                                      tool === 'laser'
                                    ) {
                                      setTool('pen');
                                    }
                                  }
                                }}
                              />
                            </div>
                            <HexColorInput
                              alpha
                              prefixed
                              color={colorHex}
                              onChange={(next) => {
                                const color = normalizeCssHexColor(
                                  next.startsWith('#') ? next : `#${next}`,
                                );
                                if (!color) return;
                                if (tool === 'highlighter') {
                                  setHighlightColor(color);
                                } else {
                                  setPenColor(color);
                                }
                              }}
                              className="mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white"
                            />
                            </Motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>

                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />

                      {tool === 'highlighter' ? (
                        <div className="flex items-center gap-1 text-[11px] text-white/80">
                          <label className="flex items-center gap-0.5">
                            <span className="opacity-70">W</span>
                            <span className="sr-only">브러시 가로 (px)</span>
                            <input
                              type="number"
                              min={MIN_PEN}
                              max={MAX_PEN}
                              step={0.1}
                              value={penSizeW}
                              onChange={(e) =>
                                setPenSizeW(
                                  roundSize(
                                    clamp(
                                      Number(e.target.value) || 1,
                                      MIN_PEN,
                                      MAX_PEN,
                                    ),
                                  ),
                                )
                              }
                              className="w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white"
                              aria-label="브러시 가로 (px)"
                            />
                          </label>
                          <span className="opacity-50" aria-hidden>
                            ×
                          </span>
                          <label className="flex items-center gap-0.5">
                            <span className="opacity-70">H</span>
                            <span className="sr-only">브러시 세로 (px)</span>
                            <input
                              type="number"
                              min={MIN_PEN}
                              max={MAX_PEN}
                              step={0.1}
                              value={penSizeH}
                              onChange={(e) =>
                                setPenSizeH(
                                  roundSize(
                                    clamp(
                                      Number(e.target.value) || 1,
                                      MIN_PEN,
                                      MAX_PEN,
                                    ),
                                  ),
                                )
                              }
                              className="w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white"
                              aria-label="브러시 세로 (px)"
                            />
                          </label>
                          <span className="tabular-nums text-white/60" aria-hidden>
                            px
                          </span>
                        </div>
                      ) : (
                        <label className="flex items-center gap-1 text-[11px] text-white/80">
                          <span className="sr-only">브러시 크기 (px)</span>
                          <input
                            type="number"
                            min={MIN_PEN}
                            max={MAX_PEN}
                            step={0.1}
                            value={penSizeW}
                            onChange={(e) =>
                              setUniformPenSize(Number(e.target.value) || 1)
                            }
                            className="w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white"
                            aria-label="브러시 크기 (px)"
                          />
                          <span className="tabular-nums text-white/60" aria-hidden>
                            px
                          </span>
                        </label>
                      )}

                      <label className="flex items-center gap-1 text-[11px] text-white/80">
                        <span className="opacity-70">흐름</span>
                        <input
                          type="number"
                          min={5}
                          max={100}
                          step={5}
                          value={Math.round(
                            (tool === 'highlighter'
                              ? highlightOpacity
                              : penOpacity) * 100,
                          )}
                          onChange={(e) => {
                            const pct = clamp(
                              Number(e.target.value) || 5,
                              5,
                              100,
                            );
                            const v = pct / 100;
                            if (tool === 'highlighter') setHighlightOpacity(v);
                            else setPenOpacity(v);
                          }}
                          className="w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white"
                          aria-label="흐름 (%)"
                        />
                        <span className="tabular-nums text-white/60" aria-hidden>
                          %
                        </span>
                      </label>

                      <Select.Root
                        value={brushShape}
                        onValueChange={(v) => setBrushShape(v as BrushShape)}
                      >
                        <Select.Trigger
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20"
                          aria-label={
                            brushShape === 'circle' ? '원' : '네모'
                          }
                        >
                          {brushShape === 'circle' ? (
                            <Circle size={16} />
                          ) : (
                            <Square size={16} />
                          )}
                        </Select.Trigger>
                        <Select.Portal container={selectPortalEl}>
                          <Select.Content
                            className={selectContentClass}
                            position="popper"
                            side="top"
                            sideOffset={6}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                          >
                            <Select.Viewport className="p-1">
                              <Select.Item
                                value="circle"
                                className="flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15"
                                aria-label="원"
                              >
                                <Circle size={16} />
                                <Select.ItemText className="sr-only">
                                  원
                                </Select.ItemText>
                              </Select.Item>
                              <Select.Item
                                value="square"
                                className="flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15"
                                aria-label="네모"
                              >
                                <Square size={16} />
                                <Select.ItemText className="sr-only">
                                  네모
                                </Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>

                      <Select.Root
                        value={brushDash}
                        onValueChange={(v) => setBrushDash(v as BrushDash)}
                      >
                        <Select.Trigger
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20"
                          aria-label={
                            brushDash === 'dashed' ? 'Dashed' : 'Solid'
                          }
                        >
                          {brushDash === 'dashed' ? (
                            <DashedLineIcon size={16} />
                          ) : (
                            <SolidLineIcon size={16} />
                          )}
                        </Select.Trigger>
                        <Select.Portal container={selectPortalEl}>
                          <Select.Content
                            className={selectContentClass}
                            position="popper"
                            side="top"
                            sideOffset={6}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                          >
                            <Select.Viewport className="p-1">
                              <Select.Item
                                value="solid"
                                className="flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15"
                                aria-label="Solid"
                              >
                                <SolidLineIcon size={16} />
                                <Select.ItemText className="sr-only">
                                  Solid
                                </Select.ItemText>
                              </Select.Item>
                              <Select.Item
                                value="dashed"
                                className="flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15"
                                aria-label="Dashed"
                              >
                                <DashedLineIcon size={16} />
                                <Select.ItemText className="sr-only">
                                  Dashed
                                </Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>

                      {tool === 'highlighter' ? (
                        <Select.Root
                          value={highlightBlend}
                          onValueChange={(v) =>
                            setHighlightBlend(v as HighlightBlendMode)
                          }
                        >
                          <Select.Trigger
                            className={selectTriggerClass}
                            aria-label="형광펜 블렌드"
                          >
                            <Select.Value placeholder="Blend" />
                          </Select.Trigger>
                          <Select.Portal container={selectPortalEl}>
                            <Select.Content
                              className={`${selectContentClass} max-h-56 overflow-auto`}
                              position="popper"
                              side="top"
                              sideOffset={6}
                              onCloseAutoFocus={(e) => e.preventDefault()}
                            >
                              <Select.Viewport className="p-1">
                                {HIGHLIGHT_BLEND_OPTIONS.map((opt) => (
                                  <Select.Item
                                    key={opt.value}
                                    value={opt.value}
                                    className="cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15"
                                  >
                                    <Select.ItemText>{opt.label}</Select.ItemText>
                                  </Select.Item>
                                ))}
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      ) : null}

                      <span className="mx-0.5 h-5 w-px bg-white/20" aria-hidden />

                      <ToolTipBtn
                        label={`실행 취소 (${MOD_LABEL}+Z)`}
                        disabled={permanentCount === 0}
                        onClick={undoStrokeClean}
                      >
                        <Undo2 size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label={`다시 실행 (${REDO_SHORTCUT})`}
                        disabled={redoStack.length === 0}
                        onClick={redoStroke}
                      >
                        <Redo2 size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label="그림 지우기"
                        disabled={
                          permanentCount === 0 && laserStrokes.length === 0
                        }
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
                            setScale((s) =>
                              clamp(s / ZOOM_STEP, MIN_SCALE, MAX_SCALE),
                            );
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
                            setScale((s) =>
                              clamp(s * ZOOM_STEP, MIN_SCALE, MAX_SCALE),
                            );
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
                        label={`덮어쓰기 저장 (${MOD_LABEL}+S)`}
                        tone="save"
                        disabled={!canSave || saving}
                        onClick={() => void runSave('overwrite')}
                      >
                        <Save size={16} />
                      </ToolTipBtn>
                      <ToolTipBtn
                        label={`다른 이름으로 저장 (${MOD_LABEL}+Shift+S)`}
                        tone="saveAs"
                        disabled={!canSave || saving}
                        onClick={() => void runSave('saveAs')}
                      >
                        <CopyPlus size={16} />
                      </ToolTipBtn>
                    </div>
                    <p className="max-w-xl text-center text-[10px] text-white/55">
                      휠 줌 · [ ] 펜 크기 · {MOD_LABEL}+[ ] / {MOD_LABEL}+Shift+&lt;&gt;
                      글자 크기 · {MOD_LABEL}+Z / {REDO_SHORTCUT}
                      {inkReady ? ' · Ink API' : ''}
                      {saving ? ' · 저장 중…' : ''}
                    </p>
                    {saveError ? (
                      <p className="max-w-xl text-center text-[10px] text-red-300">
                        {saveError}
                      </p>
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
