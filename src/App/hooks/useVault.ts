import { useContext } from 'react';
import { VaultContext, type VaultValue } from '@/App/context/VaultContext';

export function useVault(): VaultValue {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error('useVault must be used within VaultProvider');
  return ctx;
}
