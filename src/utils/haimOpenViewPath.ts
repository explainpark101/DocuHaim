/**
 * Bridge so HaimLink can open vault notes without prop drilling.
 * Registered by HaimEditor while mounted.
 */

export type HaimOpenViewPathFn = (path: string) => void;

let openFn: HaimOpenViewPathFn | null = null;

export function registerHaimOpenViewPath(fn: HaimOpenViewPathFn | null): void {
  openFn = fn;
}

export function isHaimOpenViewPathAvailable(): boolean {
  return typeof openFn === 'function';
}

/** Open a vault storage path in the app editor (no-op if unregistered). */
export function openHaimViewPath(path: string): boolean {
  const p = String(path || '').trim().replace(/^\/+/, '');
  if (!p || typeof openFn !== 'function') return false;
  openFn(p);
  return true;
}
