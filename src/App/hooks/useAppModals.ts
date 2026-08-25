import { useContext } from 'react';
import { AppModalsContext } from '@/App/context/AppModalsContext';

export function useAppModals() {
  const ctx = useContext(AppModalsContext);
  if (!ctx) throw new Error('useAppModals must be used within AppModalsProvider');
  return ctx;
}
