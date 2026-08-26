import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/** AppLogic domain hooks: keep no-undef gated (no @ts-nocheck). */
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
    files: ['server/**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        Bun: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'off',
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
      // Ban file-level nocheck; allow documented line expect-error / ignore.
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-nocheck': true,
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 3,
        },
      ],
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
