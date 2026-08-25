import { isDesktopApp } from '@/utils/isDesktopApp';

const GEMINI_PROXY_PREFIX = '/api/gemini';

export const GEMINI_API_PATH_PREFIX = '/v1beta';

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
    return await fetch(`${GEMINI_PROXY_PREFIX}${path}`, requestInit);
  } catch (err) {
    throw new Error(formatGeminiNetworkError(err));
  }
}
