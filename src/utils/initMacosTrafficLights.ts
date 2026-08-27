import { isTauriMacOS } from '@/utils/tauriPlatform';

/** Re-apply macOS traffic-light layout after the webview paints custom titlebar chrome. */
export function initMacosTrafficLights(): void {
  if (!isTauriMacOS()) return;

  const reposition = () => {
    void import('@tauri-apps/api/core')
      .then(({ invoke }) => invoke('reposition_macos_traffic_lights'))
      .catch(() => {
        // Native helper is optional during web-only dev.
      });
  };

  if (document.readyState === 'complete') {
    window.setTimeout(reposition, 0);
  } else {
    window.addEventListener('load', () => window.setTimeout(reposition, 0), { once: true });
  }
}
