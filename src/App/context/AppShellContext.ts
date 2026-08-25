import { createContext } from 'react';

/**
 * Remaining chrome bag for AppLayout (sidebar chrome, settings handlers, chat bridge).
 * Prefer domain hooks (useVault, useFileSession, useRecordingOwned, …) for new work.
 * Domain-owned keys are still merged for back-compat until AppLayout finishes migrating.
 */
export type AppShellBag = Record<string, any>;

export const AppShellContext = createContext<AppShellBag | null>(null);
