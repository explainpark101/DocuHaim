import { getVersion } from '@tauri-apps/api/app';
import type { Update } from '@tauri-apps/plugin-updater';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

export type TauriDesktopUpdateCheckResult =
  | {
      ok: true;
      localVersion: string;
      remoteVersion: string;
      updateAvailable: boolean;
    }
  | {
      ok: false;
      localVersion: string;
      error: string;
      remoteVersion?: string;
      updateAvailable?: boolean;
    };

let pendingDesktopUpdate: Update | null = null;

export function clearPendingTauriDesktopUpdate(): void {
  pendingDesktopUpdate = null;
}

export function hasPendingTauriDesktopUpdate(): boolean {
  return pendingDesktopUpdate !== null;
}

export async function checkTauriDesktopUpdate(): Promise<TauriDesktopUpdateCheckResult> {
  if (!isTauriDesktopPlatform()) {
    return {
      ok: false,
      localVersion: '',
      error: 'not-tauri-desktop',
    };
  }

  const localVersion = (await getVersion()).trim();

  try {
    const { check } = await import('@tauri-apps/plugin-updater');
    const update = await check();
    if (update?.available) {
      pendingDesktopUpdate = update;
      return {
        ok: true,
        localVersion,
        remoteVersion: update.version,
        updateAvailable: true,
      };
    }
    pendingDesktopUpdate = null;
    return {
      ok: true,
      localVersion,
      remoteVersion: localVersion,
      updateAvailable: false,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error ?? 'unknown');
    console.warn('Tauri desktop update check failed:', error);
    return {
      ok: false,
      localVersion,
      error: message,
      updateAvailable: hasPendingTauriDesktopUpdate(),
    };
  }
}

export async function installPendingTauriDesktopUpdate(): Promise<void> {
  if (!pendingDesktopUpdate) {
    throw new Error('No pending desktop update');
  }
  const update = pendingDesktopUpdate;
  pendingDesktopUpdate = null;
  await update.downloadAndInstall();
  const { relaunch } = await import('@tauri-apps/plugin-process');
  await relaunch();
}

const DESKTOP_UPDATE_POLL_MS = 5 * 60 * 1000;

type DesktopUpdateListener = (result: TauriDesktopUpdateCheckResult) => void;

let desktopUpdateListener: DesktopUpdateListener | null = null;
let desktopUpdatePollInstalled = false;

export function setTauriDesktopUpdateListener(listener: DesktopUpdateListener | null): void {
  desktopUpdateListener = listener;
}

export function initTauriDesktopUpdaterPolling(): void {
  if (!isTauriDesktopPlatform() || desktopUpdatePollInstalled) return;
  desktopUpdatePollInstalled = true;

  const runCheck = () => {
    void checkTauriDesktopUpdate().then((result) => {
      if (result.updateAvailable && desktopUpdateListener) {
        desktopUpdateListener(result);
      }
    });
  };

  runCheck();
  window.setInterval(runCheck, DESKTOP_UPDATE_POLL_MS);
  const onVisible = () => {
    if (document.visibilityState === 'visible') runCheck();
  };
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('focus', runCheck);
  window.addEventListener('pageshow', runCheck);
}
