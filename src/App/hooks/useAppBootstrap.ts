import { useContext } from 'react';
import { AppBootstrapContext, type AppBootstrapValue } from '@/App/context/AppBootstrapContext';

export function useAppBootstrap(): AppBootstrapValue {
  const ctx = useContext(AppBootstrapContext);
  if (!ctx) throw new Error('useAppBootstrap must be used within AppBootstrapProvider');
  return ctx;
}
