/**
 * Canvas-based text width measurement ("pretext").
 * Shared by chat adaptive tabs and print toolbar fit-width controls.
 */

export function createPretextMeasurer(font: string): (text: string) => number {
  if (typeof document === 'undefined') {
    return () => 0;
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return () => 0;
  }
  ctx.font = font || '14px sans-serif';
  return (text: string) => {
    if (!text) return 0;
    return ctx.measureText(text).width;
  };
}

export function fontShorthandFromElement(el: Element): string {
  if (typeof window === 'undefined') return '14px sans-serif';
  const cs = window.getComputedStyle(el);
  const weight = cs.fontWeight || '400';
  const size = cs.fontSize || '14px';
  const family = cs.fontFamily || 'sans-serif';
  return `${weight} ${size} ${family}`;
}

export function measurePretextWidth(text: string, font: string): number {
  return createPretextMeasurer(font)(text);
}
