import { useContext } from 'react';
import {
  SessionWorkspaceContext,
  type SessionWorkspaceValue,
} from '@/App/context/SessionWorkspaceContext';

export function useSessionWorkspace(): SessionWorkspaceValue {
  const ctx = useContext(SessionWorkspaceContext);
  if (!ctx) throw new Error('useSessionWorkspace must be used within AppLogicProvider');
  return ctx;
}
