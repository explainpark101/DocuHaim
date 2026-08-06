/**
 * Chrome DevTools CSS number scrub multipliers (relative to the control's `step`):
 * none → 1×, Alt → 0.1×, Shift → 10×, Ctrl/Cmd → 100×
 * @see https://developer.chrome.com/docs/devtools/shortcuts
 */
export function getChromeDevToolsNumberStep(mods: {
  altKey: boolean;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}): number {
  if (mods.altKey) return 0.1;
  if (mods.shiftKey) return 10;
  if (mods.ctrlKey || mods.metaKey) return 100;
  return 1;
}

/**
 * Effective scrub delta for wheel / arrow keys.
 * `css` multiplies DevTools modifiers by `step` so step={0.1} nudges by 0.1 (not 1).
 * `percent` stays ±1 regardless of step.
 */
export function getScrubStepForEvent(
  unit: 'percent' | 'css',
  mods: { altKey: boolean; shiftKey: boolean; ctrlKey: boolean; metaKey: boolean },
  step: number,
): number {
  if (unit === 'percent') return getPercentScrubStep();
  const base = Number.isFinite(step) && step > 0 ? step : 1;
  return base * getChromeDevToolsNumberStep(mods);
}

/** Percent scrub: always ±1 per notch (no modifier scaling). */
export function getPercentScrubStep(): number {
  return 1;
}

export function clampNumber(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Round to avoid float noise (0.1 steps → 1 decimal). */
export function roundScrubValue(n: number, step: number): number {
  if (step < 1) {
    const decimals = Math.max(0, Math.ceil(-Math.log10(step)));
    const factor = 10 ** decimals;
    return Math.round(n * factor) / factor;
  }
  if (step >= 1 && Number.isInteger(step)) {
    return Math.round(n);
  }
  const decimals = Math.max(0, Math.ceil(-Math.log10(step % 1 || 1)));
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}
