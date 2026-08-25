import { type ReactNode } from 'react';
import { VaultContext } from '@/App/context/VaultContext';
import { useVaultDomain } from '@/App/hooks/useVaultDomain';

/**
 * Owns vault context value (state from AppVaultStateProvider + load/backend handlers).
 * Must wrap AppLogic so orchestration can call useVault().
 */
export function VaultProvider({ children }: { children: ReactNode }) {
  const value = useVaultDomain();
  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}
