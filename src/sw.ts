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

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

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
