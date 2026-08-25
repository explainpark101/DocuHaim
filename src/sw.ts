import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import {
  SHARE_TARGET_FILE_PARAM,
  SHARE_TARGET_FLAG,
  isChatShareTargetPath,
  storeShareTargetFiles,
} from './utils/chatWithMyself/shareTargetCache';

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<string | { url: string; revision: string | null }>;
};

/**
 * coi-serviceworker posts this when the page loads.
 * @see https://github.com/gzuidhof/coi-serviceworker
 */
let coepCredentialless = true;

self.addEventListener('message', (event) => {
  const data = event.data as { type?: string; value?: boolean } | null;
  if (!data) return;
  if (data.type === 'coepCredentialless') {
    coepCredentialless = Boolean(data.value);
  }
});

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

/**
 * Stamp COOP/COEP on document navigations only (enough for crossOriginIsolated).
 * Avoid wrapping every fetch so Workbox precache/routes keep ownership.
 * First-load isolation on GitHub Pages is provided by coi-serviceworker.js;
 * this keeps isolation after the VitePWA worker takes over.
 *
 * Skip non-GET navigations: Web Share Target posts as mode=navigate + POST to
 * /chat; that must reach the share_target registerRoute (303 + Cache Storage),
 * not a network POST that static hosting cannot serve (blank white screen).
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.mode !== 'navigate') return;
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return;
  }

  event.respondWith(
    (async () => {
      const response = await fetch(request);
      if (response.status === 0) return response;
      const headers = new Headers(response.headers);
      headers.set(
        'Cross-Origin-Embedder-Policy',
        coepCredentialless ? 'credentialless' : 'require-corp',
      );
      if (!coepCredentialless) {
        headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
      }
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    })(),
  );
});

registerRoute(/build-id\.json$/i, new NetworkOnly());

registerRoute(
  ({ url, request }) =>
    request.method === 'POST' && isChatShareTargetPath(url.pathname),
  async ({ request, url }) => {
    const formData = await request.formData();
    const title = String(formData.get('title') || '').trim();
    const text = String(formData.get('text') || '').trim();
    const shareUrl = String(formData.get('url') || '').trim();
    const media = formData
      .getAll(SHARE_TARGET_FILE_PARAM)
      .filter((entry): entry is Blob => entry instanceof Blob);

    await storeShareTargetFiles(media);

    const redirect = new URL(url.pathname, self.location.origin);
    if (title) redirect.searchParams.set('title', title);
    if (text) redirect.searchParams.set('text', text);
    if (shareUrl) redirect.searchParams.set('url', shareUrl);
    redirect.searchParams.set(SHARE_TARGET_FLAG, '1');
    return Response.redirect(redirect.href, 303);
  },
  'POST',
);
