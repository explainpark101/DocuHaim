/**
 * Deploy template: Social Preview Inspector (HTMLRewriter OG/Twitter extract).
 * @see https://cloudflare-experiments.com/docs/experiments/social-preview-inspector
 */
export const OG_WORKER_DEPLOY_URL =
  'https://deploy.workers.cloudflare.com/?url=https://github.com/explainpark101/og/tree/main/';

export const OG_WORKER_DEPLOY_BUTTON_IMG =
  'https://deploy.workers.cloudflare.com/button';

const LOCAL_STORAGE_KEY = 's3haim_og_worker_url';

const PATH_SUFFIX_RE = /\/(inspect|metadata)$/i;

/**
 * Normalize a worker origin / base URL.
 * Accepts `https://….workers.dev`, trailing slashes, or `/inspect` / `/metadata`.
 * Returns '' when empty or not http(s).
 */
export function normalizeOgWorkerBaseUrl(
  raw: string | null | undefined,
): string {
  let s = String(raw || '').trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) return '';
  try {
    const u = new URL(s);
    let path = u.pathname.replace(/\/+$/, '');
    if (PATH_SUFFIX_RE.test(path)) {
      path = path.replace(PATH_SUFFIX_RE, '');
    }
    u.pathname = path || '/';
    u.search = '';
    u.hash = '';
    return u.toString().replace(/\/+$/, '');
  } catch {
    return '';
  }
}

/** Build `GET {base}/inspect?url=…` for Social Preview Inspector. */
export function buildOgWorkerInspectUrl(
  baseUrl: string,
  targetUrl: string,
): string {
  const base = normalizeOgWorkerBaseUrl(baseUrl);
  if (!base) throw new Error('Invalid OG worker URL');
  return `${base}/inspect?url=${encodeURIComponent(targetUrl)}`;
}

/** @deprecated Use buildOgWorkerInspectUrl */
export const buildOgWorkerMetadataUrl = buildOgWorkerInspectUrl;

export function loadOgWorkerUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    return normalizeOgWorkerBaseUrl(
      window.localStorage.getItem(LOCAL_STORAGE_KEY),
    );
  } catch {
    return '';
  }
}

/**
 * Persist worker base URL. Empty string clears the setting.
 * @returns normalized URL that was stored ('' if cleared / invalid→cleared)
 */
export function saveOgWorkerUrl(raw: string | null | undefined): string {
  if (typeof window === 'undefined') return '';
  const normalized = normalizeOgWorkerBaseUrl(raw);
  try {
    if (!normalized) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      return '';
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, normalized);
    return normalized;
  } catch {
    return normalized;
  }
}
