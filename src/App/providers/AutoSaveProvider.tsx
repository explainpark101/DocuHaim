import type { ReactNode } from 'react';
import { AutoSaveContext } from '@/App/context/AutoSaveContext';

export function AutoSaveProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: React.ContextType<typeof AutoSaveContext>;
}) {
  return <AutoSaveContext.Provider value={value}>{children}</AutoSaveContext.Provider>;
}
