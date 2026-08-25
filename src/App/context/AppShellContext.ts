import { createContext } from 'react';
import type { AppChromeValue } from '@/App/context/AppChromeContext';

/**
 * Chrome-only shell bag (&lt;30 keys). Alias of AppChromeValue.
 * Prefer useAppChrome / domain hooks for new consumers.
 */
export type AppShellBag = AppChromeValue;

export const AppShellContext = createContext<AppShellBag | null>(null);
