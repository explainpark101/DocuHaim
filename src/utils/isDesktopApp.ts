/**
 * True when the SPA is built for the desktop shell (Tauri / legacy Electron flag).
 * Build with `VITE_ELECTRON=true` (see `build:tauri`).
 */
export function isDesktopApp(): boolean {
  return import.meta.env.VITE_ELECTRON === 'true';
}
