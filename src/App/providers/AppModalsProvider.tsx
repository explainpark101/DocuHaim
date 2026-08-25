import type { ReactNode } from 'react';
import { AppModalsContext, type AppModalsValue } from '@/App/context/AppModalsContext';

export function AppModalsProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AppModalsValue;
}) {
  return <AppModalsContext.Provider value={value}>{children}</AppModalsContext.Provider>;
}
