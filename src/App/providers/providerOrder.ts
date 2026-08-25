/**
 * Domain provider dependency order (fixed — no reverse imports):
 *
 * Owned state (wrap AppLogic):
 *   AppBootstrapStateProvider → AppVaultStateProvider → WorkspaceTabsProvider
 *     → AppFileSessionStateProvider → AppTreeOpsStateProvider
 *     → AppPwaSnippetsStateProvider → RecordingProvider
 *
 * Fan-out inside AppLogic:
 *   AppBootstrapProvider → VaultProvider → FileSessionProvider → TreeOpsProvider
 *     → AppModalsProvider → AutoSaveProvider → AppShellView
 *
 * Existing app-wide contexts stay outside App/:
 *   AuthProvider, ActivityIndicatorProvider, Toast, AlertModal
 */
export const APP_PROVIDER_ORDER = [
  'AppBootstrapStateProvider',
  'AppVaultStateProvider',
  'WorkspaceTabsProvider',
  'AppFileSessionStateProvider',
  'AppTreeOpsStateProvider',
  'AppPwaSnippetsStateProvider',
  'RecordingProvider',
  'AppBootstrapProvider',
  'VaultProvider',
  'FileSessionProvider',
  'TreeOpsProvider',
  'AppModalsProvider',
  'AutoSaveProvider',
] as const;
