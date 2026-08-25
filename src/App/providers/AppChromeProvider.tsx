import { useMemo, type ReactNode } from 'react';
import { AppChromeContext, type AppChromeValue } from '@/App/context/AppChromeContext';

export function AppChromeProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AppChromeValue;
}) {
  const memo = useMemo(() => value, [value]);
  return (
    <AppChromeContext.Provider value={memo}>{children}</AppChromeContext.Provider>
  );
}
