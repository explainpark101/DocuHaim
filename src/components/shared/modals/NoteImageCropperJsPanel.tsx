import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, Crop, Loader2 } from 'lucide-react';
import { Switch } from 'radix-ui';
import { fileFromCroppedCanvas } from '@/utils/chatWithMyself/cropImage';
import type { Area } from 'react-easy-crop';

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

/** Cropper.js 2 default-style template (free crop, movable + resizable). */
const CROP_TEMPLATE = `
<cropper-canvas background style="width:100%;height:100%;">
  <cropper-image rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection initial-coverage="0.85" movable resizable outlined>
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-crosshair centered></cropper-crosshair>
    <cropper-handle action="move" plain></cropper-handle>
    <cropper-handle action="n-resize"></cropper-handle>
    <cropper-handle action="e-resize"></cropper-handle>
    <cropper-handle action="s-resize"></cropper-handle>
    <cropper-handle action="w-resize"></cropper-handle>
    <cropper-handle action="ne-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="nw-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="se-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="sw-resize" theme-color="#3b82f6"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
`;

/** Larger corner hit targets + visible dots (shadow DOM via $addStyles). */
const CORNER_HANDLE_STYLES = `
:host([action="ne-resize"]),
:host([action="nw-resize"]),
:host([action="se-resize"]),
:host([action="sw-resize"]) {
  height: 28px;
  width: 28px;
  z-index: 2;
}
:host([action="ne-resize"]):after,
:host([action="nw-resize"]):after,
:host([action="se-resize"]):after,
:host([action="sw-resize"]):after {
  height: 14px;
  width: 14px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9);
}
:host([action="ne-resize"]) { top: -12px; right: -12px; }
:host([action="nw-resize"]) { top: -12px; left: -12px; }
:host([action="se-resize"]) { bottom: -12px; right: -12px; }
:host([action="sw-resize"]) { bottom: -12px; left: -12px; }
@media (pointer: coarse) {
  :host([action="ne-resize"]),
  :host([action="nw-resize"]),
  :host([action="se-resize"]),
  :host([action="sw-resize"]) {
    height: 36px;
    width: 36px;
  }
  :host([action="ne-resize"]):after,
  :host([action="nw-resize"]):after,
  :host([action="se-resize"]):after,
  :host([action="sw-resize"]):after {
    height: 16px;
    width: 16px;
  }
  :host([action="ne-resize"]) { top: -14px; right: -14px; }
  :host([action="nw-resize"]) { top: -14px; left: -14px; }
  :host([action="se-resize"]) { bottom: -14px; right: -14px; }
  :host([action="sw-resize"]) { bottom: -14px; left: -14px; }
}
`;

const CORNER_ACTIONS = new Set(['ne-resize', 'nw-resize', 'se-resize', 'sw-resize']);

type CropperHandleEl = HTMLElement & {
  $addStyles?: (styles: string) => unknown;
};

function enlargeCornerHandles(root: ParentNode | null | undefined) {
  if (!root) return;
  root.querySelectorAll('cropper-handle').forEach((node) => {
    const el = node as CropperHandleEl;
    const action = el.getAttribute('action') || '';
    if (!CORNER_ACTIONS.has(action)) return;
    el.$addStyles?.(CORNER_HANDLE_STYLES);
  });
}

type CropperImageApi = {
  $getTransform: () => number[];
  $ready: () => Promise<HTMLImageElement>;
  $move: (x: number, y?: number) => unknown;
};

type CropperV2 = {
  destroy: () => void;
  getCropperCanvas: () => HTMLElement | null;
  getCropperSelection: () => {
    x: number;
    y: number;
    width: number;
    height: number;
    $toCanvas: (options?: {
      width?: number;
      height?: number;
      beforeDraw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }) => Promise<HTMLCanvasElement>;
  } | null;
  getCropperImage: () => CropperImageApi | null;
};

