import { useContext } from 'react';
import { AppHandlersContext } from '@/App/context/AppHandlersContext';

export function useAppHandlers(): Record<string, any> {
  const ctx = useContext(AppHandlersContext);
  if (!ctx) throw new Error('useAppHandlers must be used within AppLogicProvider');
  return ctx;
}
