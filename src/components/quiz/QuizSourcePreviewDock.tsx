import { memo } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import VaultDocumentPreviewPanel from '@/components/shared/panels/VaultDocumentPreviewPanel';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { QUIZ_DOCK_OPEN_TRANSITION } from '@/utils/quiz/quizDockMotion';
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
    <AnimatePresence initial={false}>
      {path ? (
        <Motion.aside
          key="quiz-source-preview-dock"
          role="complementary"
          aria-label="근거 문서 미리보기"
          className="flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
          initial={{ width: 0, opacity: 0.85 }}
          animate={{ width: previewDockWidth, opacity: 1 }}
          exit={{ width: 0, opacity: 0.85 }}
          transition={QUIZ_DOCK_OPEN_TRANSITION}
        >
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
        </Motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(QuizSourcePreviewDock);
