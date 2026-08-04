import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { type Area, type MediaSize, type Size } from 'react-easy-crop';
import { Dialog } from 'radix-ui';
import { getCroppedImg } from '@/utils/chatWithMyself/cropImage';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

/** Smallest crop region (source pixels) the zoom slider may reach. */
export const GROUP_ICON_MIN_CROP_PX = 32;

type ChatGroupIconCropModalProps = {
  open: boolean;
  imageSrc: string | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (file: File) => void | Promise<void>;
  title?: string;
};

function mediaZoomOf(media: MediaSize): number {
  return media.width > media.height
    ? media.width / media.naturalWidth
    : media.height / media.naturalHeight;
}

/**
 * Max zoom so the crop window can shrink to ~minPx × minPx on the source image.
 */
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

/**
 * Round avatar crop dialog (react-easy-crop).
 */
export default function ChatGroupIconCropModal({
  open,
  imageSrc,
  onOpenChange,
  onConfirm,
  title = '그룹 아이콘',
}: ChatGroupIconCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [maxZoom, setMaxZoom] = useState(3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const mediaRef = useRef<MediaSize | null>(null);
  const cropSizeRef = useRef<Size | null>(null);

  const recomputeMaxZoom = useCallback(() => {
    const media = mediaRef.current;
    const cropSz = cropSizeRef.current;
    if (!media || !cropSz) return;
    const next = maxZoomForMinCropPx(media, cropSz);
    setMaxZoom(next);
    setZoom((z) => Math.min(z, next));
  }, []);

  useEffect(() => {
    if (!open) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMaxZoom(3);
    setCroppedAreaPixels(null);
    setBusy(false);
    mediaRef.current = null;
    cropSizeRef.current = null;
  }, [open, imageSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels || busy) return;
    setBusy(true);
    try {
      const file = await getCroppedImg(imageSrc, croppedAreaPixels);
      await onConfirm(file);
      onOpenChange(false);
    } catch {
      setBusy(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className={`${chatDialogContentClass} w-[min(92vw,400px)]`}
          aria-describedby={undefined}
        >
          <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            {title}
          </Dialog.Title>
          <div className="relative mt-3 h-[min(60vh,320px)] w-full overflow-hidden rounded-lg bg-black/90">
            {imageSrc ? (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                minZoom={1}
                maxZoom={maxZoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                onMediaLoaded={(media) => {
                  mediaRef.current = media;
                  recomputeMaxZoom();
                }}
                onCropSizeChange={(size) => {
                  cropSizeRef.current = size;
                  recomputeMaxZoom();
                }}
              />
            ) : null}
          </div>
          <label className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span className="shrink-0">확대</span>
            <input
              type="range"
              min={1}
              max={maxZoom}
              step={0.01}
              value={Math.min(zoom, maxZoom)}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </label>
          <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            최대 확대 시 약 {GROUP_ICON_MIN_CROP_PX}×{GROUP_ICON_MIN_CROP_PX}px까지 자를 수 있습니다.
          </p>
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
