import { createContext } from 'react';

/**
 * Cross-domain handlers still published for AppLayout until they move into
 * domain modules. Prefer useVault / useFileSession / useTreeOps / useAppChrome.
 */
export type AppHandlersBag = Record<string, any>;

export const AppHandlersContext = createContext<AppHandlersBag | null>(null);
