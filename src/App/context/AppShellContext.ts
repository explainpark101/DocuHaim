import { createContext } from 'react';

/**
 * Full shell bag for presentational components still migrating off prop drilling.
 * Prefer domain hooks (useVault, useFileSession, …) when adding new consumers.
 */
export type AppShellBag = Record<string, any>;

export const AppShellContext = createContext<AppShellBag | null>(null);
