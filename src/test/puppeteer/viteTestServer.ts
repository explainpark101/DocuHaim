import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, type ViteDevServer } from 'vite';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const harnessEntry = path.resolve(rootDir, 'src/test/puppeteer/printPagedHarness.ts');

let server: ViteDevServer | null = null;
let baseUrl = '';

/** Minimal Vite server for puppeteer harness (no PWA / React app plugins). */
export async function startViteTestServer(): Promise<string> {
  if (baseUrl) return baseUrl;

  server = await createServer({
    configFile: false,
    root: rootDir,
    server: {
      port: 0,
      strictPort: false,
      host: '127.0.0.1',
      hmr: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
        'markdown-it': path.resolve(rootDir, 'node_modules/markdown-it'),
      },
    },
    optimizeDeps: {
      entries: [harnessEntry],
      include: [
        'pagedjs',
        'event-emitter',
        'markdown-it',
        'md-editor-rt',
        'mermaid',
      ],
      exclude: [
        'workbox-core',
        'workbox-precaching',
        'workbox-routing',
        'workbox-strategies',
      ],
    },
  });
  await server.listen();

  const addr = server.httpServer?.address();
  const port = typeof addr === 'object' && addr ? addr.port : 5173;
  baseUrl = `http://127.0.0.1:${port}`;

  // Pre-bundle harness deps so Puppeteer does not hit a mid-test HMR reload.
  await server.transformRequest('/src/test/puppeteer/printPagedHarness.ts');
  const warmup = await fetch(`${baseUrl}/src/test/puppeteer/printPagedHarness.html`);
  if (!warmup.ok) {
    throw new Error(`harness warmup failed: ${warmup.status} ${warmup.statusText}`);
  }
  await warmup.text();

  return baseUrl;
}

export async function stopViteTestServer(): Promise<void> {
  await server?.close();
  server = null;
  baseUrl = '';
}
