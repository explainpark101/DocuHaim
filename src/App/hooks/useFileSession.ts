import { useContext } from 'react';
import { FileSessionContext, type FileSessionValue } from '@/App/context/FileSessionContext';

export function useFileSession(): FileSessionValue {
  const ctx = useContext(FileSessionContext);
  if (!ctx) throw new Error('useFileSession must be used within FileSessionProvider');
  return ctx;
}
