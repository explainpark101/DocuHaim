/**
 * lucivy-wasm needs SharedArrayBuffer (pthread) → crossOriginIsolated.
 * Vite sets COOP+COEP headers; GitHub Pages uses coi-serviceworker
 * (https://github.com/gzuidhof/coi-serviceworker) then the app PWA SW.
 * Tauri uses a native lucivy-core index — isolation is not required.
 */

import { isTauriApp } from '@/utils/tauriPlatform';

export function isSearchIsolationReady(): boolean {
  if (isTauriApp()) return true;
  return typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated === true;
}

export function searchIsolationBlockedReason(): string | null {
  if (isSearchIsolationReady()) return null;
  if (typeof crossOriginIsolated === 'undefined') {
    return 'This browser does not support cross-origin isolation.';
  }
  return 'Cross-origin isolation is required for the search index (SharedArrayBuffer). Reload after the service worker activates, or use a host that sends COOP/COEP headers.';
}
