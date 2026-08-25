import { defineConfig, type Connect, type Plugin, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { VitePWA } from 'vite-plugin-pwa';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const isElectron = process.env.VITE_ELECTRON === 'true';
const basePath = process.env.VITE_BASE_PATH || '/';
const normalizedBase = basePath.replace(/\/?$/, '/');
const appBuildId =
  process.env.VITE_APP_BUILD_ID ||
  process.env.GITHUB_SHA ||
  `local-${Date.now()}`;

// Expose to the client as import.meta.env.VITE_APP_BUILD_ID
process.env.VITE_APP_BUILD_ID = appBuildId;

function isBuildIdRequest(urlPath: string | undefined): boolean {
  const pathname = String(urlPath || '').split('?')[0];
  return pathname === '/build-id.json' || pathname === `${normalizedBase}build-id.json`;
}

function emitBuildIdPlugin(): Plugin {
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

/**
 * Mermaid createText turns <br> into "\n" before KaTeX render, but KaTeX
 * splitting only looked for <br> — multi-line $$ labels stayed one nowrap row.
 * Split on real newlines too (build / non-prebundled loads).
 */
function fixMermaidKatexNewlinesPlugin(): Plugin {
  const patch = (code: string): string | null => {
    if (!code.includes('hasKatex(line)') || !code.includes('split(lineBreakRegex)')) {
      return null;
    }
    const next = code.replace(
      /text\.split\(lineBreakRegex\)\.map\(/g,
      'text.split(/\\n|<br\\s*\\/?>/gi).map(',
    );
    return next === code ? null : next;
  };

  return {
    name: 'fix-mermaid-katex-newlines',
    enforce: 'pre',
    transform(code, id) {
      const normalizedId = id.replace(/\\/g, '/');
      if (!normalizedId.includes('mermaid')) return;
      const next = patch(code);
      if (next == null) return;
      return { code: next, map: null };
    },
  };
}

/** `/docs` (no slash) → `/docs/` so SPA history fallback does not serve the app shell. */
function docsTrailingSlashPlugin(): Plugin {
  const bareDocsPath = `${normalizedBase.replace(/\/$/, '')}/docs`.replace(/\/{2,}/g, '/');

  const redirectBareDocs: Connect.NextHandleFunction = (req, res, next) => {
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
      const outDir = path.resolve(rootDir, 'dist');
      try {
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, '_redirects'), redirects);
      } catch (error) {
        console.warn('docs host hints write failed:', error);
      }
    },
  };
}

/** Sync lucivy-wasm + coi-serviceworker into public/ (same-origin, not bundled). */
function syncLucivyPublicAssetsPlugin(): Plugin {
  const sync = () => {
    const lucivySrc = path.join(rootDir, 'node_modules/lucivy-wasm');
    const lucivyDest = path.join(rootDir, 'public/lucivy');
    const pairs: Array<[string, string]> = [
      ['js/lucivy-worker.js', 'js/lucivy-worker.js'],
      ['js/lucivy.js', 'js/lucivy.js'],
      ['pkg/lucivy.js', 'pkg/lucivy.js'],
      ['pkg/lucivy.wasm', 'pkg/lucivy.wasm'],
    ];
    try {
      for (const [rel, outRel] of pairs) {
        const from = path.join(lucivySrc, rel);
        const to = path.join(lucivyDest, outRel);
        if (!fs.existsSync(from)) continue;
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(from, to);
      }
      const coiFrom = path.join(
        rootDir,
        'node_modules/coi-serviceworker/coi-serviceworker.js',
      );
      const coiTo = path.join(rootDir, 'public/coi-serviceworker.js');
      if (fs.existsSync(coiFrom)) {
        fs.copyFileSync(coiFrom, coiTo);
      }
    } catch (err) {
      console.warn('[syncLucivyPublicAssets]', err);
    }
  };
  return {
    name: 'sync-lucivy-public-assets',
    buildStart() {
      sync();
    },
    configureServer() {
      sync();
    },
  };
}

/**
 * Desktop shells get COOP/COEP from Tauri/Vite headers — drop coi-serviceworker
 * so it does not replace the app service worker scope.
 */
function coiHtmlPlugin(): Plugin {
  return {
    name: 'coi-html-for-web',
    transformIndexHtml(html) {
      if (!isElectron) return html;
      return html
        .replace(
          /<!--\s*SharedArrayBuffer[\s\S]*?<script src="\.\/coi-serviceworker\.js"><\/script>\s*/m,
          '',
        )
        .replace(/<script>\s*window\.coi\s*=[\s\S]*?<\/script>\s*/m, '');
    },
  };
}

/**
 * Tauri/desktop builds skip VitePWA, so `virtual:pwa-register/react` does not
 * exist. Provide a no-op hook with the same shape as the PWA virtual module.
 */
function stubPwaRegisterForDesktopPlugin(): Plugin {
  const virtualId = 'virtual:pwa-register/react';
  const resolvedId = `\0${virtualId}`;
  return {
    name: 'stub-pwa-register-for-desktop',
    resolveId(id) {
      if (id === virtualId) return resolvedId;
      return undefined;
    },
    load(id) {
      if (id !== resolvedId) return undefined;
      return `
import { useState } from 'react';

export function useRegisterSW(_options) {
  const needRefresh = useState(false);
  const offlineReady = useState(false);
  return {
    needRefresh,
    offlineReady,
    updateServiceWorker: async () => {},
  };
}
`;
    },
  };
}

