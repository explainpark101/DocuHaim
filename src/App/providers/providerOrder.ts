/**
 * Domain provider dependency order (fixed — no reverse imports).
 * Modals above Tabs so tab dirty-close can use useModalsOwned.
 * Chrome above FileSession so session domain can use useChromeOwned.
 *
 * APP_PROVIDER_ORDER mirrors `AppProviders.tsx` JSX (through RecordingProvider + AppLogicProvider).
 * APP_LOGIC_PROVIDER_ORDER mirrors the nest inside `AppLogicProvider`.
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
  'AppLogicProvider',
] as const;

/** Nested inside AppLogicProvider (bootstrap/modals/autosave fan-out). */
export const APP_LOGIC_PROVIDER_ORDER = [
  'AppBootstrapProvider',
  'AppModalsProvider',
  'AutoSaveProvider',
] as const;
