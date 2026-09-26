/**
 * Optional Web Ink API (DelegatedInkTrailPresenter) helpers + annotate composite.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Ink_API
 */

export type InkTrailStyle = {
  color: string;
  diameter: number;
};

export type DelegatedInkTrailPresenter = {
  updateInkTrailStartPoint: (
    event: PointerEvent,
    style: InkTrailStyle,
  ) => void;
};

type InkNavigator = Navigator & {
  ink?: {
    requestPresenter: (options?: {
      presentationArea?: Element;
    }) => Promise<DelegatedInkTrailPresenter>;
  };
};

export function isInkApiAvailable(): boolean {
  if (typeof navigator === 'undefined') return false;
  return Boolean((navigator as InkNavigator).ink?.requestPresenter);
}

export async function requestInkPresenter(
  presentationArea: Element,
): Promise<DelegatedInkTrailPresenter | null> {
  const ink = (navigator as InkNavigator).ink;
  if (!ink?.requestPresenter) return null;
  try {
    return await ink.requestPresenter({ presentationArea });
  } catch {
    return null;
  }
}

/**
 * Composite base image + ink + highlight layers into a PNG blob.
 * Prefers fetch(src) so cross-origin signed URLs stay untainted when CORS allows.
 */
export async function compositeAnnotatedImageBlob(options: {
  src: string;
  inkCanvas: HTMLCanvasElement | null;
  highlightCanvas: HTMLCanvasElement | null;
}): Promise<Blob> {
  const { src, inkCanvas, highlightCanvas } = options;
  const bitmap = await loadBitmap(src);
  const w = 'width' in bitmap ? bitmap.width : (bitmap as ImageBitmap).width;
  const h = 'height' in bitmap ? bitmap.height : (bitmap as ImageBitmap).height;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w));
  canvas.height = Math.max(1, Math.round(h));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D unavailable');
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, canvas.width, canvas.height);
  if (inkCanvas && inkCanvas.width > 0 && inkCanvas.height > 0) {
    ctx.drawImage(inkCanvas, 0, 0, canvas.width, canvas.height);
  }
  if (highlightCanvas && highlightCanvas.width > 0 && highlightCanvas.height > 0) {
    ctx.drawImage(highlightCanvas, 0, 0, canvas.width, canvas.height);
  }
  if ('close' in bitmap && typeof bitmap.close === 'function') {
    try {
      bitmap.close();
    } catch {
      // ignore
    }
  }
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/png');
  });
  if (!blob) throw new Error('Failed to encode PNG');
  return blob;
}

async function loadBitmap(src: string): Promise<ImageBitmap | HTMLImageElement> {
  try {
    const res = await fetch(src, { mode: 'cors', credentials: 'omit' });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  } catch {
    return await loadHtmlImage(src);
  }
}

function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image load failed for composite'));
    img.src = src;
  });
}
