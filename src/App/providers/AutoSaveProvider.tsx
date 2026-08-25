import type { ReactNode } from 'react';
import { AutoSaveContext } from '@/App/context/AutoSaveContext';
import { useAutoSaveDomain } from '@/App/hooks/useAutoSaveDomain';

/** Owns §7–8 debounce save + idle sync (reads FileSession / Vault / Tabs). */
export function AutoSaveProvider({ children }: { children: ReactNode }) {
  const value = useAutoSaveDomain();
  return <AutoSaveContext.Provider value={value}>{children}</AutoSaveContext.Provider>;
}
