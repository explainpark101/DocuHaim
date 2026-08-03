import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const isElectron = process.env.VITE_ELECTRON === 'true';

const plugins = [
  react(),
  tailwindcss(),
];

if (!isElectron) {
  plugins.push(
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        id: (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '/'),
        name: 'S3 Haim - Markdown Notes',
        short_name: 'S3 Haim',
        description: 'S3에 저장하는 마크다운 메모 앱',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '/'),
        scope: (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '/'),
        share_target: {
          action: (() => {
            const base = (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '/');
            return `${base}chat`;
          })(),
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
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
        navigateFallback: (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '') + '/index.html',
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    })
  );
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
