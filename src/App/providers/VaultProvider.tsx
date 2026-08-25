import type { ReactNode } from 'react';
import { VaultContext } from '@/App/context/VaultContext';

/** Vault domain context host — state still supplied by AppLogic until full extract. */
export function VaultProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: React.ContextType<typeof VaultContext>;
}) {
  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}
