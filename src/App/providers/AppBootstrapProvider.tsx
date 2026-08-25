import type { ReactNode } from 'react';
import { AppBootstrapContext } from '@/App/context/AppBootstrapContext';

/** Pass-through until bootstrap state is fully extracted from AppLogicProvider. */
export function AppBootstrapProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: React.ContextType<typeof AppBootstrapContext>;
}) {
  return (
    <AppBootstrapContext.Provider value={value}>
      {children}
    </AppBootstrapContext.Provider>
  );
}
