/**
 * Open state for the Haim prose-width floating panel (survives leaving Settings).
 */

import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';
import { loadHaimProseWidthClampEnabled } from '@/utils/haimProseWidthSettings';

export const HAIM_PROSE_WIDTH_PANEL_CHANGED_EVENT = 's3haim-haim-prose-width-panel';

let panelOpen = false;

function dispatch(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(HAIM_PROSE_WIDTH_PANEL_CHANGED_EVENT, {
      detail: { open: panelOpen },
    }),
  );
}

export function isHaimProseWidthPanelOpen(): boolean {
  return panelOpen;
}

export function setHaimProseWidthPanelOpen(open: boolean): void {
  if (panelOpen === open) return;
  panelOpen = open;
  dispatch();
}

export function openHaimProseWidthPanel(): void {
  setHaimProseWidthPanelOpen(true);
}

export function closeHaimProseWidthPanel(): void {
  setHaimProseWidthPanelOpen(false);
}

/**
 * Enable clamp if needed and open the floating panel for live width tuning.
 */
export function openHaimProseWidthLivePanel(): void {
  if (!loadHaimProseWidthClampEnabled()) {
    setSettingsToggle('settings-haim-prose-width-clamp', true);
  }
  openHaimProseWidthPanel();
}

export function subscribeHaimProseWidthPanel(
  listener: (open: boolean) => void,
): () => void {
  if (typeof window === 'undefined') return () => {};
  const onEvt = (e: Event) => {
    const detail = (e as CustomEvent<{ open?: boolean }>).detail;
    listener(Boolean(detail?.open));
  };
  window.addEventListener(HAIM_PROSE_WIDTH_PANEL_CHANGED_EVENT, onEvt);
  return () => window.removeEventListener(HAIM_PROSE_WIDTH_PANEL_CHANGED_EVENT, onEvt);
}
