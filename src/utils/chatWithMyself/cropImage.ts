export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GetCroppedImgOptions = {
  fileName?: string;
  quality?: number;
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

/**
 * Crop an image to a pixel area and return a JPEG File.
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

  const quality = options.quality ?? 0.92;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Crop failed'));
      },
      'image/jpeg',
      quality,
    );
  });

  const fileName = options.fileName || 'group-icon.jpg';
  return new File([blob], fileName, { type: 'image/jpeg' });
}
