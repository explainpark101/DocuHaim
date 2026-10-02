/**
 * Reveal the Tauri main window after the first React paint.
 * Window starts with visible:false (tauri.conf); earlyBoot.ts may show it sooner
 * so the HTML splash is visible while the main module graph loads.
 *
 * Desktop only — Android/iOS Activity is already on-screen; calling window.show()
 * there races the mobile webview during splash.
 */
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

const REVEAL_FAILSAFE_MS = 15_000;

let revealed = false;
let failsafeTimer: ReturnType<typeof setTimeout> | null = null;

async function showMainWindow(): Promise<void> {
  if (!isTauriDesktopPlatform()) return;
  // earlyBoot may already have shown; still set revealed / clear failsafe.
  if (revealed) return;
  revealed = true;
  if (failsafeTimer != null) {
    clearTimeout(failsafeTimer);
    failsafeTimer = null;
  }
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const win = getCurrentWindow();
    await win.show();
    try {
      await win.setFocus();
    } catch {
      // Focus can fail on some platforms; show is enough.
    }
  } catch (err) {
    console.warn('[revealTauriMainWindow] show failed', err);
  }
}

/** Mark window as already shown (e.g. earlyBoot) so failsafe can still clear. */
export function markTauriMainWindowRevealed(): void {
  if (!isTauriDesktopPlatform()) return;
  revealed = true;
  if (failsafeTimer != null) {
    clearTimeout(failsafeTimer);
    failsafeTimer = null;
  }
}

/** Schedule show after two animation frames (first paint committed). */
export function scheduleRevealTauriMainWindow(): void {
  if (!isTauriDesktopPlatform()) return;

  if (failsafeTimer == null && !revealed) {
    failsafeTimer = setTimeout(() => {
      void showMainWindow();
    }, REVEAL_FAILSAFE_MS);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      void showMainWindow();
    });
  });
}
