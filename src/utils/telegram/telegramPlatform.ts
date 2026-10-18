import { isTauriAndroid, isTauriDesktopPlatform } from '@/utils/tauriPlatform';

/** GramJS runs only in Tauri desktop and Tauri Android WebViews. */
export function isTelegramShell(): boolean {
  return isTauriDesktopPlatform() || isTauriAndroid();
}
