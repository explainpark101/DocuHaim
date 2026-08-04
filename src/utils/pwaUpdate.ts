const BUILD_RELOAD_GUARD_KEY = 's3haim_build_reload_guard';

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

/**
 * Compare the network build-id.json against this bundle's build id.
 * On mismatch, wipe SW/caches and reload once so every path gets the latest build.
 * @returns {Promise<boolean>} false when a forced reload was triggered
 */
export async function ensureLatestAppBuild(): Promise<boolean> {
  if (!import.meta.env.PROD) return true;
  if (import.meta.env.VITE_ELECTRON === 'true') return true;

  const localId = import.meta.env.VITE_APP_BUILD_ID;
  if (!localId || typeof localId !== 'string') return true;

  const base = import.meta.env.BASE_URL || '/';
  const url = `${base}build-id.json?t=${Date.now()}`;

  let remoteId: string | undefined;
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!response.ok) return true;
    const payload = (await response.json()) as { id?: unknown };
    if (typeof payload?.id !== 'string' || !payload.id) return true;
    remoteId = payload.id;
  } catch (error: unknown) {
    // Offline or blocked — keep the currently loaded build.
    console.warn('Build id check failed:', error);
    return true;
  }

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

  try {
    await clearServiceWorkerCaches();
  } catch (error: unknown) {
    console.warn('Failed to clear service worker caches:', error);
  }

  window.location.reload();
  return false;
}
