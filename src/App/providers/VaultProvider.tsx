import type { ReactNode } from 'react';
import { VaultContext } from '@/App/context/VaultContext';

export function VaultProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: React.ContextType<typeof VaultContext>;
}) {
  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}
