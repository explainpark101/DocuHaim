import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { applyDocumentTheme } from '@/utils/documentTheme';

function readInitialTheme(): string {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export type BootstrapOwnedApi = {
  scriptsLoaded: boolean;
  theme: string;
  setTheme: (theme: string) => void;
  shareBlockingAuth: boolean;
  setShareBlockingAuth: (blocking: boolean) => void;
};

const BootstrapOwnedContext = createContext<BootstrapOwnedApi | null>(null);

export function useBootstrapOwned(): BootstrapOwnedApi {
  const ctx = useContext(BootstrapOwnedContext);
  if (!ctx) throw new Error('useBootstrapOwned must be used within AppBootstrapStateProvider');
  return ctx;
}

/** Owns theme / scriptsLoaded / shareBlockingAuth — wraps AppLogic so the controller can read them. */
export function AppBootstrapStateProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(readInitialTheme);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [shareBlockingAuth, setShareBlockingAuth] = useState(true);

  useEffect(() => {
    applyDocumentTheme(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setScriptsLoaded(true);
  }, []);

  const value = useMemo(
    () => ({
      scriptsLoaded,
      theme,
      setTheme,
      shareBlockingAuth,
      setShareBlockingAuth,
    }),
    [scriptsLoaded, theme, shareBlockingAuth],
  );

  return (
    <BootstrapOwnedContext.Provider value={value}>{children}</BootstrapOwnedContext.Provider>
  );
}
