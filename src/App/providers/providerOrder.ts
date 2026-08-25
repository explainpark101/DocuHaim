/**
 * Domain provider dependency order (fixed — no reverse imports):
 *
 *   AppBootstrapStateProvider → AppVaultStateProvider → VaultProvider
 *     → WorkspaceTabsProvider → AppFileSessionStateProvider → FileSessionProvider
 *     → AppTreeOpsStateProvider → AppPwaSnippetsStateProvider → RecordingProvider
 *     → AppLogic (AppBootstrapProvider → TreeOpsProvider → AppModals → AutoSave)
 */
export const APP_PROVIDER_ORDER = [
  'AppBootstrapStateProvider',
  'AppVaultStateProvider',
  'VaultProvider',
  'WorkspaceTabsProvider',
  'AppFileSessionStateProvider',
  'FileSessionProvider',
  'AppTreeOpsStateProvider',
  'AppPwaSnippetsStateProvider',
  'RecordingProvider',
  'AppBootstrapProvider',
  'TreeOpsProvider',
  'AppModalsProvider',
  'AutoSaveProvider',
] as const;
