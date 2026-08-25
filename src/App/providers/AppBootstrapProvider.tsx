import { useEffect, useState, type ReactNode } from 'react';
import { AppBootstrapContext } from '@/App/context/AppBootstrapContext';
import { applyDocumentTheme } from '@/utils/documentTheme';

function readInitialTheme(): string {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

type LogicSlice = Omit<
  NonNullable<React.ContextType<typeof AppBootstrapContext>>,
  'theme' | 'setTheme'
>;

/**
 * Owns document theme. Auth/share/scriptsLoaded come from AppLogic (controller) slice.
 */
export function AppBootstrapProvider({
  children,
  logic,
}: {
  children: ReactNode;
  logic: LogicSlice;
}) {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    applyDocumentTheme(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const value = {
    ...logic,
    theme,
    setTheme,
  };

  return (
    <AppBootstrapContext.Provider value={value}>{children}</AppBootstrapContext.Provider>
  );
}
