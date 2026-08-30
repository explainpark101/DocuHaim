import { memo } from 'react';
import VaultDocumentPreviewPanel from '@/components/shared/panels/VaultDocumentPreviewPanel';
import QuizDockMotionAside from '@/components/quiz/QuizDockMotionAside';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import type { VaultDocumentPreviewPayload } from '@/utils/vault/loadVaultDocumentPreview';

const PREVIEW_DOCK_DEFAULT_WIDTH = 400;

export type QuizSourcePreviewDockProps = {
  path: string | null;
  onClose: () => void;
  loadDocument: (path: string) => Promise<VaultDocumentPreviewPayload | null>;
  onOpenDocument: (path: string) => void;
  onOpenInNewTab: (path: string) => void;
};

function QuizSourcePreviewDock({
  path,
  onClose,
  loadDocument,
  onOpenDocument,
  onOpenInNewTab,
}: QuizSourcePreviewDockProps) {
  const {
    width: previewDockWidth,
    handleProps: previewDockResizeHandleProps,
    isResizing: previewDockResizing,
  } = useResizablePanelWidth({
    storageKey: 'quiz-source-preview-dock-width',
    defaultWidth: PREVIEW_DOCK_DEFAULT_WIDTH,
    minWidth: 280,
    maxWidth: 640,
    edge: 'left',
  });

  return (
    <QuizDockMotionAside
      motionKey="quiz-source-preview-dock"
      open={path != null}
      width={previewDockWidth}
      isResizing={previewDockResizing}
      aria-label="근거 문서 미리보기"
      className="flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
    >
      {path ? (
        <div
          className="relative h-full min-h-0"
          style={{ width: previewDockWidth }}
        >
          <VaultDocumentPreviewPanel
            embedded
            path={path}
            width={previewDockWidth}
            resizeHandleProps={previewDockResizeHandleProps}
            isResizing={previewDockResizing}
            resizeEdge="left"
            onClose={onClose}
            loadDocument={loadDocument}
            onOpenDocument={onOpenDocument}
            onOpenInNewTab={onOpenInNewTab}
          />
        </div>
      ) : null}
    </QuizDockMotionAside>
  );
}

export default memo(QuizSourcePreviewDock);
