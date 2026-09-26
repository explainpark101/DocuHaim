/**
 * Tiny early entry: splash progress + show Tauri window while main graph loads.
 * Built as a separate Rollup entry and injected before the main module (bootManifestPlugin).
 */
import { initBootSplash } from '@/boot/bootSplash';
import { markTauriMainWindowRevealed } from '@/utils/revealTauriMainWindow';

const splash = initBootSplash();
splash.setStatus('시작 화면 준비 중…');

async function showTauriWindowEarly(): Promise<void> {
  const w = window as Window & {
    __TAURI_INTERNALS__?: unknown;
    __TAURI__?: unknown;
  };
  if (!('__TAURI_INTERNALS__' in w) && !('__TAURI__' in w)) return;
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const win = getCurrentWindow();
    await win.show();
    try {
      await win.setFocus();
    } catch {
      // Focus optional.
    }
    markTauriMainWindowRevealed();
    splash.setStatus('앱 모듈 로딩 중…');
    splash.setProgress(0.08);
  } catch (err) {
    console.warn('[earlyBoot] show window failed', err);
  }
}

void showTauriWindowEarly();
