import { isDesktopApp } from '@/utils/shared/isDesktopApp';

/** Google AI Studio / Generative Language API origin (web calls this directly). */
export const GEMINI_API_ORIGIN = 'https://generativelanguage.googleapis.com';

/** Same-origin path used only by the Tauri @google/genai fetch shim (not web). */
const GEMINI_TAURI_SHIM_PREFIX = '/api/gemini';

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
    if (isDesktopApp()) {
      return ['Gemini API에 연결할 수 없습니다.', '', '네트워크 연결을 확인하세요.'].join('\n');
    }
    return [
      'Gemini API에 연결할 수 없습니다.',
      '',
      'Google AI Studio API 키와 네트워크 연결을 확인하세요.',
      '브라우저 보안 정책(CORS)으로 차단된 경우 Google API 문서를 확인하세요.',
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

function isGeminiTauriShimRequest(url: string): boolean {
  try {
    const parsed = new URL(url, globalThis.location?.origin ?? 'http://localhost');
    return (
      parsed.pathname === GEMINI_TAURI_SHIM_PREFIX ||
      parsed.pathname.startsWith(`${GEMINI_TAURI_SHIM_PREFIX}/`)
    );
  } catch {
    return (
      url.startsWith(`${GEMINI_TAURI_SHIM_PREFIX}/`) || url.startsWith(`${GEMINI_TAURI_SHIM_PREFIX}?`)
    );
  }
}

async function readRequestBody(init?: RequestInit): Promise<string | undefined> {
  if (!init?.body) return undefined;
  if (typeof init.body === 'string') return init.body;
  if (init.body instanceof Blob) return init.body.text();
  return undefined;
}

function resolveLocalOrigin(): string {
  const origin = globalThis.location?.origin;
  if (typeof origin === 'string' && origin.length > 0) return origin;
  return 'http://localhost';
}

/**
 * Base URL for @google/genai httpOptions.
 * SDK requires an absolute URL (relative paths fail in constructUrl).
 * Web: direct Google AI Studio origin.
 * Tauri: same-origin shim path; ensureGeminiFetchShim routes to Rust HTTP.
 */
export function resolveGeminiHttpBaseUrl(): string {
  if (isDesktopApp()) {
    return `${resolveLocalOrigin()}${GEMINI_TAURI_SHIM_PREFIX}`;
  }
  return GEMINI_API_ORIGIN;
}

/**
 * Routes @google/genai SDK fetch calls through fetchGeminiApi on Tauri desktop.
 * Web uses native fetch to generativelanguage.googleapis.com (no backend proxy).
 */
export function ensureGeminiFetchShim(): void {
  if (geminiFetchShimInstalled || !isDesktopApp()) return;
  geminiFetchShimInstalled = true;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = resolveRequestUrl(input);
    if (!isGeminiTauriShimRequest(url)) {
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
 * Tauri: native HTTP via Rust command (no browser CORS).
 * Web: browser fetch directly to Google AI Studio (fetchGeminiApi is shim-only on web).
 */
export async function fetchGeminiApi(path: string, init: GeminiFetchInit): Promise<Response> {
  assertAllowedGeminiPath(path);
  const method = init.method ?? 'GET';

  if (isDesktopApp()) {
    // @ts-expect-error TS(2347): Untyped function calls may not accept type argumen... Remove this comment to see the full error message
    const result = await invoke<TauriGeminiFetchResult>('gemini_api_fetch', {
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
    return await nativeFetch(`${GEMINI_API_ORIGIN}${path}`, requestInit);
  } catch (err) {
    throw new Error(formatGeminiNetworkError(err));
  }
}
