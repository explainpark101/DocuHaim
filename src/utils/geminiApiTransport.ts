import { isDesktopApp } from '@/utils/isDesktopApp';

const GEMINI_PROXY_PREFIX = '/api/gemini';

export const GEMINI_API_PATH_PREFIX = '/v1beta';

const nativeFetch: typeof fetch =
  typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : fetch;

type GeminiFetchInit = {
  method?: string;
  apiKey: string;
  body?: string;
};

type TauriGeminiFetchResult = {
  status: number;
  body: string;
  contentType?: string;
};

let geminiFetchShimInstalled = false;

function assertAllowedGeminiPath(path: string): void {
  const pathname = path.split('?')[0] ?? path;
  if (!pathname.startsWith(`${GEMINI_API_PATH_PREFIX}/`)) {
    throw new Error('Invalid Gemini API path.');
  }
}

function formatGeminiNetworkError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/failed to fetch|networkerror|load failed|cors/i.test(msg)) {
    return [
      'Gemini API에 연결할 수 없습니다.',
      '',
      '웹 배포에서는 /api/gemini 프록시가 필요합니다.',
      'Render 등 Node 서버(start 스크립트)로 실행 중인지 확인하세요.',
    ].join('\n');
  }
  return msg || 'Gemini API 네트워크 오류';
}

function resolveRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

function readRequestHeader(init: RequestInit | undefined, name: string): string | undefined {
  if (!init?.headers) return undefined;
  const headers = init.headers;
  if (headers instanceof Headers) return headers.get(name) ?? undefined;
  if (Array.isArray(headers)) {
    const entry = headers.find(([key]) => key.toLowerCase() === name.toLowerCase());
    return entry?.[1];
  }
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === name.toLowerCase()) return value;
  }
  return undefined;
}

function isGeminiProxyRequest(url: string): boolean {
  try {
    const parsed = new URL(url, globalThis.location?.origin ?? 'http://localhost');
    return (
      parsed.pathname === GEMINI_PROXY_PREFIX ||
      parsed.pathname.startsWith(`${GEMINI_PROXY_PREFIX}/`)
    );
  } catch {
    return url.startsWith(`${GEMINI_PROXY_PREFIX}/`) || url.startsWith(`${GEMINI_PROXY_PREFIX}?`);
  }
}

async function readRequestBody(init?: RequestInit): Promise<string | undefined> {
  if (!init?.body) return undefined;
  if (typeof init.body === 'string') return init.body;
  if (init.body instanceof Blob) return init.body.text();
  return undefined;
}

function resolveGeminiProxyOrigin(): string {
  const origin = globalThis.location?.origin;
  if (typeof origin === 'string' && origin.length > 0) return origin;
  return 'http://localhost';
}

/**
 * Base URL for @google/genai httpOptions.
 * SDK requires an absolute URL (relative paths fail in constructUrl).
 * Web proxy or Tauri fetch shim still routes by /api/gemini pathname.
 */
export function resolveGeminiHttpBaseUrl(): string {
  return `${resolveGeminiProxyOrigin()}${GEMINI_PROXY_PREFIX}`;
}

/**
 * Routes @google/genai SDK fetch calls through fetchGeminiApi on desktop.
 * Web requests still use the same-origin /api/gemini proxy via native fetch.
 */
export function ensureGeminiFetchShim(): void {
  if (geminiFetchShimInstalled || !isDesktopApp()) return;
  geminiFetchShimInstalled = true;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = resolveRequestUrl(input);
    if (!isGeminiProxyRequest(url)) {
      return nativeFetch(input, init);
    }

    const parsed = new URL(url, globalThis.location?.origin ?? 'http://localhost');
    const path = `${parsed.pathname.replace(/^\/api\/gemini/, '')}${parsed.search}`;
    const method = init?.method ?? 'GET';
    const apiKey = readRequestHeader(init, 'x-goog-api-key') ?? '';
    const body = await readRequestBody(init);

    return fetchGeminiApi(path, {
      method,
      apiKey,
      ...(body ? { body } : {}),
    });
  };
}

/**
 * Browser/web: same-origin /api/gemini proxy (avoids Google CORS).
 * Tauri desktop: native HTTP via Rust command (no browser CORS).
 */
export async function fetchGeminiApi(path: string, init: GeminiFetchInit): Promise<Response> {
  assertAllowedGeminiPath(path);
  const method = init.method ?? 'GET';

  if (isDesktopApp()) {
    const { invoke } = await import('@tauri-apps/api/core');
    const result = await invoke<TauriGeminiFetchResult>('gemini_api_fetch', {
      path,
      method,
      apiKey: init.apiKey,
      body: init.body ?? null,
    });
    const headers = new Headers();
    if (result.contentType) headers.set('content-type', result.contentType);
    return new Response(result.body, { status: result.status, headers });
  }

  const headers: Record<string, string> = {
    'x-goog-api-key': init.apiKey,
  };
  if (init.body) headers['Content-Type'] = 'application/json';

  try {
    const requestInit: RequestInit = {
      method,
      headers,
    };
    if (init.body) requestInit.body = init.body;
    return await nativeFetch(`${GEMINI_PROXY_PREFIX}${path}`, requestInit);
  } catch (err) {
    throw new Error(formatGeminiNetworkError(err));
  }
}
