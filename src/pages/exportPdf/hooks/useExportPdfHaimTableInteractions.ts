import { useCallback } from 'react';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useHaimTableEdit } from '@/hooks/useHaimTableEdit';
import type { ExportPdfDocumentState } from '@/pages/exportPdf/hooks/useExportPdfDocument';
import type { ExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';

type UseExportPdfHaimTableInteractionsArgs = Pick<
  ExportPdfDocumentState,
  'previewValue' | 'setPreviewValue' | 'previewValueRef'
> & {
  refs: Pick<ExportPdfPreviewRefs, 'previewContainerRef'>;
};

export function useExportPdfHaimTableInteractions({
  setPreviewValue,
  previewValueRef,
  refs,
}: UseExportPdfHaimTableInteractionsArgs) {
  const { previewContainerRef } = refs;
  const { showAlert } = useAlertModal();

  const haimTableEdit = useHaimTableEdit({
    getMarkdown: () => previewValueRef.current ?? '',
    setMarkdown: setPreviewValue,
  });

  const onEditFailed = useCallback(() => {
    showAlert({
      title: '표를 찾을 수 없음',
      message:
        '선택한 표를 마크다운에서 찾지 못했습니다. 저장 후 다시 시도하거나 표 위치가 변경되었는지 확인해 주세요.',
    });
  }, [showAlert]);

  return {
    previewContainerRef,
    haimTableEdit,
    onEditFailed,
  };
}
