import { memo, type ReactNode } from 'react';

type WorkspacePaneLeafSlotProps = {
  tabId: string;
  surfaceLive: boolean;
  /** Fingerprint of this leaf's tab content (e.g. editorContent length + path). */
  contentRevision: string;
  children: ReactNode;
};

/**
 * Isolates split-leaf React work: while frozen, skip re-render unless this leaf's
 * tab identity or content revision changes (parent typing elsewhere won't cascade).
 */
function WorkspacePaneLeafSlotInner({ children }: WorkspacePaneLeafSlotProps) {
  return <>{children}</>;
}

const WorkspacePaneLeafSlot = memo(WorkspacePaneLeafSlotInner, (prev, next) => {
  if (prev.tabId !== next.tabId) return false;
  if (prev.surfaceLive !== next.surfaceLive) return false;
  if (next.surfaceLive) return false;
  return prev.contentRevision === next.contentRevision;
});

export default WorkspacePaneLeafSlot;
