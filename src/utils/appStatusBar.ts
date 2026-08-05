export const APP_STATUS_BAR_SELECTOR = '[data-app-status-bar]';

/** Fallback when the bar is missing: md:h-7. */
export const APP_STATUS_BAR_FALLBACK_PX = 28;

export function getAppStatusBarTop(): number {
  const bar = document.querySelector(APP_STATUS_BAR_SELECTOR);
  if (bar instanceof HTMLElement) {
    return bar.getBoundingClientRect().top;
  }
  return window.innerHeight - APP_STATUS_BAR_FALLBACK_PX;
}

export function getAppStatusBarHeight(): number {
  return Math.max(0, Math.round(window.innerHeight - getAppStatusBarTop()));
}

export function getAppStatusBarElement(): HTMLElement | null {
  const bar = document.querySelector(APP_STATUS_BAR_SELECTOR);
  return bar instanceof HTMLElement ? bar : null;
}
