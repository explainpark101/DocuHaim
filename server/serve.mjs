/**
 * Production static host + Gemini API same-origin proxy for web deployments
 * (Render, etc.). Avoids browser CORS on generativelanguage.googleapis.com.
 */
import { join, extname } from 'node:path';
import { existsSync } from 'node:fs';
import { serve } from 'bun';

const GEMINI_ORIGIN = 'https://generativelanguage.googleapis.com';
const DIST_DIR = join(import.meta.dir, '../dist');
const PORT = Number(process.env.PORT || 3000);

const ISOLATION_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
};

function isAllowedGeminiPath(pathname) {
  return pathname.startsWith('/v1beta/');
}

async function proxyGemini(req, url) {
  const geminiPath = url.pathname.replace(/^\/api\/gemini/, '') + url.search;
  const pathname = geminiPath.split('?')[0] ?? geminiPath;
  if (!isAllowedGeminiPath(pathname)) {
    return new Response('Forbidden', { status: 403, headers: ISOLATION_HEADERS });
  }

  const headers = new Headers();
  const apiKey = req.headers.get('x-goog-api-key');
  if (apiKey) headers.set('x-goog-api-key', apiKey);
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  const method = req.method.toUpperCase();
  const body =
    method !== 'GET' && method !== 'HEAD' ? await req.arrayBuffer() : undefined;

  let upstream;
  try {
    upstream = await fetch(`${GEMINI_ORIGIN}${geminiPath}`, {
      method,
      headers,
      body,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return Response.json(
      { error: { message: `Gemini upstream failed: ${detail}` } },
      { status: 502, headers: ISOLATION_HEADERS },
    );
  }

  const outHeaders = { ...ISOLATION_HEADERS };
  const upstreamType = upstream.headers.get('content-type');
  if (upstreamType) outHeaders['content-type'] = upstreamType;

  return new Response(upstream.body, {
    status: upstream.status,
    headers: outHeaders,
  });
}

function resolveStaticPath(pathname) {
  const safe = pathname === '/' ? '/index.html' : pathname;
  const filePath = join(DIST_DIR, safe.replace(/^\/+/, ''));
  if (!filePath.startsWith(DIST_DIR)) return null;
  if (existsSync(filePath)) return filePath;
  if (!extname(safe)) return join(DIST_DIR, 'index.html');
  return null;
}

async function serveStatic(req, url) {
  const filePath = resolveStaticPath(url.pathname);
  if (!filePath || !existsSync(filePath)) {
    return new Response('Not Found', { status: 404, headers: ISOLATION_HEADERS });
  }
  const file = Bun.file(filePath);
  const headers = { ...ISOLATION_HEADERS };
  const type = file.type;
  if (type) headers['content-type'] = type;
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('build-id.json')) {
    headers['cache-control'] = 'no-store';
  }
  return new Response(file, { headers });
}

serve({
  port: PORT,
  hostname: '0.0.0.0',
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/api/gemini')) {
      return proxyGemini(req, url);
    }
    return serveStatic(req, url);
  },
});

console.log(`DocuHaim server listening on http://0.0.0.0:${PORT}`);
