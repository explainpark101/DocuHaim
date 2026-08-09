/**
 * True for Safari (macOS / iOS), not Chrome/Edge/Firefox/CriOS etc.
 */
export function isSafariBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (!/Safari/i.test(ua)) return false;
  return !/Chrome|Chromium|CriOS|Edg|FxiOS|OPiOS|Android/i.test(ua);
}