const plugins: PluginOption[] = [
  fixMermaidKatexNewlinesPlugin(),
  react({
    // Keep node_modules out; also skip VitePress caches (Babel would otherwise
    // transform huge prebundled deps under .vitepress/cache/deps).
    exclude: [/\/node_modules\//, /\/\.vitepress\//],
  }),
  tailwindcss(),
  emitBuildIdPlugin(),
  docsTrailingSlashPlugin(),
  syncLucivyPublicAssetsPlugin(),
  coiHtmlPlugin(),
  wasm(),
  topLevelAwait(),
];

if (isElectron) {
  plugins.push(stubPwaRegisterForDesktopPlugin());
} else {
  plugins.push(
    VitePWA({
      disable: false,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'og-image.png'],
      manifest: {
        id: normalizedBase,
        lang: 'ko',
        name: 'Docu Haim',
        short_name: 'Docu Haim',
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
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
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
    }),
  );
}

/**
 * Split heavy vendor graphs out of the main entry chunk.
 * Paths are matched against Rollup's resolved module id (normalized to `/`).
 */
function manualChunks(id: string): string | undefined {
  const normalizedId = id.replace(/\\/g, '/');
  if (!normalizedId.includes('/node_modules/')) return;

  if (
    normalizedId.includes('/node_modules/md-editor-rt/') ||
    normalizedId.includes('/node_modules/@vavt/')
  ) {
    return 'vendor-md-editor';
  }
  if (
    normalizedId.includes('/node_modules/mermaid/')
    || normalizedId.includes('/node_modules/@mermaid-js/')
  ) {
    return 'vendor-mermaid';
  }
  if (
    normalizedId.includes('/node_modules/@aws-sdk/') ||
    normalizedId.includes('/node_modules/@smithy/')
  ) {
    return 'vendor-aws';
  }
  if (
    normalizedId.includes('/node_modules/monaco-editor/') ||
    normalizedId.includes('/node_modules/@monaco-editor/')
  ) {
    return 'vendor-monaco';
  }
  if (
    normalizedId.includes('/node_modules/novel/') ||
    normalizedId.includes('/node_modules/@tiptap/') ||
    normalizedId.includes('/node_modules/prosemirror-')
  ) {
    return 'vendor-novel';
  }
  if (
    normalizedId.includes('/node_modules/@git-diff-view/')
  ) {
    return 'vendor-git-diff-view';
  }
  if (
    normalizedId.includes('/node_modules/emoji-mart/') ||
    normalizedId.includes('/node_modules/@emoji-mart/')
  ) {
    return 'vendor-emoji';
  }
  if (normalizedId.includes('/node_modules/@zip.js/')) {
    return 'vendor-zip';
  }
  if (normalizedId.includes('/node_modules/garu-ko/')) {
    return 'vendor-garu-ko';
  }
  if (
    normalizedId.includes('/node_modules/cropperjs/')
    || normalizedId.includes('/node_modules/react-easy-crop/')
  ) {
    return 'vendor-image-crop';
  }
  if (
    normalizedId.includes('/node_modules/motion/') ||
    normalizedId.includes('/node_modules/framer-motion/')
  ) {
    return 'vendor-motion';
  }
  if (normalizedId.includes('/node_modules/lucide-react/')) {
    return 'vendor-lucide';
  }
  if (
    normalizedId.includes('/node_modules/react-aria-components/') ||
    normalizedId.includes('/node_modules/@react-aria/') ||
    normalizedId.includes('/node_modules/@react-stately/') ||
    normalizedId.includes('/node_modules/@internationalized/')
  ) {
    return 'vendor-react-aria';
  }
  if (
    normalizedId.includes('/node_modules/radix-ui/') ||
    normalizedId.includes('/node_modules/@radix-ui/')
  ) {
    return 'vendor-radix';
  }
  if (
    normalizedId.includes('/node_modules/react-dom/') ||
    normalizedId.includes('/node_modules/react-router/') ||
    normalizedId.includes('/node_modules/scheduler/') ||
    /\/node_modules\/react\//.test(normalizedId)
  ) {
    return 'vendor-react';
  }
}

/** SharedArrayBuffer / lucivy-wasm pthread isolation (S3 images need credentialless). */
const CROSS_ORIGIN_ISOLATION_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
} as const;

/** Same-origin proxy for Google Gemini API (browser CORS blocks direct calls). */
const GEMINI_DEV_PROXY = {
  target: 'https://generativelanguage.googleapis.com',
  changeOrigin: true,
  secure: true,
  rewrite: (path: string) => path.replace(/^\/api\/gemini/, ''),
} as const;

export default defineConfig({
  // Avoid wiping Rust/Tauri compile logs when Vite restarts under `tauri dev`.
  clearScreen: false,
  envPrefix: ['VITE_', 'TAURI_'],
  base: basePath,
  plugins,
  assetsInclude: ['**/*.wasm', '**/*.gmdl'],
  optimizeDeps: {
    exclude: ['garu-ko', 'lucivy-wasm'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
    // Gzipping every chunk for the size report spikes RAM on constrained
    // hosts (Render ~2GB Node heap) right after generateBundle.
    reportCompressedSize: false,
    // Heavy editors (md-editor, novel, monaco) still exceed 500 kB alone.
    chunkSizeWarningLimit: 1200,
  },
  server: {
    // Tauri expects a fixed port; fail instead of silently switching.
    port: 5173,
    strictPort: true,
    headers: { ...CROSS_ORIGIN_ISOLATION_HEADERS },
    proxy: {
      '/api/gemini': GEMINI_DEV_PROXY,
    },
    watch: {
      ignored: ['**/.vitepress/**', '**/src-tauri/**'],
    },
  },
  preview: {
    headers: { ...CROSS_ORIGIN_ISOLATION_HEADERS },
    proxy: {
      '/api/gemini': GEMINI_DEV_PROXY,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      'markdown-it': path.resolve(rootDir, 'node_modules/markdown-it'),
    },
    dedupe: ['markdown-it'],
  },
  worker: {
    format: 'es',
  },
});
