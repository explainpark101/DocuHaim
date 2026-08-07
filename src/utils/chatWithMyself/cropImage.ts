import { normalizeCssHexColor } from '@/utils/cssColor';
import type { CropPadMeta } from '@/utils/chatWithMyself/cropPadImage';

export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GetCroppedImgOptions = {
  fileName?: string;
  quality?: number;
  keepTransparency?: boolean;
  backgroundColor?: string | null;
};

export type CroppedImgResult = {
  file: File;
  /** Output size / crop rect in natural (original) image pixels. */
  area: PixelCrop;
};

/**
 * @param url
 */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

async function canvasToFile(
  canvas: HTMLCanvasElement,
  options: GetCroppedImgOptions,
): Promise<File> {
  const keepTransparency = Boolean(options.keepTransparency);
  const mime = keepTransparency ? 'image/png' : 'image/jpeg';
  const quality = options.quality ?? 0.92;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Crop failed'));
      },
      mime,
      keepTransparency ? undefined : quality,
    );
  });
  const fileName =
    options.fileName || (keepTransparency ? 'group-icon.png' : 'group-icon.jpg');
  return new File([blob], fileName, { type: mime });
}

/**
 * Crop an image to a pixel area.
 * PNG + alpha when `keepTransparency` is true; otherwise flatten onto `backgroundColor`.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  options: GetCroppedImgOptions = {},
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas not available');
  }

  const w = Math.max(1, Math.round(pixelCrop.width));
  const h = Math.max(1, Math.round(pixelCrop.height));
  canvas.width = w;
  canvas.height = h;

  const keepTransparency = Boolean(options.keepTransparency);
  if (!keepTransparency) {
    ctx.fillStyle = normalizeCssHexColor(options.backgroundColor) || '#ffffff';
    ctx.fillRect(0, 0, w, h);
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    w,
    h,
  );

  return canvasToFile(canvas, options);
}

/**
 * Export a crop taken on a (possibly downscaled) padded composite at the
 * **original** image's natural resolution.
 *
 * `composeImageColorGrid` may shrink the source cell to fit MAX_GRID_SIDE;
 * cropping that blob directly yields a much smaller file. Map composite-pixel
 * coords back through `meta.cellWidth/Height` and draw from `originalSrc`.
 */
export async function getCroppedImgFromPadMeta(
  originalSrc: string,
  compositeCrop: PixelCrop,
  meta: CropPadMeta,
  options: GetCroppedImgOptions = {},
): Promise<CroppedImgResult> {
  const image = await createImage(originalSrc);
  const naturalW = Math.max(1, image.naturalWidth || image.width);
  const naturalH = Math.max(1, image.naturalHeight || image.height);
  const scaleX = naturalW / Math.max(1, meta.cellWidth);
  const scaleY = naturalH / Math.max(1, meta.cellHeight);

  const natX = (compositeCrop.x - meta.originX) * scaleX;
  const natY = (compositeCrop.y - meta.originY) * scaleY;
  const natW = Math.max(1, compositeCrop.width * scaleX);
  const natH = Math.max(1, compositeCrop.height * scaleY);

  const outW = Math.max(1, Math.round(natW));
  const outH = Math.max(1, Math.round(natH));
  const dxScale = outW / natW;
  const dyScale = outH / natH;

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas not available');
  }

  const keepTransparency = Boolean(options.keepTransparency);
  if (!keepTransparency) {
    ctx.fillStyle = normalizeCssHexColor(options.backgroundColor) || '#ffffff';
    ctx.fillRect(0, 0, outW, outH);
  } else {
    ctx.clearRect(0, 0, outW, outH);
  }

  const srcLeft = Math.max(0, natX);
  const srcTop = Math.max(0, natY);
  const srcRight = Math.min(naturalW, natX + natW);
  const srcBottom = Math.min(naturalH, natY + natH);

  if (srcRight > srcLeft && srcBottom > srcTop) {
    const destX = (srcLeft - natX) * dxScale;
    const destY = (srcTop - natY) * dyScale;
    const destW = (srcRight - srcLeft) * dxScale;
    const destH = (srcBottom - srcTop) * dyScale;
    ctx.drawImage(
      image,
      srcLeft,
      srcTop,
      srcRight - srcLeft,
      srcBottom - srcTop,
      destX,
      destY,
      destW,
      destH,
    );
  }

  const file = await canvasToFile(canvas, options);
  return {
    file,
    area: { x: natX, y: natY, width: outW, height: outH },
  };
}

/**
 * Turn a cropperjs canvas into a File (PNG/JPEG).
 */
export async function fileFromCroppedCanvas(
  canvas: HTMLCanvasElement,
  options: GetCroppedImgOptions = {},
): Promise<CroppedImgResult> {
  const keepTransparency = Boolean(options.keepTransparency);
  if (!keepTransparency) {
    // Flatten onto opaque background when JPEG / non-alpha requested.
    const flat = document.createElement('canvas');
    flat.width = canvas.width;
    flat.height = canvas.height;
    const ctx = flat.getContext('2d');
    if (!ctx) throw new Error('Canvas not available');
    ctx.fillStyle = normalizeCssHexColor(options.backgroundColor) || '#ffffff';
    ctx.fillRect(0, 0, flat.width, flat.height);
    ctx.drawImage(canvas, 0, 0);
    const file = await canvasToFile(flat, options);
    return {
      file,
      area: { x: 0, y: 0, width: flat.width, height: flat.height },
    };
  }
  const file = await canvasToFile(canvas, options);
  return {
    file,
    area: { x: 0, y: 0, width: canvas.width, height: canvas.height },
  };
}
