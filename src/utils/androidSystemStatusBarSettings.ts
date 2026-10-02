/**
 * Android system status bar (clock / battery) visibility preference.
 * Applies via Tauri JNI command on MainActivity.
 *
 * Modes:
 * - `status-bar` — keep system status bar visible (content padded below)
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
    await invoke('android_set_system_status_bar_visible', { visible });
  } catch (error) {
    console.warn('android_set_system_status_bar_visible failed:', error);
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

/** Boot: mark html class + apply stored preference. */
export function initAndroidSystemStatusBar(): void {
  if (!isTauriAndroid() || typeof document === 'undefined') return;
  document.documentElement.classList.add('android-app');
  const visible = loadAndroidSystemStatusBarVisible();
  void applyAndroidSystemStatusBarVisible(visible);
}
