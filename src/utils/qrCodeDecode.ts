/** Decode QR payload from an image file (BarcodeDetector, then jsQR). */

type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorCtor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorLike;

function getBarcodeDetectorCtor(): BarcodeDetectorCtor | null {
  if (typeof window === 'undefined') return null;
  const Ctor = (
    window as Window & { BarcodeDetector?: BarcodeDetectorCtor }
  ).BarcodeDetector;
  return typeof Ctor === 'function' ? Ctor : null;
}

async function tryBarcodeDetector(file: File): Promise<string | null> {
  const Ctor = getBarcodeDetectorCtor();
  if (!Ctor) return null;
  try {
    const detector = new Ctor({ formats: ['qr_code'] });
    const codes = await detector.detect(file);
    for (const code of codes) {
      const raw = String(code.rawValue ?? '').trim();
      if (raw) return raw;
    }
  } catch {
    // Unsupported format / engine error → fall through to jsQR.
  }
  return null;
}

async function fileToImageData(file: File): Promise<ImageData> {
  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    bitmap = null;
  }

  if (bitmap) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, bitmap.width);
      canvas.height = Math.max(1, bitmap.height);
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Canvas를 사용할 수 없습니다.');
      ctx.drawImage(bitmap, 0, 0);
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    } finally {
      bitmap.close();
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.decoding = 'async';
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('이미지를 불러올 수 없습니다.'));
      el.src = url;
    });
    const width = Math.max(1, img.naturalWidth || img.width);
    const height = Math.max(1, img.naturalHeight || img.height);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas를 사용할 수 없습니다.');
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, width, height);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function decodeWithJsQr(imageData: ImageData): Promise<string | null> {
  const mod = await import('jsqr');
  const jsQR = mod.default;
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'attemptBoth',
  });
  const raw = String(code?.data ?? '').trim();
  return raw || null;
}

function ensureQrReadableSize(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const minSide = Math.min(canvas.width, canvas.height);
  if (minSide >= 320 || minSide < 1) return canvas;
  const scale = Math.min(4, 480 / minSide);
  const out = document.createElement('canvas');
  out.width = Math.max(1, Math.round(canvas.width * scale));
  out.height = Math.max(1, Math.round(canvas.height * scale));
  const ctx = out.getContext('2d');
  if (!ctx) return canvas;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, out.width, out.height);
  return out;
}

function canvasToPngFile(canvas: HTMLCanvasElement): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to encode PNG'));
        return;
      }
      resolve(new File([blob], 'qr-region.png', { type: 'image/png' }));
    }, 'image/png');
  });
}

/**
 * Read QR payload text from canvas pixels (full image or a cropped region).
 */
export async function decodeQrCodeFromCanvas(
  canvas: HTMLCanvasElement,
): Promise<string> {
  const prepared = ensureQrReadableSize(canvas);
  const file = await canvasToPngFile(prepared);
  return decodeQrCodeFromFile(file);
}

/**
 * Read QR payload text from an image File (PNG/JPEG/WebP/SVG, etc.).
 */
export async function decodeQrCodeFromFile(file: File): Promise<string> {
  if (!(file instanceof File) || file.size <= 0) {
    throw new Error('이미지 파일이 필요합니다.');
  }

  const fromDetector = await tryBarcodeDetector(file);
  if (fromDetector) return fromDetector;

  const imageData = await fileToImageData(file);
  const fromJsQr = await decodeWithJsQr(imageData);
  if (fromJsQr) return fromJsQr;

  throw new Error('이미지에서 QR 코드를 찾을 수 없습니다.');
}
