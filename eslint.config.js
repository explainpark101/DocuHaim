import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'release',
    'dev-dist',
    // Vendored WASM / COI helpers copied from node_modules into public/
    'public/lucivy/**',
    'public/coi-serviceworker.js',
    // VitePress caches (deps prebundles); not app source
    '.vitepress/**',
    'docs/.vitepress/**',
    'docs/node_modules/**',
    // Cargo/Tauri build output (hashed assets are not app source)
    'src-tauri/target/**',
  ]),
  {
    files: ['electron/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // JS/JSX only until typescript-eslint is added; .ts/.tsx (incl. vite.config.ts)
    // are gated by `tsc` / tsconfig.node.json — do not lint them with espree.
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Undeclared identifiers (pre-push gate). Unused bindings are not gated —
      // destructuring placeholders (e.g. map callbacks) are too noisy otherwise.
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],

      // Known debt in Move* modals; keep visible but do not block push yet
      'react-hooks/rules-of-hooks': 'warn',

      // Keep React Compiler-oriented rules visible but non-blocking for push
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },
])
