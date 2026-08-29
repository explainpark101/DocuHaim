/**
 * Formal route entry modules (thin wrappers).
 *
 * - SettingsPage — /settings (also workspace settings tab)
 * - ExportPDFPage — /export-pdf/* (`pages/exportPdf/ExportPDFPage.tsx`)
 * - LlmAssistPopoutPage — /llm-assist-popout
 *
 * Quasi-pages that are not under `pages/` (feature-owned):
 * - ChatWithMyselfPane — `components/chatWithMyself/` (workspace chat tab)
 *
 * App shell orchestration: `src/App/` (AppProviders + AppShellView + domain providers).
 */
export const APP_PAGE_ENTRIES = [
  'SettingsPage',
  'ExportPDFPage',
  'LlmAssistPopoutPage',
] as const;

export const FEATURE_QUASI_PAGES = ['ChatWithMyselfPane'] as const;
