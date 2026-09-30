import { isDesktopApp } from '@/utils/shared/isDesktopApp';
import { isTauriMacOS } from '@/utils/shared/tauriPlatform';

/**
 * Tauri shells: pin the document to the dynamic viewport and block page scroll.
 * Inner panes keep their own overflow:auto regions.
 */
export function initDesktopViewport(): void {
  if (!isDesktopApp() || typeof document === 'undefined') return;

  const root = document.documentElement;
  root.classList.add('desktop-app');
  // macOS-only: traffic-light inset CSS (`--traffic-light-box`). Never set on Windows.
  root.classList.toggle('macos-titlebar', isTauriMacOS());

  const resetDocumentScroll = () => {
    if (window.scrollX !== 0 || window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
    if (root.scrollTop !== 0) root.scrollTop = 0;
    if (document.body.scrollTop !== 0) document.body.scrollTop = 0;
  };

  resetDocumentScroll();
  window.addEventListener('resize', resetDocumentScroll);
}
