import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Cropper, { type Area } from 'react-easy-crop';
import { ArrowLeft, Crop, Loader2 } from 'lucide-react';
import { Switch } from 'radix-ui';
import { getCroppedImg } from '@/utils/chatWithMyself/cropImage';

const MIN_CROP_PX = 48;

const switchRootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

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

export default function NoteImageCropPanel({
  imageSrc,
  fileName,
  onCancel,
  onConfirm,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cropSizeRef = useRef<Size | null>(null);
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
  }, [imageSrc]);

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
  }, [imageSrc]);

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

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    croppedAreaRef.current = pixels;
  }, []);

  const onCropSizeChange = useCallback((size: Size) => {
    if (dragRef.current) return;
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
      dragRef.current = null;
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [commitSize, cropAreaMetrics]);

  const handleConfirm = async () => {
    const area = croppedAreaRef.current;
    if (!area || busy) return;
    setBusy(true);
    setError('');
    try {
      const baseName = (fileName || 'image').replace(/\.[^.]+$/, '') || 'image';
      const file = await getCroppedImg(imageSrc, area, {
        keepTransparency,
        fileName: keepTransparency ? `${baseName}-crop.png` : `${baseName}-crop.jpg`,
      });
      await onConfirm(file, area);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">이미지 자르기</h2>
      <p className="text-xs text-gray-500 dark:text-odp-muted">
        모서리·변을 드래그해 비율을 자유롭게 조절하세요. Shift를 누르면 비율이 유지됩니다.
      </p>
      <div
        ref={stageRef}
        className="relative h-[min(56vh,360px)] w-full overflow-hidden rounded-lg bg-neutral-900"
      >
        {imageSrc ? (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            minZoom={1}
            maxZoom={4}
            {...(cropSize ? { cropSize, aspect: cropSize.width / Math.max(1, cropSize.height) } : {})}
            zoomWithScroll
            showGrid
            style={{ cropAreaStyle: { overflow: 'visible' } }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            onCropAreaChange={onCropComplete}
            onCropSizeChange={onCropSizeChange}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-300">
            이미지를 불러올 수 없습니다.
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
            끄면 흰 배경 JPEG로 저장합니다.
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
          disabled={busy || !imageSrc}
          className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Crop size={16} />}
          {busy ? '적용 중…' : '자르기 적용'}
        </button>
      </div>
    </div>
  );
}
