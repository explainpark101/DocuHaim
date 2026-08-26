import { isDesktopApp } from '@/utils/shared/isDesktopApp';
const BUILD_RELOAD_GUARD_KEY = 's3haim_build_reload_guard';

export type RemoteBuildIdResult =
  | { ok: true; remoteId: string }
  | { ok: false; error: string };

export type AppBuildCheckResult =
  | {
      ok: true;
      localId: string;
      remoteId: string;
      updateAvailable: boolean;
    }
  | {
      ok: false;
      localId: string;
      error: string;
      remoteId?: string;
    };

/**
 * Ask the browser to check for a newer service worker and resolve whether
 * an update is waiting (or becomes waiting within timeoutMs).
 */
export async function checkServiceWorkerUpdate(
  registration: ServiceWorkerRegistration | null | undefined,
  timeoutMs = 10000,
): Promise<boolean> {
  if (!registration) return false;
  if (registration.waiting) return true;

  return new Promise((resolve) => {
    let settled = false;

    const finish = (found: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      registration.removeEventListener('updatefound', onUpdateFound);
      resolve(found);
    };

    const watchWorker = (worker: ServiceWorker | null) => {
      if (!worker) return;
      if (worker.state === 'installed' && (navigator.serviceWorker.controller || registration.waiting)) {
        finish(true);
        return;
      }
      worker.addEventListener('statechange', () => {
        if (worker.state !== 'installed') return;
        finish(Boolean(navigator.serviceWorker.controller) || Boolean(registration.waiting));
      });
    };

    const onUpdateFound = () => {
      watchWorker(registration.installing);
    };

    if (registration.installing) {
      watchWorker(registration.installing);
    }
    registration.addEventListener('updatefound', onUpdateFound);

    const timer = window.setTimeout(() => {
      finish(Boolean(registration.waiting));
    }, timeoutMs);

    registration
      .update()
      .then(() => {
        if (registration.waiting) finish(true);
      })
      .catch((error: unknown) => {
        console.warn('PWA update check failed:', error);
        finish(Boolean(registration.waiting));
      });
  });
}

async function clearServiceWorkerCaches(): Promise<void> {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }
}

export function getLocalAppBuildId(): string {
  const id = import.meta.env.VITE_APP_BUILD_ID;
  return typeof id === 'string' ? id.trim() : '';
}

function buildIdRequestUrl(): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}build-id.json?t=${Date.now()}`;
}

export async function fetchRemoteBuildId(): Promise<RemoteBuildIdResult> {
  try {
    const response = await fetch(buildIdRequestUrl(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` };
    }
    const payload = (await response.json()) as { id?: unknown };
    if (typeof payload?.id !== 'string' || !payload.id.trim()) {
      return { ok: false, error: 'invalid build-id payload' };
    }
    return { ok: true, remoteId: payload.id.trim() };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message || 'network error' };
  }
}

export async function checkAppBuildUpdate(): Promise<AppBuildCheckResult> {
  const localId = getLocalAppBuildId();
  const remote = await fetchRemoteBuildId();
  if (!remote.ok) {
    return { ok: false, localId, error: remote.error };
  }
  if (!localId) {
    return {
      ok: false,
      localId,
      error: 'local build id missing',
      remoteId: remote.remoteId,
    };
  }
  return {
    ok: true,
    localId,
    remoteId: remote.remoteId,
    updateAvailable: localId !== remote.remoteId,
  };
}

export async function applyForcedAppUpdate(): Promise<void> {
  try {
    await clearServiceWorkerCaches();
  } catch (error: unknown) {
    console.warn('Failed to clear service worker caches:', error);
  }
  window.location.reload();
}

/**
 * Compare the network build-id.json against this bundle's build id.
 * On mismatch, wipe SW/caches and reload once so every path gets the latest build.
 * @returns {Promise<boolean>} false when a forced reload was triggered
 */
export async function ensureLatestAppBuild(): Promise<boolean> {
  if (!import.meta.env.PROD) return true;
  if (isDesktopApp()) return true;

  const localId = getLocalAppBuildId();
  if (!localId) return true;

  const remote = await fetchRemoteBuildId();
  if (!remote.ok) {
    console.warn('Build id check failed:', remote.error);
    return true;
  }
  const remoteId = remote.remoteId;

  if (remoteId === localId) {
    try {
      window.sessionStorage.removeItem(BUILD_RELOAD_GUARD_KEY);
    } catch {
      // ignore
    }
    return true;
  }

  try {
    if (window.sessionStorage.getItem(BUILD_RELOAD_GUARD_KEY) === remoteId) {
      console.warn('Build id mismatch persists after reload; skipping another force reload.');
      return true;
    }
    window.sessionStorage.setItem(BUILD_RELOAD_GUARD_KEY, remoteId);
  } catch {
    // sessionStorage unavailable — still attempt a single clear + reload
  }

  await applyForcedAppUpdate();
  return false;
}
