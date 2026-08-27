import type { MutableRefObject } from 'react';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

export type DesktopCloseGuardHandlers = {
  isDirty: () => boolean;
  suppressQuitCheckRef?: MutableRefObject<boolean>;
  onRequestQuitConfirm: () => void;
};

let handlers: DesktopCloseGuardHandlers | null = null;
let allowQuit = false;
let listenerInstalled = false;

export function registerDesktopCloseGuard(next: DesktopCloseGuardHandlers | null): void {
  handlers = next;
}

export function setDesktopQuitAllowed(value: boolean): void {
  allowQuit = value;
}

export async function closeDesktopWindowNow(): Promise<void> {
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  await getCurrentWindow().close();
}

/** Register Tauri close guard as early as possible (main bootstrap). */
export function initDesktopWindowCloseGuard(): void {
  if (!isTauriDesktopPlatform() || listenerInstalled) return;
  listenerInstalled = true;

  void import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
    void getCurrentWindow().onCloseRequested((event) => {
      if (allowQuit) return;
      if (handlers?.suppressQuitCheckRef?.current) return;
      if (!handlers?.isDirty()) return;
      event.preventDefault();
      handlers.onRequestQuitConfirm();
    });
  });
}
