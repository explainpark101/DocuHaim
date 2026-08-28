export type TauriDropPosition = {
  x: number;
  y: number;
  toLogical?: (scaleFactor: number) => { x: number; y: number };
};

export type ClientPoint = {
  x: number;
  y: number;
};

function dedupePoints(points: ClientPoint[]): ClientPoint[] {
  const seen = new Set<string>();
  const out: ClientPoint[] = [];
  for (const point of points) {
    const key = `${Math.round(point.x * 1000)}:${Math.round(point.y * 1000)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(point);
  }
  return out;
}

/**
 * Viewport point candidates for Tauri native drag-drop positions.
 * WKWebView on macOS often reports CSS pixels while Windows uses physical pixels.
 */
export function tauriDropClientPointCandidates(
  position: TauriDropPosition,
  scaleFactor = 1,
): ClientPoint[] {
  const points: ClientPoint[] = [{ x: position.x, y: position.y }];

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  if (dpr !== 1) {
    points.push({ x: position.x / dpr, y: position.y / dpr });
  }

  if (typeof position.toLogical === 'function' && scaleFactor > 0 && scaleFactor !== 1) {
    const logical = position.toLogical(scaleFactor);
    points.push({ x: logical.x, y: logical.y });
  }

  return dedupePoints(points);
}
