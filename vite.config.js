import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const isElectron = process.env.VITE_ELECTRON === 'true';
const basePath = process.env.VITE_BASE_PATH || '/';
const normalizedBase = basePath.replace(/\/?$/, '/');
const appBuildId =
  process.env.VITE_APP_BUILD_ID ||
  process.env.GITHUB_SHA ||
  `local-${Date.now()}`;

// Expose to the client as import.meta.env.VITE_APP_BUILD_ID
process.env.VITE_APP_BUILD_ID = appBuildId;

function isBuildIdRequest(urlPath) {
  const pathname = String(urlPath || '').split('?')[0];
  return pathname === '/build-id.json' || pathname === `${normalizedBase}build-id.json`;
}

function emitBuildIdPlugin() {
  const payload = JSON.stringify({ id: appBuildId });
  return {
    name: 'emit-build-id',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!isBuildIdRequest(req.url)) {
          next();
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(payload);
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'build-id.json',
        source: payload,
      });
    },
  };
}

/** `/docs` (no slash) → `/docs/` so SPA history fallback does not serve the app shell. */
function docsTrailingSlashPlugin() {
  const bareDocsPath = `${normalizedBase.replace(/\/$/, '')}/docs`.replace(/\/{2,}/g, '/');

  const redirectBareDocs = (req, res, next) => {
    const url = new URL(req.url || '/', 'http://vite.local');
    if (url.pathname !== bareDocsPath) {
      next();
      return;
    }
    res.statusCode = 301;
    res.setHeader('Location', `${bareDocsPath}/${url.search}`);
    res.end();
  };

  return {
    name: 'docs-trailing-slash',
    configureServer(server) {
      server.middlewares.use(redirectBareDocs);
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirectBareDocs);
    },
    closeBundle() {
      // Netlify / Cloudflare Pages: send bare /docs to /docs/ (static files still win).
      const redirects = `${bareDocsPath}  ${bareDocsPath}/  301\n`;
      const outDir = path.resolve(__dirname, 'dist');
      try {
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, '_redirects'), redirects);
      } catch (error) {
        console.warn('docs host hints write failed:', error);
      }
    },
  };
}

const plugins = [
  react({
    // Keep node_modules out; also skip VitePress caches (Babel would otherwise
    // transform huge prebundled deps under .vitepress/cache/deps).
    exclude: [/\/node_modules\//, /\/\.vitepress\//],
  }),
  tailwindcss(),
  emitBuildIdPlugin(),
  docsTrailingSlashPlugin(),
];

if (!isElectron) {
  plugins.push(
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'og-image.png'],
      manifest: {
        id: normalizedBase,
        lang: 'ko',
        name: 'S3 Haim',
        short_name: 'S3 Haim',
        description: 'S3, 로컬, WebDAV에 저장하는 마크다운 메모 앱',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: normalizedBase,
        scope: normalizedBase,
        share_target: {
          action: `${normalizedBase}chat`,
          method: 'POST',
          enctype: 'multipart/form-data',
          params: {
            title: 'title',
            text: 'text',
            url: 'url',
            files: [
              {
                name: 'media',
                accept: [
                  '*/*',
                  'image/*',
                  'video/*',
                  'audio/*',
                  'text/*',
                  'application/*',
                  '.jpg',
                  '.jpeg',
                  '.png',
                  '.gif',
                  '.webp',
                  '.svg',
                  '.bmp',
                  '.heic',
                  '.heif',
                  '.mp4',
                  '.webm',
                  '.mov',
                  '.mkv',
                  '.mp3',
                  '.wav',
                  '.ogg',
                  '.m4a',
                  '.pdf',
                  '.doc',
                  '.docx',
                  '.xls',
                  '.xlsx',
                  '.ppt',
                  '.pptx',
                  '.txt',
                  '.md',
                  '.csv',
                  '.json',
                  '.zip',
                ],
              },
            ],
          },
        },
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      injectManifest: {
        // Do not precache HTML (navigateFallback stays unset).
        // Soft refresh on any SPA path must hit the network (GitHub Pages
        // 404.html → latest index) instead of a stale precached shell.
        globPatterns: ['**/*.{js,css,png,svg,ico,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    })
  );
}

export default defineConfig({
  base: basePath,
  plugins,
  assetsInclude: ['**/*.wasm', '**/*.gmdl'],
  optimizeDeps: {
    exclude: ['garu-ko'],
  },
  server: {
    watch: {
      ignored: ['**/.vitepress/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  worker: {
    format: 'es',
  },
})
