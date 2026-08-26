import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/** Domain compose hooks: catch bag wiring bugs (@ts-nocheck skips tsc name checks). */
const appLogicHookGlobs = [
  'src/App/hooks/use*Domain.ts',
  'src/App/hooks/useAppLogicSharedState.ts',
  'src/App/hooks/useAppLogicSetupDomain.ts',
  'src/App/hooks/appLogicGlue.ts',
  'src/App/hooks/autoSaveBridge.ts',
]

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
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Satisfy existing file-level disables; not enforced project-wide.
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-unused-vars': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    files: ['vite.config.ts', 'vitest.config.ts', 'scripts/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: appLogicHookGlobs,
    rules: {
      'no-undef': 'error',
    },
  },
])
