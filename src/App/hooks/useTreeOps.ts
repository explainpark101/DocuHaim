import { useContext } from 'react';
import { TreeOpsContext, type TreeOpsValue } from '@/App/context/TreeOpsContext';

export function useTreeOps(): TreeOpsValue {
  const ctx = useContext(TreeOpsContext);
  if (!ctx) throw new Error('useTreeOps must be used within TreeOpsProvider');
  return ctx;
}