/** Middle mouse button (wheel click). */
const MIDDLE_BUTTON = 1;

type Props = {
  imageSrc: string;
  fileName?: string;
  onCancel: () => void;
  onConfirm: (file: File, area: Area) => void | Promise<void>;
};

/**
 * Map selection CSS size → natural image pixels using cropper-image transform scale.
 * Cropper.js 2 `$toCanvas()` defaults to CSS selection size (too small for hi-res sources).
 */
function naturalSizeFromSelection(
  selection: { width: number; height: number },
  transform: number[],
): { width: number; height: number } {
  const a = transform[0] ?? 1;
  const b = transform[1] ?? 0;
  const scale = Math.hypot(a, b) || 1;
  return {
    width: Math.max(1, Math.round(selection.width / scale)),
    height: Math.max(1, Math.round(selection.height / scale)),
  };
}

/**
 * Cropper.js 2 panel (Web Components). Exports at natural image resolution.
 */
export default function NoteImageCropperJsPanel({
  imageSrc,
  fileName,
  onCancel,
  onConfirm,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<CropperV2 | null>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [keepTransparency, setKeepTransparency] = useState(true);

  useEffect(() => {
    setReady(false);
    setLoadError('');
    setBusy(false);
    setError('');
    setKeepTransparency(true);
  }, [imageSrc]);

  useEffect(() => {
    let cancelled = false;
    let cropper: CropperV2 | null = null;

    const boot = async () => {
      setReady(false);
      setLoadError('');
      try {
        const { default: Cropper } = await import('cropperjs');
        if (cancelled || !imgRef.current) return;
        cropperRef.current?.destroy();
        cropperRef.current = null;
        cropper = new Cropper(imgRef.current, {
          ...(hostRef.current ? { container: hostRef.current } : {}),
          template: CROP_TEMPLATE,
        }) as unknown as CropperV2;
        const image = cropper.getCropperImage();
        if (image) {
          await image.$ready();
        }
        if (cancelled) {
          cropper.destroy();
          return;
        }
        enlargeCornerHandles(cropper.getCropperSelection() as unknown as ParentNode);
        cropperRef.current = cropper;
        setReady(true);
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err instanceof Error
              ? err.message
              : 'Cropper.js 2를 불러오지 못했습니다. bun install 후 다시 시도하세요.',
          );
        }
      }
    };

    const raf = window.requestAnimationFrame(() => {
      void boot();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      cropper?.destroy();
      if (cropperRef.current === cropper) cropperRef.current = null;
    };
  }, [imageSrc]);

  // Cropper.js 2 ignores non-primary buttons; middle-click pan moves the image via $move.
  useEffect(() => {
    if (!ready) return undefined;
    const host = hostRef.current;
    const cropper = cropperRef.current;
    if (!host || !cropper) return undefined;

    const pan = {
      active: false,
      pointerId: -1,
      lastX: 0,
      lastY: 0,
    };

    const endPan = (event?: PointerEvent) => {
      if (!pan.active) return;
      pan.active = false;
      if (event && pan.pointerId === event.pointerId) {
        try {
          host.releasePointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }
      pan.pointerId = -1;
      host.style.cursor = '';
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== MIDDLE_BUTTON) return;
      // Block browser autoscroll / middle-click paste.
      event.preventDefault();
      event.stopPropagation();
      const image = cropper.getCropperImage();
      if (!image) return;
      pan.active = true;
      pan.pointerId = event.pointerId;
      pan.lastX = event.clientX;
      pan.lastY = event.clientY;
      try {
        host.setPointerCapture(event.pointerId);
      } catch {
        // ignore
      }
      host.style.cursor = 'grabbing';
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pan.active || event.pointerId !== pan.pointerId) return;
      event.preventDefault();
      const image = cropper.getCropperImage();
      if (!image) return;
      const dx = event.clientX - pan.lastX;
      const dy = event.clientY - pan.lastY;
      pan.lastX = event.clientX;
      pan.lastY = event.clientY;
      if (dx !== 0 || dy !== 0) image.$move(dx, dy);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pan.pointerId && event.button !== MIDDLE_BUTTON) return;
      endPan(event);
    };

    const onAuxClick = (event: MouseEvent) => {
      if (event.button === MIDDLE_BUTTON) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // Capture so we run before Cropper drops non-primary buttons.
    host.addEventListener('pointerdown', onPointerDown, true);
    host.addEventListener('pointermove', onPointerMove, true);
    host.addEventListener('pointerup', onPointerUp, true);
    host.addEventListener('pointercancel', onPointerUp, true);
    host.addEventListener('auxclick', onAuxClick, true);

    return () => {
      endPan();
      host.removeEventListener('pointerdown', onPointerDown, true);
      host.removeEventListener('pointermove', onPointerMove, true);
      host.removeEventListener('pointerup', onPointerUp, true);
      host.removeEventListener('pointercancel', onPointerUp, true);
      host.removeEventListener('auxclick', onAuxClick, true);
    };
  }, [ready]);

  const handleConfirm = async () => {
    const cropper = cropperRef.current;
    if (!cropper || busy || !ready) return;
    setBusy(true);
    setError('');
    try {
      const selection = cropper.getCropperSelection();
      const cropperImage = cropper.getCropperImage();
      if (!selection || !cropperImage) {
        throw new Error('자르기 영역을 찾을 수 없습니다.');
      }
      const transform = cropperImage.$getTransform();
      const natural = naturalSizeFromSelection(selection, transform);
      const canvas = await selection.$toCanvas({
        width: natural.width,
        height: natural.height,
        ...(keepTransparency
          ? {}
          : {
            beforeDraw: (ctx, c) => {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, c.width, c.height);
            },
          }),
      });
      if (!canvas || canvas.width < 1 || canvas.height < 1) {
        throw new Error('자른 영역을 만들 수 없습니다.');
      }
      const baseName = (fileName || 'image').replace(/\.[^.]+$/, '') || 'image';
      const { file, area } = await fileFromCroppedCanvas(canvas, {
        keepTransparency,
        fileName: keepTransparency ? `${baseName}-crop.png` : `${baseName}-crop.jpg`,
      });
      await onConfirm(file, {
        x: selection.x,
        y: selection.y,
        width: area.width,
        height: area.height,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <p className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">
        Cropper.js 2 방식입니다. 박스를 드래그해 자르고, 휠로 확대·축소하세요.
        휠 클릭(중클릭) 드래그로 배경 이미지를 패닝할 수 있습니다. 결과는 원본 해상도로 저장됩니다.
      </p>
      <div
        ref={hostRef}
        className="relative min-h-[220px] w-full flex-1 overflow-hidden rounded-lg [&_cropper-canvas]:h-full! [&_cropper-canvas]:w-full!"
        style={keepTransparency ? CHECKERBOARD_STYLE : { backgroundColor: '#ffffff' }}
      >
        <img
          key={imageSrc}
          ref={imgRef}
          src={imageSrc}
          alt=""
          className="block max-h-full max-w-full"
          crossOrigin="anonymous"
        />
        {!ready && !loadError ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-neutral-500 dark:bg-black/40 dark:text-neutral-300">
            <Loader2 size={18} className="mr-2 animate-spin" />
            준비 중…
          </div>
        ) : null}
      </div>
      <label className="flex shrink-0 cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
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
      {loadError ? <p className="shrink-0 text-xs text-red-600 dark:text-red-300">{loadError}</p> : null}
      {error ? <p className="shrink-0 text-xs text-red-600 dark:text-red-300">{error}</p> : null}
      <div className="flex shrink-0 justify-end gap-2">
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
          disabled={busy || !ready}
          className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Crop size={16} />}
          {busy ? '적용 중…' : '자르기 적용'}
        </button>
      </div>
    </div>
  );
}
