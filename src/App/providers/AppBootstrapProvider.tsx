import type { ReactNode } from 'react';
import { AppBootstrapContext } from '@/App/context/AppBootstrapContext';
import { useBootstrapOwned } from '@/App/providers/AppBootstrapStateProvider';

type LogicSlice = Omit<
  NonNullable<React.ContextType<typeof AppBootstrapContext>>,
  'theme' | 'setTheme' | 'scriptsLoaded' | 'shareBlockingAuth' | 'setShareBlockingAuth'
>;

/**
 * Publishes full bootstrap context = owned state + auth/unlock handlers from AppLogic.
 */
export function AppBootstrapProvider({
  children,
  logic,
}: {
  children: ReactNode;
  logic: LogicSlice;
}) {
  const owned = useBootstrapOwned();
  const value = {
    ...logic,
    ...owned,
  };

  return (
    <AppBootstrapContext.Provider value={value}>{children}</AppBootstrapContext.Provider>
  );
}
