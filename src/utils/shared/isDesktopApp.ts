/**
 * True in any Tauri shell (desktop or Android/iOS).
 * - Build-time: `VITE_ELECTRON=true` (`build:tauri` / `tauri:vite` / Android builds)
 * - Runtime: Tauri webview globals (covers tauri:dev even if env is missed)
 *
 * For platform-specific behavior use `isTauriAndroid()` / `isTauriDesktopPlatform()`
 * from `@/utils/tauriPlatform`.
 */
export function isDesktopApp(): boolean {
  if (import.meta.env.VITE_ELECTRON === 'true') return true;
  if (typeof window === 'undefined') return false;
  return '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
}
