import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Cropper, {
  getInitialCropFromCroppedAreaPixels,
  type Area,
  type MediaSize,
  type Size,
} from 'react-easy-crop';
import { Dialog, Switch } from 'radix-ui';
import { getCroppedImg } from '@/utils/chatWithMyself/cropImage';
import {
  composeImageColorGrid,
  isSvgImageSource,
  suggestPadBackground,
  type CropPadMeta,
} from '@/utils/chatWithMyself/cropPadImage';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import ChatImageBackgroundPicker, {
  CHAT_COLOR_PICKER_ATTR,
} from '@/components/chatWithMyself/ChatImageBackgroundPicker';

/** Smallest crop region (source pixels) the zoom slider may reach. */
export const GROUP_ICON_MIN_CROP_PX = 32;

const ZOOM_STEP_FINE = 0.0002;
const ZOOM_STEP_DEFAULT = 0.001;
const ZOOM_STEP_MEDIUM = 0.02;
const ZOOM_STEP_COARSE = 0.08;
const SNAP_RATIO = 0.06;

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

type ModifierZoom = {
  step: number;
  speed: number;
  keyboardStep: number;
};

type ChatGroupIconCropModalProps = {
  open: boolean;
  imageSrc: string | null;
  sourceFile?: File | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (file: File) => void | Promise<void>;
  title?: string;
};

function mediaZoomOf(media: MediaSize): number {
  return media.width > media.height
    ? media.width / media.naturalWidth
    : media.height / media.naturalHeight;
}

export function maxZoomForMinCropPx(
  media: MediaSize,
  cropSize: Size,
  minPx: number = GROUP_ICON_MIN_CROP_PX,
): number {
  const mz = mediaZoomOf(media);
  if (!Number.isFinite(mz) || mz <= 0) return 1;
  const side = Math.min(cropSize.width, cropSize.height);
  if (!Number.isFinite(side) || side <= 0) return 1;
  const needed = side / (Math.max(1, minPx) * mz);
  return Math.max(1, needed);
}

function zoomFromModifiers(event?: {
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
} | null): ModifierZoom {
  if (event?.ctrlKey || event?.metaKey) {
    return { step: ZOOM_STEP_COARSE, speed: 2.8, keyboardStep: 8 };
  }
  if (event?.shiftKey) {
    return { step: ZOOM_STEP_MEDIUM, speed: 1.4, keyboardStep: 3 };
  }
  if (event?.altKey) {
    return { step: ZOOM_STEP_FINE, speed: 0.12, keyboardStep: 0.25 };
  }
  return { step: ZOOM_STEP_DEFAULT, speed: 0.45, keyboardStep: 0.6 };
}

function areaDistance(a: Area, b: Area): number {
  return (
    Math.abs(a.x - b.x) +
    Math.abs(a.y - b.y) +
    Math.abs(a.width - b.width) +
    Math.abs(a.height - b.height)
  );
}

function buildSnapTargets(meta: CropPadMeta, current: Area): Area[] {
  const ox = meta.cellWidth;
  const oy = meta.cellHeight;
  const ow = meta.cellWidth;
  const oh = meta.cellHeight;
  const ocx = ox + ow / 2;
  const ocy = oy + oh / 2;
  const cover = Math.max(ow, oh);
  const inset = Math.min(ow, oh);
  const side = Math.max(1, current.width);
  const xs = [ox, ox + ow - side, ocx - side / 2];
  const ys = [oy, oy + oh - side, ocy - side / 2];
  const targets: Area[] = [
    { x: ocx - cover / 2, y: ocy - cover / 2, width: cover, height: cover },
    { x: ocx - inset / 2, y: ocy - inset / 2, width: inset, height: inset },
  ];
  for (const x of xs) {
    for (const y of ys) {
      targets.push({ x, y, width: side, height: side });
    }
  }
  return targets;
}

function nearestSnapTarget(meta: CropPadMeta, current: Area): Area | null {
  const targets = buildSnapTargets(meta, current);
  let best: Area | null = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const target of targets) {
    const dist = areaDistance(current, target);
    if (dist < bestDist) {
      best = target;
      bestDist = dist;
    }
  }
  const threshold = Math.max(12, current.width * SNAP_RATIO * 4);
  if (!best || bestDist > threshold) return null;
  return best;
}

function isColorPickerTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest(`[${CHAT_COLOR_PICKER_ATTR}]`));
}

