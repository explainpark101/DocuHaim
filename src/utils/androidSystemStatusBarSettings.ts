/**
 * Android system status bar (clock / battery) visibility preference.
 * Applies via Tauri JNI command on MainActivity + CSS --android-safe-top.
 *
 * Modes:
 * - `status-bar` — keep system status bar visible; web pads below it
 *   (edge-to-edge WebView; do not rely on setDecorFitsSystemWindows)
 * - `fullscreen` — immersive hide / cover the status bar
 */

import { invoke } from '@tauri-apps/api/core';
import { isTauriAndroid } from '@/utils/tauriPlatform';

const STORAGE_KEY = 's3haim_android_system_status_bar_visible';
export const ANDROID_SYSTEM_STATUS_BAR_CHANGED_EVENT =
  's3haim-android-system-status-bar-changed';

export type AndroidChromeMode = 'fullscreen' | 'status-bar';

/** Default: show the system status bar (immersive fullscreen is opt-in). */
export function loadAndroidSystemStatusBarVisible(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === '1' || raw === 'true';
  } catch {
    return true;
  }
}

export function loadAndroidChromeMode(): AndroidChromeMode {
  return loadAndroidSystemStatusBarVisible() ? 'status-bar' : 'fullscreen';
}

export function saveAndroidSystemStatusBarVisible(visible: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, visible ? '1' : '0');
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ANDROID_SYSTEM_STATUS_BAR_CHANGED_EVENT, {
        detail: { visible, mode: visible ? 'status-bar' : 'fullscreen' },
      }),
    );
  }
}

export async function applyAndroidSystemStatusBarVisible(
  visible: boolean,
): Promise<void> {
  if (!isTauriAndroid()) return;
  document.documentElement.classList.toggle(
    'android-status-bar-hidden',
    !visible,
  );
  document.documentElement.classList.toggle(
    'android-status-bar-visible',
    visible,
  );
  document.documentElement.classList.toggle('android-chrome-fullscreen', !visible);
  document.documentElement.classList.toggle('android-chrome-status-bar', visible);
  try {
    const insetPx = await invoke<number>('android_set_system_status_bar_visible', {
      visible,
    });
    if (visible && Number.isFinite(insetPx) && insetPx > 0) {
      // Exact native inset — avoids overlap when env(safe-area-inset-top) is 0.
      document.documentElement.style.setProperty(
        '--android-safe-top',
        `${Math.round(insetPx)}px`,
      );
    } else {
      document.documentElement.style.setProperty('--android-safe-top', '0px');
    }
  } catch (error) {
    console.warn('android_set_system_status_bar_visible failed:', error);
    // Classes still apply CSS max(env, fallback) when inline is cleared.
    document.documentElement.style.removeProperty('--android-safe-top');
  }
}

/** Persist + apply. */
export async function setAndroidSystemStatusBarVisible(
  visible: boolean,
): Promise<void> {
  saveAndroidSystemStatusBarVisible(visible);
  await applyAndroidSystemStatusBarVisible(visible);
}

export async function setAndroidChromeMode(
  mode: AndroidChromeMode,
): Promise<void> {
  await setAndroidSystemStatusBarVisible(mode === 'status-bar');
}

/** Boot: mark html class + apply stored preference after first paint. */
export function initAndroidSystemStatusBar(): void {
  if (!isTauriAndroid() || typeof document === 'undefined') return;
  document.documentElement.classList.add('android-app');
  const visible = loadAndroidSystemStatusBarVisible();
  // Apply CSS classes immediately; defer JNI until the splash frame has painted
  // so a slow/failing native call cannot race Activity startup.
  document.documentElement.classList.toggle('android-status-bar-hidden', !visible);
  document.documentElement.classList.toggle('android-status-bar-visible', visible);
  document.documentElement.classList.toggle('android-chrome-fullscreen', !visible);
  document.documentElement.classList.toggle('android-chrome-status-bar', visible);
  const applyNative = () => {
    void applyAndroidSystemStatusBarVisible(visible);
  };
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      requestAnimationFrame(applyNative);
    });
  } else {
    window.setTimeout(applyNative, 0);
  }
}
