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
