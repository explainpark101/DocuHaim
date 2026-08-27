import type { MutableRefObject } from 'react';
import { isTauriDesktopPlatform, isTauriMacOS } from '@/utils/tauriPlatform';

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

/** Let other close listeners (tab persist) run, then exit the macOS shell. */
async function finishMacosDesktopQuit(): Promise<void> {
  await new Promise<void>((resolve) => {
    queueMicrotask(resolve);
  });
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 0);
  });
  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('exit_app');
}

/** Fully close the desktop shell. */
export async function performDesktopQuit(): Promise<void> {
  if (isTauriMacOS()) {
    await finishMacosDesktopQuit();
    return;
  }
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  await getCurrentWindow().destroy();
}

export async function closeDesktopWindowNow(): Promise<void> {
  await performDesktopQuit();
}

function shouldBypassCloseGuard(): boolean {
  if (allowQuit) return true;
  if (handlers?.suppressQuitCheckRef?.current) return true;
  if (!handlers?.isDirty()) return true;
  return false;
}

/** Register Tauri close guard as early as possible (main bootstrap). */
export function initDesktopWindowCloseGuard(): void {
  if (!isTauriDesktopPlatform() || listenerInstalled) return;
  listenerInstalled = true;

  void import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
    void getCurrentWindow().onCloseRequested((event) => {
      if (isTauriMacOS()) {
        // Hijack native hide-on-close; quit explicitly after persist hooks run.
        event.preventDefault();
        if (shouldBypassCloseGuard()) {
          void finishMacosDesktopQuit();
          return;
        }
        handlers?.onRequestQuitConfirm();
        return;
      }

      if (allowQuit) return;
      if (handlers?.suppressQuitCheckRef?.current) return;
      if (!handlers?.isDirty()) return;
      event.preventDefault();
      handlers.onRequestQuitConfirm();
    });
  });
}
