import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import Cropper, {
  getInitialCropFromCroppedAreaPixels,
  type Area,
  type MediaSize,
} from 'react-easy-crop';
import { ArrowLeft, Crop, Loader2, Scan } from 'lucide-react';
import { Switch } from 'radix-ui';
import { getCroppedImg } from '@/utils/chatWithMyself/cropImage';
import {
  composeImageColorGrid,
  getOpaqueContentBounds,
  opaqueBoundsToGridArea,
  type CropPadMeta,
  type OpaqueContentBounds,
} from '@/utils/chatWithMyself/cropPadImage';

const MIN_CROP_PX = 48;
/** Pad relative to source size on each side (L/R/T/B). */
const CROP_PAD_RATIO = 1.5;
const SNAP_RATIO = 0.08;

const switchRootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

const CHECKERBOARD_STYLE: CSSProperties = {
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

type Size = { width: number; height: number };

type HandleId = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const HANDLES: { id: HandleId; className: string }[] = [
  { id: 'n', className: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize' },
  { id: 's', className: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize' },
  { id: 'e', className: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
  { id: 'w', className: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
  { id: 'ne', className: 'right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize' },
  { id: 'nw', className: 'left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize' },
  { id: 'se', className: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize' },
  { id: 'sw', className: 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize' },
];

type Props = {
  imageSrc: string;
  fileName?: string;
  onCancel: () => void;
  onConfirm: (file: File, area: Area) => void | Promise<void>;
};

function clampCropSize(next: Size, maxWidth: number, maxHeight: number): Size {
  return {
    width: Math.min(maxWidth, Math.max(MIN_CROP_PX, next.width)),
    height: Math.min(maxHeight, Math.max(MIN_CROP_PX, next.height)),
  };
}

function handlePoint(handle: HandleId, cx: number, cy: number, size: Size): { x: number; y: number } {
  const hx = size.width / 2;
  const hy = size.height / 2;
  let x = cx;
  let y = cy;
  if (handle.includes('e')) x = cx + hx;
  if (handle.includes('w')) x = cx - hx;
  if (handle.includes('s')) y = cy + hy;
  if (handle.includes('n')) y = cy - hy;
  return { x, y };
}

function sizeFromHandlePoint(
  handle: HandleId,
  cx: number,
  cy: number,
  pointX: number,
  pointY: number,
  current: Size,
  lockRatio: boolean,
): Size {
  const vx = pointX - cx;
  const vy = pointY - cy;
  let width = current.width;
  let height = current.height;

  if (handle === 'e' || handle === 'w') width = Math.abs(vx) * 2;
  else if (handle === 'n' || handle === 's') height = Math.abs(vy) * 2;
  else {
    width = Math.abs(vx) * 2;
    height = Math.abs(vy) * 2;
  }

  if (lockRatio && current.height > 0) {
    const ratio = current.width / current.height;
    if (handle === 'e' || handle === 'w') {
      height = width / ratio;
    } else if (handle === 'n' || handle === 's') {
      width = height * ratio;
    } else {
      const dirX = handle.includes('e') ? 1 : -1;
      const dirY = handle.includes('s') ? 1 : -1;
      const t = (vx * dirX * ratio + vy * dirY) / (ratio * ratio + 1);
      width = Math.abs(t) * ratio * 2;
      height = Math.abs(t) * 2;
    }
  }

  return { width, height };
}

function mediaZoomOf(media: MediaSize): number {
  return media.width > media.height
    ? media.width / media.naturalWidth
    : media.height / media.naturalHeight;
}

function areaDistance(a: Area, b: Area): number {
  return (
    Math.abs(a.x - b.x)
    + Math.abs(a.y - b.y)
    + Math.abs(a.width - b.width)
    + Math.abs(a.height - b.height)
  );
}

function buildSnapTargets(meta: CropPadMeta, opaqueArea: Area | null): Area[] {
  const targets: Area[] = [
    {
      x: meta.originX,
      y: meta.originY,
      width: meta.cellWidth,
      height: meta.cellHeight,
    },
  ];
  if (
    opaqueArea
    && (
      Math.abs(opaqueArea.x - meta.originX) > 0.5
      || Math.abs(opaqueArea.y - meta.originY) > 0.5
      || Math.abs(opaqueArea.width - meta.cellWidth) > 0.5
      || Math.abs(opaqueArea.height - meta.cellHeight) > 0.5
    )
  ) {
    targets.push(opaqueArea);
  }
  return targets;
}

function nearestSnapTarget(
  meta: CropPadMeta,
  current: Area,
  opaqueArea: Area | null,
): Area | null {
  const targets = buildSnapTargets(meta, opaqueArea);
  let best: Area | null = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const target of targets) {
    const dist = areaDistance(current, target);
    if (dist < bestDist) {
      best = target;
      bestDist = dist;
    }
  }
  const threshold = Math.max(
    16,
    (current.width + current.height) * SNAP_RATIO,
  );
  if (!best || bestDist > threshold) return null;
  return best;
}

export default function NoteImageCropPanel({
  imageSrc,
  fileName,
  onCancel,
  onConfirm,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cropSizeRef = useRef<Size | null>(null);
  const mediaRef = useRef<MediaSize | null>(null);
  const padMetaRef = useRef<CropPadMeta | null>(null);
  const opaqueAreaRef = useRef<Area | null>(null);
  const compositeSrcRef = useRef<string | null>(null);
  const didInitCropRef = useRef(false);
  const snappingRef = useRef(false);
  const rafRef = useRef(0);
  const dragRef = useRef<{
    handle: HandleId;
    offsetX: number;
    offsetY: number;
    lockRatio: boolean;
  } | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropSize, setCropSize] = useState<Size | null>(null);
  const [lockRatio, setLockRatio] = useState(false);
  const [keepTransparency, setKeepTransparency] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [cropAreaEl, setCropAreaEl] = useState<HTMLElement | null>(null);
  const [compositeSrc, setCompositeSrc] = useState<string | null>(null);
  const [padMeta, setPadMeta] = useState<CropPadMeta | null>(null);
  const [opaqueBounds, setOpaqueBounds] = useState<OpaqueContentBounds | null>(null);
  const [opaqueArea, setOpaqueArea] = useState<Area | null>(null);
  const croppedAreaRef = useRef<Area | null>(null);

  const commitSize = useCallback((next: Size) => {
    cropSizeRef.current = next;
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      setCropSize(cropSizeRef.current);
    });
  }, []);

  useEffect(() => () => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    cropSizeRef.current = null;
    setCropSize(null);
    setLockRatio(false);
    setKeepTransparency(true);
    setBusy(false);
    setError('');
    croppedAreaRef.current = null;
    setCropAreaEl(null);
    mediaRef.current = null;
    padMetaRef.current = null;
    opaqueAreaRef.current = null;
    didInitCropRef.current = false;
    setPadMeta(null);
    setCompositeSrc(null);
    setOpaqueBounds(null);
    setOpaqueArea(null);
  }, [imageSrc]);

  useEffect(() => {
    if (!imageSrc) return undefined;
    let cancelled = false;
    void getOpaqueContentBounds(imageSrc)
      .then((bounds) => {
        if (cancelled) return;
        setOpaqueBounds(bounds);
      })
      .catch(() => {
        if (!cancelled) setOpaqueBounds(null);
      });
    return () => {
      cancelled = true;
    };
  }, [imageSrc]);

  useEffect(() => {
    if (!imageSrc) return undefined;
    let cancelled = false;
    const backgroundColor = keepTransparency ? null : '#ffffff';
    void composeImageColorGrid(imageSrc, backgroundColor, {
      padRatio: CROP_PAD_RATIO,
      matteCenter: Boolean(backgroundColor) && !keepTransparency,
    })
      .then((next) => {
        if (cancelled) {
          URL.revokeObjectURL(next.src);
          return;
        }
        if (compositeSrcRef.current) URL.revokeObjectURL(compositeSrcRef.current);
        compositeSrcRef.current = next.src;
        padMetaRef.current = next.meta;
        didInitCropRef.current = false;
        setCompositeSrc(next.src);
        setPadMeta(next.meta);
      })
      .catch(() => {
        if (!cancelled) {
          setCompositeSrc(imageSrc);
          setPadMeta(null);
          padMetaRef.current = null;
        }
      });
    return () => {
      cancelled = true;
    };
  }, [imageSrc, keepTransparency]);

  useEffect(() => {
    if (!padMeta || !opaqueBounds?.hasTransparentMargin) {
      opaqueAreaRef.current = null;
      setOpaqueArea(null);
      return;
    }
    const area = opaqueBoundsToGridArea(padMeta, opaqueBounds);
    opaqueAreaRef.current = area;
    setOpaqueArea(area);
  }, [padMeta, opaqueBounds]);

  useEffect(() => {
    return () => {
      if (compositeSrcRef.current) {
        URL.revokeObjectURL(compositeSrcRef.current);
        compositeSrcRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const bind = () => {
      const el = stage.querySelector<HTMLElement>('.reactEasyCrop_CropArea');
      setCropAreaEl((prev) => (prev === el ? prev : el));
    };
    bind();
    const observer = new MutationObserver(bind);
    observer.observe(stage, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [compositeSrc]);

  const cropAreaMetrics = useCallback(() => {
    const stage = stageRef.current;
    const cropArea = cropAreaEl ?? stage?.querySelector<HTMLElement>('.reactEasyCrop_CropArea');
    const stageRect = stage?.getBoundingClientRect();
    if (!cropArea || !stageRect) {
      return {
        cx: 0,
        cy: 0,
        width: cropSizeRef.current?.width ?? 0,
        height: cropSizeRef.current?.height ?? 0,
        maxWidth: 480,
        maxHeight: 360,
      };
    }
    const rect = cropArea.getBoundingClientRect();
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
      maxWidth: Math.max(MIN_CROP_PX, stageRect.width - 16),
      maxHeight: Math.max(MIN_CROP_PX, stageRect.height - 16),
    };
  }, [cropAreaEl]);

  const applyPixelArea = useCallback((area: Area) => {
    const media = mediaRef.current;
    if (!media) return;
    const mz = mediaZoomOf(media);
    const stage = stageRef.current?.getBoundingClientRect();
    const maxWidth = Math.max(MIN_CROP_PX, (stage?.width ?? media.width) - 16);
    const maxHeight = Math.max(MIN_CROP_PX, (stage?.height ?? media.height) - 16);
    const displaySize = clampCropSize(
      {
        width: area.width * mz,
        height: area.height * mz,
      },
      maxWidth,
      maxHeight,
    );
    cropSizeRef.current = displaySize;
    setCropSize(displaySize);
    const next = getInitialCropFromCroppedAreaPixels(area, media, 0, displaySize, 1, 4);
    snappingRef.current = true;
    setCrop(next.crop);
    setZoom(Math.min(4, Math.max(1, next.zoom)));
    window.requestAnimationFrame(() => {
      snappingRef.current = false;
    });
  }, []);

  const applyOriginalCrop = useCallback((media: MediaSize, meta: CropPadMeta) => {
    mediaRef.current = media;
    applyPixelArea({
      x: meta.originX,
      y: meta.originY,
      width: meta.cellWidth,
      height: meta.cellHeight,
    });
  }, [applyPixelArea]);

  const snapToNearest = useCallback(() => {
    if (snappingRef.current) return;
    const current = croppedAreaRef.current;
    const meta = padMetaRef.current;
    if (!current || !meta) return;
    const target = nearestSnapTarget(meta, current, opaqueAreaRef.current);
    if (!target) return;
    applyPixelArea(target);
  }, [applyPixelArea]);

  const snapToOpaqueContent = useCallback(() => {
    const area = opaqueAreaRef.current;
    if (!area) return;
    applyPixelArea(area);
  }, [applyPixelArea]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!padMeta || !media || didInitCropRef.current) return;
    didInitCropRef.current = true;
    applyOriginalCrop(media, padMeta);
  }, [padMeta, applyOriginalCrop, compositeSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    croppedAreaRef.current = pixels;
  }, []);

  const onCropSizeChange = useCallback((size: Size) => {
    if (dragRef.current) return;
    if (didInitCropRef.current === false && padMetaRef.current) return;
    const prev = cropSizeRef.current;
    if (
      prev
      && Math.abs(prev.width - size.width) < 0.5
      && Math.abs(prev.height - size.height) < 0.5
    ) {
      return;
    }
    cropSizeRef.current = size;
    setCropSize(size);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      event.preventDefault();
      const metrics = cropAreaMetrics();
      const next = sizeFromHandlePoint(
        drag.handle,
        metrics.cx,
        metrics.cy,
        event.clientX - drag.offsetX,
        event.clientY - drag.offsetY,
        { width: metrics.width, height: metrics.height },
        drag.lockRatio || event.shiftKey,
      );
      commitSize(clampCropSize(next, metrics.maxWidth, metrics.maxHeight));
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      window.requestAnimationFrame(() => {
        snapToNearest();
      });
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [commitSize, cropAreaMetrics, snapToNearest]);

  const handleConfirm = async () => {
    const area = croppedAreaRef.current;
    const src = compositeSrc || imageSrc;
    if (!area || busy || !src) return;
    setBusy(true);
    setError('');
    try {
      const baseName = (fileName || 'image').replace(/\.[^.]+$/, '') || 'image';
      const file = await getCroppedImg(src, area, {
        keepTransparency,
        fileName: keepTransparency ? `${baseName}-crop.png` : `${baseName}-crop.jpg`,
      });
      await onConfirm(file, area);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  const cropImageSrc = compositeSrc;

  return (
    <div className="flex flex-col gap-3 p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">이미지 자르기</h2>
      <p className="text-xs text-gray-500 dark:text-odp-muted">
        모서리·변을 드래그해 비율을 자유롭게 조절하세요. Shift를 누르면 비율이 유지됩니다.
        이미지 바깥(투명 여백)까지 잘라 뒤쪽에서부터 자를 수 있습니다.
        투명 PNG는 불투명 콘텐츠·원본 테두리에 가까이 두면 자동으로 맞춥니다.
      </p>
      <div
        ref={stageRef}
        className="relative h-[min(56vh,360px)] w-full overflow-hidden rounded-lg"
        style={keepTransparency ? CHECKERBOARD_STYLE : { backgroundColor: '#ffffff' }}
      >
        {cropImageSrc ? (
          <Cropper
            image={cropImageSrc}
            crop={crop}
            zoom={zoom}
            minZoom={1}
            maxZoom={4}
            {...(cropSize ? { cropSize, aspect: cropSize.width / Math.max(1, cropSize.height) } : {})}
            zoomWithScroll
            showGrid
            style={{
              containerStyle: { backgroundColor: 'transparent' },
              cropAreaStyle: { overflow: 'visible' },
            }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            onCropAreaChange={onCropComplete}
            onCropSizeChange={onCropSizeChange}
            onInteractionEnd={snapToNearest}
            onMediaLoaded={(media) => {
              mediaRef.current = media;
              const meta = padMetaRef.current ?? padMeta;
              if (didInitCropRef.current || !meta) return;
              didInitCropRef.current = true;
              applyOriginalCrop(media, meta);
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500 dark:text-neutral-300">
            <Loader2 size={18} className="mr-2 animate-spin" />
            준비 중…
          </div>
        )}
        {cropAreaEl
          ? createPortal(
            HANDLES.map((handle) => (
              <button
                key={handle.id}
                type="button"
                aria-label={`crop-handle-${handle.id}`}
                className={`pointer-events-auto absolute z-20 h-3.5 w-3.5 touch-none rounded-sm border border-white bg-blue-500 shadow ${handle.className}`}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  const metrics = cropAreaMetrics();
                  const point = handlePoint(handle.id, metrics.cx, metrics.cy, {
                    width: metrics.width,
                    height: metrics.height,
                  });
                  cropSizeRef.current = { width: metrics.width, height: metrics.height };
                  dragRef.current = {
                    handle: handle.id,
                    offsetX: event.clientX - point.x,
                    offsetY: event.clientY - point.y,
                    lockRatio,
                  };
                }}
              />
            )),
            cropAreaEl,
          )
          : null}
      </div>
      {opaqueArea && opaqueBounds?.hasTransparentMargin ? (
        <button
          type="button"
          onClick={snapToOpaqueContent}
          disabled={busy || !cropImageSrc}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
        >
          <Scan size={14} />
          투명 제외 · 콘텐츠에 맞추기
        </button>
      ) : null}
      <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-odp-muted">
        <span className="shrink-0">확대</span>
        <input
          type="range"
          min={1}
          max={4}
          step={0.01}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="w-full accent-blue-600"
        />
      </label>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        <span className="min-w-0">
          <span className="block text-xs font-medium text-gray-800 dark:text-odp-fgStrong">
            비율 잠금
          </span>
          <span className="mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted">
            끄면 가로·세로를 따로 늘려 비율을 바꿀 수 있습니다.
          </span>
        </span>
        <Switch.Root
          className={switchRootClass}
          checked={lockRatio}
          onCheckedChange={(next) => setLockRatio(Boolean(next))}
          aria-label="비율 잠금"
        >
          <Switch.Thumb className={switchThumbClass} />
        </Switch.Root>
      </label>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        <span className="min-w-0">
          <span className="block text-xs font-medium text-gray-800 dark:text-odp-fgStrong">
            PNG 투명 배경 유지
          </span>
          <span className="mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted">
            끄면 흰 배경 JPEG로 저장합니다. 켜면 투명 여백을 체크무늬로 표시합니다.
          </span>
        </span>
        <Switch.Root
          className={switchRootClass}
          checked={keepTransparency}
          onCheckedChange={(next) => setKeepTransparency(Boolean(next))}
          aria-label="PNG 투명 배경 유지"
        >
          <Switch.Thumb className={switchThumbClass} />
        </Switch.Root>
      </label>
      {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
        >
          <ArrowLeft size={16} />
          뒤로
        </button>
        <button
          type="button"
          onClick={() => void handleConfirm()}
          disabled={busy || !cropImageSrc}
          className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Crop size={16} />}
          {busy ? '적용 중…' : '자르기 적용'}
        </button>
      </div>
    </div>
  );
}
