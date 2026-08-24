/**
 * True in the Tauri/desktop shell.
 * - Build-time: `VITE_ELECTRON=true` (`build:tauri` / `tauri:vite`)
 * - Runtime: Tauri webview globals (covers tauri:dev even if env is missed)
 */
export function isDesktopApp(): boolean {
  if (import.meta.env.VITE_ELECTRON === 'true') return true;
  if (typeof window === 'undefined') return false;
  return '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
}