/**
 * Round avatar crop dialog (react-easy-crop) with 3x3 color padding.
 */
export default function ChatGroupIconCropModal({
  open,
  imageSrc,
  sourceFile = null,
  onOpenChange,
  onConfirm,
  title = '그룹 아이콘',
}: ChatGroupIconCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [maxZoom, setMaxZoom] = useState(3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [keepTransparency, setKeepTransparency] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState<string | null>('#ffffff');
  const [autoBackgroundColor, setAutoBackgroundColor] = useState<string>('#ffffff');
  const [compositeSrc, setCompositeSrc] = useState<string | null>(null);
  const [padMeta, setPadMeta] = useState<CropPadMeta | null>(null);
  const [zoomMods, setZoomMods] = useState<ModifierZoom>(() => zoomFromModifiers(null));
  const mediaRef = useRef<MediaSize | null>(null);
  const cropSizeRef = useRef<Size | null>(null);
  const compositeSrcRef = useRef<string | null>(null);
  const croppedAreaRef = useRef<Area | null>(null);
  const snappingRef = useRef(false);
  const didInitSnapRef = useRef(false);

  const recomputeMaxZoom = useCallback(() => {
    const media = mediaRef.current;
    const cropSz = cropSizeRef.current;
    if (!media || !cropSz) return;
    const next = maxZoomForMinCropPx(media, cropSz);
    setMaxZoom(next);
    setZoom((z) => Math.min(z, next));
  }, []);

  const applyAreaToCropper = useCallback(
    (area: Area) => {
      const media = mediaRef.current;
      const cropSz = cropSizeRef.current;
      if (!media || !cropSz) return;
      const next = getInitialCropFromCroppedAreaPixels(
        area,
        media,
        0,
        cropSz,
        1,
        maxZoom,
      );
      snappingRef.current = true;
      setCrop(next.crop);
      setZoom(Math.min(maxZoom, Math.max(1, next.zoom)));
      window.requestAnimationFrame(() => {
        snappingRef.current = false;
      });
    },
    [maxZoom],
  );

  const snapToOriginal = useCallback(() => {
    if (snappingRef.current) return;
    const current = croppedAreaRef.current;
    const meta = padMeta;
    if (!current || !meta) return;
    const target = nearestSnapTarget(meta, current);
    if (!target) return;
    applyAreaToCropper(target);
  }, [applyAreaToCropper, padMeta]);

  useEffect(() => {
    if (!open) return undefined;
    const syncMods = (event: KeyboardEvent | MouseEvent) => {
      setZoomMods(zoomFromModifiers(event));
    };
    const clearMods = () => setZoomMods(zoomFromModifiers(null));
    window.addEventListener('keydown', syncMods);
    window.addEventListener('keyup', syncMods);
    window.addEventListener('blur', clearMods);
    return () => {
      window.removeEventListener('keydown', syncMods);
      window.removeEventListener('keyup', syncMods);
      window.removeEventListener('blur', clearMods);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !imageSrc) return undefined;
    let cancelled = false;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMaxZoom(3);
    setCroppedAreaPixels(null);
    croppedAreaRef.current = null;
    setBusy(false);
    setKeepTransparency(true);
    const knownSvg = isSvgImageSource(sourceFile);
    setBackgroundColor(knownSvg ? null : '#ffffff');
    setAutoBackgroundColor('#ffffff');
    setPadMeta(null);
    didInitSnapRef.current = false;
    mediaRef.current = null;
    cropSizeRef.current = null;

    void suggestPadBackground(imageSrc, sourceFile)
      .then((suggestion) => {
        if (cancelled) return;
        setAutoBackgroundColor(suggestion.color);
        setBackgroundColor(suggestion.transparentDefault ? null : suggestion.color);
      })
      .catch(() => {
        if (!cancelled) {
          setAutoBackgroundColor('#ffffff');
          setBackgroundColor(knownSvg ? null : '#ffffff');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, imageSrc, sourceFile]);

  useEffect(() => {
    if (!open || !imageSrc) return undefined;
    let cancelled = false;
    void composeImageColorGrid(imageSrc, backgroundColor, {
      matteCenter: Boolean(backgroundColor) && !keepTransparency,
    })
      .then((next) => {
        if (cancelled) {
          URL.revokeObjectURL(next.src);
          return;
        }
        if (compositeSrcRef.current) URL.revokeObjectURL(compositeSrcRef.current);
        compositeSrcRef.current = next.src;
        setCompositeSrc(next.src);
        setPadMeta(next.meta);
      })
      .catch(() => {
        if (!cancelled) {
          setCompositeSrc(imageSrc);
          setPadMeta(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, imageSrc, backgroundColor, keepTransparency]);

  useEffect(() => {
    return () => {
      if (compositeSrcRef.current) {
        URL.revokeObjectURL(compositeSrcRef.current);
        compositeSrcRef.current = null;
      }
    };
  }, []);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    croppedAreaRef.current = pixels;
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!compositeSrc || !croppedAreaPixels || busy) return;
    setBusy(true);
    try {
      const padTransparent = !backgroundColor;
      const file = await getCroppedImg(compositeSrc, croppedAreaPixels, {
        keepTransparency: keepTransparency || padTransparent,
        backgroundColor:
          keepTransparency || padTransparent ? null : backgroundColor,
      });
      await onConfirm(file);
      onOpenChange(false);
    } catch {
      setBusy(false);
    }
  };

  const cropImageSrc = compositeSrc;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className={`${chatDialogContentClass} w-[min(92vw,420px)]`}
          aria-describedby={undefined}
          onPointerDownOutside={(event) => {
            if (isColorPickerTarget(event.target)) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (isColorPickerTarget(event.target)) event.preventDefault();
          }}
          onFocusOutside={(event) => {
            if (isColorPickerTarget(event.target)) event.preventDefault();
          }}
        >
          <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            {title}
          </Dialog.Title>
          <div
            className="relative mt-3 h-[min(60vh,320px)] w-full overflow-hidden rounded-lg"
            style={
              keepTransparency || !backgroundColor
                ? CHECKERBOARD_STYLE
                : { backgroundColor: backgroundColor || '#ffffff' }
            }
          >
            {cropImageSrc ? (
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                minZoom={1}
                maxZoom={maxZoom}
                zoomSpeed={zoomMods.speed}
                keyboardStep={zoomMods.keyboardStep}
                aspect={1}
                cropShape="round"
                showGrid={false}
                roundCropAreaPixels
                style={{ containerStyle: { backgroundColor: 'transparent' } }}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                onInteractionEnd={() => {
                  snapToOriginal();
                }}
                onMediaLoaded={(media) => {
                  mediaRef.current = media;
                  recomputeMaxZoom();
                  if (didInitSnapRef.current || !padMeta) return;
                  didInitSnapRef.current = true;
                  const cover = Math.max(padMeta.cellWidth, padMeta.cellHeight);
                  applyAreaToCropper({
                    x: padMeta.cellWidth + (padMeta.cellWidth - cover) / 2,
                    y: padMeta.cellHeight + (padMeta.cellHeight - cover) / 2,
                    width: cover,
                    height: cover,
                  });
                }}
                onCropSizeChange={(size) => {
                  cropSizeRef.current = size;
                  recomputeMaxZoom();
                }}
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-black/10 dark:bg-white/10" />
            )}
          </div>
          <label className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span className="shrink-0">확대</span>
            <input
              type="range"
              min={1}
              max={maxZoom}
              step={zoomMods.step}
              value={Math.min(zoom, maxZoom)}
              onChange={(e) => setZoom(Number(e.target.value))}
              onPointerUp={() => snapToOriginal()}
              className="w-full accent-blue-600"
            />
          </label>
          <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            Ctrl 크게 · Shift 중간 · Alt 미세
          </p>
          <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
            <span className="min-w-0">
              <span className="block text-xs font-medium text-gray-800 dark:text-odp-fgStrong">
                PNG 투명 배경 유지
              </span>
              <span className="mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted">
                끄면 가운데 칸도 배경색으로 매트한 뒤 JPEG로 저장합니다.
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
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ChatImageBackgroundPicker
              value={backgroundColor}
              onChange={setBackgroundColor}
              compact
              allowNone
              noneLabel="투명"
            />
            <button
              type="button"
              className="rounded-md border border-gray-300 px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-gray-300 dark:hover:bg-odp-focusBg"
              onClick={() => setBackgroundColor(autoBackgroundColor)}
            >
              가장자리 평균
            </button>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg"
                disabled={busy}
              >
                취소
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => void handleConfirm()}
              disabled={busy || !croppedAreaPixels}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:opacity-40"
            >
              {busy ? '저장 중…' : '저장'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
