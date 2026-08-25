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

/** Tauri desktop on macOS (native traffic lights + Overlay titlebar). */
export function isTauriMacOS(): boolean {
  if (!isTauriDesktopPlatform() || typeof navigator === 'undefined') return false;
  return /Mac|Macintosh/i.test(navigator.userAgent) || /Mac/i.test(navigator.platform || '');
}

/** Tauri desktop on Windows (borderless + custom window controls). */
export function isTauriWindows(): boolean {
  if (!isTauriDesktopPlatform() || typeof navigator === 'undefined') return false;
  return /Windows/i.test(navigator.userAgent) || /Win/i.test(navigator.platform || '');
}
