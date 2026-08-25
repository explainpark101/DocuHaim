import type { ReactNode } from 'react';
import { FileSessionContext } from '@/App/context/FileSessionContext';

export function FileSessionProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: React.ContextType<typeof FileSessionContext>;
}) {
  return (
    <FileSessionContext.Provider value={value}>{children}</FileSessionContext.Provider>
  );
}
