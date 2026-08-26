import { useContext } from 'react';
import { AppChromeContext } from '@/App/context/AppChromeContext';

export function useAppChrome() {
  const ctx = useContext(AppChromeContext);
  if (!ctx) throw new Error('useAppChrome must be used within AppChromeProvider');
  return ctx;
}
