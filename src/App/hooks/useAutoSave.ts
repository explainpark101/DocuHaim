import { useContext } from 'react';
import { AutoSaveContext, type AutoSaveValue } from '@/App/context/AutoSaveContext';

export function useAutoSave(): AutoSaveValue {
  const ctx = useContext(AutoSaveContext);
  if (!ctx) throw new Error('useAutoSave must be used within AutoSaveProvider');
  return ctx;
}
