import { isDesktopApp } from '@/utils/isDesktopApp';

/** True in any Tauri shell (desktop or mobile). */
export function isTauriApp(): boolean {
  return isDesktopApp();
}

/** Heuristic: Tauri on iOS / Android (not macOS / Windows desktop). */
export function isTauriMobilePlatform(): boolean {
  if (!isTauriApp() || typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/** Tauri Android shell (sideload APK). */
export function isTauriAndroid(): boolean {
  if (!isTauriApp() || typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
}

/** Tauri on macOS / Windows (uses tauri-plugin-biometry). */
export function isTauriDesktopPlatform(): boolean {
  return isTauriApp() && !isTauriMobilePlatform();
}
