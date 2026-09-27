export type HaimProseWidthPanelPosition = {
  leftVw: number;
  topVh: number;
};

const STORAGE_KEY = 's3haim_haim_prose_width_panel_pos_v2';

/** Bottom-right above status bar (approx; free-drag overrides after first move). */
const DEFAULT_POSITION: HaimProseWidthPanelPosition = {
  leftVw: 78,
  topVh: 72,
};

export function hasStoredHaimProseWidthPanelPosition(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}

/**
 * Default placement: panel bottom sits just above the app status bar,
 * right edge inset from the viewport.
 */
export function resolveDefaultHaimProseWidthPanelPosition(
  panelWidthPx = 360,
  panelHeightPx = 160,
): HaimProseWidthPanelPosition {
  if (typeof window === 'undefined') return DEFAULT_POSITION;
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;
  const statusEl = document.querySelector('[data-app-status-bar]');
  const statusH =
    statusEl instanceof HTMLElement ? statusEl.getBoundingClientRect().height : 28;
  const gap = 8;
  const rightInset = 16;
  const leftPx = Math.max(8, vw - panelWidthPx - rightInset);
  const topPx = Math.max(8, vh - statusH - gap - panelHeightPx);
  return {
    leftVw: (leftPx / vw) * 100,
    topVh: (topPx / vh) * 100,
  };
}

export function loadHaimProseWidthPanelPosition(): HaimProseWidthPanelPosition {
  if (typeof window === 'undefined') return DEFAULT_POSITION;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return resolveDefaultHaimProseWidthPanelPosition();
    const parsed = JSON.parse(raw) as Partial<HaimProseWidthPanelPosition>;
    const leftVw = Number(parsed.leftVw);
    const topVh = Number(parsed.topVh);
    if (!Number.isFinite(leftVw) || !Number.isFinite(topVh)) {
      return resolveDefaultHaimProseWidthPanelPosition();
    }
    return {
      leftVw: Math.min(92, Math.max(0, leftVw)),
      topVh: Math.min(90, Math.max(0, topVh)),
    };
  } catch {
    return resolveDefaultHaimProseWidthPanelPosition();
  }
}

export function saveHaimProseWidthPanelPosition(
  position: HaimProseWidthPanelPosition,
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
  } catch {
    // ignore quota / private mode
  }
}
