import { isTauriAndroid, isTauriDesktopPlatform } from '@/utils/tauriPlatform';

/**
 * Product UI for Telegram stays off. Pane, settings, client, and tab records
 * remain in the tree as dormant data.
 */
export const TELEGRAM_TAB_VISIBLE = false;

/** GramJS runs only in Tauri desktop and Tauri Android WebViews. */
export function isTelegramShell(): boolean {
  return isTauriDesktopPlatform() || isTauriAndroid();
}

export function isTelegramTabVisible(): boolean {
  return TELEGRAM_TAB_VISIBLE && isTelegramShell();
}
