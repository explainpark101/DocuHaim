import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

/** Avoid width spring reflow on desktop WebView (macOS Tauri is especially costly). */
export const QUIZ_DOCK_OPEN_TRANSITION = isTauriDesktopPlatform()
  ? { duration: 0 }
  : { type: 'spring' as const, stiffness: 380, damping: 36 };

export const QUIZ_DOCK_RESIZE_TRANSITION = { duration: 0 };

/** Floating panels (generation queue) — same Tauri guard as side docks. */
export const QUIZ_FLOATING_PANEL_TRANSITION = isTauriDesktopPlatform()
  ? { duration: 0 }
  : { type: 'spring' as const, stiffness: 420, damping: 34 };

/** TOC list stagger — disabled on Tauri to avoid N simultaneous layout animations. */
export const QUIZ_TOC_ITEM_STAGGER_ENABLED = !isTauriDesktopPlatform();
