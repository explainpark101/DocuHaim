import type { MutableRefObject } from 'react';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { shutdownManagedLlmServersOnQuit } from '@/utils/llm/desktopManagedLlmShutdown';

export type DesktopCloseGuardHandlers = {
  isDirty: () => boolean;
  suppressQuitCheckRef?: MutableRefObject<boolean>;
  onRequestQuitConfirm: () => void;
};

const MAIN_WINDOW_LABEL = 'main';
const LLM_SHUTDOWN_TIMEOUT_MS = 1500;

let handlers: DesktopCloseGuardHandlers | null = null;
let allowQuit = false;
let listenerInstalled = false;
let quitInFlight = false;

export function registerDesktopCloseGuard(next: DesktopCloseGuardHandlers | null): void {
  handlers = next;
}

export function setDesktopQuitAllowed(value: boolean): void {
  allowQuit = value;
}

function shouldBypassCloseGuard(): boolean {
  if (allowQuit) return true;
  if (handlers?.suppressQuitCheckRef?.current) return true;
  if (!handlers?.isDirty()) return true;
  return false;
}

async function invokeProcessExit(): Promise<void> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('exit_app');
    return;
  } catch {
    // fall through
  }
  try {
    const { exit } = await import('@tauri-apps/plugin-process');
    await exit(0);
    return;
  } catch {
    // fall through
  }
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  await getCurrentWindow().destroy();
}

/** Let other close listeners (tab persist) run, then terminate the desktop process. */
async function finishDesktopQuit(): Promise<void> {
  if (quitInFlight) return;
  quitInFlight = true;
  try {
    await Promise.race([
      shutdownManagedLlmServersOnQuit(),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, LLM_SHUTDOWN_TIMEOUT_MS);
      }),
    ]);
    await new Promise<void>((resolve) => {
      queueMicrotask(resolve);
    });
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 0);
    });
    await invokeProcessExit();
  } finally {
    quitInFlight = false;
  }
}

/** Fully close the desktop shell. */
export async function performDesktopQuit(): Promise<void> {
  await finishDesktopQuit();
}

export async function closeDesktopWindowNow(): Promise<void> {
  await performDesktopQuit();
}

/**
 * Run the unsaved-changes check, then quit.
 * Used by custom titlebar Close (Windows/Linux) so WebView2 beforeunload cannot veto.
 */
export function requestDesktopClose(): void {
  if (!isTauriDesktopPlatform()) return;
  if (shouldBypassCloseGuard()) {
    void finishDesktopQuit();
    return;
  }
  handlers?.onRequestQuitConfirm();
}

/** Register Tauri close guard as early as possible (main bootstrap). */
export function initDesktopWindowCloseGuard(): void {
  if (!isTauriDesktopPlatform() || listenerInstalled) return;
  listenerInstalled = true;

  void import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
    const win = getCurrentWindow();
    void win.onCloseRequested((event) => {
      // LLM assist popout (and any other webview) must close independently.
      if (win.label !== MAIN_WINDOW_LABEL) return;
      // Always intercept: WebView2 beforeunload can silently cancel native close.
      event.preventDefault();
      requestDesktopClose();
    });
  });
}
