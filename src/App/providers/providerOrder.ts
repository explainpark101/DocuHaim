/**
 * Domain provider dependency order (fixed — no reverse imports):
 *
 *   AppBootstrapProvider  (§1–2 auth bootstrap, theme, PWA, share gate)
 *     └─ VaultProvider     (§3–4 storageMode, trees, backends)
 *          └─ WorkspaceTabsProvider  (useWorkspaceTabs + workspaceTabsStore)
 *               └─ FileSessionProvider  (§5 open/save/enc.md/editor)
 *                    └─ TreeOpsProvider (§6 CRUD / DnD / download)
 *                         └─ AutoSaveProvider (§7–8 debounce + idle sync)
 *                              └─ AppShellView
 *
 * Existing app-wide contexts stay outside App/:
 *   AuthProvider, ActivityIndicatorProvider, Toast, AlertModal
 */
export const APP_PROVIDER_ORDER = [
  'AppBootstrapProvider',
  'VaultProvider',
  'WorkspaceTabsProvider',
  'FileSessionProvider',
  'TreeOpsProvider',
  'AutoSaveProvider',
] as const;
