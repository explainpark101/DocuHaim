import { requestDesktopClose } from '@/utils/desktopWindowCloseGuard';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

async function getAppWindow() {
  if (!isTauriDesktopPlatform()) return null;
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  return getCurrentWindow();
}

export async function minimizeDesktopWindow(): Promise<void> {
  const win = await getAppWindow();
  if (!win) return;
  await win.minimize();
}

export async function toggleMaximizeDesktopWindow(): Promise<boolean> {
  const win = await getAppWindow();
  if (!win) return false;
  await win.toggleMaximize();
  return win.isMaximized();
}

export async function isDesktopWindowMaximized(): Promise<boolean> {
  const win = await getAppWindow();
  if (!win) return false;
  return win.isMaximized();
}

export async function closeDesktopWindow(): Promise<void> {
  requestDesktopClose();
}
