import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
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

const plugins = [
  react(),
  tailwindcss(),
  emitBuildIdPlugin(),
];

if (!isElectron) {
  plugins.push(
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
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
          method: 'GET',
          enctype: 'application/x-www-form-urlencoded',
          params: {
            title: 'title',
            text: 'text',
            url: 'url',
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
      workbox: {
        // Do not precache HTML / disable navigateFallback (plugin default is index.html).
        // Soft refresh on any SPA path must hit the network (GitHub Pages
        // 404.html → latest index) instead of a stale precached shell.
        globPatterns: ['**/*.{js,css,png,svg,ico,woff,woff2}'],
        navigateFallback: null,
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Always revalidate the build stamp (never serve from SW cache).
            urlPattern: /build-id\.json$/i,
            handler: 'NetworkOnly',
          },
        ],
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
