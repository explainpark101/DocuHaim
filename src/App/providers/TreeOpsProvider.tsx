import type { ReactNode } from 'react';
import { TreeOpsContext } from '@/App/context/TreeOpsContext';

export function TreeOpsProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: React.ContextType<typeof TreeOpsContext>;
}) {
  return <TreeOpsContext.Provider value={value}>{children}</TreeOpsContext.Provider>;
}
