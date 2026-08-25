/**
 * Domain provider dependency order (fixed — no reverse imports).
 */
export const APP_PROVIDER_ORDER = [
  'AppBootstrapStateProvider',
  'AppVaultStateProvider',
  'VaultProvider',
  'WorkspaceTabsProvider',
  'AppFileSessionStateProvider',
  'FileSessionProvider',
  'AppTreeOpsStateProvider',
  'TreeOpsProvider',
  'AppPwaSnippetsStateProvider',
  'RecordingProvider',
  'AppBootstrapProvider',
  'AppModalsProvider',
  'AutoSaveProvider',
] as const;
