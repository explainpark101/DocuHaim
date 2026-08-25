import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Lightweight Vitest config (does not load PWA/wasm/Tauri plugins from vite.config.ts).
 * All suites live under tests/ (mirrors src/ areas: App, pages, utils, refactor, …).
 */
export default defineConfig({
  plugins: [
    react({
      exclude: [/\/node_modules\//, /\/\.vitepress\//],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      'markdown-it': path.resolve(rootDir, 'node_modules/markdown-it'),
    },
    dedupe: ['markdown-it'],
  },
  test: {
    name: 'unit',
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'docs', 'src-tauri', '**/release/**'],
    clearMocks: true,
    restoreMocks: true,
    // Avoid pulling the full app graph into every file unless imported.
    pool: 'forks',
  },
});
