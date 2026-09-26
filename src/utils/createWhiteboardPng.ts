/**
 * Create a blank PNG whiteboard for ink annotate / lightbox drawing.
 */

const MAX_EDGE = 8192;
const MIN_EDGE = 16;

function clampEdge(n: number): number {
  return Math.min(MAX_EDGE, Math.max(MIN_EDGE, Math.round(n)));
}

export type CreateWhiteboardPngOptions = {
  width: number;
  height: number;
  /** CSS hex `#rrggbb` or `#rrggbbaa`. Default white. */
  background?: string;
};

function parseFillColor(background: string): string {
  const raw = (background || '#ffffff').trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(raw)) {
    return raw;
  }
  return '#ffffff';
}

export async function createWhiteboardPngFile(
  options: CreateWhiteboardPngOptions,
): Promise<File> {
  const width = clampEdge(options.width);
  const height = clampEdge(options.height);
  const fill = parseFillColor(options.background ?? '#ffffff');

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D unavailable');

  // Clear then fill so alpha backgrounds stay transparent where needed.
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/png');
  });
  if (!blob) throw new Error('Failed to encode whiteboard PNG');

  return new File([blob], `whiteboard-${width}x${height}.png`, {
    type: 'image/png',
  });
}
