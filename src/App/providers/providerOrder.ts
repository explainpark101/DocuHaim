/**
 * Domain provider dependency order (fixed — no reverse imports).
 * Modals above Tabs so tab dirty-close can use useModalsOwned.
 * Chrome above FileSession so session domain can use useChromeOwned.
 */
export const APP_PROVIDER_ORDER = [
  'AppBootstrapStateProvider',
  'AppVaultStateProvider',
  'VaultProvider',
  'AppFileSessionStateProvider',
  'AppModalsStateProvider',
  'WorkspaceTabsProvider',
  'AppChromeStateProvider',
  'FileSessionProvider',
  'AppTreeOpsStateProvider',
  'TreeOpsProvider',
  'AppPwaSnippetsStateProvider',
  'RecordingProvider',
  'AppBootstrapProvider',
  'AppModalsProvider',
  'AutoSaveProvider',
] as const;
