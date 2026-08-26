import { useContext } from 'react';
import {
  AppEditorExtrasContext,
  type AppEditorExtrasValue,
} from '@/App/context/AppEditorExtrasContext';

export function useAppEditorExtras(): AppEditorExtrasValue {
  const ctx = useContext(AppEditorExtrasContext);
  if (!ctx) throw new Error('useAppEditorExtras must be used within AppLogicProvider');
  return ctx;
}
