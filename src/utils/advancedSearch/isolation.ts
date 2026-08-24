/**
 * lucivy-wasm needs SharedArrayBuffer (pthread) → crossOriginIsolated.
 * Vite/Tauri set COOP+COEP headers; GitHub Pages uses coi-serviceworker
 * (https://github.com/gzuidhof/coi-serviceworker) then the app PWA SW.
 */

export function isSearchIsolationReady(): boolean {
  return typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated === true;
}

export function searchIsolationBlockedReason(): string | null {
  if (isSearchIsolationReady()) return null;
  if (typeof crossOriginIsolated === 'undefined') {
    return 'This browser does not support cross-origin isolation.';
  }
  return 'Cross-origin isolation is required for the search index (SharedArrayBuffer). Reload after the service worker activates, or use a host that sends COOP/COEP headers.';
}
